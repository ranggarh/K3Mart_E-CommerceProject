const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken,checkBlacklist, verifyAdmin } = require('../middleware/authMiddleware');

// Register dan Login
router.post('/register', authController.register);
router.post('/login', authController.login);

// Rute khusus admin
router.get('/admin-only', verifyToken, verifyAdmin, (req, res) => {
    res.status(200).json({ message: 'Selamat datang Admin!' });
});

router.get('/users', verifyToken, verifyAdmin, authController.getAllUsers);

// Endpoint untuk mendapatkan data pengguna berdasarkan ID (terbuka untuk semua pengguna)
router.get('/users/:id', verifyToken, authController.getUserById);

// Endpoint untuk mendapatkan data pengguna yang sedang login (dengan token)
router.get('/me', verifyToken, checkBlacklist, authController.getLoggedInUser);

// Route untuk logout
router.post('/logout', verifyToken, checkBlacklist, authController.logout);


module.exports = router;
