import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Signup from "./auth/Signup";
import Signin from "./auth/Signin";
import Activate from "./auth/Activate";
import Private from "./core/Private";
import PrivateRoute from "./auth/PrivateRoute";
import Admin from "./core/Admin";
import Forgot from "./auth/Forgot";
import Reset from "./auth/Reset";

const RoutesApp = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                <Route path="/auth/activate/:token" element={<Activate />} />
                <Route path="/private" element={
                    <PrivateRoute>
                        <Private />
                    </PrivateRoute>
                } />
                <Route path="/admin" element={
                    <PrivateRoute role='admin'>
                        <Admin />
                    </PrivateRoute>
                } />
                <Route path="/auth/password/forgot" element={<Forgot />} />
                <Route path="/auth/password/reset/:token" element={<Reset />} />
            </Routes>
        </BrowserRouter>
    );
}

export default RoutesApp;