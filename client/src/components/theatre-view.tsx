import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Play, X, Rocket, ArrowUpRight, Mail, Linkedin, MapPin, Clapperboard } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { categoryGroups } from "@/components/watch-section";
import type { Video, Experience } from "@shared/schema";

const getEmbedUrl = (url: string) => {
  if (url.includes("youtube.com/watch?v=")) {
    const videoId = url.split("v=")[1]?.split("&")[0];
    return `https://www.youtube.com/embed/${videoId}`;
  } else if (url.includes("vimeo.com/")) {
    const videoId = url.split("/").pop()?.split("?")[0];
    return `https://player.vimeo.com/video/${videoId}`;
  }
  return url;
};

export default function TheatreView() {
  const [openVideo, setOpenVideo] = useState<Video | null>(null);

  const { data: videos = [] } = useQuery<Video[]>({
    queryKey: ["/api/videos"],
    queryFn: async () => {
      const response = await fetch("/api/videos");
      if (!response.ok) throw new Error("Failed to fetch videos");
      return response.json();
    },
  });

  const { data: experiences = [] } = useQuery<Experience[]>({
    queryKey: ["/api/experiences"],
    queryFn: async () => {
      const response = await fetch("/api/experiences");
      if (!response.ok) throw new Error("Failed to fetch experiences");
      return response.json();
    },
  });

  const sortedVideos = [...videos].sort((a, b) => b.year - a.year);
  const featured = sortedVideos[0];
  const rest = sortedVideos.slice(1);
  const sortedExperiences = [...experiences].sort((a, b) => b.startYear - a.startYear);

  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 sm:py-12 text-white">
        {/* Marquee header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-12"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-300">
            <Clapperboard className="h-3 w-3 text-yellow" />
            Now Showing
          </div>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-white sm:text-4xl">
            Selected work, presented on the big screen.
          </h1>
          <p className="mx-auto max-w-xl text-sm text-gray-400 sm:text-base">
            245 videos produced &middot; 29.8M+ views &middot; 2.7M+ learners reached
          </p>
        </motion.div>

        {/* Featured presentation */}
        {featured && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            onClick={() => setOpenVideo(featured)}
            className="group relative mb-12 block w-full overflow-hidden rounded-2xl border border-white/10 text-left shadow-2xl sm:mb-16"
          >
            <img
              src={featured.thumbnailUrl}
              alt={featured.title}
              className="h-[260px] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:h-[420px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/10" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 sm:h-20 sm:w-20">
                <Play className="ml-1 h-7 w-7 text-black sm:h-8 sm:w-8" fill="currentColor" />
              </div>
            </div>
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-8">
              <span className="mb-2 inline-flex items-center rounded-full bg-yellow px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-gray-900">
                Featured Presentation
              </span>
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-white sm:text-4xl">{featured.title}</h2>
              <p className="mb-2 max-w-2xl text-sm text-gray-300 sm:text-base">{featured.description}</p>
              <p className="text-xs text-gray-400 sm:text-sm">
                {featured.category} &middot; {featured.year} &middot; {featured.duration}
              </p>
            </div>
          </motion.button>
        )}

        {/* Now playing, by category */}
        <div className="space-y-10 sm:space-y-14">
          {categoryGroups.map((group) => {
            const groupVideos = rest.filter((v) => v.category === group.name);
            if (groupVideos.length === 0) return null;
            return (
              <div key={group.name}>
                <div className="mb-4 flex items-baseline justify-between gap-3 border-b border-white/10 pb-3 sm:mb-6">
                  <h3 className="text-lg font-bold tracking-tight text-white sm:text-xl">{group.name}</h3>
                  <span className="hidden text-xs text-gray-500 sm:inline">{group.description}</span>
                </div>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
                  {groupVideos.map((video, index) => (
                    <motion.button
                      key={video.id}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                      onClick={() => setOpenVideo(video)}
                      className="group text-left"
                    >
                      <div className="relative mb-2 overflow-hidden rounded-xl border border-white/10">
                        <img
                          src={video.thumbnailUrl}
                          alt={video.title}
                          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                          <Play className="h-8 w-8 text-white" fill="currentColor" />
                        </div>
                        <span className="absolute bottom-1.5 right-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] font-medium text-gray-200">
                          {video.duration}
                        </span>
                      </div>
                      <p className="truncate text-sm font-semibold text-white">{video.title}</p>
                      <p className="text-xs text-gray-500">{video.year}</p>
                    </motion.button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Coming attractions */}
        <motion.a
          href="https://investinconnection.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="group mt-12 flex flex-col gap-4 rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-white/5 to-transparent p-5 transition-all hover:border-accent/60 sm:mt-16 sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
              <Rocket className="h-5 w-5 text-yellow" />
            </div>
            <div>
              <span className="mb-1 inline-flex items-center rounded-full bg-white/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-gray-300">
                Coming Attractions
              </span>
              <h3 className="text-xl font-bold text-white sm:text-2xl">Connect for Success (C4S)</h3>
              <p className="text-sm text-gray-400">A platform that helps managers and teams communicate better.</p>
            </div>
          </div>
          <span className="flex flex-shrink-0 items-center gap-1.5 self-start rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition-colors group-hover:bg-white/20 sm:self-center">
            Learn more
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </motion.a>

        {/* Credits */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-12 border-t border-white/10 pt-8 sm:mt-16"
        >
          <p className="mb-4 text-center text-[10px] font-semibold uppercase tracking-[0.3em] text-gray-500">Credits</p>
          <div className="mx-auto max-w-2xl space-y-2 text-center">
            {sortedExperiences.map((exp) => (
              <p key={exp.id} className="text-sm text-gray-400">
                <span className="font-semibold text-gray-200">{exp.title}</span>
                <span className="text-gray-600"> — </span>
                {exp.company}
                <span className="text-gray-600"> · </span>
                {exp.startYear}
                {exp.endYear ? `–${exp.endYear}` : "–Present"}
              </p>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 text-sm text-gray-400">
            <a href="mailto:jlurie.12@gmail.com" className="flex items-center gap-1.5 hover:text-white hover:underline">
              <Mail className="h-3.5 w-3.5" />
              jlurie.12@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jlurie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-white hover:underline"
            >
              <Linkedin className="h-3.5 w-3.5" />
              linkedin.com/in/jlurie
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" />
              Los Angeles, CA
            </span>
          </div>
        </motion.div>
      </div>

      <Dialog open={!!openVideo} onOpenChange={(open) => !open && setOpenVideo(null)}>
        <DialogContent className="max-w-4xl w-[95vw] max-h-[88vh] overflow-hidden rounded-[24px] p-0">
          <DialogTitle className="sr-only">{openVideo?.title}</DialogTitle>
          <DialogDescription className="sr-only">{openVideo?.description}</DialogDescription>
          {openVideo && (
            <div className="relative">
              <button
                onClick={() => setOpenVideo(null)}
                className="absolute top-4 right-4 z-10 rounded-full border border-white/20 bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
              >
                <X size={20} />
              </button>
              <div className="aspect-video">
                <iframe
                  src={getEmbedUrl(openVideo.vimeoUrl)}
                  title={openVideo.title}
                  className="h-full w-full rounded-lg"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <div className="p-4 sm:p-6">
                <div className="mb-3 inline-flex items-center rounded-full bg-gray-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-gray-600">
                  {openVideo.category}
                </div>
                <h3 className="mb-2 text-xl font-bold text-primary sm:text-2xl">{openVideo.title}</h3>
                <p className="mb-4 leading-relaxed text-gray-600">{openVideo.description}</p>
                <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                  <span className="text-sm text-gray-500">
                    {openVideo.category} • {openVideo.year}
                  </span>
                  <span className="text-sm text-gray-500">{openVideo.duration}</span>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
