/**
 * Authoritative static content for the portfolio.
 *
 * This file is the fallback source consumed by lib/data.ts when DATABASE_URL
 * is not set. When the DB is wired up, prisma/seed.ts seeds these same shapes
 * into Postgres and lib/data.ts reads from the DB instead.
 *
 * Edit this file to update content while the DB is empty.
 */

export type SkillCategory = "ml" | "web" | "devops" | "viz" | "lang" | "other";

export type Project = {
  slug: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl: string | null;
  demoUrl: string | null;
  imageUrl: string | null;
  category: "ml" | "web" | "other";
  featured: boolean;
  startedAt: string | null;
  order: number;
};

export type Experience = {
  company: string;
  role: string;
  startDate: string;
  endDate: string | null;
  bullets: string[];
  logoUrl: string | null;
  order: number;
};

export type Skill = {
  name: string;
  category: SkillCategory;
  order: number;
};

export type Education = {
  institution: string;
  degree: string;
  startDate: string;
  endDate: string | null;
  details: string | null;
  logoUrl: string | null;
  order: number;
};

export type SocialLink = {
  name: string;
  url: string;
  label: string;
};

export const profile = {
  name: "Huda Zahra",
  firstName: "Huda",
  titles: [
    "Machine Learning Engineer",
    "AI Builder",
    "Software Engineer",
    "NUST '25",
  ],
  shortTagline: "ML Engineer crafting AI that ships.",
  bio: "I'm Huda Zahra — a Machine Learning enthusiast and student at NUST, passionate about exploring new ideas and turning them into real-world projects. I love diving deep into AI, learning continuously, and pushing my boundaries. I'm always excited to collaborate, grow, and create things that make a meaningful impact.",
  email: "hudazahrabangash@gmail.com",
  location: "Islamabad, Pakistan",
  resumeUrl:
    "https://drive.google.com/file/d/12MB2cOw5MHDfYWO6AfDIi5UKiVMvdp7a/view",
  available: true,
};

export const stats = [
  { label: "Projects shipped", value: "9+" },
  { label: "Years exploring ML", value: "3+" },
  { label: "Internships", value: "3" },
  { label: "Final year @", value: "NUST" },
];

export const socials: SocialLink[] = [
  {
    name: "github",
    url: "https://github.com/hzahra55",
    label: "GitHub",
  },
  {
    name: "linkedin",
    url: "https://www.linkedin.com/in/hudazahraa/",
    label: "LinkedIn",
  },
  {
    name: "huggingface",
    url: "https://huggingface.co/huda55",
    label: "Hugging Face",
  },
  {
    name: "medium",
    url: "https://medium.com/@hudazahrabangash",
    label: "Medium",
  },
  {
    name: "leetcode",
    url: "https://leetcode.com/u/hudazahra/",
    label: "LeetCode",
  },
];

export const skills: Skill[] = [
  // ML / AI
  { name: "PyTorch", category: "ml", order: 1 },
  { name: "TensorFlow", category: "ml", order: 2 },
  { name: "Keras", category: "ml", order: 3 },
  { name: "Hugging Face", category: "ml", order: 4 },
  { name: "LangChain", category: "ml", order: 5 },
  { name: "Scikit-Learn", category: "ml", order: 6 },
  { name: "OpenCV", category: "ml", order: 7 },
  { name: "Gradio", category: "ml", order: 8 },
  // Web
  { name: "React", category: "web", order: 1 },
  { name: "Node.js", category: "web", order: 2 },
  { name: "Express.js", category: "web", order: 3 },
  { name: "FastAPI", category: "web", order: 4 },
  { name: "Flask", category: "web", order: 5 },
  { name: "MongoDB", category: "web", order: 6 },
  { name: "PostgreSQL", category: "web", order: 7 },
  { name: "Vite", category: "web", order: 8 },
  { name: "HTML5", category: "web", order: 9 },
  { name: "CSS3", category: "web", order: 10 },
  { name: "Bootstrap", category: "web", order: 11 },
  // Data viz
  { name: "Pandas", category: "viz", order: 1 },
  { name: "NumPy", category: "viz", order: 2 },
  { name: "SciPy", category: "viz", order: 3 },
  { name: "Matplotlib", category: "viz", order: 4 },
  { name: "Seaborn", category: "viz", order: 5 },
  // DevOps / tooling
  { name: "Docker", category: "devops", order: 1 },
  { name: "Git", category: "devops", order: 2 },
  { name: "Conda", category: "devops", order: 3 },
  // Languages
  { name: "Python", category: "lang", order: 1 },
  { name: "JavaScript", category: "lang", order: 2 },
  { name: "Java", category: "lang", order: 3 },
  { name: "C++", category: "lang", order: 4 },
  { name: "SQL", category: "lang", order: 5 },
  { name: "Assembly", category: "lang", order: 6 },
  // Other
  { name: "MATLAB", category: "other", order: 1 },
  { name: "AutoCAD", category: "other", order: 2 },
  { name: "LaTeX", category: "other", order: 3 },
];

