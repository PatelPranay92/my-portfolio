import {
  Code2,
  Server,
  Database,
  Brain,
  Wrench,
  Layout,
  Globe,
  Cpu,
  BarChart3,
  Smartphone,
  Shield,
  Workflow,
  type LucideIcon,
} from "lucide-react";

// ─── Navigation ───────────────────────────────────────────────
export const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
] as const;

// ─── Social Links ─────────────────────────────────────────────
export const socialLinks = {
  github: "https://github.com/PatelPranay92",
  linkedin: "https://linkedin.com/in/pranaypatel",
  email: "mailto:patelpranay2004@gmail.com",
} as const;

// ─── Hero Roles ───────────────────────────────────────────────
export const heroRoles = [
  "Full Stack Developer",
  "Software Developer",
  "Problem Solver",
];

// ─── Technologies (Hero floating icons) ───────────────────────
export const technologies = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Node.js",
  "MongoDB",
  "PostgreSQL",
  "Docker",
];

// ─── Skills ───────────────────────────────────────────────────
export interface Skill {
  name: string;
  level: number; // 0-100
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "Frontend",
    icon: Code2,
    skills: [
      { name: "HTML5", level: 95 },
      { name: "CSS3", level: 92 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 88 },
      { name: "React", level: 92 },
      { name: "Next.js", level: 88 },
      { name: "Tailwind CSS", level: 90 },
    ],
  },
  {
    title: "Backend",
    icon: Server,
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 85 },
      { name: "Python", level: 85 },
      { name: "FastAPI", level: 82 },
    ],
  },
  {
    title: "Database",
    icon: Database,
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "PostgreSQL", level: 85 },
      { name: "MySQL", level: 80 },
    ],
  },
  {
    title: "Tools",
    icon: Wrench,
    skills: [
      { name: "Git", level: 90 },
      { name: "GitHub", level: 92 },
      { name: "Docker", level: 80 },
      { name: "Linux", level: 82 },
      { name: "VS Code", level: 95 },
      { name: "Postman", level: 88 },
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────
export interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  github: string;
  technologies: string[];
  features: string[];
  caseStudy: {
    problem: string;
    businessNeed: string;
    challenges: string[];
    solution: string;
    process: string[];
    improvements: string[];
    lessons: string[];
  };
  stats: {
    label: string;
    value: string;
  }[];
}

export const projects: Project[] = [
  {
    id: "doctor-appointment",
    title: "Doctor Appointment System UI/UX",
    description:
      "Mobile-first healthcare appointment booking application with modern UI/UX principles and user-friendly patient experience.",
    category: "Healthcare Application",
    github:
      "https://github.com/PatelPranay92/Doctor-Appointment-System-UI-UX-for-mobile-App",
    technologies: ["React Native", "TypeScript", "Figma", "REST API", "Node.js"],
    features: [
      "Intuitive appointment booking flow",
      "Doctor search and filtering",
      "Real-time availability calendar",
      "Patient profile management",
      "Push notification reminders",
      "Responsive mobile-first design",
    ],
    caseStudy: {
      problem:
        "Healthcare appointment booking was cumbersome, requiring phone calls and long wait times, leading to poor patient satisfaction.",
      businessNeed:
        "A digital-first solution to streamline appointment scheduling, reduce no-shows, and improve patient engagement.",
      challenges: [
        "Complex scheduling logic with multiple doctors and time slots",
        "Ensuring HIPAA-compliant data handling",
        "Creating an intuitive UI for diverse age groups",
        "Real-time synchronization of appointment availability",
      ],
      solution:
        "Designed and developed a mobile-first appointment booking system with clean UI/UX, real-time doctor availability, and seamless patient onboarding flow.",
      process: [
        "User research and persona development",
        "Wireframing and prototyping in Figma",
        "Component-based architecture design",
        "Iterative UI testing and refinement",
        "Performance optimization for mobile devices",
      ],
      improvements: [
        "60% reduction in booking time",
        "Mobile-first responsive design",
        "Streamlined 3-step booking process",
      ],
      lessons: [
        "User-centered design is essential for healthcare apps",
        "Accessibility must be a first-class priority",
        "Iterative testing reveals hidden pain points",
      ],
    },
    stats: [
      { label: "Screens Designed", value: "25+" },
      { label: "User Flows", value: "8" },
      { label: "Components", value: "40+" },
    ],
  },
  {
    id: "prescripto",
    title: "Prescripto",
    description:
      "Healthcare management platform with appointment scheduling, patient management, and medical workflow optimization.",
    category: "Full Stack Healthcare Solution",
    github: "https://github.com/PatelPranay92/Prescripto",
    technologies: [
      "React",
      "Node.js",
      "Express",
      "MongoDB",
      "Tailwind CSS",
      "JWT",
    ],
    features: [
      "Patient and doctor dashboards",
      "Appointment scheduling system",
      "Medical records management",
      "Prescription generation",
      "Role-based access control",
      "Analytics and reporting",
    ],
    caseStudy: {
      problem:
        "Medical clinics relied on paper-based systems and fragmented tools for managing patients, appointments, and prescriptions.",
      businessNeed:
        "An integrated platform to digitize medical workflows, improve efficiency, and enhance patient care quality.",
      challenges: [
        "Complex role-based permissions for doctors, patients, and admins",
        "Secure handling of sensitive medical data",
        "Integrating appointment, prescription, and patient systems",
        "Building an intuitive interface for non-technical medical staff",
      ],
      solution:
        "Built a full-stack healthcare management platform with role-based dashboards, real-time scheduling, digital prescriptions, and comprehensive patient management.",
      process: [
        "Requirements gathering from healthcare workflows",
        "Database schema design for medical data",
        "RESTful API development with Express",
        "React frontend with reusable components",
        "JWT-based authentication and authorization",
        "Testing and deployment",
      ],
      improvements: [
        "Digitized entire clinic workflow",
        "Reduced appointment conflicts by 80%",
        "Centralized patient records access",
      ],
      lessons: [
        "Healthcare apps demand rigorous data validation",
        "Clear role separation simplifies complex systems",
        "Modular architecture enables easy feature additions",
      ],
    },
    stats: [
      { label: "API Endpoints", value: "30+" },
      { label: "User Roles", value: "3" },
      { label: "Features", value: "15+" },
    ],
  },
  {
    id: "school-management",
    title: "School Management System",
    description:
      "Comprehensive educational administration platform managing students, teachers, attendance, academics, and reporting.",
    category: "Enterprise Management System",
    github: "https://github.com/PatelPranay92/School-Management-System",
    technologies: [
      "React",
      "Node.js",
      "MongoDB",
      "Express",
      "Chart.js",
      "Material UI",
    ],
    features: [
      "Student enrollment and profiles",
      "Teacher management system",
      "Attendance tracking",
      "Grade and exam management",
      "Timetable scheduling",
      "Performance analytics dashboard",
    ],
    caseStudy: {
      problem:
        "Schools managed administrative tasks through spreadsheets and paper, causing data silos, inefficiency, and communication gaps.",
      businessNeed:
        "A centralized platform to automate school administration, improve data accuracy, and facilitate communication between stakeholders.",
      challenges: [
        "Modeling complex relationships between students, classes, and teachers",
        "Building a scalable attendance tracking system",
        "Creating meaningful analytics from educational data",
        "Supporting multiple user roles with different permissions",
      ],
      solution:
        "Developed an enterprise-grade school management system with comprehensive modules for enrollment, attendance, grading, scheduling, and analytics.",
      process: [
        "Stakeholder interviews and requirement analysis",
        "Entity-relationship modeling",
        "Modular backend API development",
        "Interactive dashboard with Chart.js",
        "Role-based access implementation",
        "UAT testing with school administrators",
      ],
      improvements: [
        "Automated attendance saving 2+ hours daily",
        "Real-time performance analytics",
        "Eliminated paper-based record keeping",
      ],
      lessons: [
        "Enterprise systems need careful data modeling",
        "User feedback is critical for admin tools",
        "Performance at scale requires query optimization",
      ],
    },
    stats: [
      { label: "Modules", value: "8+" },
      { label: "Database Models", value: "12" },
      { label: "Reports", value: "6" },
    ],
  },
  {
    id: "smartlead-dashboard",
    title: "SmartLead Dashboard",
    description:
      "Advanced analytics dashboard providing lead tracking, business intelligence, data visualization, and performance insights.",
    category: "Business Dashboard",
    github: "https://github.com/PatelPranay92/smartlead-dashboard",
    technologies: [
      "React",
      "TypeScript",
      "Recharts",
      "Tailwind CSS",
      "REST API",
      "Node.js",
    ],
    features: [
      "Real-time lead tracking",
      "Interactive data visualizations",
      "Performance metrics dashboard",
      "Filter and segmentation tools",
      "Export and reporting features",
      "Responsive design",
    ],
    caseStudy: {
      problem:
        "Sales teams lacked visibility into lead pipelines and performance metrics, relying on static spreadsheets for tracking.",
      businessNeed:
        "A dynamic dashboard to provide real-time business intelligence, enabling data-driven decisions and improved sales outcomes.",
      challenges: [
        "Handling large datasets with real-time updates",
        "Creating intuitive data visualizations",
        "Building performant chart rendering",
        "Designing responsive layouts for complex data",
      ],
      solution:
        "Created an interactive analytics dashboard with real-time data visualization, advanced filtering, lead pipeline tracking, and exportable reports.",
      process: [
        "Data requirements and KPI definition",
        "Dashboard wireframing and UX design",
        "Chart component development with Recharts",
        "API integration for real-time data",
        "Performance optimization for large datasets",
        "Responsive design testing",
      ],
      improvements: [
        "Real-time visibility into sales pipeline",
        "50% faster decision-making with data insights",
        "Automated report generation",
      ],
      lessons: [
        "Data visualization requires careful UX consideration",
        "Performance optimization is critical for dashboards",
        "User-configurable views enhance adoption",
      ],
    },
    stats: [
      { label: "Chart Types", value: "8" },
      { label: "Data Points", value: "1000+" },
      { label: "Filters", value: "12" },
    ],
  },
  {
    id: "playmate-frontend",
    title: "PlayMate Frontend",
    description:
      "Modern responsive frontend application delivering engaging user experiences through reusable components, optimized performance, and scalable architecture.",
    category: "Frontend Development",
    github: "https://github.com/PatelPranay92/PlayMate-Frontend",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Vite",
      "REST API",
    ],
    features: [
      "Component-based architecture",
      "Smooth animations and transitions",
      "Responsive mobile-first design",
      "Optimized performance",
      "Clean code architecture",
      "Modern UI patterns",
    ],
    caseStudy: {
      problem:
        "Existing frontend was built with outdated patterns, resulting in poor performance, inconsistent UI, and difficulty adding features.",
      businessNeed:
        "A modern, scalable frontend architecture that delivers exceptional user experience and enables rapid feature development.",
      challenges: [
        "Designing a scalable component library",
        "Implementing smooth animations without performance impact",
        "Ensuring cross-browser compatibility",
        "Building accessible interactive components",
      ],
      solution:
        "Built a modern React frontend with TypeScript, component-based architecture, Framer Motion animations, and responsive Tailwind CSS design.",
      process: [
        "Design system and component library planning",
        "Core component development",
        "Animation and interaction design",
        "Performance profiling and optimization",
        "Cross-browser and responsive testing",
        "Documentation and code standards",
      ],
      improvements: [
        "40% improvement in page load time",
        "Consistent design system across all pages",
        "Reusable component library",
      ],
      lessons: [
        "Design systems accelerate development velocity",
        "Performance budgets prevent regression",
        "TypeScript catches errors before they reach users",
      ],
    },
    stats: [
      { label: "Components", value: "30+" },
      { label: "Pages", value: "10+" },
      { label: "Animations", value: "15+" },
    ],
  },
];

