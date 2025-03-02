import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { baseTableConfig } from "../../util/materialReactTable";

import { ItemKey, itemMap } from "../../../../data/items";
import { ingredientMap } from "../../../../data/ingredients";
import DeliveryTimeCell from "./DeliveryTimeCell";

export type OrderRow = {
  key: string;
  type: "item" | "ingredient";
  quantity: number;
  cost: number;
  deliveryTime: string;
};

type OrderTableProps = {
  data: OrderRow[];
  canWrite?: boolean;
};

const OrderTable = ({ data, canWrite }: OrderTableProps) => {
  const columns = useMemo(() => {
    const columns: MRT_ColumnDef<OrderRow>[] = [
      {
        accessorKey: "type",
        header: "Type",
        Cell: ({ cell }) => {
          return cell.getValue() === "item" ? "Item" : "Ingredient";
        },
      },
      {
        accessorKey: "key",
        header: "Name",
        Cell: ({ cell }) => {
          return cell.getValue() === "item"
            ? itemMap[cell.row.original.key as ItemKey]?.name
            : ingredientMap[cell.row.original.key as ItemKey]?.name;
        },
      },
      {
        accessorKey: "cost",
        header: "Cost",
      },
      {
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "deliveryTime",
        header: "Delivery Time",
        Cell: DeliveryTimeCell,
      },
    ];

    return columns;
  }, []);

  const tableConfig = useMemo(() => {
    const config: MRT_TableOptions<OrderRow> = {
      columns,
      data,
      ...baseTableConfig,
      initialState: { density: "compact" },
    };

    return config;
  }, [columns, data]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default OrderTable;
