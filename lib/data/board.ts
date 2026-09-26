export const boardFunctions = [
  "To license a person to exhibit films and video works",
  "To license a premises for the purposes of exhibiting films and video works",
  "To classify films and video works",
  "To regulate and prescribe safety precautions to be observed in licensed premises",
  "To regulate and control cinematographic exhibitions",
  "To regulate the import of foreign movies and export of Nigerian movies",
  "To perform such other functions as are necessary or expedient for the full discharge of all or any of the functions conferred on it by law",
];

export const philosophy = [
  "Artistic expression and creative freedom are not unduly curbed.",
  "Protect national culture, peace and security. Protect children and young persons from harm and prevent access by children to materials which are offensive.",
  "Strongly encourage and promote the exercise of parental responsibility.",
  "Movies should be allowed to reach the widest audience that is appropriate for their theme and treatment.",
  "The context in which something (e.g. sex or violence) is presented is central to the question of its acceptability.",
  "Take into account community concerns about religion, and prevent the exhibition of materials that are objectionable, likely to cause incitement, civil disorder, portray persons in demeaning manner, incite or condone sexual violence or glamorise criminal acts.",
  "Members of the public should have information through consumer advice, about materials which they may find offensive, both for themselves and for children in their care.",
  "Adults (persons over 18) should be free, within the law, to choose what they wish to view.",
  "The guidelines shall be published annually and revised on the basis of public inputs.",
];

export const strategicGoals = [
  "To provide an enabling environment for the growth of the film industry.",
  "To enshrine a code of ethics and professionalism which would ensure the production of quality movies.",
  "To manage the classification system to time, cost and quality standards.",
  "To provide policy advice and services to governments.",
  "To enhance confidence in and utilization of the NFVCB classification system among existing and potential clients.",
  "To enhance community understanding, confidence and usage in relation to classification systems and outcomes.",
  "To continually empower NFVCB staff to meet its objectives by providing the requisite internal capability in the areas of people, training, logistical support, information, financial resources and leadership.",
];

export const timeline = [
  { year: "1993", title: "Established by Act No.85", body: "The National Film and Video Censors Board is created by law to regulate the films and video industry in Nigeria." },
  { year: "2000s", title: "Nollywood boom — classification at scale", body: "Explosive growth in home video production meets a classification system built to keep pace." },
  { year: "2010s", title: "Digital content regulation introduced", body: "The Board extends its framework to digital formats and new distribution channels." },
  { year: "2020s", title: "Streaming & online distribution licensing", body: "Online exhibition and distribution licences bring global platforms into the national framework." },
];

export const mission =
  "To contribute to the positive transformation of the Nigerian society through the censorship of films and video works whilst balancing the need to preserve freedom of expression within the law, and limit social harm caused by films.";

export const vision =
  "To be recognized as a world-class film and video regulatory agency that institutes best practice in the discharge of its duties.";

export type Department = {
  no: string;
  name: string;
  icon: string;
  summary: string;
};

export const departments: Department[] = [
  { no: "01", name: "Executive Director's Office", icon: "Crown", summary: "Provides strategic direction, policy leadership and oversight of every arm of the Board." },
  { no: "02", name: "Administration Department", icon: "Settings", summary: "Human resources, general services, welfare and the internal machinery that keeps the Board running." },
  { no: "03", name: "Film Censorship & Classification Department", icon: "Clapperboard", summary: "Reviews, censors and classifies every film, video work, music video, skit and video game submitted to the Board." },
  { no: "04", name: "Licensing & Documentation Department", icon: "ClipboardList", summary: "Issues and renews distributor, exhibitor and premises licences, and keeps the national register of outlets." },
  { no: "05", name: "Operations Department", icon: "Map", summary: "Field monitoring, compliance enforcement and coordination of zonal offices and state centres." },
  { no: "06", name: "Planning, Research & Statistics Department", icon: "BarChart3", summary: "Industry data, research, corporate planning and the statistical base for regulatory decisions." },
  { no: "07", name: "Service Innovation Department", icon: "Lightbulb", summary: "Digital transformation, service delivery reform and the modernisation of Board processes." },
  { no: "08", name: "Legal Department", icon: "Scale", summary: "Legal advisory, prosecution of infringements, regulations drafting and statutory interpretation." },
  { no: "09", name: "Accounts Department", icon: "Briefcase", summary: "Revenue, budgeting, financial reporting and stewardship of public funds." },
  { no: "10", name: "Corporate Affairs Department", icon: "Megaphone", summary: "Public communication, media relations, stakeholder engagement and consumer education." },
];

