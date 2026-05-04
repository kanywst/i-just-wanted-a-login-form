import { useState, useEffect, useRef } from "react";

export function useCountUp(
  target: number,
  shouldStart: boolean,
  duration: number = 2000,
  prefix: string = "",
  suffix: string = ""
) {
  const [display, setDisplay] = useState(`${prefix}0${suffix}`);
  const frameRef = useRef<number>(undefined);

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
      const current = Math.round(target * eased);

      setDisplay(`${prefix}${current.toLocaleString()}${suffix}`);

      if (progress < 1) {
        frameRef.current = requestAnimationFrame(animate);
      }
    }

    frameRef.current = requestAnimationFrame(animate);

    return () => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current);
    };
  }, [shouldStart, target, duration, prefix, suffix]);

  return { display };
}
