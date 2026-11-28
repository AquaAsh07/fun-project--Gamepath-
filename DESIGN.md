# Gamepath v1 — Marvel-first flow & screen sketch

**Status:** first-pass UX sketch  
**Scope:** Marvel Rivals only at launch. VALORANT and FC 27 stay out of the playable UI until their own data is researched and ready.

## Experience at a glance

Open the app directly to the Marvel Rivals randomizer. Reveal one of the three roles, reveal a hero from that role, choose a Hero Proficiency target, then keep the path or start another one. This is one focused page with progressive states—not a multi-page wizard and not a game picker with disabled tiles.

```text
Open Gamepath
    ↓
Role ready ── Reveal role ──→ Role revealed
                                  ↓ Reveal hero
Hero revealed ── Reroll hero (same role) / Reroll role (clears hero)
    ↓ Choose a target
Goal selected ── Confirm challenge ──→ Your Gamepath
                                           ↓ New path
                                         Role ready
```

## Low-fidelity screen sketches

### A. Ready to begin / role not yet revealed

```text
┌──────────────────────────────────────────────────────┐
│ gamepath.                           MARVEL RIVALS    │
│                                                      │
│          YOUR NEXT MARVEL RIVALS PATH                │
│     One role. One hero. One goal to chase.           │
│                                                      │
│     ┌──────────────────────────────────────────┐     │
│     │  01 ROLE                                  │     │
│     │  Ready to find your role?                 │     │
│     │  Vanguard · Duelist · Strategist          │     │
│     │                                          │     │
│     │          [ REVEAL MY ROLE ]               │     │
│     └──────────────────────────────────────────┘     │
│                                                      │
│              1 ROLE  ───  2 HERO  ───  3 GOAL       │
└──────────────────────────────────────────────────────┘
```

**Purpose:** explain the simple loop and give one obvious first action. No setup controls, account prompt, or extra game tiles.

### B. Role revealed / hero is next

```text
┌──────────────────────────────────────────────────────┐
│  01 ROLE · REVEALED                                  │
│  YOUR ROLE                                           │
│  DUELIST                                             │
│  Now find a hero from the Duelist pool.              │
│                                                      │
│          [ REVEAL MY HERO ]                          │
│          [ Reroll role ]                             │
└──────────────────────────────────────────────────────┘
```

**Purpose:** make the first result feel like a meaningful reveal, and make the next action obvious. Rerolling the role clears any hero/goal further down the path.

### C. Hero revealed / goal choice

```text
┌──────────────────────────────────────────────────────┐
│  02 HERO · DUELIST                                   │
│  YOUR HERO                                           │
│  [ character artwork / initials ]                    │
│  PSYLOCKE                                             │
│                                                      │
│  Pick a proficiency goal                             │
│  ┌───────────────────┐  ┌───────────────────────┐    │
│  │ REACH LORD        │  │ MAX HERO PROFICIENCY  │    │
│  │ Level 20          │  │ Level 70              │    │
│  └───────────────────┘  └───────────────────────┘    │
│                                                      │
│  [ Reroll hero ]       [ Change role ]               │
└──────────────────────────────────────────────────────┘
```

**Purpose:** keep the role visible as context, show the hero as the main result, and let the player choose the commitment after seeing who they got. All heroes are eligible for both targets. Use a name/initials fallback if approved artwork is unavailable.

### D. Path confirmed

```text
┌──────────────────────────────────────────────────────┐
│  YOUR GAMEPATH                                       │
│  DUELIST  →  PSYLOCKE  →  REACH LORD · LEVEL 20      │
│                                                      │
│  Your challenge is set. Go earn that proficiency.    │
│                                                      │
│  [ START A NEW PATH ]        [ Change goal ]         │
└──────────────────────────────────────────────────────┘
```

**Purpose:** provide a concise, shareable-in-person summary without adding a social/share feature. “Start a new path” clears the current role, hero, and target and returns to state A.

## Page layout

- **Header:** small Gamepath wordmark, compact “Marvel Rivals” label. No full navigation in the one-game MVP.
- **Main column:** centered, one reveal card at a time; keep it narrow enough to make the result feel like the focus.
- **Progress cue:** three labeled stages—Role, Hero, Goal—with current/completed states. Use text as well as color.
- **Result card:** official role/hero name, short context line, and a clear primary action. Character art is optional; content remains complete without it.
- **Goal choice:** two equally weighted, selectable cards. Labels must say “Reach Lord · Level 20” and “Max Hero Proficiency · Level 70”; do not label level 70 as the point where Champion rank starts.
- **Footer:** minimal; defer unrelated navigation until there is a real destination.

## Responsive behavior

- **Wide screens:** centered card (roughly 620–700 px maximum); goal choices side-by-side.
- **Small screens:** full-width card with safe side padding; stack goal choices; keep the primary action visible without horizontal scrolling.
- Keep role/hero/goal order and copy the same across sizes. Do not hide a critical control behind hover.

## State and content requirements

| State | Visible content | Primary action |
| --- | --- | --- |
| Ready | Game label, 3-step cue, possible roles | Reveal my role |
| Role revealed | Selected official role and remaining steps | Reveal my hero |
| Hero revealed | Selected role, hero, two goal choices | Select a goal |
| Goal selected | Role → hero → target summary | Confirm challenge |
| Confirmed | Final path summary and fresh-path control | Start a new path |
| Empty/error | What could not be selected and why | Retry or return safely |

The role pool and hero pool come from `game-data/marvel-rivals.json`. Announced-but-unreleased heroes never appear. A role reroll invalidates the hero and goal; a hero reroll keeps the role but clears the goal; changing a goal does not reroll either result. Exact motion, input, and reroll edge cases are the next design decision.

## Accessibility and interaction notes

- Use real buttons for reveals and actions; goal cards should be a keyboard-operable radio group.
- Focus order follows Role → Hero → Goal → confirmation. Return focus to the reveal button after rerolls.
- Announce each new result in a polite live region, e.g. “Role revealed: Duelist.” Do not convey selected/progress states by color alone.
- Provide visible keyboard focus, sufficient contrast and touch-sized targets. Keep a reduced-motion path; animation must not delay the next action.
- If the roster cannot provide an eligible hero, show a recoverable error instead of a blank card.

## Decision boundary

This is the layout and user-flow sketch. The next step will lock down the precise reveal interaction: whether each reveal animates, reroll limits/behavior, keyboard details, and how the result is announced. Visual polish and final assets come later.
