export interface BusinessInfo {
  name: string;
  shortName: string;
  tagline: string;
  descriptor: string;
  proprietor: string;
  professionalTitle: string;
  phone: string;
  phoneRaw: string;
  whatsappNumber: string;
  whatsappRaw: string;
  whatsappUrl: string;
  addressLines: string[];
  fullAddress: string;
  locality: string;
  district: string;
  region: string;
  country: string;
  mapsUrl: string;
  url: string;
  domain: string;
  origin: string;
  title: string;
  description: string;
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
}

export const siteConfig: BusinessInfo = {
  name: "RVP ANNA CONSTRUCTION & TRANSPORT",
  shortName: "RVP ANNA",
  tagline: "BUILD WITH CLARITY. MOVE WITH CONFIDENCE.",
  descriptor: "Civil Engineer · Construction, Planning, Materials & Transport",
  proprietor: "P Arunachalam",
  professionalTitle: "Civil Engineer · Proprietor",
  phone: "+91 91765 13973",
  phoneRaw: "+919176513973",
  whatsappNumber: "+91 91765 13973",
  whatsappRaw: "919176513973",
  whatsappUrl: "https://wa.me/919176513973",
  addressLines: [
    "Ganapathipuram Avalur (Pt)",
    "Walajabad (Tk)",
    "Kanchipuram District",
    "Tamil Nadu, India",
  ],
  fullAddress:
    "Ganapathipuram Avalur (Pt), Walajabad (Tk), Kanchipuram District, Tamil Nadu, India",
  locality: "Walajabad",
  district: "Kanchipuram District",
  region: "Tamil Nadu",
  country: "IN",
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ganapathipuram+Avalur+Walajabad+Kanchipuram+Tamil+Nadu",
  url: "https://www.rvpannaconstructionandtransport.com/",
  domain: "www.rvpannaconstructionandtransport.com",
  origin: "https://www.rvpannaconstructionandtransport.com",
  title: "RVP Anna Construction & Transport | Walajabad, Kanchipuram",
  description:
    "Civil engineering construction, architectural 2D and 3D planning, elevation design, building material supply, labour coordination, and site transport in Walajabad and Kanchipuram.",
  ogTitle: "RVP Anna Construction & Transport | Walajabad, Kanchipuram",
  ogDescription:
    "Civil engineering construction, architectural 2D and 3D planning, elevation design, building material supply, labour coordination, and site transport in Walajabad and Kanchipuram.",
  ogImage: "https://www.rvpannaconstructionandtransport.com/rvp-anna-logo.png",
};

export const businessStructuredData = {
  "@context": "https://schema.org",
  "@type": ["HomeAndConstructionBusiness", "GeneralContractor"],
  "@id": "https://www.rvpannaconstructionandtransport.com/#business",
  name: siteConfig.name,
  alternateName: siteConfig.shortName,
  url: siteConfig.url,
  logo: siteConfig.ogImage,
  image: siteConfig.ogImage,
  description: siteConfig.description,
  telephone: siteConfig.phoneRaw,
  founder: {
    "@type": "Person",
    name: siteConfig.proprietor,
    jobTitle: siteConfig.professionalTitle,
  },
  address: {
    "@type": "PostalAddress",
    streetAddress: "Ganapathipuram Avalur (Pt), Walajabad (Tk)",
    addressLocality: siteConfig.locality,
    addressRegion: siteConfig.region,
    addressCountry: siteConfig.country,
  },
  areaServed: [
    {
      "@type": "AdministrativeArea",
      name: "Walajabad",
    },
    {
      "@type": "AdministrativeArea",
      name: "Kanchipuram District",
    },
    {
      "@type": "AdministrativeArea",
      name: "Tamil Nadu",
    },
  ],
  knowsAbout: [
    "Civil Construction Work",
    "2D House Plan Layout",
    "3D Elevation & Modeling",
    "Building Material Supply",
    "Skilled Construction Labour",
    "Material Transport & Site Logistics",
  ],
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Construction & Transport Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Civil Construction",
          description:
            "Complete building construction from foundation footings, structural columns and beams, to brickwork and roof slab casting.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "2D Plan",
          description:
            "Architectural 2D layout planning and dimensional drawings for residential and commercial builds.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "3D Plan",
          description: "3D spatial modeling and visual elevation planning before site execution.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Elevation",
          description:
            "Front facade and exterior elevation design balancing modern lines with weather durability.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Material Contract",
          description:
            "Direct site supply of essential civil construction materials including TMT steel, cement, M-sand, Jelly gravel aggregate, and AAC blocks.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Labour Contract",
          description:
            "Experienced masons, bar benders, centering carpenters, and helper teams with on-site engineering supervision.",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Transport",
          description:
            "Dedicated transport support delivering key construction supplies and materials directly to job sites in Walajabad and Kanchipuram.",
        },
      },
    ],
  },
};
