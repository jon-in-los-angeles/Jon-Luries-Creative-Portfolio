import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Award, Rocket, Play, Briefcase, Mail, Linkedin, ArrowUpRight, MapPin } from "lucide-react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import WatchSection, { categoryGroups } from "@/components/watch-section";
import ExperienceTimeline from "@/components/experience-timeline";
import ContactSection from "@/components/contact-section";
import type { Video, Experience } from "@shared/schema";

const certifications = [
  "Microsoft 365 Project Management",
  "Agile",
  "Anthropic AI Fluency",
];

type Panel = "twelve-grand" | "watch" | "experience" | "contact" | null;

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
      <div className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-6 gap-4 lg:h-full max-w-[1500px] mx-auto">
        {/* Hero / About tile */}
        <motion.div
          {...tileMotion(0)}
          className="lg:col-span-2 lg:row-span-4 bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 flex flex-col justify-center min-h-[420px] lg:min-h-0 lg:overflow-hidden"
        >
          <h1 className="text-2xl md:text-3xl 2xl:text-4xl font-bold text-gray-900 leading-tight mb-4">
            Bridging the gap between creative vision and technical execution.
          </h1>
          <h2 className="text-sm md:text-base text-gray-500 leading-relaxed mb-5">
            I help organizations build better content workflows, launch strategic brand partnerships, and solve complex operational bottlenecks.
          </h2>
          <div className="flex flex-wrap items-center gap-2 mb-6">
            {certifications.map((cert) => (
              <span
                key={cert}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gray-100 text-gray-700 text-xs md:text-sm font-medium"
              >
                <Award className="w-3.5 h-3.5 text-gray-500" />
                {cert}
              </span>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
            <button
              onClick={() => setOpenPanel("watch")}
              className="px-7 py-2.5 rounded-full bg-gray-900 text-white font-medium text-sm md:text-base hover:bg-gray-700 transition-colors duration-200 min-w-[150px]"
            >
              View Projects
            </button>
            <button
              onClick={() => setOpenPanel("contact")}
              className="px-7 py-2.5 rounded-full border border-gray-900 text-gray-900 font-medium text-sm md:text-base hover:bg-gray-50 transition-colors duration-200 min-w-[150px]"
            >
              Get in Touch
            </button>
          </div>
        </motion.div>

        {/* 12 Grand tile */}
        <motion.button
          {...tileMotion(0.1)}
          onClick={() => setOpenPanel("twelve-grand")}
          className="lg:col-span-2 lg:row-span-2 group bg-gray-900 text-white rounded-2xl shadow-sm p-6 lg:p-8 flex flex-col justify-between gap-3 text-left min-h-[200px] lg:min-h-0 lg:overflow-hidden hover:bg-gray-800 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="flex items-start justify-between w-full">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 text-gray-200 text-xs font-medium">
              <Rocket className="w-3.5 h-3.5" />
              Now Building
            </span>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-white group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>
          <div>
            <h3 className="text-xl md:text-2xl font-bold mb-1.5 tracking-tight">12 Grand LLC</h3>
            <p className="text-sm md:text-base text-gray-300 leading-snug">
              Founder &amp; Strategic Lead — developing <span className="font-semibold text-white">Connect for Success (C4S)</span>, a behavioral intelligence platform.
            </p>
          </div>
        </motion.button>

        {/* Watch tile */}
        <motion.button
          {...tileMotion(0.2)}
          onClick={() => setOpenPanel("watch")}
          className="lg:col-span-2 lg:row-span-4 group bg-white rounded-2xl border border-gray-200 shadow-sm p-6 lg:p-8 flex flex-col text-left min-h-[320px] lg:min-h-0 lg:overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="flex items-start justify-between w-full mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center">
                <Play className="w-4 h-4 text-white ml-0.5" fill="currentColor" />
              </div>
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 tracking-tight">Watch</h3>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>
          <div className="flex-1 min-h-0 flex flex-col gap-3 overflow-hidden">
            {categoryGroups.map((group) => {
              const groupVideos = videos.filter((v) => v.category === group.name);
              const preview = groupVideos[0];
              return (
                <div key={group.name} className="flex items-center gap-4 rounded-xl bg-gray-50 p-3 flex-1 min-h-0 overflow-hidden">
                  {preview && (
                    <img
                      src={preview.thumbnailUrl}
                      alt={group.name}
                      className="w-20 h-14 md:w-24 md:h-16 object-cover rounded-lg flex-shrink-0"
                    />
                  )}
                  <div className="min-w-0">
                    <p className="font-semibold text-gray-900 text-sm md:text-base leading-snug truncate">{group.name}</p>
                    <p className="text-xs md:text-sm text-gray-500">
                      {groupVideos.length} {groupVideos.length === 1 ? "video" : "videos"}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.button>

        {/* Experience tile */}
        <motion.button
          {...tileMotion(0.3)}
          onClick={() => setOpenPanel("experience")}
          className="lg:col-span-1 lg:row-span-2 group bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col text-left min-h-[200px] lg:min-h-0 lg:overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
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
        <motion.button
          {...tileMotion(0.4)}
          onClick={() => setOpenPanel("contact")}
          className="lg:col-span-1 lg:row-span-2 group bg-white rounded-2xl border border-gray-200 shadow-sm p-6 flex flex-col text-left min-h-[200px] lg:min-h-0 lg:overflow-hidden hover:border-gray-300 hover:shadow-md transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        >
          <div className="flex items-start justify-between w-full mb-3">
            <div className="flex items-center gap-2.5">
              <Mail className="w-5 h-5 text-gray-700" />
              <h3 className="text-lg font-bold text-gray-900 tracking-tight">Contact</h3>
            </div>
            <ArrowUpRight className="w-5 h-5 text-gray-400 group-hover:text-gray-900 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-200" />
          </div>
          <div className="flex-1 min-h-0 space-y-2 overflow-hidden">
            <p className="text-sm text-gray-600 flex items-center gap-2 min-w-0">
              <Mail className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">jlurie.12@gmail.com</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2 min-w-0">
              <Linkedin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">linkedin.com/in/jlurie</span>
            </p>
            <p className="text-sm text-gray-600 flex items-center gap-2 min-w-0">
              <MapPin className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
              <span className="truncate">Los Angeles, CA</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-2">Send a message →</p>
        </motion.button>
      </div>

      {/* 12 Grand expanded */}
      <Dialog open={openPanel === "twelve-grand"} onOpenChange={(open) => setOpenPanel(open ? "twelve-grand" : null)}>
        <DialogContent className="max-w-2xl w-[95vw] max-h-[88vh] overflow-y-auto">
          <DialogTitle className="sr-only">12 Grand LLC</DialogTitle>
          <DialogDescription className="sr-only">About 12 Grand LLC and Connect for Success</DialogDescription>
          <div className="text-center py-6 px-2">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-100 text-gray-700 text-sm font-medium mb-6">
              <Rocket className="w-4 h-4 text-gray-500" />
              Now Building
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-5 tracking-tight">
              Founder &amp; Strategic Lead, 12 Grand LLC
            </h2>
            <p className="text-base md:text-lg text-gray-600 leading-relaxed">
              12 Grand LLC is a hybrid creative agency and consultancy. Currently, we are spearheading the development of{" "}
              <span className="font-semibold text-gray-900">Connect for Success (C4S)</span>, a behavioral intelligence platform that helps managers and teams communicate better, reducing workplace friction and saving companies time and money.
            </p>
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

      {/* Contact expanded */}
      <Dialog open={openPanel === "contact"} onOpenChange={(open) => setOpenPanel(open ? "contact" : null)}>
        <DialogContent className="max-w-5xl w-[95vw] max-h-[88vh] overflow-y-auto p-0 border-0">
          <DialogTitle className="sr-only">Contact</DialogTitle>
          <DialogDescription className="sr-only">Get in touch via the contact form</DialogDescription>
          <ContactSection embedded />
        </DialogContent>
      </Dialog>
    </>
  );
}
