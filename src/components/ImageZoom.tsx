import React, { useState, useEffect, useCallback } from "react";
import {
  Modal,
  Box,
  CardMedia,
  Typography,
  IconButton,
  CircularProgress,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

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
      closeAfterTransition
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          p: 2,
          position: "relative",
        }}
      >
        {/* Botón de cierre solo en pantallas pequeñas */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 16,
            right: 16,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            "&:hover": {
              backgroundColor: "rgba(255, 255, 255, 1)",
            },
            display: { xs: "block", sm: "none" },
          }}
        >
          <CloseIcon />
        </IconButton>

        {!photo?.url ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "400px",
              width: "60%",
              backgroundColor: "black",
              borderRadius: "1rem 0 0 1rem",
            }}
          >
            <CircularProgress color="secondary" />
          </Box>
        ) : (
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
                height: "400px",
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
                fontFamily: "'Source Sans Pro', sans-serif",
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
