import { motion } from "framer-motion";

export default function AIAutomationIcon() {
  return (
    <div className="w-full h-64 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-center justify-center overflow-hidden relative">
      {/* Background grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#6366f1" strokeWidth="0.5"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Central AI brain/processor */}
      <motion.div 
        className="relative z-10"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" fill="white"/>
            <circle cx="12" cy="12" r="3" fill="white" fillOpacity="0.3"/>
          </svg>
        </div>
      </motion.div>

      {/* Floating data nodes */}
      <motion.div 
        className="absolute top-8 left-12"
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
          <div className="w-3 h-3 bg-white rounded-full"></div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute top-16 right-16"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: -1 }}
      >
        <div className="w-6 h-6 bg-purple-400 rounded-full flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-12 left-8"
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: -2 }}
      >
        <div className="w-7 h-7 bg-indigo-400 rounded-full flex items-center justify-center">
          <div className="w-2.5 h-2.5 bg-white rounded-full"></div>
        </div>
      </motion.div>

      <motion.div 
        className="absolute bottom-16 right-12"
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut", delay: -0.5 }}
      >
        <div className="w-9 h-9 bg-cyan-400 rounded-full flex items-center justify-center">
          <div className="w-3.5 h-3.5 bg-white rounded-full"></div>
        </div>
      </motion.div>

      {/* Connection lines */}
      <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <motion.path 
          d="M 96 128 Q 150 100 200 120"
          stroke="url(#gradient1)" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2, delay: 1, repeat: Infinity, repeatType: "reverse" }}
        />
        <motion.path 
          d="M 96 128 Q 60 80 80 50"
          stroke="url(#gradient2)" 
          strokeWidth="2" 
          fill="none"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 2.5, delay: 1.5, repeat: Infinity, repeatType: "reverse" }}
        />
        <defs>
          <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0.6"/>
          </linearGradient>
          <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.6"/>
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.6"/>
          </linearGradient>
        </defs>
      </svg>

      {/* Text labels */}
      <div className="absolute top-4 left-4 text-xs font-medium text-blue-600 bg-white bg-opacity-80 px-2 py-1 rounded">
        ChatGPT API
      </div>
      <div className="absolute bottom-4 right-4 text-xs font-medium text-purple-600 bg-white bg-opacity-80 px-2 py-1 rounded">
        Automation
      </div>
    </div>
  );
}