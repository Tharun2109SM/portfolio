import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Sports() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const badmintonCardRef = useRef(null);
  const tennisCardRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" }
    ).fromTo(badmintonCardRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.4"
    ).fromTo(tennisCardRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );

    return () => tl.kill();
  }, []);

  return (
    <section ref={sectionRef} id="sports" className="py-32 px-6 md:px-12 w-full flex flex-col justify-center relative z-20 bg-[#fafaf8]">
      <div className="max-w-[90rem] mx-auto w-full">
        <h2 ref={titleRef} className="text-[12vw] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-[#0d0d0d] uppercase m-0 mb-16">
          IN MOTION
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 w-full">
          {/* Badminton Card - Dark, Confident */}
          <div 
            ref={badmintonCardRef}
            className="relative rounded-[2rem] bg-[#111111] p-10 md:p-14 overflow-hidden group shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            data-interactive="true"
          >
            {/* Badminton CSS Animation bg */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-30 mix-blend-screen">
              <div className="absolute top-[60%] left-[-10%] w-0 h-0 border-l-[10px] border-r-[10px] border-b-[20px] border-transparent border-b-[#ffffff]/40 rounded-full animate-shuttle blur-[1px] shadow-[0_0_15px_#ffffff]" />
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-5xl md:text-7xl font-display mb-2 text-white">Badminton</h3>
              <p className="text-[#c8f135] font-subscript text-sm uppercase tracking-[0.2em] mb-12 font-bold">Astrox 99 Pro</p>
              
              <div className="mt-auto space-y-6">
                <div className="flex justify-between items-center border-b border-[#333333] pb-4">
                  <span className="text-[#888888] text-sm uppercase tracking-wider font-subscript">Status</span>
                  <span className="text-white font-subscript font-medium uppercase tracking-widest text-sm">Competitive</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#333333] pb-4">
                  <span className="text-[#888888] text-sm uppercase tracking-wider font-subscript">Play Style</span>
                  <span className="text-white font-subscript font-medium uppercase tracking-widest text-sm">Aggressive</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[#888888] text-sm uppercase tracking-wider font-subscript">Fav Shot</span>
                  <span className="text-[#c8f135] font-subscript font-bold uppercase tracking-widest text-sm">Jump Smash</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tennis Card - Brighter, Energetic */}
          <div 
            ref={tennisCardRef}
            className="relative rounded-[2rem] bg-[#f0ece0] border-2 border-[#111111] p-10 md:p-14 overflow-hidden group transition-transform duration-500 hover:-translate-y-2"
            data-interactive="true"
          >
            {/* Tennis CSS Animation bg */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-40">
              <div className="absolute top-[80%] left-[-10%] w-8 h-8 bg-[#c8f135] rounded-full animate-tennis-bounce blur-[1px] shadow-[0_0_15px_rgba(200,241,53,0.8)]" />
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-5xl md:text-7xl font-display mb-2 text-[#0d0d0d]">Tennis</h3>
              <p className="text-[#0d0d0d] font-subscript text-sm uppercase tracking-[0.2em] mb-10 font-bold opacity-70">Exploring</p>
              
              <div className="mt-auto">
                <p className="text-2xl md:text-3xl text-[#0d0d0d] font-sans font-bold leading-tight mb-12 italic">
                  "Just started, loving every second. The mechanics are different, but the rhythm is the same."
                </p>

                <div>
                  {/* Progress section removed */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes shuttle {
          0% { transform: translate(0, 0) scale(1) rotate(45deg); opacity: 0; }
          10% { opacity: 1; }
          40% { transform: translate(150px, -200px) scale(0.6) rotate(100deg); }
          60% { transform: translate(300px, -100px) scale(0.4) rotate(140deg); }
          90% { opacity: 1; }
          100% { transform: translate(450px, 100px) scale(1) rotate(180deg); opacity: 0; }
        }
        
        @keyframes tennis-bounce {
          0% { transform: translate(0, 0); }
          25% { transform: translate(100px, -150px) scaleY(1.1); }
          50% { transform: translate(200px, 0) scaleY(0.9); }
          75% { transform: translate(300px, -80px) scaleY(1.05); }
          100% { transform: translate(400px, 0) scaleY(0.95); }
        }

        .animate-shuttle {
          animation: shuttle 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) infinite;
        }

        .animate-tennis-bounce {
          animation: tennis-bounce 3s cubic-bezier(0.3, 0.1, 0.3, 1) infinite linear;
        }
      `}</style>
    </section>
  );
}
