// LIBRARIES:
import React, { useState, useMemo } from "react";
import ReactMapGL, { Marker } from "react-map-gl";

// FILES:
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 52,
    longitude: 13,
    zoom: 4,
  });

  const markers = useMemo(() => {
    return (
      <Marker latitude={52.520008} longitude={13.404954}>
        <div>You are here</div>
      </Marker>
    );
  }, []);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
    >
      {markers}
    </ReactMapGL>
  );
}

export default App;
