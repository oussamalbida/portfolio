'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';

function ImageCard() {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["17.5deg", "-17.5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-17.5deg", "17.5deg"]);

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative w-full h-[500px] rounded-2xl overflow-hidden"
    >
      <motion.div 
        className="image-wrapper w-full h-full"
        style={{
          transformStyle: "preserve-3d",
        }}
      >
        <Image
          src="/me 2.jpg"
          alt="About Me"
          fill
          className="object-cover rounded-2xl"
          priority
        />
        <motion.div
          style={{
            rotateX,
            rotateY,
            scale: 1.2,
          }}
          className="absolute inset-0 bg-gradient-to-tr from-transparent via-transparent to-[var(--primary-color)] opacity-30 pointer-events-none"
        />
      </motion.div>
    </motion.div>
  );
}

const fadeIn = (direction, delay) => ({
  hidden: {
    y: direction === 'up' ? 40 : direction === 'down' ? -40 : 0,
    opacity: 0,
    x: direction === 'left' ? 40 : direction === 'right' ? -40 : 0,
    scale: 0.95,
  },
  show: {
    y: 0,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      duration: 1.4,
      delay,
      bounce: 0.3,
    },
  },
});

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const navAnimation = {
  hidden: { y: -20, opacity: 0 },
  show: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
      damping: 20,
    },
  },
};

