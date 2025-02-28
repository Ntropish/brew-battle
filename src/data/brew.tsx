import { z } from "zod";
import { IngredientKey } from "./ingredients";
import { EquipmentKey } from "./equipment";

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

// export const brewKeys = [
//   "healing-potion",
//   "mana-potion",
//   "strength-potion",
//   "invisibility-potion",
// ];

export const brewKeySchema = z.enum([
  "healing-potion",
  "mana-potion",
  "strength-potion",
  "invisibility-potion",
]);

export const brewKeys = brewKeySchema.options as [BrewKey, ...BrewKey[]];

export type BrewKey = z.infer<typeof brewKeySchema>;

// export type BrewSize = 1 | 3 | 7;

export const brewSizeSchema = z.enum(["1", "3", "7"]);

export type BrewSize = z.infer<typeof brewSizeSchema>;

export const brewSizeNameMap: Record<BrewSize, string> = {
  1: "Small",
  3: "Medium",
  7: "Large",
};

export const brewSizeAbbreviationMap: Record<BrewSize, string> = {
  1: "S",
  3: "M",
  7: "L",
};

export type BrewRecipe = {
  name: string;
  description: string;
  ingredients: Record<IngredientKey, number>;
  equipment: Record<EquipmentKey, boolean>;
  appearance: {
    hue: number;
    saturation: number;
    brightness: number;
    opacity: number;
    emissive: number;
  };
};

export const recipeMap: Record<string, BrewRecipe> = {
  "healing-potion": {
    name: "Healing Potion",
    description:
      "A potion that heals wounds and restores health. Made with Yarrow and Valerian Root.",
    ingredients: {
      yarrow: 1,
      "valerian-root": 1,
    },
    equipment: {
      cauldron: true,
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
    ingredients: {
      "mandrake-root": 1,
      mugwort: 1,
    },
    equipment: {
      cauldron: true,
      brewingStand: true,
      alchemyTable: true,
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

    ingredients: {
      wolfsbane: 1,
      "nightshade-berries": 1,
    },
    equipment: {
      cauldron: true,
      brewingStand: true,
      alchemyTable: true,
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

    ingredients: {
      foxglove: 1,
      "st-john-wort": 1,
    },
    equipment: {
      cauldron: true,
      brewingStand: true,
      alchemyTable: true,
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

export const KEY_1 = "KEY_1";
export const KEY_2 = "KEY_2";
export const KEY_3 = "KEY_3";
export const KEY_4 = "KEY_4";
export const KEY_5 = "KEY_5";
export const KEY_6 = "KEY_6";
export const KEY_7 = "KEY_7";

const keyList = [KEY_1, KEY_2, KEY_3, KEY_4, KEY_5, KEY_6, KEY_7] as const;

export type KeyString = (typeof keyList)[number];

export type RecipeKey = keyof typeof recipeMap;
