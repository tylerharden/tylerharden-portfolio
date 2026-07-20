import { useState } from 'react';
import Tag from './Tag';

const ProjectCard = ({ project, onClick }) => {
  const [imgError, setImgError] = useState(false);

  return (
    <div
      onClick={onClick}
      className="flex flex-col h-full bg-white dark:bg-neutral-900 rounded-2xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
    >
      {/* Thumbnail */}
      {imgError ? (
        <div className="w-full h-48 flex items-center justify-center bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 text-neutral-400 dark:text-neutral-600 text-3xl font-bold">
          {project.title.charAt(0)}
        </div>
      ) : (
        <img
          src={project.thumbnail}
          alt={project.title}
          onError={() => setImgError(true)}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Project Details */}
      <div className="flex flex-col flex-1 p-6 text-left">
        <h3 className="text-xl font-bold tracking-tight">{project.title}</h3>
        <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">{project.subtitle}</p>
        <p className="text-xs text-neutral-400 dark:text-neutral-500 mb-4 mt-1">{project.year}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.skills.map((skill, index) => (
            <Tag key={index}>{skill}</Tag>
          ))}
        </div>

        <p className="text-neutral-600 dark:text-neutral-300 text-sm leading-relaxed mt-auto">
          {project.description}
        </p>
      </div>
    </div>
  );
};
export default ProjectCard;
