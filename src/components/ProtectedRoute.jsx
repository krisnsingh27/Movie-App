    import React from 'react';
    import { Navigate, Outlet } from 'react-router-dom';

    const ProtectedRoute = ({ redirectPath = '/login' }) => {
      const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

      if (!isLoggedIn) {
        return <Navigate to={redirectPath} replace />;
      }

      return <Outlet />;
    };

    export default ProtectedRoute;

    

