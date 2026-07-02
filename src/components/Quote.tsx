import type { ReactNode } from 'react';

type Tone = 'terminal' | 'error';

interface QuoteProps {
  children: ReactNode;
  /** Border/text accent. Defaults to the terminal green. */
  tone?: Tone;
  /** Optional attribution shown under the quote (e.g. a source). */
  cite?: ReactNode;
  className?: string;
}

const toneStyles: Record<Tone, string> = {
  terminal: 'text-[var(--color-terminal)] border-[var(--color-terminal)] bg-zinc-900/50',
  error: 'text-[var(--color-error)] border-[var(--color-error)] bg-red-950/20',
};

/**
 * The recurring "someone said this to you" narrative quote block.
 * Standardizes the border-left + padding + accent pattern that was
 * previously copy-pasted across sections.
 */
export function Quote({ children, tone = 'terminal', cite, className = '' }: QuoteProps) {
  return (
    <blockquote
      className={`border-l-4 pl-6 py-4 text-left mx-auto max-w-4xl leading-relaxed ${toneStyles[tone]} ${className}`}
    >
      {children}
      {cite && (
        <footer className="mt-3 text-sm text-zinc-500 not-italic tracking-wide">
          — <cite>{cite}</cite>
        </footer>
      )}
    </blockquote>
  );
}
