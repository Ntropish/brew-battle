import React from "react";
import {
  Paper,
  Typography,
  Box,
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

import useGameStore, { PotionShop } from "../useGameStore"; // Adjust the import based on your file structure
import IngredientTable, { IngredientRow } from "./IngredientTable";
import { itemMap } from "../../../data/items";
import { ingredientMap } from "../../../data/ingredients";
import ItemTable, { ItemRow } from "./ItemTable";
import ExpandMore from "@mui/icons-material/ExpandMore";
import EquipmentTable, { EquipmentRow } from "./EquipmentTable";
import { equipmentMap } from "../../../data/equipment";
// This type should match the shape of your PotionShop from your Zustand store.

interface ShopPanelProps {
  title: string;
  shop: PotionShop;
}

export const ShopPanel: React.FC<ShopPanelProps> = ({ title, shop }) => {
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

  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1">Gold: {shop.gold}</Typography>
      <Box mt={2}>
        {/* <Typography variant="h6">Inventory</Typography>
        <Typography variant="subtitle2">Items:</Typography>
        {Object.entries(shop.inventory.items).map(([key, count]) => (
          <Typography key={key}>
            {key}: {count}
          </Typography>
        ))}
        <Typography variant="subtitle2" mt={1}>
          Ingredients:
        </Typography>
        {Object.entries(shop.inventory.ingredients).map(([key, count]) => (
          <Typography key={key}>
            {key}: {count}
          </Typography>
        ))} */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="ingredient-header"
          >
            <Typography variant="h6">Ingredients</Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ overflowY: "auto", margin: 0, padding: 0 }}>
            <IngredientTable data={ingredientRows} />
          </AccordionDetails>
        </Accordion>
        {/* <ItemTable data={itemRows} /> */}
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="item-header"
          >
            <Typography variant="h6">Items</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <ItemTable data={itemRows} />
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="equipment-header"
          >
            <Typography variant="h6">Equipment</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <EquipmentTable data={equipmentRows} />
          </AccordionDetails>
        </Accordion>
      </Box>
      {/* <Box mt={2}>
        <Typography variant="h6">Equipment</Typography>
        {Object.entries(shop.equipment).map(([key, level]) => (
          <Typography key={key}>
            {key}: Level {level}
          </Typography>
        ))}
      </Box> */}
      <Box mt={2}>
        <Typography variant="h6">Sell Prices</Typography>
        {Object.entries(shop.sellPrices).map(([key, price]) => (
          <Typography key={key}>
            {key}: {price}
          </Typography>
        ))}
      </Box>
    </Paper>
  );
};

export default ShopPanel;
