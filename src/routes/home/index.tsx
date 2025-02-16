import React from "react";
import { Button, Box, Typography, Stack, Tabs, Tab } from "@mui/material";
import { motion } from "motion/react";
import useGameStore, { PotionShop } from "./util/useGameStore";
import { OrderIngredientForm } from "./components/OrderIngredientForm";
import { SetSellPriceForm } from "./components/SetSellPriceForm";
import { UpgradeEquipmentForm } from "./components/UpgradeEquipmentForm";
import ShopPanel from "./components/ShopPanel";
import { z } from "zod";

const tabSchema = z.enum(["own-shop", "derris-shop"]);

const tabKeys = tabSchema.options;

type Tab = z.infer<typeof tabSchema>;

export default function Home() {
  const { stores, orderIngredient, setSellPrice, upgradeEquipment } =
    useGameStore();

  // "player" is the human shopkeeper.
  const playerShop: PotionShop = stores.player;
  // "derris" is the computer/opponent shop (read-only).
  const opponentShop: PotionShop = stores.derris;

  const [tab, setTab] = React.useState<Tab>("own-shop");

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
      spacing={0.1}
      sx={{
        flex: 1,
        minHeight: 0,
        p: 0.1,
        m: 0.1,
      }}
    >
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        textColor="secondary"
        indicatorColor="secondary"
        variant="fullWidth"
      >
        {tabKeys.map((key) => (
          <Tab key={key} value={key} label={key.replace("-", " ")} />
        ))}
      </Tabs>
      {tab === "own-shop" && (
        <ShopPanel
          title="Your Shop"
          shop={playerShop}
          canWrite
          canReadInternal
        />
      )}
      {tab === "derris-shop" && (
        <ShopPanel title="Derris' Shop" shop={opponentShop} />
      )}
    </Stack>
  );
}
