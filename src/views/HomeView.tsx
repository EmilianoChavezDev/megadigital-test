import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import useGetAxios from "../hooks/useGetAxios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, CircularProgress, Tooltip } from "@mui/material";
import { exportToExcel } from "../utils/exportToExcel";
import { useNavigate } from "react-router-dom";
import GraphicsModal from "../components/GraphicsModal";
import AnalyticsIcon from "@mui/icons-material/Analytics";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ConfirmModal from "../components/ConfirmModal";
import CustomTable from "../components/CustomTable";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  phone: string;
  address: {
    city: string;
  };
}

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

function HomeView() {
  const { data, loading } = useGetAxios<User[]>("/users");
  const { data: posteoList } = useGetAxios<Post[]>("/posts");
  const [rows, setRows] = useState<User[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const navigate = useNavigate();
  const [showGraphicsModal, setShowGraphicsModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  useEffect(() => {
    if (data) {
      const formatearDatos = data.map((user: User) => ({
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        phone: user.phone,
        address: {
          city: user.address.city,
        },
      }));

      setRows(formatearDatos);
    }
  }, [data]);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleClickClient = (id: string) => {
    navigate(`/details/${id}`);
  };

  const handleGraphicsModal = () => {
    setShowGraphicsModal(!showGraphicsModal);
  };

  const handleConfirmModal = () => {
    setShowConfirmModal(!showConfirmModal);
  };

  const handleConfirm = (confirmed: boolean) => {
    confirmed
      ? exportToExcel(rows.slice(0, rowsPerPage))
      : setShowConfirmModal(!showConfirmModal);
  };

  const filesToDownload = Math.min(
    rows.length - page * rowsPerPage,
    rowsPerPage
  );

  const columns: { label: any; accessor: keyof User | "acciones" }[] = [
    { label: "Nombre", accessor: "name" },
    { label: "Username", accessor: "username" },
    { label: "Email", accessor: "email" },
    { label: "Teléfono", accessor: "phone" },
    { label: "Dirección", accessor: "address" },
    { label: "Acciones", accessor: "acciones" },
  ];

  return (
    <div
      style={{
        backgroundColor: "#E8E8E8",
      }}
    >
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <CircularProgress
            color="secondary"
            sx={{
              display: "flex",
            }}
          />
        </div>
      ) : (
        <>
          <div className="main-container">
            <div className="buttons-container">
              <Button
                variant="contained"
                onClick={() => handleConfirmModal()}
                startIcon={<FileDownloadIcon />}
              >
                Exportar a Excel
              </Button>
              <Button
                variant="contained"
                onClick={() => handleGraphicsModal()}
                startIcon={<AnalyticsIcon />}
              >
                Mirar Grafico
              </Button>
            </div>
            <main>
              <div className="table-div">
                <TableContainer component={Paper}>
                  <Table
                    sx={{
                      minWidth: 650,
                      fontFamily: "'Source Sans Pro', sans-serif",
                    }}
                  >
                    <TableHead>
                      <TableRow
                        sx={{
                          backgroundColor: "#7B183E",
                        }}
                      >
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                          }}
                        >
                          Nombre
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                          }}
                        >
                          Username
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                          }}
                        >
                          Email
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                          }}
                        >
                          Telefono
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                          }}
                        >
                          Direccion
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            color: "white",
                          }}
                        >
                          Acciones
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {rows
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => (
                          <TableRow
                            key={row.id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                              "&:hover": {
                                backgroundColor: "#f5f5f5",
                              },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {row.name}
                            </TableCell>
                            <TableCell align="center">{row.username}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{row.phone}</TableCell>
                            <TableCell align="center">
                              {row.address.city}
                            </TableCell>
                            <TableCell
                              align="center"
                              onClick={() =>
                                handleClickClient(row.id.toString())
                              }
                            >
                              <Tooltip title="Ver Detalles">
                                <VisibilityIcon className="cursorPointer" />
                              </Tooltip>
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <TablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: 100 }]}
                  component="div"
                  count={rows.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onPageChange={handleChangePage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                />
              </div>
            </main>
          </div>
          <div>
            <GraphicsModal
              show={showGraphicsModal}
              onClose={handleGraphicsModal}
              users={rows}
              posts={posteoList || []}
            />
            <ConfirmModal
              show={showConfirmModal}
              onClose={handleConfirmModal}
              onConfirm={handleConfirm}
              alert={"Desea descargar el archivo?"}
              message={`Se descargará los datos de ${filesToDownload} usuarios de la lista`}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default HomeView;
