export type FaqItem = { q: string; a: string };
export type FaqGroup = { id: string; title: string; items: FaqItem[] };

export const faqGroups: FaqGroup[] = [
  {
    id: "about-the-board",
    title: "About the Board",
    items: [
      {
        q: "Why do we need a Film Censorship Board?",
        a: "In an ethnic and religious society like Nigeria, classifying films into categories allows adults to see a wider range of films dealing with the realities of the adult world, while restricting children and youth from viewing what could be harmful to them. It also ensures that objectionable material capable of inciting civil strife is reduced or eliminated, and gives parents advance information about a film's suitability so they can decide what their children watch.",
      },
      {
        q: "Who sets the censorship guidelines?",
        a: "The Board. Section 37 of the NFVCB Act 85 of 1993 lays out the statutory criteria for censoring films and video works, and under section 2(e) of the same Act the Board has established detailed guidelines for censorship and classification in line with global best practice. Guidelines are reviewed in consultation with industry stakeholders and the public.",
      },
      {
        q: "How is the membership of the Censors Board composed or constituted?",
        a: "Members of the Board are appointed by the Federal Government through the supervising Minister, as provided by the enabling Act. Membership draws on relevant government ministries and agencies together with persons of standing representing the public interest and the creative sector. The Executive Director serves as the chief executive responsible for the day-to-day running of the Board.",
      },
      {
        q: "How far has the Board taken care of the diverse interests in Nigeria?",
        a: "The Board operates a zonal structure built on the six geo-political zones, with state centres beneath them, so that decisions and services reflect local realities. Its censorship criteria expressly guard against material likely to encourage racial, religious or ethnic discrimination or conflict, and the Board involves communities and consultative fora in reviewing classification standards.",
      },
      {
        q: "Can an active filmmaker or video producer be a member of the Censors Board?",
        a: "Practitioners who are actively producing, distributing or exhibiting films are not appointed to sit in judgement on works submitted for classification, because that would place them in a conflict of interest with applicants. Active practitioners instead contribute through the Film & Video Consultative Panel, their guilds and associations, and the Board's stakeholder consultations.",
      },
      {
        q: "What is the Film & Video Consultative Panel?",
        a: "It is the Board's structured forum for stakeholder engagement, organised around the six geo-political zones and supported by a national consultative body. The panel gives guilds, producers, distributors, exhibitors and community representatives a channel to comment on classification decisions, proposed regulatory changes and reviews of the classification guidelines.",
      },
      {
        q: "Who are the clients of the Censors Board?",
        a: "Three groups. Industry clients — producers, marketers and organisations applying to have films, video works and computer games classified. Consumers — members of the public who watch films and video products in Nigeria and are entitled to accurate consumer information. And government and law enforcement, who rely on the Board for policy advice, reports and priority handling of urgent applications.",
      },
      {
        q: "Apart from film and video censorship, what are the other functions of the Censors Board?",
        a: "The Board licenses persons to exhibit films and video works; licenses premises for exhibition; regulates and prescribes safety precautions in licensed premises; regulates and controls cinematographic exhibitions; regulates the import of foreign movies and the export of Nigerian movies; registers all film and video outlets and keeps a register of them; and performs such other functions as are necessary for the full discharge of its statutory duties.",
      },
      {
        q: "Who is empowered by the NFVCB Act to enter film or video exhibition premises for inspection?",
        a: "Officers of the Board duly authorised for that purpose — the field officers of the Operations Department and zonal offices — are empowered to enter and inspect licensed and suspected premises in the course of their statutory duties. Obstructing a field officer is itself a listed infringement under the Act.",
      },
    ],
  },
  {
    id: "censorship-classification",
    title: "Censorship & Classification",
    items: [
      {
        q: "What is film and video censorship?",
        a: "It is the statutory examination of a film or video work to determine whether it meets the criteria set out in the NFVCB Act, and to assign it the classification that tells audiences who it is suitable for. Where a work breaches the criteria the Board may require cuts, and where necessary it may reject the work entirely.",
      },
      {
        q: "What criteria are used in censoring a film or video work?",
        a: "Under section 37 of the Act, the Censors and Classification Committee must be satisfied that the work has educational or entertainment value and promotes Nigerian culture, unity and interest; and that it is not likely to undermine national security, corrupt public or private morality, glorify violence, expose people of African heritage to ridicule or contempt, encourage illegal or criminal acts, encourage racial, religious or ethnic discrimination or conflict, be blasphemous or obscene, or denigrate the dignity of womanhood.",
      },
      {
        q: "Does the Board classify censored films?",
        a: "Yes. Every approved work is assigned one of seven classification symbols — G, PG, 12, 12A, 15, 18 or RE — which must be displayed prominently on packaging, posters and advertising, and shown on screen before exhibition.",
      },
      {
        q: "How is censorship carried out?",
        a: "A valid application is scheduled for preview, and the Censors and Classification Committee views the complete work. The committee applies the statutory criteria and the Board's classification guidelines, records its decision with reasons, and the Board issues a classification certificate. Clear reasons for a decision are available to the applicant on request.",
      },
      {
        q: "If a film has been censored in Kano, Aba or Abeokuta, can it be exhibited in Lagos without further review?",
        a: "Yes. Classification by the NFVCB is national. A film classified and approved at any NFVCB office is valid for distribution and exhibition throughout the Federation, subject to the conditions of its classification. It does not need to be re-submitted in another state.",
      },
      {
        q: "What is the duration of the censorship process?",
        a: "The Board classifies material within 20 working days of receiving a valid application, and issues the classification certificate within 5 working days of the decision. Fast-track processing is available for an additional ₦50,000. Films submitted through the online classification route for digital distribution are classified within 24 hours of confirmed payment.",
      },
      {
        q: "What if a version of my film has already been censored?",
        a: "Each distinct version of a work must be submitted in its own right, because the classification attaches to the specific cut that was previewed. A re-edited, extended or differently dubbed version is a new submission. If only the title changes, a title change is processed at a fee of ₦10,000 across all categories.",
      },
      {
        q: "If a film has been approved for exhibition, can the exhibitor or producer add or subtract from the content?",
        a: "No. Altering an already approved film or video work, poster, promo or trailer is a listed infringement under the Act and invalidates the approval. Any change to the content requires fresh submission to the Board.",
      },
    ],
  },
  {
    id: "applications-compliance",
    title: "Applications & Compliance",
    items: [
      {
        q: "Is it an offence to buy uncensored films?",
        a: "The offence provisions of the Act are directed at those who distribute and exhibit unclassified works, not at members of the public. However, buying uncensored copies sustains an illegal trade and leaves you with no consumer information about the content. The Board urges the public to buy only works carrying an NFVCB classification symbol.",
      },
      {
        q: "What do I have to do to apply for censorship?",
        a: "Ensure your work is complete, download and complete the appropriate application form, pay the applicable fee via the RevOP portal at revop.gov.ng, and submit the application, a copy of the work and your payment receipt to the nearest NFVCB office. Your work will be classified within 20 working days and the certificate issued within 5 working days of the decision.",
      },
      {
        q: "What must a producer, exhibitor, distributor or supplier do before releasing a film to the public?",
        a: "Four things. Have the work classified by the Board; hold the correct licence for what you do — distributor, exhibitor, mobile or online; operate from licensed exhibition premises where applicable; and display the classification symbol and consumer advice on the packaging, posters and advertising, and on screen before exhibition.",
      },
      {
        q: "Can an applicant appeal against the decision of the Censors Committee?",
        a: "Yes. Complete a Notice of Appeal and submit it to the Board. The cost of appeal is a ₦5,000 application fee plus the cost of constituting a review committee. The Board will also provide a copy of the reasons for its decision, arrange for you to speak to a senior official, and advise you on how to apply to the Review Board.",
      },
      {
        q: "How can you prove that a film has been registered by the Censors Board?",
        a: "By its classification certificate, which is issued to the applicant and projected before exhibition, and by the classification symbol carried on the packaging and publicity material. The Board also maintains a register of classified works, video outlets and distributors, which is updated periodically and can be checked at any NFVCB office.",
      },
    ],
  },
  {
    id: "exhibition-advertising",
    title: "Exhibition & Advertising",
    items: [
      {
        q: "How can one know if a film has been certified before buying or watching it?",
        a: "Look for the NFVCB classification symbol on the cover, packaging and advertising material, and for the classification certificate projected on screen before the film begins in a cinema. If neither is present, the work has not been approved and it is illegal to distribute or exhibit it.",
      },
      {
        q: "What is consumer advice?",
        a: "Consumer advice is the short statement that accompanies a classification symbol and tells you why a work received that rating — for example the presence of violence, strong language, adult themes or content unsuitable for young children. It lets parents and viewers make an informed choice before watching.",
      },
      {
        q: "Where can we get consumer advice?",
        a: "On the packaging and cover of the work, on posters, handbills and advertising material, on screen before exhibition, and from the Board itself. NFVCB provides access to its classification decisions and information about the national classification scheme on request at its head office, zonal offices and state centres.",
      },
      {
        q: "What major information should be included in film adverts and promotional materials?",
        a: "The title of the work, the classification symbol assigned by the Board, the accompanying consumer advice, and the identity of the producer or licensed distributor. Failure by an exhibitor to put the rating given to a film on posters, handbills and adverts is a listed infringement.",
      },
      {
        q: "How is the categorisation of films enforced?",
        a: "Through the conditions attached to exhibition and premises licences, and through field monitoring by the Operations Department and zonal offices. Exhibiting a restricted film to underage persons, exhibiting RE-classified material without authorisation, and failing to project the classification certificate are all infringements attracting enforcement action.",
      },
    ],
  },
  {
    id: "exemptions",
    title: "Exemptions & Special Cases",
    items: [
      {
        q: "Are there films and video works exempted from censorship?",
        a: "Yes. Certain categories of work — such as news and current affairs material, and works produced purely for educational, scientific, instructional or religious purposes — may be exempted on application to the Board. Exemption is not automatic: you must apply using the Application for Exemption from Censorship form, at a fee of 50% of the applicable classification fee.",
      },
      {
        q: "Are there limitations to the exemption classification?",
        a: "Yes. Exemption applies only to the specific work and the purpose for which it was granted. It does not cover material that would breach the statutory censorship criteria, it does not extend to a re-edited or repurposed version, and it does not exempt the distributor or exhibitor from the requirement to hold the appropriate licence.",
      },
      {
        q: "Would an individual or corporate body contravene the law by exhibiting an exempted film without reference to the Board?",
        a: "Yes. Exemption is a decision of the Board, not a status a producer can assume. Exhibiting a work as exempt without first obtaining the Board's exemption is treated as exhibiting an unclassified work, and attracts the same enforcement action.",
      },
      {
        q: "Is it an offence to buy VCDs/DVDs released in other countries and brought into Nigeria?",
        a: "Foreign films and video works imported into Nigeria fall under the Board's mandate and must be classified before they are distributed or exhibited here, and importers must obtain an import permit from the Board. Titles brought in and traded without classification are unapproved works, and dealing in them is an infringement.",
      },
      {
        q: "How does the Board help combat video piracy?",
        a: "By registering all film and video outlets and keeping a register of them, by licensing distributors and exhibitors so that legitimate operators are identifiable, by requiring distributors to submit a market copy of each classified work, and by field operations that detect forged certificates, forged classification symbols and unapproved copies — pursued in cooperation with law enforcement and the relevant copyright authorities.",
      },
      {
        q: "What factors does the Board use to determine that a film is Nigerian before registration?",
        a: "The Board looks at the nationality of the producer or production company and ownership of the copyright, the proportion of Nigerian cast and crew, whether the work was principally shot in Nigeria, the language and cultural content of the work, and the guild or association affiliation of the producer and director.",
      },
    ],
  },
];

export const faqFootnote =
  "The abridged information above has been extracted from the National Film and Video Censors Board Act of 1993 and other regulations. For further information, please visit any NFVCB office, call the HQ office, or address your enquiries to the Executive Director.";
