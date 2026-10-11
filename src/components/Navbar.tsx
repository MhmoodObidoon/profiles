import { useState, useEffect } from "react";
import { Menu, X, Sun, Moon, Languages } from "lucide-react";
import { useTheme } from "next-themes";
import DevOpsLogo from "@/components/DevOpsLogo";
import { useLang } from "@/i18n/LangContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  const { lang, setLang, t } = useLang();

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const navItems = [
    { id: "about", label: t.navbar.about },
    { id: "skills", label: t.navbar.skills },
    { id: "projects", label: t.navbar.projects },
    { id: "experience", label: t.navbar.experience },
    { id: "education", label: t.navbar.education },
    { id: "contact", label: t.navbar.contact },
  ];

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
    setIsOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/85 backdrop-blur-xl shadow-lg shadow-black/5 border-b border-border/80 py-1"
          : "bg-transparent py-3 border-b border-transparent"
      }`}
    >
      <div className="container px-4">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo Button */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group flex items-center hover:scale-105 transition-transform focus:outline-none"
            aria-label={t.navbar.backToTop}
          >
            <DevOpsLogo className="w-12 h-7 md:w-14 md:h-8" />
          </button>

          {/* Nav Items (Desktop) */}
          <div className="hidden md:flex items-center gap-7 bg-card/60 backdrop-blur-md px-6 py-2 rounded-full border border-border/60 shadow-xs">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="text-foreground/90 hover:text-primary transition-colors text-sm font-bold tracking-wide"
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Action buttons (Language & Theme & Mobile menu toggle) */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setLang(lang === "ar" ? "en" : "ar")}
              aria-label={t.navbar.toggleLang}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl border border-border/80 bg-card/80 text-xs font-extrabold text-foreground hover:text-primary hover:border-primary/60 transition-all shadow-xs"
            >
              <Languages className="w-4 h-4 text-primary" />
              <span dir="ltr">{lang === "ar" ? "EN" : "عربي"}</span>
            </button>

            <button
              onClick={() => mounted && setTheme(theme === "dark" ? "light" : "dark")}
              aria-label={t.navbar.toggleTheme}
              className="p-2 py-2 rounded-xl border border-border/80 bg-card/80 text-foreground hover:text-primary hover:border-primary/60 transition-all shadow-xs"
            >
              {mounted && theme === "dark" ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>

            <button
              className="md:hidden p-2 text-foreground hover:text-primary transition-colors rounded-lg"
              onClick={() => setIsOpen(!isOpen)}
              aria-label={t.navbar.toggleMenu}
              aria-expanded={isOpen}
              aria-controls="mobile-nav"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[-1] md:hidden"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
          <div
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label={t.navbar.toggleMenu}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border shadow-xl animate-fade-in"
          >
            <div className="container px-4 py-4 space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className="block w-full text-start py-3 px-4 rounded-xl text-foreground hover:text-primary hover:bg-card/80 font-bold transition-all text-base"
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </>
      )}
    </nav>
  );
};

export default Navbar;

