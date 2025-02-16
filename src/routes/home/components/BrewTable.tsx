import { useMemo } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { BrewSize, brewSizeNameMap } from "../../../data/recipes";
import { baseTableConfig } from "../util/materialReactTable";
import { Button } from "@mui/material";

export type BrewRow = {
  name: string;
  size: number;
  count: number;
  sellPrice: number;
};

type BrewTableProps = {
  data: BrewRow[];
  canWrite?: boolean;
};

const BrewTable = ({ data, canWrite }: BrewTableProps) => {
  const columns = useMemo<MRT_ColumnDef<BrewRow>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "size",
        header: "Size",
        Cell: ({ cell }) => brewSizeNameMap[cell.getValue() as BrewSize],
        size: 120,
      },
      {
        accessorKey: "count",
        header: "Count",
        size: 80,
      },
      {
        accessorKey: "sellPrice",
        header: "Sell Price",
        size: 80,
      },
    ],
    []
  );

  const tableConfig = useMemo(() => {
    const config: MRT_TableOptions<BrewRow> = {
      columns,
      data,
      ...baseTableConfig,
    };

    if (canWrite) {
      config.enableRowActions = true;
      config.renderRowActions = ({ row }) => [
        <Button
          variant="text"
          key="brew"
          onClick={() => console.info("Brew", row.getValue("name"))}
        >
          Brew
        </Button>,
      ];
    }
    return config;
  }, [canWrite, columns, data]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default BrewTable;
