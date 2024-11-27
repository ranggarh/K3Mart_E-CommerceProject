import { useState } from 'react';
import Modal from 'react-modal';

const ProductFormModal = ({ isOpen, onRequestClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState(initialData || {
        nama_produk: '',
        tipe: '',
        kategori: '',
        deskripsi: '',
        harga: '',
        varian: '',
        size: '',
        stok: '',
        gambar: null,
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData();
        for (const key in formData) {
            form.append(key, formData[key]);
        }
        await onSubmit(form);
        onRequestClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Product Form"
            className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50 p-4"
            overlayClassName="fixed inset-0 bg-black bg-opacity-50"
        >
            <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-lg overflow-hidden">
                <h2 className="text-2xl font-bold text-center mb-4">
                    {initialData ? 'Edit Produk' : 'Tambah Produk'}
                </h2>
                <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Nama Produk</label>
                        <input
                            type="text"
                            name="nama_produk"
                            value={formData.nama_produk}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Tipe</label>
                        <input
                            type="text"
                            name="tipe"
                            value={formData.tipe}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Kategori</label>
                        <input
                            type="text"
                            name="kategori"
                            value={formData.kategori}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Deskripsi</label>
                        <textarea
                            name="deskripsi"
                            value={formData.deskripsi}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                            rows="4"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Harga</label>
                        <input
                            type="number"
                            name="harga"
                            value={formData.harga}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Varian</label>
                        <input
                            type="text"
                            name="varian"
                            value={formData.varian}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Size</label>
                        <input
                            type="text"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Stok</label>
                        <input
                            type="number"
                            name="stok"
                            value={formData.stok}
                            onChange={handleChange}
                            required
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700">Gambar</label>
                        <input
                            type="file"
                            name="gambar"
                            onChange={handleChange}
                            className="w-full p-2 border border-gray-300 rounded-md"
                        />
                    </div>

                    <div className="flex justify-end space-x-2 mt-4">
                        <button
                            type="button"
                            onClick={onRequestClose}
                            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                        >
                            Batal
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            {initialData ? 'Update' : 'Tambah'}
                        </button>
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default ProductFormModal;
