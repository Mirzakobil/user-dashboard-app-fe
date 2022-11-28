import { Outlet, Navigate } from 'react-router-dom';

const RegisterRoute = () => {
  let auth = !localStorage.getItem('token');
  return auth ? <Outlet /> : <Navigate to="/register" />;
};

export default RegisterRoute;
