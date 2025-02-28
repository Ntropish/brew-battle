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

import { PotionShop } from "../util/useGameStore"; // Adjust the import based on your file structure
import ExpandMore from "@mui/icons-material/ExpandMore";
import { BrewKey, BrewSize, recipeMap } from "../../../data/brew";
import CompetitorBrewTable from "./brew/CompetitorBrewTable";
import { BrewRow } from "./brew/schema";
import ChatMessagesDisplay, { Message } from "./ChatMessagesDisplay";
import ChatInput from "./ChatInput";

// This type should match the shape of your PotionShop from your Zustand store.

const baseUrl = import.meta.env.BASE_URL || "brew-battle";

interface CompetitorShopPanelProps {
  shop: PotionShop;
}

export const CompetitorShopPanel: React.FC<CompetitorShopPanelProps> = ({
  shop,
}) => {
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
    <Paper
      sx={{
        flex: "1 1 0",
        minHeight: 0,
        maxHeight: "100%",
        overflowY: "auto",
        scrollbarGutter: "stable",
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          maxHeight: "256px",
        }}
      >
        <Box
          sx={{
            p: 0.5,
          }}
        >
          <img
            src={`${baseUrl}/derris.png`}
            alt="Derris"
            style={{ width: "6rem" }}
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
      <Box mt={1}>
        <Accordion defaultExpanded={true}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-controls="panel1a-content"
            id="brews-header"
          >
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
          </AccordionSummary>
          <AccordionDetails sx={{ overflowY: "auto", margin: 0, padding: 0 }}>
            <CompetitorBrewTable data={brewRows} />
          </AccordionDetails>
        </Accordion>
      </Box>
    </Paper>
  );
};

export default CompetitorShopPanel;

{
  /* <Stack
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
<CompetitorBrewTable shop={opponentShop} /> */
}
