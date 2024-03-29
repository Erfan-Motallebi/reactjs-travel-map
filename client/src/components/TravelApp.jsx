// LIBRARIES:
import React, { useState, Fragment, useCallback, useEffect } from "react";
import ReactMapGL, { Marker, Popup } from "react-map-gl";
import RoomRoundedIcon from "@material-ui/icons/RoomRounded";
import axios from "axios";
import Zoom from "react-reveal/Zoom";
import Fade from "react-reveal/Fade";
import Flash from "react-reveal/Flash";
import Bounce from "react-reveal/Bounce";
import { format } from "timeago.js";
import { ToastContainer, toast } from "react-toastify";
import { useQueryClient, useQuery } from "react-query";

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
import Register from "./Register";
import Login from "./Login";
import DeleteBtn from "./DeleteBtn";

const useStyles = makeStyles({
  toolBar: {
    display: "flex",
    justifyContent: "space-between",
  },
});

export default function TravelApp() {
  const queryClient = useQueryClient();
  const classes = useStyles();
  const { isLoading, isError, data } = useQuery("allPins", async () => {
    const { data } = await axios.get("api/pins");
    return data;
  });
  const [openState, setOpenState] = useState({
    login: false,
    register: false,
  });
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState({
    type: "",
    errorMessage: "",
  });
  const [currentPinId, setCurrentPinId] = useState(null);
  const [newPlace, setNewPlace] = useState(null);
  const [newPlaceInfo, setNewPlaceInfo] = useState({});
  // eslint-disable-next-line no-unused-vars
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("User"))
  );

  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 52,
    longitude: 13,
    zoom: 4,
  });
  const markerHandleClick = (id, lat, long) => {
    setCurrentPinId(id);
    setViewport({
      ...viewport,
      latitude: lat,
      longitude: long,
    });
  };

  const handleDoubleClick = (e) => {
    if (currentUser.username !== undefined) {
      const [long, lat] = e.lngLat;
      setNewPlace({
        lat,
        long,
      });
    }
    toast.warn(
      <Flash>
        <h5>Permission denied.</h5>
      </Flash>,
      { position: toast.POSITION.TOP_CENTER }
    );
  };

  const formSubmitHandle = async (e) => {
    e.preventDefault();
    await axios.post("api/pin", {
      ...newPlaceInfo,
      lat: newPlace.lat,
      long: newPlace.long,
    });
    setNewPlace(null);
    queryClient.invalidateQueries("allPins");
  };

  const registerHandlerCb = useCallback(
    async (registerValues) => {
      try {
        await axios.post("user/register", JSON.stringify(registerValues), {
          headers: { "Content-Type": "application/json" },
        });
        setOpenState({ ...openState, register: false });
        toast.success(
          <Flash duration={4000}>
            <h5>You registered.</h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      } catch ({
        response: {
          data: { error },
        },
      }) {
        setError({ type: "RegisterError", errorMessage: error.msg });
      }
    },
    [openState]
  );

  const loginCb = useCallback(async (user) => {
    try {
      const userInfo = await axios.request({
        url: "user/login",
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        data: JSON.stringify(user),
      });
      setCurrentUser(await userInfo.data);

      setOpenState({ ...openState, login: false });
      toast.success(
        <Bounce>
          <h5>Successfully logged in.</h5>
        </Bounce>,
        { position: toast.POSITION.TOP_CENTER }
      );
    } catch ({
      response: {
        data: { error },
      },
    }) {
      toast.error(
        <Flash>
          <h4>User not found.</h4>
        </Flash>,
        { position: toast.POSITION.TOP_CENTER }
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logOut = () => {
    setCurrentUser({});
    toast.success(
      <Bounce duration={1000} delay={500}>
        <h5>You logged out</h5>
      </Bounce>,
      { position: toast.POSITION.TOP_CENTER }
    );
  };

  useEffect(() => {
    localStorage.setItem("User", JSON.stringify(currentUser));
  }, [currentUser]);

  return (
    <Fragment>
      <div>
        <AppBar position="static">
          <Toolbar className={classes.toolBar}>
            <Typography variant="h5">React Travel App</Typography>
            <div style={{ flexBasic: 10 }}>
              {currentUser.username && currentUser.username !== null ? (
                <Button
                  style={{
                    background: "red",
                    color: "#fff",
                    fontWeight: 700,
                  }}
                  onClick={logOut}
                >
                  Logout
                </Button>
              ) : (
                <>
                  <Button
                    color="inherit"
                    onClick={() => setOpenState({ ...openState, login: true })}
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
                    onClick={() =>
                      setOpenState({ ...openState, register: true })
                    }
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
        {isLoading ? (
          <h1>Loading</h1>
        ) : isError ? (
          <h1>Something Went Wrong</h1>
        ) : (
          data &&
          data.map(
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
              <div key={id + Math.random(2)}>
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
                      color:
                        username === currentUser.username ? "red" : "purple",
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
                    <DeleteBtn pinId={id} currentUser={currentUser} />
                  </Popup>
                )}
              </div>
            )
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
                    setNewPlaceInfo({
                      ...newPlaceInfo,
                      title: e.target.value,
                    })
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
                    setNewPlaceInfo({
                      ...newPlaceInfo,
                      rating: e.target.value,
                    })
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
        {openState.register && (
          <Zoom duration={1000} bottom>
            <Register
              registerHandlerCb={registerHandlerCb}
              setOpen={setOpenState}
            />
          </Zoom>
        )}
        {openState.login && (
          <Fade duration={1500} bottom>
            <Login loginCb={loginCb} setOpen={setOpenState} />
          </Fade>
        )}
      </ReactMapGL>
      <ToastContainer autoClose={3000} />
    </Fragment>
  );
}
