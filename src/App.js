import React, { useState } from 'react';
import Auth from './components/Auth/Auth';
import Home from './components/Home/Home';
import { useUserContext } from './context/userContext';
import { Grid, Snackbar } from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import AlertTitle from '@material-ui/lab/AlertTitle';

const App = () => {
  const { user, loading, error } = useUserContext();
  const [visible, setIsVisible] = useState(false);

  const Loading = () => {
    return (
      <Grid display='flex' direction='column' container alignItems='center' justifyContent='center'>
        <h2 style={{ marginTop: '100px' }}>
          Loading...
        </h2>
      </Grid>
    )
  }

  const Error = ({ error }) => {
    return (
      <Snackbar className='alertBox' styles={{ pointerEvents: 'auto' }} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} open={true}>
        <Alert severity="error">
          <AlertTitle>Lỗi</AlertTitle>
          {error}
        </Alert>
      </Snackbar >
    )
  }

  return (
    <div className='App'>
      {loading ? <Loading /> :
        <>
          {error && <Error error={error} />}
          {user ? <Home /> : <Auth />}
        </>}
    </div>
  )
}

export default App