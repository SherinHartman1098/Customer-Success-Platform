import * as React from "react";
import { Box, Button, formLabelClasses } from "@mui/material";
import { DataGrid as MuiDataGrid, type GridColDef } from "@mui/x-data-grid";
import formDialog from "../Dialog/FormDialog";
type Column = {
  id: string;
  label: string;
  minWidth?: number;
  align?: "right" | "left" | "center";
};

type Props = {
  columns: GridColDef[];
  rows: any[];
  loading?: boolean;
  onRowSelect?: (row: any) => void;
  //onRowClick?: (row: any) => void;
};

export default function DataGrid({
  columns,
  rows,
  loading = false,
  onRowSelect,
}: Props) {
  return (
    <MuiDataGrid
      rows={rows}
      columns={columns}
      loading={loading}
      rowHeight={40}
      columnHeaderHeight={50}
      disableRowSelectionOnClick={false}
      //Selecting and deselecting rows
      onRowSelectionModelChange={(selection) => {
        const selectedIds = Array.from(selection.ids);
        if (selectedIds.length === 0) {
          onRowSelect?.(null);
          return;
        }
        const selectedId = selectedIds[0];
        const selectedRow = rows.find((row) => row.id === selectedId);
        onRowSelect?.(selectedRow || null);
      }}
      pageSizeOptions={[5, 10, 25]}
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 10,
          },
        },
      }}
      autoHeight
      sx={{
        "& .MuiDataGrid-columnHeader ": {
          backgroundColor: "#3c5670",
          color: "white",
          textAlign: "center",
          fontWeight: "bold",
        },

        "& .MuiDataGrid-columnHeaderTitle": {
          fontWeight: "bold",
        },
        "& .MuiIconButton-root": {
          color: "white",
        },
        "& :hover .MuiDataGrid-sortButton, .MuiDataGrid-sortIcon": {
          color: "white",
          backgroundColor: "#4d76a2",
        },
      }}
    />
    // </Box>
  );
}
