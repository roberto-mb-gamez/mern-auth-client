import { useParams } from "react-router-dom";
import Layout from "../core/Layout";
import axios from "axios";
import jwt from "jsonwebtoken";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { useState, useEffect } from "react";

const Activate = () => {

   const { token: tokenParam } = useParams();

  const [values, setValues] = useState({
    name: '',
    token: '',
    show: true
  });

  useEffect(() => {
    let { name } = jwt.decode(tokenParam);
    if(tokenParam) {
        setValues({...values, name, token: tokenParam});
    }
  }, [])

  const { name, token } = values;

  const clickSubmit = (event) => {
    event.preventDefault();
    
    axios({
      method: 'POST',
      url: `${process.env.REACT_APP_API}/account-activation`,
      data: { token }
    }).then(response => {
      console.log('ACCOUNT ACTIVATION', response);
      setValues({ ...values, show: false });
      toast.success(response.data.message);
    })
    .catch(error => {
      console.log('ACCOUNT ACTIVATION ERROR', error.response.data);
     
      toast.error(error.response.data.error);
    })
  };

  const activationLink = () => (
      <div className="text-center">
          <h1 className="p-5">
              Hey {name}, Ready to activate your account?
          </h1>
          <button className="btn btn-outline-primary" onClick={clickSubmit}>
              Activate Account
          </button>
      </div>
  )

  return (
    <Layout>
      <div className="col-md-6 offset-md-3">
        <ToastContainer />
        {activationLink()}
      </div>
    </Layout>
  );
};

export default Activate;
