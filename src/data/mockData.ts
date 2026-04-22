export type TimelineEvent = {
  id: string;
  title: string;
  description: string;
  whyItMatters: string;
  actionSteps: string[];
  advancedDetails: string;
};

export const timelineData: TimelineEvent[] = [
  {
    id: "registration",
    title: "Registration",
    description: "Master the prerequisites. Learn about eligibility, verification, and the foundational requirements of the franchise.",
    whyItMatters: "Without registering, you cannot exercise your democratic right to vote.",
    actionSteps: ["Check if you are 18+ years old", "Verify your name on the voter list", "Apply for a Voter ID if missing"],
    advancedDetails: "The Electoral Registration Officer (ERO) oversees the preparation of the electoral roll. Special summary revisions are conducted every year to add new voters."
  },
  {
    id: "primaries",
    title: "Primaries",
    description: "The phase where political parties select their official candidates through internal elections or caucuses.",
    whyItMatters: "Primaries determine the final choices you'll have on the general election ballot.",
    actionSteps: ["Register with a political party (if required by your state)", "Research primary candidates", "Vote in your local primary or caucus"],
    advancedDetails: "Some states have open primaries where any registered voter can participate, while others have closed primaries restricted to party members."
  },
  {
    id: "campaigns",
    title: "Campaigns",
    description: "Candidates reach out to voters to share their manifestos, debate opponents, and seek support.",
    whyItMatters: "This is when you learn about the candidates' specific policy positions, their promises, and their track records.",
    actionSteps: ["Read official party manifestos", "Watch candidate debates", "Verify claims and candidate backgrounds"],
    advancedDetails: "The Model Code of Conduct (MCC) comes into effect during this time to ensure a level playing field and prevent the misuse of official machinery."
  },
  {
    id: "general-election",
    title: "General Election",
    description: "Voters visit their designated polling booths to cast their final votes and determine the winners.",
    whyItMatters: "Your vote directly contributes to choosing the representative for your constituency and shaping the government.",
    actionSteps: ["Locate your designated polling booth", "Bring acceptable ID", "Cast your vote using the provided system (EVM or paper ballot)"],
    advancedDetails: "VVPAT (Voter Verifiable Paper Audit Trail) systems may be used alongside electronic machines so you can verify your vote was recorded correctly."
  },
  {
    id: "certification",
    title: "Certification",
    description: "The formal process where election officials verify counts, audit results, and officially declare the winners.",
    whyItMatters: "Certification is the legal step that confirms every valid ballot has been counted correctly and lawfully, finalizing the election.",
    actionSteps: ["Follow official state/local announcements", "Understand the audit procedures", "Recognize the legal finality of the process"],
    advancedDetails: "Returning Officers and election boards conduct canvassing and resolve discrepancies before the final results are legally certified."
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
