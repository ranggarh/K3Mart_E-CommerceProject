import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { getCartItems, increaseCartItem, decreaseCartItem } from '../utils/cartUtils';

const Cart = ({ isOpen, onClose }) => {
    const [cartItems, setCartItems] = useState(getCartItems());

    const handleIncrease = (id) => {
        increaseCartItem(id);
        setCartItems([...getCartItems()]); // Update state setelah menambah item
    };

    const handleDecrease = (id) => {
        decreaseCartItem(id);
        setCartItems([...getCartItems()]); // Update state setelah mengurangi item
    };

    // Hitung total keranjang
    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.harga * item.quantity, 0);
    };

    return (
        <div className={`fixed top-0 right-0 h-full bg-white w-1.5/4 pb-20 shadow-lg transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300`}>
            <div className="flex justify-between p-4 border-b mt-20">
                <h2 className="text-xl font-semibold">Keranjang Belanja</h2>
                <button onClick={onClose} className="text-xl">✕</button>
            </div>
            <div className="p-4 space-y-4 overflow-y-auto h-[calc(100%-4rem)]">
                {cartItems.length === 0 ? (
                    <p>Keranjang Anda kosong.</p>
                ) : (
                    cartItems.map((item, index) => (
                        <div key={index} className="flex justify-between border-b pb-4">
                            <div className='flex'>
                                <img src={item.foto} alt={item.nama} className="w-16 h-16 mr-4  rounded-lg" />
                                <div className='flex flex-col'>
                                    <h3 className='font-semibold'>{item.nama} ({item.quantity} Pcs)</h3>
                                    <p>Rp. {item.harga.toLocaleString()} / Pcs</p>
                                    <div className='flex items-center'>
                                        <button 
                                            onClick={() => handleDecrease(item.id)} 
                                            className="rounded px-2"
                                             // Nonaktifkan jika jumlahnya 1
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -ml-2 mt-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                        <span className=" mt-1">{item.quantity}</span>
                                        <button 
                                            onClick={() => handleIncrease(item.id)} 
                                            className="rounded px-2"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 mt-1">
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                                            </svg>
                                        </button>
                                    </div>
                                    
                                </div>
                            </div>
                            <p className='mx-2'>Rp. {(item.harga * item.quantity).toLocaleString()}</p> {/* Tampilkan subtotal */}
                        </div>
                    ))
                )}
                {cartItems.length > 0 && (
                    <div className="mt-4  flex justify-between">
                        <h3 className="font-semibold">Subtotal</h3>
                        <h3 className="font-semibold">Rp. {calculateTotal().toLocaleString()}</h3>
                    </div>
                )}
                <Link 
                    to={{
                        pathname: "/checkout",
                        state: { cartItems }
                    }}
                >
                    <button style={{ backgroundColor: "#0f4c5c" }} className="mt-4 w-full hover:bg-blue-700 text-white py-2 px-4 rounded">
                        Checkout
                    </button>
                </Link>
            </div>
        </div>
    );
};

Cart.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
};

export default Cart;
