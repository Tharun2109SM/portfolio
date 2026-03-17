import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const bars = [
  { color: '#ff00b8' },
  { color: '#00c2ff' },
  { color: '#7a00ff' },
  { color: '#00ff85' },
  { color: '#ffe600' },
  { color: '#ff5f1f' },
  { color: '#00f0ff' }
];

const logoColors = ['#ff00b8', '#00c2ff', '#7a00ff', '#00ff85', '#ffe600', '#ff5f1f', '#00f0ff'];

export default function Hero() {
  const heroRef = useRef(null);
  const heroBodyRef = useRef(null);
  const heroNameRef = useRef(null);
  const [count, setCount] = useState(0);
  const [phase, setPhase] = useState('loading');
  const [isExpanded, setIsExpanded] = useState(false);
  const [nameScale, setNameScale] = useState(1);
  const [logoIndex, setLogoIndex] = useState(3);
  const descriptors = ['Designer', 'Builder', 'Creator'];
  const descriptorColors = ['#ff00b8', '#00c2ff', '#00ff85'];
  const [descriptorIndex, setDescriptorIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDescriptorIndex((prev) => (prev + 1) % descriptors.length);
    }, 2600);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const duration = 1800;
    const start = performance.now();
    let rafId;

    const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

    const tick = (now) => {
      const elapsed = Math.min(now - start, duration);
      const progress = easeInOut(elapsed / duration);
      const nextValue = Math.floor(progress * 100);
      setCount(nextValue);

      if (elapsed < duration) {
        rafId = requestAnimationFrame(tick);
      } else {
        setCount(100);
        setPhase('bars-in');
        const enterDelay = 900 + bars.length * 110;
        const holdDelay = 400;
        setTimeout(() => setPhase('bars-hold'), enterDelay);
        setTimeout(() => setPhase('bars-out'), enterDelay + holdDelay);
        setTimeout(() => setPhase('done'), enterDelay + holdDelay + 900);
      }
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % logoColors.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const handlePointerMove = (event) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    heroRef.current.style.setProperty('--cursor-x', `${x}px`);
    heroRef.current.style.setProperty('--cursor-y', `${y}px`);
  };

  useEffect(() => {
    const updateScale = () => {
      if (!heroBodyRef.current || !heroNameRef.current) return;
      const available = heroBodyRef.current.clientWidth - 48;
      const nameWidth = heroNameRef.current.scrollWidth || 1;
      const nextScale = Math.min(1, available / nameWidth);
      setNameScale(Number.isFinite(nextScale) ? nextScale : 1);
    };

    updateScale();
    const resizeObserver = new ResizeObserver(updateScale);
    if (heroBodyRef.current) resizeObserver.observe(heroBodyRef.current);
    if (heroNameRef.current) resizeObserver.observe(heroNameRef.current);
    if (document.fonts?.ready) {
      document.fonts.ready.then(updateScale);
    }
    window.addEventListener('resize', updateScale);
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [isExpanded]);

  return (
    <section
      ref={heroRef}
      className="hero-root"
      onPointerMove={handlePointerMove}
    >
      <PixelField />
      <div className={`intro-overlay ${phase}`}>
        <div className="loader">
          <div className="loader-pills">
            <span className="pill">CIAO</span>
            <span className="pill">HELLO</span>
          </div>
          <div className="loader-stack">
            <div className="loader-count">{count}%</div>
            <div className="loader-label">Loading</div>
          </div>
        </div>

        <div className="bars">
          {bars.map((bar, index) => (
            <div
              key={bar.color}
              className="bar"
              style={{
                backgroundColor: bar.color,
                '--delay-in': `${index * 0.1}s`,
                '--delay-out': `${(bars.length - 1 - index) * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      <div className={`hero-content ${phase === 'done' ? 'hero-reveal' : ''}`}>
        <nav className="hero-nav">
          <span className="nav-studio nav-link">Studio</span>
          <span className="nav-work nav-link">Work</span>
          <span className="nav-contact nav-link">Contact</span>
        </nav>

        <div className="hero-body" ref={heroBodyRef}>
          <div className="hero-logo-slot">
            <button
              type="button"
              className="hero-logo"
              aria-label="TH logo"
              onClick={() => setLogoIndex((prev) => (prev + 1) % logoColors.length)}
              style={{
                background: logoColors[logoIndex],
                boxShadow: `0 0 24px ${logoColors[logoIndex]}b3, 0 0 60px ${logoColors[logoIndex]}66`
              }}
            >
              TH.
            </button>
          </div>
          <div className="hero-intro">
            I am a{' '}
            <span
              className="hero-typewriter"
              aria-live="polite"
              style={{
                color: descriptorColors[descriptorIndex],
                textShadow: `0 0 10px ${descriptorColors[descriptorIndex]}66`
              }}
            >
              <span key={descriptorIndex} className="hero-typewriter-word">
                {descriptors[descriptorIndex]}.
              </span>
            </span>
          </div>
          <button
            type="button"
            className="hero-title hero-name"
            onClick={() => setIsExpanded((prev) => !prev)}
            data-expanded={isExpanded ? 'true' : 'false'}
            ref={heroNameRef}
            style={{ transform: `scale(${nameScale})` }}
          >
            <span className="hero-name-base">THARUN</span>
            <motion.span
              className="hero-name-extra"
              animate={isExpanded ? 'open' : 'closed'}
              variants={{
                closed: { x: '-0.6em', opacity: 0, clipPath: 'inset(0 100% 0 0)' },
                open: { x: '0em', opacity: 1, clipPath: 'inset(0 0% 0 0)' }
              }}
              transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            >
              .S.M
            </motion.span>
          </button>
          <div className="hero-estd">ESTD.2007</div>
        </div>
      </div>

      <div className="hero-corner-text">
        out of CHENNAI , around the WORLD
      </div>

      <style jsx="true">{`
        @font-face {
          font-family: 'Neue Machina Inktrap';
          src: url('/fonts/PPNeueMachina-InktrapRegular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Neue Machina Inktrap';
          src: url('/fonts/PPNeueMachina-InktrapUltrabold.otf') format('opentype');
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Neue Machina Inktrap';
          src: url('/fonts/PPNeueMachina-InktrapLight.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Neue Machina Inktrap';
          src: url('/fonts/PPNeueMachina-InktrapUltraboldItalic.otf') format('opentype');
          font-weight: 800;
          font-style: italic;
          font-display: swap;
        }

        @font-face {
          font-family: 'Neue Machina Inktrap';
          src: url('/fonts/PPNeueMachina-InktrapLightItalic.otf') format('opentype');
          font-weight: 300;
          font-style: italic;
          font-display: swap;
        }

        @font-face {
          font-family: 'Neue Machina Plain';
          src: url('/fonts/PPNeueMachina-PlainRegular.otf') format('opentype');
          font-weight: 400;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'Neue Machina Plain';
          src: url('/fonts/PPNeueMachina-PlainLightItalic.otf') format('opentype');
          font-weight: 300;
          font-style: italic;
          font-display: swap;
        }

        @font-face {
          font-family: 'PP Editorial New';
          src: url('/fonts/PPEditorialNew-Ultrabold.otf') format('opentype');
          font-weight: 800;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'PP Editorial New';
          src: url('/fonts/PPEditorialNew-Ultralight.otf') format('opentype');
          font-weight: 200;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'PP Editorial New';
          src: url('/fonts/PPEditorialNew-Italic.otf') format('opentype');
          font-weight: 400;
          font-style: italic;
          font-display: swap;
        }

        .hero-root {
          min-height: 100vh;
          position: relative;
          overflow: hidden;
          background: #000;
          color: #f5f2ea;
          font-family: 'Neue Machina Inktrap', 'EB Garamond', 'Times New Roman', serif;
          --cursor-x: 50%;
          --cursor-y: 50%;
        }

        .hero-pixels {
          position: absolute;
          inset: 0;
          z-index: 1;
          pointer-events: none;
          opacity: 0.55;
          mix-blend-mode: normal;
        }

        .intro-overlay {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          background: #000;
          transition: opacity 0.6s ease;
        }

        .intro-overlay.done {
          opacity: 0;
          pointer-events: none;
        }

        .loader {
          position: absolute;
          inset: 0;
          z-index: 2;
          color: #f5f2ea;
        }

        .loader-pills {
          position: absolute;
          left: 4vw;
          top: 4vh;
          display: flex;
          gap: 0.6rem;
          font-size: 0.7rem;
          letter-spacing: 0.2em;
          text-transform: uppercase;
          font-weight: 400;
          font-family: 'Neue Machina Inktrap', 'EB Garamond', 'Times New Roman', serif;
        }

        .loader-pills .pill {
          border: 1px solid rgba(245, 242, 234, 0.85);
          padding: 0.3rem 0.8rem;
          border-radius: 999px;
          line-height: 1;
        }

        .loader-stack {
          position: absolute;
          right: 4vw;
          bottom: 4vh;
          text-align: right;
        }

        .loader-count {
          font-family: 'Neue Machina Inktrap', 'EB Garamond', 'Times New Roman', serif;
          font-size: clamp(3.5rem, 8vw, 7rem);
          font-weight: 800;
          line-height: 1;
        }

        .loader-label {
          margin-top: 1rem;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 0.6em;
          font-weight: 300;
          font-family: 'Neue Machina Inktrap', 'EB Garamond', 'Times New Roman', serif;
        }

        .bars {
          position: absolute;
          inset: 0;
          display: grid;
          grid-template-rows: repeat(${bars.length}, 1fr);
          z-index: 1;
          opacity: 0;
          transition: opacity 0.2s ease;
        }

        .bar {
          transform: translateY(100%);
          transition: transform 0.85s cubic-bezier(0.76, 0, 0.24, 1);
        }

        .intro-overlay.bars-in .bar {
          transform: translateY(0%);
          transition-delay: var(--delay-in);
        }

        .intro-overlay.bars-in .bars,
        .intro-overlay.bars-hold .bars,
        .intro-overlay.bars-out .bars {
          opacity: 1;
        }

        .intro-overlay.bars-hold .bar {
          transform: translateY(0%);
        }

        .intro-overlay.bars-out .bar {
          transform: translateY(-100%);
          transition-delay: var(--delay-out);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          min-height: 100vh;
          padding: 3rem 4vw;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          opacity: 0;
          transform: translateY(30px);
          transition: opacity 0.9s ease, transform 0.9s ease;
          overflow-x: visible;
        }

        .hero-content.hero-reveal {
          opacity: 1;
          transform: translateY(0);
        }

        .hero-nav {
          display: flex;
          justify-content: space-between;
          text-transform: uppercase;
          font-size: 0.7rem;
          letter-spacing: 0.4em;
          font-weight: 300;
          color: #00f0ff;
        }

        .nav-link {
          position: relative;
          padding-bottom: 0.4rem;
        }

        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 2px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.35s ease;
        }

        .nav-link:hover::after {
          transform: scaleX(1);
        }

        .nav-studio {
          color: #ff00b8;
          text-shadow: 0 0 10px rgba(255, 0, 184, 0.6), 0 0 22px rgba(255, 0, 184, 0.35);
        }

        .nav-work {
          color: #00c2ff;
          text-shadow: 0 0 10px rgba(0, 194, 255, 0.6), 0 0 22px rgba(0, 194, 255, 0.35);
        }

        .nav-contact {
          color: #ffe600;
          text-shadow: 0 0 10px rgba(255, 230, 0, 0.6), 0 0 22px rgba(255, 230, 0, 0.35);
        }

        .hero-logo-slot {
          display: flex;
          align-items: center;
        }

        .hero-logo {
          width: clamp(3rem, 6vw, 4.5rem);
          height: clamp(3rem, 6vw, 4.5rem);
          border-radius: 999px;
          color: #050505;
          display: grid;
          place-items: center;
          font-family: 'Neue Machina Inktrap', 'EB Garamond', 'Times New Roman', serif;
          font-size: clamp(1rem, 2vw, 1.6rem);
          font-weight: 800;
          letter-spacing: 0.02em;
          z-index: 3;
          border: none;
          cursor: pointer;
          transition: transform 0.25s ease;
          animation: hero-logo-spin 5s linear infinite;
        }

        .hero-logo:hover {
          transform: scale(1.05);
        }

        @keyframes hero-logo-spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        .hero-corner-text {
          position: absolute;
          right: 3vw;
          bottom: 4vh;
          font-family: 'Neue Machina Plain', 'PP Editorial New', 'EB Garamond', 'Times New Roman', serif;
          font-weight: 300;
          font-style: italic;
          font-size: 0.55rem;
          letter-spacing: 0.28em;
          text-transform: uppercase;
          color: rgba(245, 242, 234, 0.55);
        }

        .hero-body {
          max-width: 80rem;
          margin-bottom: 6vh;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
          overflow: visible;
          margin-left: -1.5vw;
          margin-top: 7vh;
        }

        .hero-intro {
          font-family: 'Neue Machina Plain', 'PP Editorial New', 'EB Garamond', 'Times New Roman', serif;
          font-weight: 400;
          font-size: clamp(1.6rem, 4vw, 3.2rem);
          letter-spacing: 0.04em;
          text-transform: none;
          color: rgba(245, 242, 234, 0.7);
        }

        .hero-typewriter {
          position: relative;
          display: inline-block;
          margin-left: 0.4rem;
          min-width: 7.5ch;
        }

        .hero-typewriter-word {
          display: inline-block;
          animation: wordFlip 2.6s ease-in-out infinite;
        }

        .hero-typewriter::after {
          content: '';
          position: absolute;
          right: -0.6rem;
          top: 10%;
          width: 2px;
          height: 80%;
          background: rgba(245, 242, 234, 0.7);
          animation: caretBlink 1s steps(1, end) infinite;
        }

        @keyframes wordFlip {
          0% {
            opacity: 0;
            transform: translateY(8px) rotateX(25deg);
          }
          15%,
          70% {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
          100% {
            opacity: 0;
            transform: translateY(-8px) rotateX(-25deg);
          }
        }

        @keyframes caretBlink {
          0%,
          45% {
            opacity: 1;
          }
          50%,
          100% {
            opacity: 0;
          }
        }


        .hero-title {
          font-family: 'Neue Machina Inktrap', 'PP Editorial New', 'EB Garamond', 'Times New Roman', serif;
          font-size: clamp(3.6rem, 11vw, 11.5rem);
          text-transform: uppercase;
          letter-spacing: -0.01em;
          line-height: 1;
          font-weight: 800;
          font-style: italic;
          color: #f5f2ea;
          padding-top: 0.04em;
          padding-bottom: 0.02em;
        }

        @media (max-width: 1100px) {
          .hero-title {
            font-size: clamp(3rem, 10.5vw, 10rem);
          }
        }

        @media (max-width: 880px) {
          .hero-title {
            font-size: clamp(2.6rem, 9.5vw, 9rem);
          }
        }

        .hero-name {
          background: none;
          border: none;
          padding: 0;
          color: #f5f2ea;
          cursor: pointer;
          text-align: left;
          position: relative;
          display: inline-flex;
          align-items: baseline;
          white-space: nowrap;
          overflow: visible;
          transform-origin: left center;
          transition: transform 0.45s ease, width 0.45s ease;
          max-width: 100%;
        }

        .hero-name:focus-visible {
          outline: 1px solid rgba(245, 242, 234, 0.4);
          outline-offset: 6px;
        }

        .hero-name-base {
          display: inline-block;
        }

        .hero-name-extra {
          display: inline-block;
          overflow: hidden;
          margin-left: 0.05em;
          white-space: nowrap;
        }

        .hero-estd {
          font-family: 'Neue Machina Inktrap', 'PP Editorial New', 'EB Garamond', 'Times New Roman', serif;
          font-style: italic;
          font-weight: 300;
          font-size: clamp(0.9rem, 2vw, 1.2rem);
          letter-spacing: 0.32em;
          text-transform: uppercase;
          color: rgba(245, 242, 234, 0.6);
        }

        @media (max-width: 768px) {
          .hero-content {
            padding: 2.5rem 7vw;
          }

          .hero-nav {
            letter-spacing: 0.25em;
          }
        }
      `}</style>
    </section>
  );
}

function PixelField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let dots = [];
    const dotColor = 'rgba(245, 242, 234, 0.35)';
    const mouse = { x: null, y: null, radius: 120 };

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * scale;
      canvas.height = window.innerHeight * scale;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);

      const spacing = window.innerWidth < 768 ? 34 : 32;
      const radius = window.innerWidth < 768 ? 2.2 : 2.6;
      dots = [];
      for (let y = spacing / 2; y < window.innerHeight; y += spacing) {
        for (let x = spacing / 2; x < window.innerWidth; x += spacing) {
          dots.push({
            x,
            y,
            baseX: x,
            baseY: y,
            radius
          });
        }
      }
    };

    const handlePointerMove = (event) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = event.clientX - rect.left;
      mouse.y = event.clientY - rect.top;
    };

    const handlePointerLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };

    const update = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const dot of dots) {
        let offsetX = 0;
        let offsetY = 0;
        if (mouse.x !== null && mouse.y !== null) {
          const dx = dot.baseX - mouse.x;
          const dy = dot.baseY - mouse.y;
          const distance = Math.hypot(dx, dy);
          if (distance < mouse.radius && distance > 0.001) {
            const force = (mouse.radius - distance) / mouse.radius;
            const repel = force * 22;
            offsetX = (dx / distance) * repel;
            offsetY = (dy / distance) * repel;
          }
        }

        const targetX = dot.baseX + offsetX;
        const targetY = dot.baseY + offsetY;
        dot.x += (targetX - dot.x) * 0.08;
        dot.y += (targetY - dot.y) * 0.08;

        ctx.fillStyle = dotColor;
        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      animationFrameId = requestAnimationFrame(update);
    };

    resize();
    update();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return <canvas ref={canvasRef} className="hero-pixels" aria-hidden="true" />;
}
