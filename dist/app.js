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
    const logoSvg = document.querySelector('#logo-branding svg');
    if (logoSvg) {
      logoSvg.style.color = config.theme.primaryColor;
    }
  };

  // 3. Render DOM Sections
  const renderAll = () => {
    applyTheme();
    renderBranding();
    renderHero();
    renderServices();
    renderAbout();
    renderTestimonials();
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
    const footerEmail = document.getElementById('footer-email-display');
    if (footerEmail) {
      if (config.branding.contactEmail) {
        footerEmail.textContent = config.branding.contactEmail;
        footerEmail.style.display = '';
      } else {
        footerEmail.style.display = 'none';
      }
    }
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
            <div class="modern-hero-card">
              <div class="window-header">
                <div class="window-buttons">
                  <span class="dot close"></span>
                  <span class="dot minimize"></span>
                  <span class="dot maximize"></span>
                </div>
                <div class="window-tabs">
                  <button class="window-tab active" id="tab-growth"><i data-lucide="trending-up"></i> Growth Metrics</button>
                  <button class="window-tab" id="tab-qa"><i data-lucide="shield-check"></i> QA Pipeline</button>
                  <button class="window-tab" id="tab-code"><i data-lucide="code"></i> config.js</button>
                </div>
              </div>
              <div class="window-body">
                <div class="tab-content" id="content-growth">
                  <div class="mock-dashboard">
                    <div class="dashboard-metric">
                      <span class="metric-label">Mobile App Installs (CPI)</span>
                      <span class="metric-value">2,841 <span class="trendup">+14.2%</span></span>
                    </div>
                    <div class="dashboard-metric">
                      <span class="metric-label">Affiliate Leads (CPA)</span>
                      <span class="metric-value">45,109 <span class="trendup">+22.4%</span></span>
                    </div>
                    <div class="dashboard-metric">
                      <span class="metric-label">Average Campaign ROI</span>
                      <span class="metric-value">385% <span class="trendup">Active</span></span>
                    </div>
                    <div class="dashboard-log">
                      <div class="log-line"><span class="log-tag tag-success">SUCCESS</span> Ingested 450 leads from YouTube campaign.</div>
                      <div class="log-line"><span class="log-tag tag-success">ACTIVE</span> Cost-per-install optimized to $0.42.</div>
                    </div>
                  </div>
                </div>
                <div class="tab-content" id="content-qa" style="display: none;">
                  <div class="mock-terminal">
                    <div class="terminal-line"><span class="term-prompt">$</span> npm run test:assurance</div>
                    <div class="terminal-line">Running 14 Test Suites (Playwright)...</div>
                    <div class="terminal-line success-line">✓ [Web] Landing Page Visual Regression Test (PASSED)</div>
                    <div class="terminal-line success-line">✓ [Mobile] Lead Form Field Validation Test (PASSED)</div>
                    <div class="terminal-line success-line">✓ [API] Lead Ingest Schema Verification (PASSED)</div>
                    <div class="terminal-line success-line">✓ [AI/ML] Embedding Semantic Search Drift Check (PASSED)</div>
                    <div class="terminal-line summary-line">Tests passed: 22 passed, 22 total. Time: 4.82s</div>
                  </div>
                </div>
                <div class="tab-content hero-tab-code" id="content-code" style="display: none;">
                  <pre><code>${escapeHtml(config.hero.codeSnippet)}</code></pre>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Bind tab switching events
    const tabGrowth = document.getElementById('tab-growth');
    const tabQa = document.getElementById('tab-qa');
    const tabCode = document.getElementById('tab-code');

    const contentGrowth = document.getElementById('content-growth');
    const contentQa = document.getElementById('content-qa');
    const contentCode = document.getElementById('content-code');

    const switchTab = (activeTab, activeContent) => {
      [tabGrowth, tabQa, tabCode].forEach(t => t.classList.remove('active'));
      [contentGrowth, contentQa, contentCode].forEach(c => c.style.display = 'none');
      
      activeTab.classList.add('active');
      activeContent.style.display = 'block';
    };

    if (tabGrowth && tabQa && tabCode) {
      tabGrowth.addEventListener('click', () => switchTab(tabGrowth, contentGrowth));
      tabQa.addEventListener('click', () => switchTab(tabQa, contentQa));
      tabCode.addEventListener('click', () => switchTab(tabCode, contentCode));
    }

    if (window.lucide) window.lucide.createIcons();
  };

  const renderServices = () => {
    const container = document.getElementById('services-container');
    container.innerHTML = '';
    
    if (!config.services) return;

    // Create side-by-side verticals container grid
    const verticalsGrid = document.createElement('div');
    verticalsGrid.className = 'services-verticals-grid';

    const verticals = ['marketing', 'quality'];

    verticals.forEach(key => {
      const vertData = config.services[key];
      if (!vertData) return;

      const col = document.createElement('div');
      col.className = `vertical-column ${key}-vertical`;

      // Render vertical header
      col.innerHTML = `
        <div class="vertical-header">
          <h3>${vertData.title}</h3>
          <p>${vertData.subtitle}</p>
        </div>
        <div class="vertical-services-list"></div>
      `;

      const listContainer = col.querySelector('.vertical-services-list');

      (vertData.items || []).forEach(item => {
        const card = document.createElement('div');
        card.className = 'vertical-card';
        card.innerHTML = `
          <h4>
            <span class="vertical-card-icon">
              <i data-lucide="${item.icon || 'cpu'}"></i>
            </span>
            ${item.title}
          </h4>
          <p>${item.description}</p>
          <ul class="vertical-features">
            ${(item.features || []).map(f => `<li>${f}</li>`).join('')}
          </ul>
        `;
        listContainer.appendChild(card);
      });

      verticalsGrid.appendChild(col);
    });

    container.appendChild(verticalsGrid);
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



  // Testimonials Slider State
  let currentSlide = 0;

  const renderTestimonials = () => {
    const container = document.getElementById('testimonials-container');
    const section = document.getElementById('testimonials');
    container.innerHTML = '';
    
    const items = config.testimonials || [];
    
    if (items.length === 0) {
      if (section) section.style.display = 'none';
      return;
    } else {
      if (section) section.style.display = '';
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



  const renderContactInfo = () => {
    const container = document.getElementById('contact-info-container');
    const contactGrid = document.querySelector('.contact-grid');
    
    const email = config.branding.contactEmail ? config.branding.contactEmail.trim() : '';
    const phone = config.branding.contactPhone ? config.branding.contactPhone.trim() : '';
    const address = config.branding.address ? config.branding.address.trim() : '';
    
    let html = '';
    
    if (email) {
      html += `
        <div class="contact-item">
          <div class="contact-icon">
            <i data-lucide="mail"></i>
          </div>
          <div class="contact-details">
            <h3>Direct Communications</h3>
            <p>${email}</p>
          </div>
        </div>
      `;
    }
    
    if (phone) {
      html += `
        <div class="contact-item">
          <div class="contact-icon">
            <i data-lucide="phone"></i>
          </div>
          <div class="contact-details">
            <h3>Corporate Office Phone</h3>
            <p>${phone}</p>
          </div>
        </div>
      `;
    }
    
    if (address) {
      html += `
        <div class="contact-item">
          <div class="contact-icon">
            <i data-lucide="map-pin"></i>
          </div>
          <div class="contact-details">
            <h3>Engineering Headquarters</h3>
            <p>${address}</p>
          </div>
        </div>
      `;
    }
    
    container.innerHTML = html;
    
    if (!email && !phone && !address) {
      container.style.display = 'none';
      if (contactGrid) {
        contactGrid.style.gridTemplateColumns = '1fr';
        contactGrid.style.maxWidth = '600px';
        contactGrid.style.margin = '0 auto';
      }
    } else {
      container.style.display = 'flex';
      if (contactGrid) {
        contactGrid.style.gridTemplateColumns = '';
        contactGrid.style.maxWidth = '';
        contactGrid.style.margin = '';
      }
    }
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

  // 7. Contact Form Submission (using FormSubmit AJAX API)
  const contactForm = document.getElementById('contact-form-element');
  const formStatus = document.getElementById('form-status-message');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    formStatus.className = 'form-status';
    formStatus.style.display = 'none';
    
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const origBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `Sending... <i data-lucide="loader" class="animate-spin"></i>`;
    if (window.lucide) window.lucide.createIcons();

    const formData = {
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      message: document.getElementById('contact-message').value
    };

    fetch("https://formsubmit.co/ajax/marketing@hancockssoftware.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnHtml;
      if (window.lucide) window.lucide.createIcons();

      if (response.ok) {
        formStatus.classList.add('success');
        formStatus.textContent = `Inquiry received! We will reach out to you at ${formData.email} within 24 hours.`;
        contactForm.reset();
      } else {
        throw new Error("Form submission failed");
      }
    })
    .catch(error => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnHtml;
      if (window.lucide) window.lucide.createIcons();

      formStatus.classList.add('error');
      formStatus.textContent = "There was an issue sending your message. Please try again later.";
      console.error(error);
    });
  });

  // 8. VISUAL CUSTOMIZER CMS CONTROLS & BINDINGS
  const customizerPanel = document.getElementById('customizer-panel');
  const customizerOpenBtn = document.getElementById('customizer-open-btn');
  const customizerCloseBtn = document.getElementById('customizer-close-btn');
  let customizerUnlocked = false;

  const tryUnlockCustomizer = () => {
    if (!customizerUnlocked) {
      const pin = prompt('Enter Developer Passcode to unlock the Site Configurator:');
      if (pin === 'HancockDev2026') {
        customizerUnlocked = true;
        // Make the floating button visible for easy subsequent access in this session
        customizerOpenBtn.style.display = 'flex';
        alert('Access granted. Site Configurator unlocked.');
      } else {
        alert('Access denied. Incorrect passcode.');
        return false;
      }
    }
    customizerPanel.classList.add('open');
    populateCustomizerInputs();
    return true;
  };

  // Keyboard shortcut (Ctrl + Shift + E) to unlock and open editor
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'e') {
      e.preventDefault();
      tryUnlockCustomizer();
    }
  });

  // Toggle drawer open (from floating button after unlocked)
  customizerOpenBtn.addEventListener('click', () => {
    tryUnlockCustomizer();
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
    
    if (!config.services) return;

    const verticals = ['marketing', 'quality'];
    
    verticals.forEach(key => {
      const vertData = config.services[key];
      if (!vertData) return;

      const sectionTitle = document.createElement('h4');
      sectionTitle.style.fontSize = '0.8rem';
      sectionTitle.style.marginTop = '1rem';
      sectionTitle.style.marginBottom = '0.5rem';
      sectionTitle.style.color = 'var(--primary-color)';
      sectionTitle.textContent = vertData.title;
      listDiv.appendChild(sectionTitle);

      (vertData.items || []).forEach((svc, index) => {
        const item = document.createElement('div');
        item.className = 'list-editor-item';
        item.innerHTML = `
          <div class="list-editor-item-header">
            <span class="list-editor-item-title">Service #${index + 1}: ${svc.title || 'Untitled'}</span>
            <button class="list-editor-item-delete" data-vertical="${key}" data-index="${index}"><i data-lucide="trash-2"></i></button>
          </div>
          <div class="customizer-field">
            <input type="text" class="customizer-input svc-edit-title" data-vertical="${key}" data-index="${index}" placeholder="Title" value="${svc.title || ''}">
          </div>
          <div class="customizer-field">
            <input type="text" class="customizer-input svc-edit-desc" data-vertical="${key}" data-index="${index}" placeholder="Description" value="${svc.description || ''}">
          </div>
          <div class="customizer-field">
            <input type="text" class="customizer-input svc-edit-icon" data-vertical="${key}" data-index="${index}" placeholder="Icon name" value="${svc.icon || 'Cpu'}">
          </div>
        `;
        listDiv.appendChild(item);
      });
    });

    // Bind event listeners for dynamic sub-fields
    listDiv.querySelectorAll('.svc-edit-title').forEach(input => {
      input.addEventListener('input', (e) => {
        const vert = e.target.getAttribute('data-vertical');
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.services[vert].items[idx].title = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.svc-edit-desc').forEach(input => {
      input.addEventListener('input', (e) => {
        const vert = e.target.getAttribute('data-vertical');
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.services[vert].items[idx].description = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.svc-edit-icon').forEach(input => {
      input.addEventListener('change', (e) => {
        const vert = e.target.getAttribute('data-vertical');
        const idx = parseInt(e.target.getAttribute('data-index'));
        config.services[vert].items[idx].icon = e.target.value;
        renderAll();
      });
    });
    listDiv.querySelectorAll('.list-editor-item-delete').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const vert = e.currentTarget.getAttribute('data-vertical');
        const idx = parseInt(e.currentTarget.getAttribute('data-index'));
        config.services[vert].items.splice(idx, 1);
        renderAll();
        populateCustomizerInputs();
      });
    });

    if (window.lucide) window.lucide.createIcons();
  };

  document.getElementById('btn-add-service').addEventListener('click', () => {
    if (!config.services) return;
    config.services.marketing.items.push({
      id: Date.now(),
      icon: 'Cpu',
      title: 'New Service Capability',
      description: 'Describe the new technical details of this capability.',
      features: ['Automated setup checks']
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
