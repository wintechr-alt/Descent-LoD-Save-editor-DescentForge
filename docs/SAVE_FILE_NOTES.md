# What we know about the save file

Notes from reading real *Descent: Legends of the Dark* save files while building this editor. They
are findings, not official documentation, and some are guesses (marked **unsure**). Everything
here was checked against seven saves, including one finished, never-edited Act 2 campaign.

## The file

- A `.sav` is JSON text with 4-space indentation, named like `2026-09-29_20-05-46.sav` (date and
  time). The game loads the newest one, so the editor saves your edited copy one second newer.
- Large whole numbers (the `Timestamp`) must stay exact, so the editor reads and writes them as
  text. The editor writes floats such as `0.0` as `0`, as the original editor's JSON writer did.
- Top level: `Version` (seen: 2.0.8 and 2.0.10), `Act` (0 = an Act 1 campaign, 1 = an Act 2
  campaign), `ProductIDs` (`PRODUCT_CORE_SET`, `PRODUCT_ACT_2`), `AllPlayers`, and
  `GameSceneData` with `GameState` and `SceneEntities`.
- `AllPlayers` exists twice, at the top level and inside `GameState`. Anything that changes a
  hero's gear has to change both copies.

## Items

- `GameState.ItemInventory` is a list of `{ "Id": ..., "SoldOut": false }`. Real saves always have
  `SoldOut` false.
- Armor is `ARMOR_1`...`ARMOR_27`. Trinkets are `TRINKET<n>_ID` for 1 to 21 (there is no 14).
  Consumables are `CSM_<NAME>` (16 that you craft). Weapon parts are
  `WEAPON_PART_<A|B|C>_<TYPE>_<level>`, levels 1 to 5.
- Upgrades add `_PLUS` (armor, trinkets, consumables) or `_UPGRADED` (weapon parts). An upgrade
  replaces the base item: a save never owns both.
- Level 0 parts B and C (`WEAPON_PART_B_SWORD_0` ...) are the "no part fitted" option. Every save
  has them.
- Shared weapons (Rune of Blades, Ice Storm, Lightning Strike, Sunburst, Grasp of Fear,
  Dragonsbane) are parts A, B and C with no level. You're given them: none has a base recipe. Only
  part A can be upgraded, from `RECIPE_WEAPON_PART_A_<NAME>_UPGRADED`. `SharedWeaponIds` lists the
  ones you own that no hero is using.
- Heroes: `EquippedWeapons` is a list of `{ Id, PartAId, PartBId, PartCId }` and
  `EquippedTrinketId` is a string.

## Recipes

- `GameState.DiscoveredRecipes` is a list of `{ "Id": "RECIPE_...", "Crafted": true|false }`.
- Anything you craft has two recipes: the normal one and the one for the upgraded ("Plus")
  version. Armor, trinkets and part A weapons are bought, found or given, so they only have the
  Plus recipe.
- **Buying** a recipe adds it with `Crafted: false` and, in a real before/after pair, took it out of
  `AvailableRecipeIds` and set its shop entry to quantity 0. **Crafting** sets `Crafted: true`, adds
  the item (`SoldOut: false`), fits a better part on the hero, and sets the tutorial flag
  `IsCraftingVisited` in the `TutorialDT` scene entity.
- In a finished game 378 of the 387 recipes are known and 213 of those are known but not crafted.
  Every crafted item that is upgraded has its base recipe marked crafted. An upgrade can be owned
  without its own recipe: Tarnished Brooch Plus and the Crossbow part A upgrade are in the finished
  game.
- Some recipe IDs don't follow the pattern: five end in a space
  (`RECIPE_WEAPON_PART_A_SWORD_5_UPGRADED `, ...), Biting Bracers Plus is
  `RECIPE_WEAPON_PART_C_GAUNTLET_UPGRADED` (no level), and Rusted Nail Plus is
  `RECIPE_TRINKET_20_ID_PLUS` while the trinket itself is `TRINKET20_ID`.

## The shop

- `ShopData` is a list of `{ "id": ..., "qty": ... }` holding items, recipes and materials. A sold
  out entry stays in the list with `qty` 0. Items and recipes are always quantity 1.
