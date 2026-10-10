import { useState } from "react";
import { Server, Cpu, Activity, Shield, ArrowRight, Network, Layers, Github, ExternalLink, CheckCircle2, AlertCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

const categoryIcons = {
  Cloud: Server,
  "CI/CD": Cpu,
  Monitoring: Activity,
  Security: Shield,
};

const Projects = () => {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedBlueprint, setSelectedBlueprint] = useState<string | null>(null);

  const categories = ["All", "Cloud", "CI/CD", "Monitoring", "Security"];

  const filteredProjects = activeCategory === "All"
    ? t.projects.items
    : t.projects.items.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="py-24 bg-card/60 relative overflow-hidden">
      {/* Glow ambient circle background */}
      <div className="absolute top-1/3 -start-24 w-80 h-80 rounded-full bg-primary/10 blur-[130px] pointer-events-none" aria-hidden />
      <div className="absolute bottom-10 -end-24 w-80 h-80 rounded-full bg-accent/10 blur-[130px] pointer-events-none" aria-hidden />

      <div className="container px-4 relative z-10">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={t.projects.eyebrow}
            title={t.projects.title}
            subtitle={t.projects.subtitle}
          />

          {/* Filter Bar */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {categories.map((cat) => {
              const label = cat === "All" ? t.projects.filterAll : cat;
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25 border border-primary"
                      : "bg-background/80 hover:bg-card border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>

          {/* Grid of Projects */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredProjects.map((project, idx) => {
              const CategoryIcon = categoryIcons[project.category as keyof typeof categoryIcons] || Server;
              const isExpanded = selectedBlueprint === project.id;
              
              const metrics = project.metrics as Record<string, string> | undefined;
              const mPass = metrics?.passRate || metrics?.uptime || "Verified";
              const mSpeed = metrics?.buildTime || metrics?.deploymentTime || "Automated";
              const mEnv = metrics?.environment || metrics?.instances || "Cloud/Lab";

              return (
                <Reveal key={project.id} delay={idx * 100}>
                  <article
                    className="group relative h-full rounded-2xl bg-card border border-border/80 hover:border-primary/60 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between"
                    style={{ boxShadow: "var(--shadow-elegant)" }}
                  >
                    <div>
                      {/* Top bar: Category icon & Status badge */}
                      <div className="flex items-center justify-between mb-4 pb-4 border-b border-border/60">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">
                            {project.category}
                          </span>
                        </div>

                        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {t.projects.statusHealthy}
                        </span>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                        {project.description}
                      </p>

                      {/* Metrics bar */}
                      <div className="grid grid-cols-3 gap-2 bg-background/70 border border-border/60 rounded-xl p-3 mb-6 text-center text-xs">
                        <div>
                          <p className="text-muted-foreground text-[11px] mb-0.5">{lang === "ar" ? "الفحص والأمان" : "Verification"}</p>
                          <p className="font-extrabold text-emerald-500 dir-ltr">{mPass}</p>
                        </div>
                        <div className="border-x border-border/60">
                          <p className="text-muted-foreground text-[11px] mb-0.5">{lang === "ar" ? "زمن التنفيذ" : "Execution"}</p>
                          <p className="font-bold text-primary dir-ltr">{mSpeed}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground text-[11px] mb-0.5">{lang === "ar" ? "البيئة المستهدفة" : "Environment"}</p>
                          <p className="font-semibold text-accent dir-ltr">{mEnv}</p>
                        </div>
                      </div>

                      {/* Architecture Blueprint & Verification Details Accordion */}
                      {isExpanded && (
                        <div className="mb-6 p-4 md:p-5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs border border-primary/40 space-y-3.5 animate-fade-in text-start">
                          
                          {/* Problem statement */}
                          {project.problem && (
                            <div>
                              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{t.projects.problemLabel || "Problem & Objective:"}</span>
                              </div>
                              <p className="text-slate-300 font-sans text-xs leading-relaxed">{project.problem}</p>
                            </div>
                          )}

                          {/* Dataflow */}
                          <div>
                            <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                              <Network className="w-3.5 h-3.5" />
                              <span>{t.projects.architectureLabel || "Topology & Dataflow:"}</span>
                            </div>
                            <p className="text-slate-200 dir-ltr text-xs leading-relaxed bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                              {project.architecture}
                            </p>
                          </div>

                          {/* Implementation */}
                          {project.implementation && (
                            <div>
                              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                                <Layers className="w-3.5 h-3.5" />
                                <span>{t.projects.implementationLabel || "Implementation & Technical Decisions:"}</span>
                              </div>
                              <p className="text-slate-300 font-sans text-xs leading-relaxed">{project.implementation}</p>
                            </div>
                          )}

                          {/* Verification */}
                          {project.verification && (
                            <div>
                              <div className="flex items-center gap-1.5 text-emerald-300 font-bold mb-1">
                                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                                <span>{t.projects.verificationLabel || "Verification & Results:"}</span>
                              </div>
                              <p className="text-slate-300 font-sans text-xs leading-relaxed">{project.verification}</p>
                            </div>
                          )}
                        </div>
                      )}
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5 dir-ltr">
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-xs font-mono font-medium bg-secondary text-secondary-foreground border border-border/60"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>

                      {/* Action buttons bar */}
                      <div className="grid grid-cols-2 gap-2">
                        {/* Interactive Architecture Button */}
                        <button
                          onClick={() => setSelectedBlueprint(isExpanded ? null : project.id)}
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-primary/30 bg-primary/5 hover:bg-primary/15 text-primary text-xs font-bold transition-all"
                        >
                          <Layers className="w-3.5 h-3.5" />
                          <span className="truncate">{t.projects.architectureView}</span>
                          <ArrowRight className={`w-3 h-3 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                        </button>

                        {/* GitHub Repository Link Button */}
                        <a
                          href={project.repoUrl || "https://github.com/Eng-m-devops"}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-border bg-card hover:bg-background text-foreground hover:text-primary text-xs font-bold transition-all"
                        >
                          <Github className="w-3.5 h-3.5 text-primary" />
                          <span className="truncate">{t.projects.viewRepoBtn || "GitHub Code"}</span>
                          <ExternalLink className="w-3 h-3 text-muted-foreground" />
                        </a>
                      </div>
                    </div>
                  </article>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
