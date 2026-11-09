"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { CATEGORIES } from "@/lib/types";
import type { Project } from "@/lib/types";
import { useVibeStore } from "@/lib/store";
import { playPop, playWin } from "@/lib/sound";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const DIFFICULTY_COLORS = {
  Beginner: "text-neon-emerald border-neon-emerald/40 bg-neon-emerald/10",
  Intermediate: "text-neon-amber border-neon-amber/40 bg-neon-amber/10",
  Advanced: "text-neon-magenta border-neon-magenta/40 bg-neon-magenta/10",
};

export default function DeepDiveModal({ project, onClose }: Props) {
  const [copied, setCopied] = useState(false);
  const { toggleLike, isLiked } = useVibeStore();
  const backdropRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  const category = CATEGORIES.find((c) => c.id === project.category)!;
  const liked = isLiked(project.id);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(project.prompt);
    playWin();
    setCopied(true);
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#a78bfa", "#e879f9", "#22d3ee", "#fbbf24", "#34d399"],
    });
    setTimeout(() => setCopied(false), 3000);
  };

  const handleLike = () => {
    playPop();
    toggleLike(project.id, project.category);
  };

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            ref={backdropRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            initial={{ opacity: 0, scale: 0.92, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 24 }}
            transition={{ type: "spring", stiffness: 340, damping: 30 }}
            className="fixed inset-x-4 top-[5%] z-50 mx-auto max-w-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass rounded-3xl border border-glass-border p-7 shadow-2xl max-h-[90vh] overflow-y-auto scrollbar-thin">
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute right-5 top-5 rounded-full p-1.5 text-fg-dim hover:text-fg-base hover:bg-white/10 transition-colors"
                aria-label="Close"
                autoFocus
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              {/* Category + difficulty */}
              <div className="mb-4 flex items-center gap-2">
                <span className="text-sm font-semibold uppercase tracking-widest text-fg-dim">
                  {category.emoji} {category.label}
                </span>
                <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${DIFFICULTY_COLORS[project.difficulty]}`}>
                  {project.difficulty}
                </span>
              </div>

              {/* Title */}
              <h2 id="modal-title" className="glow-text mb-2 text-3xl font-bold text-fg-base leading-tight">
                {project.title}
              </h2>
              <p className="mb-5 text-lg font-medium text-neon-cyan">{project.tagline}</p>

              {/* Description */}
              <div className="mb-6 rounded-xl bg-glass-hi border border-glass-border p-4">
                <p className="text-sm text-fg-muted leading-relaxed">{project.description}</p>
              </div>

              {/* Prompt */}
              <div className="mb-6">
                <div className="mb-2 flex items-center justify-between">
                  <h3 className="text-xs font-bold uppercase tracking-widest text-fg-dim">
                    🤖 Build Prompt
                  </h3>
                </div>
                <div className="relative rounded-xl bg-[#08061e] border border-glass-border p-4">
                  <p className="text-sm font-mono text-fg-muted leading-relaxed pr-2">
                    {project.prompt}
                  </p>
                </div>
              </div>

              {/* Stack */}
              <div className="mb-6">
                <h3 className="mb-2 text-xs font-bold uppercase tracking-widest text-fg-dim">Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stack.map((s) => (
                    <span
                      key={s}
                      className="rounded-lg bg-glass-hi border border-glass-border px-3 py-1 text-xs font-mono text-neon-violet"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              {/* Vibes */}
              <div className="mb-7">
                <div className="flex flex-wrap gap-2">
                  {project.vibes.map((v) => (
                    <span key={v} className="text-xs text-fg-dim">
                      #{v.toLowerCase().replace(/\s+/g, "")}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-3">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={handleCopy}
                  className={`
                    w-full flex items-center justify-center gap-2 rounded-xl py-4 text-sm font-bold
                    transition-all duration-200
                    ${copied
                      ? "bg-neon-emerald/20 text-neon-emerald border border-neon-emerald/50 shadow-[0_0_20px_rgba(52,211,153,0.4)]"
                      : "bg-neon-violet/20 text-neon-violet border border-neon-violet/40 hover:bg-neon-violet/30 hover:shadow-[0_0_24px_rgba(167,139,250,0.5)]"
                    }
                  `}
                >
                  <span className="text-base">{copied ? "✅" : "⧉"}</span>
                  <span>{copied ? "Prompt Copied!" : "Copy Build Prompt"}</span>
                </motion.button>

                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center text-xs text-fg-dim"
                  >
                    Paste into{" "}
                    <span className="font-semibold text-neon-cyan">Claude</span>,{" "}
                    <span className="font-semibold text-neon-cyan">Cursor</span>, or{" "}
                    <span className="font-semibold text-neon-cyan">ChatGPT</span> to start building 🚀
                  </motion.p>
                )}

                <div className="flex items-center justify-center">
                  <button
                    onClick={handleLike}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2 text-sm transition-all duration-200 ${
                      liked
                        ? "bg-neon-magenta/20 text-neon-magenta border border-neon-magenta/40 shadow-[0_0_14px_rgba(232,121,249,0.4)]"
                        : "glass text-fg-dim hover:text-neon-magenta hover:border-neon-magenta/30"
                    }`}
                    aria-label={liked ? "Unlike" : "Like"}
                  >
                    <motion.span
                      animate={liked ? { scale: [1, 1.5, 1] } : {}}
                      transition={{ duration: 0.28 }}
                      className="block text-lg leading-none"
                    >
                      {liked ? "❤️" : "🤍"}
                    </motion.span>
                    <span>{liked ? "Liked" : "Save to favorites"}</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
