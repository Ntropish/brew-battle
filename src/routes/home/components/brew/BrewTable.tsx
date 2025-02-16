import React from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import {
  BrewKey,
  brewKeySchema,
  BrewSize,
  brewSizeNameMap,
  brewSizeSchema,
} from "../../../../data/brew";
import { baseTableConfig } from "../../util/materialReactTable";
import { Button } from "@mui/material";

import SellPriceCell from "./SellPriceCell";
import EditBrewSellPriceDialog from "./EditBrewSellPriceDialog";
import { EditBrewSellPriceForm, editBrewSellPriceFormSchema } from "./schema";

export type BrewRow = {
  brewKey: BrewKey;
  brewSize: BrewSize;
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
    ],
    [handleBeginSellPriceEdit]
  );

  const tableConfig = React.useMemo(() => {
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
