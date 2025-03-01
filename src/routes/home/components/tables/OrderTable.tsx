import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import OrderButton from "../OrderButton";
import { baseTableConfig } from "../../util/materialReactTable";
import { addMinutes, formatDistance } from "date-fns";
import useGameStore from "../../util/useGameStore";
import { ItemKey } from "../../../../data/items";

export type OrderRow = {
  key: string;
  type: "item" | "ingredient";
  quantity: number;
  cost: number;
  deliveryTime: Date;
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
        Cell: ({ cell }) => {
          const deliveryTime = cell.getValue<Date>();
          if (!deliveryTime || isNaN(deliveryTime.getTime?.())) return "N/A";
          return formatDistance(deliveryTime, new Date(), {
            addSuffix: true,
          });
        },
      },
    ];

    return columns;
  }, []);
  const getDiscount = (qty: number) => Math.ceil((qty - 1) / 10) * 0.2;
  const getDeliveryTime = (qty: number) => {
    if (qty < 10) return addMinutes(new Date(), 1);
    if (qty < 100) return addMinutes(new Date(), 3);
    return addMinutes(new Date(), 7);
  };

  const playerGold = useGameStore((state) => state.stores.player.gold);

  const tableConfig = useMemo(() => {
    const config: MRT_TableOptions<OrderRow> = {
      columns,
      data,
      ...baseTableConfig,
      initialState: { density: "compact" },
    };

    if (canWrite) {
      config.enableRowActions = true;
      config.renderRowActions = ({ row }) => [
        <OrderButton
          playerGold={playerGold}
          onBuy={(qty) => {
            useGameStore.getState().orderItem({
              keeper: "player",
              item: row.original.key as ItemKey,
              quantity: qty,
            });
          }}
          key={row.getValue("name")}
          costPerUnit={row.getValue("cost")}
          getDiscount={getDiscount}
          getDeliveryTime={getDeliveryTime}
        />,
      ];
    }
    return config;
  }, [canWrite, columns, data, playerGold]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default OrderTable;
