export type CategoryId = "saas" | "creative" | "utility" | "social" | "deeptech";

export interface Category {
  id: CategoryId;
  label: string;
  emoji: string;
  accent: string;
  glow: string;
  description: string;
}

export interface Project {
  id: string;
  title: string;
  category: CategoryId;
  tagline: string;
  description: string;
  prompt: string;
  stack: string[];
  difficulty: "Beginner" | "Intermediate" | "Advanced";
  vibes: string[];
}

export const DIFFICULTY_COLORS: Record<Project["difficulty"], string> = {
  Beginner: "text-neon-emerald border-neon-emerald/40 bg-neon-emerald/10",
  Intermediate: "text-neon-amber border-neon-amber/40 bg-neon-amber/10",
  Advanced: "text-neon-magenta border-neon-magenta/40 bg-neon-magenta/10",
};

export const CATEGORIES: Category[] = [
  {
    id: "saas",
    label: "SaaS",
    emoji: "💼",
    accent: "from-cyan-400 to-blue-500",
    glow: "rgba(34, 211, 238, 0.55)",
    description: "53 web apps with auth, payments, and recurring revenue — from AI tools to vertical SaaS.",
  },
  {
    id: "creative",
    label: "Creative",
    emoji: "🎨",
    accent: "from-fuchsia-400 to-pink-500",
    glow: "rgba(232, 121, 249, 0.55)",
    description: "51 generative art projects, audio toys, visualizers, and expressive browser playgrounds.",
  },
  {
    id: "utility",
    label: "Utility",
    emoji: "🛠️",
    accent: "from-emerald-400 to-teal-500",
    glow: "rgba(52, 211, 153, 0.55)",
    description: "52 tools — browser extensions, desktop apps, and scripts that fix real everyday friction.",
  },
  {
    id: "social",
    label: "Social",
    emoji: "🌐",
    accent: "from-amber-400 to-orange-500",
    glow: "rgba(251, 191, 36, 0.55)",
    description: "50 community, multiplayer, and shared-presence apps — from niche networks to IRL meetups.",
  },
  {
    id: "deeptech",
    label: "Deep Tech",
    emoji: "⚛️",
    accent: "from-violet-400 to-indigo-500",
    glow: "rgba(167, 139, 250, 0.55)",
    description: "54 projects at the frontier — LLM infra, ML tooling, hardware, crypto, and systems programming.",
  },
];
