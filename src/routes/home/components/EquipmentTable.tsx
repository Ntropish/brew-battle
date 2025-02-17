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

export type EquipmentRow = {
  name: string;
  level: number;
  upgradeCost: number;
};

type EquipmentTableProps = {
  data: EquipmentRow[];
};

const EquipmentTable = ({ data }: EquipmentTableProps) => {
  const columns = useMemo<MRT_ColumnDef<EquipmentRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "level",
        header: "Level",
      },

      // {
      //   accessorKey: "upgradeCost",
      //   header: "Upgrade Cost",
      //   Cell: ({ cell }) =>
      //     new Intl.NumberFormat("en-US", {
      //       style: "currency",
      //       currency: "USD",
      //     }).format(cell.getValue() as number),

      // },
    ],
    []
  );

  const getDeliveryTime = () => {
    return addMinutes(new Date(), 5);
  };

  console.log(data);

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
        onBuy={() => console.info("Upgrade", row.getValue("name"))}
        key={row.getValue("name")}
        upgradeCost={row.original.upgradeCost}
        getDeliveryTime={getDeliveryTime}
      />,
    ];
    return config;
  }, [columns, data]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default EquipmentTable;
