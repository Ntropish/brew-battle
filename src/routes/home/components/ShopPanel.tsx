import React from "react";
import {
  Paper,
  Typography,
  Box,
  Stack,
  Tabs,
  Tab,
  FormControlLabel,
  Switch,
} from "@mui/material";

import useGameStore, { PotionShop } from "../util/useGameStore"; // Adjust the import based on your file structure
import IngredientTable, { IngredientRow } from "./tables/IngredientTable";
import { ItemKey, itemMap } from "../../../data/items";
import { ingredientMap } from "../../../data/ingredients";
import ItemTable, { ItemRow } from "./tables/ItemTable";
import EquipmentTable from "./tables/EquipmentTable";
import { equipmentDescriptionMap, equipmentMap } from "../../../data/equipment";
import BrewTable from "./tables/brew/BrewTable";
import { BrewKey, BrewSize, recipeMap } from "../../../data/brew";
import { BrewRow } from "./tables/brew/schema";
import MasterPotionQuote from "./MasterPotionQuote";
import OrderTable, { OrderRow } from "./tables/OrderTable";
import TasksTable, { TaskRow } from "./tables/BrewJobsTable";

// This type should match the shape of your PotionShop from your Zustand store.

const baseUrl = import.meta.env.BASE_URL || "brew-battle";

interface ShopPanelProps {
  title: string;
  shop: PotionShop;
  canWrite?: boolean;
  canReadInternal?: boolean;
}

