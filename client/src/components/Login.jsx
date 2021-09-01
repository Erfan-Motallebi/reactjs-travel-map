import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";

function Login({ loginCb, setOpen }) {
  const [userLogin, setUserLogin] = useState({
    username: "",
    password: "",
  });
  const registerHandler = (e) => {
    e.preventDefault();
    loginCb(userLogin);
  };

  return (
    <div className="modal-container-login">
      <RoomIcon className="roomIcon" />
      <CloseSharp className="btn-close" onClick={setOpen.bind(this, false)} />
      <form className="form-login" onSubmit={registerHandler}>
        <TextField
          label="Username"
          id="username"
          variant="outlined"
          onChange={(e) =>
            setUserLogin({ ...userLogin, username: e.target.value })
          }
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          onChange={(e) =>
            setUserLogin({ ...userLogin, password: e.target.value })
          }
        />
        <Button
          style={{
            background: "lightblue",
            color: "darkblue",
            fontWeight: 600,
            padding: "20px 0px 20px 0px",
          }}
          type="submit"
        >
          Login
        </Button>
      </form>
    </div>
  );
}
export default Login;
