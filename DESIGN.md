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

The role pool and hero pool come from `game-data/marvel-rivals.json`. Announced-but-unreleased heroes never appear. A role reroll invalidates the hero and goal; a hero reroll keeps the role but clears the goal; changing a goal does not reroll either result. Detailed reveal and reroll behavior is defined below.

## Accessibility and interaction notes

- Use real buttons for reveals and actions; goal cards should be a keyboard-operable radio group.
- Focus order follows Role → Hero → Goal → confirmation. Preserve focus on the activated reroll button after a reroll.
- Announce each new result in a polite live region, e.g. “Role revealed: Duelist.” Do not convey selected/progress states by color alone.
- Provide visible keyboard focus, sufficient contrast and touch-sized targets. Keep a reduced-motion path; animation must not delay the next action.
- If the roster cannot provide an eligible hero, show a recoverable error instead of a blank card.

## Reveal, reroll, and keyboard behavior

The card-based reveal is the v1 interaction; there is no wheel or game of chance animation that delays the result.

### Reveal rules

- Each action draws once from the current eligible pool using a uniform random selection. The role is selected uniformly first; the hero is then selected uniformly from that role's pool.
- A reveal may use a brief, subtle visual transition (roughly 500 ms) to signal the result. The selected result is fixed as soon as the action starts; animation must never cycle through fake outcomes or change the selected value.
- Under `prefers-reduced-motion: reduce`, show the result immediately with no movement or timed reveal.
- Prevent double activation while a short transition is in progress. Keep the primary action available immediately when the result settles.

### Reroll rules

| Action | What changes | What is cleared |
| --- | --- | --- |
| Reroll role | Select a different role, if possible | Hero and goal |
| Reroll hero | Select a different hero from the current role, if possible | Goal |
| Change goal | Select Lord 20 or max proficiency 70 | Nothing else |
| Start a new path | Return to the ready state | Role, hero, and goal |

- Rerolls are unlimited; the player may keep the result or reroll again.
- Do not immediately repeat the current result when there is more than one eligible choice. If only one eligible option exists, allow it to repeat and explain that it is the only available choice.
- Rerolling the role after a hero or goal was chosen clears those dependent choices before showing the new role. Rerolling a hero preserves the selected role.
- A goal change never silently changes the role or hero. “Start a new path” is the only action that clears the entire path deliberately.
- If a pool is unexpectedly empty, do not generate a fallback hero from another role. Keep the current path intact and show a retry/recovery message.

### Keyboard, focus, and announcements

- Reveal and reroll actions are native buttons. `Enter` or `Space` activates them; no keyboard-only interaction is required to use the transition.
- Goal choices are a native radio group with `fieldset`/`legend` or equivalent accessible naming; arrow keys move between goals and `Space` selects.
- Keep focus on the activated button as its result/next-action label updates; do not move focus to the top of the card during reveals. For rerolls, retain focus on the matching reroll control.
- Use one polite live region for results and dependency clearing. Example messages: “Role revealed: Duelist. Reveal a hero when ready.” “Hero rerolled: Psylocke. Your role stays Duelist; choose a goal again.” “Role changed to Strategist; hero and goal cleared.” Avoid announcing decorative animation frames.
- On empty/error states, announce the issue and expose a keyboard-operable retry or restart action. Never communicate status with color alone.

## Decision boundary

The Marvel-first layout, state flow, reveal type, and reroll/accessibility rules are now set. The next design step will define goal choice, commitment/confirmation, what “complete” means in the app, and the final-path summary. Visual polish and final assets come later.
