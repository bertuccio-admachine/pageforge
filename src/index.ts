#!/usr/bin/env node

import { Command } from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import { build } from './builder';

const program = new Command();

program
  .name('pageforge')
  .description('Generate beautiful landing pages from YAML config files')
  .version('1.0.0');

program
  .command('build <config>')
  .description('Build a landing page from a YAML config file')
  .option('-o, --out <dir>', 'Output directory', 'dist')
  .action((configPath: string, opts: { out: string }) => {
    try {
      const resolved = path.resolve(configPath);
      if (!fs.existsSync(resolved)) {
        console.error(`❌ Config file not found: ${configPath}`);
        process.exit(1);
      }
      const outPath = build(resolved, opts.out);
      console.log(`✅ Landing page built → ${outPath}`);
      const stats = fs.statSync(outPath);
      console.log(`📦 Size: ${(stats.size / 1024).toFixed(1)}KB (single file, zero dependencies)`);
    } catch (err: any) {
      console.error(`❌ Build failed: ${err.message}`);
      process.exit(1);
    }
  });

program
  .command('init')
  .description('Create an example YAML config file')
  .option('-f, --file <name>', 'Output filename', 'landing.yaml')
  .action((opts: { file: string }) => {
    const example = getExampleConfig();
    fs.writeFileSync(opts.file, example, 'utf8');
    console.log(`✅ Created ${opts.file}`);
    console.log(`\nNext steps:`);
    console.log(`  1. Edit ${opts.file} with your content`);
    console.log(`  2. Run: pageforge build ${opts.file}`);
    console.log(`  3. Open dist/index.html in your browser`);
  });

program
  .command('preview <config>')
  .description('Build and open the landing page in your browser')
  .option('-o, --out <dir>', 'Output directory', 'dist')
  .action(async (configPath: string, opts: { out: string }) => {
    try {
      const resolved = path.resolve(configPath);
      if (!fs.existsSync(resolved)) {
        console.error(`❌ Config file not found: ${configPath}`);
        process.exit(1);
      }
      const outPath = build(resolved, opts.out);
      console.log(`✅ Landing page built → ${outPath}`);
      const open = (await import('open')).default;
      await open(path.resolve(outPath));
      console.log(`🌐 Opened in browser`);
    } catch (err: any) {
      console.error(`❌ Preview failed: ${err.message}`);
      process.exit(1);
    }
  });

program.parse();

function getExampleConfig(): string {
  return `# Pageforge Landing Page Config
# Edit this file and run: pageforge build landing.yaml

meta:
  title: "Acme — Ship Faster"
  description: "The developer platform that gets out of your way."
  favicon: "🚀"

theme:
  primary: "#6366f1"
  background: "#0f172a"
  text: "#e2e8f0"
  accent: "#22d3ee"
  font: "Inter"
  style: "dark"

hero:
  badge: "Now in public beta"
  title: "Ship products, not boilerplate"
  subtitle: "Acme gives you the building blocks to launch fast. APIs, components, and infrastructure — all in one place."
  cta:
    text: "Start Building"
    url: "#pricing"
  secondary_cta:
    text: "See Features"
    url: "#features"

logos:
  title: "Trusted by teams at"
  items:
    - name: "Vercel"
    - name: "Stripe"
    - name: "Linear"
    - name: "Notion"
    - name: "Figma"

features:
  title: "Everything you need to ship"
  subtitle: "Stop gluing tools together. Start building your product."
  columns: 3
  items:
    - icon: "⚡"
      title: "Instant Deploy"
      description: "Push to git, see it live. Zero config deployments with global edge distribution."
    - icon: "🔒"
      title: "Auth Built In"
      description: "Social login, magic links, and API keys. Authentication that just works."
    - icon: "📊"
      title: "Real-time Analytics"
      description: "Know what's happening. Page views, events, funnels — no third-party scripts."
    - icon: "🔌"
      title: "API First"
      description: "Every feature is an API. Build integrations, automate workflows, extend everything."
    - icon: "🎨"
      title: "Component Library"
      description: "50+ production-ready components. Dark mode, responsive, accessible by default."
    - icon: "🌍"
      title: "Edge Functions"
      description: "Run code at the edge. Sub-10ms response times worldwide."

testimonials:
  title: "Loved by developers"
  items:
    - quote: "We cut our launch timeline from 3 months to 2 weeks. Acme handles the boring stuff so we can focus on what matters."
      author: "Sarah Chen"
      role: "CTO, Startup Co"
    - quote: "The DX is unreal. It feels like the platform was designed by people who actually build products."
      author: "Marcus Johnson"
      role: "Senior Engineer, BigCorp"
    - quote: "Switched from our custom setup and never looked back. The auth alone saved us weeks."
      author: "Priya Patel"
      role: "Founder, IndieHacker"

pricing:
  title: "Simple, transparent pricing"
  subtitle: "No surprises. No hidden fees. Cancel anytime."
  items:
    - name: "Hobby"
      price: "$0"
      period: "/month"
      description: "Perfect for side projects"
      features:
        - "3 projects"
        - "10K API calls/month"
        - "Community support"
        - "Basic analytics"
      cta:
        text: "Start Free"
        url: "#"
    - name: "Pro"
      price: "$29"
      period: "/month"
      description: "For serious builders"
      features:
        - "Unlimited projects"
        - "1M API calls/month"
        - "Priority support"
        - "Advanced analytics"
        - "Custom domains"
        - "Team collaboration"
      cta:
        text: "Start Trial"
        url: "#"
      highlighted: true
    - name: "Enterprise"
      price: "Custom"
      description: "For large teams"
      features:
        - "Everything in Pro"
        - "Unlimited API calls"
        - "SSO & SAML"
        - "SLA guarantee"
        - "Dedicated support"
        - "Custom integrations"
      cta:
        text: "Contact Sales"
        url: "#"

faq:
  title: "Frequently asked questions"
  items:
    - question: "How quickly can I get started?"
      answer: "Most developers have their first project live within 15 minutes. Our quickstart guide walks you through everything."
    - question: "Can I use my own domain?"
      answer: "Absolutely. Custom domains are supported on all plans. SSL certificates are provisioned automatically."
    - question: "What happens if I exceed my API limits?"
      answer: "We'll notify you before you hit your limit. You can upgrade anytime, and we never cut you off without warning."
    - question: "Is there a free trial for Pro?"
      answer: "Yes! Pro comes with a 14-day free trial. No credit card required."

cta:
  title: "Ready to ship faster?"
  subtitle: "Join thousands of developers building with Acme."
  button:
    text: "Get Started — It's Free"
    url: "#"

footer:
  brand: "Acme"
  tagline: "The developer platform that ships."
  links:
    - title: "Product"
      items:
        - text: "Features"
          url: "#features"
        - text: "Pricing"
          url: "#pricing"
        - text: "Changelog"
          url: "#"
        - text: "Docs"
          url: "#"
    - title: "Company"
      items:
        - text: "About"
          url: "#"
        - text: "Blog"
          url: "#"
        - text: "Careers"
          url: "#"
    - title: "Legal"
      items:
        - text: "Privacy"
          url: "#"
        - text: "Terms"
          url: "#"
  social:
    github: "https://github.com"
    twitter: "https://twitter.com"
    discord: "https://discord.gg"
  copyright: "© 2026 Acme Inc. All rights reserved."
`;
}
