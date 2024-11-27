// routes/transactionRoutes.js
const express = require('express');
const router = express.Router();
const { createTransaction,getRiwayat, updateTransactionStatus } = require('../controllers/transaksiController');
const { verifyToken, verifyAdmin } = require('../middleware/authMiddleware'); // Pastikan path sesuai

// Route untuk membuat transaksi
router.post('/create', verifyToken, createTransaction);

router.get('/riwayat', verifyToken, getRiwayat);


router.put('/update-status/:id', verifyToken, verifyAdmin, updateTransactionStatus);


module.exports = router;
