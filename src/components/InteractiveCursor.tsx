import React, { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'motion/react';

export const InteractiveCursor: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [cursorVariant, setCursorVariant] = useState<'default' | 'hover' | 'project' | 'link'>('default');
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const springConfig = { damping: 28, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Check if device supports fine hover
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    let rafId: number | null = null;
    let pendingEvent: MouseEvent | null = null;

    const processMove = () => {
      if (!pendingEvent) return;
      const e = pendingEvent;
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const target = e.target as HTMLElement | null;
      if (target) {
        const projectTarget = target.closest('[data-cursor="project"]');
        const linkTarget = target.closest('a, button, [role="button"], [data-cursor="pointer"]');

        if (projectTarget) {
          setCursorVariant((prev) => (prev !== 'project' ? 'project' : prev));
          setCursorText((prev) => (prev !== 'VIEW' ? 'VIEW' : prev));
        } else if (linkTarget) {
          setCursorVariant((prev) => (prev !== 'hover' ? 'hover' : prev));
          setCursorText((prev) => (prev !== '' ? '' : prev));
        } else {
          setCursorVariant((prev) => (prev !== 'default' ? 'default' : prev));
          setCursorText((prev) => (prev !== '' ? '' : prev));
        }
      }
      rafId = null;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setIsVisible(true);
      pendingEvent = e;
      if (rafId === null) {
        rafId = requestAnimationFrame(processMove);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [mouseX, mouseY]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <>
      {/* Primary Follower */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center -translate-x-1/2 -translate-y-1/2"
        style={{
          x: smoothX,
          y: smoothY,
        }}
      >
        <motion.div
          animate={{
            width: cursorVariant === 'project' ? 80 : cursorVariant === 'hover' ? 44 : 28,
            height: cursorVariant === 'project' ? 80 : cursorVariant === 'hover' ? 44 : 28,
            backgroundColor: cursorVariant === 'project' 
              ? 'rgba(6, 182, 212, 0.25)' 
              : cursorVariant === 'hover' 
              ? 'rgba(255, 255, 255, 0.12)' 
              : 'rgba(56, 189, 248, 0.08)',
            borderColor: cursorVariant === 'project' 
              ? 'rgba(56, 189, 248, 0.8)' 
              : cursorVariant === 'hover' 
              ? 'rgba(255, 255, 255, 0.5)' 
              : 'rgba(56, 189, 248, 0.4)',
            backdropFilter: cursorVariant === 'project' ? 'blur(8px)' : 'none',
          }}
          transition={{ type: 'spring', damping: 25, stiffness: 350 }}
          className="rounded-full border flex items-center justify-center shadow-lg transition-colors"
        >
          {cursorText && (
            <span className="text-[10px] font-mono font-bold tracking-widest text-cyan-200 uppercase select-none">
              {cursorText}
            </span>
          )}
        </motion.div>
      </motion.div>

      {/* Tiny Center Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] w-1.5 h-1.5 rounded-full bg-cyan-400 -translate-x-1/2 -translate-y-1/2 shadow-cyan-400/50 shadow-sm"
        style={{
          x: mouseX,
          y: mouseY,
          opacity: cursorVariant === 'project' ? 0 : 1,
        }}
      />
    </>
  );
};
