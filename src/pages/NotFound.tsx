import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { useLang } from "@/i18n/LangContext";

const NotFound = () => {
  const location = useLocation();
  const { t } = useLang();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-extrabold text-primary">{t.notFound.title}</h1>
        <p className="mb-6 text-xl text-muted-foreground">{t.notFound.message}</p>
        <a
          href="/"
          className="inline-block rounded-lg border border-primary/60 bg-primary/10 px-6 py-3 font-semibold text-primary hover:bg-primary/20 transition-colors"
        >
          {t.notFound.back}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
