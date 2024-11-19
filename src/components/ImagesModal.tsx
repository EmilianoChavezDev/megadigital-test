import {
  Modal,
  Box,
  Typography,
  CircularProgress,
  TablePagination,
} from "@mui/material";
import useGetAxios from "../hooks/useGetAxios";
import { useEffect, useState } from "react";
import ImageZoom from "./ImageZoom";

interface Photos {
  albumId: number;
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}

interface GraphicsModalProps {
  show: boolean;
  onClose?: () => void;
  albumId: number;
  albumName: string;
}

const ImagesModal: React.FC<GraphicsModalProps> = ({
  show,
  onClose,
  albumId,
  albumName,
}) => {
  const { data, loading } = useGetAxios<Photos[]>(`/photos?albumId=${albumId}`);
  const [photos, setPhotos] = useState<Photos[]>([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPhoto, setSelectedPhoto] = useState<Photos | null>(null);

  useEffect(() => {
    setPhotos(data || []);
  }, [data]);

  const handleChangePage = (event: unknown, newPage: number) => {
    setCurrentPage(newPage);
  };

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

  const handleZoomModal = () => {
    setSelectedPhoto(null);
  };

  return (
    <>
      <Modal
        open={show}
        onClose={onClose}
        aria-labelledby="modal-graphics"
        aria-describedby="modal-description"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {loading ? (
          <div className="loading-container">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <Box
            sx={{
              height: "80%",
              width: "90%",
              maxWidth: "90%",
              backgroundColor: "background.paper",
              borderRadius: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.3)",
              overflowY: "scroll",
              "&::-webkit-scrollbar": {
                width: "0px",
              },
            }}
          >
            <div className="header-container-image">
              <div className="header-container-data-image">
                <Typography
                  id="modal-title"
                  variant="h6"
                  component="h2"
                  sx={{
                    color: "white",
                    fontFamily: "'Source Sans Pro', sans-serif",
                  }}
                >
                  {albumName}
                </Typography>

                <Typography
                  className="modal-album-name-result"
                  sx={{
                    marginBottom: "20px",
                    fontFamily: "'Source Sans Pro', sans-serif",
                  }}
                >
                  {photos?.length} foto(s)
                </Typography>
              </div>

              <TablePagination
                component="div"
                count={photos.length}
                page={currentPage}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 20, 50]}
                sx={{
                  color: "white",
                }}
              />
            </div>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
                gap: "1rem",
                margin: "1rem",
              }}
            >
              {paginatedPhotos?.map((photo) => (
                <div className="card" key={photo.id}>
                  <div
                    className={`cover`}
                    style={{
                      backgroundImage: `url(${photo.url})`,
                      height: "300px",
                      borderRadius: "1rem",
                    }}
                  >
                    <span className="card-title-span">{photo.title}</span>
                    <div className="card-back">
                      <button onClick={() => setSelectedPhoto(photo)}>
                        Ampliar vista
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </Box>
          </Box>
        )}
      </Modal>

      {/* Modal para zoom de imagen */}
      <ImageZoom
        open={!!selectedPhoto}
        onClose={handleZoomModal}
        photo={selectedPhoto || undefined}
      />
    </>
  );
};

export default ImagesModal;
