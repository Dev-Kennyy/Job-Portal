export interface Job {
  id: number;
  title: string;
  company: string;
  location: string;
  type: "Remote" | "Hybrid" | "Onsite";
  salary: string;
  tags: string[];
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
  },
  {
    id: 2,
    title: "Backend Engineer",
    company: "Shopify",
    location: "Canada",
    type: "Hybrid",
    salary: "$130k – $180k",
    tags: ["Node.js", "PostgreSQL", "API"],
  },
  {
    id: 3,
    title: "Full Stack Developer",
    company: "Paystack",
    location: "Nigeria",
    type: "Onsite",
    salary: "$60k – $90k",
    tags: ["React", "Node.js", "MongoDB"],
  },
  {
    id: 4,
    title: "Product Designer",
    company: "Figma",
    location: "United States",
    type: "Remote",
    salary: "$110k – $150k",
    tags: ["UX", "UI", "Design Systems"],
  },
];
