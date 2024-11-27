const db = require('../db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
const { addToBlacklist } = require('../middleware/authMiddleware');

dotenv.config();

// Register API
exports.register = (req, res) => {
    const { username, email, password } = req.body;

    // Pastikan semua kolom penting diisi
    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Semua kolom harus diisi!' });
    }

    // Hash password
    const hashedPassword = bcrypt.hashSync(password, 10);

    // Role default adalah 'user' jika tidak ditentukan
    const role = 'user';  // Default role untuk pengguna baru adalah 'user'

    // Query untuk menambahkan pengguna baru ke database
    const query = 'INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)';
    db.query(query, [username, email, hashedPassword, role], (err, result) => {
        if (err) {
            if (err.code === 'ER_DUP_ENTRY') {
                return res.status(409).json({ message: 'Email sudah digunakan!' });
            }
            return res.status(500).json({ message: 'Error saat registrasi', error: err });
        }
        res.status(201).json({ message: 'Registrasi berhasil!' });
    });
};

// Login API
exports.login = (req, res) => {
    const { email, password } = req.body;

    // Pastikan email dan password diisi
    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password harus diisi!' });
    }

    // Query untuk mencari pengguna berdasarkan email
    const query = 'SELECT * FROM users WHERE email = ?';
    db.query(query, [email], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error saat login', error: err });
        }
        
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan!' });
        }

        const user = results[0];
        const passwordMatch = bcrypt.compareSync(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Password salah!' });
        }

        // Buat token JWT
        const token = jwt.sign(
            { userId: user.id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.status(200).json({ message: 'Login berhasil!', token });
    });
};

// Mengambil semua pengguna (khusus admin)
exports.getAllUsers = (req, res) => {
    const query = 'SELECT id, username, email, role FROM users';
    db.query(query, (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error saat mengambil data pengguna', error: err });
        }
        res.status(200).json(results);
    });
};

// Mengambil data pengguna berdasarkan ID
exports.getUserById = (req, res) => {
    const { id } = req.params;
    const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
    db.query(query, [id], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error saat mengambil data pengguna', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.status(200).json(results[0]);
    });
};

// Mengambil data pengguna yang sedang login
exports.getLoggedInUser = (req, res) => {
    const { userId } = req.user;
    const query = 'SELECT id, username, email, role FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error saat mengambil data pengguna', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Pengguna tidak ditemukan' });
        }
        res.status(200).json(results[0]);
    });
};

// Logout pengguna

exports.logout = (req, res) => {
    const token = req.headers.authorization?.split(' ')[1];
    addToBlacklist(token);
    res.status(200).json({ message: 'Logout berhasil!' });
};
