import type { SyntheticEvent } from 'react';

// A self-contained placeholder so a missing logo degrades to a neutral
// glyph instead of a broken-image icon. No external network dependency.
const FALLBACK_SRC =
  'data:image/svg+xml;charset=utf-8,' +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64">
      <rect width="64" height="64" fill="#18181b" stroke="#3f3f46"/>
      <text x="32" y="41" font-family="monospace" font-size="28" fill="#52525b" text-anchor="middle">?</text>
    </svg>`,
  );

/**
 * onError handler for logo <img>s. Swaps a failed load for an inline
 * placeholder exactly once (guarded so it can't loop).
 */
export function handleLogoError(e: SyntheticEvent<HTMLImageElement>) {
  const img = e.currentTarget;
  if (img.dataset.fallback) return;
  img.dataset.fallback = 'true';
  img.src = FALLBACK_SRC;
}
