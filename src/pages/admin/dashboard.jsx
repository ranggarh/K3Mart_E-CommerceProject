import Sidebar from "./components/sidebar";

const Dashboard = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar active="Dashboard" />

      {/* Content */}
      <div className="flex-1 bg-gray-100 p-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p>Selamat datang di halaman dashboard.</p>
      </div>
    </div>
  );
};

export default Dashboard;
