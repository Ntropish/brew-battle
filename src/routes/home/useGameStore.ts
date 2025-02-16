import { create } from "zustand";
import { ConsumableKey, ItemKey } from "../../data/items";
import { IngredientKey } from "../../data/ingredients";
import { RecipeKey } from "../../data/recipes";
import { EquipmentKey } from "../../data/equipment";

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
  };
  equipment: Record<EquipmentKey, number>;
  sellPrices: Record<RecipeKey, number>;
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
  ingredientPrices: Record<IngredientKey, number>;

  startGame: () => void;

  // Market actions
  setIngredientPrices: (priceMap: Record<IngredientKey, number>) => void;
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
  },
  equipment: {
    cauldron: 0,
    "brewing-stand": 0,
    "alchemy-table": 0,
  },
  sellPrices: {
    "healing-potion": 75,
    "mana-potion": 90,
    "strength-potion": 120,
    "invisibility-potion": 150,
  },
};
const useGameStore = create<GameStore>()((set) => ({
  gameStartTime: null,
  stores: {
    player: initialShop,
    derris: initialShop,
  },
  ingredientPrices: {
    "mandrake-root": 10,
    "nightshade-berries": 15,
    "valerian-root": 8,
    yarrow: 5,
    wolfsbane: 20,
    mugwort: 7,
    foxglove: 12,
    "st-john-wort": 6,
  },

  startGame: () => set({ gameStartTime: Date.now() }),

  setIngredientPrices: () => {
    set((state) => {
      const prices = { ...state.ingredientPrices };
      for (const ingredient of Object.keys(prices)) {
        prices[ingredient as IngredientKey] =
          Math.floor(Math.random() * 10) + 1;
      }
      return { ingredientPrices: prices };
    });
  },

  orderIngredient: ({ keeper, ingredient, amount }) =>
    set((state) => {
      const shop = state.stores[keeper];
      const price = state.ingredientPrices[ingredient] * amount;
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
