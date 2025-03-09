import React, { useState } from 'react';
import { DialogTitle, DialogContent, DialogActions, TextField, Button, DialogContentText } from '@mui/material';
import MySnackbar from '../../UI/Snackbar/MySnackBar';
import AuthService from '../../../Services/AuthService';

interface RegisterFormProps {
  handleRegisterClose: () => void;
}

const RegisterForm: React.FC<RegisterFormProps> = ({ handleRegisterClose }) => {
  const [registerData, setRegisterData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [showError, setShowError] = useState(false);
  const isPasswordMatch = registerData.password === registerData.confirmPassword;

  const handleRegisterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegisterData({
      ...registerData,
      [e.target.id]: e.target.value,
    });
  };

  const handleRegisterSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (registerData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setShowError(true);
      return;
    }

    try {
      const response = await AuthService.register(registerData);
      handleRegisterClose();
    } catch (err: unknown) {
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
      <DialogTitle id="form-reg-title">Sign up</DialogTitle>
      <DialogContent>
        <DialogContentText>Register to create an account.</DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="email"
          label="Email Address"
          type="email"
          fullWidth
          value={registerData.email}
          onChange={handleRegisterChange}
        />
        <TextField
          margin="dense"
          id="password"
          label="Password"
          type="password"
          fullWidth
          value={registerData.password}
          onChange={handleRegisterChange}
        />
        <TextField
          margin="dense"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          value={registerData.confirmPassword}
          onChange={handleRegisterChange}
          error={registerData.password !== registerData.confirmPassword}
          helperText={registerData.password !== registerData.confirmPassword ? 'Passwords do not match' : ''}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleRegisterClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleRegisterSubmit} color="primary" disabled={!isPasswordMatch}>
          Register
        </Button>
      </DialogActions>
      <MySnackbar show={showError} setShow={setShowError} message={error} type="error" />
    </>
  );
};

export default RegisterForm;
