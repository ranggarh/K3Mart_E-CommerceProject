import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

const Modal = ({ cart, selectedShipping, selectedPayment, paymentOptions, isOpen, onClose, onPay }) => {
    const navigate = useNavigate();

    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.harga * item.quantity, 0);
    };

    const calculateShipping = () => {
        return selectedShipping ? selectedShipping.price : 0;
    };

    const handlePayment = () => {
        const selectedPaymentProvider = paymentOptions.find(option => option.id === selectedPayment)?.provider;

        const paymentData = {
            cart,
            selectedShipping,
            selectedPayment: selectedPaymentProvider,  // Pass the provider name instead of the ID
            total: calculateTotal() + calculateShipping()
        };
  
        
        // Navigate to /payment and pass the paymentData as state
        navigate('/payment', { state: paymentData });
        
        // Call the parent function (onPay) with payment data
        onPay(paymentData);
    };

    const selectedPaymentProvider = paymentOptions.find(option => option.id === selectedPayment)?.provider;

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg w-96 p-5 shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Rincian Pemesanan</h2>
                <div className="mb-4">
                    <h3 className="font-semibold">Pesanan Anda:</h3>
                    {cart.map((item) => (
                        <div key={item.id} className="flex justify-between mt-2">
                            <span>{item.nama} (x{item.quantity})</span>
                            <span>Rp {item.harga.toLocaleString("id-ID")}</span>
                        </div>
                    ))}
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Ongkos Kirim:</h3>
                    <p>{selectedShipping ? `${selectedShipping.provider} - Rp ${selectedShipping.price.toLocaleString("id-ID")}` : "Belum dipilih"}</p>
                </div>
                <div className="mb-4">
                    <h3 className="font-semibold">Metode Pembayaran:</h3>
                    <p>{selectedPaymentProvider || "Belum dipilih"}</p>
                </div>
                <div className="font-semibold border-t border-gray-200 pt-4 mt-4 flex justify-between">
                    <span>Total:</span>
                    <span>Rp {(calculateTotal() + calculateShipping()).toLocaleString("id-ID")}</span>
                </div>
                <button onClick={handlePayment} className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Bayar Sekarang
                </button>
                <button onClick={onClose} className="w-full mt-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">
                    Tutup
                </button>
            </div>
        </div>
    );
};

Modal.propTypes = {
    cart: PropTypes.array.isRequired,
    selectedShipping: PropTypes.shape({
        price: PropTypes.number,
        provider: PropTypes.string,
    }),
    selectedPayment: PropTypes.string.isRequired,
    paymentOptions: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string.isRequired,
            name: PropTypes.string.isRequired,
        })
    ),
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    onPay: PropTypes.func.isRequired,
};

export default Modal;
