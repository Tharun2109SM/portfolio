import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function QuoteScreen({ text, isFooter = false }) {
  const sectionRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    // Pin and reveal animation
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top top",
        end: "+=100%", // pin for a full screen height
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

  // Use a dark background for contrast breaks in the light theme
  return (
    <section 
      ref={sectionRef} 
      className={`min-h-screen flex items-center justify-center px-6 md:px-12 w-full bg-[#111111] ${isFooter ? 'pb-24' : ''}`}
    >
      <div ref={textRef} className="max-w-6xl text-center w-full">
        <h2 className="text-[12vw] md:text-[8rem] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-[#c8f135] uppercase break-words px-4">
          {text.split('|').map((part, i, arr) => (
            <span key={i}>
              {part.trim()}
              {i < arr.length - 1 && '.'}
              <br/>
            </span>
          ))}
        </h2>
      </div>
    </section>
  );
}