export type Leader = {
  name: string;
  role: string;
  office: string;
  tier: "government" | "board";
  initials: string;
};

export const leadership: Leader[] = [
  { name: "President of the Federal Republic of Nigeria", role: "President & Commander-in-Chief", office: "Federal Republic of Nigeria", tier: "government", initials: "PR" },
  { name: "Vice President of the Federal Republic of Nigeria", role: "Vice President", office: "Federal Republic of Nigeria", tier: "government", initials: "VP" },
  { name: "Honourable Minister", role: "Minister of Art, Culture, Tourism and the Creative Economy", office: "Supervising Ministry", tier: "government", initials: "HM" },
];

export const executiveDirector = {
  name: "Dr. Shaibu Husseini, PhD",
  shortName: "Dr. Shaibu Husseini",
  role: "Executive Director / Director-General",
  office: "National Film and Video Censors Board",
  photo: "/shaibu.jpeg",
  postNominals: "PhD, MNIPR, RPAFT, AFGO, ND",
  highlights: [
    "Chair, AMAA Selection Committee (16 yrs)",
    "Oxford Blavatnik Alumni",
    "Golden Globes Voter",
  ],
  appointment: [
    ["Appointed", "12 January 2024, by President Bola Ahmed Tinubu"],
    ["Assumed office", "6 March 2024"],
  ],
  vision:
    "Nigeria's film regulatory framework can rank among the best in the world. We have the talent, the legislation, and now the strategy. NFVCB is determined to reduce bureaucracy, embrace technology, and make our services accessible to every stakeholder across Nigeria.",
  bio: [
    "Dr. Shaibu Husseini, widely known as “Mr. Nollywood”, is the Executive Director/CEO of the National Film and Video Censors Board. He was appointed on 12 January 2024 by President Bola Ahmed Tinubu and assumed office on 6 March 2024.",
    "A culture journalist, film critic and scholar, he spent more than three decades at The Guardian Nigeria, rising to Editor-at-Large on the Culture, Theatre & Film desk. He is a Senior Teaching & Research Fellow in the Department of Mass Communication, University of Lagos, where he earned his MSc (Distinction) and a PhD with a doctoral thesis on the structure of film production companies in Nollywood.",
    "He has chaired the Africa Movie Academy Awards (AMAA) Selection Committee for 16 consecutive years, is an international voting member of the Golden Globe Awards, and has served as an official consultant to the Berlin International Film Festival. At NFVCB he has moved the Board from a censorship posture to a progressive classification model and led the full digitalisation of its classification operations.",
  ],
  education: [
    { title: "PhD, Mass Communication", org: "University of Lagos", note: "Thesis: “Structure of Film Production Companies in Nollywood”" },
    { title: "MSc, Mass Communication", org: "University of Lagos", note: "Distinction" },
    { title: "BSc, Mass Communication", org: "Lagos State University", note: "First Class" },
  ],
  career: [
    { title: "Executive Director / CEO", org: "National Film and Video Censors Board", note: "2024 – present" },
    { title: "Editor-at-Large, Culture, Theatre & Film", org: "The Guardian Nigeria", note: "30+ years" },
    { title: "Senior Teaching & Research Fellow", org: "Department of Mass Communication, University of Lagos" },
    { title: "Director of Dance & Music; Head, Strategic Communication Unit", org: "National Troupe of Nigeria" },
    { title: "Secretary, Governing Board", org: "National Theatre / National Troupe", note: "2011 – 2015" },
    { title: "Special Assistant to the Director General", org: "National Theatre / National Troupe" },
    { title: "Pioneer Artiste & Member", org: "National Dance Troupe of Nigeria" },
    { title: "Contributor / Broadcaster", org: "Mainland FM 98.3, Village Square Programme" },
  ],
  industryRoles: [
    { title: "International Voting Member", org: "Golden Globe Awards" },
    { title: "Official Consultant", org: "Berlin International Film Festival (Berlinale)" },
    { title: "Selection Committee Chair (16 consecutive years) & Jury Member", org: "Africa Movie Academy Awards (AMAA)" },
    { title: "Former Member", org: "Nigeria Oscar Selection Committee" },
    { title: "Board Member", org: "Mainframe Film Institute" },
    { title: "Board Member", org: "In-Short International Film Festival" },
    { title: "Board Member", org: "Bank of Industry Nollywood Fund" },
    { title: "Panelist, Creative Economy track", org: "NECLive 2025" },
  ],
  programmes: [
    { title: "AIG-Public Leaders Programme", org: "Blavatnik School of Governance, University of Oxford" },
    { title: "International Visitors Leadership Programme", org: "U.S. Department of State" },
  ],
  awards: [
    { title: "Fellow of the Theatre Profession (FTA)", org: "NANTAP, conferred at Glover Hall, Lagos", note: "22 February 2025" },
    { title: "Recognition Award", org: "Nollywood Film Festival, Germany", note: "2014" },
  ],
  publications: [
    { title: "Moviedom: The Nollywood Narratives", org: "Monograph chronicling Nollywood's formative era", note: "2010" },
    { title: "Three Decades of Film Classification", org: "NFVCB publication marking the Board's 30th anniversary", note: "2024" },
  ],
  expertise: [
    "Film Policy & Regulation",
    "Film Criticism & Curation",
    "Nollywood Documentation",
    "Creative Economy Development",
    "Cultural Administration",
    "Theatre & Performing Arts",
    "Journalism & Broadcasting",
    "Public Relations & Advertising",
    "Mass Communication",
  ],
  achievements: [
    { title: "From censorship to classification", body: "Shifted the Board's institutional approach from censorship to a progressive classification model." },
    { title: "Fully digital operations", body: "Led the full digitalisation of all NFVCB classification operations." },
    { title: "Content standards campaign", body: "Launched a nationwide, NGO-backed campaign addressing harmful depictions on screen." },
    { title: "A national workforce", body: "Empowered 465 staff across 6 zonal offices and 26 state centres." },
    { title: "Nigerian films at the box office", body: "Facilitated a period in which Nigerian films outperformed foreign titles at the local box office." },
    { title: "Industry collaboration", body: "Deepened engagement with producers, skit makers, cinema operators and partner agencies." },
    { title: "Anti-piracy partnership", body: "Partnered with the Nigerian Communications Commission (NCC) on anti-piracy initiatives." },
    { title: "Sub-national film infrastructure", body: "Pledged technical support to the development of the Ekiti State Film Village." },
  ],
  quotes: [
    { text: "We should no longer be doing analogue at a time when we should be talking about digital.", context: "On institutional modernisation" },
    { text: "The Golden Globe appointment is the highest imprimatur for my career as a culture journalist and critic.", context: "On the Golden Globe appointment" },
    { text: "Since the reward for hard work is more work, I commit to continue working tirelessly to promote and advance the cause of theatre and film arts in Nigeria.", context: "On assuming office" },
  ],
  foreword:
    "In line with the Federal Government reform programme with respect to the services delivery contract, it is my pleasure to present this revised NFVCB Service Charter for clients of the board. Our goal is to ensure that NFVCB operates a world class film regulatory agency with established best practices and appropriate service standards.",
};

export const managementTeam = [
  { name: "Director, Administration", dept: "Administration Department", initials: "AD" },
  { name: "Director, Film Censorship & Classification", dept: "Film Censorship & Classification Department", initials: "FC" },
  { name: "Director, Licensing & Documentation", dept: "Licensing & Documentation Department", initials: "LD" },
  { name: "Director, Operations", dept: "Operations Department", initials: "OP" },
  { name: "Director, Planning, Research & Statistics", dept: "Planning, Research & Statistics Department", initials: "PR" },
  { name: "Director, Service Innovation", dept: "Service Innovation Department", initials: "SI" },
  { name: "Director, Legal Services", dept: "Legal Department", initials: "LG" },
  { name: "Director, Accounts", dept: "Accounts Department", initials: "AC" },
  { name: "Director, Corporate Affairs", dept: "Corporate Affairs Department", initials: "CA" },
];
