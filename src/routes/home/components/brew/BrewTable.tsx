import React from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { BrewSize, brewSizeNameMap } from "../../../../data/brew";
import { baseTableConfig } from "../../util/materialReactTable";
import { Button } from "@mui/material";

import SellPriceCell from "./SellPriceCell";
import EditBrewSellPriceDialog from "./EditBrewSellPriceDialog";
import {
  BrewRow,
  EditBrewSellPriceForm,
  editBrewSellPriceFormSchema,
} from "./schema";

type BrewTableProps = {
  data: BrewRow[];
  canReadInventory?: boolean;
};

const BrewTable = ({ data }: BrewTableProps) => {
  const [defaultEditBrewPriceValues, setDefaultEditBrewPriceValues] =
    React.useState<EditBrewSellPriceForm | null>(null);
  const [editBrewPriceDialogOpen, setEditBrewPriceDialogOpen] =
    React.useState(false);

  const handleBeginSellPriceEdit = React.useCallback(
    (e: React.MouseEvent<HTMLElement>) => {
      const validatedDefaultValues = editBrewSellPriceFormSchema.parse({
        brewKey: e.currentTarget.dataset.brewKey,
        brewSize: e.currentTarget.dataset.brewSize,
        // price: e.currentTarget.dataset.price,
        price: Number(e.currentTarget.dataset.price),
      });

      setDefaultEditBrewPriceValues(validatedDefaultValues);
      setEditBrewPriceDialogOpen(true);
    },
    []
  );
  const columns = React.useMemo<MRT_ColumnDef<BrewRow>[]>(
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
        // only show up to 10 if !canReadInventory
        Cell: ({ cell }) => {
          const value = cell.getValue() as number;
          return value;
        },
        aggregationFn: "sum",
        AggregatedCell: ({ cell }) => `(${cell.getValue() as number})`,
      },
      {
        accessorKey: "sellPrice",
        header: "Sell Price",
        size: 80,
        Cell: ({ cell, row }) => {
          return (
            <SellPriceCell
              brewKey={row.original.brewKey}
              brewSize={row.original.brewSize}
              value={cell.getValue() as number}
              onEditClick={handleBeginSellPriceEdit}
            />
          );
        },
      },
      {
        accessorKey: "brewKey",
        header: "Brew Key",
      },
    ],
    [handleBeginSellPriceEdit]
  );

  const tableConfig = React.useMemo(() => {
    const config: MRT_TableOptions<BrewRow> = {
      columns,
      data,
      ...baseTableConfig,
      enableGrouping: true,
      enableColumnDragging: false,
      initialState: {
        density: "compact",
        grouping: ["name"],
        columnVisibility: {
          brewKey: false,
        },
        columnOrder: [
          "mrt-row-expand",
          "mrt-row-actions",
          "name",
          "size",
          "count",
          "sellPrice",
          "brewKey",
        ],
      },
    };

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
    return config;
  }, [columns, data]);

  const table = useMaterialReactTable(tableConfig);

  return (
    <>
      <MaterialReactTable table={table} />
      <EditBrewSellPriceDialog
        defaultValues={defaultEditBrewPriceValues}
        open={editBrewPriceDialogOpen}
        onClose={() => setEditBrewPriceDialogOpen(false)}
        onSubmit={(values) => {
          console.info("Edit Brew Sell Price", values);
          setEditBrewPriceDialogOpen(false);
          setDefaultEditBrewPriceValues(null);
        }}
      />
    </>
  );
};

export default BrewTable;
