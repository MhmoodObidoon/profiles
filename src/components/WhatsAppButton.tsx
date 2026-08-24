import { MessageCircle } from "lucide-react";
import { useLang } from "@/i18n/LangContext";

const WHATSAPP_NUMBER = "967772944392";

const WhatsAppButton = () => {
  const { t } = useLang();

  return (
    <a
      href={`https://wa.me/${WHATSAPP_NUMBER}`}
      target="_blank"
      rel="noreferrer"
      aria-label={t.whatsapp}
      className="fixed bottom-6 left-6 z-50 p-4 rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 hover:shadow-2xl transition-all"
    >
      <MessageCircle className="w-7 h-7" />
    </a>
  );
};

export default WhatsAppButton;
