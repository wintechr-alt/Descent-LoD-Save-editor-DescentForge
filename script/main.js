/*
    Per aggiungere un arma o potenziamento di arma basta aggiungere il suo ID in:
        -GameSceneData/GameState/ItemInventory
        -GameSceneData/GameState/DiscoveredRecipies
        -GameSceneData/GameState/AvaiableItemIds

    N.B. forse è sufficiente metterlo solo in AvaiableItemIds, però per evitare che ricompaia in negozio
        lo metterei anche negli altri 2 elenchi
 */
var completeSave;

// Default language
var language = "eng";




// Load save-file content into completeSave
// Reads the save the person chose (or dropped) and builds the editor
function loadFromFile(file) {
    // Check API compatibility
    if (typeof window.FileReader !== 'function') {
        alert("The file API isn't supported on this browser yet.");
        return;
    }
    const fr = new FileReader();
    fr.onload = function (e) {
        // Read all lines of the file
        let lines = e.target.result;
        // Convert all the lines into a single JSON Object (keeping big numbers exact)
        try {
            completeSave = parseSaveText(lines);
        } catch (err) {
            alert("This file isn't a readable save: " + err.message);
            return;
        }
        originalFileName = file.name;
        act2Override = null;
        // An Act 1 campaign starts with the Act 2 content hidden, unless the save already has some
        // (an Act 1 campaign that owns Act 2 can hold Act 2 items); an Act 2 campaign shows it
        act2Hidden = saveIsAct1() && act2ItemsInSave().length === 0;
        showLoaded(file.name);
        // Build the interface to modify the save file
        buildCompleteGUI()
    };
    fr.readAsText(file);
}

// The file box (the save file input): load what was chosen
function loadFile() {
    const input = document.getElementById('fileinput');
    if (!input || !input.files || !input.files[0]) {
        alert("Please select a file before clicking 'Load'");
        return;
    }
    const file = input.files[0];
    input.value = "";            // so choosing the same file again loads it again
    loadFromFile(file);
}

// Once a save is loaded: show the rest of the page and what was loaded
function showLoaded(fileName) {
    document.body.classList.add("has-save");
    document.getElementById("loadStatus").textContent = "Loaded: " + fileName;
    document.getElementById("dropTitle").textContent = "Choose another save file";
    document.getElementById("dropSub").textContent = "or drop it here";
}

// Choosing, dragging and dropping a save file
function setupFileBox() {
    const input = document.getElementById("fileinput");
    const zone = document.getElementById("dropZone");
    input.addEventListener("change", loadFile);
    zone.addEventListener("keydown", e => {
        if (e.key === "Enter" || e.key === " ") { e.preventDefault(); input.click(); }
    });
    // Dropping anywhere on the page works, so a missed drop never opens the file in the browser
    let depth = 0;
    window.addEventListener("dragenter", e => { e.preventDefault(); depth++; zone.classList.add("dragover"); });
    window.addEventListener("dragover", e => { e.preventDefault(); });
    window.addEventListener("dragleave", e => { depth = Math.max(0, depth - 1); if (!depth) zone.classList.remove("dragover"); });
    window.addEventListener("drop", e => {
        e.preventDefault();
        depth = 0;
        zone.classList.remove("dragover");
        const file = e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files[0];
        if (file) loadFromFile(file);
    });
}

// Download the completeSave object into a json file
function downloadUpdatedSaveFile(){
    if (!completeSave) {
        alert("Load a save file first.");
        return;
    }
    // Named one second newer than the original, so the game loads it as the latest save
    const filename = nextSaveFileName(originalFileName);
    // Same layout as the game's own files
    const jsonStr = serializeSave(completeSave);

    // Create a temporary link to download the file(it will not be visible) and auto-click on it
    let tempLink = document.createElement('a');
    tempLink.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(jsonStr));
    tempLink.setAttribute('download', filename);

    tempLink.style.display = 'none';
    document.body.appendChild(tempLink);

    tempLink.click();

    document.body.removeChild(tempLink);
}

// Create the GUI to edit the save file
function buildCompleteGUI(){
    let divSaveData = document.getElementById("saveData");

    // Getting party name
    showPartyName();

    // Filling the gold GUI
    buildGoldGUI();
    // Filling the crafting-materials GUI
    buildCraftingMaterialGUI();
    // Filling the armors GUI
    buildArmorGUI();
    // Filling the trinkets GUI
    buildTrinketGUI();
    // Filling the consumables GUI
    buildConsumableGUI();
    // Weapons any hero can use (Rune of Blades, Ice Storm, ...)
    buildSharedWeaponsGUI();

    // What the party has learned about each enemy
    buildEnemyGUI();

    // Items from custom campaigns that fit no other table
    buildOtherItemsGUI();

    // Filling the shop and recipe GUI
    buildShopGUI();


    // Filling the weapons GUI
    buildWeaponGUI(BRYNN_ID);
    buildWeaponGUI(SYRUS_ID);
    buildWeaponGUI(GALADEN_ID);
    buildWeaponGUI(VAERIX_ID);
    buildWeaponGUI(KEHLI_ID);
    buildWeaponGUI(CHANCE_ID);

    // Filling the skill GUI
    buildSkillGUI(BRYNN_ID);
    buildSkillGUI(SYRUS_ID);
    buildSkillGUI(GALADEN_ID);
    buildSkillGUI(VAERIX_ID);
    buildSkillGUI(KEHLI_ID);
    buildSkillGUI(CHANCE_ID);

    // Filling the feat GUI
    buildFeatGUI(BRYNN_ID);
    buildFeatGUI(SYRUS_ID);
    buildFeatGUI(GALADEN_ID);
    buildFeatGUI(VAERIX_ID);
    buildFeatGUI(KEHLI_ID);
    buildFeatGUI(CHANCE_ID);

    // Mark Act 2 items and lock them if this campaign doesn't have Act 2 (runs last, after every table is built)
    applyActRules();
}

