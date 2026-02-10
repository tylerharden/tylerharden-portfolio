import resumeData from '../content/resume.json';
import Timeline from '../components/Timeline';

function Resume() {
  return (
    <div className="container mx-auto px-6">
      <p className="mb-6">{resumeData.bio}</p>
      <h2 className="text-xl font-semibold mb-4">Experience</h2>
      <ul className="space-y-4">
        {resumeData.experience.map((item, index) => (
          <li key={index} className="border-b pb-4">
            <h3 className="text-lg font-bold">{item.title}</h3>
            <p className="text-xs text-gray-600">{item.stringDate}</p>
            <p className="text-sm">{item.description}</p>
          </li>
        ))}
      </ul>
      <p className="mt-6">
        Download my resume{' '}
        <a
          href="/Tyler Harden_Resume_2025.pdf"
          className="text-blue-500 underline"
        >
          here
        </a>.
      </p>
          <Timeline />

    </div>
    
  );
}

export default Resume;