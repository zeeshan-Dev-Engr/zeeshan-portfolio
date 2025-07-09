import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Github, ExternalLink, ShoppingCart, MapPin, Briefcase, ChefHat, Calculator, CheckSquare, Newspaper, CloudSun } from 'lucide-react';
import { useCursor } from '../context/CursorContext';

const Projects = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const { setIsHoveringCard } = useCursor();
  const [tilt, setTilt] = useState<Record<string, { x: number; y: number } | undefined>>({});

  const projects = [
    {
      title: 'NexaShop',
      subtitle: 'Full-Stack E-Commerce Platform',
      description: 'A complete e-commerce solution with multi-currency support, JWT authentication, real-time analytics, and admin dashboard. Built with React 18, TypeScript, and modern web technologies.',
      tech: ['React 18', 'TypeScript', 'Tailwind CSS', 'Context API', 'Framer Motion', 'Recharts'],
      icon: ShoppingCart,
      github: 'https://github.com/zeeshan-Dev-Engr/NexaShop-Ecommerce',
      demo: 'https://nexa-shop-ecommerce.vercel.app/',
      gradient: 'from-purple-500 to-pink-500',
      image: '/Ecommers.png',
    },
    {
      title: 'Travel Guide App',
      subtitle: 'Global Travel Information Platform',
      description: 'Comprehensive travel guide with country information, visa requirements, currency details, and map integration using REST Countries API and GeoDB Cities API.',
      tech: ['React.js', 'REST API', 'GeoDB API', 'Map Integration'],
      icon: MapPin,
      github: 'https://github.com/zeeshan-Dev-Engr/travel-guide-app',
      demo: 'https://travel-guide-app-d4l9.vercel.app/',
      gradient: 'from-blue-500 to-cyan-500',
      image: '/Traval_guide.png',
    },
    {
      title: 'Z.jobs',
      subtitle: 'Remote Job Search Platform',
      description: 'Modern job search application with advanced filtering, bookmarking, resume upload, and dark mode. Built with Next.js App Router and Zustand state management.',
      tech: ['Next.js', 'Tailwind CSS', 'Zustand', 'Remotive API'],
      icon: Briefcase,
      github: 'https://github.com/zeeshan-Dev-Engr/Z.jobs1',
      demo: 'https://z-jobs1.vercel.app/',
      gradient: 'from-green-500 to-emerald-500',
      image: '/z.jobs.png',
    },
    {
      title: 'AI Recipe Finder',
      subtitle: 'Intelligent Recipe Discovery',
      description: 'AI-powered recipe application with dietary filters, nutrition visualization, and smart keyword analysis. Reduced meal-planning time by 65% through intelligent recommendations.',
      tech: ['React.js', 'Spoonacular API', 'NLP', 'Data Visualization'],
      icon: ChefHat,
      github: 'https://github.com/zeeshan-Dev-Engr/Ai-recipe-finder',
      demo: 'https://ai-recipe-finder-wheat.vercel.app/',
      gradient: 'from-orange-500 to-red-500',
      image: '/Ai_recpi.png',
    },
    {
      title: 'Product Management App',
      subtitle: 'Full-Stack MERN Application',
      description: 'Complete product management system with CRUD operations, RESTful API, and real-time state management. Features responsive design and cloud deployment.',
      tech: ['MERN Stack', 'Zustand', 'MongoDB Atlas', 'Vercel'],
      icon: CheckSquare,
      github: 'https://github.com/zeeshan-Dev-Engr/Basic_product_mern_app',
      demo: 'https://basic-product-mern-app.vercel.app/',
      gradient: 'from-indigo-500 to-purple-500',
      image: '/product_app.png',
    },
    {
      title: 'Currency Converter',
      subtitle: 'Real-Time Exchange Rate App',
      description: 'Responsive currency converter with real-time exchange rates, instant currency swap functionality, and mobile-optimized design using Next.js and Exchange Rate API.',
      tech: ['Next.js', 'Exchange Rate API', 'React Hooks', 'Responsive Design'],
      icon: Calculator,
      github: 'https://github.com/zeeshan-Dev-Engr/Currency-Converter-Next.js',
      demo: 'https://currency-converter-next-js-5wxg.vercel.app/',
      gradient: 'from-yellow-500 to-orange-500',
      image: '/converter.png',
    },
    {
      title: 'IP Geolocation Tool',
      description: 'Discover the geographic location, timezone, and detailed information of any IP address',
      image: '/ip.png',
      tech: ['Next.js', 'React Hooks', 'Tailwind CSS', 'Vercel'],
      icon: MapPin,
      github: 'https://github.com/zeeshan-Dev-Engr/IP-Geolocation-Tool',
      demo: 'https://ip-geolocation-tool-lac.vercel.app/',
      gradient: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'GitHub User Finder',
      description: 'Built a GitHub User Finder with React & Tailwind CSS that searches profiles, displays repos/followers, and features dark/light mode',
      image: '/github.png',
      tech: ['React.js', 'React Hooks', 'Tailwind CSS', 'Vercel'],
      icon: Github,
      github: 'https://github.com/zeeshan-Dev-Engr/github-user-finder',
      demo: 'https://github-user-finder-weld.vercel.app/',
      gradient: 'from-gray-700 to-gray-900',
    },
    {
      title: 'Ai Resuma builder',
      description: 'Just put your information.it will give you resuma in pdf form.',
      image: '/Resuma_builder.png',
      tech: ['Vite App', 'React Hooks', 'Tailwind CSS','state managment'],
      icon: Briefcase,
      github: 'https://github.com/zeeshan-Dev-Engr/AI-Resume-Builder',
      demo: 'https://ai-resume-builder-7xlz.vercel.app/',
      gradient: 'from-pink-500 to-purple-500',
    },
    {
      title: 'DevNews',
      description: 'DevNews is a sleek developer news platform that aggregates content from top sources like Medium, Dev.to, Hashnode, TechCrunch, and delivers it directly via a Telegram bot for seamless updates',
      image: '/newdev.png',
      tech: ['Next.js', 'React Hooks', 'Tailwind CSS','framer motion'],
      icon: Newspaper,
      github: 'https://github.com/zeeshan-Dev-Engr/devnews-app',
      demo: 'https://devnews-app-9np8.vercel.app/',
      gradient: 'from-yellow-500 to-orange-500',
    },
    {
      title: 'Weather Forecast',
      description: 'Weather App delivers real-time hourly and 7 day forecasts, UV index, air quality, and sunrise/sunset times in a sleek, easy-to-navigate interface.',
      image: '/Weather.png',
      tech: ['Next.js', 'React Hooks', 'Tailwind CSS', 'Vercel'],
      icon: CloudSun,
      github: 'https://github.com/zeeshan-Dev-Engr/weather_app',
      demo: 'https://weather-app-theta-red-4nudvvfez4.vercel.app/',
      gradient: 'from-blue-400 to-blue-700',
    },
    {
      title: 'Todo app',
      description: 'To‑Do App makes task management effortless with fast add/edit/delete and tag-based organization, saving items in local storage for seamless persistence.',
      image: '/todo_list.png',
      tech: ['Next.js', 'React Hooks', 'Tailwind CSS', 'Vercel'],
      icon: CheckSquare,
      github: 'https://github.com/zeeshan-Dev-Engr/Todo_Next.js',
      demo: 'https://todo-next-js-liard.vercel.app/',
      gradient: 'from-green-500 to-emerald-500',
    },
  ];

  const [visibleCount, setVisibleCount] = useState(6);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
            A showcase of my latest work in web development, AI integration, and full-stack applications
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.slice(0, visibleCount).map((project, index) => {
            const cardKey = project.title;
            return (
              <motion.div
                key={cardKey}
                initial={{ opacity: 0, y: 50, scale: 0.95 }}
                animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: index * 0.1, type: 'spring', stiffness: 120 }}
                style={{
                  transform: tilt[cardKey]
                    ? `perspective(800px) rotateX(${tilt[cardKey].x}deg) rotateY(${tilt[cardKey].y}deg) scale(1.04)`
                    : undefined,
                  boxShadow: tilt[cardKey]
                    ? '0 8px 32px 0 rgba(0,255,255,0.18), 0 0 0 4px #06b6d4' : undefined,
                  filter: tilt[cardKey] ? 'brightness(1.08)' : undefined,
                }}
                className="glass-effect rounded-lg overflow-hidden hover:neon-glow transition-all duration-300"
                onMouseEnter={() => setIsHoveringCard(true)}
                onMouseLeave={() => {
                  setIsHoveringCard(false);
                  setTilt((prev) => ({ ...prev, [cardKey]: undefined }));
                }}
                onMouseMove={e => {
                  const card = e.currentTarget;
                  const rect = card.getBoundingClientRect();
                  const x = e.clientX - rect.left;
                  const y = e.clientY - rect.top;
                  const rotateY = ((x / rect.width) - 0.5) * 18; // left/right
                  const rotateX = ((0.5 - y / rect.height)) * 18; // up/down
                  setTilt(prev => ({ ...prev, [cardKey]: { x: rotateX, y: rotateY } }));
                }}
              >
                <div className={`h-2 bg-gradient-to-r ${project.gradient}`} />
                {/* Project Image */}
                <div className="relative overflow-hidden">
                  <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-40 object-cover rounded-b-none rounded-t-lg mb-0"
                    loading="lazy"
                    whileHover={{ scale: 1.08, filter: 'brightness(1.15)' }}
                    transition={{ type: 'spring', stiffness: 200 }}
                  />
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-t from-cyan-500/30 to-transparent pointer-events-none"
                    initial={{ opacity: 0 }}
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 bg-gradient-to-r ${project.gradient} rounded-full`}>
                      <project.icon size={24} className="text-white" />
                    </div>
                    <div className="flex space-x-3">
                      <motion.a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <Github size={20} />
                      </motion.a>
                      <motion.a
                        href={project.demo}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.9 }}
                        className="text-gray-400 hover:text-cyan-400 transition-colors"
                      >
                        <ExternalLink size={20} />
                      </motion.a>
                    </div>
                  </div>

                  <h3 className="text-xl font-orbitron font-bold text-white mb-2">
                    {project.title}
                  </h3>
                  <p className="text-cyan-400 font-rajdhani font-medium mb-3">
                    {project.subtitle}
                  </p>
                  <p className="text-gray-300 font-rajdhani mb-4 text-sm">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 bg-gray-800 text-cyan-400 rounded-full text-xs font-rajdhani"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
        {visibleCount < projects.length && (
          <button
            onClick={() => setVisibleCount(v => v + 3)}
            className="mx-auto mt-8 flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white rounded-lg hover:bg-cyan-600 transition"
          >
            <svg className="animate-spin h-5 w-5 mr-2" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="white" strokeWidth="4" fill="none"/>
              <path className="opacity-75" fill="white" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"/>
            </svg>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default Projects;