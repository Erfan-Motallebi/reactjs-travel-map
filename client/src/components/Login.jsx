import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import Flash from "react-reveal/Flash";

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
          label="Username"
          id="username"
          variant="outlined"
          {...register("username", {
            required: true,
            minLength: 4,
            pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
          })}
        />
        {errors.username?.type === "required" && (
          <Flash>
            <h5 style={{ color: "red" }}>Username is required</h5>
          </Flash>
        )}
        {errors.username?.type === "minLength" && (
          <Flash>
            <h5 style={{ color: "red" }}>Username is more than 4 letters.</h5>
          </Flash>
        )}
        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          {...register("password", { required: true, minLength: 5 })}
        />
        {errors.password?.type === "required" && (
          <Flash>
            <h5 style={{ color: "red" }}>Password is required</h5>
          </Flash>
        )}
        {errors.password?.type === "minLength" && (
          <Flash>
            <h5 style={{ color: "red" }}>Password is more than 6 letters</h5>
          </Flash>
        )}
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
