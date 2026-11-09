"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useVibeStore } from "@/lib/store";
import { CATEGORIES, DIFFICULTY_COLORS } from "@/lib/types";
import type { Project } from "@/lib/types";
import MagneticButton from "./MagneticButton";
import { playPop } from "@/lib/sound";

interface Props {
  project: Project;
  onDeepDive: (project: Project) => void;
  isWinner?: boolean;
}


export default function ProjectCard({ project, onDeepDive, isWinner }: Props) {
  const { toggleLike, isLiked } = useVibeStore();
  const [copied, setCopied] = useState(false);
  const liked = isLiked(project.id);

  const category = CATEGORIES.find((c) => c.id === project.category)!;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(project.prompt);
    playPop();
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    playPop();
    toggleLike(project.id, project.category);
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.97 }}
      transition={{ duration: 0.28 }}
      className={`bento-card glass rounded-2xl p-5 flex flex-col gap-3 cursor-pointer group ${isWinner ? "gold-glow" : ""}`}
      onClick={() => onDeepDive(project)}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          {/* Category badge */}
          <div className="mb-2 flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-fg-dim">
              {category.emoji} {category.label}
            </span>
            <span
              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${DIFFICULTY_COLORS[project.difficulty]}`}
            >
              {project.difficulty}
            </span>
          </div>
          {/* Title */}
          <h2 className={`text-base font-bold leading-tight text-fg-base group-hover:text-neon-violet transition-colors ${isWinner ? "gold-leaf" : ""}`}>
            {project.title}
          </h2>
        </div>

        {/* Like button */}
        <button
          onClick={(e) => { e.stopPropagation(); handleLike(); }}
          className={`shrink-0 rounded-full p-2 transition-all duration-200 ${
            liked
              ? "text-neon-magenta bg-neon-magenta/20 shadow-[0_0_10px_rgba(232,121,249,0.4)]"
              : "text-fg-dim hover:text-neon-magenta hover:bg-neon-magenta/10"
          }`}
          aria-label={liked ? "Unlike" : "Like"}
        >
          <motion.span
            animate={liked ? { scale: [1, 1.4, 1] } : {}}
            transition={{ duration: 0.25 }}
            className="block text-base leading-none"
          >
            {liked ? "❤️" : "🤍"}
          </motion.span>
        </button>
      </div>

      {/* Tagline */}
      <p className="text-sm text-neon-cyan font-medium leading-snug">{project.tagline}</p>

      {/* Description */}
      <p className="text-xs text-fg-muted leading-relaxed line-clamp-3 flex-1">
        {project.description}
      </p>

      {/* Stack pills */}
      <div className="flex flex-wrap gap-1.5">
        {project.stack.slice(0, 4).map((s) => (
          <span
            key={s}
            className="rounded-md bg-glass-hi border border-glass-border px-2 py-0.5 text-[10px] font-mono text-fg-muted"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Footer */}
      <div className="flex items-center gap-2 pt-1 border-t border-glass-border">
        <MagneticButton
          radius={30}
          strength={0.45}
          onClick={(e) => { e?.stopPropagation(); handleCopy(); }}
          className={`
            flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold
            transition-all duration-200
            ${copied
              ? "bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/40"
              : "btn-neon text-fg-muted hover:text-fg-base"
            }
          `}
        >
          <span>{copied ? "✓" : "⧉"}</span>
          <span>{copied ? "Copied!" : "Copy Prompt"}</span>
        </MagneticButton>

        <button
          onClick={(e) => { e.stopPropagation(); onDeepDive(project); }}
          className="ml-auto rounded-lg px-3 py-1.5 text-xs font-semibold text-neon-violet hover:bg-neon-violet/10 transition-colors"
        >
          Deep Dive →
        </button>
      </div>

      {/* Vibe tags */}
      <div className="flex flex-wrap gap-1">
        {project.vibes.map((v) => (
          <span key={v} className="text-[10px] text-fg-dim">
            #{v.toLowerCase().replace(/\s+/g, "")}
          </span>
        ))}
      </div>
    </motion.article>
  );
}
