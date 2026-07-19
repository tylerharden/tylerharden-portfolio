import { motion } from 'framer-motion';
import Tag from '../components/Tag';
import aboutData from '../content/about.json';

const About = () => {
  return (
    <div>
      {/* PHOTO + ABOUT ME */}
      <div className="flex flex-col md:flex-row items-center md:items-start md:space-x-12">
        {/* Avatar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8 md:mb-0 flex-shrink-0"
        >
          <img
            src={aboutData.photo}
            alt="Tyler Harden"
            className="w-48 h-48 object-cover rounded-full mx-auto md:mx-0 shadow-lg"
          />
        </motion.div>

        {/* About Me Text */}
        <div className="flex-1 text-center md:text-left">
          <p className="mb-6 text-lg leading-relaxed">{aboutData.bio}</p>

          {/* Skills */}
          <div className="mt-10">
            <h3 className="text-2xl font-semibold mb-4">Skills</h3>

            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              {aboutData.skills.map((skill, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: idx * 0.04 }}
                >
                  <Tag>{skill}</Tag>
                </motion.div>
              ))}
            </div>

            <p className="text-neutral-500 dark:text-neutral-400 mt-4 text-sm">
              Skills and tools mastered
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
