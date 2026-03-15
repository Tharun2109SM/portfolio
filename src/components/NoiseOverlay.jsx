export default function NoiseOverlay() {
  return (
    <div className="pointer-events-none fixed inset-0 z-[1000] h-full w-full opacity-[0.04] mix-blend-overlay">
      <svg className="absolute inset-0 h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)"></rect>
      </svg>
    </div>
  );
}
