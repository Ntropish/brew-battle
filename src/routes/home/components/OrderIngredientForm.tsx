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
import { IngredientKey, ingredientKeys } from "../../../data/ingredients";

const ingredientEnum = z.enum(ingredientKeys);
const orderIngredientSchema = z.object({
  ingredient: ingredientEnum,
  amount: z.number().min(1).max(100),
});
export type OrderIngredientFormValues = z.infer<typeof orderIngredientSchema>;

interface OrderIngredientFormProps {
  onSubmit: (values: OrderIngredientFormValues) => void;
}

export const OrderIngredientForm: React.FC<OrderIngredientFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<OrderIngredientFormValues>({
    defaultValues: {
      ingredient: "mandrake-root",
      amount: 1,
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
      form.reset();
    },
    validators: {
      onChange: orderIngredientSchema,
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Order Ingredient
      </Typography>

      <form.Field name="ingredient">
        {(field) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="ingredient-select-label">Ingredient</InputLabel>
            <Select
              labelId="ingredient-select-label"
              name="ingredient"
              value={field.state.value}
              label="Ingredient"
              onChange={(e) =>
                field.handleChange(e.target.value as IngredientKey)
              }
            >
              {ingredientEnum.options.map((ingredient) => (
                <MenuItem key={ingredient} value={ingredient}>
                  {ingredient}
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
            label="Amount"
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
          Order Ingredient
        </Button>
      </Box>
    </form>
  );
};
