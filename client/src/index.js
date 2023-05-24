import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ApolloProvider } from '@apollo/client';
import client from './apollo';

const root = document.getElementById('root');
if (root !== null) {
  const appRoot = ReactDOM.createRoot(root);
  appRoot.render(
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  );
}

reportWebVitals();
