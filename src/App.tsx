import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Education from './components/Education';
import Contact from './components/Contact';
import Navigation from './components/Navigation';
import ParticleBackground from './components/ParticleBackground';
import AnimatedCursor from './components/AnimatedCursor';
import { CursorProvider } from './context/CursorContext';
import './styles/globals.css';

function App() {
  return (
    <CursorProvider>
      <AnimatedCursor />
    <div className="relative min-h-screen bg-black overflow-x-hidden">
      {/* 3D Background */}
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          style={{ background: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 50%, #16213e 100%)' }}
        >
          <Suspense fallback={null}>
            <ParticleBackground />
          </Suspense>
        </Canvas>
      </div>
      
      {/* Navigation */}
      <Navigation />
      
      {/* Content */}
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Contact />
      </div>
    </div>
    </CursorProvider>
  );
}

export default App;