import React, { useState } from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Badge from "@mui/material/Badge";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import { Box, Chip, Stack, Tooltip } from "@mui/material";

type BuyButtonProps = {
  onBuy: (quantity: number) => void;
  costPerUnit: number;
  phrase?: string;
};

const BuyButton = ({ onBuy, costPerUnit, phrase = "Buy" }: BuyButtonProps) => {
  // Level 0 (index 0) corresponds to buying 1 item with no discount.
  const quantities = [1, 3, 21, 55, 144];
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorEl);

  const handleMenuItemClick = (
    event: React.MouseEvent<HTMLElement>,
    index: number
  ) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleToggle = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  // Discount for levels > 0. (Level 0 = no discount)
  const discount = selectedIndex > 0 ? selectedIndex * 2.5 : 0;

  //   `Buy ${quantities[selectedIndex]} for $${Math.round(
  //             costPerUnit * quantities[selectedIndex] * (1 - discount / 100)
  //           )}`
  // Use Browser API to generate a proper display string for the tooltip.
  const finalCost = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(costPerUnit * quantities[selectedIndex] * (1 - discount / 100));

  const tooltipTitle = `${phrase} ${quantities[selectedIndex]} for ${finalCost}`;

  return (
    <>
      <ButtonGroup variant="text">
        <Tooltip title={tooltipTitle} placement="right" arrow>
          <Button onClick={() => onBuy(quantities[selectedIndex])}>
            <Stack
              direction="row"
              sx={{
                width: "7rem",
              }}
            >
              <Badge
                badgeContent={`${discount}%`}
                color="success"
                invisible={discount === 0}
                sx={{
                  ml: 1,
                  "& .MuiBadge-badge": {
                    backgroundColor: "green",
                    color: "white",
                    fontSize: "0.7rem",
                    height: "20px",
                    minWidth: "20px",
                  },
                }}
              >
                <Box
                  sx={{
                    width: "5rem",
                  }}
                >
                  {phrase} {quantities[selectedIndex]}
                </Box>
              </Badge>
            </Stack>
          </Button>
        </Tooltip>
        <Button
          size="small"
          aria-controls={open ? "split-button-menu" : undefined}
          aria-expanded={open ? "true" : undefined}
          aria-label="select quantity"
          aria-haspopup="menu"
          onClick={handleToggle}
        >
          <ArrowDropDownIcon />
        </Button>
      </ButtonGroup>
      <Menu
        id="split-button-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
      >
        {quantities.map((quantity, index) => {
          const itemDiscount = index > 0 ? index * 2.5 : 0;
          return (
            <MenuItem
              key={quantity}
              selected={index === selectedIndex}
              onClick={(event) => handleMenuItemClick(event, index)}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent={"space-between"}
                sx={{
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  {quantity}
                </Box>

                <Chip
                  label={`-${itemDiscount}%`}
                  color="success"
                  size="small"
                  sx={{
                    ml: 1,
                    visibility: itemDiscount === 0 ? "hidden" : "visible",
                  }}
                />
              </Stack>
            </MenuItem>
          );
        })}
      </Menu>
    </>
  );
};

export default BuyButton;
