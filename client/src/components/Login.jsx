import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import notify from "./utils/notify";
import { ToastContainer } from "react-toastify";
import ReactTooltip from "react-tooltip";

function Login({ loginCb, setOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const registerHandler = (data) => {
    loginCb(data);
  };

  return (
    <div className="modal-container-login">
      <RoomIcon className="roomIcon" />
      <CloseSharp className="btn-close" onClick={setOpen.bind(this, false)} />
      <form className="form-login" onSubmit={handleSubmit(registerHandler)}>
        <TextField
          data-tip="Enter your username"
          data-type="warning"
          data-text-color="#373F51"
          data-class="tooltip"
          label="Username"
          id="username"
          variant="outlined"
          {...register("username", {
            required: true,
            minLength: 4,
            pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
          })}
        />
        {errors.username?.type === "required" && notify("username", "required")}
        {errors.username?.type === "minLength" &&
          notify("username", "minLength")}
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
          {...register("password", { required: true, minLength: 5 })}
        />
        {errors.password?.type === "required" && notify("password", "required")}
        {errors.password?.type === "minLength" &&
          notify("password", "minLength")}
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
      <ReactTooltip delayUpdate={2000} delayShow={500} border={true} />
      <ReactTooltip delayUpdate={2000} delayShow={500} border={true} />
      <ToastContainer autoClose={3000} />
    </div>
  );
}
export default Login;
