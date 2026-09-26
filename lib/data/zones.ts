export type Office = {
  name: string;
  officer?: string;
  phone?: string;
  address: string;
};

export type Zone = {
  id: string;
  zone: string;
  location: string;
  offices: Office[];
};

export const zones: Zone[] = [
  {
    id: "hq",
    zone: "Head Office (Annex)",
    location: "Abuja (FCT)",
    offices: [
      {
        name: "Head Office",
        address: "Room B913, Federal Secretariat Complex Phase II, Abuja",
      },
    ],
  },
  {
    id: "north-central",
    zone: "North Central Zonal Office",
    location: "Jos, Plateau State",
    offices: [
      { name: "NC Zonal Office", officer: "Oluwole Margarita", phone: "07080550605", address: "3 Ahmadu Bello Way, Ministry of Works Yard, Jos, Plateau State" },
      { name: "Ilorin Centre", officer: "Alabama Atere", phone: "08033816492", address: "2nd Floor, Arts and Culture Building Complex, Geri-Alimi, Ilorin, Kwara State" },
      { name: "Lokoja Centre", officer: "Abdulwahab Shuibu", phone: "08064888418", address: "c/o NAO, Hassan Kastina Rd. Opp. CBN, Lokoja" },
      { name: "Niger State Centre", officer: "Binga Nyagarga Jankina", phone: "08066699930", address: "Old Secretariat Complex, Revenue House, Keteren Gwari, Minna" },
      { name: "Nasarawa State Centre", officer: "Fanto Namo", phone: "08060296929", address: "Suite 38 Kaura Plaza, Opp PDP Secretariat Jos Road, Lafia, Nasarawa State" },
      { name: "Makurdi Centre", officer: "Akpan Godwin (Ag.)", phone: "08034539762", address: "B Wing, Ground Floor, Federal Secretariat Complex, Makurdi, Benue State" },
    ],
  },
  {
    id: "north-west",
    zone: "Northwest Zonal Office",
    location: "Kano State",
    offices: [
      { name: "NW Zonal Office", officer: "Aliyu Sani (Ag.)", phone: "08069546374", address: "Floor 7th Room 733-739, Federal Government Secretariat, Murtala Muhammad Way, Katsina Road, Kano" },
      { name: "Kaduna Centre", officer: "Akwash Blessing", phone: "08036549503", address: "Federal Government Secretariat Complex, Kawo, Kaduna" },
      { name: "Katsina Centre", officer: "Aliyu Dahiru", phone: "08065348448", address: "3rd Floor Federal Secretariat, Dandagoro, Katsina" },
    ],
  },
  {
    id: "north-east",
    zone: "Northeast Zonal Office",
    location: "Bauchi State",
    offices: [
      { name: "NE Zonal Office", officer: "Monday Kopgakka (Ag.)", phone: "09162096070", address: "Federal Secretariat Complex, 3rd Floor, Room 82/83, Bauchi State" },
      { name: "Yola Centre", officer: "Bodinga Abraham Umar", phone: "08033343285", address: "Federal Ministry of Information beside Federal College of Education, Yola, Adamawa State" },
      { name: "Gombe Centre", officer: "Daniel Maiton", phone: "08061593630", address: "Federal Secretariat Complex, 3rd Floor, Gombe State" },
      { name: "Maiduguri Centre", officer: "Shehu Umar Halima", phone: "08037493122", address: "Federal Secretariat Complex Behind University of Maiduguri Staff Clinic, Kano Road, Borno State" },
    ],
  },
  {
    id: "south-east",
    zone: "Southeast Zonal Office",
    location: "Onitsha, Anambra State",
    offices: [
      { name: "SE Zonal Office", officer: "Hubert Odeh", phone: "08036009530", address: "26, Kenan Crescent, Federal Housing Estate, 33 G.R.A, Onitsha, Anambra State" },
      { name: "Aba Centre", officer: "Nkeiru Onyenakazi", phone: "08037143817", address: "Rooms 36 & 37, Aba Main Town Hall, Aba South LGA, Aba, Abia State" },
      { name: "Owerri Centre", officer: "Blessing Amadi", phone: "08037639790", address: "Federal Secretariat Complex, Port Harcourt Road, New Owerri, Imo State" },
      { name: "Enugu Centre", officer: "Ozoana William", phone: "08033506470", address: "Rooms 23/24 Federal Secretariat Complex, Independence Layout, Enugu State" },
    ],
  },
  {
    id: "south-south",
    zone: "South-South Zonal Office",
    location: "Port Harcourt, Rivers State",
    offices: [
      { name: "SS Zonal Office", officer: "Ernest Irehie", phone: "08127943130", address: "Federal Secretariat Complex, Aba/PH Road, Opposite Presidential Hotel, 2nd Floor, Right Wing, RM 209, Port Harcourt, Rivers State" },
      { name: "Warri Centre", officer: "Anwadike Paul", phone: "08055284788", address: "Uvwie Town Hall, No. 200 P.T.I Road, Opp PTI School, Effurun, Warri, Delta State" },
      { name: "Benin Centre", officer: "Fred Elakhe", phone: "08034718097", address: "First Floor, Federal Secretariat Complex, Aduwawa Road, Benin City, Edo State" },
      { name: "Uyo Centre", officer: "Maxwell Domingo Umanah", address: "Room 210, Federal Secretariat, Abak Road, Uyo, Akwa Ibom State" },
      { name: "Calabar Centre", officer: "Ezenne Ikechukwu Edwin", phone: "08055171003", address: "Rooms B18-20, Federal Secretariat Complex, Murtala Mohammed Highway, Calabar" },
    ],
  },
  {
    id: "south-west",
    zone: "Southwest Zonal Office",
    location: "Lagos State",
    offices: [
      { name: "SW Zonal Office", officer: "Uju Emagha", phone: "08050580804", address: "Beside Federal Secretariat by Alagbon Close, Ikoyi, Lagos" },
      { name: "Ikorodu Centre", officer: "Taiwo Ogunsami", phone: "08137834749", address: "Local Government Secretariat Ikorodu, 50 Beach Road, Opp General Hospital, Ikorodu" },
      { name: "Oshogbo Centre", officer: "Olusegun Francis", phone: "08066383217", address: "c/o Ministry of Commerce and Industries, Osun State Secretariat, Abeere, Osogbo, Osun State" },
      { name: "Ibadan Centre", officer: "Akanni Oluremi", phone: "08035711895", address: "Federal Secretariat Complex, Ikolaba, G.R.A, Agodi, Ibadan" },
      { name: "Akure Centre", officer: "Alonge Festus (Ag.)", phone: "08034212550", address: "Federal Secretariat, Igbatoro Road, Alagbaka GRA, Akure, Ondo State" },
      { name: "Abeokuta Centre", officer: "Patrick-Ukpe Adenike", phone: "08037134405", address: "Federal Secretariat Complex, Oke Mosan, Abeokuta" },
    ],
  },
];

export const verificationEmails = [
  { office: "Abuja (HQ)", email: "verification@nfvcb.gov.ng" },
  { office: "Lagos", email: "lagosverification@nfvcb.gov.ng" },
  { office: "Ibadan", email: "ibadanverification@nfvcb.gov.ng" },
  { office: "Benin", email: "beninverification@nfvcb.gov.ng" },
  { office: "North West", email: "nwverification@nfvcb.gov.ng" },
  { office: "North East", email: "neverification@nfvcb.gov.ng" },
  { office: "North Central", email: "ncverification@nfvcb.gov.ng" },
  { office: "South South", email: "ssverification@nfvcb.gov.ng" },
  { office: "South East", email: "severification@nfvcb.gov.ng" },
];
