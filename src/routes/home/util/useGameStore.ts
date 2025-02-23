import { create } from "zustand";
import { bottleItemKeyByBrewSize, ItemKey } from "../../../data/items";
import { IngredientKey } from "../../../data/ingredients";
import { BrewKey, BrewSize, recipeMap } from "../../../data/brew";
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

export type Cauldron = {
  level: number;
  size: number;
  brewingRecipes: {
    brewKey: BrewKey;
    brewSize: BrewSize;
    quantity: number;
  };
};

export interface PotionShop {
  gold: number;
  inventory: {
    items: Record<ItemKey, number>;
    ingredients: Record<IngredientKey, number>;
    brews: Record<BrewKey, Record<BrewSize, number>>;
  };
  cauldrons: Cauldron[];
  equipment: Record<EquipmentKey, number>;
  sellPrices: Record<BrewKey, Record<BrewSize, number>>;
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

  // Shopkeeper actions
  orderIngredient: (arg: OrderIngredientArg) => void;
  setSellPrice: (arg: setSellPriceArg) => void;
  upgradeEquipment: (arg: UpgradeEquipmentArg) => void;
  acceptPurchase: (purchase: PurchaseList) => void;
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
      "healing-potion": { 2: 12, 4: 3, 8: 1 },
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
      ([_, analysis]) => analysis.score === bestScore
    );
    const bestScoringShop =
      topScoringShops[Math.floor(Math.random() * topScoringShops.length)];

    const bestPrice = Math.min(
      ...Object.values(analysisByShop).map((analysis) => analysis.cost)
    );
    const topCostingShops = Object.entries(analysisByShop).filter(
      ([_, analysis]) => analysis.cost === bestPrice
    );
    const bestCostingShop =
      topCostingShops[Math.floor(Math.random() * topCostingShops.length)];

    console.log(topScoringShops, topCostingShops);

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

    console.log("Chosen shop:", chosenShop, analysisByShop);

    // Make the purchases
    const purchases = analysisByShop[chosenShop].purchases;

    get().acceptPurchase({
      storeKey: chosenShop,
      shopper,
      purchases: purchases,
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

// export type BrewRecipe = {
//   name: string;
//   description: string;
//   ingredients: IngredientKey[];
//   requirements: {
//     cauldron: number;
//     brewingStand: number;
//     alchemyTable: number;
//   };
//   appearance: {
//     hue: number;
//     saturation: number;
//     brightness: number;
//     opacity: number;
//     emissive: number;
//   };
// };

export const canCreateBrew = (
  brewKey: BrewKey,
  brewSize: BrewSize,
  shop: PotionShop
) => {
  const recipe = recipeMap[brewKey];

  // Check if the shop has the required equipment
  for (const [equipmentKey, requiredLevel] of Object.entries(
    recipe.requirements
  )) {
    if ((shop.equipment[equipmentKey as EquipmentKey] ?? 0) < requiredLevel) {
      return false;
    }
  }

  // Check if the shop has the required ingredients
  for (const ingredient of recipe.ingredients) {
    if ((shop.inventory.ingredients[ingredient] ?? 0) < parseInt(brewSize)) {
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
