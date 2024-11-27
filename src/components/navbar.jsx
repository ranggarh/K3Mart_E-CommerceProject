import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cart from '../components/cart';
import { fetchUserDetails } from '../utils/api';
import { removeToken } from '../utils/authUtils';

const Header = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    console.log('Logout triggered'); // Debug
    removeToken();
    console.log('Token removed:', localStorage.getItem('token')); // Debug
    setUser(null); // Reset user state
    navigate('/home');
  };

  const handleHistory = () => {
    navigate('/riwayat');
  };
  

  useEffect(() => {
    const getUserDetails = async () => {
      try {
        const userDetails = await fetchUserDetails();
        setUser(userDetails);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
      }
    };

    getUserDetails();
  }, []);

  return (
    <header className="bg-white shadow-md font-semibold sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex space-x-2">
          <img src="/products/logo.jpg" alt="Logo" className="w-10 h-10" />
          <h1 className="text-xl my-auto font-bold">K3 Mart</h1>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li><Link to={"/home"}>Beranda</Link></li>
            <li><Link to={"/tentang-kami"}>Tentang Kami</Link></li>
            <li><Link to={"/catalog"}>Katalog</Link></li>
          </ul>
        </nav>
        <div className="flex space-x-2 relative">
          <button onClick={toggleCart}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-10 p-2 bg-yellow-500 rounded-full">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
            </svg>
          </button>
          {user ? (
            <div className="relative">
              <div className="p-2 rounded cursor-pointer" onClick={toggleDropdown}>
                {user.username}
              </div>
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg">
                <button onClick={handleHistory} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Riwayat Pembelian
                  </button>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">
                    Logout
                  </button>

                </div>
              )}
            </div>
          ) : (
            <div className="flex space-x-2">
              <Link to={'/auth/login'}>
                <div className="p-2 rounded">Login</div>
              </Link>
              <p className='mt-2'>|</p>
              <Link to={'/auth/register'}>
                <div className="p-2 rounded">Register</div>
              </Link>
            </div>
          )}
        </div>
      </div>

      {isCartOpen && <Cart isOpen={isCartOpen} onClose={toggleCart} />}
    </header>
  );
};

export default Header;
