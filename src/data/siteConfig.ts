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
  mapsUrl: string;
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
  mapsUrl:
    "https://www.google.com/maps/search/?api=1&query=Ganapathipuram+Avalur+Walajabad+Kanchipuram+Tamil+Nadu",
};
