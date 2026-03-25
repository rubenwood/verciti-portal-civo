// Greenskills EdTech Mock Data with GDPR Anonymized Users

export const modules = [
  "Hydrogen Fundamentals",
  "Solar Power",
  "Wind Energy",
  "Energy Storage",
  "Introduction to Power Electronics",
  "Intermediate Power Electronics",
  "Introduction to Motors and Drives",
  "Hazardous Voltages",
] as const;

export const courses = [
  {
    id: "course-1",
    name: "Electrification",
    description: "Comprehensive pathway covering electrical systems and power electronics",
    modules: [
      "Introduction to Power Electronics",
      "Intermediate Power Electronics",
      "Introduction to Motors and Drives",
      "Hazardous Voltages",
    ],
  },
  {
    id: "course-2",
    name: "Hydrogen",
    description: "Complete hydrogen technology and energy storage pathway",
    modules: [
      "Hydrogen Fundamentals",
      "Energy Storage",
      "Solar Power",
      "Wind Energy",
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

// Generate anonymized user data
const generateAnonymizedId = (index: number) => `USR-${String(index + 1).padStart(4, '0')}`;
const generateAnonymizedEmail = (index: number) => `user${index + 1}@anonymized.local`;

export const userActivityData: UserActivity[] = [
  {
    id: "1",
    anonymizedName: "User #1847",
    anonymizedEmail: generateAnonymizedEmail(1847),
    userId: generateAnonymizedId(1847),
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
    anonymizedName: "User #2391",
    anonymizedEmail: generateAnonymizedEmail(2391),
    userId: generateAnonymizedId(2391),
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
    anonymizedName: "User #0934",
    anonymizedEmail: generateAnonymizedEmail(934),
    userId: generateAnonymizedId(934),
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
    anonymizedName: "User #5672",
    anonymizedEmail: generateAnonymizedEmail(5672),
    userId: generateAnonymizedId(5672),
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
    anonymizedName: "User #8123",
    anonymizedEmail: generateAnonymizedEmail(8123),
    userId: generateAnonymizedId(8123),
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
    anonymizedName: "User #1847",
    anonymizedEmail: generateAnonymizedEmail(1847),
    userId: generateAnonymizedId(1847),
    assessmentName: "Hydrogen Fundamentals Assessment",
    module: "Hydrogen Fundamentals",
    timestamp: "2024-03-15T15:45:00",
    duration: "25m",
    score: 85,
    maxScore: 100,
    passed: true,
    questions: [
      {
        id: "q1",
        questionNumber: 1,
        questionText: "What is the primary method of producing green hydrogen?",
        options: ["Steam methane reforming", "Electrolysis using renewable energy", "Coal gasification", "Partial oxidation"],
        userAnswer: "Electrolysis using renewable energy",
        correctAnswer: "Electrolysis using renewable energy",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q2",
        questionNumber: 2,
        questionText: "What color classification is given to hydrogen produced from natural gas with carbon capture?",
        options: ["Green", "Grey", "Blue", "Pink"],
        userAnswer: "Blue",
        correctAnswer: "Blue",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q3",
        questionNumber: 3,
        questionText: "Which of the following is NOT a common application for hydrogen fuel cells?",
        options: ["Electric vehicles", "Backup power systems", "Residential heating only", "Industrial processes"],
        userAnswer: "Industrial processes",
        correctAnswer: "Residential heating only",
        isCorrect: false,
        points: 0,
        maxPoints: 10,
      },
      {
        id: "q4",
        questionNumber: 4,
        questionText: "What is the energy density of hydrogen compared to gasoline by weight?",
        options: ["Lower", "About the same", "Approximately 3x higher", "Approximately 10x higher"],
        userAnswer: "Approximately 3x higher",
        correctAnswer: "Approximately 3x higher",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q5",
        questionNumber: 5,
        questionText: "Explain the key safety considerations when handling hydrogen gas in an industrial setting.",
        userAnswer: "Hydrogen is highly flammable and requires proper ventilation, leak detection systems, and flame arrestors. Storage must be in approved containers with pressure relief valves.",
        correctAnswer: "Key considerations include: flammability (wide explosive range), need for ventilation, leak detection, proper storage containers, grounding to prevent static discharge, and trained personnel.",
        isCorrect: true,
        points: 15,
        maxPoints: 20,
      },
    ],
  },
  {
    id: "aa2",
    anonymizedName: "User #2391",
    anonymizedEmail: generateAnonymizedEmail(2391),
    userId: generateAnonymizedId(2391),
    assessmentName: "Wind Energy Certification Exam",
    module: "Wind Energy",
    timestamp: "2024-03-15T12:30:00",
    duration: "35m",
    score: 92,
    maxScore: 100,
    passed: true,
    questions: [
      {
        id: "q6",
        questionNumber: 1,
        questionText: "What is the typical cut-in wind speed for a modern utility-scale wind turbine?",
        options: ["1-2 m/s", "3-4 m/s", "8-10 m/s", "15-20 m/s"],
        userAnswer: "3-4 m/s",
        correctAnswer: "3-4 m/s",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q7",
        questionNumber: 2,
        questionText: "Which component is responsible for converting mechanical energy to electrical energy in a wind turbine?",
        options: ["Gearbox", "Generator", "Transformer", "Rotor"],
        userAnswer: "Generator",
        correctAnswer: "Generator",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q8",
        questionNumber: 3,
        questionText: "What is the Betz limit in wind energy?",
        options: ["Maximum rotor speed", "Maximum wind speed", "Maximum theoretical efficiency (~59.3%)", "Maximum blade length"],
        userAnswer: "Maximum theoretical efficiency (~59.3%)",
        correctAnswer: "Maximum theoretical efficiency (~59.3%)",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
    ],
  },
  {
    id: "aa3",
    anonymizedName: "User #0934",
    anonymizedEmail: generateAnonymizedEmail(934),
    userId: generateAnonymizedId(934),
    assessmentName: "Power Electronics Fundamentals",
    module: "Introduction to Power Electronics",
    timestamp: "2024-03-14T18:15:00",
    duration: "40m",
    score: 100,
    maxScore: 100,
    passed: true,
    questions: [
      {
        id: "q9",
        questionNumber: 1,
        questionText: "What is the primary function of a buck converter?",
        options: ["Step-up voltage", "Step-down voltage", "Convert AC to DC", "Convert DC to AC"],
        userAnswer: "Step-down voltage",
        correctAnswer: "Step-down voltage",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q10",
        questionNumber: 2,
        questionText: "Which semiconductor device is most commonly used in modern high-frequency switching applications?",
        options: ["BJT", "Thyristor", "MOSFET", "TRIAC"],
        userAnswer: "MOSFET",
        correctAnswer: "MOSFET",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q11",
        questionNumber: 3,
        questionText: "Describe the operation of a half-bridge inverter circuit.",
        userAnswer: "A half-bridge inverter uses two switches (typically MOSFETs or IGBTs) connected in series across the DC bus. By alternately switching the devices, an AC output is generated at the midpoint. The switching frequency and duty cycle control the output voltage and frequency.",
        correctAnswer: "A half-bridge inverter consists of two switches in series across DC supply. Alternating switching produces AC at the midpoint. Filter components smooth the output waveform.",
        isCorrect: true,
        points: 20,
        maxPoints: 20,
      },
    ],
  },
  {
    id: "aa4",
    anonymizedName: "User #5672",
    anonymizedEmail: generateAnonymizedEmail(5672),
    userId: generateAnonymizedId(5672),
    assessmentName: "Hazardous Voltages Safety Certification",
    module: "Hazardous Voltages",
    timestamp: "2024-03-12T15:05:00",
    duration: "30m",
    score: 100,
    maxScore: 100,
    passed: true,
    questions: [
      {
        id: "q12",
        questionNumber: 1,
        questionText: "At what voltage level is electrical work generally considered hazardous?",
        options: ["Above 12V", "Above 50V AC / 120V DC", "Above 240V", "Above 1000V"],
        userAnswer: "Above 50V AC / 120V DC",
        correctAnswer: "Above 50V AC / 120V DC",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
      {
        id: "q13",
        questionNumber: 2,
        questionText: "What is the correct order of steps for Lockout/Tagout (LOTO) procedures?",
        options: [
          "Notify, Shutdown, Isolate, Lock, Verify, Tag",
          "Shutdown, Lock, Verify, Tag, Notify, Isolate",
          "Prepare, Notify, Shutdown, Isolate, Lock/Tag, Verify",
          "Lock, Tag, Shutdown, Isolate, Notify, Verify"
        ],
        userAnswer: "Prepare, Notify, Shutdown, Isolate, Lock/Tag, Verify",
        correctAnswer: "Prepare, Notify, Shutdown, Isolate, Lock/Tag, Verify",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
    ],
  },
  {
    id: "aa5",
    anonymizedName: "User #1847",
    anonymizedEmail: generateAnonymizedEmail(1847),
    userId: generateAnonymizedId(1847),
    assessmentName: "Solar Power Systems Quiz",
    module: "Solar Power",
    timestamp: "2024-03-12T17:00:00",
    duration: "20m",
    score: 70,
    maxScore: 100,
    passed: false,
    questions: [
      {
        id: "q14",
        questionNumber: 1,
        questionText: "What is the typical efficiency range of commercial monocrystalline solar panels?",
        options: ["5-10%", "15-22%", "30-40%", "50-60%"],
        userAnswer: "30-40%",
        correctAnswer: "15-22%",
        isCorrect: false,
        points: 0,
        maxPoints: 10,
      },
      {
        id: "q15",
        questionNumber: 2,
        questionText: "Which type of inverter is best suited for residential rooftop installations with partial shading?",
        options: ["String inverter", "Microinverters", "Central inverter", "Hybrid inverter"],
        userAnswer: "Microinverters",
        correctAnswer: "Microinverters",
        isCorrect: true,
        points: 10,
        maxPoints: 10,
      },
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
  isExternal: boolean;
  verified: boolean;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  earnedDate: string;
  module: string;
  icon: string;
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
  badges: Badge[];
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
        isExternal: true,
        verified: true,
      },
      {
        id: "qual2",
        name: "Hydrogen Fundamentals Certification",
        issuingBody: "Greenskills",
        dateObtained: "2024-03-10",
        isExternal: false,
        verified: true,
      },
    ],
    badges: [
      { id: "b1", name: "Hydrogen Pioneer", description: "Completed Hydrogen Fundamentals module", earnedDate: "2024-03-10", module: "Hydrogen Fundamentals", icon: "hydrogen" },
      { id: "b2", name: "Quick Learner", description: "Completed 5 activities in one week", earnedDate: "2024-02-20", module: "General", icon: "star" },
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
        isExternal: true,
        verified: true,
      },
      {
        id: "qual4",
        name: "Wind Energy Certification",
        issuingBody: "Greenskills",
        dateObtained: "2024-03-15",
        isExternal: false,
        verified: true,
      },
    ],
    badges: [
      { id: "b3", name: "Wind Master", description: "Achieved 100% in Wind Energy assessment", earnedDate: "2024-03-15", module: "Wind Energy", icon: "wind" },
      { id: "b4", name: "Perfect Score", description: "Scored 100% on an assessment", earnedDate: "2024-03-15", module: "Wind Energy", icon: "trophy" },
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
        isExternal: true,
        verified: false,
      },
    ],
    badges: [],
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
    badges: [],
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
    qualifications: [
      {
        id: "qual6",
        name: "Power Electronics Certification",
        issuingBody: "Greenskills",
        dateObtained: "2024-03-14",
        isExternal: false,
        verified: true,
      },
    ],
    badges: [
      { id: "b5", name: "Power Pro", description: "Completed Power Electronics module", earnedDate: "2024-03-14", module: "Introduction to Power Electronics", icon: "zap" },
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
        id: "qual7",
        name: "Hazardous Voltages Safety Certification",
        issuingBody: "Greenskills",
        dateObtained: "2024-03-12",
        isExternal: false,
        verified: true,
      },
      {
        id: "qual8",
        name: "18th Edition Wiring Regulations",
        issuingBody: "IET",
        dateObtained: "2023-09-10",
        documentName: "18th_Edition_Cert.pdf",
        isExternal: true,
        verified: true,
      },
    ],
    badges: [
      { id: "b6", name: "Safety Champion", description: "Achieved 100% in Hazardous Voltages", earnedDate: "2024-03-12", module: "Hazardous Voltages", icon: "shield" },
    ],
    completedActivities: ["Hazardous Voltages", "Introduction to Motors and Drives"],
  },
];
