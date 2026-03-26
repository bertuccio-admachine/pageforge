import { PageConfig } from '../utils/defaults';

export function renderFaq(config: PageConfig): string {
  const f = config.faq;
  if (!f || !f.items?.length) return '';

  return `
  <section class="section" id="faq">
    <div class="container">
      <div class="section-header fade-in">
        ${f.title ? `<h2 class="section-title">${esc(f.title)}</h2>` : ''}
      </div>
      <div class="faq-list">
        ${f.items.map(i => `
        <div class="faq-item fade-in">
          <button class="faq-question" onclick="this.parentElement.classList.toggle('open')">${esc(i.question)}</button>
          <div class="faq-answer"><p>${esc(i.answer)}</p></div>
        </div>`).join('')}
      </div>
    </div>
  </section>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
