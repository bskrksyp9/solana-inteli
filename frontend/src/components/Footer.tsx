export default function Footer() {
  return (
    <footer
      className="mt-10 py-6 text-center text-sm
      text-gray-600 dark:text-gray-400
      border-t border-gray-200 dark:border-gray-700"
    >
      <p className="mb-3">
        <span className="font-semibold text-gray-800 dark:text-gray-200">
          Tip:
        </span>{" "}
        Bookmark SolSoochy to check your Solana wallet anytime in seconds.
      </p>

      <div className="flex justify-center items-center gap-4 mt-2 opacity-90">
        <a
          href="https://github.com/bskrksyp9"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:opacity-100 opacity-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-gray-700 dark:text-gray-300"
          >
            <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.1 3.3 9.4 7.9 10.9.6.1.8-.2.8-.5v-2c-3.2.7-3.9-1.6-3.9-1.6-.5-1.2-1.1-1.6-1.1-1.6-.9-.6.1-.6.1-.6 1 .1 1.6 1 1.6 1 .9 1.6 2.5 1.1 3.1.9.1-.7.4-1.1.7-1.4-2.6-.3-5.3-1.3-5.3-5.8 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.6.1-3.2 0 0 1-.3 3.3 1.2a11 11 0 0 1 6 0C18 5.3 19 5.6 19 5.6c.6 1.6.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.5-2.8 5.5-5.4 5.8.4.4.8 1.1.8 2.2v3.2c0 .3.2.6.8.5A10.99 10.99 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
          </svg>
          <span className="hidden sm:inline">GitHub</span>
        </a>

        <a
          href="https://www.linkedin.com/in/bskrksyp"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:opacity-100 opacity-80"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            className="text-blue-600 dark:text-blue-400"
          >
            <path d="M4.98 3.5A2.5 2.5 0 0 1 7.48 6v12a2.5 2.5 0 0 1-5 0V6a2.5 2.5 0 0 1 2.5-2.5ZM9.5 9h3v1.7c.6-1.1 2-2 4-2 4 0 4.5 2.6 4.5 6v5.3h-3V15c0-1.6 0-3.6-2.3-3.6-2.3 0-2.7 1.8-2.7 3.5v5.1h-3V9Z" />
          </svg>
          <span className="hidden sm:inline">LinkedIn</span>
        </a>
      </div>

     <p className="mt-3 text-xs opacity-75">
  Crafted with care by{" "}
  <a
    href="https://collectors.poap.xyz/scan/0xskarabhaa.onpoap.eth"
    target="_blank"
    rel="noopener noreferrer"
    className="font-medium text-indigo-600 dark:text-indigo-400 hover:underline"
  >
    0xskarabhaa
  </a>.
</p>
    </footer>
  );
}