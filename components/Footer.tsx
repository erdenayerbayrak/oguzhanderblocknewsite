'use client';

import { motion } from 'framer-motion';
import { MessageCircle, Send } from 'lucide-react';

const Footer = () => {
  const socialLinks = [
    { 
      icon: MessageCircle, 
      href: "#", 
      label: "Discord",
      color: "from-indigo-500 to-purple-600",
      hoverColor: "hover:from-indigo-400 hover:to-purple-500"
    },
    { 
      icon: Send, 
      href: "#", 
      label: "Telegram",
      color: "from-blue-500 to-cyan-500",
      hoverColor: "hover:from-blue-400 hover:to-cyan-400"
    }
  ];

  return (
    <footer className="bg-gradient-to-br from-[#121152] via-[#38476b] to-[#ffc1ac] border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-3xl font-bold text-white mb-4">
              Trading<span className="text-blue-400">Community</span>
            </h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Profesyonel trading eğitimi ve mentorlik hizmeti sunan önde gelen topluluğumuz. 
              Başarılı trader olma yolculuğunuzda yanınızdayız.
            </p>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-8"
          >
            <h4 className="text-lg font-semibold text-white mb-6">Topluluğumuza Katılın</h4>
            <div className="flex justify-center space-x-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className={`group relative w-16 h-16 bg-gradient-to-r ${social.color} ${social.hoverColor} rounded-2xl flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                  aria-label={social.label}
                >
                  <social.icon size={24} />
                  <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-400 group-hover:text-white transition-colors duration-300">
                    {social.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="border-t border-white/10 pt-8"
          >
            <p className="text-gray-400 text-sm">
              © 2024 OguzhanderBlock Trading Community. Tüm hakları saklıdır.
            </p>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;