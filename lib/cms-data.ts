export type ProjectStatus =
  | 'Draft'
  | 'Upcoming'
  | 'New Launch'
  | 'Under Construction'
  | 'Ready to Move'
  | 'Sold Out'
  | 'Archived';

export type ReraStatus = 'YES' | 'NO' | 'EXEMPT' | 'UNKNOWN';

export type Developer = {
  id: string;
  name: string;
  slug: string;
  logoText: string;
  description: string;
  authorizationVerified: boolean;
  authorizationBadgePublic: boolean;
  relationshipNote: string;
  stats: { label: string; value: string }[];
  seoTitle: string;
  seoDescription: string;
};

export type Location = {
  id: string;
  name: string;
  slug: string;
  state: string;
  image: string;
  summary: string;
  overview: string;
  investmentConsiderations: string[];
  connectivityNotes: { label: string; detail: string }[];
  faqs: { question: string; answer: string }[];
  seoTitle: string;
  seoDescription: string;
};

export type PropertyType = {
  id: string;
  name: string;
  slug: string;
  summary: string;
  image: string;
  seoTitle: string;
  seoDescription: string;
};

export type Project = {
  id: string;
  isDemo: boolean;
  name: string;
  slug: string;
  developerId: string;
  locationId: string;
  propertyTypeIds: string[];
  headline: string;
  description: string;
  heroImage: string;
  gallery: { src: string; alt: string; caption: string; category: string }[];
  startingPrice: string;
  priceUpdatedAt?: string;
  configuration: string;
  area?: string;
  status: ProjectStatus;
  editorialBadges: string[];
  featured: boolean;
  hot: boolean;
  upcoming: boolean;
  newLaunch: boolean;
  investmentOpportunity: boolean;
  reraApplicable: ReraStatus;
  reraNumber?: string;
  reraAuthorityUrl?: string;
  reraReason?: string;
  possession?: string;
  landArea?: string;
  unitCount?: string;
  highlights: string[];
  amenities: string[];
  floorPlans: {
    configuration: string;
    carpetArea?: string;
    builtUpArea?: string;
    superArea?: string;
    price: string;
    image: string;
  }[];
  pricePlans: {
    configuration: string;
    area: string;
    startingPrice: string;
    availability: string;
  }[];
  connectivity: {
    category: string;
    name: string;
    distance?: string;
    travelTime?: string;
  }[];
  brochureUrl?: string;
  seoTitle: string;
  seoDescription: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  category: string;
  excerpt: string;
  author: string;
  publishedAt: string;
  updatedAt: string;
  image: string;
  body: string[];
  faqs: { question: string; answer: string }[];
  relatedLocationIds: string[];
  relatedProjectIds: string[];
  seoTitle: string;
  seoDescription: string;
};

export type TeamMember = {
  id: string;
  name: string;
  designation: string;
  specialization: string;
  bio: string;
  image: string;
  linkedin?: string;
};

export type Testimonial = {
  id: string;
  customerName: string;
  city: string;
  project?: string;
  quote: string;
  verified: boolean;
};

export type CmsData = {
  developers: Developer[];
  locations: Location[];
  propertyTypes: PropertyType[];
  projects: Project[];
  articles: Article[];
  team: TeamMember[];
  testimonials: Testimonial[];
};

export const contactConfig = {
  phoneDisplay: '+91 99999 99999',
  phoneHref: 'tel:+919999999999',
  whatsappNumber: '919999999999',
  email: 'advisory@glfproperties.in',
  officeAddress: 'Golden Leaf Properties Private Limited, office details editable from admin.',
  domain: 'https://glfproperties.in',
};

export const propertyTypes: PropertyType[] = [
  {
    id: 'type-luxury-apartments',
    name: 'Luxury Apartments',
    slug: 'luxury-apartments',
    summary:
      'Premium 3 BHK, 4 BHK and larger residences selected for location, planning, amenities and long-term relevance.',
    image:
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Luxury Apartments in India | Golden Leaf Properties',
    seoDescription:
      'Explore CMS-managed luxury apartment opportunities across selected Indian property markets.',
  },
  {
    id: 'type-villas',
    name: 'Villas',
    slug: 'villas',
    summary:
      'Private villa developments and low-density residences for families, second homes and lifestyle-led investments.',
    image:
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Premium Villas in India | Golden Leaf Properties',
    seoDescription:
      'Discover curated villas and private residences across emerging and established Indian destinations.',
  },
  {
    id: 'type-farmhouses',
    name: 'Farmhouses',
    slug: 'farmhouses',
    summary:
      'Green retreats, weekend estates and farmhouse opportunities with an emphasis on transparent due diligence.',
    image:
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Farmhouse Opportunities | Golden Leaf Properties',
    seoDescription:
      'Browse curated farmhouse and green-retreat property opportunities with advisor-led discovery.',
  },
  {
    id: 'type-plots',
    name: 'Plots',
    slug: 'plots',
    summary:
      'Premium residential and investment plots where zoning, title, infrastructure and RERA status can be reviewed carefully.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Premium Residential and Investment Plots | Golden Leaf Properties',
    seoDescription:
      'Explore plotted-development opportunities in selected growth corridors and destination markets.',
  },
  {
    id: 'type-bungalows',
    name: 'Bungalows',
    slug: 'bungalows',
    summary:
      'Independent homes and bungalow-style residences for buyers seeking space, privacy and a calmer ownership experience.',
    image:
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Premium Bungalows | Golden Leaf Properties',
    seoDescription:
      'Explore curated bungalow and independent-home opportunities across selected Indian markets.',
  },
  {
    id: 'type-resort',
    name: 'Resort Properties',
    slug: 'resort-properties',
    summary:
      'Hospitality-led residences and destination properties where usage, management and compliance need careful review.',
    image:
      'https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Resort Properties and Holiday Homes | Golden Leaf Properties',
    seoDescription:
      'Explore destination-led resort property and holiday home opportunities curated for serious enquiry.',
  },
  {
    id: 'type-second-homes',
    name: 'Second Homes',
    slug: 'second-homes',
    summary:
      'Calm destination homes for lifestyle, family use and selective long-term investment consideration.',
    image:
      'https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Second Homes in India | Golden Leaf Properties',
    seoDescription:
      'Find curated second-home opportunities across destination and high-growth property markets.',
  },
  {
    id: 'type-commercial',
    name: 'Commercial Properties',
    slug: 'commercial-properties',
    summary:
      'Commercial opportunities can be activated from the CMS when documentation and suitability are verified.',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Commercial Property Opportunities | Golden Leaf Properties',
    seoDescription:
      'Discover select commercial opportunities where verified information has been entered by the Golden Leaf team.',
  },
  {
    id: 'type-land',
    name: 'Land',
    slug: 'land',
    summary:
      'Residential, investment and development land where title, zoning, approvals and local rules require careful verification.',
    image:
      'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Land Opportunities | Golden Leaf Properties',
    seoDescription:
      'Explore curated land opportunities with documentation-first advisory and verification workflows.',
  },
  {
    id: 'type-penthouses',
    name: 'Penthouses',
    slug: 'penthouses',
    summary:
      'Large-format premium residences and top-floor homes for buyers seeking privacy, views and elevated urban living.',
    image:
      'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Premium Penthouses | Golden Leaf Properties',
    seoDescription:
      'Discover premium penthouse opportunities across select urban and destination markets.',
  },
  {
    id: 'type-builder-floors',
    name: 'Builder Floors',
    slug: 'builder-floors',
    summary:
      'Low-rise independent-floor homes where location, builder credentials and approvals should be reviewed in detail.',
    image:
      'https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?auto=format&fit=crop&w=1400&q=80',
    seoTitle: 'Builder Floors | Golden Leaf Properties',
    seoDescription:
      'Explore selected builder-floor opportunities with advisor-led due diligence and consultation.',
  },
];

