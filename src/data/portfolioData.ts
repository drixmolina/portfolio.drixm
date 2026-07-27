export interface PortfolioProfile {
  name: string;
  professionalName: string;
  role: string;
  introduction: string;
  email: string;
  location: string;
  availability: string;
  portrait: string;
  resumeUrl: string;
  githubUrl: string;
  linkedinUrl: string;
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  shortDescription: string;
  context: string;
  role: string;
  contributions: string[];
  technologies: string[];
  result?: string;
  image: ProjectImage;
  screenshots: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  caseStudyUrl?: string;
}

export interface PortfolioExperience {
  id: string;
  role: string;
  organization: string;
  period: string;
  description: string;
  responsibilities: string[];
}

export interface PortfolioCredential {
  id: string;
  title: string;
  issuer: string;
  issueDate: string;
  credentialUrl: string;
}

export interface PortfolioSkillGroup {
  category: string;
  skills: string[];
}

export const profile: PortfolioProfile = {
  name: "Drix Paulo E. Molina",
  professionalName: "Drix Molina",
  role: "Full-Stack Developer",
  introduction:
    "I build practical web and mobile experiences that turn complex workflows into clear, usable systems. My work spans full-stack development, interface design, testing, and dependable technical support.",
  email: "drixmolina31@gmail.com",
  location: "Philippines",
  availability: "Available for junior full-stack opportunities",
  portrait: "/profile/drix-portrait-new.png",
  resumeUrl: "/resume/Drix_Molina_Resume.pdf",
  githubUrl: "https://github.com/drixmolina",
  linkedinUrl: "https://www.linkedin.com/in/drix-molina-a1ba62321/",
};

export const navigation = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

const highlySucceedImages: ProjectImage[] = [
  ["employee-management.jpeg", "Employee management dashboard", 1240, 549],
  ["attendance-timekeeping.jpeg", "Attendance and timekeeping records", 1240, 549],
  ["leave-management.jpeg", "Leave request and approval workflow", 1240, 549],
  ["admin-panel.jpeg", "Role-based administration panel", 1240, 549],
  ["employee-cards.jpeg", "Employee cards and search filters", 1240, 549],
  ["login.jpeg", "Role-based login screen", 1240, 549],
].map(([file, caption, width, height]) => ({
  url: `/projects/highly-succeed/${file}`,
  alt: `${caption} from the Highly Succeed employee management system`,
  caption: String(caption),
  width: Number(width),
  height: Number(height),
}));

const faciliteaseImages: ProjectImage[] = [
  ["web-dashboard.jpeg", "Facilities dashboard and reservation overview", 532, 298],
  ["web-master-records.jpeg", "Reservation and master records", 637, 310],
  ["web-login.jpeg", "FacilitEASE web login", 540, 250],
  ["mobile-dashboard.jpeg", "Mobile dashboard and venue usage summary", 255, 461],
  ["mobile-reservation-request.jpeg", "Mobile reservation request", 252, 414],
  ["mobile-service-request.jpeg", "Mobile service request", 225, 526],
  ["mobile-login.jpeg", "FacilitEASE mobile login", 196, 455],
].map(([file, caption, width, height]) => ({
  url: `/projects/facilitease-extra/${file}`,
  alt: `${caption} in the FacilitEASE system`,
  caption: String(caption),
  width: Number(width),
  height: Number(height),
}));

export const projects: PortfolioProject[] = [
  {
    id: "highly-succeed",
    title: "Highly Succeed Employee & Inventory Management System",
    shortDescription:
      "A responsive internal system that brings employee, attendance, leave, onboarding, inventory, and administrative workflows into one interface.",
    context: "Internship / OJT project at Highly Succeed Inc.",
    role: "Junior Web Developer Intern",
    contributions: [
      "Built responsive React interfaces and reusable components.",
      "Developed employee record, onboarding, and search experiences.",
      "Supported attendance, timekeeping, and leave approval workflows.",
      "Improved inventory and role-based administration interfaces.",
    ],
    technologies: ["React", "JavaScript", "HTML", "CSS"],
    result:
      "A unified interface for the company’s core employee, inventory, reporting, and administration workflows.",
    image: highlySucceedImages[0],
    screenshots: highlySucceedImages,
    githubUrl: "https://github.com/drixmolina/Highlysucceed",
  },
  {
    id: "facilitease",
    title: "FacilitEASE",
    shortDescription:
      "A web and mobile property management system for reservations, job orders, inventory, maintenance, personnel dispatch, and notifications.",
    context: "Academic capstone for the FEU Diliman Facilities Office",
    role: "Capstone Developer, Documentation Contributor, and System Tester",
    contributions: [
      "Mapped manual facilities workflows into coordinated web and mobile modules.",
      "Supported interface design, documentation, and research revisions.",
      "Tested reservation, job order, service request, dispatch, and inventory flows.",
      "Prepared visual materials and supported the project presentation.",
    ],
    technologies: ["Kotlin", "PHP", "JavaScript", "XAMPP", "Expo Go"],
    result:
      "A completed capstone system centralizing facilities workflows across web and mobile applications.",
    image: {
      url: "/projects/facilitease-thumbnail.png",
      alt: "FacilitEASE web and mobile application presentation",
      caption: "FacilitEASE web and mobile property management system",
      width: 2048,
      height: 1152,
    },
    screenshots: faciliteaseImages,
    caseStudyUrl: "#facilitease-case-study",
  },
];

