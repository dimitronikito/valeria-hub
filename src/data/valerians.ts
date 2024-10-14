export interface Valerian {
  id: number;
  name: string;
  type: string;
  class: string;
  stars: number;
  passive: string;
  passiveDescription: string;
  image: string;
}

export const valerians = [
  {
    id: 1,
    name: 'Kuuko',
    type: 'Fire',
    class: 'Mage',
    stars: 1,
    passive: 'Flammable',
    passiveDescription: "When dealing critical hits, set the target ablaze.",
    image: '/valerians/kuuko.png'
  },
    {
    id: 2,
    name: 'Kuukoro',
    type: 'Fire',
    class: 'Mage',
    stars: 2,
    passive: 'Flammable',
    passiveDescription: "When dealing critical hits, set the target ablaze.",
    image: '/valerians/kuukoro.png'
  },
    {
    id: 3,
    name: 'Shinkuukoro',
    type: 'Fire',
    class: 'Mage',
    stars: 3,
    passive: 'Flammable',
    passiveDescription: "When dealing critical hits, set the target ablaze.",
    image: '/valerians/shinkuukoro.png'
  },
    {
    id: 4,
    name: 'Voltail',
    type: 'Electric',
    class: 'Tank',
    stars: 1,
    passive: 'Electrified Skin',
    passiveDescription: "When receiving damage, there is a probability to inflict paralysis on the target.",
    image: '/valerians/voltail.png'
  },
    {
    id: 5,
    name: 'Voltwin',
    type: 'Electric',
    class: 'Tank',
    stars: 2,
    passive: 'Electrified Skin',
    passiveDescription: "When receiving damage, there is a probability to inflict paralysis on the target.",
    image: '/valerians/voltwin.png'
  },
    {
    id: 6,
    name: 'Voltra',
    type: 'Electric',
    class: 'Tank',
    stars: 3,
    passive: 'Electrified Skin',
    passiveDescription: "When receiving damage, there is a probability to inflict paralysis on the target.",
    image: '/valerians/voltra.png'
  },
  {
    id: 7,
    name: 'Ponsea',
    type: 'Water',
    class: 'Support',
    stars: 1,
    passive: 'Recovery',
    passiveDescription: "After healing a target, increase the healing effect received by the target.",
    image: '/valerians/ponsea.png'
  },
    {
    id: 8,
    name: 'Steedsea',
    type: 'Water',
    class: 'Support',
    stars: 2,
    passive: 'Recovery',
    passiveDescription: "After healing a target, increase the healing effect received by the target.",
    image: '/valerians/steedsea.png'
  },
    {
    id: 9,
    name: 'Pegasea',
    type: 'Water',
    class: 'Support',
    stars: 3,
    passive: 'Recovery',
    passiveDescription: "After healing a target, increase the healing effect received by the target.",
    image: '/valerians/pegasea.png'
  },
    {
    id: 10,
    name: 'Twiggy',
    type: 'Grass',
    class: 'Ranger',
    stars: 1,
    passive: 'Catalytic',
    passiveDescription: "When inflicting damage on poisoned targets, deal addtional damage.",
    image: '/valerians/twiggy.png'
  },
    {
    id: 11,
    name: 'Branchy',
    type: 'Grass',
    class: 'Ranger',
    stars: 2,
    passive: 'Catalytic',
    passiveDescription: "When inflicting damage on poisoned targets, deal addtional damage.",
    image: '/valerians/branchy.png'
  },
    {
    id: 12,
    name: 'Trunkster',
    type: 'Grass',
    class: 'Ranger',
    stars: 3,
    passive: 'Catalytic',
    passiveDescription: "When inflicting damage on poisoned targets, deal addtional damage.",
    image: '/valerians/trunkster.png'
  },
    {
    id: 13,
    name: 'Drillpod',
    type: 'Earth',
    class: 'Tank',
    stars: 1,
    passive: 'Activation',
    passiveDescription: "When possessing a shield, restore own health before each action.",
    image: '/valerians/drillpod.png'
  },
  {
    id: 14,
    name: 'Armordrillo',
    type: 'Earth',
    class: 'Tank',
    stars: 2,
    passive: 'Activation',
    passiveDescription: "When possessing a shield, restore own health before each action.",
    image: '/valerians/armordrillo.png'
  },
  {
    id: 15,
    name: 'Tridrillatops',
    type: 'Earth',
    class: 'Tank',
    stars: 3,
    passive: 'Activation',
    passiveDescription: "When possessing a shield, restore own health before each action.",
    image: '/valerians/tridrillatops.png'
  },
  {
    id: 16,
    name: 'Wulfie',
    type: 'Electric',
    class: 'Mage',
    stars: 1,
    passive: 'Adrenaline',
    passiveDescription: "The higher one's own Aura energy, the higher one's critical hit rate.",
    image: '/valerians/wulfie.png'
  },
    {
    id: 17,
    name: 'Wulfz',
    type: 'Electric',
    class: 'Mage',
    stars: 2,
    passive: 'Adrenaline',
    passiveDescription: "The higher one's own Aura energy, the higher one's critical hit rate.",
    image: '/valerians/wulfz.png'
  },
  {
    id: 18,
    name: 'Howler',
    type: 'Electric',
    class: 'Mage',
    stars: 3,
    passive: 'Adrenaline',
    passiveDescription: "The higher one's own Aura energy, the higher one's critical hit rate.",
    image: '/valerians/howler.png'
  },
    {
    id: 19,
    name: 'Dots',
    type: 'Fire',
    class: 'Warrior',
    stars: 1,
    passive: 'Carbonization',
    passiveDescription: "When dealing damage, reuce the target's attack power.",
    image: '/valerians/dots.png'
  },
  {
    id: 20,
    name: 'Bracketz',
    type: 'Fire',
    class: 'Warrior',
    stars: 2,
    passive: 'Carbonization',
    passiveDescription: "When dealing damage, reuce the target's attack power.",
    image: '/valerians/bracketz.png'
  },
    {
    id: 21,
    name: 'Krakatoa',
    type: 'Fire',
    class: 'Warrior',
    stars: 3,
    passive: 'Carbonization',
    passiveDescription: "When dealing damage, reuce the target's attack power.",
    image: '/valerians/krakatoa.png'
  },
  {
    id: 22,
    name: 'Spike',
    type: 'Water',
    class: 'Tank',
    stars: 1,
    passive: 'Water Storage Pouch',
    passiveDescription: "When dealing damage, restore own health; if the target is already frozen resore additional health.",
    image: '/valerians/spike.png'
  },
    {
    id: 23,
    name: 'Bastion',
    type: 'Water',
    class: 'Tank',
    stars: 2,
    passive: 'Water Storage Pouch',
    passiveDescription: "When dealing damage, restore own health; if the target is already frozen resore additional health.",
    image: '/valerians/bastion.png'
  },
  {
    id: 24,
    name: 'Terraspike',
    type: 'Water',
    class: 'Tank',
    stars: 3,
    passive: 'Water Storage Pouch',
    passiveDescription: "When dealing damage, restore own health; if the target is already frozen resore additional health.",
    image: '/valerians/terraspike.png'
  },
  {
    id: 25,
    name: 'Leafy',
    type: 'Grass',
    class: 'Tank',
    stars: 1,
    passive: 'Robust',
    passiveDescription: "When receiving damage, increase one's own maximum health.",
    image: '/valerians/bastion.png'
  },
    {
    id: 26,
    name: 'Spitzer',
    type: 'Grass',
    class: 'Tank',
    stars: 2,
    passive: 'Robust',
    passiveDescription: "When receiving damage, increase one's own maximum health.",
    image: '/valerians/spitzer.png'
  },
    {
    id: 27,
    name: 'Llamarama',
    type: 'Grass',
    class: 'Tank',
    stars: 3,
    passive: 'Robust',
    passiveDescription: "When receiving damage, increase one's own maximum health.",
    image: '/valerians/llamarama.png'
  },
    {
    id: 28,
    name: 'Jiri',
    type: 'Electric',
    class: 'Warrior',
    stars: 1,
    passive: 'Fighting Spirit',
    passiveDescription: "The lower one's own health, the higher the damage dealt during attacks.",
    image: '/valerians/jiri.png'
  },
      {
    id: 29,
    name: 'Sanjira',
    type: 'Electric',
    class: 'Warrior',
    stars: 2,
    passive: 'Fighting Spirit',
    passiveDescription: "The lower one's own health, the higher the damage dealt during attacks.",
    image: '/valerians/sanjira.png'
  },
  {
    id: 30,
    name: 'Gigantajira',
    type: 'Electric',
    class: 'Warrior',
    stars: 3,
    passive: 'Fighting Spirit',
    passiveDescription: "The lower one's own health, the higher the damage dealt during attacks.",
    image: '/valerians/gigantajira.png'
  },
      {
    id: 31,
    name: 'Swish',
    type: 'Dark',
    class: 'Support',
    stars: 1,
    passive: 'Smear Mucus',
    passiveDescription: "After healing a target, the target has a chance to gain a physical invulnerability effect.",
    image: '/valerians/swish.png'
  },
    {
    id: 32,
    name: 'Hoops',
    type: 'Dark',
    class: 'Support',
    stars: 2,
    passive: 'Smear Mucus',
    passiveDescription: "After healing a target, the target has a chance to gain a physical invulnerability effect.",
    image: '/valerians/hoops.png'
  },
    {
    id: 33,
    name: 'Thrasher',
    type: 'Dark',
    class: 'Support',
    stars: 3,
    passive: 'Smear Mucus',
    passiveDescription: "After healing a target, the target has a chance to gain a physical invulnerability effect.",
    image: '/valerians/thrasher.png'
  },
      {
    id: 34,
    name: 'Marshmellow',
    type: 'Light',
    class: 'Support',
    stars: 1,
    passive: 'Charisma',
    passiveDescription: "After healing a single target, increase the target's aura energy by an extra amount.",
    image: '/valerians/marshmellow.png'
  },
    {
    id: 35,
    name: 'Crispy',
    type: 'Light',
    class: 'Support',
    stars: 2,
    passive: 'Charisma',
    passiveDescription: "After healing a single target, increase the target's aura energy by an extra amount.",
    image: '/valerians/crispy.png'
  },
    {
    id: 36,
    name: 'Casper',
    type: 'Light',
    class: 'Support',
    stars: 3,
    passive: 'Charisma',
    passiveDescription: "After healing a single target, increase the target's aura energy by an extra amount.",
    image: '/valerians/casper.png'
  },
  {
    id: 37,
    name: 'Jitters',
    type: 'Wind',
    class: 'Ranger',
    stars: 1,
    passive: 'Laceration',
    passiveDescription: "When dealing daamge to bleeding targets, deal additional damage.",
    image: '/valerians/jitters.png'
  },
    {
    id: 38,
    name: 'Clemenfly',
    type: 'Wind',
    class: 'Ranger',
    stars: 2,
    passive: 'Laceration',
    passiveDescription: "When dealing daamge to bleeding targets, deal additional damage.",
    image: '/valerians/clemenfly.png'
  },
    {
    id: 39,
    name: 'Clemenqueen',
    type: 'Wind',
    class: 'Ranger',
    stars: 1,
    passive: 'Laceration',
    passiveDescription: "When dealing daamge to bleeding targets, deal additional damage.",
    image: '/valerians/clemenqueen.png'
  },
    {
    id: 40,
    name: 'Poptoid',
    type: 'Fairy',
    class: 'Support',
    stars: 1,
    passive: 'Life Source',
    passiveDescription: "Before each action, heal the life of one teamate.",
    image: '/valerians/poptoid.png'
  },
      {
    id: 41,
    name: 'Fillytoid',
    type: 'Fairy',
    class: 'Support',
    stars: 2,
    passive: 'Life Source',
    passiveDescription: "Before each action, heal the life of one teamate.",
    image: '/valerians/fillytoid.png'
  },
      {
    id: 42,
    name: 'Eternatoid',
    type: 'Fairy',
    class: 'Support',
    stars: 3,
    passive: 'Life Source',
    passiveDescription: "Before each action, heal the life of one teamate.",
    image: '/valerians/eternatoid.png'
  },
      {
    id: 43,
    name: 'Iggy',
    type: 'Steel',
    class: 'Warrior',
    stars: 1,
    passive: 'Internal Injury',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/iggy.png'
  },
      {
    id: 44,
    name: 'Drazil',
    type: 'Steel',
    class: 'Warrior',
    stars: 2,
    passive: 'Internal Injury',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/drazil.png'
  },
        {
    id: 45,
    name: 'Overlordz',
    type: 'Steel',
    class: 'Warrior',
    stars: 3,
    passive: 'Internal Injury',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/overlordz.png'
  },
        {
    id: 46,
    name: 'Scout',
    type: 'Earth',
    class: 'Warrior',
    stars: 1,
    passive: 'Torn Tendons',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/scout.png'
  },
          {
    id: 47,
    name: 'Crash',
    type: 'Earth',
    class: 'Warrior',
    stars: 2,
    passive: 'Torn Tendons',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/crash.png'
  },
  {
    id: 48,
    name: 'Rampage',
    type: 'Earth',
    class: 'Warrior',
    stars: 3,
    passive: 'Torn Tendons',
    passiveDescription: "When dealing damage, there is a chance to slow down the target.",
    image: '/valerians/rampage.png'
  },
  {
    id: 49,
    name: 'Ooga',
    type: 'Steel',
    class: 'Tank',
    stars: 1,
    passive: 'Thorny hairs',
    passiveDescription: "When receiving damage, inflict damage on enemy target.",
    image: '/valerians/ooga.png'
  },
    {
    id: 50,
    name: 'Babooga',
    type: 'Steel',
    class: 'Tank',
    stars: 2,
    passive: 'Thorny hairs',
    passiveDescription: "When receiving damage, inflict damage on enemy target.",
    image: '/valerians/babooga.png'
  },
    {
    id: 51,
    name: 'Gorooga',
    type: 'Steel',
    class: 'Tank',
    stars: 3,
    passive: 'Thorny hairs',
    passiveDescription: "When receiving damage, inflict damage on enemy target.",
    image: '/valerians/gorooga.png'
  },
    {
    id: 52,
    name: 'Nocturnix',
    type: 'Light',
    class: 'Support',
    stars: 1,
    passive: 'Full of Energy',
    passiveDescription: "When directly healing a target, add a speed boost effect.",
    image: '/valerians/nocturnix.png'
  },
      {
    id: 53,
    name: 'Aeluris',
    type: 'Light',
    class: 'Support',
    stars: 2,
    passive: 'Full of Energy',
    passiveDescription: "When directly healing a target, add a speed boost effect.",
    image: '/valerians/aeluris.png'
  },
      {
    id: 54,
    name: 'Hootemus',
    type: 'Light',
    class: 'Support',
    stars: 3,
    passive: 'Full of Energy',
    passiveDescription: "When directly healing a target, add a speed boost effect.",
    image: '/valerians/hootemus.png'
  },
        {
    id: 55,
    name: 'Ursloth',
    type: 'Dark',
    class: 'Tank',
    stars: 1,
    passive: 'Hard',
    passiveDescription: "Reduce physical damage taken by oneself.",
    image: '/valerians/ursloth.png'
  },
          {
    id: 56,
    name: 'Grizwald',
    type: 'Dark',
    class: 'Tank',
    stars: 2,
    passive: 'Hard',
    passiveDescription: "Reduce physical damage taken by oneself.",
    image: '/valerians/grizwald.png'
  },
      {
    id: 57,
    name: 'Hibernon',
    type: 'Dark',
    class: 'Tank',
    stars: 3,
    passive: 'Hard',
    passiveDescription: "Reduce physical damage taken.",
    image: '/valerians/hibernon.png'
  },
  {
    id: 58,
    name: 'Astrimis',
    type: 'Light',
    class: 'Tank',
    stars: 1,
    passive: 'Insulator',
    passiveDescription: "Reduce magical damage taken.",
    image: '/valerians/astrimis.png'
  },
  {
    id: 59,
    name: 'Xenorin',
    type: 'Light',
    class: 'Tank',
    stars: 2,
    passive: 'Insulator',
    passiveDescription: "Reduce magical damage taken.",
    image: '/valerians/xenorin.png'
  },
  {
    id: 60,
    name: 'Novellus',
    type: 'Light',
    class: 'Tank',
    stars: 3,
    passive: 'Insulator',
    passiveDescription: "Reduce magical damage taken.",
    image: '/valerians/novellus.png'
  },
  {
    id: 61,
    name: 'Azurgon',
    type: 'Water',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Water',
    passiveDescription: "While on the field, increase all water-attribute damage dealt by allied valerians",
    image: '/valerians/azurgon.png'
  },
    {
    id: 62,
    name: 'Obsidian',
    type: 'Electric',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Electricity',
    passiveDescription: "While on the field, increase all electic-attribute damage dealt by allied valerians",
    image: '/valerians/obsidian.png'
  },
    {
    id: 63,
    name: 'Silvanus',
    type: 'Grass',
    class: 'Support',
    stars: 4,
    passive: 'Spirit of Grass',
    passiveDescription: "While on the field, increase all grass-attribute damage dealt by allied valerians",
    image: '/valerians/silvanus.png'
  },
    {
    id: 64,
    name: 'Dardanos',
    type: 'Earth',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Earth',
    passiveDescription: "While on the field, increase all earth-attribute damage dealt by allied valerians",
    image: '/valerians/dardanos.png'
  },
    {
    id: 65,
    name: 'Shrapnel',
    type: 'Steel',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Steel',
    passiveDescription: "While on the field, increase all steel-attribute damage dealt by allied valerians",
    image: '/valerians/shrapnel.png'
  },
    {
    id: 66,
    name: 'Kreios',
    type: 'Fire',
    class: 'Ranger',
    stars: 4,
    passive: 'Spirit of Fire',
    passiveDescription: "While on the field, increase all fire-attribute damage dealt by allied valerians",
    image: '/valerians/kreios.png'
  },
    {
    id: 67,
    name: 'Gryphora',
    type: 'Wind',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Wind',
    passiveDescription: "While on the field, increase all wind-attribute damage dealt by allied valerians",
    image: '/valerians/gryphora.png'
  },
    {
    id: 68,
    name: 'Lirio',
    type: 'Fairy',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Fairy',
    passiveDescription: "While on the field, increase all fairy-attribute damage dealt by allied valerians",
    image: '/valerians/lirio.png'
  },
    {
    id: 69,
    name: 'Zythra',
    type: 'Dark',
    class: 'Mage',
    stars: 4,
    passive: 'Spirit of Darkness',
    passiveDescription: "While on the field, increase all dark-attribute damage dealt by allied valerians",
    image: '/valerians/zythra.png'
  },
    {
    id: 70,
    name: 'Luminous',
    type: 'Light',
    class: 'Warrior',
    stars: 4,
    passive: 'Spirit of Light',
    passiveDescription: "While on the field, increase all light-attribute damage dealt by allied valerians",
    image: '/valerians/luminous.png'
  },
]