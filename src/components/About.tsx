import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code, Rocket, Globe } from 'lucide-react';
import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiTypescript, SiPython, SiTailwindcss, SiJavascript, SiDocker, SiFigma, SiVercel, SiFirebase } from 'react-icons/si';
import { FaRobot, FaHtml5, FaCss3Alt, FaGitAlt } from 'react-icons/fa';


const About = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const features = [
    {
      icon: Brain,
      title: 'AI Innovation',
      description: 'Specialized in Generative AI and Prompt Engineering with IBM AI Developer certification',
    },
    {
      icon: Code,
      title: 'Full-Stack Development',
      description: 'Expert in MERN stack with React.js, Next.js, and modern web technologies',
    },
    {
      icon: Rocket,
      title: 'Performance Focused',
      description: 'Building high-performance applications with optimized user experiences',
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Creating scalable solutions for worldwide accessibility and impact',
    },
  ];

  const skills = [
    { name: 'React.js', icon: <SiReact color="#61DAFB" />, color: '#61DAFB' },
    { name: 'Next.js', icon: <SiNextdotjs color="#000" />, color: '#000000' },
    { name: 'Node.js', icon: <SiNodedotjs color="#3C873A" />, color: '#3C873A' },
    { name: 'Express.js', icon: <SiExpress color="#000" />, color: '#68D391' },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" />, color: '#47A248' },
    { name: 'TypeScript', icon: <SiTypescript color="#3178C6" />, color: '#3178C6' },
    { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" />, color: '#F7DF1E' },
    { name: 'Python', icon: <SiPython color="#3776AB" />, color: '#3776AB' },
    { name: 'AI', icon: <FaRobot color="#FFB800" />, color: '#FFB800' },
    { name: 'Tailwind CSS', icon: <SiTailwindcss color="#38BDF8" />, color: '#38BDF8' },
    { name: 'HTML5', icon: <FaHtml5 color="#E34F26" />, color: '#E34F26' },
    { name: 'CSS3', icon: <FaCss3Alt color="#1572B6" />, color: '#1572B6' },
    { name: 'Git', icon: <FaGitAlt color="#F05032" />, color: '#F05032' },
    { name: 'Docker', icon: <SiDocker color="#2496ED" />, color: '#2496ED' },
    { name: 'Figma', icon: <SiFigma color="#F24E1E" />, color: '#F24E1E' },
    { name: 'Vercel', icon: <SiVercel color="#000" />, color: '#000000' },
    { name: 'Firebase', icon: <SiFirebase color="#FFCA28" />, color: '#FFCA28' },
  ];

  return (
    <section id="about" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
            I'm a passionate Full-Stack MERN Developer and AI Innovator with expertise in creating 
            cutting-edge web applications. Currently pursuing my Bachelor's in Computer Science while 
            building production-ready applications that solve real-world problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              whileHover={{ 
                y: -10, 
                scale: 1.05,
                transition: { duration: 0.2, ease: "easeOut" }
              }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.2
              }}
              className="glass-effect p-6 rounded-lg hover:neon-glow transition-all duration-150"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full">
                  <feature.icon size={32} className="text-black" />
                </div>
                <h3 className="text-xl font-orbitron font-bold text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 font-rajdhani">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Rotating Circular Skills Ring */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-20 flex justify-center"
        >
          <div className="w-[500px] h-[500px] relative group">
            {/* Circular Ring Background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-96 h-96 rounded-full border-2 border-cyan-400/20 bg-gradient-to-r from-cyan-400/5 to-blue-500/5 backdrop-blur-sm" />
            </div>
            
            {/* Rotating Container */}
            <motion.div 
              className="absolute inset-0 pointer-events-auto"
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              whileHover={{ 
                rotate: 0,
                transition: { duration: 0.5, ease: "easeOut" }
              }}
            >
              {/* Moving Icons in Circle */}
              {skills.map((skill, index) => {
                const angle = (index / skills.length) * Math.PI * 2;
                const radius = 180; // Increased radius for more spacing
                const x = Math.cos(angle) * radius + 250; // Center offset
                const y = Math.sin(angle) * radius + 250; // Center offset
                
                return (
                  <motion.div
                    key={skill.name}
                    className="absolute flex items-center justify-center cursor-pointer group"
                    style={{
                      left: x - 30,
                      top: y - 30,
                      transform: 'translate(-50%, -50%)'
                    }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ 
                      delay: 0.8 + index * 0.05,
                      type: 'spring',
                      stiffness: 300,
                      damping: 20
                    }}
                    whileHover={{ 
                      scale: 1.3, 
                      y: -15,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    {/* Icon Container */}
                    <motion.div 
                      className="relative w-20 h-20 rounded-full flex items-center justify-center shadow-xl border-2 overflow-hidden"
                      style={{ 
                        background: `linear-gradient(135deg, ${skill.color}25, ${skill.color}08)`,
                        borderColor: skill.color,
                        boxShadow: `0 6px 25px ${skill.color}40`
                      }}
                      whileHover={{
                        background: `linear-gradient(135deg, ${skill.color}60, ${skill.color}25)`,
                        boxShadow: `0 8px 35px ${skill.color}70`,
                        borderColor: '#FFFFFF',
                        transition: { duration: 0.3 }
                      }}
                    >
                      {/* Glow Effect */}
                      <div 
                        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(circle at center, ${skill.color}30, transparent 70%)`
                        }}
                      />
                      
                      {/* Icon */}
                      <motion.div 
                        className="relative text-3xl z-10 transition-all duration-300"
                        style={{ color: skill.color }}
                        whileHover={{
                          scale: 1.15,
                          color: '#FFFFFF',
                          filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.6))',
                          transition: { duration: 0.3 }
                        }}
                      >
                        {skill.icon}
                      </motion.div>
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {/* Center Glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="w-32 h-32 rounded-full bg-gradient-to-r from-cyan-400/20 to-blue-500/20 blur-xl animate-pulse" />
            </div>
            
            {/* Skills Heading - Appears on Hover */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <h1 className="text-4xl font-orbitron font-bold gradient-text text-center opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out">
                Skills
              </h1>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="glass-effect p-8 rounded-lg inline-block">
            <h3 className="text-2xl font-orbitron font-bold mb-4 gradient-text">
              Current Focus
            </h3>
            <p className="text-gray-300 font-rajdhani text-lg max-w-2xl">
              Building innovative AI-powered applications while mastering advanced React patterns, 
              Three.js for 3D experiences, and exploring the latest in web technologies. 
              Always eager to take on challenging projects that push the boundaries of what's possible.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;