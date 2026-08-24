import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

interface CommandLog {
  id: string;
  type: "input" | "output";
  content: string | React.ReactNode;
}

const DevOpsTerminal = () => {
  const { t, lang } = useLang();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([
    {
      id: "welcome-1",
      type: "output",
      content: (
        <div className="space-y-1 text-xs md:text-sm">
          <p className="text-cyan-400 font-semibold">
            🚀 Welcome to Mahmoud Obaidon's DevOps Interactive Terminal v2.4
          </p>
          <p className="text-muted-foreground">{t.terminal.hint}</p>
        </div>
      ),
    },
  ]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const handleRunCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs: CommandLog[] = [
      ...history,
      { id: Math.random().toString(), type: "input", content: cmdStr },
    ];

    if (trimmed === "clear") {
      setHistory([]);
      setInput("");
      return;
    }

    let outputNode: React.ReactNode;

    switch (trimmed) {
      case "status":
      case "system":
        outputNode = (
          <div className="space-y-1.5 text-xs md:text-sm border-s-2 border-emerald-500/80 ps-3 my-1">
            <p className="text-emerald-400 font-bold">🟢 SYSTEM STATUS: HEALTHY & OPERATIONAL</p>
            <p className="text-slate-300">
              • Infrastructure: <span className="text-cyan-300 font-mono">AWS EC2 Multi-Region</span>
            </p>
            <p className="text-slate-300">
              • Containers: <span className="text-cyan-300 font-mono">Docker & K8s Active</span>
            </p>
            <p className="text-slate-300">
              • Monitoring: <span className="text-cyan-300 font-mono">Prometheus & Grafana (99.9% Uptime)</span>
            </p>
            <p className="text-slate-300">
              • Firewalls: <span className="text-amber-300 font-mono">pfSense SSL/TLS Hardened</span>
            </p>
          </div>
        );
        break;

      case "whoami":
      case "about":
        outputNode = (
          <div className="text-xs md:text-sm text-slate-200 space-y-1 my-1">
            <p className="font-bold text-amber-400">👤 {t.hero.name}</p>
            <p className="text-slate-300">{t.hero.role}</p>
            <p className="text-muted-foreground text-xs">{t.about.introPost}</p>
          </div>
        );
        break;

      case "skills":
      case "stack":
        outputNode = (
          <div className="text-xs md:text-sm text-cyan-300 my-1 space-y-1">
            <p className="font-bold text-amber-300">⚡ TECH STACK & TOOLS:</p>
            <p className="text-slate-200">
              • DevOps: <span className="text-emerald-300">Docker, Kubernetes, GitHub Actions, Jenkins, Terraform, Ansible</span>
            </p>
            <p className="text-slate-200">
              • Cloud & Web: <span className="text-emerald-300">AWS EC2, S3, Nginx, Cloudflare, Linux (Ubuntu/Debian)</span>
            </p>
            <p className="text-slate-200">
              • Observability: <span className="text-emerald-300">Prometheus, Grafana, ELK Stack</span>
            </p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="text-xs md:text-sm my-1 space-y-1 text-slate-200">
            <p className="font-bold text-cyan-400">📦 FEATURED PROJECTS:</p>
            <p>1. <span className="text-amber-300">Kubernetes & Docker Cluster:</span> Multi-node deployment on AWS.</p>
            <p>2. <span className="text-amber-300">Automated CI/CD Pipeline:</span> Zero-downtime GitHub Actions workflow.</p>
            <p>3. <span className="text-amber-300">Observability Stack:</span> Prometheus + Grafana real-time metrics.</p>
            <p>4. <span className="text-amber-300">pfSense & AD Integration:</span> Enterprise branch firewall hardening.</p>
          </div>
        );
        break;

      case "contact":
      case "email":
        outputNode = (
          <div className="text-xs md:text-sm my-1 text-emerald-300 space-y-1">
            <p className="font-bold text-white">📬 CONTACT INFO:</p>
            <p>Email: <a href="mailto:mhmoodobidoon@gmail.com" className="underline text-cyan-400">mhmoodobidoon@gmail.com</a></p>
            <p>Phone / WhatsApp: <span className="text-amber-300" dir="ltr">+967 772 944 392</span></p>
            <p>Location: Tarim, Hadhramout — Yemen</p>
          </div>
        );
        break;

      case "help":
        outputNode = (
          <div className="text-xs md:text-sm text-slate-300 my-1 space-y-1">
            <p className="font-bold text-amber-400">💡 Available Commands:</p>
            <p className="font-mono text-cyan-300">
              status | whoami | skills | projects | contact | clear | matrix
            </p>
          </div>
        );
        break;

      case "matrix":
        outputNode = (
          <div className="text-xs font-mono text-emerald-400 space-y-0.5 animate-pulse my-1">
            <p>01000100 01000101 01010110 01001111 01010000 01010011</p>
            <p>AWS_NODES: ONLINE | Kubelet: Active | Pods: 100% Ready</p>
            <p>DEPLOYING AUTOMATION BLUEPRINT... SUCCESS!</p>
          </div>
        );
        break;

      default:
        outputNode = (
          <p className="text-xs md:text-sm text-red-400 my-1">
            Command not found: "{cmdStr}". Type <span className="text-amber-300 font-mono">help</span> for commands list.
          </p>
        );
        break;
    }

    newLogs.push({
      id: Math.random().toString(),
      type: "output",
      content: outputNode,
    });

    setHistory(newLogs);
    setInput("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleRunCommand(input);
  };

  return (
    <div className="w-full max-w-4xl mx-auto rounded-2xl border border-primary/30 bg-slate-950/90 text-slate-100 shadow-2xl shadow-primary/10 overflow-hidden font-mono text-start dir-ltr">
      {/* Header bar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900/90 border-b border-slate-800 select-none">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
          <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
          <span className="text-xs text-slate-400 ms-2 font-sans font-medium flex items-center gap-1.5">
            <TerminalIcon className="w-3.5 h-3.5 text-primary" />
            {t.terminal.title}
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
          <Sparkles className="w-3 h-3" />
          <span>DevOps TTY v2.4</span>
        </div>
      </div>

      {/* Terminal content */}
      <div
        className="p-4 md:p-6 min-h-[220px] max-h-[360px] overflow-y-auto space-y-3 font-mono text-sm leading-relaxed"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item) => (
          <div key={item.id}>
            {item.type === "input" ? (
              <div className="flex items-center gap-2 text-cyan-400">
                <span className="text-emerald-400 font-semibold">{t.terminal.prompt}</span>
                <span className="text-slate-100">{item.content}</span>
              </div>
            ) : (
              <div>{item.content}</div>
            )}
          </div>
        ))}

        {/* Input line */}
        <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-1">
          <span className="text-emerald-400 font-semibold shrink-0">{t.terminal.prompt}</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-transparent text-slate-100 outline-none border-none font-mono text-sm focus:ring-0 p-0"
            placeholder="type 'help' or 'status'..."
          />
          <button type="submit" className="text-slate-500 hover:text-cyan-400 transition-colors p-1" aria-label="Run command">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Pills */}
      <div className="px-4 py-2.5 bg-slate-900/60 border-t border-slate-800/80 flex flex-wrap items-center gap-2">
        <span className="text-xs text-slate-400 me-1 font-sans">{lang === "ar" ? "أوامر سريعة:" : "Quick Run:"}</span>
        {t.terminal.quickBtns.map((btn) => (
          <button
            key={btn.label}
            onClick={() => handleRunCommand(btn.cmd)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-primary/20 text-cyan-300 hover:text-cyan-200 border border-slate-700/60 hover:border-primary/40 text-xs transition-all font-mono"
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DevOpsTerminal;
