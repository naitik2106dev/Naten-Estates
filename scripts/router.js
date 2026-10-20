/* ==========================================================================
   NATEN ESTATES - CLIENT-SIDE ROUTER
   Seamless multi-page routing:
   #home, #buy, #sell, #rent, #about, #contact, #property/:id
   ========================================================================== */

const Router = {
  routes: ["home", "buy", "sell", "rent", "about", "contact", "property"],
  currentRoute: "home",

  init() {
    window.addEventListener("hashchange", () => this.handleRouting());
    this.handleRouting();
    this.bindNavLinks();
  },

  handleRouting() {
    let hash = window.location.hash.replace("#", "").trim();
    if (!hash) {
      hash = "home";
    }

    let pageName = hash;
    let param = null;

    // Check for parameterized routes e.g. property/1
    if (hash.startsWith("property/")) {
      pageName = "property";
      param = hash.split("/")[1];
    } else if (hash.includes("?")) {
      const parts = hash.split("?");
      pageName = parts[0];
      param = parts[1];
    }

    if (!this.routes.includes(pageName)) {
      pageName = "home";
    }

    this.currentRoute = pageName;
    this.activatePage(pageName, param);
    this.updateActiveNavs(pageName);

    // Smooth scroll to top on page switch
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  activatePage(pageName, param = null) {
    // Hide all view sections
    document.querySelectorAll(".page-view").forEach(view => {
      view.style.display = "none";
      view.classList.remove("active");
    });

    // Handle property detail special rendering
    if (pageName === "property") {
      const propertyView = document.getElementById("view-property-detail");
      if (propertyView) {
        propertyView.style.display = "block";
        propertyView.classList.add("active");
        if (typeof renderPropertyDetailPage === "function" && param) {
          renderPropertyDetailPage(param);
        }
      }
      return;
    }

    // Standard view activation
    const targetView = document.getElementById(`view-${pageName}`);
    if (targetView) {
      targetView.style.display = "block";
      targetView.classList.add("active");

      // Notify App to re-filter or trigger page-specific setup if needed
      if (pageName === "buy" && typeof renderCatalogPage === "function") {
        renderCatalogPage("Buy");
      } else if (pageName === "rent" && typeof renderCatalogPage === "function") {
        renderCatalogPage("Rent");
      }
    }
  },

  updateActiveNavs(pageName) {
    document.querySelectorAll(".nav-link, .mobile-nav-link").forEach(link => {
      const href = link.getAttribute("href") || "";
      const routeName = href.replace("#", "");

      if (routeName === pageName || (pageName === "property" && (routeName === "buy" || routeName === "rent"))) {
        link.classList.add("active");
      } else {
        link.classList.remove("active");
      }
    });
  },

  bindNavLinks() {
    // Close mobile drawer when clicking any link
    document.querySelectorAll(".mobile-nav-link, .brand-logo").forEach(link => {
      link.addEventListener("click", () => {
        const drawer = document.getElementById("mobileDrawer");
        const backdrop = document.getElementById("mobileBackdrop");
        if (drawer) drawer.classList.remove("active");
        if (backdrop) backdrop.classList.remove("active");
        document.body.style.overflow = "";
      });
    });
  },

  navigate(hash) {
    window.location.hash = hash;
  }
};
