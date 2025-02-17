import React from "react";
import { Button, Box, Typography, Stack, Tabs, Tab } from "@mui/material";
import { motion } from "motion/react";
import useGameStore, { PotionShop } from "./util/useGameStore";
import { OrderIngredientForm } from "./components/OrderIngredientForm";
import { SetSellPriceForm } from "./components/SetSellPriceForm";
import { UpgradeEquipmentForm } from "./components/UpgradeEquipmentForm";
import ShopPanel from "./components/ShopPanel";
import { z } from "zod";
import ChatMessagesDisplay, { Message } from "./components/ChatMessagesDisplay";
import ChatInput from "./components/ChatInput";
import CompetitorBrewTable from "./components/brew/CompetitorBrewTable";
import CompetitorShopPanel from "./components/CompetitorShopPanel";

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

  const [derrisChatMessages, setDerrisChatMessages] = React.useState<Message[]>(
    [
      {
        id: "derris-welcome",
        authorName: "Derris",
        role: "assistant",
        content: "Welcome to my shop!",
      },
    ]
  );

  return (
    <Stack
      direction="column"
      spacing={0.1}
      sx={{
        flex: 1,
        minHeight: 0,
        maxHeight: "100%",
        p: 0.1,
        m: 0.1,
      }}
    >
      <Tabs
        value={tab}
        onChange={(e, v) => setTab(v)}
        variant="fullWidth"
        textColor={tab === "own-shop" ? "primary" : "secondary"}
        indicatorColor={tab === "own-shop" ? "primary" : "secondary"}
      >
        <Tab value="own-shop" label="Yours" />
        <Tab value="derris-shop" label="Derris'" />
      </Tabs>
      {tab === "own-shop" && (
        <ShopPanel title="Shop" shop={playerShop} canWrite canReadInternal />
      )}
      {tab === "derris-shop" && (
        <>
          {" "}
          <Stack
            direction="row"
            spacing={1}
            sx={{
              maxHeight: "256px",
            }}
          >
            <Box>
              <img
                src={"/derris.png"}
                alt="Derris"
                style={{ width: "256px" }}
              />
            </Box>
            <Stack
              direction="column"
              spacing={0.1}
              sx={{
                flexGrow: 1,
              }}
            >
              <ChatMessagesDisplay messages={derrisChatMessages} />
              <ChatInput
                onSendMessage={(text) => {
                  setDerrisChatMessages((prev) => [
                    ...prev,
                    {
                      id: crypto.randomUUID(),
                      authorName: "You",
                      role: "user",
                      content: text,
                    },
                  ]);
                }}
              />
            </Stack>
          </Stack>
          <CompetitorShopPanel shop={opponentShop} />
        </>
      )}
    </Stack>
  );
}
