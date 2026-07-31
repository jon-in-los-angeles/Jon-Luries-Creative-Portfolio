import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Briefcase, Play, X, Mail, Linkedin, MapPin, Rocket, ArrowUpRight } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
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

// Which videos were produced under which company/role — curated by hand since
// the data model doesn't link videos to experiences.
const experienceVideoTitles: Record<string, string[]> = {
  "Madecraft": ["Madecraft Educational Content"],
  "Melogold, Inc.": [
    "Chicano Batman - KEXP Session",
    "Jim James - Studio Session",
    "Zocdoc - Introducing Doctors",
    "SeatGeek - Wild Child",
  ],
  "The Wild Honey Pie": [
    "Welcome Campers Season 3",
    "Brian Wilson - Little Kids Rock Benefit",
  ],
};

const twelveGrandProject = {
  title: "Connect for Success (C4S)",
  description:
    "A behavioral intelligence platform that helps managers and teams communicate better, reducing workplace friction.",
  url: "https://investinconnection.com",
};

type Child = { kind: "video"; data: Video } | { kind: "project"; data: typeof twelveGrandProject };

function childYear(child: Child) {
  return child.kind === "video" ? child.data.year : Infinity;
}

export default function TimelineView() {
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

  const sortedExperiences = [...experiences].sort((a, b) => b.startYear - a.startYear);

  const assignedTitles = new Set(Object.values(experienceVideoTitles).flat());
  const unmappedVideos = videos.filter((v) => !assignedTitles.has(v.title));

  const childrenByExperience = new Map<number, Child[]>();
  for (const experience of sortedExperiences) {
    const titles = experienceVideoTitles[experience.company] ?? [];
    const children: Child[] = videos
      .filter((v) => titles.includes(v.title))
      .map((data): Child => ({ kind: "video", data }));

    // Fallback: place any unmapped video under the role whose years contain it.
    const endYear = experience.endYear ?? new Date().getFullYear();
    for (const video of unmappedVideos) {
      if (video.year >= experience.startYear && video.year <= endYear) {
        children.push({ kind: "video", data: video });
      }
    }

    if (experience.company === "12 Grand LLC") {
      children.push({ kind: "project", data: twelveGrandProject });
    }

    children.sort((a, b) => childYear(b) - childYear(a));
    childrenByExperience.set(experience.id, children);
  }

  return (
    <>
      <div className="mx-auto w-full max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 text-center sm:mb-14"
        >
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-600">
            <span className="h-2 w-2 rounded-full bg-accent" />
            The Journey
          </div>
          <h1 className="mb-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            A decade of career moves and the work built along the way.
          </h1>
          <p className="mx-auto max-w-xl text-sm text-gray-600 sm:text-base">
            Each role, with the work produced during it, most recent first.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative pl-8 sm:pl-10">
          <div className="absolute left-[11px] top-2 bottom-2 w-px bg-gray-200 sm:left-[15px]" />

          <div className="space-y-8 sm:space-y-10">
            {sortedExperiences.map((experience, index) => {
              const yearRange = experience.endYear
                ? `${experience.startYear}–${experience.endYear}`
                : `${experience.startYear}–Present`;
              const children = childrenByExperience.get(experience.id) ?? [];

              return (
                <motion.div
                  key={experience.id}
                  initial={{ opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.4) }}
                  className="relative"
                >
                  <div className="absolute left-[-32px] top-4 flex h-6 w-6 items-center justify-center rounded-full border-2 border-white bg-yellow shadow-sm sm:left-[-40px]">
                    <Briefcase className="h-3 w-3 text-gray-900" />
                  </div>

                  <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
                    <div className="mb-1 flex flex-wrap items-center justify-between gap-1">
                      <h3 className="font-bold text-gray-900">{experience.title}</h3>
                      <span className="text-xs font-medium text-gray-500">{yearRange}</span>
                    </div>
                    <p className="mb-2 text-sm font-medium text-gray-700">
                      {experience.company} · {experience.location}
                    </p>
                    <p className="text-sm leading-relaxed text-gray-600">{experience.description}</p>
                  </div>

                  {/* Nested work produced under this role */}
                  {children.length > 0 && (
                    <div className="relative ml-4 mt-3 space-y-2.5 border-l border-dashed border-gray-300 pl-5 sm:ml-6 sm:pl-6">
                      {children.map((child) =>
                        child.kind === "video" ? (
                          <button
                            key={`video-${child.data.id}`}
                            onClick={() => setOpenVideo(child.data)}
                            className="group flex w-full items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 p-2.5 text-left transition-all hover:-translate-y-0.5 hover:border-gray-400 hover:bg-white hover:shadow-sm"
                          >
                            <div className="relative flex-shrink-0">
                              <img
                                src={child.data.thumbnailUrl}
                                alt={child.data.title}
                                className="h-12 w-18 rounded-lg object-cover sm:h-14 sm:w-20"
                              />
                              <div className="absolute inset-0 flex items-center justify-center rounded-lg bg-black/30 opacity-0 transition-opacity group-hover:opacity-100">
                                <Play className="h-4 w-4 text-white" fill="currentColor" />
                              </div>
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center justify-between gap-1">
                                <p className="truncate text-sm font-semibold text-gray-900">{child.data.title}</p>
                                <span className="text-xs font-medium text-gray-500">{child.data.year}</span>
                              </div>
                              <p className="truncate text-xs text-gray-500">{child.data.category}</p>
                            </div>
                          </button>
                        ) : (
                          <a
                            key="c4s-project"
                            href={child.data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-3 rounded-xl border border-gray-700 bg-gray-900 p-3 text-left text-white transition-all hover:-translate-y-0.5 hover:bg-gray-800 hover:shadow-sm"
                          >
                            <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-white/10">
                              <Rocket className="h-4 w-4" />
                            </div>
                            <div className="min-w-0 flex-1">
                              <div className="flex items-center gap-2">
                                <p className="text-sm font-semibold">{child.data.title}</p>
                                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-gray-300">
                                  Now Building
                                </span>
                              </div>
                              <p className="truncate text-xs text-gray-300">{child.data.description}</p>
                            </div>
                            <ArrowUpRight className="h-4 w-4 flex-shrink-0 text-gray-400 transition-colors group-hover:text-white" />
                          </a>
                        )
                      )}
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Contact footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-12 rounded-2xl border border-gray-200 bg-white p-5 text-center shadow-sm sm:mt-16 sm:p-6"
        >
          <p className="mb-3 text-sm font-semibold text-gray-900">Let's connect</p>
          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-gray-600">
            <a href="mailto:jlurie.12@gmail.com" className="flex items-center gap-1.5 hover:text-gray-900 hover:underline">
              <Mail className="h-3.5 w-3.5 text-gray-400" />
              jlurie.12@gmail.com
            </a>
            <a
              href="https://linkedin.com/in/jlurie"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 hover:text-gray-900 hover:underline"
            >
              <Linkedin className="h-3.5 w-3.5 text-gray-400" />
              linkedin.com/in/jlurie
            </a>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5 text-gray-400" />
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
