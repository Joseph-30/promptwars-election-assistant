export type ConstitutionArticle = {
  article: string;
  title: string;
  summary: string;
};

export type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  actionSteps: string[];
  advancedDetails: string;
  constitutionArticles: ConstitutionArticle[];
};

export const timelineData: TimelineEvent[] = [
  {
    id: "registration",
    title: "Registration",
    description: "Master the prerequisites. Learn about eligibility, verification, and the foundational requirements of the franchise.",
    whyItMatters: "Without registering, you cannot exercise your democratic right to vote.",
    actionSteps: ["Check if you are 18+ years old", "Verify your name on the voter list", "Apply for a Voter ID if missing"],
    advancedDetails: "The Electoral Registration Officer (ERO) oversees the preparation of the electoral roll. Special summary revisions are conducted every year to add new voters.",
    constitutionArticles: [
      { article: "Article 326", title: "Universal Adult Suffrage", summary: "Elections to Lok Sabha and State Assemblies shall be on the basis of adult suffrage — every citizen 18+ has the right to vote, irrespective of caste, religion, sex, education, or wealth." },
      { article: "Article 324", title: "Superintendence of Elections", summary: "The superintendence, direction and control of elections is vested in the Election Commission of India, which maintains the electoral rolls." },
      { article: "Article 325", title: "No discrimination in electoral rolls", summary: "There shall be one general electoral roll for every territorial constituency — no person shall be ineligible on grounds of religion, race, caste or sex." },
    ]
  },
  {
    id: "primaries",
    title: "Primaries & Nominations",
    description: "Political parties select and formally nominate candidates for the general election through internal processes.",
    whyItMatters: "The nomination phase determines who can appear on the ballot, shaping the democratic choices available to voters.",
    actionSteps: ["Understand party candidate selection processes", "Follow the official nomination filing window", "Check candidate affidavits on the ECI website"],
    advancedDetails: "In India, candidates file nomination papers with the Returning Officer. These are scrutinised for validity. Candidates can also contest as independents. Party symbols are allotted by the Election Commission.",
    constitutionArticles: [
      { article: "Article 80", title: "Composition of Rajya Sabha", summary: "Defines the composition of the Council of States, including seats allocated to each state and the process of indirect election by State Assemblies." },
      { article: "Article 81", title: "Composition of Lok Sabha", summary: "Prescribes the maximum strength of the House of the People and the manner of election from States and Union Territories." },
      { article: "Article 102", title: "Disqualifications for Membership", summary: "A person is disqualified from being chosen as a Member of Parliament if they hold an office of profit, are of unsound mind, are insolvent, or are not a citizen of India." },
    ]
  },
  {
    id: "campaigns",
    title: "Campaigns & Model Code",
    description: "Candidates reach out to voters to share their manifestos, debate opponents, and seek support under the ECI's Model Code of Conduct.",
    whyItMatters: "This is when you evaluate candidates' policy positions. The Model Code of Conduct ensures a level playing field.",
    actionSteps: ["Read official party manifestos on party websites", "Watch candidate debates and public meetings", "Verify claims using factcheck platforms like Boom, AltNews"],
    advancedDetails: "The Model Code of Conduct (MCC) comes into effect from the date of announcement of elections and is operational until the results are declared. It governs conduct of parties, candidates, and the government machinery.",
    constitutionArticles: [
      { article: "Article 19(1)(a)", title: "Freedom of Speech and Expression", summary: "Citizens have the right to freedom of speech and expression, which encompasses the right to campaign, canvass, and publicly express political opinions during elections." },
      { article: "Article 105", title: "Powers and Privileges of Parliament", summary: "Members of Parliament have freedom of speech in Parliament and are not liable for any proceedings outside Parliament for their parliamentary statements." },
    ]
  },
  {
    id: "general-election",
    title: "Polling Day",
    description: "Voters visit their designated polling booths to cast their final votes using the EVM and verify via VVPAT.",
    whyItMatters: "Your vote directly contributes to choosing the representative for your constituency and shaping the government.",
    actionSteps: ["Locate your designated polling booth on the Voter Helpline App", "Carry your EPIC card or approved alternative ID", "Press the button next to your chosen candidate on the EVM"],
    advancedDetails: "VVPAT (Voter Verifiable Paper Audit Trail) systems are used alongside electronic machines. A printed slip showing the candidate's name and symbol appears for 7 seconds before dropping into a sealed box.",
    constitutionArticles: [
      { article: "Article 326", title: "Right to Vote", summary: "Every citizen of India who is not less than 18 years of age has the right to vote in elections to the Lok Sabha and State Assemblies." },
      { article: "Article 327", title: "Power of Parliament over Elections", summary: "Parliament may by law make provision with respect to all matters relating to elections to the Lok Sabha and State Assemblies, including preparation of electoral rolls." },
      { article: "Article 329", title: "Bar to interference by Courts", summary: "Notwithstanding anything in the Constitution, the validity of any law relating to delimitation of constituencies or allotment of seats shall not be called into question in any court." },
    ]
  },
  {
    id: "certification",
    title: "Result Certification",
    description: "The formal process where election officials verify counts, audit results, and officially declare the winners.",
    whyItMatters: "Certification is the legal step that confirms every valid ballot has been counted correctly and lawfully, finalizing the election.",
    actionSteps: ["Follow official ECI announcements for results", "Understand the counting and audit procedures", "Recognise the legal finality of the certified results"],
    advancedDetails: "Returning Officers and election boards conduct canvassing and resolve discrepancies. Winning candidates are issued a certificate of election. Any disputes must be raised via an election petition before a High Court.",
    constitutionArticles: [
      { article: "Article 329(b)", title: "Election Petitions", summary: "No election to Parliament or State Legislature shall be called in question except by an election petition presented to a High Court. The Supreme Court has appellate jurisdiction over High Court decisions." },
      { article: "Article 101", title: "Vacation of Seats", summary: "Governs the circumstances under which a person who has been elected to Parliament may be required to vacate their seat, including disqualifications." },
    ]
  }
];

