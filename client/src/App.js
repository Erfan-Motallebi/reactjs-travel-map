// LIBRARIES:
import React, { useState, useEffect, Fragment } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Star from "@material-ui/icons/Star";
import axios from "axios";
import { format } from "timeago.js";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles/makeStyles";

// FILES:
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [currentUser, setCurrentUser] = useState("Eric");
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

  const markerHandleClick = (id, lat, long) => {
    setCurrentPinId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long,
    });
  };

  const handleDoubleClick = (e) => {
    const [long, lat] = e.lngLat;
    setNewPlace({
      lat,
      long,
    });
  };
  return (
    <ReactMapGL
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      onViewportChange={(nextViewport) => setViewport(nextViewport)}
      mapStyle="mapbox://styles/erfanfulldevs/ckso9ue046glh18p809pn3avo"
      onDblClick={handleDoubleClick}
      transitionDuration="400"
    >
      {pins &&
        pins.map(
          ({ lat, long, title, username, description, createdAt, _id: id }) => (
            <div key={id}>
              <Marker
                latitude={lat}
                longitude={long}
                offsetLeft={-10}
                offsetTop={-20}
              >
                <RoomRoundedIcon
                  className="icon"
                  onClick={() => markerHandleClick(id, lat, long)}
                  style={{
                    fontSize: viewport.zoom * 6,
                    color: username === currentUser ? "red" : "purple",
                  }}
                />
              </Marker>
              {id === currentPinId && (
                <Popup
                  latitude={lat}
                  longitude={long}
                  closeButton={true}
                  closeOnClick={false}
                  anchor="right"
                  onClose={() => setCurrentPinId(null)}
                >
                  <div className="label">
                    <label>
                      <span>
                        <strong>Place:</strong>
                      </span>
                      <hr />
                      {title}
                    </label>
                    <label>
                      <span>
                        <strong>Description: </strong>
                      </span>
                      <hr />
                      {description}
                    </label>
                    <label>
                      <span>
                        <strong>Rating</strong>
                      </span>
                      <hr />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                      <Star className="star" />
                    </label>
                    <label>
                      <span>
                        <strong>Owner:</strong>
                      </span>
                      <hr />
                      Created by <b>{username}</b>
                    </label>
                    <label>
                      <span>
                        <strong>Date:</strong>
                      </span>
                      <hr />
                      {format(createdAt)}
                    </label>
                  </div>
                </Popup>
              )}
            </div>
          )
        )}
      {newPlace && (
        <Fragment>
          <Popup
            latitude={newPlace.lat}
            longitude={newPlace.long}
            closeButton={true}
            closeOnClick={false}
            anchor="right"
            onClose={() => setNewPlace(null)}
          >
            Hello new place
          </Popup>
          {/* <form>
            <div>
              <TextField
                id="standard-textarea"
                label="Multiline Placeholder"
                placeholder="Placeholder"
                multiline
              />
            </div>
          </form> */}
        </Fragment>
      )}
    </ReactMapGL>
  );
}

export default App;
