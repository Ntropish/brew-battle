type Consumable = {
  name: string;
  description: string;
  baseValue: number;
};

export const consumableMap: Record<string, Consumable> = {
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

export type ConsumableKey = keyof typeof consumableMap;

export type ItemKey = ConsumableKey;
