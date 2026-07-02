import { useState } from 'react';
import type { ImgHTMLAttributes } from 'react';

// A self-contained placeholder so a missing logo degrades to a neutral
// glyph instead of a broken-image icon. No external network dependency.
export const FALLBACK_SRC =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="#18181b" stroke="#3f3f46"/>
      <text x="32" y="41" font-family="monospace" font-size="28" fill="#52525b" text-anchor="middle">?</text>
    </svg>`,
  );

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement> & { src: string };

/**
 * An <img> that swaps to an inline placeholder if the source fails to load.
 * The fallback is driven by React state (not a direct DOM mutation), so it
 * survives re-renders and can't loop: once `failed` is set, the src is the
 * data URI, and a further error just re-sets the same state (a no-op).
 */
export function SafeImage({ src, ...rest }: SafeImageProps) {
  const [failed, setFailed] = useState(false);
  return (
    <img
      {...rest}
      src={failed ? FALLBACK_SRC : src}
      onError={() => setFailed(true)}
    />
  );
}
