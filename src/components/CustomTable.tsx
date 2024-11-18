import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";

interface TableProps<T> {
  columns: { label: string; accessor: keyof T }[];
  data: T[];
  rowsPerPageOptions?: number[];
  page?: number;
  rowsPerPage?: number;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => void;
  onRowsPerPageChange?: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
}

const CustomTable = <T,>({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
}: TableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow
            sx={{
              backgroundColor: "#7B183E",
            }}
          >
            {columns.map((column) => (
              <TableCell
                key={String(column.accessor)}
                align="center"
                sx={{
                  color: "white",
                }}
              >
                {/* Mostrar el encabezado de la columna */}
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((row, index) => (
              <TableRow key={index}>
                {columns.map((column) => (
                  <TableCell key={String(column.accessor)} align="center">
                    {/* Asegúrate de convertir el valor a una cadena */}
                    {String(row[column.accessor])}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange ? onPageChange : () => {}}
        onRowsPerPageChange={onRowsPerPageChange}
      />
    </TableContainer>
  );
};

export default CustomTable;
