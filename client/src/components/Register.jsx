import { TextField, Button } from "@material-ui/core";
import React from "react";
import { Room as RoomIcon, CloseSharp } from "@material-ui/icons";
import { useForm } from "react-hook-form";
import Flip from "react-reveal/Flip";

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
            minLength: 5,
            maxLength: 30,
            pattern: /^(?!.*\.\.)(?!.*\.$)[^\W][\w.]{0,29}$/gim,
          })}
        />
        {errors.username?.type === "required" && (
          <Flip>
            <h5 style={{ color: "red" }}>Username is required</h5>
            <Flip></Flip>
          </Flip>
        )}
        {errors.username?.type === "minLength" && (
          <Flip>
            <h5 style={{ color: "red" }}>Username is more than 5 letters.</h5>
          </Flip>
        )}
        {errors.username?.type === "Pattern" && (
          <Flip>
            <h5 style={{ color: "red" }}>Right pattern is required.</h5>
          </Flip>
        )}
        {errors.username?.type === "maxLength" && (
          <Flip>
            <h5 style={{ color: "red" }}>
              Maximum length is less than 30 letters.
            </h5>
          </Flip>
        )}
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
        {errors.email?.type === "required" && (
          <Flip>
            <h5>Email is required</h5>
          </Flip>
        )}
        {errors.email?.type === "maxLength" && (
          <Flip>
            <h5>Maximum length is less than 50 letters.</h5>
          </Flip>
        )}
        {errors.email?.type === "pattern" && (
          <Flip>
            <h5>Right pattern is required. please try again </h5>
          </Flip>
        )}

        <TextField
          label="Password"
          id="password"
          type="password"
          variant="outlined"
          {...register("password", { required: true, minLength: 6 })}
        />
        {errors.password?.type === "required" && <h5>Password is required</h5>}
        {errors.password?.type === "minLength" && (
          <h5>Minimum length is over 6 letters.</h5>
        )}
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
