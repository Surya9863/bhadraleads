import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  className?: string;
};

/** Consistent eyebrow + heading + description lockup for every section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  tone = "light",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const dark = tone === "dark";

  return (
    <div className={cn("max-w-3xl", isCenter && "mx-auto text-center", className)}>
      <span className="eyebrow">
        <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
        {eyebrow}
        <span className="h-px w-8 bg-gold/70" aria-hidden="true" />
      </span>

      <h2
        className={cn(
          "font-display mt-5 text-3xl font-bold leading-[1.12] tracking-tight sm:text-4xl lg:text-[2.75rem]",
          dark ? "text-white" : "heading-gradient"
        )}
      >
        {title}
      </h2>

      {description ? (
        <p
          className={cn(
            "mt-5 text-base leading-relaxed sm:text-lg",
            dark ? "text-white/70" : "text-muted"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}
