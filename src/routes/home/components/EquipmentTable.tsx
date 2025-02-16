import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

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
      {
        accessorKey: "upgradeCost",
        header: "Upgrade Cost",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    muiTableContainerProps: { sx: { maxHeight: "300px" } },
    muiTablePaperProps: { elevation: 0 },
    enableTopToolbar: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableStickyHeader: true,
    enableFilters: false,
    enableColumnActions: false,
  });

  return <MaterialReactTable table={table} />;
};

export default EquipmentTable;
