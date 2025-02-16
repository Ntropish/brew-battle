import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

export type BrewRow = {
  name: string;
  size: number;
  count: number;
  sellPrice: number;
};

type BrewTableProps = {
  data: BrewRow[];
};

const BrewTable = ({ data }: BrewTableProps) => {
  const columns = useMemo<MRT_ColumnDef<BrewRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "size",
        header: "Size",
      },
      {
        accessorKey: "count",
        header: "Count",
      },
      {
        accessorKey: "sellPrice",
        header: "Sell Price",
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    muiTableContainerProps: { sx: { maxHeight: "300px" } },
    enableTopToolbar: false,
    enablePagination: false,
    enableBottomToolbar: false,
    enableStickyHeader: true,
  });

  return <MaterialReactTable table={table} />;
};

export default BrewTable;
