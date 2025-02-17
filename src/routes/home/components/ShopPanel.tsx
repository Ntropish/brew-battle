import React from "react";
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
} from "@mui/material";

import useGameStore, { PotionShop } from "../util/useGameStore"; // Adjust the import based on your file structure
import IngredientTable, { IngredientRow } from "./IngredientTable";
import { itemMap } from "../../../data/items";
import { ingredientMap } from "../../../data/ingredients";
import ItemTable, { ItemRow } from "./ItemTable";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EquipmentTable, { EquipmentRow } from "./EquipmentTable";
import { equipmentMap } from "../../../data/equipment";
import BrewTable from "./brew/BrewTable";
import { BrewKey, BrewSize, recipeMap } from "../../../data/brew";
import { BrewRow } from "./brew/schema";
// This type should match the shape of your PotionShop from your Zustand store.

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

  const itemRows: ItemRow[] = React.useMemo(() => {
    const gameStore = useGameStore.getState();
    return Object.entries(shop.inventory.items).map(([key, count]) => ({
      key: key,
      name: itemMap[key].name,
      description: itemMap[key].description,
      quantity: count,
      cost: gameStore.itemCosts[key] || NaN,
    }));
  }, [shop.inventory.items]);

  const equipmentRows: EquipmentRow[] = React.useMemo(() => {
    const gameStore = useGameStore.getState();
    return Object.entries(shop.equipment).map(([key, level]) => ({
      key: key,
      name: equipmentMap[key].name,
      level: level,
      upgradeCost: gameStore.equipmentUpgradeCosts[key] || NaN,
    }));
  }, [shop.equipment]);

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

  return (
    <Paper
      sx={{
        flex: "1 1 0",
        minHeight: 0,
        maxHeight: "100%",
        overflowY: "auto",
        scrollbarGutter: "stable",
      }}
    >
      {/* <Typography variant="subtitle1">Gold: {shop.gold}</Typography>
       */}
      {canReadInternal && (
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="flex-start"
          m={1}
          spacing={1}
        >
          <img src={"/coins.webp"} alt="Shop" style={{ width: "32px" }} />
          <Typography variant="subtitle1">{shop.gold} GP</Typography>
        </Stack>
      )}
      <Box mt={1}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="brews-header"
          >
            <Stack direction="row" alignItems="center" spacing={1}>
              <img
                src="/potion.webp"
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
          </AccordionSummary>
          <AccordionDetails sx={{ overflowY: "auto", margin: 0, padding: 0 }}>
            <BrewTable data={brewRows} canWrite={canWrite} />
          </AccordionDetails>
        </Accordion>
        {canReadInternal && (
          <>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="ingredient-header"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src="/ingredient.webp"
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
                    Ingredients
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails
                sx={{ overflowY: "auto", margin: 0, padding: 0 }}
              >
                <IngredientTable data={ingredientRows} canWrite={canWrite} />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="item-header"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src="/items.webp"
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
                    Items
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails
                sx={{ overflowY: "auto", margin: 0, padding: 0 }}
              >
                <ItemTable data={itemRows} canWrite={canWrite} />
              </AccordionDetails>
            </Accordion>
            <Accordion defaultExpanded={true}>
              <AccordionSummary
                expandIcon={<ExpandMore />}
                aria-controls="panel1a-content"
                id="equipment-header"
              >
                <Stack direction="row" alignItems="center" spacing={1}>
                  <img
                    src="/equipment.webp"
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
                    Equipment
                  </Typography>
                </Stack>
              </AccordionSummary>
              <AccordionDetails
                sx={{ overflowY: "auto", margin: 0, padding: 0 }}
              >
                <EquipmentTable data={equipmentRows} />
              </AccordionDetails>
            </Accordion>
          </>
        )}
      </Box>
    </Paper>
  );
};

export default ShopPanel;
