import { Navigate } from "react-router-dom";
import Wrap from "../Wrap/Wrap.jsx";

const ProtectedRoute = ({ children, loggedIn }) => {
  return <Wrap loggedIn={loggedIn}>{loggedIn ? children : <Navigate to="/sign-in" />}</Wrap>;
};

export default ProtectedRoute;
