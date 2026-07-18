// Default configuration database for Hancock Software Services
// This structure is parsed dynamically to build the DOM, and can be edited and exported in real-time.

window.HancockConfig = {
  theme: {
    primaryColor: '#00f2fe',
    secondaryColor: '#4facfe',
    darkMode: true
  },
  branding: {
    name: 'Hancock Software Services',
    logoText: 'Hancock',
    domain: 'hancockssoftware.com',
    tagline: 'Enterprise Software QA Consultancy & Performance Digital Marketing',
    contactEmail: '',
    contactPhone: '',
    address: '',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  hero: {
    badge: 'QA & Digital Marketing Excellence',
    title: 'Ensuring Software Flawlessness & Driving Market Growth',
    subtitle: 'We specialize in elite Software Quality Assurance consultancy to ensure bulletproof systems, combined with data-driven Digital Marketing engines to scale your user acquisition.',
    primaryCTA: 'Get Started',
    primaryCTALink: '#contact',
    secondaryCTA: 'View Case Studies',
    secondaryCTALink: '#portfolio',
    codeSnippet: `const hancock = {\n  expertise: ["Software QA", "Automation Frameworks", "Digital Marketing"],\n  value: "Flawless Delivery & Bulletproof Growth",\n  contact: "contact@hancockssoftware.com"\n};\n\nawait hancock.maximizeROI("github.io");`
  },
  about: {
    badge: 'Core Strategy',
    title: 'Who We Are',
    p1: 'Hancock Software Services is a dual-focus agency. We recognize that top-tier companies need two things to dominate: software that works perfectly every single time, and a marketing engine that keeps high-intent leads flowing.',
    p2: 'We combine world-class Software QA consultancy (manual exploratory testing, full-suite automated regression, load testing) with performance Digital Marketing (technical SEO, PPC search campaigns, funnel design, and analytics) to offer comprehensive risk mitigation and growth engineering.',
    stats: [
      { number: '0', label: 'Critical Bugs in Prod' },
      { number: '3.4x', label: 'Average Client ROI Boost' },
      { number: '200+', label: 'Automation Test Suites Built' },
      { number: '24/7', label: 'Continuous Delivery Gating' }
    ]
  },
  services: [
    {
      id: 1,
      icon: 'ShieldCheck',
      title: 'Next-Gen AI-Driven QA & Test Automation',
      description: 'Establish absolute software reliability using AI-augmented Quality Assurance. We design self-healing Test Automation Frameworks using Playwright, Cypress, and Selenium, integrating LLM-based autonomous test generation that adapts scripts to UI changes in real-time. Our QA pipelines implement computer vision for automated visual regression, predictive ML models to map test coverage to high-risk code commits, API security fuzzing, and extreme load/soak testing using K6 and JMeter, guaranteeing zero-regression software delivery.'
    },
    {
      id: 2,
      icon: 'TrendingUp',
      title: 'AI-Powered Digital Marketing & Growth Engines',
      description: 'Scale your user acquisition funnel using predictive analytics and machine learning. We engineer data-driven growth machines integrating technical SEO driven by semantic NLP algorithms to dominate search landscapes, deploy AI-copilot PPC ad optimization models across Google and LinkedIn Ads, and design programmatic A/B testing frameworks using multi-armed bandit traffic allocation. Backed by GA4, Mixpanel, and machine-learning attribution models, we map the entire user journey to deliver maximum pipeline ROI.'
    }
  ],
  portfolio: [
    {
      id: 1,
      title: 'Fintech Core Automated QA Gating',
      category: 'Enterprise',
      description: 'Built a headless automation suite testing 800+ user flows on every merge, reducing staging-to-prod release cycle from 3 days to 15 minutes.',
      tags: ['Playwright', 'CI/CD Gating', 'API Regression', 'K6 Load Testing']
    },
    {
      id: 2,
      title: 'SaaS Acquisition Marketing Engine',
      category: 'Web',
      description: 'Overhauled a B2B SaaS platform SEO keyword strategy and conversion funnel, resulting in a 180% increase in demo signups in 90 days.',
      tags: ['Technical SEO', 'CRO', 'Google Ads', 'GA4 Analytics']
    }
  ],
  blogs: [
    {
      id: 1,
      date: 'July 18, 2026',
      readTime: '8 min read',
      title: 'Building Bulletproof CI/CD Gating: A Blueprint for QA Teams',
      summary: 'How to set up automated verification tests that run on pull requests without blocking developer workflows or creating flaky failures.',
      content: 'Continuous Integration is only as strong as your gating mechanism. Running a heavy automation suite on every single commit can lead to slow build pipelines and developer frustration due to flaky tests. In this architectural guide, we discuss splitting test suites into smoke, regression, and end-to-end integration tiers. We explain setup strategies in GitHub Actions, handling database state resets, and setting failure threshold controls to achieve high-confidence releases.'
    },
    {
      id: 2,
      date: 'June 30, 2026',
      readTime: '6 min read',
      title: 'Cracking B2B Acquisition: The SEO Topic Cluster Strategy',
      summary: 'Why traditional keyword stuffing is obsolete, and how grouping structured pages around core expertise topics drives high-intent leads.',
      content: 'Modern search algorithms prioritize semantic authority over simple keyword density. To rank for high-value transactional search queries, businesses must construct topical hubs. In this digital marketing deep dive, we detail the step-by-step process of auditing your core offerings, identifying pillar topics, writing detailed cluster articles, and establishing a robust internal linking structure that signals domain expertise to Google.'
    }
  ],
  testimonials: []
};
