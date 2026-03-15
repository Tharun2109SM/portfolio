import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ImageReveal({ src, alt, className, delay = 0 }) {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 90%", // Start revealing slightly earlier
        end: "top 30%",
        scrub: 1.5, // Smoother scrub
      }
    });

    // Start with a bottom-up horizontal slice reveal using clipPath
    tl.fromTo(imageRef.current,
      { 
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)", 
        scale: 1.3,
        filter: "brightness(0.2) contrast(1.5)"
      },
      { 
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", 
        scale: 1, 
        filter: "brightness(1) contrast(1.1)",
        ease: "power2.out" 
      }
    );

    return () => tl.kill();
  }, []);

  return (
    <div ref={containerRef} className={`relative overflow-hidden bg-[#0d0d0d] ${className}`}>
      <img ref={imageRef} src={src} alt={alt} className="w-full h-full object-cover origin-center" />
    </div>
  );
}
