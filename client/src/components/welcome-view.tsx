import { motion } from "framer-motion";
import { LayoutGrid, GitCommitVertical, Clapperboard, Mail, Linkedin, ArrowRight } from "lucide-react";
import type { ViewMode } from "@/components/navigation";

const paths: {
  id: Exclude<ViewMode, "welcome">;
  title: string;
  description: string;
  icon: typeof LayoutGrid;
  accent: string;
}[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    description: "The full picture at a glance — impact metrics, content mix, career and contact info in one bento grid.",
    icon: LayoutGrid,
    accent: "bg-accent",
  },
  {
    id: "timeline",
    title: "Timeline",
    description: "A chronological career story — each role alongside the work produced during it, most recent first.",
    icon: GitCommitVertical,
    accent: "bg-yellow",
  },
  {
    id: "theatre",
    title: "Theatre",
    description: "Video-first and cinematic — a featured presentation, poster grids by category, on the big screen.",
    icon: Clapperboard,
    accent: "bg-teal",
  },
];

export default function WelcomeView({ onSelect }: { onSelect: (view: ViewMode) => void }) {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-gradient-to-b from-white via-gray-50 to-white px-4 py-12 sm:px-6">
      <div className="pointer-events-none absolute -top-32 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-accent/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-0 right-0 h-80 w-80 rounded-full bg-teal/10 blur-3xl" />

      <div className="relative flex items-center gap-2">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
          <span className="font-mono text-sm font-bold text-white">JL</span>
        </div>
        <span className="text-base font-semibold text-gray-900">Jonathan Lurie</span>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="relative mt-8 max-w-xl text-center sm:mt-10"
      >
        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.24em] text-gray-600">
          <span className="h-2 w-2 rounded-full bg-accent" />
          Strategy • Production • Partnerships
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Same portfolio, three ways to explore it.
        </h1>
        <p className="mt-3 text-sm text-gray-600 sm:text-base">
          Pick whichever way you'd like to browse the work — you can switch anytime from the nav.
        </p>
      </motion.div>

      <div className="relative mt-10 grid w-full max-w-4xl grid-cols-1 gap-4 sm:mt-12 sm:grid-cols-3 sm:gap-5">
        {paths.map((path, index) => (
          <motion.button
            key={path.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 + index * 0.08 }}
            onClick={() => onSelect(path.id)}
            className="group relative flex flex-col items-start overflow-hidden rounded-[22px] border border-gray-200 bg-white p-5 text-left shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-gray-400 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 sm:p-6"
          >
            <div className={`absolute inset-x-0 top-0 h-1.5 ${path.accent}`} />
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-full bg-gray-100 text-gray-700">
              <path.icon className="h-5 w-5" />
            </div>
            <h2 className="mb-1.5 text-lg font-bold tracking-tight text-gray-900">{path.title}</h2>
            <p className="text-sm leading-relaxed text-gray-600">{path.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors group-hover:text-gray-900">
              Enter
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </motion.button>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="relative mt-10 flex items-center gap-5 text-sm text-gray-500 sm:mt-12"
      >
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
      </motion.div>
    </div>
  );
}
