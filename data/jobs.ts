export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Remote" | "Hybrid" | "Onsite";
  salary: string;
  tags: string[];
  description: string;
}

export const jobs: Job[] = [
  {
    id: 1,
    title: "Frontend Engineer",
    company: "Stripe",
    location: "Remote",
    type: "Remote",
    salary: "$120k – $160k",
    tags: ["React", "TypeScript", "Tailwind"],
    description:
      "We are looking for a Frontend Engineer to build high-quality user interfaces used by millions of businesses worldwide. You’ll work closely with designers and backend engineers to deliver polished experiences.",
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Shopify",
    location: "Canada",
    type: "Hybrid",
    salary: "$130k – $180k",
    tags: ["Node.js", "PostgreSQL", "API"],
    description:
      "As a Backend Engineer at Shopify, you’ll design scalable systems, APIs, and services that power commerce globally.",
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Paystack",
    location: "Nigeria",
    type: "Onsite",
    salary: "$60k – $90k",
    tags: ["React", "Node.js", "MongoDB"],
    description:
      "You’ll work across frontend and backend systems to improve payments infrastructure across Africa.",
  },
  {
    id: 4,
    title: "Product Designer",
    company: "Figma",
    location: "United States",
    type: "Remote",
    salary: "$110k – $150k",
    tags: ["UX", "UI", "Design Systems"],
    description:
      "Design intuitive product experiences and collaborate with engineers to bring ideas to life.",
  },
];
