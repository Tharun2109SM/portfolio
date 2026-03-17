import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const chipsRef = useRef([]);
  const dotGridRef = useRef(null);
  const waveWrapRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 70%",
      }
    });

    tl.fromTo(textRef.current, 
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power4.out" }
    ).fromTo(paragraphRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    ).fromTo(chipsRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.15, ease: "back.out(1.7)" },
      "-=0.4"
    );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    if (!sectionRef.current || !dotGridRef.current || !waveWrapRef.current) return;
    const transitionTl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 85%",
        end: "top 30%",
        scrub: true,
      }
    });

    transitionTl
      .fromTo(
        dotGridRef.current,
        { opacity: 0.55, filter: 'blur(0px)', scale: 1 },
        { opacity: 0, filter: 'blur(12px)', scale: 1.06, ease: 'power2.out' }
      )
      .fromTo(
        waveWrapRef.current,
        { opacity: 0, filter: 'blur(18px)', scale: 0.98, clipPath: 'circle(0% at 50% 50%)' },
        { opacity: 1, filter: 'blur(0px)', scale: 1, clipPath: 'circle(160% at 50% 50%)', ease: 'power3.out' },
        0
      );

    return () => transitionTl.kill();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center relative z-20 overflow-hidden bg-black">
      {/* Background transition: dot grid -> interactive waves */}
      <div className="about-background">
        <div ref={dotGridRef} className="about-dot-grid">
          <DotGridBackground />
        </div>
        <div ref={waveWrapRef} className="about-wave-wrap">
          <WaveField />
        </div>
      </div>

      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left Column - Massive Display Text */}
        <div className="lg:col-span-7">
          <h2 ref={textRef} className="about-headline text-[10vw] lg:text-[8.5rem] leading-[0.85] tracking-tighter text-white m-0">
            I Build.<br/>
            I Play.<br/>
            I Create.
          </h2>
        </div>

        {/* Right Column - Body and Chips */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div ref={paragraphRef} className="about-paragraph text-xl md:text-2xl leading-relaxed text-white mb-12">
            <p className="mb-6">
              I am someone who creates — whether it's through lines of code, notes on a piano, or a rally on the court.
            </p>
            <p>
              When I'm not building digital experiences, you'll find me playing keyboard, smashing elegantly on the badminton court, or going on cycling rides. A devoted F1 fan and badminton enthusiast — precise in practice, open to improvisation.
            </p>
          </div>
          
          <div className="flex justify-start mt-4">
            <div 
              ref={el => chipsRef.current[0] = el}
              className="group relative flex items-center gap-4"
              data-interactive="true"
            >
              <div className="w-[3.5rem] h-[3.5rem] rounded-full border border-white/40 flex items-center justify-center text-white font-display text-2xl tracking-tighter shadow-lg group-hover:border-[#c8f135] group-hover:text-[#c8f135] transition-colors duration-300">
                TH.
              </div>
              <div className="font-display text-4xl uppercase tracking-tighter text-white">
                Tharun S M<span className="text-[#c8f135]">.</span>
              </div>
            </div>
          </div>
        </div>

      </div>

      <style jsx="true">{`
        @font-face {
          font-family: 'PP Watch';
          src: url('/fonts/PPWatch-Black.otf') format('opentype');
          font-weight: 900;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'PP Acma';
          src: url('/fonts/PPAcma-Light.otf') format('opentype');
          font-weight: 300;
          font-style: normal;
          font-display: swap;
        }

        @font-face {
          font-family: 'PP Watch';
          src: url('/fonts/PPWatch-Extralight.otf') format('opentype');
          font-weight: 200;
          font-style: normal;
          font-display: swap;
        }

        .about-headline {
          font-family: 'PP Watch', 'Bebas Neue', 'Helvetica Neue', Arial, sans-serif;
          font-weight: 900;
          text-transform: none;
        }

        .about-paragraph {
          font-family: 'PP Watch', 'Avenir', 'Avenir Next', 'Nunito Sans', 'Helvetica Neue', sans-serif;
          font-weight: 200;
          margin-top: 2.2rem;
        }

        .about-background {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
        }

        .about-dot-grid,
        .about-wave-wrap {
          position: absolute;
          inset: 0;
          will-change: opacity, transform, filter, clip-path;
        }

        .about-wave-wrap {
          opacity: 0;
          clip-path: circle(0% at 50% 50%);
        }

        .about-dot-grid canvas,
        .about-wave-wrap canvas {
          width: 100%;
          height: 100%;
          display: block;
        }
      `}</style>
    </section>
  );
}

function DotGridBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let dots = [];
    const dotColor = 'rgba(245, 242, 234, 0.35)';
    const mouse = { x: null, y: null, radius: 140 };

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
            const repel = force * 24;
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

  return <canvas ref={canvasRef} aria-hidden="true" />;
}

function WaveField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    const mouse = { x: null, y: null };
    const palette = ['#ff00b8', '#00c2ff', '#7a00ff', '#00ff85', '#ffe600', '#ff5f1f'];
    let width = 0;
    let height = 0;
    let time = 0;

    const waves = [
      { amplitude: 46, wavelength: 260, speed: 0.7, offset: -40, thickness: 3.4, glow: 18, colorShift: 0 },
      { amplitude: 36, wavelength: 220, speed: 0.55, offset: 0, thickness: 3, glow: 16, colorShift: 1.4 },
      { amplitude: 28, wavelength: 180, speed: 0.85, offset: 36, thickness: 2.6, glow: 14, colorShift: 2.6 }
    ];

    const hexToRgb = (hex) => {
      const raw = hex.replace('#', '');
      const bigint = parseInt(raw, 16);
      return {
        r: (bigint >> 16) & 255,
        g: (bigint >> 8) & 255,
        b: bigint & 255
      };
    };

    const lerp = (a, b, t) => a + (b - a) * t;

    const blendColor = (c1, c2, t) => {
      const col1 = hexToRgb(c1);
      const col2 = hexToRgb(c2);
      const r = Math.round(lerp(col1.r, col2.r, t));
      const g = Math.round(lerp(col1.g, col2.g, t));
      const b = Math.round(lerp(col1.b, col2.b, t));
      return `rgb(${r}, ${g}, ${b})`;
    };

    const resize = () => {
      const scale = window.devicePixelRatio || 1;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(scale, 0, 0, scale, 0, 0);
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

    const drawWave = (wave, index) => {
      const blendIndex = (time * 0.18 + wave.colorShift) % palette.length;
      const colorIdx = Math.floor(blendIndex);
      const blendT = blendIndex - colorIdx;
      const stroke = blendColor(palette[colorIdx], palette[(colorIdx + 1) % palette.length], blendT);

      ctx.strokeStyle = stroke;
      ctx.lineWidth = wave.thickness;
      ctx.shadowColor = stroke;
      ctx.shadowBlur = wave.glow;
      ctx.beginPath();

      const centerY = height * 0.5 + wave.offset;
      const pointerShift = mouse.y !== null ? (mouse.y - height * 0.5) * 0.08 : 0;
      const influenceRadius = 220;

      for (let x = 0; x <= width; x += 10) {
        let influence = 0;
        if (mouse.x !== null) {
          const dist = Math.abs(x - mouse.x);
          if (dist < influenceRadius) {
            influence = 1 - dist / influenceRadius;
          }
        }
        const amp = wave.amplitude * (1 + influence * 0.8);
        const phase = time * wave.speed + index;
        const y =
          centerY +
          pointerShift * (0.4 + influence * 0.6) +
          Math.sin(x / wave.wavelength + phase) * amp +
          Math.sin(x / (wave.wavelength * 0.5) + phase * 0.7) * (amp * 0.2);

        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = 'lighter';
      time += 0.012;
      waves.forEach((wave, index) => drawWave(wave, index));
      ctx.globalCompositeOperation = 'source-over';
      animationFrameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
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

  return <canvas ref={canvasRef} aria-hidden="true" />;
}
