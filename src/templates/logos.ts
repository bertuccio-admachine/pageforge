import { PageConfig } from '../utils/defaults';

export function renderLogos(config: PageConfig): string {
  const l = config.logos;
  if (!l || !l.items?.length) return '';

  return `
  <section class="logos fade-in">
    <div class="container">
      ${l.title ? `<div class="logos-title">${esc(l.title)}</div>` : ''}
      <div class="logos-grid">
        ${l.items.map(i => `<span>${esc(i.name)}</span>`).join('\n        ')}
      </div>
    </div>
  </section>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