- `AvailableItemIds` and `AvailableRecipeIds` are the shop's pools. In the finished game they
  still list items already owned and recipes already known, so they are not a list of what is
  unbought. **Unsure** how the game picks from them, and why a recipe left the pool right after
  being bought in one test.
- A campaign can customise the shop. DescentForge lets a campaign author replace or add to it, and
  quests can teach a recipe directly. A new Act 1 campaign has 47 items and 32 recipes in the pools.
- `ShopExtraSlots` is in the `@Global_BB` scene entity's serialized blackboard. **Unsure** what it
  does: the editor can set it but that has not been tested in the game.

## Act 1 and Act 2

A save that doesn't own `PRODUCT_ACT_2` breaks if Act 2 items are in it. The editor treats these as
Act 2: armor 19 to 27, trinkets 13 to 21, hero skills 8 to 11, hero feats 12 to 20, weapon parts A,
B and C at levels 4 and 5, six consumables (Caution Serum, Knack Juice, Efficacious Elixir,
Glitterdust Bomb, Stalwart Incense, Whirlwind Grenade), the shared weapons Dragonsbane, Grasp of
Fear and Sunburst, and 57 enemies. This came from DescentForge's catalog plus checking against
Act 1 and Act 2 saves.

## Skills and feats

- `UnlockedSkills` has 11 skills per hero (`SKILL_<HERO>_1` to `_11`).
- `RealCompletedFeats` has 20 feats per hero in a finished game, 120 in all. DescentForge counts 114.
  Completing a feat that is in progress stops the game letting you claim it, so you can't take new
  feats.

## Enemy weaknesses

`GameState.DiscoveredEnemyVulnerabilities` is a list of `{ "EnemyIdHash": int, "VulnerabilityFlags": int }`.

- `EnemyIdHash` is Unity's IL2CPP string hash of the enemy ID (for example `ENEMY_WOLF_1`):

  ```js
  function il2cppHash(text) {
      let h1 = 5381, h2 = 5381;
      for (let i = 0; i < text.length; i++) {
          const c = text.charCodeAt(i);
          if (i % 2 === 0) h1 = (((h1 << 5) + h1) ^ c) >>> 0;
          else h2 = (((h2 << 5) + h2) ^ c) >>> 0;
      }
      return (h1 + Math.imul(h2, 1566083941)) | 0;
  }
  ```

  It matched every entry in every save against the DescentForge enemy list.
- Bit *n* (n is 1 or more) of `VulnerabilityFlags` is the enemy's *n*th weakness or resistance in
  the catalog's order, weaknesses first. The game reveals them one at a time: the same Wolf has flags
  1, 3 and 7 in three different saves, which add its Slash weakness and then Anemos. No bit has ever
  been set beyond the catalog's list.
- Bit 0 is **not understood**. It is set on 89 of 104 entries in the finished game, including the 3
  that are fully revealed, and is often clear on bosses and named enemies. It gets set during play for some enemies.
  The editor ignores it and sets it whenever it makes an enemy known.
- After a whole game only 3 of 104 entries had everything revealed.
- Setting every bit (bit 0 and one bit per entry, which is what "Reveal all" does) was checked in the
  game on a new, non-DescentForge Act 2 campaign: the enemies showed their weaknesses. In that
  screenshot the enemy bar showed 3 icons for an enemy DescentForge lists with 3 weaknesses and 1
  resistance, 3 again for another with 3 weaknesses and 1 resistance, and 2 for one with 2
  weaknesses and 1 resistance. So only the weaknesses showed as icons, even with the resistance bit
  set. **Unsure** whether resistances show anywhere else, or are used by the game at all.
- Two enemies were checked in the game against a save with flags 3 and 7: the Intro Boss (flags 3)
  showed only its Slash weakness, and the Bandit (flags 7) showed Pierce and Anemos with no
  resistance. That fits bit *n* being the *n*th entry, weaknesses first, with resistances not shown.
- In DescentForge's list every Act 1 enemy that has a resistance has exactly one, always physical
  (Slash, Pierce or Crush). Act 2 enemies have up to three, and some are elemental. Pierce
  resistances on Act 1 enemies were never revealed in any of four saves.

