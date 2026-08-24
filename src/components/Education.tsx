import { GraduationCap, Languages as LanguagesIcon } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

const Education = () => {
  const { t } = useLang();

  return (
    <section id="education" className="py-24 bg-background">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow={t.education.eyebrow}
            title={t.education.title}
          />

          <div className="grid md:grid-cols-2 gap-8">
            <Reveal>
              <div
                className="h-full p-8 rounded-xl bg-card border border-border hover:border-primary/60 hover:-translate-y-1 transition-all"
                style={{
                  boxShadow: "var(--shadow-elegant)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-primary text-primary-foreground">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t.education.educationTitle}</h3>
                </div>

                <div className="space-y-6">
                  {t.education.degrees.map((deg, idx) => (
                    <div key={deg.school} className={idx > 0 ? "border-t border-border pt-6" : ""}>
                      <h4 className="font-bold text-lg text-primary mb-2">{deg.school}</h4>
                      <p className="text-card-foreground mb-1">{deg.degree}</p>
                      <p className="text-sm text-muted-foreground" dir="ltr" style={{ textAlign: "start" }}>
                        {deg.years}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            <Reveal delay={120}>
              <div
                className="h-full p-8 rounded-xl bg-card border border-border hover:border-accent/60 hover:-translate-y-1 transition-all"
                style={{
                  boxShadow: "var(--shadow-elegant)",
                }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 rounded-lg bg-accent text-accent-foreground">
                    <LanguagesIcon className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground">{t.education.languagesTitle}</h3>
                </div>

                <div className="space-y-6">
                  {t.education.languages.map((langItem) => (
                    <div key={langItem.name}>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-bold text-lg text-accent">{langItem.name}</h4>
                        <span className="text-sm text-muted-foreground">{langItem.level}</span>
                      </div>
                      <div className="h-2 bg-muted rounded-full overflow-hidden">
                        <div className={`h-full bg-accent rounded-full ${langItem.width === "100%" ? "w-full" : "w-3/4"}`} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
