import axios from "axios";

import { useState, ChangeEvent } from 'react'
import { Link, useNavigate } from "react-router-dom";

export const SignUp = () => {
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    });

    const [show, setShow] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate();
   

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials(prev => ({...prev, [e.target.name]: e.target.value }))
    }

    const handleClick = async(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5000/api/auth/signup", credentials);
            setMessage(response.data.message);
            navigate("/verifyEmail");
          } catch (error: any) {
            setMessage(error.response.data.message);
          }
    }

  return (
    <div className="flex justify-center items-center h-screen bg-lime-600">
    <div className="w-80 bg-slate-100 shadow-xl rounded-md">
        <div className="text-center p-3">
            <h1 className="text-2xl font-bold mb-3">SignUp Account</h1>
            <input type="email" name="email" placeholder="Enter your email" onChange={handleChange} className="w-[17rem] mb-2 border-0 pl-2.5 py-2 text-gray-900 shadow-sm ring-1  ring-gray-400 focus:ring-2 placeholder:ml-2 sm:text-sm sm:leading-6"/>
            <div className="relative">
              <input type={show ? "text" : "password"} name="password" placeholder="Enter your password" onChange={handleChange} className="w-[17rem] mb-2 border-0 pl-2.5 py-2 text-gray-900 shadow-sm ring-1  ring-gray-400 focus:ring-2 placeholder:ml-2 sm:text-sm sm:leading-6"/>
              <span onClick={() => setShow(!show)} className="absolute cursor-pointer right-5 top-2 text-green-500">Show</span>
            </div>
            <button onClick={handleClick} className="rounded p-1.5 bg-[#0F67B1] hover:bg-[#3FA2F6] text-white font-medium text-md my-2 w-[17rem]">Sign In</button>
            {message && <p className="text-red-700 text-center">{message}</p>} {/* Display message from backend */}
            <p className="text-xs text-gray-600 py-2">Already have an account? <Link to="/login"><span className="underline text-sm">Log In</span></Link></p>
        </div>
    </div>
    </div>
  )
}
