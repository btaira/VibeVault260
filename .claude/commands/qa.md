# QA Validation — VibeVault 260

Run a full quality-assurance pass on this Next.js / TypeScript / Tailwind repo. Work through every section below in order, report findings inline, and finish with a **Summary** table.

---

## 1. TypeScript — Type Check

Run a project-wide type check (not just build-time):

```bash
npx tsc --noEmit
```

Report every error with file, line, and a one-line explanation. If clean, say so.

---

## 2. Linting

```bash
npm run lint
```

Report all ESLint warnings and errors. Classify each as `error` or `warning`.

---

## 3. Production Build

```bash
npm run build
```

Confirm the build succeeds and static export artifacts are emitted to `out/`. Note any warnings about missing metadata, unoptimized images, or page size.

---

## 4. Data Integrity — projects.ts

Read `data/projects.ts` and validate every `Project` object against the `Project` interface in `lib/types.ts`. Check:

- **Count:** exactly 260 projects total
- **Unique IDs:** no duplicate `id` values
- **Required fields present and non-empty:** `id`, `title`, `tagline`, `description`, `prompt`, `category`, `difficulty`, `stack`, `vibes`
- **category** is one of: `saas | creative | utility | social | deeptech`
- **difficulty** is one of: `Beginner | Intermediate | Advanced`
- **stack** and **vibes** are non-empty arrays
- **Category distribution:** report count per category (saas: 53, creative: 51, utility: 52, social: 50, deeptech: 54)
- **Difficulty distribution:** report count per difficulty

List every violation found. If all clean, say so.

---

## 5. Zustand Store — lib/store.ts

Read `lib/store.ts` and verify:

- The store covers all five `CategoryId` values in its `scores` shape
- `toggleLike`, `recordSurprise`, `resetVibes` are exported and typed correctly
- The `hydrated` flag is set via `onFinishHydration` or equivalent (not just `useEffect`) to avoid SSR mismatch
- localStorage key is `vibevault-260-store`

Report any inconsistencies.

---

## 6. Weighted Randomizer — lib/randomizer.ts

Read `lib/randomizer.ts` and verify:

- `pickWeightedCategory` handles the edge case where all category scores are 0 (should fall back to uniform distribution)
- `pickShuffleSequence` produces exactly 18 frames
- No project can appear consecutively in the sequence (last-picked exclusion)
- The 20 % discovery / 80 % weighted split is implemented

Report any logic gaps.

---

## 7. Component Audit

Spot-check each component file in `components/` for:

- Missing `"use client"` directives (all components are client-side)
- `useSearchParams()` wrapped in `<Suspense>` (Next.js 13+ requirement)
- `key` props on all mapped elements
- Unguarded `document` / `window` / `navigator` access outside `useEffect` or browser checks (SSR safety)

---

## 8. Deep Link — `/?project=<id>`

Read `app/page.tsx` and confirm:

- `useSearchParams()` is called inside a `<Suspense>` boundary (or the component is itself wrapped)
- An invalid `project` query param (ID not in projects list) is handled gracefully (no crash, modal just doesn't open)

---

## 9. CI/CD — .github/workflows/deploy.yml

Read the workflow and verify:

- Node version matches `package.json` `engines` field (or is at least ≥ 20)
- `STATIC_EXPORT=true` is set during build
- The artifact path matches `next.config.mjs` `distDir` (should be `out/`)
- The workflow has a `permissions` block for `pages` and `id-token`

---

## 10. Accessibility Spot-Check

In `components/ProjectCard.tsx`, `components/DeepDiveModal.tsx`, and `components/FilterBar.tsx`:

- Interactive elements (`button`, `div onClick`) have `aria-label` or visible text
- Modal has `role="dialog"` and `aria-modal="true"`
- Focus is trapped or returned on modal close (check for `autoFocus` or `focus()` call)

---

## Summary

After completing all sections, produce a markdown table:

| # | Check | Status | Issues Found |
|---|-------|--------|--------------|
| 1 | TypeScript | ✅ / ❌ | N errors |
| 2 | Linting | ✅ / ❌ | N warnings, M errors |
| 3 | Build | ✅ / ❌ | — |
| 4 | Data Integrity | ✅ / ❌ | — |
| 5 | Zustand Store | ✅ / ❌ | — |
| 6 | Randomizer Logic | ✅ / ❌ | — |
| 7 | Component Audit | ✅ / ❌ | — |
| 8 | Deep Link | ✅ / ❌ | — |
| 9 | CI/CD | ✅ / ❌ | — |
| 10 | Accessibility | ✅ / ❌ | — |

Then list the **top 3 highest-priority fixes** with a one-line action for each.
