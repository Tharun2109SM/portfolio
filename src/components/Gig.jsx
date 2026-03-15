import { useState, useRef, useEffect } from 'react';
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

// Animation and interaction variants handled below

export default function Gig() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const machineWrapperRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [isIpadOpen, setIsIpadOpen] = useState(false);
  const [isIphoneOpen, setIsIphoneOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check mobile for responsive layout adjustments
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Scroll triggers for the lists
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

    // Soft landing bounce when scrolling into the machine area specifically
    gsap.fromTo(machineWrapperRef.current,
      { y: -100, opacity: 0 },
      { 
        y: 0, 
        opacity: 1, 
        duration: 1.5, 
        ease: "elastic.out(1, 0.7)", 
        scrollTrigger: {
          trigger: machineWrapperRef.current,
          start: "top 85%",
        }
      }
    );

    return () => tl.kill();
  }, []);

  const containerAnim = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1, x: 0,
      transition: { staggerChildren: 0.08, delayChildren: 0.6, ease: "easeOut", duration: 0.6 }
    },
    exit: { opacity: 0, x: 50, transition: { duration: 0.4 } }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 15 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
    exit: { opacity: 0, y: 0 }
  };

  return (
    <section ref={sectionRef} id="gig" className="pt-32 pb-0 px-6 md:px-12 w-full flex flex-col justify-center relative z-20 bg-[#fafaf8]">
      
      {/* THE GIG / DEVELOPMENT SECTION */}
      <div className="max-w-[90rem] mx-auto w-full mb-16 md:mb-32">
        <h2 ref={titleRef} className="text-[12vw] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-[#0d0d0d] uppercase m-0 mb-16 md:mb-24">
          THE GIG
        </h2>

        <div className="w-full border-t border-[#0d0d0d]/10 pt-16 flex flex-col">
          <h3 className="text-[#888888] font-subscript tracking-widest uppercase text-sm mb-16 font-bold">
            Development
          </h3>
          
          <div className="relative w-full text-[#0d0d0d] flex flex-col items-center justify-center overflow-visible">
            
            <div className="relative w-full min-h-[50vh] md:min-h-[60vh] flex items-center justify-center pt-8 pb-32 lg:pb-8">
          
          {/* GSAP Wrapper for scroll entry */}
          <div ref={machineWrapperRef} className="relative z-20 flex flex-col lg:flex-row justify-center items-center w-full gap-40 lg:gap-16 mt-12 lg:mt-0">
            
            {/* === MACBOOK SECTION === */}
            <div className="relative flex justify-center items-center w-full lg:w-auto">
              {/* Framer Motion Wrapper for Slide / Scale Interaction */}
              <motion.div
                className="relative cursor-pointer group z-40"
                style={{ perspective: "1500px" }}
                animate={{ 
                  x: 0,
                  y: isOpen && isMobile ? -140 : 0,
                  scale: isMobile ? 0.75 : 1 
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.1, 1.0] }}
                onClick={() => setIsOpen(!isOpen)}
                data-interactive="true"
              >
                {/* Hover levitation */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                  className="relative w-[28rem] h-[22rem] lg:w-[36rem] lg:h-[22rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                >
                  {/* Closed Image */}
                  <motion.img 
                    src={macClosed}
                    alt="MacBook Closed"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                    animate={{ opacity: isOpen ? 0 : 1, scale: isOpen ? 0.95 : 1 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                  />

                  {/* Open Image */}
                  <motion.img 
                    src={macOpen}
                    alt="MacBook Open"
                    className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl"
                    animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.95 }}
                    transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                  />


                  
                </motion.div>
              </motion.div>

              {/* MacBook Technical Specs Panel */}
              <AnimatePresence>
                {isOpen && (
                   <motion.div 
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-8 lg:mt-12 w-[85vw] md:w-[360px] backdrop-blur-[20px] bg-white border border-[#0d0d0d]/10 rounded-2xl p-6 md:p-8 shadow-2xl z-30"
                      style={{ 
                        marginTop: isMobile ? "0px" : "auto"
                      }}
                      variants={containerAnim}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                   >
                      <motion.h3 variants={itemAnim} className="text-xl md:text-2xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4">
                        MacBook Pro <span className="text-[#c8f135] md:mx-1">—</span> M4 Pro
                      </motion.h3>

                      <div className="space-y-5 text-left">
                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">CPU & GPU</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base leading-tight">
                             14‑core CPU with 10 performance cores and 4 efficiency cores<br/>
                             <span className="text-[#888888] text-xs md:text-sm mt-1 block">Hardware-accelerated ray tracing</span>
                           </p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Neural Engine</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base">16-core Neural Engine</p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Memory</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base">273GB/s memory bandwidth</p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Media Engine</h4>
                           <p className="text-[#888888] font-subscript text-xs md:text-sm leading-relaxed">
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
            </div>

            {/* === IPAD SECTION === */}
            <div className="relative flex justify-center items-center w-full lg:w-auto">
              <motion.div
                className="relative cursor-pointer group z-40"
                style={{ perspective: "1500px" }}
                animate={{ 
                  x: 0,
                  y: isIpadOpen && isMobile ? -140 : 0,
                  scale: isIpadOpen ? (isMobile ? 1.2 : 1.5) : (isMobile ? 0.70 : 0.85)
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.1, 1.0] }}
                onClick={() => setIsIpadOpen(!isIpadOpen)}
                data-interactive="true"
              >
                  {/* iPad hover wrapper */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 1 }}
                    className="relative w-[20rem] h-[26rem] lg:w-[22rem] lg:h-[28rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                  >
                    {/* Image 1 (Front) */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ opacity: isIpadOpen ? 0 : 1, scale: isIpadOpen ? 0.95 : 1 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                    >
                      <img src={ipad1} alt="iPad Front" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                    </motion.div>

                    {/* Image 2 (Back) */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ opacity: isIpadOpen ? 1 : 0, scale: isIpadOpen ? 1 : 0.95 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                    >
                      <img src={ipad2} alt="iPad Back" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                    </motion.div>
                  </motion.div>


              </motion.div>

              {/* iPad Technical Specs Panel */}
              <AnimatePresence>
                {isIpadOpen && (
                   <motion.div 
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-8 lg:mt-12 w-[85vw] md:w-[360px] backdrop-blur-[20px] bg-white border border-[#0d0d0d]/10 rounded-2xl p-6 md:p-8 shadow-2xl z-30"
                      style={{ 
                        marginTop: isMobile ? "0px" : "auto"
                      }}
                      variants={containerAnim}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                   >
                     {/* iPad Specifications */}
                      <motion.h3 variants={itemAnim} className="text-xl md:text-2xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4">
                        iPad <span className="text-[#c8f135] md:mx-1">—</span> 9th Gen
                      </motion.h3>

                      <div className="space-y-5 text-left">
                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Processor</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base leading-tight">
                             Apple A13 Bionic chip<br/>
                             <span className="text-[#888888] text-xs md:text-sm mt-1 block">64-bit architecture</span>
                             <span className="text-[#888888] text-xs md:text-sm block">Neural Engine</span>
                           </p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Display</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base leading-tight">
                             10.2-inch LED-backlit Multi-Touch<br/>
                             <span className="text-[#888888] text-xs md:text-sm mt-1 block">Retina display with IPS technology</span>
                             <span className="text-[#888888] text-xs md:text-sm block">2160x1620 resolution at 264 ppi</span>
                             <span className="text-[#888888] text-xs md:text-sm block">True Tone, 500 nits brightness</span>
                           </p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Storage & Memory</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base">64GB Storage • 6GB RAM</p>
                        </motion.div>
                      </div>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* === IPHONE SECTION === */}
            <div className="relative flex justify-center items-center w-full lg:w-auto">
              <motion.div
                className="relative cursor-pointer group z-40"
                style={{ perspective: "1500px" }}
                animate={{ 
                  x: 0,
                  y: isIphoneOpen && isMobile ? -140 : 0,
                  scale: isIphoneOpen ? (isMobile ? 1.8 : 2.5) : (isMobile ? 1.25 : 1.5)
                }}
                transition={{ duration: 1.2, ease: [0.25, 0.1, 0.1, 1.0] }}
                onClick={() => setIsIphoneOpen(!isIphoneOpen)}
                data-interactive="true"
              >
                  {/* iPhone hover wrapper */}
                  <motion.div
                    animate={{ y: [0, -12, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: "easeInOut", delay: 0.5 }}
                    className="relative w-[18rem] h-[26rem] lg:w-[22rem] lg:h-[30rem] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)]"
                  >
                    {/* Outside Image (Back of Phone) */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ opacity: isIphoneOpen ? 0 : 1, scale: isIphoneOpen ? 0.95 : 1 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                    >
                      <img src={iphoneBack} alt="iPhone Back" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                    </motion.div>

                    {/* Inside Image (Front of Phone) */}
                    <motion.div 
                      className="absolute inset-0 w-full h-full"
                      animate={{ opacity: isIphoneOpen ? 1 : 0, scale: isIphoneOpen ? 1 : 0.95 }}
                      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }}
                    >
                      <img src={iphoneFront} alt="iPhone Front" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
                    </motion.div>
                  </motion.div>


              </motion.div>

              {/* iPhone Technical Specs Panel */}
              <AnimatePresence>
                {isIphoneOpen && (
                   <motion.div 
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-8 lg:mt-12 w-[85vw] md:w-[360px] backdrop-blur-[20px] bg-white border border-[#0d0d0d]/10 rounded-2xl p-6 md:p-8 shadow-2xl z-30"
                      style={{ 
                        marginTop: isMobile ? "0px" : "auto"
                      }}
                      variants={containerAnim}
                      initial="hidden"
                      animate="show"
                      exit="exit"
                   >
                     {/* iPhone Specifications */}
                      <motion.h3 variants={itemAnim} className="text-xl md:text-2xl font-display text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4">
                        iPhone 16 <span className="text-[#c8f135] md:mx-1">—</span> A18
                      </motion.h3>

                      <div className="space-y-5 text-left">
                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Processor</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base leading-tight">
                             A18 chip with 6-core CPU<br/>
                             <span className="text-[#888888] text-xs md:text-sm mt-1 block">5-core GPU</span>
                             <span className="text-[#888888] text-xs md:text-sm block">16-core Neural Engine</span>
                           </p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Display</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base leading-tight">
                             6.1-inch Super Retina XDR OLED<br/>
                             <span className="text-[#888888] text-xs md:text-sm mt-1 block">2556x1179-pixel resolution (460 ppi)</span>
                             <span className="text-[#888888] text-xs md:text-sm block">Dynamic Island, 2000 nits outdoor peak</span>
                           </p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Camera System</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base leading-tight">
                             Main: 48MP Fusion, OIS, 2x Telephoto<br/>
                             <span className="text-[#888888] text-xs md:text-sm mt-1 block">Ultra Wide: 12MP, 120° FOV, Macro support</span>
                             <span className="text-[#888888] text-xs md:text-sm block">Front: 12MP TrueDepth with autofocus</span>
                           </p>
                        </motion.div>

                        <motion.div variants={itemAnim}>
                           <h4 className="text-[#888888] font-subscript tracking-widest text-[9px] md:text-[10px] mb-1 uppercase font-bold">Video & Audio</h4>
                           <p className="text-[#0d0d0d] font-subscript text-sm md:text-base">4K Dolby Vision, Spatial Video, Audio Mix</p>
                        </motion.div>

                      </div>
                   </motion.div>
                )}
              </AnimatePresence>
            </div>
          
            </div>
          </div>
        </div>
      </div>
    </div>

    </section>
  );
}
