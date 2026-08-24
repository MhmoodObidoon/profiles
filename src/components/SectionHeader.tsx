import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  eyebrow: string;
  title: string;
  subtitle?: string;
  eyebrowTone?: "primary" | "indigo" | "accent";
}

const tones = {
  primary: {
    text: "text-primary font-bold",
    line: "bg-primary/60",
  },
  indigo: {
    text: "text-cyan-600 dark:text-cyan-400 font-bold",
    line: "bg-cyan-500/60",
  },
  accent: {
    text: "text-accent font-bold",
    line: "bg-accent/60",
  },
};

const SectionHeader = ({ eyebrow, title, subtitle, eyebrowTone = "primary" }: SectionHeaderProps) => {
  const tone = tones[eyebrowTone];

  return (
    <Reveal>
      <div className="text-center mb-14 space-y-3">
        <span className={`inline-flex items-center gap-3 ${tone.text} text-xs md:text-sm font-extrabold tracking-widest uppercase`}>
          <span className={`h-px w-8 ${tone.line}`} aria-hidden />
          {eyebrow}
          <span className={`h-px w-8 ${tone.line}`} aria-hidden />
        </span>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-foreground tracking-tight">
          {title}
        </h2>

        {subtitle && (
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed pt-1">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default SectionHeader;

