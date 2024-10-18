export interface ValerianStats {
  hp: number;
  attack: number;
  speed: number;
  defense: number;
  magicDefense: number;
}

export interface Valerian {
  id: number;
  name: string;
  type: string;
  class: string;
  stars: number;
  passive: string;
  passiveDescription: string;
  image: string;
  stats: ValerianStats;
}

export const valerians: Valerian[] = [
  {
    id: 1,
    name: 'Kuuko',
    type: 'Fire',
    class: 'Mage',
    stars: 1,
    passive: 'Flammable',
    passiveDescription: "When dealing critical hits, set the target ablaze.",
    image: '/valerians/kuuko.png',
    stats: { hp: 80, attack: 90, speed: 80, defense: 60, magicDefense: 80 }
  },
  {
    id: 2,
    name: 'Kuukoro',
    type: 'Fire',
    class: 'Mage',
    stars: 2,
    passive: 'Flammable',
    passiveDescription: "When dealing critical hits, set the target ablaze.",
    image: '/valerians/kuukoro.png',
    stats: { hp: 80, attack: 90, speed: 60, defense: 60, magicDefense: 80 }
  },
  {
    id: 3,
    name: 'Shinkuukoro',
    type: 'Fire',
    class: 'Mage',
    stars: 3,
    passive: 'Flammable',
    passiveDescription: "When dealing critical hits, set the target ablaze.",
    image: '/valerians/shinkuukoro.png',
    stats: { hp: 80, attack: 90, speed: 40, defense: 60, magicDefense: 80 }
  },
  {
    id: 4,
    name: 'Voltail',
    type: 'Electric',
    class: 'Tank',
    stars: 1,
    passive: 'Electrified Skin',
    passiveDescription: "When receiving damage, there is a probability to inflict paralysis on the target.",
    image: '/valerians/voltail.png',
    stats: { hp: 80, attack: 96, speed: 80, defense: 80, magicDefense: 48 }
  },
  {
    id: 5,
    name: 'Voltwin',
    type: 'Electric',
    class: 'Tank',
    stars: 2,
    passive: 'Electrified Skin',
    passiveDescription: "When receiving damage, there is a probability to inflict paralysis on the target.",
    image: '/valerians/voltwin.png',
    stats: { hp: 80, attack: 96, speed: 60, defense: 80, magicDefense: 48 }
  },
  {
    id: 6,
    name: 'Voltra',
    type: 'Electric',
    class: 'Tank',
    stars: 3,
    passive: 'Electrified Skin',
    passiveDescription: "When receiving damage, there is a probability to inflict paralysis on the target.",
    image: '/valerians/voltra.png',
    stats: { hp: 80, attack: 96, speed: 40, defense: 80, magicDefense: 48 }
  },
  {
    id: 7,
    name: 'Ponsea',
    type: 'Water',
    class: 'Support',
    stars: 1,
    passive: 'Recovery',
    passiveDescription: "After healing a target, increase the healing effect received by the target.",
    image: '/valerians/ponsea.png',
    stats: { hp: 72, attack: 80, speed: 80, defense: 80, magicDefense: 96 }
  },
  {
    id: 8,
    name: 'Steedsea',
    type: 'Water',
    class: 'Support',
    stars: 2,
    passive: 'Recovery',
    passiveDescription: "After healing a target, increase the healing effect received by the target.",
    image: '/valerians/steedsea.png',
    stats: { hp: 72, attack: 80, speed: 60, defense: 80, magicDefense: 96 }
  },
  {
    id: 9,
    name: 'Pegasea',
    type: 'Water',
    class: 'Support',
    stars: 3,
    passive: 'Recovery',
    passiveDescription: "After healing a target, increase the healing effect received by the target.",
    image: '/valerians/pegasea.png',
    stats: { hp: 72, attack: 80, speed: 40, defense: 80, magicDefense: 96 }
  },
  {
    id: 10,
    name: 'Twiggy',
    type: 'Grass',
    class: 'Ranger',
    stars: 1,
    passive: 'Catalytic',
    passiveDescription: "When inflicting damage on poisoned targets, deal additional damage.",
    image: '/valerians/twiggy.png',
    stats: { hp: 88, attack: 88, speed: 80, defense: 72, magicDefense: 56 }
  },
  {
    id: 11,
    name: 'Branchy',
    type: 'Grass',
    class: 'Ranger',
    stars: 2,
    passive: 'Catalytic',
    passiveDescription: "When inflicting damage on poisoned targets, deal additional damage.",
    image: '/valerians/branchy.png',
    stats: { hp: 88, attack: 88, speed: 60, defense: 72, magicDefense: 56 }
  },
  {
    id: 12,
    name: 'Trunkster',
    type: 'Grass',
    class: 'Ranger',
    stars: 3,
    passive: 'Catalytic',
    passiveDescription: "When inflicting damage on poisoned targets, deal additional damage.",
    image: '/valerians/trunkster.png',
    stats: { hp: 88, attack: 88, speed: 40, defense: 72, magicDefense: 56 }
  },
  {
    id: 13,
    name: 'Drillpod',
    type: 'Rock',
    class: 'Tank',
    stars: 1,
    passive: 'Activation',
    passiveDescription: "When possessing a shield, restore own health before each action.",
    image: '/valerians/drillpod.png',
    stats: { hp: 96, attack: 72, speed: 80, defense: 96, magicDefense: 48 }
  },
  {
    id: 14,
    name: 'Armordrillo',
    type: 'Rock',
    class: 'Tank',
    stars: 2,
    passive: 'Activation',
    passiveDescription: "When possessing a shield, restore own health before each action.",
    image: '/valerians/armordrillo.png',
    stats: { hp: 96, attack: 72, speed: 60, defense: 96, magicDefense: 48 }
  },
  {
    id: 15,
    name: 'Tridrillatops',
    type: 'Rock',
    class: 'Tank',
    stars: 3,
    passive: 'Activation',
    passiveDescription: "When possessing a shield, restore own health before each action.",
    image: '/valerians/tridrillatops.png',
    stats: { hp: 96, attack: 72, speed: 40, defense: 96, magicDefense: 48 }
  },
  {
    id: 16,
    name: 'Wulfie',
    type: 'Electric',
    class: 'Mage',
    stars: 1,
    passive: 'Adrenaline',
    passiveDescription: "The higher one's own Aura energy, the higher one's critical hit rate.",
    image: '/valerians/wulfie.png',
    stats: { hp: 64, attack: 96, speed: 80, defense: 80, magicDefense: 80 }
  },
  {
    id: 17,
    name: 'Wulfz',
    type: 'Electric',
    class: 'Mage',
    stars: 2,
    passive: 'Adrenaline',
    passiveDescription: "The higher one's own Aura energy, the higher one's critical hit rate.",
    image: '/valerians/wulfz.png',
    stats: { hp: 64, attack: 96, speed: 60, defense: 80, magicDefense: 80 }
  },
  {
    id: 18,
    name: 'Howler',
    type: 'Electric',
    class: 'Mage',
    stars: 3,
    passive: 'Adrenaline',
    passiveDescription: "The higher one's own Aura energy, the higher one's critical hit rate.",
    image: '/valerians/howler.png',
    stats: { hp: 64, attack: 96, speed: 40, defense: 80, magicDefense: 80 }
  },
  {
    id: 19,
    name: 'Dots',
    type: 'Fire',
    class: 'Warrior',
    stars: 1,
    passive: 'Carbonization',
    passiveDescription: "When dealing damage, reduce the target's attack power.",
    image: '/valerians/dots.png',
    stats: { hp: 70, attack: 124, speed: 80, defense: 80, magicDefense: 12 }
  },
  {
    id: 20,
    name: 'Bracketz',
    type: 'Fire',
    class: 'Warrior',
    stars: 2,
    passive: 'Carbonization',
    passiveDescription: "When dealing damage, reduce the target's attack power.",
    image: '/valerians/bracketz.png',
    stats: { hp: 70, attack: 124, speed: 60, defense: 80, magicDefense: 12 }
  },
  {
    id: 21,
    name: 'Krakatoa',
    type: 'Fire',
    class: 'Warrior',
    stars: 3,
    passive: 'Carbonization',
    passiveDescription: "When dealing damage, reduce the target's attack power.",
    image: '/valerians/krakatoa.png',
    stats: { hp: 70, attack: 124, speed: 40, defense: 80, magicDefense: 12 }
  },
  {
    id: 22,
    name: 'Spike',
    type: 'Water',
    class: 'Tank',
    stars: 1,
    passive: 'Water Storage Pouch',
    passiveDescription: "When dealing damage, restore own health; if the target is already frozen restore additional health.",
    image: '/valerians/spike.png',
    stats: { hp: 90, attack: 65, speed: 80, defense: 100, magicDefense: 80 }
  },
  {
    id: 23,
    name: 'Bastion',
    type: 'Water',
    class: 'Tank',
    stars: 2,
    passive: 'Water Storage Pouch',
    passiveDescription: "When dealing damage, restore own health; if the target is already frozen restore additional health.",
    image: '/valerians/bastion.png',
    stats: { hp: 90, attack: 65, speed: 60, defense: 100, magicDefense: 80 }
  },
  {
    id: 24,
    name: 'Terraspike',
    type: 'Water',
    class: 'Tank',
    stars: 3,
    passive: 'Water Storage Pouch',
    passiveDescription: "When dealing damage, restore own health; if the target is already frozen restore additional health.",
    image: '/valerians/terraspike.png',
    stats: { hp: 90, attack: 65, speed: 40, defense: 100, magicDefense: 80 }
  },
  {
    id: 25,
    name: 'Leafy',
    type: 'Grass',
    class: 'Tank',
    stars: 1,
    passive: 'Robust',
    passiveDescription: "When receiving damage, increase one's own maximum health.",
    image: '/valerians/leafy.png',
    stats: { hp: 100, attack: 80, speed: 80, defense: 60, magicDefense: 60 }
  },
  {
    id: 26,
    name: 'Spitzer',
    type: 'Grass',
    class: 'Tank',
    stars: 2,
    passive: 'Robust',
    passiveDescription: "When receiving damage, increase one's own maximum health.",
    image: '/valerians/spitzer.png',
    stats: { hp: 100, attack: 80, speed: 60, defense: 60, magicDefense: 60 }
  },
  {
    id: 27,
    name: 'Llamarama',
    type: 'Grass',
    class: 'Tank',
    stars: 3,
    passive: 'Robust',
    passiveDescription: "When receiving damage, increase one's own maximum health.",
    image: '/valerians/llamarama.png',
    stats: { hp: 100, attack: 80, speed: 40, defense: 60, magicDefense: 60 }
  },
  {
    id: 28,
    name: 'Jiri',
    type: 'Electric',
    class: 'Warrior',
    stars: 1,
    passive: 'Fighting Spirit',
    passiveDescription: "The lower one's own health, the higher the damage dealt during attacks.",
    image: '/valerians/jiri.png',
    stats: { hp: 70, attack: 120, speed: 80, defense: 80, magicDefense: 20 }
  },
  {
    id: 29,
    name: 'Sanjira',
    type: 'Electric',
    class: 'Warrior',
    stars: 2,
    passive: 'Fighting Spirit',
    passiveDescription: "The lower one's own health, the higher the damage dealt during attacks.",
    image: '/valerians/sanjira.png',
    stats: { hp: 70, attack: 120, speed: 60, defense: 80, magicDefense: 20 }
  },
  {
    id: 30,
    name: 'Gigantajira',
    type: 'Electric',
    class: 'Warrior',
    stars: 3,
    passive: 'Fighting Spirit',
    passiveDescription: "The lower one's own health, the higher the damage dealt during attacks.",
    image: '/valerians/gigantajira.png',
    stats: { hp: 70, attack: 120, speed: 40, defense: 80, magicDefense: 20 }
  },
{
    id: 31,
    name: 'Swish',
    type: 'Dark',
    class: 'Support',
    stars: 1,
    passive: 'Smear Mucus',
    passiveDescription: "After healing a target, the target has a chance to gain a physical invulnerability effect.",
    image: '/valerians/swish.png',
    stats: { hp: 80, attack: 100, speed: 80, defense: 60, magicDefense: 60 }
  },
  {
    id: 32,
    name: 'Hoops',
    type: 'Dark',
    class: 'Support',
    stars: 2,
    passive: 'Smear Mucus',
    passiveDescription: "After healing a target, the target has a chance to gain a physical invulnerability effect.",
    image: '/valerians/hoops.png',
    stats: { hp: 80, attack: 100, speed: 60, defense: 60, magicDefense: 60 }
  },
  {
    id: 33,
    name: 'Thrasher',
    type: 'Dark',
    class: 'Support',
    stars: 3,
    passive: 'Smear Mucus',
    passiveDescription: "After healing a target, the target has a chance to gain a physical invulnerability effect.",
    image: '/valerians/thrasher.png',
    stats: { hp: 80, attack: 100, speed: 40, defense: 60, magicDefense: 60 }
  },
  {
    id: 34,
    name: 'Marshmellow',
    type: 'Light',
    class: 'Support',
    stars: 1,
    passive: 'Charisma',
    passiveDescription: "After healing a single target, increase the target's aura energy by an extra amount.",
    image: '/valerians/marshmellow.png',
    stats: { hp: 100, attack: 80, speed: 80, defense: 60, magicDefense: 60 }
  },
  {
    id: 35,
    name: 'Crispy',
    type: 'Light',
    class: 'Support',
    stars: 2,
    passive: 'Charisma',
    passiveDescription: "After healing a single target, increase the target's aura energy by an extra amount.",
    image: '/valerians/crispy.png',
    stats: { hp: 100, attack: 80, speed: 60, defense: 60, magicDefense: 60 }
  },
  {
    id: 36,
    name: 'Casper',
    type: 'Light',
    class: 'Support',
    stars: 3,
    passive: 'Charisma',
    passiveDescription: "After healing a single target, increase the target's aura energy by an extra amount.",
    image: '/valerians/casper.png',
    stats: { hp: 100, attack: 80, speed: 40, defense: 60, magicDefense: 60 }
  },
  {
    id: 37,
    name: 'Jitters',
    type: 'Air',
    class: 'Ranger',
    stars: 1,
    passive: 'Laceration',
    passiveDescription: "When dealing damage to bleeding targets, deal additional damage.",
    image: '/valerians/jitters.png',
    stats: { hp: 80, attack: 100, speed: 80, defense: 60, magicDefense: 60 }
  },
  {
    id: 38,
    name: 'Clemenfly',
    type: 'Air',
    class: 'Ranger',
    stars: 2,
    passive: 'Laceration',
    passiveDescription: "When dealing damage to bleeding targets, deal additional damage.",
    image: '/valerians/clemenfly.png',
    stats: { hp: 80, attack: 100, speed: 60, defense: 60, magicDefense: 60 }
  },
  {
    id: 39,
    name: 'Clemenqueen',
    type: 'Air',
    class: 'Ranger',
    stars: 3,
    passive: 'Laceration',
    passiveDescription: "When dealing damage to bleeding targets, deal additional damage.",
    image: '/valerians/clemenqueen.png',
    stats: { hp: 80, attack: 100, speed: 40, defense: 60, magicDefense: 60 }
  },
  {
    id: 40,
    name: 'Poptoid',
    type: 'Pixie',
    class: 'Support',
    stars: 1,
    passive: 'Life Source',
    passiveDescription: "Before each action, heal the life of one teammate.",
    image: '/valerians/poptoid.png',
    stats: { hp: 80, attack: 75, speed: 80, defense: 85, magicDefense: 85 }
  },
  {
    id: 41,
    name: 'Fillytoid',
    type: 'Pixie',
    class: 'Support',
    stars: 2,
    passive: 'Life Source',
    passiveDescription: "Before each action, heal the life of one teammate.",
    image: '/valerians/fillytoid.png',
    stats: { hp: 80, attack: 75, speed: 60, defense: 85, magicDefense: 85 }
  },
  {
    id: 42,
    name: 'Eternatoid',
    type: 'Pixie',
    class: 'Support',
    stars: 3,
    passive: 'Life Source',
    passiveDescription: "Before each action, heal the life of one teammate.",
    image: '/valerians/eternatoid.png',
    stats: { hp: 80, attack: 75, speed: 40, defense: 85, magicDefense: 85 }
  },
  {
    id: 43,
    name: 'Iggy',
    type: 'Metal',
    class: 'Warrior',
    stars: 1,
    passive: 'Internal Injury',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/iggy.png',
    stats: { hp: 85, attack: 85, speed: 80, defense: 70, magicDefense: 70 }
  },
  {
    id: 44,
    name: 'Drazil',
    type: 'Metal',
    class: 'Warrior',
    stars: 2,
    passive: 'Internal Injury',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/drazil.png',
    stats: { hp: 85, attack: 85, speed: 60, defense: 70, magicDefense: 70 }
  },
  {
    id: 45,
    name: 'Overlordz',
    type: 'Metal',
    class: 'Warrior',
    stars: 3,
    passive: 'Internal Injury',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/overlordz.png',
    stats: { hp: 85, attack: 85, speed: 40, defense: 70, magicDefense: 70 }
  },
  {
    id: 46,
    name: 'Scout',
    type: 'Rock',
    class: 'Warrior',
    stars: 1,
    passive: 'Torn Tendons',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/scout.png',
    stats: { hp: 84, attack: 89, speed: 80, defense: 74, magicDefense: 60 }
  },
  {
    id: 47,
    name: 'Crash',
    type: 'Rock',
    class: 'Warrior',
    stars: 2,
    passive: 'Torn Tendons',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/crash.png',
    stats: { hp: 84, attack: 89, speed: 60, defense: 74, magicDefense: 60 }
  },
  {
    id: 48,
    name: 'Rampage',
    type: 'Rock',
    class: 'Warrior',
    stars: 3,
    passive: 'Torn Tendons',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/rampage.png',
    stats: { hp: 84, attack: 89, speed: 40, defense: 74, magicDefense: 60 }
  },
  {
    id: 49,
    name: 'Ooga',
    type: 'Metal',
    class: 'Tank',
    stars: 1,
    passive: 'Thorny hairs',
    passiveDescription: "When receiving damage, inflict damage on enemy target.",
    image: '/valerians/ooga.png',
    stats: { hp: 100, attack: 90, speed: 80, defense: 50, magicDefense: 50 }
  },
  {
    id: 50,
    name: 'Babooga',
    type: 'Metal',
    class: 'Tank',
    stars: 2,
    passive: 'Thorny hairs',
    passiveDescription: "When receiving damage, inflict damage on enemy target.",
    image: '/valerians/babooga.png',
    stats: { hp: 100, attack: 90, speed: 60, defense: 50, magicDefense: 50 }
  },
  {
    id: 51,
    name: 'Gorooga',
    type: 'Metal',
    class: 'Tank',
    stars: 3,
    passive: 'Thorny hairs',
    passiveDescription: "When receiving damage, inflict damage on enemy target.",
    image: '/valerians/gorooga.png',
    stats: { hp: 100, attack: 90, speed: 40, defense: 50, magicDefense: 50 }
  },
  {
    id: 52,
    name: 'Nocturnix',
    type: 'Light',
    class: 'Support',
    stars: 1,
    passive: 'Full of Energy',
    passiveDescription: "When directly healing a target, add a speed boost effect.",
    image: '/valerians/nocturnix.png',
    stats: { hp: 80, attack: 80, speed: 80, defense: 80, magicDefense: 80 }
  },
  {
    id: 53,
    name: 'Aeluris',
    type: 'Light',
    class: 'Support',
    stars: 2,
    passive: 'Full of Energy',
    passiveDescription: "When directly healing a target, add a speed boost effect.",
    image: '/valerians/aeluris.png',
    stats: { hp: 80, attack: 80, speed: 60, defense: 80, magicDefense: 80 }
  },
  {
    id: 54,
    name: 'Hootemus',
    type: 'Light',
    class: 'Support',
    stars: 3,
    passive: 'Full of Energy',
    passiveDescription: "When directly healing a target, add a speed boost effect.",
    image: '/valerians/hootemus.png',
    stats: { hp: 80, attack: 80, speed: 40, defense: 80, magicDefense: 80 }
  },
  {
    id: 55,
    name: 'Ursloth',
    type: 'Dark',
    class: 'Tank',
    stars: 1,
    passive: 'Hard',
    passiveDescription: "Reduce physical damage taken by oneself.",
    image: '/valerians/ursloth.png',
    stats: { hp: 100, attack: 90, speed: 80, defense: 60, magicDefense: 40 }
  },
  {
    id: 56,
    name: 'Grizwald',
    type: 'Dark',
    class: 'Tank',
    stars: 2,
    passive: 'Hard',
    passiveDescription: "Reduce physical damage taken by oneself.",
    image: '/valerians/grizwald.png',
    stats: { hp: 100, attack: 90, speed: 60, defense: 60, magicDefense: 40 }
  },
  {
    id: 57,
    name: 'Hibernon',
    type: 'Dark',
    class: 'Tank',
    stars: 3,
    passive: 'Hard',
    passiveDescription: "Reduce physical damage taken.",
    image: '/valerians/hibernon.png',
    stats: { hp: 100, attack: 90, speed: 40, defense: 60, magicDefense: 40 }
  },
  {
    id: 58,
    name: 'Astrimis',
    type: 'Light',
    class: 'Tank',
    stars: 1,
    passive: 'Insulator',
    passiveDescription: "Reduce magical damage taken.",
    image: '/valerians/astrimis.png',
    stats: { hp: 80, attack: 80, speed: 80, defense: 80, magicDefense: 80 }
  },
  {
    id: 59,
    name: 'Xenorin',
    type: 'Light',
    class: 'Tank',
    stars: 2,
    passive: 'Insulator',
    passiveDescription: "Reduce magical damage taken.",
    image: '/valerians/xenorin.png',
    stats: { hp: 80, attack: 80, speed: 60, defense: 80, magicDefense: 80 }
  },
  {
    id: 60,
    name: 'Novellus',
    type: 'Light',
    class: 'Tank',
    stars: 3,
    passive: 'Insulator',
    passiveDescription: "Reduce magical damage taken.",
    image: '/valerians/novellus.png',
    stats: { hp: 80, attack: 80, speed: 40, defense: 80, magicDefense: 80 }
  },
  {
    id: 61,
    name: 'Azurgon',
    type: 'Water',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Water',
    passiveDescription: "While on the field, increase all water-attribute damage dealt by allied valerians",
    image: '/valerians/azurgon.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
{
    id: 62,
    name: 'Obsidian',
    type: 'Electric',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Electricity',
    passiveDescription: "While on the field, increase all electric-attribute damage dealt by allied valerians",
    image: '/valerians/obsidian.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 63,
    name: 'Silvanus',
    type: 'Grass',
    class: 'Support',
    stars: 4,
    passive: 'Spirit of Grass',
    passiveDescription: "While on the field, increase all grass-attribute damage dealt by allied valerians",
    image: '/valerians/silvanus.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 64,
    name: 'Dardanos',
    type: 'Rock',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Earth',
    passiveDescription: "While on the field, increase all earth-attribute damage dealt by allied valerians",
    image: '/valerians/dardanos.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 65,
    name: 'Shrapnel',
    type: 'Metal',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Steel',
    passiveDescription: "While on the field, increase all steel-attribute damage dealt by allied valerians",
    image: '/valerians/shrapnel.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 66,
    name: 'Kreios',
    type: 'Fire',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Fire',
    passiveDescription: "While on the field, increase all fire-attribute damage dealt by allied valerians",
    image: '/valerians/kreios.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 67,
    name: 'Gryphora',
    type: 'Air',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Wind',
    passiveDescription: "While on the field, increase all wind-attribute damage dealt by allied valerians",
    image: '/valerians/gryphora.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 68,
    name: 'Lirio',
    type: 'Pixie',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Pixie',
    passiveDescription: "While on the field, increase all fairy-attribute damage dealt by allied valerians",
    image: '/valerians/lirio.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 69,
    name: 'Zythra',
    type: 'Dark',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Darkness',
    passiveDescription: "While on the field, increase all dark-attribute damage dealt by allied valerians",
    image: '/valerians/zythra.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  },
  {
    id: 70,
    name: 'Luminous',
    type: 'Light',
    class: 'Warrior',
    stars: 4,
    passive: 'Spirit of Light',
    passiveDescription: "While on the field, increase all light-attribute damage dealt by allied valerians",
    image: '/valerians/luminous.png',
    stats: { hp: 100, attack: 100, speed: 80, defense: 100, magicDefense: 100 }
  }
]