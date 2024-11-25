import React, { useState, useEffect } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode"; // Update import
import axios from 'axios'; // Tambahkan axios untuk request ke backend
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const CLIENT_ID = process.env.REACT_APP_GOOGLE_CLIENT_ID;

function Auth() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Inisialisasi useNavigate

  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem('user'));
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLoginSuccess = async (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded user info:", decoded);

    // Kirim token ke backend untuk validasi dan menentukan role
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-token', {
        token: credentialResponse.credential
      });

      const userWithRole = res.data; // Mendapatkan user dengan role dari backend
      setUser(userWithRole);
      localStorage.setItem('user', JSON.stringify(userWithRole)); // Simpan user secara keseluruhan
      localStorage.setItem('userRole', userWithRole.role); // Simpan hanya role

      // Redirect ke halaman utama setelah login berhasil
      navigate('/'); // Redirect ke '/'
    } catch (error) {
      console.error('Error verifying token:', error);
    }
  };

  const handleLoginError = () => {
    console.error("Login Failed");
  };

  const handleLogout = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    console.log("Logged out successfully");
  };

  return (
    <GoogleOAuthProvider clientId={CLIENT_ID}>
      <div className="p-4">
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap
          />
        ) : (
          <div>
            <p>Welcome, {user.name}! You're logged in as a {user.role}.</p>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
}

export default Auth;
