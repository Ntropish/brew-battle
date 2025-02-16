import { create } from "zustand";
import { ItemKey } from "../../../data/items";
import { IngredientKey } from "../../../data/ingredients";
import { BrewSize, RecipeKey } from "../../../data/recipes";
import { EquipmentKey } from "../../../data/equipment";

// const ingredientKeys = [
//   "mandrake-root",
//   "nightshade-berries",
//   "valerian-root",
//   "yarrow",
//   "wolfsbane",
//   "mugwort",
//   "foxglove",
//   "st-john-wort",
// ];

// const equipmentKeys = ["cauldron", "brewing-stand", "alchemy-table"] as const;

// export const recipeKeys = [
//   "healing-potion",
//   "mana-potion",
//   "strength-potion",
//   "invisibility-potion",
// ];

export interface PotionShop {
  gold: number;
  inventory: {
    items: Record<ItemKey, number>;
    ingredients: Record<IngredientKey, number>;
    brews: Record<RecipeKey, Record<BrewSize, number>>;
  };
  equipment: Record<EquipmentKey, number>;
  sellPrices: Record<RecipeKey, Record<RecipeKey, number>>;
}

interface OrderIngredientArg {
  keeper: string;
  ingredient: IngredientKey;
  amount: number;
}

interface setSellPriceArg {
  keeper: string;
  item: ItemKey;
  amount: number;
}

interface UpgradeEquipmentArg {
  keeper: string;
  equipment: EquipmentKey;
}

interface CustomerPurchaseArg {
  keeper: string;
  item: ItemKey;
  amount: number;
}

export interface GameStore {
  gameStartTime: number | null;
  stores: Record<string, PotionShop>;
  ingredientCosts: Record<IngredientKey, number>;
  itemCosts: Record<ItemKey, number>;
  equipmentUpgradeCosts: Record<EquipmentKey, number>;

  startGame: () => void;

  // Market actions
  setIngredientPrices: (priceMap: Record<IngredientKey, number>) => void;
  setItemPrices: (priceMap: Record<ItemKey, number>) => void;
  // Shopkeeper actions
  orderIngredient: (arg: OrderIngredientArg) => void;
  setSellPrice: (arg: setSellPriceArg) => void;
  upgradeEquipment: (arg: UpgradeEquipmentArg) => void;

  // Visitor actions
  customerPurchase: (arg: CustomerPurchaseArg) => void;
}

const initialShop: PotionShop = {
  gold: 1000,
  inventory: {
    items: {
      "small-bottle": 10,
      "medium-bottle": 5,
      "large-bottle": 2,
    },
    ingredients: {
      "mandrake-root": 5,
      "nightshade-berries": 3,
      "valerian-root": 8,
      yarrow: 10,
      wolfsbane: 2,
      mugwort: 4,
      foxglove: 6,
      "st-john-wort": 7,
    },
    brews: {
      "healing-potion": { 2: 5, 4: 3, 8: 1 },
      "mana-potion": { 2: 4, 4: 2, 8: 1 },
      "strength-potion": { 2: 3, 4: 2, 8: 1 },
      "invisibility-potion": { 2: 2, 4: 1, 8: 0 },
    },
  },
  equipment: {
    cauldron: 0,
    "brewing-stand": 0,
    "alchemy-table": 0,
  },
  sellPrices: {
    "healing-potion": { 2: 6, 4: 11, 8: 21 },
    "mana-potion": { 2: 8, 4: 15, 8: 29 },
    "strength-potion": { 2: 10, 4: 19, 8: 37 },
    "invisibility-potion": { 2: 12, 4: 23, 8: 45 },
  },
};

const useGameStore = create<GameStore>()((set) => ({
  gameStartTime: null,
  stores: {
    player: initialShop,
    derris: initialShop,
  },
  ingredientCosts: {
    "mandrake-root": 10,
    "nightshade-berries": 15,
    "valerian-root": 8,
    yarrow: 5,
    wolfsbane: 20,
    mugwort: 7,
    foxglove: 12,
    "st-john-wort": 6,
  },

  itemCosts: {
    "small-bottle": 5,
    "medium-bottle": 10,
    "large-bottle": 15,
  },

  equipmentUpgradeCosts: {
    cauldron: 10,
    "brewing-stand": 20,
    "alchemy-table": 30,
  },

  startGame: () => set({ gameStartTime: Date.now() }),

  setIngredientPrices: () => {
    set((state) => {
      const prices = { ...state.ingredientCosts };
      for (const ingredient of Object.keys(prices)) {
        prices[ingredient as IngredientKey] =
          Math.floor(Math.random() * 10) + 1;
      }
      return { ingredientCosts: prices };
    });
  },

  setItemPrices: () => {
    set((state) => {
      const prices = { ...state.itemCosts };
      for (const item of Object.keys(prices)) {
        prices[item as ItemKey] = Math.floor(Math.random() * 10) + 1;
      }
      return { itemCosts: prices };
    });
  },

  orderIngredient: ({ keeper, ingredient, amount }) =>
    set((state) => {
      const shop = state.stores[keeper];
      const price = state.ingredientCosts[ingredient] * amount;
      return {
        stores: {
          ...state.stores,
          [keeper]: {
            ...shop,
            gold: shop.gold - price,
            inventory: {
              ...shop.inventory,
              ingredients: {
                ...shop.inventory.ingredients,
                [ingredient]:
                  (shop.inventory.ingredients[ingredient] ?? 0) + amount,
              },
            },
          },
        },
      };
    }),
  setSellPrice: ({ keeper, item, amount }) =>
    set((state) => {
      const shop = state.stores[keeper];
      return {
        stores: {
          ...state.stores,
          [keeper]: {
            ...shop,
            sellPrices: {
              ...shop.sellPrices,
              [item]: amount,
            },
          },
        },
      };
    }),
  upgradeEquipment: ({ keeper, equipment }) =>
    set((state) => {
      const shop = state.stores[keeper];
      return {
        stores: {
          ...state.stores,
          [keeper]: {
            ...shop,
            gold: shop.gold - (shop.equipment[equipment] ?? 0) * 10, // TODO
            equipment: {
              ...shop.equipment,
              [equipment]: (shop.equipment[equipment] ?? 0) + 1,
            },
          },
        },
      };
    }),
  customerPurchase: ({ keeper, item, amount }) =>
    set((state) => {
      const shop = state.stores[keeper];
      return {
        stores: {
          ...state.stores,
          [keeper]: {
            ...shop,
            gold: shop.gold + (shop.sellPrices[item] ?? 0) * amount,
            inventory: {
              ...shop.inventory,
              items: {
                ...shop.inventory.items,
                [item]: (shop.inventory.items[item] ?? 0) + amount,
              },
            },
          },
        },
      };
    }),
}));
export default useGameStore;
