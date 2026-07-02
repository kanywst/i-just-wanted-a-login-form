import { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';

interface StatCounterProps {
  target: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}

/**
 * A number that counts up from 0 the first time it scrolls into view.
 * Reuses the rAF easing in useCountUp; renders inline so it can sit
 * inside a headline.
 */
export function StatCounter({
  target,
  prefix = '',
  suffix = '',
  duration = 2000,
  className = '',
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' as `${number}px` });
  const { display } = useCountUp(target, isInView, duration, prefix, suffix);

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  );
}
