import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import notify from "./utils/notify";

function Register({ registerHandlerCb, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

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
            minLength: 4,
            maxLength: 30,
            pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
          })}
        />
        {errors.username?.type === "required" && notify("username", "required")}
        {errors.username?.type === "minLength" &&
          notify("username", "minLength")}
        {errors.username?.type === "pattern" && notify("username", "pattern")}
        {errors.username?.type === "maxLength" &&
          notify("username", "maxLength")}
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
        {errors.email?.type === "required" && notify("email", "required")}
        {errors.email?.type === "maxLength" && notify("email", "maxLength")}
        {errors.email?.type === "pattern" && notify("email", "pattern")}

        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && notify("password", "required")}
        {errors.password?.type === "minLength" && notify("email", "minLength")}
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
      <ToastContainer autoClose={3000} />
    </div>
  );
}
export default Register;
