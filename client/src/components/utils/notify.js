import { toast } from "react-toastify";
import Flash from "react-reveal/Flash";

const notify = (field, type) => {
  switch (field) {
    case "username":
      if (type === "required")
        toast.error(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>Username is required</h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      else if (type === "minLength")
        toast.error(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>Username is more than 4 letters.</h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      else if (type === "pattern")
        toast.error(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>
              Wrong pattern! choose a better pattern.
            </h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      else if (type === "maxLength")
        toast.error(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>
              {" "}
              Maximum length is less than 30 letters.
            </h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      break;
    case "email":
      if (type === "required")
        toast.error(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>Email is required</h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      else if (type === "maxLength")
        toast(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>Email is less than 50 letters.</h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      else if (type === "pattern")
        toast(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>
              Wrong pattern! choose a better pattern.
            </h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      break;
    case "password":
      if (type === "required")
        toast(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>password is required.</h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      else if (type === "minLength")
        toast(
          <Flash delay={1000} duration={2000}>
            <h5 style={{ color: "red" }}>password is more than 6 letters.</h5>
          </Flash>,
          { position: toast.POSITION.TOP_CENTER }
        );
      break;
    default:
      break;
  }
};

export default notify;
