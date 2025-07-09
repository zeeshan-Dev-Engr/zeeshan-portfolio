import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Mail, Phone, MapPin, Send, Github, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';

const Contact = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const form = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!form.current) return;
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    emailjs.sendForm(
      serviceId,
      templateId,
      form.current,
      publicKey
    )
    .then((result) => {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      form.current?.reset();
    }, (error) => {
      setSubmitted(false);
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'anwarzeeshan484@gmail.com',
      href: 'mailto:anwarzeeshan484@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+92-334-5359089',
      href: 'tel:+923345359089',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Chakwal, Pakistan',
      href: '#',
    },
  ];

  const socialLinks = [
    {
      icon: Github,
      label: 'GitHub',
      href: 'https://github.com/zeeshan-Dev-Engr',
      username: 'zeeshan-Dev-Engr',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      href: 'https://www.linkedin.com/in/zeeshan-anwar-73a8a828a/',
      username: 'Zeeshan Anwar',
    }
  ];

  return (
    <section id="contact" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-orbitron font-bold mb-6">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto font-rajdhani">
            Ready to collaborate on your next project? Let's discuss how we can create something amazing together.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="glass-effect p-8 rounded-lg">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6">
                Send Me a Message
              </h3>
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                    Name
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white font-rajdhani"
                    placeholder="Your Name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                    Email
                  </label>
                  <motion.input
                    whileFocus={{ scale: 1.02 }}
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white font-rajdhani"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-rajdhani font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <motion.textarea
                    whileFocus={{ scale: 1.02 }}
                    id="message"
                    name="message"
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-cyan-400 transition-colors text-white font-rajdhani resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <input type="hidden" name="time" value={new Date().toLocaleString()} />

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="w-full px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-black font-rajdhani font-semibold rounded-lg hover:shadow-lg hover:shadow-cyan-400/50 transition-all duration-300 flex items-center justify-center"
                >
                  <Send size={20} className="mr-2" />
                  Send Message
                </motion.button>
              </form>
              {submitted && (
                <div className="mt-4 p-4 bg-green-100 text-green-800 rounded-lg text-center font-rajdhani">
                  Thank you for submitting the form!
                </div>
              )}
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {/* Contact Information */}
            <div className="glass-effect p-8 rounded-lg">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6">
                Contact Information
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <motion.div
                    key={info.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                    whileHover={{ x: 10 }}
                    className="flex items-center space-x-4"
                  >
                    <div className="p-3 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full">
                      <info.icon size={20} className="text-black" />
                    </div>
                    <div>
                      <p className="text-gray-400 font-rajdhani text-sm">
                        {info.label}
                      </p>
                      <a
                        href={info.href}
                        className="text-white font-rajdhani font-medium hover:text-cyan-400 transition-colors"
                      >
                        {info.value}
                      </a>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Social Links */}
            <div className="glass-effect p-8 rounded-lg">
              <h3 className="text-2xl font-orbitron font-bold text-white mb-6">
                Connect With Me
              </h3>
              
              <div className="space-y-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    className="flex items-center space-x-4 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    <social.icon size={24} className="text-cyan-400" />
                    <div>
                      <p className="text-white font-rajdhani font-medium">
                        {social.label}
                      </p>
                      <p className="text-gray-400 font-rajdhani text-sm">
                        {social.username}
                      </p>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 1 }}
          className="mt-16 pt-8 border-t border-gray-800 text-center"
        >
          <p className="text-gray-400 font-rajdhani">
            © 2024 Zeeshan Anwar. All rights reserved.
          </p>
          <p className="text-gray-500 font-rajdhani text-sm mt-2">
            Built with React, Three.js, and Framer Motion
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;