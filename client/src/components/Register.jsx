import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import RoomIcon from "@material-ui/icons/Room";
function Register({ registerHandlerCb }) {
  const [registered, setRegistered] = useState({
    username: "",
    email: "",
    password: "",
  });
  const registerHandler = (e) => {
    e.preventDefault();
    registerHandlerCb(registered);
  };

  return (
    <div className="modal-container">
      <RoomIcon className="roomIcon" />
      <form className="form-register" onSubmit={registerHandler}>
        <TextField
          label="Username"
          id="outlined-size-normal"
          variant="outlined"
          onChange={(e) =>
            setRegistered({ ...registered, username: e.target.value })
          }
        />
        <TextField
          label="Email"
          id="outlined-size-normal"
          variant="outlined"
          onChange={(e) =>
            setRegistered({ ...registered, email: e.target.value })
          }
        />
        <TextField
          label="Password"
          id="outlined-size-normal"
          variant="outlined"
          onChange={(e) =>
            setRegistered({ ...registered, password: e.target.value })
          }
        />
        <Button
          style={{
            background: "lightblue",
            color: "darkblue",
            fontWeight: 600,
          }}
          type="submit"
        >
          Register
        </Button>
      </form>
    </div>
  );
}
export default Register;
