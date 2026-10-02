/*
    DescentForge additions
    ----------------------
    - Safe load/save: keeps huge integers (timestamps) exact and writes the file
      back with the same 4-space indentation the game uses.
    - Custom content: every table also lists IDs found in the save itself, so
      items, skills and feats added by a DescentForge campaign show up.
    - Shop & recipes tab: edit ShopData, ShopExtraSlots and DiscoveredRecipes.
    - Other items: anything in the save that doesn't fit an existing category.
    - Works without the img/ folder: missing pictures fall back to the item ID.
*/

const OTHER_TYPE = "OTHER";
var originalFileName = "";

/*____________________________ LOAD / SAVE ____________________________*/

// JavaScript numbers lose precision above 2^53, which mangles the game's
// timestamps (e.g. 639259630063235962). Wrap them in strings while editing.
const BIGINT_MARK = "__BIGINT__";

function parseSaveText(text) {
    text = text.replace(/^\uFEFF/, "");
    const protectedText = text.replace(
        /((?<!\\)"\s*:\s*)(-?\d{16,})(?=\s*[,}\]])/g,
        '$1"' + BIGINT_MARK + '$2"'
    );
    return JSON.parse(protectedText);
}

function serializeSave(save) {
    const json = JSON.stringify(save, null, 4);
    return json.replace(new RegExp('"' + BIGINT_MARK + '(-?\\d+)"', "g"), "$1");
}

// "2026-09-25_19-56-46.sav" -> "2026-09-25_19-56-47.sav", so the edited file
// is the newest save in the folder. Other names get "_edited" appended.
function nextSaveFileName(name) {
    const m = /^(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})\.sav$/.exec(name || "");
    if (!m) {
        return name ? name.replace(/\.sav$/i, "") + "_edited.sav" : "updatedSave.sav";
    }
    const d = new Date(Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5], +m[6] + 1));
    const p = n => String(n).padStart(2, "0");
    return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}_` +
           `${p(d.getUTCHours())}-${p(d.getUTCMinutes())}-${p(d.getUTCSeconds())}.sav`;
}

/*____________________________ ID DISCOVERY ____________________________*/

function gameState() {
    return completeSave.GameSceneData.GameState;
}

// Strip upgrade suffixes so "ARMOR_3_PLUS" is shown on the "ARMOR_3" row
function baseItemId(id) {
    return id.replace(/_(UPGRADED|PLUS)$/, "");
}

// Every item ID the save mentions anywhere (inventory, shop, pools, recipes)
function collectSaveItemIds() {
    const gs = gameState();
    const ids = new Set();
    (gs.ItemInventory || []).forEach(i => ids.add(baseItemId(i.Id)));
    (gs.AvailableItemIds || []).forEach(id => ids.add(baseItemId(id)));
    (gs.ShopData || []).forEach(s => { if (!s.id.startsWith("RECIPE_")) ids.add(baseItemId(s.id)); });
    (gs.DiscoveredRecipes || []).forEach(r => ids.add(baseItemId(recipeItemId(r.Id))));
    (gs.AvailableRecipeIds || []).forEach(id => ids.add(baseItemId(recipeItemId(id))));
    return [...ids];
}

// Known list first (keeps the original order), then anything new from the save
function mergeIds(knownIds, extraIds) {
    const result = [...knownIds];
    extraIds.forEach(id => { if (!result.includes(id)) result.push(id); });
    return result;
}

// True if `id` is a weapon part for one of this hero's weapons.
// Exact match on the weapon name, so "HAMMER" doesn't also catch "WARHAMMER".
function isHeroWeapon(heroData, id) {
    const m = /^WEAPON_PART_[ABC]_(.+)$/.exec(id);
    if (!m) return false;
    return heroData.itemNames.weaponNames.some(n => m[1].startsWith(n.replace(/^_/, "") + "_"));
}

function isAnyHeroWeapon(id) {
    return HERO_IDS.some(h => isHeroWeapon(allHeroesData[h], id));
}

function isOtherItem(id) {
    return !id.startsWith("ARMOR") && !id.includes("TRINKET") && !id.startsWith("CSM_") &&
           !id.startsWith("MAT_") && !id.startsWith("WEAPON_PART_");
}

/*____________________________ OTHER ITEMS ____________________________*/

function buildOtherItemsGUI() {
    const table = document.getElementById("otherItems");
    const ids = collectSaveItemIds().filter(isOtherItem).sort();
    const owned = gameState().ItemInventory.map(i => i.Id);
    const container = document.getElementById("otherItemsContainer");
    container.style.display = ids.length ? "" : "none";
    buildUnlockableGUI(OTHER_TYPE, table, owned, ids, false);
}

/*____________________________ SHOP ____________________________*/

function getBlackboard() {
    const entities = completeSave.GameSceneData.SceneEntities || [];
    return entities.find(e => e.Name === "@Global_BB");
}

// Returns the current ShopExtraSlots value, or null if the save has no such setting
function getShopExtraSlots() {
    const bb = getBlackboard();
    if (!bb || !bb.SerializedBlackboard.includes('"ShopExtraSlots":{')) return null;
    const m = /"ShopExtraSlots":\{"_value":(-?\d+),/.exec(bb.SerializedBlackboard);
    return m ? parseInt(m[1]) : 0;
}

// Edits the text directly instead of re-serialising the blackboard, so the
// rest of it (e.g. 1.0 floats) stays exactly as the game wrote it
function setShopExtraSlots(value) {
    const bb = getBlackboard();
    const n = Math.max(0, parseInt(value) || 0);
    const text = bb.SerializedBlackboard;
    if (/"ShopExtraSlots":\{"_value":-?\d+,/.test(text)) {
        bb.SerializedBlackboard = text.replace(/("ShopExtraSlots":\{"_value":)-?\d+,/, "$1" + n + ",");
    } else {
        bb.SerializedBlackboard = text.replace('"ShopExtraSlots":{', '"ShopExtraSlots":{"_value":' + n + ",");
    }
}

function buildShopGUI() {
    const gs = gameState();
    if (!gs.ShopData) gs.ShopData = [];

    // Extra slots
    const slotsInput = document.getElementById("shopExtraSlots");
    const slotsNote = document.getElementById("shopExtraSlotsNote");
    const slots = getShopExtraSlots();
    if (slots === null) {
        slotsInput.disabled = true;
        slotsInput.value = "";
        slotsNote.textContent = "This save doesn't have an extra-slots setting.";
    } else {
        slotsInput.disabled = false;
        slotsInput.value = slots;
        slotsNote.textContent = "Extra items the shop rolls each time it restocks.";
        slotsInput.onchange = () => { setShopExtraSlots(slotsInput.value); slotsInput.value = getShopExtraSlots(); };
    }

    buildShopMaterials();
    buildShopItems();
    buildShopNow();
    refreshShopCounts();
}

/*____________________________ SHOP: MATERIALS ____________________________*/

function shopEntry(id) {
    return gameState().ShopData.find(s => s.id === id);
}

// Every material the game has, plus any in the shop that the list doesn't know
function shopMaterialIds() {
    const inShop = gameState().ShopData.map(s => s.id).filter(id => id.startsWith("MAT_"));
    return mergeIds(allCraftingMaterials, inShop);
}

// Quantity 0 keeps the entry, as the game does for anything sold out
function setShopMaterial(id, quantity) {
    const qty = Math.max(0, Math.min(9999, parseInt(quantity) || 0));
    const entry = shopEntry(id);
    if (entry) entry.qty = qty;
    else if (qty > 0) gameState().ShopData.push({ id: id, qty: qty });
    return qty;
}

function buildShopMaterials() {
    const table = document.getElementById("shopStock");
    buildTable(table, shopMaterialIds(), id => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.appendChild(getItemImage(id, CRAFTING_MATERIAL_TYPE));
        tr.appendChild(tdName);

        const entry = shopEntry(id);
        const tdQty = document.createElement("td");
        tdQty.classList.add("quantity-input-container");
        const qty = document.createElement("input");
        qty.type = "number";
        qty.min = 0;
        qty.max = 9999;
        qty.value = entry ? entry.qty : 0;
        qty.classList.add("quantity-input");
        qty.setAttribute("aria-label", "Quantity of " + id + " for sale");
        qty.onchange = () => { qty.value = setShopMaterial(id, qty.value); refreshShopCounts(); };
        tdQty.appendChild(qty);
        tr.appendChild(tdQty);
        return tr;
    });
}

function bulkShopMaterials(value) {
    if (!completeSave) return "Load a save file first.";
    const n = Math.max(0, Math.min(9999, parseInt(value) || 0));
    shopMaterialIds().forEach(id => setShopMaterial(id, n));
    buildShopMaterials();
    refreshShopCounts();
    return n ? "Every material is now " + n + " for sale." : "No materials for sale.";
}

/*____________________________ SHOP: ITEMS AND RECIPES ____________________________*/

// "Owned" / "Known" when buying it would make a duplicate, otherwise ""
function shopRowStatus(id) {
    const gs = gameState();
    const clean = id.trim();
    if (clean.startsWith("RECIPE_")) {
        return (gs.DiscoveredRecipes || []).some(r => r.Id.trim() === clean) ? "Known" : "";
    }
    return ownsItem(id) || ownsItem(id + "_PLUS") || ownsItem(id + "_UPGRADED") ? "Owned" : "";
}

function naturalSort(ids) {
    // Items first, then recipes; numbers in order (ARMOR_2 before ARMOR_12)
    const isRecipe = id => id.trim().startsWith("RECIPE_");
    return ids.slice().sort((a, b) =>
        (isRecipe(a) - isRecipe(b)) || a.localeCompare(b, undefined, { numeric: true }));
}

// What the game's own pools offer, plus anything already for sale
function shopAvailableIds() {
    const gs = gameState();
    const inShop = gs.ShopData.map(s => s.id).filter(id => !id.startsWith("MAT_"));
    return naturalSort(mergeIds(mergeIds(gs.AvailableItemIds || [], gs.AvailableRecipeIds || []), inShop));
}

// The picture for an item, or for what a recipe makes (shown only if the img folder has it)
function shopPicture(id) {
    const item = recipeItemId(id.trim());
    let type = null;
    if (item.startsWith("ARMOR")) type = ARMOR_TYPE;
    else if (item.includes("TRINKET")) type = TRINKET_TYPE;
    else if (item.startsWith("CSM_")) type = CSM_TYPE;
    else if (item.startsWith("WEAPON_PART_")) type = WEAPON_TYPE;
    return type ? "img/" + type + "/" + item + "." + IMAGE_EXTENSION : null;
}

function shopItemRow(id) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.appendChild(itemLabel(id, shopPicture(id), "item-image"));
    tr.appendChild(tdName);

    // Only rows you can still add are listed, plus anything already for sale
    // (so you can take it off). A row that's owned or known but still for sale says so.
    const status = shopRowStatus(id);
    if (status) {
        const note = document.createElement("span");
        note.className = "enemy-flags";
        note.textContent = status === "Owned" ? "You already own this" : "You already know this recipe";
        tdName.querySelector(".item-label-text").appendChild(note);
    }

    const entry = shopEntry(id);
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.dataset.shopId = id;
    cb.dataset.locked = status ? "1" : "";
    cb.checked = !!entry && entry.qty > 0;
    cb.disabled = !!status && !cb.checked;
    cb.setAttribute("aria-label", id.trim() + " for sale");
    cb.onchange = () => {
        const gs = gameState();
        const current = shopEntry(id);
        if (cb.checked) {
            if (current) current.qty = 1;
            else gs.ShopData.push({ id: id, qty: 1 });
        } else if (current) {
            gs.ShopData.splice(gs.ShopData.indexOf(current), 1);
        }
        refreshShopCounts();
        refreshShopNow();
    };
    const tdSale = document.createElement("td");
    tdSale.classList.add("checkbox-container");
    tdSale.appendChild(cb);
    tr.appendChild(tdSale);
    return tr;
}

/*____________________________ SHOP: CATEGORIES ____________________________*/

// One table per card. Hero weapons get a card each, grouped by hero, like the hero pages.
let shopCardCache = null;
function shopCardDefs() {
    if (shopCardCache) return shopCardCache;
    const defs = [{ key: "ARMOR", title: "Armor" }, { key: "TRINKETS", title: "Trinkets" }];
    HERO_IDS.forEach(heroId => {
        weaponTypeNames(heroId).forEach(type => {
            defs.push({ key: "W_" + type, title: WEAPON_TYPE_NAMES[type] || type, hero: heroId, type: type, sections: true });
        });
    });
    defs.push({ key: "SHARED", title: "Shared weapons" });
    defs.push({ key: "CONSUMABLES", title: "Consumables" });
    defs.push({ key: "OTHER", title: "Other" });
    shopCardCache = defs;
    return defs;
}

// {slot, type} for a weapon part or its recipe, or null
function shopPartInfo(id) {
    const item = recipeItemId(id.trim());
    const m = /^WEAPON_PART_([ABC])_(.+?)(?:_(\d+|ANCESTRAL))?(?:_UPGRADED)?$/.exec(item);
    return m ? { slot: m[1], type: m[2] } : null;
}

function shopCategory(id) {
    const item = recipeItemId(id.trim());
    if (item.startsWith("ARMOR")) return "ARMOR";
    if (item.includes("TRINKET")) return "TRINKETS";
    if (item.startsWith("CSM_")) return "CONSUMABLES";
    const part = shopPartInfo(id);
    if (part) {
        const heroTypes = HERO_IDS.flatMap(h => weaponTypeNames(h));
        return heroTypes.includes(part.type) ? "W_" + part.type : "SHARED";
    }
    return "OTHER";
}

// Made once, so the cards keep their place while you tick things
function ensureShopCategories() {
    const box = document.getElementById("shopCategories");
    if (box.dataset.ready) return;
    const heroRows = {};
    shopCardDefs().forEach(def => {
        const wrap = document.createElement("div");
        wrap.className = "table-container";
        wrap.id = "shopCat_" + def.key;
        wrap.hidden = true;
        const title = document.createElement("h1");
        title.textContent = def.title;
        wrap.appendChild(title);
        const count = document.createElement("p");
        count.className = "section-note";
        count.id = "shopCatSummary_" + def.key;
        wrap.appendChild(count);
        const table = document.createElement("table");
        table.id = "shopCatTable_" + def.key;
        const head = document.createElement("tr");
        ["ITEM OR RECIPE", "FOR SALE"].forEach(text => {
            const th = document.createElement("th");
            th.textContent = text;
            head.appendChild(th);
        });
        table.appendChild(head);
        wrap.appendChild(table);

        let parent = box;
        if (def.hero) {
            if (!heroRows[def.hero]) {
                const group = document.createElement("div");
                group.className = "shop-hero-group";
                group.id = "shopHero_" + def.hero;
                const name = document.createElement("h2");
                name.textContent = allHeroesData[def.hero].name[language] || allHeroesData[def.hero].name.eng;
                const row = document.createElement("div");
                row.className = "weapon-cards";
                group.appendChild(name);
                group.appendChild(row);
                box.appendChild(group);
                heroRows[def.hero] = row;
            }
            parent = heroRows[def.hero];
        }
        parent.appendChild(wrap);
    });
    box.dataset.ready = "1";
}

// Everything the shop could list: what its own list offers, plus every other recipe in the game
function shopAllIds() {
    const available = shopAvailableIds();
    const have = new Set(available.map(id => id.trim()));
    const more = [...GAME_RECIPES].filter(id => !have.has(id)).map(gameRecipeId);
    return available.concat(more);
}

// Only what can still be added (or is already for sale); items you own and recipes you know are left out
function shopSectionRows(ids) {
    const rows = [];
    naturalSort(ids).forEach(id => {
        const entry = shopEntry(id);
        const forSale = !!entry && entry.qty > 0;
        if (shopRowStatus(id) && !forSale) return;
        rows.push({ id: id });
    });
    return rows;
}

function buildShopItems() {
    ensureShopCategories();
    const cards = {};
    shopCardDefs().forEach(def => { cards[def.key] = []; });
    shopAllIds().forEach(id => { (cards[shopCategory(id)] || cards.OTHER).push(id); });
    shopCardDefs().forEach(def => {
        const ids = cards[def.key];
        let rows = [];
        if (def.sections) {
            [["A", "Weapon (part A)"], ["B", "Part B"], ["C", "Part C"]].forEach(([slot, label]) => {
                const part = shopSectionRows(ids.filter(id => shopPartInfo(id).slot === slot));
                if (!part.length) return;
                rows.push({ heading: label });
                part.forEach(r => rows.push(r));
            });
        } else {
            rows = shopSectionRows(ids);
        }
        const listed = rows.filter(r => r.id).length;
        buildTable(document.getElementById("shopCatTable_" + def.key), rows, row =>
            row.heading ? buildPartDividerRow(row.heading, 2) : shopItemRow(row.id));
        document.getElementById("shopCatSummary_" + def.key).dataset.total = listed;
        document.getElementById("shopCat_" + def.key).hidden = listed === 0;
    });
    // A hero's group is hidden when neither weapon has anything listed
    document.querySelectorAll(".shop-hero-group").forEach(group => {
        group.hidden = [...group.querySelectorAll(".table-container")].every(c => c.hidden);
    });
    refreshShopCategorySummaries();
}

function refreshShopCategorySummaries() {
    const counts = {};
    gameState().ShopData.forEach(e => {
        if (e.id.startsWith("MAT_") || e.qty <= 0) return;
        const key = shopCategory(e.id);
        counts[key] = (counts[key] || 0) + 1;
    });
    shopCardDefs().forEach(def => {
        const summary = document.getElementById("shopCatSummary_" + def.key);
        if (!summary) return;
        summary.textContent = summary.dataset.total + " listed, " + (counts[def.key] || 0) + " for sale";
    });
}

function refreshShopCounts() {
    if (!completeSave) return;
    const shop = gameState().ShopData;
    const mats = shop.filter(e => e.id.startsWith("MAT_") && e.qty > 0).length;
    const items = shop.filter(e => !e.id.startsWith("MAT_") && e.qty > 0).length;
    const el1 = document.getElementById("shopMaterialCount");
    const el2 = document.getElementById("shopItemCount");
    if (el1) el1.textContent = mats + " materials for sale";
    const itemsText = items === 1 ? "1 item or recipe for sale" : items + " items and recipes for sale";
    if (el2) el2.textContent = itemsText;
    const el3 = document.getElementById("shopNowCount");
    if (el3) el3.textContent = itemsText;
    const empty = document.getElementById("shopNowEmpty");
    if (empty) empty.hidden = items > 0;
    refreshShopCategorySummaries();
}

/*____________________________ SHOP: WHAT'S FOR SALE NOW ____________________________
    Every item and recipe on the shelves, one of each (an entry's quantity is 1). Untick one to
    take it off. Adding more is done on the Shop items tab.
*/

// Items and recipes for sale, in the same order as the Shop items tab
function shopNowIds() {
    const order = shopCardDefs().map(d => d.key);
    const ids = gameState().ShopData.filter(e => !e.id.startsWith("MAT_") && e.qty > 0).map(e => e.id);
    return naturalSort(ids).sort((a, b) => order.indexOf(shopCategory(a)) - order.indexOf(shopCategory(b)));
}

function shopNowRow(id) {
    const tr = document.createElement("tr");
    const tdName = document.createElement("td");
    tdName.appendChild(itemLabel(id, shopPicture(id), "item-image"));
    tr.appendChild(tdName);

    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.dataset.shopId = id;
    cb.checked = true;
    cb.setAttribute("aria-label", id.trim() + " for sale");
    cb.onchange = () => {
        const gs = gameState();
        const current = shopEntry(id);
        if (current) gs.ShopData.splice(gs.ShopData.indexOf(current), 1);
        buildCompleteGUI();     // the Shop items tab shows it unticked now
    };
    const tdSale = document.createElement("td");
    tdSale.classList.add("checkbox-container");
    tdSale.appendChild(cb);
    tr.appendChild(tdSale);
    return tr;
}

function buildShopNow() {
    const table = document.getElementById("shopNow");
    if (!table || !completeSave) return;
    buildTable(table, shopNowIds(), shopNowRow);
    table.hidden = table.rows.length <= 1;
}

// After a change made on the Shop items tab (no full rebuild): redo the list and its Act 2 tags
function refreshShopNow() {
    buildShopNow();
    applyActRules();
}

function setShopItemMessage(text) {
    const el = document.getElementById("shopItemMessage");
    if (el) el.textContent = text;
}

// Put every item and recipe the game offers on sale, skipping what you own or know
function stockEverything() {
    if (!completeSave) { setShopItemMessage("Load a save file first."); return; }
    const gs = gameState();
    let added = 0, skipped = 0;
    // Every row in the lists below that you don't own or know; Act 2 ones only when the campaign allows them
    shopAllIds().forEach(id => {
        if (shopRowStatus(id)) return;
        if (!act2Allowed() && isAct2Item(id)) { skipped++; return; }
        const entry = shopEntry(id);
        if (!entry) { gs.ShopData.push({ id: id, qty: 1 }); added++; }
        else if (entry.qty < 1) { entry.qty = 1; added++; }
    });
    buildCompleteGUI();
    let text = added ? "Put " + added + " items and recipes on sale." : "Everything you can add is already for sale.";
    if (skipped) text += act2Hidden ? " Skipped " + skipped + " hidden Act 2 items."
                                    : " Skipped " + skipped + " Act 2 items this campaign doesn't allow.";
    setShopItemMessage(text);
}

// Take every item and recipe off the shelves (materials stay)
function clearShopItems() {
    if (!completeSave) { setShopItemMessage("Load a save file first."); return; }
    const gs = gameState();
    const before = gs.ShopData.length;
    gs.ShopData = gs.ShopData.filter(e => e.id.startsWith("MAT_"));
    buildCompleteGUI();
    setShopItemMessage("Removed " + (before - gs.ShopData.length) + " items and recipes.");
}


/*____________________________ BUY / CRAFT (mirrors the game) ____________________________
    Observed in a DescentForge save when buying a recipe and crafting a weapon part:
    - Buying a recipe:  added to DiscoveredRecipes as {Id, Crafted:false},
                        removed from AvailableRecipeIds, shop entry qty set to 0.
    - Crafting it:      recipe entry Crafted:true, part added to ItemInventory as
                        {Id, SoldOut:false}, and equipped on the matching weapon
                        when it's better than the part already fitted.
    Both copies of the party (AllPlayers and GameState.AllPlayers) are updated.
*/

// The item a recipe makes (handles the game's odd spellings, see names.js)
function recipeItemId(recipeId) {
    const clean = recipeId.trim();
    const exception = Object.keys(RECIPE_ID_EXCEPTIONS).find(item => RECIPE_ID_EXCEPTIONS[item] === clean);
    return exception || clean.replace(/^RECIPE_/, "");
}

// The recipe that makes an item
function recipeFor(itemId) {
    return RECIPE_ID_EXCEPTIONS[itemId] || "RECIPE_" + itemId;
}

// The game spells a few recipe IDs with a trailing space. Use its spelling so it recognises them.
function gameRecipeId(recipeId) {
    const clean = recipeId.trim();
    return GAME_RECIPES_WITH_SPACE.includes(clean) ? clean + " " : clean;
}

// True if the game crafts this item from a recipe. Uses the DescentForge catalog,
// plus anything the save itself lists as a recipe (custom campaigns).
function hasRecipe(itemId) {
    const r = recipeFor(itemId);
    if (GAME_RECIPES.has(r)) return true;
    const gs = gameState();
    return (gs.AvailableRecipeIds || []).some(x => x.trim() === r) ||
           (gs.DiscoveredRecipes || []).some(x => x.Id.trim() === r && !isStructurallyBought(r));
}

function allPartyCopies() {
    const copies = [];
    if (Array.isArray(completeSave.AllPlayers)) copies.push(completeSave.AllPlayers);
    if (Array.isArray(gameState().AllPlayers)) copies.push(gameState().AllPlayers);
    return copies;
}

function isEquipped(itemId) {
    return allPartyCopies().some(players => players.some(p =>
        p.EquippedTrinketId === itemId ||
        (p.EquippedWeapons || []).some(w => w.PartAId === itemId || w.PartBId === itemId || w.PartCId === itemId)
    ));
}

// "WEAPON_PART_B_WARHAMMER_1" -> {slot:"B", type:"WARHAMMER", level:1}
function parsePart(id) {
    const m = /^WEAPON_PART_([ABC])_(.+?)_(\d+|ANCESTRAL)$/.exec(id || "");
    if (!m) return null;
    return { slot: m[1], type: m[2], level: m[3] === "ANCESTRAL" ? 99 : parseInt(m[3]) };
}

// Fit a crafted B/C part on every weapon of the same type whose current part is lower level.
// Returns the heroes it was fitted to.
function equipIfUpgrade(itemId) {
    const part = parsePart(itemId);
    if (!part || part.slot === "A") return [];
    const key = "Part" + part.slot + "Id";
    const heroes = new Set();
    allPartyCopies().forEach(players => players.forEach(p => {
        (p.EquippedWeapons || []).forEach(w => {
            const a = parsePart(w.PartAId);
            const current = parsePart(w[key]);
            // Leave unrecognised parts (e.g. an _UPGRADED one) alone
            const better = current ? current.level < part.level : !w[key];
            if (a && a.type === part.type && better) {
                w[key] = itemId;
                heroes.add(p.HeroId);
            }
        });
    }));
    return [...heroes];
}

function markRecipeBought(recipeId) {
    recipeId = gameRecipeId(recipeId);
    const gs = gameState();
    if (!gs.DiscoveredRecipes) gs.DiscoveredRecipes = [];
    if (!gs.DiscoveredRecipes.some(r => r.Id === recipeId)) {
        gs.DiscoveredRecipes.push({ Id: recipeId, Crafted: false });
    }
    removeFromArray(gs.AvailableRecipeIds || [], recipeId);
    const shopEntry = (gs.ShopData || []).find(s => s.id === recipeId);
    if (shopEntry) shopEntry.qty = 0;
}

// Real recipes: part B/C weapon parts, consumables, and every upgrade
// (_PLUS / _UPGRADED). Base armor, trinkets and part A weapons are bought, not
// crafted, so a recipe for one of those (which the original editor wrote) isn't real.
function isStructurallyBought(recipeId) {
    const item = recipeId.trim().replace(/^RECIPE_/, "");
    if (/_(PLUS|UPGRADED)$/.test(item)) return false;
    return item.startsWith("ARMOR") || item.includes("TRINKET") || /^WEAPON_PART_A_/.test(item);
}

function isEditorOnlyRecipe(recipeId) {
    // Base armor, trinkets and part A weapons (shared weapons too) have no recipe: a save that has one got it from the original editor
    return isStructurallyBought(recipeId) && !GAME_RECIPES.has(recipeId.trim());
}

// A recipe the game knows about: in the pool or shop, or a normal recipe ID

function markRecipeNotBought(recipeId) {
    recipeId = gameRecipeId(recipeId);
    const gs = gameState();
    removeFromObjectArray(gs.DiscoveredRecipes, recipeId);
    if (!gs.AvailableRecipeIds) gs.AvailableRecipeIds = [];
    // Only real recipes go back in the shop pool
    if (!isEditorOnlyRecipe(recipeId)) addToArray(gs.AvailableRecipeIds, recipeId);
}

// Returns a short message describing what happened
function markCrafted(recipeId) {
    recipeId = gameRecipeId(recipeId);
    markRecipeBought(recipeId);
    const gs = gameState();
    gs.DiscoveredRecipes.find(r => r.Id === recipeId).Crafted = true;
    const itemId = recipeItemId(recipeId);
    const existing = gs.ItemInventory.find(i => i.Id === itemId);
    if (existing) existing.SoldOut = false;
    else gs.ItemInventory.push({ Id: itemId, SoldOut: false });
    const heroes = equipIfUpgrade(itemId);
    markCraftingVisited();
    return heroes.length
        ? "Crafted " + itemId + " and fitted it for " + heroes.map(h => h.replace("HERO_", "")).join(", ") + "."
        : "Crafted " + itemId + ".";
}

// The game sets this tutorial flag the first time you use the crafting screen
function markCraftingVisited() {
    const tut = (completeSave.GameSceneData.SceneEntities || []).find(e => e.Name === "TutorialDT");
    if (!tut || !tut.SerializedDTC) return;
    const text = tut.SerializedDTC;
    if (/"IsCraftingVisited":\{"_value":/.test(text)) {
        tut.SerializedDTC = text.replace(/("IsCraftingVisited":\{"_value":)(true|false)/, "$1true");
    } else {
        tut.SerializedDTC = text.replace('"IsCraftingVisited":{', '"IsCraftingVisited":{"_value":true,');
    }
}

/*____________________________ ADD ALL / CLEAR ALL ____________________________*/

var bulkRunning = false;

function bulkMessage(bar, text) {
    bar.querySelector(".bulk-status").textContent = text;
}

// Tick or untick every checkbox in one column of an item table, using the same
// logic as clicking each one. Column 1 = base, 2 = upgraded, "all" = both.
// The checkbox in a row for one column: "base" (1), "upgraded" (2), "recipe" (base recipe) or "plusrecipe".
// Skill, feat and other simple tables have one untagged checkbox, which is the base one.
const COLUMN_NAMES = { 1: "base", 2: "upgraded", 3: "recipe", 4: "plusrecipe" };
function rowCheckbox(tr, column) {
    const name = COLUMN_NAMES[column] || column;
    const tagged = tr.querySelector('input[type=checkbox][data-col="' + name + '"]');
    if (tagged) return tagged;
    return name === "base" ? tr.querySelector("input[type=checkbox]:not([data-col])") : null;
}

function bulkToggle(tableId, checked, column) {
    if (!completeSave) return "Load a save file first.";
    const table = document.getElementById(tableId);
    const boxes = [];
    [...table.querySelectorAll("tr")].slice(1).forEach(tr => {
        // Clearing goes upgraded, then base, then recipe, so nothing is left half done
        const cols = column === "all" ? ["upgraded", "plusrecipe", "base", "recipe"] : [column];
        cols.forEach(c => {
            const cb = rowCheckbox(tr, c);
            if (cb) boxes.push(cb);
        });
    });
    let changed = 0, skipped = 0;
    bulkRunning = true;
    try {
        boxes.forEach(cb => {
            if (cb.checked === checked) return;
            if (checked && cb.disabled) return;   // locked Act 2 item
            cb.checked = checked;
            cb.onchange({ target: cb });
            if (cb.checked === checked) changed++; else skipped++;
        });
    } finally {
        bulkRunning = false;
    }
    // Something you already owned may be missing its recipe: mark those crafted too
    if (checked && (column === 1 || column === 2)) syncOwnedRecipes();
    buildCompleteGUI();
    let text = (checked ? "Added " : "Removed ") + changed + ".";
    if (skipped) text += " Kept " + skipped + " that are equipped.";
    return text;
}


function bulkMaterials(value) {
    if (!completeSave) return "Load a save file first.";
    const n = Math.max(0, Math.min(9999, parseInt(value) || 0));
    const inputs = document.querySelectorAll("#craftingMaterials input[type=number]");
    inputs.forEach(input => updateMaterialQuantity(input.dataset.id, n));
    buildCompleteGUI();
    return "Set " + inputs.length + " materials to " + n + ".";
}


function makeBulkBar(tableId, buttons) {
    const table = document.getElementById(tableId);
    if (!table) return;
    const bar = document.createElement("div");
    bar.className = "bulk-bar";
    buttons.forEach(([label, run, confirmText]) => {
        if (label === "input") {
            bar.appendChild(run);
            return;
        }
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "blue-button";
        btn.textContent = label;
        btn.onclick = () => {
            if (confirmText && !confirm(confirmText)) return;
            bulkMessage(bar, run());
        };
        bar.appendChild(btn);
    });
    const status = document.createElement("span");
    status.className = "bulk-status";
    status.setAttribute("role", "status");
    bar.appendChild(status);
    table.parentNode.insertBefore(bar, table);
}

const FEAT_WARNING = "Marking a feat as completed while it's in progress stops you claiming its reward, " +
                     "and then you can't take on new feats. Continue?";

const RECIPE_COLUMNS_NOTE = "Each has two recipes: the normal one (Recipe) and the one for the upgraded Plus version (Plus recipe). " +
    "Base: you've made it (it goes in your inventory, and a better part is fitted on the hero). " +
    "Upgraded: you've upgraded it, which includes the base. Items you buy or find have no Recipe.";
const BOUGHT_COLUMNS_NOTE = "Base: you own it (you buy or find it, so there is no recipe for it). " +
    "Plus recipe: you know the recipe for the upgraded version. Upgraded: you've upgraded it, which includes the base.";

// A short note above a table, above its buttons
function addTableNote(tableId, text) {
    const table = document.getElementById(tableId);
    if (!table || table.parentNode.querySelector(".recipe-note")) return;
    const note = document.createElement("p");
    note.className = "section-note recipe-note";
    note.textContent = text;
    table.parentNode.insertBefore(note, table);
}

function setupBulkControls() {
    setupEverythingControls();
    // Items with base and upgraded versions
    ["armors", "trinkets"].forEach(id => {
        addTableNote(id, BOUGHT_COLUMNS_NOTE);
        makeBulkBar(id, [
            ["Add all base", () => bulkToggle(id, true, 1)],
            ["Add all Plus recipes", () => bulkToggle(id, true, 4)],
            ["Add all upgraded", () => bulkToggle(id, true, 2)],
            ["Clear all", () => bulkToggle(id, false, "all")]
        ]);
    });
    makeBulkBar("consumables", [
        ["Add all recipes", () => bulkToggle("consumables", true, 3)],
        ["Add all base", () => bulkToggle("consumables", true, 1)],
        ["Add all Plus recipes", () => bulkToggle("consumables", true, 4)],
        ["Add all upgraded", () => bulkToggle("consumables", true, 2)],
        ["Clear all", () => bulkToggle("consumables", false, "all")]
    ]);
    addTableNote("consumables", RECIPE_COLUMNS_NOTE);
    makeBulkBar("sharedWeapons", [
        ["Add all base", () => bulkToggle("sharedWeapons", true, 1)],
        ["Add all Plus recipes", () => bulkToggle("sharedWeapons", true, 4)],
        ["Add all upgraded", () => bulkToggle("sharedWeapons", true, 2)],
        ["Clear all", () => bulkToggle("sharedWeapons", false, "all")]
    ]);
    makeBulkBar("otherItems", [
        ["Add all", () => bulkToggle("otherItems", true, 1)],
        ["Clear all", () => bulkToggle("otherItems", false, 1)]
    ]);

    HERO_IDS.forEach(heroId => {
        const t = allHeroesData[heroId].tableIds;
        addTableNote(t.weaponTableId, RECIPE_COLUMNS_NOTE);
        weaponTypeNames(heroId).forEach(type => {
            const tableId = weaponCardTableId(heroId, type);
            makeBulkBar(tableId, [
                ["Add all recipes", () => bulkToggle(tableId, true, 3)],
                ["Add all base", () => bulkToggle(tableId, true, 1)],
                ["Add all Plus recipes", () => bulkToggle(tableId, true, 4)],
                ["Add all upgraded", () => bulkToggle(tableId, true, 2)],
                ["Clear all", () => bulkToggle(tableId, false, "all")]
            ]);
        });
        makeBulkBar(t.skillTableId, [
            ["Add all", () => bulkToggle(t.skillTableId, true, 1)],
            ["Clear all", () => bulkToggle(t.skillTableId, false, 1)]
        ]);
        makeBulkBar(t.featTableId, [
            ["Complete all", () => bulkToggle(t.featTableId, true, 1), FEAT_WARNING],
            ["Clear all", () => bulkToggle(t.featTableId, false, 1)]
        ]);
    });

    const matInput = document.createElement("input");
    matInput.type = "number";
    matInput.min = 0;
    matInput.max = 9999;
    matInput.value = 50;
    matInput.className = "quantity-input";
    matInput.setAttribute("aria-label", "Amount for every material");
    makeBulkBar("craftingMaterials", [
        ["input", matInput],
        ["Set all", () => bulkMaterials(matInput.value)],
        ["Clear all", () => bulkMaterials(0)]
    ]);

    const shopMatInput = document.createElement("input");
    shopMatInput.type = "number";
    shopMatInput.min = 0;
    shopMatInput.max = 9999;
    shopMatInput.value = 10;
    shopMatInput.className = "quantity-input";
    shopMatInput.setAttribute("aria-label", "Amount of every material for sale");
    makeBulkBar("shopStock", [
        ["input", shopMatInput],
        ["Set all", () => bulkShopMaterials(shopMatInput.value)],
        ["Clear all", () => bulkShopMaterials(0)]
    ]);
}

/*____________________________ ACT 1 / ACT 2 ____________________________
    Saves that don't own Act 2 break if Act 2 items are in them.
    Act 2 items (as far as is known):
    - Armor 19 and up, trinkets 13 and up (and their _PLUS versions)
    - Hero skills 8 and up, hero feats 12 and up
    - Consumables: Caution Serum, Knack Juice, Efficacious Elixir, Glitterdust Bomb,
      Stalwart Incense, Whirlwind Grenade
    - Shared weapons: Dragonsbane, Grasp of Fear, Sunburst
    - Weapon parts A, B and C at levels 4 and 5 (and their _UPGRADED versions)
    - The recipes for those parts
*/

var act2Override = null;   // null = follow the save; true/false = user's choice
var act2Hidden = false;    // hide all Act 2 content (and leave it out of "add all")

function saveOwnsAct2() {
    const owned = [].concat(completeSave.ProductIDs || [], gameState().OwnedProductIDs || []);
    return owned.includes("PRODUCT_ACT_2");
}

// An Act 1 campaign: the save says so (Act 0), or it doesn't own Act 2 at all
function saveIsAct1() {
    return !saveOwnsAct2() || !completeSave.Act;
}

// Whether the campaign can have Act 2 content
function act2Permitted() {
    return act2Override === null ? saveOwnsAct2() : act2Override;
}

// Whether Act 2 content can be added now (not while it's hidden)
function act2Allowed() {
    return act2Permitted() && !act2Hidden;
}

// From the DescentForge catalog (and confirmed by you)
const ACT2_CONSUMABLES = ["CSM_CAUTION", "CSM_KNACK", "CSM_EFFICACIOUS", "CSM_GLITTERDUST", "CSM_STALWART", "CSM_WHIRLWIND"];
const ACT2_SHARED_WEAPONS = ["DRAGONSBANE", "FEAR", "SUNBURST"];

const ENEMIES_BY_ID = {};
ENEMIES.forEach(e => { ENEMIES_BY_ID[e.id] = e; });

function isAct2Item(id) {
    // Enemy IDs don't all start with ENEMY_ (for example A2Q01_VRASKHAR), so look them up
    if (ENEMIES_BY_ID[id]) return ENEMIES_BY_ID[id].act === 2;
    if (id.startsWith("SHARED:")) return ACT2_SHARED_WEAPONS.includes(id.split(":")[1]);
    let item = baseItemId(recipeItemId(id));
    if (ACT2_CONSUMABLES.includes(item)) return true;
    const shared = /^WEAPON_PART_[ABC]_(.+)$/.exec(item);
    if (shared && ACT2_SHARED_WEAPONS.includes(shared[1])) return true;
    const trinket = /^TRINKET(\d+)_ID$/.exec(item);
    if (trinket) return parseInt(trinket[1]) >= 13;
    const skill = /^SKILL_[A-Z]+_(\d+)$/.exec(item);
    if (skill) return parseInt(skill[1]) >= 8;
    // DescentForge counts 66 Act 1 feats (11 per hero) and 48 Act 2 feats
    const feat = /^FEAT_[A-Z]+_(\d+)$/.exec(item);
    if (feat) return parseInt(feat[1]) >= 12;
    const armor = /^ARMOR_(\d+)$/.exec(item);
    if (armor) return parseInt(armor[1]) >= 19;
    const part = parsePart(item);
    if (part) return part.level === 4 || part.level === 5;
    return false;
}

// Every Act 2 ID currently anywhere in the save
function act2ItemsInSave() {
    const gs = gameState();
    const ids = new Set();
    (gs.ItemInventory || []).forEach(i => { if (isAct2Item(i.Id)) ids.add(i.Id); });
    (gs.DiscoveredRecipes || []).forEach(r => { if (isAct2Item(r.Id)) ids.add(r.Id); });
    (gs.AvailableItemIds || []).forEach(id => { if (isAct2Item(id)) ids.add(id); });
    (gs.AvailableRecipeIds || []).forEach(id => { if (isAct2Item(id)) ids.add(id); });
    (gs.ShopData || []).forEach(s => { if (isAct2Item(s.id)) ids.add(s.id); });
    return [...ids];
}

function removeAct2Items() {
    const gs = gameState();
    const equipped = (gs.ItemInventory || []).filter(i => isAct2Item(i.Id) && isEquipped(i.Id)).map(i => i.Id);
    gs.ItemInventory = gs.ItemInventory.filter(i => !isAct2Item(i.Id) || equipped.includes(i.Id));
    gs.DiscoveredRecipes = (gs.DiscoveredRecipes || []).filter(r =>
        !isAct2Item(r.Id) || equipped.includes(recipeItemId(r.Id)));
    gs.AvailableItemIds = (gs.AvailableItemIds || []).filter(id => !isAct2Item(id));
    gs.AvailableRecipeIds = (gs.AvailableRecipeIds || []).filter(id => !isAct2Item(id));
    gs.ShopData = (gs.ShopData || []).filter(s => !isAct2Item(s.id));
    buildCompleteGUI();
    if (equipped.length) {
        alert("Removed the Act 2 items, except these, which are equipped:\n" + equipped.join("\n") +
              "\n\nSwap them out in the game, or untick them on the hero tab after fitting another part.");
    }
}

function ensureActControls() {
    if (document.getElementById("actControls")) return;
    const box = document.createElement("div");
    box.id = "actControls";
    box.innerHTML =
        '<label><input type="checkbox" id="act2Toggle"> Act 2 content allowed</label>' +
        '<label id="act2HideLabel"><input type="checkbox" id="act2Hide"> Hide all Act 2 content</label>' +
        '<span id="act2Note" class="section-note"></span>' +
        '';
    const partyName = document.getElementById("partyName");
    partyName.parentNode.insertBefore(box, partyName.nextSibling);
    const warning = document.createElement("div");
    warning.id = "act2Warning";
    warning.setAttribute("role", "alert");
    warning.style.display = "none";
    warning.innerHTML = '<span id="act2WarningText"></span> ' +
        '<button type="button" class="blue-button" id="act2RemoveBtn">Remove Act 2 items</button>';
    const top = document.getElementById("topWarnings");
    (top || box).appendChild(warning);
    document.getElementById("act2Toggle").onchange = e => {
        act2Override = e.target.checked;
        buildCompleteGUI();
    };
    document.getElementById("act2Hide").onchange = e => {
        act2Hidden = e.target.checked;
        buildCompleteGUI();
    };
    document.getElementById("act2RemoveBtn").onclick = removeAct2Items;
}

function applyActRules() {
    ensureActControls();
    // Hiding Act 2 content only makes sense for an Act 1 campaign. An Act 2 save never hides
    // anything, and the checkbox isn't shown for it.
    const act1Save = saveIsAct1();
    if (!act1Save) act2Hidden = false;
    document.getElementById("act2HideLabel").style.display = act1Save ? "" : "none";
    const allowed = act2Allowed();
    const permitted = act2Permitted();
    document.body.classList.toggle("hide-act2", act2Hidden);
    document.getElementById("act2Toggle").checked = permitted;
    document.getElementById("act2Hide").checked = act2Hidden;
    document.getElementById("act2Note").textContent = (saveOwnsAct2()
        ? " This save owns Act 2."
        : " This save doesn't own Act 2, so Act 2 items are locked. Only allow them if you know the campaign supports it.") +
        (act2Hidden ? " Act 2 content is hidden." : "");

    // Tag and lock Act 2 rows in every checkbox table
    document.querySelectorAll('input[type=checkbox][data-id], input[type=checkbox][data-shop-id], input[type=checkbox][data-recipe-id], input[type=checkbox][data-enemy-id]').forEach(cb => {
        if (!isAct2Item(cb.dataset.id || cb.dataset.shopId || cb.dataset.recipeId || cb.dataset.enemyId)) return;
        const row = cb.closest("tr");
        if (row) {
            row.classList.add("act2-row");
            const nameCell = row.cells[0];
            if (nameCell && !nameCell.querySelector(".act-badge")) {
                const badge = document.createElement("span");
                badge.className = "act-badge";
                badge.textContent = "Act 2";
                nameCell.appendChild(badge);
            }
        }
        // Can still untick one that's there, but can't add new ones
        // (shop rows for things you already have stay locked too)
        cb.disabled = (!allowed || cb.dataset.locked === "1") && !cb.checked;
    });

    greyOutUpgradedBases();
    groupRowsByAct();
    applyEnemyFilter();
    refreshEnemyCount();
    refreshCleanupHint();

    // Warn if a save without Act 2 already has Act 2 items in it
    const found = permitted ? [] : act2ItemsInSave();
    document.getElementById("act2Warning").style.display = found.length ? "" : "none";
    document.getElementById("act2WarningText").textContent =
        found.length + " Act 2 item" + (found.length === 1 ? " is" : "s are") +
        " in this save, which can break a campaign without Act 2.";
}


/*____________________________ OWNING ITEMS (buy / craft / upgrade) ____________________________
    From real saves:
    - Base armor, trinkets and part A weapons are bought: the item goes in
      ItemInventory with SoldOut:false. No recipe is involved.
    - Part B/C weapon parts and consumables are crafted from their recipe.
    - Every upgrade (_PLUS for armor, trinkets and consumables, _UPGRADED for
      weapon parts) is crafted from its own recipe, and replaces the base item.
*/

const SHARED_WEAPON_TYPE = "SHARED";
const OWNED_ITEM_TYPES = [WEAPON_TYPE, SHARED_WEAPON_TYPE, ARMOR_TYPE, TRINKET_TYPE, CSM_TYPE];


function isUpgrade(id) {
    return /_(PLUS|UPGRADED)$/.test(id);
}

// Crafted rather than bought or found (for base items)
function isCraftedBase(id) {
    if (ITEM_NAMES[id]) return hasRecipe(id);          // known item: the catalog says
    if (id.startsWith("CSM_")) return true;              // unknown item: best guess
    const part = parsePart(id);
    return !!part && (part.slot === "B" || part.slot === "C") && part.level > 0;
}

function upgradedVersions(baseId) {
    return [baseId + "_PLUS", baseId + "_UPGRADED"];
}

function ownsItem(id) {
    return gameState().ItemInventory.some(i => i.Id === id);
}

// Point any equipped weapon part or trinket at a different item (both party copies)
function swapEquipped(oldId, newId) {
    allPartyCopies().forEach(players => players.forEach(p => {
        if (p.EquippedTrinketId === oldId) p.EquippedTrinketId = newId;
        (p.EquippedWeapons || []).forEach(w => {
            ["PartAId", "PartBId", "PartCId"].forEach(k => { if (w[k] === oldId) w[k] = newId; });
        });
    }));
}

function syncCheckbox(id, checked) {
    document.querySelectorAll('input[type=checkbox][data-id="' + id + '"]').forEach(cb => { cb.checked = checked; });
}

function addInventoryItem(id) {
    const existing = gameState().ItemInventory.find(i => i.Id === id);
    if (existing) existing.SoldOut = false;
    else gameState().ItemInventory.push({ Id: id, SoldOut: false });
}

// Give or take away one item, the way the game would. Returns {ok, message}.
function setOwned(id, owned) {
    if (id.startsWith("SHARED:")) return setSharedFromCheckbox(id, owned);
    const gs = gameState();
    const base = baseItemId(id);

    if (!owned) {
        if (isUpgrade(id) && ownsItem(id)) {
            // Going back to the base version: anyone using the upgrade gets the base
            swapEquipped(id, base);
            removeFromObjectArray(gs.ItemInventory, id);
            // You still know the Plus recipe; forget it from the PLUS RECIPE column
            const plusKnown = (gs.DiscoveredRecipes || []).find(x => x.Id.trim() === recipeFor(id));
            if (plusKnown) plusKnown.Crafted = false;
            if (!ownsItem(base)) {
                // Back to the base part: just give it back, without fitting it on anyone
                addInventoryItem(base);
                if (hasRecipe(base)) markRecipeCrafted(recipeFor(base));
            }
            syncCheckbox(base, true);
            return { ok: true, message: "Went back to " + base + "." };
        }
        if (isEquipped(id)) {
            return { ok: false, message: id + " is equipped. Swap it out in the game first, then untick it here." };
        }
        removeFromObjectArray(gs.ItemInventory, id);
        // Losing the item leaves you knowing its recipe; forget the recipe from the RECIPE column
        const known = (gs.DiscoveredRecipes || []).find(x => x.Id.trim() === recipeFor(id));
        if (known) known.Crafted = false;
        return { ok: true, message: "Removed " + id + "." };
    }

    let message;
    if (isUpgrade(id)) {
        // Craft the upgrade (or just add it, if the game has no recipe for it),
        // which replaces the base item and whatever had it equipped
        if (hasRecipe(id)) {
            message = markCrafted(recipeFor(id));
            // You can only upgrade something you've made, so the base recipe is crafted too
            // (every upgrade in a real Act 2 save has its base recipe marked crafted)
            if (hasRecipe(base)) markRecipeCrafted(recipeFor(base));
        } else {
            addInventoryItem(id);
            message = "Added " + id + ".";
        }
        if (ownsItem(base)) {
            swapEquipped(base, id);
            removeFromObjectArray(gs.ItemInventory, base);
            syncCheckbox(base, false);
            message = message.replace(/\.$/, "") + ", replacing " + base + ".";
        }
    } else {
        if (isCraftedBase(id)) {
            message = markCrafted(recipeFor(id));
        } else {
            // Bought
            addInventoryItem(id);
            const shopEntry = (gs.ShopData || []).find(s => s.id === id);
            if (shopEntry) shopEntry.qty = 0;
            message = "Added " + id + ".";
        }
        // Going back to the base version replaces the upgrade
        upgradedVersions(id).forEach(up => {
            if (!ownsItem(up)) return;
            swapEquipped(up, id);
            removeFromObjectArray(gs.ItemInventory, up);
            const r = gs.DiscoveredRecipes.find(x => x.Id.trim() === recipeFor(up));
            if (r) r.Crafted = false;
            syncCheckbox(up, false);
        });
    }
    return { ok: true, message: message };
}

/*____________________________ SHARED WEAPONS ____________________________
    Weapons any hero can use. From an Act 2 save:
    - Each comes as parts A, B and C with no level (e.g. WEAPON_PART_B_SUNBURST).
    - Only part A can be upgraded, from its recipe (RECIPE_WEAPON_PART_A_SUNBURST_UPGRADED).
    - The weapon itself has its own ID. SharedWeaponIds lists the ones you own that
      no hero is using; a hero using one has it in their EquippedWeapons instead.
*/

const sharedWeaponDefs = [
    { key: "RUNE_OF_BLADES",   weaponId: "WEAPON_RUNE_OF_BLADES" },
    { key: "ICE_STORM",        weaponId: "WEAPON_RUNE_ICE_STORM" },
    { key: "LIGHTNING_STRIKE", weaponId: "WEAPON_RUNE_LIGHTNING_STRIKE" },
    { key: "SUNBURST",         weaponId: "WEAPON_SUNBURST" },
    { key: "FEAR",             weaponId: "WEAPON_GRASP_OF_FEAR" },
    { key: "DRAGONSBANE",      weaponId: "WEAPON_DRAGONSBANE" }
];

// Known shared weapons plus any other non-hero weapon parts found in the save.
// For ones not in the list above the weapon ID is unknown, so SharedWeaponIds is left alone.
function allSharedWeapons() {
    const defs = sharedWeaponDefs.map(d => ({ ...d }));
    collectSaveItemIds().forEach(id => {
        const m = /^WEAPON_PART_[ABC]_(.+)$/.exec(id);
        if (!m || isAnyHeroWeapon(id) || parsePart(id)) return;
        // A hero weapon type with no level (seen once as a stray recipe) isn't a shared weapon
        const heroTypes = HERO_IDS.flatMap(h => allHeroesData[h].itemNames.weaponNames.map(n => n.replace(/^_/, "")));
        if (heroTypes.includes(m[1])) return;
        if (!defs.some(d => d.key === m[1])) defs.push({ key: m[1], weaponId: null });
    });
    return defs;
}

function sharedPartA(key) { return "WEAPON_PART_A_" + key; }
function sharedParts(key) { return ["A", "B", "C"].map(s => "WEAPON_PART_" + s + "_" + key); }

function ownsShared(def) {
    return sharedParts(def.key).some(ownsItem) || ownsItem(sharedPartA(def.key) + "_UPGRADED");
}

function sharedEquippedBy(def) {
    const heroes = new Set();
    allPartyCopies().forEach(players => players.forEach(p => {
        (p.EquippedWeapons || []).forEach(w => {
            const mine = sharedParts(def.key).concat(sharedPartA(def.key) + "_UPGRADED");
            const usesPart = [w.PartAId, w.PartBId, w.PartCId].some(x => mine.includes(x));
            if ((def.weaponId && w.Id === def.weaponId) || usesPart) {
                heroes.add(p.HeroId);
            }
        });
    }));
    return [...heroes];
}

function setSharedOwned(def, owned) {
    const gs = gameState();
    if (!gs.SharedWeaponIds) gs.SharedWeaponIds = [];
    if (owned) {
        if (!ownsItem(sharedPartA(def.key)) && !ownsItem(sharedPartA(def.key) + "_UPGRADED")) {
            setOwned(sharedPartA(def.key), true);   // you're given it: there's no recipe
        }
        sharedParts(def.key).slice(1).forEach(addInventoryItem);
        if (def.weaponId && !sharedEquippedBy(def).length) addToArray(gs.SharedWeaponIds, def.weaponId);
        return { ok: true, message: "Added " + def.key + "." };
    }
    const users = sharedEquippedBy(def);
    if (users.length) {
        return { ok: false, message: def.key + " is equipped by " + users.map(h => h.replace("HERO_", "")).join(", ") +
                 ". Swap it out in the game first, then untick it here." };
    }
    const ids = sharedParts(def.key).concat(sharedPartA(def.key) + "_UPGRADED");
    gs.ItemInventory = gs.ItemInventory.filter(i => !ids.includes(i.Id));   // also clears duplicates
    if (def.weaponId) gs.SharedWeaponIds = gs.SharedWeaponIds.filter(w => w !== def.weaponId);
    const r = (gs.DiscoveredRecipes || []).find(x => x.Id.trim() === recipeFor(sharedPartA(def.key) + "_UPGRADED"));
    if (r) r.Crafted = false;
    return { ok: true, message: "Removed " + def.key + "." };
}

function setSharedUpgraded(def, upgraded) {
    if (upgraded) {
        setSharedOwned(def, true);
        return setOwned(sharedPartA(def.key) + "_UPGRADED", true);   // crafts the upgrade, replaces part A
    }
    if (!ownsShared(def)) return { ok: true, message: "" };
    return setOwned(sharedPartA(def.key), true);                     // back to the base part A
}

// Checkbox IDs: "SHARED:<key>" (owned) and "SHARED:<key>:UP" (upgraded)
function setSharedFromCheckbox(id, checked) {
    const [, key, up] = id.split(":");
    const def = allSharedWeapons().find(d => d.key === key);
    return up ? setSharedUpgraded(def, checked) : setSharedOwned(def, checked);
}

function buildSharedWeaponsGUI() {
    const table = document.getElementById("sharedWeapons");
    ensurePlusRecipeHeader(table);
    buildTable(table, allSharedWeapons(), def => {
        const tr = document.createElement("tr");
        const tdName = document.createElement("td");
        tdName.appendChild(itemLabel(def.weaponId || sharedPartA(def.key)));
        tdName.title = sharedParts(def.key).join(", ");
        tr.appendChild(tdName);

        // No shared weapon has a base recipe: you're given the weapon. Only the upgrade has a recipe.

        const owned = ownsShared(def);
        const upgraded = ownsItem(sharedPartA(def.key) + "_UPGRADED");
        [["SHARED:" + def.key, owned], ["SHARED:" + def.key + ":UP", upgraded]].forEach(([cbId, checked]) => {
            if (cbId.endsWith(":UP")) {
                // Recipe for the upgraded part A (Plus recipe)
                const tdPlus = document.createElement("td");
                tdPlus.classList.add("checkbox-container");
                if (hasRecipe(sharedPartA(def.key) + "_UPGRADED")) tdPlus.appendChild(buildRecipeCheckbox("SHARED:" + def.key, true));
                tr.appendChild(tdPlus);
            }
            const td = document.createElement("td");
            td.classList.add("checkbox-container");
            const cb = document.createElement("input");
            cb.type = "checkbox";
            cb.dataset.id = cbId;
            cb.dataset.type = SHARED_WEAPON_TYPE;
            cb.dataset.col = cbId.endsWith(":UP") ? "upgraded" : "base";
            cb.checked = checked;
            cb.onchange = itemToggle;
            cb.setAttribute("aria-label", def.key + (cbId.endsWith(":UP") ? " upgraded" : " owned"));
            td.appendChild(cb);
            tr.appendChild(td);
        });

        return tr;
    });
}


/*____________________________ MISC: CLEAN UP DUPLICATES ____________________________*/

// Works out what the clean-up would change, without changing anything
function planCleanup() {
    const gs = gameState();
    const plan = { items: [], replaced: [], materials: [], recipes: [], fakeRecipes: [], lists: [], shop: [], noPart: [],
                   baseRecipes: ownedRecipesMissing(true) };

    // "No part" options a new campaign has, missing here (older editor versions could remove them)
    noPartOptions().forEach(id => { if (!(gs.ItemInventory || []).some(i => i.Id === id)) plan.noPart.push(id); });

    // Items listed more than once
    const seen = new Set();
    (gs.ItemInventory || []).forEach(i => {
        if (seen.has(i.Id)) plan.items.push(i.Id); else seen.add(i.Id);
    });

    // Base and upgraded version both owned: keep the upgrade
    seen.forEach(id => {
        if (isUpgrade(id)) return;
        const up = upgradedVersions(id).find(u => seen.has(u));
        if (up) plan.replaced.push([id, up]);
    });

    // Materials listed more than once
    const matCount = {};
    (gs.CraftingMaterials || []).forEach(m => { matCount[m.Id] = (matCount[m.Id] || 0) + 1; });
    Object.keys(matCount).forEach(id => { if (matCount[id] > 1) plan.materials.push(id); });

    // Recipes listed more than once, and recipes for bought items (written by the original editor)
    const recSeen = new Set();
    (gs.DiscoveredRecipes || []).forEach(r => {
        if (recSeen.has(r.Id)) plan.recipes.push(r.Id); else recSeen.add(r.Id);
        if (isEditorOnlyRecipe(r.Id) && !plan.fakeRecipes.includes(r.Id)) plan.fakeRecipes.push(r.Id);
    });

    // Plain lists with repeats
    ["AvailableItemIds", "AvailableRecipeIds", "SharedWeaponIds", "UnlockedSkills", "RealCompletedFeats"].forEach(key => {
        const list = gs[key] || [];
        const extra = list.length - new Set(list).size;
        if (extra > 0) plan.lists.push(key + " (" + extra + ")");
    });

    // Shop entries listed more than once
    const shopSeen = new Set();
    (gs.ShopData || []).forEach(e => {
        if (shopSeen.has(e.id)) plan.shop.push(e.id); else shopSeen.add(e.id);
    });
    return plan;
}

function describeCleanup(plan) {
    const lines = [];
    if (plan.items.length) lines.push("Duplicate items removed: " + plan.items.join(", "));
    if (plan.replaced.length) lines.push("Base items removed where the upgrade is owned: " + plan.replaced.map(p => p[0]).join(", "));
    if (plan.materials.length) lines.push("Materials combined into one stack: " + plan.materials.join(", "));
    if (plan.recipes.length) lines.push("Duplicate recipes removed: " + plan.recipes.join(", "));
    if (plan.fakeRecipes.length) lines.push("Recipes for bought items removed (" + plan.fakeRecipes.length + "): " + plan.fakeRecipes.join(", "));
    if (plan.lists.length) lines.push("Repeated entries removed from: " + plan.lists.join(", "));
    if (plan.shop.length) lines.push("Shop entries combined: " + plan.shop.join(", "));
    if (plan.baseRecipes.length) lines.push("Recipes marked crafted for items you own: " + plan.baseRecipes.join(", "));
    if (plan.noPart.length) lines.push("Missing \"no part\" options put back: " + plan.noPart.join(", "));
    return lines;
}

function applyCleanup(plan) {
    const gs = gameState();

    // One entry per item
    const keep = new Map();
    gs.ItemInventory.forEach(i => { if (!keep.has(i.Id)) keep.set(i.Id, { Id: i.Id, SoldOut: false }); });
    // Upgrade wins; anyone using the base now uses the upgrade
    plan.replaced.forEach(([base, up]) => { swapEquipped(base, up); keep.delete(base); });
    gs.ItemInventory = [...keep.values()];
    plan.noPart.forEach(id => gs.ItemInventory.push({ Id: id, SoldOut: false }));

    // Materials: add duplicate stacks together
    const mats = new Map();
    (gs.CraftingMaterials || []).forEach(m => {
        mats.set(m.Id, (mats.get(m.Id) || 0) + (parseInt(m.Qty) || 0));
    });
    gs.CraftingMaterials = [...mats.entries()].map(([Id, Qty]) => ({ Id: Id, Qty: Qty }));

    // Recipes: one each, crafted if any copy was; drop recipes for bought items
    const recs = new Map();
    (gs.DiscoveredRecipes || []).forEach(r => {
        if (isEditorOnlyRecipe(r.Id)) return;
        const prev = recs.get(r.Id);
        recs.set(r.Id, { Id: r.Id, Crafted: !!(r.Crafted || (prev && prev.Crafted)) });
    });
    gs.DiscoveredRecipes = [...recs.values()];
    plan.baseRecipes.forEach(markRecipeCrafted);

    ["AvailableItemIds", "AvailableRecipeIds", "SharedWeaponIds", "UnlockedSkills", "RealCompletedFeats"].forEach(key => {
        if (Array.isArray(gs[key])) gs[key] = [...new Set(gs[key])];
    });

    const shop = new Map();
    (gs.ShopData || []).forEach(e => {
        const prev = shop.get(e.id);
        shop.set(e.id, { id: e.id, qty: (prev ? prev.qty : 0) + (parseInt(e.qty) || 0) });
    });
    gs.ShopData = [...shop.values()];
}

function setCleanupStatus(text) {
    document.querySelectorAll(".cleanup-status").forEach(el => { el.textContent = text; });
}

function runCleanup() {
    if (!completeSave) { setCleanupStatus("Load a save file first."); return; }
    const plan = planCleanup();
    const lines = describeCleanup(plan);
    if (!lines.length) { setCleanupStatus("Nothing to clean up."); return; }
    if (!confirm("Clean up this save?\n\n" + lines.join("\n\n"))) return;
    applyCleanup(plan);
    buildCompleteGUI();
    setCleanupStatus("Cleaned up. " + lines.length + " kinds of fix applied.");
    const list = document.getElementById("cleanupDetails");
    list.innerHTML = "";
    lines.forEach(l => { const li = document.createElement("li"); li.textContent = l; list.appendChild(li); });
}

// Shows how many problems the loaded save has, next to the button
function refreshCleanupHint() {
    if (!completeSave) return;
    const n = describeCleanup(planCleanup()).length;
    const text = n ? n + " kind" + (n === 1 ? "" : "s") + " of problem found." : "No duplicates found.";
    document.querySelectorAll(".cleanup-hint").forEach(el => { el.textContent = text; });
}


/*____________________________ UPGRADED ITEMS INCLUDE THE BASE ____________________________*/

// In every base/upgraded table: when the upgrade is owned, the base box shows ticked
// and greyed out. Untick the upgrade to go back to the base version.
function greyOutUpgradedBases() {
    const tables = ["armors", "trinkets", "consumables", "sharedWeapons"]
        .concat(HERO_IDS.map(h => allHeroesData[h].tableIds.weaponTableId));
    tables.forEach(tableId => {
        const table = document.getElementById(tableId);
        if (!table) return;
        [...table.querySelectorAll("tr")].slice(1).forEach(tr => {
            const baseBox = rowCheckbox(tr, "base");
            const upBox = rowCheckbox(tr, "upgraded");
            if (!baseBox || !upBox) return;
            if (upBox.checked) {
                baseBox.checked = true;
                baseBox.disabled = true;
                baseBox.title = "Included in the upgraded version. Untick the upgrade to go back to the base.";
                baseBox.classList.add("included-in-upgrade");
            } else {
                baseBox.title = "";
                baseBox.classList.remove("included-in-upgrade");
            }
        });
    });
}

/*____________________________ EVERYTHING BUTTONS ____________________________*/

function allItemTables() {
    return ["armors", "trinkets", "consumables", "sharedWeapons"]
        .concat(HERO_IDS.map(h => allHeroesData[h].tableIds.weaponTableId));
}

// Run a bulk action on several tables and add up the results
function bulkEverything(tableIds, column) {
    if (!completeSave) return "Load a save file first.";
    let added = 0, skipped = 0;
    tableIds.forEach(id => {
        const text = bulkToggle(id, true, column);
        const a = /Added (\d+)/.exec(text);
        if (a) added += parseInt(a[1]);
    });
    // Count what's still locked (Act 2) so the message explains any gaps
    tableIds.forEach(id => {
        document.querySelectorAll("#" + id + " tr.act2-row").forEach(tr => {
            const cb = rowCheckbox(tr, column);
            if (cb && cb.disabled && !cb.checked) skipped++;
        });
    });
    let text = "Added " + added + ".";
    if (skipped) text += act2Hidden ? " Skipped " + skipped + " hidden Act 2 items."
                                    : " Skipped " + skipped + " Act 2 items this campaign doesn't allow.";
    return text;
}

function setupEverythingControls() {
    if (document.getElementById("everythingBar")) return;
    const wrap = document.createElement("div");
    wrap.id = "everythingBar";
    const rows = [1, 2, 3].map(() => {
        const row = document.createElement("div");
        row.className = "bulk-bar";
        return row;
    });
    const statusRow = document.createElement("div");
    statusRow.className = "bulk-bar";
    const status = document.createElement("span");
    status.className = "bulk-status";
    status.setAttribute("role", "status");
    statusRow.appendChild(status);

    const add = (row, label, run, confirmText) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "blue-button";
        btn.textContent = label;
        btn.onclick = () => {
            if (confirmText && !confirm(confirmText)) return;
            const message = run();
            if (message) status.textContent = message;
        };
        row.appendChild(btn);
        return btn;
    };
    // Row 1: I want it all, Reveal enemies, Reset to default
    add(rows[0], "I want it all", () => {
        const onShelves = () => (gameState().ShopData || []).filter(e => e.qty > 0 && !e.id.startsWith("MAT_")).length;
        const before = completeSave ? onShelves() : 0;
        let text = bulkEverything(allItemTables(), 2);
        if (completeSave) {
            // Make sure every recipe behind what you now own is marked crafted
            syncOwnedRecipes();
            // Take what you now own off the shelves, so buying it again can't make a duplicate
            soldOutOwnedShopItems();
            const taken = before - onShelves();
            if (taken > 0) text += " Took " + taken + (taken === 1 ? " item" : " items") + " you now own off the shop shelves.";
        }
        buildCompleteGUI();
        return text;
    });
    add(rows[0], "Reveal enemies", () => revealEnemies());
    add(rows[0], "Reset to default", resetToDefault).classList.add("reset-button");   // asks first itself
    add(rows[0], "New Game+", () => { openNewGamePlus(); return ""; });
    // Row 2: All skills, All feats
    add(rows[1], "All skills", () => bulkEverything(HERO_IDS.map(h => allHeroesData[h].tableIds.skillTableId), 1));
    add(rows[1], "All feats", () => bulkEverything(HERO_IDS.map(h => allHeroesData[h].tableIds.featTableId), 1), FEAT_WARNING);
    // Row 3: Clean up duplicates, with what it found
    const cleanBtn = add(rows[2], "Clean up duplicates", () => { runCleanup(); return ""; });
    cleanBtn.id = "btnCleanupTop";
    const hint = document.createElement("span");
    hint.className = "bulk-status cleanup-hint";
    rows[2].appendChild(hint);
    const cleanStatus = document.createElement("span");
    cleanStatus.className = "bulk-status cleanup-status";
    cleanStatus.setAttribute("role", "status");
    rows[2].appendChild(cleanStatus);

    const warnings = document.createElement("div");
    warnings.id = "topWarnings";

    [rows[0], rows[1], statusRow, rows[2], warnings].forEach(el => wrap.appendChild(el));
    const nav = document.getElementById("navigationBar");
    nav.parentNode.insertBefore(wrap, nav);
}


/*____________________________ NAMES ____________________________*/

// English and Spanish names from the DescentForge catalog (names.js)
function itemName(id) {
    const clean = id.trim();
    return ITEM_NAMES[clean] || ITEM_NAMES[recipeItemId(clean)] || null;
}

// Name above, ID below; the Spanish name shows on hover.
// Pass imgSrc to show the item's picture too, when there is one.
function itemLabel(id, imgSrc, imgClass) {
    const wrap = document.createElement("span");
    wrap.className = "item-label";
    if (imgSrc) {
        const img = document.createElement("img");
        img.alt = "";
        img.className = imgClass || "item-image";
        img.onerror = () => img.remove();   // no picture: just the names
        img.src = imgSrc;
        wrap.appendChild(img);
    }
    const text = document.createElement("span");
    text.className = "item-label-text";
    const name = itemName(id);
    if (name) {
        const en = document.createElement("span");
        en.className = "item-name";
        en.textContent = pickName(name);
        text.appendChild(en);
        wrap.title = otherName(name);
    }
    const idEl = document.createElement("span");
    idEl.className = "item-id-label";
    idEl.textContent = id.trim();
    text.appendChild(idEl);
    wrap.appendChild(text);
    return wrap;
}


/*____________________________ MISC: RESET TO DEFAULT ____________________________*/

// Replaces the editor-managed parts of the save with a new campaign's starting state
// (defaults.js). Story progress, quests, map, party name, XP and the rest stay as they are.
// Used by both Reset buttons (Misc section and the top bar). Returns a status message.
function resetToDefault() {
    const status = document.getElementById("resetStatus");
    const message = runReset();
    if (message) status.textContent = message;
    return message;
}

function runReset() {
    if (!completeSave) return "Load a save file first.";

    let question = "Reset this save to the starting items, recipes, materials, gold, shop, " +
                   "skills, feats and hero gear of a new campaign?\n\nStory progress, party name and XP are kept.";
    if (completeSave.Act && completeSave.Act !== 0) {
        question += "\n\nThis is an Act 2 campaign, but the default comes from the start of an Act 1 campaign. " +
                    "An Act 2 campaign may normally start with more than this.";
    }
    if (!confirm(question)) return "";

    const gs = gameState();
    const copy = x => JSON.parse(JSON.stringify(x));
    Object.keys(DEFAULT_GAME_STATE).forEach(key => { gs[key] = copy(DEFAULT_GAME_STATE[key]); });

    allPartyCopies().forEach(players => players.forEach(p => {
        const gear = DEFAULT_HERO_GEAR[p.HeroId];
        if (!gear) return;   // a hero the default doesn't know about keeps their gear
        Object.keys(gear).forEach(key => { p[key] = copy(gear[key]); });
    }));

    if (getShopExtraSlots() !== null) setShopExtraSlots(0);

    buildCompleteGUI();
    return "Reset to default.";
}


/*____________________________ "NO PART" OPTIONS ____________________________*/

// Level 0 parts B and C (e.g. WEAPON_PART_B_SWORD_0) are how the game lets a hero
// fit no part in that slot. Every new campaign has one per slot for each hero weapon.
function isNoPartOption(id) {
    return /^WEAPON_PART_[BC]_.+_0$/.test(id);
}

function noPartOptions() {
    return (DEFAULT_GAME_STATE.ItemInventory || []).map(i => i.Id).filter(isNoPartOption);
}


/*____________________________ ACT 1 FIRST, THEN ACT 2 ____________________________*/

// In every table, move the Act 2 rows below the Act 1 rows (keeping their order)
// with an "Act 2" divider between them.
function groupRowsByAct() {
    document.querySelectorAll("table").forEach(table => {
        [...table.querySelectorAll("tr.act-divider")].forEach(tr => tr.remove());
        const rows = [...table.querySelectorAll("tr")].slice(1);
        if (!rows.length) return;

        // Sections start at a "part-divider" row (a weapon table has A, B and C); others are one section
        const sections = [{ head: null, rows: [] }];
        rows.forEach(tr => {
            if (tr.classList.contains("part-divider")) sections.push({ head: tr, rows: [] });
            else sections[sections.length - 1].rows.push(tr);
        });
        const isAct2 = tr => tr.classList.contains("act2-row");
        const needed = sections.some(sec => sec.rows.some(isAct2) && sec.rows.some(tr => !isAct2(tr)
            && !tr.classList.contains("shop-divider")));
        if (!needed) return;

        // Act 1 rows first in each section, then an "Act 2" divider and the Act 2 rows
        const body = rows[0].parentNode;
        const cols = table.rows[0].cells.length;
        sections.forEach(sec => {
            const act2 = sec.rows.filter(isAct2);
            const act1 = sec.rows.filter(tr => !isAct2(tr));
            if (sec.head) body.appendChild(sec.head);
            act1.forEach(tr => body.appendChild(tr));
            const hasReal = act1.some(tr => !tr.classList.contains("shop-divider"));
            if (act2.length && hasReal) {
                const divider = document.createElement("tr");
                divider.className = "act-divider";
                const td = document.createElement("td");
                td.colSpan = cols;
                td.textContent = "Act 2";
                divider.appendChild(td);
                body.appendChild(divider);
            }
            act2.forEach(tr => body.appendChild(tr));
        });
    });
}


// Mark a recipe as bought and crafted, without adding its item
function markRecipeCrafted(recipeId) {
    recipeId = gameRecipeId(recipeId);
    markRecipeBought(recipeId);
    gameState().DiscoveredRecipes.find(r => r.Id === recipeId).Crafted = true;
}

// Recipes behind what you own that aren't marked crafted. A real (edited) save can own an
// upgrade, or something crafted, without its recipe. Returns the recipe IDs.
// forCleanup: only the base recipes (an unmodified finished game owns a few upgrades, such as
// Rusted Nail Plus, whose own recipe was never learned, so that isn't a problem to fix)
function ownedRecipesMissing(forCleanup) {
    const gs = gameState();
    const missing = new Set();
    (gs.ItemInventory || []).forEach(i => {
        const id = i.Id;
        if (isNoPartOption(id)) return;
        const need = [];
        if (isUpgrade(id)) {
            if (!forCleanup && hasRecipe(id)) need.push(id);
            const base = baseItemId(id);
            if (hasRecipe(base)) need.push(base);
        } else if (isCraftedBase(id) && hasRecipe(id)) {
            need.push(id);
        }
        need.forEach(x => {
            const recipe = recipeFor(x);
            const entry = (gs.DiscoveredRecipes || []).find(d => d.Id.trim() === recipe);
            if (!entry || !entry.Crafted) missing.add(recipe);
        });
    });
    return [...missing];
}

// Mark them crafted. Returns how many were fixed.
function syncOwnedRecipes() {
    const missing = ownedRecipesMissing();
    missing.forEach(markRecipeCrafted);
    return missing.length;
}

/*____________________________ ENEMY WEAKNESSES ____________________________
    GameState.DiscoveredEnemyVulnerabilities lists the enemies the party has learned about:
        { EnemyIdHash: <IL2CPP hash of the enemy ID>, VulnerabilityFlags: <bits> }
    Worked out by matching two real saves against DescentForge's enemy catalog:
    - The hash matched all 153 entries.
    - Bit n (n >= 1) is the enemy's nth weakness/resistance entry, weaknesses first
      then resistances, in the catalog's order. Fully learned enemies also have bit 0 set.
    - What bit 0 means on its own isn't known, so it is set whenever an enemy is revealed.
*/

// Unity's IL2CPP string hash, as a signed 32-bit number
function il2cppHash(text) {
    let h1 = 5381, h2 = 5381;
    for (let i = 0; i < text.length; i++) {
        const c = text.charCodeAt(i);
        if (i % 2 === 0) h1 = (((h1 << 5) + h1) ^ c) >>> 0;
        else h2 = (((h2 << 5) + h2) ^ c) >>> 0;
    }
    return (h1 + Math.imul(h2, 1566083941)) | 0;
}

let enemyHashIndex = null;
function knownEnemyHashes() {
    if (!enemyHashIndex) {
        enemyHashIndex = new Map();
        ENEMIES.forEach(e => enemyHashIndex.set(il2cppHash(e.id), e));
    }
    return enemyHashIndex;
}

// Flags with bit 0 plus one bit per weakness and resistance
function enemyFullFlags(e) {
    let flags = 1;
    for (let i = 1; i <= e.wr.length; i++) flags |= (1 << i);
    return flags;
}

function enemyAllowed(e) {
    return e.act !== 2 || act2Allowed();
}

function discoveredList() {
    const gs = gameState();
    if (!gs.DiscoveredEnemyVulnerabilities) gs.DiscoveredEnemyVulnerabilities = [];
    return gs.DiscoveredEnemyVulnerabilities;
}

// Reveal everything about every enemy (Act 2 ones only when the campaign allows them)
function revealEnemies() {
    if (!completeSave) return "Load a save file first.";
    let changed = 0, skipped = 0;
    ENEMIES.forEach(e => {
        if (!enemyAllowed(e)) { skipped++; return; }
        if (!enemyProgress(e).full) { setEnemyKnown(e, true); changed++; }
    });
    buildCompleteGUI();
    let text = changed ? "Revealed " + changed + " enemies." : "Every enemy is already revealed.";
    if (skipped) text += act2Hidden ? " Skipped " + skipped + " hidden Act 2 enemies."
                                    : " Skipped " + skipped + " Act 2 enemies this campaign doesn't allow.";
    return text;
}

// Forget what the party has learned about every enemy the catalog knows.
// Entries for enemies it doesn't know (custom campaigns) are left alone.
function clearEnemies() {
    if (!completeSave) return "Load a save file first.";
    const known = knownEnemyHashes();
    const list = discoveredList();
    const kept = list.filter(x => !known.has(x.EnemyIdHash));
    const removed = list.length - kept.length;
    gameState().DiscoveredEnemyVulnerabilities = kept;
    buildCompleteGUI();
    return "Forgot " + removed + " enemies.";
}

function setEnemyStatus(text) {
    const el = document.getElementById("enemyStatus");
    if (el) el.textContent = text;
}

function refreshEnemyCount() {
    const el = document.getElementById("enemyCount");
    if (!el || !completeSave) return;
    const listed = listedEnemies();
    const full = listed.filter(e => enemyProgress(e).full).length;
    const known = knownEnemyHashes();
    const other = discoveredList().filter(x => !known.has(x.EnemyIdHash)).length;
    el.textContent = full + " of " + listed.length + " enemies fully revealed." +
        (other ? " " + other + " other " + (other === 1 ? "entry isn't" : "entries aren't") + " on DescentForge's list and " + (other === 1 ? "is" : "are") + " left alone." : "");
}


/*____________________________ SHOP SHELVES ____________________________*/

// Sell out every shop entry for an item you own (or own the upgrade of) or a recipe you
// know, the way the game does when you buy it: the entry stays, with its quantity at 0.
// Materials and things you don't own are left alone. Returns how many entries changed.
function soldOutOwnedShopItems() {
    const gs = gameState();
    const known = new Set((gs.DiscoveredRecipes || []).map(r => r.Id.trim()));
    let changed = 0;
    (gs.ShopData || []).forEach(entry => {
        if (entry.qty <= 0) return;
        const id = entry.id.trim();
        if (id.startsWith("MAT_")) return;
        const owned = id.startsWith("RECIPE_")
            ? known.has(id)
            : ownsItem(id) || ownsItem(id + "_PLUS") || ownsItem(id + "_UPGRADED");
        if (owned) { entry.qty = 0; changed++; }
    });
    return changed;
}


/*____________________________ RECIPE COLUMN ____________________________
    Items you craft (weapon parts B and C, consumables, and every upgrade) have a recipe.
    Each row shows three steps:  RECIPE known  ->  BASE made  ->  UPGRADED.
    Armor, trinkets and part A weapons are bought, so their RECIPE cell is blank and
    ticking UPGRADED learns and crafts the upgrade recipe in one go.
*/

function ensureRecipeHeader(table) {
    const head = table.rows[0];
    if (!head || head.querySelector("th[data-col=recipe]")) return;
    const th = document.createElement("th");
    th.dataset.col = "recipe";
    th.textContent = "RECIPE";
    head.insertBefore(th, head.cells[1]);
}

// The upgraded version of a base item
function upgradedIdOf(id) {
    return id.startsWith("WEAPON_PART_") ? id + "_UPGRADED" : id + "_PLUS";
}

// The item whose recipe a box is about: a shared weapon ("SHARED:<key>") means its part A
function recipeItemFor(id) {
    return id.startsWith("SHARED:") ? sharedPartA(id.split(":")[1]) : id;
}

// The recipe id for a box: the normal recipe, or (plus) the recipe for the upgraded version
function recipeIdFor(id, plus) {
    const item = recipeItemFor(id);
    return recipeFor(plus ? upgradedIdOf(item) : item);
}

function recipeKnown(id, plus) {
    const recipe = recipeIdFor(id, plus);
    return (gameState().DiscoveredRecipes || []).some(r => r.Id.trim() === recipe);
}

function buildRecipeCheckbox(id, plus) {
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.dataset.recipeId = id;
    cb.dataset.col = plus ? "plusrecipe" : "recipe";
    cb.checked = recipeKnown(id, plus);
    cb.onchange = recipeToggle;
    cb.setAttribute("aria-label", id + (plus ? " plus recipe known" : " recipe known"));
    return cb;
}

function recipeToggle(event) {
    const cb = event.target;
    const result = setRecipeKnown(cb.dataset.recipeId, cb.checked, cb.dataset.col === "plusrecipe");
    if (!result.ok) {
        cb.checked = !cb.checked;
        if (!bulkRunning) alert(result.message);
    }
    if (!bulkRunning) buildCompleteGUI();
}

// Learn a recipe (bought, not crafted), or forget it, which also removes what it made.
// plus: the recipe for the upgraded version instead of the normal one.
function setRecipeKnown(id, known, plus) {
    const gs = gameState();
    const shared = id.startsWith("SHARED:") ? allSharedWeapons().find(d => d.key === id.split(":")[1]) : null;
    const itemId = recipeItemFor(id);

    if (plus) {
        const upId = upgradedIdOf(itemId);
        if (known) {
            markRecipeBought(recipeFor(upId));
            return { ok: true, message: "Learned " + upId + "." };
        }
        // Forgetting the Plus recipe also undoes the upgrade, going back to the base
        if (ownsItem(upId)) {
            const r = shared ? setSharedUpgraded(shared, false) : setOwned(upId, false);
            if (!r.ok) return r;
        }
        markRecipeNotBought(recipeFor(upId));
        return { ok: true, message: "Forgot " + upId + "." };
    }

    if (known) {
        markRecipeBought(recipeFor(itemId));
        return { ok: true, message: "Learned " + itemId + "." };
    }

    if (shared) {
        if (ownsShared(shared)) {
            const r = setSharedOwned(shared, false);
            if (!r.ok) return r;
        }
    } else {
        const made = [itemId].concat(upgradedVersions(itemId)).filter(ownsItem);
        const blocked = made.find(isEquipped);
        if (blocked) return { ok: false, message: blocked + " is equipped. Swap it out in the game first, then untick the recipe." };
        made.forEach(x => removeFromObjectArray(gs.ItemInventory, x));
    }
    [itemId].concat(upgradedVersions(itemId)).forEach(x => { if (hasRecipe(x)) markRecipeNotBought(recipeFor(x)); });
    return { ok: true, message: "Forgot " + itemId + "." };
}


/*____________________________ WEAPON CARDS ____________________________
    Like the game's weapon screen: each hero has two weapons. For each one, the weapon
    itself (part A) is listed first, then its two parts, B and C.
*/

const WEAPON_TYPE_NAMES = {
    SWORD: "Sword", WARHAMMER: "War Hammer", STAFF: "Staff", WAND: "Wand",
    DUAL_BLADES: "Dual Blades", BOW: "Bow", WARBELL: "Warbell", SPEAR: "Spear",
    HAMMER: "Hammer", CROSSBOW: "Crossbow", GAUNTLET: "Clawed Gauntlet", KNIVES: "Throwing Knives"
};

function weaponTypeNames(heroId) {
    return allHeroesData[heroId].itemNames.weaponNames.map(n => n.replace(/^_/, ""));
}

function weaponCardTableId(heroId, type) {
    return allHeroesData[heroId].tableIds.weaponTableId + "_" + type;
}

function weaponCardHeaderRow() {
    const tr = document.createElement("tr");
    ["ID", "BASE", "UPGRADED"].forEach(text => {
        const th = document.createElement("th");
        th.textContent = text;
        tr.appendChild(th);
    });
    return tr;
}

// Replaces each hero's single weapons table with one table per weapon (made once, on load)
function buildWeaponCards() {
    HERO_IDS.forEach(heroId => {
        const wrapperId = allHeroesData[heroId].tableIds.weaponTableId;
        const old = document.getElementById(wrapperId);
        if (!old || old.tagName !== "TABLE") return;
        const wrapper = document.createElement("div");
        wrapper.id = wrapperId;
        wrapper.className = "weapon-cards";
        weaponTypeNames(heroId).forEach(type => {
            const card = document.createElement("div");
            card.className = "table-container weapon-card";
            const title = document.createElement("h3");
            title.className = "weapon-name";
            title.textContent = WEAPON_TYPE_NAMES[type] || type;
            card.appendChild(title);
            const table = document.createElement("table");
            table.id = weaponCardTableId(heroId, type);
            table.appendChild(weaponCardHeaderRow());
            card.appendChild(table);
            wrapper.appendChild(card);
        });
        old.replaceWith(wrapper);
    });
}

// The rows for one weapon: part A, then B, then C, each under its own heading
function weaponCardRows(ids, type) {
    const mine = ids.filter(id => id.startsWith("WEAPON_PART_A_" + type + "_") ||
                                  id.startsWith("WEAPON_PART_B_" + type + "_") ||
                                  id.startsWith("WEAPON_PART_C_" + type + "_"));
    const rows = [];
    [["A", "Weapon (part A)"], ["B", "Part B"], ["C", "Part C"]].forEach(([slot, label]) => {
        const list = mine.filter(id => id.startsWith("WEAPON_PART_" + slot + "_"));
        if (!list.length) return;
        rows.push({ divider: label });
        list.forEach(id => rows.push(id));
    });
    return rows;
}

function buildPartDividerRow(text, columns) {
    const tr = document.createElement("tr");
    tr.className = "part-divider";
    const td = document.createElement("td");
    td.colSpan = columns;
    td.textContent = text;
    tr.appendChild(td);
    return tr;
}


function ensurePlusRecipeHeader(table) {
    const head = table.rows[0];
    if (!head || head.querySelector("th[data-col=plusrecipe]")) return;
    const upgraded = [...head.cells].find(c => c.textContent.trim() === "UPGRADED");
    const th = document.createElement("th");
    th.dataset.col = "plusrecipe";
    th.textContent = "PLUS RECIPE";
    head.insertBefore(th, upgraded || null);
}


/*____________________________ ENEMIES TAB ____________________________
    The game reveals an enemy's weaknesses and resistances one at a time. In
    DiscoveredEnemyVulnerabilities, bit n (n >= 1) of an enemy's flags is its nth weakness or
    resistance in the catalog's order (weaknesses first). Bit 0 isn't understood and is ignored;
    it is set on every fully revealed enemy, so it's set whenever an enemy is made known.
    Known = every entry revealed. Incomplete = met, some still hidden. Not known = no entry.
*/

function enemyEntry(e) {
    const hash = il2cppHash(e.id);
    return discoveredList().find(x => x.EnemyIdHash === hash);
}

// Whether the nth weakness/resistance (counting from 0) of an enemy is revealed
function enemyRevealed(entry, index) {
    return !!entry && ((entry.VulnerabilityFlags >> (index + 1)) & 1) === 1;
}

function enemyProgress(e) {
    const entry = enemyEntry(e);
    let revealed = 0;
    e.wr.forEach((tag, i) => { if (enemyRevealed(entry, i)) revealed++; });
    return { entry: entry, seen: !!entry, revealed: revealed, total: e.wr.length, full: !!entry && revealed === e.wr.length };
}

// Reveal everything about an enemy, or forget it
function setEnemyKnown(e, known) {
    const list = discoveredList();
    const hash = il2cppHash(e.id);
    if (known) {
        const entry = enemyEntry(e);
        if (entry) entry.VulnerabilityFlags |= enemyFullFlags(e);
        else list.push({ EnemyIdHash: hash, VulnerabilityFlags: enemyFullFlags(e) });
    } else {
        gameState().DiscoveredEnemyVulnerabilities = list.filter(x => x.EnemyIdHash !== hash);
    }
}

function enemyLabel(e, progress) {
    const wrap = document.createElement("span");
    wrap.className = "item-label";
    wrap.title = otherName(e);
    const text = document.createElement("span");
    text.className = "item-label-text";
    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = pickName(e);
    const id = document.createElement("span");
    id.className = "item-id-label";
    id.textContent = e.id;
    text.appendChild(name);
    text.appendChild(id);
    if (progress.seen) {
        const flags = document.createElement("span");
        flags.className = "enemy-flags";
        flags.title = "The number the save stores for this enemy";
        flags.textContent = "flags " + progress.entry.VulnerabilityFlags;
        text.appendChild(flags);
    }
    wrap.appendChild(text);
    return wrap;
}

// Tags for one column: solid for a revealed weakness or resistance, dashed for one still hidden
function enemyTags(e, kind, progress) {
    const td = document.createElement("td");
    e.wr.forEach((tag, index) => {
        if (!tag.endsWith(":" + kind)) return;
        const revealed = enemyRevealed(progress.entry, index);
        const span = document.createElement("span");
        span.className = "vuln-tag " + (kind === "W" ? "weak" : "resist") + (revealed ? "" : " missing");
        span.title = revealed ? "Revealed" : "Not revealed yet";
        span.textContent = tag.split(":")[0];
        td.appendChild(span);
    });
    return td;
}

function enemyRow(e) {
    const progress = enemyProgress(e);
    const tr = document.createElement("tr");
    tr.dataset.search = (e.en + " " + e.es + " " + e.id).toLowerCase();

    const tdName = document.createElement("td");
    tdName.appendChild(enemyLabel(e, progress));
    tr.appendChild(tdName);

    const tdRevealed = document.createElement("td");
    tdRevealed.classList.add("checkbox-container");
    const cb = document.createElement("input");
    cb.type = "checkbox";
    cb.dataset.enemyId = e.id;
    cb.checked = progress.full;
    cb.setAttribute("aria-label", e.en + " revealed");
    cb.onchange = () => {
        setEnemyKnown(e, cb.checked);
        buildCompleteGUI();
    };
    tdRevealed.appendChild(cb);
    tr.appendChild(tdRevealed);

    tr.appendChild(enemyTags(e, "W", progress));
    tr.appendChild(enemyTags(e, "R", progress));
    return tr;
}

// The enemies the tab lists: all of them, or only Act 1 ones while Act 2 content is hidden
function listedEnemies() {
    return ENEMIES.filter(e => !(act2Hidden && e.act === 2));
}

function buildEnemyGUI() {
    const table = document.getElementById("enemiesAll");
    if (!table || !completeSave) return;
    const list = listedEnemies().sort((a, b) => a.en.localeCompare(b.en) || a.id.localeCompare(b.id));
    buildTable(table, list, enemyRow);
    refreshEnemyCount();
}

// The search box: show only the enemies whose name or ID contains what was typed
function applyEnemyFilter() {
    const box = document.getElementById("enemySearch");
    const table = document.getElementById("enemiesAll");
    if (!box || !table) return;
    const query = box.value.trim().toLowerCase();
    [...table.querySelectorAll("tr")].slice(1).forEach(tr => {
        if (tr.classList.contains("act-divider")) tr.hidden = !!query;
        else if (tr.dataset.search !== undefined) tr.hidden = !!query && !tr.dataset.search.includes(query);
    });
}


/*____________________________ MISSIONS (EXPERIMENTAL) ____________________________
    Marks missions done, picks which ones the map offers, and keeps the places that
    follow them in step. Meant for replaying missions after an act is finished. Changing
    missions can cause progression problems nobody has mapped, and the page says so.
    Worked out from five saves (see docs/SAVE_FILE_NOTES.md): Act 1 from a before/after pair
    around one mission, Act 2 from one finished save only. Act 1 has had light testing in the game, Act 2 none.

    Finishing a mission in a real Act 1 save changed:
    - GameState.ActiveDestinationIds: the mission leaves (events sit in this list too)
    - GameState.CompletedDestinationIds: the mission is added
    - GameState.CampaignLogEntries: { EntryId, EntryType: 0, DateCompleted: "MM/DD/YYYY" }
    - the Act 1 blackboard: Quest_<n> (Quest_S<n> for a side quest) = WIN or LOST
    - the WorldMapDT blackboard: CurDestId and "Local Last Quest" = the mission just done
    - the @Global_BB blackboard: CampaignProgression = 18 + 2 x missions done
    Act 2 uses the same lists and log, with ACT2_QUEST_<n> IDs, plus the @Act_2_BB blackboard:
    Quest_<n> = WIN and "Most Recent Quest" = the last Act 2 mission done. Its map blackboard
    (Act_2_WorldMap_DT) keeps the hub in CurDestId, so that is left alone, and its two counters
    (Number of A2 Quests Played, Quest Count) are left alone because they are not understood.
    Not touched on purpose: UnavailableHeroes, gold, XP, feat rerolls, events, enemy flags.
*/

const MISSION_RESULTS = ["WIN", "LOST"];

// What the map offered in saves we have seen, keyed by the missions that were done
const MISSION_OPENINGS = [
    { done: ["STORY_QUEST_1"], open: ["STORY_QUEST_2", "STORY_QUEST_3"] },
    { done: ["STORY_QUEST_1", "STORY_QUEST_2", "STORY_QUEST_3"], open: ["STORY_QUEST_4_S", "STORY_QUEST_5"] }
];

function buildMissionCatalog() {
    const list = [];
    for (let n = 1; n <= 14; n++) {
        list.push({ id: n === 4 ? "STORY_QUEST_4_S" : "STORY_QUEST_" + n, label: "Quest " + n,
                    key: "Quest_" + n, act: 1 });
    }
    for (let n = 1; n <= 2; n++) {
        list.push({ id: "SIDE_QUEST_" + n, label: "Side quest " + n, key: "Quest_S" + n, act: 1 });
    }
    for (let n = 1; n <= 11; n++) {
        list.push({ id: "ACT2_QUEST_" + n, label: "Act 2 quest " + n, key: "Quest_" + n, act: 2 });
    }
    return list;
}
const MISSION_CATALOG = buildMissionCatalog();
const MISSION_BY_ID = {};
MISSION_CATALOG.forEach(m => { MISSION_BY_ID[m.id] = m; });

var missionDraft = null;        // { rows: [...], save: completeSave }
var missionsWarnedFor = null;   // the save the "unknown progression issues" question was answered for
var missionsOptionsFor = null;  // the save the progression checkbox was last reset for

// An Act 2 campaign (Act is 1); an Act 1 campaign has Act 0
function isAct2Campaign() {
    return !!completeSave.Act;
}

// Act 2 missions are listed for an Act 2 campaign, or when the save already has some
function showAct2Missions() {
    if (isAct2Campaign()) return true;
    const gs = gameState();
    return [].concat(gs.CompletedDestinationIds || [], gs.ActiveDestinationIds || [])
             .some(id => /^ACT2_QUEST_/.test(id));
}

function escapeRegExp(text) {
    return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function findEntity(test) {
    return (completeSave.GameSceneData.SceneEntities || []).find(test);
}

function act1Blackboard() {
    return findEntity(e => /^@Act_1_BB/.test(e.Name) && /"Quest_1":\{/.test(e.SerializedBlackboard || ""));
}

function act2Blackboard() {
    return findEntity(e => /^@Act_2_BB/.test(e.Name) && /"Quest_1":\{/.test(e.SerializedBlackboard || ""));
}

// Reads a string variable out of a blackboard's text; null when it has no value
function readBlackboardString(text, name) {
    const m = new RegExp('"' + escapeRegExp(name) + '":\\{"_value":"([^"]*)"').exec(text || "");
    return m ? m[1] : null;
}

// Edits the text directly (like setShopExtraSlots) so the rest stays as the game wrote it.
// Returns true when the variable was found.
function writeBlackboardValue(entity, field, name, value, isNumber) {
    if (!entity) return false;
    const text = entity[field] || "";
    const literal = isNumber ? String(value) : '"' + value + '"';
    const keyEsc = escapeRegExp(name);
    const withValue = new RegExp('("' + keyEsc + '":\\{"_value":)(?:"[^"]*"|-?\\d+(?:\\.\\d+)?)');
    if (withValue.test(text)) {
        entity[field] = text.replace(withValue, (all, head) => head + literal);
        return true;
    }
    const bare = '"' + name + '":{';
    if (text.includes(bare)) {
        entity[field] = text.replace(bare, bare + '"_value":' + literal + ",");
        return true;
    }
    return false;
}

function todayAsGameDate() {
    const d = new Date();
    const p = n => String(n).padStart(2, "0");
    return p(d.getMonth() + 1) + "/" + p(d.getDate()) + "/" + d.getFullYear();
}

// One row per mission the editor knows, plus any other finished mission the save lists
function buildMissionRows() {
    const gs = gameState();
    const completed = gs.CompletedDestinationIds || [];
    const active = gs.ActiveDestinationIds || [];
    const bb1 = act1Blackboard();
    const bb2 = act2Blackboard();
    const showAct2 = showAct2Missions();
    const rows = [];
    MISSION_CATALOG.forEach(m => {
        if (m.act === 2 && !showAct2) return;
        const board = m.act === 1 ? bb1 : bb2;
        const saved = board ? readBlackboardString(board.SerializedBlackboard, m.key) : null;
        const done = completed.includes(m.id);
        rows.push({
            id: m.id, label: m.label, key: m.key, act: m.act, custom: false,
            done: done, open: active.includes(m.id),
            result: saved || (m.act === 1 && !done ? "UNPLAYED" : (done ? "WIN" : "")),
            hasResult: saved !== null
        });
    });
    completed.forEach(id => {
        if (MISSION_BY_ID[id]) return;
        rows.push({ id: id, label: "Other mission", key: null, act: 1, custom: true,
                    done: true, open: false, result: "", hasResult: false });
    });
    rows.forEach(r => { r.initial = JSON.stringify([r.done, r.open, r.result]); });
    return rows;
}

function missionRowDirty(r) {
    return JSON.stringify([r.done, r.open, r.result]) !== r.initial;
}

function missionsDirty() {
    return !!(missionDraft && missionDraft.save === completeSave && missionDraft.rows.some(missionRowDirty));
}

function plannedProgression() {
    const gs = gameState();
    const completed = gs.CompletedDestinationIds || [];
    const draftIds = new Set(missionDraft.rows.map(r => r.id));
    const kept = completed.filter(id => !draftIds.has(id)).length;
    const done = missionDraft.rows.filter(r => r.done).length;
    return 18 + 2 * (kept + done);
}

function currentProgression() {
    const bb = getBlackboard();
    const m = bb && /"CampaignProgression":\{"_value":(-?\d+)/.exec(bb.SerializedBlackboard || "");
    return m ? parseInt(m[1]) : null;
}

function missionsSetsProgression() {
    const box = document.getElementById("missionsSetProgression");
    return !box || box.checked;
}

function refreshMissionNote() {
    const note = document.getElementById("missionsProgress");
    const dirty = document.getElementById("missionsDirty");
    if (!note || !missionDraft) return;
    const current = currentProgression();
    if (current === null) {
        note.textContent = "This save has no campaign progression number.";
    } else if (!missionsSetsProgression()) {
        note.textContent = "Campaign progression: " + current + " (it will be left as it is).";
    } else {
        note.textContent = "Campaign progression: " + current + ". After applying: " + plannedProgression() + ".";
    }
    dirty.textContent = missionsDirty() ? "You have changes that aren't applied yet. Press Apply mission changes." : "";
    document.getElementById("missionsApply").disabled = !missionsDirty();
    document.getElementById("missionsRevert").disabled = !missionsDirty();
}

function missionLabelCell(r) {
    const wrap = document.createElement("span");
    wrap.className = "item-label";
    const text = document.createElement("span");
    text.className = "item-label-text";
    const name = document.createElement("span");
    name.className = "item-name";
    name.textContent = r.label;
    text.appendChild(name);
    const id = document.createElement("span");
    id.className = "item-id-label";
    id.textContent = r.id;
    text.appendChild(id);
    wrap.appendChild(text);
    return wrap;
}

function missionResultWord(value) {
    return value === "WIN" ? "Won" : value === "LOST" ? "Lost" : value === "UNPLAYED" ? "Not played" : value;
}

// Act 2 results can't be edited: only WIN has been seen there, and the word for "not played" isn't known.
// A mission that is un-done keeps what the save says; one that is done and has no result gets WIN.
function act2ResultText(r) {
    if (r.done) return missionResultWord(r.hasResult && r.result ? r.result : "WIN");
    if (r.hasResult && r.result) return missionResultWord(r.result) + " (kept as saved)";
    return "Not played";
}

function updateMissionRow(r, tr) {
    const done = tr.querySelector(".mission-done");
    const open = tr.querySelector(".mission-open");
    const result = tr.querySelector(".mission-result");
    const fixed = tr.querySelector(".mission-result-fixed");
    done.checked = r.done;
    open.checked = r.open && !r.done;
    open.disabled = r.done;
    if (result) {
        result.value = r.result || "UNPLAYED";
        result.disabled = !r.done;
    }
    if (fixed) fixed.textContent = act2ResultText(r);
    tr.classList.toggle("mission-changed", missionRowDirty(r));
}

function buildMissionsGUI() {
    const table = document.getElementById("missionsTable");
    if (!table || !completeSave) return;
    if (!missionDraft || missionDraft.save !== completeSave) {
        missionDraft = { save: completeSave, rows: buildMissionRows() };
    }
    if (missionsOptionsFor !== completeSave) {
        document.getElementById("missionsSetProgression").checked = true;
        missionsOptionsFor = completeSave;
    }
    [...table.querySelectorAll("tr")].slice(1).forEach(tr => tr.remove());
    const hasAct2Rows = missionDraft.rows.some(r => r.act === 2);
    document.getElementById("missionsAct2Note").style.display = isAct2Campaign() ? "" : "none";
    document.getElementById("missionsAct2Btn").style.display = hasAct2Rows ? "" : "none";

    missionDraft.rows.forEach(r => {
        const tr = document.createElement("tr");
        const c0 = tr.insertCell();
        c0.appendChild(missionLabelCell(r));
        if (r.act === 2) {
            const badge = document.createElement("span");
            badge.className = "act-badge always-shown";
            badge.textContent = "Act 2";
            c0.appendChild(badge);
        }

        const c1 = tr.insertCell();
        const done = document.createElement("input");
        done.type = "checkbox";
        done.className = "mission-done";
        done.setAttribute("aria-label", r.label + " done");
        done.onchange = () => {
            r.done = done.checked;
            if (r.done) {
                r.open = false;
                if (!r.custom && r.act === 1 && (!r.result || r.result === "UNPLAYED")) r.result = "WIN";
            } else if (!r.custom && r.act === 1) {
                r.result = "UNPLAYED";
            }
            updateMissionRow(r, tr);
            refreshMissionNote();
        };
        c1.appendChild(done);

        const c2 = tr.insertCell();
        if (r.custom) {
            c2.textContent = "n/a";
        } else if (r.act === 2) {
            const fixed = document.createElement("span");
            fixed.className = "mission-result-fixed";
            c2.appendChild(fixed);
        } else {
            const sel = document.createElement("select");
            sel.className = "mission-result blue-button";
            sel.setAttribute("aria-label", r.label + " result");
            const options = ["UNPLAYED"].concat(MISSION_RESULTS);
            if (r.result && !options.includes(r.result)) options.push(r.result);
            options.forEach(v => {
                const o = document.createElement("option");
                o.value = v;
                o.textContent = ["WIN", "LOST", "UNPLAYED"].includes(v) ? missionResultWord(v) : v + " (as saved)";
                sel.appendChild(o);
            });
            sel.onchange = () => { r.result = sel.value; updateMissionRow(r, tr); refreshMissionNote(); };
            c2.appendChild(sel);
        }

        const c3 = tr.insertCell();
        const open = document.createElement("input");
        open.type = "checkbox";
        open.className = "mission-open";
        open.setAttribute("aria-label", r.label + " open on the map");
        open.onchange = () => { r.open = open.checked; updateMissionRow(r, tr); refreshMissionNote(); };
        c3.appendChild(open);

        table.appendChild(tr);
        updateMissionRow(r, tr);
    });
    refreshMissionNote();
}

function missionsStatus(text) {
    document.getElementById("missionsStatus").textContent = text;
}

// act: 1 or 2 for just that act's missions, nothing for every mission listed
function missionsMarkAll(done, act) {
    if (!missionDraft) return;
    missionDraft.rows.forEach(r => {
        if (r.custom || (act && r.act !== act)) return;
        r.done = done;
        r.open = false;
        if (r.act === 1) r.result = done ? (r.result && r.result !== "UNPLAYED" ? r.result : "WIN") : "UNPLAYED";
    });
    buildMissionsGUI();
    missionsStatus(!done ? "All missions marked not done. Press Apply mission changes."
                  : act === 2 ? "All Act 2 missions marked done. Press Apply mission changes."
                              : "All Act 1 missions marked done. Press Apply mission changes.");
}

// Open what the map offered in the saves we have seen, when this combination of finished missions is one of them
function missionsSuggestOpen() {
    if (!missionDraft) return;
    const doneIds = missionDraft.rows.filter(r => r.done).map(r => r.id).sort().join(",");
    const known = MISSION_OPENINGS.find(o => o.done.slice().sort().join(",") === doneIds);
    if (!known) {
        missionsStatus("The editor has no record of what opens after this combination of missions. " +
                       "Tick the ones to open yourself.");
        return;
    }
    missionDraft.rows.forEach(r => { if (!r.done) r.open = known.open.includes(r.id); });
    buildMissionsGUI();
    missionsStatus("Open on the map: " + known.open.length + ", as in a save with these missions done.");
}

function missionsRevert() {
    if (!missionDraft) return;
    missionDraft = null;
    buildMissionsGUI();
    missionsStatus("Changes discarded.");
}

function applyMissions() {
    if (!completeSave || !missionDraft) return;
    if (!missionsDirty()) { missionsStatus("Nothing to apply."); return; }
    // Asked once for each save that is loaded
    if (missionsWarnedFor !== completeSave) {
        if (!confirm("Changing missions can cause unknown progression problems. " +
                     "It is meant for replaying missions after an act is complete.\n\nApply the changes?")) return;
        missionsWarnedFor = completeSave;
    }
    const gs = gameState();
    const rows = missionDraft.rows;
    const byId = {};
    rows.forEach(r => { byId[r.id] = r; });
    const act2Changed = rows.some(r => r.act === 2 && missionRowDirty(r));

    // Completed list: keep the order of what stays done, then add the new ones in mission order
    const oldCompleted = gs.CompletedDestinationIds || [];
    const kept = oldCompleted.filter(id => !byId[id] || byId[id].done);
    const added = rows.filter(r => r.done && !oldCompleted.includes(r.id)).map(r => r.id);
    const newCompleted = kept.concat(added);
    const removed = oldCompleted.filter(id => byId[id] && !byId[id].done);
    gs.CompletedDestinationIds = newCompleted;

    // Open on the map: events and anything the editor doesn't know stay where they are
    const oldActive = gs.ActiveDestinationIds || [];
    const stillOpen = oldActive.filter(id => !byId[id] || (byId[id].open && !byId[id].done));
    const newlyOpen = rows.filter(r => r.open && !r.done && !stillOpen.includes(r.id)).map(r => r.id);
    gs.ActiveDestinationIds = stillOpen.concat(newlyOpen);

    // The campaign log: add a dated entry for each new one, drop the entries of missions no longer done
    const date = todayAsGameDate();
    const log = (gs.CampaignLogEntries || []).filter(e => !(e.EntryType === 0 && removed.includes(e.EntryId)));
    added.forEach(id => {
        if (!log.some(e => e.EntryId === id)) log.push({ EntryId: id, EntryType: 0, DateCompleted: date });
    });
    gs.CampaignLogEntries = log;

    // The results in the Act 1 and Act 2 blackboards
    const missing = [];
    rows.forEach(r => {
        if (r.custom || !r.key) return;
        if (r.act === 2) {
            // Only WIN has been seen in Act 2, and the word for "not played" isn't known:
            // a mission that is un-done keeps what it has; one that is done gets WIN if it has nothing
            if (!r.done || (r.hasResult && r.result && r.result !== "UNPLAYED")) return;
            if (!writeBlackboardValue(act2Blackboard(), "SerializedBlackboard", r.key, "WIN", false)) missing.push(r.key);
            return;
        }
        const value = r.done ? (r.result && r.result !== "UNPLAYED" ? r.result : "WIN") : "UNPLAYED";
        if (!writeBlackboardValue(act1Blackboard(), "SerializedBlackboard", r.key, value, false)) {
            if (r.done || r.hasResult) missing.push(r.key);
        }
    });

    // Act 1 map: where it thinks you are is the last mission finished. (Act 2's map keeps the hub there.)
    const last = newCompleted.length ? newCompleted[newCompleted.length - 1] : null;
    const map = findEntity(e => e.Name === "WorldMapDT");
    if (map && last) {
        writeBlackboardValue(map, "SerializedDTC", "CurDestId", last, false);
        writeBlackboardValue(map, "SerializedDTC", "Local Last Quest", last, false);
    }

    // Act 2: "Most Recent Quest" is the last Act 2 mission in the completed list
    if (act2Changed) {
        const lastAct2 = newCompleted.slice().reverse().find(id => /^ACT2_QUEST_\d+$/.test(id));
        if (lastAct2) writeBlackboardValue(act2Blackboard(), "SerializedBlackboard", "Most Recent Quest", lastAct2, false);
    }

    // The progression number the game scales enemies and loot with: 18 + 2 per mission done
    const progression = 18 + 2 * newCompleted.length;
    const setProgression = missionsSetsProgression();
    const wrote = setProgression &&
                  writeBlackboardValue(getBlackboard(), "SerializedBlackboard", "CampaignProgression", progression, true);

    missionDraft = null;
    buildMissionsGUI();
    let text = "Applied. Missions done: " + newCompleted.length + ". Open on the map: " +
               gs.ActiveDestinationIds.filter(id => byId[id]).length + ".";
    if (!setProgression) text += " Campaign progression was left as it is.";
    else if (wrote) text += " Campaign progression is now " + progression + ".";
    else text += " This save has no campaign progression number, so none was set.";
    if (act2Changed) text += " The Act 2 counters were left as they are.";
    if (missing.length) text += " Couldn't find a result entry for: " + missing.join(", ") + ".";
    missionsStatus(text);
}


/*____________________________ NEW GAME+ (EXPERIMENTAL) ____________________________
    Starts the story again from Quest 1 and keeps what you earned. It works the other way round
    from "Reset to default": that keeps the story and resets the gear; this keeps the gear
    and resets the story.

    The story state (missions, events, quest results, story choices, the map, the shop, difficulty,
    the party name, tutorials) is not something that can be written from scratch: it differs between
    Act 1 and Act 2 and between campaigns, and the Act 1 map is not even in an Act 2 save. So the editor
    does not reset a save in place. It takes the save of a brand-new campaign made by the game itself
    and moves the things below into it. The save that is open is never changed.

    Moved from the open save into the new campaign's save:
    - GameState: Gold, CraftingMaterials, ItemInventory, DiscoveredRecipes, SharedWeaponIds,
      UnlockedSkills, RealCompletedFeats, CompletedFeats, PendingNewFeatIds, PendingNewFeatHashIds,
      FeatProgresses, DiscoveredEnemyVulnerabilities (the same things "Reset to default" resets,
      plus the enemy weaknesses)
    - each hero: EquippedWeaponIndex, EquippedTrinketId, EquippedWeapons, DefaultWeaponsBuild
      (both copies of AllPlayers), and VirtueOneValue / VirtueTwoValue unless the one tick box
      resets the virtues of all heroes
    Everything else is the new campaign's, including Legends and companions (they come from the
    Act 2 story), PartyXP and the feat rerolls.
    If the new campaign doesn't own Act 2, Act 2 items, skills, feats and enemies are left out.
*/

const NGPLUS_STATE_KEYS = ["Gold", "CraftingMaterials", "ItemInventory", "DiscoveredRecipes", "SharedWeaponIds",
    "UnlockedSkills", "RealCompletedFeats", "CompletedFeats", "PendingNewFeatIds", "PendingNewFeatHashIds",
    "FeatProgresses", "DiscoveredEnemyVulnerabilities"];
const NGPLUS_GEAR_KEYS = ["EquippedWeaponIndex", "EquippedTrinketId", "EquippedWeapons", "DefaultWeaponsBuild"];

var ngPlus = { fresh: null, freshName: "", result: null, resultName: "" };

function ownsAct2Save(save) {
    const gsx = (save.GameSceneData && save.GameSceneData.GameState) || {};
    return [].concat(save.ProductIDs || [], gsx.OwnedProductIDs || []).includes("PRODUCT_ACT_2");
}

const ACT2_WEAPON_IDS = sharedWeaponDefs.filter(d => ACT2_SHARED_WEAPONS.includes(d.key)).map(d => d.weaponId);

function ngPlusIsAct2(id) {
    const clean = String(id || "").trim();
    return !!clean && (isAct2Item(clean) || ACT2_WEAPON_IDS.includes(clean));
}

// Does this hero's gear use anything that only exists with Act 2?
function ngPlusGearUsesAct2(p) {
    if (ngPlusIsAct2(p.EquippedTrinketId)) return true;
    return [].concat(p.EquippedWeapons || [], p.DefaultWeaponsBuild || []).some(w =>
        [w.Id, w.PartAId, w.PartBId, w.PartCId].some(ngPlusIsAct2));
}

// Checks a chosen save before it is used as the new campaign
function ngPlusCheckFresh(fresh, loaded) {
    const errors = [], warnings = [];
    const gsx = fresh && fresh.GameSceneData && fresh.GameSceneData.GameState;
    if (!gsx || !Array.isArray(fresh.AllPlayers || (gsx && gsx.AllPlayers))) {
        errors.push("That file doesn't look like a Legends of the Dark save.");
        return { errors, warnings };
    }
    if (fresh.SlotGUID && fresh.SlotGUID === loaded.SlotGUID) {
        errors.push("That is the same campaign as the save you have open. Choose the save of a new campaign.");
    }
    if (fresh.Act) {
        warnings.push("That is an Act 2 campaign. New Game+ is meant to start from a new Act 1 campaign.");
    }
    const done = (gsx.CompletedDestinationIds || []).length;
    if (done > 0) {
        warnings.push("That campaign already has " + done + (done === 1 ? " finished mission" : " finished missions") +
                      ", so it doesn't look brand new.");
    }
    return { errors, warnings };
}

// Builds the New Game+ save. Returns { save, report } and never changes `loaded` or `fresh`.
function buildNewGamePlus(fresh, loaded, opts) {
    const clone = x => JSON.parse(JSON.stringify(x));
    const out = clone(fresh);
    const from = loaded.GameSceneData.GameState;
    const to = out.GameSceneData.GameState;
    const allowAct2 = ownsAct2Save(fresh);
    const report = { counts: {}, leftOut: {}, notes: [] };
    const leave = (what, n) => { if (n > 0) report.leftOut[what] = (report.leftOut[what] || 0) + n; };

    // Lists of IDs or of objects with an ID: drop the Act 2 ones when the new campaign can't hold them
    const carryList = (key, getId) => {
        if (!Array.isArray(from[key])) return;
        let list = clone(from[key]);
        if (!allowAct2 && getId) {
            const kept = list.filter(x => !ngPlusIsAct2(getId(x)));
            leave(key, list.length - kept.length);
            list = kept;
        }
        to[key] = list;
        report.counts[key] = list.length;
    };
    carryList("ItemInventory", x => x.Id);
    carryList("DiscoveredRecipes", x => x.Id);
    carryList("CraftingMaterials", null);
    carryList("SharedWeaponIds", x => x);
    carryList("UnlockedSkills", x => x);
    carryList("RealCompletedFeats", x => x);
    carryList("CompletedFeats", x => (typeof x === "string" ? x : ""));
    carryList("PendingNewFeatIds", x => (typeof x === "string" ? x : ""));
    carryList("PendingNewFeatHashIds", null);
    carryList("FeatProgresses", x => x.RealFeatId);
    if (Array.isArray(from.DiscoveredEnemyVulnerabilities)) {
        const hashes = knownEnemyHashes();
        let list = clone(from.DiscoveredEnemyVulnerabilities);
        if (!allowAct2) {
            const kept = list.filter(v => { const e = hashes.get(v.EnemyIdHash); return !(e && e.act === 2); });
            leave("DiscoveredEnemyVulnerabilities", list.length - kept.length);
            list = kept;
        }
        to.DiscoveredEnemyVulnerabilities = list;
        report.counts.DiscoveredEnemyVulnerabilities = list.length;
    }
    if (typeof from.Gold === "number") { to.Gold = from.Gold; report.counts.Gold = from.Gold; }

    // Shop: it stays the new campaign's, but whatever is now owned comes off the shelves,
    // so buying it can't make a duplicate (the same as "I want it all" does)
    const known = new Set((to.DiscoveredRecipes || []).map(r => r.Id.trim()));
    const ownedIds = new Set((to.ItemInventory || []).map(i => i.Id));
    let shelved = 0;
    (to.ShopData || []).forEach(entry => {
        if (entry.qty <= 0) return;
        const id = entry.id.trim();
        if (id.startsWith("MAT_")) return;
        const owned = id.startsWith("RECIPE_") ? known.has(id)
            : ownedIds.has(id) || ownedIds.has(id + "_PLUS") || ownedIds.has(id + "_UPGRADED");
        if (owned) { entry.qty = 0; shelved++; }
    });
    report.counts.shelved = shelved;

    // Heroes: gear and virtues, in both copies of AllPlayers
    const source = Array.isArray(loaded.AllPlayers) ? loaded.AllPlayers : (from.AllPlayers || []);
    const heroNotes = {};
    [out.AllPlayers, to.AllPlayers].forEach(list => {
        if (!Array.isArray(list)) return;
        list.forEach(p => {
            const q = source.find(x => x.HeroId === p.HeroId);
            if (!q) return;
            if (opts.keepGear) {
                if (!allowAct2 && ngPlusGearUsesAct2(q)) {
                    const name = p.HeroId.replace("HERO_", "").charAt(0) + p.HeroId.replace("HERO_", "").slice(1).toLowerCase();
                    heroNotes[p.HeroId] = "The new campaign doesn't own Act 2 and " + name +
                        "'s gear uses Act 2 parts, so " + name + " keeps the new campaign's starting gear.";
                } else {
                    NGPLUS_GEAR_KEYS.forEach(k => { if (k in q) p[k] = clone(q[k]); });
                }
            }
            if (!opts.resetVirtueOne && "VirtueOneValue" in q) p.VirtueOneValue = q.VirtueOneValue;
            if (!opts.resetVirtueTwo && "VirtueTwoValue" in q) p.VirtueTwoValue = q.VirtueTwoValue;
        });
    });
    report.notes = Object.keys(heroNotes).map(k => heroNotes[k]);
    report.heroes = source.length;
    return { save: out, report: report };
}

function ngPlusEl(id) { return document.getElementById(id); }

function ngPlusSetStatus(text) { ngPlusEl("ngStatus").textContent = text; }

function openNewGamePlus() {
    if (!completeSave) { alert("Load a save file first."); return; }
    ngPlus = { fresh: null, freshName: "", result: null, resultName: "" };
    ngPlusEl("ngFresh").value = "";
    ngPlusEl("ngFreshInfo").textContent = "";
    ngPlusEl("ngReport").innerHTML = "";
    ngPlusSetStatus("");
    ngPlusRefreshButtons();
    const dialog = ngPlusEl("ngPlusDialog");
    if (typeof dialog.showModal === "function") dialog.showModal(); else dialog.setAttribute("open", "");
}

function closeNewGamePlus() {
    const dialog = ngPlusEl("ngPlusDialog");
    if (typeof dialog.close === "function") dialog.close(); else dialog.removeAttribute("open");
}

function ngPlusRefreshButtons() {
    ngPlusEl("ngBuild").disabled = !ngPlus.fresh;
    ngPlusEl("ngDownload").disabled = !ngPlus.result;
    ngPlusEl("ngOpen").disabled = !ngPlus.result;
}

// A different option or file means the built save is out of date
function ngPlusInvalidate() {
    if (!ngPlus.result) return;
    ngPlus.result = null;
    ngPlusEl("ngReport").innerHTML = "";
    ngPlusSetStatus("Options changed. Press Build New Game+ again.");
    ngPlusRefreshButtons();
}

function ngPlusChooseFresh() {
    const input = ngPlusEl("ngFresh");
    const file = input.files && input.files[0];
    ngPlus.fresh = null;
    ngPlus.result = null;
    ngPlusEl("ngReport").innerHTML = "";
    ngPlusSetStatus("");
    if (!file) { ngPlusEl("ngFreshInfo").textContent = ""; ngPlusRefreshButtons(); return; }
    const fr = new FileReader();
    fr.onload = e => {
        let parsed;
        try { parsed = parseSaveText(e.target.result); }
        catch (err) {
            ngPlusEl("ngFreshInfo").textContent = "This file isn't a readable save: " + err.message;
            ngPlusRefreshButtons();
            return;
        }
        const check = ngPlusCheckFresh(parsed, completeSave);
        const info = ngPlusEl("ngFreshInfo");
        if (check.errors.length) {
            info.textContent = check.errors.join(" ");
        } else {
            ngPlus.fresh = parsed;
            ngPlus.freshName = file.name;
            const gsx = parsed.GameSceneData.GameState;
            info.textContent = "New campaign: " + (parsed.PartyName || "(no name)") + ", " +
                (parsed.Act ? "Act 2" : "Act 1") + ", game version " + parsed.Version + ", " +
                (ownsAct2Save(parsed) ? "owns Act 2." : "doesn't own Act 2.");
            ngPlus.warnings = check.warnings;
            if (check.warnings.length) info.textContent += " " + check.warnings.join(" ");
            ngPlus.questStarted = !!gsx.QuestId;
        }
        ngPlusRefreshButtons();
    };
    fr.readAsText(file);
}

function ngPlusOptions() {
    return {
        keepGear: ngPlusEl("ngKeepGear").checked,
        resetVirtueOne: ngPlusEl("ngResetVirtues").checked,
        resetVirtueTwo: ngPlusEl("ngResetVirtues").checked
    };
}

function ngPlusAddLine(text) {
    const li = document.createElement("li");
    li.textContent = text;
    ngPlusEl("ngReport").appendChild(li);
}

function buildNewGamePlusFromDialog() {
    if (!ngPlus.fresh || !completeSave) return;
    if ((ngPlus.warnings || []).length &&
        !confirm(ngPlus.warnings.join(" ") + "\n\nUse it anyway?")) return;
    const opts = ngPlusOptions();
    const built = buildNewGamePlus(ngPlus.fresh, completeSave, opts);
    ngPlus.result = built.save;
    ngPlus.resultName = nextSaveFileName(ngPlus.freshName);
    const c = built.report.counts;
    ngPlusEl("ngReport").innerHTML = "";
    ngPlusAddLine("Items kept: " + (c.ItemInventory || 0) + ". Recipes kept: " + (c.DiscoveredRecipes || 0) + ".");
    ngPlusAddLine("Materials kept: " + (c.CraftingMaterials || 0) + ". Gold kept: " + (c.Gold || 0) + ".");
    ngPlusAddLine("Skills kept: " + (c.UnlockedSkills || 0) + ". Feats kept: " + (c.RealCompletedFeats || 0) + ".");
    ngPlusAddLine("Enemies with known weaknesses kept: " + (c.DiscoveredEnemyVulnerabilities || 0) + ".");
    ngPlusAddLine(opts.keepGear ? "Each hero's equipped weapons and trinket are kept."
                                : "Each hero starts with the new campaign's weapons and trinket.");
    ngPlusAddLine(opts.resetVirtueOne ? "The virtues of all heroes are reset to the new campaign's."
                                      : "The virtues of all heroes are kept.");
    if (c.shelved) ngPlusAddLine("Took " + c.shelved + " items and recipes you already have off the shop shelves.");
    Object.keys(built.report.leftOut).forEach(k =>
        ngPlusAddLine("Left out because the new campaign doesn't own Act 2: " + built.report.leftOut[k] + " from " + k + "."));
    built.report.notes.forEach(ngPlusAddLine);
    ngPlusSetStatus("Built. The file will be named " + ngPlus.resultName + ". Download it, or open it here to look it over.");
    ngPlusRefreshButtons();
}

function downloadNewGamePlus() {
    if (!ngPlus.result) return;
    saveToFile(ngPlus.result, ngPlus.resultName);
    ngPlusSetStatus("Downloaded " + ngPlus.resultName + ". Replace the new campaign's save with it: copy it into that slot's folder.");
}

// Open the result in the editor (the save that was open is replaced by it)
function openNewGamePlusHere() {
    if (!ngPlus.result) return;
    if (!confirm("Open the New Game+ save in the editor? The save that is open now will be replaced here (the file itself isn't changed).")) return;
    adoptSave(ngPlus.result, ngPlus.resultName);
    closeNewGamePlus();
}


/*____________________________ EVENTS (EXPERIMENTAL) ____________________________
    Narrative events and city events, on the Missions tab. Worked out from the saves, never tried
    in the game, and the evidence is thinner than for missions: no save has an event being played, only
    snapshots of events pending and of events done.

    - A pending narrative event (E2B_BURIED ...) is in GameState.ActiveDestinationIds, next to the missions.
      A done one is in CompletedNarrativeEventIds and has a CampaignLogEntries entry with EntryType 1.
    - A pending city event (CITY_EVENT_0 ...) is in ActiveCityEvents as { ModelId, Position: {x, y} }.
      A done one is in CompletedCityEventIds with a log entry of EntryType 2.
    - Events don't count toward CampaignProgression.
    A city event can be marked done or taken off the town, but not put back: where it was placed is
    only known while it is pending. Nothing here touches the story choices events write into the blackboards.
*/

// The narrative events seen in the one finished campaign, in the order they were played
const EVENT_CATALOG_ACT1 = ["E2B_BURIED", "E3B_THIEF", "E4A_HUNTING", "E4B_CARTHRIDGE", "EC1_ORCS", "E5B_PRICE",
    "EC3_SCOOBY", "E7A_TEACHER", "E8A_RUNESTONE", "E6A_REST", "EC4_MIRROR", "E9C_HORDES", "EC2_CRIME",
    "E13A_WORD", "E12A_EYRIE", "E11A_GUILD"];
const EVENT_CATALOG_ACT2 = ["A2SE17_BOAR_TAMALIR", "A2SE17A_BOAR_TAMALIR", "A2SE14_HAUNTED_WOODS",
    "S2SE10_AFTER_THE_FLAMES", "A2SE15_HAUNTED_SMITHY", "A2SE02_JUST_US", "A2SE18_IRONMONGER", "A2SE19_MURDER_ROAD",
    "A2SE23_TRAINING_DAY", "A2SE05_NEW_FIELD_OF_STUDY", "A2SE16_SPIRITS_EVENTIDE", "A2SE21_HYDRA_SHARD",
    "A2SE11_ANOTHER_ROUND", "SS07_DEATH_AND_BETRAYAL", "A2SE03_WAKING_WORLD", "A2SE12_MY_SHADOW",
    "A2SE06_UNRAVELING", "A2SE20_BURNING_HAND", "A2SE04_COULD_BE_HEROES"];

var eventDraft = null;   // { save, rows }

// An ID in the open list that looks like a narrative event rather than a mission
function looksLikeNarrativeEvent(id) {
    return /^(E\d+[A-Z]?_|EC\d+_|A2SE|S2SE|SS\d+_)/.test(id);
}

// "E2B_BURIED" -> "Buried", "A2SE17_BOAR_TAMALIR" -> "Boar Tamalir", "CITY_EVENT_4" -> "City event 4"
function eventLabel(id) {
    let m = /^CITY_EVENT_(\d+)$/.exec(id);
    if (m) return "City event " + m[1];
    const tokens = id.split("_");
    if (tokens.length > 1 && /^(E\d+[A-Z]?|EC\d+|A2SE\d+A?|S2SE\d+|SS\d+|A2)$/.test(tokens[0])) tokens.shift();
    return tokens.map(t => t.charAt(0) + t.slice(1).toLowerCase()).join(" ");
}

function buildEventRows() {
    const gs = gameState();
    const doneN = new Set(gs.CompletedNarrativeEventIds || []);
    const doneC = new Set(gs.CompletedCityEventIds || []);
    const active = gs.ActiveDestinationIds || [];
    const activeC = gs.ActiveCityEvents || [];
    const kinds = new Map();
    EVENT_CATALOG_ACT1.forEach(id => kinds.set(id, "narrative"));
    if (showAct2Missions()) EVENT_CATALOG_ACT2.forEach(id => kinds.set(id, "narrative"));
    doneN.forEach(id => kinds.set(id, "narrative"));
    active.forEach(id => { if (!MISSION_BY_ID[id] && looksLikeNarrativeEvent(id)) kinds.set(id, "narrative"); });
    doneC.forEach(id => kinds.set(id, "city"));
    activeC.forEach(e => kinds.set(e.ModelId, "city"));
    const rows = [];
    kinds.forEach((kind, id) => {
        const city = kind === "city";
        const placed = city ? activeC.find(e => e.ModelId === id) : null;
        rows.push({
            id: id, kind: kind, label: eventLabel(id),
            done: city ? doneC.has(id) : doneN.has(id),
            pending: city ? !!placed : active.includes(id),
            canPend: !city || !!placed
        });
    });
    // narrative first (in catalog order), then city events
    rows.sort((a, b) => (a.kind === b.kind ? 0 : a.kind === "narrative" ? -1 : 1));
    rows.forEach(r => { r.initial = JSON.stringify([r.done, r.pending]); });
    return rows;
}

function eventRowDirty(r) { return JSON.stringify([r.done, r.pending]) !== r.initial; }

function eventsDirty() {
    return !!(eventDraft && eventDraft.save === completeSave && eventDraft.rows.some(eventRowDirty));
}

function updateEventRow(r, tr) {
    const done = tr.querySelector(".event-done");
    const pend = tr.querySelector(".event-pending");
    done.checked = r.done;
    pend.checked = r.pending && !r.done;
    pend.disabled = r.done || !r.canPend;
    pend.title = r.kind === "city" && !r.canPend ? "Where a city event stands in town is only known while it is pending" : "";
    tr.classList.toggle("mission-changed", eventRowDirty(r));
}

function refreshEventNote() {
    const dirty = document.getElementById("eventsDirty");
    if (!dirty || !eventDraft) return;
    dirty.textContent = eventsDirty() ? "You have event changes that aren't applied yet. Press Apply event changes." : "";
    document.getElementById("eventsApply").disabled = !eventsDirty();
    document.getElementById("eventsRevert").disabled = !eventsDirty();
}

function buildEventsGUI() {
    const table = document.getElementById("eventsTable");
    if (!table || !completeSave) return;
    if (!eventDraft || eventDraft.save !== completeSave) eventDraft = { save: completeSave, rows: buildEventRows() };
    [...table.querySelectorAll("tr")].slice(1).forEach(tr => tr.remove());
    eventDraft.rows.forEach(r => {
        const tr = document.createElement("tr");
        const c0 = tr.insertCell();
        const wrap = document.createElement("span");
        wrap.className = "item-label";
        const text = document.createElement("span");
        text.className = "item-label-text";
        const name = document.createElement("span");
        name.className = "item-name";
        name.textContent = r.label;
        const id = document.createElement("span");
        id.className = "item-id-label";
        id.textContent = r.id;
        text.appendChild(name); text.appendChild(id); wrap.appendChild(text);
        c0.appendChild(wrap);
        tr.insertCell().textContent = r.kind === "city" ? "City" : "Narrative";

        const done = document.createElement("input");
        done.type = "checkbox";
        done.className = "event-done";
        done.setAttribute("aria-label", r.label + " event done");
        done.onchange = () => {
            r.done = done.checked;
            if (r.done) r.pending = false;
            updateEventRow(r, tr);
            refreshEventNote();
        };
        tr.insertCell().appendChild(done);

        const pend = document.createElement("input");
        pend.type = "checkbox";
        pend.className = "event-pending";
        pend.setAttribute("aria-label", r.label + " event pending");
        pend.onchange = () => { r.pending = pend.checked; updateEventRow(r, tr); refreshEventNote(); };
        tr.insertCell().appendChild(pend);

        table.appendChild(tr);
        updateEventRow(r, tr);
    });
    refreshEventNote();
}

function eventsStatus(text) {
    document.getElementById("eventsStatus").textContent = text;
}

function eventsRevert() {
    if (!eventDraft) return;
    eventDraft = null;
    buildEventsGUI();
    eventsStatus("Changes discarded.");
}

function applyEvents() {
    if (!completeSave || !eventDraft) return;
    if (!eventsDirty()) { eventsStatus("Nothing to apply."); return; }
    if (missionsWarnedFor !== completeSave) {
        if (!confirm("Changing missions can cause unknown progression problems. " +
                     "It is meant for replaying missions after an act is complete.\n\nApply the changes?")) return;
        missionsWarnedFor = completeSave;
    }
    const gs = gameState();
    const rows = eventDraft.rows;
    const narrative = rows.filter(r => r.kind === "narrative");
    const city = rows.filter(r => r.kind === "city");
    const byId = {};
    narrative.forEach(r => { byId[r.id] = r; });
    const date = todayAsGameDate();
    let log = (gs.CampaignLogEntries || []).slice();

    // Narrative events: the completed list, the open list and the log
    const oldDone = gs.CompletedNarrativeEventIds || [];
    const newDone = oldDone.filter(id => !byId[id] || byId[id].done)
        .concat(narrative.filter(r => r.done && !oldDone.includes(r.id)).map(r => r.id));
    gs.CompletedNarrativeEventIds = newDone;
    const oldActive = gs.ActiveDestinationIds || [];
    const keptActive = oldActive.filter(id => !byId[id] || (byId[id].pending && !byId[id].done));
    const newActive = narrative.filter(r => r.pending && !r.done && !keptActive.includes(r.id)).map(r => r.id);
    gs.ActiveDestinationIds = keptActive.concat(newActive);
    narrative.forEach(r => {
        const wasDone = oldDone.includes(r.id);
        if (r.done && !wasDone && !log.some(e => e.EntryId === r.id)) log.push({ EntryId: r.id, EntryType: 1, DateCompleted: date });
        if (!r.done && wasDone) log = log.filter(e => !(e.EntryId === r.id && e.EntryType === 1));
    });

    // City events: done ones are taken off the town; a pending one that is unticked is taken off too
    const cityById = {};
    city.forEach(r => { cityById[r.id] = r; });
    const oldDoneC = gs.CompletedCityEventIds || [];
    gs.CompletedCityEventIds = oldDoneC.filter(id => !cityById[id] || cityById[id].done)
        .concat(city.filter(r => r.done && !oldDoneC.includes(r.id)).map(r => r.id));
    if (Array.isArray(gs.ActiveCityEvents)) {
        gs.ActiveCityEvents = gs.ActiveCityEvents.filter(e => !cityById[e.ModelId] ||
            (cityById[e.ModelId].pending && !cityById[e.ModelId].done));
    }
    city.forEach(r => {
        const wasDone = oldDoneC.includes(r.id);
        if (r.done && !wasDone && !log.some(e => e.EntryId === r.id)) log.push({ EntryId: r.id, EntryType: 2, DateCompleted: date });
        if (!r.done && wasDone) log = log.filter(e => !(e.EntryId === r.id && e.EntryType === 2));
    });
    gs.CampaignLogEntries = log;

    eventDraft = null;
    buildEventsGUI();
    eventsStatus("Applied. Narrative events done: " + gs.CompletedNarrativeEventIds.length + ". Open on the map: " +
                 gs.ActiveDestinationIds.filter(id => !MISSION_BY_ID[id] && looksLikeNarrativeEvent(id)).length +
                 ". City events done: " + gs.CompletedCityEventIds.length + ".");
}
