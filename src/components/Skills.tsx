import { Workflow, Cloud, Activity, ShieldCheck, CheckCircle2 } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

const icons = {
  workflow: Workflow,
  cloud: Cloud,
  activity: Activity,
  shield: ShieldCheck,
};

const Skills = () => {
  const { t } = useLang();

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

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-7">
            {t.skills.categories.map((cat, idx) => {
              const Icon = icons[cat.icon as keyof typeof icons] || Workflow;
              return (
                <Reveal key={cat.subtitle} delay={(idx % 2) * 120}>
                  <div
                    className="group h-full p-7 md:p-8 rounded-2xl bg-card border border-border/80 hover:border-primary/60 hover:-translate-y-1.5 shadow-md hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      {/* Header */}
                      <div className="flex items-center gap-4 mb-6 pb-5 border-b border-border/70">
                        <div className="p-3.5 rounded-2xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground shadow-sm transition-all duration-300">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-xl font-extrabold text-foreground tracking-tight">{cat.title}</h3>
                          <p className="text-xs font-mono text-muted-foreground mt-0.5" dir="ltr">
                            {cat.subtitle}
                          </p>
                        </div>
                      </div>

                      {/* Items list */}
                      <div className="space-y-5">
                        {cat.items.map((skill) => (
                          <div key={skill.label} className="border-s-2 border-primary/50 ps-4 space-y-1">
                            <div className="flex items-center gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                              <p className="font-extrabold text-sm text-foreground">{skill.label}</p>
                            </div>
                            <p className="text-xs md:text-sm font-mono text-muted-foreground leading-relaxed pt-0.5" dir="ltr" style={{ textAlign: "start" }}>
                              {skill.tools}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;

