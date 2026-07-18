// Hancock Software Services - Main JS Logic and Dynamic CMS Engine

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize State
  let config = {};
  const DEFAULT_CONFIG = window.HancockConfig;

  // Load from local storage if available, else load default
  const loadConfig = () => {
    const saved = localStorage.getItem('hancock_site_config');
    if (saved) {
      try {
        config = JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved config, using defaults', e);
        config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      }
    } else {
      config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
    }
  };

  loadConfig();

  // Helper: Convert Hex to RGB channels for CSS properties
  const hexToRgb = (hex) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    hex = hex.replace(shorthandRegex, (m, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '0, 242, 254';
  };

  // 2. Apply Theme Styles dynamically
  const applyTheme = () => {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', config.theme.primaryColor);
    root.style.setProperty('--secondary-color', config.theme.secondaryColor);
    root.style.setProperty('--primary-rgb', hexToRgb(config.theme.primaryColor));
    root.style.setProperty('--secondary-rgb', hexToRgb(config.theme.secondaryColor));
    
    // Update theme-dependent styles or elements
    const logoIcon = document.querySelector('#logo-branding i');
    if (logoIcon) {
      logoIcon.style.color = config.theme.primaryColor;
    }
  };

  // 3. Render DOM Sections
  const renderAll = () => {
    applyTheme();
    renderBranding();
    renderHero();
    renderServices();
    renderAbout();
    renderPortfolio();
    renderTestimonials();
    renderBlogs();
    renderContactInfo();
    
    // Re-initialize Lucide Icons after dynamic loading
    if (window.lucide) {
      window.lucide.createIcons();
    }
  };

  const renderBranding = () => {
    document.getElementById('logo-text').textContent = config.branding.logoText || 'Hancock';
    document.title = `${config.branding.name} | ${config.branding.tagline}`;
    
    // Footer Branding
    document.getElementById('footer-branding-name').textContent = config.branding.name;
    document.getElementById('footer-tagline').textContent = config.branding.tagline;
    document.getElementById('footer-domain-display').textContent = `Domain: ${config.branding.domain}`;
    document.getElementById('footer-email-display').textContent = config.branding.contactEmail;
    document.getElementById('footer-copyright').innerHTML = `&copy; ${new Date().getFullYear()} ${config.branding.name}. All rights reserved.`;

    // Footer Social links
    const socialContainer = document.getElementById('footer-social-links');
    socialContainer.innerHTML = '';
    const socials = config.branding.socials || {};
    
    Object.keys(socials).forEach(platform => {
      if (socials[platform]) {
        const a = document.createElement('a');
        a.href = socials[platform];
        a.target = '_blank';
        a.className = 'social-link';
        a.setAttribute('aria-label', platform);
        
        let iconName = platform;
        if (platform === 'twitter') iconName = 'twitter';
        if (platform === 'github') iconName = 'github';
        if (platform === 'linkedin') iconName = 'linkedin';
        
        a.innerHTML = `<i data-lucide="${iconName}"></i>`;
        socialContainer.appendChild(a);
      }
    });
  };

  const renderHero = () => {
    const heroSec = document.getElementById('hero');
    heroSec.innerHTML = `
      <div class="container">
        <div class="hero-grid">
          <div class="hero-content">
            <span class="badge">${config.hero.badge}</span>
            <h1>${config.hero.title}</h1>
            <p>${config.hero.subtitle}</p>
            <div class="hero-buttons">
              <a href="${config.hero.primaryCTALink}" class="btn btn-primary">
                ${config.hero.primaryCTA}
                <i data-lucide="arrow-right"></i>
              </a>
              <a href="${config.hero.secondaryCTALink}" class="btn btn-secondary">
                ${config.hero.secondaryCTA}
              </a>
            </div>
          </div>
          <div class="hero-visual">
            <div class="hero-blob"></div>
            <div class="glass-card hero-card">
              <pre><code>${escapeHtml(config.hero.codeSnippet)}</code></pre>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  const renderServices = () => {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
    
    (config.services || []).forEach(svc => {
      const card = document.createElement('div');
      card.className = 'glass-card service-card';
      card.innerHTML = `
        <div class="service-icon">
          <i data-lucide="${svc.icon || 'cpu'}"></i>
        </div>
        <h3>${svc.title}</h3>
        <p>${svc.description}</p>
      `;
      container.appendChild(card);
    });
  };

  const renderAbout = () => {
    const container = document.getElementById('about-container');
    container.innerHTML = `
      <div class="about-content">
        <span class="badge">${config.about.badge}</span>
        <h2>${config.about.title}</h2>
        <p>${config.about.p1}</p>
        <p>${config.about.p2}</p>
      </div>
      <div class="stats-grid">
        ${(config.about.stats || []).map(stat => `
          <div class="glass-card stat-card">
            <div class="stat-number">${stat.number}</div>
            <div class="stat-label">${stat.label}</div>
          </div>
        `).join('')}
      </div>
    `;
  };

  // Portfolio items state
  let currentPortfolioFilter = 'all';

  const renderPortfolio = () => {
    const container = document.getElementById('portfolio-container');
    container.innerHTML = '';
    
    const items = config.portfolio || [];
    const filtered = currentPortfolioFilter === 'all' 
      ? items 
      : items.filter(item => item.category.toLowerCase() === currentPortfolioFilter);
      
    if (filtered.length === 0) {
      container.innerHTML = `<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted);">No projects match the selected category.</div>`;
      return;
    }

    filtered.forEach((item, index) => {
      const card = document.createElement('article');
      card.className = 'glass-card portfolio-card';
      
      // We generate simple custom geometric SVG backgrounds for placeholder images to look stunning
      const svgBg = generateSvgBg(index, item.title);
      
      card.innerHTML = `
        <div class="portfolio-image">
          ${svgBg}
        </div>
        <div class="portfolio-info">
          <span class="badge" style="margin-bottom: 0.5rem; font-size: 0.7rem; padding: 0.2rem 0.5rem;">${item.category}</span>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
          <div class="portfolio-tags">
            ${(item.tags || []).map(tag => `<span class="portfolio-tag">${tag}</span>`).join('')}
          </div>
        </div>
      `;
      container.appendChild(card);
    });
  };

  // Simple procedural vector illustrations to replace plain image placeholders with premium art
  const generateSvgBg = (index, title) => {
    const colors = [
      ['#00f2fe', '#4facfe'],
      ['#ff0844', '#ffb199'],
      ['#f12711', '#f5af19'],
      ['#b12a5b', '#ff758c'],
      ['#43e97b', '#38f9d7'],
      ['#11998e', '#38ef7d']
    ];
    const palette = colors[index % colors.length];
    return `
      <svg width="100%" height="100%" viewBox="0 0 400 240" xmlns="http://www.w3.org/2000/svg" style="background: #0f121d;">
        <defs>
          <linearGradient id="grad-${index}" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${palette[0]}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${palette[1]}" stop-opacity="0.05"/>
          </linearGradient>
          <linearGradient id="grid-grad-${index}" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stop-color="${palette[0]}" stop-opacity="0.4"/>
            <stop offset="100%" stop-color="transparent" stop-opacity="0"/>
          </linearGradient>
        </defs>
        <rect width="400" height="240" fill="url(#grad-${index})"/>
        <!-- Tech grid lines -->
        <g stroke="${palette[0]}" stroke-opacity="0.1" stroke-width="1">
          <line x1="40" y1="0" x2="40" y2="240" />
          <line x1="80" y1="0" x2="80" y2="240" />
          <line x1="120" y1="0" x2="120" y2="240" />
          <line x1="160" y1="0" x2="160" y2="240" />
          <line x1="200" y1="0" x2="200" y2="240" />
          <line x1="240" y1="0" x2="240" y2="240" />
          <line x1="280" y1="0" x2="280" y2="240" />
          <line x1="320" y1="0" x2="320" y2="240" />
          <line x1="360" y1="0" x2="360" y2="240" />
          
          <line x1="0" y1="30" x2="400" y2="30" />
          <line x1="0" y1="60" x2="400" y2="60" />
          <line x1="0" y1="90" x2="400" y2="90" />
          <line x1="0" y1="120" x2="400" y2="120" />
          <line x1="0" y1="150" x2="400" y2="150" />
          <line x1="0" y1="180" x2="400" y2="180" />
          <line x1="0" y1="210" x2="400" y2="210" />
        </g>
        <!-- Floating abstract tech elements -->
        <circle cx="200" cy="120" r="50" stroke="${palette[0]}" stroke-opacity="0.25" stroke-width="1.5" fill="none"/>
        <circle cx="200" cy="120" r="70" stroke="${palette[1]}" stroke-opacity="0.15" stroke-dasharray="5,5" stroke-width="1" fill="none"/>
        <rect x="180" y="100" width="40" height="40" rx="8" stroke="${palette[0]}" stroke-opacity="0.4" stroke-width="2" fill="none"/>
        <path d="M 120 120 L 180 120" stroke="${palette[0]}" stroke-opacity="0.3" stroke-width="2"/>
        <path d="M 220 120 L 280 120" stroke="${palette[1]}" stroke-opacity="0.3" stroke-width="2"/>
        <circle cx="120" cy="120" r="4" fill="${palette[0]}"/>
        <circle cx="280" cy="120" r="4" fill="${palette[1]}"/>
        <text x="20" y="210" fill="#fff" fill-opacity="0.6" font-family="'Space Grotesk', sans-serif" font-size="14" font-weight="bold">${title.substring(0, 20)}</text>
      </svg>
    `;
  };

  // Testimonials Slider State
  let currentSlide = 0;

  const renderTestimonials = () => {
    const container = document.getElementById('testimonials-container');
    container.innerHTML = '';
    
    const items = config.testimonials || [];
    
    if (items.length === 0) {
      container.innerHTML = `<div class="testimonial-slide"><p class="testimonial-quote">No testimonials available. Add some in the customizer!</p></div>`;
      return;
    }

    items.forEach(testi => {
      const initials = testi.author ? testi.author.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'C';
      const slide = document.createElement('div');
      slide.className = 'testimonial-slide';
      slide.innerHTML = `
        <p class="testimonial-quote">"${testi.quote}"</p>
        <div class="testimonial-author">
          <div class="testimonial-avatar">${initials}</div>
          <span class="testimonial-name">${testi.author}</span>
          <span class="testimonial-title">${testi.title}</span>
        </div>
      `;
      container.appendChild(slide);
    });

    currentSlide = 0;
    updateSliderPosition();
  };

  const updateSliderPosition = () => {
    const track = document.getElementById('testimonials-container');
    if (track) {
      track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
  };

  // Bind slider controls
  document.getElementById('slider-prev').addEventListener('click', () => {
    const items = config.testimonials || [];
    if (items.length <= 1) return;
    currentSlide = (currentSlide - 1 + items.length) % items.length;
    updateSliderPosition();
  });

  document.getElementById('slider-next').addEventListener('click', () => {
    const items = config.testimonials || [];
    if (items.length <= 1) return;
    currentSlide = (currentSlide + 1) % items.length;
    updateSliderPosition();
  });

  const renderBlogs = () => {
    const container = document.getElementById('blog-container');
    container.innerHTML = '';
    
    (config.blogs || []).forEach((blog, index) => {
      const card = document.createElement('article');
      card.className = 'glass-card blog-card';
      
      const svgBg = generateSvgBg(index + 3, blog.title);
      
      card.innerHTML = `
        <div class="blog-image">
          ${svgBg}
        </div>
        <div class="blog-content">
          <div class="blog-meta">
            <span>${blog.date}</span>
            <span>${blog.readTime}</span>
          </div>
          <h3>${blog.title}</h3>
          <p>${blog.summary}</p>
          <a href="#blog" class="blog-readmore" data-blog-id="${blog.id}">
            Read Article
            <i data-lucide="arrow-right"></i>
          </a>
        </div>
      `;
      container.appendChild(card);
    });

    // Add click listeners to read full articles in a modal or view
    container.querySelectorAll('.blog-readmore').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const id = parseInt(btn.getAttribute('data-blog-id'));
        const blog = config.blogs.find(b => b.id === id);
        if (blog) {
          showBlogModal(blog);
        }
      });
    });
  };

  // Dynamic Blog Reader Modal
  const showBlogModal = (blog) => {
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.background = 'rgba(6, 7, 10, 0.9)';
    modal.style.backdropFilter = 'blur(15px)';
    modal.style.webkitBackdropFilter = 'blur(15px)';
    modal.style.zIndex = '9999';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.padding = '2rem';
    
    modal.innerHTML = `
      <div class="glass-card" style="width: 100%; max-width: 750px; max-height: 85vh; overflow-y: auto; padding: 3rem; position: relative;">
        <button id="close-blog-modal" style="position: absolute; top: 20px; right: 20px; color: var(--text-muted); font-size: 1.5rem;">
          <i data-lucide="x"></i>
        </button>
        <div class="blog-meta" style="margin-bottom: 1.5rem;">
          <span>Published on ${blog.date}</span>
          <span>&bull;</span>
          <span>${blog.readTime}</span>
        </div>
        <h2 style="font-size: 2.25rem; margin-bottom: 2rem; line-height: 1.2;">${blog.title}</h2>
        <div style="font-size: 1.1rem; color: var(--text-color); line-height: 1.8; margin-bottom: 2rem;">
          <p style="margin-bottom: 1.5rem; font-weight: 500; color: #fff;">${blog.summary}</p>
          <p>${blog.content.replace(/\n/g, '<br><br>')}</p>
        </div>
        <button class="btn btn-secondary" id="close-blog-modal-btn">Back to Insights</button>
      </div>
    `;
    
    document.body.appendChild(modal);
    if (window.lucide) window.lucide.createIcons();
    
    const closeModal = () => modal.remove();
    modal.querySelector('#close-blog-modal').addEventListener('click', closeModal);
    modal.querySelector('#close-blog-modal-btn').addEventListener('click', closeModal);
    
    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  };

  const renderContactInfo = () => {
    const container = document.getElementById('contact-info-container');
    container.innerHTML = `
      <div class="contact-item">
        <div class="contact-icon">
          <i data-lucide="mail"></i>
        </div>
        <div class="contact-details">
          <h3>Direct Communications</h3>
          <p>${config.branding.contactEmail}</p>
        </div>
      </div>
      
      <div class="contact-item">
        <div class="contact-icon">
          <i data-lucide="phone"></i>
        </div>
        <div class="contact-details">
          <h3>Corporate Office Phone</h3>
          <p>${config.branding.contactPhone}</p>
        </div>
      </div>
      
      <div class="contact-item">
        <div class="contact-icon">
          <i data-lucide="map-pin"></i>
        </div>
        <div class="contact-details">
          <h3>Engineering Headquarters</h3>
          <p>${config.branding.address}</p>
        </div>
      </div>
    `;
  };

  // Helper to escape HTML tags
  const escapeHtml = (text) => {
    const div = document.createElement('div');
    div.innerText = text;
    return div.innerHTML;
  };

  // 4. Set up header scroll effect
  const handleScroll = () => {
    const header = document.getElementById('header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);

  // 5. Portfolio Category Filter Toggles
  const filterContainer = document.getElementById('portfolio-filters-container');
  filterContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
      filterContainer.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
      e.target.classList.add('active');
      currentPortfolioFilter = e.target.getAttribute('data-filter');
      renderPortfolio();
      if (window.lucide) window.lucide.createIcons();
    }
  });

  // 6. Mobile Menu Overlay Toggle
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  let mobileMenuOpen = false;

  mobileToggle.addEventListener('click', () => {
    mobileMenuOpen = !mobileMenuOpen;
    if (mobileMenuOpen) {
      navMenu.style.display = 'block';
      navMenu.style.position = 'absolute';
      navMenu.style.top = '80px';
      navMenu.style.left = '0';
      navMenu.style.width = '100%';
      navMenu.style.background = 'rgba(10, 12, 20, 0.95)';
      navMenu.style.padding = '2rem';
      navMenu.style.borderBottom = '1px solid var(--card-border)';
      
      const ul = navMenu.querySelector('ul');
      ul.style.flexDirection = 'column';
      ul.style.gap = '1.5rem';
      
      mobileToggle.innerHTML = `<i data-lucide="x"></i>`;
    } else {
      navMenu.style.display = '';
      navMenu.style.position = '';
      navMenu.style.top = '';
      navMenu.style.left = '';
      navMenu.style.width = '';
      navMenu.style.background = '';
      navMenu.style.padding = '';
      navMenu.style.borderBottom = '';
      
      const ul = navMenu.querySelector('ul');
      ul.style.flexDirection = '';
      ul.style.gap = '';
      
      mobileToggle.innerHTML = `<i data-lucide="menu"></i>`;
    }
    if (window.lucide) window.lucide.createIcons();
  });

  // Close mobile nav on click
  navMenu.addEventListener('click', (e) => {
    if (e.target.tagName === 'A' && mobileMenuOpen) {
      mobileToggle.click();
    }
  });

  // 7. Contact Form Simulation
  const contactForm = document.getElementById('contact-form-element');
  const formStatus = document.getElementById('form-status-message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';
    
    // Simulate sending progress
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const origBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i data-lucide="loader" class="animate-spin"></i>`;
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnHtml;
      if (window.lucide) window.lucide.createIcons();
      
      // Success feedback
      formStatus.classList.add('success');
      formStatus.textContent = `Inquiry received! We will reach out to you at ${document.getElementById('contact-email').value} within 24 hours.`;
      contactForm.reset();
    }, 1500);
  });

  // 8. VISUAL CUSTOMIZER CMS CONTROLS & BINDINGS
  const customizerPanel = document.getElementById('customizer-panel');
  const customizerOpenBtn = document.getElementById('customizer-open-btn');
  const customizerCloseBtn = document.getElementById('customizer-close-btn');

  // Toggle drawer open
  customizerOpenBtn.addEventListener('click', () => {
    customizerPanel.classList.add('open');
    populateCustomizerInputs();
  });

  // Toggle drawer close
  customizerCloseBtn.addEventListener('click', () => {
    customizerPanel.classList.remove('open');
  });

  // Fill panel form fields with current memory state
  const populateCustomizerInputs = () => {
    // Colors
    document.getElementById('picker-primary').value = config.theme.primaryColor;
    document.getElementById('picker-secondary').value = config.theme.secondaryColor;
    
    // Branding
    document.getElementById('edit-brand-name').value = config.branding.name;
    document.getElementById('edit-brand-logo').value = config.branding.logoText;
    document.getElementById('edit-brand-domain').value = config.branding.domain;
    document.getElementById('edit-brand-tagline').value = config.branding.tagline;
    document.getElementById('edit-brand-email').value = config.branding.contactEmail;

    // Hero
    document.getElementById('edit-hero-badge').value = config.hero.badge;
    document.getElementById('edit-hero-title').value = config.hero.title;
    document.getElementById('edit-hero-subtitle').value = config.hero.subtitle;
    document.getElementById('edit-hero-code').value = config.hero.codeSnippet;

    // Render list sub-editors
    renderServicesListEditor();
    renderPortfolioListEditor();
    renderBlogsListEditor();
    renderTestimonialsListEditor();
  };

  // Bind real-time change events on root fields
  const bindLiveUpdate = (id, callback) => {
    document.getElementById(id).addEventListener('input', (e) => {
      callback(e.target.value);
      renderAll();
    });
  };

  // Setup real-time updates for fields
  bindLiveUpdate('picker-primary', val => config.theme.primaryColor = val);
  bindLiveUpdate('picker-secondary', val => config.theme.secondaryColor = val);
  bindLiveUpdate('edit-brand-name', val => config.branding.name = val);
  bindLiveUpdate('edit-brand-logo', val => config.branding.logoText = val);
  bindLiveUpdate('edit-brand-domain', val => config.branding.domain = val);
  bindLiveUpdate('edit-brand-tagline', val => config.branding.tagline = val);
  bindLiveUpdate('edit-brand-email', val => config.branding.contactEmail = val);
  bindLiveUpdate('edit-hero-badge', val => config.hero.badge = val);
  bindLiveUpdate('edit-hero-title', val => config.hero.title = val);
  bindLiveUpdate('edit-hero-subtitle', val => config.hero.subtitle = val);
  bindLiveUpdate('edit-hero-code', val => config.hero.codeSnippet = val);

  // --- Services Sub-Editor ---
  const renderServicesListEditor = () => {
    const listDiv = document.getElementById('customizer-services-list');
    listDiv.innerHTML = '';
    
    config.services.forEach((svc, index) => {
      const item = document.createElement('div');
      item.className = 'list-editor-item';
      item.innerHTML = `
        <div class="list-editor-item-header">
          <span class="list-editor-item-title">Service #${index + 1}: ${svc.title || 'Untitled'}</span>
          <button class="list-editor-item-delete" data-index="${index}"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input svc-edit-title" data-index="${index}" placeholder="Title" value="${svc.title || ''}">
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input svc-edit-desc" data-index="${index}" placeholder="Description" value="${svc.description || ''}">
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input svc-edit-icon" data-index="${index}" placeholder="Icon name (e.g. Cpu, Zap, Server)" value="${svc.icon || 'Cpu'}">
        </div>
      `;
      listDiv.appendChild(item);
    });

    // Bind event listeners for dynamic sub-fields
    listDiv.querySelectorAll('.svc-edit-title').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.services[idx].title = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.svc-edit-desc').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.services[idx].description = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.svc-edit-icon').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.services[idx].icon = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.list-editor-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        config.services.splice(idx, 1);
        renderAll();
        populateCustomizerInputs();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  };

  document.getElementById('btn-add-service').addEventListener('click', () => {
    config.services.push({
      id: Date.now(),
      icon: 'Cpu',
      title: 'New Enterprise Solution',
      description: 'Describe the technical engineering service details here.'
    });
    renderAll();
    populateCustomizerInputs();
  });

  // --- Portfolio Sub-Editor ---
  const renderPortfolioListEditor = () => {
    const listDiv = document.getElementById('customizer-portfolio-list');
    listDiv.innerHTML = '';
    
    config.portfolio.forEach((port, index) => {
      const item = document.createElement('div');
      item.className = 'list-editor-item';
      item.innerHTML = `
        <div class="list-editor-item-header">
          <span class="list-editor-item-title">Project #${index + 1}: ${port.title || 'Untitled'}</span>
          <button class="list-editor-item-delete" data-index="${index}"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input port-edit-title" data-index="${index}" placeholder="Title" value="${port.title || ''}">
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input port-edit-category" data-index="${index}" placeholder="Category (Cloud / Web / Enterprise)" value="${port.category || ''}">
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input port-edit-desc" data-index="${index}" placeholder="Description" value="${port.description || ''}">
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input port-edit-tags" data-index="${index}" placeholder="Tags (comma separated)" value="${(port.tags || []).join(', ')}">
        </div>
      `;
      listDiv.appendChild(item);
    });

    listDiv.querySelectorAll('.port-edit-title').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.portfolio[idx].title = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.port-edit-category').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.portfolio[idx].category = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.port-edit-desc').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.portfolio[idx].description = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.port-edit-tags').forEach(input => {
      input.addEventListener('change', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.portfolio[idx].tags = e.target.value.split(',').map(t => t.trim()).filter(t => t);
        renderAll();
      });
    });
    listDiv.querySelectorAll('.list-editor-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        config.portfolio.splice(idx, 1);
        renderAll();
        populateCustomizerInputs();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  };

  document.getElementById('btn-add-portfolio').addEventListener('click', () => {
    config.portfolio.push({
      id: Date.now(),
      title: 'New Client Platform',
      category: 'Cloud',
      description: 'A detailed summary of the engineering architecture and business results.',
      tags: ['Cloud', 'Systems']
    });
    renderAll();
    populateCustomizerInputs();
  });

  // --- Blogs Sub-Editor ---
  const renderBlogsListEditor = () => {
    const listDiv = document.getElementById('customizer-blogs-list');
    listDiv.innerHTML = '';
    
    config.blogs.forEach((blog, index) => {
      const item = document.createElement('div');
      item.className = 'list-editor-item';
      item.innerHTML = `
        <div class="list-editor-item-header">
          <span class="list-editor-item-title">Blog #${index + 1}: ${blog.title || 'Untitled'}</span>
          <button class="list-editor-item-delete" data-index="${index}"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input blog-edit-title" data-index="${index}" placeholder="Title" value="${blog.title || ''}">
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input blog-edit-summary" data-index="${index}" placeholder="Brief Summary" value="${blog.summary || ''}">
        </div>
        <div class="customizer-field">
          <textarea class="customizer-input blog-edit-content" data-index="${index}" placeholder="Full Body Text" style="height: 120px;">${blog.content || ''}</textarea>
        </div>
      `;
      listDiv.appendChild(item);
    });

    listDiv.querySelectorAll('.blog-edit-title').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.blogs[idx].title = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.blog-edit-summary').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.blogs[idx].summary = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.blog-edit-content').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.blogs[idx].content = e.target.value;
      });
    });
    listDiv.querySelectorAll('.list-editor-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        config.blogs.splice(idx, 1);
        renderAll();
        populateCustomizerInputs();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  };

  document.getElementById('btn-add-blog').addEventListener('click', () => {
    config.blogs.push({
      id: Date.now(),
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      readTime: '5 min read',
      title: 'Decentralized Microservices Best Practices',
      summary: 'An exploration of transactional boundaries in distributed API clusters.',
      content: 'Start writing your complete engineering deep dive article content here. Keep it technically engaging and structure it for senior architects.'
    });
    renderAll();
    populateCustomizerInputs();
  });

  // --- Testimonials Sub-Editor ---
  const renderTestimonialsListEditor = () => {
    const listDiv = document.getElementById('customizer-testimonials-list');
    listDiv.innerHTML = '';
    
    config.testimonials.forEach((testi, index) => {
      const item = document.createElement('div');
      item.className = 'list-editor-item';
      item.innerHTML = `
        <div class="list-editor-item-header">
          <span class="list-editor-item-title">Testimonial #${index + 1}: ${testi.author || 'Untitled'}</span>
          <button class="list-editor-item-delete" data-index="${index}"><i data-lucide="trash-2"></i></button>
        </div>
        <div class="customizer-field">
          <textarea class="customizer-input testi-edit-quote" data-index="${index}" placeholder="Quote" style="height: 60px;">${testi.quote || ''}</textarea>
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input testi-edit-author" data-index="${index}" placeholder="Author Name" value="${testi.author || ''}">
        </div>
        <div class="customizer-field">
          <input type="text" class="customizer-input testi-edit-title" data-index="${index}" placeholder="Author Title" value="${testi.title || ''}">
        </div>
      `;
      listDiv.appendChild(item);
    });

    listDiv.querySelectorAll('.testi-edit-quote').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.testimonials[idx].quote = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.testi-edit-author').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.testimonials[idx].author = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.testi-edit-title').forEach(input => {
      input.addEventListener('input', (e) => {
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.testimonials[idx].title = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.list-editor-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        config.testimonials.splice(idx, 1);
        renderAll();
        populateCustomizerInputs();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  };

  document.getElementById('btn-add-testimonial').addEventListener('click', () => {
    config.testimonials.push({
      id: Date.now(),
      quote: 'They built exactly what we needed, on budget and ahead of schedule.',
      author: 'CEO Name',
      title: 'Company Executive'
    });
    renderAll();
    populateCustomizerInputs();
  });

  // --- Footer Buttons Actions ---

  // A. Save to local storage
  document.getElementById('btn-save-local').addEventListener('click', () => {
    localStorage.setItem('hancock_site_config', JSON.stringify(config));
    alert('Site settings successfully saved in your browser cookies/local storage! These configurations will persist when you refresh the page.');
  });

  // B. Reset to defaults
  document.getElementById('btn-reset-default').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all configurations back to the factory defaults? Any unsaved edits will be discarded.')) {
      localStorage.removeItem('hancock_site_config');
      config = JSON.parse(JSON.stringify(DEFAULT_CONFIG));
      renderAll();
      populateCustomizerInputs();
    }
  });

  // C. Export data.js config file
  document.getElementById('btn-export-data').addEventListener('click', () => {
    const fileContent = `// Updated configuration database for Hancock Software Services\nwindow.HancockConfig = ${JSON.stringify(config, null, 2)};\n`;
    downloadFile(fileContent, 'data.js', 'text/javascript');
  });

  // D. Compile and download self-contained html
  document.getElementById('btn-export-html').addEventListener('click', async () => {
    try {
      // 1. Get base HTML structure (from DOM or fetch index.html)
      let htmlContent = '';
      try {
        const response = await fetch('index.html');
        htmlContent = await response.text();
      } catch (err) {
        // Fallback: clone outerHTML of document element if fetch fails
        htmlContent = document.documentElement.outerHTML;
      }

      // 2. Get Styles content (from DOM or fetch style.css)
      let cssContent = '';
      try {
        const response = await fetch('style.css');
        cssContent = await response.text();
      } catch (err) {
        // Fallback: extract CSS rule content from the active document stylesheets
        const sheets = Array.from(document.styleSheets);
        cssContent = sheets
          .filter(sheet => sheet.href && sheet.href.includes('style.css'))
          .map(sheet => {
            try {
              return Array.from(sheet.cssRules).map(rule => rule.cssText).join('\n');
            } catch (e) {
              return '';
            }
          })
          .join('\n');
      }

      // 3. Construct inline configuration tag replacement
      const inlineDataScript = `<script>\nwindow.HancockConfig = ${JSON.stringify(config, null, 2)};\n</script>`;
      
      // Replace stylesheet reference with embedded style
      htmlContent = htmlContent.replace(
        '<link rel="stylesheet" href="style.css">',
        `<style>\n${cssContent}\n</style>`
      );

      // Replace external js scripts references with inline scripts
      // Remove data.js call and insert the config
      htmlContent = htmlContent.replace(
        '<script src="data.js"></script>',
        inlineDataScript
      );

      // Fetch app.js content and inline it
      let jsContent = '';
      try {
        const response = await fetch('app.js');
        jsContent = await response.text();
      } catch (err) {
        // Fallback if app.js cannot be fetched (e.g. CORS/offline) - grab it from some custom storage or warn
        alert('Could not retrieve local app.js text. Standalone HTML compilation might be partial.');
      }

      htmlContent = htmlContent.replace(
        '<script src="app.js"></script>',
        `<script>\n${jsContent}\n</script>`
      );

      // 4. Trigger download
      downloadFile(htmlContent, 'index.html', 'text/html');

    } catch (e) {
      console.error('HTML compilation failed', e);
      alert('Failed to compile standalone HTML: ' + e.message);
    }
  });

  // Download trigger utility
  const downloadFile = (content, filename, contentType) => {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    // Clean up
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    }, 0);
  };

  // 9. Initial Build Render
  renderAll();
});
