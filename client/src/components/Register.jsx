import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import { ToastContainer } from "react-toastify";
import notify from "./utils/notify";
import ReactTooltip from "react-tooltip";

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
          data-tip="Enter your username"
          data-type="warning"
          data-text-color="#373F51"
          data-arrow-color="red"
          data-class="tooltip"
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
          data-tip="Enter your email"
          data-type="warning"
          data-text-color="#373F51"
          data-class="tooltip"
          data-arrow-color="red"
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
          data-tip="Enter your password"
          data-type="warning"
          data-text-color="#373F51"
          data-class="tooltip"
          data-arrow-color="red"
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
      <ReactTooltip delayUpdate={2000} delayShow={500} border={true} />
      <ReactTooltip delayUpdate={2000} delayShow={500} border={true} />
      <ReactTooltip delayUpdate={2000} delayShow={500} border={true} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
export default Register;
