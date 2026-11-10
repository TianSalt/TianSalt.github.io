import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { LOCALE_DIRS, articleLink, splitPath } from "./locale-paths.mjs";

const SRC_ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

// BCP 47 tags, as the sitemap and the menu label each locale.
export const LOCALE_LANGS = {
  root: "en-US",
  "zh-Hant": "zh-Hant",
  ja: "ja-JP",
};

/** The locales that have a file for this page, as locale index keys. */
export function availableLocales(relativePath) {
  const { key } = splitPath(relativePath);
  return Object.entries(LOCALE_DIRS)
    .filter(([, dir]) => existsSync(join(SRC_ROOT, dir, key)))
    .map(([locale]) => locale);
}

/**
 * Records on every page which locales actually hold it, so the language menu
 * can tell a real translation from a missing one instead of promising a 404.
 */
export function markAvailableLocales(pageData) {
  pageData.frontmatter ??= {};
  pageData.frontmatter.langs = availableLocales(pageData.relativePath);
}

/**
 * hreflang alternates, limited to the mirrors that exist. Without this the
 * sitemap advertises every language for every page and points crawlers at 404s.
 */
export function hreflangLinks(url, hostname) {
  const path = url.startsWith(hostname) ? url.slice(hostname.length) : url;
  const trimmed = path.replace(/^\//, "");
  const relative = trimmed.endsWith("/") ? `${trimmed}index.md` : `${trimmed}.md`;
  const { locale } = splitPath(relative);
  if (!locale) return [{ lang: LOCALE_LANGS.root, url }];

  return availableLocales(relative).map((code) => ({
    lang: LOCALE_LANGS[code],
    url: code === locale ? url : new URL(articleLink(code, relative), hostname).href,
  }));
}
