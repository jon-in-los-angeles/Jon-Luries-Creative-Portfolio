import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Award, Rocket, Play, Briefcase, Mail, Linkedin, ArrowUpRight, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import WatchSection, { categoryGroups } from "@/components/watch-section";
import ExperienceTimeline from "@/components/experience-timeline";
import type { Video, Experience } from "@shared/schema";

const certifications = [
  "Microsoft 365 Project Management",
  "Agile",
  "Anthropic AI Fluency",
];

const impactStats = [
  { value: "2.7M+", label: "Online Learners" },
  { value: "116", label: "Courses Produced" },
  { value: "29.8M+", label: "Video Views" },
  { value: "245", label: "Videos Produced" },
];

const brands = [
  "LinkedIn Learning",
  "SPIN Magazine",
  "Heineken",
  "Microsoft",
  "Universal Music Group",
  "SeatGeek",
  "Zocdoc",
];

type Panel = "twelve-grand" | "watch" | "experience" | null;

const tileMotion = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay },
});

export default function DashboardGrid() {
  const [openPanel, setOpenPanel] = useState<Panel>(null);

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

  return (
    <>
      <div className="mx-auto grid w-full max-w-[1500px] grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
        {/* Hero / About tile */}
        <motion.div
          {...tileMotion(0)}
          className="relative overflow-hidden rounded-[22px] border border-gray-200 bg-gradient-to-br from-white via-gray-50 to-white p-4 shadow-md sm:p-5 lg:p-5 short:p-4 flex flex-col justify-center min-h-[250px] sm:min-h-[270px] lg:min-h-0 lg:overflow-hidden"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-gradient-to-r from-accent via-teal to-yellow" />
          <div className="mb-2.5 inline-flex w-fit items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-600">
            <span className="h-2 w-2 rounded-full bg-accent" />
            Strategy • Production • Partnerships
          </div>
          <h1 className="text-[1.4rem] md:text-[1.7rem] 2xl:text-[2rem] short:text-[1.35rem] font-bold text-gray-900 leading-[1.08] mb-2.5 short:mb-2">
            Bridging creative vision and technical execution.
          </h1>
          <h2 className="max-w-2xl text-sm md:text-[0.92rem] short:text-sm text-gray-600 leading-relaxed mb-3 short:mb-2.5 text-pretty">
            I help teams build better content workflows, launch strategic partnerships, and solve operational bottlenecks.
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-3 short:mb-2.5">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 px-3 py-1.5 short:py-1 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm short:text-xs font-medium"
              >
                <Award className="w-3.5 h-3.5 text-gray-500" />
                {cert}
              </span>
            ))}
          </div>
          <div className="pt-3 short:pt-2.5 border-t border-gray-100 grid grid-cols-2 md:grid-cols-4 gap-x-3 gap-y-2">
            {impactStats.map((stat) => (
              <div key={stat.label}>
                <p className="text-xl md:text-2xl short:text-lg font-bold text-gray-900 tracking-tight">{stat.value}</p>
                <p className="text-[11px] md:text-xs text-gray-500 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-3 short:mt-2.5 pt-2.5 short:pt-2 border-t border-gray-100">
            <p className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-400 mb-1.5">Brands I've created for</p>
            <div className="flex flex-wrap items-center gap-2">
              {brands.map((brand) => (
                <span
                  key={brand}
                  className="inline-flex items-center px-3 py-1.5 short:py-1 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm short:text-xs font-medium"
                >
                  {brand}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Watch tile */}
        <motion.button
          {...tileMotion(0.1)}
          onClick={() => setOpenPanel("watch")}
          className="group relative overflow-hidden bg-white rounded-[22px] border border-gray-200 shadow-md p-4 sm:p-5 lg:p-5 short:p-4 flex flex-col text-left min-h-[220px] sm:min-h-[240px] lg:min-h-0 lg:overflow-hidden hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="absolute inset-x-0 top-0 h-1.5 bg-teal" />
          <div className="flex items-start justify-between w-full mb-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Watch</h3>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-2.5 overflow-hidden">
            {categoryGroups.map((group) => {
              const groupVideos = videos.filter((v) => v.category === group.name);
              const preview = groupVideos[0];
              return (
                <div key={group.name} className="flex items-center gap-3 sm:gap-4 rounded-xl bg-gray-50 p-3 flex-1 min-h-0 overflow-hidden">
                  {preview && (
                    <img
                      src={preview.thumbnailUrl}
                      alt={group.name}
                      className="h-14 w-20 object-cover rounded-lg flex-shrink-0 sm:h-16 sm:w-24"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm md:text-base leading-snug truncate">{group.name}</p>
                    <p className="text-xs md:text-sm text-gray-500 truncate">{group.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.button>

        {/* Experience + Contact row */}
        <div className="grid grid-cols-2 gap-4 md:gap-5">
          {/* Experience tile */}
          <motion.button
            {...tileMotion(0.2)}
            onClick={() => setOpenPanel("experience")}
            className="group relative overflow-hidden bg-white rounded-[22px] border border-gray-200 shadow-md p-4 sm:p-5 flex flex-col text-left min-h-[150px] lg:overflow-hidden hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-yellow" />
            <div className="flex items-start justify-between w-full mb-3">
              <div className="flex items-center gap-2.5">
                <Briefcase className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Experience</h3>
              </div>
              <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
            </div>
            <div className="flex-1 min-h-0 overflow-hidden space-y-2">
              {experiences.slice(0, 3).map((exp) => (
                <div key={exp.id} className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{exp.company}</p>
                  <p className="text-xs text-gray-500 truncate">{exp.title}</p>
                </div>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-2">Full career journey →</p>
          </motion.button>

          {/* Contact tile */}
          <motion.div
            {...tileMotion(0.3)}
            className="relative overflow-hidden bg-white rounded-[22px] border border-gray-200 shadow-md p-4 sm:p-5 flex flex-col text-left min-h-[150px] lg:overflow-hidden"
          >
            <div className="absolute inset-x-0 top-0 h-1.5 bg-accent" />
            <div className="flex items-start justify-between w-full mb-3">
              <div className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-gray-700" />
                <h3 className="text-lg font-bold text-gray-900 tracking-tight">Contact</h3>
              </div>
            </div>
            <div className="flex-1 min-h-0 space-y-2 overflow-hidden">
              <a
                href="mailto:jlurie.12@gmail.com"
                className="text-sm text-gray-600 flex items-center gap-2 min-w-0 hover:text-gray-900 hover:underline"
              >
                <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="truncate">jlurie.12@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com/in/jlurie"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-600 flex items-center gap-2 min-w-0 hover:text-gray-900 hover:underline"
              >
                <Linkedin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="truncate">linkedin.com/in/jlurie</span>
              </a>
              <p className="text-sm text-gray-600 flex items-center gap-2 min-w-0">
                <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                <span className="truncate">Los Angeles, CA</span>
              </p>
            </div>
          </motion.div>
        </div>

        {/* 12 Grand tile */}
        <motion.button
          {...tileMotion(0.4)}
          onClick={() => setOpenPanel("twelve-grand")}
          className="group relative overflow-hidden bg-gray-900 text-white rounded-[22px] border border-gray-700 shadow-md p-6 sm:p-8 flex flex-col justify-center gap-6 text-left min-h-[150px] sm:min-h-[160px] lg:overflow-hidden hover:-translate-y-1 hover:bg-gray-800 hover:shadow-lg transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-teal/20" />
          <div className="relative flex items-center justify-between w-full">
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 text-gray-200 text-sm font-medium backdrop-blur-sm">
              <Rocket className="w-4 h-4" />
              Now Building
            </span>
            <div className="grid grid-cols-2 gap-2">
              <div className="h-5 w-5 rounded-full bg-[#EF4444] shadow-lg" />
              <div className="h-5 w-5 rounded-full bg-[#3B82F6] shadow-lg" />
              <div className="h-5 w-5 rounded-full bg-[#22C55E] shadow-lg" />
              <div className="h-5 w-5 rounded-full bg-[#EAB308] shadow-lg" />
            </div>
          </div>
          <div className="relative">
            <h3 className="text-2xl md:text-3xl font-bold mb-2 tracking-tight">Connect for Success (C4S)</h3>
            <p className="text-base md:text-lg text-gray-300 leading-relaxed">
              A platform that helps managers and teams communicate better.
            </p>
          </div>
        </motion.button>
      </div>

      {/* 12 Grand expanded */}
      <Dialog open={openPanel === "twelve-grand"} onOpenChange={(open) => setOpenPanel(open ? "twelve-grand" : null)}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[88vh] overflow-y-auto">
          <DialogTitle className="sr-only">Connect for Success</DialogTitle>
          <DialogDescription className="sr-only">About Connect for Success</DialogDescription>
          <div className="text-center py-6 px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <Rocket className="w-4 h-4 text-gray-500" />
              Now Building
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 tracking-tight">
              Connect for Success (C4S)
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed mb-7">
              <span className="font-semibold text-gray-900">Connect for Success (C4S)</span> is a behavioral intelligence platform that helps managers and teams communicate better, reducing workplace friction and saving companies time and money.
            </p>
            <a
              href="https://investinconnection.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm md:text-base hover:bg-gray-700 transition-colors duration-200"
            >
              Learn more at investinconnection.com
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </DialogContent>
      </Dialog>

      {/* Watch expanded */}
      <Dialog open={openPanel === "watch"} onOpenChange={(open) => setOpenPanel(open ? "watch" : null)}>
        <DialogContent className="max-w-6xl w-[95vw] max-h-[88vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">Watch</DialogTitle>
          <DialogDescription className="sr-only">Selected work across content operations, brand storytelling, and live events</DialogDescription>
          <WatchSection embedded />
        </DialogContent>
      </Dialog>

      {/* Experience expanded */}
      <Dialog open={openPanel === "experience"} onOpenChange={(open) => setOpenPanel(open ? "experience" : null)}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[88vh] overflow-y-auto p-0">
          <DialogTitle className="sr-only">Career Journey</DialogTitle>
          <DialogDescription className="sr-only">Professional experience timeline</DialogDescription>
          <ExperienceTimeline embedded />
        </DialogContent>
      </Dialog>
    </>
  );
}
