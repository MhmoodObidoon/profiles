import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail, Instagram, FolderGit2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import DevOpsTerminal from "@/components/DevOpsTerminal";
import CloudNetworkBg from "@/components/CloudNetworkBg";



const techStack = [
  { name: "Docker",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" },
  { name: "Kubernetes",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "AWS",            icon: "https://cdn.simpleicons.org/amazonaws/FF9900" },
  { name: "Linux",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
  { name: "Nginx",          icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg" },
  { name: "GitHub Actions", icon: "https://cdn.simpleicons.org/githubactions/2088FF" },
  { name: "Jenkins",        icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg" },
  { name: "Terraform",      icon: "https://cdn.simpleicons.org/terraform/7B42BC" },
  { name: "Prometheus",     icon: "https://cdn.simpleicons.org/prometheus/E6522C" },
  { name: "Grafana",        icon: "https://cdn.simpleicons.org/grafana/F46800" },
  { name: "PostgreSQL",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
  { name: "Python",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
  { name: "Bash",           icon: "https://cdn.simpleicons.org/gnubash/4EAA25" },
  { name: "Git",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
  { name: "Ubuntu",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ubuntu/ubuntu-plain.svg" },
];

const socials = [
  { icon: Github, href: "https://github.com/Eng-m-devops", key: "github" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mahmoodobidoon", key: "linkedin" },
  { icon: Instagram, href: "https://www.instagram.com/mahmoud.it.dev/", key: "instagram" },
  { icon: Mail, href: "mailto:mhmoodobidoon@gmail.com", key: "email" },
];

const Hero = () => {
  const { t } = useLang();

  const baseUrl = import.meta.env.BASE_URL.endsWith("/")
    ? import.meta.env.BASE_URL
    : `${import.meta.env.BASE_URL}/`;
  const cvUrl = `${baseUrl}cv.pdf`;

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative overflow-hidden pt-28 pb-16">
      {/* Background layers */}
      <CloudNetworkBg />
      <div className="absolute inset-0 bg-grid opacity-60" aria-hidden />
      <div
        className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-primary/15 blur-[140px]"
        aria-hidden
      />
      <div
        className="absolute bottom-24 left-1/5 w-80 h-80 rounded-full bg-accent/15 blur-[130px]"
        aria-hidden
      />
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} aria-hidden />

      <div className="container px-4 relative z-10 my-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (RTL: Right side / Information & CTAs) */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-start animate-fade-in">

              {/* Hiring / Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400 text-xs sm:text-sm font-medium shadow-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shrink-0" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Main Title & Role */}
              <div className="space-y-3">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-tight">
                  <span className="bg-gradient-to-r from-foreground via-foreground to-primary bg-clip-text text-transparent">
                    {t.hero.name}
                  </span>
                </h1>
                <div className="space-y-1.5">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-primary font-extrabold tracking-wide">
                    {t.hero.role}
                  </p>
                  <p className="text-xs sm:text-sm font-mono font-medium text-amber-400/90 tracking-wide">
                    {t.hero.subtitle}
                  </p>
                </div>
              </div>

              {/* Tagline focused on concrete deployment capabilities */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.hero.tagline}
              </p>

              {/* Two Prominent CTA Buttons + Socials */}
              <div className="flex flex-wrap gap-3.5 justify-center lg:justify-start items-center pt-1">
                {/* Button 1: View Hands-on Projects */}
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 py-6 text-base shadow-xl shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5 transition-all gap-2"
                >
                  <FolderGit2 className="w-5 h-5 shrink-0" />
                  <span>{t.hero.projectsBtn}</span>
                </Button>
                
                {/* Button 2: Download CV */}
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-2 border-primary/70 bg-primary/5 hover:bg-primary/15 hover:border-primary font-bold text-primary px-6 py-6 text-base transition-all gap-2"
                >
                  <a href={cvUrl} download="Mahmoud_Obaidon_DevOps_CV.pdf">
                    <Download className="w-5 h-5 shrink-0" />
                    <span>{t.hero.cvBtn}</span>
                  </a>
                </Button>

                {/* Social Channels */}
                <div className="flex items-center gap-2 ms-0 sm:ms-1">
                  {socials.map((social) => (
                    <a
                      key={social.key}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={t.hero.socials[social.key as keyof typeof t.hero.socials]}
                      className="p-3 rounded-xl border border-border/80 bg-card/80 text-muted-foreground hover:text-primary hover:border-primary/60 hover:-translate-y-1 shadow-xs transition-all"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>


            </div>

            {/* Right Column (RTL: Left side / Interactive Terminal Simulator) */}
            <div className="lg:col-span-6 animate-fade-in">
              <div className="relative">
                {/* Glow effect under terminal */}
                <div className="absolute inset-0 bg-primary/10 blur-2xl rounded-3xl -z-10" aria-hidden />
                <DevOpsTerminal />
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Marquee tech icons ticker */}
      <div
        className="mt-16 border-t border-border/60 bg-background/70 backdrop-blur-md py-4 overflow-hidden"
        dir="ltr"
      >
        <div className="flex w-max animate-marquee gap-6 hover:[animation-play-state:paused]">
          {[...techStack, ...techStack].map((tech, i) => (
            <div
              key={`${tech.name}-${i}`}
              className="flex flex-col items-center gap-1.5 px-3 group cursor-default"
              title={tech.name}
            >
              <img
                src={tech.icon}
                alt={tech.name}
                className="w-8 h-8 object-contain opacity-60 group-hover:opacity-100 group-hover:scale-110 transition-all duration-200"
                loading="lazy"
              />
              <span className="text-[10px] text-muted-foreground/60 group-hover:text-muted-foreground font-mono whitespace-nowrap transition-colors">
                {tech.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
