import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, Clock, ExternalLink } from "lucide-react";
import type { Video } from "@shared/schema";

export default function WatchSection() {
  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      if (!response.ok) throw new Error("Failed to fetch videos");
      return response.json();
    },
  });

  if (isLoading) {
    return (
      <section id="watch" className="py-20 bg-gray-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Watch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Featured video productions showcasing musical performances and creative storytelling.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {[...Array(2)].map((_, i) => (
              <div key={i} className="bg-white rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="watch" className="py-20 bg-gray-50">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-primary mb-4">Watch</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Featured video productions showcasing musical performances and creative storytelling.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((video, index) => (
            <motion.div
              key={video.id}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              onClick={() => window.open(video.vimeoUrl, '_blank')}
            >
              <div className="bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl">
                {/* Video Thumbnail */}
                <div className="relative">
                  <img 
                    src={video.thumbnailUrl} 
                    alt={video.title}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Play Overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="w-20 h-20 bg-white bg-opacity-90 rounded-full flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110">
                      <Play className="text-primary text-2xl ml-1" fill="currentColor" />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div className="absolute bottom-4 right-4 bg-black bg-opacity-75 text-white px-3 py-1 rounded-full text-sm flex items-center">
                    <Clock className="w-4 h-4 mr-1" />
                    {video.duration}
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-accent text-white px-3 py-1 rounded-full text-sm font-medium">
                    {video.category}
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300">
                      {video.title}
                    </h3>
                    <ExternalLink className="text-gray-400 group-hover:text-accent transition-colors duration-300 flex-shrink-0 ml-2" size={18} />
                  </div>
                  
                  <p className="text-gray-600 mb-4 leading-relaxed">
                    {video.description}
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500 font-medium">{video.year}</span>
                    <div className="flex items-center text-accent font-medium text-sm">
                      {video.vimeoUrl.includes('youtube.com') ? 'Watch on YouTube' : 'Watch on Vimeo'}
                      <Play className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {videos.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No featured videos available.</p>
          </div>
        )}
      </div>
    </section>
  );
}