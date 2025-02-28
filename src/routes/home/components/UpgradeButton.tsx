import Button from "@mui/material/Button";
import { Box, Stack, Tooltip } from "@mui/material";

import { formatDistance } from "date-fns";

type UpgradeButtonProps = {
  onBuy: () => void;
  upgradeCost: number;
  getDeliveryTime: () => Date;
  disabled?: boolean;
};

const UpgradeButton = ({
  onBuy,
  upgradeCost,
  getDeliveryTime,
  disabled = false,
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
        <Button onClick={() => onBuy()} disabled={disabled}>
          <Stack direction="row" sx={{}}>
            <Box
              sx={{
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
