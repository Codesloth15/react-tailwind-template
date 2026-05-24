# Assets

Static files including images, icons, fonts, and other media.

## Purpose
The `assets/` folder stores all static files that are served as-is without modification.

## What to Put Here
- `images/` - Static image files (PNG, JPG, GIF, WebP)
- `icons/` - SVG icons and icon files
- `fonts/` - Custom font files (TTF, WOFF, WOFF2)
- `logo.png` - Application logo
- `favicon.ico` - Website favicon
- `videos/` - Video files (if applicable)

## Directory Structure

```
assets/
├── logo.png              # Main logo
├── favicon.ico           # Browser tab icon
├── images/
│   ├── hero.png
│   ├── banner.jpg
│   ├── background.webp
│   └── placeholder.svg
├── icons/
│   ├── home.svg
│   ├── settings.svg
│   ├── user.svg
│   ├── menu.svg
│   ├── close.svg
│   └── arrow.svg
└── fonts/
    ├── Roboto-Regular.woff2
    ├── Roboto-Bold.woff2
    └── Inter-Regular.woff2
```

## Guidelines
- Use **optimized images** (compress before adding)
- Prefer **SVG** for icons (scalable, small size)
- Use **WebP** for photos when possible
- Name files **descriptively** and in lowercase
- Organize by **file type** in subdirectories
- Keep files **under version control** but consider using Git LFS for large files

## Usage in Components

### Images
```jsx
// components/Hero.jsx
import heroImage from '@/assets/images/hero.png';

export function Hero() {
  return (
    <div>
      <img src={heroImage} alt="Hero section" />
    </div>
  );
}
```

### Icons
```jsx
// components/Navigation.jsx
import homeIcon from '@/assets/icons/home.svg';
import settingsIcon from '@/assets/icons/settings.svg';

export function Navigation() {
  return (
    <nav>
      <img src={homeIcon} alt="Home" />
      <img src={settingsIcon} alt="Settings" />
    </nav>
  );
}
```

### Fonts in CSS
```css
/* src/index.css */
@font-face {
  font-family: 'Roboto';
  src: url('/assets/fonts/Roboto-Regular.woff2') format('woff2');
  font-weight: normal;
}

@font-face {
  font-family: 'Roboto';
  src: url('/assets/fonts/Roboto-Bold.woff2') format('woff2');
  font-weight: bold;
}

body {
  font-family: 'Roboto', sans-serif;
}
```

## File Size Guidelines

| File Type | Recommended Size |
|-----------|-----------------|
| Logo | < 100KB |
| Hero Image | < 500KB |
| Icon | < 10KB |
| Font | < 100KB |

## Optimization Tips

### Images
- Use tools like TinyPNG, ImageOptim, or Squoosh
- Convert to WebP for web
- Use appropriate format (PNG for transparency, JPG for photos)
- Consider using image CDN in production

### SVG Icons
- Keep SVG clean and minimal
- Remove unnecessary attributes
- Use consistent sizing (e.g., 24x24px)
- Inline small icons for better performance

### Fonts
- Use WOFF2 format (best compression)
- Load only necessary font weights
- Use `font-display: swap` to prevent FOIT

## Example SVG Icon
```svg
<!-- assets/icons/home.svg -->
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8h5z" fill="currentColor"/>
</svg>
```
