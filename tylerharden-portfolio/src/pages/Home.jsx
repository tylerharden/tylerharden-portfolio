import { useEffect, useRef } from 'react';
import Typewriter from 'typewriter-effect/dist/core';
import { CONTAINER } from '../lib/layout';
import homeData from '../content/home.json';

const Home = ({ scrollToAbout }) => {
  const typewriterEl = useRef(null);

  useEffect(() => {
    const typewriter = new Typewriter(typewriterEl.current, {
      loop: false,
      delay: 60,
    });

    typewriter.typeString(`Hi, I'm ${homeData.title}.`).start();
  }, []);

  return (
    <section
      className={`${CONTAINER} min-h-[85vh] flex flex-col items-center justify-center text-center gap-6`}
    >
      <h1
        ref={typewriterEl}
        className="text-5xl sm:text-6xl font-bold tracking-tight min-h-[1.2em]"
      />
      <p className="max-w-xl text-lg text-neutral-500 dark:text-neutral-400">
        {homeData.subtitle}
      </p>
      <button
        onClick={scrollToAbout}
        className="mt-4 bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 py-3 px-7 text-base font-semibold rounded-full hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
      >
        {homeData.cta}
      </button>
    </section>
  );
};

export default Home;
