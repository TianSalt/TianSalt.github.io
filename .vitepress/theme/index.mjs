import DefaultTheme from "vitepress/theme";
import { useData } from "vitepress";
import { h } from "vue";
import mediumZoom from "medium-zoom";
import LanguageSwitcher from "./LanguageSwitcher.vue";
import NotFound from "./NotFound.vue";
import "./custom.css";

import "@fontsource/ibm-plex-sans/latin.css";
import "@fontsource/ibm-plex-sans/latin-italic.css";
import "@fontsource/ibm-plex-sans/latin-ext.css";
import "@fontsource/ibm-plex-sans/latin-ext-italic.css";
import "@fontsource/ibm-plex-sans-jp/japanese.css";
import "@fontsource/ibm-plex-sans-jp/latin.css";
import "@fontsource/ibm-plex-sans-jp/latin-ext.css";
import "@ibm/plex-sans-tc/css/ibm-plex-sans-tc-default.min.css";

import YakuName from "./components/YakuName.vue";

export default {
  extends: DefaultTheme,
  Layout: () => {
    const { lang } = useData();

    return h(
      DefaultTheme.Layout,
      {
        "aria-label":
          lang.value === "zh-Hant"
            ? "博客主要内容"
            : lang.value === "ja-JP"
              ? "ブログメインコンテンツ"
              : "Blog main content",
      },
      {
        "not-found": () => h(NotFound),
      },
    );
  },
  enhanceApp({ app }) {
    app.component("LanguageSwitcher", LanguageSwitcher);
    app.component("YakuName", YakuName);

    if (typeof window === "undefined") return;

    const zoom = mediumZoom({
      background: "var(--vp-c-bg)",
      margin: 24,
    });

    const attachZoom = (target) => {
      if (!target.classList.contains("medium-zoom-image")) {
        zoom.attach(target);
      }
    };

    document.addEventListener(
      "mouseover",
      (e) => {
        const target = e.target;
        if (target && target.tagName === "IMG" && target.closest(".vp-doc")) {
          attachZoom(target);
        }
      },
      true,
    );

    let currentTooltip = null;
    let leaveTimeout = null;

    const openTooltip = (target) => {
      if (target.hasAttribute("title")) {
        target.removeAttribute("title");
      }

      if (leaveTimeout) {
        clearTimeout(leaveTimeout);
        leaveTimeout = null;
      }

      if (currentTooltip) return;

      const targetId = target.getAttribute("href");
      if (targetId && targetId.startsWith("#")) {
        const footnoteContent = document.querySelector(targetId);
        if (footnoteContent) {
          const clone = footnoteContent.cloneNode(true);
          const backref = clone.querySelector(".footnote-backref");
          if (backref) backref.remove();

          let htmlContent = clone.innerHTML.trim().replace(/↩/g, "").trim();

          const tooltip = document.createElement("div");
          const uniqueId = `tt-${Math.random().toString(36).substring(2, 9)}`;
          tooltip.id = uniqueId;
          tooltip.className = "custom-footnote-tooltip";
          tooltip.setAttribute("role", "tooltip");
          tooltip.innerHTML = htmlContent;
          document.body.appendChild(tooltip);
          currentTooltip = tooltip;

          target.setAttribute("aria-describedby", uniqueId);

          const rect = target.getBoundingClientRect();
          const tooltipRect = tooltip.getBoundingClientRect();

          let top = rect.top + window.scrollY - tooltipRect.height - 4;
          let left =
            rect.left + window.scrollX + rect.width / 2 - tooltipRect.width / 2;

          if (left < 10) left = 10;
          if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
          }

          tooltip.style.top = `${top}px`;
          tooltip.style.left = `${left}px`;

          tooltip.addEventListener("mouseenter", () => {
            if (leaveTimeout) clearTimeout(leaveTimeout);
          });
          tooltip.addEventListener("mouseleave", () => closeTooltip());
        }
      }
    };

    const closeTooltip = (immediate = false) => {
      if (leaveTimeout) clearTimeout(leaveTimeout);

      const destroy = () => {
        if (currentTooltip) {
          const trigger = document.querySelector(
            `[aria-describedby="${currentTooltip.id}"]`,
          );
          if (trigger) trigger.removeAttribute("aria-describedby");
          currentTooltip.remove();
          currentTooltip = null;
        }
      };

      if (immediate === true) {
        destroy();
      } else {
        leaveTimeout = setTimeout(destroy, 100);
      }
    };

    document.addEventListener(
      "mouseover",
      (e) => {
        const target = e.target.closest(".footnote-ref a");
        if (target) openTooltip(target);
      },
      true,
    );

    document.addEventListener(
      "mouseout",
      (e) => {
        const target = e.target.closest(".footnote-ref a");
        if (target) closeTooltip();
      },
      true,
    );

    document.addEventListener(
      "focusin",
      (e) => {
        const target = e.target.closest(".footnote-ref a");
        if (target) openTooltip(target);
      },
      true,
    );

    document.addEventListener(
      "focusout",
      (e) => {
        const target = e.target.closest(".footnote-ref a");
        if (target) closeTooltip(true);
      },
      true,
    );

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && currentTooltip) {
        closeTooltip(true);
        e.preventDefault();
      }

      if (e.key === "Enter" || e.key === " ") {
        const target = document.activeElement;
        if (target && target.getAttribute("role") === "button") {
          target.click();
        }
      }
    });
  },
};
