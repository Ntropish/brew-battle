import * as z from "zod";
import { brewKeySchema, brewSizeSchema } from "../../../../data/brew";

export const editBrewSellPriceFormSchema = z.object({
  brewKey: brewKeySchema,
  brewSize: brewSizeSchema,

  price: z.preprocess(
    (val) => {
      if (typeof val === "string") {
        return Number(val);
      }
      return val;
    },
    z
      .number({
        required_error: "Price is required",
        invalid_type_error: "Price must be a number",
      })
      .min(0.01, { message: "That's not enough!" })
      .max(9999.99, { message: "That's too much!" })
      .refine((num) => !Number.isNaN(num), {
        message: "Field must be a valid number",
      })
  ),
});

export type EditBrewSellPriceForm = z.infer<typeof editBrewSellPriceFormSchema>;
