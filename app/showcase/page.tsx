import type { Metadata } from "next";
import Link from "next/link";
import { CATEGORIES } from "@/lib/types";
import { PROJECTS } from "@/data/projects";

export const metadata: Metadata = {
  title: "Showcase | VibeVault 260",
  description:
    "Explore the VibeVault 260 project showcase, learn how it works, and run it locally or in Docker.",
};

export default function ShowcasePage() {
  return (
    <main className="relative z-10 min-h-screen">
      <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="rounded-[2rem] border border-white/10 bg-slate-950/90 p-10 shadow-2xl shadow-slate-950/20 backdrop-blur-xl">

          {/* Header */}
          <div className="mb-8 space-y-4 text-slate-100">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">VibeVault 260</p>
            <h1 className="text-4xl font-semibold sm:text-5xl">Project Showcase</h1>
            <p className="max-w-3xl text-slate-300 sm:text-lg">
              260 AI project ideas curated from Reddit&apos;s vibe coding community — filtered by
              category and difficulty, deep-linked, and surprise-picked with a slot machine.
            </p>
          </div>

          {/* What it does + Project details */}
          <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold text-white">What this app does</h2>
              <ul className="space-y-2.5 text-slate-300 text-sm leading-relaxed">
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Browse 260 AI project ideas organized across 5 categories</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Filter by category (SaaS, Creative, Utility, Social, Deep Tech)</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Filter by difficulty — Beginner, Intermediate, or Advanced</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Surprise picker with slot-machine animation and category-weighted picks</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Deep Dive modal with a detailed 4–6 sentence AI build prompt ready to paste</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Copy prompt to clipboard with one click — with a confetti celebration</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Save ideas to favorites; preferences persist via localStorage</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Deep link to any project via <code className="text-xs text-neon-violet bg-white/5 px-1 py-0.5 rounded">?project=id</code> in the URL</li>
                <li className="flex gap-2"><span className="text-cyan-400">•</span>Built with Next.js, Tailwind CSS 4, Framer Motion, and Zustand</li>
              </ul>
            </div>

            <div className="space-y-4 rounded-3xl border border-white/10 bg-white/5 p-6">
              <h2 className="text-2xl font-semibold text-white">Project details</h2>
              <p className="text-slate-300 text-sm">
                The app contains <span className="font-semibold text-white">{PROJECTS.length} ideas</span> across{" "}
                <span className="font-semibold text-white">{CATEGORIES.length} categories</span>.
                Every idea includes a detailed actionable prompt, stack suggestions, difficulty rating, and vibe tags.
              </p>
              <div className="grid gap-3 sm:grid-cols-2">
                {CATEGORIES.map((category) => (
                  <div
                    key={category.id}
                    className="rounded-3xl border border-white/10 bg-slate-950/80 p-4"
                  >
                    <p className="text-2xl">{category.emoji}</p>
                    <p className="mt-2 text-base font-semibold text-white">{category.label}</p>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{category.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white mb-6">Key Features</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div className="aspect-video rounded-2xl bg-slate-800 flex items-center justify-center text-4xl">🏠</div>
                <h3 className="mt-4 text-base font-semibold text-white">Browse & Filter</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Sticky filter bar with category pills and difficulty filters (Beginner / Intermediate / Advanced).
                  Cards animate in and out as filters change.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div className="aspect-video rounded-2xl bg-slate-800 flex items-center justify-center text-4xl">🎰</div>
                <h3 className="mt-4 text-base font-semibold text-white">Slot Machine Surprise</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Hit the floating button to spin through projects. The picker is weighted by your
                  liked categories so the result matches your taste.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div className="aspect-video rounded-2xl bg-slate-800 flex items-center justify-center text-4xl">🔍</div>
                <h3 className="mt-4 text-base font-semibold text-white">Deep Dive Modal</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Each project has a detailed 4–6 sentence build prompt covering the framework, key algorithm,
                  integrations, UX flow, and production considerations — ready to paste into Claude or Cursor.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div className="aspect-video rounded-2xl bg-slate-800 flex items-center justify-center text-4xl">📋</div>
                <h3 className="mt-4 text-base font-semibold text-white">One-Click Copy</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Copy the full build prompt to your clipboard with one click. A confetti burst
                  confirms the copy, and a hint appears to paste into Claude, Cursor, or ChatGPT.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div className="aspect-video rounded-2xl bg-slate-800 flex items-center justify-center text-4xl">❤️</div>
                <h3 className="mt-4 text-base font-semibold text-white">Save Favorites</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Like any project to save it. Likes persist in localStorage and influence the
                  Surprise picker — the more you like a category, the more it shows up.
                </p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-slate-950/80 p-4">
                <div className="aspect-video rounded-2xl bg-slate-800 flex items-center justify-center text-4xl">🔗</div>
                <h3 className="mt-4 text-base font-semibold text-white">Deep Linking</h3>
                <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                  Every project has a shareable URL via <code className="text-neon-violet bg-white/5 px-1 rounded">?project=id</code>.
                  Opening the link jumps straight to the modal so you can share specific ideas with teammates.
                </p>
              </div>
            </div>
          </div>

          {/* Run locally */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">Run locally</h2>
            <p className="mt-3 text-slate-300 text-sm">
              Clone the repo, install dependencies, and start the development server.
            </p>
            <pre className="mt-4 rounded-3xl bg-slate-950/80 p-4 text-sm text-slate-200 overflow-x-auto">
              <code>{`git clone https://github.com/btaira/VibeVault250.git
cd VibeVault250
npm install
npm run dev`}</code>
            </pre>
            <p className="mt-4 text-slate-300 text-sm">
              Open <span className="font-medium text-white">http://localhost:3000</span> to view the app.
            </p>
          </div>

          {/* Live demo */}
          <div className="mt-10 rounded-3xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-2xl font-semibold text-white">View Live Demo</h2>
            <p className="mt-3 text-slate-300 text-sm">
              The app is deployed to GitHub Pages and updates automatically on every push to main.
            </p>
            <a
              href="https://btaira.github.io/VibeVault250/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Open Live Site
            </a>
          </div>

          {/* CTA */}
          <div className="mt-10 flex flex-col gap-4 rounded-3xl border border-white/10 bg-slate-950/80 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Start browsing</h2>
              <p className="mt-2 text-slate-400 text-sm">
                260 ideas, 5 categories, 3 difficulty levels — find your next build.
              </p>
            </div>
            <Link
              href="/"
              className="inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 shrink-0"
            >
              Go to Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
