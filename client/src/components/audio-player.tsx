import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";

export default function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    // In a real implementation, you would control actual audio playback here
  };

  const visualizerBars = Array.from({ length: 8 }, (_, i) => (
    <motion.div
      key={i}
      className="w-1 bg-white rounded-full"
      animate={{
        height: isPlaying ? [16, 48, 24, 40, 16, 32, 48, 24] : 32,
      }}
      transition={{
        duration: 0.5,
        repeat: isPlaying ? Infinity : 0,
        repeatType: "reverse",
        delay: i * 0.1,
      }}
    />
  ));

  return (
    <section id="audio-showcase" className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl font-bold text-primary mb-4">Listen to My Work</h2>
        <p className="text-xl text-gray-600 mb-12">Sample tracks from studio sessions and live performances</p>
        
        <div className="audio-visualizer rounded-2xl p-8 text-white">
          <div className="h-16 rounded-lg mb-6 flex items-center justify-center">
            <div className="flex space-x-1 items-center">
              {visualizerBars}
            </div>
          </div>
          
          <div className="flex items-center justify-center space-x-6">
            <button className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300">
              <SkipBack size={20} />
            </button>
            <button 
              onClick={togglePlay}
              className="w-16 h-16 bg-white text-accent rounded-full flex items-center justify-center hover:scale-105 transition-all duration-300"
            >
              {isPlaying ? (
                <Pause size={24} />
              ) : (
                <Play size={24} className="ml-1" />
              )}
            </button>
            <button className="w-12 h-12 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all duration-300">
              <SkipForward size={20} />
            </button>
          </div>
          
          <div className="mt-6">
            <h4 className="font-semibold text-lg mb-1">Studio Session Highlights</h4>
            <p className="text-white text-opacity-80">Mixed tracks from NYC recording sessions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
