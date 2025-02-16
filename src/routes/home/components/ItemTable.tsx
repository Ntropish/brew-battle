import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

export type ItemRow = {
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
        accessorKey: "quantity",
        header: "Quantity",
      },
      {
        accessorKey: "cost",
        header: "Cost",
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

export default ItemTable;
