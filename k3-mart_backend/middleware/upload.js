// // middleware/upload.js
// const multer = require('multer');

// // Konfigurasi penyimpanan gambar
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//         cb(null, './uploads'); // Tentukan folder penyimpanan
//     },
//     filename: (req, file, cb) => {
//         cb(null, Date.now() + '-' + file.originalname); // Nama file unik
//     }
// });

// // Inisialisasi multer dengan konfigurasi penyimpanan
// const upload = multer({ storage: storage });

// module.exports = upload;


// middleware/upload.js
const multer = require('multer');
const path = require('path');

// Konfigurasi penyimpanan gambar
// Konfigurasi penyimpanan gambar
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'uploads')); // Tentukan folder penyimpanan
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname); // Nama file unik
    }
});

// Inisialisasi multer dengan konfigurasi penyimpanan
const upload = multer({ storage: storage });

module.exports = upload;