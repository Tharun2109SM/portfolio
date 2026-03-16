import CustomCursor from './components/CustomCursor'
import MarqueeBackground from './components/MarqueeBackground'
import Hero from './components/Hero'
import About from './components/About'
import Music from './components/Music'
import Sports from './components/Sports'
import Gig from './components/Gig'
import Gear from './components/Gear'
import Footer from './components/Footer'
import QuoteScreen from './components/QuoteScreen'
import ImageReveal from './components/ImageReveal'

function App() {
  return (
    <div className="bg-[#fafaf8] min-h-screen text-[#0d0d0d] font-sans selection:bg-[#c8f135] selection:text-black">
      <CustomCursor />
      <MarqueeBackground />

      {/* Noise Texture Overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 opacity-40 mix-blend-overlay">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <filter id="noise">
            <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" filter="url(#noise)" />
        </svg>
      </div>
      
      <main className="relative z-10 w-full overflow-x-hidden">
        <Hero />
        
        <QuoteScreen text="PLAYING KEYS | SMASHING SHUTTLES | BUILDING THINGS" />
        
        <About />

        <QuoteScreen text="jack of all trades | master of none | but oftentimes better | than master of one" />
        
        <Gig />
        <Gear />
        
        {/* Full screen piano reveal transition into Music */}
        <ImageReveal 
          src="https://images.unsplash.com/photo-1552422535-c45813c61732?q=80&w=2070&auto=format&fit=crop" 
          alt="Grand Piano" 
          className="h-[80vh] md:h-screen w-full" 
        />
        
        <Music />
        
        {/* Full screen badminton racket reveal transition into Sports */}
        <ImageReveal 
          src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=2070&auto=format&fit=crop" 
          alt="Astrox 99 Pro Badminton Racket Angle" 
          className="h-[80vh] md:h-[90vh] w-full" 
        />
        
        {/* Secondary transition for Tennis */}
        <ImageReveal 
          src="https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=2070&auto=format&fit=crop" 
          alt="Tennis Ball Mid Bounce" 
          className="h-[40vh] md:h-[60vh] w-full mt-2" 
        />

        <Sports />
      </main>
      
      <Footer />
    </div>
  )
}

export default App
