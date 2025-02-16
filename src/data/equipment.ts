type EquipmentLevel = {
  name: string;
  description: string;
  baseCost: number;
};
type Equipment = {
  name: string;
  levels: Record<number, EquipmentLevel>;
};

export const equipmentMap: Record<string, Equipment> = {
  cauldron: {
    name: "Cauldron",
    levels: {
      0: {
        name: "Cauldron",
        description: "A basic cauldron for brewing potions.",
        baseCost: 0,
      },
      1: {
        name: "Improved Cauldron",
        description: "An improved cauldron for brewing potions.",
        baseCost: 20,
      },
      2: {
        name: "Advanced Cauldron",
        description: "An advanced cauldron for brewing potions.",
        baseCost: 30,
      },
    },
  },
  "brewing-stand": {
    name: "Brewing Stand",
    levels: {
      0: {
        name: "Brewing Stand",
        description: "A basic brewing stand for brewing potions.",
        baseCost: 0,
      },
      1: {
        name: "Improved Brewing Stand",
        description: "An improved brewing stand for brewing potions.",
        baseCost: 20,
      },
      2: {
        name: "Advanced Brewing Stand",
        description: "An advanced brewing stand for brewing potions.",
        baseCost: 30,
      },
    },
  },
  "alchemy-table": {
    name: "Alchemy Table",
    levels: {
      0: {
        name: "Alchemy Table",
        description: "A basic alchemy table for brewing potions.",
        baseCost: 0,
      },
      1: {
        name: "Improved Alchemy Table",
        description: "An improved alchemy table for brewing potions.",
        baseCost: 20,
      },
      2: {
        name: "Advanced Alchemy Table",
        description: "An advanced alchemy table for brewing potions.",
        baseCost: 30,
      },
    },
  },
};

export type EquipmentKey = keyof typeof equipmentMap;

export const equipmentKeys = Object.keys(equipmentMap) as [
  EquipmentKey,
  ...EquipmentKey[]
];