export const locations: Location[] = [
  {
    id: 'loc-dholera',
    name: 'Dholera',
    slug: 'dholera',
    state: 'Gujarat',
    image:
      'https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&w=1400&q=80',
    summary:
      'A long-horizon plotted and infrastructure-led market where buyers should review zoning, title and verified project information carefully.',
    overview:
      'Dholera is presented on Golden Leaf as a research-first destination. The CMS is designed so administrators can publish sourced infrastructure notes, verified project data and clear risk considerations before a listing is promoted.',
    investmentConsiderations: [
      'Review title, zoning and project permissions before shortlisting.',
      'Prefer verified project documentation over unsupported appreciation claims.',
      'Use Golden Leaf advisory to compare long-horizon plotted opportunities.',
    ],
    connectivityNotes: [
      {
        label: 'Infrastructure notes',
        detail:
          'Admin can add source-linked notes for roads, civic infrastructure and official development updates.',
      },
      {
        label: 'Project verification',
        detail:
          'Connectivity distances and travel times should be added only after field verification or reliable published sources.',
      },
    ],
    faqs: [
      {
        question: 'Are Dholera pages automatically indexed?',
        answer:
          'Only content-rich location pages with meaningful CMS content should be indexable. Thin filter combinations should remain noindex or canonicalized.',
      },
      {
        question: 'Can plotted projects show RERA information?',
        answer:
          'Yes. Each project record supports RERA applicability, registration number, authority URL and exemption reason where relevant.',
      },
    ],
    seoTitle: 'Properties in Dholera | Golden Leaf Properties',
    seoDescription:
      'Explore carefully reviewed Dholera property opportunities with compliance-aware project information.',
  },
  {
    id: 'loc-goa',
    name: 'Goa',
    slug: 'goa',
    state: 'Goa',
    image:
      'https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Destination-led villas, second homes and resort residences where lifestyle appeal must be balanced with management and legal diligence.',
    overview:
      'Goa pages are structured for serious second-home discovery. Golden Leaf can publish verified inventory, developer notes, management terms, usage policies and buyer FAQs from the admin portal.',
    investmentConsiderations: [
      'Review usage rules, maintenance structure and rental-management terms.',
      'Verify land title, permissions and project registration status.',
      'Compare north, south and inland micro-markets through CMS-created guides.',
    ],
    connectivityNotes: [
      {
        label: 'Destination access',
        detail:
          'Airport, beach and highway proximity should be entered at project level after verification.',
      },
      {
        label: 'Lifestyle fit',
        detail:
          'Admin can classify inventory by holiday-home, self-use, rental-income and long-stay suitability.',
      },
    ],
    faqs: [
      {
        question: 'Does Golden Leaf promise rental income on Goa properties?',
        answer:
          'No unsupported rental or appreciation claims are made. Any yield information must be explicitly entered and substantiated by the administrator.',
      },
    ],
    seoTitle: 'Luxury Villas and Second Homes in Goa | Golden Leaf Properties',
    seoDescription:
      'Explore curated Goa villas, resort properties and second homes with advisor-led discovery.',
  },
  {
    id: 'loc-dehradun',
    name: 'Dehradun',
    slug: 'dehradun',
    state: 'Uttarakhand',
    image:
      'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80',
    summary:
      'A calm residential and second-home market suited to buyers comparing lifestyle, access and long-term family use.',
    overview:
      'Dehradun is handled as a lifestyle-and-residential destination. The content model supports micro-market notes, verified connectivity, project galleries and high-quality FAQs.',
    investmentConsiderations: [
      'Compare city residential, hillside and nearby destination contexts separately.',
      'Confirm project approvals, access roads and ongoing maintenance responsibilities.',
      'Use site visits to validate views, slopes and neighbourhood fit.',
    ],
    connectivityNotes: [
      {
        label: 'Access details',
        detail:
          'Airport, highway, school and healthcare distances should be entered as verified project-level data.',
      },
    ],
    faqs: [
      {
        question: 'Can Dehradun projects be compared with Uttarakhand second homes?',
        answer:
          'Yes. The comparison module supports location, configuration, price, amenities, possession and RERA information.',
      },
    ],
    seoTitle: 'Premium Properties in Dehradun | Golden Leaf Properties',
    seoDescription:
      'Discover premium homes and second-home opportunities in Dehradun with Golden Leaf advisory.',
  },
  {
    id: 'loc-jewar',
    name: 'Jewar Airport Region',
    slug: 'jewar',
    state: 'Uttar Pradesh',
    image:
      'https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=1400&q=80',
    summary:
      'A growth-corridor location page designed for verified infrastructure notes, plotted inventory and cautious investment framing.',
    overview:
      'Golden Leaf can use this page to publish projects around the Jewar and Noida International Airport growth corridor, while separating official updates from marketing claims.',
    investmentConsiderations: [
      'Avoid unsupported guaranteed-return language.',
      'Review master plans, project permissions and RERA applicability.',
      'Check holding period, exit assumptions and infrastructure timelines.',
    ],
    connectivityNotes: [
      {
        label: 'Airport-region context',
        detail:
          'Specific distance and travel-time claims should be entered only with a verified source or site-visit validation.',
      },
    ],
    faqs: [
      {
        question: 'Are airport-region investment claims guaranteed?',
        answer:
          'No. Golden Leaf pages are designed to avoid guarantees and to present verified facts, risks and advisor support.',
      },
    ],
    seoTitle: 'Properties Near Jewar Airport Region | Golden Leaf Properties',
    seoDescription:
      'Explore selected property opportunities around the Jewar airport region with compliance-led information.',
  },
  {
    id: 'loc-noida',
    name: 'Noida',
    slug: 'noida',
    state: 'Uttar Pradesh',
    image:
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Urban homes, plotted options and commercial opportunities can be curated from verified CMS records.',
    overview:
      'Noida listings should be structured around developer credibility, sector-level context, connectivity and current possession or construction status.',
    investmentConsiderations: [
      'Review sector-level location and possession status.',
      'Confirm RERA details wherever applicable.',
      'Compare commute, amenities and developer track record.',
    ],
    connectivityNotes: [
      {
        label: 'Urban connectivity',
        detail:
          'Metro, expressway and office-hub data can be added per project after verification.',
      },
    ],
    faqs: [],
    seoTitle: 'Premium Properties in Noida | Golden Leaf Properties',
    seoDescription:
      'Browse curated premium real-estate opportunities in Noida with advisor-led discovery.',
  },
  {
    id: 'loc-greater-noida',
    name: 'Greater Noida',
    slug: 'greater-noida',
    state: 'Uttar Pradesh',
    image:
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80',
    summary:
      'A planned-market destination for apartments, plots and corridor-linked opportunities.',
    overview:
      'Greater Noida pages can combine project inventory with verified micro-market, commute and infrastructure context.',
    investmentConsiderations: [
      'Compare project-level readiness and location maturity.',
      'Keep pricing freshness visible through last-updated fields.',
      'Use site visits for neighbourhood validation.',
    ],
    connectivityNotes: [],
    faqs: [],
    seoTitle: 'Properties in Greater Noida | Golden Leaf Properties',
    seoDescription:
      'Explore curated property opportunities in Greater Noida with Golden Leaf Properties.',
  },
  {
    id: 'loc-gurgaon',
    name: 'Gurgaon',
    slug: 'gurgaon',
    state: 'Haryana',
    image:
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Premium apartments, luxury residences and urban investment opportunities for high-intent buyers.',
    overview:
      'Gurgaon pages support premium residential discovery, developer pages, price tables and advisor-led consultation journeys.',
    investmentConsiderations: [
      'Compare developer, micro-market, delivery stage and maintenance structure.',
      'Review actual inventory and updated price sheets before booking decisions.',
      'Use project comparison for configuration and possession clarity.',
    ],
    connectivityNotes: [],
    faqs: [],
    seoTitle: 'Luxury Properties in Gurgaon | Golden Leaf Properties',
    seoDescription:
      'Explore curated luxury residences and premium properties in Gurgaon.',
  },
  {
    id: 'loc-delhi-ncr',
    name: 'Delhi NCR',
    slug: 'delhi-ncr',
    state: 'NCR',
    image:
      'https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=1400&q=80',
    summary:
      'A regional discovery page for cross-market comparison across NCR cities and growth corridors.',
    overview:
      'Delhi NCR pages should help buyers compare projects by location, developer, configuration, readiness and verified project information.',
    investmentConsiderations: [
      'Separate end-use, second-home and investment objectives.',
      'Check location maturity and delivery timelines.',
      'Use advisor support to shortlist a manageable set of projects.',
    ],
    connectivityNotes: [],
    faqs: [],
    seoTitle: 'Premium Real Estate in Delhi NCR | Golden Leaf Properties',
    seoDescription:
      'Compare selected premium property opportunities across Delhi NCR.',
  },
  {
    id: 'loc-uttarakhand',
    name: 'Uttarakhand',
    slug: 'uttarakhand',
    state: 'Uttarakhand',
    image:
      'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Second homes, hill residences and nature-led opportunities where location fit and legal diligence matter.',
    overview:
      'Uttarakhand destination pages support advisor-led discovery for buyers considering second homes, family retreats and lifestyle-led property ownership.',
    investmentConsiderations: [
      'Verify local land-use rules and project permissions.',
      'Review access, maintenance and seasonal usability.',
      'Visit shortlisted projects before final decisions.',
    ],
    connectivityNotes: [],
    faqs: [],
    seoTitle: 'Second Homes in Uttarakhand | Golden Leaf Properties',
    seoDescription:
      'Discover curated second-home and lifestyle property opportunities in Uttarakhand.',
  },
  {
    id: 'loc-jim-corbett',
    name: 'Jim Corbett',
    slug: 'jim-corbett',
    state: 'Uttarakhand',
    image:
      'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Forest-side villas, plots and resort residences where tourism appeal, local approvals and operating terms need careful review.',
    overview:
      'Jim Corbett pages help buyers compare nature-led projects, resort residences and plotted opportunities around Ramnagar and nearby tourism corridors with clear compliance notes.',
    investmentConsiderations: [
      'Verify RERA number, land title and permitted use before promotion.',
      'Review resort-management terms separately from residential ownership.',
      'Avoid yield or occupancy promises unless legally substantiated.',
    ],
    connectivityNotes: [
      {
        label: 'Tourism corridor',
        detail:
          'Project-level pages can carry verified distances to Ramnagar, Dhela Gate, state highways and nearby hospitality zones.',
      },
    ],
    faqs: [
      {
        question: 'Can resort residences be shown beside residential plots?',
        answer:
          'Yes, but ownership, usage, management and compliance terms should be separated clearly for each project.',
      },
    ],
    seoTitle: 'Jim Corbett Villas, Plots and Resort Properties | Golden Leaf Properties',
    seoDescription:
      'Explore selected Jim Corbett villas, plots and resort residences with compliance-led advisory.',
  },
  {
    id: 'loc-vrindavan',
    name: 'Vrindavan',
    slug: 'vrindavan',
    state: 'Uttar Pradesh',
    image:
      'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1400&q=80',
    summary:
      'Spiritual-destination apartments and compact residences for buyers reviewing Mathura-Vrindavan connectivity, approvals and rental-use assumptions.',
    overview:
      'Vrindavan inventory should show price-sheet dates, RERA details, payment plans and statutory charges clearly because buyer intent can combine self-use, pilgrimage stays and investment.',
    investmentConsiderations: [
      'Confirm RERA, MVDA approval and latest price sheet before booking.',
      'Separate furnished-apartment appeal from guaranteed rental claims.',
      'Review GST, stamp duty, registration and parking charges.',
    ],
    connectivityNotes: [
      {
        label: 'Destination context',
        detail:
          'Administrators can add verified distances to temples, highways, rail links and Mathura city.',
      },
    ],
    faqs: [],
    seoTitle: 'Vrindavan Property Opportunities | Golden Leaf Properties',
    seoDescription:
      'Explore selected Vrindavan and Mathura property opportunities with transparent pricing and compliance details.',
  },
  {
    id: 'loc-oman',
    name: 'Oman',
    slug: 'oman',
    state: 'International',
    image:
      'https://images.unsplash.com/photo-1589196727724-7d5871f70f2d?auto=format&fit=crop&w=1400&q=80',
    summary:
      'International residential, commercial, villa and land opportunities in Oman, presented with local-regulation disclaimers and advisor follow-up.',
    overview:
      'Oman pages are structured for international opportunities such as Sultan Haitham City and A’Thuraya City, with Indian RERA separated from local Oman regulations.',
    investmentConsiderations: [
      'Review local ownership rules, freehold eligibility and designated-zone conditions.',
      'Verify project status, payment terms and currency exposure.',
      'Use local legal and tax advice before commitment.',
    ],
    connectivityNotes: [
      {
        label: 'Muscat growth context',
        detail:
          'Public master-plan sources describe mixed-use city-scale development, residential diversity and commercial/hospitality opportunities.',
      },
    ],
    faqs: [
      {
        question: 'Does Indian RERA apply to Oman projects?',
        answer:
          'No. Oman opportunities should be reviewed under applicable local Oman real-estate regulations and project-specific documentation.',
      },
    ],
    seoTitle: 'Oman Real Estate Opportunities | Golden Leaf Properties',
    seoDescription:
      'Explore Oman residential, commercial, villa and land opportunities with international-property advisory.',
  },
];

