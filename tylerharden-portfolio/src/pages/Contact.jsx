import contactData from '../content/contact.json';

const Contact = () => {
  return (
    <div className="max-w-lg mx-auto">
      <p className="text-lg leading-relaxed text-neutral-600 dark:text-neutral-300 mb-8">{contactData.intro}</p>

      <form className="w-full space-y-5">
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="mt-1 block w-full border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
            rows="4"
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-semibold py-2.5 px-4 rounded-md hover:bg-neutral-700 dark:hover:bg-neutral-200 transition-colors"
        >
          Send Message
        </button>
      </form>

      <div className="mt-10 pt-8 border-t border-neutral-200 dark:border-neutral-800 text-center">
        <h3 className="text-sm font-semibold text-neutral-500 dark:text-neutral-400 uppercase tracking-wide mb-3">
          Connect with me
        </h3>
        <div className="flex justify-center gap-6 text-sm font-medium">
          {contactData.socials.map((social) => (
            <a key={social.label} href={social.url} target="_blank" rel="noopener noreferrer">
              {social.label}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Contact;
