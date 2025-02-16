import React from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Box,
  Typography,
} from "@mui/material";
import { EquipmentKey, equipmentKeys } from "../../../data/equipment";

const equipmentEnum = z.enum(equipmentKeys);
const upgradeEquipmentSchema = z.object({
  equipment: equipmentEnum,
});
export type UpgradeEquipmentFormValues = z.infer<typeof upgradeEquipmentSchema>;

interface UpgradeEquipmentFormProps {
  onSubmit: (values: UpgradeEquipmentFormValues) => void;
}

export const UpgradeEquipmentForm: React.FC<UpgradeEquipmentFormProps> = ({
  onSubmit,
}) => {
  const form = useForm<UpgradeEquipmentFormValues>({
    defaultValues: {
      equipment: equipmentKeys[0],
    },
    onSubmit: async ({ value }) => {
      onSubmit(value);
      form.reset();
    },
    validators: {
      onChange: upgradeEquipmentSchema,
    },
  });

  return (
    <form onSubmit={form.handleSubmit}>
      <Typography variant="h6" gutterBottom>
        Upgrade Equipment
      </Typography>
      <form.Field name="equipment">
        {(field) => (
          <FormControl fullWidth margin="normal">
            <InputLabel id="equipment-select-label">Equipment</InputLabel>
            <Select
              labelId="equipment-select-label"
              name="equipment"
              value={field.state.value}
              label="Equipment"
              onChange={(e) =>
                field.handleChange(e.target.value as EquipmentKey)
              }
            >
              {equipmentEnum.options.map((equipment: EquipmentKey) => (
                <MenuItem key={equipment} value={equipment}>
                  {equipment}
                </MenuItem>
              ))}
            </Select>
            {field.state.meta.errors && (
              <Typography variant="caption" color="error">
                {field.state.meta.errors}
              </Typography>
            )}
          </FormControl>
        )}
      </form.Field>

      <Box mt={2}>
        <Button type="submit" variant="contained" color="primary">
          Upgrade Equipment
        </Button>
      </Box>
    </form>
  );
};
