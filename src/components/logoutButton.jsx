// components/LogoutButton.js
import { useNavigate } from 'react-router-dom';
import { removeToken } from '../utils/authUtils'; // Import fungsi untuk menghapus token

const LogoutButton = () => {

    const navigate = useNavigate();
    

    const handleLogout = () => {
        removeToken();
        navigate('/auth/login');
    };

    return <button onClick={handleLogout}>Logout</button>;
};

export default LogoutButton;
