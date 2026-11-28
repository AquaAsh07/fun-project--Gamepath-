# Marvel Rivals launch data

**Scope:** Marvel Rivals is the only game selectable at launch. VALORANT and FC 27 remain future additions.  
**Roster snapshot:** Season 11, checked 2026-11-28.  
**Machine-readable catalog:** [`marvel-rivals.json`](marvel-rivals.json)

## Roles and roster

Use the game's official labels: **Vanguard**, **Duelist**, and **Strategist**. The season 11 snapshot has 54 single-role heroes plus Deadpool, who can be selected in all three roles. The catalog therefore contains 55 distinct heroes and 57 role-specific picks: 15 Vanguard picks, 28 Duelist picks, and 14 Strategist picks.

Deadpool appears once in each role pool as a role variant, but is one hero for display and proficiency-goal purposes. He is not three independent heroes. New heroes should be added only once playable and placed in the role(s) listed by the game's current hero data.

## Randomization decision

1. Pick uniformly among the three roles.
2. Pick uniformly among the eligible heroes in that role.
3. Show the result and let the player choose their goal.

Choosing the role first with equal odds means Duelist is not more likely merely because it has a larger roster. A multi-role hero is a valid pick in each matching role, with that role shown on the result card.

## Goals and eligibility

Every playable hero, including each Deadpool role variant, is eligible for both goals:

- **Reach Lord — level 20:** target Hero Proficiency level 20.
- **Max out Hero Proficiency — level 70:** target the level-70 cap.

A terminology note for accurate UI: **Champion is the Hero Proficiency rank band beginning at level 50; level 70 is the cap within that band.** The level-70 goal is therefore framed as maxing proficiency, rather than implying the Champion rank starts at 70. The player picks the target after receiving a hero; Gamepath does not infer the player's current level or track completion.

## Trend and challenge policy

For this launch, the meaningful challenge is hero mastery: choose a randomly assigned role/hero, then pursue one of the two proficiency milestones. We will not add a rotating tier list or patch-meta hero weighting to the randomizer: it would bias the draw and go stale quickly.

When another game is added, research its current patch/season and community challenge trends at that time, separate durable challenges from time-limited trends, cite the sources, and keep its goal presets in that game's own data. Future-game challenge ideas are intentionally not mixed into the Marvel-only launch catalog.

## Sources and verification

- [Official Marvel Rivals Heroes directory](https://www.marvelrivals.com/heroes/) — official character names and role labels.
- [Official Season 11 patch notes](https://www.marvelrivals.com/gameupdate/20261111/41548_1319332.html) — confirms Nightcrawler's Season 11 release; included as playable in this snapshot.
- [Season 11 roster by role](https://gametierlistmaker.com/marvel-rivals) — cross-check for the 55-hero roster and role totals, snapshot checked 2026-11-17.
- [Hero Proficiency rank guide](https://dotesports.com/marvel/news/how-to-get-lord-in-marvel-rivals) — cross-check for Lord at 20, Champion rank from 50, and proficiency rewards through level 70.

Recheck the official directory and latest patch notes whenever the roster is updated. Future announced heroes are not included until playable.
