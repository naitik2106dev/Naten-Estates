/* ==========================================================================
   NATEN ESTATES - MAIN APPLICATION LOGIC
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  App.init();
});

const App = {
  currentFilter: "all",

  init() {
    this.initHeaderScroll();
    this.initMobileMenu();
    this.renderFeaturedProperties();
    this.initHeroSearch();
    this.initFAQAccordion();
    this.initContactForm();
    this.initSellForm();

    // Initialize Router & Appointment Manager
    if (typeof Router !== "undefined") Router.init();
    if (typeof AppointmentManager !== "undefined") AppointmentManager.init();
  },

  /* ------------------------------------------------------------------------
     Sticky Header Scroll Effect
     ------------------------------------------------------------------------ */
  initHeaderScroll() {
    const header = document.querySelector(".site-header");
    window.addEventListener("scroll", () => {
      if (window.scrollY > 30) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }, { passive: true });
  },

  /* ------------------------------------------------------------------------
     Mobile Drawer Navigation
     ------------------------------------------------------------------------ */
  initMobileMenu() {
    const toggleBtn = document.getElementById("mobileToggle");
    const closeBtn = document.getElementById("mobileClose");
    const drawer = document.getElementById("mobileDrawer");
    const backdrop = document.getElementById("mobileBackdrop");

    if (toggleBtn && drawer && backdrop) {
      toggleBtn.addEventListener("click", () => {
        drawer.classList.add("active");
        backdrop.classList.add("active");
        document.body.style.overflow = "hidden";
      });

      const closeMenu = () => {
        drawer.classList.remove("active");
        backdrop.classList.remove("active");
        document.body.style.overflow = "";
      };

      if (closeBtn) closeBtn.addEventListener("click", closeMenu);
      backdrop.addEventListener("click", closeMenu);
    }
  },

  /* ------------------------------------------------------------------------
     Render Featured Properties on Homepage
     ------------------------------------------------------------------------ */
  renderFeaturedProperties(filterCategory = "all") {
    const container = document.getElementById("featuredPropertiesContainer");
    if (!container || typeof PROPERTIES_DATA === "undefined") return;

    let list = PROPERTIES_DATA;
    if (filterCategory === "Buy") {
      list = PROPERTIES_DATA.filter(p => p.purpose === "Buy");
    } else if (filterCategory === "Rent") {
      list = PROPERTIES_DATA.filter(p => p.purpose === "Rent");
    } else if (filterCategory === "Builder Floor") {
      list = PROPERTIES_DATA.filter(p => p.type === "Builder Floor");
    } else if (filterCategory === "Penthouse") {
      list = PROPERTIES_DATA.filter(p => p.type === "Penthouse");
    }

    container.innerHTML = list.map(p => this.createPropertyCardHTML(p)).join("");
    this.bindPropertyCardButtons(container);
  },

  /* ------------------------------------------------------------------------
     Create Reusable Property Card HTML
     ------------------------------------------------------------------------ */
  createPropertyCardHTML(p) {
    const isRent = p.purpose === "Rent";
    const periodText = isRent ? '<span class="property-price-period">/ month</span>' : '';
    const bhkLabel = p.bhk > 0 ? `${p.bhk} BHK` : 'Commercial';

    return `
      <article class="property-card" data-id="${p.id}">
        <div class="property-media">
          <img src="${p.thumbnail}" alt="${p.title}" loading="lazy" />
          <div class="property-badges">
            <span class="badge badge-purpose">For ${p.purpose}</span>
            <span class="badge badge-verified">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
              Verified Title
            </span>
          </div>
        </div>

        <div class="property-content">
          <div class="property-price">
            ${p.priceDisplay} ${periodText}
          </div>
          <h3 class="property-title">${p.title}</h3>
          <div class="property-location">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            <span>${p.location}</span>
          </div>

          <div class="property-specs">
            <div class="spec-item">
              <span class="spec-value">${bhkLabel}</span>
              <span class="spec-label">Configuration</span>
            </div>
            <div class="spec-item">
              <span class="spec-value">${p.baths} Baths</span>
              <span class="spec-label">Baths</span>
            </div>
            <div class="spec-item">
              <span class="spec-value">${p.superArea}</span>
              <span class="spec-label">Super Area</span>
            </div>
          </div>

          <div class="property-actions">
            <a href="#property/${p.id}" class="btn btn-outline btn-sm btn-block">
              View Details
            </a>
            <button class="btn btn-primary btn-sm btn-block btn-trigger-appointment" data-property-title="${p.title}">
              Book Visit
            </button>
          </div>
        </div>
      </article>
    `;
  },

  bindPropertyCardButtons(container) {
    container.querySelectorAll(".btn-trigger-appointment").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const title = btn.getAttribute("data-property-title");
        if (typeof AppointmentManager !== "undefined") {
          AppointmentManager.openAppointmentModal(title);
        }
      });
    });
  },

  /* ------------------------------------------------------------------------
     Hero Advanced Search Controller
     ------------------------------------------------------------------------ */
  initHeroSearch() {
    const searchForm = document.getElementById("heroSearchForm");
    const tabs = document.querySelectorAll(".hero-search-tab");
    let currentSearchPurpose = "Buy";

    tabs.forEach(tab => {
      tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        currentSearchPurpose = tab.getAttribute("data-purpose");
      });
    });

    if (searchForm) {
      searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const typeVal = document.getElementById("heroFilterType").value;
        const budgetVal = document.getElementById("heroFilterBudget").value;
        const locationVal = document.getElementById("heroFilterLocation").value;

        // Switch to corresponding page
        const targetRoute = currentSearchPurpose.toLowerCase();
        window.location.hash = `#${targetRoute}`;

        // Apply filters in catalog view
        setTimeout(() => {
          this.applyCatalogFilters(currentSearchPurpose, {
            type: typeVal,
            budget: budgetVal,
            location: locationVal
          });
        }, 150);
      });
    }

    // Home featured filter pills
    document.querySelectorAll(".home-filter-pill").forEach(pill => {
      pill.addEventListener("click", () => {
        document.querySelectorAll(".home-filter-pill").forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        const category = pill.getAttribute("data-category");
        this.renderFeaturedProperties(category);
      });
    });
  },

  /* ------------------------------------------------------------------------
     Apply Catalog Filters (Buy / Rent Pages)
     ------------------------------------------------------------------------ */
  applyCatalogFilters(purpose, filters = {}) {
    const isBuy = purpose === "Buy";
    const catalogContainerId = isBuy ? "buyPropertiesCatalog" : "rentPropertiesCatalog";
    const container = document.getElementById(catalogContainerId);
    if (!container) return;

    let filtered = PROPERTIES_DATA.filter(p => p.purpose === purpose);

    if (filters.type && filters.type !== "all") {
      filtered = filtered.filter(p => p.type.toLowerCase().includes(filters.type.toLowerCase()));
    }
    if (filters.location && filters.location !== "all") {
      filtered = filtered.filter(p => p.location.toLowerCase().includes(filters.location.toLowerCase()));
    }
    if (filters.bhk && filters.bhk !== "all") {
      const bhkNum = parseInt(filters.bhk, 10);
      if (bhkNum === 5) {
        filtered = filtered.filter(p => p.bhk >= 5);
      } else {
        filtered = filtered.filter(p => p.bhk === bhkNum);
      }
    }
    if (filters.budget && filters.budget !== "all") {
      if (filters.budget === "under-3cr") {
        filtered = filtered.filter(p => p.price < 30000000);
      } else if (filters.budget === "3cr-5cr") {
        filtered = filtered.filter(p => p.price >= 30000000 && p.price <= 50000000);
      } else if (filters.budget === "above-5cr") {
        filtered = filtered.filter(p => p.price > 50000000);
      } else if (filters.budget === "under-1lakh") {
        filtered = filtered.filter(p => p.price < 100000);
      } else if (filters.budget === "above-1lakh") {
        filtered = filtered.filter(p => p.price >= 100000);
      }
    }

    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 4rem 1rem; background: var(--color-card); border-radius: var(--radius-lg); border: 1px solid var(--color-border);">
          <h3 style="margin-bottom: 0.5rem; color: var(--color-primary);">No exact properties match your criteria</h3>
          <p style="color: var(--color-text-muted); margin-bottom: 1.5rem;">We have off-market and upcoming luxury listings in East Delhi that are not publicly displayed.</p>
          <button class="btn btn-primary btn-trigger-appointment" data-property-title="Custom East Delhi Property Requirement">
            Request Off-Market Listings
          </button>
        </div>
      `;
      this.bindPropertyCardButtons(container);
    } else {
      container.innerHTML = filtered.map(p => this.createPropertyCardHTML(p)).join("");
      this.bindPropertyCardButtons(container);
    }
  },

  /* ------------------------------------------------------------------------
     FAQ Accordion Logic
     ------------------------------------------------------------------------ */
  initFAQAccordion() {
    const faqItems = document.querySelectorAll(".faq-item");
    faqItems.forEach(item => {
      const questionBtn = item.querySelector(".faq-question");
      if (questionBtn) {
        questionBtn.addEventListener("click", () => {
          const isActive = item.classList.contains("active");

          // Close other open FAQ items
          faqItems.forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove("active");
              const ans = otherItem.querySelector(".faq-answer");
              if (ans) ans.style.maxHeight = null;
            }
          });

          // Toggle current
          if (isActive) {
            item.classList.remove("active");
            const ans = item.querySelector(".faq-answer");
            if (ans) ans.style.maxHeight = null;
          } else {
            item.classList.add("active");
            const ans = item.querySelector(".faq-answer");
            if (ans) ans.style.maxHeight = ans.scrollHeight + 32 + "px";
          }
        });
      }
    });
  },

  /* ------------------------------------------------------------------------
     Contact Page Form Handler
     ------------------------------------------------------------------------ */
  initContactForm() {
    const form = document.getElementById("generalContactForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = form.querySelector('input[name="contactName"]').value.trim();
      const phone = form.querySelector('input[name="contactPhone"]').value.trim();
      const email = form.querySelector('input[name="contactEmail"]').value.trim();
      const message = form.querySelector('textarea[name="contactMessage"]').value.trim();

      if (!name || !phone) {
        alert("Please provide both your name and a valid phone number.");
        return;
      }

      form.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem; background: var(--color-bg); border-radius: var(--radius-lg); border: 1px solid var(--color-sage-muted);">
          <div style="width: 54px; height: 54px; background: var(--color-sage-soft); color: var(--color-primary); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1.25rem;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          </div>
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-primary); margin-bottom: 0.5rem;">Message Received, ${name}</h3>
          <p style="color: var(--color-text-secondary); max-width: 440px; margin: 0 auto 1.5rem;">Our East Delhi luxury property advisors will review your requirements and call you shortly on <strong>${phone}</strong>.</p>
          <a href="https://wa.me/917011491747?text=Hello%20Naten%20Estates%2C%20I%20just%20submitted%20an%20inquiry%20via%20your%20website%20regarding%20property%20consultation." class="btn btn-whatsapp-solid">
            Message Directly on WhatsApp
          </a>
        </div>
      `;
    });
  },

  /* ------------------------------------------------------------------------
     Sell Page Valuation Form Handler
     ------------------------------------------------------------------------ */
  initSellForm() {
    const form = document.getElementById("sellPropertyForm");
    if (!form) return;

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const ownerName = form.querySelector('input[name="ownerName"]').value.trim();
      const ownerPhone = form.querySelector('input[name="ownerPhone"]').value.trim();
      const locality = form.querySelector('select[name="propertyLocality"]').value;
      const type = form.querySelector('select[name="propertyType"]').value;

      if (!ownerName || !ownerPhone) {
        alert("Please enter your name and phone number to receive your valuation report.");
        return;
      }

      form.innerHTML = `
        <div style="text-align: center; padding: 3rem 1.5rem; background: var(--color-bg); border-radius: var(--radius-lg); border: 1px solid var(--color-sage-muted);">
          <h3 style="font-family: var(--font-heading); font-size: 1.8rem; color: var(--color-primary); margin-bottom: 0.5rem;">Valuation Request Registered</h3>
          <p style="color: var(--color-text-secondary); max-width: 460px; margin: 0 auto 1.5rem;">Thank you, ${ownerName}. Our senior East Delhi valuation appraiser has initiated market comp analysis for your <strong>${type}</strong> in <strong>${locality}</strong>. We will contact you at <strong>${ownerPhone}</strong>.</p>
          <a href="https://wa.me/917011491747?text=Hello%20Naten%20Estates%2C%20I%20would%20like%20to%20list%20my%20${encodeURIComponent(type)}%20in%20${encodeURIComponent(locality)}%20for%20sale." class="btn btn-whatsapp-solid">
            Fast-Track Valuation on WhatsApp
          </a>
        </div>
      `;
    });
  }
};

