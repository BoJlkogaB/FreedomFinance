import * as React from 'react';
import { Box, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useInput } from '../hooks/use-input';
import StockService from '../lib/services/stock.service';
import { AddItemError } from '../lib/errors/add-item.error';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: { xs: 250, sm: 400 },
  bgcolor: 'background.paper',
  boxShadow: 24,
  py: 2,
};

export default function Footer() {
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({} as AddItemError);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const title = useInput('');
  const price = useInput('');
  const dateAndTime = useInput('');

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append('title', title.value);
    formData.append('price', price.value);
    formData.append('date_and_time', dateAndTime.value);

    const response = await StockService.create(formData);

    if (response.status === 201) {
      window.location.reload();
    } else if (response.status === 400) {
      setErrors(JSON.parse(response.errors));
    }

  };

  return (
    <Box sx={{
      py: 3,
      px: 2,
      position: 'fixed', bottom: 0, left: 0, right: 0,
      textAlign: 'center',
    }}>
      <Button onClick={handleOpen} sx={{
        py: 1,
        px: 7,
        backgroundColor: 'red',
      }} variant="contained">New item</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" sx={{ px: 4 }}
                      component="h2">
            New item
          </Typography>
          <hr/>
          <Box sx={{ mt: 1, mb: 5, px: 4 }}>
            <Typography sx={{ mt: 2 }} variant="body1">
              Title
            </Typography>
            {errors.title ? (
              <TextField
                {...title}
                error
                helperText="Invalid title."
                id="title"
                margin="normal"
                fullWidth
              />
            ) : (
              <TextField
                {...title}
                id="title"
                margin="normal"
                fullWidth
              />
            )}
            <Typography variant="body1">
              Price
            </Typography>
            {errors.price ? (
              <TextField
                {...price}
                error
                helperText="Invalid price."
                margin="normal"
                id="price"
                fullWidth
                type="number"
              />
            ) : (
              <TextField
                {...price}
                margin="normal"
                id="price"
                fullWidth
                type="number"
              />
            )}
            <Typography variant="body1">
              Date and time
            </Typography>
            {errors.date_and_time === 'invalid' ? (
              <TextField
                {...dateAndTime}
                error
                helperText="Invalid date time."
                margin="normal"
                id="dateAndTime"
                fullWidth
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            ) : (
              <TextField
                {...dateAndTime}
                margin="normal"
                id="dateAndTime"
                fullWidth
                type="datetime-local"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            )}
          </Box>
          <hr/>
          <Box sx={{
            px: 4,
            textAlign: 'end',
          }}>
            <Button
              onClick={handleClose}
              variant="contained"
              sx={{
                mr: 2,
                backgroundColor: 'gray',
              }}
            >
              Close
            </Button>
            <Button
              onClick={handleSubmit}
              variant="contained"
              sx={{
                backgroundColor: 'red',
              }}
            >
              Add
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}