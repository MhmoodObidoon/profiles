import {
  GraduationCap,
  Briefcase,
  Terminal,
  Container,
  GitBranch,
  Server,
  Activity,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  FolderGit2,
  BadgeCheck,
  ShieldCheck,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";

const About = () => {
  const { t, lang } = useLang();

  const badgeIcons = [GraduationCap, Terminal, Briefcase];
  const highlightIcons = [Container, GitBranch, Server, Activity];

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="about" className="py-24 bg-card/40 relative">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} eyebrowTone="indigo" />

          {/* Main Story Card */}
          <Reveal>
            <div
              className="p-6 md:p-10 rounded-2xl border border-border shadow-md space-y-8 bg-card/80 backdrop-blur-md relative overflow-hidden"
            >
              {/* Top Accent Badges */}
              <div className="flex flex-wrap items-center gap-2.5">
                {t.about.badges.map((b, idx) => {
                  const Icon = badgeIcons[idx] || CheckCircle2;
                  return (
                    <div
                      key={b.label}
                      className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-primary/10 border border-primary/25 text-primary"
                    >
                      <Icon className="w-3.5 h-3.5" />
                      <span>{b.label}</span>
                    </div>
                  );
                })}
              </div>

              {/* The 3 Core Story Paragraphs */}
              <div className="space-y-6 text-foreground/90 text-base md:text-lg leading-relaxed">
                {/* Paragraph 1: Identity & Education */}
                <div className="p-4 md:p-5 rounded-xl bg-background/70 border-s-4 border-primary border-y border-e border-border/80 shadow-xs">
                  <p className="font-medium text-foreground leading-relaxed">
                    {t.about.paragraphs[0]}
                  </p>
                </div>

                {/* Paragraph 2: Practical Skills & Implementation */}
                <div className="p-4 md:p-5 rounded-xl bg-background/50 border border-border/70 space-y-3">
                  <p className="leading-relaxed">
                    {t.about.paragraphs[1]}
                  </p>
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    {[
                      "Docker",
                      "Docker Compose",
                      "Nginx",
                      "PostgreSQL",
                      "GitHub Actions (CI/CD)",
                      "Terraform",
                      "Ansible",
                      "AWS",
                      "Linux",
                    ].map((tool) => (
                      <span
                        key={tool}
                        className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-secondary text-secondary-foreground border border-border/60"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Paragraph 3: Real Projects & Observability */}
                <div className="p-4 md:p-5 rounded-xl bg-background/50 border border-border/70 space-y-3">
                  <p className="leading-relaxed">
                    {t.about.paragraphs[2]}
                  </p>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Human Resources (Real Client)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-1 rounded-lg">
                      <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>Hadramout Portal (Real Client)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2.5 py-1 rounded-lg">
                      <ShieldCheck className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>Realworld (DevOps & Security)</span>
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2.5 py-1 rounded-lg">
                      <Activity className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>Prometheus & Grafana (Monitoring)</span>
                    </span>
                  </div>
                </div>
              </div>

              {/* The 4 Core Engineering Pillars */}
              <div className="pt-4 border-t border-border/70">
                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-wider mb-4">
                  {lang === "ar" ? "الركائز التقنية والتطبيقية:" : "Core Technical Pillars:"}
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {t.about.highlights.map((item, idx) => {
                    const Icon = highlightIcons[idx] || Container;
                    return (
                      <div
                        key={item.term}
                        className="flex items-start gap-3.5 p-4 rounded-xl bg-background/80 border border-border hover:border-primary/50 transition-all shadow-xs group"
                      >
                        <div className="shrink-0 p-2.5 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-bold text-card-foreground text-sm">
                              {item.title}
                            </h4>
                            <span dir="ltr" className="text-primary font-semibold text-xs">
                              {item.term}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Guiding Principles Strip */}
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2">
                <p className="text-xs font-bold text-primary">
                  {t.about.philosophyLead}
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  {t.about.principles.map((principle) => (
                    <div
                      key={principle}
                      className="inline-flex items-center gap-1.5 text-xs text-foreground/90 font-medium"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{principle}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA to Projects */}
              <div className="pt-2 flex justify-center">
                <Button
                  onClick={scrollToProjects}
                  variant="outline"
                  className="font-bold text-primary border-primary/60 bg-primary/5 hover:bg-primary hover:text-primary-foreground gap-2 transition-all px-6 py-5 text-sm"
                >
                  <FolderGit2 className="w-4 h-4" />
                  <span>{t.about.projectsCta}</span>
                  {lang === "ar" ? <ArrowLeft className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
