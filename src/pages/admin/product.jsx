import { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import DataTable from 'react-data-table-component';
import axios from 'axios';
import ProductFormModal from './components/productform';

const Produk = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [modalData, setModalData] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/produk/');
                console.log('Data dari API:', response.data);
                setData(response.data);
                setLoading(false);
            } catch (err) {
                setError('Failed to fetch data');
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const openModal = (product) => {
        setModalData(product);
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setModalData(null);
    };

    const handleFormSubmit = async (formData) => {
        try {
            if (modalData) {
                // Update produk
                await axios.put(`http://localhost:5000/api/produk/${modalData.id_produk}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const updatedData = data.map((item) =>
                    item.id_produk === modalData.id_produk ? { ...item, ...formData } : item
                );
                setData(updatedData);
                alert('Produk berhasil diperbarui!');
            } else {
                // Tambah produk
                const response = await axios.post('http://localhost:5000/api/produk', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                setData([...data, response.data]);
                alert('Produk berhasil ditambahkan!');
            }
        } catch (err) {
            console.error('Error submitting form:', err);
            alert('Gagal mengirim form.');
        }
    };

    const deleteProduct = async (id_produk) => {
        if (!id_produk) {
            console.error('ID Produk tidak ditemukan!');
            return;
        }

        try {
            await axios.delete(`http://localhost:5000/api/produk/${id_produk}`);
            const filteredData = data.filter((item) => item.id_produk !== id_produk);
            setData(filteredData);
            alert('Produk berhasil dihapus!');
        } catch (err) {
            console.error('Error deleting product:', err);
            alert('Gagal menghapus produk.');
        }
    };

    const columns = [
        { name: 'ID', selector: (row) => row.id_produk, sortable: true },
        { name: 'Nama', selector: (row) => row.nama_produk, sortable: true },
        { name: 'Tipe', selector: (row) => row.tipe },
        { name: 'Kategori', selector: (row) => row.kategori, sortable: true },
        { name: 'Harga', selector: (row) => row.harga, sortable: true },
        { name: 'Deskripsi', selector: (row) => row.deskripsi, sortable: true },
        { name: 'Varian', selector: (row) => row.varian, sortable: true },
        { name: 'Size', selector: (row) => row.size, sortable: true },
        { name: 'Stok', selector: (row) => row.stok, sortable: true },
        {
            name: 'Gambar Produk',
            cell: (row) => (
                <img
                    src={row.gambar}
                    alt={row.nama_produk}
                    className="w-20 h-20 object-cover rounded"
                />
            ),
        },
        {
            name: 'Actions',
            cell: (row) => (
                <div className="flex space-x-2">
                    <button className="text-blue-500" onClick={() => openModal(row)}>
                        Edit
                    </button>
                    <button className="text-red-500" onClick={() => deleteProduct(row.id_produk)}>
                        Delete
                    </button>
                </div>
            ),
        },
    ];

    const filteredData = data.filter((product) =>
      product.nama_produk.toLowerCase().includes(searchQuery.toLowerCase())
  );

    return (
        <div className="flex">
            <Sidebar active="Profile" />
            <div className="flex-1 bg-gray-100 p-8">
                <h1 className="text-3xl font-bold mb-7">Profile</h1>
                <div className="flex justify-between items-center mb-4">
                    <button
                        onClick={() => openModal(null)}
                        className="p-2 bg-[#0f4c5c] text-md text-white rounded"
                    >
                        Tambah Produk
                    </button>
                    {/* Search Bar */}
                    <div className='flex'>
                    <h1 className="my-2 mr-2">Search: </h1>
                    <input
                        type="text"
                        placeholder="Cari produk..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="p-2 border border-gray-300 rounded-md w-64"
                    />
                    </div>
                </div>
                {error && <div className="text-red-500">{error}</div>}
                {!loading ? (
                  <div className="overflow-auto min-h-screen">
                    <DataTable
                      columns={columns}
                      data={filteredData}
                      pagination
                      highlightOnHover
                      striped
                      responsive
                    />
                  </div>

                ) : (
                    <div>Loading...</div>
                )}
                
                <ProductFormModal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    onSubmit={handleFormSubmit}
                    initialData={modalData}
                />
            </div>
        </div>
    );
};

export default Produk;