import { Button } from "@/components/ui/button";
import { Download, Github, Linkedin, Mail, Instagram, FolderGit2 } from "lucide-react";
import { useLang } from "@/i18n/LangContext";
import DevOpsTerminal from "@/components/DevOpsTerminal";



const techStack = [
  { name: "Docker",         icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-plain.svg" },
  { name: "Kubernetes",     icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg" },
  { name: "AWS",            icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/amazonwebservices/amazonwebservices-plain-wordmark.svg" },
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
      <div className="container px-4 relative z-10 my-auto">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            
            {/* Left Column (RTL: Right side / Information & CTAs) */}
            <div className="lg:col-span-6 space-y-6 text-center lg:text-start animate-fade-in">

              {/* Hiring / Availability Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 text-xs sm:text-sm font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                <span>{t.hero.badge}</span>
              </div>

              {/* Main Title & Role */}
              <div className="space-y-2.5">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-normal leading-tight text-foreground">
                  {t.hero.name}
                </h1>
                <div className="space-y-1">
                  <p className="text-xl sm:text-2xl lg:text-3xl text-primary font-bold tracking-normal">
                    {t.hero.role}
                  </p>
                  <p className="text-xs sm:text-sm font-mono text-muted-foreground tracking-normal" dir="ltr">
                    {t.hero.subtitle}
                  </p>
                </div>
              </div>

              {/* Tagline focused on concrete deployment capabilities */}
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl mx-auto lg:mx-0">
                {t.hero.tagline}
              </p>

              {/* Two Prominent CTA Buttons + Socials */}
              <div className="flex flex-wrap gap-3 justify-center lg:justify-start items-center pt-1">
                {/* Button 1: View Hands-on Projects */}
                <Button
                  size="lg"
                  onClick={() => scrollToSection("projects")}
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-5 text-sm sm:text-base rounded-xl transition-colors gap-2"
                >
                  <FolderGit2 className="w-4 h-4 shrink-0" />
                  <span>{t.hero.projectsBtn}</span>
                </Button>
                
                {/* Button 2: Download CV */}
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border border-border/80 bg-card hover:bg-muted font-semibold text-foreground hover:text-primary px-6 py-5 text-sm sm:text-base rounded-xl transition-colors gap-2"
                >
                  <a href={cvUrl} download="Mahmoud_Obaidon_DevOps_CV.pdf">
                    <Download className="w-4 h-4 shrink-0" />
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
                      className="w-11 h-11 flex items-center justify-center rounded-xl border border-border/80 bg-card text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors"
                    >
                      <social.icon className="w-4 h-4" />
                    </a>
                  ))}
                </div>
              </div>

            </div>

            {/* Right Column (RTL: Left side / Interactive Terminal Simulator) */}
            <div className="lg:col-span-6 animate-fade-in">
              <DevOpsTerminal />
            </div>

          </div>
        </div>
      </div>

      {/* Marquee tech icons ticker */}
      <div
        className="mt-16 border-t border-border/60 bg-background/70 backdrop-blur-md py-4 overflow-hidden marquee-mask"
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
                onError={(e) => {
                  if (tech.name === "AWS") {
                    e.currentTarget.src = `${baseUrl}icons/aws.svg`;
                  }
                }}
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
