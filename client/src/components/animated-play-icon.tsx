import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function AnimatedEyeIcon() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [eyeRef, setEyeRef] = useState<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (eyeRef) {
        const rect = eyeRef.getBoundingClientRect();
        const eyeCenterX = rect.left + rect.width / 2;
        const eyeCenterY = rect.top + rect.height / 2;
        
        const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
        const distance = Math.min(8, Math.sqrt(Math.pow(e.clientX - eyeCenterX, 2) + Math.pow(e.clientY - eyeCenterY, 2)) / 20);
        
        setMousePosition({
          x: Math.cos(angle) * distance,
          y: Math.sin(angle) * distance
        });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [eyeRef]);

  return (
    <motion.div
      className="flex justify-center mb-6"
      initial={{ opacity: 0, scale: 0.5 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.6,
        type: "spring",
        stiffness: 100,
        damping: 10
      }}
      viewport={{ once: true }}
    >
      <motion.div
        className="relative"
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.3 }}
        ref={setEyeRef}
      >
        {/* Animated background circles */}
        <motion.div
          className="absolute inset-0 w-20 h-20 bg-blue-500 rounded-full opacity-20"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.1, 0.2]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute inset-0 w-20 h-20 bg-blue-500 rounded-full opacity-10"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.1, 0.05, 0.1]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5
          }}
        />
        
        {/* Eye container */}
        <motion.div
          className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg overflow-hidden"
          whileHover={{ 
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            y: -2
          }}
          transition={{ duration: 0.3 }}
        >
          {/* Eye white */}
          <div className="w-12 h-8 bg-white rounded-full flex items-center justify-center relative">
            {/* Iris */}
            <motion.div
              className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center"
              animate={{
                x: mousePosition.x,
                y: mousePosition.y
              }}
              transition={{
                type: "spring",
                stiffness: 150,
                damping: 15
              }}
            >
              {/* Pupil */}
              <div className="w-3 h-3 bg-black rounded-full">
                {/* Light reflection */}
                <div className="w-1 h-1 bg-white rounded-full ml-1 mt-0.5"></div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}