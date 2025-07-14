'use client'

import { SpiralAnimation } from "@/components/ui/spiral-animation"
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const NewHeroSection = () => {
  const [contentVisible, setContentVisible] = useState(false)
  
  // Fade in the content after animation loads
  useEffect(() => {
    const timer = setTimeout(() => {
      setContentVisible(true)
    }, 3000)
    
    return () => clearTimeout(timer)
  }, [])

  // Handle enter click - scroll to next section
  const handleEnterClick = () => {
    const nextSection = document.getElementById('proven-success') || document.querySelector('section')
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' })
    }
  }
  
  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Spiral Animation Background */}
      <div className="absolute inset-0">
        <SpiralAnimation />
      </div>
      
      {/* Center Enter Button */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <motion.button
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ 
            opacity: contentVisible ? 1 : 0, 
            scale: contentVisible ? 1 : 0.5 
          }}
          transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
          whileHover={{ 
            scale: 1.15,
            textShadow: "0 0 15px rgba(255, 255, 255, 0.6)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={handleEnterClick}
          className="text-white text-2xl md:text-3xl font-light tracking-[0.3em] cursor-pointer select-none"
        >
          <motion.span
            animate={{ 
              scale: [1, 1.1, 1],
              opacity: [0.8, 1, 0.8]
            }}
            transition={{ 
              duration: 2.5, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
            ENTER
          </motion.span>
        </motion.button>
      </div>
      
      {/* Bottom Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: contentVisible ? 0.5 : 0 }}
        transition={{ duration: 1.5, delay: 4 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center">
          <motion.div 
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-3 bg-white/30 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </div>
  )
}