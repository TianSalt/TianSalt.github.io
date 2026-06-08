# 鹽語屋 (Yányǔwū)

A multilingual personal blog built with VitePress, featuring accessibility support.

## Features

- 🌍 **Multilingual Support**: Traditional Chinese, English, Japanese
- ♿ **Accessibility**: WCAG 2.1 Level AA compliant, RTL-ready
- 🎨 **Dark Mode**: Built-in theme switching
- 📱 **Responsive**: Perfect adaptation to all devices
- ⚡ **Fast**: Built on Vite for lightning-fast performance
- 🔄 **Extensible**: Ready for RTL languages (Arabic) and vertical scripts (Mongolian)

## Project Structure

```
blog/
├── .vitepress/
│   ├── config.mjs          # Main configuration
│   ├── theme/              # Custom theme
│   │   ├── index.mjs       # Theme entry
│   │   ├── custom.css      # Accessibility styles
│   │   └── LanguageSwitcher.vue
│   └── locales/            # Language-specific config
│       ├── zh.mjs          # Chinese locale
│       ├── en.mjs          # English locale
│       └── ja.mjs          # Japanese locale
├── zh-Hant/                # Traditional Chinese content
│   ├── index.md
│   ├── posts/
│   └── accessibility.md
├── en/                     # English content
│   ├── index.md
│   ├── posts/
│   └── accessibility.md
├── ja/                     # Japanese content
│   ├── index.md
│   ├── posts/
│   └── accessibility.md
├── public/                 # Static assets
│   ├── logo.svg
│   └── robots.txt
└── package.json
```

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev

# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Accessibility Features

- Keyboard navigation support
- Screen reader compatibility
- Skip to main content
- ARIA labels
- Color contrast compliance
- Reduced motion support
- Semantic HTML structure

## Deployment

This blog is automatically deployed to GitHub Pages using GitHub Actions.

Push to the `main` branch to trigger deployment.

## License

MIT