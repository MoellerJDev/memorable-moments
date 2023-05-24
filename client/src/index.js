import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AppRouter from './AppRouter';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import { app } from './auth/firebase';

import client from './apollo';

ReactDOM.render(
  <ApolloProvider client={client}>
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('root')
);

reportWebVitals();
