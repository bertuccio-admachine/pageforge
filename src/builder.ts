import * as fs from 'fs';
import * as path from 'path';
import * as yaml from 'js-yaml';
import { mergeDefaults, PageConfig } from './utils/defaults';
import { generateCSS } from './styles/theme';
import { renderHero } from './templates/hero';
import { renderLogos } from './templates/logos';
import { renderFeatures } from './templates/features';
import { renderTestimonials } from './templates/testimonials';
import { renderPricing } from './templates/pricing';
import { renderFaq } from './templates/faq';
import { renderCta } from './templates/cta';
import { renderFooter } from './templates/footer';

export function build(configPath: string, outDir: string = 'dist'): string {
  const raw = yaml.load(fs.readFileSync(configPath, 'utf8')) as any;
  const config = mergeDefaults(raw);
  
  const html = generateHTML(config);
  const outPath = path.join(outDir, 'index.html');
  
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(outPath, html, 'utf8');
  
  return outPath;
}

function generateHTML(config: PageConfig): string {
  const css = generateCSS(config);
  const m = config.meta;

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${esc(m.title)}</title>
  <meta name="description" content="${esc(m.description)}">
  ${m.og_image ? `<meta property="og:image" content="${esc(m.og_image)}">` : ''}
  <meta property="og:title" content="${esc(m.title)}">
  <meta property="og:description" content="${esc(m.description)}">
  <meta name="twitter:card" content="summary_large_image">
  ${m.favicon ? `<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>${m.favicon}</text></svg>">` : ''}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=${encodeURIComponent(config.theme.font)}:wght@400;500;600;700;800&display=swap" rel="stylesheet">
  <style>${css}</style>
</head>
<body>
  ${renderHero(config)}
  ${renderLogos(config)}
  ${renderFeatures(config)}
  ${renderTestimonials(config)}
  ${renderPricing(config)}
  ${renderFaq(config)}
  ${renderCta(config)}
  ${renderFooter(config)}

  <script>
    // Intersection Observer for fade-in animations
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
  </script>
</body>
</html>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
