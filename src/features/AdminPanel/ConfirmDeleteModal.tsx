import React from "react";
import { Modal, Box, Typography, Button, Stack, Fade } from "@mui/material";
import { Machine } from "@src/types";

interface ConfirmDeleteModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  machine: Machine | null;
}

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ConfirmDeleteModal: React.FC<ConfirmDeleteModalProps> = ({
  open,
  onClose,
  onConfirm,
  machine,
}) => {
  if (!machine) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <Fade in={open}>
        <Box sx={style}>
          <Typography variant="h6" color="black" component="h2">
            Confirm Deletion
          </Typography>
          <Typography sx={{ mt: 2 }} color="black">
            Are you sure you want to delete the machine:{" "}
            <strong>{machine.name}</strong>?
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ mt: 3, justifyContent: "flex-end" }}
          >
            <Button onClick={onClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={onConfirm}>
              Delete
            </Button>
          </Stack>
        </Box>
      </Fade>
    </Modal>
  );
};

export default ConfirmDeleteModal;
