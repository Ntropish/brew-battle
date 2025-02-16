import React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import { RecipeKey, recipeKeys } from "../../../data/recipes";

const itemEnum = z.enum(recipeKeys);
const sellPriceSchema = z.object({
  item: itemEnum,
  amount: z.number().min(1).max(10000),
});
export type SellPriceFormValues = z.infer<typeof sellPriceSchema>;

interface SetSellPriceFormProps {
  onSubmit: (values: SellPriceFormValues) => void;
}

export const SetSellPriceForm: React.FC<SetSellPriceFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<SellPriceFormValues>({
    defaultValues: {
      item: recipeKeys[0],
      amount: 75,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
      form.reset();
    },
    validators: {
      onChange: sellPriceSchema,
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Set Sell Price
      </Typography>
      <form.Field name="item">
        {(field) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="item-select-label">Item</InputLabel>
            <Select
              labelId="item-select-label"
              name="item"
              value={field.state.value}
              label="Item"
              onChange={(e) => field.handleChange(e.target.value as RecipeKey)}
            >
              {itemEnum.options.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
            {field.state.meta.errors[0] && (
              <Typography variant="caption" color="error">
                {field.state.meta.errors[0]}
              </Typography>
            )}
          </FormControl>
        )}
      </form.Field>

      <form.Field name="amount">
        {(field) => (
          <TextField
            label="Sell Price"
            name="amount"
            type="number"
            value={field.state.value}
            onChange={(e) =>
              field.handleChange(e.target.value as unknown as number)
            }
            error={!!field.state.meta.errors[0]}
            helperText={field.state.meta.errors[0]}
            fullWidth
            margin="normal"
          />
        )}
      </form.Field>

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Set Sell Price
        </Button>
      </Box>
    </form>
  );
};
