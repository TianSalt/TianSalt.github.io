import { defineConfig } from "vitepress";
import zhHantLocale from "./locales/zh-Hant.mjs";
import enLocale from "./locales/en.mjs";
import jaLocale from "./locales/ja.mjs";
import footnote from "markdown-it-footnote";
import container from "markdown-it-container";

export default defineConfig({
  title: "鹽語屋",
  description: "理性・溫柔・可愛",
  lang: "zh-Hant",
  base: "/",

  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => {
          return ["m-tehai", "m-pai", "l-ja", "n-w", "m-p"].includes(tag);
        },
      },
    },
  },

  head: [
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    [
      "meta",
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    ["meta", { "http-equiv": "X-UA-Compatible", content: "IE=edge" }],
    ["meta", { name: "robots", content: "index, follow" }],
    ["link", { rel: "icon", href: "/favicon.ico" }],
    [
      "link",
      {
        rel: "alternate",
        hreflang: "zh-Hant",
        href: "https://tiansalt.github.io/zh-Hant/",
      },
    ],
    [
      "link",
      {
        rel: "alternate",
        hreflang: "en-US",
        href: "https://tiansalt.github.io/en/",
      },
    ],
    [
      "link",
      {
        rel: "alternate",
        hreflang: "ja-JP",
        href: "https://tiansalt.github.io/ja/",
      },
    ],
    ["link", { rel: "canonical", href: "https://tiansalt.github.io/" }],
  ],

  locales: {
    root: {
      label: "English",
      lang: "en-US",
      link: "/en/",
      ...enLocale,
    },
    "zh-Hant": {
      label: "中文",
      lang: "zh-Hant",
      link: "/zh-Hant/",
      ...zhHantLocale,
    },
    ja: {
      label: "日本語",
      lang: "ja-JP",
      link: "/ja/",
      ...jaLocale,
    },
  },

  themeConfig: {
    logo: "/icon.jpg",
    siteTitle: "甜Salt",

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/TianSalt",
        ariaLabel: "GitHub",
      },
    ],

    search: {
      provider: "local",
      options: {
        translations: {
          button: {
            buttonText: "Search",
            buttonAriaLabel: "Search",
          },
          modal: {
            noResultsText: "No results found for",
            resetButtonTitle: "Clear search query",
            footer: {
              selectText: "to select",
              navigateText: "to navigate",
              closeText: "to close",
            },
          },
        },
      },
    },

    footer: {
      message: "Powered by VitePress",
      copyright: "Copyright © 2026 TianSalt",
    },
  },

  markdown: {
    lineNumbers: true,
    image: {
      lazyLoading: true,
    },
    math: true,
    config: (md) => {
      md.use(footnote);
      md.use(container, "theorem", {
        validate: (params) => params.trim().match(/^theorem\s*(.*)$/),
        render: (tokens, idx) => {
          const m = tokens[idx].info.trim().match(/^theorem\s*(.*)$/);
          if (tokens[idx].nesting === 1) {
            const titleText = m && m[1] ? m[1].trim() : "";
            const finalTitle = titleText
              ? `<p class="math-title">${titleText}</p>`
              : "";
            return `<div class="math-container theorem">${finalTitle}<div class="math-content">\n`;
          } else {
            return "</div></div>\n";
          }
        },
      });
    },
  },

  sitemap: {
    hostname: "https://tiansalt.github.io",
    transformItems(items) {
      return items.map((item) => {
        if (item.url.includes("/zh-Hant/")) {
          return {
            ...item,
            links: [
              { lang: "zh-Hant", url: item.url },
              { lang: "en-US", url: item.url.replace("/zh-Hant/", "/en/") },
              { lang: "ja-JP", url: item.url.replace("/zh-Hant/", "/ja/") },
            ],
          };
        } else if (item.url.includes("/ja/")) {
          return {
            ...item,
            links: [
              { lang: "ja-JP", url: item.url },
              { lang: "en-US", url: item.url.replace("/ja/", "/en/") },
              { lang: "zh-Hant", url: item.url.replace("/ja/", "/zh-Hant/") },
            ],
          };
        } else {
          return {
            ...item,
            links: [
              { lang: "en-US", url: item.url },
              { lang: "zh-Hant", url: item.url.replace("/en/", "/zh-Hant/") },
              { lang: "ja-JP", url: item.url.replace("/en/", "/ja/") },
            ],
          };
        }
      });
    },
  },

  lastUpdated: true,
  cleanUrls: true,
});
