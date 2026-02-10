import { useEffect } from 'react';
import Typewriter from 'typewriter-effect/dist/core';

const Home = ({ scrollToAbout }) => {
  useEffect(() => {
    const typewriter = new Typewriter('#typewriter', {
      loop: false,
      delay: 75,
    });

    typewriter
      .typeString("Hi, I'm Tyler Harden.")
      .start();
  }, []);

  return (
    <div className="text-center py-20 bg-gray-100">
      <h1 id="typewriter" className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"></h1>
      <button 
  onClick={scrollToAbout}
  className="mt-8 bg-black text-white py-3 px-6 text-lg font-semibold rounded-md hover:bg-gray-800 transition duration-300 hover:-translate-y-1 hover:scale-105 transform"
>
  Check out my work
</button>
    </div>
  );
};

export default Home;