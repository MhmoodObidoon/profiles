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
      <div className="text-center mb-12 space-y-2.5">
        <span className={`inline-flex items-center gap-2.5 ${tone.text} text-xs md:text-sm font-semibold tracking-normal`}>
          <span className={`h-px w-6 ${tone.line}`} aria-hidden />
          {eyebrow}
          <span className={`h-px w-6 ${tone.line}`} aria-hidden />
        </span>

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-normal">
          {title}
        </h2>

        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed pt-0.5">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default SectionHeader;

