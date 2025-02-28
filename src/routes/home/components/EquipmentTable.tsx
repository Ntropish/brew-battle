import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { addMinutes } from "date-fns";
import { baseTableConfig } from "../util/materialReactTable";
import UpgradeButton from "./UpgradeButton";
import useGameStore from "../util/useGameStore";

export type EquipmentRow = {
  key: string;
  name: string;
  description: string;
  upgradeCost: number;
};

type EquipmentTableProps = {
  data: EquipmentRow[];
  keeper?: "player" | "derris";
};

const EquipmentTable = ({ data, keeper = "player" }: EquipmentTableProps) => {
  const columns = useMemo<MRT_ColumnDef<EquipmentRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "description",
        header: "description",
      },
    ],
    []
  );

  const getDeliveryTime = () => {
    return addMinutes(new Date(), 5);
  };

  const keeperGold = useGameStore((state) => state.stores[keeper].gold);

  const tableConfig = useMemo(() => {
    const config: MRT_TableOptions<EquipmentRow> = {
      columns,
      data,
      ...baseTableConfig,
      initialState: { density: "compact" },
    };

    config.enableRowActions = true;
    config.renderRowActions = ({ row }) => [
      <UpgradeButton
        disabled={row.original.upgradeCost > keeperGold}
        onBuy={() =>
          useGameStore.getState().purchaseEquipment({
            keeper,
            equipment: row.original.key,
          })
        }
        key={row.getValue("name")}
        upgradeCost={row.original.upgradeCost}
        getDeliveryTime={getDeliveryTime}
      />,
    ];
    return config;
  }, [columns, data, keeper, keeperGold]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default EquipmentTable;
