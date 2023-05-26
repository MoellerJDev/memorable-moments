import React, { useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { BrowserRouter as Router, Switch } from 'react-router-dom';

import client from './apollo';
import { AuthProvider } from './auth/AuthContext';

import Home from './components/Home';
import PhotoUpload from './components/PhotoUpload';
import UserProfile from './components/UserProfile';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';

const theme = createTheme();

function App() {
  const [setSignInOpen] = useState(false);
  const [setSignUpOpen] = useState(false);

  const handleSignInOpen = () => {
    setSignInOpen(true);
  };

  const handleSignUpOpen = () => {
    setSignUpOpen(true);
  };

  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Navbar onSignInClick={handleSignInOpen} onSignUpClick={handleSignUpOpen} />
            <AppBar position="static">
              <Toolbar>
                <Typography variant="h6">Memory App</Typography>
              </Toolbar>
            </AppBar>
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/upload" component={PhotoUpload} />
              <PrivateRoute exact path="/profile" component={UserProfile} />
            </Switch>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;