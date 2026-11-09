"use client";

import { useMemo, useState, useCallback, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { AnimatePresence } from "framer-motion";
import { PROJECTS } from "@/data/projects";
import { CATEGORIES } from "@/lib/types";
import type { CategoryId, Project } from "@/lib/types";
import { useVibeStore } from "@/lib/store";
import { pickShuffleSequence, pickWeightedProject } from "@/lib/randomizer";
import FilterBar, { type Difficulty } from "@/components/FilterBar";
import ProjectCard from "@/components/ProjectCard";
import SurpriseMeButton from "@/components/SurpriseMeButton";
import SlotMachine from "@/components/SlotMachine";
import DeepDiveModal from "@/components/DeepDiveModal";

const SLOT_FRAMES = 18;

function HomeContent() {
  const { scores, hydrated, recordSurprise } = useVibeStore();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [activeCategory, setActiveCategory] = useState<CategoryId | "all">("all");
  const [activeDifficulty, setActiveDifficulty] = useState<Difficulty>("all");
  const [modalProject, setModalProject] = useState<Project | null>(() => {
    const id = searchParams.get("project");
    return id ? (PROJECTS.find((p) => p.id === id) ?? null) : null;
  });
  const [slotSequence, setSlotSequence] = useState<Project[] | null>(null);
  const [slotWinner, setSlotWinner] = useState<Project | null>(null);
  const [spinning, setSpinning] = useState(false);

  const handleOpenModal = useCallback((project: Project) => {
    setModalProject(project);
    router.replace(`?project=${project.id}`, { scroll: false });
  }, [router]);

  const handleCloseModal = useCallback(() => {
    setModalProject(null);
    router.replace("/", { scroll: false });
  }, [router]);

  const filtered = useMemo(
    () =>
      PROJECTS.filter((p) => {
        if (activeCategory !== "all" && p.category !== activeCategory) return false;
        if (activeDifficulty !== "all" && p.difficulty !== activeDifficulty) return false;
        return true;
      }),
    [activeCategory, activeDifficulty],
  );

  const counts = useMemo(() => {
    const c = { all: PROJECTS.length } as Record<CategoryId | "all", number>;
    for (const cat of CATEGORIES) {
      c[cat.id] = PROJECTS.filter((p) => p.category === cat.id).length;
    }
    return c;
  }, []);

  const handleSurprise = useCallback(() => {
    if (spinning) return;
    setSpinning(true);

    const safeScores = hydrated ? scores : { saas: 0, creative: 0, utility: 0, social: 0, deeptech: 0 };
    const sequence = pickShuffleSequence(PROJECTS, safeScores, SLOT_FRAMES);
    const { project: winner } = pickWeightedProject(PROJECTS, { scores: safeScores });

    recordSurprise();
    setSlotSequence(sequence);
    setSlotWinner(winner);
  }, [spinning, hydrated, scores, recordSurprise]);

  const handleSlotDone = useCallback(() => {
    setSpinning(false);
    const winner = slotWinner;
    setSlotSequence(null);
    setSlotWinner(null);
    if (winner) handleOpenModal(winner);
  }, [slotWinner, handleOpenModal]);

  return (
    <main className="relative z-10 min-h-screen">
      <FilterBar
        active={activeCategory}
        onSelect={setActiveCategory}
        counts={counts}
        difficulty={activeDifficulty}
        onDifficulty={setActiveDifficulty}
      />

      <section className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6">
        <AnimatePresence mode="wait">
          {activeCategory !== "all" && (() => {
            const cat = CATEGORIES.find((c) => c.id === activeCategory)!;
            return (
              <div className="mb-8 text-center">
                <div className="text-5xl mb-2">{cat.emoji}</div>
                <h2 className={`text-2xl font-bold bg-gradient-to-r ${cat.accent} bg-clip-text text-transparent`}>
                  {cat.label}
                </h2>
                <p className="mt-1 text-sm text-fg-muted">{cat.description}</p>
              </div>
            );
          })()}
        </AnimatePresence>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDeepDive={handleOpenModal}
              />
            ))}
          </AnimatePresence>
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-32 text-center">
            <span className="text-5xl mb-4">🌌</span>
            <p className="text-fg-muted">No ideas match these filters.</p>
          </div>
        )}
      </section>

      <SurpriseMeButton onClick={handleSurprise} disabled={spinning} />

      <AnimatePresence>
        {slotSequence && slotWinner && (
          <SlotMachine
            sequence={slotSequence}
            winner={slotWinner}
            onDone={handleSlotDone}
          />
        )}
      </AnimatePresence>

      <DeepDiveModal
        project={modalProject}
        onClose={handleCloseModal}
      />
    </main>
  );
}

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  );
}
