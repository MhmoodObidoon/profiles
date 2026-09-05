import { useState, useEffect } from "react";
import { GitCommit, CheckCircle2, Package, Server, Activity, Play, RefreshCw, Sparkles, Terminal } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

interface PipelineStep {
  id: number;
  labelAr: string;
  labelEn: string;
  subAr: string;
  subEn: string;
  icon: React.ElementType;
  logAr: string;
  logEn: string;
}

const pipelineSteps: PipelineStep[] = [
  {
    id: 1,
    labelAr: "دفع الكود (Commit)",
    labelEn: "Git Commit",
    subAr: "push to main branch",
    subEn: "push to main branch",
    icon: GitCommit,
    logAr: "🚀 [1/5] تم استلام التعديلات في المستودع Git Push: commit #d9a4f2...",
    logEn: "🚀 [1/5] Git commit received: commit #d9a4f2...",
  },
  {
    id: 2,
    labelAr: "الفحص التلقائي (Testing)",
    labelEn: "Automated Tests",
    subAr: "linting & unit tests",
    subEn: "linting & unit tests",
    icon: CheckCircle2,
    logAr: "🧪 [2/5] جاري تشغيل الفحص الآلي... جميع الاختبارات نجحت 100% (Passed)",
    logEn: "🧪 [2/5] Running automated tests... All 48 unit tests passed (100%)",
  },
  {
    id: 3,
    labelAr: "بناء الحاوية (Docker Build)",
    labelEn: "Build Docker Image",
    subAr: "multi-stage build",
    subEn: "multi-stage build",
    icon: Package,
    logAr: "📦 [3/5] بناء الصورة الرقمية mahmoud/app:v2.4 ونشرها في Docker Registry...",
    logEn: "📦 [3/5] Building container image mahmoud/app:v2.4 & pushing to registry...",
  },
  {
    id: 4,
    labelAr: "النشر السحابي (K8s Deploy)",
    labelEn: "Deploy K8s Cluster",
    subAr: "AWS EC2 rolling update",
    subEn: "AWS EC2 rolling update",
    icon: Server,
    logAr: "☁️ [4/5] نشر تحديث بدون توقف (Zero Downtime) على خوادم AWS Kubernetes...",
    logEn: "☁️ [4/5] Zero-downtime rolling update deployed to AWS Kubernetes pods...",
  },
  {
    id: 5,
    labelAr: "المراقبة الفورية (Live Metrics)",
    labelEn: "Live Observability",
    subAr: "Prometheus & Grafana",
    subEn: "Prometheus & Grafana",
    icon: Activity,
    logAr: "🟢 [5/5] تفعيل التنبيهات المباشرة! استقرار الخدمة 99.99% - Status: HEALTHY",
    logEn: "🟢 [5/5] Live telemetry active! Prometheus healthy, Uptime: 99.99%",
  },
];

