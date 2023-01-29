import React from 'react';
import ReactDOM from 'react-dom/client';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import App from './components/App';
import './styles/index.css';

import reportWebVitals from './reportWebVitals';

const client = new ApolloClient({
  uri: 'https://flyby-gateway.herokuapp.com/', //uri to be changed
  cache: new InMemoryCache(),
  connectToDevTools: true, //To enable the devtools in your app in production
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
