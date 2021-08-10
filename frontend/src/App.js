import logo from './logo.svg';
import './App.css';
import { CreatePost } from './graphql/post/createPost';
import { GetPosts } from './graphql/post/getPosts';

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
      </header>
      <body>
        {CreatePost()}
        {GetPosts({onPostSelected: true})}
      </body>
    </div>
  );
}

export default App;
