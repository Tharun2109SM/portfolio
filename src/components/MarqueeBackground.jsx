import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function MarqueeBackground() {
  const containerRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // ScrollTrigger to move text horizontally based on scroll
    const scrollAnimation = gsap.to(textRef.current, {
      xPercent: -50,
      ease: "none",
      scrollTrigger: {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1, // Smooth scrubbing
      }
    });

    return () => {
      scrollAnimation.kill();
    };
  }, []);

  const words = "THARUN — MUSICIAN — MAKER — IN MOTION — ALWAYS LEARNING — ";
  const repeatedText = words.repeat(10); // Ensure it's wide enough for a huge screen

  return (
    <div 
      ref={containerRef}
      className="fixed top-1/2 -translate-y-1/2 left-0 w-full pointer-events-none z-[-1] overflow-hidden opacity-30 select-none mix-blend-multiply"
    >
      <div 
        ref={textRef} 
        className="whitespace-nowrap font-display text-[20vw] tracking-tighter"
        style={{
          color: 'transparent',
          WebkitTextStroke: '2px #e0e0e0', // Light gray outline
          width: 'max-content'
        }}
      >
        {repeatedText}
      </div>
    </div>
  );
}
