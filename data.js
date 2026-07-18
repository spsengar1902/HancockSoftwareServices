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
    tagline: 'Custom Software Systems & High-End Cloud Architecture',
    contactEmail: 'contact@hancockssoftware.com',
    contactPhone: '+1 (555) 019-2834',
    address: '100 Innovation Way, Suite 400, Boston, MA 02110',
    socials: {
      github: 'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter: 'https://twitter.com'
    }
  },
  hero: {
    badge: 'Enterprise Engineering',
    title: 'Transforming Vision Into High-Performance Software',
    subtitle: 'We design, build, and scale bespoke software solutions that enable industry leaders to outpace the competition. From legacy refactoring to cloud-native deployments.',
    primaryCTA: 'Get Started',
    primaryCTALink: '#contact',
    secondaryCTA: 'View Portfolio',
    secondaryCTALink: '#portfolio',
    codeSnippet: `const hancock = {\n  services: ["Cloud-Native", "AI Integrations", "Custom APIs"],\n  delivery: "Agile & Secure",\n  excellence: true\n};\n\nawait hancock.deploy("hancockssoftware.com");`
  },
  about: {
    badge: 'Our Identity',
    title: 'Who We Are',
    p1: 'At Hancock Software Services, we bridge the gap between complex technological challenges and robust business objectives. We specialize in software architecture that scales seamlessly with your enterprise.',
    p2: 'Our team comprises elite developers, cloud architects, and product designers dedicated to executing with precision. We don\'t just write code; we architect systems that secure future growth.',
    stats: [
      { number: '99%', label: 'Project Success Rate' },
      { number: '150+', label: 'Deployments' },
      { number: '12+', label: 'Industry Awards' },
      { number: '24/7', label: 'Support & Ops' }
    ]
  },
  services: [
    {
      id: 1,
      icon: 'Cpu',
      title: 'Custom Software Architecture',
      description: 'End-to-end design and construction of custom systems tailored to your unique operations, focusing on reliability, throughput, and modular maintenance.'
    },
    {
      id: 2,
      icon: 'CloudLightning',
      title: 'Cloud-Native Migrations',
      description: 'Architecting secure AWS, Azure, and Google Cloud environments. Containerization via Docker & Kubernetes with streamlined, auto-scaling CI/CD pipelines.'
    },
    {
      id: 3,
      icon: 'ShieldCheck',
      title: 'AI & Data Integration',
      description: 'Embedding large language models, predictive analysis tools, and machine learning pipelines into business operations to extract immediate ROI.'
    },
    {
      id: 4,
      icon: 'Zap',
      title: 'Dedicated Engineering Teams',
      description: 'Augment your development capabilities with our elite engineers who embed directly into your workflows, adhering to high-velocity delivery standards.'
    }
  ],
  portfolio: [
    {
      id: 1,
      title: 'Aegis Security Gateway',
      category: 'Cloud',
      description: 'Refactoring a high-load financial transaction parser to run in microservices, achieving an 80% reduction in processing overhead.',
      tags: ['Kubernetes', 'Go', 'gRPC', 'AWS']
    },
    {
      id: 2,
      title: 'NextGen Inventory Engine',
      category: 'Enterprise',
      description: 'Real-time retail inventory synchronization with AI demand forecasting for an international supply chain network.',
      tags: ['TypeScript', 'Python', 'PostgreSQL', 'FastAPI']
    },
    {
      id: 3,
      title: 'OmniChannel Portal',
      category: 'Web',
      description: 'A client-centric billing portal featuring interactive dashboards, customizable billing reports, and Stripe payment gateway.',
      tags: ['React', 'CSS Variables', 'Node.js', 'Stripe']
    }
  ],
  blogs: [
    {
      id: 1,
      date: 'July 15, 2026',
      readTime: '6 min read',
      title: 'Transitioning to Serverless: The Real Costs & Benefits',
      summary: 'Before migrating your entire database cluster to serverless functions, read our architecture review detailing hidden execution costs and cold start mitigation.',
      content: 'Serverless architectures promise infinite scale and cost-efficiency by charging only for exact compute time. However, many enterprise teams experience sticker shock after transitioning high-throughput APIs to serverless. In this post, we break down cold start optimization strategies, VPC database connection pooling limits, and cost-benefit criteria that will guide your architecture team to make the right cloud design decisions.'
    },
    {
      id: 2,
      date: 'June 28, 2026',
      readTime: '4 min read',
      title: 'Leveraging AI APIs for Domain-Specific Data Cleansing',
      summary: 'How Hancock integrated an LLM processing layer to standardize unstructured client telemetry logs with 99.8% precision.',
      content: 'Cleaning legacy data is notoriously labor-intensive. By combining traditional regex sanitizers with a semantic evaluation agent powered by modern LLMs, we built a pipeline that parses messy logs, identifies edge cases, and transforms unstructured text into valid JSON. This post details our security-first prompting technique and latency-reduction strategies for bulk API processing.'
    }
  ],
  testimonials: [
    {
      id: 1,
      quote: 'Hancock Software Services revolutionized our cloud posture. Their team redesigned our distributed messaging layer, resolving bottlenecks that had plagued our production servers for six months.',
      author: 'Marcus Vance',
      title: 'VP of Engineering, PayCor Ltd'
    },
    {
      id: 2,
      quote: 'The caliber of engineering Hancock brought to the table is unmatched. They worked alongside our core dev team, instilling best practices and executing our AWS migration on schedule.',
      author: 'Elena Rostova',
      title: 'Chief Technology Officer, LogiSync'
    }
  ]
};
