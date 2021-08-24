// LIBRARIES:
import React, { useState, useMemo } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Star from "@material-ui/icons/Star";

// FILES:
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  // const [showPopup, togglePopup] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 52,
    longitude: 13,
    zoom: 4,
  });

  const markers = useMemo(() => {
    return (
      <Marker
        latitude={52.520008}
        longitude={13.404954}
        offsetLeft={-10}
        offsetTop={-20}
      >
        <RoomRoundedIcon
          className="icon"
          style={{ fontSize: viewport.zoom * 6 }}
        />
      </Marker>
    );
  }, [viewport.zoom]);

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/erfanfulldevs/ckso9ue046glh18p809pn3avo"
    >
      {markers}
      <Popup
        latitude={52.520008}
        longitude={13.404954}
        closeButton={true}
        closeOnClick={false}
        anchor="right"
      >
        <div className="label">
          <label>
            <strong>Place:</strong>
            <hr />
            Berlin
          </label>
          <label>
            <strong>Description: </strong>
            <hr />I liked the place
          </label>
          <label>
            <strong>Rating</strong>
            <hr />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
            <Star className="star" />
          </label>
          <label>
            <strong>Date:</strong>
            <hr />2 days ago
          </label>
        </div>
      </Popup>
    </ReactMapGL>
  );
}

export default App;
