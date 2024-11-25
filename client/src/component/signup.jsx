import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import signUpValidation from "./signupValidation";
import axios from "axios";
import Auth from "./authGoogle";

function Signup() {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Lakukan validasi
      const validationErrors = signUpValidation(values);
      setErrors(validationErrors);

      // Hanya melanjutkan jika tidak ada error
      if (
        validationErrors.name === "" &&
        validationErrors.email === "" &&
        validationErrors.password === ""
      ) {
        const res = await axios.post("http://localhost:5000/book_signup", values);
        navigate("/login");
      }
    } catch (err) {
      console.error("Error during signup:", err);

      // Jika ada error dari server
      if (err.response && err.response.status === 400) {
        alert(err.response.data.message || "Email already exists");
      } else {
        alert("An unexpected error occurred. Please try again later.");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md mt-[5rem] mb-[5rem]">
        <h2 className="text-2xl font-bold text-white text-center mb-6 ">
          Sign Up
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-white/80 text-sm">
              Name
            </label>
            <input
              name="name"
              type="text"
              placeholder="Enter your name"
              onInput={handleInput}
              className="w-full mt-2 p-3 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            {errors.name && (
              <span className="text-red-400 text-sm">{errors.name}</span>
            )}
          </div>
          <div>
            <label htmlFor="email" className="block text-white/80 text-sm">
              Email Address
            </label>
            <input
              name="email"
              type="email"
              placeholder="Enter your email"
              onInput={handleInput}
              className="w-full mt-2 p-3 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            {errors.email && (
              <span className="text-red-400 text-sm">{errors.email}</span>
            )}
          </div>
          <div>
            <label htmlFor="password" className="block text-white/80 text-sm">
              Password
            </label>
            <input
              name="password"
              type="password"
              placeholder="Enter your password"
              onInput={handleInput}
              className="w-full mt-2 p-3 rounded-md bg-white/20 text-white focus:ring-2 focus:ring-purple-500 outline-none"
            />
            {errors.password && (
              <span className="text-red-400 text-sm">{errors.password}</span>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-red-500 hover:from-purple-600 hover:to-red-600 text-white py-3 rounded-md shadow-lg transition-all duration-300 transform hover:-translate-y-1"
          >
            Sign Up
          </button>
          <div className="text-center text-white/70 text-sm">
            <span>Already have an account? </span>
            <Link
              to="/login"
              className="text-purple-400 hover:underline hover:text-purple-500 transition"
            >
              Log In
            </Link>
          </div>
        </form>
        <div className="flex items-center justify-center">
          <strong>
            <Auth />
          </strong>
        </div>
      </div>
    </div>
  );
}

export default Signup;
