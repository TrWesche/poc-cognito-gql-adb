import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import { CreatePost } from './graphql/post/createPost';
import { GetPosts } from './graphql/post/getPosts';
import { withAuthenticator, AmplifySignOut, AmplifyAuthenticator, AmplifySignIn } from '@aws-amplify/ui-react';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <AmplifySignIn />
      </header>
      <body>
        {CreatePost()}
        {GetPosts({onPostSelected: true})}
      </body>
      <footer>
        <AmplifySignOut />
      </footer>
    </div>
  );
}

export default App;