export const developers: Developer[] = [
  {
    id: 'dev-ace',
    name: 'ACE Group',
    slug: 'ace-group',
    logoText: 'ACE',
    description:
      'Delhi NCR developer profile for ACE Group inventory across residential and commercial projects in Noida, Greater Noida West and the Yamuna Expressway region.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'Golden Leaf must not show authorized-partner language for ACE Group unless admin uploads and verifies authorization.',
    stats: [],
    seoTitle: 'ACE Group Projects in Delhi NCR | Golden Leaf Properties',
    seoDescription:
      'Browse selected ACE Group opportunities in Delhi NCR with Golden Leaf advisory and verification-first project information.',
  },
  {
    id: 'dev-godrej',
    name: 'Godrej Properties',
    slug: 'godrej-properties',
    logoText: 'GP',
    description:
      'Godrej Properties brings the Godrej Group philosophy of innovation, sustainability and excellence to real estate, with public project information available for NCR homes including Noida and Delhi.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'No public authorization badge is enabled. Add relationship documents from admin before making any official-partner claim.',
    stats: [],
    seoTitle: 'Godrej Properties NCR Projects | Golden Leaf Properties',
    seoDescription:
      'Explore Godrej Properties NCR opportunities with admin-controlled authorization, RERA and pricing fields.',
  },
  {
    id: 'dev-ats-homekraft',
    name: 'ATS HomeKraft',
    slug: 'ats-homekraft',
    logoText: 'ATS',
    description:
      'ATS HomeKraft publishes NCR residential projects across Gurugram, Noida and Ghaziabad, with configurations ranging from premium apartments to larger homes.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'Authorization and registered-agent details must be verified project-wise before public display.',
    stats: [],
    seoTitle: 'ATS HomeKraft Projects | Golden Leaf Properties',
    seoDescription:
      'Browse selected ATS HomeKraft opportunities with Golden Leaf advisory and project-level verification.',
  },
  {
    id: 'dev-crc',
    name: 'CRC Group',
    slug: 'crc-group',
    logoText: 'CRC',
    description:
      'CRC Group develops residential, retail, commercial and hospitality-led spaces in Noida and Greater Noida.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'Golden Leaf relationship language remains hidden until documentation is verified in admin.',
    stats: [],
    seoTitle: 'CRC Group Projects | Golden Leaf Properties',
    seoDescription:
      'Explore selected CRC Group opportunities across Noida and Greater Noida with lead and compliance controls.',
  },
  {
    id: 'dev-elixir',
    name: 'Elixir Prana',
    slug: 'elixir-prana',
    logoText: 'ELX',
    description:
      'Nature-centric plotted township on the Delhi-Dehradun Expressway at Ganeshpur, Dehradun, presented with public-source pricing and admin verification prompts.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'Public source mentions authorised booking contact; Golden Leaf authorization remains disabled until verified.',
    stats: [],
    seoTitle: 'Elixir Prana Dehradun | Golden Leaf Properties',
    seoDescription:
      'Explore Elixir Prana premium residential plots on the Delhi-Dehradun Expressway with Golden Leaf advisory.',
  },
  {
    id: 'dev-belvoir',
    name: 'Belvoir Realty',
    slug: 'belvoir-realty',
    logoText: 'BV',
    description:
      'Developer profile connected to Corbett County, a Jim Corbett forest-side residential and resort community.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'Authorization badge disabled until admin verifies any public relationship with Golden Leaf.',
    stats: [],
    seoTitle: 'Belvoir Realty Projects | Golden Leaf Properties',
    seoDescription:
      'View Belvoir Realty and Corbett County project information with Golden Leaf verification controls.',
  },
  {
    id: 'dev-vanyam',
    name: 'Corbett Vanyam',
    slug: 'corbett-vanyam',
    logoText: 'CV',
    description:
      'Jim Corbett property initiative listed for project discovery; detailed approvals, pricing and RERA status should be verified before campaign promotion.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'No public authorization or exclusivity claim is enabled.',
    stats: [],
    seoTitle: 'Corbett Vanyam | Golden Leaf Properties',
    seoDescription:
      'Explore Corbett Vanyam as a Jim Corbett property opportunity with advisor-led verification.',
  },
  {
    id: 'dev-nestoria',
    name: 'Nestoria Buildcon Pvt. Ltd.',
    slug: 'nestoria-buildcon',
    logoText: 'NB',
    description:
      'Developer/payment reference visible on the uploaded Adhelai 73 material. Public relationship and legal status must be verified by admin.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'Uploaded reference mentions payment of development charges to Nestoria Buildcon Pvt. Ltd.; admin verification required before publication claims.',
    stats: [],
    seoTitle: 'Nestoria Buildcon Projects | Golden Leaf Properties',
    seoDescription:
      'View Adhelai 73 reference information with Golden Leaf compliance review.',
  },
  {
    id: 'dev-arihant-infratech',
    name: 'Arihant Infratech',
    slug: 'arihant-infratech',
    logoText: 'AI',
    description:
      'Developer named on the Krishna Galaxy uploaded price list for Surankh Road, Shri Dham Vrindavan, Mathura.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'No authorization claim is shown. The uploaded price list is used as a reference and must be checked before live campaigns.',
    stats: [],
    seoTitle: 'Arihant Infratech Krishna Galaxy | Golden Leaf Properties',
    seoDescription:
      'Review Krishna Galaxy price-list information from uploaded reference material with Golden Leaf advisory.',
  },
  {
    id: 'dev-oman-public-projects',
    name: 'Oman Public Projects',
    slug: 'oman-public-projects',
    logoText: 'OM',
    description:
      'International opportunity profile for publicly listed Oman master-plan projects such as Sultan Haitham City and A’Thuraya City.',
    authorizationVerified: false,
    authorizationBadgePublic: false,
    relationshipNote:
      'International project information is advisory-only unless Golden Leaf admin verifies a specific mandate or partner relationship.',
    stats: [],
    seoTitle: 'Oman Real Estate Projects | Golden Leaf Properties',
    seoDescription:
      'Explore Oman residential, villa, commercial and mixed-use opportunities with local-regulation disclaimers.',
  },
];

