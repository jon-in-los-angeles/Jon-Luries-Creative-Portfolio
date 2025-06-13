import { useState, useEffect } from "react";
import { Mail, Linkedin, Play, Menu, X } from "lucide-react";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav className={`bg-primary text-white fixed w-full top-0 z-50 transition-all duration-300 ${isScrolled ? 'shadow-lg' : ''}`}>
      <div className="max-w-6xl mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
              <span className="text-white font-bold font-mono">JL</span>
            </div>
            <span className="font-semibold">Jonathan Lurie</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8">
            <button onClick={() => scrollToSection('about')} className="hover:text-accent transition-colors duration-300">
              About
            </button>
            <button onClick={() => scrollToSection('work')} className="hover:text-accent transition-colors duration-300">
              Work
            </button>
            <button onClick={() => scrollToSection('watch')} className="hover:text-accent transition-colors duration-300">
              Watch
            </button>
            <button onClick={() => scrollToSection('experience')} className="hover:text-accent transition-colors duration-300">
              Experience
            </button>
            <button onClick={() => scrollToSection('contact')} className="hover:text-accent transition-colors duration-300">
              Contact
            </button>
          </div>

          {/* Social Links */}
          <div className="hidden md:flex space-x-4">
            <a href="mailto:jon_lurie@outlook.com" className="hover:text-accent transition-colors duration-300">
              <Mail size={20} />
            </a>
            <a href="https://linkedin.com/in/jonlurie" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
              <Linkedin size={20} />
            </a>
            <button onClick={() => scrollToSection('audio-showcase')} className="hover:text-accent transition-colors duration-300">
              <Play size={20} />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white border-opacity-20">
            <div className="flex flex-col space-y-4 mt-4">
              <button onClick={() => scrollToSection('about')} className="text-left hover:text-accent transition-colors duration-300">
                About
              </button>
              <button onClick={() => scrollToSection('work')} className="text-left hover:text-accent transition-colors duration-300">
                Work
              </button>
              <button onClick={() => scrollToSection('watch')} className="text-left hover:text-accent transition-colors duration-300">
                Watch
              </button>
              <button onClick={() => scrollToSection('experience')} className="text-left hover:text-accent transition-colors duration-300">
                Experience
              </button>
              <button onClick={() => scrollToSection('contact')} className="text-left hover:text-accent transition-colors duration-300">
                Contact
              </button>
              <div className="flex space-x-4 pt-2">
                <a href="mailto:jon_lurie@outlook.com" className="hover:text-accent transition-colors duration-300">
                  <Mail size={20} />
                </a>
                <a href="https://linkedin.com/in/jonlurie" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors duration-300">
                  <Linkedin size={20} />
                </a>
                <button onClick={() => scrollToSection('audio-showcase')} className="hover:text-accent transition-colors duration-300">
                  <Play size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
