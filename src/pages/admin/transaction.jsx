import Sidebar from "./components/sidebar";

const Transaction = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar active="Profile" />

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold">Profile</h1>
        <p>Ini adalah halaman profil Anda.</p>
      </div>
    </div>
  );
};

export default Transaction;
