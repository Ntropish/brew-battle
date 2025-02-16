// - Mandrake Root
// - Nightshade Berries
// - Valerian Root
// - Yarrow
// - Wolfsbane
// - Mugwort
// - Foxglove
// - St. John’s Wort

type Ingredient = {
  name: string;
  description: string;
  baseValue: number;
};

export const ingredientMap: Record<string, Ingredient> = {
  "mandrake-root": {
    name: "Mandrake Root",
    description:
      "A root with magical properties, often used in potions and spells.",
    baseValue: 10,
  },
  "nightshade-berries": {
    name: "Nightshade Berries",
    description: "Poisonous berries that can be used to create deadly potions.",
    baseValue: 15,
  },
  "valerian-root": {
    name: "Valerian Root",
    description:
      "A root known for its calming effects, often used in sleep potions.",
    baseValue: 8,
  },
  yarrow: {
    name: "Yarrow",
    description:
      "A herb with healing properties, often used in potions to cure ailments.",
    baseValue: 5,
  },
  wolfsbane: {
    name: "Wolfsbane",
    description:
      "A poisonous plant that can be used to create powerful potions.",
    baseValue: 20,
  },
  mugwort: {
    name: "Mugwort",
    description:
      "An herb known for its dream-enhancing properties, often used in sleep potions.",
    baseValue: 7,
  },
  foxglove: {
    name: "Foxglove",
    description:
      "A beautiful but poisonous flower that can be used in potions.",
    baseValue: 12,
  },
  "st-john-wort": {
    name: "St. John’s Wort",
    description:
      "An herb known for its mood-lifting properties, often used in potions to enhance well-being.",
    baseValue: 6,
  },
};

export type IngredientKey = keyof typeof ingredientMap;

export const ingredientKeys = Object.keys(ingredientMap) as [
  IngredientKey,
  ...IngredientKey[]
];
