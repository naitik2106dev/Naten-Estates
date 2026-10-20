/* ==========================================================================
   NATEN ESTATES - PROPERTIES DATA (EAST DELHI & DELHI NCR)
   ========================================================================== */

const PROPERTIES_DATA = [
  {
    id: 1,
    title: "The Sovereign Floor - Preet Vihar",
    slug: "sovereign-floor-preet-vihar",
    purpose: "Buy",
    type: "Builder Floor",
    category: "Luxury Floor",
    price: 38500000,
    priceDisplay: "₹3.85 Cr",
    ratePerSqFt: "₹14,800 / sq.ft",
    location: "G-Block, Preet Vihar, East Delhi",
    city: "East Delhi",
    pincode: "110092",
    bhk: 4,
    baths: 4,
    balconies: 3,
    superArea: "2,600 sq.ft",
    carpetArea: "2,250 sq.ft",
    facing: "North-East (Vastu Compliant)",
    floor: "2nd of 4 Floors",
    furnishing: "Semi-Furnished (Italian Fittings)",
    possession: "Ready to Move",
    reraStatus: "Freehold Registered",
    parking: "2 Dedicated Stilt Slots",
    featured: true,
    thumbnail: "assets/images/villa.jpg",
    gallery: [
      "assets/images/villa.jpg",
      "assets/images/interior.jpg",
      "assets/images/bedroom.jpg",
      "assets/images/penthouse.jpg"
    ],
    shortDesc: "An ultra-exclusive 4 BHK builder floor crafted with Italian marble, expansive glass balconies, and private lift access in the heart of Preet Vihar.",
    description: "Nestled in the prestigious residential enclave of G-Block Preet Vihar, this sprawling 4 BHK residence represents contemporary architectural finesse. Offering private Otis high-speed elevator access opening straight into a private foyer, the residence boasts soaring 11-foot ceilings, imported Botticino Italian marble flooring, and German Schuco soundproof double-glazed glazing. Designed for discerning families seeking tranquil luxury within minutes of Metro access and premier healthcare.",
    features: [
      "Italian Botticino Marble Flooring",
      "Private High-Speed Lift Foyer",
      "Modular Kitchen by Hafele with Island",
      "Double Glazed Acoustic Windows",
      "24/7 Gated Security & Video Intercom",
      "100% DG Power Backup",
      "EV Car Charging Station in Stilt",
      "Smart Touch Home Automation"
    ],
    floorPlans: [
      {
        name: "Second Floor Plan",
        area: "2,600 sq.ft",
        description: "Master Suite with Walk-in Wardrobe, 3 En-suite Guest Bedrooms, Sprawling Living & Dining Salon, Dry/Wet Kitchen."
      },
      {
        name: "Stilt & Parking Layout",
        area: "Dedicated Bay",
        description: "Reserved 2-car shaded parking, driver waiting room, separate storage room and EV charger."
      }
    ],
    landmarks: [
      { name: "Preet Vihar Metro (Blue Line)", distance: "3 mins (400m)" },
      { name: "Max Super Speciality Hospital", distance: "7 mins (2.4 km)" },
      { name: "V3S Luxury Mall & Cinepolis", distance: "4 mins (900m)" },
      { name: "Akshardham Temple Complex", distance: "10 mins (4.8 km)" },
      { name: "Connaught Place (Central Delhi)", distance: "18 mins (8.5 km)" }
    ]
  },
  {
    id: 2,
    title: "The Sky Pavilion Penthouse",
    slug: "sky-pavilion-penthouse-mayur-vihar",
    purpose: "Buy",
    type: "Penthouse",
    category: "Duplex Penthouse",
    price: 52000000,
    priceDisplay: "₹5.20 Cr",
    ratePerSqFt: "₹15,750 / sq.ft",
    location: "Mayur Vihar Phase 1 Extension, East Delhi",
    city: "East Delhi",
    pincode: "110091",
    bhk: 4,
    baths: 5,
    balconies: 4,
    superArea: "3,300 sq.ft",
    carpetArea: "2,850 sq.ft",
    facing: "East Facing (Sunrise Panorama)",
    floor: "14th & 15th (Top Duplex)",
    furnishing: "Fully Furnished Designer",
    possession: "Ready to Move",
    reraStatus: "Clear Title / DDA Approved",
    parking: "3 Covered Basement Slots",
    featured: true,
    thumbnail: "assets/images/penthouse.jpg",
    gallery: [
      "assets/images/penthouse.jpg",
      "assets/images/interior.jpg",
      "assets/images/hero.jpg",
      "assets/images/bedroom.jpg"
    ],
    shortDesc: "A majestic duplex penthouse featuring a private landscaped rooftop terrace, double-height living salon, and panoramic views of the Delhi skyline.",
    description: "The Sky Pavilion is a rare trophy home set atop Mayur Vihar's most sought-after gated enclave. Featuring a 900 sq.ft private rooftop terrace garden with pergola and ambient brass lighting, this duplex delivers unparalleled entertaining spaces. Includes double-height dining room, curated warm wood paneling, private bar lounge, and a master retreat overlooking lush Sanjay Lake greens.",
    features: [
      "Private Landscaped Rooftop Deck",
      "Double Height 20ft Glass Living Room",
      "Private Terrace Barbeque & Pergola",
      "Imported Teakwood Flooring in Bedrooms",
      "Multi-Zone VRV Air Conditioning",
      "Clubhouse Access with Swimming Pool",
      "24/7 Concierge & Multi-Tier Security",
      "Direct Proximity to DND Flyway & Noida"
    ],
    floorPlans: [
      {
        name: "Lower Level (14th Floor)",
        area: "1,950 sq.ft",
        description: "Double height formal living, guest suite, powder room, show kitchen & utility."
      },
      {
        name: "Upper Level & Terrace (15th Floor)",
        area: "1,350 sq.ft",
        description: "Master retreat with jacuzzi bath, children's bedroom, private library lounge & open terrace garden."
      }
    ],
    landmarks: [
      { name: "Mayur Vihar Phase 1 Metro Interchange", distance: "4 mins (600m)" },
      { name: "Sanjay Lake & Biodiversity Park", distance: "3 mins (500m)" },
      { name: "DND Flyway (Noida / South Delhi)", distance: "6 mins (3.2 km)" },
      { name: "Mother Dairy Corporate Hub", distance: "5 mins (1.8 km)" },
      { name: "Akshardham Metro & Temple", distance: "8 mins (4.1 km)" }
    ]
  },
  {
    id: 3,
    title: "The Courtyard Villa - Anand Vihar",
    slug: "courtyard-villa-anand-vihar",
    purpose: "Buy",
    type: "Luxury Villa",
    category: "Independent Bungalow",
    price: 85000000,
    priceDisplay: "₹8.50 Cr",
    ratePerSqFt: "₹18,800 / sq.ft",
    location: "Surajmal Vihar / Anand Vihar, East Delhi",
    city: "East Delhi",
    pincode: "110092",
    bhk: 5,
    baths: 6,
    balconies: 5,
    superArea: "4,500 sq.ft",
    carpetArea: "3,900 sq.ft",
    facing: "North-West Corner Plot",
    floor: "G + 2 Independent Floors",
    furnishing: "Semi-Furnished Bespoke",
    possession: "Immediate Possession",
    reraStatus: "Freehold Clean Title",
    parking: "4 Vehicles On-Site Driveway",
    featured: true,
    thumbnail: "assets/images/hero.jpg",
    gallery: [
      "assets/images/hero.jpg",
      "assets/images/villa.jpg",
      "assets/images/interior.jpg",
      "assets/images/bedroom.jpg"
    ],
    shortDesc: "Palatial 5 BHK independent luxury bungalow with private courtyard, landscaped perimeter, and expansive multi-generation living spaces.",
    description: "An extraordinary independent bungalow situated on a 350 sq. yard corner plot in prime Surajmal Vihar. Featuring stone masonry, floor-to-ceiling glass pavilions, and an interior central zen courtyard with cascading water feature. Ideal for family dynasties demanding absolute privacy, manicured gardens, and bespoke architectural grandeur.",
    features: [
      "350 Sq. Yard Freehold Corner Plot",
      "Internal Zen Water Courtyard",
      "Private Hydraulic Home Elevator",
      "Solar Power Generation Array (10 kW)",
      "Separate Servant Quarters & Utility Entry",
      "Designer Walk-in Closets",
      "Automated Security Gates with ANPR",
      "Extensive Teak & Travertine Detailing"
    ],
    floorPlans: [
      {
        name: "Ground Floor",
        area: "1,600 sq.ft",
        description: "Formal entertaining hall, courtyard dining, dry pantry, master elder suite."
      },
      {
        name: "First Floor",
        area: "1,550 sq.ft",
        description: "Family lounge, 3 lavish en-suite bedrooms with attached balconies."
      },
      {
        name: "Second Floor & Terrace",
        area: "1,350 sq.ft",
        description: "Recreation lounge, home gym, guest suite and open terrace party pavilion."
      }
    ],
    landmarks: [
      { name: "Anand Vihar Railway Station & ISBT", distance: "5 mins (1.5 km)" },
      { name: "Yamuna Sports Complex", distance: "4 mins (1.2 km)" },
      { name: "Karkardooma Court & Commercial Hub", distance: "5 mins (1.8 km)" },
      { name: "Cross River Mall", distance: "6 mins (2.0 km)" }
    ]
  },
  {
    id: 4,
    title: "Serene Garden Floor - Swasthya Vihar",
    slug: "serene-garden-floor-swasthya-vihar",
    purpose: "Rent",
    type: "Builder Floor",
    category: "Garden Floor",
    price: 85000,
    priceDisplay: "₹85,000",
    pricePeriod: "/ month",
    ratePerSqFt: "₹38 / sq.ft",
    location: "Swasthya Vihar, Vikas Marg, East Delhi",
    city: "East Delhi",
    pincode: "110092",
    bhk: 3,
    baths: 3,
    balconies: 2,
    superArea: "2,200 sq.ft",
    carpetArea: "1,880 sq.ft",
    facing: "North Facing Park View",
    floor: "Ground Floor with Private Lawn",
    furnishing: "Fully Furnished Premium",
    possession: "Available Now",
    reraStatus: "Verified Lease",
    parking: "1 Reserved Covered Slot",
    featured: false,
    thumbnail: "assets/images/interior.jpg",
    gallery: [
      "assets/images/interior.jpg",
      "assets/images/bedroom.jpg",
      "assets/images/villa.jpg",
      "assets/images/hero.jpg"
    ],
    shortDesc: "Earthy minimalist 3 BHK ground floor residence with private manicured lawn facing community park in peaceful Swasthya Vihar.",
    description: "Immaculately appointed for executive families or diplomats, this 3 BHK ground floor residence offers direct French-door access to a private landscaped lawn. Features curated Nordic cream furnishings, Daikin inverter air conditioners, premium modular kitchen, and comprehensive 24/7 security surveillance.",
    features: [
      "Private Front & Rear Garden",
      "Direct Park View from Living Room",
      "Imported Cream Boucle Sofas & Dinette",
      "100% Inverter Backup System",
      "Piped Natural Gas (IGL Connection)",
      "High Speed Fiber Internet Ready",
      "Dedicated Maid Washroom",
      "Walking Distance to Nirman Vihar Metro"
    ],
    floorPlans: [
      {
        name: "Ground Floor Layout",
        area: "2,200 sq.ft",
        description: "Open concept living & dining, 3 bedrooms, 3 baths, kitchen, front lawn & rear utility court."
      }
    ],
    landmarks: [
      { name: "Nirman Vihar Metro Station", distance: "4 mins (500m)" },
      { name: "Vikas Marg Retail Corridor", distance: "2 mins (200m)" },
      { name: "Max Super Speciality Patparganj", distance: "8 mins (2.8 km)" },
      { name: "Swasthya Vihar Club & Park", distance: "1 min (50m)" }
    ]
  },
  {
    id: 5,
    title: "Luminance Corporate Suite - Laxmi Nagar",
    slug: "luminance-corporate-suite-laxmi-nagar",
    purpose: "Rent",
    type: "Commercial",
    category: "Office Suite",
    price: 120000,
    priceDisplay: "₹1,20,000",
    pricePeriod: "/ month",
    ratePerSqFt: "₹75 / sq.ft",
    location: "Main Vikas Marg, Laxmi Nagar Hub, East Delhi",
    city: "East Delhi",
    pincode: "110092",
    bhk: 0,
    baths: 2,
    balconies: 1,
    superArea: "1,600 sq.ft",
    carpetArea: "1,350 sq.ft",
    facing: "Main Road Facing",
    floor: "3rd Floor Commercial Complex",
    furnishing: "Plug & Play Fully Fitted",
    possession: "Ready for Occupation",
    reraStatus: "Commercial Freehold",
    parking: "2 Dedicated Basement Slots",
    featured: false,
    thumbnail: "assets/images/commercial.jpg",
    gallery: [
      "assets/images/commercial.jpg",
      "assets/images/interior.jpg",
      "assets/images/penthouse.jpg"
    ],
    shortDesc: "High-spec plug-and-play boutique commercial office suite on prime Vikas Marg with modern glass partitions and reception.",
    description: "Designed for chartered accountancy firms, corporate consultancies, or tech startups, this 1,600 sq.ft commercial suite features a custom travertine reception desk, 2 executive cabins, 22 modular workstations, high-speed networking, conference room with AV screen, and dual restrooms.",
    features: [
      "22 Ergonomic Workstations + 2 Director Cabins",
      "10-Seater Boardroom with Video Conferencing",
      "Travertine Reception & Client Lounge",
      "Dual Passenger Lifts with DG Backup",
      "Fire Fighting System Approved",
      "Pantry & Server Room",
      "Zero Maintenance Glitch Guarantee",
      "Walking Distance to Laxmi Nagar Metro"
    ],
    floorPlans: [
      {
        name: "Office Floor Plan",
        area: "1,600 sq.ft",
        description: "Executive suites, open workstation hall, conference room, server room and pantry."
      }
    ],
    landmarks: [
      { name: "Laxmi Nagar Metro Station", distance: "2 mins (250m)" },
      { name: "Nirman Vihar Commercial Strip", distance: "3 mins (600m)" },
      { name: "ITO & Central Government Offices", distance: "8 mins (3.5 km)" },
      { name: "Connaught Place", distance: "14 mins (6.5 km)" }
    ]
  },
  {
    id: 6,
    title: "The Botanical Residence - Patparganj",
    slug: "botanical-residence-patparganj",
    purpose: "Buy",
    type: "Builder Floor",
    category: "Luxury Apartment",
    price: 24500000,
    priceDisplay: "₹2.45 Cr",
    ratePerSqFt: "₹13,200 / sq.ft",
    location: "I.P. Extension, Patparganj, East Delhi",
    city: "East Delhi",
    pincode: "110092",
    bhk: 3,
    baths: 3,
    balconies: 3,
    superArea: "1,850 sq.ft",
    carpetArea: "1,550 sq.ft",
    facing: "North-East Facing",
    floor: "4th Floor with Lift",
    furnishing: "Semi-Furnished",
    possession: "Ready to Move",
    reraStatus: "Registered Society / Clear Title",
    parking: "1 Reserved Covered Slot",
    featured: false,
    thumbnail: "assets/images/bedroom.jpg",
    gallery: [
      "assets/images/bedroom.jpg",
      "assets/images/interior.jpg",
      "assets/images/villa.jpg",
      "assets/images/hero.jpg"
    ],
    shortDesc: "A sunlit 3 BHK sanctuary overlooking mature foliage in Patparganj with warm oak accents and contemporary fittings.",
    description: "Positioned in one of Patparganj's premier secure societies, this 3 BHK residence balances serene residential comfort with supreme connectivity to Central Delhi via NH-24 / Delhi-Meerut Expressway. Boasts upgraded bathrooms with Hansgrohe fittings, Italian tiles, and an airy balcony overlooking neighborhood parks.",
    features: [
      "Park Facing Balcony with Glass Railings",
      "Engineered Oak Wood Wardrobes",
      "Hansgrohe & Kohler Sanitaryware",
      "Gated Society with 24x7 Guard Patrol",
      "Elevator Access with Intercom",
      "Dedicated EV Charging Point",
      "Near Renowned Bal Bhavan & National Victor Schools"
    ],
    floorPlans: [
      {
        name: "Standard Floor Layout",
        area: "1,850 sq.ft",
        description: "Generous living-dining lounge, 3 en-suite bedrooms, modular kitchen and 3 balconies."
      }
    ],
    landmarks: [
      { name: "IP Extension Metro (Pink Line)", distance: "3 mins (450m)" },
      { name: "Max Super Speciality Hospital", distance: "2 mins (300m)" },
      { name: "Delhi-Meerut Expressway / NH-24", distance: "4 mins (1.2 km)" },
      { name: "Akshardham Temple", distance: "7 mins (3.2 km)" }
    ]
  }
];

// Helper functions for data access
function getAllProperties() {
  return PROPERTIES_DATA;
}

function getPropertyById(id) {
  const numId = parseInt(id, 10);
  return PROPERTIES_DATA.find(p => p.id === numId);
}

function getFeaturedProperties() {
  return PROPERTIES_DATA.filter(p => p.featured);
}
