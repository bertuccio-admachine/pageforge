# 🔨 Pageforge

**Generate beautiful, production-ready landing pages from a simple YAML file.**

One command. Zero frameworks. Pure static HTML/CSS output.

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node 18+](https://img.shields.io/badge/node-18%2B-green.svg)](https://nodejs.org)

---

## Why?

Every product needs a landing page. But building one means either:

- **Using a page builder** — locked into their platform, their pricing, their bloat
- **Writing it from scratch** — hours of CSS, responsive tweaks, cross-browser testing
- **Hiring a designer** — $500+ for something you'll change next week

**Pageforge** takes a different approach: describe your page in YAML, get a beautiful, self-contained HTML file. No dependencies. No framework. No build pipeline. Just a page that looks like it cost $5K and loads in under a second.

## Quick Start

```bash
# Install
npm install -g pageforge

# Generate an example config
pageforge init

# Build your landing page
pageforge build landing.yaml

# Preview in browser
pageforge preview landing.yaml
```

That's it. Open `dist/index.html` — you have a landing page.

## What You Get

- ✨ **Linear/Vercel-quality design** out of the box
- 📱 **Mobile-responsive** — looks perfect on every screen
- 🎨 **Dark, light, and gradient themes** — one line to switch
- ⚡ **Single HTML file** — 15-25KB, no external dependencies
- 🔍 **SEO-ready** — meta tags, Open Graph, semantic HTML
- 🎭 **Scroll animations** — fade-in effects via IntersectionObserver
- 💎 **Glassmorphism cards** — modern, polished UI components
- 🔤 **Google Fonts** — any font, one config line
- 💯 **Lighthouse-ready** — clean, fast, accessible

## YAML Config

Your entire landing page is defined in one YAML file. Here's the structure:

```yaml
meta:
  title: "My Product"
  description: "The best product ever"
  favicon: "🚀"                    # Emoji favicon — no file needed
  og_image: "https://..."          # Social sharing image

theme:
  primary: "#6366f1"               # Brand color
  background: "#0f172a"            # Page background
  text: "#e2e8f0"                  # Text color
  accent: "#22d3ee"                # Accent/link color
  font: "Inter"                    # Google Font name
  style: "dark"                    # dark | light | gradient

hero:
  badge: "Now in beta"             # Optional pill badge
  title: "Your headline here"
  subtitle: "Supporting copy"
  cta:
    text: "Get Started"
    url: "#pricing"
  secondary_cta:
    text: "Learn More"
    url: "#features"
  image: "https://..."             # Optional hero image

logos:                              # Trust bar
  title: "Trusted by"
  items:
    - name: "Stripe"
    - name: "Vercel"

features:
  title: "Features"
  subtitle: "Why choose us"
  columns: 3                       # Grid columns (auto-responsive)
  items:
    - icon: "⚡"
      title: "Fast"
      description: "Really fast."

testimonials:
  title: "What people say"
  items:
    - quote: "Amazing product"
      author: "Jane Doe"
      role: "CEO, Company"
      avatar: "https://..."

pricing:
  title: "Pricing"
  subtitle: "Simple and transparent"
  items:
    - name: "Free"
      price: "$0"
      period: "/month"
      description: "For side projects"
      features: ["Feature 1", "Feature 2"]
      cta:
        text: "Start Free"
        url: "#"
    - name: "Pro"
      price: "$29"
      period: "/month"
      features: ["Everything in Free", "More stuff"]
      cta:
        text: "Go Pro"
        url: "#"
      highlighted: true            # Adds "Popular" badge + glow

faq:
  title: "FAQ"
  items:
    - question: "How does it work?"
      answer: "Write YAML, run pageforge, get a page."

cta:                                # Bottom CTA section
  title: "Ready to start?"
  subtitle: "It takes 5 minutes."
  button:
    text: "Get Started"
    url: "#"

footer:
  brand: "MyProduct"
  tagline: "Built different."
  links:
    - title: "Product"
      items:
        - text: "Features"
          url: "#features"
  social:
    github: "https://github.com/..."
    twitter: "https://twitter.com/..."
  copyright: "© 2026 MyProduct"
```

Every section is optional. Include only what you need.

## Sections

| Section | Description |
|---------|-------------|
| `meta` | Page title, description, favicon, OG tags |
| `theme` | Colors, font, style (dark/light/gradient) |
| `hero` | Main headline, subtitle, CTA buttons, optional image |
| `logos` | Trust bar with company/brand names |
| `features` | Feature grid with icons, configurable columns |
| `testimonials` | Customer quotes with avatars |
| `pricing` | Pricing cards with feature lists and CTAs |
| `faq` | Accordion-style FAQ |
| `cta` | Bottom call-to-action section |
| `footer` | Brand, link columns, social links, copyright |

## Themes

Switch between themes with one line:

```yaml
# Dark (default) — Linear/Vercel vibes
theme:
  style: "dark"
  primary: "#6366f1"

# Light — clean and minimal
theme:
  style: "light"
  primary: "#2563eb"
  background: "#ffffff"
  text: "#0f172a"

# Gradient — dramatic backgrounds
theme:
  style: "gradient"
  primary: "#8b5cf6"
```

## CLI Reference

```
pageforge build <config.yaml>     Build landing page to dist/
  -o, --out <dir>                 Output directory (default: dist)

pageforge init                    Create example landing.yaml
  -f, --file <name>              Output filename (default: landing.yaml)

pageforge preview <config.yaml>   Build and open in browser
  -o, --out <dir>                 Output directory (default: dist)
```

## Deploying

The output is a single HTML file. Deploy it anywhere:

```bash
# Netlify
netlify deploy --dir dist --prod

# Vercel
cd dist && vercel --yes

# GitHub Pages
cp dist/index.html docs/index.html && git push

# AWS S3
aws s3 cp dist/index.html s3://my-bucket/ --content-type text/html

# Or just... upload the file. It's one HTML file.
```

## Use Cases

- 🚀 **Product launches** — ship a landing page in minutes, not days
- 💡 **Side projects** — beautiful page without the overhead
- 📧 **Email campaigns** — quick landing pages for offers
- 🧪 **A/B testing** — generate variants from different YAML files
- 📝 **Event pages** — conferences, meetups, webinars
- 🏢 **Internal tools** — documentation portals, team pages

## Design Philosophy

1. **Defaults should be beautiful.** You shouldn't need to be a designer to get a great-looking page.
2. **One file in, one file out.** No build systems, no asset pipelines, no complexity.
3. **Opinionated but flexible.** The structure is fixed (hero → features → pricing → etc.) but everything within sections is configurable.
4. **Performance is a feature.** A single 20KB HTML file will always beat a 2MB React app.

## Contributing

Contributions welcome! Some ideas:

- New section types (team, changelog, integrations)
- More themes and color presets
- Template gallery
- Multi-page support
- Component variants

```bash
git clone https://github.com/bertuccio-admachine/pageforge
cd pageforge
npm install
npm run build
node dist/index.js init
node dist/index.js build landing.yaml
```

## License

MIT — use it however you want.

---

**Built by [Ad Machine](https://github.com/bertuccio-admachine)** · Landing pages should take minutes, not weeks.
