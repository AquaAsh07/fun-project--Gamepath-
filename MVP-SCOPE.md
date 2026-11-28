# Gamepath MVP scope

**Status:** agreed working specification for the first playable version  
**Product promise:** Choose a game, reveal a random path, and get a clear challenge to play.

This is a deliberately small first release. The game roster and exact challenge catalog are the next planning item; nothing here assumes that data is already complete.

## Player flow

1. **Choose a game.** The player explicitly picks Marvel Rivals, VALORANT, or FC 27. Game selection is not randomized.
2. **Reveal a category.** Gamepath randomly picks an appropriate role or challenge category for that game.
3. **Reveal an eligible pick.** A second reveal randomly picks a character, agent, or challenge item from the selected category. The result must belong to that category.
4. **Set or view the goal.** Show a relevant goal with the result. For Marvel Rivals, include the player-facing Lord (character level 20) and Champion (character level 70) targets. The exact goal presentation for VALORANT and FC 27 is settled when their challenge data is confirmed.
5. **Play again.** The player can reroll the current reveal or start a fresh path. A reroll must not change the chosen game or silently switch the selected category.

## MVP interaction rules

- Use a **step-by-step reveal card** for v1, not a spinning wheel. This keeps the interaction quick, readable, keyboard-friendly, and practical on mobile; a wheel can be evaluated later.
- The player chooses the game; randomness starts at that game's category/role stage.
- Each category reveal is followed by a pick drawn only from that category's eligible data.
- Use a fair uniform random selection among eligible entries. Avoid an immediate repeat on reroll when there is more than one eligible option; allow the same result when it is the only option.
- Keep the current path visible while revealing the next step. Provide clear back/restart behavior and a useful empty-state message if a category has no eligible entries.
- A generated challenge is a suggestion, not a live game integration: Gamepath does not verify match results, character levels, rank, or completion.
- Use the game titles, categories, labels, and target values stored in the project's data. Do not rely on external game APIs for the MVP.

## In scope

- Responsive game selection and reveal screens.
- Data-driven game → category/role → eligible pick flow for the three planned games.
- Relevant challenge/goal display, including Marvel Rivals' level 20 and level 70 milestones.
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

- A player can choose each planned game and complete a valid path without needing an account.
- Every revealed pick belongs to the category shown immediately before it.
- Marvel Rivals results can be paired with the Lord (20) or Champion (70) target.
- Reroll and start-over have predictable behavior, including one-item and empty categories.
- The complete flow works on mobile and desktop and can be operated with a keyboard.

## Decisions still open for the next step

- The launch roster and exact role/category labels for every supported game.
- Which FC 27 challenge categories/items to include, and suitable goal presets for VALORANT and FC 27.
- Whether each character/pick is eligible for all relevant challenge targets.
