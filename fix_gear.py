import re

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gear.jsx", "r") as f:
    gear_content = f.read()

# 1. Remove GSAP scroll logic
gear_content = re.sub(r"  useEffect\(\(\) => \{\n    const horizontalContainer = horizontalContainerRef\.current;.*?  \}, \[\]\);\n", "", gear_content, flags=re.DOTALL)

# 2. Change GEAR to THE GEAR
gear_content = gear_content.replace(
    '          GEAR',
    '          THE GEAR'
)

# 3. Strip away the 200vw horizontal container and the second "intro screen"
# Basically we want this to just be a normal centered flex div, identical to how the iPad is setup in Gig.jsx.
# Right now the structure is:
# <section> <h2> <div> <div 200vw> <div 100vw bike> <div 100vw intro> </div> </div> </div> </section>

# Let's completely rewrite the render method to be super clean and simple.

new_return = """
  return (
    <section id="gear" className="relative w-full min-h-screen py-24 overflow-hidden bg-[#fafaf8] flex flex-col justify-center items-center">
      
      {/* Background Title */}
      <div className="absolute top-10 right-6 md:right-12 z-0 pointer-events-none">
        <h2 className="text-6xl md:text-[8rem] lg:text-[10rem] font-display leading-[0.85] tracking-tighter text-[#0d0d0d] uppercase m-0 opacity-10 text-right">
          THE GEAR
        </h2>
      </div>

      <div className="w-full max-w-[90rem] flex justify-center items-center px-6 md:px-12 relative z-10 mx-auto">
        <motion.div layout className={`w-full flex flex-col lg:flex-row items-center transition-all duration-700 mt-16 md:mt-0 ${openDevice === 'bike' ? 'lg:justify-center lg:gap-16 xl:gap-24' : 'lg:justify-center'}`}>
          
          <motion.div
            className={`relative cursor-pointer group z-40 flex-shrink-0 transition-all duration-700 ease-[cubic-bezier(0.25,0.1,0.1,1.0)] ${openDevice === 'bike' ? 'w-[45rem] h-[30rem] lg:w-[48rem] lg:h-[35rem]' : 'w-[45rem] h-[30rem] lg:w-[60rem] lg:h-[45rem]'}`}
            animate={{ scale: isMobile ? (openDevice === 'bike' ? 0.8 : 1) : 1 }}
            onClick={() => handleDeviceClick('bike')}
            data-interactive="true"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 5, ease: "easeInOut", delay: 0.5 }}
              className="relative w-full h-full"
            >
              <img src={bikeSide} alt="Rockrider ST900" className="absolute inset-0 w-full h-full object-contain pointer-events-none drop-shadow-2xl" />
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

                <div className="space-y-4 lg:space-y-6 text-left max-h-[50vh] overflow-y-auto pr-4 custom-scrollbar">
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Rear Derailleur</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-sm md:text-base leading-tight">
                      SRAM NX X-Horizon 11-speed with "Cage Lock" for easy wheel removal.
                    </p>
                  </motion.div>

                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Shifter & Cassette</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-sm md:text-base leading-tight">
                      SRAM NX Trigger Shifter featuring X-Actuation technology.<br/>
                      <span className="text-[#888888] mt-1 block">Cassette: SRAM PG-1130 providing a wide gear range for steep climbs.</span>
                    </p>
                  </motion.div>

                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Crankset & Chain</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-sm md:text-base leading-tight">
                      SRAM X1000 or NX forged aluminium with a 32T (or 30T) X-Sync single chainring.<br/>
                      <span className="text-[#888888] mt-1 block">Chain: SRAM PC-1110 11-speed chain.</span>
                    </p>
                  </motion.div>

                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Frame & Fork</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-sm md:text-base leading-tight">
                      Lightweight 6061 aluminium frame (approx. 1.6kg in size M for the hardtail).<br/>
                      <span className="text-[#888888] mt-1 block">Fork: RockShox 30 Silver Air with 120mm travel and handlebar "Combo Lock".</span>
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Brakes</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-sm md:text-base leading-tight">
                      Hydraulic disc brakes (commonly Tektro or Rockrider by Tektro) with 180mm front and 160mm rear rotors.
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Wheels & Tires</h4>
                    <p className="text-[#0d0d0d] font-['Avenir',_sans-serif] text-sm md:text-base leading-tight">
                      27.5" double-walled lightened wheels, Tubeless Ready (23mm internal width).<br/>
                      <span className="text-[#888888] mt-1 block">Tires: Rockrider All Conditions Light (60 TPI), 27.5" x 2.2".</span>
                    </p>
                  </motion.div>
                  
                  <motion.div variants={itemAnim}>
                    <h4 className="text-[#888888] font-['Avenir',_sans-serif] tracking-[0.15em] text-[0.7rem] md:text-sm mb-1 uppercase font-bold text-[#888]">Weight</h4>
                    <p className="text-[#888888] font-['Avenir',_sans-serif] text-sm md:text-base leading-tight">
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
"""

gear_content = re.sub(r"  return \(\n    <section ref=\{sectionRef\}.*?\n\}\n", new_return, gear_content, flags=re.DOTALL)

with open("/Users/tharun.s.m/.gemini/antigravity/scratch/portfolio/src/components/Gear.jsx", "w") as f:
    f.write(gear_content)

