import React, { useState, useEffect } from 'react';
import { Menu, X, Book, Edit } from 'lucide-react';
import { Link, useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Logo from '../assets/img/Logo.png'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Check both authentication methods
    const sessionToken = Cookies.get('session_token');
    const googleAuth = localStorage.getItem('userRole'); // For Google Auth
    const sqlRole = Cookies.get('user_role'); // For SQL Auth
    
    // Set logged in if either auth method is present
    setIsLoggedIn(!!sessionToken || !!googleAuth);
    
    // Determine role (prioritize Google Auth if both present)
    const role = googleAuth || sqlRole;
    setUserRole(role || null);
  }, []);

  const handleLogout = () => {
    // Clear Google Auth
    localStorage.removeItem('userRole');
    
    // Clear SQL Auth
    Cookies.remove('session_token');
    Cookies.remove('user_name');
    Cookies.remove('user_email');
    Cookies.remove('user_role');
    
    // Update state
    setIsLoggedIn(false);
    setUserRole(null);
    
    // Redirect to home page
    navigate('/');
  };

  // Helper function to check if user has admin privileges
  const isAdmin = () => userRole === 'admin';

  return (
    <nav className="fixed w-full z-50 bg-gradient-to-r from-blue-900/80 via-purple-900/80 to-red-900/80 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
        <Link to={'/'}>
            <img className="w-40 h-32" src={Logo} alt="Logo" />
          </Link>


          <div className="hidden md:flex items-center justify-between flex-1 ml-10">
            <div className="flex space-x-8">
              <Link to="/" className="text-white hover:text-white/80 px-3 py-2 text-sm font-medium">
                Home
              </Link>
              <Link to="#subscription" className="text-white hover:text-white/80 px-3 py-2 text-sm font-medium">
                Subscription
              </Link>
              <Link to="#detail" className="text-white hover:text-white/80 px-3 py-2 text-sm font-medium">
                Detail
              </Link>
            </div>

            <div className="flex items-center space-x-4">
              {isLoggedIn && isAdmin() && (
                <>
                  <Link to="/subscriptions" className="text-white hover:text-white/80 px-3 py-2 text-sm font-medium inline-flex items-center">
                    <Edit className="h-4 w-4 mr-2" />
                    Manage Subscription
                  </Link>
                  <Link to="/home" className="text-white hover:text-white/80 px-3 py-2 text-sm font-medium inline-flex items-center">
                    <Book className="h-4 w-4 mr-2" />
                    Manage Book
                  </Link>
                </>
              )}
              
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className="text-white px-4 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/10"
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/login" className="text-white px-4 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/10">
                    Login
                  </Link>
                  <Link to="/signup" className="text-white px-4 py-2 text-sm font-medium rounded-lg border border-white/20 hover:bg-white/10">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-white/80 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gradient-to-r from-blue-900/95 via-purple-900/95 to-red-900/95 backdrop-blur-sm">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <Link to="/" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium">
              Home
            </Link>
            <Link to="#subscription" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium">
              Subscription
            </Link>
            <Link to="#detail" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium">
              Detail
            </Link>

            {isLoggedIn && isAdmin() && (
              <>
                <Link to="/subscriptions" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium inline-flex items-center">
                  <Edit className="h-4 w-4 mr-2" />
                  Manage Subscription
                </Link>
                <Link to="/home" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium inline-flex items-center">
                  <Book className="h-4 w-4 mr-2" />
                  Manage Book
                </Link>
              </>
            )}

            {isLoggedIn ? (
              <button
                onClick={handleLogout}
                className="text-white hover:bg-white/10 block w-full text-left px-3 py-2 rounded-md text-base font-medium"
              >
                Logout
              </button>
            ) : (
              <>
                <Link to="/login" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium">
                  Login
                </Link>
                <Link to="/signup" className="text-white hover:bg-white/10 block px-3 py-2 rounded-md text-base font-medium">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;