// Greenskills EdTech Mock Data with GDPR Anonymized Users

export const modules = [
  // Electrification modules
  "Electrical Theory (Fundamentals)",
  "Intermediate Electrical Theory",
  "Solar Power",
  "Energy Storage",
  "Hazardous Voltages",
  // Hydrogen modules
  "Hydrogen Fundamentals",
  "Electrolyser(s)",
  "Hydrogen Production",
  "Introduction to Motors and Drives",
  "FCEV",
  "R&D Interactive Laboratories",
  "Plant & Machinery",
  "Wind Energy",
  "Marine",
  "Storage Tanks",
] as const;

export const courses = [
  {
    id: "course-1",
    name: "Electrification",
    description: "Comprehensive pathway covering electrical systems and power electronics",
    modules: [
      "Electrical Theory (Fundamentals)",
      "Intermediate Electrical Theory",
      "Solar Power",
      "Energy Storage",
      "Hazardous Voltages",
    ],
  },
  {
    id: "course-2",
    name: "Hydrogen",
    description: "Complete hydrogen technology and energy storage pathway",
    modules: [
      "Hydrogen Fundamentals",
      "Electrolyser(s)",
      "Hydrogen Production",
      "Introduction to Motors and Drives",
      "FCEV",
      "R&D Interactive Laboratories",
      "Plant & Machinery",
      "Wind Energy",
      "Marine",
      "Storage Tanks",
    ],
  },
] as const;

export interface LoginSession {
  id: string;
  timestamp: string;
  duration: string;
  ipAddress: string;
  device: string;
}

export interface Stage {
  id: string;
  name: string;
  viewedAt: string;
  duration: string;
}

export interface Attempt {
  id: string;
  timestamp: string;
  completionStatus: "completed" | "in-progress" | "abandoned";
  score?: number;
  stages: Stage[];
}

export interface Activity {
  id: string;
  name: string;
  module: string;
  attempts: Attempt[];
}

export interface UserActivity {
  id: string;
  anonymizedName: string;
  anonymizedEmail: string;
  userId: string;
  lastActive: string;
  totalLogins: number;
  activitiesCompleted: number;
  loginSessions: LoginSession[];
  activities: Activity[];
}

export interface AssessmentQuestion {
  id: string;
  questionNumber: number;
  questionText: string;
  options?: string[];
  userAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  maxPoints: number;
}

export interface AssessmentAttempt {
  id: string;
  anonymizedName: string;
  anonymizedEmail: string;
  userId: string;
  assessmentName: string;
  module: string;
  timestamp: string;
  duration: string;
  score: number;
  maxScore: number;
  passed: boolean;
  questions: AssessmentQuestion[];
}

