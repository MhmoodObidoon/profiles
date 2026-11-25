import Reveal from "@/components/Reveal";

interface SectionHeaderProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  eyebrowTone?: "primary" | "indigo" | "accent";
}

const tones = {
  primary: {
    badge: "bg-primary/10 text-primary border border-primary/25",
  },
  indigo: {
    badge: "bg-cyan-500/10 text-cyan-700 dark:text-cyan-400 border border-cyan-500/25",
  },
  accent: {
    badge: "bg-amber-500/10 text-amber-700 dark:text-amber-400 border border-amber-500/25",
  },
};

const SectionHeader = ({ eyebrow, title, subtitle, eyebrowTone = "primary" }: SectionHeaderProps) => {
  const tone = tones[eyebrowTone] || tones.primary;

  return (
    <Reveal>
      <div className="text-center mb-12 space-y-3">
        {eyebrow && (
          <div>
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${tone.badge}`}>
              {eyebrow}
            </span>
          </div>
        )}

        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground tracking-normal">
          {title}
        </h2>

        {subtitle && (
          <p className="text-muted-foreground text-sm md:text-base max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}
      </div>
    </Reveal>
  );
};

export default SectionHeader;

