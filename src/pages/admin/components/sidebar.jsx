import { Link } from "react-router-dom";

const Sidebar = ({ active }) => {
  const menuItems = [
    { name: "Dashboard", path: "/admin/dashboard" },
    { name: "Transaksi", path: "/admin/transaksi" },
    { name: "Produk", path: "/admin/produk" },
  ];

  return (
    <div className="w-64 bg-gray-800 text-white p-6">
      <h2 className="text-2xl font-bold mb-6">K3-Mart</h2>
      <nav className="flex flex-col space-y-4">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className={`hover:text-gray-300 ${
              active === item.name ? "font-bold text-gray-200" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
