// LIBRARIES:
import React, { useState, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import Star from "@material-ui/icons/Star";
import axios from "axios";
import { format } from "timeago.js";
import {
  FormControl,
  TextField,
  InputAdornment,
  Button,
} from "@material-ui/core";
import {
  AccountCircle,
  Title,
  StarOutline,
  Description,
  Send,
} from "@material-ui/icons";

// FILES:
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";

function App() {
  const [pins, setPins] = useState([]);
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [newPlaceInfo, setNewPlaceInfo] = useState({});
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

  const formSubmitHandle = (e) => {
    e.preventDefault();
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
                    cursor: "pointer",
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
        <Popup
          latitude={newPlace.lat}
          longitude={newPlace.long}
          closeButton={true}
          closeOnClick={false}
          anchor="right"
          onClose={() => setNewPlace(null)}
        >
          <FormControl className="form-control" onSubmit={formSubmitHandle}>
            <div>
              <TextField
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, username: e.target.value })
                }
                label="Username"
                InputLabelProps={{
                  style: {
                    color: "#2D46B9",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                label="Title"
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, title: e.target.value })
                }
                InputLabelProps={{
                  style: {
                    color: "#2D46B9",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Title />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                label="Description"
                onChange={(e) =>
                  setNewPlaceInfo({
                    ...newPlaceInfo,
                    description: e.target.value,
                  })
                }
                InputLabelProps={{
                  style: {
                    color: "#2D46B9",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <Description />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <div>
              <TextField
                label="Rating"
                onChange={(e) =>
                  setNewPlaceInfo({ ...newPlaceInfo, rating: e.target.value })
                }
                InputLabelProps={{
                  style: {
                    color: "#2D46B9",
                    fontWeight: 700,
                    fontSize: "1.1rem",
                  },
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="end">
                      <StarOutline />
                    </InputAdornment>
                  ),
                }}
              />
            </div>
            <Button variant="contained" color="primary" startIcon={<Send />}>
              Submit
            </Button>
          </FormControl>
        </Popup>
      )}
    </ReactMapGL>
  );
}

export default App;
