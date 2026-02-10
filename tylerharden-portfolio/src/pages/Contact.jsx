import React from 'react';

const Contact = () => {
  return (
    // Contact form with responsive padding - removed min-h-screen to avoid conflicts with Section wrapper
    <div className="flex flex-col items-center justify-center py-8 sm:py-12 md:py-16 px-4">
      <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
      <form className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="name">
            Name
          </label>
          <input
            type="text"
            id="name"
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            aria-required="true"
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300" htmlFor="message">
            Message
          </label>
          <textarea
            id="message"
            className="mt-1 block w-full border border-gray-300 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows="4"
            required
            aria-required="true"
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors"
        >
          Send Message
        </button>
      </form>
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Connect with me:</h2>
        <div className="flex space-x-4 mt-2">
          <a 
            href="https://twitter.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
            aria-label="Connect on Twitter"
          >
            Twitter
          </a>
          <a 
            href="https://linkedin.com/in/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
            aria-label="Connect on LinkedIn"
          >
            LinkedIn
          </a>
          <a 
            href="https://github.com/yourprofile" 
            target="_blank" 
            rel="noopener noreferrer"
            className="hover:underline focus:outline-none focus:ring-2 focus:ring-blue-400 rounded px-1"
            aria-label="Connect on GitHub"
          >
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
};

export default Contact;