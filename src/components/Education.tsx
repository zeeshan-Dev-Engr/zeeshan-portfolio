import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { GraduationCap, Award, Calendar, MapPin } from 'lucide-react';

const Education = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const education = {
    degree: 'Bachelor of Science in Computer Science',
    university: 'Virtual University of Pakistan',
    period: 'Sep 2023 – Present',
    status: 'In Progress',
  };

  const certifications = [
    {
      title: 'Python for Data Science, AI & Development',
      provider: 'IBM',
      year: '2024',
      icon: '🐍',   
      link: 'https://www.coursera.org/account/accomplishments/verify/FMK0EJH84E9R',
    },
    {
      title: 'IBM AI Developer Professional Certificate',
      provider: 'IBM',
      year: '2024',
      icon: '🤖',
      link: 'https://www.coursera.org/account/accomplishments/professional-cert/1K3LZ5V57SHX',
    },
    {
      title: 'Meta Front-End Professional Certificate',
      provider: 'Meta',
      year: '2024',
      icon: '⚛️',
      link: 'https://www.coursera.org/account/accomplishments/specialization/CPL1V97UIKXH',
    },
    {
      title: 'Programming with JavaScript',
      provider: 'Coursera',
      year: '2024',
      icon: '💻',
      link: 'https://www.coursera.org/account/accomplishments/verify/QVXMIHKUZ5R7',
    },
  ];

  return (
    <section id="education" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Education & <span className="gradient-text">Certifications</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
            My academic journey and professional certifications in technology and AI
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-4">
                <GraduationCap size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white">
                Education
              </h3>
            </div>

            <motion.div
              whileHover={{ 
                scale: 1.02, 
                y: -5,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              className="glass-effect p-6 rounded-lg hover:neon-glow transition-all duration-150"
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-orbitron font-bold text-white mb-2">
                    {education.degree}
                  </h4>
                  <p className="text-cyan-400 font-rajdhani font-medium mb-2">
                    {education.university}
                  </p>
                </div>
                <span className="px-4 bg-green-500 text-white rounded-full text-center text-sm font-rajdhani font-bold">
                  {education.status}
                </span>
              </div>
              
              <div className="flex items-center space-x-4 text-gray-300">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-2" />
                  <span className="font-rajdhani">{education.period}</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={16} className="mr-2" />
                  <span className="font-rajdhani">Pakistan</span>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Certifications */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            <div className="flex items-center mb-8">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-green-500 rounded-full mr-4">
                <Award size={32} className="text-white" />
              </div>
              <h3 className="text-2xl font-orbitron font-bold text-white">
                Certifications
              </h3>
            </div>

            <div className="space-y-4">
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  whileHover={{ 
                    scale: 1.02, 
                    x: 10,
                    transition: { duration: 0.15, ease: "easeOut" }
                  }}
                  className="glass-effect p-4 rounded-lg hover:neon-glow transition-all duration-150"
                >
                  <div className="flex items-center">
                    <div className="text-3xl mr-4">
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-orbitron font-bold text-white mb-1 flex items-center">
                        {cert.link ? (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-cyan-400 transition-colors underline"
                          >
                            {cert.title}
                          </a>
                        ) : (
                          cert.title
                        )}
                        {cert.link && (
                          <a
                            href={cert.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 px-2 py-0.5 ml-2 bg-green-600 text-white text-xs rounded-full font-rajdhani hover:bg-green-700 transition"
                            title="Verify Certificate"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                            Verify
                          </a>
                        )}
                      </h4>
                      <div className="flex items-center justify-between">
                        <p className="text-cyan-400 font-rajdhani font-medium">
                          {cert.provider}
                        </p>
                        <span className="text-gray-400 font-rajdhani">
                          {cert.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Certifications', value: '4+' },
            { label: 'Years Learning', value: '3+' },
            { label: 'Projects Built', value: '15+' },
            { label: 'Technologies', value: '20+' },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: 1 + index * 0.1 }}
              whileHover={{ 
                scale: 1.05,
                transition: { duration: 0.15, ease: "easeOut" }
              }}
              className="glass-effect p-6 rounded-lg text-center hover:neon-glow transition-all duration-150"
            >
              <div className="text-3xl md:text-4xl font-orbitron font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-gray-300 font-rajdhani">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Education;