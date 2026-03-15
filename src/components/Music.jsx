import { useEffect, useRef, useState } from 'react';
import * as Tone from 'tone';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Music() {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const synthRef = useRef(null);
  const [activeKeys, setActiveKeys] = useState(new Set());

  // Set up Tone.js
  useEffect(() => {
    const reverb = new Tone.Reverb(2).toDestination();
    synthRef.current = new Tone.PolySynth(Tone.Synth, {
      oscillator: { type: "triangle" },
      envelope: { attack: 0.05, decay: 0.1, sustain: 0.3, release: 1.5 }
    }).connect(reverb);

    return () => {
      if (synthRef.current) synthRef.current.dispose();
      reverb.dispose();
    };
  }, []);

  // GSAP animations
  useEffect(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 75%",
      }
    });

    tl.fromTo(titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );

    return () => tl.kill();
  }, []);

  // Keyboard mapping
  const activeKeysRef = useRef(new Set());

  useEffect(() => {
    const keyMap = {
      'a': 'C4', 'w': 'C#4', 's': 'D4', 'e': 'D#4', 'd': 'E4',
      'f': 'F4', 't': 'F#4', 'g': 'G4', 'y': 'G#4', 'h': 'A4',
      'u': 'A#4', 'j': 'B4', 'k': 'C5'
    };

    const handleKeyDown = async (e) => {
      const note = keyMap[e.key.toLowerCase()];
      if (note && !activeKeysRef.current.has(note) && !e.repeat) {
        if (Tone.context.state !== 'running') await Tone.start();
        activeKeysRef.current.add(note);
        setActiveKeys(new Set(activeKeysRef.current));
        synthRef.current?.triggerAttack(note);
      }
    };

    const handleKeyUp = (e) => {
      const note = keyMap[e.key.toLowerCase()];
      if (note && activeKeysRef.current.has(note)) {
        activeKeysRef.current.delete(note);
        setActiveKeys(new Set(activeKeysRef.current));
        synthRef.current?.triggerRelease(note);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, []);

  const playNote = async (note) => {
    if (Tone.context.state !== 'running') await Tone.start();
    synthRef.current?.triggerAttack(note);
    activeKeysRef.current.add(note);
    setActiveKeys(new Set(activeKeysRef.current));
  };

  const releaseNote = (note) => {
    synthRef.current?.triggerRelease(note);
    activeKeysRef.current.delete(note);
    setActiveKeys(new Set(activeKeysRef.current));
  };

  const naturalKeys = ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'];
  const sharpKeys = [
    { note: 'C#4', pos: 'left-[9%]' },
    { note: 'D#4', pos: 'left-[22%]' },
    { note: 'F#4', pos: 'left-[46%]' },
    { note: 'G#4', pos: 'left-[59%]' },
    { note: 'A#4', pos: 'left-[72%]' }
  ];

  return (
    <section ref={sectionRef} id="music" className="py-32 px-6 md:px-12 w-full flex flex-col justify-center relative z-20 bg-[#fafaf8]">
      <div className="max-w-[90rem] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        
        {/* Text Col */}
        <div className="order-2 lg:order-1">
          <h2 ref={titleRef} className="text-[12vw] lg:text-[9rem] font-display leading-[0.85] tracking-tighter text-[#0d0d0d] uppercase m-0 mb-8">
            NOTES & <br className="hidden lg:block"/> KEYS
          </h2>
          <p className="text-xl md:text-2xl font-subscript font-light leading-relaxed text-[#0d0d0d] max-w-xl">
            A piano is a system. Rules, constraints, logic. But the moment you press a key, math becomes feeling. It's the same way I think about code.
          </p>
        </div>

        {/* Piano Col */}
        <div className="order-1 lg:order-2 w-full max-w-2xl mx-auto flex justify-center">
           <div className="relative w-full h-[300px] md:h-[400px] bg-[#0d0d0d] rounded-xl p-4 md:p-8 flex shadow-2xl">
              {/* Natural Keys */}
              {naturalKeys.map((note) => (
                <div
                  key={note}
                  className={`flex-1 mx-0.5 rounded-b-md cursor-pointer transition-all duration-100 relative
                    ${activeKeys.has(note) 
                      ? 'bg-[#c8f135] translate-y-2 shadow-[0_0_20px_#c8f135]' 
                      : 'bg-white hover:bg-gray-100'}
                  `}
                  onPointerDown={() => playNote(note)}
                  onPointerUp={() => releaseNote(note)}
                  onPointerLeave={() => activeKeys.has(note) && releaseNote(note)}
                  data-interactive="true"
                />
              ))}

              {/* Sharp Keys */}
              {sharpKeys.map(({ note, pos }) => (
                <div
                  key={note}
                  className={`absolute top-4 md:top-8 w-[8%] h-[60%] rounded-b-md cursor-pointer z-10 transition-all duration-100 ${pos}
                    ${activeKeys.has(note) 
                      ? 'bg-[#c8f135] translate-y-2 shadow-[0_0_20px_#c8f135]' 
                      : 'bg-[#111111] hover:bg-black'}
                  `}
                  onPointerDown={() => playNote(note)}
                  onPointerUp={() => releaseNote(note)}
                  onPointerLeave={() => activeKeys.has(note) && releaseNote(note)}
                  data-interactive="true"
                />
              ))}
           </div>
        </div>

      </div>
    </section>
  );
}
