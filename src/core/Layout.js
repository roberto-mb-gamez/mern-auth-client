import { NavLink, useNavigate } from "react-router-dom";
import { isAuth, signout } from "../auth/helpers";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  const isActive = (navData) => {
    if (navData.isActive) {
      return "text-dark nav-link";
    } else {
      return "text-light nav-link";
    }
  };

  // const isActive = path => {
  //   if(location.path === path) {
  //     return { color: '#000' };
  //   } else {
  //     return { color: '#fff' };
  //   }
  // };

  const nav = () => (
    <ul className="nav nav-tabs bg-primary">
      {/* <li className="nav-item" style={isActive('/')}>
        <NavLink
          to="/"
          className={isActive}
        >
          Home
        </NavLink>
      </li> */}
      <li className="nav-item">
        <NavLink to="/" className={isActive}>
          Home
        </NavLink>
      </li>
      {!isAuth() && (
        <>
          <li className="nav-item">
            <NavLink to="/signin" className={isActive}>
              Signin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className={isActive}>
              Signup
            </NavLink>
          </li>
        </>
      )}

      {isAuth() && isAuth().role === "admin" && (
        <>
          <li className="nav-item">
            <NavLink className={isActive} to="/admin">
              {isAuth().name}
            </NavLink>
          </li>
        </>
      )}

      {isAuth() && isAuth().role === "subscriber" && (
        <>
          <li className="nav-item">
            <NavLink className={isActive} to="/private">
              {isAuth().name}
            </NavLink>
          </li>
        </>
      )}

      {isAuth() && (
        <li className="nav-item">
          <span
            className="nav-link"
            style={{ cursor: "pointer", color: "#fff" }}
            onClick={() => {
              signout(() => {
                navigate("/");
              });
            }}
          >
            Signout
          </span>
        </li>
      )}
    </ul>
  );

  return (
    <>
      {nav()}
      <div className="container">{children}</div>
    </>
  );
};

export default Layout;