const PipelineVisualizer = () => {
  const { lang } = useLang();
  const [currentStep, setCurrentStep] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [logs, setLogs] = useState<string[]>([]);

  const startPipeline = () => {
    if (isRunning) return;
    setIsRunning(true);
    setCurrentStep(1);
    const initialLog = lang === "ar" ? pipelineSteps[0].logAr : pipelineSteps[0].logEn;
    setLogs([initialLog]);
  };

  useEffect(() => {
    if (!isRunning) return;

    if (currentStep < 5) {
      const timer = setTimeout(() => {
        const nextStep = currentStep + 1;
        setCurrentStep(nextStep);
        const nextLog = lang === "ar" ? pipelineSteps[nextStep - 1].logAr : pipelineSteps[nextStep - 1].logEn;
        setLogs((prev) => [...prev, nextLog]);
      }, 1400);

      return () => clearTimeout(timer);
    } else {
      const finishTimer = setTimeout(() => {
        setIsRunning(false);
      }, 1000);
      return () => clearTimeout(finishTimer);
    }
  }, [currentStep, isRunning, lang]);

  return (
    <div className="w-full max-w-5xl mx-auto rounded-3xl border border-primary/30 bg-card/90 backdrop-blur-xl p-6 md:p-8 shadow-2xl shadow-primary/10 relative overflow-hidden dir-ltr">
      {/* Glow background accent */}
      <div className="absolute top-0 right-1/3 w-64 h-64 rounded-full bg-primary/10 blur-[100px] pointer-events-none" aria-hidden />

      {/* Header */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-6 border-b border-border/80 text-start">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-primary uppercase tracking-wider bg-primary/10 px-3 py-1 rounded-full border border-primary/20">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{lang === "ar" ? "محاكي خط النشر الآلي CI/CD" : "Interactive CI/CD Pipeline Visualizer"}</span>
          </div>
          <h3 className="text-xl md:text-2xl font-extrabold text-foreground tracking-tight">
            {lang === "ar" ? "شاهد كيف يتم نشر التطبيق آلياً بدون خطأ بشري" : "Watch Automated Cloud Deployment in Action"}
          </h3>
        </div>

        {/* Trigger Button */}
        <button
          onClick={startPipeline}
          disabled={isRunning}
          className="shrink-0 flex items-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-50 text-primary-foreground font-bold px-6 py-3 rounded-xl text-sm shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all cursor-pointer"
        >
          {isRunning ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin text-cyan-200" />
              <span>{lang === "ar" ? "جارٍ النشر الآلي..." : "Deploying..."}</span>
            </>
          ) : (
            <>
              <Play className="w-4 h-4 fill-current" />
              <span>{lang === "ar" ? "تشغيل خط النشر (Run Pipeline)" : "Run Pipeline Demo"}</span>
            </>
          )}
        </button>
      </div>

      {/* Nodes Connection Line */}
      <div className="relative mb-10 py-4 px-2">
        {/* Background Connecting Line */}
        <div className="absolute top-1/2 start-8 end-8 h-1.5 -translate-y-1/2 bg-secondary rounded-full -z-0" />
        
        {/* Active Laser Flow Line */}
        <div
          className="absolute top-1/2 start-8 h-1.5 -translate-y-1/2 bg-gradient-to-r from-primary via-cyan-400 to-accent rounded-full transition-all duration-700 shadow-sm shadow-cyan-400/50"
          style={{
            width: currentStep === 0 ? "0%" : `${((currentStep - 1) / 4) * 100}%`,
          }}
        />

        {/* Pipeline Nodes Grid */}
        <div className="grid grid-cols-5 gap-2 relative z-10">
          {pipelineSteps.map((step) => {
            const StepIcon = step.icon;
            const isActive = currentStep >= step.id;
            const isCurrent = currentStep === step.id;

            return (
              <div key={step.id} className="flex flex-col items-center text-center">
                {/* Node Circle Icon */}
                <div
                  className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center border-2 transition-all duration-500 shadow-md ${
                    isCurrent
                      ? "bg-primary text-primary-foreground border-cyan-400 scale-110 shadow-lg shadow-primary/40 animate-pulse"
                      : isActive
                        ? "bg-primary/90 text-primary-foreground border-primary"
                        : "bg-card text-muted-foreground border-border"
                  }`}
                >
                  <StepIcon className={`w-5 h-5 md:w-6 md:h-6 ${isCurrent ? "animate-bounce" : ""}`} />
                </div>

                {/* Step Labels */}
                <p className={`text-xs md:text-sm font-bold mt-3 transition-colors ${isActive ? "text-primary" : "text-muted-foreground"}`}>
                  {lang === "ar" ? step.labelAr : step.labelEn}
                </p>
                <p className="text-[10px] md:text-xs font-mono text-muted-foreground hidden sm:block mt-0.5">
                  {lang === "ar" ? step.subAr : step.subEn}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Live Deployment Logs Console */}
      <div className="rounded-2xl border border-slate-800 bg-slate-950 text-slate-100 p-4 md:p-5 font-mono text-xs text-start space-y-2 max-h-40 overflow-y-auto">
        <div className="flex items-center gap-2 text-slate-400 border-b border-slate-800 pb-2 mb-2">
          <Terminal className="w-4 h-4 text-cyan-400" />
          <span className="font-sans font-semibold text-slate-300">
            {lang === "ar" ? "سجلات خط النشر المباشر (Deployment Output):" : "Live Deployment Terminal Stream:"}
          </span>
        </div>

        {logs.length === 0 ? (
          <p className="text-slate-500 italic">
            {lang === "ar" ? "اضغط على زر [ Run Pipeline ] لتشغيل محاكاة النشر." : "Click [ Run Pipeline Demo ] above to watch automated deployment."}
          </p>
        ) : (
          logs.map((log, i) => (
            <p key={i} className="text-cyan-300 animate-fade-in leading-relaxed">
              {log}
            </p>
          ))
        )}
      </div>
    </div>
  );
};

export default PipelineVisualizer;
