export type Licence = {
  name: string;
  desc: string;
  fee: string;
  meta: { label: string; value: string }[];
};

export type LicenceCategory = {
  id: string;
  title: string;
  blurb: string;
  licences: Licence[];
};

const processing = (v: string) => ({ label: "Processing Fee", value: v });
const capital = (v: string) => ({ label: "Min. Share Capital", value: v });
const seating = (v: string) => ({ label: "Seating", value: v });

export const licenceCategories: LicenceCategory[] = [
  {
    id: "distributors",
    title: "Distributors Licence",
    blurb: "For companies distributing and marketing films and video works, from a single Local Government Area to the whole federation.",
    licences: [
      { name: "National Distributor", desc: "Licensed to distribute and market films and video works across the entire country through physical and digital channels.", fee: "₦5,000,000", meta: [capital("₦5,000,000"), processing("₦50,000")] },
      { name: "Regional Distributor", desc: "Licensed to distribute and market films and video works within a single State or defined geo-political zone.", fee: "₦3,500,000", meta: [capital("₦3,000,000"), processing("₦50,000")] },
      { name: "Suburban / State Distributor", desc: "Licensed to distribute and market films and video works in suburban and state-level markets.", fee: "₦2,500,000", meta: [processing("₦50,000")] },
      { name: "Community / LGA Distributor", desc: "Licensed to distribute and market films and video works within a specific community or Local Government Area.", fee: "₦1,000,000", meta: [processing("₦50,000")] },
      { name: "Online Distributor (YouTube)", desc: "Licensed to distribute and market films and video works via YouTube and related online platforms.", fee: "₦1,000,000", meta: [processing("₦50,000")] },
    ],
  },
  {
    id: "exhibitors",
    title: "Exhibitors Licence",
    blurb: "For incorporated companies conducting film exhibition activities, scaled by geographic reach.",
    licences: [
      { name: "National Exhibitor", desc: "For companies seeking to conduct film exhibition activities across multiple States within Nigeria.", fee: "₦5,000,000", meta: [capital("₦5,000,000"), processing("₦50,000")] },
      { name: "Regional Exhibitor", desc: "For companies seeking to conduct film exhibition within a single State or defined region of Nigeria.", fee: "₦3,500,000", meta: [capital("₦3,000,000"), processing("₦50,000")] },
      { name: "Suburban / State Exhibitor", desc: "For companies seeking to exhibit films in suburban, semi-urban, and peri-urban areas, promoting regulated film access in developing communities.", fee: "₦2,500,000", meta: [processing("₦50,000")] },
      { name: "Community / LGA Exhibitor", desc: "For duly registered companies seeking to conduct film exhibition within a specific community or Local Government Area.", fee: "₦1,000,000", meta: [capital("₦1,000,000"), processing("₦50,000")] },
    ],
  },
  {
    id: "premises",
    title: "Exhibitors Premises Licence",
    blurb: "Licences the physical venue itself — from a rural community cinema to a drive-in — against seating capacity and location.",
    licences: [
      { name: "Community Exhibition Premises", desc: "For licensed exhibitors establishing and operating a Community Cinema within a rural community under NFVCB oversight.", fee: "₦150,000", meta: [seating("Up to 100 seats"), processing("₦10,000")] },
      { name: "Major Hall", desc: "Located in cosmopolitan areas with a high level of public infrastructure and accessibility.", fee: "₦250,000", meta: [seating("201 seats and above"), processing("₦10,000")] },
      { name: "Medium Hall", desc: "Located in urban areas with a medium level of public infrastructure.", fee: "₦200,000", meta: [seating("101 – 200 seats"), processing("₦10,000")] },
      { name: "Small Hall", desc: "Located in suburban areas with a relatively lower level of public infrastructure.", fee: "₦150,000", meta: [seating("1 – 100 seats"), processing("₦10,000")] },
      { name: "Drive-In Cinema", desc: "Located in designated open spaces including rural, sub-urban, or semi-urban communities, suitable for vehicular-based exhibition.", fee: "₦350,000", meta: [seating("Subject to NFVCB approval"), processing("₦10,000")] },
      { name: "Mobile Cinema (Premises)", desc: "A movable or temporary exhibition structure designed for flexible operation across approved locations.", fee: "₦350,000", meta: [seating("Subject to NFVCB approval"), processing("₦10,000")] },
    ],
  },
  {
    id: "mobile",
    title: "Mobile Exhibition Licence",
    blurb: "For operators taking cinema to audiences — per hall, or across a region or the nation.",
    licences: [
      { name: "Mobile Exhibition (Per Hall)", desc: "For licensed exhibitors conducting mobile film exhibition at approved venues. Licensed per hall or premises on a quarterly basis.", fee: "₦350,000 per hall", meta: [processing("₦10,000 per hall")] },
      { name: "Regional Mobile Exhibitor", desc: "For incorporated companies conducting mobile film exhibition within a single State or defined region of Nigeria.", fee: "₦5,000,000", meta: [capital("₦3,000,000"), processing("₦50,000")] },
      { name: "National Mobile Exhibitor", desc: "For incorporated companies conducting mobile film exhibition across multiple States within Nigeria.", fee: "₦10,000,000", meta: [capital("₦5,000,000"), processing("₦50,000")] },
    ],
  },
  {
    id: "online",
    title: "Online Exhibition Licence",
    blurb: "For streaming platforms, aggregators, start-ups and YouTube operators reaching Nigerian audiences online.",
    licences: [
      { name: "Multi-National Operator", desc: "Large international streaming platforms operating across multiple jurisdictions and engaging Nigerian audiences online.", fee: "₦200,000,000", meta: [capital("₦5,000,000"), processing("₦50,000")] },
      { name: "Medium Operator / Aggregator", desc: "Aggregators and smaller value-added service providers distributing digital film content online in Nigeria.", fee: "₦25,000,000", meta: [capital("₦5,000,000"), processing("₦50,000")] },
      { name: "Small Platform / Start-up", desc: "Small online platforms and start-ups seeking to legally exhibit or stream film content to Nigerian audiences.", fee: "₦5,000,000", meta: [capital("₦5,000,000"), processing("₦50,000")] },
      { name: "YouTube Operator", desc: "Operators distributing film and video content primarily via YouTube to Nigerian audiences.", fee: "₦1,000,000", meta: [processing("₦50,000")] },
    ],
  },
];

