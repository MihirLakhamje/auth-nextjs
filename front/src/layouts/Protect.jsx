import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const ProtectedRoute = () => {
  const {isAuthenticated, user} = useAuth();
  console.log(user)
  if(user === null){
    return <h1>Loading..</h1>
  }

  // User is authenticated, render the protected route content
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
