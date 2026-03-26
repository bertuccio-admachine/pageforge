export interface PageConfig {
  meta: {
    title: string;
    description: string;
    favicon?: string;
    og_image?: string;
  };
  theme: {
    primary: string;
    background: string;
    text: string;
    accent: string;
    font: string;
    style: 'dark' | 'light' | 'gradient';
    surface?: string;
    surface_border?: string;
    muted?: string;
  };
  hero?: {
    badge?: string;
    title: string;
    subtitle?: string;
    cta?: { text: string; url: string };
    secondary_cta?: { text: string; url: string };
    image?: string;
  };
  logos?: {
    title?: string;
    items: { name: string; url?: string; logo?: string }[];
  };
  features?: {
    title?: string;
    subtitle?: string;
    columns?: number;
    items: { icon?: string; title: string; description: string }[];
  };
  testimonials?: {
    title?: string;
    items: { quote: string; author: string; role?: string; avatar?: string }[];
  };
  pricing?: {
    title?: string;
    subtitle?: string;
    items: {
      name: string;
      price: string;
      period?: string;
      description?: string;
      features: string[];
      cta?: { text: string; url: string };
      highlighted?: boolean;
    }[];
  };
  faq?: {
    title?: string;
    items: { question: string; answer: string }[];
  };
  cta?: {
    title: string;
    subtitle?: string;
    button?: { text: string; url: string };
  };
  footer?: {
    brand?: string;
    tagline?: string;
    links?: { title: string; items: { text: string; url: string }[] }[];
    social?: Record<string, string>;
    copyright?: string;
  };
}

const defaultTheme = {
  primary: '#6366f1',
  background: '#0f172a',
  text: '#e2e8f0',
  accent: '#22d3ee',
  font: 'Inter',
  style: 'dark' as const,
  surface: '#1e293b',
  surface_border: '#334155',
  muted: '#94a3b8',
};

export function mergeDefaults(raw: any): PageConfig {
  const theme = { ...defaultTheme, ...(raw.theme || {}) };
  
  // Auto-derive surface colors if not set
  if (!raw.theme?.surface) {
    if (theme.style === 'light') {
      theme.surface = '#ffffff';
      theme.surface_border = '#e2e8f0';
      theme.muted = '#64748b';
      if (!raw.theme?.background) theme.background = '#f8fafc';
      if (!raw.theme?.text) theme.text = '#0f172a';
    }
  }

  return {
    meta: {
      title: 'My Product',
      description: '',
      ...raw.meta,
    },
    theme,
    hero: raw.hero,
    logos: raw.logos,
    features: raw.features,
    testimonials: raw.testimonials,
    pricing: raw.pricing,
    faq: raw.faq,
    cta: raw.cta,
    footer: raw.footer,
  };
}
