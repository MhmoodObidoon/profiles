import { Briefcase } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

const Experience = () => {
  const { t } = useLang();

  return (
    <section id="experience" className="py-24 bg-card">
      <div className="container px-4">
        <div className="max-w-5xl mx-auto">
          <SectionHeader
            eyebrow={t.experience.eyebrow}
            title={t.experience.title}
            subtitle={t.experience.subtitle}
          />

          <div className="relative">
            {/* الخط الرابط */}
            <div
              className="absolute start-[7px] top-2 bottom-2 w-px bg-gradient-to-b from-primary via-primary/40 to-transparent"
              aria-hidden
            />

            <div className="space-y-10">
              {t.experience.jobs.map((exp) => (
                <Reveal key={exp.subtitle}>
                  <div className="relative ps-10">
                    <span
                      className="absolute start-0 top-8 w-[15px] h-[15px] rounded-full bg-primary ring-4 ring-background"
                      aria-hidden
                    />
                    <article
                      className="p-6 md:p-8 rounded-xl bg-background border border-border hover:border-primary/50 transition-all"
                      style={{ boxShadow: "var(--shadow-elegant)" }}
                    >
                      <header className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 mb-6 pb-6 border-b border-border">
                        <div className="flex items-start gap-4">
                          <div className="p-3 rounded-lg bg-primary/10 mt-1">
                            <Briefcase className="w-6 h-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                              {exp.title}
                            </h3>
                            <p className="text-sm md:text-base text-muted-foreground mt-1" dir="ltr" style={{ textAlign: "start" }}>
                              {exp.subtitle}
                            </p>
                          </div>
                        </div>
                      </header>

                      <ul className="space-y-5">
                        {exp.tasks.map((task) => (
                          <li key={task.label} className="border-s-2 border-accent/50 ps-4">
                            <p className="font-semibold text-card-foreground mb-1">{task.label}</p>
                            <p className="text-muted-foreground leading-relaxed">{task.desc}</p>
                          </li>
                        ))}
                      </ul>
                    </article>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
