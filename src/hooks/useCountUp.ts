import { useState, useEffect, useRef } from "react";

// Number of decimal places in a target (0 for integers). Used so a
// fractional target like 6.5 keeps its decimals instead of rounding to 7.
function decimalsOf(n: number): number {
  if (Number.isInteger(n)) return 0;
  const parts = String(n).split(".");
  return parts[1]?.length ?? 0;
}

// Shared formatter so the animated path and any static (reduced-motion)
// path render an identical string for the same value.
export function formatCount(
  value: number,
  prefix = "",
  suffix = "",
  decimals = 0
): string {
  const n = value.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
  return `${prefix}${n}${suffix}`;
}

// Format a final target with its natural number of decimals — the value a
// counter would settle on. Lets a static render match the animated result.
export function formatTarget(target: number, prefix = "", suffix = ""): string {
  return formatCount(target, prefix, suffix, decimalsOf(target));
}

export function useCountUp(
  target: number,
  shouldStart: boolean,
  duration: number = 2000,
  prefix: string = "",
  suffix: string = ""
) {
  const decimals = decimalsOf(target);
  const [display, setDisplay] = useState(formatCount(0, prefix, suffix, decimals));
  const frameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!shouldStart) return;

    let startTime: number | null = null;

    function animate(currentTime: number) {
      // Anchor startTime to the first rAF tick so it shares a clock with
      // currentTime. performance.now() is a different reference in some
      // environments (jsdom, certain mobile browsers under throttling) and
      // would yield negative elapsed and a wildly wrong eased value.
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(Math.max(elapsed / duration, 0), 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = target * eased;

      setDisplay(formatCount(current, prefix, suffix, decimals));

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [shouldStart, target, duration, prefix, suffix, decimals]);

  return { display };
}
