import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTAINER } from '../lib/layout';

function Navbar({ onScrollToSection }) {
  const [darkMode, setDarkMode] = useState(
    () =>
      localStorage.getItem('theme') === 'dark' ||
      (!localStorage.getItem('theme') &&
        window.matchMedia('(prefers-color-scheme: dark)').matches)
  );
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // md breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleMenuItemClick = (section) => {
    onScrollToSection[section]();
    setIsMenuOpen(false); // Close menu after clicking
  };

  const menuItems = [
    { label: 'Home', section: 'home' },
    { label: 'About', section: 'about' },
    { label: 'Projects', section: 'projects' },
    { label: 'Resume', section: 'resume' },
    { label: 'Music', section: 'music' },
    { label: 'Contact', section: 'contact' },
  ];

  return (
    <nav
      className={`bg-white/80 dark:bg-neutral-950/80 backdrop-blur-md border-b sticky top-0 z-50 transition-shadow ${
        isScrolled
          ? 'border-neutral-200 dark:border-neutral-800 shadow-sm'
          : 'border-transparent'
      }`}
    >
      <div className={`${CONTAINER} py-4 flex justify-between items-center`}>
        {/* Brand */}
        <h3 className="text-lg font-semibold tracking-tight">tylerharden.io</h3>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center space-x-8 text-sm font-medium text-neutral-600 dark:text-neutral-300">
          {menuItems.map((item, idx) => (
            <li
              key={idx}
              className="cursor-pointer hover:text-neutral-900 dark:hover:text-white transition-colors"
              onClick={() => onScrollToSection[item.section]()}
            >
              {item.label}
            </li>
          ))}
          <li>
            <button
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle dark mode"
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            className="text-2xl leading-none focus:outline-none"
          >
            {isMenuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
          className="fixed inset-0 z-40 bg-white/70 dark:bg-neutral-950/80 backdrop-blur-lg flex flex-col items-center justify-center space-y-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          >
            {menuItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
                className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-lg px-6 py-3 rounded-full shadow-md cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700"
                onClick={() => handleMenuItemClick(item.section)}
              >
                {item.label}
              </motion.div>
            ))}
            {/* Dark Mode Button inside Menu */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3, delay: menuItems.length * 0.1 }}
              className="bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white text-lg px-6 py-3 rounded-full shadow-md cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-700"
              onClick={() => setDarkMode(!darkMode)}
            >
              {darkMode ? '☀️ Light Mode' : '🌙 Dark Mode'}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
