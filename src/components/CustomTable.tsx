import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import Tooltip from "@mui/material/Tooltip";
import { getNestedValue } from "../utils";

interface Action<T> {
  icon: React.ReactNode;
  onClick: (row: T) => void;
  label: string;
}

interface TableProps<T> {
  columns: { label: string; accessor: string }[];
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
  actions?: Action<T>[];
}

const CustomTable = <T,>({
  columns,
  data,
  rowsPerPageOptions = [5, 10, 25],
  page = 0,
  rowsPerPage = 5,
  onPageChange,
  onRowsPerPageChange,
  actions,
}: TableProps<T>) => {
  return (
    <div className="main-container-table">
      <div className="container-table">
        <TableContainer component={Paper} className="table-container">
          <Table
            sx={{
              fontFamily: "'Source Sans Pro', sans-serif",
            }}
            stickyHeader
          >
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.accessor}
                    align="center"
                    sx={{
                      color: "white",
                      backgroundColor: "#7B183E",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
                {actions && (
                  <TableCell
                    align="center"
                    sx={{
                      color: "white",
                      backgroundColor: "#7B183E",
                    }}
                  >
                    Acciones
                  </TableCell>
                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow
                    key={index}
                    sx={{
                      ":hover": {
                        backgroundColor: "#f5f5f5",
                      },
                    }}
                  >
                    {columns.map((column) => (
                      <TableCell key={column.accessor} align="center">
                        {getNestedValue(row, column.accessor)}{" "}
                      </TableCell>
                    ))}
                    {actions && (
                      <TableCell align="center">
                        {actions.map((action, idx) => (
                          <Tooltip key={idx} title={action.label}>
                            <span
                              onClick={() => action.onClick(row)}
                              style={{ cursor: "pointer", margin: "0 5px" }}
                            >
                              {action.icon}
                            </span>
                          </Tooltip>
                        ))}
                      </TableCell>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <TablePagination
        rowsPerPageOptions={rowsPerPageOptions}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={onPageChange ? onPageChange : () => { }}
        onRowsPerPageChange={onRowsPerPageChange}
        className="table-pagination"
      />
    </div>
  );
};

export default CustomTable;
