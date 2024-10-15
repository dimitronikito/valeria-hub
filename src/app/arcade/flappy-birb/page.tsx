"use client"
import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import Link from 'next/link';

const FlappyBirb: React.FC = () => {
  const gameRef = useRef<HTMLDivElement>(null);
  const [gameInstance, setGameInstance] = useState<Phaser.Game | null>(null);
  const [showSubmitForm, setShowSubmitForm] = useState(false);
  const [username, setUsername] = useState('');
  const [currentScore, setCurrentScore] = useState(0);
  const [leaderboard, setLeaderboard] = useState<Array<{name: string, score: number}>>([]);

  const BASE_WIDTH = 400;
  const BASE_HEIGHT = 600;
  const ASPECT_RATIO = BASE_WIDTH / BASE_HEIGHT;

  type MainScene = Phaser.Scene & {
    scene: Phaser.Scenes.ScenePlugin;
  };

  useEffect(() => {
    const storedLeaderboard = localStorage.getItem('flappyBirbLeaderboard');
    if (storedLeaderboard) {
      setLeaderboard(JSON.parse(storedLeaderboard));
    }
  }, []);

  const handleSubmitScore = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      const newLeaderboard = updateLeaderboard(username, currentScore);
      setLeaderboard(newLeaderboard);
      localStorage.setItem('flappyBirbLeaderboard', JSON.stringify(newLeaderboard));
      setShowSubmitForm(false);
      setUsername('');
      restartGame();
    }
  };

  const updateLeaderboard = (name: string, score: number) => {
    const existingEntry = leaderboard.find(entry => entry.name.toLowerCase() === name.toLowerCase());
    let newLeaderboard;

    if (existingEntry) {
      if (score > existingEntry.score) {
        newLeaderboard = leaderboard.map(entry =>
          entry.name.toLowerCase() === name.toLowerCase() ? { ...entry, score } : entry
        );
      } else {
        return leaderboard;
      }
    } else {
      newLeaderboard = [...leaderboard, { name, score }];
    }

    return newLeaderboard
      .sort((a, b) => b.score - a.score)
      .slice(0, 10);
  };

  const restartGame = () => {
    if (gameInstance) {
      const mainScene = gameInstance.scene.getScene('MainScene') as MainScene;
      if (mainScene && mainScene.scene) {
        mainScene.scene.restart();
      } else {
        console.error('MainScene not found or invalid');
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined' && gameRef.current) {
      class MainScene extends Phaser.Scene {
        private bird!: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
        private pipes!: Phaser.Physics.Arcade.Group;
        private score: number = 0;
        private scoreText!: Phaser.GameObjects.Text;
        private gameOver: boolean = false;
        private pipeTimer!: Phaser.Time.TimerEvent;
        private startText!: Phaser.GameObjects.Text;
        private gameStarted: boolean = false;

        constructor() {
          super('MainScene');
        }

        preload() {
          this.load.image('bird', '/valerians/nocturnix.png');
        }

        create() {
          this.gameOver = false;
          this.gameStarted = false;
          this.score = 0;

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
          this.bird.setScale(0.05);
          
          // Crop the bird sprite to make it square
          const texture = this.textures.get('bird');
          const frame = texture.get();
          const size = Math.min(frame.width, frame.height);
          this.bird.setCrop((frame.width - size) / 2, (frame.height - size) / 2, size, size);

          this.bird.setCircle(this.bird.width * 0.6);
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
          const minTopPipe = 50;
          const maxTopPipe = BASE_HEIGHT - gapSize - 50;
          const topPipeHeight = Phaser.Math.Between(minTopPipe, maxTopPipe);

          const pipeTop = this.pipes.create(BASE_WIDTH, topPipeHeight, 'pipeTexture') as Phaser.Physics.Arcade.Sprite;
          pipeTop.setOrigin(0.5, 1);
          pipeTop.setImmovable(true);
          (pipeTop.body as Phaser.Physics.Arcade.Body).allowGravity = false;
          pipeTop.setVelocityX(-150);
          pipeTop.setScale(1, topPipeHeight / 32);

          const pipeBottom = this.pipes.create(BASE_WIDTH, topPipeHeight + gapSize, 'pipeTexture') as Phaser.Physics.Arcade.Sprite;
          pipeBottom.setOrigin(0.5, 0);
          pipeBottom.setImmovable(true);
          (pipeBottom.body as Phaser.Physics.Arcade.Body).allowGravity = false;
          pipeBottom.setVelocityX(-150);
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

          setCurrentScore(this.score);
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
            gravity: { x: 0, y: 370 },
            debug: false
          }
        },
        scene: MainScene,
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
    <div className="min-h-screen bg-indigo-950 text-white px-2 sm:px-4 py-4 sm:py-8">
      <div className="container mx-auto max-w-6xl">
        <header className="bg-indigo-900 py-4 mb-4">
          <div className="container mx-auto max-w-6xl px-4">
            <h1 className="text-xl sm:text-2xl md:text-4xl font-bold text-center uppercase tracking-widest text-yellow-400 shadow-yellow-400 shadow-sm">
              Flappy Birb
            </h1>
          </div>
        </header>
        <Link href="/arcade" className="inline-block mb-4 px-4 py-2 bg-indigo-700 text-yellow-400 rounded hover:bg-indigo-600 transition-colors">
          ← Arcade
        </Link>
        <div className="flex flex-col lg:flex-row lg:space-x-8">
          <div className="lg:w-2/3">
            <div ref={gameRef} className="mx-auto rounded-lg overflow-hidden shadow-lg border-4 border-indigo-600" style={{ aspectRatio: `${ASPECT_RATIO}`, maxWidth: '100%', maxHeight: '75vh' }}></div>
            <div className="text-center mt-4 text-yellow-400">
              Press SPACE or click/tap to start and jump
            </div>
          </div>
          <div className="lg:w-1/3 mt-8 lg:mt-0">
            <h2 className="text-2xl mb-4 text-yellow-400">Leaderboard</h2>
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left">Rank</th>
                  <th className="text-left">Name</th>
                  <th className="text-left">Score</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{entry.name}</td>
                    <td>{entry.score}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        {showSubmitForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-indigo-800 p-6 rounded-lg relative">
              <h2 className="text-2xl mb-4">Game Over! Your Score: {currentScore}</h2>
              <form onSubmit={handleSubmitScore}>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full p-2 mb-4 text-black"
                />
                <button type="submit" className="bg-yellow-400 text-indigo-900 px-4 py-2 rounded mr-2">
                  Submit Score
                </button>
                <button 
                  type="button" 
                  className="bg-indigo-600 text-yellow-400 px-4 py-2 rounded"
                  onClick={() => {
                    setShowSubmitForm(false);
                    restartGame();
                  }}
                >
                  Play Again
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FlappyBirb;