import { useState, useRef, useEffect } from "react";
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Info } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

interface CommandLog {
  id: string;
  type: "input" | "output";
  content: string | React.ReactNode;
}

const DevOpsTerminal = () => {
  const { t, lang } = useLang();
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<CommandLog[]>([]);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isInitialMount = useRef(true);

  // Initialize and update welcome banner on language change
  useEffect(() => {
    setHistory([
      {
        id: "welcome-1",
        type: "output",
        content: (
          <div className="space-y-1.5 text-xs md:text-sm">
            <p className="text-cyan-400 font-semibold">
              🚀 {t.terminal.title}
            </p>
            <div className="text-amber-300/95 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg text-xs font-sans leading-relaxed">
              {t.terminal.note}
            </div>
            <p className="text-muted-foreground text-xs font-sans">{t.terminal.hint}</p>
          </div>
        ),
      },
    ]);
  }, [lang, t]);

  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleRunCommand = (cmdStr: string) => {
    const trimmed = cmdStr.trim().toLowerCase();
    if (!trimmed) return;

    const newLogs: CommandLog[] = [
      ...history,
      { id: Math.random().toString(), type: "input", content: cmdStr },
    ];

    if (trimmed === "clear") {
      setHistory([
        {
          id: `welcome-${Date.now()}`,
          type: "output",
          content: (
            <div className="space-y-1 text-xs md:text-sm">
              <p className="text-cyan-400 font-semibold">🚀 {t.terminal.title}</p>
              <p className="text-muted-foreground text-xs font-sans">{t.terminal.hint}</p>
            </div>
          ),
        },
      ]);
      setInput("");
      return;
    }

    let outputNode: React.ReactNode;

    switch (trimmed) {
      case "status":
      case "system":
        outputNode = (
          <div className="space-y-1.5 text-xs md:text-sm border-s-2 border-emerald-500/80 ps-3 my-1">
            <p className="text-emerald-400 font-bold font-mono">
              🟢 ARCHITECTURE STATUS: VERIFIED LAB &amp; CLIENT CONFIGS
            </p>
            <p className="text-slate-300">
              • Target OS: <span className="text-cyan-300 font-mono">Ubuntu Linux 22.04 LTS (x86_64 VPS)</span>
            </p>
            <p className="text-slate-300">
              • Reverse Proxy: <span className="text-cyan-300 font-mono">Nginx 1.24 (Reverse Proxy, SSL/TLS Let's Encrypt)</span>
            </p>
            <p className="text-slate-300">
              • Container Runtime: <span className="text-cyan-300 font-mono">Docker 26.x &amp; Docker Compose v2</span>
            </p>
            <p className="text-slate-300">
              • Active Stack: <span className="text-cyan-300 font-mono">Django + Gunicorn + PostgreSQL 16 (Multi-container)</span>
            </p>
            <p className="text-slate-300">
              • Security &amp; Access: <span className="text-emerald-300 font-mono">UFW Active (Ports 80/443, SSH Key-Only Auth)</span>
            </p>
            <p className="text-slate-300">
              • CI/CD Pipeline: <span className="text-cyan-300 font-mono">GitHub Actions (Lint, Trivy Vuln Scan, Docker Push)</span>
            </p>
            <p className="text-slate-300">
              • Orchestration Lab: <span className="text-amber-300 font-mono">Kubernetes (ClusterIP, Ingress-Nginx, PersistentVolumes)</span>
            </p>
            <p className="text-slate-300">
              • Observability: <span className="text-cyan-300 font-mono">Prometheus Exporter + Grafana Dashboard (Health Alerts)</span>
            </p>
            <p className="text-[11px] text-slate-400 italic pt-1 font-sans">
              ℹ️ {lang === "ar" ? "بيانات توضيحية مستمدة من التكوينات والمشاريع الفعلية المنفذة محلياً وللعملاء." : "Demo outputs reflecting actual project and client architectures implemented by Mahmoud."}
            </p>
          </div>
        );
        break;

      case "docker ps":
      case "docker":
      case "ps":
        outputNode = (
          <div className="space-y-1.5 text-xs md:text-sm my-1 overflow-x-auto">
            <p className="text-cyan-400 font-bold font-mono">CONTAINER ID   IMAGE                 COMMAND                  STATUS         PORTS</p>
            <div className="font-mono text-slate-300 space-y-0.5 text-xs whitespace-pre">
              <p>7f8a91b2c3d4   nginx:alpine          "/docker-entrypoint…"    Up 3 days      0.0.0.0:80-&gt;80/tcp, 0.0.0.0:443-&gt;443/tcp (django-proxy)</p>
              <p>a1b2c3d4e5f6   django-app:production "gunicorn core.wsgi…"    Up 3 days      0.0.0.0:8000-&gt;8000/tcp (django-backend)</p>
              <p>e5f6a1b2c3d4   postgres:16-alpine    "docker-entrypoint.s…"   Up 3 days      5432/tcp (postgres-db)</p>
              <p>3c4d5e6f7a8b   prom/node-exporter    "/bin/node_exporter"     Up 3 days      9100/tcp (node-exporter)</p>
            </div>
            <p className="text-[11px] text-slate-400 italic pt-1 font-sans">
              ℹ️ {lang === "ar" ? "محاكاة طبولوجيا الحاويات من مشروع تشغيل Django و PostgreSQL و Nginx الفعلي." : "Simulated container topology based on the actual Django, PostgreSQL, and Nginx setup."}
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
            <p className="text-muted-foreground text-xs font-sans">{t.about.introPost}</p>
          </div>
        );
        break;

      case "skills":
      case "stack":
        outputNode = (
          <div className="text-xs md:text-sm text-cyan-300 my-1 space-y-1.5">
            <p className="font-bold text-amber-300">⚡ APPLIED TECH STACK &amp; TOOLS:</p>
            <p className="text-slate-200">
              • CI/CD &amp; Containers: <span className="text-emerald-300">Docker, Docker Compose, Kubernetes, GitHub Actions, Jenkins</span>
            </p>
            <p className="text-slate-200">
              • Infrastructure &amp; Linux: <span className="text-emerald-300">Ubuntu/Debian, Nginx, Systemd, UFW Firewall, SSL/TLS (Certbot)</span>
            </p>
            <p className="text-slate-200">
              • Cloud &amp; IaC: <span className="text-emerald-300">AWS (EC2, S3, IAM, VPC), Terraform, Cloudflare DNS</span>
            </p>
            <p className="text-slate-200">
              • Scripting &amp; Metrics: <span className="text-emerald-300">Python, Bash, Prometheus, Grafana, Node Exporter</span>
            </p>
          </div>
        );
        break;

      case "projects":
        outputNode = (
          <div className="text-xs md:text-sm my-1 space-y-1.5 text-slate-200">
            <p className="font-bold text-cyan-400">📦 VERIFIED PRACTICAL PROJECTS &amp; CLIENT WORK:</p>
            <p>1. <span className="text-amber-300 font-semibold">Django + Docker Production:</span> Multi-container stack with Nginx reverse proxy, PostgreSQL, and SSL.</p>
            <p>2. <span className="text-amber-300 font-semibold">RealWorld CI/CD &amp; Terraform:</span> GitHub Actions pipeline with Trivy vulnerability scanning &amp; AWS IaC.</p>
            <p>3. <span className="text-amber-300 font-semibold">HR Enterprise Client App:</span> Client deployment on Ubuntu Linux using systemd services and Nginx.</p>
            <p>4. <span className="text-amber-300 font-semibold">Hadhramout Portal:</span> DNS records routing, Nginx virtual hosts, and SSL certificate installation.</p>
            <p>5. <span className="text-amber-300 font-semibold">Kubernetes Microservices Lab:</span> Hands-on cluster with Ingress routing, Deployments, and PVC storage.</p>
            <p>6. <span className="text-amber-300 font-semibold">Server Health Inspector:</span> Automated Python/Bash script monitoring CPU/RAM/Disk with Prometheus metrics.</p>
            <p className="text-[11px] text-slate-400 pt-1 font-sans">
              💡 {lang === "ar" ? "راجع قسم المشاريع بالأسفل للاطلاع على المخططات المعمارية وأوامر التشغيل وسجلات التحقق." : "Explore the Projects section below for architectural diagrams, run commands, and execution logs."}
            </p>
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
              status | docker ps | whoami | skills | projects | contact | matrix | clear
            </p>
          </div>
        );
        break;

      case "matrix":
        outputNode = (
          <div className="text-xs font-mono text-emerald-400 space-y-0.5 animate-pulse my-1">
            <p>01000100 01000101 01010110 01001111 01010000 01010011 (DEVOPS)</p>
            <p>HOST: UBUNTU LINUX | DOCKER: RUNNING | NGINX: PROXY 200 OK</p>
            <p>AUTOMATING INFRASTRUCTURE &amp; CONTINUOUS INTEGRATION... COMPLETED!</p>
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
        <div className="flex items-center gap-1.5 text-[11px] text-amber-300 bg-amber-500/10 px-2.5 py-0.5 rounded-full border border-amber-500/20 font-sans font-medium">
          <Sparkles className="w-3 h-3 text-amber-400" />
          <span>{t.terminal.badge}</span>
        </div>
      </div>

      {/* Prominent Disclaimer Strip */}
      <div className="bg-amber-500/10 border-b border-amber-500/20 px-4 py-2 flex items-center gap-2 text-xs text-amber-300/90 font-sans">
        <Info className="w-4 h-4 shrink-0 text-amber-400" />
        <span className="leading-normal">{t.terminal.note}</span>
      </div>

      {/* Terminal content */}
      <div
        ref={scrollContainerRef}
        className="p-4 md:p-6 min-h-[220px] max-h-[380px] overflow-y-auto space-y-3 font-mono text-sm leading-relaxed"
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
            placeholder="type 'help', 'status', 'docker ps'..."
          />
          <button type="submit" className="text-slate-500 hover:text-cyan-400 transition-colors p-1" aria-label="Run command">
            <CornerDownLeft className="w-4 h-4" />
          </button>
        </form>
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
