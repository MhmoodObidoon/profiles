import { useState } from "react";
import { Mail, Phone, MapPin, Send, CheckCircle2, Loader2, Copy, Check, RefreshCw, AlertCircle, MessageCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import SectionHeader from "@/components/SectionHeader";
import { useLang } from "@/i18n/LangContext";

const DEFAULT_ENDPOINT = "https://formsubmit.co/ajax/mhmoodobidoon@gmail.com";
const CONTACT_ENDPOINT =
  import.meta.env.VITE_CONTACT_ENDPOINT ||
  (import.meta.env.VITE_FORMSPREE_ENDPOINT && !import.meta.env.VITE_FORMSPREE_ENDPOINT.includes("YOUR_FORM_ID")
    ? import.meta.env.VITE_FORMSPREE_ENDPOINT
    : DEFAULT_ENDPOINT);

const EMAIL = "mhmoodobidoon@gmail.com";
const PHONE = "+967 772 944 392";
const WHATSAPP_URL = "https://wa.me/967772944392";

const Contact = () => {
  const { t } = useLang();
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "activation_needed" | "error">("idle");
  const [lastSubmission, setLastSubmission] = useState<{ name: string; email: string; message: string }>({
    name: "",
    email: "",
    message: "",
  });
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleOpenMailto = () => {
    const name = lastSubmission.name || "Visitor";
    const senderEmail = lastSubmission.email || "";
    const message = lastSubmission.message || "";
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${senderEmail}\n\nMessage:\n${message}`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
  };

  const handleOpenWhatsapp = () => {
    const text = encodeURIComponent(
      `مرحباً م. محمود، أتواصل معك عبر موقعك الشخصي:\nالاسم: ${lastSubmission.name || ""}\nالبريد: ${lastSubmission.email || ""}\nالرسالة: ${lastSubmission.message || ""}`
    );
    window.open(`${WHATSAPP_URL}?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = (formData.get("name") as string)?.trim() || "";
    const senderEmail = (formData.get("email") as string)?.trim() || "";
    const message = (formData.get("message") as string)?.trim() || "";

    setLastSubmission({ name, email: senderEmail, message });
    setStatus("sending");

    try {
      const payload: Record<string, string> = {
        name,
        email: senderEmail,
        message,
        _subject: `New Portfolio Message from ${name} (${senderEmail})`,
        _template: "table",
        _captcha: "false",
      };

      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json().catch(() => null);

      if (res.ok && (data?.success === "true" || data?.success === true || data?.ok === true)) {
        setStatus("sent");
        form.reset();
      } else if (data?.message?.toLowerCase().includes("activation") || data?.message?.toLowerCase().includes("activate")) {
        // FormSubmit sent the one-time activation confirmation to Mahmoud's email
        setStatus("activation_needed");
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
    { key: "phone", title: t.contact.info[1].title, icon: Phone, content: PHONE, href: `tel:+967772944392`, tone: "accent" as const },
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

              {/* Success View */}
              {status === "sent" ? (
                <div className="p-8 rounded-2xl border border-emerald-500/40 bg-emerald-500/10 text-center space-y-4 max-w-xl mx-auto animate-fade-in shadow-lg shadow-emerald-500/5">
                  <div className="w-14 h-14 rounded-full bg-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center border border-emerald-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-2xl font-bold text-foreground">{t.contact.form.sent}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      {t.contact.form.sentNote}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl border border-border bg-card hover:bg-card/80 text-foreground font-semibold text-sm transition-all"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>{t.contact.form.sendAnother}</span>
                  </button>
                </div>
              ) : status === "activation_needed" ? (
                /* One-time Activation Notification View */
                <div className="p-8 rounded-2xl border border-amber-500/40 bg-amber-500/10 text-center space-y-4 max-w-xl mx-auto animate-fade-in shadow-lg">
                  <div className="w-14 h-14 rounded-full bg-amber-500/20 text-amber-400 mx-auto flex items-center justify-center border border-amber-500/40">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div className="space-y-1.5">
                    <h4 className="text-2xl font-bold text-foreground">{t.contact.form.activationTitle}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed max-w-md mx-auto">
                      {t.contact.form.activationNote}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-3 justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-border bg-card text-foreground font-semibold text-sm transition-all"
                    >
                      <RefreshCw className="w-4 h-4" />
                      <span>{t.contact.form.sendAnother}</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleOpenWhatsapp}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-sm transition-all"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>{t.contact.form.whatsappFallback}</span>
                    </button>
                  </div>
                </div>
              ) : (
                /* Form View (Idle, Sending, or Error) */
                <form onSubmit={handleSubmit} className="space-y-5 max-w-xl mx-auto">
                  {status === "error" && (
                    <div className="p-4 rounded-xl border border-destructive/40 bg-destructive/10 text-center space-y-3 animate-fade-in">
                      <div className="flex items-center justify-center gap-2 text-destructive font-bold text-sm">
                        <AlertCircle className="w-4 h-4 shrink-0" />
                        <span>{t.contact.form.error}</span>
                      </div>
                      <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
                        <button
                          type="button"
                          onClick={handleOpenMailto}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-semibold text-xs transition-all shadow-xs"
                        >
                          <Mail className="w-3.5 h-3.5" />
                          <span>{t.contact.form.emailFallback}</span>
                        </button>
                        <button
                          type="button"
                          onClick={handleOpenWhatsapp}
                          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs transition-all shadow-xs"
                        >
                          <MessageCircle className="w-3.5 h-3.5" />
                          <span>{t.contact.form.whatsappFallback}</span>
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid md:grid-cols-2 gap-5">
                    <input
                      type="text"
                      name="name"
                      required
                      defaultValue={lastSubmission.name}
                      placeholder={t.contact.form.name}
                      aria-label={t.contact.form.name}
                      className={inputClasses}
                    />
                    <input
                      type="email"
                      name="email"
                      required
                      defaultValue={lastSubmission.email}
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
                    defaultValue={lastSubmission.message}
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
                        <span>{t.contact.form.sending}</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>{t.contact.form.send}</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default Contact;
