import logo from '../logo.svg';
import '../App.css';
import AskRoute  from './Map';
import React, { useState } from 'react';
import MapComponent from './MapComponent'
function App() {
  const apiKey = 'oCQJc1IR5PyALffJUV5wjLSM0b9Y9bByib9WIQ6mcHA'; // Replace with your actual HERE API key
  const [routeData, setRouteData] = useState(null); // State to hold route data

  // Callback function for lifting route data up from AskRoute
  const handleRouteData = (data) => {
    setRouteData(data);
  };

  return (
    <div className="App">
      <AskRoute apikey={apiKey} onRouteFetched={handleRouteData} />
      <MapComponent apiKey={apiKey} routeData={routeData} />
    </div>
  );
}

export default App;
