'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useTheme } from './context/ThemeContext';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useRef } from 'react';
import { smoothScrollTo } from './utils/smoothScroll';
import { sendEmail } from './utils/emailService';

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
        className="btn-primary inline-block text-center"
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
  { name: 'Home', href: '#home', id: 'home' },
  { name: 'About', href: '#about', id: 'about' },
  { name: 'Experience', href: '#experience', id: 'experience' },
  { name: 'Services', href: '#services', id: 'services' },
  { name: 'Portfolio', href: '#portfolio', id: 'portfolio' },
  { name: 'Contact', href: '#contact', id: 'contact' },
];

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "CEO, TechStart",
    text: "Working with Oussama was a game-changer for our startup. His technical expertise and attention to detail transformed our vision into reality.",
    image: "/testimonials/testimonial1.svg"
  },
  {
    name: "Michael Chen",
    position: "CTO, InnovateLab",
    text: "Oussama's full-stack expertise and problem-solving abilities made our complex project seem effortless. Highly recommended!",
    image: "/testimonials/testimonial2.svg"
  },
  {
    name: "Emily Martinez",
    position: "Product Manager, DesignPro",
    text: "The UI/UX expertise and attention to detail brought by Oussama elevated our product to a whole new level. Outstanding work!",
    image: "/testimonials/testimonial3.svg"
  }
];

