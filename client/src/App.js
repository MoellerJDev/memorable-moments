import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import client from './apollo';
import { AuthProvider } from './auth/AuthContext';

// Import your components here
import Home from './components/Home';
import PhotoUpload from './components/PhotoUpload';
import UserProfile from './components/UserProfile';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import PrivateRoute from './routes/PrivateRoute';
import Navbar from './components/Navbar';

const theme = createTheme();

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <AuthProvider>
          <Router>
            <Navbar />  {/* Use Navbar here */}
            <Switch>
              <PrivateRoute exact path="/" component={Home} />
              <PrivateRoute exact path="/upload" component={PhotoUpload} />
              <PrivateRoute exact path="/profile" component={UserProfile} />
              <Route path="/signin" component={SignIn} />
              <Route path="/signup" component={SignUp} />
            </Switch>
          </Router>
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
