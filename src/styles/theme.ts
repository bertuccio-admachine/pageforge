import { PageConfig } from '../utils/defaults';

export function generateCSS(config: PageConfig): string {
  const t = config.theme;
  
  return `
/* Reset & Base */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; font-size: 16px; }
body {
  font-family: '${t.font}', system-ui, -apple-system, sans-serif;
  background: ${t.style === 'gradient' ? `linear-gradient(135deg, ${t.background} 0%, ${adjustColor(t.background, 20)} 50%, ${t.background} 100%)` : t.background};
  color: ${t.text};
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
}
a { color: ${t.accent}; text-decoration: none; transition: opacity 0.2s; }
a:hover { opacity: 0.8; }
img { max-width: 100%; height: auto; }

/* Container */
.container { max-width: 1200px; margin: 0 auto; padding: 0 24px; }

/* Section */
.section { padding: 96px 0; }
.section-header { text-align: center; margin-bottom: 64px; }
.section-title { font-size: 2.5rem; font-weight: 800; letter-spacing: -0.02em; margin-bottom: 16px; }
.section-subtitle { font-size: 1.125rem; color: ${t.muted}; max-width: 600px; margin: 0 auto; }

/* Animations */
.fade-in { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.fade-in.visible { opacity: 1; transform: translateY(0); }

/* Hero */
.hero { padding: 120px 0 96px; text-align: center; position: relative; }
.hero::before {
  content: '';
  position: absolute;
  top: -200px; left: 50%; transform: translateX(-50%);
  width: 800px; height: 800px;
  background: radial-gradient(circle, ${t.primary}22 0%, transparent 70%);
  pointer-events: none;
}
.hero-badge {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 6px 16px; border-radius: 100px;
  background: ${t.primary}15; border: 1px solid ${t.primary}30;
  color: ${t.accent}; font-size: 0.875rem; font-weight: 500;
  margin-bottom: 32px;
}
.hero-title {
  font-size: clamp(2.5rem, 6vw, 4.5rem); font-weight: 800;
  letter-spacing: -0.03em; line-height: 1.1;
  margin-bottom: 24px;
  background: linear-gradient(135deg, ${t.text} 0%, ${t.muted} 100%);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent;
  background-clip: text;
}
.hero-subtitle {
  font-size: 1.25rem; color: ${t.muted};
  max-width: 640px; margin: 0 auto 40px;
  line-height: 1.7;
}
.hero-buttons { display: flex; gap: 16px; justify-content: center; flex-wrap: wrap; }
.hero-image { margin-top: 64px; border-radius: 16px; border: 1px solid ${t.surface_border}; box-shadow: 0 32px 64px rgba(0,0,0,0.3); }

/* Buttons */
.btn {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 28px; border-radius: 12px;
  font-size: 1rem; font-weight: 600;
  cursor: pointer; border: none;
  transition: all 0.2s ease;
}
.btn-primary {
  background: ${t.primary}; color: #fff;
  box-shadow: 0 0 20px ${t.primary}40;
}
.btn-primary:hover { transform: translateY(-2px); box-shadow: 0 0 30px ${t.primary}60; opacity: 1; }
.btn-secondary {
  background: transparent; color: ${t.text};
  border: 1px solid ${t.surface_border};
}
.btn-secondary:hover { background: ${t.surface}; border-color: ${t.muted}; opacity: 1; }

/* Logos */
.logos { padding: 48px 0; border-top: 1px solid ${t.surface_border}; border-bottom: 1px solid ${t.surface_border}; }
.logos-title { text-align: center; font-size: 0.875rem; color: ${t.muted}; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 32px; }
.logos-grid { display: flex; justify-content: center; align-items: center; gap: 48px; flex-wrap: wrap; }
.logos-grid span { font-size: 1.125rem; font-weight: 600; color: ${t.muted}; opacity: 0.6; transition: opacity 0.2s; }
.logos-grid span:hover { opacity: 1; }

/* Features */
.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 24px;
}
.feature-card {
  padding: 32px;
  border-radius: 16px;
  background: ${t.surface}80;
  border: 1px solid ${t.surface_border};
  backdrop-filter: blur(12px);
  transition: all 0.3s ease;
}
.feature-card:hover {
  transform: translateY(-4px);
  border-color: ${t.primary}50;
  box-shadow: 0 12px 32px rgba(0,0,0,0.2);
}
.feature-icon { font-size: 2rem; margin-bottom: 16px; display: block; }
.feature-title { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
.feature-desc { color: ${t.muted}; line-height: 1.7; }

/* Testimonials */
.testimonials-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 24px; }
.testimonial-card {
  padding: 32px;
  border-radius: 16px;
  background: ${t.surface}80;
  border: 1px solid ${t.surface_border};
  backdrop-filter: blur(12px);
}
.testimonial-quote { font-size: 1.125rem; line-height: 1.8; margin-bottom: 24px; font-style: italic; }
.testimonial-author { display: flex; align-items: center; gap: 12px; }
.testimonial-avatar { width: 44px; height: 44px; border-radius: 50%; object-fit: cover; background: ${t.primary}30; }
.testimonial-name { font-weight: 600; }
.testimonial-role { font-size: 0.875rem; color: ${t.muted}; }

/* Pricing */
.pricing-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; max-width: 900px; margin: 0 auto; }
.pricing-card {
  padding: 40px 32px;
  border-radius: 16px;
  background: ${t.surface}80;
  border: 1px solid ${t.surface_border};
  backdrop-filter: blur(12px);
  display: flex; flex-direction: column;
  transition: all 0.3s ease;
}
.pricing-card:hover { transform: translateY(-4px); }
.pricing-card.highlighted {
  border-color: ${t.primary};
  box-shadow: 0 0 40px ${t.primary}20;
  position: relative;
}
.pricing-card.highlighted::before {
  content: 'Popular';
  position: absolute; top: -12px; left: 50%; transform: translateX(-50%);
  padding: 4px 16px; border-radius: 100px;
  background: ${t.primary}; color: #fff;
  font-size: 0.75rem; font-weight: 600; text-transform: uppercase;
}
.pricing-name { font-size: 1.25rem; font-weight: 700; margin-bottom: 8px; }
.pricing-price { font-size: 3rem; font-weight: 800; letter-spacing: -0.02em; }
.pricing-period { font-size: 1rem; color: ${t.muted}; font-weight: 400; }
.pricing-desc { color: ${t.muted}; margin: 16px 0 24px; }
.pricing-features { list-style: none; margin-bottom: 32px; flex: 1; }
.pricing-features li { padding: 8px 0; color: ${t.muted}; display: flex; align-items: center; gap: 8px; }
.pricing-features li::before { content: '✓'; color: ${t.accent}; font-weight: 700; }
.pricing-card .btn { width: 100%; justify-content: center; }

/* FAQ */
.faq-list { max-width: 720px; margin: 0 auto; }
.faq-item { border-bottom: 1px solid ${t.surface_border}; }
.faq-question {
  width: 100%; padding: 24px 0;
  background: none; border: none; color: ${t.text};
  font-size: 1.125rem; font-weight: 600;
  text-align: left; cursor: pointer;
  display: flex; justify-content: space-between; align-items: center;
  font-family: inherit;
}
.faq-question::after { content: '+'; font-size: 1.5rem; color: ${t.muted}; transition: transform 0.3s; }
.faq-item.open .faq-question::after { transform: rotate(45deg); }
.faq-answer { max-height: 0; overflow: hidden; transition: max-height 0.3s ease; }
.faq-answer p { padding: 0 0 24px; color: ${t.muted}; line-height: 1.7; }
.faq-item.open .faq-answer { max-height: 500px; }

/* CTA Section */
.cta-section {
  text-align: center;
  padding: 96px 0;
  position: relative;
}
.cta-section::before {
  content: '';
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at center, ${t.primary}10 0%, transparent 70%);
  pointer-events: none;
}

/* Footer */
.footer { padding: 64px 0 32px; border-top: 1px solid ${t.surface_border}; }
.footer-grid { display: grid; grid-template-columns: 2fr repeat(auto-fit, minmax(140px, 1fr)); gap: 48px; margin-bottom: 48px; }
.footer-brand { font-size: 1.25rem; font-weight: 800; margin-bottom: 8px; }
.footer-tagline { color: ${t.muted}; }
.footer-col-title { font-weight: 700; margin-bottom: 16px; font-size: 0.875rem; text-transform: uppercase; letter-spacing: 0.05em; }
.footer-col a { display: block; color: ${t.muted}; padding: 6px 0; font-size: 0.9375rem; }
.footer-col a:hover { color: ${t.text}; }
.footer-bottom { display: flex; justify-content: space-between; align-items: center; padding-top: 32px; border-top: 1px solid ${t.surface_border}; }
.footer-copyright { color: ${t.muted}; font-size: 0.875rem; }
.footer-social { display: flex; gap: 16px; }
.footer-social a { color: ${t.muted}; font-size: 0.875rem; }

/* Responsive */
@media (max-width: 768px) {
  .section { padding: 64px 0; }
  .section-title { font-size: 2rem; }
  .hero { padding: 80px 0 64px; }
  .hero-buttons { flex-direction: column; align-items: center; }
  .features-grid { grid-template-columns: 1fr; }
  .testimonials-grid { grid-template-columns: 1fr; }
  .pricing-grid { grid-template-columns: 1fr; max-width: 400px; }
  .footer-grid { grid-template-columns: 1fr 1fr; }
  .footer-bottom { flex-direction: column; gap: 16px; text-align: center; }
}
`;
}

function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 0xff) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amount));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}
