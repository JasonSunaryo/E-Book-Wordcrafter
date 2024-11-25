import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginValidation from "./loginValidation";
import axios from "axios";
import Cookies from "js-cookie";
import Auth from "./authGoogle";

function Login() {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleInput = (event) => {
    setValues((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const validationErrors = loginValidation(values);
    setErrors(validationErrors);

    if (!validationErrors.email && !validationErrors.password) {
      axios
        .post("http://localhost:5000/book_login", values)
        .then((res) => {
          if (res.data.Status === "Success") {
            // Store user data including role in cookies
            Cookies.set("session_token", res.data.token, { expires: 30 });
            Cookies.set("user_name", res.data.name, { expires: 30 });
            Cookies.set("user_email", res.data.email, { expires: 30 });
            Cookies.set("user_role", res.data.role, { expires: 30 }); // Store role in cookies
            navigate("/");
          } else {
            alert("Invalid credentials");
          }
        })
        .catch((err) => {
          console.log(err);
          alert("Login failed. Please try again.");
        });
    }
  };

  // Check if user is already logged in
  React.useEffect(() => {
    const token = Cookies.get("session_token");
    if (token) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 flex items-center justify-center">
      <div className="bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-white text-center mb-6">
          Log In
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-white/80 text-sm">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              onChange={handleInput}
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
              type="password"
              name="password"
              placeholder="Enter your password"
              onChange={handleInput}
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
            Log In
          </button>
          <div className="text-center text-white/70 text-sm">
            <span>Don't have an account? </span>
            <Link
              to="/signup"
              className="text-purple-400 hover:underline hover:text-purple-500 transition"
            >
              Create Account
            </Link>
          </div>
        </form>
        <div className="flex items-center justify-center mt-6">
          <Auth />
        </div>
      </div>
    </div>
  );
}

export default Login;