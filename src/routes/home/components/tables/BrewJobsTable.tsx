import { useEffect, useMemo, useState } from "react";
import {
  MaterialReactTable,
  MRT_TableOptions,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from "material-react-table";
import { baseTableConfig } from "../../util/materialReactTable";

import { recipeMap } from "../../../../data/brew";
import useGameStore from "../../util/useGameStore";
import { LinearProgress } from "@mui/material";
import { Tooltip } from "@mui/material";

export type TaskRow = {
  key: string;
  type: "brew";
  quantity: number;
  status: "scheduled" | "in-progress" | "completed";
  effortRemaining: number;
  effortRequired: number;
};

const TasksTable = () => {
  const [data, setData] = useState<TaskRow[]>([]);
  // Update the data once per second
  useEffect(() => {
    const interval = setInterval(() => {
      const state = useGameStore.getState();

      const queuedTasks: TaskRow[] = state.stores.player.taskQueue.map(
        (task) => ({
          key: task.id,
          type: "brew",
          quantity: task.quantity,
          status: "scheduled",
          effortRemaining: task.effortRemaining,
          effortRequired: task.effortRequired,
        })
      );

      const activeTask = state.stores.player.activeTask;
      const activeTaskRow: TaskRow | null = activeTask
        ? {
            key: state.stores.player.activeTask!.id,
            type: "brew",
            quantity: state.stores.player.activeTask!.quantity,
            status: "in-progress",
            effortRemaining: state.stores.player.activeTask!.effortRemaining,
            effortRequired: state.stores.player.activeTask!.effortRequired,
          }
        : null;

      const completedTasks: TaskRow[] = state.stores.player.completedTasks.map(
        (task) => ({
          key: task.id,
          type: "brew",
          quantity: task.quantity,
          status: "completed",
          effortRemaining: 0,
          effortRequired: task.effortRequired,
        })
      );

      if (activeTaskRow) {
        setData([...queuedTasks, activeTaskRow, ...completedTasks]);
      } else {
        setData([...queuedTasks, ...completedTasks]);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const columns = useMemo(() => {
    const columns: MRT_ColumnDef<TaskRow>[] = [
      {
        accessorKey: "type",
        header: "Type",
        Cell: ({ cell }) => {
          return cell.getValue() === "brew" ? "Brew" : "Unknown";
        },
      },
      {
        accessorKey: "status",
        header: "Status",
      },
      {
        accessorKey: "effortRemaining",
        header: "Effort Remaining",
        // A nice linear progress bar with a tooltip showing the exact effort remaining, total required, and percentage
        Cell: ({ cell }) => {
          const effortRemaining = cell.row.original.effortRemaining;
          const effortCompleted =
            cell.row.original.effortRequired - effortRemaining;
          const formattedEffortCompleted = Intl.NumberFormat(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(effortCompleted);

          const totalRequired = cell.row.original.effortRequired;
          const formattedTotalRequired = Intl.NumberFormat(undefined, {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(totalRequired);
          const percentage = (effortRemaining / totalRequired) * 100;
          const formattedPercentage = Intl.NumberFormat(undefined, {
            style: "percent",
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
          }).format(percentage / 100);
          return (
            <Tooltip
              title={
                <div>
                  <div>
                    {formattedEffortCompleted} / {formattedTotalRequired}&nbsp;(
                    {formattedPercentage}%)
                  </div>
                </div>
              }
            >
              <LinearProgress variant="determinate" value={100 - percentage} />
            </Tooltip>
          );
        },
      },
      {
        accessorKey: "key",
        header: "Name",
        Cell: ({ cell }) => {
          return recipeMap[cell.row.original.key]?.name;
        },
      },

      {
        accessorKey: "quantity",
        header: "Quantity",
      },
    ];

    return columns;
  }, []);

  const tableConfig = useMemo(() => {
    const config: MRT_TableOptions<TaskRow> = {
      columns,
      data,
      ...baseTableConfig,
      initialState: { density: "compact" },
    };

    return config;
  }, [columns, data]);

  const table = useMaterialReactTable(tableConfig);

  return <MaterialReactTable table={table} />;
};

export default TasksTable;
