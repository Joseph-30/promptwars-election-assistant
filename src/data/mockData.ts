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
    id: "pre-election",
    title: "Pre-election & Eligibility",
    description: "The phase where citizens ensure they are eligible to vote and register on the electoral roll.",
    whyItMatters: "Without registering, you cannot exercise your democratic right to vote.",
    actionSteps: ["Check if you are 18+ years old", "Verify your name on the voter list", "Apply for a Voter ID if missing"],
    advancedDetails: "The Electoral Registration Officer (ERO) oversees the preparation of the electoral roll. Special summary revisions are conducted every year to add new voters."
  },
  {
    id: "campaigning",
    title: "Campaigning",
    description: "Candidates and political parties reach out to voters to share their manifestos and seek support.",
    whyItMatters: "This is when you learn about the candidates, their promises, and their track records to make an informed choice.",
    actionSteps: ["Read party manifestos", "Attend public debates or meetings", "Verify candidate backgrounds"],
    advancedDetails: "The Model Code of Conduct (MCC) comes into effect during this time to ensure free and fair elections, preventing ruling parties from misusing official machinery."
  },
  {
    id: "voting-day",
    title: "Voting Day",
    description: "Voters visit their designated polling booths to cast their votes using EVMs (Electronic Voting Machines).",
    whyItMatters: "Your vote directly contributes to choosing the representative for your constituency.",
    actionSteps: ["Carry your Voter ID or approved ID", "Go to your designated polling booth", "Press the button against your chosen candidate or NOTA"],
    advancedDetails: "VVPAT (Voter Verifiable Paper Audit Trail) is used alongside EVMs so you can verify that your vote went to the correct candidate."
  },
  {
    id: "counting",
    title: "Counting",
    description: "Votes cast in all polling stations are counted under the supervision of the Returning Officer.",
    whyItMatters: "This ensures transparency and determines the collective choice of the constituency.",
    actionSteps: ["Follow news updates", "Wait for official declarations"],
    advancedDetails: "Counting agents from different parties are present to ensure the process is completely transparent and tamper-proof."
  },
  {
    id: "government-formation",
    title: "Government Formation",
    description: "The party or coalition with a majority of seats forms the government.",
    whyItMatters: "This shapes the leadership and policies of the country/state for the next term.",
    actionSteps: ["Observe the new cabinet", "Understand the new policies"],
    advancedDetails: "If no single party has a clear majority, a coalition government may be formed, or the President/Governor may invite the single largest party to prove its majority."
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
    term: "Constituency",
    definition: "A specific geographical area that elects a representative to a legislative body."
  },
  {
    term: "Model Code of Conduct",
    definition: "Guidelines issued by the Election Commission to ensure free and fair elections."
  },
  {
    term: "Electoral Roll",
    definition: "The official list of all eligible voters in a constituency. Also known as the voter list."
  },
  {
    term: "Returning Officer",
    definition: "The official responsible for overseeing the election in a constituency, including the counting of votes."
  },
  {
    term: "EVM",
    definition: "Electronic Voting Machine, used to record and tally votes electronically."
  }
];