export const projects: Project[] = [
  {
    slug: "silent-stt",
    name: "Silent STT — Visual Speech Recognition",
    description:
      "3D-CNN + ResNet-18 + Transformer-based CTC (TM-CTC) lipreading model that decodes speech from video without audio. Uses pre-extracted spatio-temporal visual features, beam-search decoding, and a character-level language model — reaching 40% WER.",
    techStack: ["Python", "PyTorch", "ResNet-18", "Transformers", "CTC"],
    githubUrl: "https://github.com/hzahra55/3DCNNResnet_Transformer-CTC_lipReader",
    demoUrl: null,
    imageUrl: null,
    category: "ml",
    featured: true,
    startedAt: "Spring 2025",
    order: 1,
  },
  {
    slug: "echochain",
    name: "EchoChain — Multimodal RAG",
    description:
      "Audio-in, audio-out RAG pipeline. Ingests spoken queries, performs text-based retrieval and reasoning over a vector store, and replies with both written answers and synthesized audio snippets.",
    techStack: ["Python", "LangChain", "Pinecone", "Docker"],
    githubUrl: "https://github.com/hzahra55/Echo_chain",
    demoUrl: null,
    imageUrl: null,
    category: "ml",
    featured: true,
    startedAt: "Spring 2025",
    order: 2,
  },
  {
    slug: "rag-medico-bot",
    name: "RAG Medico Bot",
    description:
      "Medical Q&A assistant grounded in textbook content. LangChain orchestrates retrieval over a FAISS vector index of medical references, with Mistral providing the language reasoning layer.",
    techStack: ["Python", "LangChain", "FAISS", "Mistral"],
    githubUrl: "https://github.com/hzahra55/Langchain_AIBot",
    demoUrl: null,
    imageUrl: null,
    category: "ml",
    featured: false,
    startedAt: "Spring 2025",
    order: 3,
  },
  {
    slug: "speechsmart",
    name: "SpeechSmart — Phoneme-Level STT",
    description:
      "Speech-therapy platform that compares a learner's utterance to a reference at the phoneme level. Built for therapists, teachers, and parents to support early speech intervention.",
    techStack: ["Python", "JavaScript", "FastAPI", "Vosk"],
    githubUrl: "https://github.com/hzahra55/speech_to_text_SPEECHSMART",
    demoUrl: null,
    imageUrl: null,
    category: "ml",
    featured: false,
    startedAt: "Spring 2024",
    order: 4,
  },
  {
    slug: "gesture-control",
    name: "Gesture Control",
    description:
      "Real-time webcam gesture recognition for video playback control. ResNet-101 trained on the Jester dataset interprets ten distinct hand gestures into YouTube actions.",
    techStack: ["Python", "OpenCV", "Keras", "ResNet-101"],
    githubUrl: "https://github.com/hzahra55/HandControl_gesture_recognition",
    demoUrl: null,
    imageUrl: null,
    category: "ml",
    featured: true,
    startedAt: "Fall 2024",
    order: 5,
  },
  {
    slug: "hep-segmentation",
    name: "HEp Segmentation & Classification",
    description:
      "Two-stage medical imaging pipeline: classical segmentation isolates HEp-2 cells, then a CNN classifies the staining pattern.",
    techStack: ["Python", "OpenCV", "Keras"],
    githubUrl: "https://github.com/hzahra55/HEP_segmentation_classification",
    demoUrl: null,
    imageUrl: null,
    category: "ml",
    featured: false,
    startedAt: "Fall 2024",
    order: 6,
  },
  {
    slug: "github-trends",
    name: "GitHub Repos Scraper for Trend Analysis",
    description:
      "Scrapes repository metadata, tags, and star counts; analyzes and visualizes how tag popularity tracks against star momentum.",
    techStack: ["Python", "BeautifulSoup", "pandas", "NumPy", "Matplotlib"],
    githubUrl: "https://github.com/hzahra55/GitHub-repos-scraper",
    demoUrl: null,
    imageUrl: null,
    category: "other",
    featured: false,
    startedAt: "Fall 2024",
    order: 7,
  },
  {
    slug: "rl-robo",
    name: "RL-Robo — Markov Decision Process",
    description:
      "Robot-car simulation built on MDPs. Value iteration finds the optimal policy balancing speed and overheating risk; live sliders adjust gamma and iteration depth.",
    techStack: ["Python", "JavaScript", "Streamlit"],
    githubUrl: "https://github.com/hzahra55/RobotCar_RL_MDP",
    demoUrl: null,
    imageUrl: null,
    category: "ml",
    featured: false,
    startedAt: "Spring 2025",
    order: 8,
  },
  {
    slug: "library-management",
    name: "Library Management System",
    description:
      "Java-based library management tool with full SQL backend — CRUD across members, books, and lending records.",
    techStack: ["Java", "SQL"],
    githubUrl: "https://github.com/hzahra55/library_management_system",
    demoUrl: null,
    imageUrl: null,
    category: "web",
    featured: false,
    startedAt: "Fall 2022",
    order: 9,
  },
];

