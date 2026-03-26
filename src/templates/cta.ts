import { PageConfig } from '../utils/defaults';

export function renderCta(config: PageConfig): string {
  const c = config.cta;
  if (!c) return '';

  return `
  <section class="cta-section">
    <div class="container">
      <h2 class="section-title fade-in">${esc(c.title)}</h2>
      ${c.subtitle ? `<p class="section-subtitle fade-in" style="margin-bottom: 40px">${esc(c.subtitle)}</p>` : ''}
      ${c.button ? `<div class="fade-in"><a href="${esc(c.button.url)}" class="btn btn-primary">${esc(c.button.text)}</a></div>` : ''}
    </div>
  </section>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
