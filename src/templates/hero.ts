import { PageConfig } from '../utils/defaults';

export function renderHero(config: PageConfig): string {
  const h = config.hero;
  if (!h) return '';

  return `
  <section class="hero">
    <div class="container">
      ${h.badge ? `<div class="hero-badge fade-in">● ${esc(h.badge)}</div>` : ''}
      <h1 class="hero-title fade-in">${esc(h.title)}</h1>
      ${h.subtitle ? `<p class="hero-subtitle fade-in">${esc(h.subtitle)}</p>` : ''}
      <div class="hero-buttons fade-in">
        ${h.cta ? `<a href="${esc(h.cta.url)}" class="btn btn-primary">${esc(h.cta.text)}</a>` : ''}
        ${h.secondary_cta ? `<a href="${esc(h.secondary_cta.url)}" class="btn btn-secondary">${esc(h.secondary_cta.text)}</a>` : ''}
      </div>
      ${h.image ? `<img src="${esc(h.image)}" alt="${esc(h.title)}" class="hero-image fade-in">` : ''}
    </div>
  </section>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
