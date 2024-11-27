export const setToken = (token) =>{
    localStorage.setItem('token', token);
};

export const getToken = () => {
    const token = localStorage.getItem('token');
    if (!token) return null;

    try {
        // Validasi token (hanya jika menggunakan JWT)
        const payload = JSON.parse(atob(token.split('.')[1])); // Decode payload
        const isExpired = payload.exp * 1000 < Date.now();
        return isExpired ? null : token;
    } catch (error) {
        console.error('Token tidak valid:', error);
        return null;
    }
};

export const removeToken = () =>{
    localStorage.removeItem('token');
};