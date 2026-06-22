import * as React from "react";
import { Box } from "@mui/material";
import { DataGrid as MuiDataGrid, type GridColDef } from "@mui/x-data-grid";

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
  //onRowClick?: (row: any) => void;
};

// export default function DataGrid({
//   columns,
//   rows,
//   loading = false,
//   onRowClick,
// }: Props) {
//   const [page, setPage] = React.useState(0);
//   const [rowsPerPage, setRowsPerPage] = React.useState(10); //pagination

//   const handleChangePage = (event: unknown, newPage: number) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (
//     event: React.ChangeEvent<HTMLInputElement>,
//   ) => {
//     setRowsPerPage(+event.target.value);
//     setPage(0);
//   };
//   const paginatedRows = rows.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage,
//   );
//   return (
//     // <div style={{ padding: "25px 50px 75px 50px" }}>
//     <Box sx={{ px: { xs: 2, md: 6 }, py: 3 }}>
//       <Paper sx={{ width: "100%", overflow: "hidden" }}>
//         <TableContainer sx={{ maxHeight: 440 }}>
//           {/*Loading state*/}
//           {loading ? (
//             <Box sx={{ display: "flex", justifyContent: "center", p: 5 }}>
//               <CircularProgress />
//             </Box>
//           ) : rows.length === 0 ? (
//             /*Empty state */
//             <Box sx={{ justifyContent: "center", p: 5 }}>
//               <Typography variant="h6" color="textSecondary">
//                 No records to display
//               </Typography>
//             </Box>
//           ) : (
//             /*Data table*/
//             <Table stickyHeader aria-label="sticky table">
//               <TableHead>
//                 <TableRow>
//                   {columns.map((column) => (
//                     <TableCell
//                       key={column.id}
//                       align={column.align}
//                       style={{
//                         minWidth: column.minWidth,
//                         backgroundColor: "#6b8ba2",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {column.label}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               </TableHead>
//               <TableBody>
//                 {paginatedRows.map((row, idx) => (
//                   <TableRow
//                     hover
//                     key={idx}
//                     onClick={() => onRowClick?.(row)}
//                     sx={{ cursor: onRowClick ? "pointer" : "default" }}
//                   >
//                     {columns.map((column) => (
//                       <TableCell key={column.id} align={column.align}>
//                         {row[column.id]}
//                       </TableCell>
//                     ))}
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </TableContainer>
//         <TablePagination
//           rowsPerPageOptions={[10, 25, 100]}
//           component="div"
//           count={rows.length}
//           rowsPerPage={rowsPerPage}
//           page={page}
//           onPageChange={handleChangePage}
//           onRowsPerPageChange={handleChangeRowsPerPage}
//         />
//       </Paper>
//     </Box>
//   );
// }
export default function DataGrid({ columns, rows, loading = false }: Props) {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: 3 }}>
      <MuiDataGrid
        rows={rows}
        columns={columns}
        loading={loading}
        pageSizeOptions={[5, 10, 25]}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        checkboxSelection
        disableRowSelectionOnClick
        sx={{
          "& .MuiDataGrid-columnHeader ": {
            backgroundColor: "#3c5670",
            color: "white",
            textAlign: "center",
            fontWeight: "bold",
          },
          //   "& .MuiDataGrid-columnHeaders": {
          //     backgroundColor: "#3c5670",

          //     color: "Black",
          //   },

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
          //"& .css-saksul-MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-sortButton":
          //   "& .MuiDataGrid-root .MuiDataGrid-columnHeader .MuiDataGrid-sortButton":
          //     {
          //       backgroundColor: "#4d76a2",
          //     },
        }}
      />
    </Box>
  );
}
