import { useRef, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Resume from './pages/Resume';
import Music from './pages/Music';
import SplashScreen from './components/SplashScreen';
import Section from './components/Section';
import Auth from './pages/Auth'; // <- import Auth

// import './App.css'

function App() {
  const [splashDone, setSplashDone] = useState(false); // <- has the splash been exited yet?

  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const resumeRef = useRef(null);
  const musicRef = useRef(null);
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return <Auth onAuthSuccess={handleAuthSuccess} />;
  }


  const scrollToFirstSection = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };
  const scrollToSection = (ref) => {
    
    const offset = 80;
    const elementPosition = ref.current.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth',
    });
  };

  // useEffect(() => {
  //   if (splashDone) return;

  //   const handleScroll = () => {
  //     if (window.scrollY > window.innerHeight * 0.2) {
  //       // if user scrolls down a little bit (20% of the screen height)
  //       setSplashDone(true);
  //     }
  //   };

  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [splashDone]);

  return (
    // Main app container with semantic structure and proper min-height for footer positioning
    <div className="App bg-gray-100 dark:bg-gray-900 min-h-screen flex flex-col">
      {/* {!splashDone && (
        <SplashScreen onFinishSplashScreen={() => setSplashDone(true)} />
      )} */}

      {/* {splashDone && ( */}
        <>
          {/* Header landmark for navigation */}
          <header>
            <Navbar
              onScrollToSection={{
                about: () => scrollToSection(aboutRef),
                projects: () => scrollToSection(projectsRef),
                contact: () => scrollToSection(contactRef),
                resume: () => scrollToSection(resumeRef),
                music: () => scrollToSection(musicRef),
              }}
            />
          </header>
          
          {/* Main content area with flex-grow to push footer down */}
          <main className="flex-1 py-2"> 
            <div ref={aboutRef} className="">
              <Home scrollToAbout={() => scrollToSection(aboutRef)} />
            </div>
            <Section  name="About" reference={aboutRef} fillWhite={true}>
              <About />
            </Section>  

            <Section  name="Projects" reference={projectsRef} fillWhite={true}>
              <Projects />
            </Section>  

            <Section  name="Resume" reference={resumeRef} fillWhite={true}>
              <Resume />
            </Section>  

            <Section  name="Music" reference={musicRef} fillWhite={true}>
              <Music />
            </Section>  

            {/* Footer landmark for contact section */}
            <footer>
              <Section  name="Contact" reference={contactRef} fillWhite={true}>
                <Contact />
              </Section>
            </footer>
          </main>
        </>
      {/* )} */}
    </div>
  );
}

export default App;