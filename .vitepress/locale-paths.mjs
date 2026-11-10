/**
 * Pure path helpers shared by the build (availability, sitemap) and the client
 * (language menu). The site keeps one directory per locale and mirrors every
 * page across them, so a page's translation is the same path with the leading
 * directory swapped.
 */

// Locale index (as used by VitePress `locales`) -> directory holding its pages.
export const LOCALE_DIRS = {
  root: "en",
  "zh-Hant": "zh-Hant",
  ja: "ja",
};

const LOCALE_BY_DIR = Object.fromEntries(
  Object.entries(LOCALE_DIRS).map(([locale, dir]) => [dir, locale]),
);

/** Split "en/tutorials/x/1.md" into its locale and its locale-independent key. */
export function splitPath(relativePath) {
  const rel = relativePath.replace(/\\/g, "/");
  const slash = rel.indexOf("/");
  const head = slash < 0 ? "" : rel.slice(0, slash);
  const locale = LOCALE_BY_DIR[head];
  return locale
    ? { locale, key: rel.slice(slash + 1) }
    : { locale: null, key: rel };
}

/** The URL of `relativePath` inside another locale, in clean-URL form. */
export function articleLink(locale, relativePath) {
  const { key } = splitPath(relativePath);
  const suffix = key
    .replace(/(^|\/)index\.md$/, "$1")
    .replace(/\.md$/, "");
  return `/${LOCALE_DIRS[locale]}/${suffix}`;
}

/** The directory URL of a locale, taken from its configured `link`. */
export function localeHome(locale, config) {
  return config?.link ?? `/${LOCALE_DIRS[locale]}/`;
}
