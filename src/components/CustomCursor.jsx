import { useEffect, useRef, useState } from 'react';
// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [cursorColor, setCursorColor] = useState('#7a00ff');
  const idleTimerRef = useRef(null);
  const colors = ['#ff00b8', '#00c2ff', '#7a00ff', '#00ff85', '#ffe600', '#ff5f1f', '#00f0ff'];

  useEffect(() => {
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
      idleTimerRef.current = setTimeout(() => {
        setCursorColor((prev) => {
          const currentIndex = colors.indexOf(prev);
          return colors[(currentIndex + 1) % colors.length];
        });
      }, 500);
    };

    const handleMouseOver = (e) => {
      const interactiveEl = e.target.closest('a, button, input, textarea, [data-interactive="true"]');
      if (interactiveEl) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleClick = () => {
      setCursorColor((prev) => {
        const currentIndex = colors.indexOf(prev);
        return colors[(currentIndex + 1) % colors.length];
      });
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleClick);
      if (idleTimerRef.current) {
        clearTimeout(idleTimerRef.current);
      }
    };
  }, [colors]);

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-3 h-3 rounded-full pointer-events-none z-[100] mix-blend-screen"
        animate={{
          x: position.x - 6,
          y: position.y - 6,
          scale: isHovering ? 2.5 : 1,
        }}
        style={{
          backgroundColor: cursorColor,
          boxShadow: `0 0 12px ${cursorColor}b3, 0 0 24px ${cursorColor}66`
        }}
        transition={{
          type: 'spring',
          stiffness: 250,
          damping: 20,
          mass: 0.2,
        }}
      />
    </>
  );
}
