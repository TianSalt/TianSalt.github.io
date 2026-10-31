import enLocale from "./locales/en.mjs";
import jaLocale from "./locales/ja.mjs";
import zhHantLocale from "./locales/zh-Hant.mjs";

const localeSidebars = [
  ["zh-Hant/", zhHantLocale.themeConfig.sidebar],
  ["ja/", jaLocale.themeConfig.sidebar],
  ["en/", enLocale.themeConfig.sidebar],
];

const HASH_OR_QUERY_RE = /[?#].*$/;
const INDEX_OR_EXT_RE = /(?:(^|\/)index)?\.(?:md|html)$/;
const TUTORIAL_RE = /\/tutorials\/([^/]+)\//;

function normalize(path) {
  return decodeURI(path)
    .replace(HASH_OR_QUERY_RE, "")
    .replace(INDEX_OR_EXT_RE, "$1");
}

function flattenLinks(items, links = []) {
  for (const item of items) {
    if (item.link) links.push(item.link);
    if (item.items) flattenLinks(item.items, links);
  }
  return links;
}

/**
 * Precompute a flattened list of links for each tutorial directory, so we can
 * quickly find the previous/next links for a given page.
 */
const locales = localeSidebars
  .map(([prefix, sidebar]) => ({
    prefix,
    dirs: Object.keys(sidebar).sort(
      (a, b) => b.split("/").length - a.split("/").length,
    ),
    sidebars: sidebar,
  }))
  .map((entry) => ({ ...entry, cached: new Map() }));

function linksFor(entry, relativePath) {
  const dir = entry.dirs.find((d) => relativePath.startsWith(`/${d}`));
  if (!dir) return [];
  if (!entry.cached.has(dir)) {
    entry.cached.set(dir, flattenLinks(entry.sidebars[dir]));
  }
  return entry.cached.get(dir);
}

function tutorialSlug(link) {
  return link.match(TUTORIAL_RE)?.[1] ?? null;
}

/**
 * The sidebar lists every tutorial together, so VitePress would derive the
 * doc-footer "previous/next" links across tutorial boundaries. Hide the
 * direction that leads into a different tutorial, while keeping the links that
 * go to and from the tutorials index page.
 */
export function keepPrevNextInsideTutorial(pageData) {
  const relativePath = `/${pageData.relativePath}`;
  const entry = locales.find((e) => relativePath.startsWith(e.prefix));
  if (!entry) return;

  const links = linksFor(entry, relativePath);
  const current = normalize(relativePath);
  const index = links.findIndex((link) => normalize(link) === current);
  if (index < 0) return;

  const slug = tutorialSlug(links[index]);
  if (!slug) return;

  const prevSlug = tutorialSlug(links[index - 1]);
  const nextSlug = tutorialSlug(links[index + 1]);
  if (prevSlug && prevSlug !== slug) pageData.frontmatter.prev = false;
  if (nextSlug && nextSlug !== slug) pageData.frontmatter.next = false;
}
