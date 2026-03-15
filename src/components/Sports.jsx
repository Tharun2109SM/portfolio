import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Sports() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const badmintonCardRef = useRef(null);
  const tennisCardRef = useRef(null);
  const cyclingCardRef = useRef(null);

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
    ).fromTo(cyclingCardRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12 w-full">
          {/* Badminton Card - Dark, Confident */}
          <div 
            ref={badmintonCardRef}
            className="relative rounded-[2rem] bg-[#111111] p-10 md:p-14 overflow-hidden group shadow-2xl transition-transform duration-500 hover:-translate-y-2"
            data-interactive="true"
          >
            {/* Badminton CSS Animation bg */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-40 mix-blend-screen">
              <div className="absolute top-[20%] right-[15%] w-0 h-0 border-l-[12px] border-r-[12px] border-b-[24px] border-transparent border-b-[#c8f135]/60 rounded-full animate-subtle-float blur-[1px] shadow-[0_0_20px_#c8f135]" />
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
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-60">
              <div className="absolute top-[25%] right-[20%] w-10 h-10 bg-[#c8f135] rounded-full animate-subtle-bounce blur-[1px] shadow-[0_10px_20px_rgba(200,241,53,0.6)]" />
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
          {/* Cycling Card - Sleek, Dynamic */}
          <div 
            ref={cyclingCardRef}
            className="relative rounded-[2rem] bg-[#0d0d0d] p-10 md:p-14 overflow-hidden group shadow-2xl transition-transform duration-500 hover:-translate-y-2 lg:col-span-1"
            data-interactive="true"
          >
            {/* Cycling CSS Animation bg */}
            <div className="absolute top-0 right-0 w-full h-full pointer-events-none overflow-hidden opacity-10 mix-blend-screen">
              <div className="absolute top-[20%] right-[10%] w-[120px] h-[120px] border-[2px] border-dashed border-[#00f0ff] rounded-[50%] animate-wheel-spin shadow-[0_0_15px_rgba(0,240,255,0.3)]" />
              <div className="absolute top-[40%] right-[-5%] w-[160px] h-[160px] border-[2px] border-dotted border-[#00f0ff] rounded-[50%] animate-wheel-spin-reverse shadow-[0_0_15px_rgba(0,240,255,0.2)]" />
            </div>

            <div className="relative z-10 h-full flex flex-col">
              <h3 className="text-5xl md:text-7xl font-display mb-2 text-white">Cycling</h3>
              <p className="text-[#00f0ff] font-subscript text-sm uppercase tracking-[0.2em] mb-12 font-bold">Rockrider ST900</p>
              
              <div className="mt-auto space-y-6">
                <div className="flex justify-between items-center border-b border-[#333333] pb-4">
                  <span className="text-[#888888] text-sm uppercase tracking-wider font-subscript">Drivetrain</span>
                  <span className="text-white font-subscript font-medium uppercase tracking-widest text-sm text-right">SRAM Kit</span>
                </div>
                <div className="flex justify-between items-center border-b border-[#333333] pb-4">
                  <span className="text-[#888888] text-sm uppercase tracking-wider font-subscript">Pace</span>
                  <span className="text-white font-subscript font-medium uppercase tracking-widest text-sm text-right">Endurance</span>
                </div>
                <div className="flex justify-between items-center pb-2">
                  <span className="text-[#888888] text-sm uppercase tracking-wider font-subscript">Terrain</span>
                  <span className="text-[#00f0ff] font-subscript font-bold uppercase tracking-widest text-sm text-right">Trails & Roads</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx="true">{`
        @keyframes subtle-float {
          0%, 100% { transform: translateY(0) rotate(15deg); }
          50% { transform: translateY(-15px) rotate(0deg); }
        }
        
        @keyframes subtle-bounce {
          0%, 100% { transform: translateY(0) scaleY(1); }
          50% { transform: translateY(-20px) scaleY(1.05); }
        }

        @keyframes wheel-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes wheel-spin-reverse {
          0% { transform: rotate(360deg); }
          100% { transform: rotate(0deg); }
        }

        .animate-subtle-float {
          animation: subtle-float 4s ease-in-out infinite;
        }

        .animate-subtle-bounce {
          animation: subtle-bounce 3s ease-in-out infinite;
        }

        .animate-wheel-spin {
          animation: wheel-spin 15s linear infinite;
        }

        .animate-wheel-spin-reverse {
          animation: wheel-spin-reverse 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
