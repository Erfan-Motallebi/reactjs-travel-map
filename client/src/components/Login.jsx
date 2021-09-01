import { TextField, Button } from "@material-ui/core";
import React, { useState } from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";

function Login({ loginCb, setOpen }) {
  const { register, handleSubmit, watch, formState } = useForm();

  const registerHandler = (data) => {
    loginCb(data);
  };

  return (
    <div className="modal-container-login">
      <RoomIcon className="roomIcon" />
      <CloseSharp className="btn-close" onClick={setOpen.bind(this, false)} />
      <form className="form-login" onSubmit={handleSubmit(registerHandler)}>
        <TextField
          label="Username"
          id="username"
          variant="outlined"
          {...register("username")}
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          {...register("password")}
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