export type FAQ = {
  question: string;
  answer: string;
};

export const faqData: FAQ[] = [
  {
    question: "What is NOTA?",
    answer: "NOTA stands for 'None Of The Above'. It is an option on the voting machine that allows a voter to officially reject all candidates running in a constituency."
  },
  {
    question: "How do I register to vote?",
    answer: "You can register online through the National Voters' Service Portal or submit Form 6 to your local Electoral Registration Officer."
  },
  {
    question: "What if I don't have a Voter ID card?",
    answer: "If your name is on the electoral roll, you can still vote by showing one of the alternative approved photo identity documents, such as an Aadhaar card, PAN card, or Passport."
  },
  {
    question: "Where is my polling booth?",
    answer: "You can find your polling booth by searching your name on the official electoral search website or using the Voter Helpline App."
  }
];

export type QuizQuestion = {
  id: number;
  question: string;
  options: string[];
  correctAnswerIndex: number;
  explanation: string;
};

export const quizData: QuizQuestion[] = [
  {
    id: 1,
    question: "Which of these is required to be eligible to vote?",
    options: ["Being a taxpayer", "Being 18 years or older", "Having a college degree", "Owning property"],
    correctAnswerIndex: 1,
    explanation: "Universal Adult Suffrage ensures that any citizen aged 18 or above has the right to vote, regardless of wealth, income, gender, or social status."
  },
  {
    id: 2,
    question: "What is the purpose of the Model Code of Conduct (MCC)?",
    options: ["To tell voters who to vote for", "To ensure free and fair elections", "To limit the number of candidates", "To delay the election process"],
    correctAnswerIndex: 1,
    explanation: "The MCC is a set of guidelines issued by the Election Commission to regulate political parties and candidates, ensuring a level playing field."
  },
  {
    id: 3,
    question: "What does VVPAT do?",
    options: ["Registers new voters automatically", "Calculates the final election results", "Allows voters to verify their cast vote", "Replaces the traditional EVM entirely"],
    correctAnswerIndex: 2,
    explanation: "VVPAT (Voter Verifiable Paper Audit Trail) prints a slip showing the candidate you voted for, allowing you to visually verify your vote."
  }
];

export type GlossaryTerm = {
  term: string;
  definition: string;
};

export const glossaryData: GlossaryTerm[] = [
  {
    term: "Absentee Ballot",
    definition: "A ballot submitted by mail or in person before Election Day, allowing voters who cannot attend in person to participate."
  },
  {
    term: "Ballot",
    definition: "The method used to cast a vote, whether a paper form, electronic machine, or other official medium."
  },
  {
    term: "By-election",
    definition: "An election held to fill a vacancy in a legislative seat that has arisen between scheduled general elections."
  },
  {
    term: "Canvassing",
    definition: "The systematic process of going through election returns to verify accuracy before official certification."
  },
  {
    term: "Constituency",
    definition: "A specific geographical area that elects a representative to a legislative body."
  },
  {
    term: "Electoral Roll",
    definition: "The official list of all eligible voters in a constituency. Also known as the voter list."
  },
  {
    term: "EVM",
    definition: "Electronic Voting Machine, used to record and tally votes electronically."
  },
  {
    term: "General Election",
    definition: "A scheduled election in which all eligible voters may vote for candidates for various offices."
  },
  {
    term: "Gerrymandering",
    definition: "The manipulation of district boundaries to give one political party an advantage over another."
  },
  {
    term: "Model Code of Conduct",
    definition: "Guidelines issued by the Election Commission to ensure free and fair elections."
  },
  {
    term: "NOTA",
    definition: "'None of the Above' — an option on the ballot that allows voters to officially reject all candidates."
  },
  {
    term: "Polling Station",
    definition: "A designated location where voters go to cast their votes on Election Day."
  },
  {
    term: "Primary Election",
    definition: "An election held within a political party to select its candidate for the general election."
  },
  {
    term: "Returning Officer",
    definition: "The official responsible for overseeing the election in a constituency, including the counting of votes."
  },
  {
    term: "Runoff Election",
    definition: "A second election held when no candidate wins an outright majority in the first round."
  },
  {
    term: "Voter Suppression",
    definition: "Strategies used to discourage or prevent specific groups from exercising their right to vote."
  },
  {
    term: "VVPAT",
    definition: "Voter Verifiable Paper Audit Trail — a device attached to EVMs that provides a printed confirmation of the vote cast."
  }
];

