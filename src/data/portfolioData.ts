export interface PortfolioProfile {
  name: string;
  professionalName: string;
  role: string;
  introduction: string;
  email: string;
  location: string;
  availability: string;
  portrait: string;
  portraitSources: {
    avif: string;
    webp: string;
  };
  resumeUrl: string;
  websiteUrl: string;
  plannedDomain: string;
  githubUrl: string;
  linkedinUrl: string;
  education: {
    degree: string;
    specialization: string;
    school: string;
    graduationYear: string;
  };
  currentEmployment: {
    role: string;
    organization: string;
    startDate: string;
    location: string;
  };
}

export interface ProjectImage {
  url: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
  sources?: {
    avif?: string;
    webp?: string;
  };
}

export interface ProjectEvidence {
  value: string;
  label: string;
}

export interface PortfolioProject {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  context: string;
  role: string;
  challenge: string;
  users: string[];
  contributions: string[];
  architecture: string[];
  workflows: string[];
  evidence: ProjectEvidence[];
  technologies: string[];
  result: string;
  image: ProjectImage;
  screenshots: ProjectImage[];
  githubUrl?: string;
  liveUrl?: string;
  paperUrl?: string;
  seo: {
    title: string;
    description: string;
  };
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
    "I build React interfaces and dependable PHP/MySQL workflows for practical web and mobile systems, with testing, documentation, and accessible UI considered throughout.",
  email: "drixmolina31@gmail.com",
  location: "Caloocan, Metro Manila, Philippines",
  availability: "Open to junior full-stack roles in the Philippines and remote teams",
  portrait: "/profile/drix-portrait-new.png",
  portraitSources: {
    avif:
      "/profile/drix-portrait-640.avif 640w, /profile/drix-portrait-960.avif 960w",
    webp:
      "/profile/drix-portrait-640.webp 640w, /profile/drix-portrait-960.webp 960w",
  },
  resumeUrl: "/resume/Drix_Molina_Resume.pdf",
  websiteUrl: "https://webfolio-dm.vercel.app/",
  plannedDomain: "drixmolina.com",
  githubUrl: "https://github.com/drixmolina",
  linkedinUrl: "https://www.linkedin.com/in/drix-molina-a1ba62321/",
  education: {
    degree: "Bachelor of Science in Information Technology",
    specialization: "Web and Mobile Application Development",
    school: "FEU Diliman",
    graduationYear: "2026",
  },
  currentEmployment: {
    role: "Web Developer",
    organization: "Highly Succeed Inc.",
    startDate: "December 2025",
    location: "Mandaluyong City, Philippines",
  },
};

export const navigation = [
  { id: "hero", label: "Home" },
  { id: "projects", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "credentials", label: "Credentials" },
  { id: "contact", label: "Contact" },
] as const;

