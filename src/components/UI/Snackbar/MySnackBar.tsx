import React from 'react';
import { Snackbar, Alert, AlertColor } from '@mui/material';

interface MySnackbarProps {
  show: boolean; 
  setShow: React.Dispatch<React.SetStateAction<boolean>>; 
  message: string; 
  type?: AlertColor; 
}

const MySnackbar: React.FC<MySnackbarProps> = ({ show, setShow, message, type = 'info' }) => {
  const handleCloseSnackbar = () => {
    setShow(false); 
  };

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      onClose={handleCloseSnackbar}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
    >
      <Alert
        onClose={handleCloseSnackbar}
        severity={type}
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MySnackbar;
