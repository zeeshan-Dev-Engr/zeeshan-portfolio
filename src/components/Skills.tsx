import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Code, Database, Brain, Smartphone, Cloud, Settings } from 'lucide-react';

const Skills = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skillCategories = [
    {
      title: 'Frontend Development',
      icon: Code,
      skills: [
        { name: 'React.js', level: 95 },
        { name: 'Next.js', level: 90 },
        { name: 'TypeScript', level: 85 },
        { name: 'JavaScript', level: 95 },
        { name: 'HTML/CSS', level: 90 },
        { name: 'Tailwind CSS', level: 90 },
      ],
      gradient: 'from-blue-500 to-purple-500',
    },
    {
      title: 'Backend Development',
      icon: Database,
      skills: [
        { name: 'Node.js', level: 85 },
        { name: 'Express.js', level: 80 },
        { name: 'MongoDB', level: 85 },
        { name: 'Python', level: 80 },
        { name: 'REST APIs', level: 90 },
        { name: 'JWT Auth', level: 85 },
      ],
      gradient: 'from-green-500 to-teal-500',
    },
    {
      title: 'AI & Data Science',
      icon: Brain,
      skills: [
        { name: 'Generative AI', level: 85 },
        { name: 'Prompt Engineering', level: 90 },
        { name: 'Machine Learning', level: 75 },
        { name: 'Data Analysis', level: 80 },
        { name: 'NLP', level: 75 },
        { name: 'AI Integration', level: 85 },
      ],
      gradient: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Mobile & Responsive',
      icon: Smartphone,
      skills: [
        { name: 'Responsive Design', level: 95 },
        { name: 'Mobile-First', level: 90 },
        { name: 'PWA', level: 80 },
        { name: 'Cross-Browser', level: 85 },
        { name: 'Performance', level: 85 },
        { name: 'Accessibility', level: 80 },
      ],
      gradient: 'from-orange-500 to-red-500',
    },
    {
      title: 'Cloud & Deployment',
      icon: Cloud,
      skills: [
        { name: 'Vercel', level: 90 },
        { name: 'Netlify', level: 85 },
        { name: 'MongoDB Atlas', level: 85 },
        { name: 'Git/GitHub', level: 95 },
        { name: 'CI/CD', level: 75 },
        { name: 'Docker', level: 70 },
      ],
      gradient: 'from-cyan-500 to-blue-500',
    },
    {
      title: 'Tools & Others',
      icon: Settings,
      skills: [
        { name: 'Vite', level: 90 },
        { name: 'Webpack', level: 75 },
        { name: 'ESLint', level: 85 },
        { name: 'Prettier', level: 90 },
        { name: 'Figma', level: 80 },
        { name: 'Postman', level: 85 },
      ],
      gradient: 'from-yellow-500 to-orange-500',
    },
  ];

  return (
    <section id="skills" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
            A comprehensive overview of my technical expertise and proficiency levels
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: categoryIndex * 0.1 }}
              className="glass-effect p-6 rounded-lg hover:neon-glow transition-all duration-300"
            >
              <div className="flex items-center mb-6">
                <div className={`p-3 bg-gradient-to-r ${category.gradient} rounded-full mr-4`}>
                  <category.icon size={24} className="text-white" />
                </div>
                <h3 className="text-xl font-orbitron font-bold text-white">
                  {category.title}
                </h3>
              </div>

              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skill.name}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-gray-300 font-rajdhani font-medium">
                        {skill.name}
                      </span>
                      <span className="text-cyan-400 font-rajdhani font-bold">
                        {skill.level}%
                      </span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={inView ? { width: `${skill.level}%` } : {}}
                        transition={{ duration: 1, delay: categoryIndex * 0.1 + skillIndex * 0.1 }}
                        className={`h-2 rounded-full bg-gradient-to-r ${category.gradient}`}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;