import { PageConfig } from '../utils/defaults';

export function renderFeatures(config: PageConfig): string {
  const f = config.features;
  if (!f || !f.items?.length) return '';

  return `
  <section class="section" id="features">
    <div class="container">
      <div class="section-header fade-in">
        ${f.title ? `<h2 class="section-title">${esc(f.title)}</h2>` : ''}
        ${f.subtitle ? `<p class="section-subtitle">${esc(f.subtitle)}</p>` : ''}
      </div>
      <div class="features-grid" style="${f.columns ? `grid-template-columns: repeat(${f.columns}, 1fr)` : ''}">
        ${f.items.map(i => `
        <div class="feature-card fade-in">
          ${i.icon ? `<span class="feature-icon">${i.icon}</span>` : ''}
          <h3 class="feature-title">${esc(i.title)}</h3>
          <p class="feature-desc">${esc(i.description)}</p>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
