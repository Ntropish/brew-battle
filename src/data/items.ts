import { z } from "zod";
import { BrewSize } from "./brew";

type Consumable = {
  name: string;
  description: string;
  baseValue: number;
};

export const itemKeySchema = z.enum([
  "small-bottle",
  "medium-bottle",
  "large-bottle",
]);

export const bottleItemKeyByBrewSize: Record<BrewSize, ItemKey> = {
  1: "small-bottle",
  3: "medium-bottle",
  7: "large-bottle",
};

export const itemKeys = itemKeySchema.options as [ItemKey, ...ItemKey[]];

export type ItemKey = z.infer<typeof itemKeySchema>;

export const itemMap: Record<string, Consumable> = {
  "small-bottle": {
    name: "Small Bottle",
    description: "A small bottle for holding potions and liquids.",
    baseValue: 1,
  },
  "medium-bottle": {
    name: "Medium Bottle",
    description: "A medium bottle for holding potions and liquids.",
    baseValue: 3,
  },
  "large-bottle": {
    name: "Large Bottle",
    description: "A large bottle for holding potions and liquids.",
    baseValue: 5,
  },
};