const SkillBar = ({ skill, percentage, description }) => {
  const [showDetails, setShowDetails] = useState(false);

  // Define related skills for each main skill
  const relatedSkills = {
    "React": [
      { icon: "fab fa-react", name: "React.js" },
      { icon: "fab fa-js", name: "JavaScript" },
      { icon: "fab fa-html5", name: "HTML5" },
      { icon: "fab fa-css3-alt", name: "CSS3" },
      { icon: "fab fa-bootstrap", name: "Bootstrap" },
      { icon: "fab fa-sass", name: "Tailwind" }
    ],
    "Next.js": [
      { icon: "fab fa-react", name: "Next.js" },
      { icon: "fab fa-js", name: "JavaScript" },
      { icon: "fab fa-node", name: "Node.js" },
      { icon: "fab fa-css3-alt", name: "CSS3" },
      { icon: "fab fa-bootstrap", name: "Bootstrap" },
      { icon: "fab fa-sass", name: "Tailwind" }
    ],
    "Node.js": [
      { icon: "fab fa-node", name: "Node.js" },
      { icon: "fab fa-js", name: "JavaScript" },
      { icon: "fas fa-database", name: "MongoDB" },
      { icon: "fas fa-server", name: "Express.js" }
    ],
    "Laravel": [
      { icon: "fab fa-php", name: "PHP" },
      { icon: "fab fa-laravel", name: "Laravel" },
      { icon: "fas fa-database", name: "MySQL" },
      { icon: "fab fa-html5", name: "HTML5" },
      { icon: "fab fa-css3-alt", name: "CSS3" },
      { icon: "fab fa-bootstrap", name: "Bootstrap" }
    ],
    "Database Management": [
      { icon: "fas fa-database", name: "MySQL" },
      { icon: "fas fa-database", name: "MongoDB" },
      { icon: "fas fa-server", name: "SQL" },
      { icon: "fas fa-code-branch", name: "NoSQL" }
    ],
    "UI/UX Design": [
      { icon: "fab fa-figma", name: "Figma" },
      { icon: "fab fa-sketch", name: "Sketch" },
      { icon: "fab fa-adobe", name: "Adobe XD" },
      { icon: "fab fa-html5", name: "HTML5" },
      { icon: "fab fa-css3-alt", name: "CSS3" },
      { icon: "fab fa-sass", name: "Tailwind" }
    ]
  };

  return (
    <motion.div 
      className="relative p-6 rounded-2xl bg-[#0B1221] border border-[#1E2D3D]"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ y: -5 }}
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white text-xl font-semibold">{skill}</h3>
        <span className="skill-percentage font-bold text-lg">{percentage}%</span>
      </div>
      
      <div className="relative h-2 bg-[#1E2D3D] rounded-full mb-4">
        <motion.div 
          className="skill-progress absolute top-0 left-0 h-full rounded-full"
          initial={{ width: 0 }}
          whileInView={{ width: `${percentage}%` }}
          viewport={{ once: true }}
          transition={{ 
            duration: 1.5,
            ease: "easeOut"
          }}
        />
      </div>

      <p className="text-[#94A3B8] text-sm mb-4 min-h-[60px]">
        {description}
      </p>

      {/* More Skills Button */}
      <motion.button
        className="skill-button w-full py-3 px-4 rounded-xl font-semibold"
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setShowDetails(!showDetails)}
      >
        {showDetails ? 'Hide Skills' : 'Show More Skills'}
      </motion.button>

      {/* Skills Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute left-0 right-0 bottom-full mb-2 p-4 bg-[#0B1221] rounded-xl border border-[#1E2D3D] shadow-xl z-20"
          >
            <div className="grid grid-cols-3 gap-3">
              {relatedSkills[skill]?.map((item, index) => (
                <motion.div
                  key={index}
                  className="flex flex-col items-center justify-center p-3 rounded-lg bg-[#1E2D3D] hover:skill-card-hover transition-all"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <i className={`${item.icon} text-2xl skill-icon mb-2`}></i>
                  <span className="text-white text-xs text-center">{item.name}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ServiceCard = ({ number, icon, title, description }) => {
  return (
    <motion.div 
      className="relative p-8 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] group"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      whileHover={{ 
        y: -10,
        transition: { duration: 0.2 }
      }}
    >
      {/* Background Number */}
      <div className="absolute top-4 right-8 text-6xl font-bold opacity-10 text-[var(--primary-color)]">
        {number}
      </div>
      
      {/* Icon */}
      <motion.div 
        className="text-[var(--primary-color)] mb-4 relative z-10"
        whileHover={{ scale: 1.1 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {icon}
      </motion.div>

      {/* Content */}
      <h3 className="text-[var(--text-color)] text-xl font-bold mb-4 relative z-10">
        {title}
      </h3>
      <p className="text-[var(--text-secondary)] relative z-10">
        {description}
      </p>

      {/* Hover Effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-[var(--primary-color)] to-transparent opacity-0 rounded-xl transition-opacity duration-300"
        initial={false}
        whileHover={{ opacity: 0.1 }}
      />
    </motion.div>
  );
};

const navLinks = [
  { name: 'Home', href: '/' },
  { name: 'About', href: '/#about' },
  { name: 'Experience', href: '/#experience' },
  { name: 'Services', href: '/#services' },
  { name: 'Portfolio', href: '/#portfolio' },
  { name: 'Contact', href: '/#contact' },
];

export default function Home() {
  const { isDarkMode } = useTheme();
  
  return (
    <AnimatePresence>
      <main className="min-h-screen transition-colors duration-300 flex-1">
        {/* Navigation */}
        <motion.nav 
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ 
            type: 'spring',
            stiffness: 100,
            damping: 20,
            duration: 0.8 
          }}
          className="fixed w-full py-6 backdrop-blur-sm z-50"
          style={{ backgroundColor: 'var(--nav-bg)' }}
        >
          <div className="max-w-[1200px] mx-auto flex items-center justify-between px-6">
            <motion.div
              initial={{ x: -50, opacity: 0, scale: 0.8 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              transition={{ 
                type: 'spring',
                stiffness: 200,
                damping: 20,
                delay: 0.2 
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/" className="logo text-[28px] font-medium tracking-wide" style={{ color: 'var(--primary-color)' }}>
                Alexandera
              </Link>
            </motion.div>
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              animate="show"
              className="flex gap-12 text-[16px] font-light"
            >
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  variants={navAnimation}
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name === 'Experience' ? (
                    <Link href="#experience" className="nav-item">
                      Experience
                      <div className="dropdown-menu">
                        <Link href="#journey" className="dropdown-item">
                          <i className="fas fa-road"></i>
                          My Journey
                        </Link>
                        <Link href="#talent" className="dropdown-item">
                          <i className="fas fa-star"></i>
                          My Talent
                        </Link>
                      </div>
                    </Link>
                  ) : (
                    <Link 
                      href={item.href} 
                      className={`nav-link ${item.name === 'Home' ? 'active' : ''}`}
                      style={{ 
                        borderColor: item.name === 'Home' ? 'var(--primary-color)' : 'transparent',
                        color: item.name === 'Home' ? 'var(--primary-color)' : 'var(--text-secondary)'
                      }}
                    >
                      {item.name}
                    </Link>
                  )}
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.nav>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-[30px]">
          <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <motion.div 
              variants={staggerContainer}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-6"
            >
              <motion.h2 
                variants={fadeIn('right', 0)}
                className="text-xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                Hello
              </motion.h2>
              <motion.h1 
                variants={fadeIn('right', 0)}
                className="text-5xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                I&apos;m <span style={{ color: 'var(--primary-color)' }}>Your Name</span>
              </motion.h1>
              <motion.h2 
                variants={fadeIn('right', 0)}
                className="text-3xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                a UI/UX Designer
              </motion.h2>
              <motion.p 
                variants={fadeIn('right', 0)}
                className="max-w-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
                Passionate about creating beautiful and functional user experiences. I specialize in turning complex problems into simple, intuitive designs.
              </motion.p>
              <motion.div 
                variants={fadeIn('up', 0)}
                className="space-x-4"
              >
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary px-6 py-3 rounded-md"
                >
                  Hire Me
                </motion.button>
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-secondary px-6 py-3 rounded-md"
                >
                  Portfolio
                </motion.button>
              </motion.div>
            </motion.div>
            <motion.div 
              variants={fadeIn('left', 0.5)}
              initial="hidden"
              whileInView="show"
              viewport={{ once: false, amount: 0.7 }}
              className="relative"
            >
              <div className="image-blob-container">
                <div className="image-blob-background"></div>
                <div className="image-blob-background-2"></div>
                <div className="image-blob">
                  <Image
                    src="/me bg.png"
                    alt="Profile Image"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 450px"
                    priority
                  />
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section className="min-h-screen py-20 px-[30px] bg-[#0a0a0a]">
          <div className="max-w-[1100px] mx-auto">
            <motion.div 
              className="grid grid-cols-1 lg:grid-cols-2 gap-10"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.2,
                  },
                },
              }}
            >
              {/* Left Column - Image */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }
                }}
                className="relative"
              >
                <ImageCard />
              </motion.div>

              {/* Right Column - Content */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: 50 },
                  visible: { 
                    opacity: 1, 
                    x: 0,
                    transition: {
                      duration: 0.8,
                      ease: "easeOut"
                    }
                  }
                }}
                className="h-[500px] flex flex-col justify-between"
              >
                <div>
                  <motion.h2 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.5
                        }
                      }
                    }}
                    className="text-[var(--primary-color)] text-2xl font-bold mb-2"
                  >
                    WHO AM I?
                  </motion.h2>
                  <motion.h1 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.2
                        }
                      }
                    }}
                    className="text-white text-4xl font-bold mb-6"
                  >
                    I'm Alexander Smith, a visual UI/UX Designer and Web Developer
                  </motion.h1>
                  <motion.p 
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.4
                        }
                      }
                    }}
                    className="text-gray-400 mb-8"
                  >
                    Lorem ipsum viverra feugiat. Pellen tesque libero ut justo, ultrices in ligula. Semper at tempufddfel. Lorem ipsum dolor sit amet consectetur adipisicing elit. Non quae, fugiat consequatur voluptatem nihil ad. Lorem ipsum dolor sit amet.
                  </motion.p>

                  <motion.div 
                    className="grid grid-cols-2 gap-6 mb-8"
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { 
                        opacity: 1, 
                        y: 0,
                        transition: {
                          duration: 0.5,
                          delay: 0.6
                        }
                      }
                    }}
                  >
                    <div>
                      <p className="text-white font-bold mb-1">Name:</p>
                      <p className="text-gray-400">Alexander Smith</p>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">Email:</p>
                      <p className="text-gray-400">alexander@mail.com</p>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">From:</p>
                      <p className="text-gray-400">London, UK</p>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">Age:</p>
                      <p className="text-gray-400">24 Years</p>
                    </div>
                  </motion.div>
                </div>

                <motion.div 
                  className="flex items-center gap-8"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: 0.8
                      }
                    }
                  }}
                >
                  <button className="bg-[var(--primary-color)] text-white px-8 py-3 rounded-lg hover:opacity-90 transition-all duration-300">
                    Download CV
                  </button>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-[2px] bg-[var(--primary-color)]"></div>
                    <div className="flex gap-4">
                      <a href="#twitter" className="text-gray-400 hover:text-[var(--primary-color)] transition-colors">
                        <i className="fab fa-twitter text-xl"></i>
                      </a>
                      <a href="#instagram" className="text-gray-400 hover:text-[var(--primary-color)] transition-colors">
                        <i className="fab fa-instagram text-xl"></i>
                      </a>
                      <a href="#facebook" className="text-gray-400 hover:text-[var(--primary-color)] transition-colors">
                        <i className="fab fa-facebook-f text-xl"></i>
                      </a>
                      <a href="#linkedin" className="text-gray-400 hover:text-[var(--primary-color)] transition-colors">
                        <i className="fab fa-linkedin-in text-xl"></i>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section className="min-h-screen py-20 px-[30px] bg-[var(--bg-color)]">
          <motion.div 
            className="max-w-[1100px] mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1,
                    delayChildren: 0.3
                  }
                }
              }}
            >
              {/* Section Header */}
              <motion.div 
                className="text-center mb-16"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: [0.6, -0.05, 0.01, 0.99]
                    }
                  }
                }}
              >
                <motion.h3 
                  className="text-[var(--primary-color)] text-xl font-semibold mb-4"
                  variants={{
                    hidden: { opacity: 0, y: 10 },
                    visible: { 
                      opacity: 1, 
                      y: 0,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  MY JOURNEY
                </motion.h3>
                <motion.h2 
                  className="text-[var(--text-color)] text-4xl font-bold"
                  variants={{
                    hidden: { opacity: 0, scale: 0.8 },
                    visible: { 
                      opacity: 1, 
                      scale: 1,
                      transition: {
                        duration: 0.6,
                        ease: "easeOut"
                      }
                    }
                  }}
                >
                  Qualification
                </motion.h2>
              </motion.div>

              {/* Timeline Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Education Column */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: -50 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.6, -0.05, 0.01, 0.99]
                      }
                    }
                  }}
                >
                  <motion.h3 
                    className="text-[var(--text-color)] text-2xl font-bold mb-8"
                    whileHover={{ 
                      scale: 1.05,
                      color: 'var(--primary-color)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    Education
                  </motion.h3>
                  <motion.div 
                    className="space-y-12"
                    variants={{
                      hidden: { opacity: 0 },
                      visible: {
                        opacity: 1,
                        transition: {
                          staggerChildren: 0.2
                        }
                      }
                    }}
                  >
                    {/* CoderHouse */}
                    <motion.div 
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="relative pl-8 border-l-2 border-[var(--primary-color)]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <motion.div 
                        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--primary-color)]"
                        whileHover={{ 
                          scale: 1.2,
                          boxShadow: '0 0 15px var(--primary-color)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }}
                      />
                      <motion.div
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-[var(--text-color)] font-semibold mb-1">Baccalaureate </h4>
                        <h5 className="text-[var(--primary-color)] font-bold mb-2"> Life and Earth Sciences </h5>
                        <p className="text-[var(--text-secondary)] mb-2">2021 - 2022</p>
                        <p className="text-[var(--text-secondary)]">Specialized in biological and environmental sciences with focus on scientific research.
                        Conducted laboratory work and field studies while developing analytical thinking skills.</p>
                      </motion.div>
                    </motion.div>

                    {/* Lviv Academy */}
                    <motion.div 
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="relative pl-8 border-l-2 border-[var(--primary-color)]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { delay: 0.2 } }
                      }}
                    >
                      <motion.div 
                        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--primary-color)]"
                        whileHover={{ 
                          scale: 1.2,
                          boxShadow: '0 0 15px var(--primary-color)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.3
                        }}
                      />
                      <motion.div
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-[var(--text-color)] font-semibold mb-1">Diploma</h4>
                        <h5 className="text-[var(--primary-color)] font-bold mb-2">Full Stack Web Development</h5>
                        <p className="text-[var(--text-secondary)] mb-2">2022 - 2024</p>
                        <p className="text-[var(--text-secondary)]">Mastered comprehensive web development including frontend, backend, and database management.
                        Developed strong technical and soft skills through hands-on projects and team collaboration.</p>
                      </motion.div>
                    </motion.div>

                    {/* Additional Education */}
                    <motion.div 
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="relative pl-8 border-l-2 border-[var(--primary-color)]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { delay: 0.3 } }
                      }}
                    >
                      <motion.div 
                        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--primary-color)]"
                        whileHover={{ 
                          scale: 1.2,
                          boxShadow: '0 0 15px var(--primary-color)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.4
                        }}
                      />
                      <motion.div
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h4 className="text-[var(--text-color)] font-semibold mb-1">Certificate B1 </h4>
                        <h5 className="text-[var(--primary-color)] font-bold mb-2">German Language</h5>
                        <p className="text-[var(--text-secondary)] mb-2">2023 - 2024</p>
                        <p className="text-[var(--text-secondary)]">Achieved intermediate proficiency in German language communication and comprehension.
                        Developed reading, writing, speaking, and listening skills for professional and daily situations.</p>
                      </motion.div>
                    </motion.div>
                  </motion.div>
                </motion.div>

                {/* Experience Column */}
                <motion.div
                  variants={{
                    hidden: { opacity: 0, x: 50 },
                    visible: { 
                      opacity: 1, 
                      x: 0,
                      transition: {
                        duration: 0.8,
                        ease: [0.6, -0.05, 0.01, 0.99]
                      }
                    }
                  }}
                >
                  <motion.h3 
                    className="text-[var(--text-color)] text-2xl font-bold mb-8"
                    whileHover={{ 
                      scale: 1.05,
                      color: 'var(--primary-color)',
                      transition: { duration: 0.2 }
                    }}
                  >
                    Experience
                  </motion.h3>
                  <div className="space-y-12">
                    {/* Soft Tech Inc */}
                    <motion.div 
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="relative pl-8 border-l-2 border-[var(--primary-color)]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0 }
                      }}
                    >
                      <motion.div 
                        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--primary-color)]"
                        whileHover={{ 
                          scale: 1.2,
                          boxShadow: '0 0 15px var(--primary-color)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15
                        }}
                      />
                      <motion.div
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                      >
                        <h4 className="text-[var(--text-color)] font-semibold mb-1">Menara Prefa</h4>
                        <h5 className="text-[var(--primary-color)] font-bold mb-2">Web Developer</h5>
                        <p className="text-[var(--text-secondary)] mb-2">2024/3 - 2024/5</p>
                        <p className="text-[var(--text-secondary)]">Led the development of a comprehensive client management system using the MERN stack.
                        Implemented full-stack solutions with Node.js, React.js, and MongoDB for efficient client data handling.</p>
                      </motion.div>
                    </motion.div>

                    {/* Kana Design */}
                    <motion.div 
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="relative pl-8 border-l-2 border-[var(--primary-color)]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { delay: 0.2 } }
                      }}
                    >
                      <motion.div 
                        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--primary-color)]"
                        whileHover={{ 
                          scale: 1.2,
                          boxShadow: '0 0 15px var(--primary-color)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.3
                        }}
                      />
                      <motion.div
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                      >
                        <h4 className="text-[var(--text-color)] font-semibold mb-1">Freelance </h4>
                        <h5 className="text-[var(--primary-color)] font-bold mb-2">Web Developer</h5>
                        <p className="text-[var(--text-secondary)] mb-2">2024 - 2025</p>
                        <p className="text-[var(--text-secondary)]">Designed and developed over 10 custom websites for diverse clients across different industries.
                        Built responsive, user-friendly solutions while managing client relationships and project timelines.</p>
                      </motion.div>
                    </motion.div>

                    {/* Additional Experience */}
                    <motion.div 
                      whileHover={{ 
                        x: 10,
                        transition: { duration: 0.2 }
                      }}
                      className="relative pl-8 border-l-2 border-[var(--primary-color)]"
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        hidden: { opacity: 0, x: -20 },
                        visible: { opacity: 1, x: 0, transition: { delay: 0.3 } }
                      }}
                    >
                      <motion.div 
                        className="absolute left-[-9px] top-0 w-4 h-4 rounded-full bg-[var(--primary-color)]"
                        whileHover={{ 
                          scale: 1.2,
                          boxShadow: '0 0 15px var(--primary-color)'
                        }}
                        whileTap={{ scale: 0.9 }}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 15,
                          delay: 0.4
                        }}
                      />
                      <motion.div
                        whileHover={{ 
                          y: -5,
                          transition: { duration: 0.2 }
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <h4 className="text-[var(--text-color)] font-semibold mb-1">Stock Management</h4>
                        <h5 className="text-[var(--primary-color)] font-bold mb-2">Website Development</h5>
                        <p className="text-[var(--text-secondary)] mb-2">2024/9 - 2024/11</p>
                        <p className="text-[var(--text-secondary)]">Developed a stock management website using Next.js and MySQL in 2024. Worked closely with the university team to deliver a scalable and efficient solution.</p>
                      </motion.div>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Professional Skills Section */}
        <section className="min-h-screen py-20 px-[30px] bg-[var(--bg-color)]">
          <motion.div 
            className="max-w-[1100px] mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Header */}
            <motion.div 
              className="text-center mb-16"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: {
                  opacity: 1,
                  transition: {
                    duration: 0.6,
                    ease: [0.6, -0.05, 0.01, 0.99]
                  }
                }
              }}
            >
              <motion.h3 
                className="text-[var(--primary-color)] text-xl font-semibold mb-4"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { 
                    opacity: 1, 
                    y: 0,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                MY TALENT
              </motion.h3>
              <motion.h2 
                className="text-[var(--text-color)] text-4xl font-bold"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { 
                    opacity: 1, 
                    scale: 1,
                    transition: {
                      duration: 0.6,
                      ease: "easeOut"
                    }
                  }
                }}
              >
                Professional Skills
              </motion.h2>
            </motion.div>

            {/* Skills Grid */}
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: {
                    staggerChildren: 0.1
                  }
                }
              }}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {/* Skill 1 - React */}
              <SkillBar 
                skill="React"
                percentage={90}
                description="Expert in React.js, building dynamic and responsive user interfaces with modern features and best practices."
              />

              {/* Skill 2 - Next.js */}
              <SkillBar 
                skill="Next.js"
                percentage={85}
                description="Proficient in Next.js framework, creating optimized and SEO-friendly web applications."
              />

              {/* Skill 3 - Node.js */}
              <SkillBar 
                skill="Node.js"
                percentage={85}
                description="Strong backend development skills using Node.js and Express for scalable server-side solutions."
              />

              {/* Skill 4 - Laravel */}
              <SkillBar 
                skill="Laravel"
                percentage={100}
                description="Advanced expertise in Laravel framework for robust PHP-based web applications."
              />

              {/* Skill 5 - MySQL/MongoDB */}
              <SkillBar 
                skill="Database Management"
                percentage={90}
                description="Expert in both SQL (MySQL) and NoSQL (MongoDB) database design and optimization."
              />

              {/* Skill 6 - UI/UX */}
              <SkillBar 
                skill="UI/UX Design"
                percentage={80}
                description="Creating intuitive and aesthetically pleasing user interfaces with modern design principles."
              />
            </motion.div>
          </motion.div>
        </section>

        {/* Services Section */}
        <section className="min-h-screen py-20 px-[30px] bg-[var(--bg-color)]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="container mx-auto"
          >
            {/* Section Title */}
            <div className="text-center mb-12">
              <h3 className="text-[var(--primary-color)] text-xl font-semibold mb-4">SERVICES</h3>
              <h2 className="text-[var(--text-color)] text-4xl font-bold">What I do for you</h2>
            </div>

            {/* Services Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Service 1 - UI/UX Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-colors"
              >
                <div className="text-[var(--primary-color)] text-3xl mb-4">
                  <i className="fas fa-palette"></i>
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">UI/UX Design</h3>
                <p className="text-[#94A3B8]">
                  Crafting intuitive and visually appealing user interfaces with a focus on user experience and modern design principles.
                </p>
              </motion.div>

              {/* Service 2 - Frontend Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-colors"
              >
                <div className="text-[var(--primary-color)] text-3xl mb-4">
                  <i className="fas fa-code"></i>
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Frontend Development</h3>
                <p className="text-[#94A3B8]">
                  Building responsive web applications using React.js, Next.js, and Laravel, with a focus on performance and user interaction.
                </p>
              </motion.div>

              {/* Service 3 - Backend Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-colors"
              >
                <div className="text-[var(--primary-color)] text-3xl mb-4">
                  <i className="fas fa-server"></i>
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Backend Development</h3>
                <p className="text-[#94A3B8]">
                  Developing robust server-side solutions using Node.js, Laravel, and Next.js, ensuring scalable and secure applications.
                </p>
              </motion.div>

              {/* Service 4 - Database Management */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-colors"
              >
                <div className="text-[var(--primary-color)] text-3xl mb-4">
                  <i className="fas fa-database"></i>
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Database Management</h3>
                <p className="text-[#94A3B8]">
                  Designing and managing both SQL and NoSQL databases, optimizing performance and ensuring data integrity.
                </p>
              </motion.div>

              {/* Service 5 - Scrum & Team Work */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-colors"
              >
                <div className="text-[var(--primary-color)] text-3xl mb-4">
                  <i className="fas fa-users"></i>
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Scrum & Team Work</h3>
                <p className="text-[#94A3B8]">
                  Experienced in Agile methodologies, facilitating efficient team collaboration and project management.
                </p>
              </motion.div>

              {/* Service 6 - Soft Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-colors"
              >
                <div className="text-[var(--primary-color)] text-3xl mb-4">
                  <i className="fas fa-comments"></i>
                </div>
                <h3 className="text-white text-xl font-semibold mb-4">Soft Skills</h3>
                <p className="text-[#94A3B8]">
                  Strong communication, problem-solving abilities, and adaptability in diverse team environments.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Portfolio Section */}
        <motion.section
          id="portfolio"
          className="py-20 max-w-[1200px] ml-[170px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <motion.h3 
                className="text-[var(--primary-color)] text-xl font-semibold mb-4"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                MY WORK
              </motion.h3>
              <motion.h2 
                className="text-[var(--text-color)] text-4xl font-bold"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                Recent Projects
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Portfolio items */}
              <motion.div
                className="portfolio-card aspect-[4/3]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <img 
                  src="/pj1.png" 
                  alt="Personal Portfolio" 
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-title">Personal Portfolio</h3>
                  <p className="portfolio-description">Modern portfolio with dark theme and dynamic animations</p>
                  <a 
                    href="https://oussamalbida.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="portfolio-card aspect-[4/3]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <img 
                  src="/services agency.png" 
                  alt="Digital Agency Website" 
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-title">Digital Agency</h3>
                  <p className="portfolio-description">Full-service digital agency website with modern UI/UX</p>
                  <a 
                    href="https://sevices-agency3.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="portfolio-card aspect-[4/3]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <img 
                  src="/pj3.png" 
                  alt="Developer Portfolio" 
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-title">Developer Portfolio</h3>
                  <p className="portfolio-description">Elegant portfolio showcasing full-stack development skills</p>
                  <a 
                    href="https://ayoubetabit.netlify.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="portfolio-card aspect-[4/3]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <img 
                  src="/ecommerce-dashboard.jpg" 
                  alt="E-commerce Dashboard" 
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-title">E-commerce Dashboard</h3>
                  <p className="portfolio-description">Real-time analytics dashboard for e-commerce with advanced data visualization</p>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="portfolio-card aspect-[4/3]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <img 
                  src="/ai-chatbot.jpg" 
                  alt="AI Chatbot Interface" 
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-title">AI Customer Support</h3>
                  <p className="portfolio-description">Intelligent chatbot system with natural language processing capabilities</p>
                  <a 
                    href="#" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>

              <motion.div
                className="portfolio-card aspect-[4/3]"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <img 
                  src="/pj4.png" 
                  alt="Menara Project" 
                  className="portfolio-image"
                />
                <div className="portfolio-overlay">
                  <h3 className="portfolio-title">Menara</h3>
                  <p className="portfolio-description">Modern web application with sleek design and seamless user experience</p>
                  <a 
                    href="https://menara-kappa.vercel.app/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="mt-4 px-6 py-2 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors"
                  >
                    View Project
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Testimonials Section */}
        <motion.section
          id="testimonials"
          className="py-20 max-w-[1200px] ml-[170px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <motion.h3 
                className="text-[var(--primary-color)] text-xl font-semibold mb-4"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                TESTIMONIALS
              </motion.h3>
              <motion.h2 
                className="text-[var(--text-color)] text-4xl font-bold"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                What My Clients Say
              </motion.h2>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Testimonial 1 */}
              <motion.div
                className="testimonial-card relative"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="testimonial-quote">
                  <i className="fas fa-quote-left"></i>
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-text">
                    "Working with this developer was an exceptional experience. Their attention to detail and innovative solutions helped bring our vision to life. The end result exceeded our expectations."
                  </p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">
                      <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="John Wilson" />
                    </div>
                    <div className="testimonial-info">
                      <h4>John Wilson</h4>
                      <p>Seattle, Washington</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Testimonial 2 */}
              <motion.div
                className="testimonial-card relative"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                <div className="testimonial-quote">
                  <i className="fas fa-quote-left"></i>
                </div>
                <div className="testimonial-content">
                  <p className="testimonial-text">
                    "The level of professionalism and technical expertise demonstrated throughout our project was impressive. They delivered a high-quality solution on time and within budget."
                  </p>
                  <div className="testimonial-author">
                    <div className="testimonial-avatar">
                      <img src="https://randomuser.me/api/portraits/men/85.jpg" alt="Wilson John" />
                    </div>
                    <div className="testimonial-info">
                      <h4>Wilson John</h4>
                      <p>Seattle, Washington</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Contact Section */}
        <motion.section
          id="contact"
          className="py-20 max-w-[1200px] ml-[170px]"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className="container mx-auto px-4">
            {/* Section Header */}
            <div className="text-center mb-12">
              <motion.h3 
                className="text-[var(--primary-color)] text-xl font-semibold mb-4"
                variants={{
                  hidden: { opacity: 0, y: 10 },
                  visible: { opacity: 1, y: 0 }
                }}
              >
                GET IN TOUCH
              </motion.h3>
              <motion.h2 
                className="text-[var(--text-color)] text-4xl font-bold"
                variants={{
                  hidden: { opacity: 0, scale: 0.8 },
                  visible: { opacity: 1, scale: 1 }
                }}
              >
                Contact Me
              </motion.h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Information */}
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                {/* Call Us */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-phone-alt"></i>
                  </div>
                  <div className="contact-info-text">
                    <h4>Call Us</h4>
                    <p>+123-45-67-89</p>
                  </div>
                </div>

                {/* Email Us */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div className="contact-info-text">
                    <h4>Email Us</h4>
                    <p>example@mail.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="contact-info-item">
                  <div className="contact-info-icon">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div className="contact-info-text">
                    <h4>Address</h4>
                    <p>Address here, 208 Trainer Avenue street, Illinois, UK - 62617.</p>
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                className="contact-form"
                variants={{
                  hidden: { opacity: 0, x: 20 },
                  visible: { opacity: 1, x: 0 }
                }}
              >
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <input 
                      type="text" 
                      placeholder="Name" 
                      className="w-full"
                    />
                    <input 
                      type="email" 
                      placeholder="Email" 
                      className="w-full"
                    />
                  </div>
                  <input 
                    type="text" 
                    placeholder="Subject" 
                    className="w-full"
                  />
                  <textarea 
                    placeholder="Message"
                    className="w-full"
                  ></textarea>
                  <button
                    type="submit"
                    className="px-8 py-3 bg-[var(--primary-color)] text-white rounded-lg hover:bg-[var(--primary-hover)] transition-colors w-full md:w-auto"
                  >
                    Send Message
                  </button>
                </form>
              </motion.div>
            </div>
          </div>
        </motion.section>
      </main>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content max-w-[1200px] ml-[170px]">
          <div className="footer-copyright">
            {new Date().getFullYear()} Alexandera. All Rights Reserved
          </div>
          <div className="social-links">
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link twitter"
            >
              <i className="fab fa-twitter"></i>
            </a>
            <a 
              href="https://instagram.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link instagram"
            >
              <i className="fab fa-instagram"></i>
            </a>
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link facebook"
            >
              <i className="fab fa-facebook-f"></i>
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="social-link linkedin"
            >
              <i className="fab fa-linkedin-in"></i>
            </a>
          </div>
        </div>
      </footer>
    </AnimatePresence>
  );
}
