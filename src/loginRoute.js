import { Outlet, Navigate } from 'react-router-dom';

const LoginRoute = () => {
  let auth = !localStorage.getItem('token');
  return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default LoginRoute;
