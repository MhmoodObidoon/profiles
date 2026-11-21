import { useState } from "react";
import { Workflow, Cloud, Activity, ShieldCheck, CheckCircle2, FlaskConical, BookOpen, Layers } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { useLang } from "@/i18n/LangContext";

const icons = {
  workflow: Workflow,
  cloud: Cloud,
  activity: Activity,
  shield: ShieldCheck,
};

const levelBadgeConfig: Record<string, { bg: string; text: string; border: string; dot: string; icon: typeof CheckCircle2 }> = {
  production: {
    bg: "bg-emerald-500/10",
    text: "text-emerald-700 dark:text-emerald-400",
    border: "border-emerald-500/30",
    dot: "bg-emerald-600 dark:bg-emerald-400",
    icon: CheckCircle2,
  },
  lab: {
    bg: "bg-cyan-500/10",
    text: "text-cyan-700 dark:text-cyan-400",
    border: "border-cyan-500/30",
    dot: "bg-cyan-600 dark:bg-cyan-400",
    icon: FlaskConical,
  },
  foundation: {
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-400",
    border: "border-amber-500/30",
    dot: "bg-amber-600 dark:bg-amber-400",
    icon: BookOpen,
  },
};

const Skills = () => {
  const { t, lang } = useLang();
  const [selectedLevel, setSelectedLevel] = useState<string>("all");

  const filterOptions = [
    { id: "all", label: t.skills.levelFilters.all },
    { id: "production", label: t.skills.levelFilters.production },
    { id: "lab", label: t.skills.levelFilters.lab },
    { id: "foundation", label: t.skills.levelFilters.foundation },
  ];

  const getLevelCount = (levelId: string) => {
    let count = 0;
    for (const cat of t.skills.categories) {
      if (levelId === "all") {
        count += cat.items.length;
      } else {
        count += cat.items.filter((item) => item.level === levelId).length;
      }
    }
    return count;
  };

  const totalVisibleSkills = t.skills.categories.reduce((acc, cat) => {
    return acc + cat.items.filter((item) => selectedLevel === "all" || item.level === selectedLevel).length;
  }, 0);

  return (
    <section id="skills" className="py-24 bg-background relative overflow-hidden">
      <div className="container px-4">
        <div className="max-w-6xl mx-auto">
          <SectionHeader
            eyebrow={t.skills.eyebrow}
            title={t.skills.title}
            subtitle={t.skills.subtitle}
            eyebrowTone="primary"
          />

          {/* Level Legend Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mb-8">
            {t.skills.levelsLegend.map((legendItem) => {
              const cfg = levelBadgeConfig[legendItem.id] || levelBadgeConfig.production;
              const IconComp = cfg.icon;
              return (
                <div
                  key={legendItem.id}
                  className={`p-3.5 rounded-xl border ${cfg.border} ${cfg.bg} flex items-start gap-3 transition-all`}
                >
                  <IconComp className={`w-4 h-4 mt-0.5 shrink-0 ${cfg.text}`} />
                  <div className="space-y-0.5 text-start">
                    <p className={`text-xs font-bold ${cfg.text}`}>{legendItem.label}</p>
                    <p className="text-[11px] text-muted-foreground leading-normal">{legendItem.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap justify-center items-center gap-2 mb-12">
            {filterOptions.map((opt) => {
              const isSelected = selectedLevel === opt.id;
              const count = getLevelCount(opt.id);
              return (
                <button
                  key={opt.id}
                  onClick={() => setSelectedLevel(opt.id)}
                  className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                    isSelected
                      ? "bg-primary text-primary-foreground shadow-md shadow-primary/20 border border-primary"
                      : "bg-card hover:bg-card/80 border border-border text-muted-foreground hover:text-foreground"
                  }`}
                >
                  <span>{opt.label}</span>
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-mono font-bold leading-none ${
                      isSelected
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Categories Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {t.skills.categories.map((cat, idx) => {
              const Icon = icons[cat.icon as keyof typeof icons] || Workflow;
              const matchingItems = cat.items.filter(
                (item) => selectedLevel === "all" || item.level === selectedLevel
              );

              if (matchingItems.length === 0) return null;

              return (
                <Reveal key={cat.subtitle} delay={(idx % 2) * 120}>
                  <div
                    className="group h-full p-7 md:p-8 rounded-2xl bg-card border border-border/80 hover:border-primary/60 hover:-translate-y-1.5 shadow-md hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Category Header */}
                      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-border/70">
                        <div className="p-3.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-sm transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="flex-1 text-start">
                          <div className="flex items-center justify-between gap-2">
                            <h3 className="text-xl font-extrabold text-foreground tracking-tight">{cat.title}</h3>
                            <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-md bg-secondary text-secondary-foreground border border-border/60">
                              {matchingItems.length} {lang === "ar" ? "مهارات" : "skills"}
                            </span>
                          </div>
                          <p className="text-xs font-mono text-muted-foreground mt-0.5" dir="ltr">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Skills Items List */}
                      <div className="space-y-6">
                        {matchingItems.map((skill) => {
                          const levelCfg = levelBadgeConfig[skill.level] || levelBadgeConfig.production;
                          const LevelIcon = levelCfg.icon;

                          return (
                            <div key={skill.label} className="border-s-2 border-primary/50 ps-4 space-y-1.5 text-start">
                              <div className="flex flex-wrap items-center justify-between gap-2">
                                <p className="font-extrabold text-sm text-foreground">{skill.label}</p>
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${levelCfg.border} ${levelCfg.bg} ${levelCfg.text}`}
                                >
                                  <LevelIcon className="w-3 h-3" />
                                  <span>{skill.levelLabel}</span>
                                </span>
                              </div>

                              <p className="text-xs md:text-sm font-mono text-cyan-700 dark:text-cyan-400 font-semibold leading-relaxed" dir="ltr" style={{ textAlign: "start" }}>
                                {skill.tools}
                              </p>

                              {skill.desc && (
                                <p className="text-xs text-muted-foreground leading-relaxed pt-0.5">
                                  {skill.desc}
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}

            {/* Empty State if no skills match level */}
            {totalVisibleSkills === 0 && (
              <div className="col-span-full py-16 text-center space-y-4 rounded-2xl border border-dashed border-border/80 bg-card/50 p-8">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mx-auto">
                  <Layers className="w-6 h-6" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-foreground text-base">
                    {lang === "ar" ? "لا توجد مهارات في هذا المستوى حالياً" : "No skills found for this level"}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {lang === "ar" ? "يمكنك استعراض كافة المهارات بالضغط على الزر أدناه" : "Browse all skills by resetting the filter"}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setSelectedLevel("all")} className="font-bold text-primary">
                  {lang === "ar" ? "عرض جميع المهارات" : "Show All Skills"}
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
