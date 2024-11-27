const { query } = require('express');
const db = require('../db');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Tentukan folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nama file unik
    }
});

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage: storage });

// exports.createProduk = (req, res) => {
//     const { nama_produk, tipe, kategori, deskripsi, harga, varian, size, stok } = req.body;

//     // Check if a file is uploaded and assign its filename
//     const gambar = req.file ? req.file.filename : null; // Save only the filename, not the full path

//     const query = 'INSERT INTO produk (nama_produk, tipe, kategori, gambar, deskripsi, harga, varian, size, stok) VALUES (?,?,?,?,?,?,?,?,?)';
    
//     db.query(query, [nama_produk, tipe, kategori, gambar, deskripsi, harga, varian, size, stok], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error adding product', error: err });
//         }
//         res.status(201).json({ message: 'Produk berhasil ditambahkan', productId: result.insertId });
//     });
// };

exports.createProduk = (req, res) => {
    const { nama_produk, tipe, kategori, deskripsi, harga, varian, size, stok } = req.body;
    const gambar = req.file ? req.file.filename : null; // Simpan hanya nama file

    const query = 'INSERT INTO produk (nama_produk, tipe, kategori, gambar, deskripsi, harga, varian, size, stok) VALUES (?,?,?,?,?,?,?,?,?)';
    
    db.query(query, [nama_produk, tipe, kategori, gambar, deskripsi, harga, varian, size, stok], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error adding product', error: err });
        }
        res.status(201).json({ message: 'Produk berhasil ditambahkan', productId: result.insertId });
    });
};


// exports.getAllProduk = (req, res) => {
//     const query = 'SELECT * FROM produk';
//     db.query(query, (err, results) => {
//         if (err) {
//             console.log('Error Dalam Mengambil Data:', err); // Debug jika terjadi error
//             return res.status(500).json({ message: 'Error Dalam Mengambil Data', error: err });
//         }

//         console.log('Hasil Query:', results); // Debug hasil query database

//         const updatedResults = results.map((product) => {
//             let gambarBase64 = null;

//             if (product.gambar) {
//                 try {
//                     console.log(`Mencoba mengonversi BLOB untuk Produk ID: ${product.id_produk}`);
//                     gambarBase64 = `data:image/jpeg;base64,${product.gambar.toString('base64')}`;
//                     console.log(`Konversi Gambar Berhasil untuk Produk ID: ${product.id_produk}`);
//                 } catch (error) {
//                     console.log(`Error Konversi Gambar untuk Produk ID: ${product.id_produk}`, error);
//                 }
//             } else {
//                 console.log(`Produk ID: ${product.id_produk} tidak memiliki gambar`);
//             }

//             return {
//                 ...product,
//                 gambar: gambarBase64, // Gambar dalam format Base64
//             };
//         });

//         console.log('Hasil Produk Setelah Mapping:', updatedResults); // Debug hasil akhir setelah mapping

//         res.status(200).json(updatedResults);
//     });
// };

exports.getAllProduk = (req, res) => {
    const query = 'SELECT * FROM produk';
    db.query(query, (err, results) => {
        if (err) {
            console.log('Error Dalam Mengambil Data:', err);
            return res.status(500).json({ message: 'Error Dalam Mengambil Data', error: err });
        }

        const updatedResults = results.map((product) => {
            return {
                ...product,
                gambar: product.gambar ? `${req.protocol}://${req.get('host')}/uploads/${product.gambar}` : null,
            };
        });

        res.status(200).json(updatedResults);
    });
};

// exports.getProdukById = (req, res) => {
//     const { id_produk } = req.params;
//     const query = 'SELECT * FROM produk WHERE id_produk = ?';
//     db.query(query, [id_produk], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error Mengambil Produk By ID', error: err });
//         }
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Produk tidak ditemukan' });
//         }

//         const product = results[0];
//         product.gambar = product.gambar ? `${req.protocol}://${req.get('host')}/uploads/${product.gambar}` : null;

//         res.status(200).json(product);
//     });
// };


exports.getProdukById = (req, res) => {
    const { id_produk } = req.params;
    const query = 'SELECT * FROM produk WHERE id_produk = ?';
    db.query(query, [id_produk], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error Mengambil Produk By ID', error: err });
        }
        if (results.length === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const product = results[0];
        product.gambar = product.gambar ? `${req.protocol}://${req.get('host')}/uploads/${product.gambar}` : null;

        res.status(200).json(product);
    });
};



// exports.updateProduk = (req, res) => {
//     const { id_produk } = req.params;
//     const { nama_produk, tipe, kategori, deskripsi, harga, varian, size, stok } = req.body;
    
//     // Check if a new file is uploaded, otherwise keep the existing 'gambar' from the body
//     const gambar = req.file ? req.file.filename : req.body.gambar;

