import { useEffect, useState } from "react";
import useGetAxios from "../hooks/useGetAxios";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Button, CircularProgress } from "@mui/material";
import { calculateItemsToProcess, exportToExcel } from "../utils";
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
      setRows(
        data.map(({ id, name, username, email, phone, address }) => ({
          id,
          name,
          username,
          email,
          phone,
          address: {
            city: address.city,
          },
        }))
      );
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

  // nos dirige a la pagina de detalles del usuario
  const handleClickClient = (id: string) => {
    navigate(`/details/${id}`);
  };

  const toggleModal = (modal: string) => {
    if (modal === "graphics") {
      setShowGraphicsModal((prev) => !prev);
    } else if (modal === "confirm") {
      setShowConfirmModal((prev) => !prev);
    }
  };

  const handleConfirm = (confirmed: boolean) => {
    const dataToExport = rows
      .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
      .map(({ id, ...rest }) => rest);

    confirmed
      ? exportToExcel(
          dataToExport,
          "Lista de Usuarios.xlsx",
          "Reporte de Usuarios"
        )
      : setShowConfirmModal(!showConfirmModal);
  };

  // columnas props para mi custom table
  const columns = [
    { label: "Nombre", accessor: "name" },
    { label: "Username", accessor: "username" },
    { label: "Email", accessor: "email" },
    { label: "Telefono", accessor: "phone" },
    { label: "Direccion", accessor: "address.city" },
  ];
  const actions = [
    {
      icon: <VisibilityIcon />,
      onClick: (row: User) => handleClickClient(row.id.toString()),
      label: "Ver Detalles",
    },
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
        <div className="main">
          <div className="buttons-container">
            <Button
              variant="contained"
              onClick={() => toggleModal("confirm")}
              startIcon={<FileDownloadIcon />}
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            >
              Exportar a Excel
            </Button>
            <Button
              variant="contained"
              onClick={() => toggleModal("graphics")}
              startIcon={<AnalyticsIcon />}
              sx={{
                fontFamily: "'Source Sans Pro', sans-serif",
              }}
            >
              Reportes
            </Button>
          </div>

          <CustomTable
            columns={columns}
            data={rows}
            page={page}
            actions={actions}
            rowsPerPage={rowsPerPage}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />

          {/* Modales */}
          <GraphicsModal
            show={showGraphicsModal}
            onClose={() => setShowGraphicsModal(false)}
            users={rows}
            posts={posteoList || []}
          />
          <ConfirmModal
            show={showConfirmModal}
            onClose={() => setShowConfirmModal(false)}
            onConfirm={handleConfirm}
            alert="¿Desea descargar el archivo?"
            message={`Se descargará los datos de ${calculateItemsToProcess(
              rows.length,
              page,
              rowsPerPage
            )} usuarios de la lista`}
          />
        </div>
      )}
    </div>
  );
}

export default HomeView;
