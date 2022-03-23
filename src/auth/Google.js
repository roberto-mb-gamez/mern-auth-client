import { useNavigate, NavLink } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { authenticate, isAuth } from "./helpers";
import GoogleLogin from "react-google-login";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";

const Google = ({informParent = f => f}) => {
  const responseGoogle = (response) => {
    console.log("RESPONSE GOOGLE LOGIN: ", response);
    axios({
      method: "POST",
      url: `${process.env.REACT_APP_API}/google-login`,
      data: { tokenId: response.tokenId },
    }).then(response => {
        console.log('GOOGLE SIGNIN SUCCESS', response);
        informParent(response);

    }).catch(error => {
        console.log('GOOGLE SIGNIN ERROR', error.response);
    });
  };

  return (
    <div className="pb-3">
      <GoogleLogin
        clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
        buttonText="Login"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        render={(renderProps) => (
          <button
            onClick={renderProps.onClick}
            disabled={renderProps.disabled}
            className="btn btn-danger btn-lg btn-block"
          >
            <FontAwesomeIcon icon={faUser} /> Login with Google
          </button>
        )}
        cookiePolicy={"single_host_origin"}
      />
    </div>
  );
};

export default Google;
