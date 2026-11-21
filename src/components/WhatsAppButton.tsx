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
        className="flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white shadow-md hover:bg-[#20ba59] active:scale-95 transition-transform duration-200"
      >
        <MessageCircle className="w-6 h-6" />
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