export const experience: Experience[] = [
  {
    company: "The Marketing Lads",
    role: "AI Intern",
    startDate: "March 2024",
    endDate: null, // present
    bullets: [
      "Built scalable backend services with FastAPI and a vector database to power multi-client AI products.",
      "Deployed applications via Docker, GitHub Actions, and GCP for consistent CI/CD across environments.",
    ],
    logoUrl: null,
    order: 1,
  },
  {
    company: "Rohde & Schwarz",
    role: "Software Engineering Intern",
    startDate: "Aug 2024",
    endDate: "Sep 2024",
    bullets: [
      "Built and optimized secure data pipelines, integrating firewall protection and hardware acceleration.",
      "Enhanced PostgreSQL operations supporting critical communication in Air Traffic Control (ATC) applications.",
    ],
    logoUrl: null,
    order: 2,
  },
  {
    company: "Washify",
    role: "Web Developer",
    startDate: "April 2024",
    endDate: "June 2024",
    bullets: [
      "Led development of a microservices-based infrastructure on the MERN stack.",
      "Optimized system architecture for faster load times, improved responsiveness, and a better end-user experience.",
    ],
    logoUrl: null,
    order: 3,
  },
];

export const education: Education[] = [
  {
    institution: "National University of Sciences & Technology (NUST)",
    degree: "Bachelor of Engineering — Software Engineering",
    startDate: "Nov 2021",
    endDate: "May 2025",
    details: "CGPA: 3.52 / 4.00",
    logoUrl: null,
    order: 1,
  },
];

export const navLinks = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
] as const;

export const skillCategoryLabels: Record<SkillCategory, string> = {
  ml: "ML / AI",
  web: "Web & Backend",
  viz: "Data Science",
  devops: "DevOps & Tooling",
  lang: "Languages",
  other: "Other",
};

export const projectCategoryLabels = {
  all: "All",
  ml: "ML / AI",
  web: "Web",
  other: "Other",
} as const;
