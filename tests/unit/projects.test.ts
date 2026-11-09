import { describe, it, expect } from "vitest";
import { PROJECTS } from "@/data/projects";
import { CATEGORIES } from "@/lib/types";

describe("PROJECTS data integrity", () => {
  it("contains exactly 260 projects", () => {
    expect(PROJECTS).toHaveLength(260);
  });

  it("has the expected number of projects per category", () => {
    const expected: Record<string, number> = {
      saas: 53,
      creative: 51,
      utility: 52,
      social: 50,
      deeptech: 54,
    };
    for (const cat of CATEGORIES) {
      const count = PROJECTS.filter((p) => p.category === cat.id).length;
      expect(count, `${cat.id} should have ${expected[cat.id]} projects`).toBe(expected[cat.id]);
    }
  });

  it("has no duplicate IDs", () => {
    const ids = PROJECTS.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("all required string fields are non-empty", () => {
    const required = [
      "id",
      "title",
      "tagline",
      "description",
      "prompt",
    ] as const;
    for (const p of PROJECTS) {
      for (const field of required) {
        expect(p[field], `${p.id}.${field} must be non-empty`).toBeTruthy();
      }
    }
  });

  it("all stack arrays are non-empty", () => {
    const bad = PROJECTS.filter((p) => p.stack.length === 0);
    expect(bad.map((p) => p.id)).toEqual([]);
  });

  it("all vibes arrays are non-empty", () => {
    const bad = PROJECTS.filter((p) => p.vibes.length === 0);
    expect(bad.map((p) => p.id)).toEqual([]);
  });

  it("all difficulty values are valid", () => {
    const valid = new Set(["Beginner", "Intermediate", "Advanced"]);
    const bad = PROJECTS.filter((p) => !valid.has(p.difficulty));
    expect(bad.map((p) => `${p.id}:${p.difficulty}`)).toEqual([]);
  });

  it("all category values are valid", () => {
    const valid = new Set(CATEGORIES.map((c) => c.id));
    const bad = PROJECTS.filter((p) => !valid.has(p.category));
    expect(bad.map((p) => `${p.id}:${p.category}`)).toEqual([]);
  });

  it("IDs follow the <prefix>-NNN format", () => {
    const re = /^(saas|creative|utility|social|deeptech)-\d{3}$/;
    const bad = PROJECTS.filter((p) => !re.test(p.id));
    expect(bad.map((p) => p.id)).toEqual([]);
  });
});
