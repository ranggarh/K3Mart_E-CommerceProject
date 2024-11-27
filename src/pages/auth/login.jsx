import { useNavigate, useLocation } from "react-router-dom";
import { login } from "../../utils/api";
import { setToken } from "../../utils/authUtils";
import { useState } from "react";

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/home";

    const handleLogin = async(e) =>{
        e.preventDefault();
        try{
            const data = await login(email,password);
            setToken(data.token);
            alert('Login Berhasil');
            navigate(from, { replace: true });
        } catch (error){
            alert('Login Gagal'+ error.message);
        };
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/2 mt-16 flex justify-center items-center">
                <img
                    src="/login.svg"
                    alt="Login animation"
                    width={500}
                    height={500}  
                    className='justify-center items-center'              />
            </div>
            <div className="w-1/2 bg-[#0F4C5C] p-8 flex justify-center items-center rounded">
                <div className="w-96 bg-white p-8 rounded shadow-md">
                    <h1 className="text-2xl font-bold mb-4 text-[#0F4C5C] items-center justify-center flex">Login</h1>
                    <form onSubmit={handleLogin}>
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
                                onChange={(e)=> setEmail(e.target.value)}
                                required
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
                                autoComplete="current-password"
                            />
                        </div>
                        <div>
                            <button
                                className="bg-[#0F4C5C] w-full hover:shadow-lg text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                type="submit"
                            >
                                Masuk
                            </button>
                            <p className="mt-4 font-semibold text-sm text-gray-600">Belum memiliki akun? <a href="/auth/register" className="text-[#0F4C5C] font-bold hover:underline">Daftar</a></p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
