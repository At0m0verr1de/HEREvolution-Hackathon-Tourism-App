import React, { useEffect, useRef } from 'react';

const MapComponent = ({ apiKey }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.H && mapRef.current) {
      const platform = new window.H.service.Platform({
        apikey: apiKey
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new window.H.Map(
        mapRef.current,
        defaultLayers.vector.normal.map,
        {
          zoom: 10,
          center: { lat: 52.5, lng: 13.4 },
        }
      );

      // Create the default UI components
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);

      // Enable the event system on the map instance:
      const mapEvents = new window.H.mapevents.MapEvents(map);

      // Instantiate the default behavior, providing the mapEvents object: 
      new window.H.mapevents.Behavior(mapEvents);
    }
  }, [apiKey]); // This effect depends on the apiKey prop

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>;
};

export default MapComponent;