export const ShopPanel: React.FC<ShopPanelProps> = ({
  shop,
  canWrite = false,
  canReadInternal = false,
}) => {
  const ingredientRows: IngredientRow[] = React.useMemo(() => {
    const gameStore = useGameStore.getState();
    return Object.entries(shop.inventory.ingredients).map(([key, count]) => ({
      key: key,
      name: ingredientMap[key].name,
      description: ingredientMap[key].description,
      quantity: count,
      cost: gameStore.ingredientCosts[key] || NaN,
    }));
  }, [shop.inventory.ingredients]);

  const orderRows: OrderRow[] = React.useMemo(() => {
    return Object.entries(shop.orders).map(([, order]) => ({
      key: order.key,
      type: order.type,
      quantity: order.quantity,
      cost: order.cost,
      deliveryTime: order.deliveryTime,
    }));
  }, [shop.orders]);

  const itemRows: ItemRow[] = React.useMemo(() => {
    const gameStore = useGameStore.getState();
    return Object.entries(shop.inventory.items).map(([key, count]) => ({
      key: key,
      name: itemMap[key].name,
      description: itemMap[key].description,
      quantity: count,
      cost: gameStore.itemCosts[key as ItemKey] || NaN,
    }));
  }, [shop.inventory.items]);

  const equipmentRows = React.useMemo(() => {
    const calculatedItems = useGameStore
      .getState()
      .getPurchaseableEquipment(shop);
    return calculatedItems.map((key) => ({
      key: key,
      name: equipmentMap[key]?.label,
      description: equipmentDescriptionMap[key],
      upgradeCost: equipmentMap[key]?.price || NaN,
    }));
  }, [shop]);

  const brewRows: BrewRow[] = React.useMemo(() => {
    return Object.entries(shop.inventory.brews).flatMap(([key, brew]) => {
      return Object.entries(brew).map(([size, count]) => ({
        key: `${key}-${size}`,
        brewKey: key as BrewKey,
        brewSize: size as BrewSize,
        size: Number(size),
        name: recipeMap[key].name,
        description: recipeMap[key].description,
        count: Number(count),
        sellPrice: shop.sellPrices[key as BrewKey][size as BrewSize] || NaN,
      }));
    });
  }, [shop.inventory.brews, shop.sellPrices]);

  const [tabIndex, setTabIndex] = React.useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabIndex(newValue);
  };

  const shopIsOpen = useGameStore((state) => state.stores.player.isOpen);

  return (
    <Paper
      sx={{
        flex: "1 1 0",
        minHeight: 0,
        maxHeight: "100%",
        overflow: "hidden",
      }}
    >
      <Stack
        sx={{
          flex: 1,
          minHeight: 0,
          maxHeight: "100%",
          overflowY: "auto",
          scrollbarGutter: "stable",
        }}
      >
        <Stack
          direction="row"
          alignItems="flex-end"
          justifyContent="flex-start"
          m={1}
          spacing={1}
          sx={{
            position: "relative",
            flex: "0 0 256px",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${baseUrl}/brew_background.webp)`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              maskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
              WebkitMaskImage:
                "linear-gradient(to bottom, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0) 70%)",
              // apply a blur
              filter: "blur(6px)",
              zIndex: 0,
            }}
          ></Box>
          <Stack
            direction="row"
            alignItems="flex-end"
            spacing={4}
            sx={{
              position: "relative",
              zIndex: 1,
            }}
          >
            <Stack direction="column" alignItems="center">
              <img
                src={`${baseUrl}/coins.webp`}
                alt="Shop"
                style={{ width: "32px" }}
              />
              <Typography variant="subtitle1">
                {Math.floor(shop.gold)} GP
              </Typography>
            </Stack>
            <FormControlLabel
              control={
                <Switch
                  color={"success"}
                  checked={shopIsOpen}
                  onChange={(e) => {
                    useGameStore.setState((state) => ({
                      stores: {
                        ...state.stores,
                        player: {
                          ...state.stores.player,
                          isOpen: e.target.checked,
                        },
                      },
                    }));
                  }}
                />
              }
              slotProps={{
                typography: {
                  color: "text.secondary",
                },
              }}
              label={
                <Typography variant="subtitle1">
                  {shopIsOpen ? "Shop Open" : "Shop Closed"}
                </Typography>
              }
            />
          </Stack>
          <Box
            sx={{
              position: "absolute",
              top: 12,
              right: 16,
              zIndex: 1,
            }}
          >
            <MasterPotionQuote />
          </Box>
        </Stack>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={tabIndex}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src={`${baseUrl}/potion.webp`}
                    alt="brew section icon"
                    style={{ width: "42px" }}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{
                      fontWeight: 100,
                    }}
                  >
                    Brews
                  </Typography>
                </Stack>
              }
            ></Tab>
            <Tab
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src={`${baseUrl}/ingredient.webp`}
                    alt="ingredient section icon"
                    style={{ width: "42px" }}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{
                      fontWeight: 100,
                    }}
                  >
                    Ingredients
                  </Typography>
                </Stack>
              }
            />
            <Tab
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src={`${baseUrl}/items.webp`}
                    alt="items section icon"
                    style={{ width: "42px" }}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{
                      fontWeight: 100,
                    }}
                  >
                    Items
                  </Typography>
                </Stack>
              }
            />
            <Tab
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src={`${baseUrl}/equipment.webp`}
                    alt="equipment section icon"
                    style={{ width: "42px" }}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{
                      fontWeight: 100,
                    }}
                  >
                    Equipment
                  </Typography>
                </Stack>
              }
            />
            <Tab
              label={
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src={`${baseUrl}/orders.webp`}
                    alt="order section icon"
                    style={{ width: "42px" }}
                  />
                  <Typography
                    variant="h6"
                    color="textSecondary"
                    sx={{
                      fontWeight: 100,
                    }}
                  >
                    Orders
                  </Typography>
                </Stack>
              }
            />
          </Tabs>
        </Box>
        <Box mt={1} pb={1}>
          {canReadInternal && (
            <>
              {tabIndex === 0 && (
                <>
                  <BrewTable data={brewRows} />
                  <TasksTable />
                </>
              )}
              {tabIndex === 1 && (
                <IngredientTable data={ingredientRows} canWrite />
              )}
              {tabIndex === 2 && (
                <ItemTable data={itemRows} canWrite={canWrite} />
              )}
              {tabIndex === 3 && <EquipmentTable data={equipmentRows} />}
              {tabIndex === 4 && (
                <OrderTable data={orderRows} canWrite={canWrite} />
              )}
            </>
          )}
        </Box>
      </Stack>
    </Paper>
  );
};

export default ShopPanel;
