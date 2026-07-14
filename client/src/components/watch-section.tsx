import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, Clock, X } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import type { Video } from "@shared/schema";
import AnimatedEyeIcon from "./animated-play-icon";

export const categoryGroups = [
  {
    name: "Content Operations & Digital Learning",
    description: "Building and managing high-quality educational content that reaches millions.",
  },
  {
    name: "Brand Strategy & Product Storytelling",
    description: "Turning complex products and services into clear, compelling video stories.",
  },
  {
    name: "Experiential Partnerships & Live Events",
    description: "Connecting brands with culture through unforgettable live music and experiential events.",
  },
];

export default function WatchSection({ embedded = false }: { embedded?: boolean }) {
  const [openDialog, setOpenDialog] = useState<string | null>(null);

  const { data: videos = [], isLoading } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      if (!response.ok) throw new Error("Failed to fetch videos");
      return response.json();
    },
  });

  // Function to convert video URL to embed format
  const getEmbedUrl = (url: string) => {
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('vimeo.com/')) {
      const videoId = url.split('/').pop()?.split('?')[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return url;
  };

  if (isLoading) {
    return (
      <section id="watch" className={embedded ? "py-10 bg-gray-50" : "py-20 bg-gray-50"}>
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-primary mb-4">Watch</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Selected work across content operations, brand storytelling, and live events.
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
    <section id="watch" className={embedded ? "py-10 bg-white relative overflow-hidden" : "pt-4 pb-24 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"}>
      {!embedded && (
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-40 left-10 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-40 right-10 w-96 h-96 bg-teal/10 rounded-full blur-3xl"></div>
        </div>
      )}
      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <div className={embedded ? "text-center mb-10" : "text-center mb-20"}>
          {!embedded && <AnimatedEyeIcon />}
          <h2 className={embedded ? "text-3xl lg:text-4xl font-bold text-primary mb-4 tracking-tight" : "text-5xl lg:text-6xl font-bold text-primary mb-6 tracking-tight"}>Watch</h2>
          <p className={embedded ? "text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed" : "text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed"}>Content that educates, entertains, and informs.</p>
        </div>

        <div className={embedded ? "space-y-14" : "space-y-24"}>
          {categoryGroups.map((group) => {
            const groupVideos = videos.filter((video) => video.category === group.name);
            if (groupVideos.length === 0) return null;
            return (
              <div key={group.name}>
                <div className="text-center mb-12 max-w-3xl mx-auto">
                  <h3 className="text-3xl lg:text-4xl font-bold text-primary mb-4 tracking-tight">{group.name}</h3>
                  <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">{group.description}</p>
                </div>
                <div className={groupVideos.length === 1 ? "flex justify-center" : "grid md:grid-cols-2 lg:grid-cols-3 gap-8"}>
                  {groupVideos.map((video, index) => {
                    return (
            <Dialog key={video.id} open={openDialog === video.id.toString()} onOpenChange={(open) => {
              setOpenDialog(open ? video.id.toString() : null);
            }}>
              <DialogTrigger asChild>
                <motion.button
                  type="button"
                  aria-label={`Watch ${video.title}`}
                  className={`group cursor-pointer text-left block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-2xl ${groupVideos.length === 1 ? 'w-full max-w-md' : 'w-full'}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <div className="bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 group-hover:scale-[1.03] group-hover:shadow-2xl group-hover:shadow-accent/20">
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

                    </div>

                    {/* Video Info */}
                    <div className="p-6 flex flex-col h-64">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-primary group-hover:text-accent transition-colors duration-300 line-clamp-2">
                          {video.title}
                        </h3>
                        <Play className="text-gray-400 group-hover:text-accent transition-colors duration-300 flex-shrink-0 ml-2" size={18} />
                      </div>
                      
                      <p className="text-gray-600 mb-4 leading-relaxed flex-1 line-clamp-3">
                        {video.description}
                      </p>
                      
                      <div className="flex items-center justify-between mt-auto">
                        <span className="text-sm text-gray-500 font-medium">{video.year}</span>
                        <div className="flex items-center text-accent font-medium text-sm">
                          Watch Video
                          <Play className="w-4 h-4 ml-2" />
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </DialogTrigger>
              
              <DialogContent className="max-w-4xl w-full p-0">
                <DialogTitle className="sr-only">{video.title}</DialogTitle>
                <DialogDescription className="sr-only">{video.description}</DialogDescription>
                <div className="relative">
                  <button
                    onClick={() => setOpenDialog(null)}
                    className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-all"
                  >
                    <X size={20} />
                  </button>
                  
                  <div className="aspect-video">
                    <iframe
                      src={getEmbedUrl(video.vimeoUrl)}
                      title={video.title}
                      className="w-full h-full rounded-lg"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-2xl font-bold text-primary mb-2">{video.title}</h3>
                    <p className="text-gray-600 mb-4">{video.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{video.category} • {video.year}</span>
                      <span className="text-sm text-gray-500">{video.duration}</span>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
                    );
                  })}
                </div>
              </div>
            );
          })}
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