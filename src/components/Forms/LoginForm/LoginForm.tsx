import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material';
import MySnackbar from '../../UI/Snackbar/MySnackBar';
import { Context } from '../../../main';
import { useContext } from 'react';

interface LoginFormProps {
  handleLoginClose: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ handleLoginClose }) => {
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const { store } = useContext(Context);

  const handleLoginChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({
      ...loginData,
      [e.target.id]: e.target.value,
    });
  };

  const handleLoginSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await store.login({ email: loginData.email, password: loginData.password, age: null });
      handleLoginClose();
    } catch (err: any) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('An unknown error occurred');
      }
      setShowError(true);
    }
  };

  return (
    <>
      <DialogTitle id="form-dialog-title">Log in</DialogTitle>
      <DialogContent>
        <DialogContentText>Log in to see your account.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={loginData.email}
          onChange={handleLoginChange}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={loginData.password}
          onChange={handleLoginChange}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleLoginClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleLoginSubmit} color="primary">
          Log in
        </Button>
      </DialogActions>
      <MySnackbar show={showError} setShow={setShowError} message={error} type="error" />
    </>
  );
};

export default LoginForm;
