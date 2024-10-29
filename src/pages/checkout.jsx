import { useEffect, useState } from "react";
import Header from "../components/navbar";
import { Link } from "react-router-dom";

const Checkout = () => {
    const shippingOptions = [
        { id: 1, provider: "JNT", type: "Reguler", price: 10000, duration: "1-3 Hari" },
        { id: 2, provider: "JNE", type: "Standar", price: 12000, duration: "1-3 Hari" },
        { id: 3, provider: "Sicepat", type: "Express", price: 15000, duration: "1-3 Hari" },
        { id: 4, provider: "JNT", type: "Express", price: 18000, duration: "1-3 Hari" },
        { id: 5, provider: "JNE", type: "Reguler", price: 8000, duration: "1-3 Hari" },
        { id: 6, provider: "Sicepat", type: "Standar", price: 11000, duration: "1-3 Hari" },
    ];

    const paymentOptions = [
      { id: 1, provider: "Gopay", image: "/products/gopay.jpg" },
      { id: 2, provider: "OVO", image: "/products/ovo.jpg" },
      { id: 3, provider: "DANA", image: "/products/dana.jfif" },
      { id: 4, provider: "Bank Transfer", image: "/products/bank.png" },
  ];

    const [cart, setCart] = useState([]);
    const [selectedShipping, setSelectedShipping] = useState(null);
    const [selectedPayment, setSelectedPayment] = useState(null);

    // Ambil data cart dari localStorage
    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
        setCart(storedCart);
    }, []);

    // Fungsi untuk menghitung total harga semua item
    const calculateTotal = () => {
        return cart.reduce((total, item) => total + item.harga * item.quantity, 0);
    };

    // Fungsi untuk menghitung ongkos kirim
    const calculateShipping = () => {
        return selectedShipping ? selectedShipping.price : 0;
    };

    return (
        <>
            <Header />
            <div className="flex h-full">
            
                <div className="w-3/4 bg-gray-100 p-10">
                <Link to={'/catalog'}>
                    <div className='flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 -mt-5 ml-10 ">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                        </svg>
                        <h1 className='-mt-5 mx-4 font-semibold'>Kembali</h1>
                    </div>
                </Link>
                    {/* Alamat */}
                    <div className="mt-5 w-full h-fit bg-white rounded-lg p-5">
                        <h1 className="text-lg font-bold ml-5 mb-3">Alamat</h1>
                        <div className="flex ml-5">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-green-500">
                                <path fillRule="evenodd" d="m11.54 22.351.07.04.028.016a.76.76 0 0 0 .723 0l.028-.015.071-.041a16.975 16.975 0 0 0 1.144-.742 19.58 19.58 0 0 0 2.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 0 0-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 0 0 2.682 2.282 16.975 16.975 0 0 0 1.145.742ZM12 13.5a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" clipRule="evenodd" />
                            </svg>
                            <h1 className="ml-3 font-semibold">Rangga Raditya Hariyanto</h1>
                        </div>
                        <p className="ml-5 mt-2">Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos, molestiae ipsam earum quos.</p>
                        <div style={{ backgroundColor: "#0f4c5c" }}  className="p-2 ml-5 mt-2 text-white text-sm font-semibold rounded-lg w-fit">
                            <p>Ganti Alamat</p>
                        </div>
                    </div>

                    {/* Produk Pesanan */}
                    <div className="mt-5 w-full h-fit bg-white rounded-lg p-5">
                        <h1 className="text-lg font-bold ml-5 mb-5">PESANAN ANDA</h1>
                        {cart.length > 0 ? (
                            cart.map((item) => (
                                <div key={item.id} className="flex ml-5 mb-4">
                                    <img src={item.foto || "/products/apd.jpg"} alt={item.nama} className="w-16 h-16 mr-4 rounded-lg" />
                                    <div className="flex flex-col w-full">
                                        <div className="flex justify-between">
                                            <h1 className="ml-3 mb-2 font-semibold">{item.nama}</h1>
                                            <h1 className="mb-2 font-semibold mr-5">Rp {item.harga.toLocaleString("id-ID")}</h1>
                                        </div>
                                        <p className="ml-3 font-semibold text-gray-400 text-sm">Jumlah: {item.quantity}</p>
                                        <p className="ml-3 font-semibold text-gray-400 text-sm">Subtotal: Rp {(item.harga * item.quantity).toLocaleString("id-ID")}</p>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <p className="ml-5 mt-3">Keranjang Anda kosong.</p>
                        )}
                        <p className="ml-5 mt-3 font-semibold">Opsi Pengiriman</p>
                        <div className="ml-5 mt-2">
                            <select
                                className="w-full border rounded-md p-2"
                                onChange={(e) => setSelectedShipping(shippingOptions.find(option => option.id === parseInt(e.target.value)))}
                            >
                                <option value="">Pilih Opsi Pengiriman</option>
                                {shippingOptions.map((option) => (
                                    <option key={option.id} value={option.id}>
                                        {`${option.provider} - ${option.type} - ${option.duration} - Rp ${option.price.toLocaleString("id-ID")}`}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Ringkasan Belanja */}
                <div className="w-2/4 bg-gray-100 p-10">

                    
                    <div className="mt-5 -ml-5 w-full h-fit bg-white rounded-lg p-6">
                      

                        <h1 className="text-lg font-bold ml-5 mt-5 mb-3">Ringkasan Belanja</h1>
                        <div className="flex justify-between mx-5 py-2">
                          <p className="text-gray-500 font-semibold">Total Harga Barang: </p>
                          <p className="font-semibold"> Rp {calculateTotal().toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex justify-between mx-5 py-1">
                          <p className="text-gray-500 font-semibold">Total Ongkos Kirim: </p>
                          <p className="font-semibold"> Rp {calculateShipping().toLocaleString("id-ID")}</p>
                        </div>
                        <div className="flex justify-between mx-5 border-t border-black-300 py-4 mt-5 ">
                          <p className=" font-semibold">Total:</p>
                          <p className="font-semibold">Rp {(calculateTotal() + calculateShipping()).toLocaleString("id-ID")}</p>
                        </div>
                        <Link to={"/payment"}>
                        <div style={{ backgroundColor: "#0f4c5c" }}  className="w-full flex justify-center items-center py-3 text-white bg-blue-500 rounded-lg mt-3 hover:shadow-lg"><p>Bayar Sekarang</p></div>
                        </Link>
                    </div>

                    <div className="mt-5 -ml-5 w-full h-fit bg-white rounded-lg p-6">
                      <h1 className="text-lg font-bold ml-5 mb-5">Metode Pembayaran</h1>
                        {/* Payment Options */}
                        {paymentOptions.map((option) => (
                            <div key={option.id} className="flex border-b border-black-300 p-1 items-center justify-between mx-5 mb-3">
                                <div className="flex items-center">
                                    <img src={option.image} alt={option.provider} className="w-8 h-8 mr-3 rounded" />
                                    <p className="font-semibold">{option.provider}</p>
                                </div>
                                <input
                                    type="radio"
                                    name="payment"
                                    value={option.id}
                                    checked={selectedPayment === option.id}
                                    onChange={() => setSelectedPayment(option.id)}
                                    className="form-radio text-blue-500"
                                />
                            </div>
                        ))}
                    </div>

                   
                </div>

                
                
            </div>
        </>
    );
};

export default Checkout;
