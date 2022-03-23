import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useEffect, useState } from "react";
import { authenticate, isAuth } from "./helpers";
import Layout from "../core/Layout";
import Google from "./Google";

const Signin = () => {
  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "roberto.mb.gamez@hotmail.com",
    password: "",
    buttonText: "Submit",
  });

  const { email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  const informParent = (response) => {
    authenticate(response, () => {
      setValues({
        ...values,
        email: "",
        password: "",
        buttonText: "Submitted",
      });
      // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
      return isAuth() && isAuth().role === "admin"
        ? navigate("/admin")
        : navigate("/private");
    });
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, buttonText: "Submitting" });
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/signin`,
      data: { email, password },
    })
      .then((response) => {
        // save the response (user, token) localstorage
        authenticate(response, () => {
          return isAuth() && isAuth().role === "admin"
            ? navigate("/admin")
            : navigate("/private");
        });
      })
      .catch((error) => {
        console.log("SIGNIN ERROR", error.response.data);
        setValues({ ...values, buttonText: "Submit" });
        toast.error(error.response.data.error);
      });
  };

  const signinForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Email</label>
        <input
          type="email"
          className="form-control"
          value={email}
          onChange={handleChange("email")}
        />
      </div>

      <div className="form-group">
        <label className="text-muted">Password</label>
        <input
          type="password"
          className="form-control"
          value={password}
          onChange={handleChange("password")}
        />
      </div>

      <div>
        <button className="btn btn-primary" onClick={clickSubmit}>
          {buttonText}
        </button>
      </div>
    </form>
  );

  useEffect(() => {
    if (isAuth()) {
      return navigate("/");
    }
  }, []);

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />

        <h1 className="p-5 text-center">Signup</h1>
        <Google informParent={informParent} />
        {signinForm()}
        <br />
        <NavLink
          to="/auth/password/forgot"
          className="btn btn-sm btn-outline-danger"
        >
          Forgot Password
        </NavLink>
      </div>
    </Layout>
  );
};

export default Signin;
