import React from "react";
import { Box, Button, IconButton, Stack, Typography } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import { BrewKey, BrewSize } from "../../../../data/brew";

type SellPriceCellProps = {
  value: number;
  brewKey: BrewKey;
  brewSize: BrewSize;
  onEditClick: (e: React.MouseEvent<HTMLElement>) => void;
};

const SellPriceCell: React.FC<SellPriceCellProps> = ({
  value,
  brewKey,
  brewSize,

  onEditClick,
}) => {
  const formattedSellPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(value);

  return (
    <Stack alignItems="center" direction="row" justifyContent="space-between">
      <Typography variant="body1" sx={{ marginRight: 1 }}>
        {formattedSellPrice}
      </Typography>

      <IconButton
        onClick={onEditClick}
        data-brew-key={brewKey}
        data-brew-size={brewSize}
        data-price={value}
      >
        <EditIcon />
      </IconButton>
    </Stack>
  );
};

export default SellPriceCell;