// ── Constituency static data (keyed by district name from pincode API) ──
export type ConstituencyInfo = {
  state: string;
  constituency: string;
  type: "Lok Sabha" | "Vidhan Sabha";
  mp: string;
  party: string;
  partyColor: string;
  votes2024: number;
  runnerUp: string;
  runnerParty: string;
  runnerVotes: number;
  wikiSlug: string;
};

export const constituencyByDistrict: Record<string, ConstituencyInfo> = {
  "New Delhi":       { state: "Delhi",       constituency: "New Delhi",        type: "Lok Sabha", mp: "Bansuri Swaraj",       party: "BJP",    partyColor: "#FF6B00", votes2024: 411000, runnerUp: "Somnath Bharti",          runnerParty: "AAP",        runnerVotes: 353000, wikiSlug: "New_Delhi_(Lok_Sabha_constituency)" },
  "Central Delhi":   { state: "Delhi",       constituency: "Chandni Chowk",    type: "Lok Sabha", mp: "Praveen Khandelwal",   party: "BJP",    partyColor: "#FF6B00", votes2024: 371000, runnerUp: "JP Agarwal",               runnerParty: "INC",        runnerVotes: 282000, wikiSlug: "Chandni_Chowk_(Lok_Sabha_constituency)" },
  "North Delhi":     { state: "Delhi",       constituency: "North West Delhi",  type: "Lok Sabha", mp: "Yogendra Chandoliya",  party: "BJP",    partyColor: "#FF6B00", votes2024: 820000, runnerUp: "Udit Raj",                 runnerParty: "INC",        runnerVotes: 561000, wikiSlug: "North_West_Delhi_(Lok_Sabha_constituency)" },
  "South Delhi":     { state: "Delhi",       constituency: "South Delhi",       type: "Lok Sabha", mp: "Ramvir Singh Bidhuri", party: "BJP",    partyColor: "#FF6B00", votes2024: 762000, runnerUp: "Sahi Ram Pahalwan",        runnerParty: "AAP",        runnerVotes: 498000, wikiSlug: "South_Delhi_(Lok_Sabha_constituency)" },
  "Mumbai City":     { state: "Maharashtra", constituency: "Mumbai South",      type: "Lok Sabha", mp: "Arvind Sawant",        party: "SS(UBT)",partyColor: "#E84040", votes2024: 388000, runnerUp: "Yamini Jadhav",            runnerParty: "SS(Shinde)", runnerVotes: 372000, wikiSlug: "Mumbai_South_(Lok_Sabha_constituency)" },
  "Mumbai Suburban": { state: "Maharashtra", constituency: "Mumbai North",      type: "Lok Sabha", mp: "Piyush Goyal",         party: "BJP",    partyColor: "#FF6B00", votes2024: 470000, runnerUp: "Bhushan Patil",            runnerParty: "INC",        runnerVotes: 390000, wikiSlug: "Mumbai_North_(Lok_Sabha_constituency)" },
  "Pune":            { state: "Maharashtra", constituency: "Pune",              type: "Lok Sabha", mp: "Murlidhar Mohol",      party: "BJP",    partyColor: "#FF6B00", votes2024: 491000, runnerUp: "Ravindra Dhangekar",       runnerParty: "INC",        runnerVotes: 440000, wikiSlug: "Pune_(Lok_Sabha_constituency)" },
  "Chennai":         { state: "Tamil Nadu",  constituency: "Chennai Central",   type: "Lok Sabha", mp: "Dayanidhi Maran",      party: "DMK",    partyColor: "#CC0000", votes2024: 382000, runnerUp: "V. Gopinath",              runnerParty: "AIADMK",     runnerVotes: 205000, wikiSlug: "Chennai_Central_(Lok_Sabha_constituency)" },
  "Coimbatore":      { state: "Tamil Nadu",  constituency: "Coimbatore",        type: "Lok Sabha", mp: "Ganeshamurthi K.",     party: "DMK",    partyColor: "#CC0000", votes2024: 450000, runnerUp: "Singai G. Ramachandran",   runnerParty: "BJP",        runnerVotes: 412000, wikiSlug: "Coimbatore_(Lok_Sabha_constituency)" },
  "Bangalore":       { state: "Karnataka",   constituency: "Bangalore South",   type: "Lok Sabha", mp: "Tejasvi Surya",        party: "BJP",    partyColor: "#FF6B00", votes2024: 865000, runnerUp: "Sowmya Reddy",             runnerParty: "INC",        runnerVotes: 595000, wikiSlug: "Bangalore_South_(Lok_Sabha_constituency)" },
  "Bangalore Urban": { state: "Karnataka",   constituency: "Bangalore North",   type: "Lok Sabha", mp: "Shobha Karandlaje",    party: "BJP",    partyColor: "#FF6B00", votes2024: 901000, runnerUp: "M.V. Rajeev Gowda",        runnerParty: "INC",        runnerVotes: 599000, wikiSlug: "Bangalore_North_(Lok_Sabha_constituency)" },
  "Kolkata":         { state: "West Bengal", constituency: "Kolkata Dakshin",   type: "Lok Sabha", mp: "Mala Roy",             party: "TMC",    partyColor: "#1B8A3E", votes2024: 560000, runnerUp: "Debasree Chaudhuri",       runnerParty: "BJP",        runnerVotes: 384000, wikiSlug: "Kolkata_Dakshin_(Lok_Sabha_constituency)" },
  "Ahmedabad":       { state: "Gujarat",     constituency: "Ahmedabad East",    type: "Lok Sabha", mp: "Hasmukhbhai Patel",    party: "BJP",    partyColor: "#FF6B00", votes2024: 640000, runnerUp: "Girishbhai Patel",         runnerParty: "INC",        runnerVotes: 319000, wikiSlug: "Ahmedabad_East_(Lok_Sabha_constituency)" },
  "Surat":           { state: "Gujarat",     constituency: "Surat",             type: "Lok Sabha", mp: "Mukesh Dalal (uncontested)", party: "BJP", partyColor: "#FF6B00", votes2024: 0, runnerUp: "—", runnerParty: "—",        runnerVotes: 0,      wikiSlug: "Surat_(Lok_Sabha_constituency)" },
  "Hyderabad":       { state: "Telangana",   constituency: "Hyderabad",         type: "Lok Sabha", mp: "Asaduddin Owaisi",     party: "AIMIM",  partyColor: "#006400", votes2024: 338000, runnerUp: "Madhavi Latha",            runnerParty: "BJP",        runnerVotes: 286000, wikiSlug: "Hyderabad_(Lok_Sabha_constituency)" },
  "Jaipur":          { state: "Rajasthan",   constituency: "Jaipur",            type: "Lok Sabha", mp: "Manju Sharma",         party: "BJP",    partyColor: "#FF6B00", votes2024: 620000, runnerUp: "Pratap Singh Khachariyawas", runnerParty: "INC",      runnerVotes: 410000, wikiSlug: "Jaipur_(Lok_Sabha_constituency)" },
  "Lucknow":         { state: "Uttar Pradesh","constituency": "Lucknow",        type: "Lok Sabha", mp: "Rajnath Singh",        party: "BJP",    partyColor: "#FF6B00", votes2024: 623000, runnerUp: "Ravidas Mehrotra",         runnerParty: "SP",         runnerVotes: 394000, wikiSlug: "Lucknow_(Lok_Sabha_constituency)" },
  "Varanasi":        { state: "Uttar Pradesh","constituency": "Varanasi",       type: "Lok Sabha", mp: "Narendra Modi",        party: "BJP",    partyColor: "#FF6B00", votes2024: 612000, runnerUp: "Ajay Rai",                 runnerParty: "INC",        runnerVotes: 235000, wikiSlug: "Varanasi_(Lok_Sabha_constituency)" },
  "Patna":           { state: "Bihar",       constituency: "Patna Sahib",       type: "Lok Sabha", mp: "Ravi Shankar Prasad",  party: "BJP",    partyColor: "#FF6B00", votes2024: 540000, runnerUp: "Anshul Avijit",            runnerParty: "INC",        runnerVotes: 340000, wikiSlug: "Patna_Sahib_(Lok_Sabha_constituency)" },
  "Bhopal":          { state: "Madhya Pradesh","constituency": "Bhopal",        type: "Lok Sabha", mp: "Alok Sharma",          party: "BJP",    partyColor: "#FF6B00", votes2024: 620000, runnerUp: "Arun Shrivastava",         runnerParty: "INC",        runnerVotes: 334000, wikiSlug: "Bhopal_(Lok_Sabha_constituency)" },
};

