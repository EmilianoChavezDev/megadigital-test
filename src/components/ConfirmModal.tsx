import { Box, Modal, Typography, Button } from "@mui/material";

interface ConfirmModalProps {
  show: boolean;
  onClose: () => void;
  onConfirm: (confirmed: boolean) => void;
  message: string;
  alert: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  show,
  onClose,
  onConfirm,
  message,
  alert,
}) => {
  return (
    <Modal
      open={show}
      onClose={onClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className="container-confirm-modal">
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {alert}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {message}
        </Typography>

        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              onConfirm(true);
              onClose();
            }}
          >
            Confirmar
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => {
              onConfirm(false);
              onClose();
            }}
          >
            Cancelar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ConfirmModal;
