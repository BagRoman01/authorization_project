import React from 'react';
import { AppBar, Button, Container, Toolbar, Typography, Box } from '@mui/material';
import { Dialog } from '@mui/material';
import LoginForm from '../../Forms/LoginForm/LoginForm';
import RegisterForm from '../../Forms/RegisterForm/RegisterForm';
import styles from "./MyAppBar.module.css"

interface MyAppBarProps {
  handleLoginOpen: () => void;
  handleRegisterOpen: () => void;
  loginOpen: boolean;
  registerOpen: boolean;
  handleLoginClose: () => void;
  handleRegisterClose: () => void;
}

const MyAppBar: React.FC<MyAppBarProps> = ({
  handleLoginOpen,
  handleRegisterOpen,
  loginOpen,
  registerOpen,
  handleLoginClose,
  handleRegisterClose,
}) => {
  return (
    <AppBar position="fixed">
      <Container maxWidth={false}>
        <Toolbar className={styles.toolbar}>
          <Typography variant="h6" className={styles.title}>
            TONALYZER
          </Typography>
          <Box className={styles.buttonGroup}>
            <Button color="inherit" variant="outlined" onClick={handleLoginOpen}>
              Log In
            </Button>
            <Dialog open={loginOpen} onClose={handleLoginClose} aria-labelledby="form-dialog-title">
              <LoginForm handleLoginClose={handleLoginClose} />
            </Dialog>
            <Button color="secondary" variant="contained" onClick={handleRegisterOpen}>
              Sign up
            </Button>
            <Dialog open={registerOpen} onClose={handleRegisterClose} aria-labelledby="form-reg-title">
              <RegisterForm handleRegisterClose={handleRegisterClose} />
            </Dialog>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default MyAppBar;
