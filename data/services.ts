import type { LucideIcon } from "lucide-react";
import {
  Boxes,
  Building2,
  CalendarDays,
  Camera,
  ClipboardList,
  Coins,
  Droplets,
  Gift,
  GlassWater,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Megaphone,
  PackageCheck,
  PartyPopper,
  Printer,
  Recycle,
  ShoppingBag,
  TrendingUp,
  Wheat,
} from "lucide-react";

/* -------------------------------------------------------------------------- */
/*  Categories                                                                */
/* -------------------------------------------------------------------------- */

export const SERVICE_CATEGORIES = [
  "Business",
  "Marketing & Media",
  "Products & Manufacturing",
  "Agriculture",
  "Social & Community",
] as const;

export type ServiceCategory = (typeof SERVICE_CATEGORIES)[number];

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type Service = {
  id: string;
  number: string;
  title: string;
  category: ServiceCategory;
  /** Short teaser used on the service card. */
  shortDescription: string;
  /** Punchy multi-line headline shown at the top of the detail modal. */
  tagline: string;
  /** Full description used in the detail modal. */
  description: string;
  /** Lucide icon name (kept as a string so the data file stays serialisable). */
  icon: string;
  image: string;
  imageAlt: string;
  /** "What we provide" checklist in the modal. */
  provides: string[];
  /** Benefits list in the modal. */
  benefits: string[];
  /**
   * Optional service-specific enquiry sentence. When omitted, a generic
   * "Please share more details, pricing and available options." line is used.
   */
  enquiryIntro?: string;
};

/* -------------------------------------------------------------------------- */
/*  Icon registry                                                             */
/* -------------------------------------------------------------------------- */

export const serviceIcons: Record<string, LucideIcon> = {
  Boxes,
  Building2,
  CalendarDays,
  Camera,
  ClipboardList,
  Coins,
  Droplets,
  Gift,
  GlassWater,
  GraduationCap,
  Handshake,
  HeartHandshake,
  Megaphone,
  PackageCheck,
  PartyPopper,
  Printer,
  Recycle,
  ShoppingBag,
  TrendingUp,
  Wheat,
};

export function getServiceIcon(icon: string): LucideIcon {
  return serviceIcons[icon] ?? Building2;
}

