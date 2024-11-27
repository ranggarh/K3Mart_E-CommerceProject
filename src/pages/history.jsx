import { useState, useEffect } from "react";
import axios from "axios"; // Pastikan Anda sudah install axios
import Header from "../components/navbar";

const History = () => {
  const [dataTransaksi, setDataTransaksi] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("Semua");

  useEffect(() => {
    const fetchTransaksi = async () => {
      try {
        const token = localStorage.getItem("token"); // Pastikan token JWT disimpan di localStorage
        const response = await axios.get("http://localhost:5000/api/transaksi/riwayat", {
          headers: {
            Authorization: `Bearer ${token}`, // Mengirim token sebagai header Authorization
          },
        });
        setDataTransaksi(response.data); // Simpan data API ke state
      } catch (err) {
        setError("Gagal memuat data transaksi");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransaksi();
  }, []);

  const handleStatusChange = (status) => {
    setSelectedStatus(status);
  };

  const filteredTransaksi =
    selectedStatus === "Semua"
      ? dataTransaksi
      : dataTransaksi.filter((transaksi) => transaksi.status === selectedStatus);

  if (loading) return <p className="text-gray-500">Memuat data...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <>
      <Header />
      <div className="p-8">
        {/* <h1 className="text-2xl font-semibold mb-4">History</h1> */}

        {/* Navigasi Status */}
        <div className="flex">
          <div className="mt-2 mr-4 font-semibold">
            <h1 className="mt-2">Status: </h1>
          </div>
          <div className="grid grid-cols-6 mb-6 gap-2">
            {["Semua", "Menunggu Pembayaran", "Dikemas", "Dikirim", "Diterima","Selesai"].map((status) => (
              <button
                key={status}
                className={`px-4 rounded-lg ${
                  selectedStatus === status
                    ? "bg-[#0f4c5c] text-white font-bold"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handleStatusChange(status)}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Daftar Transaksi */}
        <div className="w-full bg-[#0f4c5c] p-4 rounded-md">
          {filteredTransaksi.length > 0 ? (
            filteredTransaksi.map((transaksi) => (
              <div
                key={transaksi.id_transaksi}
                className="bg-white p-4 m-4  rounded-md shadow-md border border-gray-300"
              >
                {/* <img
                  src={transaksi.gambar}
                  alt={transaksi.nama_produk}
                  className="w-32 h-32 object-cover mb-2"
                /> */}
                <div className="flex items-center mb-2"> 
                  <p className="font-medium"><span className="font-bold">Berbelanja:</span> {new Date(transaksi.tanggal).toLocaleDateString()}</p>
                  <div className="w-fit ml-2 rounded text-white text-sm p-2 bg-[#0f4c5c]"><p className="font-medium">{transaksi.status}</p></div>
                  
                </div>
                <p className="text-gray-700">Deskripsi: {transaksi.nama_produk}</p>
                <p className="text-gray-700">Status: {transaksi.quantity} Pcs</p>
                <p className="text-gray-800 font-bold">
                  Jumlah: Rp {parseFloat(transaksi.total_harga).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <p className="text-white">Tidak ada transaksi untuk status ini.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default History;
