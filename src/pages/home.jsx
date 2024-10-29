import { useState } from "react";
import Carousel from "../components/carousel";
import KategoriCarousel from "../components/kategoriCarousel";
import Header from "../components/navbar";
import { Link } from "react-router-dom";

const produkData = [
  { id: 1, nama: "Alat Pelindung Diri", kategori: "unggulan", foto: "/products/apd.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis", harga: "Rp. 100.000" },
  { id: 2, nama: "Produk B", kategori: "terlaris", foto: "/products/helmet.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis.",harga: "Rp. 100.000"  },
  { id: 3, nama: "Safety Helmet", kategori: "unggulan", foto: "/products/helmet.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis",harga: "Rp. 100.000" },
  { id: 4, nama: "Produk D", kategori: "terlaris", foto: "/products/apd2.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis ",harga: "Rp. 100.000"},
  { id: 5, nama: "Produk E", kategori: "unggulan", foto: "/products/glove.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis",harga: "Rp. 100.000" },
  { id: 6, nama: "Produk F", kategori: "unggulan", foto: "/products/shoes.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis",harga: "Rp. 100.000"},
  { id: 7, nama: "Produk G", kategori: "unggulan", foto: "/products/glasses.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis ",harga: "Rp. 100.000"},
  { id: 8, nama: "Produk H", kategori: "unggulan", foto: "/products/robe.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis ",harga: "Rp. 100.000"},
  { id: 9, nama: "Produk D", kategori: "terlaris", foto: "/products/apd3.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis ",harga: "Rp. 100.000"},
  { id: 10, nama: "Produk D", kategori: "terlaris", foto: "/products/glasses2.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis ",harga: "Rp. 100.000"},
  { id: 11, nama: "Produk D", kategori: "terlaris", foto: "/products/shoes2.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis ",harga: "Rp. 100.000"},
  { id: 12, nama: "Produk D", kategori: "terlaris", foto: "/products/glove2.jpg", deskripsi: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget rhoncus turpis ",harga: "Rp. 100.000"},
];

const Home = () => {
  const produkUnggulan = produkData.filter(product => product.kategori === "unggulan");
  const produkTerlaris = produkData.filter(product => product.kategori === "terlaris");
  const [currentIndexUnggulan, setCurrentIndexUnggulan] = useState(0);
  const [currentIndexTerlaris, setCurrentIndexTerlaris] = useState(0);
  const itemsToShowUnggulan = 5; // Jumlah item yang ditampilkan sekaligus
  const itemsToShowTerlaris = 5;

  const handleNextUnggulan = () => {
    if (currentIndexUnggulan < produkUnggulan.length - itemsToShowUnggulan) {
      setCurrentIndexUnggulan(currentIndexUnggulan + 1);
    }
  };

  const handleNextTerlaris = () => {
    if (currentIndexTerlaris < produkTerlaris.length - itemsToShowTerlaris) {
      setCurrentIndexTerlaris(currentIndexTerlaris + 1);
    }
  };

  const handlePrevUnggulan = () => {
    if (currentIndexUnggulan > 0) {
      setCurrentIndexUnggulan(currentIndexUnggulan - 1);
    }
  };

  const handlePrevTerlaris = () => {
    if (currentIndexTerlaris > 0) {
      setCurrentIndexTerlaris(currentIndexTerlaris - 1);
    }
  };

  return (
    <div>
      <Header />
      <Carousel />
      {/* <div className="max-w-7xl mx-auto text-center my-10">
        <h1 className="font-bold text-3xl">Mengapa Harus Belanja Di K3 Mart</h1>
      </div> */}
     {/* 4 Alasan */}
     <div className="flex justify-center mt-10">
        <div className="border-l border-y border-gray-300 w-64 h-40 flex flex-col justify-center items-center p-4 text-center rounded-l-lg bg-gray-800 text-white hover:bg-yellow-500 hover:text-black transition duration-300">
          <p className="text-sm font-medium">Semua Produk K3 Mart</p>
          <h2 className="font-bold text-xl">Kualitas Terjamin</h2>
          <p className="text-sm">Lolos Uji Quality Control</p>
        </div>
        <div className="w-64 h-40 border-y border-gray-300 flex flex-col justify-center items-center p-4 text-center hover:bg-yellow-500 hover:text-white transition duration-300">
          <p className="text-sm font-medium">Semua Produk K3 Mart</p>
          <h2 className="font-bold text-xl">Kualitas Terjamin</h2>
          <p className="text-sm">Lolos Uji Quality Control</p>
        </div>
        <div className="w-64 h-40 border-y border-gray-300 flex flex-col justify-center items-center p-4 text-center bg-gray-800 text-white hover:bg-yellow-500 hover:text-black transition duration-300">
          <p className="text-sm font-medium">Semua Produk K3 Mart</p>
          <h2 className="font-bold text-xl">Kualitas Terjamin</h2>
          <p className="text-sm">Lolos Uji Quality Control</p>
        </div>
        <div className="w-64 h-40 border-r border-y border-gray-300 flex flex-col justify-center items-center p-4 text-center rounded-r-lg hover:bg-yellow-500 hover:text-white transition duration-300">
          <p className="text-sm font-medium">Semua Produk K3 Mart</p>
          <h2 className="font-bold text-xl">Kualitas Terjamin</h2>
          <p className="text-sm">Lolos Uji Quality Control</p>
        </div>
      </div>


      {/* Kategori Carousel */}
      <div className="flex max-w-7xl mx-auto p-4 my-10">
        <div className="w-1/2 h-96 flex items-center">
          <div className="max-w-full max-h-full px-10">
            <h1 className="text-left font-bold text-3xl mb-3">
              Kategori Peralatan Safety dalam Bekerja
            </h1>
            <p className="text-left mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
              rhoncus turpis. Nam eu sodales lacus. Mauris dapibus, nunc sit
              amet varius faucibus, nisi sem tristique metus.
            </p>
            <button style={{ backgroundColor: "#0f4c5c" }} className="text-white mt-4 font-bold py-2 px-4 rounded">
              Belanja Sekarang
            </button>
          </div>
        </div>
        <div className="w-1/2 h-96 flex items-center justify-center ">
          <KategoriCarousel />
        </div>
      </div>

      {/* Produk Unggulan */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4 mx-20">Produk Unggulan</h1>
        <div className="relative">
          <div className="flex overflow-hidden mx-20 mt-10 mb-10">
            {produkUnggulan.slice(currentIndexUnggulan, currentIndexUnggulan + itemsToShowUnggulan).map(product => (
              <Link to={`/catalog/${product.id}`} key={product.id} className="card shadow-lg p-4 bg-white rounded-lg mx-2">
              <div className="relative group">
                <img
                  src={product.foto}
                  alt={product.nama}
                  className="h-48 w-full object-cover rounded-md mb-4"
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                    <p className="text-white text-lg font-semibold">Lihat Produk</p>
                </div>
            </div>
                <h3 className="font-bold text-lg text-gray-800">{product.nama}</h3>
                <p className="text-gray-600">{product.deskripsi}</p>
                <p style={{ color: "#0f4c5c" }} className="font-semibold text-lg mt-2">{product.harga}</p>

              </Link>
            ))}
          </div>
          <button
            onClick={handlePrevUnggulan}
            disabled={currentIndexUnggulan === 0}
            style={{ backgroundColor: "#0f4c5c" }}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-md mx-16"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>

          </button>
          <button
            onClick={handleNextUnggulan}
            disabled={currentIndexUnggulan >= produkUnggulan.length - itemsToShowUnggulan}
            style={{ backgroundColor: "#0f4c5c" }}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-md mx-16"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>

          </button>
        </div>
      </div>

      {/* Safety Trendy */}
      <div className="flex  w-full p-4 my-10 bg-gray-100">
        <div className="w-1/2 flex items-center ">
          <div className="max-w-full max-h-full px-10 mt-5">
            <img src={"/products/safety1.jpg"} alt="Safety Trendy" className="h-96 w-full object-cover rounded-md mb-4 rounded-md" />
            <h1 className="text-left font-bold text-3xl mb-3 py-5">
              Semarak Utamakan
            </h1>
            <h1 style={{ color: "#0f4c5c" }} className="text-left font-bold text-3xl mb-3 -mt-8 ">
                Keselamatan Kesehatan Kerja
                </h1>
            <p className="text-left mb-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
              rhoncus turpis. Nam eu sodales lacus. Mauris dapibus, nunc sit
              amet varius faucibus, nisi sem tristique metus.
            </p>
          </div>
        </div>
        <div className="w-1/2 flex flex-col items-center justify-center ">
            <div className="max-w-full max-h-full px-10 mt-5">  
                <h1 className="text-left font-bold text-3xl mb-3 py-5">
                #Safety&Trendy Mendukung
                </h1>
                <h1 style={{ color: "#0f4c5c" }} className="text-left font-bold text-3xl mb-3 -mt-7">
                Kesehatan Keselamatan Kerja
                </h1>
                <p className="text-left mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. In eget
                rhoncus turpis. Nam eu sodales lacus. Mauris dapibus, nunc sit
                amet varius faucibus, nisi sem tristique metus.
                </p>
                <img src={"/products/safety2.jpg"} alt="Safety Trendy" className="h-96 w-full object-cover rounded-md mb-4 rounded-md" />
          </div>
        </div>
      </div>

      {/* Produk Terlaris */}
      <div className="mt-10">
        <h1 className="text-2xl font-bold mb-4 mx-20">Produk Terlaris</h1>
        <div className="relative">
          <div className="flex overflow-hidden mx-20 mt-10 mb-10">
            {produkTerlaris.slice(currentIndexTerlaris, currentIndexTerlaris + itemsToShowTerlaris).map(product => (
              <Link to={`/catalog/${product.id}`} key={product.id} className="card w-64 h-100 shadow-lg p-4 bg-white rounded-lg mx-2">
              <div className="relative group">
                <img
                  src={product.foto}
                  alt={product.nama}
                  className="h-48 w-full object-cover rounded-md mb-4"
                />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                      <p className="text-white text-lg font-semibold">Lihat Produk</p>
                  </div>
              </div>
                <h3 className="font-bold text-lg text-gray-800">{product.nama}</h3>
                <p className="text-gray-600">{product.deskripsi}</p>
                <p style={{ color: "#0f4c5c" }} className="font-semibold text-lg mt-2">{product.harga}</p>
              
              </Link>
            ))}
          </div>
          <button
            onClick={handlePrevTerlaris}
            disabled={currentIndexTerlaris === 0}
            style={{ backgroundColor: "#0f4c5c" }} 
            className="absolute left-0 top-1/2 transform -translate-y-1/2 text-white p-2 rounded-md mx-16"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>

          </button>
          <button
            onClick={handleNextTerlaris}
            disabled={currentIndexTerlaris >= produkUnggulan.length - itemsToShowTerlaris}
            style={{ backgroundColor: "#0f4c5c" }} 
            className="absolute right-0 top-1/2 transform -translate-y-1/2  text-white p-2 rounded-md mx-16"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3" />
            </svg>

          </button>
        </div>
      </div>

      {/* Belanja Sekarang */}
      <div style={{ backgroundColor: "#0f4c5c" }}   className="mt-10 flex justify-between items-center mx-20 h-20  px-8 rounded">
        <h1  className="text-2xl text-white font-bold  ml-10">
            Segera Dapatkan Safety Product Pilihan Anda #Safety&Trendy
        </h1>
        <button  className="bg-yellow-500 font-semibold p-3 rounded mr-10">
            Belanja Sekarang
        </button>
    </div>

    {/* Footer */}
    <div style={{ backgroundColor: "#0f4c5c" }} className="text-white mt-16 py-10">
  <div className="container mx-auto px-6">
    <div className="flex flex-wrap justify-between">

      {/* Kolom Informasi */}
      <div className="w-full md:w-1/3 mb-6">
        <h2 className="text-lg font-semibold mb-4">Tentang Kami</h2>
        <p className="text-sm">
          Kami menyediakan berbagai produk safety berkualitas untuk menjaga keselamatan dan kenyamanan Anda dalam bekerja.
        </p>
      </div>

      {/* Kolom Kontak */}
      <div className="w-full md:w-1/3 mb-6">
        <h2 className="text-lg font-semibold mb-4">Kontak Kami</h2>
        <ul className="text-sm">
          <li className="mb-2">
            <span className="font-semibold">Email:</span> info@k3mart.com
          </li>
          <li className="mb-2">
            <span className="font-semibold">Telepon:</span> +62 123 456 789
          </li>
          <li className="mb-2">
            <span className="font-semibold">Alamat:</span> Jl. Ketintang Baru No. 156 Telkom University
          </li>
        </ul>
      </div>

      {/* Kolom Tautan */}
      <div className="w-full md:w-1/3 mb-6">
        <h2 className="text-lg font-semibold mb-4">Tautan Cepat</h2>
        <ul className="text-sm">
          <li className="mb-2"><a href="#" className="hover:underline">Produk</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Tentang Kami</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Kontak</a></li>
          <li className="mb-2"><a href="#" className="hover:underline">Bantuan</a></li>
        </ul>
      </div>

      {/* Kolom Sosial Media */}
      <div className="w-full md:w-1/3 mt-4 md:mt-0">
        <h2 className="text-lg font-semibold mb-4">Ikuti Kami</h2>
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M22 12a10 10 0 1 0-11 9.95V15h-2v-3h2v-1.75A2.75 2.75 0 0 1 15.75 8.5H17v3h-1.25A.75.75 0 0 0 15 12.25V12h2v3h-2v6.95A10 10 0 0 0 22 12z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M12 2.04c-5.52 0-10 4.48-10 10 0 4.41 3.58 8.07 8.09 8.93v-6.34h-2.43v-2.5h2.43v-1.86c0-2.4 1.4-3.72 3.55-3.72.8 0 1.58.06 2.27.13v2.5h-1.23c-1.2 0-1.58.75-1.58 1.54v1.86h2.71l-.43 2.5h-2.28v6.34c4.51-.86 8.09-4.52 8.09-8.93 0-5.52-4.48-10-10-10z" />
            </svg>
          </a>
          <a href="#" className="hover:text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
              <path d="M22 5.63a8.36 8.36 0 0 1-2.36.64A4.1 4.1 0 0 0 21.42 4c-.79.46-1.65.8-2.57.98a4.13 4.13 0 0 0-7.04 3.77A11.72 11.72 0 0 1 2.86 4.8a4.06 4.06 0 0 0 1.28 5.5 4.1 4.1 0 0 1-1.87-.52v.05a4.13 4.13 0 0 0 3.3 4.05 4.18 4.18 0 0 1-1.86.07 4.13 4.13 0 0 0 3.85 2.85A8.33 8.33 0 0 1 2 18.36a11.76 11.76 0 0 0 6.29 1.84c7.55 0 11.68-6.26 11.68-11.68 0-.18-.01-.37-.02-.55A8.37 8.37 0 0 0 22 5.63z" />
            </svg>
          </a>
        </div>
      </div>

    </div>
    <div className="border-t border-gray-700 mt-6 pt-4 text-center text-sm">
      © 2024 K3 Mart. All Rights Reserved.
    </div>
  </div>
    </div>


    </div>
  );
};

export default Home;