const ncrApartmentImage =
  'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1800&q=82';
const ncrCommercialImage =
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1800&q=82';
const corbettImage =
  'https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1800&q=82';
const omanImage =
  'https://images.unsplash.com/photo-1589196727724-7d5871f70f2d?auto=format&fit=crop&w=1800&q=82';

export const projects: Project[] = [
  {
    id: 'proj-ace-ncr',
    isDemo: false,
    name: 'ACE Group Delhi NCR Portfolio',
    slug: 'ace-group-delhi-ncr-portfolio',
    developerId: 'dev-ace',
    locationId: 'loc-delhi-ncr',
    propertyTypeIds: ['type-luxury-apartments', 'type-penthouses', 'type-builder-floors', 'type-commercial'],
    headline: 'ACE residential and commercial opportunities across Delhi NCR.',
    description:
      'Public ACE Group material lists NCR projects across apartments, garden floors, penthouse-type homes and commercial developments. Golden Leaf should verify live inventory, prices and project-specific RERA before promotion.',
    heroImage: ncrApartmentImage,
    gallery: [
      {
        src: ncrApartmentImage,
        alt: 'Premium Delhi NCR apartment tower',
        caption: 'Delhi NCR residential context',
        category: 'Residential',
      },
      {
        src: ncrCommercialImage,
        alt: 'Premium commercial building context',
        caption: 'Commercial opportunity context',
        category: 'Commercial',
      },
    ],
    startingPrice: 'Price on Request',
    priceUpdatedAt: '2026-09-30',
    configuration: '2, 3, 4 BHK apartments, garden floors, penthouse-type homes and commercial spaces',
    status: 'Under Construction',
    editorialBadges: ['Delhi NCR', 'Residential + Commercial', 'Verification Required'],
    featured: true,
    hot: true,
    upcoming: false,
    newLaunch: false,
    investmentOpportunity: true,
    reraApplicable: 'UNKNOWN',
    reraReason: 'RERA must be verified project-wise before publishing exact project claims.',
    possession: 'Project-wise',
    highlights: [
      'Public ACE site lists multiple NCR residential and commercial projects',
      'Admin must select exact inventory before campaign launch',
      'Project-specific RERA and price sheets required',
    ],
    amenities: ['Clubhouse', 'Security', 'Parking', 'Landscaped Gardens'],
    floorPlans: [],
    pricePlans: [
      {
        configuration: 'NCR portfolio',
        area: 'Project-wise',
        startingPrice: 'Price on Request',
        availability: 'Advisor verification required',
      },
    ],
    connectivity: [
      {
        category: 'Region',
        name: 'Noida, Greater Noida West, Yamuna Expressway and wider NCR projects to be verified project-wise',
      },
    ],
    seoTitle: 'ACE Group Delhi NCR Projects | Golden Leaf Properties',
    seoDescription:
      'Explore ACE Group Delhi NCR residential and commercial opportunities with Golden Leaf verification workflows.',
  },
  {
    id: 'proj-godrej-ncr',
    isDemo: false,
    name: 'Godrej Properties NCR Homes',
    slug: 'godrej-properties-ncr-homes',
    developerId: 'dev-godrej',
    locationId: 'loc-delhi-ncr',
    propertyTypeIds: ['type-luxury-apartments', 'type-penthouses'],
    headline: 'Godrej Properties homes in Noida and Delhi NCR with RERA fields managed project-wise.',
    description:
      'Public Godrej Properties material lists NCR opportunities such as Godrej Woods in Sector 43, Noida and Godrej Prima in Okhla, Delhi. Golden Leaf should show only verified availability and administrator-entered price sheets.',
    heroImage:
      'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1800&q=82',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80',
        alt: 'Luxury apartment interior context',
        caption: 'Premium residence context',
        category: 'Interior',
      },
    ],
    startingPrice: 'Public source from ₹1.64 Cr*; verify latest',
    priceUpdatedAt: '2026-09-30',
    configuration: '1, 2, 3 BHK and larger homes, project-wise',
    status: 'Under Construction',
    editorialBadges: ['Delhi NCR', 'Leading Developer', 'RERA Check Required'],
    featured: true,
    hot: true,
    upcoming: false,
    newLaunch: false,
    investmentOpportunity: false,
    reraApplicable: 'YES',
    reraReason: 'Admin must enter the exact project RERA before publishing project-specific campaigns.',
    possession: 'Project-wise',
    highlights: [
      'NCR public listings include Noida and Okhla projects',
      'No authorization badge shown without admin verification',
      'Exact price and availability must be reconfirmed',
    ],
    amenities: ['Clubhouse', 'Swimming Pool', 'Gym', 'Security', 'Parking'],
    floorPlans: [],
    pricePlans: [
      {
        configuration: 'Godrej Woods / Prima style NCR homes',
        area: 'Project-wise',
        startingPrice: 'Public source from ₹1.64 Cr*; verify latest',
        availability: 'Latest inventory required',
      },
    ],
    connectivity: [
      {
        category: 'NCR',
        name: 'Sector 43 Noida and Okhla Delhi referenced in public Godrej project listing',
      },
    ],
    seoTitle: 'Godrej Properties NCR Homes | Golden Leaf Properties',
    seoDescription:
      'Explore Godrej Properties NCR homes with Golden Leaf advisory, RERA controls and latest-price request flows.',
  },
  {
    id: 'proj-ats-homekraft-ncr',
    isDemo: false,
    name: 'ATS HomeKraft NCR Homes',
    slug: 'ats-homekraft-ncr-homes',
    developerId: 'dev-ats-homekraft',
    locationId: 'loc-delhi-ncr',
    propertyTypeIds: ['type-luxury-apartments', 'type-villas'],
    headline: 'ATS HomeKraft residential opportunities across Noida, Gurugram and Ghaziabad.',
    description:
      'Public ATS HomeKraft information lists projects such as Grandstand, Sanctuary 105, Pious Orchards and Floral Pathways. Golden Leaf should verify exact inventory and registered-agent status before accepting project-specific leads.',
    heroImage:
      'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1800&q=82',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600607688969-a5bfcd646154?auto=format&fit=crop&w=1400&q=80',
        alt: 'Premium residential clubhouse context',
        caption: 'Lifestyle amenity context',
        category: 'Amenities',
      },
    ],
    startingPrice: 'Price on Request',
    priceUpdatedAt: '2026-09-30',
    configuration: '3 BHK, 3.5 BHK, 4.5 BHK and larger homes, project-wise',
    status: 'Under Construction',
    editorialBadges: ['Delhi NCR', 'Premium Homes', 'Advisor Verification'],
    featured: true,
    hot: false,
    upcoming: false,
    newLaunch: false,
    investmentOpportunity: false,
    reraApplicable: 'UNKNOWN',
    reraReason: 'Admin must verify RERA and registered-agent status project-wise.',
    possession: 'Project-wise',
    highlights: [
      'Public source lists NCR projects in Gurugram, Noida and Ghaziabad',
      'Suitable for premium apartment shortlists',
      'Project documents required before campaign activation',
    ],
    amenities: ['Clubhouse', 'Landscaped Gardens', 'Security', 'Parking', 'Gym'],
    floorPlans: [],
    pricePlans: [
      {
        configuration: 'ATS HomeKraft portfolio',
        area: 'Project-wise',
        startingPrice: 'Price on Request',
        availability: 'Advisor verification required',
      },
    ],
    connectivity: [
      {
        category: 'NCR',
        name: 'Public source lists Sector 99A Gurugram, Sector 105 Gurugram, Sector 150 Noida and NH-24 Ghaziabad examples',
      },
    ],
    seoTitle: 'ATS HomeKraft NCR Homes | Golden Leaf Properties',
    seoDescription:
      'Explore ATS HomeKraft NCR opportunities with Golden Leaf shortlist and verification support.',
  },
  {
    id: 'proj-crc-ncr',
    isDemo: false,
    name: 'CRC Group Noida Opportunities',
    slug: 'crc-group-noida-opportunities',
    developerId: 'dev-crc',
    locationId: 'loc-noida',
    propertyTypeIds: ['type-luxury-apartments', 'type-commercial'],
    headline: 'CRC residential, retail, commercial and hospitality-led spaces in Noida and Greater Noida.',
    description:
      'Public CRC Group material presents the brand across residential, retail, commercial and hospitality projects, including premium launches in Noida and Greater Noida. Exact project inventory should be selected from admin.',
    heroImage: ncrCommercialImage,
    gallery: [
      {
        src: ncrCommercialImage,
        alt: 'Noida commercial building context',
        caption: 'Commercial and retail context',
        category: 'Commercial',
      },
      {
        src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1400&q=80',
        alt: 'Premium office lounge context',
        caption: 'Hospitality-led workspace context',
        category: 'Commercial',
      },
    ],
    startingPrice: 'Price on Request',
    priceUpdatedAt: '2026-09-30',
    configuration: 'Residential, retail, commercial and hospitality opportunities',
    status: 'New Launch',
    editorialBadges: ['Noida', 'Commercial', 'Residential'],
    featured: true,
    hot: true,
    upcoming: false,
    newLaunch: true,
    investmentOpportunity: true,
    reraApplicable: 'UNKNOWN',
    reraReason: 'Project-wise RERA and commercial approvals must be added by admin.',
    possession: 'Project-wise',
    highlights: [
      'Public source describes CRC residential, retail, commercial and hospitality work',
      'Useful for commercial and high-intent NCR enquiries',
      'Admin should attach exact project brochure before launch',
    ],
    amenities: ['Business Lounge', 'Parking', 'Security', 'Concierge'],
    floorPlans: [],
    pricePlans: [
      {
        configuration: 'CRC portfolio',
        area: 'Project-wise',
        startingPrice: 'Price on Request',
        availability: 'Latest inventory required',
      },
    ],
    connectivity: [
      {
        category: 'Noida / Greater Noida',
        name: 'Exact sector and project details to be added from verified project records',
      },
    ],
    seoTitle: 'CRC Group Noida Projects | Golden Leaf Properties',
    seoDescription:
      'Explore CRC Group residential and commercial opportunities in Noida with Golden Leaf advisory.',
  },
  {
    id: 'proj-elixir-prana',
    isDemo: false,
    name: 'Elixir Prana Dehradun',
    slug: 'elixir-prana-dehradun',
    developerId: 'dev-elixir',
    locationId: 'loc-dehradun',
    propertyTypeIds: ['type-plots', 'type-farmhouses', 'type-second-homes', 'type-land'],
    headline: 'Nature-centric residential plots on the Delhi-Dehradun Expressway.',
    description:
      'Elixir Prana is presented as a 100+ acre integrated township at Ganeshpur, Dehradun, with 500+ premium residential plots, planned infrastructure, landscaped greens and expressway connectivity. Uploaded brand references emphasize nature, community and responsible design.',
    heroImage: '/media/elixir-lifestyle.jpeg',
    gallery: [
      {
        src: '/media/elixir-lifestyle.jpeg',
        alt: 'Elixir lifestyle reference with people sitting in a green outdoor setting',
        caption: 'Uploaded lifestyle reference',
        category: 'Lifestyle',
      },
      {
        src: '/media/elixir-principles.jpeg',
        alt: 'Elixir principles reference with nature-led development messaging',
        caption: 'Uploaded brand principles reference',
        category: 'Brand',
      },
    ],
    startingPrice: '₹39,999 per sq. yard*; verify latest',
    priceUpdatedAt: '2026-09-30',
    configuration: '272+ sq yd, 500+ sq yd and 1000+ sq yd residential plots',
    area: '100+ acre township; 500+ plots publicly stated',
    status: 'New Launch',
    editorialBadges: ['Dehradun', 'Delhi-Dehradun Expressway', 'Second Home'],
    featured: true,
    hot: true,
    upcoming: false,
    newLaunch: true,
    investmentOpportunity: true,
    reraApplicable: 'UNKNOWN',
    reraReason: 'Public source says RERA-applied; admin must add registration details before claiming registration.',
    possession: 'To be verified',
    landArea: '100+ acres publicly stated',
    unitCount: '500+ plots publicly stated',
    highlights: [
      'Public source: Ganeshpur, Delhi-Dehradun Expressway / NH 307',
      '20+ landscaped parks, oxygen park and proposed clubhouse publicly stated',
      'Uploaded references position the brand around nature, water, wellbeing and community',
      'Latest pricing and RERA registration must be reconfirmed',
    ],
    amenities: ['Walking Trails', 'Security', 'Landscaped Gardens', 'Sports Facilities', 'Kids Area'],
    floorPlans: [
      {
        configuration: 'Residential Plot',
        superArea: '272+ sq yd',
        price: '₹39,999 per sq. yard*; verify latest',
        image: '/media/elixir-principles.jpeg',
      },
      {
        configuration: 'Large Plot',
        superArea: '500+ sq yd / 1000+ sq yd',
        price: 'Price on Request',
        image: '/media/elixir-lifestyle.jpeg',
      },
    ],
    pricePlans: [
      {
        configuration: 'Residential plots',
        area: '272+ sq yd and above',
        startingPrice: '₹39,999 per sq. yard*; verify latest',
        availability: 'Latest plot inventory required',
      },
    ],
    connectivity: [
      {
        category: 'Expressway',
        name: 'Delhi-Dehradun Expressway / NH 307',
        distance: 'Public source states direct / zero-metre access',
      },
      {
        category: 'Airport',
        name: 'Jolly Grant Airport',
        distance: '32 km publicly stated',
      },
      {
        category: 'City',
        name: 'Dehradun City',
        travelTime: '15 minutes publicly stated',
      },
    ],
    seoTitle: 'Elixir Prana Dehradun Plots | Golden Leaf Properties',
    seoDescription:
      'Explore Elixir Prana premium residential plots on the Delhi-Dehradun Expressway with Golden Leaf advisory.',
  },
  {
    id: 'proj-corbett-county',
    isDemo: false,
    name: 'Corbett County',
    slug: 'corbett-county',
    developerId: 'dev-belvoir',
    locationId: 'loc-jim-corbett',
    propertyTypeIds: ['type-villas', 'type-plots', 'type-resort', 'type-second-homes'],
    headline: 'Forest-side plots, villas and resort residences near Jim Corbett.',
    description:
      'Public Corbett County material describes an 11-acre forest-side community with plots, villas and luxury resort residences, positioned around wellness, wilderness and hospitality-led ownership.',
    heroImage: corbettImage,
    gallery: [
      {
        src: corbettImage,
        alt: 'Forest resort residence context near hills',
        caption: 'Forest-side lifestyle context',
        category: 'Location',
      },
      {
        src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=80',
        alt: 'Resort pool context',
        caption: 'Resort amenity context',
        category: 'Amenities',
      },
    ],
    startingPrice: 'From ₹35 Lakh*; verify latest',
    priceUpdatedAt: '2026-09-30',
    configuration: 'Plots, villas and luxury resort residences',
    area: '11 acres publicly stated',
    status: 'New Launch',
    editorialBadges: ['Jim Corbett', 'RERA Listed', 'Resort Residence'],
    featured: true,
    hot: true,
    upcoming: false,
    newLaunch: true,
    investmentOpportunity: true,
    reraApplicable: 'YES',
    reraNumber: 'UKREP08250000669',
    reraAuthorityUrl: 'https://www.uhuda.org.in/',
    possession: 'To be verified',
    landArea: '11 acres publicly stated',
    highlights: [
      'Public source states plots, villas and luxury resort residences',
      'Public source shows RERA number UKREP08250000669',
      'Dhela Gate, Ramnagar and Haldwani connectivity publicly referenced',
      'Hospitality and management terms require separate review',
    ],
    amenities: ['Swimming Pool', 'Gym', 'Spa', 'Walking Trails', 'Security', 'Concierge'],
    floorPlans: [
      {
        configuration: 'Plot / Villa / Resort residence',
        superArea: 'Project-wise',
        price: 'From ₹35 Lakh*; verify latest',
        image: corbettImage,
      },
    ],
    pricePlans: [
      {
        configuration: 'Corbett County inventory',
        area: 'Project-wise',
        startingPrice: 'From ₹35 Lakh*; verify latest',
        availability: 'Latest inventory required',
      },
    ],
    connectivity: [
      {
        category: 'Railway',
        name: 'Ramnagar Railway Station',
        travelTime: '25 minutes publicly stated',
      },
      {
        category: 'Park Gate',
        name: 'Dhela Gate, Jim Corbett National Park',
        travelTime: 'Closest gate publicly stated',
      },
    ],
    seoTitle: 'Corbett County Jim Corbett | Golden Leaf Properties',
    seoDescription:
      'Explore Corbett County plots, villas and resort residences near Jim Corbett with Golden Leaf advisory.',
  },
  {
    id: 'proj-corbett-vanyam',
    isDemo: false,
    name: 'Corbett Vanyam',
    slug: 'corbett-vanyam',
    developerId: 'dev-vanyam',
    locationId: 'loc-jim-corbett',
    propertyTypeIds: ['type-plots', 'type-villas', 'type-farmhouses', 'type-second-homes'],
    headline: 'Jim Corbett plotted and villa opportunity for verification-led discovery.',
    description:
      'Corbett Vanyam is included as a Golden Leaf opportunity because the user identified it for Jim Corbett. Public material confirms a project/team presence; pricing, layout, RERA and ownership terms should be verified before campaign promotion.',
    heroImage:
      'https://images.unsplash.com/photo-1520645521318-f03a712f0e67?auto=format&fit=crop&w=1800&q=82',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1520645521318-f03a712f0e67?auto=format&fit=crop&w=1400&q=80',
        alt: 'Nature-led plotted development context',
        caption: 'Jim Corbett lifestyle context',
        category: 'Location',
      },
    ],
    startingPrice: 'Price on Request',
    priceUpdatedAt: '2026-09-30',
    configuration: 'Plots, villa-style homes and farmhouse-style opportunities',
    status: 'Upcoming',
    editorialBadges: ['Jim Corbett', 'Verification Required', 'Second Home'],
    featured: false,
    hot: false,
    upcoming: true,
    newLaunch: false,
    investmentOpportunity: true,
    reraApplicable: 'UNKNOWN',
    reraReason: 'Admin must verify project RERA, title, layout and approvals before publishing detailed claims.',
    possession: 'To be verified',
    highlights: [
      'User-identified Jim Corbett project',
      'Public web presence found for project team and office details',
      'RERA, title and price sheet required before paid campaigns',
    ],
    amenities: ['Walking Trails', 'Security', 'Parking', 'Landscaped Gardens'],
    floorPlans: [],
    pricePlans: [
      {
        configuration: 'Corbett Vanyam inventory',
        area: 'To be verified',
        startingPrice: 'Price on Request',
        availability: 'Documentation required',
      },
    ],
    connectivity: [
      {
        category: 'Region',
        name: 'Jim Corbett / Ramnagar opportunity; exact site distance to be verified',
      },
    ],
    seoTitle: 'Corbett Vanyam Jim Corbett | Golden Leaf Properties',
    seoDescription:
      'Review Corbett Vanyam opportunity information with Golden Leaf verification and consultation workflows.',
  },
  {
    id: 'proj-adhelai-73',
    isDemo: false,
    name: 'Adhelai 73 Dholera',
    slug: 'adhelai-73-dholera',
    developerId: 'dev-nestoria',
    locationId: 'loc-dholera',
    propertyTypeIds: ['type-plots', 'type-land'],
    headline: 'Residential plots near Dholera Smart City, based on uploaded Adhelai 73 reference.',
    description:
      'Uploaded Adhelai 73 material describes residential plots at Adhelai, Survey No. 73, with immediate registry messaging, plot-size details and an offer-price sheet. All title, approvals and legal claims require administrator verification before live promotion.',
    heroImage: '/media/adhelai-73-price.jpeg',
    gallery: [
      {
        src: '/media/adhelai-73-price.jpeg',
        alt: 'Uploaded Adhelai 73 price and plot details reference',
        caption: 'Uploaded Adhelai 73 reference',
        category: 'Price Sheet',
      },
    ],
    startingPrice: '₹14,999 per sq. yard*; verify latest',
    priceUpdatedAt: '2026-09-30',
    configuration: '100 sq yd plot reference; 57 sq yd carpet area reference',
    area: '100 sq yd SBA / 900 sq ft SBA reference',
    status: 'Ready to Move',
    editorialBadges: ['Dholera', 'Plots', 'Uploaded Price Reference'],
    featured: true,
    hot: true,
    upcoming: false,
    newLaunch: false,
    investmentOpportunity: true,
    reraApplicable: 'UNKNOWN',
    reraReason: 'Uploaded flyer lists legality items, but admin must verify title, N.A., N.O.C., plan pass and RERA/exemption status.',
    possession: 'Immediate registry claimed in uploaded reference; verify before publication',
    landArea: 'Survey No. 73, Adhelai reference',
    highlights: [
      'Uploaded reference: offer price ₹14,999 per sq. yard',
      'Uploaded reference: booking amount ₹11,000',
      'Uploaded reference: 25% payment within 7 days and full payment within 30 days',
      'Uploaded reference: development charges approx ₹2,000 per sq. yard extra',
      'Legal and registry claims require admin verification',
    ],
    amenities: ['Internal Roads', 'Security', 'Landscape Planning'],
    floorPlans: [
      {
        configuration: 'Residential Plot',
        carpetArea: '57 sq yd / 513 sq ft reference',
        superArea: '100 sq yd / 900 sq ft SBA reference',
        price: '₹14,999 per sq. yard*; verify latest',
        image: '/media/adhelai-73-price.jpeg',
      },
    ],
    pricePlans: [
      {
        configuration: 'Plot',
        area: '100 sq yd reference',
        startingPrice: '₹14,999 per sq. yard*; verify latest',
        availability: 'Latest inventory required',
      },
    ],
    connectivity: [
      {
        category: 'Location',
        name: 'Adhelai, near Dholera Smart City; exact distances to be verified',
      },
    ],
    seoTitle: 'Adhelai 73 Dholera Plots | Golden Leaf Properties',
    seoDescription:
      'Explore Adhelai 73 Dholera residential plot reference information with Golden Leaf verification support.',
  },
  {
    id: 'proj-krishna-galaxy',
    isDemo: false,
    name: 'Krishna Galaxy Vrindavan',
    slug: 'krishna-galaxy-vrindavan',
    developerId: 'dev-arihant-infratech',
    locationId: 'loc-vrindavan',
    propertyTypeIds: ['type-luxury-apartments', 'type-second-homes'],
    headline: 'Pre-launch apartments and studios in Shri Dham Vrindavan from uploaded price list.',
    description:
      'The uploaded Krishna Galaxy price list names Arihant Infratech, Surankh Road, Shri Dham Vrindavan, District Mathura, MVDA approval and RERA UPRERAPRJ325884/06/2026. Prices and plans should be reconfirmed before sharing with buyers.',
    heroImage:
      'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1800&q=82',
    gallery: [
      {
        src: 'https://images.unsplash.com/photo-1600607687644-c7171b42498b?auto=format&fit=crop&w=1400&q=80',
        alt: 'Apartment building context for Krishna Galaxy',
        caption: 'Residential apartment context',
        category: 'Exterior',
      },
    ],
    startingPrice: '₹9,797 per sq. ft pre-launch*',
    priceUpdatedAt: '2026-09-30',
    configuration: 'Studios, 1 BHK and 2 BHK apartments',
    area: '454, 486, 515, 552, 800 and 1150 sq ft references',
    status: 'Upcoming',
    editorialBadges: ['Vrindavan', 'RERA Listed', 'Pre-Launch Price List'],
    featured: true,
    hot: false,
    upcoming: true,
    newLaunch: true,
    investmentOpportunity: true,
    reraApplicable: 'YES',
    reraNumber: 'UPRERAPRJ325884/06/2026',
    reraAuthorityUrl: 'https://www.up-rera.in/',
    possession: 'To be verified with the RERA authority',
    highlights: [
      'Uploaded price list: MVDA approved and RERA UPRERAPRJ325884/06/2026',
      'Uploaded price list: pre-launch BSP ₹9,797 per sq. ft and launch BSP ₹10,797 per sq. ft',
      'Uploaded price list: IFMS, IDC, EDC, FFC and car parking charges extra',
      'Flexi, special and construction-linked payment plans referenced',
    ],
    amenities: ['Security', 'Parking', 'Clubhouse'],
    floorPlans: [
      {
        configuration: 'Studio',
        superArea: '454-552 sq ft',
        price: 'From approx ₹44.56 lakh before other charges, floor-wise',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=75',
      },
      {
        configuration: '1 BHK',
        superArea: '800 sq ft',
        price: 'From approx ₹78.54 lakh before other charges, floor-wise',
        image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=900&q=75',
      },
      {
        configuration: '2 BHK',
        superArea: '1150 sq ft',
        price: 'From approx ₹1.13 crore before other charges, floor-wise',
        image: 'https://images.unsplash.com/photo-1600566752355-35792bedcfea?auto=format&fit=crop&w=900&q=75',
      },
    ],
    pricePlans: [
      {
        configuration: 'Studio apartments',
        area: '454-552 sq ft',
        startingPrice: 'From approx ₹44.56 lakh* before other charges',
        availability: 'Floor-wise price list available',
      },
      {
        configuration: '1 BHK',
        area: '800 sq ft',
        startingPrice: 'From approx ₹78.54 lakh* before other charges',
        availability: 'Floor-wise price list available',
      },
      {
        configuration: '2 BHK',
        area: '1150 sq ft',
        startingPrice: 'From approx ₹1.13 crore* before other charges',
        availability: 'Floor-wise price list available',
      },
    ],
    connectivity: [
      {
        category: 'Location',
        name: 'Surankh Road, Shri Dham Vrindavan, District Mathura, U.P.',
      },
    ],
    seoTitle: 'Krishna Galaxy Vrindavan Price List | Golden Leaf Properties',
    seoDescription:
      'Review Krishna Galaxy Vrindavan studio, 1 BHK and 2 BHK price-list information with Golden Leaf advisory.',
  },
  {
    id: 'proj-oman-masterplans',
    isDemo: false,
    name: 'Oman Residential and Commercial Opportunities',
    slug: 'oman-residential-commercial-opportunities',
    developerId: 'dev-oman-public-projects',
    locationId: 'loc-oman',
    propertyTypeIds: ['type-villas', 'type-commercial', 'type-land', 'type-penthouses'],
    headline: 'International residential, commercial, villa and land opportunities in Oman.',
    description:
      'Public Oman real-estate platforms describe city-scale opportunities such as Sultan Haitham City and A’Thuraya City, with villas, townhouses, apartments, commercial, retail, hospitality and mixed-use assets. Golden Leaf should verify local ownership eligibility and legal process for each buyer.',
    heroImage: omanImage,
    gallery: [
      {
        src: omanImage,
        alt: 'Oman city and waterfront real-estate context',
        caption: 'Oman international opportunity context',
        category: 'International',
      },
      {
        src: 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=1400&q=80',
        alt: 'Middle East city skyline context',
        caption: 'Mixed-use urban context',
        category: 'Commercial',
      },
    ],
    startingPrice: 'Price on Request',
    priceUpdatedAt: '2026-09-30',
    configuration: 'Villas, townhouses, apartments, serviced residences, commercial and hospitality assets',
    status: 'Upcoming',
    editorialBadges: ['Oman', 'International', 'Residential + Commercial'],
    featured: true,
    hot: false,
    upcoming: true,
    newLaunch: false,
    investmentOpportunity: true,
    reraApplicable: 'NO',
    reraReason: 'International opportunity. Indian RERA is not applicable; local Oman regulations and project documents apply.',
    possession: 'Project-wise',
    landArea: 'Sultan Haitham City and A’Thuraya City public master-plan references',
    highlights: [
      'Sultan Haitham City public source: 14.8 sq km total area and 20,000 units',
      'A’Thuraya City public source: 6.6 million sq m total area and diversified residential mix',
      'Residential, commercial, education, healthcare and hospitality opportunities publicly referenced',
      'Local ownership, taxation and freehold rules require specialist review',
    ],
    amenities: ['Landscaped Gardens', 'Business Lounge', 'Parking', 'Security', 'Walking Trails'],
    floorPlans: [],
    pricePlans: [
      {
        configuration: 'Oman master-plan opportunity',
        area: 'Project-wise',
        startingPrice: 'Price on Request',
        availability: 'International advisor verification required',
      },
    ],
    connectivity: [
      {
        category: 'Muscat',
        name: 'Public source describes strategic locations near Muscat city centre, airport and Greater Muscat growth areas',
      },
    ],
    seoTitle: 'Oman Residential and Commercial Projects | Golden Leaf Properties',
    seoDescription:
      'Explore Oman villas, apartments, commercial and land opportunities with Golden Leaf international advisory.',
  },
];

