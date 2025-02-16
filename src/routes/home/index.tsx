import React from "react";
import { Grid2 as Grid, Button, Box, Typography, Stack } from "@mui/material";
import { motion } from "motion/react";
import useGameStore, { PotionShop } from "./useGameStore";
import { OrderIngredientForm } from "./components/OrderIngredientForm";
import { SetSellPriceForm } from "./components/SetSellPriceForm";
import { UpgradeEquipmentForm } from "./components/UpgradeEquipmentForm";
import ShopPanel from "./components/ShopPanel";

export default function Home() {
  const { stores, orderIngredient, setSellPrice, upgradeEquipment } =
    useGameStore();

  // "player" is the human shopkeeper.
  const playerShop: PotionShop = stores.player;
  // "derris" is the computer/opponent shop (read-only).
  const opponentShop: PotionShop = stores.derris;

  const handleOrderIngredient = (values: {
    ingredient: string;
    amount: number;
  }) => {
    orderIngredient({
      keeper: "player",
      ingredient: values.ingredient,
      amount: values.amount,
    });
  };

  const handleSetSellPrice = (values: { item: string; amount: number }) => {
    setSellPrice({
      keeper: "player",
      item: values.item,
      amount: values.amount,
    });
  };

  const handleUpgradeEquipment = (values: { equipment: string }) => {
    upgradeEquipment({
      keeper: "player",
      equipment: values.equipment,
    });
  };

  return (
    <Stack
      direction="column"
      spacing={1}
      sx={{
        flex: 1,
        minHeight: 0,
        py: 1,
      }}
    >
      <Typography variant="h4" color="text.secondary">
        Home
      </Typography>

      <Grid container spacing={4}>
        {/* Human player's shop */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ShopPanel title="Your Shop" shop={playerShop} />
            <Box mt={4}>
              <OrderIngredientForm onSubmit={handleOrderIngredient} />
            </Box>
            <Box mt={4}>
              <SetSellPriceForm onSubmit={handleSetSellPrice} />
            </Box>
            <Box mt={4}>
              <UpgradeEquipmentForm onSubmit={handleUpgradeEquipment} />
            </Box>
          </motion.div>
        </Grid>

        {/* Opponent's shop: read-only */}
        <Grid
          size={{
            xs: 12,
            md: 6,
          }}
        >
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <ShopPanel title="Opponent's Shop" shop={opponentShop} />
          </motion.div>
        </Grid>
      </Grid>
    </Stack>
  );
}
