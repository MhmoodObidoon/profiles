import { useState } from "react";
import {
  Server,
  Cpu,
  Activity,
  Shield,
  ArrowRight,
  Network,
  Layers,
  Github,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Briefcase,
  Terminal,
  Copy,
  Check,
  UserCheck,
  FlaskConical,
  ShieldCheck,
  Lock,
  type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

interface ProjectItem {
  id: string;
  isFeatured?: boolean;
  status: "completed" | "lab" | "inProgress";
  statusText: string;
  typeBadge?: string;
  repoUrl?: string;
  isPrivate?: boolean;
  title: string;
  category: string;
  description: string;
  problem?: string;
  myRole?: string;
  architecture: string;
  evidence: string;
  deploymentTarget: string;
  implementation?: string;
  verification?: string;
  runCommand?: string;
  tags: string[];
  metrics?: Record<string, string>;
}

const categoryIcons: Record<string, LucideIcon> = {
  Containers: Layers,
  "CI/CD": Cpu,
  Client: Briefcase,
  Kubernetes: Network,
  Monitoring: Activity,
  Cloud: Server,
  Security: Shield,
};

const statusConfig: Record<string, { bg: string; text: string; border: string; dot: string; icon: typeof CheckCircle2 }> = {
  completed: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-400",
    icon: CheckCircle2,
  },
  lab: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-400",
    border: "border-cyan-500/30",
    dot: "bg-cyan-400",
    icon: FlaskConical,
  },
  inProgress: {
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-400",
    icon: AlertCircle,
  },
};

