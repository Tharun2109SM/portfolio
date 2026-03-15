import re

code = """import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import macClosed from '../assets/mac-closed-transparent.png';
import macOpen from '../assets/mac-open-transparent.png';
import ipad1 from '../assets/ipad-air-back-clean.png';
import ipad2 from '../assets/ipad-image-2-clean.png';
import iphoneFront from '../assets/iphone-16-front-clean.png';
import iphoneBack from '../assets/iphone-16-back-clean.png';

gsap.registerPlugin(ScrollTrigger);

export default function Gig() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const scrollWrapperRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isIpadOpen, setIsIpadOpen] = useState(false);
  const [isIphoneOpen, setIsIphoneOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
    );

    // Horizontal Scroll Trigger
    const scrollContainer = scrollContainerRef.current;
    
    // Calculate total scroll distance based on container width vs viewport width
    const getScrollAmount = () => {
      let scrollWidth = scrollContainer.scrollWidth;
      return -(scrollWidth - window.innerWidth);
    };

    const horizontalTween = gsap.to(scrollContainer, {
      x: getScrollAmount,
      ease: "none",
      scrollTrigger: {
        trigger: scrollWrapperRef.current,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        scrub: 1, // Smooth scrolling
        invalidateOnRefresh: true, // Recalculate on resize
      }
    });

    return () => {
      tl.kill();
      if(horizontalTween.scrollTrigger) horizontalTween.scrollTrigger.kill();
      horizontalTween.kill();
    }
  }, []);

  const containerAnim = {
    hidden: { opacity: 0, x: 30 },
    show: {
      opacity: 1, x: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.1, ease: "easeOut", duration: 0.5 }
    },
    exit: { opacity: 0, x: 30, transition: { duration: 0.3 } }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 0 }
  };

  return (
    <section ref={sectionRef} id="gig" className="pt-32 pb-0 w-full flex flex-col justify-center relative z-20 bg-[#fafaf8] overflow-hidden">
      
      {/* THE GIG / DEVELOPMENT SECTION */}
      <div className="max-w-[90rem] mx-auto w-full px-6 md:px-12">
        <h2 ref={titleRef} className="text-[12vw] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-[#0d0d0d] uppercase m-0 mb-16 md:mb-24">
          THE GIG
        </h2>

        <div className="w-full border-t border-[#0d0d0d]/10 pt-16 flex flex-col">
          <h3 className="text-[#888888] font-subscript tracking-widest uppercase text-sm mb-8 font-bold">
            Development
          </h3>
          <p className="font-subscript text-[#888888] uppercase tracking-widest text-xs mb-8 flex items-center justify-center lg:justify-start gap-4">
            <span className="w-12 h-px bg-[#0d0d0d]/20"></span>
            Scroll to explore device stack
            <span className="w-12 h-px bg-[#0d0d0d]/20"></span>
          </p>
        </div>
      </div>

      <div ref={scrollWrapperRef} className="relative w-full text-[#0d0d0d] flex items-center overflow-hidden min-h-screen">
        <div ref={scrollContainerRef} className="flex flex-nowrap h-screen items-center">
            
          {/* === MACBOOK SECTION === */}
          <div className="w-screen flex-[0_0_100%] flex justify-center items-center px-6 md:px-12 h-full py-8">
            <motion.div layout className={`w-full max-w-[85rem] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 ${isOpen ? 'lg:justify-between' : 'lg:justify-center'}`}>
              
              <motion.div
                layout
                className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${isOpen ? 'w-[20rem] h-[15rem] lg:w-[32rem] lg:h-[20rem]' : 'w-[28rem] h-[22rem] lg:w-[48rem] lg:h-[30rem]'}`}
                style={{ perspective: "1500px" }}
                animate={{ scale: isMobile ? (isOpen ? 0.8 : 1) : 1 }}
                onClick={() => setIsOpen(!isOpen)}
                data-interactive="true"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                >
                  <motion.img 
                    src={macClosed}
                    alt="MacBook Closed"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                    animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.95 : 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                  />
                  <motion.img 
                    src={macOpen}
                    alt="MacBook Open"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                    animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                  />
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isOpen && (
                  <motion.div 
                    layout
                    variants={containerAnim}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="w-full lg:w-[45%] text-left"
                  >
                    <motion.h3 variants={itemAnim} className="text-2xl md:text-4xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4">
                      MacBook Pro <span className="text-[#c8f135] md:mx-1">—</span> M4 Pro
                    </motion.h3>

                    <div className="space-y-6 lg:space-y-8 text-left">
                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">CPU & GPU</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg leading-tight">
                          14‑core CPU with 10 performance cores and 4 efficiency cores<br/>
                          <span className="text-[#888888] text-sm mt-1 block">Hardware-accelerated ray tracing</span>
                        </p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Neural Engine</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg">16-core Neural Engine</p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Memory</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg">273GB/s memory bandwidth</p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Media Engine</h4>
                        <p className="text-[#888888] font-sans text-sm md:text-base leading-relaxed">
                          Hardware-accelerated H.264, HEVC, ProRes and ProRes RAW<br/>
                          Video decode engine<br/>
                          Video encode engine<br/>
                          ProRes encode and decode engine<br/>
                          AV1 decode
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* === IPAD SECTION === */}
          <div className="w-screen flex-[0_0_100%] flex justify-center items-center px-6 md:px-12 h-full py-8">
            <motion.div layout className={`w-full max-w-[85rem] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 ${isIpadOpen ? 'lg:justify-between' : 'lg:justify-center'}`}>
              
              <motion.div
                layout
                className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${isIpadOpen ? 'w-[16rem] h-[21rem] lg:w-[22rem] lg:h-[28rem]' : 'w-[20rem] h-[26rem] lg:w-[32rem] lg:h-[40rem]'}`}
                style={{ perspective: "1500px" }}
                animate={{ scale: isMobile ? (isIpadOpen ? 0.8 : 1) : 1 }}
                onClick={() => setIsIpadOpen(!isIpadOpen)}
                data-interactive="true"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                  className="relative w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                >
                  <motion.div className="absolute inset-0 w-full h-full" animate={{ opacity: isIpadOpen ? 0 : 1, scale: isIpadOpen ? 0.95 : 1 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}>
                    <img src={ipad1} alt="iPad Front" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                  </motion.div>
                  <motion.div className="absolute inset-0 w-full h-full" animate={{ opacity: isIpadOpen ? 1 : 0, scale: isIpadOpen ? 1 : 0.95 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}>
                    <img src={ipad2} alt="iPad Back" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isIpadOpen && (
                  <motion.div 
                    layout
                    variants={containerAnim}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="w-full lg:w-[45%] text-left"
                  >
                    <motion.h3 variants={itemAnim} className="text-2xl md:text-4xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4">
                      iPad <span className="text-[#c8f135] md:mx-1">—</span> 9th Gen
                    </motion.h3>

                    <div className="space-y-6 lg:space-y-8 text-left">
                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Processor</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg leading-tight">
                          Apple A13 Bionic chip<br/>
                          <span className="text-[#888888] text-sm mt-1 block">64-bit architecture</span>
                          <span className="text-[#888888] text-sm block">Neural Engine</span>
                        </p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Display</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg leading-tight">
                          10.2-inch LED-backlit Multi-Touch<br/>
                          <span className="text-[#888888] text-sm mt-1 block">Retina display with IPS technology</span>
                          <span className="text-[#888888] text-sm block">2160x1620 resolution at 264 ppi</span>
                          <span className="text-[#888888] text-sm block">True Tone, 500 nits brightness</span>
                        </p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Storage & Memory</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg">64GB Storage • 6GB RAM</p>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* === IPHONE SECTION === */}
          <div className="w-screen flex-[0_0_100%] flex justify-center items-center px-6 md:px-12 h-full py-8">
            <motion.div layout className={`w-full max-w-[85rem] flex flex-col lg:flex-row items-center gap-12 lg:gap-20 transition-all duration-700 ${isIphoneOpen ? 'lg:justify-between' : 'lg:justify-center'}`}>
              
              <motion.div
                layout
                className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${isIphoneOpen ? 'w-[16rem] h-[22rem] lg:w-[20rem] lg:h-[30rem]' : 'w-[20rem] h-[30rem] lg:w-[32rem] lg:h-[45rem]'}`}
                style={{ perspective: "1500px" }}
                animate={{ scale: isMobile ? (isIphoneOpen ? 0.8 : 1) : 1 }}
                onClick={() => setIsIphoneOpen(!isIphoneOpen)}
                data-interactive="true"
              >
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                  className="relative w-full h-full drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                >
                  <motion.div className="absolute inset-0 w-full h-full" animate={{ opacity: isIphoneOpen ? 0 : 1, scale: isIphoneOpen ? 0.95 : 1 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}>
                    <img src={iphoneBack} alt="iPhone Back" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                  </motion.div>
                  <motion.div className="absolute inset-0 w-full h-full" animate={{ opacity: isIphoneOpen ? 1 : 0, scale: isIphoneOpen ? 1 : 0.95 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}>
                    <img src={iphoneFront} alt="iPhone Front" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                  </motion.div>
                </motion.div>
              </motion.div>

              <AnimatePresence>
                {isIphoneOpen && (
                  <motion.div 
                    layout
                    variants={containerAnim}
                    initial="hidden"
                    animate="show"
                    exit="exit"
                    className="w-full lg:w-[45%] text-left"
                  >
                    <motion.h3 variants={itemAnim} className="text-2xl md:text-4xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4">
                      iPhone 16 <span className="text-[#c8f135] md:mx-1">—</span> A18
                    </motion.h3>

                    <div className="space-y-6 lg:space-y-8 text-left">
                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Processor</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg leading-tight">
                          A18 chip with 6-core CPU<br/>
                          <span className="text-[#888888] text-sm mt-1 block">5-core GPU</span>
                          <span className="text-[#888888] text-sm block">16-core Neural Engine</span>
                        </p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Display</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg leading-tight">
                          6.1-inch Super Retina XDR OLED<br/>
                          <span className="text-[#888888] text-sm mt-1 block">2556x1179-pixel resolution (460 ppi)</span>
                          <span className="text-[#888888] text-sm block">Dynamic Island, 2000 nits outdoor peak</span>
                        </p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Camera System</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg leading-tight">
                          Main: 48MP Fusion, OIS, 2x Telephoto<br/>
                          <span className="text-[#888888] text-sm mt-1 block">Ultra Wide: 12MP, 120° FOV, Macro support</span>
                          <span className="text-[#888888] text-sm block">Front: 12MP TrueDepth with autofocus</span>
                        </p>
                      </motion.div>

                      <motion.div variants={itemAnim}>
                        <h4 className="text-[#888888] font-subscript tracking-widest text-xs mb-1 uppercase font-bold">Video & Audio</h4>
                        <p className="text-[#0d0d0d] font-sans text-base md:text-lg">4K Dolby Vision, Spatial Video, Audio Mix</p>
                      </motion.div>

                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
"""

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gig.jsx", "w") as f:
    f.write(code)
