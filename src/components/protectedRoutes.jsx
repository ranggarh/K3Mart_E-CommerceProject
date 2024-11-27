// components/ProtectedRoute.js
import { Navigate, Outlet } from 'react-router-dom';
import { getToken } from '../utils/authUtils'; // Import fungsi untuk mendapatkan token

const ProtectedRoute = () => {
    return getToken() ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;
