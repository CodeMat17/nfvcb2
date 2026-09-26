export type NavLink = { label: string; href: string; desc?: string };
export type NavGroup = { label: string; href: string; links: NavLink[] };

export const navGroups: NavGroup[] = [
  {
    label: "About",
    href: "/about",
    links: [
      { label: "About the Board", href: "/about", desc: "Mandate, mission and three decades of regulation" },
      { label: "Vision & Goals", href: "/about/vision", desc: "Seven strategic goals guiding our operations" },
      { label: "Our Philosophy", href: "/about#philosophy", desc: "Principles guiding film classification" },
      { label: "Management Team", href: "/about/management", desc: "Leadership of the Board and the Federal Government" },
      { label: "Executive Director", href: "/about/management/executive-director", desc: "Office of the Director-General" },
      { label: "Departments", href: "/about/departments", desc: "Ten departments delivering the mandate" },
      { label: "Zones & Centres", href: "/about/zones", desc: "Head office, six zones and state centres" },
    ],
  },
  {
    label: "Services",
    href: "/services",
    links: [
      { label: "All Services", href: "/services", desc: "Classification, licensing and downloadable forms" },
      { label: "Licence Categories", href: "/services/licensing", desc: "Distribution, exhibition, premises and online" },
      { label: "Downloadable Forms", href: "/services/forms", desc: "Every form in PDF format" },
      { label: "RevOP Payment Guide", href: "/services/payments", desc: "Generate a bill and pay in three channels" },
    ],
  },
  {
    label: "Regulation",
    href: "/policy",
    links: [
      { label: "Our Policy", href: "/policy", desc: "Censorship criteria and the 2025 regulations" },
      { label: "Classification & Fees", href: "/classification", desc: "Symbols, fee schedule and online classification" },
      { label: "Law Enforcement", href: "/law-enforcement", desc: "Infringements, penalties and enforcement" },
      { label: "Service Charter", href: "/service-charter", desc: "Our service standards to every stakeholder" },
      { label: "8-Point Action Plan", href: "/action-plan", desc: "Strategic blueprint for the industry" },
    ],
  },
  {
    label: "Industry",
    href: "/associations",
    links: [
      { label: "Associations & Guilds", href: "/associations", desc: "26 registered professional bodies" },
      { label: "Approved Movies", href: "/approved-movies", desc: "Monthly register of classified titles" },
      { label: "News & Press Releases", href: "/news", desc: "Announcements and regulatory updates" },
      { label: "FAQ", href: "/faq", desc: "Answers on classification and licensing" },
      { label: "Contact the Board", href: "/contact", desc: "Offices, emails and enquiry channels" },
    ],
  },
];

export const footerColumns = [
  {
    title: "About NFVCB",
    links: [
      { label: "Our History", href: "/about" },
      { label: "Vision & Goals", href: "/about/vision" },
      { label: "Our Philosophy", href: "/about#philosophy" },
      { label: "Management Team", href: "/about/management" },
      { label: "Departments", href: "/about/departments" },
      { label: "Zones & Centres", href: "/about/zones" },
    ],
  },
  {
    title: "Services",
    links: [
      { label: "Film Classification", href: "/classification" },
      { label: "Licensing", href: "/services/licensing" },
      { label: "Downloadable Forms", href: "/services/forms" },
      { label: "RevOP Payments", href: "/services/payments" },
      { label: "Associations & Guilds", href: "/associations" },
      { label: "Approved Movies", href: "/approved-movies" },
    ],
  },
  {
    title: "Regulation",
    links: [
      { label: "Our Policy", href: "/policy" },
      { label: "Law Enforcement", href: "/law-enforcement" },
      { label: "Service Charter", href: "/service-charter" },
      { label: "8-Point Action Plan", href: "/action-plan" },
      { label: "News & Press Releases", href: "/news" },
      { label: "FAQ", href: "/faq" },
      { label: "Contact", href: "/contact" },
    ],
  },
];
