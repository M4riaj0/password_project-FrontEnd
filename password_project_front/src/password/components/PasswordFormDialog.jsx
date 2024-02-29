import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  Button,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { PasswordForm } from "../components";

const PasswordFormDialog = ({ open, onClose, id }) => {
  const [dialogTitle, setDialogTitle] = useState("Create Password");

  useEffect(() => {
    if (id) {
      setDialogTitle("Edit Password");
    } else {
      setDialogTitle("Create Password");
    }
  }, [id]);

  const handleDialogClose = () => {
    setDialogTitle("Create Password");
    onClose();  // Llama a la función onClose proporcionada
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle style={{ background: '#262254', color: '#fff', display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Typography variant="h6">{dialogTitle}</Typography>
        </div>
        <IconButton edge="end" color="inherit" onClick={handleDialogClose}>
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <PasswordForm id={id} onClose={handleDialogClose} />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          Cancel
        </Button>
        {/* Agregar aquí el botón "Save" si es necesario */}
      </DialogActions>
    </Dialog>
  );
};

export default PasswordFormDialog;