export default function Home() {
  const { isDarkMode } = useTheme();
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState({ message: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => document.getElementById(link.id));
      const scrollPosition = window.scrollY + 200; // Adjust this value based on when you want the section to be considered "active"

      sections.forEach((section, index) => {
        if (!section) return;
        
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;

        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          setActiveSection(navLinks[index].id);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    e.preventDefault();
    smoothScrollTo(id);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus({ message: '', type: '' });

    try {
      const result = await sendEmail(formData);
      if (result.success) {
        setFormStatus({ message: result.message, type: 'success' });
        setFormData({ name: '', email: '', message: '' }); // Clear form
      } else {
        setFormStatus({ message: result.message, type: 'error' });
      }
    } catch (error) {
      setFormStatus({ 
        message: 'An error occurred. Please try again later.', 
        type: 'error' 
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
              className="text-2xl font-bold"
            >
              <Link 
                href="#home"
                onClick={(e) => handleNavClick(e, 'home')}
                className="text-[var(--primary-color)]"
              >
                Oussama
              </Link>
            </motion.div>

            <motion.div 
              className="hidden lg:flex items-center space-x-8"
              initial={{ x: 50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative text-base font-medium transition-colors duration-300 hover:text-[var(--primary-color)] ${
                    activeSection === link.id ? 'text-[var(--primary-color)]' : ''
                  }`}
                >
                  {link.name}
                  {activeSection === link.id && (
                    <motion.div
                      className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--primary-color)]"
                      layoutId="underline"
                    />
                  )}
                </Link>
              ))}
            </motion.div>
          </div>
        </motion.nav>

        {/* Mobile Navigation */}
        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className="fixed top-4 right-4 z-50 p-2 rounded-lg bg-[var(--background-color)] shadow-lg"
            aria-label="Toggle Menu"
          >
            <motion.div
              animate={isMenuOpen ? "open" : "closed"}
              className="w-6 h-5 flex flex-col justify-between"
            >
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: 45, y: 8 },
                }}
                className="w-full h-0.5 bg-[var(--text-color)] block"
              ></motion.span>
              <motion.span
                variants={{
                  closed: { opacity: 1 },
                  open: { opacity: 0 },
                }}
                className="w-full h-0.5 bg-[var(--text-color)] block"
              ></motion.span>
              <motion.span
                variants={{
                  closed: { rotate: 0, y: 0 },
                  open: { rotate: -45, y: -8 },
                }}
                className="w-full h-0.5 bg-[var(--text-color)] block"
              ></motion.span>
            </motion.div>
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "tween", duration: 0.3 }}
                className="fixed top-0 right-0 w-full h-screen bg-[var(--background-color)] z-40 shadow-xl"
              >
                <div className="flex flex-col items-center justify-center h-full space-y-8 p-4">
                  {navLinks.map((link) => (
                    <motion.a
                      key={link.id}
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        toggleMenu();
                        smoothScrollTo(link.id);
                      }}
                      className="text-xl font-semibold text-[var(--text-color)] hover:text-[var(--primary-color)] transition-colors"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {link.name}
                    </motion.a>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Hero Section */}
        <section className="min-h-screen flex items-center px-[30px]" id="home">
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
                I&apos;m <span style={{ color: 'var(--primary-color)' }}>Oussama Lbida</span>
              </motion.h1>
              <motion.h2 
                variants={fadeIn('right', 0)}
                className="text-3xl"
                style={{ color: 'var(--text-secondary)' }}
              >
                a Full Stack Developer
              </motion.h2>
              <motion.p 
                variants={fadeIn('right', 0)}
                className="max-w-lg"
                style={{ color: 'var(--text-secondary)' }}
              >
              Full-Stack Web Developer with expertise in building modern, responsive websites and dynamic applications. I create seamless user experiences with innovative and efficient solutions to bring your ideas to life.
              </motion.p>
              <motion.div 
                variants={fadeIn('up', 0)}
                className="space-x-4"
              >
                <motion.a
                  href="#portfolio"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary inline-block text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector('#portfolio');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Portfolio
                </motion.a>
                <motion.a
                  href="#contact"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-secondary inline-block text-center"
                  onClick={(e) => {
                    e.preventDefault();
                    const section = document.querySelector('#contact');
                    if (section) {
                      section.scrollIntoView({ behavior: 'smooth' });
                    }
                  }}
                >
                  Hire Me
                </motion.a>
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
        <section className="min-h-screen py-20 px-[30px] bg-[#0a0a0a]" id="about">
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
                      ease: [0.6, -0.05, 0.01, 0.99]
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
                      ease: [0.6, -0.05, 0.01, 0.99]
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
                       I'm Oussama Lbida, a Full-Stack Web Developer and Motion Designer
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
                  Passionate about crafting responsive websites, dynamic applications, and stunning visual content. I bring creativity and innovation to every project I work on.                  </motion.p>

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
                      <p className="text-gray-400">Oussama Lbida</p>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">Email:</p>
                      <p className="text-gray-400">lbidaooussama@mail.com</p>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">From:</p>
                      <p className="text-gray-400">Beni Mellal, Morocco</p>
                    </div>
                    <div>
                      <p className="text-white font-bold mb-1">Age:</p>
                      <p className="text-gray-400">20 Years</p>
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
                  <motion.a
                    href="/oussama Lbida CV (1).pdf"
                    download
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="btn-primary inline-block text-center"
                  >
                    Download CV
                  </motion.a>
                  <div className="flex items-center gap-6">
                    <div className="w-12 h-[2px] bg-[var(--primary-color)]"></div>
                    <div className="flex gap-4">
                      <a href="https://github.com/oussamalbida" className="text-gray-400 hover:text-[var(--primary-color)] transition-colors">
                        <i className="fab fa-github text-xl"></i>
                      </a>
                      <a href="https://www.instagram.com/digital_services_agencyy?igsh=MXFpb3NoeDhjNm9kcQ==" className="text-gray-400 hover:text-[var(--primary-color)] transition-colors">
                        <i className="fab fa-instagram text-xl"></i>
                      </a>
                      <a href="https://www.linkedin.com/in/lbida-oussama-803533336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="text-gray-400 hover:text-[var(--primary-color)] transition-colors">
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
        <section className="min-h-screen py-20 px-[30px] bg-[var(--bg-color)]" id="experience">
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
        <section className="min-h-screen py-20 px-[30px] bg-[var(--bg-color)]" id="services">
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
              className={`max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 sm:px-6 lg:px-8 ${
                isDarkMode ? '' : 'services-light-mode'
              }`}
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
        <section className="py-20 relative bg-[var(--background-color)]" id="services">
          <div className="max-w-[1200px] mx-auto px-[30px]">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-[var(--primary-color)] font-semibold text-lg mb-2"
            >
              SERVICES
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16"
            >
              What I do for you
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* UI/UX Design */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="text-[var(--primary-color)] text-4xl mb-6">
                  <i className="fas fa-palette"></i>
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">UI/UX Design</h4>
                <p className="text-[#8892b0] leading-relaxed">
                  Crafting intuitive and visually appealing user interfaces with a focus on user experience and modern design principles.
                </p>
              </motion.div>

              {/* Frontend Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="text-[var(--primary-color)] text-4xl mb-6">
                  <i className="fas fa-code"></i>
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">Frontend Development</h4>
                <p className="text-[#8892b0] leading-relaxed">
                  Building responsive web applications using React.js, Next.js, and Laravel, with a focus on performance and user interaction.
                </p>
              </motion.div>

              {/* Backend Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="text-[var(--primary-color)] text-4xl mb-6">
                  <i className="fas fa-server"></i>
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">Backend Development</h4>
                <p className="text-[#8892b0] leading-relaxed">
                  Developing robust server-side solutions and APIs using Node.js and PHP, ensuring scalability and security.
                </p>
              </motion.div>

              {/* Database Management */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="text-[var(--primary-color)] text-4xl mb-6">
                  <i className="fas fa-database"></i>
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">Database Management</h4>
                <p className="text-[#8892b0] leading-relaxed">
                  Designing and managing both SQL (MySQL) and NoSQL (MongoDB) database design and optimization.
                </p>
              </motion.div>

              {/* Scrum & Team Work */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="text-[var(--primary-color)] text-4xl mb-6">
                  <i className="fas fa-users"></i>
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">Scrum & Team Work</h4>
                <p className="text-[#8892b0] leading-relaxed">
                  Experienced in Agile methodologies, facilitating efficient team collaboration and project management.
                </p>
              </motion.div>

              {/* Soft Skills */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] p-8 rounded-2xl border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="text-[var(--primary-color)] text-4xl mb-6">
                  <i className="fas fa-comments"></i>
                </div>
                <h4 className="text-white text-2xl font-bold mb-4">Soft Skills</h4>
                <p className="text-[#8892b0] leading-relaxed">
                  Strong communication, problem-solving abilities, and adaptability in diverse team environments.
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Portfolio Section */}
        <section className="py-20 bg-[var(--background-color)]" id="portfolio">
          <div className="max-w-[1200px] mx-auto px-[30px]">
            <motion.h2
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="text-center text-[var(--primary-color)] font-semibold text-lg mb-2"
            >
              MY WORK
            </motion.h2>

            <motion.h3
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-center text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-16"
            >
              Recent Projects
            </motion.h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Project 1 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] rounded-2xl overflow-hidden border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src="/pj1.png" 
                    alt="Personal Portfolio" 
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href="https://oussamalbida.netlify.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-white text-xl font-bold mb-2">Personal Portfolio</h4>
                  <p className="text-[#8892b0] mb-4">Modern portfolio with dark theme and dynamic animations</p>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--primary-color)]">#React.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#Bootstrap 5</span>
                    <span className="text-sm text-[var(--primary-color)]">#Html/Css</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] rounded-2xl overflow-hidden border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src="/services agency.png" 
                    alt="Digital Agency Website" 
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href="https://sevices-agency3.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-white text-xl font-bold mb-2">Digital Agency</h4>
                  <p className="text-[#8892b0] mb-4">Full-service digital agency website with modern UI/UX</p>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--primary-color)]">#Next.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#Tailwind Css</span>
                    <span className="text-sm text-[var(--primary-color)]">#Html/Css</span>
                    <span className="text-sm text-[var(--primary-color)]">#three.js</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 3 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] rounded-2xl overflow-hidden border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src="/pj3.png" 
                    alt="Developer Portfolio" 
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href="https://ayoubetabit.netlify.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-white text-xl font-bold mb-2">Developer Portfolio</h4>
                  <p className="text-[#8892b0] mb-4">Elegant portfolio showcasing full-stack development skills</p>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--primary-color)]">#Next.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#Tailwind Css</span>
                    <span className="text-sm text-[var(--primary-color)]">#Html/Css</span>
                    <span className="text-sm text-[var(--primary-color)]">#Framer Motion</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 4 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] rounded-2xl overflow-hidden border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src="/pj5.png" 
                    alt="E-commerce website" 
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href="https://store-qlgh.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-white text-xl font-bold mb-2">E-commerce Website</h4>
                  <p className="text-[#8892b0] mb-4">Responsive e-commerce website with advanced data visualization</p>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--primary-color)]">#Next.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#Tailwind Css</span>
                    <span className="text-sm text-[var(--primary-color)]">#Html/Css</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 5 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] rounded-2xl overflow-hidden border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src="/ai-chatbot.jpg" 
                    alt="AI Chatbot Interface" 
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href="#" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-white text-xl font-bold mb-2">AI Customer Support</h4>
                  <p className="text-[#8892b0] mb-4">Intelligent chatbot system with natural language processing capabilities</p>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--primary-color)]">#Next.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#OpenAI</span>
                    <span className="text-sm text-[var(--primary-color)]">#Tailwind Css</span>
                  </div>
                </div>
              </motion.div>

              {/* Project 6 */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#0B1121] rounded-2xl overflow-hidden border border-[#1E2D3D] hover:border-[var(--primary-color)] transition-all duration-300"
              >
                <div className="relative overflow-hidden group">
                  <img 
                    src="/pj4.png" 
                    alt="Menara Project" 
                    className="w-full h-64 object-cover object-center transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <a 
                      href="https://menara-kappa.vercel.app/" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-[var(--primary-color)] text-white rounded-full transform -translate-y-10 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      View Project
                    </a>
                  </div>
                </div>
                <div className="p-6">
                  <h4 className="text-white text-xl font-bold mb-2">Menara</h4>
                  <p className="text-[#8892b0] mb-4">Modern web application with sleek design and seamless user experience</p>
                  <div className="flex gap-4">
                    <span className="text-sm text-[var(--primary-color)]">#React.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#Nood.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#Express.js</span>
                    <span className="text-sm text-[var(--primary-color)]">#LongoDB</span>

                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="py-20 px-[30px] bg-[#0B1120]"
        >
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-[1100px] mx-auto text-center mb-12"
          >
            <motion.h3 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-[var(--primary-color)] text-xl font-semibold mb-4"
            >
              TESTIMONIALS
            </motion.h3>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-4xl font-bold text-white"
            >
              What Clients Say
            </motion.h2>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className={`max-w-[1100px] mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 ${
              isDarkMode ? '' : 'testimonials-light-mode'
            }`}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 * index }}
                whileHover={{ 
                  scale: 1.03,
                  boxShadow: isDarkMode 
                    ? "0 10px 30px rgba(0,0,0,0.3)" 
                    : "0 10px 30px rgba(0,0,0,0.1)"
                }}
                className={`p-6 rounded-xl relative ${
                  isDarkMode ? '' : 'testimonials-light-mode'
                }`}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.3 * index 
                  }}
                  className="absolute -top-5 left-6"
                >
                  <i className="fas fa-quote-left text-4xl text-[var(--primary-color)]"></i>
                </motion.div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.4 * index }}
                  className="text-gray-300 mt-6 mb-4"
                >
                  {testimonial.text}
                </motion.p>
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.5 * index }}
                  className="flex items-center gap-4"
                >
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-white font-semibold">{testimonial.name}</h4>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </motion.section>

        {/* Contact Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          id="contact" 
          className="py-20 px-[30px] bg-[#0B1120]"
        >
          <div className="max-w-[1100px] mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <motion.h3 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-[var(--primary-color)] text-xl font-semibold mb-4"
              >
                GET IN TOUCH
              </motion.h3>
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="text-white text-4xl font-bold"
              >
                Contact Me
              </motion.h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className={`space-y-8 ${
                  isDarkMode ? '' : 'contact-info-light-mode'
                }`}
              >
                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  whileHover={{ x: 10 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg ${
                    isDarkMode 
                      ? '' 
                      : 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg'
                  }`}
                >
                  <div className="text-[var(--primary-color)]">
                    <i className="fas fa-phone text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Call Us</h4>
                    <p className="text-gray-400">+212 659417658</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  whileHover={{ x: 10 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg ${
                    isDarkMode 
                      ? '' 
                      : 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg'
                  }`}
                >
                  <div className="text-[var(--primary-color)]">
                    <i className="fas fa-envelope text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Email Us</h4>
                    <p className="text-gray-400">oussamallbida@gmail.com</p>
                  </div>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                  whileHover={{ x: 10 }}
                  className={`flex items-center space-x-4 p-4 rounded-lg ${
                    isDarkMode 
                      ? '' 
                      : 'shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] hover:shadow-lg'
                  }`}
                >
                  <div className="text-[var(--primary-color)]">
                    <i className="fas fa-map-marker-alt text-2xl"></i>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white">Address</h4>
                    <p className="text-gray-400">Beni Mellal, Morocco</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.form 
                  onSubmit={handleSubmit} 
                  className="space-y-6"
                >
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  >
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="text" 
                      name="name" 
                      value={formData.name} 
                      onChange={handleInputChange} 
                      placeholder="Name" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#1A2333] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                    />
                    <motion.input
                      whileFocus={{ scale: 1.02 }}
                      type="email" 
                      name="email" 
                      value={formData.email} 
                      onChange={handleInputChange} 
                      placeholder="Email" 
                      required
                      className="w-full px-4 py-3 rounded-lg bg-[#1A2333] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                    />
                  </motion.div>
                  <motion.input
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    whileFocus={{ scale: 1.02 }}
                    type="text" 
                    name="subject" 
                    placeholder="Subject" 
                    className="w-full px-4 py-3 rounded-lg bg-[#1A2333] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] transition-colors"
                  />
                  <motion.textarea
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    whileFocus={{ scale: 1.02 }}
                    name="message" 
                    value={formData.message} 
                    onChange={handleInputChange} 
                    placeholder="Message" 
                    required
                    rows="5"
                    className="w-full px-4 py-3 rounded-lg bg-[#1A2333] border border-gray-700 text-white placeholder-gray-400 focus:outline-none focus:border-[var(--primary-color)] transition-colors resize-none"
                  ></motion.textarea>

                  {formStatus.message && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg ${
                        formStatus.type === 'success' 
                          ? 'bg-green-900 text-green-200' 
                          : 'bg-red-900 text-red-200'
                      }`}
                    >
                      {formStatus.message}
                    </motion.div>
                  )}

                  <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className={`btn-primary ${isSubmitting ? 'btn-loading opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <i className="fas fa-spinner fa-spin mr-2"></i>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </motion.form>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Footer */}
        <footer className="footer">
          <div className="footer-content max-w-[1200px] ml-[170px]">
            <div className="footer-copyright">
              {new Date().getFullYear()} oussama lbida. All rights reserved
            </div>
            <div className="social-links">
              <a 
                href="https://github.com/oussamalbida" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link github"
              >
                <i className="fab fa-github"></i>
              </a>
              <a 
                href="https://www.instagram.com/digital_services_agencyy?igsh=MXFpb3NoeDhjNm9kcQ==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link instagram"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a 
                href="https://www.linkedin.com/in/lbida-oussama-803533336?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" 
                target="_blank" 
                rel="noopener noreferrer"
                className="social-link linkedin"
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
        </footer>
      </main>

      {/* Background Shapes */}
      <div className="bg-shapes">
        <div className="shape-1"></div>
        <div className="shape-2"></div>
        <div className="shape-3"></div>
        <div className="shape-4"></div>
        <div className="shape-5"></div>
      </div>
    </AnimatePresence>
  );
}
