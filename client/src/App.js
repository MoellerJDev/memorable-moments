import React from 'react';
import { ApolloProvider } from '@apollo/client';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import client from './graphql/client';
import firebase from './auth/firebase';

// Import your components here
import Home from './components/Home';
import PhotoUpload from './components/PhotoUpload';
import UserProfile from './components/UserProfile';

const theme = createTheme();

function App() {
  return (
    <ApolloProvider client={client}>
      <ThemeProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/upload" component={PhotoUpload} />
            <Route exact path="/profile" component={UserProfile} />
          </Switch>
        </Router>
      </ThemeProvider>
    </ApolloProvider>
  );
}

export default App;
