import {
  Modal,
  Box,
  Typography,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import useGetAxios from "../hooks/useGetAxios";
import { useEffect, useState } from "react";

interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface GraphicsModalProps {
  show: boolean;
  onClose?: (id: number, title: string) => void;
  albumId: number;
  albumName: string;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  height: "80%",
  bgcolor: "white",
  overflowY: "auto",
  boxShadow: 24,
  borderRadius: "1rem",
  boxSizing: "border-box",
  "&::-webkit-scrollbar": {
    display: "none",
  },
};

const zoomStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  height: "40%",
  bgcolor: "white",
  boxShadow: 24,
  borderRadius: "1rem",
};

const ImagesModal: React.FC<GraphicsModalProps> = ({
  show,
  onClose,
  albumId,
  albumName,
}) => {
  const { data, loading } = useGetAxios<Photos[]>(`/photos?albumId=${albumId}`);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [resultado, setResultado] = useState(0);
  const [selectedPhoto, setSelectedPhoto] = useState<Photos | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    const formatearPhotos =
      data?.map((data: Photos) => ({
        albumId: data.albumId,
        id: data.id,
        title: data.title,
        url: data.url,
        thumbnailUrl: data.thumbnailUrl,
      })) || [];
    setResultado(data?.length || 0);
    setPhotos(formatearPhotos);
  }, [data]);

  const handlePhotoClick = (photo: Photos) => {
    setSelectedPhoto(photo);
  };

  const handleCloseZoomModal = () => {
    setSelectedPhoto(null);
  };

  // Función para cambiar de página
  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

  // Función para cambiar el número de fotos por página
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const paginatedPhotos = photos.slice(
    currentPage * rowsPerPage,
    currentPage * rowsPerPage + rowsPerPage
  );

  return (
    <>
      <Modal
        open={show}
        onClose={onClose}
        aria-labelledby="modal-graphics"
        aria-describedby="modal-description"
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
          <Box sx={style}>
            {/** Este es el titulo */}
            <Box
              sx={{
                position: "sticky",
                top: 0,
                backgroundColor: "#7B183E",
                zIndex: 10,
                p: 2,
                borderBottom: "1px solid #ddd",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <Typography id="modal-title" variant="h6" component="h2">
                    <span className="modal-album-name">{albumName}</span>
                  </Typography>

                  <Typography className="modal-album-name-result">
                    {resultado} foto(s)
                  </Typography>
                </div>
                <TablePagination
                  component="div"
                  count={photos.length}
                  page={currentPage}
                  onPageChange={handleChangePage}
                  rowsPerPage={rowsPerPage}
                  onRowsPerPageChange={handleChangeRowsPerPage}
                  rowsPerPageOptions={[5, 10, 25, 100]}
                  sx={{
                    color: "white",
                  }}
                />
              </div>
            </Box>

            <Card
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "2rem",
                alignItems: "stretch", // Ajusta la altura de cada tarjeta automáticamente
                borderRadius: "1rem",
                boxShadow: 0,
                p: 3,
                overflowY: "auto",
              }}
            >
              {paginatedPhotos?.map((photo) => (
                <CardActionArea
                  key={photo.id}
                  onClick={() => handlePhotoClick(photo)}
                  sx={{
                    width: "100%",
                    maxWidth: "250px",
                    margin: "0 auto",
                    boxShadow: 2,
                    borderRadius: "0.5rem",
                    height: "350px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    position: "relative",
                    overflow: "hidden",
                    "&:hover": {
                      transform: "scale(1.05)",
                      transition: "transform 0.2s ease-in-out",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={`${photo.url}`}
                    alt={`${photo.title}`}
                    sx={{
                      width: "100%",
                      height: "250px",
                      objectFit: "cover",
                      borderTopLeftRadius: "0.5rem",
                      borderTopRightRadius: "0.5rem",
                    }}
                  />
                  <CardContent sx={{ flex: "1 1 auto" }}>
                    <Typography
                      variant="body2"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {photo.title}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              ))}
            </Card>
          </Box>
        )}
      </Modal>

      {/* Modal para zoom de imagen */}
      <Modal
        open={!!selectedPhoto}
        onClose={handleCloseZoomModal}
        aria-labelledby="zoom-modal"
        aria-describedby="zoom-modal-description"
      >
        <Box sx={zoomStyle}>
          {selectedPhoto && (
            <div
              style={{
                display: "flex",
              }}
            >
              <CardMedia
                component="img"
                image={`${selectedPhoto.url}`}
                alt={`${selectedPhoto.title}`}
                sx={{
                  width: "60%",
                  height: "500px",
                  objectFit: "cover",
                  borderRadius: "1rem",
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  textAlign: "center",
                  p: 2,
                  color: "#868686",
                  fontFamily: "'Source Sans Pro', sans-serif",
                }}
              >
                <span
                  style={{
                    color: "black",
                    textTransform: "lowercase",
                    fontSize: "100",
                  }}
                >
                  Titulo:
                </span>
                {selectedPhoto.title}
              </Typography>
            </div>
          )}
        </Box>
      </Modal>
    </>
  );
};

export default ImagesModal;
