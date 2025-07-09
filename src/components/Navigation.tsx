import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, Code, Award, Mail, BookOpen, Briefcase } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { setIsHoveringNavbar } = useCursor();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about', icon: User },
    { name: 'Projects', href: '#projects', icon: Code },
    { name: 'Skills', href: '#skills', icon: Briefcase },
    { name: 'Education', href: '#education', icon: BookOpen },
    { name: 'Contact', href: '#contact', icon: Mail },
  ];

  const scrollTo = (id: string) => {
    const element = document.querySelector(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <>
      {/* Desktop Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled ? 'glass-effect' : 'bg-transparent'
        } px-2 md:top-4 md:left-1/2 md:right-auto md:transform md:-translate-x-1/2 md:max-w-2xl md:rounded-2xl`}
        onMouseEnter={() => setIsHoveringNavbar(true)}
        onMouseLeave={() => setIsHoveringNavbar(false)}
      >
        <div className="w-full flex items-center justify-center h-16">
            <div className="flex items-center justify-center w-full gap-x-8">
              {/* <motion.div
              whileHover={{ scale: 1.1 }}
              className="font-orbitron font-bold text-xl gradient-text cursor-pointer"
              onClick={() => scrollTo('#hero')}
            >
              ZA
              </motion.div> */}
            {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-x-8 ml-8">
              {navItems.map((item) => (
                <motion.button
                  key={item.name}
                  whileHover={{ scale: 1.1, color: '#00D4FF' }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => scrollTo(item.href)}
                  className="flex items-center space-x-2 text-white hover:text-cyan-400 transition-colors duration-200"
                >
                  <item.icon size={16} />
                  <span className="font-rajdhani font-medium">{item.name}</span>
                </motion.button>
              ))}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden text-white"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </motion.button>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="glass-effect h-full pt-20 px-6 rounded-xl">
              <div className="flex flex-col space-y-6">
                {navItems.map((item, index) => (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => scrollTo(item.href)}
                    className="flex items-center space-x-3 text-white hover:text-cyan-400 transition-colors duration-200 text-left"
                  >
                    <item.icon size={20} />
                    <span className="font-rajdhani font-medium text-lg">{item.name}</span>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;