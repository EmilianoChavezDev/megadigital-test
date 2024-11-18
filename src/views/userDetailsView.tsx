import { useParams } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";
import { useEffect, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import TablePagination from "@mui/material/TablePagination";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, CircularProgress, Link, Tooltip } from "@mui/material";
import ImagesModal from "../components/ImagesModal";

interface Album {
  userId: number;
  id: number;
  title: string;
}
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

const UserDetailsView: React.FC = () => {
  const { id } = useParams();

  const { data, loading } = useGetAxios<Album[]>("/albums");
  const { data: usuarios = null } = useGetAxios<User>(`/users/${id}`);

  const [album, setAlbum] = useState<Album[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(25);
  const [showGraphicsModal, setShowGraphicsModal] = useState(false);
  const [albumId, setAlbumId] = useState<number>(0);
  const [albumName, setAlbumName] = useState<string>("");

  useEffect(() => {
    // Cargar todos los albunes del usuario en la lista
    const userId = Number(id);
    const filtrarAlbum = data?.filter(
      (album: Album) => album.userId === userId
    );
    setAlbum(filtrarAlbum || []);
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

  const handleImagesModal = (id: number, title: string) => {
    setAlbumId(id);
    setAlbumName(title);
    setShowGraphicsModal(!showGraphicsModal);
  };

  return (
    <div className="main">
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
        <div className="">
          <div>
            <div className="details-container-header">
              <Breadcrumbs
                separator={<ChevronRightIcon fontSize="small" />}
                aria-label="breadcrumb"
              >
                <Link
                  component={RouterLink}
                  to="/"
                  underline="hover"
                  color="inherit"
                  style={{ fontWeight: 600 }}
                >
                  Home
                </Link>
                <span style={{ fontWeight: 600 }}>
                  Details / {usuarios?.name}
                </span>
              </Breadcrumbs>
            </div>
          </div>

          <div className="details-container-data">
            <div className="details-container-info">
              <h2>
                <span className="main-container-details-data-span">
                  Álbumes de
                </span>
                {usuarios?.name}
              </h2>
              <span>{usuarios?.email}</span>
              <span>{usuarios?.phone}</span>
            </div>

            <div className="table-container">
              <TableContainer
                component={Paper}
                className="table-container-container"
              >
                <Table
                  stickyHeader
                  sx={{
                    minWidth: 650,
                    fontFamily: "'Source Sans Pro', sans-serif",
                  }}
                >
                  <TableHead>
                    <TableRow>
                      <TableCell
                        align="left"
                        sx={{
                          color: "white",
                          backgroundColor: "#7B183E",
                        }}
                      >
                        Álbum
                      </TableCell>
                      <TableCell
                        align="center"
                        sx={{
                          color: "white",
                          backgroundColor: "#7B183E",
                        }}
                      >
                        Acciones
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {album
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
                          <TableCell component="th" scope="row" align="left">
                            {row.title}
                          </TableCell>
                          <TableCell
                            align="center"
                            onClick={() => handleImagesModal(row.id, row.title)}
                          >
                            <Tooltip title="Ver Album">
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
                count={album.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </div>
          </div>
          <ImagesModal
            show={showGraphicsModal}
            onClose={handleImagesModal}
            albumId={albumId}
            albumName={albumName}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetailsView;
