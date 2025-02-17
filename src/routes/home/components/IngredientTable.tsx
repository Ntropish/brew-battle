import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { baseTableConfig } from "../util/materialReactTable";
import OrderButton from "./OrderButton";
import { addMinutes } from "date-fns";

export type IngredientRow = {
  name: string;
  description: string;
  quantity: number;
  cost: number;
};

type InventoryTableProps = {
  data: IngredientRow[];
  canWrite?: boolean;
};

const InventoryTable = ({ data, canWrite }: InventoryTableProps) => {
  const columns = useMemo<MRT_ColumnDef<IngredientRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
        visibleInShowHideMenu: false,
        enableHiding: false,
      },
      {
        accessorKey: "cost",
        header: "Cost",
        visibleInShowHideMenu: false,
        enableHiding: false,
      },
      {
        accessorKey: "quantity",
        header: "Owned",
        visibleInShowHideMenu: false,
        enableHiding: false,
      },
    ],
    []
  );

  const getDiscount = (qty: number) => Math.ceil((qty - 1) / 10) * 0.2;
  const getDeliveryTime = (qty: number) => {
    if (qty < 10) return addMinutes(new Date(), 1);
    if (qty < 100) return addMinutes(new Date(), 3);
    return addMinutes(new Date(), 7);
  };

  const tableConfig = useMemo(() => {
    const config: MRT_TableOptions<IngredientRow> = {
      columns,
      data,
      ...baseTableConfig,
    };

    if (canWrite) {
      config.enableRowActions = true;
      config.renderRowActions = ({ row }) => [
        <OrderButton
          onBuy={(qty) => console.info("Buy", row.getValue("name"), qty)}
          key={row.getValue("name")}
          costPerUnit={row.getValue("cost")}
          getDiscount={getDiscount}
          getDeliveryTime={getDeliveryTime}
        />,
      ];
    }
    return config;
  }, [canWrite, columns, data]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default InventoryTable;
