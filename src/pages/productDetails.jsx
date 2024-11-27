import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import datas from "../datas";
import Header from '../components/navbar';
import { addToCart } from '../utils/cartUtils';
import { getToken } from '../utils/authUtils';
import Swal from 'sweetalert2';
import Cart from '../components/cart';

const ProductDetail = () => {
    const { id } = useParams();
    const product = datas.find((item) => item.id === parseInt(id));
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [selectedVarian, setSelectedVarian] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const navigate = useNavigate();

    const handleAddToCart = () => {
        addToCart(product, selectedSize, selectedVarian);
        setIsCartOpen(true); // Buka keranjang saat item ditambahkan
    };

    const handleBuyNow = () => {
        const productWithQuantity = { 
            ...product,
            quantity: 1,
            varian: selectedVarian,
            size: selectedSize 
        }; // Tambahkan quantity 1
        const token = getToken();
        console.log('Token ada?', !!token);
    
        if (token) {
            console.log('Arahkan ke /checkout');
            navigate('/checkout', { state: { product: productWithQuantity } });
        } else {
            console.log('SweetAlert akan dijalankan');
            Swal.fire({
                title: 'Silahkan Login Terlebih Dahulu',
                text: 'Anda perlu login untuk melanjutkan ke checkout.',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Login',
                cancelButtonText: 'Batal'
            }).then((result) => {
                if (result.isConfirmed) {
                    console.log('Navigasi ke halaman login');
                    navigate('/auth/login');
                }
            });
        }
    };
    

    if (!product) return <p>Product not found</p>;

    return (
        <>
            <Header />
            <button onClick={() => navigate(-1)}>
                <div className='flex'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-10 mt-5 ">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                    </svg>
                    <h1 className='mt-5 mx-4 font-semibold'>Kembali</h1>
                </div>
            </button>

            <div className="flex justify-center items-center min-h-screen p-4">
                <div className="w-4/4 grid grid-cols-2">
                    <div className="flex ml-10 ">
                        <div className="grid grid-rows-4 w-1/4 ml-4">
                            {[...Array(4)].map((_, i) => (
                                <img key={i} src={product.foto} alt={`${product.nama} thumbnail`} className="w-full rounded-lg" />
                            ))}
                        </div>
                        <img src={product.foto} alt={product.nama} className="w-3/4 h-fit ml-10 rounded-lg" />
                    </div>

                    <div className="col-span-1 mx-auto">
                        <h1 className="text-3xl font-bold">{product.nama}</h1>
                        <p className="text-gray-600">{product.type} | {product.kategori}</p>
                        <p style={{ color: "#0f4c5c" }} className="text-2xl mt-4">Rp. {product.harga.toLocaleString()}</p>

                        {product.varian && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">Select Varian</h2>
                                <div className="flex space-x-2 mt-2">
                                    {product.varian.map((varian, index) => (
                                        <button key={index} className={`border p-2 rounded ${selectedVarian === varian ? 'bg-[#0f4c5c] text-white' : ''}`}
                                            onClick={() => setSelectedVarian(varian)}>{varian}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {product.size && (
                            <div className="mt-4">
                                <h2 className="text-lg font-semibold">Select Size</h2>
                                <div className="flex space-x-2 mt-2">
                                    {product.size.map((size, index) => (
                                        <button key={index} className={`border p-2 rounded ${selectedSize === size ? 'bg-[#0f4c5c] text-white' : ''}`}
                                            onClick={() => setSelectedSize(size)}>{size}</button>
                                    ))}
                                </div>
                            </div>
                        )}

                        <button 
                            onClick={handleAddToCart} 
                            style={{ color: "#0f4c5c" }} 
                            className="w-full mt-6 bg-white border border-gray-400 font-semibold py-3 rounded"
                        >
                            Masukkan Keranjang
                        </button>
                        
                        <button 
                            style={{ backgroundColor: "#0f4c5c" }} 
                            className="w-full mt-4 text-white py-3 rounded"
                            onClick={handleBuyNow}
                        >
                            Beli Sekarang
                        </button>
                        

                        <div className="mt-6">
                            <h2 className="text-lg font-semibold">Deskripsi</h2>
                            <p className="text-gray-600 mt-2">{product.deskripsi}</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Panel Keranjang dengan efek slide-in */}
            <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
        </>
    );
};

export default ProductDetail;
