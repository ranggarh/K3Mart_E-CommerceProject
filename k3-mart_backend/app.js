const express = require('express');
const app = express();
const produkRoutes = require('./routes/productRoutes'); // Sesuaikan dengan path folder Anda
const authRoutes = require('./routes/authRoutes');
const transactionRoutes = require('./routes/transaksiRoutes');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:5173' // Adjust this to match your frontend's origin
  }));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Aktifkan route dengan prefix "/api"
app.use('/api', produkRoutes);
app.use('/api/auth', authRoutes);

app.use('/api/transaksi', transactionRoutes);

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
