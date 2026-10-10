import { Activity, Cpu, HardDrive, Radio, Server, ShieldCheck } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const SystemHealthWidget = () => {
  const { lang } = useLang();
  const isArabic = lang === "ar";

  const metrics = [
    { label: "CPU", value: "Demo", icon: Cpu, tone: "text-cyan-400" },
    { label: isArabic ? "الذاكرة" : "Memory", value: "Demo", icon: HardDrive, tone: "text-amber-400" },
    { label: isArabic ? "الحاويات" : "Containers", value: "Example", icon: Server, tone: "text-emerald-400" },
    { label: isArabic ? "الأمان" : "Security", value: "Example", icon: ShieldCheck, tone: "text-primary" },
  ];

  return (
    <section
      aria-label={isArabic ? "لوحة توضيحية لمؤشرات النظام" : "Illustrative system metrics"}
      className="w-full max-w-4xl mx-auto rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-6 md:p-7 shadow-xl"
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-border/70 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-primary/10 text-primary">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-foreground text-base tracking-tight">
              {isArabic ? "معاينة توضيحية لمؤشرات البنية التحتية" : "Infrastructure Metrics Preview"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {isArabic ? "بيانات تجريبية للعرض — غير متصلة بخادم فعلي" : "Sample display only — not connected to a live server"}
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-500 bg-amber-500/10 px-3 py-1 rounded-full border border-amber-500/20">
          <Radio className="w-3.5 h-3.5" />
          {isArabic ? "محاكاة" : "Demo"}
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {metrics.map(({ label, value, icon: Icon, tone }) => (
          <div key={label} className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-3">
            <div className="flex items-center justify-between gap-2 text-muted-foreground text-xs">
              <span>{label}</span>
              <Icon className={`w-4 h-4 ${tone}`} />
            </div>
            <p className={`text-lg font-extrabold ${tone}`}>{value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemHealthWidget;
