import logo from '../logo.svg';
import '../App.css';
import React from 'react';
import MapComponent from './MapComponent'; // Adjust the path if necessary

function App() {
  const apiKey = 'ls7teHIyXK8xpLKosgaWzIu0bkEBWDgCfaPKV-ewWqI'; // Replace with your actual HERE API key
  
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
      {/* MapComponent is added here, passing the API key as a prop */}
      <MapComponent apiKey={apiKey} className="map-container" />
    </div>
  );
}

export default App;
