// utils/api.js
import { getToken } from './authUtils'; // Import fungsi untuk mendapatkan token

// Fungsi untuk mengirim permintaan dengan token JWT
export const fetchProtectedData = async (url) => {
    const token = getToken();
    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
};

// Fungsi untuk login
export const login = async (email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
};


export const fetchUserDetails = async () => {
    const token = getToken();
    const response = await fetch('http://localhost:5000/api/auth/me', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
};


export const register = async (username, email, password) => {
    const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
    });

    const data = await response.json();
    if (response.ok) {
        return data;
    } else {
        throw new Error(data.message);
    }
};

// Other functions (login, fetchProtectedData, etc.) remain unchanged

