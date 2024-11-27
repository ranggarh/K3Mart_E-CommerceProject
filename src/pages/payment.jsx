import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Payment = () => {
    const location = useLocation();
    const paymentData = location.state || {};
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(24 * 60 * 60); // 24 jam dalam detik
    const [endDate, setEndDate] = useState(new Date()); // Tanggal akhir (target)

    // Mengupdate countdown setiap detik
    useEffect(() => {
        // Hitung tanggal akhir berdasarkan waktu saat ini + 24 jam
        const targetDate = new Date();
        targetDate.setSeconds(targetDate.getSeconds() + countdown);
        setEndDate(targetDate);

        const interval = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 0) {
                    clearInterval(interval); // Hentikan interval jika sudah 0
                    return 0;
                }
                return prev - 1;
            });
        }, 1000); // Update setiap detik

        // Bersihkan interval saat komponen dibuang
        return () => clearInterval(interval);
    }, [countdown]);

    // Fungsi untuk format waktu dalam format HH:MM:SS
    const formatTime = (seconds) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        const secs = seconds % 60;
        return `${hours.toString().padStart(2, '0')}:${minutes
            .toString()
            .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    // Fungsi untuk format tanggal menjadi format "Hari, DD MMMM YYYY"
    const formatDate = (date) => {
        return date.toLocaleDateString('id-ID', {
            weekday: 'long', // Format hari (e.g., "Kamis")
            day: '2-digit', // Format hari (e.g., "06")
            month: 'long', // Format bulan (e.g., "November")
            year: 'numeric', // Format tahun (e.g., "2024")
        });
    };

    return (
        <div className="h-screen p-6">
            <button onClick={() => navigate(-1)} className='flex'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 ml-10 mt-5 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
                </svg>
                <h1 className='mt-5 mx-4 font-semibold'>Kembali</h1>
            </button>

            <div className="flex h-full mt-8">
                {/* Payment Details Section */}
                <div className="w-1/2 mx-4 rounded">
                    <div style={{ backgroundColor: "#0f4c5c" }} className='bg-white p-4'>
                        <h2 className="text-lg text-white font-semibold">Detail Pembayaran</h2>
                    </div>
                    <div className='p-4 border border-gray-200'>
                        <h2 className="text-lg font-semibold mb-2 mt-4 ml-4">Selesaikan Pembayaran Dalam Waktu</h2>
                        <p className="text-lg py-2 font-semibold mb-2 text-red-500 ml-4">{formatTime(countdown)}</p>
                        <p className='ml-4'>Batas Akhir Pembayaran</p>
                        <h2 className="text-lg font-semibold mb-2 ml-4">{formatDate(endDate)}</h2>

                        <div className="mt-8 p-4 w-full border border-gray-100 rounded shadow-lg">
                            <div className='flex justify-between mb-2 border-b-2 border-gray-100'>
                                <h2 className="text-lg font-semibold mb-2">Metode Pembayaran:</h2>
                                <h2 className="text-lg font-semibold mb-2">{paymentData.selectedPayment?.provider}</h2>  
                            </div>
                            <div className="flex justify-between">
                                <p>Nomor Virtual Account:</p>
                                <p>9820174801274102</p>
                            </div>
                            <div className="flex justify-between mt-4">
                                <p>Total Tagihan:</p>
                                <p>Rp {paymentData.total?.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="flex">
                                <button
                                    style={{ color: "#0f4c5c" }}
                                    className="w-1/2 font-bold py-2 mr-1 rounded mt-4 border-2 border-[#0f4c5c] "
                                >
                                    Cek Status Pembayaran
                                </button>
                                <button onClick={() => navigate("/home")} style={{ backgroundColor: "#0f4c5c" }} className="w-1/2 bg-blue-500 text-white font-bold py-2 ml-1 rounded mt-4">Lanjut Berbelanja</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Order Summary Section */}
                <div style={{ backgroundColor: "#0f4c5c" }} className="w-1/2 h-fit bg-blue-500 p-8 mx-4 rounded">
                    <div className='bg-white p-4 rounded'>
                        <h2 className="text-lg font-semibold mb-2">Order Summary</h2>
                        {paymentData.cart && paymentData.cart.map((item) => (
                            <div key={item.id} className="flex justify-between mt-2">
                                <span>{item.nama} (x{item.quantity})</span>
                                <span>Rp {item.harga.toLocaleString("id-ID")}</span>
                            </div>
                        ))}

                        {/* Shipping Details */}
                        {paymentData.selectedShipping && (
                            <div className="">
                                <div className="flex justify-between">
                                    <p>Ongkos Kirim ({paymentData.selectedShipping.provider}):</p>
                                    <p>Rp {paymentData.selectedShipping.price?.toLocaleString("id-ID")}</p>
                                </div>
                            </div>
                        )}
                    </div>
                    <div className="bg-white p-4 rounded mt-4">
                        <h1 className="text-lg font-semibold mb-2">Tata Cara Pembayaran</h1>
                        <ol className="list-decimal pl-6 text-gray-800">
                            <li className="mb-2">
                                Buka aplikasi <span className="font-semibold">{paymentData.selectedPayment?.provider}</span> di perangkat Anda atau kunjungi website resminya.
                            </li>
                            <li className="mb-2">
                                Pilih opsi <span className="font-semibold">Pembayaran Virtual Account</span> atau metode yang sesuai.
                            </li>
                            <li className="mb-2">
                                Masukkan <span className="font-semibold">Nomor Virtual Account</span> berikut: <span className="font-semibold">9820174801274102</span>
                            </li>
                            <li className="mb-2">
                                Periksa kembali jumlah tagihan Anda, yaitu <span className="font-semibold">Rp {paymentData.total?.toLocaleString("id-ID")}</span>.
                            </li>
                            <li className="mb-2">
                                Lanjutkan pembayaran hingga proses selesai. Simpan bukti pembayaran jika diperlukan.
                            </li>
                            <li className="mb-2">
                                Pembayaran akan diverifikasi otomatis dalam beberapa menit. Anda akan menerima konfirmasi pesanan setelah pembayaran berhasil.
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
