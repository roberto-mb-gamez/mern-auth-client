import { Navigate, useLocation } from "react-router-dom";
import { isAuth } from "./helpers";

const PrivateRoute = ({ children, role }) => {
  console.log("ROLE: ", role);

  let location = useLocation();

  if (isAuth()) {
    if (role && role !== isAuth().role) {
      return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
  }

  return <Navigate to="/signin" state={{ from: location }} />;
};

export default PrivateRoute;
