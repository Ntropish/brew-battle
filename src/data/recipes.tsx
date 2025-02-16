import { IngredientKey } from "./ingredients";

// const ingredientKeys = [
//     "mandrake-root",
//     "nightshade-berries",
//     "valerian-root",
//     "yarrow",
//     "wolfsbane",
//     "mugwort",
//     "foxglove",
//     "st-john-wort",
// ]

type Recipe = {
  name: string;
  description: string;
  baseValue: number;
  ingredients: IngredientKey[];
  requirements: {
    cauldron: number;
    brewingStand: number;
    alchemyTable: number;
  };
  appearance: {
    hue: number;
    saturation: number;
    brightness: number;
    opacity: number;
    emissive: number;
  };
};

export const recipeMap: Record<string, Recipe> = {
  "healing-potion": {
    name: "Healing Potion",
    description:
      "A potion that heals wounds and restores health. Made with Yarrow and Valerian Root.",
    baseValue: 50,
    ingredients: ["yarrow", "valerian-root"],
    requirements: {
      cauldron: 1,
      brewingStand: 0,
      alchemyTable: 0,
    },
    appearance: {
      hue: 120,
      saturation: 0.5,
      brightness: 0.8,
      opacity: 0.9,
      emissive: 0.2,
    },
  },
  "mana-potion": {
    name: "Mana Potion",
    description:
      "A potion that restores mana and magical energy. Made with Mandrake Root and Mugwort.",
    baseValue: 60,
    ingredients: ["mandrake-root", "mugwort"],
    requirements: {
      cauldron: 1,
      brewingStand: 0,
      alchemyTable: 1,
    },
    appearance: {
      hue: 240,
      saturation: 0.5,
      brightness: 0.8,
      opacity: 0.9,
      emissive: 0.2,
    },
  },
  "strength-potion": {
    name: "Strength Potion",
    description:
      "A potion that increases physical strength. Made with Wolfsbane and Nightshade Berries.",
    baseValue: 70,
    ingredients: ["wolfsbane", "nightshade-berries"],
    requirements: {
      cauldron: 1,
      brewingStand: 2,
      alchemyTable: 1,
    },
    appearance: {
      hue: 0,
      saturation: 0.5,
      brightness: 0.8,
      opacity: 0.9,
      emissive: 0.2,
    },
  },
  "invisibility-potion": {
    name: "Invisibility Potion",
    description:
      "A potion that grants temporary invisibility. Made with Foxglove and St. John’s Wort.",
    baseValue: 80,
    ingredients: ["foxglove", "st-john-wort"],
    requirements: {
      cauldron: 2,
      brewingStand: 2,
      alchemyTable: 3,
    },
    appearance: {
      hue: 300,
      saturation: 0.5,
      brightness: 0.8,
      opacity: 0.9,
      emissive: 0.2,
    },
  },
};

export type RecipeKey = keyof typeof recipeMap;

export const recipeKeys = Object.keys(recipeMap) as [RecipeKey, ...RecipeKey[]];
