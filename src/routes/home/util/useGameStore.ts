import { create } from "zustand";
import { persist } from "zustand/middleware";
import { bottleItemKeyByBrewSize, ItemKey } from "../../../data/items";
import { IngredientKey } from "../../../data/ingredients";
import { BrewKey, BrewSize, recipeMap } from "../../../data/brew";
import { EquipmentKey, equipmentMap } from "../../../data/equipment";
import { addMinutes, addSeconds } from "date-fns";
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

export type OrderTypes = "item" | "ingredient";
export type Order<T extends OrderTypes = OrderTypes> = {
  id: string; // Unique ID for the order
  keeper: string;
  type: T;
  key: string;
  quantity: number;
  cost: number;
  deliveryTime: string;
  isDelivered?: boolean;
};

export interface PotionShop {
  gold: number;
  inventory: {
    items: Record<ItemKey, number>;
    ingredients: Record<IngredientKey, number>;
    brews: Record<BrewKey, Record<BrewSize, number>>;
  };
  equipment: Record<EquipmentKey, boolean>;
  sellPrices: Record<BrewKey, Record<BrewSize, number>>;
  orders: Order[];
}

interface OrderIngredientArg {
  keeper: string;
  ingredient: IngredientKey;
  quantity: number;
}

interface OrderItemArg {
  keeper: string;
  item: ItemKey;
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
  orderItem: (order: OrderItemArg) => void;
  purchaseEquipment: (upgrade: UpgradeEquipmentArg) => void;

  setSellPrice: (price: setSellPriceArg) => void;
  createBrew: (arg: { brewKey: BrewKey; brewSize: BrewSize }) => void;

  // responses
  acceptPurchase: (purchase: PurchaseList) => void;
  acceptDelivery: (order: Order) => void;

  // getters
  getPurchaseableEquipment: (store: PotionShop) => EquipmentKey[];

  // ===
  // helpers
  deliverPastDue: () => void;
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
  orders: [],
};

