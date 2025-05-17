import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="row-start-3 flex flex-col p-6 gap-6 items-center text-center">
      <div className="text-xs text-neutral-600 dark:text-neutral-300">
        If you enjoy my work and want to help keep it going, consider donating 💸{' '}
        <Link
          href="https://www.paypal.me/kimsantino"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-400"
        >
          paypal.me/kimsantino
        </Link>
      </div>
      <div className="text-xs text-neutral-600 dark:text-text-neutral-300">
        DISCLAIMER: This page is fan-run and not affiliated with Hasbro or Takara Tomy.
      </div>
    </footer>
  );
};

export default Footer;