export const articles: Article[] = [
  {
    id: 'art-rera',
    title: 'How Golden Leaf Reviews RERA and Project Information',
    slug: 'rera-project-information-checklist',
    category: 'Buying Guides',
    excerpt:
      'A practical guide to reading project status, RERA fields, price freshness and verification badges before shortlisting.',
    author: 'Golden Leaf Editorial Desk',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Premium property discovery depends on disciplined information management. Every project page should separate verified facts from marketing material.',
      'Golden Leaf project records support RERA applicability, registration number, authority URL, last-updated price dates, administrator warnings and internal audit logs.',
      'When information is not yet verified, the website should say so clearly rather than filling the gap with unsupported claims.',
    ],
    faqs: [
      {
        question: 'Does this site claim a project is RERA approved automatically?',
        answer:
          'No. RERA fields are administrator controlled and unknown values remain visible in the admin workflow.',
      },
    ],
    relatedLocationIds: ['loc-dholera', 'loc-jewar'],
    relatedProjectIds: ['proj-dholera-reserve'],
    seoTitle: 'RERA and Project Information Checklist | Golden Leaf Properties',
    seoDescription:
      'Learn how Golden Leaf structures RERA, project verification and price freshness before publishing property pages.',
  },
  {
    id: 'art-second-homes',
    title: 'What Serious Buyers Should Ask Before Choosing a Second Home',
    slug: 'second-home-buyer-questions',
    category: 'Second Homes',
    excerpt:
      'A calm checklist for destination homes: access, usage, maintenance, permissions, management and exit assumptions.',
    author: 'Golden Leaf Advisory',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    image:
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Second-home decisions are not only about views and finishes. Buyers should understand access, ownership structure, maintenance, staffing, usage rules and local permissions.',
      'Golden Leaf location and project pages are designed to hold these details in editable CMS fields so advisors can keep discovery transparent.',
      'The best shortlist is usually small, relevant and supported by site visits instead of a long set of generic listings.',
    ],
    faqs: [
      {
        question: 'Should I rely only on brochure images?',
        answer:
          'No. Images are useful for shortlisting, but serious buyers should request current details, documentation and a site visit.',
      },
    ],
    relatedLocationIds: ['loc-goa', 'loc-dehradun', 'loc-uttarakhand'],
    relatedProjectIds: ['proj-goa-canopy', 'proj-dehradun-hillview'],
    seoTitle: 'Second Home Buyer Questions | Golden Leaf Properties',
    seoDescription:
      'Key questions to ask before buying a second home, villa or destination property in India.',
  },
  {
    id: 'art-growth-corridors',
    title: 'A Smarter Way to Evaluate Growth-Corridor Property',
    slug: 'growth-corridor-property-evaluation',
    category: 'Real Estate Investment',
    excerpt:
      'How to think about infrastructure-led property markets without relying on exaggerated appreciation promises.',
    author: 'Golden Leaf Research',
    publishedAt: '2026-09-22',
    updatedAt: '2026-09-22',
    image:
      'https://images.unsplash.com/photo-1486325212027-8081e485255e?auto=format&fit=crop&w=1400&q=80',
    body: [
      'Infrastructure-led markets can be compelling, but the quality of project documentation and buyer expectations matters.',
      'Golden Leaf avoids guaranteed-return language and supports CMS-created location pages that can cite verified infrastructure and connectivity updates.',
      'A good advisory process should explain holding period, liquidity, approvals, pricing freshness and site-level risks before a buyer commits.',
    ],
    faqs: [
      {
        question: 'Are growth-corridor returns guaranteed?',
        answer:
          'No. Buyers should avoid guaranteed-return language unless supported by legally reviewed documentation.',
      },
    ],
    relatedLocationIds: ['loc-dholera', 'loc-jewar'],
    relatedProjectIds: ['proj-jewar-district', 'proj-dholera-reserve'],
    seoTitle: 'Evaluate Growth-Corridor Property | Golden Leaf Properties',
    seoDescription:
      'A practical framework for reviewing growth-corridor property opportunities with disciplined due diligence.',
  },
];