/* --------------------------------------------------------------------------
   Global Render Function: Property Detail Page
   Called by Router when URL matches #property/:id
   -------------------------------------------------------------------------- */
function renderPropertyDetailPage(id) {
  const property = getPropertyById(id);
  const container = document.getElementById("propertyDetailContent");
  if (!container) return;

  if (!property) {
    container.innerHTML = `
      <div class="container" style="padding: 6rem 1rem; text-align: center;">
        <h2 style="color: var(--color-primary); margin-bottom: 1rem;">Property Not Found</h2>
        <p style="color: var(--color-text-muted); margin-bottom: 2rem;">The selected listing may have been reserved or is temporarily off-market.</p>
        <a href="#buy" class="btn btn-primary">Browse Available Properties</a>
      </div>
    `;
    return;
  }

  const isRent = property.purpose === "Rent";
  const periodText = isRent ? '<span class="detail-rate-sqft">/ month</span>' : '';
  const bhkLabel = property.bhk > 0 ? `${property.bhk} BHK` : 'Commercial Suite';

  // Build Floor plan options HTML
  const floorPlanTabsHTML = property.floorPlans.map((fp, idx) => `
    <button class="pill-btn ${idx === 0 ? 'active' : ''} floorplan-tab-btn" data-index="${idx}">
      ${fp.name}
    </button>
  `).join("");

  const currentFloorPlan = property.floorPlans[0];

  container.innerHTML = `
    <!-- Top Header & Breadcrumbs -->
    <div class="property-detail-header">
      <div class="container">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <a href="#home">Home</a>
          <span>/</span>
          <a href="#${property.purpose.toLowerCase()}">${property.purpose}</a>
          <span>/</span>
          <span style="color: var(--color-text);">${property.title}</span>
        </nav>

        <div class="property-detail-top">
          <div class="property-detail-titles">
            <div style="display: flex; gap: 8px; margin-bottom: 0.5rem; align-items: center; flex-wrap: wrap;">
              <span class="badge badge-purpose">For ${property.purpose}</span>
              <span class="badge badge-verified">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                ${property.reraStatus}
              </span>
              <span class="badge" style="background: var(--color-sage-soft); color: var(--color-primary); font-weight: var(--fw-semibold);">
                ${property.category}
              </span>
            </div>
            <h1 style="font-size: clamp(2rem, 3.5vw, 3rem); line-height: 1.15; margin-bottom: 0.4rem; color: var(--color-text);">${property.title}</h1>
            <div class="property-location" style="margin-bottom: 0; font-size: 1rem;">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
              <span>${property.location} (PIN: ${property.pincode})</span>
            </div>
          </div>

          <div class="property-detail-price-box">
            <div class="detail-price">${property.priceDisplay} ${periodText}</div>
            <div class="detail-rate-sqft">${property.ratePerSqFt}</div>
          </div>
        </div>

        <!-- High-Resolution Interactive Image Gallery -->
        <div class="gallery-container">
          <div class="gallery-main" id="mainGalleryViewer">
            <img id="detailMainImage" src="${property.gallery[0]}" alt="${property.title} - Main View" />
          </div>
          <div class="gallery-sidebar">
            <div class="gallery-thumb" data-src="${property.gallery[1] || property.gallery[0]}">
              <img src="${property.gallery[1] || property.gallery[0]}" alt="${property.title} - Interior" />
            </div>
            <div class="gallery-thumb" data-src="${property.gallery[2] || property.gallery[0]}">
              <img src="${property.gallery[2] || property.gallery[0]}" alt="${property.title} - Suite" />
              <div class="gallery-overlay-badge">+${property.gallery.length} Photos</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content & Appointment Form Layout -->
    <div class="container section">
      <div class="property-detail-layout">
        <div class="property-main-col">

          <!-- Key Specifications Strip -->
          <h3 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-primary);">Property Specifications</h3>
          <div class="quick-specs-strip">
            <div class="quick-spec-item">
              <span class="quick-spec-label">Configuration</span>
              <span class="quick-spec-val">${bhkLabel}</span>
            </div>
            <div class="quick-spec-item">
              <span class="quick-spec-label">Super Area</span>
              <span class="quick-spec-val">${property.superArea}</span>
            </div>
            <div class="quick-spec-item">
              <span class="quick-spec-label">Carpet Area</span>
              <span class="quick-spec-val">${property.carpetArea}</span>
            </div>
            <div class="quick-spec-item">
              <span class="quick-spec-label">Bathrooms</span>
              <span class="quick-spec-val">${property.baths} Luxury Baths</span>
            </div>
            <div class="quick-spec-item">
              <span class="quick-spec-label">Floor Position</span>
              <span class="quick-spec-val">${property.floor}</span>
            </div>
            <div class="quick-spec-item">
              <span class="quick-spec-label">Facing / Vastu</span>
              <span class="quick-spec-val">${property.facing}</span>
            </div>
            <div class="quick-spec-item">
              <span class="quick-spec-label">Furnishing</span>
              <span class="quick-spec-val">${property.furnishing}</span>
            </div>
            <div class="quick-spec-item">
              <span class="quick-spec-label">Parking</span>
              <span class="quick-spec-val">${property.parking}</span>
            </div>
          </div>

          <!-- Description -->
          <div style="margin-bottom: 3rem;">
            <h3 style="font-size: 1.6rem; margin-bottom: 1rem; color: var(--color-primary);">About This Residence</h3>
            <p style="font-size: 1.05rem; line-height: 1.8; color: var(--color-text-secondary); margin-bottom: 1.25rem;">
              ${property.description}
            </p>
          </div>

          <!-- Amenities & Luxury Features -->
          <div style="margin-bottom: 3rem;">
            <h3 style="font-size: 1.6rem; margin-bottom: 0.5rem; color: var(--color-primary);">Curated Amenities & Highlights</h3>
            <p style="color: var(--color-text-muted); font-size: 0.95rem; margin-bottom: 1.25rem;">Every architectural detail has been selected for effortless modern living.</p>
            <div class="amenities-grid">
              ${property.features.map(f => `
                <div class="amenity-card">
                  <svg class="amenity-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                    <polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span>${f}</span>
                </div>
              `).join("")}
            </div>
          </div>

          <!-- Interactive Floor Plan Section -->
          <div class="floor-plan-card">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 1rem; margin-bottom: 1.25rem;">
              <div>
                <h3 style="font-size: 1.6rem; color: var(--color-primary); margin-bottom: 4px;">Architectural Floor Plan</h3>
                <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 0;">Verified layout diagram with room zoning and circulation.</p>
              </div>
              <div class="floor-plan-tabs" style="margin-bottom: 0; border: none; padding: 0;">
                ${floorPlanTabsHTML}
              </div>
            </div>

            <div class="floor-plan-stage" id="floorPlanStage">
              <div class="floor-plan-svg-wrap">
                <svg viewBox="0 0 600 360" width="100%" height="auto" style="border-radius: 8px; background: #FAF7F2; box-shadow: inset 0 0 0 1px #E5DED2;">
                  <!-- Architectural Blueprint Lines & Rooms -->
                  <rect x="20" y="20" width="560" height="320" fill="#FFFFFF" stroke="#4E735F" stroke-width="3" rx="4"/>
                  
                  <!-- Living & Dining -->
                  <rect x="30" y="30" width="310" height="170" fill="#F4EFE6" stroke="#4E735F" stroke-width="1.5"/>
                  <text x="185" y="115" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600" fill="#1C3829" text-anchor="middle">LIVING & DINING SALON</text>
                  <text x="185" y="135" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#747E76" text-anchor="middle">24'0" x 16'6"</text>

                  <!-- Master Suite -->
                  <rect x="350" y="30" width="220" height="180" fill="#EAF0EC" stroke="#4E735F" stroke-width="1.5"/>
                  <text x="460" y="115" font-family="Plus Jakarta Sans, sans-serif" font-size="14" font-weight="600" fill="#1C3829" text-anchor="middle">MASTER SUITE</text>
                  <text x="460" y="135" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#747E76" text-anchor="middle">18'0" x 14'0" + Walk-in</text>

                  <!-- Kitchen & Utility -->
                  <rect x="30" y="210" width="160" height="120" fill="#FAF7F2" stroke="#4E735F" stroke-width="1.5"/>
                  <text x="110" y="270" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600" fill="#1C3829" text-anchor="middle">MODULAR KITCHEN</text>
                  <text x="110" y="288" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#747E76" text-anchor="middle">12'6" x 10'0"</text>

                  <!-- Bedroom 2 -->
                  <rect x="200" y="210" width="180" height="120" fill="#FAF7F2" stroke="#4E735F" stroke-width="1.5"/>
                  <text x="290" y="270" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600" fill="#1C3829" text-anchor="middle">BEDROOM 2</text>
                  <text x="290" y="288" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#747E76" text-anchor="middle">14'0" x 12'0"</text>

                  <!-- Private Balcony -->
                  <rect x="390" y="220" width="180" height="110" fill="#DFEBE3" stroke="#4E735F" stroke-width="1.5" stroke-dasharray="4"/>
                  <text x="480" y="275" font-family="Plus Jakarta Sans, sans-serif" font-size="13" font-weight="600" fill="#2E6B48" text-anchor="middle">EXPANSIVE BALCONY</text>
                  <text x="480" y="293" font-family="Plus Jakarta Sans, sans-serif" font-size="11" fill="#747E76" text-anchor="middle">Wide Garden Deck</text>
                </svg>
              </div>
              <div id="floorPlanDescText" style="margin-top: 1.25rem; text-align: center; font-size: 0.95rem; color: var(--color-text-secondary); max-width: 520px;">
                <strong>${currentFloorPlan.name} (${currentFloorPlan.area})</strong>: ${currentFloorPlan.description}
              </div>
            </div>
          </div>

          <!-- Location & East Delhi Neighborhood Proximity -->
          <div class="location-map-card">
            <h3 style="font-size: 1.6rem; color: var(--color-primary); margin-bottom: 4px;">Prime Location & Connectivity</h3>
            <p style="font-size: 0.9rem; color: var(--color-text-muted); margin-bottom: 1.5rem;">
              Located in ${property.location}. Seamless access to Central Delhi, Noida via DND, and top healthcare hubs.
            </p>

            <div class="map-placeholder-box">
              <svg viewBox="0 0 800 280" width="100%" height="100%" preserveAspectRatio="none" style="position: absolute; inset: 0;">
                <rect width="800" height="280" fill="#E8F1EC"/>
                <!-- Stylized Road grid -->
                <path d="M0 60 Q 200 80 400 60 T 800 90" stroke="#FFFFFF" stroke-width="14" fill="none"/>
                <path d="M0 160 Q 300 140 500 170 T 800 150" stroke="#FFFFFF" stroke-width="18" fill="none"/>
                <path d="M220 0 L 260 280" stroke="#FFFFFF" stroke-width="12" fill="none"/>
                <path d="M520 0 L 500 280" stroke="#FFFFFF" stroke-width="12" fill="none"/>
                <!-- Green Parks -->
                <rect x="60" y="80" width="120" height="60" rx="8" fill="#D3E4DA"/>
                <rect x="580" y="40" width="160" height="90" rx="12" fill="#D3E4DA"/>
              </svg>
              
              <!-- Map Center Marker -->
              <div style="position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; background: rgba(255,255,255,0.96); padding: 12px 20px; border-radius: var(--radius-md); box-shadow: var(--shadow-md); border: 1px solid var(--color-sage-muted);">
                <div style="display: flex; align-items: center; gap: 8px; color: var(--color-primary); font-weight: var(--fw-bold); font-size: 1.05rem;">
                  <span style="display: inline-block; width: 12px; height: 12px; border-radius: 50%; background: #25D366; box-shadow: 0 0 0 4px rgba(37,211,102,0.25);"></span>
                  ${property.title}
                </div>
                <div style="font-size: 0.82rem; color: var(--color-text-muted); margin-top: 2px;">
                  ${property.location} • East Delhi 110092
                </div>
              </div>
            </div>

            <!-- Proximity Landmarks -->
            <div class="landmarks-grid">
              ${property.landmarks.map(l => `
                <div class="landmark-item">
                  <span>${l.name}</span>
                  <span class="landmark-distance">${l.distance}</span>
                </div>
              `).join("")}
            </div>
          </div>
        </div>

        <!-- Sticky Lead / Appointment Booking Sidebar -->
        <aside class="detail-appointment-sidebar">
          <h3 class="sidebar-form-title">Book a Private Viewing</h3>
          <p class="sidebar-form-subtitle">Schedule an escorted tour of this residence with our East Delhi property director.</p>

          <form id="propertyDetailBookingForm" class="appointment-form" novalidate>
            <!-- Full Name -->
            <div class="form-group">
              <label class="form-label">Full Name <span class="required">*</span></label>
              <input type="text" name="fullName" class="form-control" placeholder="e.g. Rajesh Malhotra" required />
              <div class="form-error-msg error-fullName">Please enter your full name.</div>
            </div>

            <!-- Phone Number -->
            <div class="form-group">
              <label class="form-label">Phone Number <span class="required">*</span></label>
              <input type="tel" name="phone" class="form-control" placeholder="10-digit Mobile (e.g. 7011491747)" required />
              <div class="form-error-msg error-phone">Please enter a valid 10-digit mobile number.</div>
            </div>

            <!-- Pre-selected Property Interest -->
            <div class="form-group">
              <label class="form-label">Property Interest</label>
              <select name="propertyInterest" class="form-control" required>
                <option value="${property.title} (${property.location})" selected>${property.title} - ${property.priceDisplay}</option>
              </select>
              <div class="form-error-msg error-property">Please select a property.</div>
            </div>

            <!-- Preferred Date & Time -->
            <div class="form-group">
              <label class="form-label">Preferred Date & Slot <span class="required">*</span></label>
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px;">
                <input type="date" name="preferredDate" class="form-control" min="${new Date().toISOString().split('T')[0]}" required />
                <select name="timeSlot" class="form-control" required>
                  <option value="" disabled selected>Select Slot</option>
                  <option value="Morning 10:00 AM - 1:00 PM">Morning (10AM - 1PM)</option>
                  <option value="Afternoon 2:00 PM - 5:00 PM">Afternoon (2PM - 5PM)</option>
                  <option value="Evening 5:00 PM - 7:30 PM">Evening (5PM - 7:30PM)</option>
                </select>
              </div>
              <div class="form-error-msg error-time">Please pick a preferred date and time slot.</div>
            </div>

            <!-- MANDATORY PRIVACY POLICY CHECKBOX (STRICT LOGIC) -->
            <label class="checkbox-group">
              <input type="checkbox" name="privacyConsent" class="custom-checkbox" required />
              <span class="checkbox-label">
                I agree to the <a href="#privacy" class="privacy-link privacy-modal-link">Privacy Policy</a>.
              </span>
            </label>
            <div class="form-error-msg error-privacy" style="margin-top: -12px; margin-bottom: 14px;">
              You must agree to the Privacy Policy before booking.
            </div>

            <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top: 8px;">
              Confirm Appointment
            </button>
            <div style="text-align: center; margin-top: 12px; font-size: 0.8rem; color: var(--color-text-muted);">
              Instant WhatsApp confirmation & direct agent coordination.
            </div>
          </form>
        </aside>
      </div>
    </div>
  `;

  // Attach gallery thumbnail click handlers
  const mainImg = document.getElementById("detailMainImage");
  container.querySelectorAll(".gallery-thumb").forEach(thumb => {
    thumb.addEventListener("click", () => {
      const src = thumb.getAttribute("data-src");
      if (src && mainImg) {
        mainImg.style.opacity = "0.4";
        setTimeout(() => {
          mainImg.src = src;
          mainImg.style.opacity = "1";
        }, 120);
      }
    });
  });

  // Attach floor plan tabs switchers
  const fpStageDesc = document.getElementById("floorPlanDescText");
  container.querySelectorAll(".floorplan-tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      container.querySelectorAll(".floorplan-tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const idx = parseInt(btn.getAttribute("data-index"), 10);
      const chosenFp = property.floorPlans[idx];
      if (chosenFp && fpStageDesc) {
        fpStageDesc.innerHTML = `<strong>${chosenFp.name} (${chosenFp.area})</strong>: ${chosenFp.description}`;
      }
    });
  });

  // Attach strict appointment validation to this detail form
  const detailForm = document.getElementById("propertyDetailBookingForm");
  if (detailForm && typeof AppointmentManager !== "undefined") {
    AppointmentManager.attachFormValidation(detailForm, false);
  }
}

