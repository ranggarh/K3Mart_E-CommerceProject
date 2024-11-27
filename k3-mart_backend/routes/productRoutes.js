const express = require('express');
const router = express.Router();
const produkController = require('../controllers/produkController');
const upload = require('../middleware/upload'); // Asumsi konfigurasi multer berada di file ini


// Tambahkan route untuk create produk dengan gambar
router.post('/produk', upload.single('gambar'), produkController.createProduk);

// Route lainnya
router.get('/produk', produkController.getAllProduk);
router.get('/produk/:id_produk', produkController.getProdukById);
router.put('/produk/:id_produk', upload.single('gambar'), produkController.updateProduk);
router.delete('/produk/:id_produk', produkController.deleteProduk);

module.exports = router;