export const experience: PortfolioExperience[] = [
  {
    id: "highly-succeed-internship",
    role: "Junior Web Developer Intern",
    organization: "Highly Succeed Inc.",
    period: "2024",
    description:
      "Contributed to an internal employee and inventory management system during an internship placement.",
    responsibilities: [
      "Developed responsive pages and reusable React components.",
      "Implemented and refined employee-facing workflows.",
      "Debugged interface issues and improved usability.",
      "Collaborated with cross-functional teammates on feature delivery.",
    ],
  },
  {
    id: "apd-junior-associate",
    role: "Junior Associate",
    organization: "Assemblage of Programmers and Developers",
    period: "2023–2026",
    description:
      "Participated in a student developer community focused on collaboration, technical activities, and knowledge sharing.",
    responsibilities: [
      "Contributed to programming initiatives and collaborative projects.",
      "Supported IT Week and organization activities.",
      "Shared development knowledge within the community.",
    ],
  },
];

export const skillGroups: PortfolioSkillGroup[] = [
  {
    category: "Frontend",
    skills: ["HTML5", "CSS3", "JavaScript", "TypeScript", "React"],
  },
  {
    category: "Backend",
    skills: ["Node.js", "Express", "PHP"],
  },
  {
    category: "Database",
    skills: ["MySQL", "MongoDB", "Firebase"],
  },
  {
    category: "Development Tools",
    skills: ["Git", "GitHub", "VS Code", "Figma"],
  },
  {
    category: "IT & Networking",
    skills: ["Cisco", "Network Security", "Device Configuration"],
  },
  {
    category: "Automation",
    skills: ["AI Automation", "Prompt Engineering"],
  },
];

export const credentials: PortfolioCredential[] = [
  {
    id: "html-css",
    title: "IT Specialist — HTML and CSS",
    issuer: "Certiport / Pearson VUE",
    issueDate: "December 2024",
    credentialUrl: "/certifications/HTML & CSS.pdf",
  },
  {
    id: "python",
    title: "IT Specialist — Python",
    issuer: "Certiport / Pearson VUE",
    issueDate: "January 2024",
    credentialUrl: "/certifications/Python.pdf",
  },
  {
    id: "networking",
    title: "IT Specialist — Networking",
    issuer: "Cisco / Certiport",
    issueDate: "July 2024",
    credentialUrl: "/certifications/Networking.pdf",
  },
  {
    id: "network-security",
    title: "IT Specialist — Network Security",
    issuer: "Cisco / Certiport",
    issueDate: "July 2025",
    credentialUrl: "/certifications/Network Security.pdf",
  },
  {
    id: "device-configuration",
    title: "IT Specialist — Device Configuration and Management",
    issuer: "Cisco / Certiport",
    issueDate: "December 2025",
    credentialUrl: "/certifications/device confi.pdf",
  },
];

export const faciliteaseCaseStudy = {
  title: "FacilitEASE — From Research to a Validated Property Management System",
  context:
    "A web and mobile capstone created for the FEU Diliman Facilities Office to replace fragmented, paper-based facilities workflows.",
  role: "Capstone Developer, Documentation Contributor, and System Tester",
  projectType: "Academic capstone · Web and mobile applications",
  technologies: ["Kotlin", "PHP", "JavaScript", "XAMPP", "Expo Go"],
  challenge:
    "Manual processes limited real-time visibility, slowed communication, increased double-booking risk, and made pending job orders difficult to track.",
  users: [
    "Facilities Office administrators",
    "Approvers",
    "Facilities personnel",
    "Requestors",
  ],
  solution:
    "FacilitEASE connects requestors, approvers, administrators, and facilities personnel through role-based workflows for reservations, service requests, inventory updates, approval decisions, and personnel dispatch.",
  modules: [
    "Venue and equipment reservations",
    "Job orders and service reports",
    "Inventory and property records",
    "Property maintenance",
    "Priority-based personnel dispatch",
    "Notifications and status updates",
    "Reservation calendar",
  ],
  responsibilities: [
    "Analyzed existing Facilities Office workflows and manual processes.",
    "Supported interface design, diagrams, project documentation, and research revisions.",
    "Tested reservation, job order, service request, dispatch, and inventory workflows.",
    "Prepared visual aids and supported the capstone exhibit presentation.",
  ],
  validation:
    "The team tested the project’s reservation, job order, service request, personnel dispatch, and inventory workflows before presenting the completed system.",
  outcome:
    "The completed capstone centralized facilities workflows across web and mobile applications and received Best in Website and Best in Trailer recognition.",
  photograph: {
    url: "/projects/facilitease-project-demo.jpg",
    alt: "Drix Molina and the FacilitEASE team presenting the system during the capstone exhibit",
    caption: "FacilitEASE project demonstration during the capstone exhibit.",
    width: 1200,
    height: 1600,
  },
  interfaceImage: {
    url: "/projects/facilitease-web-dashboard-current.png",
    alt: "FacilitEASE web dashboard with calendar, reservations, and announcements",
    caption: "Web dashboard connecting reservations, calendars, and announcements.",
    width: 532,
    height: 302,
  },
  paperUrl: "/projects/facilitease-paper.pdf",
};

export const socialLinks = [
  {
    label: "GitHub",
    accessibleLabel: "Drix Molina on GitHub",
    href: profile.githubUrl,
    kind: "github",
  },
  {
    label: "LinkedIn",
    accessibleLabel: "Drix Molina on LinkedIn",
    href: profile.linkedinUrl,
    kind: "linkedin",
  },
  {
    label: "Email",
    accessibleLabel: "Email Drix Molina",
    href: `mailto:${profile.email}`,
    kind: "email",
  },
] as const;
