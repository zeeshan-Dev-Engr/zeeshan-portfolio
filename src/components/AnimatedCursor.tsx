import React, { useEffect, useRef, useState } from 'react';

const AnimatedCursor: React.FC = () => {
  const mainDot = useRef<HTMLDivElement>(null);
  const ring1 = useRef<HTMLDivElement>(null);
  const ring2 = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if device is mobile
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth <= 768 || 'ontouchstart' in window;
      setIsMobile(isMobileDevice);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    // Only run cursor animation on desktop
    if (isMobile) {
      return;
    }

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ring1X = mouseX, ring1Y = mouseY;
    let ring2X = mouseX, ring2Y = mouseY;

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (mainDot.current) {
        mainDot.current.style.transform = `translate3d(${mouseX - 8}px, ${mouseY - 8}px, 0)`;
        mainDot.current.style.opacity = '1';
      }
      if (ring1.current) {
        ring1.current.style.transform = `translate3d(${mouseX - 20}px, ${mouseY - 20}px, 0)`;
        ring1.current.style.opacity = '1';
      }
      if (ring2.current) {
        ring2.current.style.transform = `translate3d(${mouseX - 32}px, ${mouseY - 32}px, 0)`;
        ring2.current.style.opacity = '1';
      }
    };

    const animate = () => {
      // Ring 1 follows with a faster speed
      ring1X += (mouseX - ring1X) * 0.35;
      ring1Y += (mouseY - ring1Y) * 0.35;
      if (ring1.current) {
        ring1.current.style.transform = `translate3d(${ring1X - 20}px, ${ring1Y - 20}px, 0)`;
      }
      // Ring 2 follows with a faster speed
      ring2X += (mouseX - ring2X) * 0.25;
      ring2Y += (mouseY - ring2Y) * 0.25;
      if (ring2.current) {
        ring2.current.style.transform = `translate3d(${ring2X - 32}px, ${ring2Y - 32}px, 0)`;
      }
      requestAnimationFrame(animate);
    };

    // Initialize cursor position to be hidden initially and positioned off-screen
    if (mainDot.current) {
      mainDot.current.style.opacity = '0';
      mainDot.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }
    if (ring1.current) {
      ring1.current.style.opacity = '0';
      ring1.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }
    if (ring2.current) {
      ring2.current.style.opacity = '0';
      ring2.current.style.transform = 'translate3d(-100px, -100px, 0)';
    }

    window.addEventListener('mousemove', moveCursor);
    animate();
    
    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('resize', checkMobile);
    };
  }, [isMobile]);

  // Don't render cursor on mobile
  if (isMobile) {
    return null;
  }

  return (
    <>
      {/* Main Dot */}
      <div
        ref={mainDot}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 16,
          height: 16,
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #00D4FF, #00FFB8)',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background 0.2s, opacity 0.3s',
          opacity: 0,
        }}
      />
      {/* Ring 1 */}
      <div
        ref={ring1}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '2px solid #00D4FF',
          background: 'rgba(0, 212, 255, 0.1)',
          pointerEvents: 'none',
          zIndex: 9998,
          transition: 'border 0.2s, opacity 0.2s, transform 0.1s',
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      />
      {/* Ring 2 (pulsing) */}
      {/* <div
        ref={ring2}
        className="animated-cursor-pulse"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: 64,
          height: 64,
          borderRadius: '50%',
          border: '2px solid #00FFB8',
          background: 'rgba(0, 255, 184, 0.08)',
          pointerEvents: 'none',
          zIndex: 9997,
          opacity: 0,
          transform: 'translate3d(-100px, -100px, 0)',
        }}
      /> */}
      <style>{`
        .animated-cursor-pulse {
          animation: cursorPulse 1.5s infinite;
        }
        @keyframes cursorPulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.15); opacity: 0.7; }
          100% { transform: scale(1); opacity: 1; }
        }
        html, body {
          cursor: none !important;
        }
        @media (max-width: 768px) {
          html, body {
            cursor: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default AnimatedCursor; 