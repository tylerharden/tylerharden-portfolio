import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTAINER } from '../lib/layout';

const SunIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
  </svg>
);

const MoonIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </svg>
);

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
              className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-neutral-700 dark:text-neutral-300 transition-colors"
            >
              {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
            </button>
          </li>
        </ul>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMenuOpen}
            className="text-2xl leading-none focus:outline-none"
          >
            {isMenuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </div>

      {/* Mobile menu: a native collapse that slides open below the nav row,
          pushing page content down, instead of a fullscreen overlay. */}
      <AnimatePresence initial={false}>
        {isMenuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden border-t border-neutral-200 dark:border-neutral-800"
          >
            <ul className={`${CONTAINER} py-2`}>
              {menuItems.map((item, idx) => (
                <li
                  key={idx}
                  className="py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 border-b border-neutral-100 dark:border-neutral-900 cursor-pointer"
                  onClick={() => handleMenuItemClick(item.section)}
                >
                  {item.label}
                </li>
              ))}
              <li>
                <button
                  onClick={() => setDarkMode(!darkMode)}
                  className="flex items-center gap-2 w-full py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 cursor-pointer"
                >
                  {darkMode ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                  {darkMode ? 'Light Mode' : 'Dark Mode'}
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
