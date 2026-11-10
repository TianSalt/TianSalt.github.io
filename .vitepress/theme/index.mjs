// Theme entry. Beyond the default theme it loads fonts and styles,
// registers global components, and adds three behaviors: punctuation
// joining around atomic inlines, a rich-text outline, and image zoom
// with footnote tooltips.

import DefaultTheme from "vitepress/theme";
import { useData, onContentUpdated, inBrowser } from "vitepress";
import { h, onUnmounted } from "vue";
import mediumZoom from "medium-zoom";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import NotFound from "./NotFound.vue";
import YakuName from "./components/YakuName.vue";
import TutorialCardGrid from "./components/TutorialCardGrid.vue";
import "./custom.css";

// IBM Plex Sans for the three writing systems, self-hosted.
import "@fontsource/ibm-plex-sans/latin.css";
import "@fontsource/ibm-plex-sans/latin-italic.css";
import "@fontsource/ibm-plex-sans/latin-ext.css";
import "@fontsource/ibm-plex-sans/latin-ext-italic.css";
import "@fontsource/ibm-plex-sans-jp/japanese.css";
import "@fontsource/ibm-plex-sans-jp/latin.css";
import "@fontsource/ibm-plex-sans-jp/latin-ext.css";
import "@ibm/plex-sans-tc/css/ibm-plex-sans-tc-default.min.css";

const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

// ---------------------------------------------------------------------------
// Punctuation joining
//
// Chromium allows a soft break between an atomic inline (MathJax
// container, tile element) and adjacent text, ignoring the rules that
// keep closing punctuation off the line start and opening marks off the
// line end. A word joiner, or nowrap on the punctuation alone, does not
// survive that boundary; only one nowrap box around the element and its
// punctuation does.

const LINE_START_FORBIDDEN =
  /^[，。、；：！？）〕〉》」』】］｝’”…％〗〙〛,.;:!?)\]}'"]+/;
