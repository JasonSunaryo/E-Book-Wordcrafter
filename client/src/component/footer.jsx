import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, ArrowUpCircle } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 relative">
      {/* Background Overlay Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:60px_60px]" />

      {/* Scroll to Top Button */}
      <button 
        onClick={scrollToTop}
        className="absolute -top-6 left-1/2 -translate-x-1/2 bg-gradient-to-r from-red-600 to-red-700 p-2 rounded-full shadow-lg hover:shadow-red-600/50 transition-all duration-300"
      >
        <ArrowUpCircle className="w-8 h-8 text-white" />
      </button>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">WORDCRAFTER</h3>
            <p className="text-white/80">
              Transforming the way you experience literature through innovative digital reading solutions.
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-white/80 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {['About Us', 'Our Library', 'Pricing Plans', 'Reading Devices', 'Help Center'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Categories</h4>
            <ul className="space-y-2">
              {['Fiction', 'Non-Fiction',  'Books', 'Academic', 'Magazines', 'Audiobooks'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-white/80 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white mb-4">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-white/80" />
                <span className="text-white/80">support@wordcrafter.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-white/80" />
                <span className="text-white/80">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-white/80" />
                <span className="text-white/80">123 Reading Street, Digital City</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white/60 text-sm">
              © 2024 Wordcrafter. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Terms of Service
              </a>
              <a href="#" className="text-white/60 hover:text-white text-sm transition-colors">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;