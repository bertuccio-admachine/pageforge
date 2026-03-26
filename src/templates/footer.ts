import { PageConfig } from '../utils/defaults';

export function renderFooter(config: PageConfig): string {
  const f = config.footer;
  if (!f) return '';

  const socialIcons: Record<string, string> = {
    github: 'GitHub', twitter: 'Twitter', linkedin: 'LinkedIn',
    youtube: 'YouTube', discord: 'Discord', instagram: 'Instagram',
  };

  return `
  <footer class="footer">
    <div class="container">
      <div class="footer-grid">
        <div>
          ${f.brand ? `<div class="footer-brand">${esc(f.brand)}</div>` : ''}
          ${f.tagline ? `<div class="footer-tagline">${esc(f.tagline)}</div>` : ''}
        </div>
        ${(f.links || []).map(col => `
        <div class="footer-col">
          <div class="footer-col-title">${esc(col.title)}</div>
          ${col.items.map(i => `<a href="${esc(i.url)}">${esc(i.text)}</a>`).join('\n          ')}
        </div>`).join('')}
      </div>
      <div class="footer-bottom">
        ${f.copyright ? `<div class="footer-copyright">${esc(f.copyright)}</div>` : ''}
        ${f.social ? `
        <div class="footer-social">
          ${Object.entries(f.social).map(([k, v]) => `<a href="${esc(v)}">${socialIcons[k] || k}</a>`).join('\n          ')}
        </div>` : ''}
      </div>
    </div>
  </footer>`;
}

function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
