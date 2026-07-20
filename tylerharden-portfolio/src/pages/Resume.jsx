import { useState } from 'react';
import resumeData from '../content/resume.json';
import ExperienceTimeline from '../components/ExperienceTimeline';

function Resume() {
  const [view, setView] = useState('timeline');

  return (
    <div>
      <p className="mb-8 text-lg leading-relaxed max-w-3xl">{resumeData.bio}</p>

      <div className="inline-flex items-center rounded-full border border-neutral-200 dark:border-neutral-800 p-0.5 mb-6">
        {['timeline', 'list'].map((option) => (
          <button
            key={option}
            onClick={() => setView(option)}
            className={`px-3 py-1 text-sm rounded-full capitalize transition-colors cursor-pointer ${
              view === option
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'text-neutral-500 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      {view === 'timeline' ? (
        <>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 md:hidden">Tap a role to expand it.</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 hidden md:block">Click a point on the line to expand it.</p>
          <ExperienceTimeline experience={resumeData.experience} />
        </>
      ) : (
        <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
          {resumeData.experience.map((item, index) => (
            <li key={index} className="py-5 first:pt-0 last:pb-0">
              <h4 className="text-lg font-bold">{item.position}</h4>
              <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                {item.team} &middot; {item.stringDate}
              </p>
              <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-300">{item.description}</p>
            </li>
          ))}
        </ul>
      )}

      {resumeData.education?.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Education</h3>
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {resumeData.education.map((item, index) => (
              <li key={index} className="py-5 first:pt-0 last:pb-0">
                <h4 className="text-lg font-bold">{item.degree}</h4>
                <p className="text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  {item.institution} &middot; {item.stringDate}
                </p>
                <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-300">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {resumeData.additionalExperience?.length > 0 && (
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-4">Additional Experience</h3>
          <ul className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {resumeData.additionalExperience.map((item, index) => (
              <li key={index} className="py-5 first:pt-0 last:pb-0">
                <h4 className="text-lg font-bold">{item.title}</h4>
                <p className="text-sm mt-2 text-neutral-600 dark:text-neutral-300">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      )}

      <p className="mt-8">
        Download my resume{' '}
        <a href="/Tyler Harden_Resume_2025.pdf" className="font-medium">
          here
        </a>
        .
      </p>
    </div>
  );
}

export default Resume;
