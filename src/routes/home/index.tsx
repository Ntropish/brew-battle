import React from "react";
import { Stack, Tabs, Tab } from "@mui/material";

import useGameStore, { PotionShop } from "./util/useGameStore";
import ShopPanel from "./components/ShopPanel";

import CompetitorShopPanel from "./components/CompetitorShopPanel";

type Tab = "own-shop" | "derris-shop";

export default function Home() {
  const stores = useGameStore((state) => state.stores) as Record<
    string,
    PotionShop
  >;

  // "player" is the human shopkeeper.
  const playerShop: PotionShop = stores.player;
  // "derris" is the computer/opponent shop (read-only).
  const opponentShop: PotionShop = stores.derris;

  const [tab, setTab] = React.useState<Tab>("own-shop");

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleOrderIngredient = (values: {
  //   ingredient: string;
  //   amount: number;
  // }) => {
  //   orderIngredient({
  //     keeper: "player",
  //     ingredient: values.ingredient,
  //     amount: values.amount,
  //   });
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleSetSellPrice = (values: { item: string; amount: number }) => {
  //   setSellPrice({
  //     keeper: "player",
  //     item: values.item as ItemKey,
  //     amount: values.amount,
  //   });
  // };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const handleUpgradeEquipment = (values: { equipment: string }) => {
  //   upgradeEquipment({
  //     keeper: "player",
  //     equipment: values.equipment,
  //   });
  // };

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
        onChange={(_, v) => setTab(v)}
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
          <CompetitorShopPanel shop={opponentShop} />
        </>
      )}
    </Stack>
  );
}