const unsplash = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1400&q=80`;

/* -------------------------------------------------------------------------- */
/*  Services (source of truth — do not duplicate this data elsewhere)         */
/* -------------------------------------------------------------------------- */

export const services: Service[] = [
  /* ---------------------------- Business -------------------------------- */
  {
    id: "b2b-b2c-business-solutions",
    number: "01",
    title: "B2B & B2C Business Solutions",
    category: "Business",
    shortDescription:
      "Connect with the right business partners, dealers and customers through structured B2B and B2C solutions.",
    tagline: "Connect businesses.\nFind the right partners.\nBuild lasting opportunities.",
    description:
      "We help businesses reach other businesses and end customers through practical connection and promotion support. Whether you are launching a product, entering a new market or looking for reliable partners, BADHRALEADS helps structure the opportunity and start the right conversation.",
    icon: "Handshake",
    image: unsplash("photo-1521737604893-d14cc237f11d"),
    imageAlt: "Business professionals shaking hands after a successful meeting",
    provides: [
      "B2B connection and partner outreach",
      "B2C promotion support",
      "Market and opportunity identification",
      "Business introduction coordination",
    ],
    benefits: [
      "Reach relevant businesses and buyers",
      "Structured approach to new partnerships",
      "Save time on discovery and outreach",
    ],
  },
  {
    id: "business-development",
    number: "02",
    title: "Business Development",
    category: "Business",
    shortDescription:
      "Turn ideas into structured opportunities with planning, outreach and growth support.",
    tagline: "Shape the idea.\nStructure the plan.\nGrow the opportunity.",
    description:
      "BADHRALEADS supports businesses that want to grow with a clear, practical approach. From refining an idea to identifying opportunities and starting conversations with the right people, we help you move a business idea forward with direction and structure.",
    icon: "TrendingUp",
    image: unsplash("photo-1522071820081-009f0129c71c"),
    imageAlt: "Business team collaborating around a table during a development meeting",
    provides: [
      "Business idea structuring",
      "Opportunity identification",
      "Growth and promotion planning",
      "Ongoing development support",
    ],
    benefits: [
      "Clear direction for your business idea",
      "Practical, step-by-step support",
      "A dependable team to work with",
    ],
  },
  {
    id: "project-handling",
    number: "03",
    title: "Project Handling",
    category: "Business",
    shortDescription:
      "End-to-end coordination of your projects — planning, execution and follow-through.",
    tagline: "Plan clearly.\nExecute properly.\nDeliver on time.",
    description:
      "Managing a project across teams, vendors and deadlines can be complex. BADHRALEADS handles the coordination end to end, so your project moves forward smoothly with clear communication at every stage.",
    icon: "ClipboardList",
    image: unsplash("photo-1454165804606-c3d57bc86b40"),
    imageAlt: "Project planning session with notes, charts and a laptop on a desk",
    provides: [
      "Project planning and scheduling",
      "Vendor and team coordination",
      "Progress tracking and reporting",
      "End-to-end execution support",
    ],
    benefits: [
      "Single point of contact for your project",
      "Transparent communication throughout",
      "Reliable follow-through on deliverables",
    ],
  },
  {
    id: "graduates-part-time-opportunities",
    number: "04",
    title: "Graduates for Part-Time Opportunities",
    category: "Business",
    shortDescription:
      "Fresh graduate talent matched with flexible part-time roles and project opportunities.",
    tagline: "Fresh talent.\nFlexible roles.\nReal experience.",
    description:
      "We connect graduates with businesses that need support on a part-time or project basis. It gives students and fresh graduates real work experience while giving businesses access to motivated, affordable support.",
    icon: "GraduationCap",
    image: unsplash("photo-1523240795612-9a054b0db644"),
    imageAlt: "Group of graduates collaborating on a part-time project",
    provides: [
      "Graduate talent coordination",
      "Part-time role matching",
      "Project-based support staffing",
      "Ongoing coordination with both sides",
    ],
    benefits: [
      "Access motivated, fresh talent",
      "Flexible engagement options",
      "Practical experience for graduates",
    ],
  },

  /* ------------------------- Marketing & Media --------------------------- */
  {
    id: "digital-marketing",
    number: "05",
    title: "Digital Marketing",
    category: "Marketing & Media",
    shortDescription:
      "Build visibility, reach the right audience and generate real business opportunities.",
    tagline: "Grow your brand.\nReach the right audience.\nGenerate business opportunities.",
    description:
      "Our digital marketing support helps your business get noticed by the people who matter. From social media to promotions and campaigns, we plan and execute activity that builds visibility and keeps your brand in front of the right audience.",
    icon: "Megaphone",
    image: unsplash("photo-1460925895917-afdab827c52f"),
    imageAlt: "Digital marketing analytics dashboard on a modern workspace desk",
    provides: [
      "Social Media Marketing",
      "Digital Promotions",
      "Lead Generation",
      "Brand Promotion",
      "Online Campaign Support",
    ],
    benefits: [
      "Reach the right audience consistently",
      "Build brand visibility over time",
      "Generate enquiries and opportunities",
    ],
  },
  {
    id: "photography-videography",
    number: "06",
    title: "Photography & Videography",
    category: "Marketing & Media",
    shortDescription:
      "Professional photos and videos that present your brand, product or event at its best.",
    tagline: "Capture the moment.\nShowcase your brand.\nTell your story.",
    description:
      "Good visuals change how people see your business. Our photography and videography services cover products, events, corporate functions and promotional content — delivered in usable, professional formats.",
    icon: "Camera",
    image: unsplash("photo-1452587925148-ce544e77e70d"),
    imageAlt: "Professional camera set up for a photo and video shoot",
    provides: [
      "Event photography and videography",
      "Product and brand photography",
      "Corporate and promotional shoots",
      "Edited, ready-to-use deliverables",
    ],
    benefits: [
      "Professional visuals for every channel",
      "Consistent brand presentation",
      "Content you can reuse across marketing",
    ],
    enquiryIntro: "Please share more details, packages and pricing.",
  },
  {
    id: "printing-offset-services",
    number: "07",
    title: "Printing & Offset Services",
    category: "Marketing & Media",
    shortDescription:
      "Offset and digital printing for marketing material, packaging, stationery and more.",
    tagline: "Print sharp.\nPrint on time.\nPrint at any scale.",
    description:
      "From business cards and brochures to flyers, catalogues and large-format material, we handle offset and digital printing with consistent quality — suitable for small runs and bulk orders alike.",
    icon: "Printer",
    image: unsplash("photo-1601924994987-69e26d50dc26"),
    imageAlt: "Commercial printing press producing printed material",
    provides: [
      "Offset printing for bulk orders",
      "Digital printing for short runs",
      "Marketing collateral and stationery",
      "Large-format and custom print jobs",
    ],
    benefits: [
      "Consistent colour and finish quality",
      "Suitable for small and bulk quantities",
      "One point of contact for all print needs",
    ],
    enquiryIntro: "Please share more details, available options and pricing.",
  },
  {
    id: "event-organising",
    number: "08",
    title: "Event Organising",
    category: "Marketing & Media",
    shortDescription:
      "Corporate events, launches, activations and celebrations — planned and managed end to end.",
    tagline: "Plan the event.\nManage the details.\nDeliver the experience.",
    description:
      "We organise and manage events end to end — from concept and venue coordination to on-ground execution. Whether it is a corporate meet, product launch, workshop or celebration, BADHRALEADS keeps every detail on track.",
    icon: "PartyPopper",
    image: unsplash("photo-1511795409834-ef04bbd61622"),
    imageAlt: "Professional event venue set up with stage lighting and seating",
    provides: [
      "Corporate events and conferences",
      "Product launches and brand activations",
      "Workshops, meets and celebrations",
      "Venue, vendor and on-ground coordination",
    ],
    benefits: [
      "A single team managing every detail",
      "Coordinated vendors and timelines",
      "A smooth experience for your guests",
    ],
    enquiryIntro:
      "Please share more details about your event services, pricing and available options.",
  },

  /* -------------------- Products & Manufacturing ------------------------- */
  {
    id: "gold-silver-coin-making",
    number: "09",
    title: "Gold & Silver Coin Making",
    category: "Products & Manufacturing",
    shortDescription:
      "Custom-minted gold and silver coins for occasions, branding and corporate gifting.",
    tagline: "Custom coins.\nPremium finish.\nMade to remember.",
    description:
      "We produce customised gold and silver coins for festive gifting, corporate milestones, launches and special occasions — with options for custom designs, branding and presentation packaging.",
    icon: "Coins",
    image: unsplash("photo-1610375461246-83df859d849d"),
    imageAlt: "Close-up of premium gold coins with a polished finish",
    provides: [
      "Custom gold and silver coins",
      "Logo and design embossing",
      "Presentation packaging options",
      "Bulk and single-quantity orders",
    ],
    benefits: [
      "Premium keepsakes and gifts",
      "Customisable for brand or occasion",
      "Suitable for corporate and personal orders",
    ],
  },
  {
    id: "gifts-hampers",
    number: "10",
    title: "Gifts & Hampers",
    category: "Products & Manufacturing",
    shortDescription:
      "Curated corporate gifts and festive hampers, personalised for your brand and budget.",
    tagline: "Curated gifts.\nPersonalised hampers.\nPerfectly presented.",
    description:
      "From festive hampers to corporate gifting, we curate and customise gift packages that suit your occasion and budget — including branding, personalisation and bulk orders for teams and clients.",
    icon: "Gift",
    image: unsplash("photo-1549465220-1a8b9238cd48"),
    imageAlt: "Premium gift hamper neatly arranged with ribbon and packaging",
    provides: [
      "Customised corporate gifts",
      "Festive and occasion hampers",
      "Brand personalisation and packaging",
      "Bulk orders for teams and clients",
    ],
    benefits: [
      "Gifts matched to your occasion and budget",
      "Professional, consistent presentation",
      "Simple bulk ordering support",
    ],
  },
  {
    id: "thermal-scoping-boxes",
    number: "11",
    title: "Thermal Scoping Boxes",
    category: "Products & Manufacturing",
    shortDescription:
      "Insulated thermal boxes designed to protect temperature-sensitive goods in transit.",
    tagline: "Protect the contents.\nMaintain the temperature.\nDeliver safely.",
    description:
      "Our thermal scoping boxes are built for temperature-sensitive shipments — helping food, pharma and specialty products stay protected through transit and last-mile delivery.",
    icon: "PackageCheck",
    image: unsplash("photo-1586528116311-ad8dd3c8310d"),
    imageAlt: "Insulated packaging boxes ready for temperature-sensitive shipping",
    provides: [
      "Insulated thermal packaging boxes",
      "Multiple size options",
      "Bulk manufacturing orders",
      "Suitable for food and pharma transit",
    ],
    benefits: [
      "Better protection for sensitive goods",
      "Consistent build quality across orders",
      "Sizes matched to your product",
    ],
  },
  {
    id: "corrugated-boxes",
    number: "12",
    title: "Corrugated Boxes",
    category: "Products & Manufacturing",
    shortDescription:
      "Durable corrugated packaging in custom sizes for shipping, retail and storage.",
    tagline: "Strong packaging.\nCustom sizes.\nBuilt for transit.",
    description:
      "We manufacture corrugated boxes in a range of grades and sizes, customised to your product so goods reach their destination safely — suitable for shipping, retail display and storage.",
    icon: "Boxes",
    image: unsplash("photo-1565610222536-ef125c59da2e"),
    imageAlt: "Stacked corrugated cardboard boxes in a warehouse",
    provides: [
      "Custom-size corrugated boxes",
      "Single and multi-layer grades",
      "Branding and print options",
      "Bulk manufacturing runs",
    ],
    benefits: [
      "Packaging sized to your product",
      "Reliable protection in transit",
      "Cost-effective bulk production",
    ],
  },
  {
    id: "eco-friendly-paper-bags",
    number: "13",
    title: "Eco-Friendly Paper Bags",
    category: "Products & Manufacturing",
    shortDescription:
      "Sustainable paper bags with custom printing — a responsible packaging alternative.",
    tagline: "Sustainable packaging.\nCustom printed.\nBuilt to carry your brand.",
    description:
      "Our eco-friendly paper bags give retail and delivery businesses a sustainable packaging option — available in custom sizes with logo and brand printing.",
    icon: "ShoppingBag",
    image: unsplash("photo-1607349913338-fca6f7fc42d0"),
    imageAlt: "Eco-friendly paper bags arranged for retail packaging",
    provides: [
      "Custom-size paper bags",
      "Logo and brand printing",
      "Multiple paper grades",
      "Bulk manufacturing orders",
    ],
    benefits: [
      "Sustainable packaging choice",
      "Brand visibility on every bag",
      "Sizes and grades for every use",
    ],
  },
  {
    id: "glass-jars-bottles",
    number: "14",
    title: "Glass Jars & Bottles",
    category: "Products & Manufacturing",
    shortDescription:
      "Premium glass jars and bottles in multiple shapes and sizes for product packaging.",
    tagline: "Premium glass.\nMultiple formats.\nReady for your product.",
    description:
      "We supply glass jars and bottles in a variety of shapes, sizes and closures — suited to food, beverage, gifting, decor and specialty product packaging.",
    icon: "GlassWater",
    image: unsplash("photo-1600857062241-98e5dba7f214"),
    imageAlt: "Premium glass jars and bottles arranged for product packaging",
    provides: [
      "Assorted jar and bottle shapes",
      "Multiple capacity options",
      "Closures and cap combinations",
      "Bulk supply orders",
    ],
    benefits: [
      "Premium look for shelf-ready products",
      "Options matched to your contents",
      "Reliable supply for repeat orders",
    ],
  },
  {
    id: "plastic-bottles",
    number: "15",
    title: "Plastic Bottles",
    category: "Products & Manufacturing",
    shortDescription:
      "Versatile plastic bottles in varied shapes, sizes and colours for everyday products.",
    tagline: "Practical packaging.\nConsistent quality.\nScaled supply.",
    description:
      "Our plastic bottles cover a wide range of shapes, sizes and neck finishes for personal care, household, food and industrial products — with bulk supply for growing brands.",
    icon: "Droplets",
    image: unsplash("photo-1560769629-975ec94e6a86"),
    imageAlt: "Row of clean plastic bottles used for product packaging",
    provides: [
      "Assorted shapes and capacities",
      "Colour and finish options",
      "Matching closures available",
      "Bulk manufacturing supply",
    ],
    benefits: [
      "Cost-effective everyday packaging",
      "Consistent quality across batches",
      "Formats matched to your product line",
    ],
  },
  {
    id: "pet-bottles",
    number: "16",
    title: "PET Bottles",
    category: "Products & Manufacturing",
    shortDescription:
      "Lightweight, shatter-resistant PET bottles for beverages, edibles and personal care.",
    tagline: "Lightweight bottles.\nClear presentation.\nBuilt to scale.",
    description:
      "PET bottles are lightweight, transparent and impact-resistant — an excellent choice for beverages, edible oils, sauces and personal care products. We supply them in multiple capacities for bulk orders.",
    icon: "Recycle",
    image: unsplash("photo-1616118132534-381148898bb4"),
    imageAlt: "Clear PET bottles lined up for beverage packaging",
    provides: [
      "Multiple capacities and neck finishes",
      "Clear and tinted options",
      "Suitable for beverages and edibles",
      "Bulk manufacturing supply",
    ],
    benefits: [
      "Lightweight and durable",
      "Transparent, shelf-friendly presentation",
      "Scalable supply for production runs",
    ],
  },

  /* ----------------------------- Agriculture ---------------------------- */
  {
    id: "farming-solutions",
    number: "17",
    title: "Farming Solutions",
    category: "Agriculture",
    shortDescription:
      "Practical support for modern farming — planning, resources and better yields.",
    tagline: "Plan better.\nGrow smarter.\nHarvest with confidence.",
    description:
      "We support farmers and agri-businesses with practical solutions around cultivation planning, resources and modern practices — helping improve efficiency and get more from every season.",
    icon: "Wheat",
    image: unsplash("photo-1500937386664-56d1dfef3854"),
    imageAlt: "Green agricultural field with healthy crops under open sky",
    provides: [
      "Cultivation planning support",
      "Modern farming practice guidance",
      "Resource and input coordination",
      "Agri-business support",
    ],
    benefits: [
      "Practical, season-ready guidance",
      "Better planning and efficiency",
      "Support for farms of different scales",
    ],
  },

  /* -------------------------- Social & Community ------------------------ */
  {
    id: "charity-donations",
    number: "18",
    title: "Charity & Donations",
    category: "Social & Community",
    shortDescription:
      "Contribute to meaningful causes through transparent donation and community initiatives.",
    tagline: "Give with purpose.\nSupport the community.\nCreate real impact.",
    description:
      "BADHRALEADS facilitates charity and donation drives for individuals and businesses who want to give back. We help coordinate contributions and community initiatives with clarity and care.",
    icon: "HeartHandshake",
    image: unsplash("photo-1593113598332-cd288d649433"),
    imageAlt: "Volunteers organising donated goods for a community charity drive",
    provides: [
      "Donation drive coordination",
      "Cause and community outreach",
      "Business gifting for social impact",
      "Contribution tracking support",
    ],
    benefits: [
      "A simple way to give back",
      "Clarity on where contributions go",
      "Support for individual and business donors",
    ],
  },
];

/** Simple helper lookups (single source of truth). */
export const getServiceById = (id: string): Service | undefined =>
  services.find((service) => service.id === id);

export const getServicesByCategory = (
  category: ServiceCategory | "All"
): Service[] => (category === "All" ? services : services.filter((s) => s.category === category));

export default services;