// ─── Experience Timeline ──────────────────────────────────────
export interface TimelineEntry {
  title: string;
  description: string;
  skills: string[];
  period: string;
}

export const experienceTimeline: TimelineEntry[] = [
  {
    title: "Frontend Development",
    period: "Foundation",
    description:
      "Mastered modern frontend technologies including React, Next.js, TypeScript, and responsive design principles. Built pixel-perfect, accessible user interfaces with smooth animations.",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    title: "Backend Engineering",
    period: "Expansion",
    description:
      "Developed robust server-side architectures with Node.js, Express, Python, and FastAPI. Designed RESTful APIs, authentication systems, and scalable backend services.",
    skills: ["Node.js", "Express", "Python", "FastAPI", "REST APIs"],
  },
  {
    title: "Full Stack Projects",
    period: "Integration",
    description:
      "Combined frontend and backend expertise to deliver end-to-end solutions. Built production-ready applications with modern architecture patterns and best practices.",
    skills: ["Full Stack", "System Design", "DevOps", "Testing", "CI/CD"],
  },
  {
    title: "Advanced System Design",
    period: "Mastery",
    description:
      "Focused on scalable architectures, performance optimization, clean code principles, and building enterprise-grade applications that handle complex business requirements.",
    skills: [
      "Architecture",
      "Performance",
      "Scalability",
      "Clean Code",
      "Leadership",
    ],
  },
];

