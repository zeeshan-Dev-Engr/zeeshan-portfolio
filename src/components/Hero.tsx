import React, { Suspense, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial } from '@react-three/drei';
import { Github, Linkedin, Mail, } from 'lucide-react';
import CredlyIcon from './icons/CredlyIcon';

const AnimatedSphere = ({ scale = 2 }: { scale?: number }) => {
  return (
    <Sphere args={[1, 100, 200]} scale={scale}>
      <MeshDistortMaterial
        color="#00D4FF"
        attach="material"
        distort={0.5}
        speed={2}
        roughness={0}
      />
    </Sphere>
  );
};

// Simple hook to detect mobile screen
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return isMobile;
};

// Typewriter effect for h1
const useTypewriter = (text: string, speed: number = 60) => {
  const [displayed, setDisplayed] = useState('');
  useEffect(() => {
    let i = 0;
    setDisplayed('');
    const interval = setInterval(() => {
      setDisplayed((prev) => text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);
  return displayed;
};

const Hero = () => {
  const socialLinks = [
    { icon: Github, href: 'https://github.com/zeeshan-Dev-Engr', label: 'GitHub' },
    { icon: Linkedin, href: 'https://www.linkedin.com/in/zeeshan-anwar-73a8a828a/', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:anwarzeeshan484@gmail.com', label: 'Email' },
    { icon: CredlyIcon, href: 'https://www.credly.com/users/zeeshan-anwar.af7e7562/edit#credly', label: 'Credly' },
  ];

  const isMobile = useIsMobile();

  // Typewriter for h1
  const heading = useTypewriter('Zeeshan\nAnwar', 300);

  return (
    <section id="hero" className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      {/* Mobile: Profile Image + Sphere at Top */}
      <div className="w-full flex flex-col items-center justify-center mt-6 mb-0 lg:hidden">
        <div className="relative flex items-center justify-center w-56 h-56 mb-0" style={{ background: 'transparent' }}>
          <Canvas camera={{ position: [0, 0, 3] }} className="absolute top-0 left-0 w-full h-full z-0" style={{ background: 'transparent' }}>
            <Suspense fallback={null}>
              <OrbitControls enableZoom={false} enablePan={false} />
              <ambientLight intensity={0.5} />
              <directionalLight position={[10, 10, 5]} intensity={1} />
              <AnimatedSphere scale={1.5} />
            </Suspense>
          </Canvas>
          <motion.img
            src="/profile.jpg"
            alt="Profile"
            className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full pointer-events-none border-4 border-cyan-400 shadow-lg z-10"
            style={{ translate: '-50% -50%' }} // بدلیں: transform کی بجائے translate
            animate={{
              y: [0, -12, 0, 12, 0],
              scale: [1, 1.04, 1, 0.98, 1],
              rotate: [0, 2, 0, -2, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>
      </div>

      {/* 3D Animated Sphere (Desktop) */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden lg:block">
        <Canvas camera={{ position: [0, 0, 5] }}>
          <Suspense fallback={null}>
            <OrbitControls enableZoom={false} enablePan={false} />
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <AnimatedSphere scale={2} />
          </Suspense>
        </Canvas>
        {/* Profile Picture Overlay (Desktop) */}
        <motion.img
          src="/profile.jpg"
          alt="Profile"
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none border-4 border-cyan-400 shadow-lg hidden lg:block"
          style={{ zIndex: 2, translate: '-50% -50%' }} // add translate
          animate={{
            y: [0, -18, 0, 18, 0],
            scale: [1, 1.03, 1, 0.97, 1],
            rotate: [0, 2, 0, -2, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center min-h-screen w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.h1
                className="text-5xl md:text-7xl font-orbitron font-bold leading-tight whitespace-pre-line"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                <span className="gradient-text">{heading.split('\n')[0]}</span>
                <br />
                <span className="text-white">{heading.split('\n')[1] || ''}</span>
                <span className="text-cyan-400 animate-pulse">|</span>
              </motion.h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-2"
            >
              <p className="text-xl md:text-2xl text-cyan-400 font-rajdhani font-medium">
                Autonomous AI Innovator
              </p>
              <p className="text-lg md:text-xl text-white font-rajdhani">
                Full-Stack MERN Developer | React.js & Next.js Specialist
              </p>
              <p className="text-base md:text-lg text-gray-300 font-rajdhani">
                📍 Chakwal, Pakistan | 📞 +92-334-5359089
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-4"
            >
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  whileHover={{ scale: 1.2, y: -5 }}
                  whileTap={{ scale: 0.9 }}
                  className="glass-effect p-3 rounded-lg hover:neon-glow transition-all duration-300"
                >
                  <social.icon size={24} className="text-cyan-400" />
                </motion.a>
              ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-rajdhani font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300"
                onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
              >
                View My Work
              </motion.button>
              <motion.a
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                href="/Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 glass-effect border border-cyan-400 text-cyan-400 font-rajdhani font-semibold rounded-lg hover:bg-cyan-400 hover:text-black transition-all duration-300 flex items-center justify-center"
              >
                Resume
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Mobile 3D Element removed: now handled globally at the top for mobile */}
        </div>
      </div>
    </section>
  );
};

export default Hero;