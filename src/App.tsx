import './App.scss';

import "../node_modules/bulma/css/bulma.css";
import GitHubAccounts from './components/GitHubAccounts/GitHubAccounts';
import Header from './components/Header/Header';

function App() {

  return (
    <div className="App">
      <Header />

      <ul className="App__circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <GitHubAccounts />
    </div>
  );
}

export default App;
