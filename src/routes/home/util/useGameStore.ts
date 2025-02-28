import { create } from "zustand";
import { bottleItemKeyByBrewSize, ItemKey } from "../../../data/items";
import { IngredientKey } from "../../../data/ingredients";
import { BrewKey, BrewSize, recipeMap } from "../../../data/brew";
import { EquipmentKey, equipmentMap } from "../../../data/equipment";

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

// export type Cauldron = {
//   level: number;
//   size: number;
//   brewingRecipes: {
//     brewKey: BrewKey;
//     brewSize: BrewSize;
//     quantity: number;
//   };
// };

export interface PotionShop {
  gold: number;
  inventory: {
    items: Record<ItemKey, number>;
    ingredients: Record<IngredientKey, number>;
    brews: Record<BrewKey, Record<BrewSize, number>>;
  };
  equipment: Record<EquipmentKey, boolean>;
  sellPrices: Record<BrewKey, Record<BrewSize, number>>;
}

interface OrderIngredientArg {
  keeper: string;
  ingredient: IngredientKey;
  quantity: number;
}

interface setSellPriceArg {
  keeper: string;
  brewKey: BrewKey;
  brewSize: BrewSize;
  price: number;
}

interface UpgradeEquipmentArg {
  keeper: string;
  equipment: EquipmentKey;
}

export interface Shopper {
  name: string;
  bio: string;
  budget: number;
  needs: {
    brewKey: BrewKey;
    brewSize: BrewSize;
    quantity: number;
    priority: number;
  }[];
}

interface Purchase {
  brewKey: BrewKey;
  brewSize: BrewSize;
  quantity: number;
  price: number;
}

interface PurchaseList {
  storeKey: string;
  shopper: Shopper;
  purchases: Purchase[];
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
  sendShopper: (shopper: Shopper) => void;

  // =============================
  // keeper
  // -----------------------------

  // actions
  orderIngredient: (order: OrderIngredientArg) => void;
  setSellPrice: (price: setSellPriceArg) => void;
  purchaseEquipment: (upgrade: UpgradeEquipmentArg) => void;
  createBrew: (arg: { brewKey: BrewKey; brewSize: BrewSize }) => void;

  // responses
  acceptPurchase: (purchase: PurchaseList) => void;

  // getters
  getPurchaseableEquipment: (store: PotionShop) => EquipmentKey[];
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
      "healing-potion": { 1: 12, 3: 3, 7: 1 },
      "mana-potion": { 1: 4, 3: 2, 7: 1 },
      "strength-potion": { 1: 3, 3: 2, 7: 1 },
      "invisibility-potion": { 1: 2, 3: 1, 7: 0 },
    },
  },
  equipment: {},
  sellPrices: {
    "healing-potion": { 1: 6, 3: 11, 7: 21 },
    "mana-potion": { 1: 8, 3: 15, 7: 29 },
    "strength-potion": { 1: 10, 3: 19, 7: 37 },
    "invisibility-potion": { 1: 12, 3: 23, 7: 45 },
  },
};

