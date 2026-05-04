interface LogoPairProps {
  src: string;
  alt: string;
  text: string;
}

export function LogoPair({ src, alt, text }: LogoPairProps) {
  return (
    <div className="border-2 border-zinc-800 bg-zinc-950 flex flex-col items-center justify-center aspect-square transition-all duration-300 hover:border-[var(--color-error)] hover:scale-105 hover:-rotate-2 group relative overflow-hidden">
      <div className="absolute inset-0 bg-red-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      <img
        src={src}
        alt={alt}
        width={64}
        height={64}
        loading="lazy"
        decoding="async"
        className="w-16 h-16 object-contain filter grayscale contrast-125 transition-all duration-300 group-hover:grayscale-0 group-hover:contrast-100 relative z-10"
      />
      <span className="text-sm mt-4 text-zinc-400 font-mono relative z-10 group-hover:text-white">{text}</span>
    </div>
  );
}
