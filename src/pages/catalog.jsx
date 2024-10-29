import Header from "../components/navbar";
import datas from "../datas"; // pastikan path ini sesuai
import { useState } from "react";
import { Link } from "react-router-dom";

const Katalog = () => {
    // Mengambil semua nilai type dari produkData
    const uniqueTypes = Array.from(new Set(datas.map(item => item.type)));
    const priceRanges = [
        { label: "Rp. 0 - Rp. 50.000", min: 0, max: 50000 },
        { label: "Rp. 51.000 - Rp. 100.000", min: 50001, max: 100000 },
        { label: "Rp. 101.000 - Rp. 150.000", min: 100001, max: 150000 },
        { label: "Rp. 151.000 - Rp. 200.000", min: 150001, max: 200000 },
    ];

    // State untuk menyimpan filter
    const [selectedType, setSelectedType] = useState(null);
    const [selectedPriceRange, setSelectedPriceRange] = useState(null);
    const [searchTerm, setSearchTerm] = useState(""); 

    // Event handler untuk memilih tipe produk
    const handleTypeSelect = (type) => {
        setSelectedType(type === selectedType ? null : type); // Toggle type selection
    };

    // Event handler untuk memilih rentang harga
    const handlePriceRangeSelect = (range) => {
        setSelectedPriceRange(range === selectedPriceRange ? null : range); // Toggle price range selection
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value.toLowerCase()); // Update search term in lowercase for case-insensitive matching
    };

    // Filter data berdasarkan tipe dan harga yang dipilih
    const filteredData = datas.filter(product => {
        const matchesType = selectedType ? product.type === selectedType : true;
        const matchesPriceRange = selectedPriceRange
            ? product.harga >= selectedPriceRange.min && product.harga <= selectedPriceRange.max
            : true;
        const matchesSearch = product.nama.toLowerCase().includes(searchTerm) || product.deskripsi.toLowerCase().includes(searchTerm);
        return matchesType && matchesPriceRange && matchesSearch;
    });

    

    return (
        <>
            <Header />
            <div className="flex justify-center items-center h-screen">
                {/* Sidebar Filter */}
                <div className="w-1/4 h-full flex flex-col items-center ">
                    <div className="bg-white w-3/4 mt-10 h-fit rounded shadow-lg">
                        <h1 style={{ backgroundColor: "#0f4c5c" }} className="text-md font-semibold text-center p-4 text-white">Kategori Produk</h1>
                        <ul className="p-4 border h-fit border-black-300">
                            {uniqueTypes.map((type, index) => (
                                <li 
                                    key={index} 
                                    className={`py-3 px-2 flex text-sm mx-2 border-b border-black-300 cursor-pointer hover:bg-green-100 ${selectedType === type ? 'font-bold' : ''}`}
                                    onClick={() => handleTypeSelect(type)}
                                >
                                    {type} <p className="text-gray-400 ml-3">({datas.filter(item => item.type === type).length})</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setSelectedType(null)} className="text-blue-500 p-4">
                                Reset Kategori
                        </button>
                    </div>
                    <div className="bg-white w-3/4 mt-10 h-fit rounded shadow-lg">
                        <h1 style={{ backgroundColor: "#0f4c5c" }} className="text-md text-white font-semibold text-center p-4">Harga Produk</h1>
                        <ul className="p-4 border h-fit border-black-300">
                            {priceRanges.map((range, index) => (
                                <li 
                                    key={index} 
                                    className={`py-3 flex text-sm mx-2 border-b border-black-300 cursor-pointer hover:bg-green-100 ${
                                        selectedPriceRange && selectedPriceRange.min === range.min && selectedPriceRange.max === range.max
                                            ? 'font-bold'
                                            : ''
                                    }`}
                                    onClick={() => handlePriceRangeSelect(range)}
                                >
                                    {range.label} <p className="text-gray-400 ml-3">({datas.filter(item => item.harga >= range.min && item.harga <= range.max).length})</p>
                                </li>
                            ))}
                        </ul>
                        <button onClick={() => setSelectedPriceRange(null)} className="text-blue-500 p-4">
                                Reset Harga
                        </button>
                    </div>
                    <div className="bg-white w-3/4 mt-10 h-fit rounded ">
                        <img src="/products/glassmo.jpg" alt="Produk A" className="h-full w-full rounded"></img>
                    </div>
                </div>

                {/* Konten Katalog */}
                <div className="w-3/4 h-screen">
                    <div className="flex">
                        <div style={{ backgroundColor: "#0f4c5c" }} className="flex ml-10 mt-10 border border-gray-300 rounded w-3/4 my-auto">
                            <input className="w-full p-2 mr-2 " type="text" placeholder="Cari Produk..." value={searchTerm}
                                onChange={handleSearchChange}/>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6 m-2 my-auto rounded items-center">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                            </svg>
                        </div>

                        <div className="flex items-center mx-3 mt-10 space-x-2 mr-10">
                            <div style={{ backgroundColor: "#0f4c5c" }} className="flex text-white p-2 rounded">
                                <h1 className="text-md font-semibold">Harga</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>

                            <div style={{ backgroundColor: "#0f4c5c" }} className="flex p-2 text-white rounded">
                                <h1 className="text-md font-semibold">Urutkan</h1>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 ml-2">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                </svg>
                            </div>
                        </div>
                    </div>

                    {/* Iklan */}
                    <div className="w-full h-fit p-10">
                        <div className="h-64 bg-yellow-500">
                            <img src="/products/carousel1.jpg" alt="Produk A" className="h-full w-full object-cover" />
                        </div>
                    </div>
                    {/* Produk Terjual */}
                    <div>
                        <h1 className="text-2xl font-bold mb-9 -mt-4 mx-10">List Produk</h1>
                        <div className="grid grid-cols-4 gap-4 mx-10 mb-10">
                            {filteredData.length > 0 ? (
                                filteredData.map(product => (
                                    <Link to={`/catalog/${product.id}`} key={product.id} className="card w-full h-100 shadow-lg p-4 bg-white rounded-lg flex flex-col">
                                        <div className="relative group">
                                            <img
                                                src={product.foto}
                                                alt={product.nama}
                                                className="h-48 w-full object-cover rounded-md mb-4"
                                            />
                                            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-md">
                                                <p className="text-white text-lg font-semibold">Lihat Produk</p>
                                            </div>
                                        </div>
                                        <h3 className="font-bold text-lg text-gray-800">{product.nama}</h3>
                                        <p className="text-gray-600 flex-1">{product.deskripsi}</p>
                                        <p style={{ color: "#0f4c5c" }} className=" font-semibold text-lg mt-2">Rp. {product.harga.toLocaleString()}</p>
                                    </Link>
                                ))
                            ) : (
                                <p className="text-center text-gray-500 col-span-4">Barang tidak ditemukan</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Katalog;
