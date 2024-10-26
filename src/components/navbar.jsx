import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className="bg-white shadow-md font-semibold sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">
          Ecomeerce
        </h1>
        <nav>
          <ul className="flex space-x-4">
            <li>Beranda</li>
            <li>Tentang Kami</li>
            <li>Produk</li>
          </ul>
        </nav>
        <div className="flex space-x-2">
          
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 p-2 bg-yellow-500 rounded-full">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
            <div className=' p-2 rounded'>Login</div>

            
          
        </div>
      </div>
    </header>
  );
};

export default Header;
