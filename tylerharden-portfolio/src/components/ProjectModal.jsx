import { useState } from 'react';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Tag from './Tag';

const ProjectModal = ({ project, onClose }) => {
  const [failedImages, setFailedImages] = useState({});

  if (!project) return null;

  const settings = {
    dots: project.images.length > 1, // only show dots if multiple images
    infinite: project.images.length > 1,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: project.images.length > 1, // hide arrows if only 1 image
  };

  // Handle background click
  const handleBackgroundClick = (e) => {
    if (e.target.id === 'modal-background') {
      onClose();
    }
  };

  return (
    <motion.div
      id="modal-background"
      onClick={handleBackgroundClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-lg overflow-auto max-h-[90vh] w-full md:w-[70%] lg:w-[50%] p-6 relative"
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.25 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-900 dark:hover:text-white text-2xl font-bold leading-none"
        >
          &times;
        </button>

        {/* Photo Carousel */}
        {project.images.length > 0 && (
          <div className="mb-6 project-modal-carousel">
            <Slider {...settings}>
              {project.images.map((img, idx) =>
                failedImages[idx] ? (
                  <div
                    key={idx}
                    className="w-full h-64 rounded-lg flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 text-neutral-400 dark:text-neutral-600 text-3xl font-bold"
                  >
                    {project.title.charAt(0)}
                  </div>
                ) : (
                  <div key={idx}>
                    <img
                      src={img}
                      alt={`${project.title} screenshot ${idx + 1}`}
                      onError={() => setFailedImages((prev) => ({ ...prev, [idx]: true }))}
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                )
              )}
            </Slider>
          </div>
        )}

        {/* Project Details */}
        <h2 className="text-3xl font-bold mb-2">{project.title}</h2>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4">{project.year}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, idx) => (
            <Tag key={idx}>{skill}</Tag>
          ))}
        </div>

        <h3 className="text-lg font-semibold mb-2">{project.subtitle}</h3>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed">
          {project.fullDescription}
        </p>
      </motion.div>
    </motion.div>
  );
};

export default ProjectModal;
