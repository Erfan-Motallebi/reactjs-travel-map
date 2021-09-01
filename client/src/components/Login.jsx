import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";

function Login({ loginCb, setOpen }) {
  const { register, handleSubmit } = useForm();

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
          {...register("username", {
            required: true,
            minLength: 5,
            pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
          })}
        />
        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          {...register("password", { required: true, minLength: 6 })}
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
