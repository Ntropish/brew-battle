import Button from "@mui/material/Button";
import { Box, Stack, Tooltip } from "@mui/material";

import { formatDistance } from "date-fns";

type UpgradeButtonProps = {
  onBuy: () => void;
  upgradeCost: number;
  getDeliveryTime: () => Date;
};

const UpgradeButton = ({
  onBuy,
  upgradeCost,
  getDeliveryTime,
}: UpgradeButtonProps) => {
  const deliveryTime = getDeliveryTime();

  const deliveryDistanceString = formatDistance(deliveryTime, new Date(), {
    addSuffix: true,
  });

  const finalCost = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(upgradeCost);

  const tooltipTitle = `Order upgrade for ${finalCost}. Arrives ${deliveryDistanceString}`;

  return (
    <>
      <Tooltip title={tooltipTitle} placement="bottom" arrow>
        <Button onClick={() => onBuy()}>
          <Stack
            direction="row"
            sx={{
              width: "7.5rem",
            }}
          >
            <Box
              sx={{
                width: "6rem",
                textAlign: "left",
                whiteSpace: "nowrap",
              }}
            >
              Upgrade ({finalCost})
            </Box>
          </Stack>
        </Button>
      </Tooltip>
    </>
  );
};

export default UpgradeButton;
