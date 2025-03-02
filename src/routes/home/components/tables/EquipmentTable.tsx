import { useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { addMinutes } from "date-fns";
import { baseTableConfig } from "../../util/materialReactTable";
import UpgradeButton from "../UpgradeButton";
import useGameStore from "../../util/useGameStore";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

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
        accessorKey: "upgradeCost",
        header: "Cost",
        Cell: ({ cell }) => {
          const finalCost = new Intl.NumberFormat("en-US", {
            notation: "compact",
          }).format(cell.getValue<number>());
          return finalCost;
        },
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
      muiTableBodyRowProps: ({ row }) => ({
        onClick: () => {
          setOpenRow(row.original);
        },
      }),
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

  const [openRow, setOpenRow] = useState<EquipmentRow | null>(null);

  return (
    <>
      <MaterialReactTable table={table} />
      <Dialog
        open={!!openRow}
        onClose={() => setOpenRow(null)}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{openRow?.name} </DialogTitle>
        <DialogContent>{openRow?.description}</DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default EquipmentTable;
