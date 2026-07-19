import { CONTAINER } from '../lib/layout';

const Section = ({ name, reference, children }) => {
  return (
    <div className="border-t border-neutral-100 dark:border-neutral-900">
      <div className={`${CONTAINER} py-16 sm:py-24`}>
        <div ref={reference} className="mb-10 sm:mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">{name}</h2>
          <div className="mt-4 h-1 w-10 rounded-full bg-blue-600" />
        </div>
        {children}
      </div>
    </div>
  );
};

export default Section;
