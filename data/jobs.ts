export interface Job {
  id: number;
  title: string;
  company: string;
  companyInitial: string;
  location: string;
  type: "Remote" | "Hybrid" | "Onsite";
  salary: string;

  about: string[];
  responsibilities: string[];
  requirements: string[];
  techStack: string[];
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Senior Product Engineer",
    company: "Vercel",
    companyInitial: "V",
    location: "Remote (Worldwide)",
    type: "Remote",
    salary: "$180k – $240k",

    about: [
      "We are looking for a Senior Product Engineer to help us build the future of the web. You will work closely with our product and design teams to ship high-quality software used by millions of developers.",
      "In this role, you will be responsible for end-to-end feature development, from architectural design to deployment and monitoring.",
    ],

    responsibilities: [
      "Design and implement new features using React, Next.js, and TypeScript.",
      "Collaborate with designers to iterate on UI/UX and ensure a polished experience.",
      "Optimize application performance and ensure scalability.",
    ],

    requirements: [
      "5+ years of experience building modern web applications.",
      "Deep knowledge of JavaScript, TypeScript, React, and the DOM.",
      "Experience with server-side rendering and edge computing.",
    ],

    techStack: ["React", "Next.js", "TypeScript", "Turborepo", "Tailwind"],
  },

  {
    id: 2,
    title: "Frontend Engineer",
    company: "Stripe",
    companyInitial: "S",
    location: "Remote",
    type: "Remote",
    salary: "$120k – $160k",

    about: [
      "Stripe is looking for a Frontend Engineer to build elegant, high-performance interfaces used by millions of businesses worldwide.",
    ],

    responsibilities: [
      "Build scalable UI components.",
      "Collaborate closely with backend engineers.",
      "Ensure accessibility and performance best practices.",
    ],

    requirements: [
      "Strong experience with React and TypeScript.",
      "Attention to detail in UI implementation.",
    ],

    techStack: ["React", "TypeScript", "Tailwind"],
  },
  {
    id: 3,
    title: "Senior Product Engineer",
    company: "Vercel",
    companyInitial: "V",
    location: "Remote (Worldwide)",
    type: "Remote",
    salary: "$180k – $240k",

    about: [
      "We are looking for a Senior Product Engineer to help us build the future of the web. You will work closely with our product and design teams to ship high-quality software used by millions of developers.",
      "In this role, you will be responsible for end-to-end feature development, from architectural design to deployment and monitoring.",
    ],

    responsibilities: [
      "Design and implement new features using React, Next.js, and TypeScript.",
      "Collaborate with designers to iterate on UI/UX and ensure a polished experience.",
      "Optimize application performance and ensure scalability.",
    ],

    requirements: [
      "5+ years of experience building modern web applications.",
      "Deep knowledge of JavaScript, TypeScript, React, and the DOM.",
      "Experience with server-side rendering and edge computing.",
    ],

    techStack: ["React", "Next.js", "TypeScript", "Turborepo", "Tailwind"],
  },

  {
    id: 4,
    title: "Frontend Engineer",
    company: "Stripe",
    companyInitial: "S",
    location: "Remote",
    type: "Remote",
    salary: "$120k – $160k",

    about: [
      "Stripe is looking for a Frontend Engineer to build elegant, high-performance interfaces used by millions of businesses worldwide.",
    ],

    responsibilities: [
      "Build scalable UI components.",
      "Collaborate closely with backend engineers.",
      "Ensure accessibility and performance best practices.",
    ],

    requirements: [
      "Strong experience with React and TypeScript.",
      "Attention to detail in UI implementation.",
    ],

    techStack: ["React", "TypeScript", "Tailwind"],
  },
];
