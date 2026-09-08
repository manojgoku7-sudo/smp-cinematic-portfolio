/**
 * Keyboard accessibility: skip-to-content link that appears on focus.
 * Allows keyboard users to jump directly to main content, bypassing navigation.
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only fixed top-4 left-4 z-100 px-4 py-2 bg-violet-600 text-white font-semibold rounded focus:outline-none focus:ring-2 focus:ring-violet-300"
    >
      Skip to main content
    </a>
  );
}
