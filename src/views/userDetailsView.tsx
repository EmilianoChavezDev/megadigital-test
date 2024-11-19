import { useParams } from "react-router-dom";
import useGetAxios from "../hooks/useGetAxios";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Link as RouterLink } from "react-router-dom";
import { Breadcrumbs, CircularProgress, Link } from "@mui/material";
import ImagesModal from "../components/ImagesModal";
import CustomTable from "../components/CustomTable";

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

  const [albums, setAlbums] = useState<Album[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [showGraphicsModal, setShowGraphicsModal] = useState(false);
  const [albumId, setAlbumId] = useState<number>(0);
  const [albumName, setAlbumName] = useState<string>("");

  useEffect(() => {
    if (data && id) {
      const userAlbums = data.filter((album) => album.userId === Number(id));
      setAlbums(userAlbums);
    }
  }, [data, id]);

  // funciones de paginacion
  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleRowsPerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const toggleImagesModal = () => {
    setShowGraphicsModal(!showGraphicsModal);
  };

  const columns = [{ label: "Álbum", accessor: "title" }];
  const actions = [
    {
      icon: <VisibilityIcon />,
      onClick: (row: Album) => {
        toggleImagesModal(), setAlbumName(row.title), setAlbumId(row.id);
      },
      label: "Ver Album",
    },
  ];

  return (
    <div className="main">
      {loading ? (
        <div className="loading-container">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div>
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

            <CustomTable
              columns={columns}
              data={albums}
              page={page}
              rowsPerPage={rowsPerPage}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleRowsPerPageChange}
              actions={actions}
            />
          </div>
          <ImagesModal
            show={showGraphicsModal}
            onClose={toggleImagesModal}
            albumId={albumId}
            albumName={albumName}
          />
        </div>
      )}
    </div>
  );
};

export default UserDetailsView;
