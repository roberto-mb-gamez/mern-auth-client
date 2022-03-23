import Layout from "../core/Layout";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState } from "react";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "Roberto",
    email: "roberto.mb.gamez@hotmail.com",
    password: "",
    buttonText: "Submit",
  });

  const { name, email, password, buttonText } = values;

  const handleChange = (name) => (event) => {
    setValues({...values, [name]: event.target.value});
  };

  const clickSubmit = (event) => {
    event.preventDefault();
    setValues({...values, buttonText: 'Submitting'});
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/signup`,
      data: { name, email, password }
    }).then(response => {
      console.log('SINGUP SUCCESS', response);
      setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('SIGNUP ERROR', error.response.data);
      setValues({...values, buttonText: 'Submit'});
      toast.error(error.response.data.error);
    })
  };

  const signupForm = () => (
    <form>
      <div className="form-group">
        <label className="text-muted">Name</label>
        <input
          type="text"
          className="form-control"
          value={name}
          onChange={handleChange("name")}
        />
      </div>

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

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />

        {JSON.stringify({name, email, password})}

        <h1 className="p-5 text-center">Signup</h1>
        {signupForm()}
        <br />
        <NavLink to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
          Forgot Password
        </NavLink>
      </div>
    </Layout>
  );
};

export default Signup;
