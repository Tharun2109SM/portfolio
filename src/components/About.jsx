import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const paragraphRef = useRef(null);
  const chipsRef = useRef([]);

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

  return (
    <section ref={sectionRef} id="about" className="min-h-screen py-32 px-6 md:px-12 w-full flex flex-col justify-center relative z-20 overflow-hidden bg-[#fafaf8]">
      {/* Background generic waveform */}
      <div className="absolute inset-0 opacity-5 pointer-events-none flex items-center justify-center">
        <WaveformGraphic />
      </div>

      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-8 items-center relative z-10">
        
        {/* Left Column - Massive Display Text */}
        <div className="lg:col-span-7">
          <h2 ref={textRef} className="text-[12vw] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-[#0d0d0d] uppercase m-0">
            I BUILD.<br/>
            I PLAY.<br/>
            I CREATE.
          </h2>
        </div>

        {/* Right Column - Body and Chips */}
        <div className="lg:col-span-5 flex flex-col justify-center">
          <div ref={paragraphRef} className="text-xl md:text-2xl font-subscript font-light leading-relaxed text-[#0d0d0d] mb-12">
            <p className="mb-6">
              I am someone who creates — whether it's through lines of code, chords on a keyboard, or motion on a court.
            </p>
            <p>
              When I'm not building digital experiences, you'll find me watching <strong className="font-bold">F1</strong>, smashing elegantly on the <strong className="font-bold">badminton</strong> court, <strong className="font-bold">cycling</strong>, or picking up a tennis racket to learn something new. Precise in practice; open to improvisation.
            </p>
          </div>
          
          <div className="flex justify-start mt-4">
            <div 
              ref={el => chipsRef.current[0] = el}
              className="group relative flex items-center gap-4"
              data-interactive="true"
            >
              <div className="w-[3.5rem] h-[3.5rem] rounded-full bg-[#111] flex items-center justify-center text-white font-display text-2xl tracking-tighter shadow-lg group-hover:bg-[#c8f135] group-hover:text-[#111] transition-colors duration-300">
                TH.
              </div>
              <div className="font-display text-4xl uppercase tracking-tighter text-[#111]">
                Tharun S M<span className="text-[#c8f135]">.</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

function WaveformGraphic() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 1000 300" preserveAspectRatio="none">
      <motion.path
        d="M0,150 Q50,50 100,150 T200,150 T300,150 T400,150 T500,150 T600,150 T700,150 T800,150 T900,150 T1000,150"
        fill="none"
        stroke="#0d0d0d"
        strokeWidth="4"
        animate={{
          d: [
            "M0,150 Q50,50 100,150 T200,150 T300,150 T400,150 T500,150 T600,150 T700,150 T800,150 T900,150 T1000,150",
            "M0,150 Q50,250 100,150 T200,150 T300,150 T400,150 T500,150 T600,150 T700,150 T800,150 T900,150 T1000,150",
            "M0,150 Q50,50 100,150 T200,150 T300,150 T400,150 T500,150 T600,150 T700,150 T800,150 T900,150 T1000,150"
          ]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
    </svg>
  );
}