## Where the current mission lives (from the finished Act 2 save only)

This part is what the first reading of the finished official Act 2 campaign showed, kept as a map of
where to look. The Missions tab (below) writes some of it.

`GameSceneData.GameState`:

- `CompletedDestinationIds`: the missions done, in the order they were finished. In the finished
  game: `STORY_QUEST_1`...`14` (`STORY_QUEST_4_S` is how 4 is spelled), `SIDE_QUEST_1` and `_2`,
  then `ACT2_QUEST_1`...`11`. Act 2 was played 1, 2, 3, 4, 8, 9, 10, 5, 6, 7, 11, so it is not
  linear.
- `ActiveDestinationIds`: empty in the finished game. **Unsure** whether it holds the missions
  open on the map right now.
- `CurrentDestinationId`: `DESTINATION_CITADEL` (the Act 2 hub). `QuestId` is empty while on the map.
- `CurrentGamePhase` is 1, `EncounterIndex` is 0, and `CurrentObjectiveData` holds a `Key` of
  `A2Q11_OBJECTIVE6` (the last objective played) with an empty `CurrentObjective`. **Unsure** what
  the phase numbers mean.
- `CampaignProgressionOverride` is -1. **Unsure**; the name suggests it forces a progression
  point, and -1 may mean "off".
- `CampaignId` is `Campaign_2` for the official Act 2.
- `CampaignLogEntries`: `{ EntryId, EntryType, DateCompleted }`. Type 0 is a mission, 1 a narrative
  event and 2 a city event. The dates are real calendar dates.
- `CompletedNarrativeEventIds`, `CompletedCityEventIds`, `AvailableTravelEvents`
  (`{ TravelEventId, HasPriority, IsCompleted, Delay }`).
- `StoryData` and the top-level `StorySlot` hold the same `LastKnownLocation`
  (`LOCATION_ACT2_TOWN_10`), total play time and last-played ticks.

Scene entities (their blackboards are JSON inside a JSON string, sometimes encoded twice):

- `@Act_1_BB_Simplified`: `Quest_1`...`14`, `Quest_S1`, `Quest_S2`, each `WIN`, `SAVED` or `LOST`,
  plus the story choices made (`Q5_EggsSaved`, `Q7_DragonSkull`, `Q12_SentToEyrie` ...).
- `@Act_2_BB`: `Quest_1`...`11` (`WIN`), `Most Recent Quest` (`ACT2_QUEST_11`),
  `Number of A2 Quests Played` (10), `Which Chapter First?`, faction reputations, building slots
  and the Act 2 story choices.
- `Act_2_WorldMap_DT` (its GUID is `WorldMapDTGUID` in the game state): `CurDestId`, `Quest Count`
  (10), `Total Favor`.
- `Canvas_WorldMap`: `Destination` ("None").

### An early Act 1 save, for comparison (2024-11-06_11-14-05.sav, game 2.0.7)

An Act 1 campaign (`Act` 0, `CampaignId` `Campaign_1`) that owns Act 2, saved in Frostgate right
after Quest 1. Compared with the finished game:

- `CompletedDestinationIds` is `["STORY_QUEST_1"]` and **`ActiveDestinationIds` is
  `["STORY_QUEST_2","STORY_QUEST_3"]`**: the missions the map offers right now. The finished game
  has none left, so this is the field a "set the current mission" feature would most likely set.
- `CampaignLogEntries` has one entry for `STORY_QUEST_1`, with its date.
- `CurrentDestinationId` is `DESTINATION_FROSTGATE` (the town) and `LastKnownLocation` is
  `LOCATION_TOWN_01`. The `WorldMapDT` blackboard's `CurDestId` and `Local Last Quest` are
  `STORY_QUEST_1`, so `CurDestId` looks like the last mission chosen, not the town.
- `CurrentObjectiveData.Key` is `Q1_OBJECTIVE_8`. Act 1 spells it `Q<n>_OBJECTIVE_<m>`; Act 2 saves
  use `A2Q11_OBJECTIVE6`.
