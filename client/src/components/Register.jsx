import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";

function Register({ registerHandlerCb, setOpen }) {
  const { register, handleSubmit } = useForm();
  const registerHandler = (data) => {
    registerHandlerCb(data);
  };

  return (
    <div className="modal-container">
      <RoomIcon className="roomIcon" />
      <CloseSharp className="btn-close" onClick={setOpen.bind(this, false)} />
      <form className="form-register" onSubmit={handleSubmit(registerHandler)}>
        <TextField
          label="Username"
          id="username"
          variant="outlined"
          {...register("username", {
            required: true,
            minLength: 3,
            maxLength: 30,
            pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
          })}
        />
        <TextField
          label="Email"
          id="email"
          variant="outlined"
          {...register("email", {
            required: true,
            maxLength: 50,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
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
