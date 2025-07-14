'use client';

import { motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Kurucu', href: '#founder' },
    { name: 'Videolarımız', href: '#projects' },
    { name: 'Fiyatlandırma', href: '#pricing' }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-[#121152] via-[#38476b] to-[#ffc1ac] backdrop-blur-md border-b border-white/10"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-white"
          >
            <span className="transform -skew-x-12 text-blue-400">CULT</span>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {menuItems.map((item, index) => (
              <motion.a
                key={index}
                href={item.href}
                whileHover={{ scale: 1.1 }}
                className="text-gray-300 hover:text-white transition-colors duration-200 font-medium"
              >
                {item.name}
              </motion.a>
            ))}
          </nav>

          {/* CTA Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:block bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-full font-semibold hover:shadow-lg transition-all duration-300"
            onClick={() => window.open('https://t.me/yourchannelname', '_blank')}
          >
            Telegrama Katıl
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-black/40 backdrop-blur-md rounded-lg mt-2 p-4"
          >
            <nav className="flex flex-col space-y-4">
              {menuItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-300 hover:text-white transition-colors duration-200 font-medium py-2"
                >
                  {item.name}
                </a>
              ))}
              <button 
                className="bg-gradient-to-r from-blue-500 to-cyan-600 text-white px-6 py-2 rounded-full font-semibold mt-4"
                onClick={() => window.open('https://t.me/yourchannelname', '_blank')}
              >
                Telegrama Katıl
              </button>
            </nav>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
};

export default Header;