const LINE_END_FORBIDDEN =
  /(?:[（［｛〈《「『【〔〖〘〚‘“(\[{"'])+$/;

// The forbidden run touching a text node's boundary; "" otherwise.
const punctRun = (node, re) =>
  node?.nodeType === Node.TEXT_NODE
    ? (re.exec(node.nodeValue) || [""])[0]
    : "";

const glueAtomicPunct = () => {
  const root = document.querySelector(".vp-doc");
  if (!root) return;
  for (const el of root.querySelectorAll("mjx-container, m-pai, m-tehai")) {
    if (el.parentElement.classList.contains("atomic-join")) continue;
    const prev = el.previousSibling;
    const next = el.nextSibling;
    const before = punctRun(prev, LINE_END_FORBIDDEN);
    const after = punctRun(next, LINE_START_FORBIDDEN);
    if (!before && !after) continue;
    const wrapper = document.createElement("span");
    wrapper.className = "atomic-join";
    el.parentElement.insertBefore(wrapper, el);
    if (before) {
      prev.nodeValue = prev.nodeValue.slice(0, -before.length);
      wrapper.append(document.createTextNode(before));
    }
    wrapper.append(el);
    if (after) {
      if (after.length === next.nodeValue.length) {
        wrapper.append(next);
      } else {
        wrapper.append(document.createTextNode(after));
        next.nodeValue = next.nodeValue.slice(after.length);
      }
    }
  }
};

// ---------------------------------------------------------------------------
// Rich-text outline
//
// Outline titles are extracted at build time with all inline HTML
// stripped, so copy the live heading's markup into each outline link.
// Covers the aside and the mobile dropdown alike; the active-marker
// logic keys off the links themselves and is unaffected.

const decodeFragment = (raw) => {
  try {
    return decodeURIComponent(raw);
  } catch {
    return raw;
  }
};

const enrichOutline = () => {
  for (const a of document.querySelectorAll("a.outline-link")) {
    const href = a.getAttribute("href");
    if (!href?.startsWith("#") || href.length < 2) continue;
    const heading = document.getElementById(decodeFragment(href.slice(1)));
    if (!heading) continue;
    const clone = heading.cloneNode(true);
    clone.querySelector(".header-anchor")?.remove();
    const html = clone.innerHTML.trim();
    if (html && a.innerHTML !== html) a.innerHTML = html;
  }
};

// VPDocAsideOutline re-reads header data in its own onContentUpdated
// callback; patching on the next frame runs after that render flush, so
// the patch survives. Unchanged titles trigger no text patch.
const postContentUpdate = () => {
  glueAtomicPunct();
  requestAnimationFrame(enrichOutline);
};

// The mobile dropdown renders its items only while open, so patch again
// each time it toggles.
const onOutlineDropdownClick = (e) => {
  if (
    e.target instanceof Element &&
    e.target.closest(".VPLocalNavOutlineDropdown > button")
  ) {
    requestAnimationFrame(enrichOutline);
  }
};

// Screen-reader label of the main content region, per locale.
const MAIN_LABELS = {
  "zh-Hant": "博客主要内容",
  "ja-JP": "ブログメインコンテンツ",
};

export default {
  extends: DefaultTheme,
  // Registers the DOM patches above once per layout instance.
  Layout: {
    setup() {
      const { lang } = useData();
      if (inBrowser) {
        onContentUpdated(postContentUpdate);
        document.addEventListener("click", onOutlineDropdownClick, true);
        onUnmounted(() =>
          document.removeEventListener("click", onOutlineDropdownClick, true),
        );
      }
      return () =>
        h(
          DefaultTheme.Layout,
          { "aria-label": MAIN_LABELS[lang.value] ?? "Blog main content" },
          {
            "not-found": () => h(NotFound),
            // Replaces the built-in language menu, which links every locale
            // whether or not the article exists there.
            "nav-bar-content-after": () => h(LanguageSwitcher),
            "nav-screen-content-after": () => h(LanguageSwitcher, { mobile: true }),
          },
        );
    },
  },
  enhanceApp({ app }) {
    app.component("LanguageSwitcher", LanguageSwitcher);
    app.component("YakuName", YakuName);
    app.component("TutorialCardGrid", TutorialCardGrid);
    if (!inBrowser) return;

    // Zoom for document images, attached lazily on first hover.
    const zoom = mediumZoom({
      background: "var(--vp-c-bg)",
      margin: 24,
    });
    const attachZoom = (img) => {
      if (
        !img.hasAttribute("data-no-zoom") &&
        !img.classList.contains("medium-zoom-image")
      )
        zoom.attach(img);
    };

    // Footnote preview tooltip, replacing the native title attribute.
    let currentTooltip = null;
    let leaveTimeout = null;
    let tooltipSeq = 0;

    const closeTooltip = (immediate = false) => {
      clearTimeout(leaveTimeout);
      const destroy = () => {
        if (!currentTooltip) return;
        document
          .querySelector(`[aria-describedby="${currentTooltip.id}"]`)
          ?.removeAttribute("aria-describedby");
        currentTooltip.remove();
        currentTooltip = null;
      };
      if (immediate) destroy();
      else leaveTimeout = setTimeout(destroy, 100);
    };

    const openTooltip = (target) => {
      target.removeAttribute("title");
      clearTimeout(leaveTimeout);
      if (currentTooltip) return;
      const href = target.getAttribute("href");
      if (!href?.startsWith("#") || href.length < 2) return;
      const footnote = document.querySelector(href);
      if (!footnote) return;

      const clone = footnote.cloneNode(true);
      clone.querySelector(".footnote-backref")?.remove();
      const tooltip = document.createElement("div");
      tooltip.id = `tt-${++tooltipSeq}`;
      tooltip.className = "custom-footnote-tooltip";
      tooltip.setAttribute("role", "tooltip");
      tooltip.innerHTML = clone.innerHTML.trim();
      document.body.appendChild(tooltip);
      currentTooltip = tooltip;
      target.setAttribute("aria-describedby", tooltip.id);

      const rect = target.getBoundingClientRect();
      const size = tooltip.getBoundingClientRect();
      tooltip.style.top = `${rect.top + window.scrollY - size.height - 4}px`;
      tooltip.style.left = `${clamp(
        rect.left + window.scrollX + rect.width / 2 - size.width / 2,
        10,
        window.innerWidth - size.width - 10,
      )}px`;

      tooltip.addEventListener("mouseenter", () => clearTimeout(leaveTimeout));
      tooltip.addEventListener("mouseleave", () => closeTooltip());
    };

    const footnoteRef = (e) => e.target.closest?.(".footnote-ref a");

    document.addEventListener(
      "mouseover",
      (e) => {
        const t = e.target;
        if (t.tagName === "IMG" && t.closest(".vp-doc")) attachZoom(t);
        const ref = footnoteRef(e);
        if (ref) openTooltip(ref);
      },
      true,
    );
    document.addEventListener(
      "mouseout",
      (e) => {
        if (footnoteRef(e)) closeTooltip();
      },
      true,
    );
    document.addEventListener(
      "focusin",
      (e) => {
        const ref = footnoteRef(e);
        if (ref) openTooltip(ref);
      },
      true,
    );
    document.addEventListener(
      "focusout",
      (e) => {
        if (footnoteRef(e)) closeTooltip(true);
      },
      true,
    );
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && currentTooltip) {
        closeTooltip(true);
        e.preventDefault();
      }
      if (e.key === "Enter" || e.key === " ") {
        const el = document.activeElement;
        if (el?.getAttribute("role") === "button") el.click();
      }
    });
  },
};
