# Gamepath

Gamepath helps players turn a random pick into a focused game challenge. The first deliverable is a lightweight phase-based project tracker built with plain HTML, CSS, and JavaScript.

## Run locally

Open `index.html` in a modern browser. No build step or dependencies are required.

## MVP scope

The working v1 rules and boundaries are documented in [MVP-SCOPE.md](MVP-SCOPE.md). **Marvel Rivals is the only launch game**; the player reveals a random official role, then an eligible hero, then chooses a proficiency goal. VALORANT and FC 27 are future additions and will be researched when they are ready to join the catalog. V1 uses step-by-step reveal cards; no accounts, backend, or live game integrations are planned.

The researched Season 11 roster, role pools, and goal presets are in [game-data/MARVEL-RIVALS.md](game-data/MARVEL-RIVALS.md) and [game-data/marvel-rivals.json](game-data/marvel-rivals.json). The Marvel-first flow, responsive screen sketch, and reveal/reroll/accessibility rules are in [DESIGN.md](DESIGN.md).

## Project roadmap

1. **Project map & guardrails** — agree on the MVP, rules, and game data.
2. **Core experience** — shape the Marvel role-to-hero-to-goal flow and reveal interactions.
3. **Build the MVP** — implement a responsive UI and data-driven randomizer.
4. **Future game content & updates** — maintain Marvel Rivals data, then research and add future games when ready.
5. **Test, polish & launch** — validate, refine, deploy, and learn from player feedback.

The interactive checklist saves progress in this browser using local storage. The first three project-planning steps are pre-completed; future steps can be checked off as they are delivered. Reset returns the checklist to that initial state.