export const team: TeamMember[] = [
  {
    id: 'team-advisory',
    name: 'Advisory Team',
    designation: 'Property Advisors',
    specialization: 'Project discovery, buyer consultation and site-visit coordination',
    bio: 'Individual advisor profiles can be added from the admin dashboard with photos, biographies, specializations and LinkedIn links.',
    image:
      'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=900&q=78',
  },
];

export const testimonials: Testimonial[] = [];

export const seedCmsData: CmsData = {
  developers,
  locations,
  propertyTypes,
  projects,
  articles,
  team,
  testimonials,
};

export const homepageSectionOrder = [
  'Premium Header',
  'Cinematic Hero',
  'Property Search',
  'Featured Opportunities',
  'Explore by Location',
  'New Launches',
  'Property Types',
  'Why Golden Leaf',
  'Developers',
  'Investment Opportunities',
  'Consultation CTA',
  'Testimonials',
  'Insights',
  'Final CTA',
  'Premium Footer',
];

export const leadStatuses = [
  'New',
  'Contacted',
  'Qualified',
  'Follow-up',
  'Site Visit Scheduled',
  'Site Visit Completed',
  'Negotiation',
  'Booked',
  'Lost',
  'Not Interested',
];

export const dataModelEntities = [
  'User/Admin',
  'Role',
  'Project',
  'Developer',
  'Location',
  'PropertyType',
  'Configuration',
  'PricePlan',
  'FloorPlan',
  'Amenity',
  'ProjectGallery',
  'ProjectDocument',
  'Lead',
  'LeadNote',
  'LeadActivity',
  'SiteVisit',
  'BlogPost',
  'BlogCategory',
  'Testimonial',
  'TeamMember',
  'SEORecord',
  'HomepageSection',
  'Media',
  'AuditLog',
];

