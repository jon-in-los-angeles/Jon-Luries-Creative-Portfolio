import { motion } from "framer-motion";
import { Play } from "lucide-react";

export default function AnimatedPlayIcon() {
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
        
        {/* Main play button */}
        <motion.div
          className="relative w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg"
          whileHover={{ 
            boxShadow: "0 20px 40px rgba(59, 130, 246, 0.3)",
            y: -2
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ x: [0, 2, 0] }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <Play 
              className="text-white text-2xl ml-1" 
              fill="white"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}