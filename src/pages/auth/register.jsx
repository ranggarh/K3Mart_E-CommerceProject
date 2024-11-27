import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../../utils/authUtils";
import { register } from "../../utils/api";

const Register = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();


    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const data = await register(username, email, password);
            setToken(data.token);
            alert('Registrasi Berhasil');
            navigate('/auth/login');
        } catch (error) {
            alert('Registrasi Gagal: ' + error.message);
        }
    };


    return (
        <div className="flex h-screen">
            <div className="w-1/2 bg-[#0F4C5C] flex justify-center items-center">
                <div className="w-96 bg-white p-8 rounded shadow-md">
                        <h1 className="text-2xl font-bold mb-4 text-[#0F4C5C] items-center justify-center flex">Register</h1>
                        <form onSubmit={handleRegister}>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    
                                >
                                    Nama Lengkap
                                </label>
                                <input
                                    className="shadow appearance-none border rounded  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="nama"
                                    type="text"
                                    placeholder="Masukkan Nama Lengkap"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="username"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="email"
                                >
                                    Email
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="email"
                                    type="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    autoComplete="email"
                                />
                            </div>
                            <div className="mb-4">
                                <label
                                    className="block text-gray-700 font-bold mb-2"
                                    htmlFor="password"
                                >
                                    Password
                                </label>
                                <input
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    id="password"
                                    type="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    autoComplete="password"
                                />
                            </div>
                            <div>
                                <button
                                    className="bg-[#0F4C5C] w-full hover:shadow-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                    type="submit"
                                >
                                    Daftar
                                </button>
                                <p className="mt-4 font-semibold text-sm text-gray-600">Sudah memiliki akun? <a href="/auth/login" className="text-[#0F4C5C] font-bold hover:underline">Login</a></p>
                            </div>
                        </form>
                </div>
            </div>
            <div className="w-1/2  p-8 flex justify-center items-center rounded">
                <img
                        src="/register.svg"
                        alt="Login animation"
                        width={500}
                        height={500}  
                        className='justify-center items-center'

                    />
                
            </div>
        </div>
    );
};

export default Register;