// ─── Achievements ─────────────────────────────────────────────
export interface Achievement {
  label: string;
  value: number;
  suffix: string;
}

export const achievements: Achievement[] = [
  { label: "Projects Completed", value: 20, suffix: "+" },
  { label: "Technologies Learned", value: 30, suffix: "+" },
  { label: "GitHub Repositories", value: 15, suffix: "+" },
  { label: "Development Hours", value: 3000, suffix: "+" },
];

// ─── Services ─────────────────────────────────────────────────
export interface Service {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const services: Service[] = [
  {
    title: "Full Stack Development",
    description:
      "End-to-end web application development with modern frameworks, clean architecture, and production-ready code.",
    icon: Layout,
  },
  {
    title: "Frontend Development",
    description:
      "Beautiful, responsive, and accessible user interfaces with React, Next.js, and modern CSS frameworks.",
    icon: Code2,
  },
  {
    title: "Backend Development",
    description:
      "Scalable server-side solutions with Node.js, Python, robust APIs, and secure authentication systems.",
    icon: Server,
  },
  {
    title: "API Development",
    description:
      "RESTful and GraphQL API design, development, documentation, and integration with third-party services.",
    icon: Globe,
  },
  {
    title: "Dashboard Development",
    description:
      "Interactive analytics dashboards with real-time data visualization, filtering, and reporting capabilities.",
    icon: BarChart3,
  },
  {
    title: "Automation Systems",
    description:
      "Custom automation workflows, data pipelines, and process optimization using modern tools and AI.",
    icon: Workflow,
  },
  {
    title: "Database Design",
    description:
      "Efficient database architecture with MongoDB, PostgreSQL, MySQL — schema design, optimization, and migration.",
    icon: Database,
  },
];

// ─── Testimonials (Placeholder) ──────────────────────────────
export interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    name: "Sarah Johnson",
    role: "Product Manager",
    company: "TechStartup Inc.",
    content:
      "Pranay delivered an exceptional full-stack application that exceeded our expectations. His attention to detail and ability to solve complex problems made the project a tremendous success.",
    rating: 5,
  },
  {
    name: "Michael Chen",
    role: "CTO",
    company: "InnovateLabs",
    content:
      "Working with Pranay was a game-changer. His full stack skills and clean architecture approach transformed our product's capabilities. Highly recommend for any complex project.",
    rating: 5,
  },
  {
    name: "Emily Rodriguez",
    role: "Engineering Lead",
    company: "DataFlow Systems",
    content:
      "Pranay's dashboard development skills are outstanding. He built our analytics platform with incredible visualizations and performance optimization that our team loves using every day.",
    rating: 5,
  },
];

// ─── Radar Chart Data ─────────────────────────────────────────
export const radarData = [
  { subject: "Frontend", value: 92 },
  { subject: "Backend", value: 85 },
  { subject: "Database", value: 84 },
  { subject: "DevOps", value: 75 },
  { subject: "System Design", value: 78 },
];