// Use consistent emails across all tables (matching userProfiles)
export const userActivityData: UserActivity[] = [
  {
    id: "1",
    anonymizedName: "User #1",
    anonymizedEmail: "ruben.wood1@gmail.com",
    userId: "USR-0001",
    lastActive: "2024-03-15T14:32:00",
    totalLogins: 24,
    activitiesCompleted: 12,
    loginSessions: [
      { id: "ls1", timestamp: "2024-03-15T14:32:00", duration: "2h 15m", ipAddress: "***.***.1.45", device: "Chrome / Windows" },
      { id: "ls2", timestamp: "2024-03-14T09:15:00", duration: "1h 45m", ipAddress: "***.***.1.45", device: "Chrome / Windows" },
      { id: "ls3", timestamp: "2024-03-12T16:20:00", duration: "3h 00m", ipAddress: "***.***.2.12", device: "Safari / macOS" },
      { id: "ls4", timestamp: "2024-03-10T11:00:00", duration: "45m", ipAddress: "***.***.1.45", device: "Chrome / Windows" },
    ],
    activities: [
      {
        id: "act1",
        name: "Module Introduction",
        module: "Hydrogen Fundamentals",
        attempts: [
          {
            id: "att1",
            timestamp: "2024-03-15T14:35:00",
            completionStatus: "completed",
            score: 95,
            stages: [
              { id: "s1", name: "Welcome & Overview", viewedAt: "2024-03-15T14:35:00", duration: "5m" },
              { id: "s2", name: "Learning Objectives", viewedAt: "2024-03-15T14:40:00", duration: "3m" },
              { id: "s3", name: "Interactive Demo", viewedAt: "2024-03-15T14:43:00", duration: "12m" },
            ],
          },
          {
            id: "att2",
            timestamp: "2024-03-14T09:20:00",
            completionStatus: "abandoned",
            stages: [
              { id: "s4", name: "Welcome & Overview", viewedAt: "2024-03-14T09:20:00", duration: "2m" },
            ],
          },
        ],
      },
      {
        id: "act2",
        name: "Hydrogen Production Methods",
        module: "Hydrogen Fundamentals",
        attempts: [
          {
            id: "att3",
            timestamp: "2024-03-15T15:00:00",
            completionStatus: "completed",
            score: 88,
            stages: [
              { id: "s5", name: "Electrolysis Basics", viewedAt: "2024-03-15T15:00:00", duration: "15m" },
              { id: "s6", name: "Steam Reforming", viewedAt: "2024-03-15T15:15:00", duration: "12m" },
              { id: "s7", name: "Green vs Grey Hydrogen", viewedAt: "2024-03-15T15:27:00", duration: "10m" },
              { id: "s8", name: "Knowledge Check", viewedAt: "2024-03-15T15:37:00", duration: "8m" },
            ],
          },
        ],
      },
      {
        id: "act3",
        name: "Solar Cell Technology",
        module: "Solar Power",
        attempts: [
          {
            id: "att4",
            timestamp: "2024-03-12T16:25:00",
            completionStatus: "in-progress",
            stages: [
              { id: "s9", name: "Photovoltaic Principles", viewedAt: "2024-03-12T16:25:00", duration: "20m" },
              { id: "s10", name: "Cell Types Comparison", viewedAt: "2024-03-12T16:45:00", duration: "15m" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "2",
    anonymizedName: "User #2",
    anonymizedEmail: "chris.shay72@gmail.com",
    userId: "USR-0002",
    lastActive: "2024-03-15T11:20:00",
    totalLogins: 18,
    activitiesCompleted: 8,
    loginSessions: [
      { id: "ls5", timestamp: "2024-03-15T11:20:00", duration: "1h 30m", ipAddress: "***.***.3.78", device: "Firefox / Linux" },
      { id: "ls6", timestamp: "2024-03-13T14:00:00", duration: "2h 00m", ipAddress: "***.***.3.78", device: "Firefox / Linux" },
    ],
    activities: [
      {
        id: "act4",
        name: "Wind Turbine Components",
        module: "Wind Energy",
        attempts: [
          {
            id: "att5",
            timestamp: "2024-03-15T11:25:00",
            completionStatus: "completed",
            score: 92,
            stages: [
              { id: "s11", name: "Rotor Assembly", viewedAt: "2024-03-15T11:25:00", duration: "18m" },
              { id: "s12", name: "Nacelle Systems", viewedAt: "2024-03-15T11:43:00", duration: "15m" },
              { id: "s13", name: "Tower Foundation", viewedAt: "2024-03-15T11:58:00", duration: "12m" },
            ],
          },
        ],
      },
      {
        id: "act5",
        name: "Battery Technology Basics",
        module: "Energy Storage",
        attempts: [
          {
            id: "att6",
            timestamp: "2024-03-13T14:05:00",
            completionStatus: "completed",
            score: 78,
            stages: [
              { id: "s14", name: "Chemistry Fundamentals", viewedAt: "2024-03-13T14:05:00", duration: "22m" },
              { id: "s15", name: "Lithium-ion Deep Dive", viewedAt: "2024-03-13T14:27:00", duration: "25m" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "3",
    anonymizedName: "User #3",
    anonymizedEmail: "nile@verciti.com",
    userId: "USR-0003",
    lastActive: "2024-03-14T16:45:00",
    totalLogins: 32,
    activitiesCompleted: 18,
    loginSessions: [
      { id: "ls7", timestamp: "2024-03-14T16:45:00", duration: "2h 45m", ipAddress: "***.***.5.22", device: "Chrome / Android" },
      { id: "ls8", timestamp: "2024-03-13T10:30:00", duration: "1h 15m", ipAddress: "***.***.5.22", device: "Chrome / Android" },
      { id: "ls9", timestamp: "2024-03-11T09:00:00", duration: "3h 30m", ipAddress: "***.***.6.11", device: "Safari / iOS" },
    ],
    activities: [
      {
        id: "act6",
        name: "Power Converter Basics",
        module: "Introduction to Power Electronics",
        attempts: [
          {
            id: "att7",
            timestamp: "2024-03-14T16:50:00",
            completionStatus: "completed",
            score: 100,
            stages: [
              { id: "s16", name: "DC-DC Converters", viewedAt: "2024-03-14T16:50:00", duration: "20m" },
              { id: "s17", name: "AC-DC Rectifiers", viewedAt: "2024-03-14T17:10:00", duration: "18m" },
              { id: "s18", name: "Inverter Technology", viewedAt: "2024-03-14T17:28:00", duration: "22m" },
              { id: "s19", name: "Practical Applications", viewedAt: "2024-03-14T17:50:00", duration: "15m" },
            ],
          },
        ],
      },
      {
        id: "act7",
        name: "Advanced Switching Techniques",
        module: "Intermediate Power Electronics",
        attempts: [
          {
            id: "att8",
            timestamp: "2024-03-13T10:35:00",
            completionStatus: "in-progress",
            stages: [
              { id: "s20", name: "PWM Fundamentals", viewedAt: "2024-03-13T10:35:00", duration: "25m" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "4",
    anonymizedName: "User #4",
    anonymizedEmail: "test1@verciti.com",
    userId: "USR-0004",
    lastActive: "2024-03-15T09:10:00",
    totalLogins: 15,
    activitiesCompleted: 6,
    loginSessions: [
      { id: "ls10", timestamp: "2024-03-15T09:10:00", duration: "1h 00m", ipAddress: "***.***.8.90", device: "Edge / Windows" },
      { id: "ls11", timestamp: "2024-03-12T13:45:00", duration: "2h 30m", ipAddress: "***.***.8.90", device: "Edge / Windows" },
    ],
    activities: [
      {
        id: "act8",
        name: "Motor Types & Applications",
        module: "Introduction to Motors and Drives",
        attempts: [
          {
            id: "att9",
            timestamp: "2024-03-15T09:15:00",
            completionStatus: "completed",
            score: 85,
            stages: [
              { id: "s21", name: "AC Motor Principles", viewedAt: "2024-03-15T09:15:00", duration: "18m" },
              { id: "s22", name: "DC Motor Basics", viewedAt: "2024-03-15T09:33:00", duration: "15m" },
              { id: "s23", name: "Servo Motors", viewedAt: "2024-03-15T09:48:00", duration: "12m" },
            ],
          },
        ],
      },
      {
        id: "act9",
        name: "Safety Protocols",
        module: "Hazardous Voltages",
        attempts: [
          {
            id: "att10",
            timestamp: "2024-03-12T13:50:00",
            completionStatus: "completed",
            score: 100,
            stages: [
              { id: "s24", name: "Risk Assessment", viewedAt: "2024-03-12T13:50:00", duration: "20m" },
              { id: "s25", name: "PPE Requirements", viewedAt: "2024-03-12T14:10:00", duration: "15m" },
              { id: "s26", name: "Emergency Procedures", viewedAt: "2024-03-12T14:25:00", duration: "18m" },
              { id: "s27", name: "Lockout/Tagout", viewedAt: "2024-03-12T14:43:00", duration: "22m" },
            ],
          },
        ],
      },
    ],
  },
  {
    id: "5",
    anonymizedName: "User #5",
    anonymizedEmail: "test2@verciti.com",
    userId: "USR-0005",
    lastActive: "2024-03-13T18:30:00",
    totalLogins: 9,
    activitiesCompleted: 4,
    loginSessions: [
      { id: "ls12", timestamp: "2024-03-13T18:30:00", duration: "45m", ipAddress: "***.***.9.45", device: "Safari / macOS" },
    ],
    activities: [
      {
        id: "act10",
        name: "Grid Integration",
        module: "Solar Power",
        attempts: [
          {
            id: "att11",
            timestamp: "2024-03-13T18:35:00",
            completionStatus: "abandoned",
            stages: [
              { id: "s28", name: "Grid Connection Types", viewedAt: "2024-03-13T18:35:00", duration: "8m" },
            ],
          },
        ],
      },
    ],
  },
];

export const assessmentAttemptData: AssessmentAttempt[] = [
  {
    id: "aa1",
    anonymizedName: "User #1",
    anonymizedEmail: "ruben.wood1@gmail.com",
    userId: "USR-0001",
    assessmentName: "Hydrogen Fundamentals Assessment",
    module: "Hydrogen Fundamentals",
    timestamp: "2024-03-15T15:45:00",
    duration: "25m",
    score: 85,
    maxScore: 100,
    passed: true,
    questions: [
      { id: "q1", questionNumber: 1, questionText: "What is the primary method of producing green hydrogen?", options: ["Steam methane reforming", "Electrolysis using renewable energy", "Coal gasification", "Partial oxidation"], userAnswer: "Electrolysis using renewable energy", correctAnswer: "Electrolysis using renewable energy", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q2", questionNumber: 2, questionText: "What color classification is given to hydrogen produced from natural gas with carbon capture?", options: ["Green", "Grey", "Blue", "Pink"], userAnswer: "Blue", correctAnswer: "Blue", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q3", questionNumber: 3, questionText: "Which is NOT a common application for hydrogen fuel cells?", options: ["Electric vehicles", "Backup power systems", "Residential heating only", "Industrial processes"], userAnswer: "Industrial processes", correctAnswer: "Residential heating only", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q4", questionNumber: 4, questionText: "What is the energy density of hydrogen compared to gasoline by weight?", options: ["Lower", "About the same", "Approximately 3x higher", "Approximately 10x higher"], userAnswer: "Approximately 3x higher", correctAnswer: "Approximately 3x higher", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q5", questionNumber: 5, questionText: "What is the typical operating temperature of a PEM fuel cell?", options: ["Below 0°C", "60-80°C", "200-300°C", "Above 500°C"], userAnswer: "60-80°C", correctAnswer: "60-80°C", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q6", questionNumber: 6, questionText: "Which gas is produced at the cathode during water electrolysis?", options: ["Hydrogen", "Oxygen", "Nitrogen", "Carbon dioxide"], userAnswer: "Oxygen", correctAnswer: "Hydrogen", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q7", questionNumber: 7, questionText: "What is the main advantage of solid oxide electrolysis?", options: ["Low temperature operation", "Higher efficiency at high temperatures", "Lower capital cost", "No electricity required"], userAnswer: "Higher efficiency at high temperatures", correctAnswer: "Higher efficiency at high temperatures", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q8", questionNumber: 8, questionText: "What pressure is typically used for compressed hydrogen storage in vehicles?", options: ["50 bar", "200 bar", "350-700 bar", "1000+ bar"], userAnswer: "350-700 bar", correctAnswer: "350-700 bar", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q9", questionNumber: 9, questionText: "Which material is commonly used as a catalyst in PEM fuel cells?", options: ["Copper", "Platinum", "Iron", "Nickel"], userAnswer: "Nickel", correctAnswer: "Platinum", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q10", questionNumber: 10, questionText: "What is the byproduct of a hydrogen fuel cell?", options: ["Carbon dioxide", "Water", "Nitrogen", "Methane"], userAnswer: "Water", correctAnswer: "Water", isCorrect: true, points: 10, maxPoints: 10 },
    ],
  },
  {
    id: "aa2",
    anonymizedName: "User #2",
    anonymizedEmail: "chris.shay72@gmail.com",
    userId: "USR-0002",
    assessmentName: "Wind Energy Certification Exam",
    module: "Wind Energy",
    timestamp: "2024-03-15T12:30:00",
    duration: "35m",
    score: 92,
    maxScore: 100,
    passed: true,
    questions: [
      { id: "q11", questionNumber: 1, questionText: "What is the typical cut-in wind speed for a modern utility-scale wind turbine?", options: ["1-2 m/s", "3-4 m/s", "8-10 m/s", "15-20 m/s"], userAnswer: "3-4 m/s", correctAnswer: "3-4 m/s", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q12", questionNumber: 2, questionText: "Which component converts mechanical energy to electrical energy?", options: ["Gearbox", "Generator", "Transformer", "Rotor"], userAnswer: "Generator", correctAnswer: "Generator", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q13", questionNumber: 3, questionText: "What is the Betz limit in wind energy?", options: ["Maximum rotor speed", "Maximum wind speed", "Maximum theoretical efficiency (~59.3%)", "Maximum blade length"], userAnswer: "Maximum theoretical efficiency (~59.3%)", correctAnswer: "Maximum theoretical efficiency (~59.3%)", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q14", questionNumber: 4, questionText: "What is the purpose of a yaw system?", options: ["Control blade pitch", "Orient turbine into wind", "Connect to grid", "Store energy"], userAnswer: "Orient turbine into wind", correctAnswer: "Orient turbine into wind", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q15", questionNumber: 5, questionText: "Which type of wind turbine is most common for utility-scale generation?", options: ["Vertical axis", "Horizontal axis", "Darrieus", "Savonius"], userAnswer: "Horizontal axis", correctAnswer: "Horizontal axis", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q16", questionNumber: 6, questionText: "What is the typical lifespan of a modern wind turbine?", options: ["5-10 years", "10-15 years", "20-25 years", "40-50 years"], userAnswer: "10-15 years", correctAnswer: "20-25 years", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q17", questionNumber: 7, questionText: "What is wake effect in wind farms?", options: ["Noise from turbines", "Reduced wind speed behind turbines", "Visual impact", "Bird mortality"], userAnswer: "Reduced wind speed behind turbines", correctAnswer: "Reduced wind speed behind turbines", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q18", questionNumber: 8, questionText: "What material are most turbine blades made from?", options: ["Steel", "Aluminum", "Fiberglass/composite", "Wood"], userAnswer: "Fiberglass/composite", correctAnswer: "Fiberglass/composite", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q19", questionNumber: 9, questionText: "What is capacity factor?", options: ["Maximum output", "Actual output vs maximum possible", "Efficiency rating", "Power curve"], userAnswer: "Maximum output", correctAnswer: "Actual output vs maximum possible", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q20", questionNumber: 10, questionText: "At what wind speed do turbines typically shut down for safety?", options: ["15 m/s", "20 m/s", "25 m/s", "30 m/s"], userAnswer: "25 m/s", correctAnswer: "25 m/s", isCorrect: true, points: 10, maxPoints: 10 },
    ],
  },
  {
    id: "aa3",
    anonymizedName: "User #3",
    anonymizedEmail: "test1@verciti.com",
    userId: "USR-0004",
    assessmentName: "Electrical Theory Fundamentals",
    module: "Electrical Theory (Fundamentals)",
    timestamp: "2024-03-14T18:15:00",
    duration: "40m",
    score: 60,
    maxScore: 100,
    passed: true,
    questions: [
      { id: "q21", questionNumber: 1, questionText: "What is Ohm's Law?", options: ["V = IR", "P = IV", "V = I/R", "R = V + I"], userAnswer: "V = IR", correctAnswer: "V = IR", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q22", questionNumber: 2, questionText: "What is the unit of electrical resistance?", options: ["Volt", "Ampere", "Ohm", "Watt"], userAnswer: "Ohm", correctAnswer: "Ohm", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q23", questionNumber: 3, questionText: "In a series circuit, what remains constant?", options: ["Voltage", "Current", "Resistance", "Power"], userAnswer: "Voltage", correctAnswer: "Current", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q24", questionNumber: 4, questionText: "What is the frequency of UK mains electricity?", options: ["50 Hz", "60 Hz", "100 Hz", "240 Hz"], userAnswer: "50 Hz", correctAnswer: "50 Hz", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q25", questionNumber: 5, questionText: "What does AC stand for?", options: ["Alternating Current", "Amplified Current", "Automatic Current", "Applied Current"], userAnswer: "Alternating Current", correctAnswer: "Alternating Current", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q26", questionNumber: 6, questionText: "What is power factor?", options: ["Voltage/Current", "Real power/Apparent power", "Current x Time", "Resistance x Current"], userAnswer: "Voltage/Current", correctAnswer: "Real power/Apparent power", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q27", questionNumber: 7, questionText: "Which wire is live in UK wiring?", options: ["Brown", "Blue", "Green/Yellow", "Black"], userAnswer: "Brown", correctAnswer: "Brown", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q28", questionNumber: 8, questionText: "What is the purpose of a fuse?", options: ["Increase voltage", "Protect circuit from overcurrent", "Store energy", "Convert AC to DC"], userAnswer: "Store energy", correctAnswer: "Protect circuit from overcurrent", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q29", questionNumber: 9, questionText: "What is capacitance measured in?", options: ["Henrys", "Farads", "Ohms", "Watts"], userAnswer: "Farads", correctAnswer: "Farads", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q30", questionNumber: 10, questionText: "What happens to total resistance when resistors are in parallel?", options: ["Increases", "Decreases", "Stays same", "Doubles"], userAnswer: "Increases", correctAnswer: "Decreases", isCorrect: false, points: 0, maxPoints: 10 },
    ],
  },
  {
    id: "aa4",
    anonymizedName: "User #4",
    anonymizedEmail: "test2@verciti.com",
    userId: "USR-0005",
    assessmentName: "Hazardous Voltages Safety Certification",
    module: "Hazardous Voltages",
    timestamp: "2024-03-12T15:05:00",
    duration: "30m",
    score: 90,
    maxScore: 100,
    passed: true,
    questions: [
      { id: "q31", questionNumber: 1, questionText: "At what voltage level is electrical work generally considered hazardous?", options: ["Above 12V", "Above 50V AC / 120V DC", "Above 240V", "Above 1000V"], userAnswer: "Above 50V AC / 120V DC", correctAnswer: "Above 50V AC / 120V DC", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q32", questionNumber: 2, questionText: "What is the correct order of LOTO procedures?", options: ["Notify, Shutdown, Isolate, Lock, Verify", "Prepare, Notify, Shutdown, Isolate, Lock/Tag, Verify", "Lock, Tag, Shutdown, Isolate"], userAnswer: "Prepare, Notify, Shutdown, Isolate, Lock/Tag, Verify", correctAnswer: "Prepare, Notify, Shutdown, Isolate, Lock/Tag, Verify", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q33", questionNumber: 3, questionText: "What PPE is required for high voltage work?", options: ["Safety glasses only", "Insulated gloves and arc flash suit", "Hard hat only", "Steel toe boots"], userAnswer: "Insulated gloves and arc flash suit", correctAnswer: "Insulated gloves and arc flash suit", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q34", questionNumber: 4, questionText: "What is arc flash?", options: ["A type of fuse", "Explosive release of energy from an electrical arc", "A testing device", "A wiring method"], userAnswer: "Explosive release of energy from an electrical arc", correctAnswer: "Explosive release of energy from an electrical arc", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q35", questionNumber: 5, questionText: "What is the safe approach distance for 600V equipment?", options: ["1 foot", "3 feet", "10 feet", "25 feet"], userAnswer: "3 feet", correctAnswer: "3 feet", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q36", questionNumber: 6, questionText: "How should you verify de-energization?", options: ["Visual inspection only", "Use voltage tester on known live source then test circuit", "Ask a colleague", "Check the breaker position"], userAnswer: "Use voltage tester on known live source then test circuit", correctAnswer: "Use voltage tester on known live source then test circuit", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q37", questionNumber: 7, questionText: "What is the purpose of grounding?", options: ["Increase voltage", "Provide path for fault current", "Store electricity", "Increase resistance"], userAnswer: "Provide path for fault current", correctAnswer: "Provide path for fault current", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q38", questionNumber: 8, questionText: "Who can remove a lockout device?", options: ["Anyone", "Only the person who applied it", "Supervisors only", "Maintenance staff"], userAnswer: "Anyone", correctAnswer: "Only the person who applied it", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q39", questionNumber: 9, questionText: "What causes most electrical fatalities?", options: ["High voltage", "Low resistance path through body", "Static electricity", "Lightning"], userAnswer: "Low resistance path through body", correctAnswer: "Low resistance path through body", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q40", questionNumber: 10, questionText: "When must electrical work be performed de-energized?", options: ["Never", "Only at night", "Whenever possible unless infeasible", "Only outdoors"], userAnswer: "Whenever possible unless infeasible", correctAnswer: "Whenever possible unless infeasible", isCorrect: true, points: 10, maxPoints: 10 },
    ],
  },
  {
    id: "aa5",
    anonymizedName: "User #1",
    anonymizedEmail: "ruben.wood1@gmail.com",
    userId: "USR-0001",
    assessmentName: "Solar Power Systems Assessment",
    module: "Solar Power",
    timestamp: "2024-03-12T17:00:00",
    duration: "35m",
    score: 50,
    maxScore: 100,
    passed: false,
    questions: [
      { id: "q41", questionNumber: 1, questionText: "What is the typical efficiency of commercial monocrystalline solar panels?", options: ["5-10%", "15-22%", "30-40%", "50-60%"], userAnswer: "30-40%", correctAnswer: "15-22%", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q42", questionNumber: 2, questionText: "Which inverter type is best for partial shading?", options: ["String inverter", "Microinverters", "Central inverter", "Hybrid inverter"], userAnswer: "Microinverters", correctAnswer: "Microinverters", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q43", questionNumber: 3, questionText: "What is the standard test condition (STC) irradiance?", options: ["500 W/m2", "800 W/m2", "1000 W/m2", "1500 W/m2"], userAnswer: "1000 W/m2", correctAnswer: "1000 W/m2", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q44", questionNumber: 4, questionText: "What is MPPT?", options: ["Maximum Power Point Tracking", "Minimum Power Protection Technology", "Module Power Performance Testing", "Main Panel Power Transfer"], userAnswer: "Minimum Power Protection Technology", correctAnswer: "Maximum Power Point Tracking", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q45", questionNumber: 5, questionText: "What happens to solar panel output in hot weather?", options: ["Increases", "Decreases", "Stays same", "Doubles"], userAnswer: "Increases", correctAnswer: "Decreases", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q46", questionNumber: 6, questionText: "What is the typical voltage of a single solar cell?", options: ["0.5-0.6V", "1.5V", "12V", "24V"], userAnswer: "0.5-0.6V", correctAnswer: "0.5-0.6V", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q47", questionNumber: 7, questionText: "What is bypass diode used for?", options: ["Increase voltage", "Prevent hotspots from shading", "Store energy", "Convert DC to AC"], userAnswer: "Convert DC to AC", correctAnswer: "Prevent hotspots from shading", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q48", questionNumber: 8, questionText: "What orientation is optimal in the Northern Hemisphere?", options: ["North facing", "South facing", "East facing", "West facing"], userAnswer: "South facing", correctAnswer: "South facing", isCorrect: true, points: 10, maxPoints: 10 },
      { id: "q49", questionNumber: 9, questionText: "What is the degradation rate of solar panels per year?", options: ["0.5-1%", "5-10%", "15-20%", "25-30%"], userAnswer: "5-10%", correctAnswer: "0.5-1%", isCorrect: false, points: 0, maxPoints: 10 },
      { id: "q50", questionNumber: 10, questionText: "What does kWp stand for?", options: ["Kilowatt peak", "Kilowatt power", "Kilowatt performance", "Kilowatt production"], userAnswer: "Kilowatt performance", correctAnswer: "Kilowatt peak", isCorrect: false, points: 0, maxPoints: 10 },
    ],
  },
];

// Dashboard summary statistics
export const dashboardStats = {
  totalUsers: 247,
  activeToday: 45,
  activitiesCompleted: 1234,
  averageScore: 84.5,
  coursesInProgress: 89,
  certificationsIssued: 156,
};

// User Profile Types
export type UserStatus = "not_signed_up" | "signed_up_not_logged_in" | "active";

export interface Skill {
  id: string;
  name: string;
  level: "beginner" | "intermediate" | "advanced" | "expert";
  progress: number; // 0-100
}

export interface Qualification {
  id: string;
  name: string;
  issuingBody: string;
  dateObtained: string;
  expiryDate?: string;
  documentUrl?: string;
  documentName?: string;
}

export interface Certification {
  id: string;
  activityName: string; // Matches the activity name exactly
  earnedDate: string;
  expiryDate: string; // Typically 1 year after earnedDate
  score: number; // 100 means they achieved 100% to earn this
  verificationCode: string; // Unique code for QR verification
  }

// Training types
export type TrainingStatus = "not_started" | "in_progress" | "completed" | "overdue";

export interface Training {
  id: string;
  title: string;
  isVerciti: boolean; // true = Verciti app training, false = external
  courseName?: string; // For Verciti training
  moduleName?: string; // For Verciti training
  provider?: string; // For external training
  description?: string; // For external training
  deadline: string;
  assignedDate: string;
  status: TrainingStatus;
  completedDate?: string;
  expiryDate?: string; // For completed training, typically 1 year after completion
  }

// Third party training providers
export const trainingProviders = [
  { id: "udemy", name: "Udemy", logo: "U", supportsAccountLinking: true },
  { id: "coursera", name: "Coursera", logo: "C", supportsAccountLinking: true },
  { id: "linkedin", name: "LinkedIn Learning", logo: "L", supportsAccountLinking: true },
  { id: "pluralsight", name: "Pluralsight", logo: "P", supportsAccountLinking: true },
  { id: "skillshare", name: "Skillshare", logo: "S", supportsAccountLinking: true },
  { id: "edx", name: "edX", logo: "E", supportsAccountLinking: true },
  { id: "futurelearn", name: "FutureLearn", logo: "F", supportsAccountLinking: false },
  { id: "oplearn", name: "Open Learn", logo: "O", supportsAccountLinking: false },
  { id: "alison", name: "Alison", logo: "A", supportsAccountLinking: false },
  { id: "other", name: "Other", logo: "?", supportsAccountLinking: false },
] as const;

export interface LinkedProvider {
  providerId: string;
  linkedAt: string;
  accountEmail?: string;
}

export interface UserProfile {
  id: string;
  email: string;
  fullName: string;
  department: string;
  jobTitle: string;
  status: UserStatus;
  dateInvited: string;
  dateSignedUp?: string;
  lastLogin?: string;
  overallProgress: number;
  skills: Skill[];
  qualifications: Qualification[];
  certifications: Certification[];
  training: Training[];
  linkedProviders: LinkedProvider[];
  completedActivities: string[];
  totalTimeSpent: string;
}

export const userProfiles: UserProfile[] = [
  {
    id: "up1",
    email: "ruben.wood1@gmail.com",
    fullName: "Ruben Wood",
    department: "Engineering",
    jobTitle: "Electrical Engineer",
    status: "active",
    dateInvited: "2024-01-15",
    dateSignedUp: "2024-01-16",
    lastLogin: "2024-03-15T14:32:00",
    overallProgress: 78,
    totalTimeSpent: "45h 30m",
    skills: [
      { id: "sk1", name: "Hydrogen Systems", level: "advanced", progress: 85 },
      { id: "sk2", name: "Solar Technology", level: "intermediate", progress: 60 },
      { id: "sk3", name: "Power Electronics", level: "beginner", progress: 25 },
    ],
    qualifications: [
      {
        id: "qual1",
        name: "City & Guilds Level 3 Electrical Installation",
        issuingBody: "City & Guilds",
        dateObtained: "2022-06-15",
        documentUrl: "/documents/cg-level3.pdf",
        documentName: "CG_Level3_Certificate.pdf",
      },
    ],
    certifications: [
      { id: "c1", activityName: "Hydrogen Fundamentals", earnedDate: "2024-03-10", expiryDate: "2025-03-10", score: 100, verificationCode: "GS-HF-UP1-2024031A" },
    ],
training: [
      { id: "t1", title: "Wind Energy", isVerciti: true, courseName: "Hydrogen", moduleName: "Wind Energy", deadline: "2024-04-15", assignedDate: "2024-03-01", status: "in_progress" },
      { id: "t2", title: "Energy Storage", isVerciti: true, courseName: "Hydrogen", moduleName: "Energy Storage", deadline: "2024-04-30", assignedDate: "2024-03-05", status: "not_started" },
      { id: "t3", title: "Electrical Safety Fundamentals", isVerciti: false, provider: "udemy", description: "Complete the electrical safety course on Udemy covering basic principles and regulations.", deadline: "2024-03-20", assignedDate: "2024-02-15", status: "overdue" },
    ],
    linkedProviders: [
      { providerId: "udemy", linkedAt: "2024-02-10", accountEmail: "ruben.wood1@gmail.com" },
    ],
    completedActivities: ["Hydrogen Fundamentals", "Solar Power", "Energy Storage"],
  },
  {
    id: "up2",
    email: "chris.shay72@gmail.com",
    fullName: "Chris Shay",
    department: "Operations",
    jobTitle: "Technical Lead",
    status: "active",
    dateInvited: "2024-01-10",
    dateSignedUp: "2024-01-12",
    lastLogin: "2024-03-15T11:20:00",
    overallProgress: 92,
    totalTimeSpent: "68h 15m",
    skills: [
      { id: "sk4", name: "Wind Energy", level: "expert", progress: 95 },
      { id: "sk5", name: "Energy Storage", level: "advanced", progress: 80 },
      { id: "sk6", name: "Power Electronics", level: "intermediate", progress: 55 },
    ],
    qualifications: [
      {
        id: "qual3",
        name: "BSc Renewable Energy Engineering",
        issuingBody: "University of Manchester",
        dateObtained: "2019-07-01",
        documentUrl: "/documents/bsc-degree.pdf",
        documentName: "BSc_Degree_Certificate.pdf",
      },
    ],
    certifications: [
      { id: "c2", activityName: "Wind Energy", earnedDate: "2024-03-15", expiryDate: "2025-03-15", score: 100, verificationCode: "GS-WE-UP2-2024031B" },
      { id: "c3", activityName: "Energy Storage", earnedDate: "2024-02-28", expiryDate: "2025-02-28", score: 100, verificationCode: "GS-ES-UP2-2024022C" },
    ],
    training: [
      { id: "t4", title: "Intermediate Power Electronics", isVerciti: true, courseName: "Electrification", moduleName: "Intermediate Power Electronics", deadline: "2024-05-01", assignedDate: "2024-03-10", status: "not_started" },
    ],
    linkedProviders: [
      { providerId: "coursera", linkedAt: "2024-01-20", accountEmail: "chris.shay72@gmail.com" },
      { providerId: "linkedin", linkedAt: "2024-02-05", accountEmail: "chris.shay@linkedin.com" },
    ],
    completedActivities: ["Wind Energy", "Energy Storage", "Solar Power", "Hydrogen Fundamentals"],
  },
  {
    id: "up3",
    email: "nile@verciti.com",
    fullName: "Nile Anderson",
    department: "Training",
    jobTitle: "Training Coordinator",
    status: "signed_up_not_logged_in",
    dateInvited: "2024-02-01",
    dateSignedUp: "2024-02-05",
    overallProgress: 0,
    totalTimeSpent: "0m",
    skills: [],
    qualifications: [
      {
        id: "qual5",
        name: "NEBOSH Certificate",
        issuingBody: "NEBOSH",
        dateObtained: "2023-03-20",
        expiryDate: "2026-03-20",
        documentUrl: "/documents/nebosh.pdf",
        documentName: "NEBOSH_Certificate.pdf",
      },
    ],
    certifications: [],
training: [
      { id: "t5", title: "Hydrogen Fundamentals", isVerciti: true, courseName: "Hydrogen", moduleName: "Hydrogen Fundamentals", deadline: "2024-04-01", assignedDate: "2024-02-20", status: "overdue" },
      { id: "t6", title: "Project Management Basics", isVerciti: false, provider: "coursera", description: "Introduction to project management methodology and best practices.", deadline: "2024-04-15", assignedDate: "2024-03-01", status: "in_progress" },
    ],
    linkedProviders: [],
    completedActivities: [],
  },
  {
    id: "up4",
    email: "jack@example.com",
    fullName: "Jack Thompson",
    department: "Maintenance",
    jobTitle: "Maintenance Technician",
    status: "not_signed_up",
    dateInvited: "2024-03-01",
    overallProgress: 0,
    totalTimeSpent: "0m",
    skills: [],
    qualifications: [],
    certifications: [],
    training: [],
    linkedProviders: [],
    completedActivities: [],
  },
  {
    id: "up5",
    email: "test1@verciti.com",
    fullName: "Test User One",
    department: "Engineering",
    jobTitle: "Junior Engineer",
    status: "active",
    dateInvited: "2024-01-20",
    dateSignedUp: "2024-01-21",
    lastLogin: "2024-03-14T16:45:00",
    overallProgress: 65,
    totalTimeSpent: "32h 45m",
    skills: [
      { id: "sk7", name: "Power Electronics", level: "advanced", progress: 90 },
      { id: "sk8", name: "Motors and Drives", level: "intermediate", progress: 60 },
    ],
    qualifications: [],
    certifications: [
      { id: "c4", activityName: "Introduction to Power Electronics", earnedDate: "2024-03-14", expiryDate: "2025-03-14", score: 100, verificationCode: "GS-PE-UP5-2024031D" },
    ],
    training: [
      { id: "t7", title: "Intermediate Power Electronics", isVerciti: true, courseName: "Electrification", moduleName: "Intermediate Power Electronics", deadline: "2024-04-20", assignedDate: "2024-03-15", status: "in_progress" },
      { id: "t8", title: "Hazardous Voltages", isVerciti: true, courseName: "Electrification", moduleName: "Hazardous Voltages", deadline: "2024-05-15", assignedDate: "2024-03-15", status: "not_started" },
    ],
    linkedProviders: [
      { providerId: "pluralsight", linkedAt: "2024-03-01", accountEmail: "test1@verciti.com" },
    ],
    completedActivities: ["Introduction to Power Electronics", "Introduction to Motors and Drives"],
  },
  {
    id: "up6",
    email: "test2@verciti.com",
    fullName: "Test User Two",
    department: "Safety",
    jobTitle: "Safety Officer",
    status: "active",
    dateInvited: "2024-01-25",
    dateSignedUp: "2024-01-26",
    lastLogin: "2024-03-12T15:05:00",
    overallProgress: 45,
    totalTimeSpent: "18h 20m",
    skills: [
      { id: "sk9", name: "Hazardous Voltages", level: "expert", progress: 100 },
      { id: "sk10", name: "Motors and Drives", level: "beginner", progress: 30 },
    ],
    qualifications: [
      {
        id: "qual8",
        name: "18th Edition Wiring Regulations",
        issuingBody: "IET",
        dateObtained: "2023-09-10",
        documentName: "18th_Edition_Cert.pdf",
      },
    ],
    certifications: [
      { id: "c5", activityName: "Hazardous Voltages", earnedDate: "2024-03-12", expiryDate: "2025-03-12", score: 100, verificationCode: "GS-HV-UP6-2024031E" },
    ],
training: [
      { id: "t9", title: "ISO 45001 Safety Management", isVerciti: false, provider: "linkedin", description: "Complete the ISO 45001 Occupational Health and Safety course covering standards and implementation.", deadline: "2024-04-10", assignedDate: "2024-03-01", status: "in_progress" },
    ],
    linkedProviders: [
      { providerId: "linkedin", linkedAt: "2024-02-28", accountEmail: "test2@verciti.com" },
    ],
    completedActivities: ["Hazardous Voltages", "Introduction to Motors and Drives"],
  },
  // Additional Engineers
  { id: "up7", email: "emma.chen@example.com", fullName: "Emma Chen", department: "Engineering", jobTitle: "Senior Engineer", status: "active", dateInvited: "2024-01-05", dateSignedUp: "2024-01-06", lastLogin: "2024-03-18T09:00:00", overallProgress: 92, totalTimeSpent: "68h 15m", skills: [{ id: "sk11", name: "Hydrogen Systems", level: "expert", progress: 100 }], qualifications: [{ id: "qual9", name: "CEng", issuingBody: "Engineering Council", dateObtained: "2022-05-15" }], certifications: [{ id: "c6", activityName: "Hydrogen Fundamentals", earnedDate: "2024-02-15", expiryDate: "2025-02-15", score: 100, verificationCode: "GS-HF-UP7-2024021F" }], training: [], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals", "Electrolyser(s)", "Hydrogen Production"] },
  { id: "up8", email: "james.wilson@example.com", fullName: "James Wilson", department: "Engineering", jobTitle: "Senior Engineer", status: "active", dateInvited: "2024-01-08", dateSignedUp: "2024-01-09", lastLogin: "2024-03-17T14:30:00", overallProgress: 78, totalTimeSpent: "52h 30m", skills: [{ id: "sk12", name: "Energy Storage", level: "advanced", progress: 85 }], qualifications: [], certifications: [{ id: "c7", activityName: "Energy Storage", earnedDate: "2024-03-01", expiryDate: "2025-03-01", score: 100, verificationCode: "GS-ES-UP8-2024030G" }], training: [{ id: "t10", title: "Solar Power", isVerciti: true, courseName: "Electrification", moduleName: "Solar Power", deadline: "2024-04-25", assignedDate: "2024-03-10", status: "in_progress" }], linkedProviders: [], completedActivities: ["Energy Storage", "Electrical Theory (Fundamentals)"] },
  { id: "up9", email: "sarah.jones@example.com", fullName: "Sarah Jones", department: "Engineering", jobTitle: "Senior Engineer", status: "active", dateInvited: "2024-01-10", dateSignedUp: "2024-01-11", lastLogin: "2024-03-16T11:00:00", overallProgress: 65, totalTimeSpent: "45h 10m", skills: [], qualifications: [], certifications: [], training: [{ id: "t11", title: "FCEV", isVerciti: true, courseName: "Hydrogen", moduleName: "FCEV", deadline: "2024-04-30", assignedDate: "2024-03-01", status: "in_progress" }], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals"] },
  { id: "up10", email: "michael.brown@example.com", fullName: "Michael Brown", department: "Engineering", jobTitle: "Senior Engineer", status: "active", dateInvited: "2024-01-12", dateSignedUp: "2024-01-13", lastLogin: "2024-03-15T16:45:00", overallProgress: 88, totalTimeSpent: "61h 20m", skills: [{ id: "sk13", name: "Wind Energy", level: "expert", progress: 100 }], qualifications: [{ id: "qual10", name: "IEng", issuingBody: "Engineering Council", dateObtained: "2021-08-20" }], certifications: [{ id: "c8", activityName: "Wind Energy", earnedDate: "2024-02-20", expiryDate: "2025-02-20", score: 100, verificationCode: "GS-WE-UP10-2024022H" }, { id: "c9", activityName: "Marine", earnedDate: "2024-03-05", expiryDate: "2025-03-05", score: 100, verificationCode: "GS-MA-UP10-2024030I" }], training: [], linkedProviders: [{ providerId: "udemy", linkedAt: "2024-02-01", accountEmail: "michael.brown@example.com" }], completedActivities: ["Wind Energy", "Marine", "Storage Tanks"] },
  { id: "up11", email: "lisa.taylor@example.com", fullName: "Lisa Taylor", department: "Engineering", jobTitle: "Senior Engineer", status: "signed_up_not_logged_in", dateInvited: "2024-02-01", dateSignedUp: "2024-02-02", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [], certifications: [], training: [{ id: "t12", title: "Electrical Theory (Fundamentals)", isVerciti: true, courseName: "Electrification", moduleName: "Electrical Theory (Fundamentals)", deadline: "2024-03-15", assignedDate: "2024-02-05", status: "overdue" }], linkedProviders: [], completedActivities: [] },
  { id: "up12", email: "david.martinez@example.com", fullName: "David Martinez", department: "Engineering", jobTitle: "Senior Engineer", status: "active", dateInvited: "2024-01-15", dateSignedUp: "2024-01-16", lastLogin: "2024-03-18T08:30:00", overallProgress: 72, totalTimeSpent: "48h 45m", skills: [{ id: "sk14", name: "Power Electronics", level: "advanced", progress: 80 }], qualifications: [], certifications: [{ id: "c10", activityName: "Intermediate Electrical Theory", earnedDate: "2024-03-10", expiryDate: "2025-03-10", score: 100, verificationCode: "GS-IE-UP12-2024031J" }], training: [], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)", "Intermediate Electrical Theory"] },
  // Additional Junior Engineers
  { id: "up13", email: "amy.wang@example.com", fullName: "Amy Wang", department: "Engineering", jobTitle: "Junior Engineer", status: "active", dateInvited: "2024-02-01", dateSignedUp: "2024-02-02", lastLogin: "2024-03-17T10:15:00", overallProgress: 45, totalTimeSpent: "28h 30m", skills: [{ id: "sk15", name: "Solar Power", level: "intermediate", progress: 55 }], qualifications: [], certifications: [{ id: "c11", activityName: "Solar Power", earnedDate: "2024-03-12", expiryDate: "2025-03-12", score: 100, verificationCode: "GS-SP-UP13-2024031K" }], training: [{ id: "t13", title: "Energy Storage", isVerciti: true, courseName: "Electrification", moduleName: "Energy Storage", deadline: "2024-05-01", assignedDate: "2024-03-15", status: "not_started" }], linkedProviders: [], completedActivities: ["Solar Power", "Electrical Theory (Fundamentals)"] },
  { id: "up14", email: "tom.harris@example.com", fullName: "Tom Harris", department: "Engineering", jobTitle: "Junior Engineer", status: "active", dateInvited: "2024-02-05", dateSignedUp: "2024-02-06", lastLogin: "2024-03-16T14:00:00", overallProgress: 35, totalTimeSpent: "22h 15m", skills: [], qualifications: [], certifications: [], training: [{ id: "t14", title: "Hydrogen Fundamentals", isVerciti: true, courseName: "Hydrogen", moduleName: "Hydrogen Fundamentals", deadline: "2024-04-15", assignedDate: "2024-02-10", status: "in_progress" }], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)"] },
  { id: "up15", email: "rachel.green@example.com", fullName: "Rachel Green", department: "Engineering", jobTitle: "Junior Engineer", status: "active", dateInvited: "2024-02-08", dateSignedUp: "2024-02-09", lastLogin: "2024-03-18T11:30:00", overallProgress: 52, totalTimeSpent: "34h 40m", skills: [{ id: "sk16", name: "Hydrogen Systems", level: "beginner", progress: 40 }], qualifications: [], certifications: [{ id: "c12", activityName: "Hydrogen Fundamentals", earnedDate: "2024-03-08", expiryDate: "2025-03-08", score: 100, verificationCode: "GS-HF-UP15-2024030L" }], training: [], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals", "Electrolyser(s)"] },
  { id: "up16", email: "kevin.lee@example.com", fullName: "Kevin Lee", department: "Engineering", jobTitle: "Junior Engineer", status: "signed_up_not_logged_in", dateInvited: "2024-02-10", dateSignedUp: "2024-02-11", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [], certifications: [], training: [{ id: "t15", title: "Electrical Theory (Fundamentals)", isVerciti: true, courseName: "Electrification", moduleName: "Electrical Theory (Fundamentals)", deadline: "2024-04-01", assignedDate: "2024-02-15", status: "overdue" }], linkedProviders: [], completedActivities: [] },
  { id: "up17", email: "jennifer.clark@example.com", fullName: "Jennifer Clark", department: "Engineering", jobTitle: "Junior Engineer", status: "active", dateInvited: "2024-02-12", dateSignedUp: "2024-02-13", lastLogin: "2024-03-17T09:45:00", overallProgress: 28, totalTimeSpent: "18h 20m", skills: [], qualifications: [], certifications: [], training: [], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)"] },
  { id: "up18", email: "alex.robinson@example.com", fullName: "Alex Robinson", department: "Engineering", jobTitle: "Junior Engineer", status: "active", dateInvited: "2024-02-15", dateSignedUp: "2024-02-16", lastLogin: "2024-03-18T13:00:00", overallProgress: 42, totalTimeSpent: "26h 50m", skills: [{ id: "sk17", name: "Energy Storage", level: "beginner", progress: 35 }], qualifications: [], certifications: [], training: [{ id: "t16", title: "Wind Energy", isVerciti: true, courseName: "Hydrogen", moduleName: "Wind Energy", deadline: "2024-04-20", assignedDate: "2024-03-01", status: "in_progress" }], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals"] },
  { id: "up19", email: "mark.thompson@example.com", fullName: "Mark Thompson", department: "Engineering", jobTitle: "Junior Engineer", status: "not_signed_up", dateInvited: "2024-03-01", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [], certifications: [], training: [], linkedProviders: [], completedActivities: [] },
  { id: "up20", email: "sophie.wright@example.com", fullName: "Sophie Wright", department: "Engineering", jobTitle: "Junior Engineer", status: "active", dateInvited: "2024-02-18", dateSignedUp: "2024-02-19", lastLogin: "2024-03-15T15:30:00", overallProgress: 58, totalTimeSpent: "38h 10m", skills: [{ id: "sk18", name: "Wind Energy", level: "intermediate", progress: 60 }], qualifications: [], certifications: [{ id: "c13", activityName: "Wind Energy", earnedDate: "2024-03-14", expiryDate: "2025-03-14", score: 100, verificationCode: "GS-WE-UP20-2024031M" }], training: [], linkedProviders: [{ providerId: "coursera", linkedAt: "2024-03-01", accountEmail: "sophie.wright@example.com" }], completedActivities: ["Wind Energy", "Hydrogen Fundamentals"] },
  // Additional Safety Officers
  { id: "up21", email: "paul.anderson@example.com", fullName: "Paul Anderson", department: "Safety", jobTitle: "Safety Officer", status: "active", dateInvited: "2024-01-02", dateSignedUp: "2024-01-03", lastLogin: "2024-03-18T08:00:00", overallProgress: 85, totalTimeSpent: "58h 30m", skills: [{ id: "sk19", name: "Hazardous Voltages", level: "expert", progress: 100 }], qualifications: [{ id: "qual11", name: "NEBOSH Diploma", issuingBody: "NEBOSH", dateObtained: "2021-06-15" }], certifications: [{ id: "c14", activityName: "Hazardous Voltages", earnedDate: "2024-02-25", expiryDate: "2025-02-25", score: 100, verificationCode: "GS-HV-UP21-2024022N" }], training: [], linkedProviders: [], completedActivities: ["Hazardous Voltages", "Electrical Theory (Fundamentals)", "Intermediate Electrical Theory"] },
  { id: "up22", email: "karen.white@example.com", fullName: "Karen White", department: "Safety", jobTitle: "Safety Officer", status: "active", dateInvited: "2024-01-05", dateSignedUp: "2024-01-06", lastLogin: "2024-03-17T16:20:00", overallProgress: 72, totalTimeSpent: "48h 15m", skills: [{ id: "sk20", name: "Safety Compliance", level: "advanced", progress: 85 }], qualifications: [{ id: "qual12", name: "IOSH Managing Safely", issuingBody: "IOSH", dateObtained: "2022-09-20" }], certifications: [{ id: "c15", activityName: "Hazardous Voltages", earnedDate: "2024-03-02", expiryDate: "2025-03-02", score: 100, verificationCode: "GS-HV-UP22-2024030O" }], training: [{ id: "t17", title: "Plant & Machinery", isVerciti: true, courseName: "Hydrogen", moduleName: "Plant & Machinery", deadline: "2024-04-30", assignedDate: "2024-03-05", status: "in_progress" }], linkedProviders: [], completedActivities: ["Hazardous Voltages", "Electrical Theory (Fundamentals)"] },
  { id: "up23", email: "steve.hall@example.com", fullName: "Steve Hall", department: "Safety", jobTitle: "Safety Officer", status: "active", dateInvited: "2024-01-08", dateSignedUp: "2024-01-09", lastLogin: "2024-03-16T10:45:00", overallProgress: 55, totalTimeSpent: "36h 40m", skills: [], qualifications: [], certifications: [], training: [{ id: "t18", title: "Hazardous Voltages", isVerciti: true, courseName: "Electrification", moduleName: "Hazardous Voltages", deadline: "2024-04-10", assignedDate: "2024-02-20", status: "in_progress" }], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)"] },
  { id: "up24", email: "michelle.adams@example.com", fullName: "Michelle Adams", department: "Safety", jobTitle: "Safety Officer", status: "active", dateInvited: "2024-01-10", dateSignedUp: "2024-01-11", lastLogin: "2024-03-18T14:15:00", overallProgress: 68, totalTimeSpent: "44h 25m", skills: [{ id: "sk21", name: "Hazardous Voltages", level: "advanced", progress: 75 }], qualifications: [], certifications: [{ id: "c16", activityName: "Hazardous Voltages", earnedDate: "2024-03-08", expiryDate: "2025-03-08", score: 100, verificationCode: "GS-HV-UP24-2024030P" }], training: [], linkedProviders: [{ providerId: "linkedin", linkedAt: "2024-02-15", accountEmail: "michelle.adams@example.com" }], completedActivities: ["Hazardous Voltages", "Intermediate Electrical Theory"] },
  { id: "up25", email: "robert.king@example.com", fullName: "Robert King", department: "Safety", jobTitle: "Safety Officer", status: "signed_up_not_logged_in", dateInvited: "2024-02-01", dateSignedUp: "2024-02-02", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [{ id: "qual13", name: "NEBOSH Certificate", issuingBody: "NEBOSH", dateObtained: "2023-01-10" }], certifications: [], training: [{ id: "t19", title: "Electrical Theory (Fundamentals)", isVerciti: true, courseName: "Electrification", moduleName: "Electrical Theory (Fundamentals)", deadline: "2024-03-20", assignedDate: "2024-02-05", status: "overdue" }], linkedProviders: [], completedActivities: [] },
  { id: "up26", email: "laura.scott@example.com", fullName: "Laura Scott", department: "Safety", jobTitle: "Safety Officer", status: "active", dateInvited: "2024-01-15", dateSignedUp: "2024-01-16", lastLogin: "2024-03-17T11:30:00", overallProgress: 78, totalTimeSpent: "52h 10m", skills: [{ id: "sk22", name: "Safety Compliance", level: "expert", progress: 95 }], qualifications: [{ id: "qual14", name: "CDM Principal Designer", issuingBody: "CITB", dateObtained: "2022-04-15" }], certifications: [{ id: "c17", activityName: "Hazardous Voltages", earnedDate: "2024-02-18", expiryDate: "2025-02-18", score: 100, verificationCode: "GS-HV-UP26-2024021Q" }, { id: "c18", activityName: "Plant & Machinery", earnedDate: "2024-03-12", expiryDate: "2025-03-12", score: 100, verificationCode: "GS-PM-UP26-2024031R" }], training: [], linkedProviders: [], completedActivities: ["Hazardous Voltages", "Plant & Machinery", "Electrical Theory (Fundamentals)"] },
  { id: "up27", email: "daniel.moore@example.com", fullName: "Daniel Moore", department: "Safety", jobTitle: "Safety Officer", status: "active", dateInvited: "2024-01-18", dateSignedUp: "2024-01-19", lastLogin: "2024-03-18T09:30:00", overallProgress: 42, totalTimeSpent: "28h 45m", skills: [], qualifications: [], certifications: [], training: [], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)"] },
  { id: "up28", email: "emily.jackson@example.com", fullName: "Emily Jackson", department: "Safety", jobTitle: "Safety Officer", status: "not_signed_up", dateInvited: "2024-03-01", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [], certifications: [], training: [], linkedProviders: [], completedActivities: [] },
  { id: "up29", email: "chris.lewis@example.com", fullName: "Chris Lewis", department: "Safety", jobTitle: "Safety Officer", status: "active", dateInvited: "2024-01-22", dateSignedUp: "2024-01-23", lastLogin: "2024-03-16T15:00:00", overallProgress: 62, totalTimeSpent: "40h 20m", skills: [{ id: "sk23", name: "Hazardous Voltages", level: "intermediate", progress: 65 }], qualifications: [], certifications: [{ id: "c19", activityName: "Hazardous Voltages", earnedDate: "2024-03-15", expiryDate: "2025-03-15", score: 100, verificationCode: "GS-HV-UP29-2024031S" }], training: [], linkedProviders: [], completedActivities: ["Hazardous Voltages"] },
  // Additional Maintenance Technicians
  { id: "up30", email: "brian.young@example.com", fullName: "Brian Young", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-03", dateSignedUp: "2024-01-04", lastLogin: "2024-03-18T07:30:00", overallProgress: 75, totalTimeSpent: "50h 15m", skills: [{ id: "sk24", name: "Plant & Machinery", level: "expert", progress: 100 }], qualifications: [{ id: "qual15", name: "City & Guilds Level 3", issuingBody: "City & Guilds", dateObtained: "2020-11-20" }], certifications: [{ id: "c20", activityName: "Plant & Machinery", earnedDate: "2024-02-28", expiryDate: "2025-02-28", score: 100, verificationCode: "GS-PM-UP30-2024022T" }], training: [], linkedProviders: [], completedActivities: ["Plant & Machinery", "Electrical Theory (Fundamentals)", "Storage Tanks"] },
  { id: "up31", email: "nicole.allen@example.com", fullName: "Nicole Allen", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-06", dateSignedUp: "2024-01-07", lastLogin: "2024-03-17T13:45:00", overallProgress: 58, totalTimeSpent: "38h 30m", skills: [{ id: "sk25", name: "Motors and Drives", level: "advanced", progress: 80 }], qualifications: [], certifications: [{ id: "c21", activityName: "Introduction to Motors and Drives", earnedDate: "2024-03-05", expiryDate: "2025-03-05", score: 100, verificationCode: "GS-MD-UP31-2024030U" }], training: [{ id: "t20", title: "Plant & Machinery", isVerciti: true, courseName: "Hydrogen", moduleName: "Plant & Machinery", deadline: "2024-04-25", assignedDate: "2024-03-10", status: "in_progress" }], linkedProviders: [], completedActivities: ["Introduction to Motors and Drives", "Electrical Theory (Fundamentals)"] },
  { id: "up32", email: "jason.turner@example.com", fullName: "Jason Turner", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-09", dateSignedUp: "2024-01-10", lastLogin: "2024-03-16T08:15:00", overallProgress: 45, totalTimeSpent: "30h 10m", skills: [], qualifications: [], certifications: [], training: [{ id: "t21", title: "Storage Tanks", isVerciti: true, courseName: "Hydrogen", moduleName: "Storage Tanks", deadline: "2024-04-15", assignedDate: "2024-02-25", status: "in_progress" }], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)"] },
  { id: "up33", email: "amanda.hill@example.com", fullName: "Amanda Hill", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-12", dateSignedUp: "2024-01-13", lastLogin: "2024-03-18T10:00:00", overallProgress: 68, totalTimeSpent: "45h 25m", skills: [{ id: "sk26", name: "Hydrogen Systems", level: "intermediate", progress: 65 }], qualifications: [{ id: "qual16", name: "NVQ Level 2", issuingBody: "City & Guilds", dateObtained: "2021-06-10" }], certifications: [{ id: "c22", activityName: "Hydrogen Fundamentals", earnedDate: "2024-03-10", expiryDate: "2025-03-10", score: 100, verificationCode: "GS-HF-UP33-2024031V" }], training: [], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals", "Electrolyser(s)"] },
  { id: "up34", email: "peter.phillips@example.com", fullName: "Peter Phillips", department: "Maintenance", jobTitle: "Maintenance Technician", status: "signed_up_not_logged_in", dateInvited: "2024-02-01", dateSignedUp: "2024-02-02", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [], certifications: [], training: [{ id: "t22", title: "Electrical Theory (Fundamentals)", isVerciti: true, courseName: "Electrification", moduleName: "Electrical Theory (Fundamentals)", deadline: "2024-03-25", assignedDate: "2024-02-05", status: "overdue" }], linkedProviders: [], completedActivities: [] },
  { id: "up35", email: "helen.campbell@example.com", fullName: "Helen Campbell", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-15", dateSignedUp: "2024-01-16", lastLogin: "2024-03-17T15:30:00", overallProgress: 82, totalTimeSpent: "55h 40m", skills: [{ id: "sk27", name: "Storage Tanks", level: "expert", progress: 95 }], qualifications: [], certifications: [{ id: "c23", activityName: "Storage Tanks", earnedDate: "2024-02-22", expiryDate: "2025-02-22", score: 100, verificationCode: "GS-ST-UP35-2024022W" }, { id: "c24", activityName: "Plant & Machinery", earnedDate: "2024-03-08", expiryDate: "2025-03-08", score: 100, verificationCode: "GS-PM-UP35-2024030X" }], training: [], linkedProviders: [{ providerId: "udemy", linkedAt: "2024-02-10", accountEmail: "helen.campbell@example.com" }], completedActivities: ["Storage Tanks", "Plant & Machinery", "Hydrogen Fundamentals"] },
  { id: "up36", email: "gary.mitchell@example.com", fullName: "Gary Mitchell", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-18", dateSignedUp: "2024-01-19", lastLogin: "2024-03-18T12:15:00", overallProgress: 38, totalTimeSpent: "25h 20m", skills: [], qualifications: [], certifications: [], training: [], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)"] },
  { id: "up37", email: "sandra.roberts@example.com", fullName: "Sandra Roberts", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-20", dateSignedUp: "2024-01-21", lastLogin: "2024-03-16T14:30:00", overallProgress: 55, totalTimeSpent: "36h 50m", skills: [{ id: "sk28", name: "Motors and Drives", level: "intermediate", progress: 55 }], qualifications: [], certifications: [{ id: "c25", activityName: "Introduction to Motors and Drives", earnedDate: "2024-03-12", expiryDate: "2025-03-12", score: 100, verificationCode: "GS-MD-UP37-2024031Y" }], training: [{ id: "t23", title: "FCEV", isVerciti: true, courseName: "Hydrogen", moduleName: "FCEV", deadline: "2024-05-01", assignedDate: "2024-03-15", status: "not_started" }], linkedProviders: [], completedActivities: ["Introduction to Motors and Drives"] },
  { id: "up38", email: "donald.carter@example.com", fullName: "Donald Carter", department: "Maintenance", jobTitle: "Maintenance Technician", status: "not_signed_up", dateInvited: "2024-03-05", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [{ id: "qual17", name: "BTEC Level 3", issuingBody: "Pearson", dateObtained: "2019-07-15" }], certifications: [], training: [], linkedProviders: [], completedActivities: [] },
  { id: "up39", email: "patricia.evans@example.com", fullName: "Patricia Evans", department: "Maintenance", jobTitle: "Maintenance Technician", status: "active", dateInvited: "2024-01-25", dateSignedUp: "2024-01-26", lastLogin: "2024-03-17T09:00:00", overallProgress: 72, totalTimeSpent: "48h 15m", skills: [{ id: "sk29", name: "Plant & Machinery", level: "advanced", progress: 85 }], qualifications: [], certifications: [{ id: "c26", activityName: "Plant & Machinery", earnedDate: "2024-03-01", expiryDate: "2025-03-01", score: 100, verificationCode: "GS-PM-UP39-2024030Z" }], training: [], linkedProviders: [], completedActivities: ["Plant & Machinery", "Storage Tanks"] },
  // Additional Project Managers
  { id: "up40", email: "richard.baker@example.com", fullName: "Richard Baker", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-02", dateSignedUp: "2024-01-03", lastLogin: "2024-03-18T08:45:00", overallProgress: 88, totalTimeSpent: "62h 30m", skills: [{ id: "sk30", name: "Hydrogen Systems", level: "advanced", progress: 85 }], qualifications: [{ id: "qual18", name: "PMP", issuingBody: "PMI", dateObtained: "2021-03-15" }], certifications: [{ id: "c27", activityName: "Hydrogen Fundamentals", earnedDate: "2024-02-10", expiryDate: "2025-02-10", score: 100, verificationCode: "GS-HF-UP40-2024021AA" }, { id: "c28", activityName: "FCEV", earnedDate: "2024-03-05", expiryDate: "2025-03-05", score: 100, verificationCode: "GS-FC-UP40-2024030AB" }], training: [], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals", "Electrolyser(s)", "FCEV", "Hydrogen Production"] },
  { id: "up41", email: "susan.nelson@example.com", fullName: "Susan Nelson", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-05", dateSignedUp: "2024-01-06", lastLogin: "2024-03-17T14:00:00", overallProgress: 72, totalTimeSpent: "48h 20m", skills: [{ id: "sk31", name: "Wind Energy", level: "advanced", progress: 80 }], qualifications: [{ id: "qual19", name: "PRINCE2 Practitioner", issuingBody: "AXELOS", dateObtained: "2022-08-20" }], certifications: [{ id: "c29", activityName: "Wind Energy", earnedDate: "2024-03-02", expiryDate: "2025-03-02", score: 100, verificationCode: "GS-WE-UP41-2024030AC" }], training: [{ id: "t24", title: "Marine", isVerciti: true, courseName: "Hydrogen", moduleName: "Marine", deadline: "2024-04-30", assignedDate: "2024-03-10", status: "in_progress" }], linkedProviders: [], completedActivities: ["Wind Energy", "Hydrogen Fundamentals"] },
  { id: "up42", email: "charles.murphy@example.com", fullName: "Charles Murphy", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-08", dateSignedUp: "2024-01-09", lastLogin: "2024-03-16T11:30:00", overallProgress: 55, totalTimeSpent: "36h 45m", skills: [], qualifications: [], certifications: [], training: [{ id: "t25", title: "R&D Interactive Laboratories", isVerciti: true, courseName: "Hydrogen", moduleName: "R&D Interactive Laboratories", deadline: "2024-04-20", assignedDate: "2024-02-28", status: "in_progress" }], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals"] },
  { id: "up43", email: "margaret.cook@example.com", fullName: "Margaret Cook", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-10", dateSignedUp: "2024-01-11", lastLogin: "2024-03-18T15:00:00", overallProgress: 65, totalTimeSpent: "42h 10m", skills: [{ id: "sk32", name: "Energy Storage", level: "intermediate", progress: 60 }], qualifications: [{ id: "qual20", name: "APM PMQ", issuingBody: "APM", dateObtained: "2023-02-28" }], certifications: [{ id: "c30", activityName: "Energy Storage", earnedDate: "2024-03-10", expiryDate: "2025-03-10", score: 100, verificationCode: "GS-ES-UP43-2024031AD" }], training: [], linkedProviders: [{ providerId: "linkedin", linkedAt: "2024-02-20", accountEmail: "margaret.cook@example.com" }], completedActivities: ["Energy Storage", "Solar Power"] },
  { id: "up44", email: "joseph.rogers@example.com", fullName: "Joseph Rogers", department: "Projects", jobTitle: "Project Manager", status: "signed_up_not_logged_in", dateInvited: "2024-02-01", dateSignedUp: "2024-02-02", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [{ id: "qual21", name: "MSP Foundation", issuingBody: "AXELOS", dateObtained: "2022-05-10" }], certifications: [], training: [{ id: "t26", title: "Electrical Theory (Fundamentals)", isVerciti: true, courseName: "Electrification", moduleName: "Electrical Theory (Fundamentals)", deadline: "2024-03-30", assignedDate: "2024-02-05", status: "overdue" }], linkedProviders: [], completedActivities: [] },
  { id: "up45", email: "dorothy.morgan@example.com", fullName: "Dorothy Morgan", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-15", dateSignedUp: "2024-01-16", lastLogin: "2024-03-17T10:30:00", overallProgress: 78, totalTimeSpent: "52h 25m", skills: [{ id: "sk33", name: "Marine Systems", level: "advanced", progress: 80 }], qualifications: [], certifications: [{ id: "c31", activityName: "Marine", earnedDate: "2024-02-25", expiryDate: "2025-02-25", score: 100, verificationCode: "GS-MA-UP45-2024022AE" }, { id: "c32", activityName: "Wind Energy", earnedDate: "2024-03-12", expiryDate: "2025-03-12", score: 100, verificationCode: "GS-WE-UP45-2024031AF" }], training: [], linkedProviders: [], completedActivities: ["Marine", "Wind Energy", "Storage Tanks"] },
  { id: "up46", email: "andrew.bell@example.com", fullName: "Andrew Bell", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-18", dateSignedUp: "2024-01-19", lastLogin: "2024-03-16T09:15:00", overallProgress: 42, totalTimeSpent: "28h 30m", skills: [], qualifications: [], certifications: [], training: [], linkedProviders: [], completedActivities: ["Hydrogen Fundamentals"] },
  { id: "up47", email: "betty.ward@example.com", fullName: "Betty Ward", department: "Projects", jobTitle: "Project Manager", status: "not_signed_up", dateInvited: "2024-03-01", overallProgress: 0, totalTimeSpent: "0m", skills: [], qualifications: [], certifications: [], training: [], linkedProviders: [], completedActivities: [] },
  { id: "up48", email: "george.cox@example.com", fullName: "George Cox", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-22", dateSignedUp: "2024-01-23", lastLogin: "2024-03-18T11:45:00", overallProgress: 58, totalTimeSpent: "38h 15m", skills: [{ id: "sk34", name: "Hydrogen Production", level: "intermediate", progress: 55 }], qualifications: [], certifications: [{ id: "c33", activityName: "Hydrogen Production", earnedDate: "2024-03-08", expiryDate: "2025-03-08", score: 100, verificationCode: "GS-HP-UP48-2024030AG" }], training: [{ id: "t27", title: "FCEV", isVerciti: true, courseName: "Hydrogen", moduleName: "FCEV", deadline: "2024-04-25", assignedDate: "2024-03-12", status: "in_progress" }], linkedProviders: [], completedActivities: ["Hydrogen Production", "Hydrogen Fundamentals"] },
  { id: "up49", email: "ruth.howard@example.com", fullName: "Ruth Howard", department: "Projects", jobTitle: "Project Manager", status: "active", dateInvited: "2024-01-25", dateSignedUp: "2024-01-26", lastLogin: "2024-03-17T16:00:00", overallProgress: 82, totalTimeSpent: "55h 40m", skills: [{ id: "sk35", name: "Electrification", level: "advanced", progress: 85 }], qualifications: [{ id: "qual22", name: "PRINCE2 Foundation", issuingBody: "AXELOS", dateObtained: "2020-11-15" }], certifications: [{ id: "c34", activityName: "Electrical Theory (Fundamentals)", earnedDate: "2024-02-15", expiryDate: "2025-02-15", score: 100, verificationCode: "GS-ET-UP49-2024021AH" }, { id: "c35", activityName: "Solar Power", earnedDate: "2024-03-05", expiryDate: "2025-03-05", score: 100, verificationCode: "GS-SP-UP49-2024030AI" }], training: [], linkedProviders: [], completedActivities: ["Electrical Theory (Fundamentals)", "Solar Power", "Intermediate Electrical Theory"] },
];
