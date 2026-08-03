// Default configuration database for Hancocks Software Services
// This structure is parsed dynamically to build the DOM, and can be edited and exported in real-time.

window.HancocksConfig = {
  theme: {
    primaryColor: '#3cb371',
    secondaryColor: '#8fbc8f',
    darkMode: true
  },
  branding: {
    name: 'Hancocks Software Services',
    logoText: 'HSS',
    domain: 'hancockssoftware.com',
    tagline: 'Digital Growth Marketing & AI/ML Software Quality Assurance',
    contactEmail: 'marketing@hancockssoftware.com',
    contactPhone: '',
    address: '',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://www.linkedin.com/company/hancocks-software-services',
      x: 'https://x.com'
    }
  },
  home: {
    badge: 'Digital Growth Marketing & AI/ML Quality Assurance',
    title: 'Scale Traffic. <span>Secure AI & Code.</span>',
    subtitle: 'Hancocks Software Services operates two distinct, specialized divisions: a Digital Growth Marketing team driving targeted user acquisition, and a Software QA team engineering robust test automation and AI/ML model validation.',
    primaryCTA: 'Explore Our Services',
    primaryCTALink: '#services',
    secondaryCTA: 'Get in Touch',
    secondaryCTALink: '#contact',
    codeSnippet: `const hancocks = {\n  marketing: ["Performance Campaigns", "App Installs", "Brand Promotions"],\n  quality: ["Intelligent Automation", "Digital Assurance", "CI/CD Gating"],\n  guarantee: "Zero-defect releases and maximum growth ROI"\n};\n\nawait Promise.all([\n  hancocks.launchCampaigns(),\n  hancocks.runAutomation()\n]);`
  },
  about: {
    badge: 'Who We Are',
    title: 'Expert Digital Growth Marketing & Specialized Software QA Services',
    p1: 'Hancocks Software Services is an elite technology consulting firm operating two independent, specialized business units. Our Digital Marketing division specializes in performance-driven user acquisition and CPC/CPA campaign scale. Our Software Quality Assurance (QA) division specializes in automated testing frameworks, CI/CD gating, and specialized validation for AI/ML and LLM applications.',
    p2: 'Both divisions operate autonomously with dedicated expert teams. The Growth Marketing team delivers affiliate campaigns, app installs, and brand promotions to maximize ROI. Concurrently, the QA engineering team implements shift-left testing, microservices validation, accessibility compliance, and model drift audits to ensure zero-defect software releases.',
    stats: [
      { number: '10M+', label: 'Acquired Users & App Installs' },
      { number: '95%', label: 'Reduction in Staging Gating Latency' },
      { number: '100%', label: 'Test Coverage for Critical API Tiers' },
      { number: '3.8x', label: 'Average Marketing ROI Acceleration' }
    ]
  },
  services: {
    marketing: {
      title: 'Digital Marketing & Growth Campaigns',
      subtitle: 'High-performing, data-driven digital promotions and user acquisition campaigns optimized for maximum CPC/CPA ROI.',
      items: [
        {
          id: 1,
          icon: 'Users',
          title: 'Affiliate Marketing',
          description: 'Performance-based campaigns focused on quality leads, sales, and measurable actions through affiliate networks.',
          features: ['Quality Lead Acquisition', 'Sales & Conversion Tracking', 'Measurable Action Focus']
        },
        {
          id: 2,
          icon: 'Smartphone',
          title: 'App Install Campaigns',
          description: 'Mobile user acquisition campaigns designed to drive genuine installs, active engagement, and long-term conversions.',
          features: ['Genuine Mobile Installs', 'User Lifecycle Engagement', 'App Store Conversion Tuning']
        },
        {
          id: 3,
          icon: 'TrendingUp',
          title: 'Brand Promotions',
          description: 'Strategic digital promotions across online platforms designed to help brands increase visibility, trust, and market awareness.',
          features: ['Cross-Platform Campaigns', 'Visibility & Reach Expansion', 'Brand Placement Strategy']
        },
        {
          id: 4,
          icon: 'Tv',
          title: 'YouTube Promotions',
          description: 'Targeted campaigns on YouTube to improve reach, views, engagement, and audience awareness for brands and creators.',
          features: ['Video Reach & Views', 'Audience Engagement', 'Viewer Awareness Growth']
        },
        {
          id: 5,
          icon: 'Facebook',
          title: 'Facebook Promotions',
          description: 'Structured Facebook campaigns tailored for brand awareness, page growth, lead generation, traffic, and audience engagement.',
          features: ['Brand Awareness Ads', 'Lead Generation Ads', 'Traffic & Page Growth']
        },
        {
          id: 6,
          icon: 'Instagram',
          title: 'Instagram Promotions',
          description: 'Visual campaigns to boost brand presence, followers, views, and active engagement among relevant targeted audiences.',
          features: ['Audience Growth & Engagement', 'Brand Presence Enhancement', 'Visual Conversion Ads']
        },
        {
          id: 7,
          icon: 'MousePointer',
          title: 'CPC Campaigns',
          description: 'Cost-per-click traffic generation focused on getting targeted traffic and quality visitors to your website or landing pages.',
          features: ['Cost-Per-Click Optimization', 'High-Intent Visitors', 'Website Link Clicks']
        },
        {
          id: 8,
          icon: 'Eye',
          title: 'CPM Campaigns',
          description: 'Cost-per-thousand impression campaigns designed to maximize scale, reach, and brand visibility across targeted display networks.',
          features: ['Cost-Per-Thousand Impressions', 'Maximum Display Reach', 'Scalable Brand Visibility']
        },
        {
          id: 9,
          icon: 'Play',
          title: 'CPV Campaigns',
          description: 'Cost-per-view video campaigns ideal for video promotions, helping brands get views and audience attention at low cost.',
          features: ['Cost-Per-View Optimizations', 'Video Campaign Marketing', 'Audience Attention Retention']
        },
        {
          id: 10,
          icon: 'Mail',
          title: 'Lead Generation Campaigns',
          description: 'Targeted acquisition funnels focused on delivering genuine user inquiries, sign-ups, and prospective customers.',
          features: ['Authentic Inbound Enquiries', 'User Sign-Up Funnels', 'Customer Database Growth']
        },
        {
          id: 11,
          icon: 'Globe',
          title: 'Website Traffic Campaigns',
          description: 'Driving relevant, organic, and paid traffic to websites, landing pages, and special offers with a focus on conversions.',
          features: ['Relevant Traffic Delivery', 'Landing Page Click-Throughs', 'Call-to-Action Optimizations']
        }
      ]
    },
    quality: {
      title: 'Software Quality Assurance & AI/ML QA',
      subtitle: 'Rigorous validation suites, specialized AI/ML model verification, and multi-platform test automation.',
      items: [
        {
          id: 12,
          icon: 'ShieldCheck',
          title: 'Automated Testing & QA Frameworks',
          description: 'Design and deploy robust automated test suites (Playwright, Cypress, Selenium) running natively inside your CI/CD workflows.',
          features: [
            'End-to-End QA Execution',
            'Cross-Browser Consistency',
            'Visual Regression Gating'
          ]
        },
        {
          id: 13,
          icon: 'Users',
          title: 'Manual & Functional Testing',
          description: 'Rigorous exploratory and functional validation verifying user stories, design specifications, and business rules.',
          features: [
            'Exploratory User-Flow Testing',
            'Regression Functional Verifications',
            'Ad-hoc Edge Case Discovery'
          ]
        },
        {
          id: 14,
          icon: 'Cpu',
          title: 'API & Microservices Testing',
          description: 'Validation of RESTful, GraphQL, and serverless API endpoints under structural regression sweeps.',
          features: [
            'Endpoint Payload Regressions',
            'Authentication & Role Gating',
            'Schema & Response Contract Validation'
          ]
        },
        {
          id: 15,
          icon: 'Activity',
          title: 'Performance & Stress Testing',
          description: 'Load, spike, and soak testing using K6 and JMeter to evaluate latency, memory leaks, and concurrency bottlenecks.',
          features: [
            'Concurrency Load Spikes',
            'Memory Leak Diagnostic Scans',
            'SLA Latency Benchmarking'
          ]
        },
        {
          id: 16,
          icon: 'Lock',
          title: 'Security & Vulnerability Audits',
          description: 'Static and dynamic application security testing (SAST/DAST) protecting code layers from security vulnerabilities.',
          features: [
            'OWASP Top 10 Scans',
            'Credential Exposure Audits',
            'Input Validation Security Tiers'
          ]
        },
        {
          id: 17,
          icon: 'Eye',
          title: 'Accessibility Compliance (WCAG)',
          description: 'Verification of digital surfaces against WCAG 2.1 AA/AAA standards ensuring complete inclusivity for all users.',
          features: [
            'Screen Reader Compatibility',
            'Color Contrast & Navigability Checks',
            'A11y Gating Automation'
          ]
        },
        {
          id: 18,
          icon: 'GitMerge',
          title: 'CI/CD Pipeline Integration',
          description: 'Establishing native trigger execution checkpoints in DevOps pipelines for zero-touch deployment gating.',
          features: [
            'GitHub Actions & GitLab Hooks',
            'Staging Release Auto-Verification',
            'Automated Failure Alerting Channels'
          ]
        },
        {
          id: 19,
          icon: 'Zap',
          title: 'AI-Assisted Test Automation',
          description: 'Leverage AI systems for self-healing test selectors, automated script repairs, and prioritizations.',
          features: [
            'Self-Healing Test locators',
            'Automated Failure Root Cause Analysis',
            'Smart Test Suite Selector Agents'
          ]
        },
        {
          id: 20,
          icon: 'Smartphone',
          title: 'Mobile App Verification',
          description: 'Exploratory and automated quality checks across physical and virtual iOS and Android devices.',
          features: [
            'Real Device Cloud Execution',
            'OS Version Compatibility Tests',
            'Responsive Screen Gaps Check'
          ]
        },
        {
          id: 21,
          icon: 'Cloud',
          title: 'AI/ML Model QA & Bias Audits',
          description: 'Verifying machine learning data pipeline integrity, feature leakage, accuracy drift, bias metrics, and model execution latency.',
          features: [
            'Accuracy & Loss Drift Audits',
            'Feature Leakage Diagnostic Scans',
            'Bias & Fairness Metric Evaluations'
          ]
        },
        {
          id: 22,
          icon: 'Terminal',
          title: 'LLM & RAG Semantic QA',
          description: 'Validating Retrieval-Augmented Generation (RAG) semantic recall, hallucination metrics, prompt injections, and vector search QA.',
          features: [
            'Hallucination & Recall Validations',
            'Prompt Injection Security Tiers',
            'Semantic Embedding Vector Audits'
          ]
        }
      ]
    }
  },
  testimonials: []
};
