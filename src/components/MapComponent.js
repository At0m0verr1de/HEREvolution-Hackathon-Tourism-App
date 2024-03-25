import React, { useEffect, useRef } from 'react';

const MapComponent = ({ apiKey }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    // Dynamically load the HERE Maps API script if needed
    const script = document.createElement('script');
    script.src = `https://js.api.here.com/v3/3.1/mapsjs-core.js`;
    script.async = true;
    script.onload = () => {
      // Ensure the global H object is available
      if (window.H) {
        // Initialize the platform object:
        const platform = new window.H.service.Platform({
          apikey: apiKey
        });

        // Obtain the default map types from the platform object:
        const defaultLayers = platform.createDefaultLayers();

        // Instantiate (and display) a map:
        const map = new window.H.Map(
          mapRef.current,
          defaultLayers.vector.normal.map,
          {
            zoom: 10,
            center: { lat: 52.5, lng: 13.4 }
          }
        );

        // Add event listeners or additional map setup here
      }
    };
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, [apiKey]);

  return <div ref={mapRef} style={{ height: '500px' }} />;
};

export default MapComponent;
