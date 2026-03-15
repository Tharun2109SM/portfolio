import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const sentence = "musician. maker. always moving.";

export default function Hero() {
  const nameVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  const staggerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.04,
        delayChildren: 0.5,
      }
    }
  };

  const letterVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.1 } }
  };

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#fafaf8]">
      <InteractiveParticles />
      
      <div className="z-10 text-center select-none flex flex-col items-center pointer-events-none mt-16 md:mt-24">
        {/* Massive Stacked Name */}
        <motion.div 
          className="flex flex-col items-center leading-[0.75] tracking-tighter mb-6 text-[#0d0d0d] drop-shadow-sm font-display"
          initial="hidden"
          animate="visible"
          variants={nameVariants}
        >
          <span className="text-[12vw] md:text-[8rem] lg:text-[12rem] uppercase whitespace-nowrap">
            THARUN.S.M
          </span>
        </motion.div>

        {/* Tagline */}
        <motion.div 
          className="text-lg md:text-2xl font-subscript tracking-[0.2em] md:tracking-[0.3em] text-[#0d0d0d] uppercase flex justify-center flex-wrap px-4 mb-4 font-bold"
          initial="hidden"
          animate="visible"
          variants={staggerVariants}
        >
          {sentence.split("").map((char, index) => (
            <motion.span key={index} variants={letterVariants} className={char === " " ? "w-2 md:w-3" : "inline-block"}>
              {char}
            </motion.span>
          ))}
        </motion.div>

        {/* Established text */}
        <motion.div
          className="text-xs md:text-sm font-subscript tracking-[0.5em] text-[#888888] uppercase mt-2 font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
        >
          EST. 2007
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
      >
        <motion.div
          animate={{ y: [0, 15, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className="w-[2px] h-16 bg-[#0d0d0d] mx-auto opacity-40"
        />
      </motion.div>
    </section>
  );
}

// Custom interactive canvas particle system
function InteractiveParticles() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    
    // Antigravity palette matching the prompt request
    const colors = ['#e63946', '#457b9d', '#e9c46a', '#2a9d8f', '#9b5de5', '#f15bb5'];

    const mouse = {
      x: null,
      y: null,
      radius: 150 // Repel radius
    };

    const handleMouseMove = (e) => {
      // Get mouse position relative to canvas
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      mouse.x = null;
      mouse.y = null;
    };
    
    const handleDeviceOrientation = (e) => {
      // Make particles gently sway based on tilt on mobile
      if (!e.gamma || !e.beta) return;
      if (window.innerWidth >= 768) return; // Only apply on small screens
      
      mouse.x = canvas.width / 2 + e.gamma * 10;
      mouse.y = canvas.height / 2 + (e.beta - 45) * 10;
      mouse.radius = 100;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('deviceorientation', handleDeviceOrientation);

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x;
        this.baseY = y;
        
        // Rectangular dash properties
        this.width = Math.random() * 4 + 2; 
        this.height = this.width * (Math.random() * 2 + 1.5);
        this.color = colors[Math.floor(Math.random() * colors.length)];
        
        // Random angle for the dash
        this.angle = Math.random() * Math.PI * 2;
        
        // Ambient floating properties
        this.density = (Math.random() * 30) + 1;
        this.floatOffset = Math.random() * 100;
        this.floatSpeed = 0.001 + Math.random() * 0.002;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.fillStyle = this.color;
        // Draw the rounded dash
        ctx.beginPath();
        ctx.roundRect(-this.width/2, -this.height/2, this.width, this.height, 2);
        ctx.fill();
        ctx.restore();
      }

      update(time) {
        // Subtle ambient float (Lissajous curve variant)
        const floatX = Math.sin(time * this.floatSpeed + this.floatOffset) * 15;
        const floatY = Math.cos(time * this.floatSpeed + this.floatOffset) * 15;
        
        const targetX = this.baseX + floatX;
        const targetY = this.baseY + floatY;

        // Interaction logic
        if (mouse.x != null && mouse.y != null) {
          let dx = mouse.x - this.x;
          let dy = mouse.y - this.y;
          let distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < mouse.radius) {
            // Repel force calculation
            const forceDirectionX = dx / distance;
            const forceDirectionY = dy / distance;
            const force = (mouse.radius - distance) / mouse.radius;
            const directionX = forceDirectionX * force * this.density;
            const directionY = forceDirectionY * force * this.density;
            
            this.x -= directionX;
            this.y -= directionY;
          } else {
            // Elastic return setup
            if (this.x !== targetX) {
              this.x -= (this.x - targetX) / 20; // easing
            }
            if (this.y !== targetY) {
              this.y -= (this.y - targetY) / 20;
            }
          }
        } else {
          // Elastic return when mouse is far or null
          if (this.x !== targetX) {
            this.x -= (this.x - targetX) / 20;
          }
          if (this.y !== targetY) {
            this.y -= (this.y - targetY) / 20;
          }
        }
        
        // Slowly rotate dashes over time
        this.angle += 0.005;

        this.draw();
      }
    }

    const init = () => {
      particles = [];
      const numParticles = window.innerWidth > 768 ? 200 : 80; // Fewer on mobile
      for (let i = 0; i < numParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particles.push(new Particle(x, y));
      }
    };

    const resize = () => {
      canvas.width = window.innerWidth;
      // Make it slightly taller than screen to cover scroll bounds gracefully
      canvas.height = window.innerHeight * 1.2; 
      init();
    };

    window.addEventListener('resize', resize);
    resize();

    const animate = (time) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particles.length; i++) {
        particles[i].update(time);
      }
      animationFrameId = requestAnimationFrame(animate);
    };
    
    animate(0);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('deviceorientation', handleDeviceOrientation);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute top-0 left-0 w-full h-[120vh] z-0"
      style={{ opacity: 0.6 }} // slightly faded to not overwhelm
    />
  );
}
