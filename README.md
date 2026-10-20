# Naten Estates — Luxury Real Estate Advisory

A luxury, fully responsive real estate website for **Naten Estates**, specializing in **Buy, Sell, and Rent** operations across East Delhi and Delhi NCR.

---

## 🏛️ Brand & Concept
- **Theme**: Earthy Minimalist (Warm, Modern, and Premium)
- **Palette**: Warm Beige, Forest/Sage Green, Off-White, Dark Charcoal, and Champagne Brass
- **Headquarters**: East Delhi, Delhi NCR, India - 110092
- **Direct Contacts**:
  - WhatsApp / Primary: `+91 7011491747`
  - Secondary Desk: `+91 7011683813`
  - WhatsApp Chat: [https://wa.me/917011491747](https://wa.me/917011491747)

---

## 🔤 Typography
- **Brand Logo**: `'Cinzel'` (Serif)
- **Headings (H1, H2, H3)**: `'Cormorant Garamond'` (Serif)
- **Body, Navigation, Forms, UI**: `'Plus Jakarta Sans'` (Sans-serif)

---

## ✨ Features
1. **Seamless Multi-Page Navigation**:
   - Client-side deep-linked routing (`#home`, `#buy`, `#sell`, `#rent`, `#about`, `#contact`, `#property/:id`) with smooth scroll-to-top.
   - Dedicated fallback/redirect entrypoints for all pages (`buy.html`, `sell.html`, `rent.html`, `about.html`, `contact.html`, `property-detail.html`).
2. **Hero Section & Advanced Search**:
   - Cinematic architectural background with real assets.
   - Interactive search filters (Property Type, Budget Range, East Delhi Localities).
   - Trust metrics ribbon (₹450+ Cr Transacted, 15+ Years in East Delhi, 100% Verified Titles).
3. **Property Detail Page**:
   - High-resolution interactive gallery with thumbnail switcher.
   - Architectural specifications matrix (Super Area, Carpet Area, Floor, Facing, Furnishing).
   - Interactive SVG floor plan viewer with multiple floor tabs.
   - Location connectivity map with distance tags to key East Delhi landmarks (Metro, Hospitals, Expressways).
4. **Strict Appointment Form & Privacy Policy Logic**:
   - Accessible from the header CTA button and directly on the Property Detail page.
   - Fields: Full Name, Phone Number (10-digit mobile validation), Property Interest dropdown, and Preferred Time Slot.
   - **Mandatory Privacy Policy Checkbox**: Form strictly will not submit unless checked.
   - **In-Page Privacy Policy Modal**: The words *"Privacy Policy"* open a clean modal with the exact statement without redirecting or losing input data.
   - **WhatsApp Confirmation**: Confirmed appointments generate an ID with direct 1-click WhatsApp messaging.
5. **Floating WhatsApp Widget**:
   - Sticky bottom-right button with ambient pulsing effect linking to `+91 7011491747`.

---

## 📁 Repository Structure
```
Naten-Estates/
├── index.html              # Main application container & SPA views
├── buy.html                # Buy catalog entrypoint
├── sell.html               # Sell property entrypoint
├── rent.html               # Rental catalog entrypoint
├── about.html              # About & FAQ entrypoint
├── contact.html            # Contact Us entrypoint
├── property-detail.html    # Property Detail entrypoint
├── styles/
│   ├── variables.css       # Color tokens, typography, shadows, spacing
│   ├── base.css            # Resets, smooth scroll, typography scale
│   ├── components.css      # Header, buttons, cards, modals, forms, FAQ
│   ├── pages.css           # Hero, property detail layout, neighborhoods
│   └── responsive.css      # Mobile drawer navigation & breakpoints
├── scripts/
│   ├── properties-data.js  # Curated East Delhi property catalog
│   ├── router.js           # Client-side hash router with deep links
│   ├── appointment.js      # Strict appointment validation & privacy modal
│   └── app.js              # Search filters, gallery switcher, accordion
└── assets/
    └── images/             # High-res architectural photography
        ├── hero.jpg
        ├── interior.jpg
        ├── villa.jpg
        ├── penthouse.jpg
        ├── bedroom.jpg
        └── commercial.jpg
```

---

## 🚀 Running Locally
Simply open `index.html` in any modern web browser:
```bash
# Or serve using any static file server:
npx serve .
# or Python (if available):
python -m http.server 8000
```
