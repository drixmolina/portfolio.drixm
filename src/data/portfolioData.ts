export type Screenshot = { url: string; caption: string };
export type Project = {
  id: string; title: string; problem: string; role: string; solution: string;
  features: string[]; technologies: string[]; outcome: string; image: string;
  screenshots: Screenshot[]; github?: string; caseStudy?: string;
};

export const navigation = [
  { id: "hero", label: "Home" }, { id: "about", label: "About" },
  { id: "experience", label: "Experience" }, { id: "projects", label: "Projects" },
  { id: "credentials", label: "Credentials" }, { id: "contact", label: "Contact" },
] as const;

export const roles = ["Full Stack Developer", "IT Support Specialist", "AI Automation Developer"];

export const projects: Project[] = [
  {
    id: "highly-succeed", title: "Highly Succeed Enterprise Employee Management System",
    problem: "The company needed a centralized internal platform for employee records, attendance, leave management, onboarding, inventory, payroll-related records, reports, QR identification, and administrative access.",
    role: "Web Developer / Frontend Developer",
    solution: "A responsive React-based employee and inventory management system with reusable components and role-based workflows.",
    features: ["Employee records", "Attendance and timekeeping", "Leave approval", "Onboarding", "Inventory", "Payroll-related records", "QR ID workflows", "Reports", "Role-based administration"],
    technologies: ["React", "JavaScript", "Enterprise System", "HRIS", "Role-based access"],
    outcome: "A unified interface for the company’s core employee, inventory, reporting, and administration workflows.",
    image: "/projects/highly-succeed/login.jpeg", github: "https://github.com/drixmolina/Highlysucceed",
    screenshots: [
      ["login.jpeg", "Login screen with role credentials"], ["employee-management.jpeg", "Employee management dashboard"],
      ["attendance-timekeeping.jpeg", "Attendance and timekeeping records"], ["leave-management.jpeg", "Leave approval workflow"],
      ["admin-panel.jpeg", "Role-based administration panel"], ["employee-cards.jpeg", "Employee cards and filters"],
    ].map(([file, caption]) => ({ url: `/projects/highly-succeed/${file}`, caption })),
  },
  {
    id: "facilitease", title: "FacilitEASE",
    problem: "The FEU Diliman Facilities Office needed a centralized system for reservations, job requests, inventory, maintenance, property records, and notifications.",
    role: "Capstone Developer, Documentation Contributor, and System Tester",
    solution: "A web and mobile property management and reservation system.",
    features: ["Venue and equipment reservations", "Job order requests", "Service requests", "Inventory records", "Property maintenance", "Personnel dispatch", "Notifications", "Reservation calendar", "Web and mobile applications"],
    technologies: ["Kotlin", "PHP", "JavaScript", "Web application", "Mobile application"],
    outcome: "A completed capstone system that centralizes facilities workflows across web and mobile applications.",
    image: "/projects/facilitease-thumbnail.png", caseStudy: "#facilitease-case-study",
    screenshots: [
      ["web-login.jpeg", "FacilitEASE web login"], ["web-dashboard.jpeg", "Facilities web dashboard"], ["web-master-records.jpeg", "Reservation and master records"],
      ["mobile-login.jpeg", "FacilitEASE mobile login"], ["mobile-dashboard.jpeg", "Mobile dashboard"],
      ["mobile-reservation-request.jpeg", "Mobile reservation request"], ["mobile-service-request.jpeg", "Mobile service request"],
    ].map(([file, caption]) => ({ url: `/projects/facilitease-extra/${file}`, caption })),
  },
];

export const experience = [
  { role: "Web Development Junior Intern", company: "Highly Succeed Inc.", period: "2024", description: "Developed responsive web pages and reusable UI components, collaborated with cross-functional teams, debugged features, and improved the end-user experience.", skills: ["React", "JavaScript", "HTML", "CSS"] },
  { role: "Junior Associate", company: "Assemblage of Programmers and Developers", period: "2023–2026", description: "Contributed to programming initiatives, collaborative projects, IT Week activities, and knowledge sharing within a developer community.", skills: ["Collaboration", "Development", "Community"] },
];

export const skillGroups = [
  ["Frontend", ["HTML5", "CSS3", "JavaScript", "React", "TypeScript"]], ["Backend", ["Node.js", "Express", "PHP"]],
  ["Database", ["MySQL", "MongoDB", "Firebase"]], ["Tools", ["Git", "GitHub", "VS Code", "Figma"]],
  ["IT & Networking", ["Cisco", "Network Security", "Device Configuration"]], ["Automation", ["AI Automation", "Prompt Engineering"]],
] as const;

export const credentials = [
  { title: "HTML & CSS", href: "/certifications/HTML & CSS.pdf" }, { title: "Python", href: "/certifications/Python.pdf" },
  { title: "Networking", href: "/certifications/Networking.pdf" }, { title: "Network Security", href: "/certifications/Network Security.pdf" },
  { title: "Device Configuration", href: "/certifications/device confi.pdf" },
];

export const socialLinks = [
  { label: "GitHub profile", href: "https://github.com/drixmolina", kind: "github" },
  { label: "LinkedIn profile", href: "https://www.linkedin.com/in/drix-molina-a1ba62321/", kind: "linkedin" },
  { label: "Email Drix Molina", href: "mailto:drixmolina31@gmail.com", kind: "email" },
] as const;