// Change language
function changeLanguage(){
    // Get language
    let select = document.getElementById("selLanguage");
    // Change global language
    language = select.value;

    // Change navigation bar names
    let navigationBar = document.getElementById("navigationBar");
    let list = navigationBar.getElementsByTagName('li');
    for(li of list) {
        li.textContent = allHeroesData[li.dataset.id].name[language] || allHeroesData[li.dataset.id].name.eng;
    }
    // Change hero title names
    let heroTitles = document.getElementsByClassName("heroTitle");
    for(title of heroTitles) {
        title.textContent = allHeroesData[title.dataset.id].name[language] || allHeroesData[title.dataset.id].name.eng;
    }

    // Translate (or restore) the text on the page (Spanish: script/i18n.js)
    applyLanguage();

    // Refresh GUI
    if (completeSave) buildCompleteGUI()
}

// Setup function for the navigation bar
function setup(){
    // Adding listener to navigation bar
    let navigationBar = document.getElementById("navigationBar");
    let list = navigationBar.getElementsByTagName('li');
    
    for(li of list) {
        li.addEventListener("click", switchGUI);
    };

    // The file box: choose or drop a save
    setupFileBox();

    // Each hero's weapons: one table per weapon
    buildWeaponCards();

    // "Add all" / "Clear all" buttons above each table
    setupBulkControls();
}

// Function triggered while navigating through the navigation bar
function switchGUI(event){
    let li = event.target;
    let heroId = li.dataset.id;
    let targetDiv;
    let targetTitle;
    // divs
    let commonDiv = document.getElementById(allHeroesData.COMMON.GUI_divId)
    let shopDiv = document.getElementById(allHeroesData.SHOP.GUI_divId)
    let shopItemsDiv = document.getElementById(allHeroesData.SHOP_ITEMS.GUI_divId)
    let enemiesDiv = document.getElementById(allHeroesData.ENEMIES.GUI_divId)
    let brynnDiv = document.getElementById(allHeroesData.HERO_BRYNN.GUI_divId)
    let syrusDiv = document.getElementById(allHeroesData.HERO_SYRUS.GUI_divId)
    let galadenDiv = document.getElementById(allHeroesData.HERO_GALADEN.GUI_divId)
    let vaerixDiv = document.getElementById(allHeroesData.HERO_VAERIX.GUI_divId)
    let kehliDiv = document.getElementById(allHeroesData.HERO_KEHLI.GUI_divId)
    let chanceDiv = document.getElementById(allHeroesData.HERO_CHANCE.GUI_divId)
    // titles
    let brynnTitle = document.getElementById(allHeroesData.HERO_BRYNN.GUI_titleId)
    let syrusTitle = document.getElementById(allHeroesData.HERO_SYRUS.GUI_titleId)
    let galadenTitle = document.getElementById(allHeroesData.HERO_GALADEN.GUI_titleId)
    let vaerixTitle = document.getElementById(allHeroesData.HERO_VAERIX.GUI_titleId)
    let kehliTitle = document.getElementById(allHeroesData.HERO_KEHLI.GUI_titleId)
    let chanceTitle = document.getElementById(allHeroesData.HERO_CHANCE.GUI_titleId)

    // Making all GUIs invisible
    //divs
    commonDiv.style.display = "none";
    shopDiv.style.display = "none";
    shopItemsDiv.style.display = "none";
    enemiesDiv.style.display = "none";
    brynnDiv.style.display = "none";
    syrusDiv.style.display = "none";
    galadenDiv.style.display = "none";
    vaerixDiv.style.display = "none";
    kehliDiv.style.display = "none";
    chanceDiv.style.display = "none";
    // titles
    brynnTitle.style.display = "none";
    syrusTitle.style.display = "none";
    galadenTitle.style.display = "none";
    vaerixTitle.style.display = "none";
    kehliTitle.style.display = "none";
    chanceTitle.style.display = "none";
    
    // Make the choose GUI visible
    switch(heroId){
        case "COMMON":
            targetDiv = commonDiv
            targetTitle = ""
            break;
        case "SHOP":
            targetDiv = shopDiv
            targetTitle = ""
            break;
        case "ENEMIES":
            targetDiv = enemiesDiv
            targetTitle = ""
            break;
        case "SHOP_ITEMS":
            targetDiv = shopItemsDiv
            targetTitle = ""
            break;
        case BRYNN_ID:
            targetDiv = brynnDiv
            targetTitle = brynnTitle
            break;
        case SYRUS_ID:
            targetDiv = syrusDiv
            targetTitle = syrusTitle
            break;
        case GALADEN_ID:
            targetDiv = galadenDiv
            targetTitle = galadenTitle
            break;
        case VAERIX_ID:
            targetDiv = vaerixDiv
            targetTitle = vaerixTitle
            break;
        case KEHLI_ID:
            targetDiv = kehliDiv
            targetTitle = kehliTitle
            break;
        case CHANCE_ID:
            targetDiv = chanceDiv
            targetTitle = chanceTitle
            break;
        default:
            console.error("ERROR: hero id '" + heroId + "' not found");
            break;
    }
    targetDiv.style.display = "flex";
    if(targetTitle != "")
        targetTitle.style.display = "block";
}





