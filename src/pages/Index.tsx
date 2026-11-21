import { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import PipelineVisualizer from "@/components/PipelineVisualizer";
import Experience from "@/components/Experience";
import Education from "@/components/Education";
import Contact from "@/components/Contact";
import WhatsAppButton from "@/components/WhatsAppButton";
import DevOpsLogo from "@/components/DevOpsLogo";
import { useLang } from "@/i18n/LangContext";

const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
};

const Index = () => {
  const { t } = useLang();
  const [showTopBtn, setShowTopBtn] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowTopBtn(window.scrollY > 400);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const links = [
    { id: "about", label: t.navbar.about },
    { id: "skills", label: t.navbar.skills },
    { id: "projects", label: t.navbar.projects },
    { id: "experience", label: t.navbar.experience },
    { id: "contact", label: t.navbar.contact },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground antialiased selection:bg-primary/20 selection:text-primary">
      <Navbar />
      <Hero />
      <About />
      <Skills />
      

      <Projects />

      {/* Interactive CI/CD Pipeline Simulator */}
      <section className="py-16 bg-card/40 border-y border-border/50">
        <div className="container px-4">
          <PipelineVisualizer />
        </div>
      </section>

      <Experience />
      <Education />
      <Contact />
      <WhatsAppButton />

      {/* Floating Back to Top Button */}
      {showTopBtn && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label={t.navbar.backToTop}
          className="fixed bottom-6 end-6 z-50 p-3 rounded-full bg-card/90 hover:bg-card border border-border/80 hover:border-primary/60 text-foreground hover:text-primary shadow-md backdrop-blur-md transition-colors group cursor-pointer"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>
      )}

      <footer className="bg-card/90 border-t border-border py-12">
        <div className="container px-4">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3 text-center md:text-start">
              <DevOpsLogo className="w-12 h-7 shrink-0" />
              <div className="space-y-0.5">
                <p className="font-bold text-lg text-foreground">{t.footer.name}</p>
                <p className="text-sm text-muted-foreground">{t.footer.role}</p>
              </div>
            </div>

            <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm font-bold" aria-label={t.footer.quickLinks}>
              {links.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToId(link.id)}
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  {link.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="border-t border-border/60 mt-8 pt-6 text-center">
            <p className="text-xs text-muted-foreground">
              © {new Date().getFullYear()} {t.footer.name}. {t.footer.rights}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

