import React, { useState } from 'react';
import { ArrowRight, BookOpen, Headphones, Smartphone, Play, Search } from 'lucide-react';
import cover from '../assets/img/cover-hero.webp';
import logo from '../assets/img/Logo.png';
import Navbar from './navbar';

const Hero = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const featuredGenres = [
    { name: 'Sci-Fi', color: 'from-blue-500 to-purple-600' },
    { name: 'Romance', color: 'from-pink-500 to-red-600' },
    { name: 'Mystery', color: 'from-gray-700 to-black' },
    { name: 'Fantasy', color: 'from-green-500 to-emerald-600' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-900 via-purple-900 to-red-900 overflow-hidden relative">
      {/* Background Overlay Pattern */}
      <div className="absolute inset-0 bg-grid-white/[0.02] bg-[size:40px_40px] pointer-events-none" />
      
      <Navbar />
      
      {/* Hero Content */}
      <div className="container mx-auto px-6 sm:px-8 lg:px-12 pt-36 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column */}
          <div className="space-y-12 text-center lg:text-left">
            <div className="space-y-8">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-white/80 animate-gradient">
                UNLOCK INFINITE <br />STORYTELLING
              </h1>
              <p className="text-white/80 text-base sm:text-lg leading-relaxed max-w-md mx-auto lg:mx-0">
                Dive into a world of endless stories. Discover, listen, and explore books that transform your imagination.
              </p>
            </div>

            {/* Enhanced Search and Action Area */}
            <div className="space-y-6">
              <div className="relative max-w-md mx-auto lg:mx-0">
                <input 
                  type="text" 
                  placeholder="Search books, authors, genres..." 
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full px-4 py-3 rounded-full bg-white/10 text-white placeholder-white/50 border border-white/20 focus:outline-none focus:ring-2 focus:ring-red-500 transition-all duration-300"
                />
                <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>

           
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap justify-center gap-4">
              <button className="group bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white px-6 py-3 rounded-lg flex items-center text-base transition-all duration-300 shadow-lg hover:shadow-red-600/50 hover:-translate-y-1">
                BROWSE BOOKS
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="group bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg flex items-center text-base transition-all duration-300 border border-white/20 hover:-translate-y-1">
                <Play className="mr-2 h-4 w-4 text-red-500 group-hover:scale-110 transition-transform" />
                QUICK START
              </button>
            </div>
          </div>

          {/* Right Column - Cover Image */}
          <div className="relative hidden lg:block">
            {/* Geometric Elements */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-white/10 to-transparent rotate-45 backdrop-blur-3xl animate-pulse" />
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tl from-white/10 to-transparent -rotate-45 backdrop-blur-3xl animate-pulse" />
            
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/30 to-purple-500/30 blur-3xl opacity-20" />
            
            {/* Cover Image with parallax effect */}
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500 group">
              <img
                src={cover}
                alt="Book Cover"
                className="w-72 mx-auto drop-shadow-2xl rounded-lg group-hover:rotate-3 transition-transform"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 rounded-lg transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Play className="h-16 w-16 text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Service Cards */}
        <div className="grid md:grid-cols-3 gap-8 lg:gap-12 mt-32 lg:mt-40 pb-20">
          {[ 
            {
              icon: BookOpen,
              title: "ENDLESS LIBRARY",
              description: "Over 1M+ books. From timeless classics to latest releases, discover your next obsession."
            },
            {
              icon: Headphones,
              title: "IMMERSIVE AUDIO",
              description: "Professional narrations that bring stories to life. Listen anywhere, anytime."
            },
            {
              icon: Smartphone,
              title: "MULTI-DEVICE SYNC",
              description: "Seamless reading across devices. Bookmark, highlight, and continue where you left off."
            }
          ].map((service, index) => (
            <div key={index} className="group relative bg-gradient-to-br from-blue-800/30 to-purple-800/30 p-6 rounded-xl backdrop-blur-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 overflow-hidden hover:-translate-y-1">
              {/* Hover Effect Background */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-pink-600/0 group-hover:from-blue-600/10 group-hover:via-purple-600/10 group-hover:to-pink-600/10 transition-all duration-500" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <service.icon className="w-12 h-12 text-white mb-4 transform group-hover:scale-110 transition-transform duration-300" />
                <h3 className="text-white text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-white/70 text-sm group-hover:text-white transition-colors duration-300">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Hero;