const useGameStore = create<GameStore>()((set, get) => ({
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

  sendShopper: (shopper) => {
    const analysisByShop: Record<string, ShopperStoreAnalysis> =
      Object.fromEntries(
        Object.entries(get().stores).map(([key, shop]) => [
          key,
          analyzeForShopper(shop, shopper),
        ])
      );

    const bestScore = Math.max(
      ...Object.values(analysisByShop).map((analysis) => analysis.score)
    );
    const topScoringShops = Object.entries(analysisByShop).filter(
      ([, analysis]) => analysis.score === bestScore
    );
    const bestScoringShop =
      topScoringShops[Math.floor(Math.random() * topScoringShops.length)];

    const bestPrice = Math.min(
      ...Object.values(analysisByShop).map((analysis) => analysis.cost)
    );
    const topCostingShops = Object.entries(analysisByShop).filter(
      ([, analysis]) => analysis.cost === bestPrice
    );
    const bestCostingShop =
      topCostingShops[Math.floor(Math.random() * topCostingShops.length)];

    if (bestScore === 0 && bestPrice === 0) {
      console.log("No shops can fulfill the shopper's needs.");
      return;
    }

    let chosenShop: string;
    // If they are the same, we can just use the best scoring shop
    if (bestScoringShop[0] === bestCostingShop[0]) {
      chosenShop = bestScoringShop[0];
    }

    // Otherwise, use a 50/50 chance to pick between the two
    const useBestPrice = Math.random() < 0.5;

    chosenShop = useBestPrice ? bestCostingShop[0] : bestScoringShop[0];

    // Make the purchases
    const purchases = analysisByShop[chosenShop].purchases;

    get().acceptPurchase({
      storeKey: chosenShop,
      shopper,
      purchases: purchases,
    });
  },

  orderIngredient: ({ keeper, ingredient, quantity }) =>
    set((state) => {
      const shop = state.stores[keeper];
      const price = state.ingredientCosts[ingredient] * quantity;
      const gold = shop.gold - price;

      if (gold < 0) {
        console.error("Not enough gold to order ingredient");
        return state;
      }

      return {
        stores: {
          ...state.stores,
          [keeper]: {
            ...shop,
            gold,
            inventory: {
              ...shop.inventory,
              ingredients: {
                ...shop.inventory.ingredients,
                [ingredient]:
                  (shop.inventory.ingredients[ingredient] ?? 0) + quantity,
              },
            },
          },
        },
      };
    }),
  setSellPrice: ({ keeper, brewKey, brewSize, price }) =>
    set((state) => {
      const shop = state.stores[keeper];
      const sellPrices = { ...shop.sellPrices };
      sellPrices[brewKey][brewSize] = price;

      console.log("Setting sell price", brewKey, brewSize, price);
      console.log({ sellPrices });
      return {
        stores: {
          ...state.stores,
          [keeper]: {
            ...shop,
            sellPrices,
          },
        },
      };
    }),
  purchaseEquipment: ({ keeper, equipment }) =>
    set((state) => {
      const shop = state.stores[keeper];
      const gold = shop.gold - equipmentMap[equipment].price;

      if (gold < 0) {
        console.error("Not enough gold to purchase equipment");
        return state;
      }

      return {
        stores: {
          ...state.stores,
          [keeper]: {
            ...shop,
            gold,
            equipment: {
              ...shop.equipment,
              [equipment]: true,
            },
          },
        },
      };
    }),
  createBrew: ({
    brewKey,
    brewSize,
  }: {
    brewKey: BrewKey;
    brewSize: BrewSize;
  }) =>
    set((state) => {
      const shop = state.stores.player;
      const recipe = recipeMap[brewKey];
      const ingredients = recipe.ingredients;
      const equipment = recipe.equipment;

      // Check if the shop has the required ingredients
      for (const [ingredientKey, quantity] of Object.entries(ingredients)) {
        const requiredAmount = quantity * parseInt(brewSize);
        if ((shop.inventory.ingredients[ingredientKey] ?? 0) < requiredAmount) {
          console.error("Not enough ingredients to create brew");
          return state;
        }
      }

      // Check if the shop has the required equipment
      for (const [equipmentKey, requiresOwnershop] of Object.entries(
        equipment
      )) {
        if (requiresOwnershop && !shop.equipment[equipmentKey]) {
          console.error("Not enough equipment to create brew");
          return state;
        }
      }

      // TODO: Check if the shop has a bottle of the correct size
      const bottleKey = bottleItemKeyByBrewSize[brewSize];
      const bottlesAvailable = shop.inventory.items[bottleKey] ?? 0;
      if (bottlesAvailable < 1) {
        console.error("Not enough bottles to create brew");
        return state;
      }

      // Update the inventory
      return {
        stores: {
          ...state.stores,
          player: {
            ...shop,
            inventory: {
              ...shop.inventory,
              ingredients: Object.fromEntries(
                Object.entries(shop.inventory.ingredients).map(
                  ([key, value]) => [
                    key,
                    value - (ingredients[key as IngredientKey] ?? 0),
                  ]
                )
              ),
              brews: {
                ...shop.inventory.brews,
                [brewKey]: {
                  ...shop.inventory.brews[brewKey],
                  [brewSize]:
                    (shop.inventory.brews[brewKey][brewSize] ?? 0) + 1,
                },
              },
              items: {
                ...shop.inventory.items,
                [bottleKey]: (shop.inventory.items[bottleKey] ?? 0) - 1,
              },
            },
          },
        },
      };
    }),

  getPurchaseableEquipment: (shop: PotionShop) => {
    const owndedEquipmentMap = shop.equipment;

    // verify that all equipment.requirements are met
    return Object.entries(equipmentMap)
      .filter(([key]) => !owndedEquipmentMap[key as EquipmentKey])
      .filter(([, equipment]) =>
        equipment.requirements.every((req) => owndedEquipmentMap[req])
      )
      .map(([key]) => key as EquipmentKey);
  },

  acceptPurchase: ({ storeKey, shopper, purchases }) =>
    set((state) => {
      const shop = state.stores[storeKey];
      const totalCost = purchases.reduce((acc, purchase) => {
        return acc + purchase.price * purchase.quantity;
      }, 0);

      return {
        stores: {
          ...state.stores,
          [storeKey]: {
            ...shop,
            gold: shop.gold + totalCost,
            inventory: {
              ...shop.inventory,
              brews: purchases.reduce(
                (acc, purchase) => {
                  // acc[purchase.brewKey][purchase.brewSize] -= purchase.quantity;
                  // Use immutable update to avoid mutating the state directly
                  acc[purchase.brewKey] = {
                    ...acc[purchase.brewKey],
                    [purchase.brewSize]:
                      (acc[purchase.brewKey][purchase.brewSize] ?? 0) -
                      purchase.quantity,
                  };
                  return acc;
                },
                { ...shop.inventory.brews }
              ),
            },
          },
        },
      };
    }),
}));
export default useGameStore;

