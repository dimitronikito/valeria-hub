import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import { SHA256 } from 'crypto-js';

const FlappyBirbGame: React.FC<{
  setCurrentScore: (score: number, hash: string) => void;
  setShowSubmitForm: (show: boolean) => void;
}> = ({ setCurrentScore, setShowSubmitForm }) => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameInstance, setGameInstance] = useState<Phaser.Game | null>(null);
  const secretRef = useRef(Math.random().toString(36).substring(2, 15));

  const BASE_WIDTH = 400;
  const BASE_HEIGHT = 600;
  const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;

  useEffect(() => {
    if (typeof window !== 'undefined' && gameRef.current) {
      class LoadingScene extends Phaser.Scene {
        constructor() {
          super('LoadingScene');
        }

        preload() {
          // Create loading bar
          const progressBar = this.add.graphics();
          const progressBox = this.add.graphics();
          progressBox.fillStyle(0x222222, 0.8);
          progressBox.fillRect(BASE_WIDTH / 2 - 160, BASE_HEIGHT / 2 - 25, 320, 50);

          const loadingText = this.make.text({
            x: BASE_WIDTH / 2,
            y: BASE_HEIGHT / 2 - 50,
            text: 'Loading...',
            style: {
              font: '20px monospace',
              color: '#ffffff'
            }
          });
          loadingText.setOrigin(0.5, 0.5);

          const percentText = this.make.text({
            x: BASE_WIDTH / 2,
            y: BASE_HEIGHT / 2 - 5,
            text: '0%',
            style: {
              font: '18px monospace',
              color: '#ffffff'
            }
          });
          percentText.setOrigin(0.5, 0.5);

          this.load.on('progress', (value: number) => {
            percentText.setText(parseInt((value * 100).toString()) + '%');
            progressBar.clear();
            progressBar.fillStyle(0xffffff, 1);
            progressBar.fillRect(BASE_WIDTH / 2 - 150, BASE_HEIGHT / 2 - 15, 300 * value, 30);
          });

          this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
            percentText.destroy();
          });

          // Load game assets
          this.load.image('bird', '/leafy_preview.png');
          this.load.audio('backgroundMusic', '/lbtw_battle_loop_2.wav');
        }

        create() {
          this.scene.start('MainScene');
        }
      }

      class MainScene extends Phaser.Scene {
        private bird!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        private pipes!: Phaser.Physics.Arcade.Group;
        private score: number = 0;
        private scoreText!: Phaser.GameObjects.Text;
        private gameOver: boolean = false;
        private pipeTimer!: Phaser.Time.TimerEvent;
        private startText!: Phaser.GameObjects.Text;
        private gameStarted: boolean = false;
        private backgroundMusic!: Phaser.Sound.BaseSound;

        constructor() {
          super('MainScene');
        }

        create() {
          this.gameOver = false;
          this.gameStarted = false;
          this.score = 0;

          // Load and play background music
          this.backgroundMusic = this.sound.add('backgroundMusic', { loop: true });

          // Set a gradient background
          const gradient = this.add.graphics();
          const colorTop = Phaser.Display.Color.ValueToColor("#1a237e");
          const colorBottom = Phaser.Display.Color.ValueToColor("#4a148c");
          gradient.fillGradientStyle(colorTop.color, colorTop.color, colorBottom.color, colorBottom.color, 1);
          gradient.fillRect(0, 0, BASE_WIDTH, BASE_HEIGHT);

          // Create a custom pipe texture
          const graphics = this.make.graphics({x: 0, y: 0});
          graphics.fillStyle(0x4db6ac);
          graphics.fillRect(0, 0, 32, 32);
          graphics.fillStyle(0x80cbc4);
          graphics.fillRect(0, 0, 32, 4);
          graphics.fillRect(0, 0, 4, 32);
          graphics.fillStyle(0x00897b);
          graphics.fillRect(28, 0, 4, 32);
          graphics.fillRect(0, 28, 32, 4);
          graphics.generateTexture('pipeTexture', 32, 32);
          graphics.destroy();

          // Create the bird sprite
          this.bird = this.physics.add.sprite(BASE_WIDTH * 0.25, BASE_HEIGHT * 0.5, 'bird');
          this.bird.setScale(0.03);
          
          // Adjust the bird's body to be smaller than its visual size for more forgiving collisions
          const birdWidth = this.bird.width * 0.55;
          const birdHeight = this.bird.height * 0.55;
          this.bird.body.setSize(birdWidth, birdHeight);
          this.bird.body.setOffset((this.bird.width - birdWidth) / 2, (this.bird.height - birdHeight) / 2);

          this.bird.setCollideWorldBounds(true);
          this.bird.body.allowGravity = false;
 
          this.pipes = this.physics.add.group();

          // Create score text above everything else
          this.scoreText = this.add.text(BASE_WIDTH * 0.5, BASE_HEIGHT * 0.08, 'Score: 0', { 
            fontSize: '32px', 
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 4
          });
          this.scoreText.setOrigin(0.5);
          this.scoreText.setDepth(1);

          // Create start text at the bottom
          this.startText = this.add.text(BASE_WIDTH * 0.5, BASE_HEIGHT * 0.9, 'Tap to Start', {
            fontSize: '36px',
            color: '#ffffff',
            stroke: '#000000',
            strokeThickness: 6
          });
          this.startText.setOrigin(0.5);
          this.startText.setDepth(1);

          // Add fading animation to start text
          this.tweens.add({
            targets: this.startText,
            alpha: 0,
            duration: 1000,
            ease: 'Power2',
            yoyo: true,
            repeat: -1
          });

          this.physics.add.collider(this.bird, this.pipes, this.gameOverHandler, undefined, this);

          this.input.keyboard?.on('keydown-SPACE', this.handleInput, this);
          this.input.on('pointerdown', this.handleInput, this);

          // Add this new event listener for preventing default spacebar behavior
          this.input.keyboard?.on('keydown-SPACE', (event: KeyboardEvent) => {
            if (this.gameStarted && !this.gameOver) {
              event.preventDefault();
            }
          });
        }

        handleInput = (event: any) => {
          if (!this.gameStarted) {
            this.startGame();
          } else if (!this.gameOver) {
            this.jump();
          }
          
          // Prevent default behavior for spacebar when game is active
          if (event instanceof KeyboardEvent && event.code === 'Space') {
            event.preventDefault();
          }
        }

        startGame = () => {
          this.gameStarted = true;
          this.bird.body.allowGravity = true;
          this.startText.setVisible(false);
          this.pipeTimer = this.time.addEvent({
            delay: 1500,
            callback: this.addPipes,
            callbackScope: this,
            loop: true
          });
          // Start playing the background music
          this.backgroundMusic.play();
        }

        update() {
          if (!this.gameStarted || this.gameOver) return;

          if (this.bird.angle < 20) this.bird.angle += 1;

          this.pipes.children.entries.forEach((pipe: Phaser.GameObjects.GameObject) => {
            if (pipe instanceof Phaser.Physics.Arcade.Sprite && pipe.x < -pipe.width) {
              pipe.destroy();
            }
          });
        }

        jump = () => {
          if (this.gameOver) return;

          this.bird.setVelocityY(-250);
          this.bird.angle = -20;
        }

        addPipes = () => {
          if (this.gameOver) return;

          const gapSize = 180;
          const minTopPipe = 45;
          const maxTopPipe = BASE_HEIGHT - gapSize - 45;
          const topPipeHeight = Phaser.Math.Between(minTopPipe, maxTopPipe);

          const pipeTop = this.pipes.create(BASE_WIDTH, topPipeHeight, 'pipeTexture') as Phaser.Physics.Arcade.Sprite;
          pipeTop.setOrigin(0.5, 1);
          pipeTop.setImmovable(true);
          (pipeTop.body as Phaser.Physics.Arcade.Body).allowGravity = false;
          pipeTop.setVelocityX(-160);
          pipeTop.setScale(1, topPipeHeight / 32);

          const pipeBottom = this.pipes.create(BASE_WIDTH, topPipeHeight + gapSize, 'pipeTexture') as Phaser.Physics.Arcade.Sprite;
          pipeBottom.setOrigin(0.5, 0);
          pipeBottom.setImmovable(true);
          (pipeBottom.body as Phaser.Physics.Arcade.Body).allowGravity = false;
          pipeBottom.setVelocityX(-160);
          pipeBottom.setScale(1, (BASE_HEIGHT - topPipeHeight - gapSize) / 32);

          this.score += 1;
          this.scoreText.setText('Score: ' + this.score);
        }

        gameOverHandler = () => {
          if (this.gameOver) return;
          
          this.gameOver = true;
          this.physics.pause();
          this.bird.setTint(0xff0000);

          if (this.pipeTimer) {
            this.pipeTimer.remove();
          }

          // Stop the background music
          this.backgroundMusic.stop();

          const secret = Math.random().toString(36).substring(2, 15);
          const scoreHash = SHA256(`${this.score}:${secret}`).toString();
          console.log("Game Over - Score:", this.score);
          console.log("Game Over - Hash:", scoreHash);
          setCurrentScore(this.score, scoreHash);
          setShowSubmitForm(true);
        }
      }

      const config: Phaser.Types.Core.GameConfig = {
        type: Phaser.AUTO,
        parent: gameRef.current,
        width: BASE_WIDTH,
        height: BASE_HEIGHT,
        transparent: false,
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { x: 0, y: 320 },
            debug: false
          }
        },
        scene: [LoadingScene, MainScene],
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH
        }
      };

      const game = new Phaser.Game(config);
      setGameInstance(game);

      return () => {
        game.destroy(true);
      };
    }
  }, []);

  return (
    <div>
      <div ref={gameRef} className="mx-auto rounded-lg overflow-hidden shadow-lg border-4 border-indigo-600" style={{ aspectRatio: `${ASPECT_RATIO}`, maxWidth: '100%', maxHeight: '75vh' }}></div>
      <div className="text-center mt-4 text-yellow-400">
        Press SPACE or click/tap to start and jump
      </div>
    </div>
  );
};

export default FlappyBirbGame;