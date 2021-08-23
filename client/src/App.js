// LIBRARIES:
import React, { useState } from "react";
import ReactMapGL from "react-map-gl";

// FILES:
import "./App.css";

function App() {
  const [viewport, setViewport] = useState({
    width: 400,
    height: 400,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    />
  );
}

export default App;
