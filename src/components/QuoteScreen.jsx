import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const toSentenceCase = (value) => {
  const trimmed = value.trim().toLowerCase();
  if (!trimmed) return '';
  const first = trimmed[0].toUpperCase() + trimmed.slice(1);
  return first.replace('c minor', 'C minor');
};

export default function QuoteScreen({ text, isFooter = false }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const [colorIndex, setColorIndex] = useState(0);
  const neonColors = ['#ff00b8', '#00c2ff', '#7a00ff', '#00ff85', '#ffe600', '#ff5f1f'];

  useEffect(() => {
    const pinDistance = isFooter ? "+=0%" : "+=140%";
    // Pin and reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: pinDistance, // hold longer so the full quote reads before next section
        pin: !isFooter, // Don't pin the footer quote because it's the very end
        scrub: true,
      }
    });

    if (!isFooter) {
      tl.fromTo(textRef.current, 
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5 }
      ).to(textRef.current, 
        { scale: 1.2, opacity: 0, duration: 0.5 }
      );
    } else {
      gsap.fromTo(textRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom bottom",
            scrub: true,
          }
        }
      );
    }

    return () => {
      if (tl) tl.kill();
      ScrollTrigger.getAll().forEach(t => t.refresh());
    };
  }, [isFooter]);

  return (
    <section 
      ref={sectionRef} 
      className={`flex items-center justify-center px-6 md:px-12 w-full bg-black ${isFooter ? 'min-h-screen pb-24' : 'min-h-[125vh] md:min-h-[120vh] py-0'}`}
      onPointerDown={() => setColorIndex((prev) => (prev + 1) % neonColors.length)}
      onTouchStart={() => setColorIndex((prev) => (prev + 1) % neonColors.length)}
    >
      <DotGridBackground triggerRef={sectionRef} />
      <div ref={textRef} className="quote-content max-w-6xl text-center w-full">
        <h2
          className="quote-title text-[10vw] md:text-[6.5rem] lg:text-[8rem] font-display leading-[0.85] tracking-tighter break-words px-4"
          style={{
            color: neonColors[colorIndex],
            textShadow: `0 0 3px ${neonColors[colorIndex]}, 0 0 8px ${neonColors[colorIndex]}`
          }}
        >
          {text.split('|').map((part, i, arr) => (
            <span key={i}>
              {toSentenceCase(part).replace(/\\./g, '.')}
              {i < arr.length - 1 && '.'}
              <br/>
            </span>
          ))}
        </h2>
      </div>

      <style jsx="true">{`
        .quote-content {
          position: relative;
          z-index: 1;
        }

        .quote-grid {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          opacity: 0;
          transition: opacity 0.9s ease;
        }

        .quote-grid.is-visible {
          opacity: 0.55;
        }

        @font-face {
          font-family: 'PP Acma';
          src: url('/fonts/PPAcma-Black.otf') format('opentype');
          font-weight: 900;
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

        .quote-title {
          font-family: 'PP Acma', 'PP Editorial New', 'EB Garamond', 'Times New Roman', serif;
          font-weight: 900;
          transition: color 0.5s ease, text-shadow 0.5s ease;
          text-transform: none;
        }
      `}</style>
    </section>
  );
}

function DotGridBackground({ triggerRef }) {
  const canvasRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

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

  useEffect(() => {
    if (!triggerRef?.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      {
        root: null,
        threshold: 0.2,
        rootMargin: '0px 0px -20% 0px'
      }
    );

    observer.observe(triggerRef.current);
    return () => observer.disconnect();
  }, [triggerRef]);

  return (
    <canvas
      ref={canvasRef}
      className={`quote-grid ${isVisible ? 'is-visible' : ''}`}
      aria-hidden="true"
    />
  );
}
