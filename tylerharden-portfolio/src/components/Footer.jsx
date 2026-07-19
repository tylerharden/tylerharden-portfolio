import { CONTAINER } from '../lib/layout';

const Footer = () => (
  <footer className="border-t border-neutral-200 dark:border-neutral-800">
    <div className={`${CONTAINER} py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-neutral-500 dark:text-neutral-400`}>
      <p>&copy; {new Date().getFullYear()} Tyler Harden.</p>
      <a href="#top" className="hover:text-neutral-900 dark:hover:text-white">
        Back to top ↑
      </a>
    </div>
  </footer>
);

export default Footer;
