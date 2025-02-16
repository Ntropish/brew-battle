import React from "react";
import { Paper, Typography, Box } from "@mui/material";

import { PotionShop } from "../useGameStore"; // Adjust the import based on your file structure
// This type should match the shape of your PotionShop from your Zustand store.

interface ShopPanelProps {
  title: string;
  shop: PotionShop;
}

export const ShopPanel: React.FC<ShopPanelProps> = ({ title, shop }) => {
  return (
    <Paper sx={{ padding: 2 }}>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <Typography variant="subtitle1">Gold: {shop.gold}</Typography>
      <Box mt={2}>
        <Typography variant="h6">Inventory</Typography>
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
        ))}
      </Box>
      <Box mt={2}>
        <Typography variant="h6">Equipment</Typography>
        {Object.entries(shop.equipment).map(([key, level]) => (
          <Typography key={key}>
            {key}: Level {level}
          </Typography>
        ))}
      </Box>
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
