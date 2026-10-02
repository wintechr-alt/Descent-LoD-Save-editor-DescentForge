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

## Things that are still open

- What bit 0 of an enemy's flags means.
- How the shop chooses from `AvailableItemIds` and `AvailableRecipeIds`, and what unlocks the Plus
  recipes over a campaign (one save's pool holds about 70 recipes a new campaign's doesn't, mostly
  Plus recipes; the finished game's has 5).
- What `ShopExtraSlots` does.
- Whether the game copes with a shop holding a few hundred entries (the editor can do that).
