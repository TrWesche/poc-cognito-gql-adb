import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloClient, ApolloProvider, HttpLink, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Amplify from "aws-amplify/";
import config from "./aws-exports";

Amplify.configure(config);

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:4000/graphql"
});

const authLink = setContext((_, { headers }) => {
  let key = null;
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i).indexOf(".accessToken") !== -1) {
      key = localStorage.key(i);
    }
  }

  const token = localStorage.getItem(key);

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})


ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
