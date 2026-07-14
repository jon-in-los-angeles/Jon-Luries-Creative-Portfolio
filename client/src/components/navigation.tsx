import { Mail, Linkedin } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-primary text-white w-full z-50 flex-shrink-0">
      <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex items-center gap-2 min-w-0">
          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-accent">
            <span className="font-mono text-sm font-bold text-white">JL</span>
          </div>
          <span className="truncate text-sm font-semibold sm:text-base">Jonathan Lurie</span>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-3 sm:gap-4">
          <span className="hidden text-xs text-gray-400 sm:inline">&copy; 2026 Jonathan Lurie</span>
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