const Projects = () => {
  const { t, lang } = useLang();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedBlueprint, setSelectedBlueprint] = useState<string | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = [
    { id: "All", labelAr: "الكل", labelEn: "All" },
    { id: "Containers", labelAr: "الحاويات و Docker", labelEn: "Containers & Docker" },
    { id: "CI/CD", labelAr: "أتمتة النشر CI/CD", labelEn: "CI/CD & IaC" },
    { id: "Client", labelAr: "مشاريع عملاء حقيقية", labelEn: "Client Projects" },
    { id: "Kubernetes", labelAr: "Kubernetes", labelEn: "Kubernetes" },
    { id: "Monitoring", labelAr: "المراقبة والأنظمة", labelEn: "Monitoring" },
  ];

  const filteredProjects = activeCategory === "All"
    ? t.projects.items
    : t.projects.items.filter((p) => p.category === activeCategory);

  const handleCopyCmd = (id: string, cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  return (
    <section id="projects" className="py-24 bg-card/60 relative overflow-hidden">
      {/* Glow ambient background */}
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
              const label = lang === "ar" ? cat.labelAr : cat.labelEn;
              const isSelected = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 ${
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
            {filteredProjects.map((rawProject, idx) => {
              const project = rawProject as unknown as ProjectItem;
              const CategoryIcon = categoryIcons[project.category] || Server;
              const isExpanded = selectedBlueprint === project.id;
              
              const statusKey = project.status || "completed";
              const currentStatusCfg = statusConfig[statusKey] || statusConfig.completed;
              const StatusIcon = currentStatusCfg.icon;

              const typeBadge = project.typeBadge;
              const myRole = project.myRole;
              const runCommand = project.runCommand;

              return (
                <Reveal key={project.id} delay={idx * 100}>
                  <article
                    className="group relative h-full rounded-2xl bg-card border border-border/80 hover:border-primary/60 transition-all duration-300 p-6 md:p-8 flex flex-col justify-between"
                    style={{ boxShadow: "var(--shadow-elegant)" }}
                  >
                    <div>
                      {/* Top bar: Category, Status Pill, and Type Badge */}
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-4 pb-4 border-b border-border/60">
                        <div className="flex items-center gap-2.5">
                          <div className="p-2.5 rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            <CategoryIcon className="w-5 h-5" />
                          </div>
                          <span className="text-xs font-bold uppercase tracking-wider text-primary">
                            {project.category}
                          </span>
                        </div>

                        {/* Explicit Status Badge */}
                        <div className="flex items-center gap-2">
                          <span
                            className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1 rounded-full border ${currentStatusCfg.border} ${currentStatusCfg.bg} ${currentStatusCfg.text}`}
                          >
                            <StatusIcon className="w-3.5 h-3.5" />
                            <span>{project.statusText}</span>
                          </span>

                          {typeBadge && (
                            <span className="hidden sm:inline-flex text-[11px] font-medium text-muted-foreground bg-muted/50 px-2.5 py-0.5 rounded-md border border-border/50">
                              {typeBadge}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Title & Description */}
                      <h3 className="text-xl font-bold text-foreground mb-3 leading-snug group-hover:text-primary transition-colors text-start">
                        {project.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-5 text-start">
                        {project.description}
                      </p>

                      {/* Verified Evidence Box */}
                      {project.evidence && (
                        <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-primary/5 border border-primary/20 text-xs mb-5 text-start">
                          <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                          <div className="space-y-0.5">
                            <span className="font-bold text-foreground">
                              {t.projects.evidenceHeading}{" "}
                            </span>
                            <span className="text-muted-foreground leading-relaxed">{project.evidence}</span>
                          </div>
                        </div>
                      )}

                      {/* Deployment Target & Environment Info Bar */}
                      <div className="grid grid-cols-2 gap-2 bg-background/70 border border-border/60 rounded-xl p-3 mb-6 text-xs text-start">
                        <div className="ps-1">
                          <p className="text-muted-foreground text-[11px] mb-0.5">{t.projects.statusHeading}</p>
                          <p className="font-bold text-foreground text-xs flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${currentStatusCfg.dot}`} />
                            {project.statusText}
                          </p>
                        </div>
                        <div className="ps-2 border-s border-border/60">
                          <p className="text-muted-foreground text-[11px] mb-0.5">{t.projects.targetHeading}</p>
                          <p className="font-semibold text-primary text-xs truncate" dir="ltr">
                            {project.deploymentTarget}
                          </p>
                        </div>
                      </div>

                      {/* Architecture Blueprint & Verification Details Accordion */}
                      {isExpanded && (
                        <div className="mb-6 p-4 md:p-5 rounded-xl bg-slate-950 text-cyan-300 font-mono text-xs border border-primary/40 space-y-4 animate-fade-in text-start">
                          
                          {/* 1. Problem statement */}
                          {project.problem && (
                            <div>
                              <div className="flex items-center gap-1.5 text-amber-400 font-bold mb-1">
                                <AlertCircle className="w-3.5 h-3.5" />
                                <span>{t.projects.problemLabel}</span>
                              </div>
                              <p className="text-slate-300 font-sans text-xs leading-relaxed">{project.problem}</p>
                            </div>
                          )}

                          {/* 2. Direct Role & Achievements */}
                          {myRole && (
                            <div>
                              <div className="flex items-center gap-1.5 text-blue-400 font-bold mb-1">
                                <UserCheck className="w-3.5 h-3.5" />
                                <span>{t.projects.myRoleLabel}</span>
                              </div>
                              <p className="text-slate-300 font-sans text-xs leading-relaxed">{myRole}</p>
                            </div>
                          )}

                          {/* 3. Dataflow & Architecture */}
                          <div>
                            <div className="flex items-center gap-1.5 text-cyan-400 font-bold mb-1">
                              <Network className="w-3.5 h-3.5" />
                              <span>{t.projects.architectureLabel}</span>
                            </div>
                            <p className="text-slate-200 dir-ltr text-xs leading-relaxed bg-slate-900/90 p-3 rounded-lg border border-slate-800">
                              {project.architecture}
                            </p>
                          </div>

                          {/* 4. Terminal Logs / Verification Proof */}
                          {project.verification && (
                            <div>
                              <div className="flex items-center gap-1.5 text-emerald-400 font-bold mb-1">
                                <Terminal className="w-3.5 h-3.5" />
                                <span>{t.projects.verificationLabel}</span>
                              </div>
                              <pre className="text-emerald-300 dir-ltr text-[11px] leading-relaxed bg-slate-900 p-3 rounded-lg border border-emerald-950/80 overflow-x-auto whitespace-pre-wrap font-mono">
                                {project.verification}
                              </pre>
                            </div>
                          )}

                          {/* 5. Quick Run Command */}
                          {runCommand && (
                            <div>
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center gap-1.5 text-purple-400 font-bold">
                                  <Terminal className="w-3.5 h-3.5" />
                                  <span>{t.projects.runInstructionsLabel}</span>
                                </div>
                                <button
                                  onClick={() => handleCopyCmd(project.id, runCommand)}
                                  className="inline-flex items-center gap-1 text-[11px] font-bold text-muted-foreground hover:text-primary transition-colors"
                                >
                                  {copiedId === project.id ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-400" />
                                      <span className="text-emerald-400">{lang === "ar" ? "تم النسخ" : "Copied"}</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3" />
                                      <span>{lang === "ar" ? "نسخ الأمر" : "Copy"}</span>
                                    </>
                                  )}
                                </button>
                              </div>
                              <pre className="text-slate-200 dir-ltr text-[11px] bg-slate-900/90 p-2.5 rounded-lg border border-slate-800 overflow-x-auto font-mono">
                                {runCommand}
                              </pre>
                            </div>
                          )}

                        </div>
                      )}
                    </div>

                    <div>
                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5 mb-5 dir-ltr justify-start">
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

                        {/* GitHub Repository Link Button or Private NDA Badge */}
                        {project.isPrivate ? (
                          <div
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-amber-500/25 bg-amber-500/5 text-amber-300 text-xs font-semibold cursor-default select-none"
                            title={lang === "ar" ? "مشروع خاص بالعميل ومحمي باتفاقية سرية (NDA)" : "Proprietary client codebase protected under NDA"}
                          >
                            <Lock className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                            <span className="truncate">{t.projects.privateRepoLabel}</span>
                          </div>
                        ) : (
                          <a
                            href={project.repoUrl || "https://github.com/Eng-m-devops"}
                            target="_blank"
                            rel="noreferrer"
                            className="flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border border-border bg-card hover:bg-background text-foreground hover:text-primary text-xs font-bold transition-all"
                          >
                            <Github className="w-3.5 h-3.5 text-primary shrink-0" />
                            <span className="truncate">{t.projects.viewRepoBtn}</span>
                            <ExternalLink className="w-3 h-3 text-muted-foreground shrink-0" />
                          </a>
                        )}
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