- `@Act_1_BB` (the finished game's is named `@Act_1_BB_Simplified`): `Quest_1` is `WIN` and every
  other quest is `UNPLAYED`. The finished game also uses `SAVED` and `LOST`.
- `UnavailableHeroes` is `["HERO_KEHLI","HERO_CHANCE"]`: those two join through the story.
  `UnlockedLegends` and `UnlockedCompanions` are empty or short.
- **`@Global_BB.CampaignProgression` is 20, against 72 in the finished game.** See "What finishing a
  mission changes" below: it is `18 + 2 x (missions completed)`.
- Some `@Global_BB` entries only exist later in a campaign: `ShopExtraSlots`,
  `Tarnished Brooch Counter` and the two `UndyingSkullTypes` lists. A missing variable is a
  variable with no value.
- `WorldSetup` is `{"mistland": 0.0, "burntland": false}` here and `{0.75, true}` in the finished
  game: the world map changes with progress.
- Its `AvailableTravelEvents` are called `TEST_TRAVEL_EVENT<n>`, and the finished game's
  `TRAVEL_EVENT_A2_<n>`. **Unsure** why.

### What finishing a mission changes (before.sav and after.sav, game 2.0.10, an Act 1 campaign)

A before/after pair around one mission (`STORY_QUEST_4_S`, lost). Everything the game changed:

- `ActiveDestinationIds`: the mission is removed (`["E2B_BURIED","STORY_QUEST_5","STORY_QUEST_4_S",
  "E3B_THIEF"]` became `["E2B_BURIED","STORY_QUEST_5","E3B_THIEF"]`). Narrative events sit in this
  list too, next to the missions.
- `CompletedDestinationIds`: the mission is appended.
- `CampaignLogEntries`: `{ "EntryId": "STORY_QUEST_4_S", "EntryType": 0, "DateCompleted": "10/01/2026" }`
  is appended (month/day/year).
- `@Act_1_BB.Quest_4` went from `UNPLAYED` to `LOST`. `STORY_QUEST_n` is `Quest_n` and
  `SIDE_QUEST_n` is `Quest_S<n>` (both in the finished game). The result is `WIN` or `LOST`; the
  finished game also has `SAVED` on Quest 2. In this save Quest 2 reads `STARTED` although it is in
  the completed list, so a result can lag behind. **Unsure** when `STARTED` turns into a result.
- `WorldMapDT` blackboard: `CurDestId` and `Local Last Quest` are the mission just finished.
- `@Global_BB.CampaignProgression` went from 24 to 26. **It is `18 + 2 x (completed missions)`**,
  and that matched all four saves with a different count: 1 mission = 20, 3 = 24, 4 = 26,
  27 = 72 (the finished game, Act 1 and Act 2 missions together). City and narrative events do
  not count: the 3-mission save also has `CITY_EVENT_4` and still reads 24.
- `CurrentObjectiveData.Key` moved to that mission's last objective (`Q3_OBJECTIVE_1` to
  `Q4_OBJECTIVE_1B`). It looks cosmetic.
- `FeatRerollsRemaining` went from 3 to 4. It equalled the number of completed missions in three
  saves (1, 3, 4) and is 10 in the finished game, so it may stop at 10 or have been spent.
- Also changed, because it was played rather than because it was finished: materials gained, the
  shop's materials, `AvailableTravelEvents` delays, `QuestSummary` (the treasure list was cleared),
  play time, and one hero's `VirtueOneValue` (3 to 6).
- Not changed: `Gold`, `PartyXP`, enemy weaknesses, feats, skills, `UnavailableHeroes`,
  `CurrentDestinationId`, `CompletedNarrativeEventIds`, `WorldSetup`, `CampaignProgressionOverride`.
- `MinimumTierSpawn` and `MaximumTierSpawn` did not move in this step (both saves read 1 and 2).
  Across saves they read 1-1 at 20, 1-2 at 24 and 26, and 4-6 at 72, so they probably follow
  `CampaignProgression` in steps. **Unsure** whether the game works them out again on load.

What opens next is not stored as a rule. After Quest 1 the map offered 2 and 3; after 1, 2 and 3 it
offered 4 (`STORY_QUEST_4_S`) and 5, plus the narrative events `E2B_BURIED` and `E3B_THIEF`. Losing
Quest 4 did not add an event for it. The game decides this from its own data, so the editor would
have to carry a table of which missions open after which.

