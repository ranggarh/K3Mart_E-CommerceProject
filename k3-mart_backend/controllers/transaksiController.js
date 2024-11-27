const db = require('../db');

// Fungsi untuk menambahkan transaksi
function createTransaction(req, res) {
    const userId = req.user.userId; // Ambil userId dari token yang terverifikasi
    console.log('User ID:', userId); // Tambahkan log ini
    const { products, selectedShipping, selectedPayment } = req.body;

    if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
    }

    if (!selectedShipping || !selectedPayment) {
        return res.status(400).json({ error: 'Shipping and payment methods are required' });
    }

    // Start a database transaction
    db.beginTransaction(err => {
        if (err) return res.status(500).json({ error: 'Error starting transaction' });

        // Array to hold promises for handling product processing
        const productPromises = products.map(product => {
            const { id_produk, quantity } = product;

            // Query to get the product details
            const selectProductQuery = `
                SELECT nama_produk, harga, stok FROM produk WHERE id_produk = ?
            `;

            return new Promise((resolve, reject) => {
                db.query(selectProductQuery, [id_produk], (err, result) => {
                    if (err) {
                        return reject({ error: 'Error fetching product', details: err });
                    }

                    if (result.length === 0) {
                        return reject({ error: 'Product not found' });
                    }

                    const { nama_produk, harga, stok } = result[0];

                    // Check if the stock is sufficient
                    if (quantity > stok) {
                        return reject({ error: 'Insufficient stock' });
                    }

                    const totalHarga = harga * quantity;
                    const tanggal = new Date();

                    // Insert the transaction into the database
                    const insertQuery = `
                        INSERT INTO transaksi (user_id, id_produk, nama_produk, harga, quantity, total_harga, tanggal, metode_pengiriman, metode_pembayaran, status)
                        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
                    `;

                    db.query(
                        insertQuery,
                        [userId, id_produk, nama_produk, harga, quantity, totalHarga, tanggal, selectedShipping.provider, selectedPayment.provider, 'Menunggu Pembayaran'],
                        (err, result) => {
                            if (err) {
                                return reject({ error: 'Error inserting transaction', details: err });
                            }

                            // Update the stock after successful transaction
                            updateProductStock(id_produk, quantity);

                            resolve(); // Resolve the promise after successful processing
                        }
                    );

                });
            });
        });

        // Use Promise.all to process all products and commit the transaction
        Promise.all(productPromises)
            .then(() => {
                // Commit the transaction if everything went well
                db.commit(err => {
                    if (err) {
                        return db.rollback(() => {
                            console.error('Error committing transaction:', err);
                            res.status(500).json({ error: 'Transaction commit failed' });
                        });
                    }

                    res.status(201).json({ message: 'Transaction created successfully' });
                });
            })
            .catch(error => {
                // Rollback the transaction if any product fails
                db.rollback(() => {
                    console.error('Error processing transaction:', error);
                    res.status(500).json({ error: error.error, details: error.details });
                });
            });
    });
}




// Fungsi untuk mengurangi stok produk
function updateProductStock(id_produk, quantity, reject) {
    const updateStockQuery = `
        UPDATE produk SET stok = stok - ? WHERE id_produk = ? AND stok >= ?
    `;

    db.query(updateStockQuery, [quantity, id_produk, quantity], (err, result) => {
        if (err || result.affectedRows === 0) {
            return reject({ message: 'Insufficient stock or error updating stock', error: err });
        }
    });
}

// Fungsi untuk mendapatkan riwayat transaksi berdasarkan user yang login
function getRiwayat(req, res) {
    const userId = req.user.userId; // Ambil userId dari token yang terverifikasi
    console.log('User ID:', userId); // Tambahkan log ini untuk debugging

    const selectQuery = `
        SELECT * FROM transaksi WHERE user_id = ?
    `;

    db.query(selectQuery, [userId], (err, results) => {
        if (err) {
            console.error('Error fetching transaction history:', err);
            return res.status(500).json({ error: 'Error fetching transaction history' });
        }

        res.status(200).json(results);
    });
}



function updateTransactionStatus(req, res) {
    const transactionId = req.params.id;
    const { status } = req.body;

    console.log('Received status:', status); // Log status yang diterima

    const validStatuses = ['Dikemas', 'Dikirim', 'Diterima', 'Selesai'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Status tidak valid' });
    }

    // Ambil nilai status saat ini untuk memverifikasi perubahan
    const selectQuery = `
        SELECT status FROM transaksi WHERE id_transaksi = ?
    `;

    db.query(selectQuery, [transactionId], (err, results) => {
        if (err) {
            console.error('Error fetching current status:', err);
            return res.status(500).json({ error: 'Error fetching current status' });
        }

        if (results.length === 0) {
            return res.status(404).json({ error: 'Transaction not found' });
        }

        const currentStatus = results[0].status;
        console.log('Current status:', currentStatus); // Log status saat ini

        // Hanya update jika status berbeda
        if (currentStatus !== status) {
            const updateQuery = `
                UPDATE transaksi SET status = ? WHERE id_transaksi = ?
            `;
            
            db.query(updateQuery, [status, transactionId], (err, result) => {
                if (err) {
                    console.error('Error updating transaction status:', err);
                    return res.status(500).json({ error: 'Error updating transaction status' });
                }

                if (result.affectedRows === 0) {
                    return res.status(404).json({ error: 'Transaction not found or no change in status' });
                }

                console.log('Transaction status updated successfully'); // Debugging log
                res.status(200).json({ message: 'Transaction status updated successfully' });
            });
        } else {
            console.log('Status is already the same. No update needed.');
            res.status(200).json({ message: 'Status is already up to date' });
        }
    });
}










module.exports = { createTransaction, updateTransactionStatus,getRiwayat };


