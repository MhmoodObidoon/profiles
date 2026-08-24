import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Copy, Check } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";
const EMAIL = "mhmoodobidoon@gmail.com";

const Contact = () => {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");

    if (FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")) {
      // Fallback behavior when Formspree endpoint is not set up
      setTimeout(() => {
        setStatus("sent");
        form.reset();
        window.location.href = `mailto:${EMAIL}?subject=Contact%20From%20Portfolio&body=${encodeURIComponent(
          (form.elements.namedItem("message") as HTMLTextAreaElement)?.value || ""
        )}`;
      }, 700);
      return;
    }

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setStatus("sent");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputClasses =
    "w-full rounded-xl border border-input bg-background/80 px-4 py-3.5 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary transition-all shadow-xs text-sm font-medium";

  const infoItems = [
    { key: "email", title: t.contact.info[0].title, icon: Mail, content: EMAIL, href: `mailto:${EMAIL}`, tone: "primary" as const },
    { key: "phone", title: t.contact.info[1].title, icon: Phone, content: "+967 772 944 392", href: "tel:+967772944392", tone: "accent" as const },
    { key: "location", title: t.contact.info[2].title, icon: MapPin, content: t.contact.locationValue, href: null, tone: "secondary" as const },
  ];

  return (
    <section id="contact" className="py-24 bg-card relative overflow-hidden">
      <div className="container px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow={t.contact.eyebrow}
            title={t.contact.title}
            subtitle={t.contact.subtitle}
            eyebrowTone="accent"
          />

          <Reveal>
            <div
              className="p-8 md:p-12 rounded-3xl border border-border/80"
              style={{
                background: "var(--gradient-card)",
                boxShadow: "var(--shadow-elegant)",
              }}
            >
              {/* Info Cards */}
              <div className="grid md:grid-cols-3 gap-6 mb-12">
                {infoItems.map((item) => (
                  <div
                    key={item.key}
                    className="p-6 rounded-2xl bg-background/60 border border-border/70 text-center space-y-3 hover:border-primary/50 transition-colors shadow-xs"
                  >
                    <div
                      className={`mx-auto w-14 h-14 rounded-2xl flex items-center justify-center mb-3 shadow-md ${
                        item.tone === "primary"
                          ? "bg-primary text-primary-foreground shadow-primary/20"
                          : item.tone === "accent"
                            ? "bg-accent text-accent-foreground shadow-accent/20"
                            : "bg-secondary text-secondary-foreground"
                      }`}
                    >
                      <item.icon className="w-6 h-6" />
                    </div>
                    
                    <h3 className="font-bold text-base text-foreground">{item.title}</h3>
                    
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-primary hover:underline font-bold text-sm break-all block"
                        dir={item.key === "phone" ? "ltr" : undefined}
                      >
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground text-sm font-medium">{item.content}</p>
                    )}

                    {item.key === "email" && (
                      <button
                        onClick={handleCopyEmail}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border bg-card text-xs font-bold text-muted-foreground hover:text-primary hover:border-primary transition-all mt-2"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copied ? t.contact.copied : t.contact.copyEmail}</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>

              {/* Contact Form */}
              <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
                <div className="grid md:grid-cols-2 gap-5">
                  <input
                    type="text"
                    name="name"
                    required
                    placeholder={t.contact.form.name}
                    aria-label={t.contact.form.name}
                    className={inputClasses}
                  />
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder={t.contact.form.email}
                    aria-label={t.contact.form.email}
                    className={inputClasses}
                    dir="ltr"
                  />
                </div>
                <textarea
                  name="message"
                  required
                  rows={5}
                  placeholder={t.contact.form.message}
                  aria-label={t.contact.form.message}
                  className={`${inputClasses} resize-none`}
                />

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 disabled:opacity-60 text-primary-foreground font-bold px-8 py-4 rounded-xl text-lg shadow-xl shadow-primary/20 hover:shadow-primary/35 transition-all"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      {t.contact.form.sending}
                    </>
                  ) : status === "sent" ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-300" />
                      {t.contact.form.sent}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.contact.form.send}
                    </>
                  )}
                </button>

                {status === "sent" && (
                  <p role="status" className="text-center text-emerald-500 font-bold text-sm pt-2">
                    {t.contact.form.sentNote}
                  </p>
                )}
                {status === "error" && (
                  <p role="alert" className="text-center text-destructive font-bold text-sm pt-2">
                    {t.contact.form.error}
                  </p>
                )}
              </form>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;