### What the Missions tab writes (experimental)

**Changing missions can cause progression problems nobody has mapped, and the tab says so in a big
red box.** It is meant for replaying missions after an act is complete: un-do a finished mission and
open it on the map. It is not meant for skipping ahead and has not been tested for that. The first
Apply on each loaded save also asks for confirmation.

Worked out from the saves above. Act 1 has had only light testing in the game (by the person who asked
for it) and Act 2 none. Act 1 comes from a before/after pair;
for the `STORY_QUEST_4_S` pair the editor's output matched the real `after.sav` field for field (the
log date differs, being the day you use it). Act 2 comes from the one finished save only. Round
trip on that save: un-doing `ACT2_QUEST_11` and then marking it done again gave back the original file
except for the log date.

Both acts:

- `ActiveDestinationIds`: kept in order, minus missions that are now done, plus the ones you open.
  Events and IDs the editor doesn't know stay.
- `CompletedDestinationIds`: what stays done keeps its order; new ones are added in mission order.
- `CampaignLogEntries`: a type 0 entry with today's date for each newly done mission; the entry of a
  mission you un-do is removed. Event entries are left alone.
- `@Global_BB.CampaignProgression`: `18 + 2 x completed missions` (Act 1 and Act 2 missions together:
  the finished game has 27 and reads 72). A checkbox turns this off, for when you'd rather keep the
  number while replaying. With it on, the number drops while a mission is un-done and goes back up
  when it is done again, which is what the formula says but not something seen in a real replay.

Act 1 campaigns (`Act` 0) also:

- `@Act_1_BB`: `Quest_<n>` / `Quest_S<n>` set to the chosen result, or `UNPLAYED` for a mission not done.
  A result the editor doesn't offer (`SAVED`, `STARTED`) is kept if you leave it.
- `WorldMapDT`: `CurDestId` and `Local Last Quest` set to the last mission in the completed list
  (not changed when the list is empty).

Act 2 campaigns (`Act` 1) also, with Act 1 missions listed too:

- `@Act_2_BB.Quest_<n>`: a mission marked done that has no result gets `WIN`. Results can't be
  chosen, and an un-done mission keeps what it has, because only `WIN` was ever seen there and the
  word for "not played" is not known (no `UNPLAYED` anywhere in the Act 2 blackboard).
- `@Act_2_BB."Most Recent Quest"`: the last `ACT2_QUEST_<n>` in the completed list (it reads
  `ACT2_QUEST_11` in the finished game). Only written when an Act 2 row changed.
- Left alone: `Act_2_WorldMap_DT.CurDestId` (it holds the hub, `DESTINATION_CITADEL`, not the last
  mission, unlike Act 1) and the counters `Number of A2 Quests Played` and `Quest Count`. Both read 10
  with 11 Act 2 missions done, and nothing explains the 10.

It does not touch `UnavailableHeroes`, gold, XP, `FeatRerollsRemaining`, events, `CurrentObjectiveData`,
enemy tiers or the shop. The suggestion button only knows the two Act 1 states seen so far (Quest 1
done, and Quests 1, 2 and 3 done).

### Narrative events and city events (what the saves show)

Three kinds of thing are logged in `CampaignLogEntries`, by `EntryType`: 0 a mission, 1 a narrative
event, 2 a city event. In the finished game the log has 27, 35 and 15 entries, and each set matches
its list exactly: type 0 is `CompletedDestinationIds` (same order), type 1 is
`CompletedNarrativeEventIds`, type 2 is `CompletedCityEventIds`. So a finished event is in three places:
its completed list, the log, and (for a mission) the same.

Where a pending one lives:

- **Narrative event** (`E2B_BURIED`, `A2SE17_BOAR_TAMALIR` ...): in `ActiveDestinationIds`, next to the
  missions. `before.sav` has `E2B_BURIED` and `E3B_THIEF` there right after Quest 3, with
  `CompletedNarrativeEventIds` empty. In the finished game they are in the completed list and
  `ActiveDestinationIds` is empty.
