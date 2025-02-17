import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "@tanstack/react-form";
import { EditBrewSellPriceForm, editBrewSellPriceFormSchema } from "./schema";
import { brewSizeAbbreviationMap, recipeMap } from "../../../../data/brew";

type EditBrewSellPriceDialogProps = {
  open: boolean;
  defaultValues?: EditBrewSellPriceForm | null;
  onClose: () => void;
  onSubmit: (values: EditBrewSellPriceForm) => void;
};

const EditBrewSellPriceDialog = ({
  open,
  defaultValues,
  onClose,
  onSubmit: handleSubmit,
}: EditBrewSellPriceDialogProps) => {
  const form = useForm({
    defaultValues,
    onSubmit: async ({ value }) => {
      handleSubmit(editBrewSellPriceFormSchema.parse(value));
    },
    validators: {
      onChange: editBrewSellPriceFormSchema,
    },
  });

  const priceInputRef = React.useRef<HTMLInputElement>(null);

  const [previousPrice, setPreviousPrice] = React.useState<number | null>(null);
  React.useEffect(() => {
    let timer: number | null = null;
    if (open) {
      form.reset(defaultValues);
      setPreviousPrice(defaultValues?.price ?? null);
      setCurrentPrice(defaultValues?.price ?? null);
      setTimeout(() => priceInputRef.current?.focus(), 10);
    } else {
      // wait for close animation before clearing the form
      timer = setTimeout(() => {
        form.reset();
        setPreviousPrice(null);
      }, 500);
    }

    return () => clearTimeout(timer!);
  }, [defaultValues, form, open]);

  const brewKey = form.getFieldValue("brewKey");

  const brewSize = form.getFieldValue("brewSize");

  const brewName = brewKey ? recipeMap[brewKey].name : "Unknown Brew";

  const brewSizeName = brewSize
    ? brewSizeAbbreviationMap[brewSize]
    : "Unknown Size";

  const [currentPrice, setCurrentPrice] = React.useState<number | null>(null);

  const priceDifference = React.useMemo(() => {
    if (previousPrice === null) return null;
    const priceValue = Number(form.getFieldValue("price"));

    if (
      typeof priceValue !== "number" ||
      isNaN(priceValue) ||
      typeof currentPrice !== "number" ||
      isNaN(currentPrice)
    ) {
      return null;
    }
    return currentPrice - previousPrice;
  }, [currentPrice, form, previousPrice]);

  const formattedPriceDifference = React.useMemo(() => {
    if (priceDifference === null || priceDifference === 0) return null;
    return Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(priceDifference);
  }, [priceDifference]);

  const priceHelperText =
    typeof formattedPriceDifference === "string"
      ? `Change: ${formattedPriceDifference}`
      : "Enter your new price here";

  const dialogTitle = `${brewName} (${brewSizeName})`;
  return (
    <Dialog open={open} onClose={onClose}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <DialogTitle>{dialogTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }} color="text.secondary">
            {`Edit the sell price`}
          </Typography>
          <form.Field
            name="price"
            listeners={{
              onChange: ({ value }) => {
                setCurrentPrice(Number(value));
              },
            }}
          >
            {(field) => (
              <TextField
                slotProps={{
                  htmlInput: {
                    ref: priceInputRef,
                  },
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  },
                }}
                variant="standard"
                label="Price"
                autoFocus
                value={field.state.value}
                onChange={({ target }) => field.setValue(target.value)}
                error={field.state.meta.errors.length > 0}
                helperText={field.state.meta.errors[0] ?? priceHelperText}
              />
            )}
          </form.Field>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="inherit">
            Cancel
          </Button>
          <form.Subscribe selector={({ canSubmit }) => ({ canSubmit })}>
            {({ canSubmit }) => (
              <Button
                onClick={() => {
                  form.handleSubmit();
                }}
                color="primary"
                variant="contained"
                disabled={!canSubmit}
              >
                Save
              </Button>
            )}
          </form.Subscribe>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default EditBrewSellPriceDialog;