//     const query = 'UPDATE produk SET nama_produk = ?, tipe = ?, kategori = ?, gambar = ?, deskripsi = ?, harga = ?, varian = ?, size = ?, stok = ? WHERE id_produk = ?';
//     db.query(query, [nama_produk, tipe, kategori, gambar, deskripsi, harga, varian, size, stok, id_produk], (err, result) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error Update Produk', error: err });
//         }
//         res.status(200).json({ message: 'Produk Berhasil DiUpdate' });
//     });
// };

exports.updateProduk = (req, res) => {
    const { id_produk } = req.params;
    const { nama_produk, tipe, kategori, deskripsi, harga, varian, size, stok } = req.body;
    const gambar = req.file ? req.file.filename : req.body.gambar;

    const query = 'UPDATE produk SET nama_produk = ?, tipe = ?, kategori = ?, gambar = ?, deskripsi = ?, harga = ?, varian = ?, size = ?, stok = ? WHERE id_produk = ?';
    db.query(query, [nama_produk, tipe, kategori, gambar, deskripsi, harga, varian, size, stok, id_produk], (err, result) => {
        if (err) {
            return res.status(500).json({ message: 'Error Update Produk', error: err });
        }
        res.status(200).json({ message: 'Produk Berhasil DiUpdate' });
    });
};

// exports.deleteProduk = (req, res) => {
//     const { id_produk } = req.params;

//     // Ambil data gambar berdasarkan id_produk
//     db.query('SELECT gambar FROM produk WHERE id_produk = ?', [id_produk], (err, results) => {
//         if (err) {
//             return res.status(500).json({ message: 'Error Mengambil Data Produk', error: err });
//         }

//         // Jika produk tidak ditemukan
//         if (results.length === 0) {
//             return res.status(404).json({ message: 'Produk tidak ditemukan' });
//         }

//         let gambar = results[0].gambar;

//         // Convert Buffer to string if necessary
//         if (Buffer.isBuffer(gambar)) {
//             gambar = gambar.toString();
//         }

//         // Validasi gambar
//         if (!gambar || typeof gambar !== 'string' || gambar.trim() === '') {
//             return res.status(400).json({ message: 'Data gambar tidak valid', gambar });
//         }

//         // Tentukan jalur file gambar
//         const imagePath = path.join(__dirname, '..', 'uploads', gambar);

//         // Periksa apakah gambar ada di server
//         if (fs.existsSync(imagePath)) {
//             try {
//                 fs.unlinkSync(imagePath); // Hapus file gambar
//                 console.log(`File ${imagePath} berhasil dihapus.`);
//             } catch (error) {
//                 console.error('Gagal menghapus gambar:', error);
//                 return res.status(500).json({ message: 'Gagal menghapus gambar', error });
//             }
//         } else {
//             console.log(`File ${imagePath} tidak ditemukan di server.`);
//         }

//         // Menghapus produk dari database
//         const query = 'DELETE FROM produk WHERE id_produk = ?';
//         db.query(query, [id_produk], (err, result) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Error Menghapus Produk', error: err });
//             }

//             // Jika produk tidak ada dalam database untuk dihapus
//             if (result.affectedRows === 0) {
//                 return res.status(404).json({ message: 'Produk tidak ditemukan untuk dihapus' });
//             }

//             // Jika berhasil dihapus, beri respons sukses
//             res.status(200).json({ message: 'Produk berhasil dihapus' });
//         });
//     });
// };

exports.deleteProduk = (req, res) => {
    const { id_produk } = req.params;

    db.query('SELECT gambar FROM produk WHERE id_produk = ?', [id_produk], (err, results) => {
        if (err) {
            return res.status(500).json({ message: 'Error Mengambil Data Produk', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Produk tidak ditemukan' });
        }

        const gambar = results[0].gambar;

        // Pastikan gambar adalah string
        const imagePath = path.join(__dirname, '..', 'uploads', gambar.toString());

        if (fs.existsSync(imagePath)) {
            try {
                fs.unlinkSync(imagePath); // Hapus file gambar
                console.log(`File ${imagePath} berhasil dihapus.`);
            } catch (error) {
                console.error('Gagal menghapus gambar:', error);
                return res.status(500).json({ message: 'Gagal menghapus gambar', error });
            }
        } else {
            console.log(`File ${imagePath} tidak ditemukan di server.`);
        }

        const query = 'DELETE FROM produk WHERE id_produk = ?';
        db.query(query, [id_produk], (err, result) => {
            if (err) {
                return res.status(500).json({ message: 'Error Menghapus Produk', error: err });
            }

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Produk tidak ditemukan untuk dihapus' });
            }

            res.status(200).json({ message: 'Produk berhasil dihapus' });
        });
    });
};