export function findDeveloper(data: CmsData, idOrSlug: string) {
  return data.developers.find((developer) => developer.id === idOrSlug || developer.slug === idOrSlug);
}

export function findLocation(data: CmsData, idOrSlug: string) {
  return data.locations.find((location) => location.id === idOrSlug || location.slug === idOrSlug);
}

export function findPropertyType(data: CmsData, idOrSlug: string) {
  return data.propertyTypes.find((type) => type.id === idOrSlug || type.slug === idOrSlug);
}

export function findProject(data: CmsData, idOrSlug: string) {
  return data.projects.find((project) => project.id === idOrSlug || project.slug === idOrSlug);
}

export function findArticle(data: CmsData, idOrSlug: string) {
  return data.articles.find((article) => article.id === idOrSlug || article.slug === idOrSlug);
}

export function projectsForLocation(data: CmsData, locationIdOrSlug: string) {
  const location = findLocation(data, locationIdOrSlug);
  if (!location) return [];
  return data.projects.filter((project) => project.locationId === location.id && project.status !== 'Archived');
}

export function projectsForDeveloper(data: CmsData, developerIdOrSlug: string) {
  const developer = findDeveloper(data, developerIdOrSlug);
  if (!developer) return [];
  return data.projects.filter((project) => project.developerId === developer.id && project.status !== 'Archived');
}

export function projectsForPropertyType(data: CmsData, propertyTypeIdOrSlug: string) {
  const type = findPropertyType(data, propertyTypeIdOrSlug);
  if (!type) return [];
  return data.projects.filter(
    (project) => project.propertyTypeIds.includes(type.id) && project.status !== 'Archived',
  );
}

export function whatsappUrl(project?: Project, location?: Location) {
  const interest = project
    ? `${project.name} at ${location?.name ?? 'the selected location'}`
    : 'a Golden Leaf property consultation';
  const message = `Hello Golden Leaf Properties, I am interested in ${interest}. Please share project details and pricing.`;
  return `https://wa.me/${contactConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
