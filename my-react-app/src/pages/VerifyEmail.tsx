import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input } from "@/@/components/ui/input"

const VerifyEmail = () => {
  // const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleVerify = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/verify', {
        verificationCode,
      });
      
      setMessage(response.data.message);

      
      // Optionally, you can redirect or perform another action upon successful verification
      // Example: Redirect to a login page
      alert("Email verified successfully");
      navigate('/login');
    } catch (error: any) {
      if (error.response) {
        setMessage(error.response.data.message);
      } else {
        setMessage('Error verifying email. Please try again later.');
      }
      console.error('Verification error:', error);
    }
  };

  return (
    <div className="flex justify-center h-screen items-center">
    <div className="p-3 w-[25%] bg-[#37B7C3] rounded">
      <h2 className='text-lg font-bold text-center text-gray-500 mb-5'>Verify Your Email</h2>
      {/* <div>
        <Input type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div> */}
      <div>
        <Input type="text" placeholder="Enter verification code" value={verificationCode} onChange={(e) => setVerificationCode(e.target.value)} />
      </div>
      <button id="button" className='w-full bg-[#088395] p-2 mt-3 rounded text-white hover:bg-sky-700 font-medium' onClick={handleVerify}>Verify Email</button>
      {message && <p className='text-red-600'>{message}</p>}
    </div>
    </div>
  );
};

export default VerifyEmail;