const highlySucceedImages: ProjectImage[] = [
  ["employee-management", "Employee management dashboard", 1240, 549],
  ["attendance-timekeeping", "Attendance and timekeeping records", 1240, 549],
  ["leave-management", "Leave request and approval workflow", 1240, 549],
  ["admin-panel", "Role-based administration panel", 1240, 549],
  ["employee-cards", "Employee cards and search filters", 1240, 549],
  ["login", "Role-based login screen", 1240, 549],
].map(([file, caption, width, height]) => ({
  url: `/projects/highly-succeed/safe/${file}.webp`,
  sources: {
    avif: `/projects/highly-succeed/safe/${file}.avif`,
    webp: `/projects/highly-succeed/safe/${file}.webp`,
  },
  alt: `${caption} from the Highly Succeed employee management system`,
  caption: `${caption}. Demo identities and credentials are intentionally obscured.`,
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
    slug: "highly-succeed",
    title: "Highly Succeed Employee & Inventory Management System",
    shortDescription:
      "A responsive React interface connecting employee, attendance, leave, onboarding, inventory, reporting, and administration workflows.",
    context: "Company system at Highly Succeed Inc.",
    role: "Web Developer",
    challenge:
      "Employee operations span many connected records and approvals. The interface needed to make those workflows easier to navigate across roles and screen sizes without hiding important status information.",
    users: [
      "System administrators",
      "HR managers",
      "Department heads",
      "Employees",
    ],
    contributions: [
      "Built responsive React interfaces and reusable workflow patterns.",
      "Developed employee record, onboarding, search, and status experiences.",
      "Implemented attendance, timekeeping, and leave approval views.",
      "Refined inventory, reporting, and role-based administration interfaces.",
    ],
    architecture: [
      "React and TypeScript single-page interface",
      "Role-aware navigation across twelve operational modules",
      "Reusable patterns for tables, forms, dashboards, and status feedback",
      "Public repository uses demonstration data; production services are not exposed",
    ],
    workflows: [
      "Authentication and role-aware access",
      "Employee records and onboarding",
      "Attendance and timekeeping",
      "Leave requests and approval",
      "Inventory and supplier records",
      "Reports and administration",
    ],
    evidence: [
      { value: "12", label: "Coordinated modules" },
      { value: "4", label: "Role views" },
      { value: "6", label: "Documented workflows" },
      { value: "Public", label: "Reviewable source" },
    ],
    technologies: ["React", "TypeScript", "JavaScript", "HTML", "CSS"],
    result:
      "A reviewable, responsive system prototype that demonstrates how complex employee and resource workflows can share a coherent interface.",
    image: highlySucceedImages[0],
    screenshots: highlySucceedImages,
    githubUrl: "https://github.com/drixmolina/Highlysucceed",
    seo: {
      title: "Highly Succeed System Case Study | Drix Molina",
      description:
        "A React employee and inventory management system case study by Drix Molina, covering role-aware workflows, responsive UI, and reusable components.",
    },
  },
  {
    id: "facilitease",
    slug: "facilitease",
    title: "FacilitEASE",
    shortDescription:
      "A web and mobile property management system for reservations, job orders, inventory, maintenance, personnel dispatch, and notifications.",
    context: "Academic capstone for the FEU Diliman Facilities Office",
    role: "Capstone Developer, Documentation Contributor, and System Tester",
    challenge:
      "Fragmented, paper-based processes limited real-time visibility, slowed communication, increased double-booking risk, and made pending service work difficult to track.",
    users: [
      "Facilities Office administrators",
      "Approvers",
      "Facilities personnel",
      "Requestors",
    ],
    contributions: [
      "Mapped manual facilities processes into coordinated web and mobile workflows.",
      "Supported interface design, diagrams, documentation, and research revisions.",
      "Tested reservation, job order, service request, dispatch, and inventory flows.",
      "Prepared presentation materials and supported the capstone exhibit.",
    ],
    architecture: [
      "Web and mobile interfaces serving four role groups",
      "PHP and MySQL services developed through XAMPP",
      "Kotlin and Expo Go used during mobile development and testing",
      "Role-based status, notification, reservation, and dispatch workflows",
    ],
    workflows: [
      "Venue and equipment reservations",
      "Job orders and service reports",
      "Inventory and property records",
      "Property maintenance",
      "Priority-based personnel dispatch",
      "Notifications and status updates",
      "Reservation calendar",
    ],
    evidence: [
      { value: "7", label: "Connected modules" },
      { value: "4", label: "Role groups" },
      { value: "Alpha + Beta", label: "Documented testing" },
      { value: "2", label: "Project awards" },
    ],
    technologies: ["PHP", "MySQL", "Kotlin", "JavaScript", "XAMPP", "Expo Go"],
    result:
      "The completed capstone centralized facilities workflows across web and mobile applications and received Best in Website and Best in Trailer recognition.",
    image: {
      url: "/projects/facilitease-thumbnail.png",
      sources: {
        avif:
          "/projects/facilitease-thumbnail-960.avif 960w, /projects/facilitease-thumbnail-1600.avif 1600w",
        webp:
          "/projects/facilitease-thumbnail-960.webp 960w, /projects/facilitease-thumbnail-1600.webp 1600w",
      },
      alt: "FacilitEASE web and mobile application presentation",
      caption: "FacilitEASE web and mobile property management system",
      width: 2048,
      height: 1152,
    },
    screenshots: faciliteaseImages,
    paperUrl: "/projects/facilitease-paper.pdf",
    seo: {
      title: "FacilitEASE Property Management Case Study | Drix Molina",
      description:
        "FacilitEASE is a validated web and mobile property management capstone connecting reservations, job orders, inventory, maintenance, and notifications.",
    },
  },
];

export const projectBySlug = new Map(
  projects.map((project) => [project.slug, project]),
);

export const experience: PortfolioExperience[] = [
  {
    id: "highly-succeed-web-developer",
    role: "Web Developer",
    organization: "Highly Succeed Inc.",
    period: "December 2025 - Present",
    description:
      "Develop and maintain responsive, user-focused interfaces for an employee and inventory management system.",
    responsibilities: [
      "Build reusable React components and responsive operational screens.",
      "Translate requirements into employee, attendance, leave, and inventory workflows.",
      "Debug interface issues and improve accessibility and cross-browser behavior.",
      "Use Git-based delivery and deployment workflows to ship updates.",
    ],
  },
  {
    id: "apd-junior-associate",
    role: "Junior Associate",
    organization: "Assemblage of Programmers and Developers",
    period: "2023 - 2026",
    description:
      "Participated in a student developer community focused on technical collaboration and knowledge sharing.",
    responsibilities: [
      "Contributed to programming initiatives and collaborative activities.",
      "Supported IT Week and organization events.",
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
    category: "Backend & Data",
    skills: ["PHP", "MySQL", "XAMPP", "REST workflows"],
  },
  {
    category: "Mobile & Quality",
    skills: ["Kotlin", "Expo Go", "System Testing", "Responsive Design"],
  },
  {
    category: "Workflow & Delivery",
    skills: ["Git", "GitHub", "Vercel", "Figma", "Technical Documentation"],
  },
];

export const credentials: PortfolioCredential[] = [
  {
    id: "html-css",
    title: "IT Specialist - HTML and CSS",
    issuer: "Certiport / Pearson VUE",
    issueDate: "December 2024",
    credentialUrl: "/certifications/HTML & CSS.pdf",
  },
  {
    id: "python",
    title: "IT Specialist - Python",
    issuer: "Certiport / Pearson VUE",
    issueDate: "January 2025",
    credentialUrl: "/certifications/Python.pdf",
  },
  {
    id: "networking",
    title: "IT Specialist - Networking",
    issuer: "Cisco / Certiport",
    issueDate: "July 2024",
    credentialUrl: "/certifications/Networking.pdf",
  },
  {
    id: "network-security",
    title: "IT Specialist - Network Security",
    issuer: "Cisco / Certiport",
    issueDate: "July 2025",
    credentialUrl: "/certifications/Network Security.pdf",
  },
  {
    id: "device-configuration",
    title: "IT Specialist - Device Configuration and Management",
    issuer: "Cisco / Certiport",
    issueDate: "December 2025",
    credentialUrl: "/certifications/device confi.pdf",
  },
];

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
