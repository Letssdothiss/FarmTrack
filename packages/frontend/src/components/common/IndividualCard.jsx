import React, { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Box, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField, MenuItem } from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import { fetchWithAuth } from '../../utils/api';

const IndividualCard = ({ individual, onUpdate, onDelete, species }) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editedIndividual, setEditedIndividual] = useState(individual);
  const [error, setError] = useState('');

  const handleEditClick = () => {
    setEditedIndividual(individual);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleEditSubmit = async () => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/individuals/${species}/${individual._id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(editedIndividual)
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kunde inte uppdatera individen');
      }

      const updatedIndividual = await response.json();
      onUpdate(updatedIndividual);
      setIsEditDialogOpen(false);
      setError('');
    } catch (err) {
      setError(err.message || 'Kunde inte uppdatera individen');
    }
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await fetchWithAuth(
        `${import.meta.env.VITE_API_URL}/individuals/${species}/${individual._id}`,
        { method: 'DELETE' }
      );

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Kunde inte ta bort individen');
      }

      onDelete(individual);
      setIsDeleteDialogOpen(false);
    } catch (err) {
      console.error('Error in handleDeleteConfirm:', err);
      setError(err.message || 'Kunde inte ta bort individen');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedIndividual(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Card sx={{ mb: 2, bgcolor: 'rgb(69, 49, 22)' }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Box>
              <Typography variant="h6" color="white">{individual.name}</Typography>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
                SE-nummer: {individual.seNumber}
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
                Kön: {individual.gender === 'male' ? 'Hane' : 'Hona'}
              </Typography>
              <Typography color="rgba(255, 255, 255, 0.7)" variant="body2">
                Född: {new Date(individual.birthDate).toLocaleDateString()}
              </Typography>
            </Box>
            <Box>
              <IconButton onClick={handleEditClick} size="small" sx={{ color: 'white' }}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDeleteClick} size="small" color="error">
                <DeleteIcon />
              </IconButton>
            </Box>
          </Box>
        </CardContent>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onClose={() => setIsEditDialogOpen(false)}>
        <DialogTitle>Redigera individ</DialogTitle>
        <DialogContent>
          {error && (
            <Typography color="error" sx={{ mb: 2 }}>
              {error}
            </Typography>
          )}
          <TextField
            autoFocus
            margin="dense"
            name="name"
            label="Namn"
            type="text"
            fullWidth
            value={editedIndividual.name}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="seNumber"
            label="SE-nummer"
            type="text"
            fullWidth
            value={editedIndividual.seNumber}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
          <TextField
            select
            margin="dense"
            name="gender"
            label="Kön"
            fullWidth
            value={editedIndividual.gender}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          >
            <MenuItem value="male">Hane</MenuItem>
            <MenuItem value="female">Hona</MenuItem>
          </TextField>
          <TextField
            margin="dense"
            name="birthDate"
            label="Födelsedatum"
            type="date"
            fullWidth
            value={editedIndividual.birthDate.split('T')[0]}
            onChange={handleInputChange}
            InputLabelProps={{ shrink: true }}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="description"
            label="Beskrivning"
            multiline
            rows={4}
            fullWidth
            value={editedIndividual.description || ''}
            onChange={handleInputChange}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsEditDialogOpen(false)}>Avbryt</Button>
          <Button onClick={handleEditSubmit} variant="contained" color="primary">
            Spara
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onClose={() => setIsDeleteDialogOpen(false)}>
        <DialogTitle>Ta bort individ</DialogTitle>
        <DialogContent>
          <Typography>
            Är du säker på att du vill ta bort {individual.name}? Detta går inte att ångra.
          </Typography>
          {error && (
            <Typography color="error" sx={{ mt: 2 }}>
              {error}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Avbryt</Button>
          <Button onClick={handleDeleteConfirm} variant="contained" color="error">
            Ta bort
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default IndividualCard; 