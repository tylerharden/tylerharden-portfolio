// SplashScreen.jsx
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect/dist/core';

const SplashScreen = ({ onFinishSplashScreen }) => {
  const [showButton, setShowButton] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [typingComplete, setTypingComplete] = useState(false);

  useEffect(() => {
    const typewriter = new Typewriter('#typewriter', {
      loop: false,
      delay: 75,
      cursor: '█',
    });

    typewriter
      .typeString("Hi, I'm Tyler Harden.")
      .callFunction(() => {
        setTimeout(() => setShowButton(true), 500);
      })
      .start();
  }, []);

  const handleButtonClick = () => {
    setClicked(true);

    const typewriter = new Typewriter('#typewriter', {
      loop: false,
      delay: 75,
      cursor: '█',
    });

    typewriter
      .deleteAll(50)
      .typeString('tylerharden.io')
      .callFunction(() => {
        setTimeout(() => {
          setTypingComplete(true);
          setTimeout(() => {
            onFinishSplashScreen(); // << Tell App to show main content!
          }, 1000); // Small delay after typing before revealing everything
        }, 500);
      })
      .start();
  };

  return (
    <div className={`h-screen flex flex-col items-center justify-center bg-gray-100 transition-all duration-1000 ${typingComplete ? 'pt-4' : ''}`}>
      <motion.h1
        id="typewriter"
        className={`text-6xl font-bold mb-6 ${typingComplete ? 'text-3xl' : ''}`}
        initial={{ y: 0 }}
        animate={{ y: showButton ? -50 : 0, scale: typingComplete ? 0.5 : 1 }}
        transition={{ duration: 1 }}
      />
      
      <AnimatePresence>
        {showButton && !clicked && (
          <motion.button
            className="bg-black text-white py-3 px-6 text-lg font-semibold rounded-md hover:bg-gray-800"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            onClick={handleButtonClick}
          >
            Check out my work
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SplashScreen;