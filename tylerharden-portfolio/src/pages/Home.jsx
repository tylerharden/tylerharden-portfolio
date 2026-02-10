import { useEffect } from 'react';

const Home = ({ scrollToAbout }) => {
  useEffect(() => {
    // Handle Typewriter with graceful fallback if CDN script fails to load
    if (typeof window !== 'undefined' && window.Typewriter) {
      const typewriter = new window.Typewriter('#typewriter', {
        loop: false,
        delay: 75,
      });

      typewriter
        .typeString("Hi, I'm Tyler Harden.")
        .start();
    } else {
      // Fallback: just show the text immediately
      const element = document.getElementById('typewriter');
      if (element) {
        element.textContent = "Hi, I'm Tyler Harden.";
      }
    }
  }, []);

  return (
    // Hero section with responsive padding and min-height for flexible layout
    // Uses viewport units for better mobile-to-desktop scaling
    <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20 bg-gray-100 min-h-[60vh] flex flex-col items-center justify-center px-4">
      {/* Responsive heading: smaller on mobile, larger on desktop */}
      <h1 id="typewriter" className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 max-w-4xl"></h1>
      {/* Button with proper focus styles for accessibility */}
      <button 
        onClick={scrollToAbout}
        className="mt-8 bg-black text-white py-3 px-6 text-lg font-semibold rounded-md hover:bg-gray-800 transition duration-300 hover:-translate-y-1 hover:scale-105 transform focus:outline-none focus:ring-4 focus:ring-gray-400"
        aria-label="Scroll to about section"
      >
        Check out my work
      </button>
    </div>
  );
};

export default Home;