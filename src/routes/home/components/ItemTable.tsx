import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import OrderButton from "./OrderButton";
import { baseTableConfig } from "../util/materialReactTable";
import { addMinutes } from "date-fns";
import useGameStore from "../util/useGameStore";
import { ItemKey } from "../../../data/items";

export type ItemRow = {
  key: string;
  name: string;
  description: string;
  quantity: number;
  cost: number;
};

type ItemTableProps = {
  data: ItemRow[];
  canWrite?: boolean;
};

const ItemTable = ({ data, canWrite }: ItemTableProps) => {
  const columns = useMemo<MRT_ColumnDef<ItemRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "cost",
        header: "Cost",
      },
      {
        accessorKey: "quantity",
        header: "Owned",
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

  const playerGold = useGameStore((state) => state.stores.player.gold);

  const tableConfig = useMemo(() => {
    const config: MRT_TableOptions<ItemRow> = {
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
  }, [canWrite, columns, data]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default ItemTable;
