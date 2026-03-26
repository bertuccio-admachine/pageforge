import { PageConfig } from '../utils/defaults';

export function renderPricing(config: PageConfig): string {
  const p = config.pricing;
  if (!p || !p.items?.length) return '';

  return `
  <section class="section" id="pricing">
    <div class="container">
      <div class="section-header fade-in">
        ${p.title ? `<h2 class="section-title">${esc(p.title)}</h2>` : ''}
        ${p.subtitle ? `<p class="section-subtitle">${esc(p.subtitle)}</p>` : ''}
      </div>
      <div class="pricing-grid">
        ${p.items.map(i => `
        <div class="pricing-card fade-in${i.highlighted ? ' highlighted' : ''}">
          <div class="pricing-name">${esc(i.name)}</div>
          <div class="pricing-price">${esc(i.price)}${i.period ? `<span class="pricing-period">${esc(i.period)}</span>` : ''}</div>
          ${i.description ? `<div class="pricing-desc">${esc(i.description)}</div>` : ''}
          <ul class="pricing-features">
            ${i.features.map(f => `<li>${esc(f)}</li>`).join('\n            ')}
          </ul>
          ${i.cta ? `<a href="${esc(i.cta.url)}" class="btn ${i.highlighted ? 'btn-primary' : 'btn-secondary'}">${esc(i.cta.text)}</a>` : ''}
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
