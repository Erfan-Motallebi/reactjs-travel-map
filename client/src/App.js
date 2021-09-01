// LIBRARIES:
import React, { useState, useEffect, Fragment, useCallback } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import { format } from "timeago.js";
import {
  TextField,
  AppBar,
  Toolbar,
  Typography,
  TextareaAutosize,
  NativeSelect,
  Button,
  makeStyles,
} from "@material-ui/core";
import { Star, Send } from "@material-ui/icons";

// FILES:
import "mapbox-gl/dist/mapbox-gl.css";
import "./App.css";
import Register from "./components/Register";

const useStyles = makeStyles({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
  // modalCom: {
  //   display: "grid",
  //   placeContent: "center",
  // },
});

function App() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [pins, setPins] = useState([]);
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [newPlaceInfo, setNewPlaceInfo] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState(null);

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
        const allPins = await axios.get("api/pins", {
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
    axios.post("api/pin", {
      ...newPlaceInfo,
      lat: newPlace.lat,
      long: newPlace.long,
    });
  };

  const registerHandlerCb = useCallback(async (registerValues) => {
    axios.post("user/register", registerValues, {
      headers: { "Content-Type": "application/json" },
    });
    setCurrentUser((oldUsers) => {
      return [...oldUsers, registerValues];
    });
    setOpen(false);
  }, []);

  return (
    <Fragment>
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h5">React Travel App</Typography>
            <div style={{ flexBasic: 10 }}>
              {currentUser ? (
                <Button
                  style={{ background: "red", color: "#fff", fontWeight: 700 }}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    style={{
                      background: "green",
                      color: "#fff",
                      fontWeight: 700,
                    }}
                  >
                    Login
                  </Button>
                  <Button
                    color="inherit"
                    onClick={() => setOpen(true)}
                    style={{
                      background: "black",
                      color: "#fff",
                      fontWeight: 700,
                      marginLeft: 10,
                    }}
                  >
                    Register
                  </Button>
                </>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
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
            ({
              lat,
              long,
              title,
              username,
              description,
              createdAt,
              rating,
              _id: id,
            }) => (
              <div key={id}>
                <Marker
                  latitude={lat}
                  longitude={long}
                  offsetLeft={-viewport.zoom * 3}
                  offsetTop={-viewport.zoom * 6}
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
                        {Array(rating).fill(<Star className="star" />)}
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
            <form className="form-control" onSubmit={formSubmitHandle}>
              <div>
                <TextField
                  onChange={(e) =>
                    setNewPlaceInfo({
                      ...newPlaceInfo,
                      username: e.target.value,
                    })
                  }
                  label="Username"
                  variant="outlined"
                  InputLabelProps={{
                    style: {
                      color: "#2D46B9",
                      fontWeight: 700,
                      fontSize: "1rem",
                    },
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
                      fontSize: "1rem",
                    },
                  }}
                  variant="outlined"
                />
              </div>
              <div>
                <TextareaAutosize
                  className="textareaMat"
                  placeholder="Your description"
                  minRows={3}
                  maxRows={6}
                  minLength={5}
                  onChange={(e) =>
                    setNewPlaceInfo({
                      ...newPlaceInfo,
                      description: e.target.value,
                    })
                  }
                />
              </div>
              <div>
                <NativeSelect
                  className="nSelect"
                  onChange={(e) =>
                    setNewPlaceInfo({ ...newPlaceInfo, rating: e.target.value })
                  }
                >
                  <option aria-label="None" value="">
                    Select Your Rating
                  </option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                  <option value={5}>5</option>
                </NativeSelect>
              </div>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<Send />}
                className="btn"
              >
                Submit
              </Button>
            </form>
          </Popup>
        )}
        {open && (
          <Zoom duration={1000} bottom>
            <Register registerHandlerCb={registerHandlerCb} setOpen={setOpen} />
          </Zoom>
        )}
      </ReactMapGL>
    </Fragment>
  );
}

export default App;