export const renewalNote =
  "Licences for Exhibitors and Distributors are renewable annually. Renewal before expiry attracts a fee of 20% of the new licence fee. Renewal after expiry attracts 50% of the new licence fee. Exhibition Premises licences renew at the same rate as the original licence fee.";

export const paymentNote =
  "All payments must be made via the RevOP portal (the official Federal Government revenue payment platform). Keep a printout of your payment receipt and obtain an NFVCB official receipt. Payments made outside RevOP will not be accepted.";

export type FormGroup = {
  category: string;
  forms: { title: string; file: string }[];
};

const FORMS_DIR = "/forms/downloadable";

export const formGroups: FormGroup[] = [
  {
    category: "Classification",
    forms: [
      {
        title: "Application for Censorship and Approval for Exhibition",
        file: `${FORMS_DIR}/Application for classification and approval for exhibition.pdf`,
      },
      {
        title: "Application for Exemption from Censorship",
        file: `${FORMS_DIR}/Application for exemption.pdf`,
      },
      {
        title: "Application for Registration of Film/Video Work",
        file: `${FORMS_DIR}/Application for the registration of film and video work.pdf`,
      },
    ],
  },
  {
    category: "Licensing",
    forms: [
      {
        title: "Application for License as a Distributor/Exhibitor",
        file: `${FORMS_DIR}/Application for distributor and exhibitor.pdf`,
      },
      {
        title: "Application for License of Premises",
        file: `${FORMS_DIR}/Application for license of premises.pdf`,
      },
    ],
  },
  {
    category: "Permits",
    forms: [
      {
        title: "Application for Exportation of Films and Video Works",
        file: `${FORMS_DIR}/Application for exportation.pdf`,
      },
      { title: "Notice of Appeal", file: `${FORMS_DIR}/Noticeofappeal.pdf` },
    ],
  },
  {
    category: "Reference",
    forms: [
      { title: "Industry Information", file: `${FORMS_DIR}/industry_information.pdf` },
      {
        title: "National Film and Video Censors Board Act",
        file: `${FORMS_DIR}/NFVCB Act CAP N40.pdf`,
      },
      { title: "NFVCB Regulations 2008", file: `${FORMS_DIR}/NFVCB Regulations 2008.pdf` },
    ],
  },
];

export const submissionSteps = [
  { title: "Prepare Your Work", body: "Ensure your film, music video, skit or video game is complete and ready for review." },
  { title: "Complete Application Form", body: "Download and complete the appropriate application form for your content type." },
  { title: "Pay Applicable Fees", body: "Make payment via RevOP (revop.gov.ng) to NFVCB. Keep your payment receipt as you will need it." },
  { title: "Submit to NFVCB", body: "Submit your application, work copy, and payment receipt to the nearest NFVCB office or online portal." },
  { title: "Await Classification", body: "NFVCB will classify your work within 20 working days and issue a classification certificate." },
  { title: "Receive Certificate", body: "Collect your classification certificate within 5 working days of the classification decision." },
];
