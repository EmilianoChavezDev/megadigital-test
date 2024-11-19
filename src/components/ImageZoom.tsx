import React from "react";
import { Modal, Box, CardMedia, Typography } from "@mui/material";

interface ImageZoomModalProps {
  open: boolean;
  onClose: () => void;
  photo?: {
    url: string;
    title: string;
  };
}

const ImageZoom: React.FC<ImageZoomModalProps> = ({ open, onClose, photo }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="zoom-modal"
      aria-describedby="zoom-modal-description"
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          p: 2,
        }}
      >
        {photo && (
          <Box
            sx={{
              display: "flex",
              backgroundColor: "white",
              borderRadius: "1rem",
              boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
              overflow: "hidden",
            }}
          >
            <CardMedia
              component="img"
              image={photo.url}
              alt={photo.title}
              sx={{
                width: "60%",
                height: "500px",
                objectFit: "cover",
                borderRadius: "1rem 0 0 1rem",
              }}
            />
            <Typography
              variant="h6"
              sx={{
                textAlign: "center",
                p: 2,
                color: "#868686",
                fontFamily: "'Oswald', sans-serif",
                width: "40%",
              }}
            >
              <span
                style={{
                  color: "#868686",
                  textTransform: "capitalize",
                }}
              >
                Título:
              </span>{" "}
              <span
                style={{
                  color: "black",
                  textTransform: "capitalize",
                  fontWeight: "bold",
                }}
              >
                {photo.title}
              </span>
            </Typography>
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default ImageZoom;