/* --------------------------------------------------------------------------
   Global Render Function: Catalog Page (Buy or Rent)
   -------------------------------------------------------------------------- */
function renderCatalogPage(purpose = "Buy") {
  const isBuy = purpose === "Buy";
  const catalogId = isBuy ? "buyPropertiesCatalog" : "rentPropertiesCatalog";
  const container = document.getElementById(catalogId);
  if (!container || typeof PROPERTIES_DATA === "undefined") return;

  const list = PROPERTIES_DATA.filter(p => p.purpose === purpose);
  container.innerHTML = list.map(p => App.createPropertyCardHTML(p)).join("");
  App.bindPropertyCardButtons(container);

  // Setup filter triggers for Buy or Rent
  const filterForm = document.getElementById(isBuy ? "buyFilterForm" : "rentFilterForm");
  if (filterForm) {
    const handleFilterChange = () => {
      const type = filterForm.querySelector('.catalog-filter-type')?.value || "all";
      const bhk = filterForm.querySelector('.catalog-filter-bhk')?.value || "all";
      const location = filterForm.querySelector('.catalog-filter-location')?.value || "all";
      const budget = filterForm.querySelector('.catalog-filter-budget')?.value || "all";

      App.applyCatalogFilters(purpose, { type, bhk, location, budget });
    };

    filterForm.querySelectorAll("select, input").forEach(input => {
      input.addEventListener("change", handleFilterChange);
    });

    filterForm.addEventListener("submit", (e) => {
      e.preventDefault();
      handleFilterChange();
    });
  }
}
