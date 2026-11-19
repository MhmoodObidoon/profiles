import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const WHATSAPP_NUMBER = "967772944392";

const WhatsAppButton = () => {
  const { lang, t } = useLang();

  return (
    <aside aria-label={t.whatsapp} className="fixed bottom-6 start-6 z-50 group">
      <a
        href={`https://wa.me/${WHATSAPP_NUMBER}`}
        target="_blank"
        rel="noreferrer"
        aria-label={t.whatsapp}
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 hover:shadow-2xl transition-all"
      >
        {/* Subtle breathing ping ring */}
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] opacity-40 animate-ping -z-10 pointer-events-none"
          aria-hidden
        />
        <MessageCircle className="w-7 h-7" />
      </a>

      {/* Floating Hover Tooltip */}
      <div
        role="tooltip"
        className="absolute bottom-full start-0 mb-2 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap bg-slate-900/95 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg border border-slate-700 backdrop-blur-sm"
      >
        {lang === "ar" ? "تواصل مباشرة عبر واتساب" : "Chat directly on WhatsApp"}
      </div>
    </aside>
  );
};

export default WhatsAppButton;