type ShopperStoreAnalysis = {
  score: number;
  cost: number;
  purchases: Purchase[];
};

const analyzeForShopper = (
  shop: PotionShop,
  shopper: Shopper
): ShopperStoreAnalysis => {
  let cost = 0;
  let score = 0;
  const purchases: Purchase[] = [];

  const prioritizedNeeds = [...shopper.needs].sort(
    (a, b) => b.priority - a.priority
  );

  for (const need of prioritizedNeeds) {
    const brewCount = shop.inventory.brews[need.brewKey][need.brewSize];
    const brewPrice = shop.sellPrices[need.brewKey][need.brewSize];
    const maxAffordable = Math.floor((shopper.budget - cost) / brewPrice);
    const willBuy = Math.min(need.quantity, brewCount, maxAffordable);

    if (willBuy <= 0) {
      continue;
    }

    // Add the purchase to the list
    purchases.push({
      brewKey: need.brewKey,
      brewSize: need.brewSize,
      quantity: willBuy,
      price: brewPrice,
    });

    // Update the cost and score
    cost += brewPrice * willBuy;
    score += need.priority * willBuy;
  }

  return {
    score,
    cost,
    purchases,
  };
};

export const canCreateBrew = (
  brewKey: BrewKey,
  brewSize: BrewSize,
  shop: PotionShop
) => {
  const recipe = recipeMap[brewKey];

  // Check if the shop has the required equipment
  for (const [equipmentKey, hasOwnership] of Object.entries(recipe.equipment)) {
    if (
      !hasOwnership ||
      (shop.equipment[equipmentKey as EquipmentKey] ?? false)
    ) {
      return false;
    }
  }

  // Check if the shop has the required ingredients
  for (const [ingredient, quantity] of Object.entries(recipe.ingredients)) {
    const requiredAmount = quantity * parseInt(brewSize);
    if ((shop.inventory.ingredients[ingredient] ?? 0) < requiredAmount) {
      return false;
    }
  }

  // Check if the shop has a bottle of the correct size
  const bottleKey = bottleItemKeyByBrewSize[brewSize];
  const bottlesAvailable = shop.inventory.items[bottleKey] ?? 0;
  if (bottlesAvailable < 1) {
    return false;
  }

  // If all checks pass, the brew can be created
  return true;
};
