import { useState, useEffect } from "react";
import { Cpu, HardDrive, ShieldCheck, Activity, Server, Radio } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const SystemHealthWidget = () => {
  const { lang } = useLang();
  const [cpuVal, setCpuVal] = useState<number>(14);
  const [ramVal, setRamVal] = useState<number>(3.4);

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate micro fluctuations in live server telemetry
      setCpuVal(Number((12 + Math.random() * 6).toFixed(1)));
      setRamVal(Number((3.2 + Math.random() * 0.4).toFixed(2)));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-4xl mx-auto rounded-3xl border border-border/80 bg-card/80 backdrop-blur-xl p-6 md:p-7 shadow-xl hover:border-primary/50 transition-all duration-300 dir-ltr text-start">
      <div className="flex items-center justify-between border-b border-border/70 pb-4 mb-6">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-500">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-extrabold text-foreground text-base tracking-tight">
              {lang === "ar" ? "لوحة مراقبة الخوادم الحية (Live Telemetry)" : "Live Telemetry & Infrastructure Health"}
            </h4>
            <p className="text-xs text-muted-foreground font-mono">AWS EC2 • Docker Swarm • K8s Cluster</p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-emerald-500 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          99.99% Uptime
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {/* Metric 1: CPU */}
        <div className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" /> CPU Load
            </span>
            <span className="text-cyan-400 font-bold">{cpuVal}%</span>
          </div>
          {/* Animated Sparkline Graphic */}
          <div className="h-6 w-full flex items-end gap-1">
            {[40, 55, 30, 65, 45, 60, 50, 75, 40, 55, 60, 45].map((val, idx) => (
              <div
                key={idx}
                className="flex-1 bg-cyan-500/40 hover:bg-cyan-400 rounded-t transition-all duration-300"
                style={{ height: `${(val * (cpuVal / 15)).toFixed(0)}%` }}
              />
            ))}
          </div>
        </div>

        {/* Metric 2: RAM */}
        <div className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-2">
          <div className="flex items-center justify-between text-muted-foreground text-xs font-mono">
            <span className="flex items-center gap-1.5">
              <HardDrive className="w-3.5 h-3.5 text-amber-400" /> RAM Memory
            </span>
            <span className="text-amber-400 font-bold">{ramVal} GB</span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden mt-3">
            <div className="h-full bg-amber-500 rounded-full transition-all duration-500" style={{ width: "22%" }} />
          </div>
          <p className="text-[11px] font-mono text-muted-foreground">3.4 GB / 16 GB (21% Used)</p>
        </div>

        {/* Metric 3: Containers */}
        <div className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
            <Server className="w-3.5 h-3.5 text-emerald-400" /> Docker Microservices
          </div>
          <p className="text-xl font-mono font-extrabold text-emerald-400">14 / 14</p>
          <p className="text-[11px] font-mono text-emerald-500 font-bold">● All Pods Healthy</p>
        </div>

        {/* Metric 4: Security */}
        <div className="p-4 rounded-2xl bg-background/60 border border-border/60 space-y-1">
          <div className="flex items-center gap-1.5 text-muted-foreground text-xs font-mono">
            <ShieldCheck className="w-3.5 h-3.5 text-primary" /> Security & SSL
          </div>
          <p className="text-sm font-mono font-bold text-foreground pt-1">TLS 1.3 Hardened</p>
          <p className="text-[11px] font-mono text-primary font-bold">🔒 pfSense Firewall</p>
        </div>
      </div>
    </div>
  );
};

export default SystemHealthWidget;
