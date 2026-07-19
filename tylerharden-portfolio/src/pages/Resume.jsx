import resumeData from '../content/resume.json';
import ExperienceTimeline from '../components/ExperienceTimeline';

function Resume() {
  return (
    <div>
      <p className="mb-10 text-lg leading-relaxed max-w-3xl">{resumeData.bio}</p>

      <h3 className="text-2xl font-semibold mb-4">Experience</h3>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 md:hidden">Tap a role to expand it.</p>
      <p className="text-sm text-neutral-500 dark:text-neutral-400 mb-4 hidden md:block">Click a point on the line to expand it.</p>
      <ExperienceTimeline experience={resumeData.experience} />

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
