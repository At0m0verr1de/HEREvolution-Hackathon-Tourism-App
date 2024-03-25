import React, { useEffect, useRef } from 'react';

const MapComponent = ({ apiKey, center = { lat: 52.5, lng: 13.4 }, zoom = 10 }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (window.H && mapRef.current) {
      const platform = new window.H.service.Platform({
        apikey: apiKey,
      });

      const defaultLayers = platform.createDefaultLayers();

      const map = new window.H.Map(mapRef.current, defaultLayers.vector.normal.map, {
        zoom: zoom,
        center: center,
      });

      // Create the default UI components
      const ui = window.H.ui.UI.createDefault(map, defaultLayers);

      // Enable the event system on the map instance:
      const mapEvents = new window.H.mapevents.MapEvents(map);

      // Instantiate the default behavior, providing the mapEvents object: 
      new window.H.mapevents.Behavior(mapEvents);

      // Placeholder for route rendering logic

      return () => {
        map.dispose(); // Cleanup map on component unmount
      };
    }
  }, [apiKey, center, zoom]); // Depend on apiKey, center, and zoom props

  return <div ref={mapRef} style={{ height: "500px", width: "100%" }}></div>;
};

export default MapComponent;
