import { Navigate } from "react-router-dom";
import { useStore } from "../../services/StoreProvider.js";
import Wrap from "../Wrap/Wrap.jsx";

const ProtectedRoute = ({ children }) => {
  const [state] = useStore();
  const { loggedIn } = state;
  return <Wrap>{loggedIn ? children : <Navigate to="/" />}</Wrap>;
};

export default ProtectedRoute;
