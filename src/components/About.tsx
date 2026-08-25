import { Container, Gauge, Layers, Zap } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

const icons = { zap: Zap, container: Container, layers: Layers, gauge: Gauge };

const iconKeys = ["zap", "container", "layers", "gauge"] as const;

const About = () => {
  const { t } = useLang();

  return (
    <section id="about" className="py-24 bg-card">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <SectionHeader eyebrow={t.about.eyebrow} title={t.about.title} eyebrowTone="indigo" />

          <Reveal>
            <div
              className="p-8 md:p-14 rounded-2xl border border-border"
              style={{ background: "var(--gradient-card)" }}
            >
              {/* المقدمة */}
              <p
                lang={undefined}
                className="text-lg md:text-xl leading-relaxed text-center text-card-foreground max-w-2xl mx-auto"
              >
                {t.about.introPre}
                <span className={`font-bold ${t.about.introName === "محمود عبيدون" ? "text-primary" : "text-primary"}`}>
                  {t.about.introName}
                </span>
                {t.about.introMid}
                <span dir="ltr" className="font-semibold">{t.about.introRole}</span>
                {t.about.introPost}
              </p>

              {/* النقاط الرئيسية */}
              <div className="grid sm:grid-cols-2 gap-4 md:gap-5 mt-12">
                {t.about.highlights.map((item, idx) => {
                  const Icon = icons[iconKeys[idx]];
                  return (
                    <div
                      key={item.term}
                      className="flex items-start gap-4 p-5 rounded-xl bg-background/60 border border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="shrink-0 p-2.5 rounded-lg bg-primary/10">
                        <Icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-bold text-card-foreground mb-1 leading-snug">
                          {item.title}{" "}
                          <span dir="ltr" className="text-primary font-semibold text-sm">
                            {item.term}
                          </span>
                        </h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>


            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default About;
