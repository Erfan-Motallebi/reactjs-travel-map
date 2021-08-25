// LIBRARIES:
import React, { useState, useEffect, Fragment } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Star from "@material-ui/icons/Star";
import axios from "axios";
import { format } from "timeago.js";

// FILES:
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const [pins, setPins] = useState([]);
  const [showPopup, togglePopup] = useState(false);
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 52,
    longitude: 13,
    zoom: 4,
  });

  useEffect(() => {
    const fetchedPins = async () => {
      try {
        const allPins = await axios.get("/pins", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setPins(await allPins.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchedPins();
  }, []);

  const togglePopupFunc = (pinId) => {
    pins.filter((pin) => {
      if (pin._id === pinId) togglePopup(true);
      return pin;
    });
  };

  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/erfanfulldevs/ckso9ue046glh18p809pn3avo"
    >
      {pins &&
        pins.map(
          ({ lat, long, title, username, description, createdAt, _id }) => (
            <div key={_id}>
              <Marker
                latitude={lat}
                longitude={long}
                offsetLeft={-10}
                offsetTop={-20}
              >
                <RoomRoundedIcon
                  className="icon"
                  onClick={togglePopupFunc.bind(null, _id)}
                  style={{ fontSize: viewport.zoom * 6 }}
                />
              </Marker>
              {showPopup && (
                <Popup
                  latitude={lat}
                  longitude={long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="right"
                  onClose={() => togglePopup(false)}
                >
                  <div className="label">
                    <label>
                      <strong>Place:</strong>
                      <hr />
                      {title}
                    </label>
                    <label>
                      <strong>Description: </strong>
                      <hr />
                      {description}
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
                      <strong>Owner:</strong>
                      <hr />
                      Created by <b>{username}</b>
                    </label>
                    <label>
                      <strong>Date:</strong>
                      <hr />
                      {format(createdAt)}
                    </label>
                  </div>
                </Popup>
              )}
            </div>
          )
        )}
    </ReactMapGL>
  );
}

export default App;
