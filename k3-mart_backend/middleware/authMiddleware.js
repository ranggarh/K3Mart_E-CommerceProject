const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

// Middleware untuk verifikasi JWT


// Middleware untuk verifikasi JWT
exports.verifyToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).json({ message: 'Akses ditolak. Token tidak disediakan.' });
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Token tidak valid.' });
        }
        req.user = decoded;
        console.log('Decoded user:', req.user); // Tambahkan log ini
        next();
    });
};


// Middleware untuk admin
exports.verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Akses ditolak. Hanya admin yang bisa mengakses.' });
    }
    next();
};

// authMiddleware.js
let tokenBlacklist = []; // Simpan token yang telah di-logout

// Middleware untuk memeriksa apakah token ada di blacklist
exports.checkBlacklist = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (tokenBlacklist.includes(token)) {
        return res.status(401).json({ message: 'Token telah di-logout. Akses ditolak.' });
    }
    next();
};

exports.addToBlacklist = (token) => {
    tokenBlacklist.push(token);
};
