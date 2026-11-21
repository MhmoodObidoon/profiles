import { Briefcase, Calendar } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

interface JobTask {
  label: string;
  desc: string;
}

interface JobItem {
  title: string;
  subtitle: string;
  period?: string;
  type?: string;
  tasks: JobTask[];
}

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
              {t.experience.jobs.map((rawExp) => {
                const exp = rawExp as JobItem;
                return (
                  <Reveal key={exp.subtitle}>
                    <div className="relative ps-10">
                      <span
                        className="absolute start-0 top-8 w-4 h-4 rounded-full bg-primary ring-4 ring-background shadow-sm shadow-primary/40"
                        aria-hidden
                      />
                      <article
                        className="p-6 md:p-8 rounded-2xl bg-background border border-border/80 hover:border-primary/60 transition-all duration-300"
                        style={{ boxShadow: "var(--shadow-elegant)" }}
                      >
                        <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6 pb-6 border-b border-border/70">
                          <div className="flex items-start gap-4">
                            <div className="p-3 rounded-xl bg-primary/10 text-primary mt-1 shrink-0">
                              <Briefcase className="w-6 h-6" />
                            </div>
                            <div className="space-y-1 text-start">
                              <div className="flex flex-wrap items-center gap-2">
                                <h3 className="text-xl md:text-2xl font-bold text-foreground leading-snug">
                                  {exp.title}
                                </h3>
                                {exp.type && (
                                  <span className="text-[11px] font-medium text-muted-foreground bg-muted/60 px-2.5 py-0.5 rounded-full border border-border/50">
                                    {exp.type}
                                  </span>
                                )}
                              </div>
                              <p className="text-sm md:text-base text-muted-foreground font-mono" dir="ltr" style={{ textAlign: "start" }}>
                                {exp.subtitle}
                              </p>
                            </div>
                          </div>

                          {exp.period && (
                            <span className="self-start sm:self-auto shrink-0 inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-primary/10 border border-primary/25 text-primary">
                              <Calendar className="w-3.5 h-3.5" />
                              <span>{exp.period}</span>
                            </span>
                          )}
                        </header>

                        <ul className="space-y-5">
                          {exp.tasks.map((task) => (
                            <li key={task.label} className="border-s-2 border-primary/50 ps-4 text-start">
                              <p className="font-bold text-card-foreground mb-1 text-sm">{task.label}</p>
                              <p className="text-muted-foreground text-xs md:text-sm leading-relaxed">{task.desc}</p>
                            </li>
                          ))}
                        </ul>
                      </article>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