const useGameStore = create<GameStore>()(
  persist(
    (set, get) => {
      /**
       * Scheduler delivers the order at its delivery time
       * and only makes one timer for each order.
       */
      const scheduledOrders = new Set<string>();
      function scheduleImminentDelivery(order: Order) {
        // Prevent duplicate scheduling
        if (scheduledOrders.has(order.id)) return;
        scheduledOrders.add(order.id);

        const now = Date.now();
        const deliveryTime = new Date(order.deliveryTime).getTime();

        if (deliveryTime <= now) {
          // If the delivery time is in the past, deliver immediately
          get().acceptDelivery(order);
          return;
        } else {
          // Schedule the delivery
          setTimeout(() => {
            get().acceptDelivery(order);
          }, deliveryTime - now);
        }
      }
      // Global 5-second interval to check for upcoming deliveries.
      setInterval(() => {
        const pendingOrders = Object.values(get().stores)
          .flatMap((shop) => shop.orders)
          .filter((order) => !order.isDelivered);

        // Schedule delivery for upcoming orders.
        for (const order of pendingOrders) {
          if (isOrderImminent(order)) {
            scheduleImminentDelivery(order);
          }
        }
      }, 5000);

      return {
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
            const discountMultiplier = 1 - getDiscount(quantity) / 100;
            const price =
              state.ingredientCosts[ingredient] * quantity * discountMultiplier;
            const gold = shop.gold - price;

            if (gold < 0) {
              console.error("Not enough gold to order ingredient");
              return state;
            }

            // Add the order to the shop's orders
            const newOrder: Order = {
              id: `${keeper}-${ingredient}-${Date.now()}`,
              keeper,
              key: ingredient,
              type: "ingredient",
              quantity,
              cost: price,
              deliveryTime: getDeliveryTime(quantity).toISOString(),
              isDelivered: false,
            };

            if (isOrderImminent(newOrder)) {
              scheduleImminentDelivery(newOrder);
            }

            return {
              stores: {
                ...state.stores,
                [keeper]: {
                  ...shop,
                  gold,
                  orders: [...shop.orders, newOrder],
                },
              },
            };
          }),

        orderItem: ({ keeper, item, quantity }) =>
          set((state) => {
            const shop = state.stores[keeper];
            const price =
              state.itemCosts[item] * quantity * (1 - getDiscount(quantity));
            const deliveryTime = getDeliveryTime(quantity);

            const gold = shop.gold - price;

            if (gold < 0) {
              console.error("Not enough gold to order item");
              return state;
            }

            // Add the order to the shop's orders
            const newOrder: Order = {
              id: `${keeper}-${item}-${Date.now()}`,
              keeper,
              key: item,
              type: "item",
              quantity,
              cost: price,
              deliveryTime: deliveryTime.toISOString(),
              isDelivered: false,
            };

            // Schedule the delivery if it's imminent
            if (isOrderImminent(newOrder)) {
              scheduleImminentDelivery(newOrder);
            }

            return {
              stores: {
                ...state.stores,
                [keeper]: {
                  ...shop,
                  gold,
                  orders: [...shop.orders, newOrder],
                },
              },
            };
          }),
        setSellPrice: ({ keeper, brewKey, brewSize, price }) =>
          set((state) => {
            const shop = state.stores[keeper];
            const sellPrices = { ...shop.sellPrices };
            sellPrices[brewKey][brewSize] = price;

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
            for (const [ingredientKey, quantity] of Object.entries(
              ingredients
            )) {
              const requiredAmount = quantity * parseInt(brewSize);
              if (
                (shop.inventory.ingredients[ingredientKey] ?? 0) <
                requiredAmount
              ) {
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
        acceptDelivery: (order) =>
          set((state) => {
            const shop = state.stores[order.keeper];
            switch (order.type) {
              case "item":
                return {
                  stores: {
                    ...state.stores,
                    [order.keeper]: acceptItemDelivery(shop, order),
                  },
                };
              case "ingredient":
                return {
                  stores: {
                    ...state.stores,
                    [order.keeper]: acceptIngredientDelivery(shop, order),
                  },
                };
              default:
                console.error("Unknown order type");
                return state;
            }
          }),
        deliverPastDue: () => {
          const now = Date.now();
          for (const shop of Object.values(get().stores)) {
            const pastDueOrders = shop.orders.filter(
              (order) =>
                !order.isDelivered &&
                new Date(order.deliveryTime).getTime() < now
            );
            for (const order of pastDueOrders) {
              get().acceptDelivery(order);
            }
          }
        },
      };
    },
    {
      name: "order-store",
    }
  )
);
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

export const getDiscount = (qty: number) => Math.ceil((qty - 1) / 10) * 0.2;

export const getDeliveryTime = (qty: number) => {
  if (qty < 10) return addMinutes(new Date(), 1);
  if (qty < 100) return addMinutes(new Date(), 3);
  return addMinutes(new Date(), 7);
};

const acceptItemDelivery = (shop: PotionShop, order: Order): PotionShop => {
  const newlyDeliveredOrder = {
    ...order,
    isDelivered: true,
  };
  return {
    ...shop,
    inventory: {
      ...shop.inventory,
      items: {
        ...shop.inventory.items,
        [order.key as ItemKey]:
          (shop.inventory.items[order.key as ItemKey] ?? 0) + order.quantity,
      },
    },
    orders: shop.orders.map((o) =>
      o.id === order.id ? newlyDeliveredOrder : o
    ),
    gold: shop.gold - order.cost,
  };
};

const acceptIngredientDelivery = (
  shop: PotionShop,
  order: Order
): PotionShop => {
  const newlyDeliveredOrder = {
    ...order,
    isDelivered: true,
  };

  return {
    ...shop,
    inventory: {
      ...shop.inventory,
      ingredients: {
        ...shop.inventory.ingredients,
        [order.key as IngredientKey]:
          (shop.inventory.ingredients[order.key as IngredientKey] ?? 0) +
          order.quantity,
      },
    },
    orders: shop.orders.map((o) =>
      o.id === order.id ? newlyDeliveredOrder : o
    ),
    gold: shop.gold - order.cost,
  };
};

const isOrderImminent = (order: Order) => {
  const now = Date.now();
  const deliveryTime = new Date(order.deliveryTime).getTime();
  return deliveryTime <= now + 6000;
};
