import { PageConfig } from '../utils/defaults';

export function renderTestimonials(config: PageConfig): string {
  const t = config.testimonials;
  if (!t || !t.items?.length) return '';

  return `
  <section class="section" id="testimonials">
    <div class="container">
      <div class="section-header fade-in">
        ${t.title ? `<h2 class="section-title">${esc(t.title)}</h2>` : ''}
      </div>
      <div class="testimonials-grid">
        ${t.items.map(i => `
        <div class="testimonial-card fade-in">
          <p class="testimonial-quote">"${esc(i.quote)}"</p>
          <div class="testimonial-author">
            ${i.avatar ? `<img src="${esc(i.avatar)}" alt="${esc(i.author)}" class="testimonial-avatar">` : `<div class="testimonial-avatar"></div>`}
            <div>
              <div class="testimonial-name">${esc(i.author)}</div>
              ${i.role ? `<div class="testimonial-role">${esc(i.role)}</div>` : ''}
            </div>
          </div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
