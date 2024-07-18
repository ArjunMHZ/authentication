// import axios from "axios";
import { toast } from 'react-toastify';
// import api from "../utils/auth";
import axios from "../utils/auth";

import { useState,  ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from "react-router-dom";

export const Login = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState("");
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({...prev, [e.target.name]: e.target.value }))
    }

    const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
          const response = await axios.post("/auth/login", credentials);
          localStorage.setItem('accessToken', response.data.accessToken);
          toast.success("User logged in successfully")
          navigate("/dashboard");
        } catch (error: any) {
          setMessage(error.response.data.message);
          toast.error(error.response.data.message);
        }
    }
 

  //   useEffect(() => {
  //     const interval = setInterval(async () => {
  //         try {
  //           localStorage.removeItem('accessToken')
  //             const response = await axios.post('/auth/refreshToken');
  //             localStorage.setItem('accessToken', response.data.accessToken);
              
  //         } catch (error: any) {
  //             console.error('Error refreshing token:', error);
  //         }
  //     }, 1 * 60 * 1000); // Refresh token every 14 minutes (just before access token expires)

  //     return () => clearInterval(interval);
  // }, []);


  return (
    <div className="flex justify-center items-center h-screen bg-lime-600">
    <form className="w-80 bg-slate-100 shadow-xl rounded-md" onSubmit={handleSubmit}>
        <div className="text-center p-3">
            <h1 className="text-2xl font-bold mb-3">Log in to Account</h1>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} className="w-[17rem] mb-2 border-0 pl-2.5 py-2 text-gray-900 shadow-sm ring-1  ring-gray-400 focus:ring-2 placeholder:ml-2 sm:text-sm sm:leading-6"/>
            <div className="relative">
            <input type={show ? "text" : "password"} name="password" placeholder="Enter your password" onChange={handleChange} className="w-[17rem] mb-2 border-0 pl-2.5 py-2 text-gray-900 shadow-sm ring-1  ring-gray-400 focus:ring-2 placeholder:ml-2 sm:text-sm sm:leading-6"/>
            <span onClick={() => setShow(!show)} className="absolute cursor-pointer right-5 top-2 text-green-500">Show</span>
            </div>
            <button type="submit" className="rounded p-1.5 bg-[#0F67B1] hover:bg-[#3FA2F6] text-white font-medium text-md my-2 w-[17rem]">Log In</button>
            {message && <p className="text-red-700 text-center">{message}</p>} 
            <Link to="/"><span className="text-sm underline text-gray-600">Sign Up</span></Link>
        </div>
    </form>
    </div>
  )
}

