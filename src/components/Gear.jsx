import { useState, useEffect } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from 'framer-motion';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import bikeSide from '../assets/bike-side-transparent.png';

gsap.registerPlugin(ScrollTrigger);

export default function Gear() {


  const [openDevice, setOpenDevice] = useState(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);


  // Use the same animation configurations as Gig.jsx
  const containerAnim = {
    hidden: { opacity: 0, x: 50 },
    show: {
      opacity: 1,
      x: 0,
      transition: { staggerChildren: 0.1, delayChildren: 0.3, duration: 0.8, ease: [0.25, 0.1, 0.1, 1.0] }
    },
    exit: { opacity: 0, transition: { duration: 0.2, ease: "easeInOut" } }
  };

  const itemAnim = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.1, 1.0] } },
    exit: { opacity: 0, transition: { duration: 0.1 } }
  };

  const handleDeviceClick = (device) => {
    setOpenDevice(openDevice === device ? null : device);
  };


  return (
    <section id="gear" className="relative w-full min-h-screen py-24 overflow-hidden bg-[#fafaf8] flex flex-col justify-center items-center">
      
      {/* Background Title */}
      <div className="absolute bottom-4 left-6 md:left-12 z-0 pointer-events-none">
        <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-[#0d0d0d] uppercase m-0 opacity-10 text-left">
          THE GEAR
        </h2>
      </div>

      <div className="w-full max-w-[90rem] flex justify-center items-center px-6 md:px-12 relative z-10 mx-auto">
        <motion.div 
          layout 
          transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
          className={`w-full flex flex-col lg:flex-row items-center transition-all duration-700 mt-16 md:mt-0 ${openDevice === 'bike' ? 'lg:justify-center lg:gap-16 xl:gap-24' : 'lg:justify-center'}`}
        >
          
          <motion.div
            layout
            transition={{ duration: 0.8, ease: [0.25, 1, 0.5, 1] }}
            className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${openDevice === 'bike' ? 'w-[28rem] h-[18rem] lg:w-[34rem] lg:h-[22rem]' : 'w-[36rem] h-[22rem] lg:w-[45rem] lg:h-[31rem]'}`}
            animate={{ scale: isMobile ? (openDevice === 'bike' ? 0.8 : 1) : 1 }}
            onClick={() => handleDeviceClick('bike')}
            data-interactive="true"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="relative w-full h-full"
            >
              <img src={bikeSide} alt="Rockrider ST900" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-md opacity-90" />
            </motion.div>
          </motion.div>

          <AnimatePresence>
            {openDevice === 'bike' && (
              <motion.div 
                layout
                variants={containerAnim}
                initial="hidden"
                animate="show"
                exit="exit"
                className="w-full lg:w-[45%] text-left"
              >
                <motion.h3 variants={itemAnim} className="text-2xl md:text-5xl font-display uppercase tracking-tight text-[#0d0d0d] mb-6 border-b border-[#0d0d0d]/10 pb-4">
                  ROCKRIDER <span className="text-[#c8f135] md:mx-1">—</span> ST900
                </motion.h3>

                <div className="space-y-3 lg:space-y-5 text-left pr-4">
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Rear Derailleur</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-xs md:text-sm leading-tight">
                      SRAM NX X-Horizon 11-speed with "Cage Lock" for easy wheel removal.
                    </p>
                  </motion.div>

                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Shifter & Cassette</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-xs md:text-sm leading-tight">
                      SRAM NX Trigger Shifter featuring X-Actuation technology.<br/>
                      <span className="text-[#888888] mt-1 block">Cassette: SRAM PG-1130 providing a wide gear range for steep climbs.</span>
                    </p>
                  </motion.div>

                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Crankset & Chain</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-xs md:text-sm leading-tight">
                      SRAM X1000 or NX forged aluminium with a 32T (or 30T) X-Sync single chainring.<br/>
                      <span className="text-[#888888] mt-1 block">Chain: SRAM PC-1110 11-speed chain.</span>
                    </p>
                  </motion.div>

                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Frame & Fork</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-xs md:text-sm leading-tight">
                      Lightweight 6061 aluminium frame (approx. 1.6kg in size M for the hardtail).<br/>
                      <span className="text-[#888888] mt-1 block">Fork: RockShox 30 Silver Air with 120mm travel and handlebar "Combo Lock".</span>
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Brakes</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-xs md:text-sm leading-tight">
                      Hydraulic disc brakes (commonly Tektro or Rockrider by Tektro) with 180mm front and 160mm rear rotors.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Wheels & Tires</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-xs md:text-sm leading-tight">
                      27.5" double-walled lightened wheels, Tubeless Ready (23mm internal width).<br/>
                      <span className="text-[#888888] mt-1 block">Tires: Rockrider All Conditions Light (60 TPI), 27.5" x 2.2".</span>
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Weight</h4>
                    <p className="text-[#888888] font-['Avenir',_sans-serif] text-xs md:text-sm leading-tight">
                      Approximately 12.85kg - 13.1kg for the hardtail.
                    </p>
                  </motion.div>

                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
