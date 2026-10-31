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

function withLeadingSlash(path) {
  return path.startsWith("/") ? path : `/${path}`;
}

function flattenLinks(items, links = []) {
  for (const item of items) {
    if (item.link) links.push(item.link);
    if (item.items) flattenLinks(item.items, links);
  }
  return links;
}

function findSidebar(sidebarConfig, relativePath) {
  const path = withLeadingSlash(relativePath);
  const dir = Object.keys(sidebarConfig)
    .sort((a, b) => b.split("/").length - a.split("/").length)
    .find((dir) => path.startsWith(withLeadingSlash(dir)));
  return dir ? sidebarConfig[dir] : [];
}

function tutorialSlug(link) {
  const match = link.match(TUTORIAL_RE);
  return match ? match[1] : null;
}

/**
 * The sidebar lists every tutorial together, so VitePress would derive the
 * doc-footer "previous/next" links across tutorial boundaries. Hide the
 * direction that leads into a different tutorial, while keeping the links that
 * go to and from the tutorials index page.
 */
export function keepPrevNextInsideTutorial(pageData) {
  const relativePath = pageData.relativePath.replace(/\\/g, "/");
  const entry = localeSidebars.find(([prefix]) =>
    relativePath.startsWith(prefix),
  );
  if (!entry) return;

  const links = flattenLinks(findSidebar(entry[1], relativePath));
  const current = normalize(withLeadingSlash(relativePath));
  const index = links.findIndex((link) => normalize(link) === current);
  if (index < 0) return;

  const slug = tutorialSlug(links[index]);
  if (!slug) return;

  pageData.frontmatter ??= {};

  const prev = links[index - 1];
  const next = links[index + 1];
  const prevSlug = prev ? tutorialSlug(prev) : null;
  const nextSlug = next ? tutorialSlug(next) : null;

  if (prevSlug && prevSlug !== slug) {
    pageData.frontmatter.prev = false;
  }
  if (nextSlug && nextSlug !== slug) {
    pageData.frontmatter.next = false;
  }
}
