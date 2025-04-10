import { JSX } from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ element }: { element: JSX.Element }): JSX.Element => {
  const isAuthenticated = localStorage.getItem('authToken');
  
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  
  return element;
};

export default PrivateRoute;
