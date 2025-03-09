import React, { useState } from 'react';
import AppRouter from './AppRouter/AppRouter';
import MyAppBar from './components/UI/MyAppBar/MyAppBar';
import useAuthLoading from './hooks/useAuthLoading';
import CircularLoader from './components/UI/Loader/CircularLoader';
import { observer } from 'mobx-react-lite';

function App() {
  const [loginOpen, setLoginOpen] = useState(false);
  const [registerOpen, setRegisterOpen] = useState(false);
  const { initialLoading, isLoading } = useAuthLoading();


  const handleLoginOpen = () => setLoginOpen(true);
  const handleLoginClose = () => setLoginOpen(false);

  const handleRegisterOpen = () => setRegisterOpen(true);
  const handleRegisterClose = () => setRegisterOpen(false);

  if (isLoading || initialLoading) {
    return <CircularLoader />;
  }

  return (
    <>
      <MyAppBar
        handleLoginOpen={handleLoginOpen}
        handleRegisterOpen={handleRegisterOpen}
        loginOpen={loginOpen}
        registerOpen={registerOpen}
        handleLoginClose={handleLoginClose}
        handleRegisterClose={handleRegisterClose}
      />
      <main>
        <AppRouter />
      </main>
    </>
  );
}

export default observer(App);
