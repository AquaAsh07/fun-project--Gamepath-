# Gamepath MVP scope

**Status:** agreed working specification for the first playable version  
**Product promise:** Choose a game, reveal a random path, and get a clear challenge to play.

This is a deliberately small first release. **Marvel Rivals is the only launch game.** The roster and goal catalog are recorded in [`game-data/MARVEL-RIVALS.md`](game-data/MARVEL-RIVALS.md) and [`game-data/marvel-rivals.json`](game-data/marvel-rivals.json). VALORANT and FC 27 are future updates, not launch choices.

## Player flow

1. **Start with Marvel Rivals.** It is the only live game in v1, so the launch experience opens directly into its randomizer rather than presenting a picker with unavailable games.
2. **Reveal a role.** Gamepath picks uniformly from Vanguard, Duelist, and Strategist.
3. **Reveal an eligible hero.** A second reveal uniformly picks a hero from that role. The result must belong to the selected role; Deadpool can appear in any of his three role variants.
4. **Choose the goal.** The player chooses **Reach Lord (level 20)** or **Max out Hero Proficiency (level 70)** for the selected hero. The level-70 target is the cap within the Champion rank band, not the level at which Champion rank begins.
5. **Play again.** The player can reroll the current reveal or start a fresh path. A reroll must not silently change an already-revealed role.

## MVP interaction rules

- Use a **step-by-step reveal card** for v1, not a spinning wheel. This keeps the interaction quick, readable, keyboard-friendly, and practical on mobile; a wheel can be evaluated later.
- Marvel Rivals is the only game at launch, so the app starts there directly; add a game picker only when another game's catalog is ready.
- Each category reveal is followed by a pick drawn only from that category's eligible data.
- Use a fair uniform random selection among eligible entries. Avoid an immediate repeat on reroll when there is more than one eligible option; allow the same result when it is the only option.
- Keep the current path visible while revealing the next step. Provide clear back/restart behavior and a useful empty-state message if a category has no eligible entries.
- A generated challenge is a suggestion, not a live game integration: Gamepath does not verify match results, character levels, rank, or completion.
- Use the game titles, categories, labels, and target values stored in the project's data. Do not rely on external game APIs for the MVP.

## In scope

- A responsive Marvel Rivals-first experience with role and hero reveal cards.
- Data-driven Marvel Rivals role → eligible hero → goal flow, using the Season 11 roster snapshot.
- The Lord level-20 and level-70 max-proficiency goal presets, available for every playable hero.
- Reroll, start-over, empty states, and browser refresh-safe handling only if needed to preserve the active path.
- Keyboard-accessible controls and reduced-motion-friendly reveal feedback.

## Out of scope for v1

- Accounts, cloud sync, leaderboards, social features, or public sharing.
- Live game integrations, account linking, match tracking, or automatic progress verification.
- A progress tracker for each character's actual level; the goal is displayed for the player to pursue in-game.
- Custom user-created rosters, categories, or challenges.
- A physics-based wheel, sound effects, or elaborate animation.
- Monetization, analytics, and a backend/database unless a later requirement makes one necessary.

## MVP acceptance checks

- A player can complete a Marvel Rivals path without an account; unreleased future games are not shown as selectable.
- Each role is equally likely, then a valid hero is drawn uniformly from that role's eligible picks.
- Every Marvel Rivals hero can be paired with the Lord (20) or max-proficiency (70) target.
- Reroll and start-over have predictable behavior, including one-item and empty categories.
- The complete flow works on mobile and desktop and can be operated with a keyboard.

## Decisions for later phases

- Screen flow and reveal/reroll/accessibility rules are recorded in [`DESIGN.md`](DESIGN.md). The next design step will settle goal selection, path confirmation, and what completion means in the app.
- When VALORANT or FC 27 is added, research its then-current patch/season, player challenges, and goal presets before making it selectable. Keep each game's catalog separate and cite the research.
- Maintain the Marvel Rivals roster against official updates; do not include announced heroes until they are playable.
