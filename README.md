# Descent: Legends of the Dark save editor (DescentForge fork)

A browser tool for editing save files from the *Descent: Legends of the Dark* app. This is a fork of
[Dano1307's Descent-LoD-Save-editor](https://github.com/Dano1307/Descent-LoD-Save-editor), extended to
work with campaigns made in DescentForge and to cover much more of the save file.

Everything runs in your browser. Your save file is read locally and never uploaded.

> **Unofficial.** Not affiliated with Fantasy Flight Games or Asmodee. Editing save files can cause
> unexpected behaviour in the app, so **back up your saves first** and try edits on a copy.

> ## WARNING: the Missions tab can cause unknown progression issues
>
> Changing missions can cause progression problems nobody has mapped yet: the game may unlock the wrong
> things, skip or repeat story, or stop a campaign from moving on. **The Missions tab is meant for
> replaying missions after an act is complete** (un-do a finished mission and open it on the map to play it
> again). It is not a way to skip ahead and has not been tested for that. Act 1 has had only light testing in
> the game and Act 2 none. Back up your save and try it on a copy.

## What's different from the original

- **Open a save with one click or a drop.** One big box, no separate Load button.
- **DescentForge campaigns.** Items, skills, feats and materials that a campaign adds show up
  instead of being dropped, and names come from DescentForge's catalog.
- **Recipes that follow the game.** Each craftable item has a Recipe, a Base, a Plus recipe and an
  Upgraded box, and ticking them does what the game does (recipe learned, item made and fitted on
  the hero, upgrade replaces the base). Checked against real before and after saves.
- **Hero weapons laid out like the game.** Each hero's two weapons, with part A, then parts B and C.
- **Shop tabs.** Materials with quantities, what is for sale now, and every item and recipe you can
  still add, grouped like the hero pages, with pictures when you have the `img` folder.
- **Enemy weaknesses.** All 128 enemies in one list with a search box. Revealed weaknesses and resistances show as solid tags and hidden ones as dashed tags. Tick an enemy to reveal everything about it, or use Reveal all.
- **Act 1 and Act 2.** Act 2 content is hidden by default on an Act 1 campaign, locked when the save
  doesn't own Act 2, and left out of the "add all" buttons. A checkbox hides or shows it; it only
  appears for Act 1 campaigns, and an Act 2 save never hides anything.
- **Missions and events (experimental).** Mark missions done, pick the ones the map offers, and the editor
  updates the finished and open lists, the campaign log, mission results and the campaign progression number
  (18 plus 2 per mission done). Works on Act 1 and Act 2 campaigns, with Act 2 less certain (it comes from
  one finished save). A section below the missions does the same for narrative and city events. **See the
  warning above.**
- **New Game+ (experimental).** Starts the story again from Quest 1 and keeps your items, recipes, weapons
  and upgrades, materials, gold, skills, feats, enemy weaknesses and each hero's equipped weapons and trinket.
  Start a new game in the game with the heroes you want and the difficulty you want, save as soon as you
  can and exit, then choose that save in the editor: it moves everything over into it, and you replace the
  new campaign's save with the result. One tick box resets the virtues (VirtueOneValue and VirtueTwoValue)
  of all heroes. The save you have open is not changed. Lightly tested in the game: it worked.
- **Bulk buttons.** "I want it all", all skills, all feats, reveal enemies, reset to default,
  and a clean-up for duplicates. Each table has add all and clear all buttons.
- **More languages.** English, Italiano (tab names and pictures only), Español and Français.

## Using it

### Online

Open the GitHub Pages site for this repository (set it up under Settings, Pages). The original
project is also hosted at https://dano1307.github.io/Descent-LoD-Save-editor/.

### On your computer

```bash
git clone <this repository>
```

Open `index.html` in a browser. There's nothing to install or build.

### Steps

1. Pick your language in the box at the top right.
2. Click the big box (or drop a `.sav` file on the page). Saves on Windows with Steam are in
   `C:\Program Files (x86)\Steam\steamapps\common\Legends of the Dark\Legends of the Dark_Data\SavedGames`,
   in folders `1`, `2`, `3` and so on.
3. Use the tabs to change things. Tick a box to add something, untick to remove it.
4. Click the green **Get the new save file** button. It names the file one second newer than the one
   you loaded, so the game loads it as your latest save.
5. Copy it into the same `SavedGames` folder as the original.

More detail is on the [How to use](html/instructions.html) page. What is known about the save format
is in [docs/SAVE_FILE_NOTES.md](docs/SAVE_FILE_NOTES.md).

## Project layout

| File | What it is |
|---|---|
| `index.html`, `css/` | The page and its styles |
| `script/consts.js`, `main.js`, `GUI_Builder.js`, `dataManager.js` | The original editor's code (changed in places) |
| `script/descentforge.js` | The fork's logic: items, recipes, shop, enemies, Act rules, clean-up |
| `script/names.js` | Item names and the list of game recipes, from DescentForge's catalog |
| `script/enemies.js` | The enemy list with weaknesses and resistances, from DescentForge's catalog |
| `script/defaults.js` | A new campaign's starting state, for "Reset to default" |
| `script/i18n.js` | Spanish and French translations |
| `docs/SAVE_FILE_NOTES.md` | Notes on the save file format |

Pictures are not in this copy of the code. Put them in an `img/` folder as `.jpg` files:
`img/<TYPE>/<ID>.jpg` (for example `img/ARMOR/ARMOR_1.jpg`), and `img/SKILL/<language>/<ID>.jpg` and
`img/FEAT/<language>/<ID>.jpg` for skills and feats (`eng` or `ita`; Spanish and French use `eng`). The
extension is one setting, `IMAGE_EXTENSION` in `script/consts.js`. The editor works without pictures
and shows names instead.

## Known limits

- Edits have been checked against real save files, not in the game itself, apart from the recipe
  buying and crafting that was compared with the game's own before and after saves.
- What the first part of an enemy's flags means (bit 0), how the shop chooses from its pools, and what
  the extra shop slots setting does are not understood. See the notes.
- Putting a few hundred items in the shop at once hasn't been tried in the game.
- The Spanish and French translations were not reviewed by native speakers, and French keeps the
  English item and enemy names because the catalog has none. Corrections are welcome.
- Some code comments are in Italian, from the original.

## Credits and licence

See [CREDITS.md](CREDITS.md).

The original repository has no licence file in the copy this fork started from. GitHub's terms allow
viewing and forking a public repository, but nothing more is granted, so ask the original author
before reusing the code elsewhere. If the original adds a licence, copy it here.
