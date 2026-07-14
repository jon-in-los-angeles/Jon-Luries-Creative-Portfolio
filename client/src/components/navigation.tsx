import { Mail, Linkedin } from "lucide-react";

export default function Navigation() {
  return (
    <nav className="bg-primary text-white w-full z-50 flex-shrink-0">
      <div className="max-w-[1500px] mx-auto px-6 py-3">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold font-mono">JL</span>
            </div>
            <span className="font-semibold">Jonathan Lurie</span>
          </div>

          {/* Social Links + copyright */}
          <div className="flex items-center space-x-4">
            <span className="hidden sm:inline text-xs text-gray-400">&copy; 2026 Jonathan Lurie</span>
            <a href="mailto:jlurie.12@gmail.com" className="hover:text-accent transition-colors duration-300" aria-label="Email">
              <Mail size={20} />
            </a>
            <a href="http://linkedin.com/in/jlurie" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300" aria-label="LinkedIn">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
      </div>
    </nav>
  );
}
