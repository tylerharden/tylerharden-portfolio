import { useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Music from './pages/Music';
import Section from './components/Section';
import Footer from './components/Footer';
import Auth from './pages/Auth';

// Gate the whole site behind the password screen in Auth.jsx. Off by default -
// flip to true to lock the site back down.
const SITE_LOCKED = false;

function App() {
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const resumeRef = useRef(null);
  const musicRef = useRef(null);

  const [isAuthenticated, setIsAuthenticated] = useState(!SITE_LOCKED);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }


  const scrollToSection = (ref) => {
    if (!ref.current) return;
    const navHeight = document.querySelector('nav')?.getBoundingClientRect().height ?? 0;
    const buffer = 16;
    const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - navHeight - buffer;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  return (
    <div id="top" className="bg-white dark:bg-neutral-950">
      <Navbar
        onScrollToSection={{
          home: () => window.scrollTo({ top: 0, behavior: 'smooth' }),
          about: () => scrollToSection(aboutRef),
          projects: () => scrollToSection(projectsRef),
          contact: () => scrollToSection(contactRef),
          resume: () => scrollToSection(resumeRef),
          music: () => scrollToSection(musicRef),
        }}
      />
      <Home scrollToAbout={() => scrollToSection(aboutRef)} />

      <Section name="About" reference={aboutRef}>
        <About />
      </Section>

      <Section name="Projects" reference={projectsRef}>
        <Projects />
      </Section>

      <Section name="Experience" reference={resumeRef}>
        <Resume />
      </Section>

      <Section name="Music" reference={musicRef}>
        <Music />
      </Section>

      <Section name="Contact" reference={contactRef}>
        <Contact />
      </Section>

      <Footer />
    </div>
  );
}

export default App;