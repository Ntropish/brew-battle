import React from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";

import { BrewKey, BrewSize, brewSizeNameMap } from "../../../../data/brew";
import { baseTableConfig } from "../../util/materialReactTable";

import EditBrewSellPriceDialog from "./EditBrewSellPriceDialog";
import { EditBrewSellPriceForm, editBrewSellPriceFormSchema } from "./schema";

import { BrewRow } from "./schema";
import { Button } from "@mui/material";

type CompetitorBrewTableProps = {
  data: BrewRow[];
};

const CompetitorBrewTable = ({ data }: CompetitorBrewTableProps) => {
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
          return value > 10 ? "10+" : value;
        },
      },
      {
        accessorKey: "sellPrice",
        header: "Cost",
        size: 80,
        Cell: ({ cell }) => {
          return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 3,
          }).format(cell.getValue() as number);
        },
      },
      {
        accessorKey: "brewKey",
        header: "Brew Key",
      },
    ],
    []
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
        onClick={() => console.info("Buy", row.getValue("name"))}
      >
        Buy
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

export default CompetitorBrewTable;