- **City event** (`CITY_EVENT_n`, `A2_S0n_...`): in `ActiveCityEvents` as `{ "ModelId": ..., "Position": {x, y} }`,
  a thing placed in the town. `before.sav` and `after.sav` have `CITY_EVENT_0` there at
  `(227, -141)` and `CITY_EVENT_4` already in `CompletedCityEventIds`. In the finished game
  `ActiveCityEvents` is empty. A few Act 2 events with `A2SE` names are logged as type 2 and others as type 1.
- **Neither counts toward `CampaignProgression`**: 27 missions give 72 while 50 events sit in the finished
  game, and the 3-mission save with a completed city event reads 24.

When they come up (one finished campaign, so one player's order; the log is written as things happen):

- `E<n><letter>_NAME` events follow mission `n`: `E2B` and `E3B` after Quests 2 and 3, `E4A` and `E4B`
  after Quest 4, `E5B` after 5, `E7A` after 7, `E8A` after 8, `E6A` after 6, `E9C` after 9, `E13A`
  after 13, `E12A` after 12, `E11A` after 11. The letter is probably the story branch: only one letter
  appears for most numbers, so the full list of event IDs is longer than any one save shows (the
  `E2A_GuildAppealed` variable in the Act 1 blackboard still reads `UNPLAYED` in the finished game, which
  fits E2A being the branch not taken). Quest 4 has both
  `E4A` and `E4B`.
- `EC1_ORCS`, `EC2_CRIME`, `EC3_SCOOBY` and `EC4_MIRROR` are not tied to a mission number.
  `CITY_EVENT_0`, `1`, `2`, `4`, `5`, `6` and `7` were seen (Act 1 city events); `A2_S01_CITADEL` to `A2_S06_MONSTERS_BALL` are Act 2 ones.
- `E2B` and `E3B` were pending immediately after Quest 3 was finished (`before.sav`). `E4A` and `E4B`
  were not pending right after Quest 4 was lost (`after.sav`), although both were done in the finished
  game, where Quest 4 was won. **Unsure** whether that is the win or a later trigger.
- Event choices are kept in the Act 1 and Act 2 blackboards (`SidedWithZachareth?`, `Harsh to Herbie?`,
  `Q7_DragonSkull`, `SE14 Chosen Side?`, `SE17 Choice` ...). Replaying an event would write them again.
  Nothing here says what happens if a finished event is run a second time.
- Travel events (`AvailableTravelEvents`, `TRAVEL_EVENT_A2_<n>`, `TEST_TRAVEL_EVENT<n>`,
  `VIRTUE_TRAVEL_EVENT_<HERO>_<n>`) are a separate system: random events with a `Delay` that is
  re-rolled after each mission. `Hero Events Group 1` and `2` in the Act 2 map blackboard are empty.
- The Act 1 `WorldMapDT` blackboard has flags such as `Orc and Chance Events Revealed`,
  `Spreading Mists Revealed`, `S1 Event Revealed` and `City5 Revealed`, all unset in the saves seen.
  **Unsure** whether they gate event markers on the map.

What putting an event back takes, from this: remove it from its completed list and from the log, and add it
to `ActiveDestinationIds` (narrative) or `ActiveCityEvents` with a position (city). That is the reverse of two
snapshots, not a before/after pair of an event being played. The Events section on the Missions tab does it
for narrative events and, for city events, can only mark one done or take it off the town (the position is not
known once it is done). It is experimental and has not been tried in the game.

### What the Events section writes (experimental)

Narrative events (the 16 Act 1 ones and, with Act 2 missions listed, the 19 Act 2 ones seen in the finished game,
plus any others the save holds):

- Marked done: added to `CompletedNarrativeEventIds`, removed from `ActiveDestinationIds`, and a type 1 log
  entry with today's date is added.
- Marked pending: removed from the completed list and the log, added to `ActiveDestinationIds`.
- Un-doing a finished event and putting it back round-tripped on the finished save to the same completed set,
  nothing pending and the same log entries (order differs: the event moves to the end).

City events (only the ones the save holds):

- Marked done: added to `CompletedCityEventIds`, removed from `ActiveCityEvents`, and a type 2 log entry added.
- Unticking a pending one takes it off the town. A done one can't be made pending: its position is unknown.

Nothing else changes: the rest of the finished save was identical after the change. Story choices written by
events, the Act blackboards and the progression number are not touched.

### New Game+ (experimental)

Tested once in the game by the person who asked for it: it worked, including the virtue reset. The way to use it:
start a new game with the heroes and difficulty wanted, save as soon as the game allows and exit, build the
New Game+ save from that file, and replace the new campaign's save with it.

Starts the story again from Quest 1 and keeps what was earned. It does not reset a save in place. The story
state is too much to write from scratch (it differs between Act 1 and Act 2, and between campaigns; an Act 2
save doesn't even hold the Act 1 map entity, `WorldMapDT`, and has `@Act_1_BB_Simplified` instead of
`@Act_1_BB`), and no save of the very first moment of a campaign was available. So the editor takes the
save of a brand-new campaign made by the game and moves the earned things into it. The save that is open
is not changed. It is the mirror of "Reset to default" (which keeps the story and resets the gear).

Moved from the open save into the new campaign's save:

- `GameState`: `Gold`, `CraftingMaterials`, `ItemInventory`, `DiscoveredRecipes`, `SharedWeaponIds`,
  `UnlockedSkills`, `RealCompletedFeats`, `CompletedFeats`, `PendingNewFeatIds`, `PendingNewFeatHashIds`,
  `FeatProgresses` and `DiscoveredEnemyVulnerabilities`.
- Each hero, in both copies of `AllPlayers`: `EquippedWeaponIndex`, `EquippedTrinketId`, `EquippedWeapons` and
  `DefaultWeaponsBuild` (a tick box keeps them or leaves the new campaign's starting gear), and
  `VirtueOneValue` / `VirtueTwoValue` unless the one tick box resets the virtues of all heroes to the new campaign's values.
- Anything now owned or known comes off the shop's shelves (`ShopData` quantity 0), as "I want it all" does.

Everything else is the new campaign's: missions and their lists, the log, events, the blackboards (quest
results, story choices, `CampaignProgression`), the map, the shop pools, `UnlockedLegends` and
`UnlockedCompanions` (they come from the Act 2 story), `PartyXP`, `FeatRerollsRemaining`, difficulty, party
name, slot GUID and game version. The output is named one second after the new campaign's file.

If the new campaign doesn't own `PRODUCT_ACT_2`, Act 2 items, recipes, skills, feats, shared weapons and enemies
are left out, and a hero whose gear uses Act 2 parts keeps the new campaign's starting gear instead.

Seen in every save here: all six heroes have `Index` -1 on the map, so who is playing is not stored at the map.
The heroes and difficulty are set by starting the new campaign with the ones wanted, and the editor keeps the
new campaign's `Index` and `HealthState` for each hero.

What this means for a mission picker: the position on the map is several things that have to agree
(the completed list, the log, the quest results and choices in the blackboards, and the counters).
Which missions the map offers next comes from the game's own data, which is not in the save.
A custom DescentForge campaign will use its own destination IDs, not `STORY_QUEST_n`; the tab lists what the save has as "Other mission".

## Things that are still open

- What bit 0 of an enemy's flags means.
- How the shop chooses from `AvailableItemIds` and `AvailableRecipeIds`, and what unlocks the Plus
  recipes over a campaign (one save's pool holds about 70 recipes a new campaign's doesn't, mostly
  Plus recipes; the finished game's has 5).
- What `ShopExtraSlots` does.
- Whether the game copes with a shop holding a few hundred entries (the editor can do that).
- What picks the next mission on the map, and which of the fields under "Where the current mission lives" the game reads for it.
- What `Number of A2 Quests Played` and `Quest Count` (both 10 with 11 Act 2 missions done) are for, and the word for "not played" in the Act 2 blackboard.
- What happens in the game when a finished mission or event is put back and played again.
- What the very first save of a new campaign looks like (inside Quest 1, or on the map with Quest 1 open), and whether the game accepts a New Game+ save built from it.
- Why `E4A` and `E4B` weren't pending right after Quest 4 in `after.sav`, and what the Act 1 map's `... Revealed` flags do.
