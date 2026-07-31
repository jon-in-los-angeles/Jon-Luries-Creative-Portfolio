import { Mail, Linkedin, LayoutGrid, GitCommitVertical, Clapperboard, Compass } from "lucide-react";

export type ViewMode = "welcome" | "dashboard" | "timeline" | "theatre";

const views: { id: ViewMode; label: string; icon: typeof LayoutGrid }[] = [
  { id: "dashboard", label: "Dashboard", icon: LayoutGrid },
  { id: "timeline", label: "Timeline", icon: GitCommitVertical },
  { id: "theatre", label: "Theatre", icon: Clapperboard },
];

export default function Navigation({
  view,
  onViewChange,
}: {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}) {
  return (
    <nav className="bg-primary text-white w-full z-50 flex-shrink-0">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <button
          onClick={() => onViewChange("welcome")}
          className="flex items-center gap-2 min-w-0 text-left"
          aria-label="Back to path selection"
        >
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent">
            <span className="font-mono text-sm font-bold text-white">JL</span>
          </div>
          <span className="truncate text-sm font-semibold sm:text-base">Jon Lurie</span>
        </button>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
          <button
            onClick={() => onViewChange("welcome")}
            aria-label="Choose a different view"
            title="Choose a different view"
            className="flex items-center gap-1.5 rounded-full border border-white/10 px-3 py-1.5 text-xs font-medium text-gray-300 transition-colors hover:text-white"
          >
            <Compass size={14} />
            <span className="hidden md:inline">Change view</span>
          </button>
          <div className="flex items-center gap-1 rounded-full bg-white/10 p-1">
            {views.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => onViewChange(id)}
                aria-pressed={view === id}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  view === id ? "bg-accent text-white" : "text-gray-300 hover:text-white"
                }`}
              >
                <Icon size={14} />
                {label}
              </button>
            ))}
          </div>
          <span className="hidden text-xs text-gray-400 sm:inline">&copy; 2026 Jon Lurie</span>
          <a href="mailto:jlurie.12@gmail.com" className="transition-colors duration-300 hover:text-accent" aria-label="Email">
            <Mail size={18} />
          </a>
          <a href="http://linkedin.com/in/jlurie" target="_blank" rel="noopener noreferrer" className="transition-colors duration-300 hover:text-accent" aria-label="LinkedIn">
            <Linkedin size={18} />
          </a>
        </div>
      </div>
    </nav>
  );
}
