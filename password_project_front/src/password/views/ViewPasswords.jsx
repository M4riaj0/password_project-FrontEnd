import React, { useState } from 'react';
import {
  Grid,
  Typography,
  Button,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Card,
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import PasswordFormDialog from '../components/PasswordFormDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deletePassword } from '../../store/endpoints';

export const ViewPasswords = () => {
  const { passwords } = useSelector((state) => state.auth);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedPasswordId, setSelectedPasswordId] = useState(null);

  const handleDialogOpen = (id) => {
    setSelectedPasswordId(id);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setSelectedPasswordId(null);
    setOpenDialog(false);
  };
  const dispatch = useDispatch();
  const handleDeletePassword = (id) => {
    dispatch(deletePassword(id));
  };

  return (
    <Grid container direction='column' justifyContent='center' alignItems='center' style={{ minHeight: '100vh', background: '#8758ff', padding: '20px' }}>
      <Card style={{ padding: '20px', width: '600px', background: 'rgba(255, 255, 255, 0.8)' }}>
        <Typography variant='h4' style={{ color: '#8758ff', marginBottom: '20px', textAlign: 'center' }}>Passwords</Typography>
        <Button variant="contained" startIcon={<Add />} style={{ background: '#8758ff', color: '#fff', marginBottom: '20px', width: '100%' }} onClick={() => handleDialogOpen(null)}>
          Create Password
        </Button>
        <List>
          {passwords.map((passwordObj) => (
            <Paper key={passwordObj.id_password} elevation={3} style={{ margin: '10px', padding: '10px', background: '#fff' }}>
              <ListItem>
                <ListItemText primary={passwordObj.password} />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="edit" onClick={() => handleDialogOpen(passwordObj.id_password)}>
                    <Edit />
                  </IconButton>
                  <IconButton edge="end" aria-label="delete" onClick={() => handleDeletePassword(passwordObj.id_password)}>
                    <Delete />
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>
            </Paper>
          ))}
        </List>
        <PasswordFormDialog open={openDialog} onClose={handleDialogClose} id={selectedPasswordId} />
      </Card>
    </Grid>
  );
};
