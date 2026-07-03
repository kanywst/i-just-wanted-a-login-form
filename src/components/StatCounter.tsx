import { useRef } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { useCountUp, formatTarget } from '../hooks/useCountUp';

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
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });
  // Skip the rAF loop entirely under reduced motion — we render the static
  // value below, so there's no reason to spin the animation in the background.
  const { display } = useCountUp(target, reduceMotion ? false : isInView, duration, prefix, suffix);

  return (
    <span ref={ref} className={className}>
      {reduceMotion ? formatTarget(target, prefix, suffix) : display}
    </span>
  );
}
