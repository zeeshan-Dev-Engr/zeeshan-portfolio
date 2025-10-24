import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Brain, Code, Rocket, Globe } from 'lucide-react';
import { SiReact, SiNextdotjs, SiNodedotjs, SiExpress, SiMongodb, SiTypescript, SiPython, SiTailwindcss, SiJavascript } from 'react-icons/si';
import { FaRobot } from 'react-icons/fa';

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
    { name: 'React.js', icon: <SiReact color="#61DAFB" /> },
    { name: 'Next.js', icon: <SiNextdotjs color="#000" /> },
    { name: 'Node.js', icon: <SiNodedotjs color="#3C873A" /> },
    { name: 'Express.js', icon: <SiExpress color="#000" /> },
    { name: 'MongoDB', icon: <SiMongodb color="#47A248" /> },
    { name: 'TypeScript', icon: <SiTypescript color="#3178C6" /> },
    { name: 'JavaScript', icon: <SiJavascript color="#F7DF1E" /> },
    { name: 'Python', icon: <SiPython color="#3776AB" /> },
    { name: 'AI', icon: <FaRobot color="#FFB800" /> },
    { name: 'Tailwind CSS', icon: <SiTailwindcss color="#38BDF8" /> },
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

        {/* Animated Skills Icons */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-8 mt-16"
        >
          {skills.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, y: 30, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              whileHover={{ 
                scale: 1.2, 
                rotate: 8,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              transition={{ 
                delay: idx * 0.12, 
                type: 'spring', 
                stiffness: 200
              }}
              className="flex flex-col items-center"
            >
              <div className="text-5xl mb-2">{skill.icon}</div>
              <span className="text-xs text-gray-300 font-rajdhani">{skill.name}</span>
            </motion.div>
          ))}
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