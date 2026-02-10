import { useState, useRef } from 'react';
import Slider from 'react-slick';
import ProjectCard from '../components/ProjectCard';
import ProjectModal from '../components/ProjectModal';
import projectsData from '../content/projects.json';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { AnimatePresence } from 'framer-motion';

const Projects = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const startX = useRef(0);
  const startY = useRef(0);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 640,
        settings: { slidesToShow: 1, arrows: true },
      },
    ],
  };

  const handleMouseDown = (e) => {
    startX.current = e.clientX;
    startY.current = e.clientY;
  };

  const handleMouseUp = (e, project) => {
    const dx = Math.abs(e.clientX - startX.current);
    const dy = Math.abs(e.clientY - startY.current);

    if (dx < 5 && dy < 5) {
      // Small movement = legit click
      setSelectedProject(project);
    }
    // Otherwise, ignore click after dragging
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  return (
    <div className="container mx-auto px-4">
      <div className="px-2">
        <Slider {...settings}>
          {projectsData.map((project, index) => (
            <div key={index} className="p-2">
              <div 
                onMouseDown={handleMouseDown}
                onMouseUp={(e) => handleMouseUp(e, project)}
              >
                <ProjectCard project={project} />
              </div>
            </div>
          ))}
        </Slider>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal project={selectedProject} onClose={handleCloseModal} />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;