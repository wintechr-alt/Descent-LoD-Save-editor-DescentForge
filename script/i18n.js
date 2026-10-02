/*
    Spanish (Español) and French (Français) for the editor.

    English is what the code writes. When a language is chosen, every piece of text that reaches
    the page (text, tooltips, accessibility labels, and alert / confirm boxes) is translated here,
    by exact phrase, by sentence pattern, or by paragraph start. Anything not listed stays in
    English. Spanish uses the Spanish item and enemy names from DescentForge's catalog; the
    catalog has no French names, so French keeps the English ones.

    To add a language: write another pack like the two below, add it to PACKS, add an option to
    the language box in index.html and a name for each tab in consts.js.
*/

// The language the page is in ("eng", "ita", "spa" or "fra": the language variable in main.js)
function isTranslated() {
    return typeof language !== "undefined" && (language === "spa" || language === "fra");
}

// The skill and feat pictures only come in English and Italian; Spanish and French use the English ones
function imageLanguage() {
    return isTranslated() ? "eng" : language;
}

// A {en, es} name: the Spanish one when Spanish is chosen, otherwise English
function pickName(name) {
    if (!name) return "";
    return language === "spa" ? (name.es || name.en) : name.en;
}

// The other one, for the hover text (none in French, which has no names of its own)
function otherName(name) {
    if (!name) return "";
    if (language === "spa") return name.en;
    if (language === "fra") return "";
    return name.es;
}

(function () {
    // "Quest 4", "Side quest 2", "Act 2 quest 3" in each language
    function missionName(text, lang) {
        const T = {
            spa: { q: n => `Misión ${n}`, s: n => `Misión secundaria ${n}`, a: n => `Misión ${n} del Acto 2`, o: "Otra misión" },
            fra: { q: n => `Quête ${n}`, s: n => `Quête secondaire ${n}`, a: n => `Quête ${n} de l'Acte 2`, o: "Autre quête" }
        }[lang];
        let m;
        if ((m = /^Quest (\d+)$/.exec(text))) return T.q(m[1]);
        if ((m = /^Side quest (\d+)$/.exec(text))) return T.s(m[1]);
        if ((m = /^Act 2 quest (\d+)$/.exec(text))) return T.a(m[1]);
        if (text === "Other mission") return T.o;
        return text;
    }
    function spanishPack() {
    /* ---------- Short phrases ---------- */
        const TYPES = {
            "Slash": "Cortante", "Pierce": "Perforante", "Crush": "Aplastante"
            // the elements (Ignos, Anemos, Aquos, Terros, Lumos, Umbros, Vigos, Mortos, Toxos, Fortunos)
            // are the same in Spanish
        };

        const WEAPONS = {
            "Sword": "Espada", "War Hammer": "Martillo de guerra", "Staff": "Bastón", "Wand": "Varita",
            "Dual Blades": "Hojas", "Bow": "Arco", "Warbell": "Campana de guerra", "Spear": "Lanza",
            "Hammer": "Martillo", "Crossbow": "Ballesta", "Clawed Gauntlet": "Guantelete de garra",
            "Throwing Knives": "Cuchillos arrojadizos"
        };

        const EXACT = Object.assign({}, TYPES, WEAPONS, {
            // page top
            "Select save file": "Seleccionar archivo de guardado",
            "Open your save file": "Abre tu archivo de guardado",
            "Choose your save file": "Elige tu archivo de guardado",
            "Choose another save file": "Elige otro archivo de guardado",
            "or drop it here (a .sav file)": "o suéltalo aquí (un archivo .sav)",
            "or drop it here": "o suéltalo aquí",
            "No save loaded yet.": "Todavía no se ha cargado ningún guardado.",
            "Load": "Cargar",
            "(How to use)": "(Cómo se usa)",
            "Get the new save file": "Obtener el nuevo archivo de guardado",
            "Act 2 content allowed": "Contenido del Acto 2 permitido",
            "Hide all Act 2 content": "Ocultar todo el contenido del Acto 2",
            "I want it all": "¡Lo quiero todo!",
            "Reveal enemies": "Revelar enemigos",
        "Reveal all": "Revelar todo",
        "Forget all": "Olvidar todo",
        "REVEALED": "REVELADO",
        "Find an enemy": "Buscar un enemigo",
        "Revealed": "Revelado",
        "Not revealed yet": "Aún no revelado",
        "Every enemy is already revealed.": "Todos los enemigos ya están revelados.",
            "Reset to default": "Restablecer valores iniciales",
            "All skills": "Todas las habilidades",
            "All feats": "Todas las hazañas",
            "Clean up duplicates": "Limpiar duplicados",
            "Remove Act 2 items": "Quitar objetos del Acto 2",
            // common tab
            "Gold": "Oro",
            "Crafting materials": "Materiales de fabricación",
            "Armors": "Armaduras",
            "Armor": "Armadura",
            "Trinkets": "Abalorios",
            "Consumables": "Consumibles",
            "Shared weapons": "Armas compartidas",
            "Other items": "Otros objetos",
            "Other": "Otros",
            "Misc": "Varios",
            // table headers
            "MATERIAL": "MATERIAL",
            "QUANTITY": "CANTIDAD",
            "BASE": "BASE",
            "UPGRADED": "MEJORADO",
            "RECIPE": "RECETA",
            "PLUS RECIPE": "RECETA MEJORADA",
            "WEAPON": "ARMA",
            "OWNED": "POSEÍDO",
            "ITEM OR RECIPE": "OBJETO O RECETA",
            "FOR SALE": "EN VENTA",
            "ENEMY": "ENEMIGO",
            "WEAKNESSES": "DEBILIDADES",
            "RESISTANCES": "RESISTENCIAS",
            "Skill": "Habilidad",
            "Feat": "Hazaña",
            // hero pages
            "weapons": "armas",
            "skills": "habilidades",
            "feats": "hazañas",
            "Weapon (part A)": "Arma (parte A)",
            "Part B": "Parte B",
            "Part C": "Parte C",
            "Act 2": "Acto 2",
            // buttons
            "Add all": "Añadir todo",
            "Add all recipes": "Añadir todas las recetas",
            "Add all base": "Añadir toda la base",
            "Add all Plus recipes": "Añadir todas las recetas mejoradas",
            "Add all upgraded": "Añadir todo mejorado",
            "Clear all": "Quitar todo",
            "Complete all": "Completar todo",
            "Set all": "Fijar todos",
            "Add everything you don't own yet": "Añadir todo lo que aún no tienes",
            // shop
            "Shop": "Tienda",
            "Extra shop slots": "Espacios extra de la tienda",
            "Materials for sale": "Materiales en venta",
            "Items & recipes for sale": "Objetos y recetas en venta",
            "Items & recipes for sale now": "Objetos y recetas en venta ahora",
            "This save doesn't have an extra-slots setting.": "Este guardado no tiene el ajuste de espacios extra.",
            // enemies
            "Enemy weaknesses": "Debilidades de enemigos",
            // missions tab
            "Missions": "Misiones",
            "Experimental": "Experimental",
            "MISSION": "MISIÓN",
            "DONE": "HECHA",
            "RESULT": "RESULTADO",
            "OPEN ON MAP": "ABIERTA EN EL MAPA",
            "Apply mission changes": "Aplicar cambios de misiones",
            "Discard changes": "Descartar cambios",
            "Mark all Act 1 missions done": "Marcar todas las misiones del Acto 1 como hechas",
            "Mark all not done": "Marcar todas como no hechas",
            "Open what the game opened for these": "Abrir lo que el juego abrió para estas",
            // events
            "Events": "Eventos",
            "EVENT": "EVENTO",
            "KIND": "TIPO",
            "PENDING": "PENDIENTE",
            "Narrative": "Narrativo",
            "City": "Ciudad",
            "Apply event changes": "Aplicar cambios de eventos",
            "Discard event changes": "Descartar cambios de eventos",
            "Where a city event stands in town is only known while it is pending": "Dónde está un evento de ciudad solo se sabe mientras está pendiente",
            "You have event changes that aren't applied yet. Press Apply event changes.": "Tienes cambios de eventos sin aplicar. Pulsa Aplicar cambios de eventos.",
            "You have event changes that haven't been applied. Get the save without them?": "Tienes cambios de eventos sin aplicar. ¿Obtener el guardado sin ellos?",
            // New Game+
            "New Game+": "Nueva partida+",
            "New campaign's save file": "Archivo de guardado de la nueva campaña",
            "Options": "Opciones",
            "Keep each hero's equipped weapons and trinket": "Conservar las armas y el amuleto equipados de cada héroe",
            "Build New Game+": "Crear Nueva partida+",
            "Reset the virtues of all heroes (VirtueOneValue and VirtueTwoValue) to the new campaign's": "Restablecer las virtudes de todos los héroes (VirtueOneValue y VirtueTwoValue) a las de la nueva campaña",
            "In the game, start a new Act 1 campaign with the heroes you want to play, and set the difficulty.": "En el juego, empieza una campaña nueva del Acto 1 con los héroes que quieras jugar y ajusta la dificultad.",
            "As soon as you can save, save, then exit the game.": "En cuanto puedas guardar, guarda y sal del juego.",
            "Choose that new campaign's save below, pick your options and press Build New Game+.": "Elige abajo el guardado de esa campaña nueva, elige tus opciones y pulsa Crear Nueva partida+.",
            "Download the result and replace the new campaign's save with it: copy it into that slot's folder. It is named one second newer, so the game loads it.": "Descarga el resultado y sustituye con él el guardado de la campaña nueva: cópialo en la carpeta de esa ranura. Se llama un segundo más tarde, así que el juego lo carga.",
            "The virtues of all heroes are reset to the new campaign's.": "Las virtudes de todos los héroes se restablecen a las de la nueva campaña.",
            "The virtues of all heroes are kept.": "Se conservan las virtudes de todos los héroes.",
            "Download the save": "Descargar el guardado",
            "Open it in the editor": "Abrirlo en el editor",
            "Close": "Cerrar",
            "Options changed. Press Build New Game+ again.": "Las opciones cambiaron. Pulsa Crear Nueva partida+ otra vez.",
            "That file doesn't look like a Legends of the Dark save.": "Ese archivo no parece un guardado de Legends of the Dark.",
            "That is the same campaign as the save you have open. Choose the save of a new campaign.": "Esa es la misma campaña que el guardado que tienes abierto. Elige el guardado de una campaña nueva.",
            "That is an Act 2 campaign. New Game+ is meant to start from a new Act 1 campaign.": "Esa es una campaña del Acto 2. Nueva partida+ está pensada para empezar desde una campaña nueva del Acto 1.",
            "Use it anyway?": "¿Usarlo de todos modos?",
            "Each hero's equipped weapons and trinket are kept.": "Se conservan las armas y el amuleto equipados de cada héroe.",
            "Each hero starts with the new campaign's weapons and trinket.": "Cada héroe empieza con las armas y el amuleto de la nueva campaña.",
            "Open the New Game+ save in the editor? The save that is open now will be replaced here (the file itself isn't changed).": "¿Abrir el guardado de Nueva partida+ en el editor? El guardado abierto ahora se sustituirá aquí (el archivo en sí no cambia).",
            "WARNING: unknown progression issues": "ADVERTENCIA: problemas de progresión desconocidos",
            "Back up your save first and try it on a copy.": "Haz primero una copia de seguridad de tu guardado y pruébalo en una copia.",
            "Mark all Act 2 missions done": "Marcar todas las misiones del Acto 2 como hechas",
            "Won (kept as saved)": "Ganada (se mantiene como estaba)",
            "Set the campaign progression number to match (18 + 2 per mission done)": "Ajustar el número de progreso de campaña (18 + 2 por cada misión hecha)",
            "All Act 2 missions marked done. Press Apply mission changes.": "Todas las misiones del Acto 2 marcadas como hechas. Pulsa Aplicar cambios de misiones.",
            "All Act 1 missions marked done. Press Apply mission changes.": "Todas las misiones del Acto 1 marcadas como hechas. Pulsa Aplicar cambios de misiones.",
            "All missions marked not done. Press Apply mission changes.": "Todas las misiones marcadas como no hechas. Pulsa Aplicar cambios de misiones.",
            "Changing missions can cause unknown progression problems. It is meant for replaying missions after an act is complete.": "Cambiar misiones puede causar problemas de progresión desconocidos. Está pensado para volver a jugar misiones cuando un acto ya está completo.",
            "Apply the changes?": "¿Aplicar los cambios?",
            "The Act 2 counters were left as they are.": "Los contadores del Acto 2 se dejaron como estaban.",
            "Campaign progression was left as it is.": "El progreso de campaña se dejó como estaba.",
            "Won": "Ganada",
            "Lost": "Perdida",
            "Not played": "Sin jugar",
            "n/a": "n/d",
            "Applied.": "Aplicado.",
            "Changes discarded.": "Cambios descartados.",
            "Nothing to apply.": "Nada que aplicar.",
            "Press Apply mission changes.": "Pulsa Aplicar cambios de misiones.",
            "This save has no campaign progression number.": "Este guardado no tiene número de progreso de campaña.",
            "This save has no campaign progression number, so none was set.": "Este guardado no tiene número de progreso de campaña, así que no se puso ninguno.",
            "You have changes that aren't applied yet. Press Apply mission changes.": "Tienes cambios sin aplicar. Pulsa Aplicar cambios de misiones.",
            "The editor has no record of what opens after this combination of missions.": "El editor no tiene datos de lo que se abre tras esta combinación de misiones.",
            "Tick the ones to open yourself.": "Marca tú mismo las que quieras abrir.",
            "You have mission changes that haven't been applied. Get the save without them?": "Tienes cambios de misiones sin aplicar. ¿Obtener el guardado sin ellos?",
            "Known": "Conocido",
            "Owned": "Poseído",
            "You already own this": "Ya lo tienes",
            "You already know this recipe": "Ya conoces esta receta",
            // messages
            "Load a save file first.": "Primero carga un archivo de guardado.",
            "Nothing to clean up.": "No hay nada que limpiar.",
            "No duplicates found.": "No se encontraron duplicados.",
            "Reset to default.": "Valores iniciales restablecidos.",
            "Cleaned up.": "Limpieza hecha.",
            "No materials for sale.": "No hay materiales en venta.",
            "Everything available is already for sale or owned.": "Todo lo disponible ya está en venta o ya lo tienes.",
            "Everything you can add is already for sale.": "Todo lo que puedes añadir ya está en venta.",
            "Clean up this save?": "¿Limpiar este guardado?",
            "Continue?": "¿Continuar?",
            "Please select a file before clicking 'Load'": "Selecciona un archivo antes de pulsar 'Cargar'",
            "The file API isn't supported on this browser yet.": "La API de archivos aún no es compatible con este navegador.",
            // confirm boxes
            "Reset this save to the starting items, recipes, materials, gold, shop, skills, feats and hero gear of a new campaign?":
                "¿Restablecer este guardado a los objetos, recetas, materiales, oro, tienda, habilidades, hazañas y equipo de héroes iniciales de una campaña nueva?",
            "Story progress, party name and XP are kept.": "Se conservan el progreso de la historia, el nombre del grupo y la experiencia.",
            "This is an Act 2 campaign, but the default comes from the start of an Act 1 campaign.":
                "Esta es una campaña del Acto 2, pero los valores iniciales vienen del comienzo de una campaña del Acto 1.",
            "An Act 2 campaign may normally start with more than this.":
                "Una campaña del Acto 2 normalmente puede empezar con más que esto.",
            "Marking a feat as completed while it's in progress stops you claiming its reward, and then you can't take on new feats.":
                "Marcar una hazaña como completada mientras está en curso te impide reclamar su recompensa, y luego no puedes emprender hazañas nuevas.",
            "Removed the Act 2 items, except these, which are equipped:": "Se quitaron los objetos del Acto 2, excepto estos, que están equipados:",
            "Swap them out in the game, or untick them on the hero tab after fitting another part.":
                "Cámbialos en el juego, o desmárcalos en la pestaña del héroe después de poner otra pieza.",
            // notes in the act controls
            "This save owns Act 2.": "Este guardado tiene el Acto 2.",
            "This save doesn't own Act 2, so Act 2 items are locked.": "Este guardado no tiene el Acto 2, así que los objetos del Acto 2 están bloqueados.",
            "Only allow them if you know the campaign supports it.": "Permítelos solo si sabes que la campaña los admite.",
            "Act 2 content is hidden.": "El contenido del Acto 2 está oculto.",
            // tooltips
            "Included in the upgraded version. Untick the upgrade to go back to the base.":
                "Incluido en la versión mejorada. Desmarca la mejora para volver a la base.",
            "The number the save stores for this enemy": "El número que guarda el archivo para este enemigo",
            "Swap it out in the game first, then untick it here.": "Cámbialo primero en el juego y luego desmárcalo aquí.",
            "Swap it out in the game first, then untick the recipe.": "Cámbialo primero en el juego y luego desmarca la receta."
        });

        /* ---------- Paragraphs, matched by how they start ---------- */
        const PARAGRAPHS = [
        ['Experimental, and less certain than missions',
         'Experimental y menos fiable que las misiones: ningún guardado muestra un evento jugándose, solo eventos en espera y eventos terminados. Un evento narrativo espera en la misma lista abierta que las misiones. Un evento de ciudad espera en la ciudad; se puede marcar como hecho o quitar de la ciudad, pero no volver a ponerlo, porque dónde estaba solo se sabe mientras espera. Las decisiones de historia que toman los eventos no se tocan.'],
        ['New Game+ starts the story again',
         'Nueva partida+ empieza la historia otra vez desde la Misión 1 y conserva lo que has ganado: objetos, recetas, armas y mejoras, materiales, oro, habilidades, gestas, debilidades de enemigos y las armas y el amuleto equipados de cada héroe. Lo hace pasando todo eso al guardado de una campaña nueva. El guardado que tienes abierto no cambia.'],
        ['Everything about the story comes from the new campaign',
         'Todo lo de la historia viene de la nueva campaña: misiones, resultados, decisiones de la historia, eventos, la tienda, el nombre del grupo, la dificultad, la XP, las repeticiones de gestas, las Leyendas y los compañeros. Qué héroes juegan también viene de la nueva campaña, así que aquí no se cambia.'],
        ['It has had only light testing in the game.',
         'Solo se ha probado un poco en el juego. Haz primero copias de seguridad de tus guardados.'],
        ['Changing missions can cause progression problems',
         'Cambiar misiones puede causar problemas de progresión que nadie ha estudiado todavía. El juego puede desbloquear cosas que no toca, saltarse o repetir historia, o impedir que la campaña avance.'],
        ['This tab is meant for replaying missions',
         'Esta pestaña está pensada para volver a jugar misiones cuando un acto ya está completo: desmarca Hecha en una misión terminada y marca Abierta en el mapa para jugarla otra vez. No sirve para saltarse partes de la historia y no se ha probado para eso.'],
        ['Experimental. This was worked out from a few saves',
         'Experimental. Esto se dedujo a partir de unos pocos guardados, así que úsalo en una copia de tu guardado. El Acto 1 sale de un par de guardados de antes y después y solo se ha probado un poco en el juego; el Acto 2 sale de un solo guardado terminado y no se ha probado en el juego.'],
        ['This is an Act 2 campaign. Act 2 was worked out',
         'Esta es una campaña del Acto 2. El Acto 2 se dedujo de un solo guardado terminado, sin un par de antes y después, así que es menos fiable que el Acto 1. Los resultados del Acto 2 no se pueden editar y sus dos contadores de misiones no se tocan.'],
        ['Tick Done for the missions the party has finished',
         'Marca Hecha en las misiones que el grupo ha terminado y elige Ganada o Perdida. Marca Abierta en el mapa en las misiones que el mapa debe ofrecer a continuación.'],
        ['Press Apply mission changes. It updates',
         'Pulsa Aplicar cambios de misiones. Actualiza las listas de misiones terminadas y abiertas, el registro de la campaña, el resultado de cada misión, la última misión del mapa y el número de progreso de campaña (18 más 2 por cada misión hecha).'],
        ['Heroes who haven\'t joined yet, gold, XP',
         'Los héroes que aún no se han unido, el oro, la XP, las repeticiones de gestas y los eventos de la historia no se tocan.'],
        ['Tick an enemy to reveal all its weaknesses',
         'Marca un enemigo para revelar todas sus debilidades y resistencias, o desmárcalo para olvidarlo. Las etiquetas sólidas están reveladas. Las etiquetas con línea discontinua siguen ocultas.'],
        ['The small "flags" number under an enemy',
         'El pequeño número "flags" bajo un enemigo es lo que guarda el archivo para él. Una parte de ese número (el bit 0) no se entiende y se ignora; se activa siempre que se revela un enemigo.'],
            ['Save files end in .sav',
             'Los archivos de guardado terminan en .sav y se parecen a 2026-09-29_20-05-46.sav. El archivo se lee en tu navegador y nunca se sube a ningún sitio. Tu copia editada se nombra un segundo más tarde, así que el juego la carga como tu último guardado. Guarda una copia de seguridad del original.'],
            ['Only one of each is sold.',
             'De cada uno se vende solo uno. Desmarca uno para quitarlo de los estantes. Añade más en la pestaña Artículos de la tienda.'],
            ['Nothing for sale yet.',
             'Todavía no hay nada en venta. Añade algo en la pestaña Artículos de la tienda.'],
            ['"Add everything" puts every item and recipe',
             '"Añadir todo" pone en venta todos los objetos y recetas de la lista de abajo (los del Acto 2 solo cuando la campaña los permite). Pueden ser unos cientos de entradas, algo que no se ha probado en el juego, así que pruébalo primero en una copia de tu guardado. "Quitar todo" los retira todos otra vez.'],
            ['Base: you own it (you buy or find it',
             'Base: lo tienes (se compra o se encuentra, así que no tiene receta). Receta mejorada: conoces la receta de la versión mejorada. Mejorado: lo has mejorado, lo que incluye la base.'],
            ['Each has two recipes:',
             'Cada uno tiene dos recetas: la normal (Receta) y la de la versión mejorada Plus (Receta mejorada). Base: lo has fabricado (va a tu inventario y se equipa una pieza mejor al héroe). Mejorado: lo has mejorado, lo que incluye la base. Lo que compras o encuentras no tiene Receta.'],
            ['Each is sold once.',
             'Cada uno se vende una sola vez. No se pueden añadir los objetos que ya tienes ni las recetas que ya conoces, así que comprar no puede crear un duplicado.'],
            ['Extra items the shop rolls each time it restocks',
             'Objetos extra que la tienda saca cada vez que se repone.'],
            ['Only what you can still add is listed',
             'Solo se muestra lo que todavía puedes añadir: se omiten los objetos que ya tienes y las recetas que ya conoces. Las armas están agrupadas por héroe, con la parte A, la parte B y la parte C de cada arma como en las páginas de los héroes.'],
            ['Puts back any missing "no part"',
             'Repone las opciones de "sin pieza" que falten, marca como fabricadas las recetas de lo que tienes, quita objetos, recetas y entradas de lista duplicados, combina las pilas repetidas de materiales y de la tienda, conserva solo la versión mejorada cuando tienes ambas y elimina las recetas que el editor original escribió para objetos comprados. Verás la lista completa antes de que cambie nada.'],
            ['Puts items, recipes, materials, gold',
             'Devuelve objetos, recetas, materiales, oro, tienda, habilidades, hazañas y el equipo de cada héroe a como empieza una campaña nueva del Acto 1. Se conservan el progreso de la historia, el nombre del grupo, la experiencia y todo lo demás.'],
            ['The crafting materials and elements the shop sells',
             'Los materiales de fabricación y elementos que vende la tienda. 0 significa que no está a la venta.'],
            ['The shop normally restocks after each quest',
             'La tienda normalmente se repone después de cada misión, lo que reemplaza esta lista.'],
            ['The weaknesses and resistances come from',
             'Las debilidades y resistencias vienen de la lista de enemigos de DescentForge. Los enemigos de un guardado que no están en esa lista nunca se modifican.'],
            ['Weapons any hero can use.',
             'Armas que cualquier héroe puede usar. Poseído da las partes A, B y C; mejorado mejora la parte A.'],
            ['Items from this campaign that don\'t fit',
             'Objetos de esta campaña que no encajan en las tablas de arriba.']
        ];

        /* ---------- Sentences with numbers and names ---------- */
        const plural = (n, one, many) => (parseInt(n) === 1 ? one : many);
        const typeList = s => s.split(", ").map(t => TYPES[t] || t).join(", ");

        const SENTENCES = [
            [/^Added (\d+)\.$/, m => `Añadidos ${m[1]}.`],
            [/^Removed (\d+)\.$/, m => `Quitados ${m[1]}.`],
            [/^Kept (\d+) that are equipped\.$/, m => `Se conservaron ${m[1]} que están equipados.`],
            [/^Skipped (\d+) Act 2 items this campaign doesn't allow\.$/, m => `Omitidos ${m[1]} objetos del Acto 2 que esta campaña no permite.`],
            [/^Skipped (\d+) hidden Act 2 items\.$/, m => `Omitidos ${m[1]} objetos ocultos del Acto 2.`],
            [/^Skipped (\d+) Act 2 enemies this campaign doesn't allow\.$/, m => `Omitidos ${m[1]} enemigos del Acto 2 que esta campaña no permite.`],
            [/^Skipped (\d+) hidden Act 2 enemies\.$/, m => `Omitidos ${m[1]} enemigos ocultos del Acto 2.`],
            [/^Took (\d+) items? you now own off the shop shelves\.$/, m =>
                `Se ${plural(m[1], "retiró", "retiraron")} ${m[1]} ${plural(m[1], "objeto que ya tienes", "objetos que ya tienes")} de los estantes de la tienda.`],
            [/^Set (\d+) materials to (\d+)\.$/, m => `Se fijaron ${m[1]} materiales a ${m[2]}.`],
            [/^Every material is now (\d+) for sale\.$/, m => `Cada material tiene ahora ${m[1]} en venta.`],
            [/^Put (\d+) items and recipes on sale\.$/, m => `Se pusieron ${m[1]} objetos y recetas en venta.`],
            [/^Removed (\d+) items and recipes\.$/, m => `Se quitaron ${m[1]} objetos y recetas.`],
            [/^(\d+) kinds of fix applied\.$/, m => `${m[1]} tipos de arreglo aplicados.`],
            [/^(\d+) kinds? of problem found\.$/, m => `${m[1]} ${plural(m[1], "tipo", "tipos")} de problema encontrado${parseInt(m[1]) === 1 ? "" : "s"}.`],
            [/^(\d+) materials for sale$/, m => `${m[1]} materiales en venta`],
            [/^(\d+) items and recipes for sale$/, m => `${m[1]} objetos y recetas en venta`],
            [/^1 item or recipe for sale$/, () => "1 objeto o receta en venta"],
            [/^(\d+) listed, (\d+) for sale$/, m => `${m[1]} en la lista, ${m[2]} en venta`],
            [/^(\d+) other entr(?:y isn't|ies aren't) on DescentForge's list and (?:is|are) left alone\.$/, m =>
                `${m[1]} ${plural(m[1], "entrada más no está", "entradas más no están")} en la lista de DescentForge y se ${plural(m[1], "deja", "dejan")} como ${plural(m[1], "está", "están")}.`],
            [/^flags (\d+)$/, m => `flags ${m[1]}`],
            [/^(\d+) Act 2 items? (?:is|are) in this save, which can break a campaign without Act 2\.$/, m =>
                `${m[1]} ${plural(m[1], "objeto del Acto 2 está", "objetos del Acto 2 están")} en este guardado, lo que puede romper una campaña sin el Acto 2.`],
            [/^Revealed (\d+) enemies\.$/, m => `Se revelaron ${m[1]} enemigos.`],
        [/^Forgot (\d+) enemies\.$/, m => `Se olvidaron ${m[1]} enemigos.`],
        [/^(\d+) of (\d+) enemies fully revealed\.$/, m => `${m[1]} de ${m[2]} enemigos totalmente revelados.`],
        [/^Party name: (.*)$/, m => `Nombre del grupo: ${m[1]}`],
        [/^(.+) \(kept as saved\)$/, m => `${m[1]} (se mantiene como estaba)`],
        [/^Campaign progression: (\d+) \(it will be left as it is\)\.$/, m => `Progreso de campaña: ${m[1]} (se dejará como está).`],
        [/^New campaign: (.*), (Act 1|Act 2), game version (.+), (owns Act 2|doesn't own Act 2)\.$/, m => `Campaña nueva: ${m[1]}, ${m[2] === "Act 1" ? "Acto 1" : "Acto 2"}, versión del juego ${m[3]}, ${m[4] === "owns Act 2" ? "tiene el Acto 2" : "no tiene el Acto 2"}.`],
        [/^That campaign already has (\d+) finished missions?, so it doesn't look brand new\.$/, m => `Esa campaña ya tiene ${m[1]} ${m[1] === "1" ? "misión terminada" : "misiones terminadas"}, así que no parece nueva.`],
        [/^Items kept: (\d+)\.$/, m => `Objetos conservados: ${m[1]}.`],
        [/^Recipes kept: (\d+)\.$/, m => `Recetas conservadas: ${m[1]}.`],
        [/^Materials kept: (\d+)\.$/, m => `Materiales conservados: ${m[1]}.`],
        [/^Gold kept: (\d+)\.$/, m => `Oro conservado: ${m[1]}.`],
        [/^Skills kept: (\d+)\.$/, m => `Habilidades conservadas: ${m[1]}.`],
        [/^Feats kept: (\d+)\.$/, m => `Gestas conservadas: ${m[1]}.`],
        [/^Enemies with known weaknesses kept: (\d+)\.$/, m => `Enemigos con debilidades conocidas conservados: ${m[1]}.`],
        [/^Took (\d+) items and recipes you already have off the shop shelves\.$/, m => `Se quitaron ${m[1]} objetos y recetas que ya tienes de las estanterías de la tienda.`],
        [/^Left out because the new campaign doesn't own Act 2: (\d+) from (.+)\.$/, m => `Omitidos porque la nueva campaña no tiene el Acto 2: ${m[1]} de ${m[2]}.`],
        [/^The new campaign doesn't own Act 2 and (.+)'s gear uses Act 2 parts, so (.+) keeps the new campaign's starting gear\.$/, m => `La nueva campaña no tiene el Acto 2 y el equipo de ${m[1]} usa piezas del Acto 2, así que ${m[2]} conserva el equipo inicial de la nueva campaña.`],
        [/^Built\. The file will be named (.+)\. Download it, or open it here to look it over\.$/, m => `Creado. El archivo se llamará ${m[1]}. Descárgalo, o ábrelo aquí para revisarlo.`],
        [/^City event (\d+)$/, m => `Evento de ciudad ${m[1]}`],
        [/^Narrative events done: (\d+)\.$/, m => `Eventos narrativos hechos: ${m[1]}.`],
        [/^City events done: (\d+)\.$/, m => `Eventos de ciudad hechos: ${m[1]}.`],
        [/^Downloaded (.+)\. Replace the new campaign's save with it: copy it into that slot's folder\.$/, m => `Descargado ${m[1]}. Sustituye con él el guardado de la campaña nueva: cópialo en la carpeta de esa ranura.`],
        [/^Quest (\d+)$/, m => missionName(m[0], "spa")],
        [/^Side quest (\d+)$/, m => missionName(m[0], "spa")],
        [/^Act 2 quest (\d+)$/, m => missionName(m[0], "spa")],
        [/^Other mission$/, m => missionName(m[0], "spa")],
        [/^(.+) \(as saved\)$/, m => `${m[1]} (como estaba guardado)`],
        [/^Campaign progression: (\d+)\. After applying: (\d+)\.$/, m => `Progreso de campaña: ${m[1]}. Tras aplicar: ${m[2]}.`],
        [/^Campaign progression: (\d+)\.$/, m => `Progreso de campaña: ${m[1]}.`],
        [/^Campaign progression is now (\d+)\.$/, m => `El progreso de campaña ahora es ${m[1]}.`],
        [/^Missions done: (\d+)\.$/, m => `Misiones hechas: ${m[1]}.`],
        [/^Open on the map: (\d+)\.$/, m => `Abiertas en el mapa: ${m[1]}.`],
        [/^Open on the map: (\d+), as in a save with these missions done\.$/, m => `Abiertas en el mapa: ${m[1]}, como en un guardado con estas misiones hechas.`],
        [/^Couldn't find a result entry for: (.+)\.$/, m => `No se encontró el resultado de: ${m[1]}.`],
            [/^Loaded: (.+)$/, m => `Cargado: ${m[1]}`],
            [/^Weak to: (.+)$/, m => `Débil a: ${typeList(m[1])}`],
            [/^Resists: (.+)$/, m => `Resiste: ${typeList(m[1])}`],
            // alerts about equipped things (the name comes first)
            [/^(.+) is equipped by (.+)\.$/, m => `${m[1]} está equipado por ${m[2]}.`],
            [/^(.+) is equipped\.$/, m => `${m[1]} está equipado.`],
            [/^(.+) is fitted to a weapon\.$/, m => `${m[1]} está puesto en un arma.`],
            [/^This file isn't a readable save: (.*)$/, m => `Este archivo no es un guardado legible: ${m[1]}`],
            // the lines of the clean-up list
            [/^Duplicate items removed: (.+)$/, m => `Objetos duplicados eliminados: ${m[1]}`],
            [/^Base items removed where the upgrade is owned: (.+)$/, m => `Objetos base eliminados donde se tiene la mejora: ${m[1]}`],
            [/^Materials combined into one stack: (.+)$/, m => `Materiales combinados en una sola pila: ${m[1]}`],
            [/^Duplicate recipes removed: (.+)$/, m => `Recetas duplicadas eliminadas: ${m[1]}`],
            [/^Recipes for bought items removed \((\d+)\): (.+)$/, m => `Recetas de objetos comprados eliminadas (${m[1]}): ${m[2]}`],
            [/^Repeated entries removed from: (.+)$/, m => `Entradas repetidas eliminadas de: ${m[1]}`],
            [/^Shop entries combined: (.+)$/, m => `Entradas de la tienda combinadas: ${m[1]}`],
            [/^Missing "no part" options put back: (.+)$/, m => `Opciones de "sin pieza" que faltaban, repuestas: ${m[1]}`],
            [/^Recipes marked crafted for items you own: (.+)$/, m => `Recetas marcadas como fabricadas para objetos que tienes: ${m[1]}`]
        ];

        // Tooltips and accessibility labels: "<name> for sale", "<name> recipe known", ...
        const ATTRIBUTES = [
            [/^(.+) event done$/, m => `${m[1]}: evento hecho`],
            [/^(.+) event pending$/, m => `${m[1]}: evento pendiente`],
            [/^(.+) done$/, m => `${missionName(m[1], "spa")} hecha`],
            [/^(.+) result$/, m => `${missionName(m[1], "spa")}: resultado`],
            [/^(.+) open on the map$/, m => `${missionName(m[1], "spa")} abierta en el mapa`],
            [/^Quantity of (.+) for sale$/, m => `Cantidad de ${m[1]} en venta`],
            [/^Amount of every material for sale$/, () => "Cantidad de cada material en venta"],
            [/^Amount for every material$/, () => "Cantidad de cada material"],
            [/^(.+) plus recipe known$/, m => `${m[1]}: receta mejorada conocida`],
            [/^(.+) recipe known$/, m => `${m[1]}: receta conocida`],
            [/^(.+) for sale$/, m => `${m[1]} en venta`],
            [/^Forget (.+)$/, m => `Olvidar ${m[1]}`],
            [/^(.+) owned$/, m => `${m[1]} poseído`],
            [/^(.+) upgraded$/, m => `${m[1]} mejorado`],
            [/^(.+) revealed$/, m => `${m[1]} revelado`],
        [/^(.+) known$/, m => `${m[1]} conocido`]
        ];
        return { types: TYPES, exact: EXACT, paragraphs: PARAGRAPHS, sentences: SENTENCES, attributes: ATTRIBUTES };
    }

    function frenchPack() {
    /* ---------- Short phrases ---------- */
        const TYPES = {
            "Slash": "Tranchant", "Pierce": "Perforant", "Crush": "Contondant"
            // the elements (Ignos, Anemos, Aquos, Terros, Lumos, Umbros, Vigos, Mortos, Toxos, Fortunos)
            // keep their names in French
        };

        const WEAPONS = {
            "Sword": "Épée", "War Hammer": "Marteau de guerre", "Staff": "Bâton", "Wand": "Baguette",
            "Dual Blades": "Lames jumelles", "Bow": "Arc", "Warbell": "Cloche de guerre", "Spear": "Lance",
            "Hammer": "Marteau", "Crossbow": "Arbalète", "Clawed Gauntlet": "Gantelet à griffes",
            "Throwing Knives": "Couteaux de lancer"
        };

        const EXACT = Object.assign({}, TYPES, WEAPONS, {
            // page top
            "Select save file": "Sélectionner le fichier de sauvegarde",
            "Open your save file": "Ouvrez votre fichier de sauvegarde",
            "Choose your save file": "Choisissez votre fichier de sauvegarde",
            "Choose another save file": "Choisir un autre fichier de sauvegarde",
            "or drop it here (a .sav file)": "ou déposez-le ici (un fichier .sav)",
            "or drop it here": "ou déposez-le ici",
            "No save loaded yet.": "Aucune sauvegarde chargée pour l'instant.",
            "Load": "Charger",
            "(How to use)": "(Mode d'emploi)",
            "Get the new save file": "Obtenir le nouveau fichier de sauvegarde",
            "Act 2 content allowed": "Contenu de l'Acte 2 autorisé",
            "Hide all Act 2 content": "Masquer tout le contenu de l'Acte 2",
            "I want it all": "Je veux tout !",
            "Reveal enemies": "Révéler les ennemis",
        "Reveal all": "Tout révéler",
        "Forget all": "Tout oublier",
        "REVEALED": "RÉVÉLÉ",
        "Find an enemy": "Trouver un ennemi",
        "Revealed": "Révélé",
        "Not revealed yet": "Pas encore révélé",
        "Every enemy is already revealed.": "Tous les ennemis sont déjà révélés.",
            "Reset to default": "Rétablir les valeurs initiales",
            "All skills": "Toutes les compétences",
            "All feats": "Tous les exploits",
            "Clean up duplicates": "Nettoyer les doublons",
            "Remove Act 2 items": "Retirer les objets de l'Acte 2",
            // common tab
            "Gold": "Or",
            "Crafting materials": "Matériaux d'artisanat",
            "Armors": "Armures",
            "Armor": "Armure",
            "Trinkets": "Breloques",
            "Consumables": "Consommables",
            "Shared weapons": "Armes partagées",
            "Other items": "Autres objets",
            "Other": "Autres",
            "Misc": "Divers",
            // table headers
            "MATERIAL": "MATÉRIAU",
            "QUANTITY": "QUANTITÉ",
            "BASE": "BASE",
            "UPGRADED": "AMÉLIORÉ",
            "RECIPE": "RECETTE",
            "PLUS RECIPE": "RECETTE AMÉLIORÉE",
            "WEAPON": "ARME",
            "OWNED": "POSSÉDÉ",
            "ITEM OR RECIPE": "OBJET OU RECETTE",
            "FOR SALE": "EN VENTE",
            "ENEMY": "ENNEMI",
            "WEAKNESSES": "FAIBLESSES",
            "RESISTANCES": "RÉSISTANCES",
            "Skill": "Compétence",
            "Feat": "Exploit",
            // hero pages
            "weapons": "armes",
            "skills": "compétences",
            "feats": "exploits",
            "Weapon (part A)": "Arme (partie A)",
            "Part B": "Partie B",
            "Part C": "Partie C",
            "Act 2": "Acte 2",
            // buttons
            "Add all": "Tout ajouter",
            "Add all recipes": "Ajouter toutes les recettes",
            "Add all base": "Ajouter toute la base",
            "Add all Plus recipes": "Ajouter toutes les recettes améliorées",
            "Add all upgraded": "Ajouter tout amélioré",
            "Clear all": "Tout retirer",
            "Complete all": "Tout compléter",
            "Set all": "Tout fixer",
            "Add everything you don't own yet": "Ajouter tout ce que vous n'avez pas encore",
            // shop
            "Shop": "Boutique",
            "Extra shop slots": "Emplacements supplémentaires de la boutique",
            "Materials for sale": "Matériaux en vente",
            "Items & recipes for sale": "Objets et recettes en vente",
            "Items & recipes for sale now": "Objets et recettes en vente actuellement",
            "This save doesn't have an extra-slots setting.": "Cette sauvegarde n'a pas de réglage d'emplacements supplémentaires.",
            // enemies
            "Enemy weaknesses": "Faiblesses des ennemis",
            // missions tab
            "Missions": "Missions",
            "Experimental": "Expérimental",
            "MISSION": "MISSION",
            "DONE": "TERMINÉE",
            "RESULT": "RÉSULTAT",
            "OPEN ON MAP": "OUVERTE SUR LA CARTE",
            "Apply mission changes": "Appliquer les changements de missions",
            "Discard changes": "Annuler les changements",
            "Mark all Act 1 missions done": "Marquer toutes les missions de l'Acte 1 comme terminées",
            "Mark all not done": "Tout marquer comme non terminé",
            "Open what the game opened for these": "Ouvrir ce que le jeu a ouvert pour celles-ci",
            // events
            "Events": "Événements",
            "EVENT": "ÉVÉNEMENT",
            "KIND": "TYPE",
            "PENDING": "EN ATTENTE",
            "Narrative": "Narratif",
            "City": "Ville",
            "Apply event changes": "Appliquer les changements d\'événements",
            "Discard event changes": "Annuler les changements d\'événements",
            "Where a city event stands in town is only known while it is pending": "L\'emplacement d\'un événement de ville n\'est connu que tant qu\'il est en attente",
            "You have event changes that aren't applied yet. Press Apply event changes.": "Vous avez des changements d\'événements non appliqués. Appuyez sur Appliquer les changements d\'événements.",
            "You have event changes that haven't been applied. Get the save without them?": "Vous avez des changements d\'événements non appliqués. Obtenir la sauvegarde sans eux ?",
            // New Game+
            "New Game+": "Nouvelle partie+",
            "New campaign's save file": "Fichier de sauvegarde de la nouvelle campagne",
            "Options": "Options",
            "Keep each hero's equipped weapons and trinket": "Garder les armes et le bijou équipés de chaque héros",
            "Build New Game+": "Créer Nouvelle partie+",
            "Reset the virtues of all heroes (VirtueOneValue and VirtueTwoValue) to the new campaign's": "Remettre les vertus de tous les héros (VirtueOneValue et VirtueTwoValue) à celles de la nouvelle campagne",
            "In the game, start a new Act 1 campaign with the heroes you want to play, and set the difficulty.": "Dans le jeu, lancez une nouvelle campagne de l\'Acte 1 avec les héros que vous voulez jouer et réglez la difficulté.",
            "As soon as you can save, save, then exit the game.": "Dès que vous pouvez sauvegarder, sauvegardez, puis quittez le jeu.",
            "Choose that new campaign's save below, pick your options and press Build New Game+.": "Choisissez ci-dessous la sauvegarde de cette nouvelle campagne, choisissez vos options et appuyez sur Créer Nouvelle partie+.",
            "Download the result and replace the new campaign's save with it: copy it into that slot's folder. It is named one second newer, so the game loads it.": "Téléchargez le résultat et remplacez par lui la sauvegarde de la nouvelle campagne : copiez-le dans le dossier de cet emplacement. Il porte un nom plus récent d\'une seconde, donc le jeu le charge.",
            "The virtues of all heroes are reset to the new campaign's.": "Les vertus de tous les héros sont remises à celles de la nouvelle campagne.",
            "The virtues of all heroes are kept.": "Les vertus de tous les héros sont conservées.",
            "Download the save": "Télécharger la sauvegarde",
            "Open it in the editor": "L\'ouvrir dans l\'éditeur",
            "Close": "Fermer",
            "Options changed. Press Build New Game+ again.": "Les options ont changé. Appuyez de nouveau sur Créer Nouvelle partie+.",
            "That file doesn't look like a Legends of the Dark save.": "Ce fichier ne ressemble pas à une sauvegarde de Legends of the Dark.",
            "That is the same campaign as the save you have open. Choose the save of a new campaign.": "C\'est la même campagne que la sauvegarde ouverte. Choisissez la sauvegarde d\'une nouvelle campagne.",
            "That is an Act 2 campaign. New Game+ is meant to start from a new Act 1 campaign.": "C\'est une campagne de l\'Acte 2. Nouvelle partie+ est prévue pour partir d\'une nouvelle campagne de l\'Acte 1.",
            "Use it anyway?": "L\'utiliser quand même ?",
            "Each hero's equipped weapons and trinket are kept.": "Les armes et le bijou équipés de chaque héros sont conservés.",
            "Each hero starts with the new campaign's weapons and trinket.": "Chaque héros commence avec les armes et le bijou de la nouvelle campagne.",
            "Open the New Game+ save in the editor? The save that is open now will be replaced here (the file itself isn't changed).": "Ouvrir la sauvegarde Nouvelle partie+ dans l\'éditeur ? La sauvegarde ouverte sera remplacée ici (le fichier lui-même ne change pas).",
            "WARNING: unknown progression issues": "AVERTISSEMENT : problèmes de progression inconnus",
            "Back up your save first and try it on a copy.": "Faites d\'abord une sauvegarde de secours de votre sauvegarde et essayez sur une copie.",
            "Mark all Act 2 missions done": "Marquer toutes les missions de l\'Acte 2 comme terminées",
            "Won (kept as saved)": "Gagnée (conservée telle quelle)",
            "Set the campaign progression number to match (18 + 2 per mission done)": "Ajuster le numéro de progression de la campagne (18 + 2 par mission terminée)",
            "All Act 2 missions marked done. Press Apply mission changes.": "Toutes les missions de l\'Acte 2 sont marquées comme terminées. Appuyez sur Appliquer les changements de missions.",
            "All Act 1 missions marked done. Press Apply mission changes.": "Toutes les missions de l\'Acte 1 sont marquées comme terminées. Appuyez sur Appliquer les changements de missions.",
            "All missions marked not done. Press Apply mission changes.": "Toutes les missions sont marquées comme non terminées. Appuyez sur Appliquer les changements de missions.",
            "Changing missions can cause unknown progression problems. It is meant for replaying missions after an act is complete.": "Modifier les missions peut causer des problèmes de progression inconnus. C\'est prévu pour rejouer des missions une fois un acte terminé.",
            "Apply the changes?": "Appliquer les changements ?",
            "The Act 2 counters were left as they are.": "Les compteurs de l\'Acte 2 ont été laissés tels quels.",
            "Campaign progression was left as it is.": "La progression de la campagne a été laissée telle quelle.",
            "Won": "Gagnée",
            "Lost": "Perdue",
            "Not played": "Non jouée",
            "n/a": "s.o.",
            "Applied.": "Appliqué.",
            "Changes discarded.": "Changements annulés.",
            "Nothing to apply.": "Rien à appliquer.",
            "Press Apply mission changes.": "Appuyez sur Appliquer les changements de missions.",
            "This save has no campaign progression number.": "Cette sauvegarde n'a pas de numéro de progression de campagne.",
            "This save has no campaign progression number, so none was set.": "Cette sauvegarde n'a pas de numéro de progression de campagne, donc aucun n'a été défini.",
            "You have changes that aren't applied yet. Press Apply mission changes.": "Vous avez des changements non appliqués. Appuyez sur Appliquer les changements de missions.",
            "The editor has no record of what opens after this combination of missions.": "L'éditeur ne sait pas ce qui s'ouvre après cette combinaison de missions.",
            "Tick the ones to open yourself.": "Cochez vous-même celles à ouvrir.",
            "You have mission changes that haven't been applied. Get the save without them?": "Vous avez des changements de missions non appliqués. Obtenir la sauvegarde sans eux ?",
            "Known": "Connu",
            "Owned": "Possédé",
            "You already own this": "Vous le possédez déjà",
            "You already know this recipe": "Vous connaissez déjà cette recette",
            // messages
            "Load a save file first.": "Chargez d'abord un fichier de sauvegarde.",
            "Nothing to clean up.": "Rien à nettoyer.",
            "No duplicates found.": "Aucun doublon trouvé.",
            "Reset to default.": "Valeurs initiales rétablies.",
            "Cleaned up.": "Nettoyage effectué.",
            "No materials for sale.": "Aucun matériau en vente.",
            "Everything available is already for sale or owned.": "Tout ce qui est disponible est déjà en vente ou possédé.",
            "Everything you can add is already for sale.": "Tout ce que vous pouvez ajouter est déjà en vente.",
            "Clean up this save?": "Nettoyer cette sauvegarde ?",
            "Continue?": "Continuer ?",
            "Please select a file before clicking 'Load'": "Sélectionnez un fichier avant de cliquer sur « Charger »",
            "The file API isn't supported on this browser yet.": "L'API de fichiers n'est pas encore prise en charge par ce navigateur.",
            // confirm boxes
            "Reset this save to the starting items, recipes, materials, gold, shop, skills, feats and hero gear of a new campaign?":
                "Rétablir cette sauvegarde avec les objets, recettes, matériaux, l'or, la boutique, les compétences, les exploits et l'équipement des héros du début d'une nouvelle campagne ?",
            "Story progress, party name and XP are kept.": "La progression de l'histoire, le nom du groupe et l'expérience sont conservés.",
            "This is an Act 2 campaign, but the default comes from the start of an Act 1 campaign.":
                "C'est une campagne de l'Acte 2, mais les valeurs initiales viennent du début d'une campagne de l'Acte 1.",
            "An Act 2 campaign may normally start with more than this.":
                "Une campagne de l'Acte 2 peut normalement commencer avec plus que cela.",
            "Marking a feat as completed while it's in progress stops you claiming its reward, and then you can't take on new feats.":
                "Marquer un exploit comme accompli alors qu'il est en cours vous empêche de réclamer sa récompense, et vous ne pouvez plus entreprendre de nouveaux exploits.",
            "Removed the Act 2 items, except these, which are equipped:": "Les objets de l'Acte 2 ont été retirés, sauf ceux-ci, qui sont équipés :",
            "Swap them out in the game, or untick them on the hero tab after fitting another part.":
                "Remplacez-les dans le jeu, ou décochez-les dans l'onglet du héros après avoir équipé une autre pièce.",
            // notes in the act controls
            "This save owns Act 2.": "Cette sauvegarde possède l'Acte 2.",
            "This save doesn't own Act 2, so Act 2 items are locked.": "Cette sauvegarde ne possède pas l'Acte 2 : les objets de l'Acte 2 sont donc verrouillés.",
            "Only allow them if you know the campaign supports it.": "Ne les autorisez que si vous savez que la campagne les prend en charge.",
            "Act 2 content is hidden.": "Le contenu de l'Acte 2 est masqué.",
            // tooltips
            "Included in the upgraded version. Untick the upgrade to go back to the base.":
                "Inclus dans la version améliorée. Décochez l'amélioration pour revenir à la base.",
            "The number the save stores for this enemy": "Le nombre que la sauvegarde enregistre pour cet ennemi",
            "Swap it out in the game first, then untick it here.": "Remplacez-le d'abord dans le jeu, puis décochez-le ici.",
            "Swap it out in the game first, then untick the recipe.": "Remplacez-le d'abord dans le jeu, puis décochez la recette."
        });

        /* ---------- Paragraphs, matched by how they start ---------- */
        const PARAGRAPHS = [
        ['Experimental, and less certain than missions',
         'Expérimental et moins sûr que les missions : aucune sauvegarde ne montre un événement en train d\'être joué, seulement des événements en attente et des événements terminés. Un événement narratif attend dans la même liste ouverte que les missions. Un événement de ville attend en ville ; on peut le marquer comme terminé ou le retirer de la ville, mais pas le remettre, car son emplacement n\'est connu que tant qu\'il attend. Les choix d\'histoire que font les événements ne sont pas modifiés.'],
        ['New Game+ starts the story again',
         'Nouvelle partie+ recommence l\'histoire à la Mission 1 et garde ce que vous avez gagné : objets, recettes, armes et améliorations, matériaux, or, compétences, exploits, faiblesses des ennemis et les armes et le bijou équipés de chaque héros. Pour cela, tout est déplacé dans la sauvegarde d\'une nouvelle campagne. La sauvegarde ouverte n\'est pas modifiée.'],
        ['Everything about the story comes from the new campaign',
         'Tout ce qui concerne l\'histoire vient de la nouvelle campagne : missions, résultats, choix de l\'histoire, événements, boutique, nom du groupe, difficulté, XP, relances d\'exploits, Légendes et compagnons. Les héros qui jouent viennent aussi de la nouvelle campagne, ils ne sont donc pas modifiés ici.'],
        ['It has had only light testing in the game.',
         'Cela n\'a été que peu testé dans le jeu. Faites d\'abord des copies de sauvegarde.'],
        ['Changing missions can cause progression problems',
         'Modifier les missions peut causer des problèmes de progression que personne n\'a encore étudiés. Le jeu peut débloquer ce qu\'il ne faut pas, sauter ou répéter l\'histoire, ou empêcher la campagne d\'avancer.'],
        ['This tab is meant for replaying missions',
         'Cet onglet est prévu pour rejouer des missions une fois un acte terminé : décochez Terminée sur une mission finie et cochez Ouverte sur la carte pour la rejouer. Il ne sert pas à sauter des passages de l\'histoire et n\'a pas été testé pour cela.'],
        ['Experimental. This was worked out from a few saves',
         'Expérimental. Ceci a été déduit de quelques sauvegardes : utilisez-le sur une copie de votre sauvegarde. L\'Acte 1 vient d\'une paire de sauvegardes avant et après et n\'a été que peu testé dans le jeu ; l\'Acte 2 vient d\'une seule sauvegarde terminée et n\'a pas été testé dans le jeu.'],
        ['This is an Act 2 campaign. Act 2 was worked out',
         'C\'est une campagne de l\'Acte 2. L\'Acte 2 a été déduit d\'une seule sauvegarde terminée, sans paire avant et après : il est donc moins sûr que l\'Acte 1. Les résultats de l\'Acte 2 ne peuvent pas être modifiés et ses deux compteurs de missions ne sont pas touchés.'],
        ['Tick Done for the missions the party has finished',
         'Cochez Terminée pour les missions que le groupe a finies et choisissez Gagnée ou Perdue. Cochez Ouverte sur la carte pour les missions que la carte doit proposer ensuite.'],
        ['Press Apply mission changes. It updates',
         'Appuyez sur Appliquer les changements de missions. Cela met à jour les listes de missions terminées et ouvertes, le journal de campagne, le résultat de chaque mission, la dernière mission de la carte et le numéro de progression de la campagne (18 plus 2 par mission terminée).'],
        ['Heroes who haven\'t joined yet, gold, XP',
         'Les héros qui n\'ont pas encore rejoint le groupe, l\'or, l\'XP, les relances d\'exploits et les événements de l\'histoire ne sont pas modifiés.'],
        ['Tick an enemy to reveal all its weaknesses',
         'Cochez un ennemi pour révéler toutes ses faiblesses et résistances, ou décochez-le pour l\'oublier. Les étiquettes pleines sont révélées. Les étiquettes en pointillés sont encore cachées.'],
        ['The small "flags" number under an enemy',
         'Le petit nombre « flags » sous un ennemi est ce que la sauvegarde enregistre pour lui. Une partie de ce nombre (le bit 0) n\'est pas comprise et est ignorée ; elle est activée chaque fois qu\'un ennemi est révélé.'],
            ['Save files end in .sav',
             'Les fichiers de sauvegarde se terminent par .sav et ressemblent à 2026-09-29_20-05-46.sav. Le fichier est lu dans votre navigateur et n\'est jamais envoyé nulle part. Votre copie modifiée porte un nom plus récent d\'une seconde, ce qui permet au jeu de la charger comme votre dernière sauvegarde. Gardez une copie de sauvegarde de l\'original.'],
            ['Only one of each is sold.',
             'Un seul exemplaire de chaque est vendu. Décochez-en un pour le retirer des étagères. Ajoutez-en d\'autres dans l\'onglet Articles de la boutique.'],
            ['Nothing for sale yet.',
             'Rien n\'est encore en vente. Ajoutez-en dans l\'onglet Articles de la boutique.'],
            ['"Add everything" puts every item and recipe',
             '« Tout ajouter » met en vente tous les objets et recettes de la liste ci-dessous (ceux de l\'Acte 2 seulement si la campagne les autorise). Cela peut faire quelques centaines d\'entrées, ce qui n\'a pas été essayé dans le jeu : testez d\'abord sur une copie de votre sauvegarde. « Tout retirer » les enlève tous.'],
            ['Base: you own it (you buy or find it',
             'Base : vous le possédez (on l\'achète ou on le trouve, il n\'a donc pas de recette). Recette améliorée : vous connaissez la recette de la version améliorée. Amélioré : vous l\'avez amélioré, ce qui inclut la base.'],
            ['Each has two recipes:',
             'Chacun a deux recettes : la normale (Recette) et celle de la version améliorée Plus (Recette améliorée). Base : vous l\'avez fabriqué (il va dans votre inventaire et une meilleure pièce est équipée au héros). Amélioré : vous l\'avez amélioré, ce qui inclut la base. Ce que vous achetez ou trouvez n\'a pas de Recette.'],
            ['Each is sold once.',
             'Chacun n\'est vendu qu\'une fois. Les objets que vous possédez et les recettes que vous connaissez ne peuvent pas être ajoutés : acheter ne peut donc pas créer de doublon.'],
            ['Extra items the shop rolls each time it restocks',
             'Objets supplémentaires que la boutique tire à chaque réapprovisionnement.'],
            ['Only what you can still add is listed',
             'Seul ce que vous pouvez encore ajouter est listé : les objets que vous possédez et les recettes que vous connaissez sont omis. Les armes sont groupées par héros, avec la partie A, la partie B et la partie C de chaque arme comme sur les pages des héros.'],
            ['Puts back any missing "no part"',
             'Remet les options « sans pièce » manquantes, marque comme fabriquées les recettes de ce que vous possédez, supprime les objets, recettes et entrées de liste en double, regroupe les piles répétées de matériaux et de la boutique, ne garde que la version améliorée quand vous avez les deux, et supprime les recettes que l\'éditeur d\'origine a écrites pour des objets achetés. Vous verrez la liste complète avant que quoi que ce soit ne change.'],
            ['Puts items, recipes, materials, gold',
             'Remet objets, recettes, matériaux, or, boutique, compétences, exploits et l\'équipement de chaque héros comme au début d\'une nouvelle campagne de l\'Acte 1. La progression de l\'histoire, le nom du groupe, l\'expérience et tout le reste sont conservés.'],
            ['The crafting materials and elements the shop sells',
             'Les matériaux d\'artisanat et éléments que vend la boutique. 0 signifie qu\'ils ne sont pas en vente.'],
            ['The shop normally restocks after each quest',
             'La boutique se réapprovisionne normalement après chaque quête, ce qui remplace cette liste.'],
            ['The weaknesses and resistances come from',
             'Les faiblesses et résistances viennent de la liste d\'ennemis de DescentForge. Les ennemis d\'une sauvegarde qui ne figurent pas sur cette liste ne sont jamais modifiés.'],
            ['Weapons any hero can use.',
             'Armes que n\'importe quel héros peut utiliser. Possédé donne les parties A, B et C ; amélioré améliore la partie A.'],
            ['Items from this campaign that don\'t fit',
             'Objets de cette campagne qui ne rentrent pas dans les tableaux ci-dessus.']
        ];

        /* ---------- Sentences with numbers and names ---------- */
        const plural = (n, one, many) => (parseInt(n) === 1 ? one : many);
        const typeList = s => s.split(", ").map(t => TYPES[t] || t).join(", ");

        const SENTENCES = [
            [/^Added (\d+)\.$/, m => `${m[1]} ajoutés.`],
            [/^Removed (\d+)\.$/, m => `${m[1]} retirés.`],
            [/^Kept (\d+) that are equipped\.$/, m => `${m[1]} conservés car équipés.`],
            [/^Skipped (\d+) Act 2 items this campaign doesn't allow\.$/, m => `${m[1]} objets de l'Acte 2 ignorés, que cette campagne n'autorise pas.`],
            [/^Skipped (\d+) hidden Act 2 items\.$/, m => `${m[1]} objets masqués de l'Acte 2 ignorés.`],
            [/^Skipped (\d+) Act 2 enemies this campaign doesn't allow\.$/, m => `${m[1]} ennemis de l'Acte 2 ignorés, que cette campagne n'autorise pas.`],
            [/^Skipped (\d+) hidden Act 2 enemies\.$/, m => `${m[1]} ennemis masqués de l'Acte 2 ignorés.`],
            [/^Took (\d+) items? you now own off the shop shelves\.$/, m =>
                `${m[1]} ${plural(m[1], "objet que vous possédez désormais a été retiré", "objets que vous possédez désormais ont été retirés")} des étagères de la boutique.`],
            [/^Set (\d+) materials to (\d+)\.$/, m => `${m[1]} matériaux fixés à ${m[2]}.`],
            [/^Every material is now (\d+) for sale\.$/, m => `Chaque matériau est désormais en vente (${m[1]}).`],
            [/^Put (\d+) items and recipes on sale\.$/, m => `${m[1]} objets et recettes mis en vente.`],
            [/^Removed (\d+) items and recipes\.$/, m => `${m[1]} objets et recettes retirés.`],
            [/^(\d+) kinds of fix applied\.$/, m => `${m[1]} types de corrections appliquées.`],
            [/^(\d+) kinds? of problem found\.$/, m => `${m[1]} ${plural(m[1], "type de problème trouvé", "types de problèmes trouvés")}.`],
            [/^(\d+) materials for sale$/, m => `${m[1]} matériaux en vente`],
            [/^(\d+) items and recipes for sale$/, m => `${m[1]} objets et recettes en vente`],
            [/^1 item or recipe for sale$/, () => "1 objet ou recette en vente"],
            [/^(\d+) listed, (\d+) for sale$/, m => `${m[1]} listés, ${m[2]} en vente`],
            [/^(\d+) other entr(?:y isn't|ies aren't) on DescentForge's list and (?:is|are) left alone\.$/, m =>
                `${m[1]} ${plural(m[1], "autre entrée ne figure pas sur la liste de DescentForge et n'est pas modifiée", "autres entrées ne figurent pas sur la liste de DescentForge et ne sont pas modifiées")}.`],
            [/^flags (\d+)$/, m => `flags ${m[1]}`],
            [/^(\d+) Act 2 items? (?:is|are) in this save, which can break a campaign without Act 2\.$/, m =>
                `${m[1]} ${plural(m[1], "objet de l'Acte 2 se trouve", "objets de l'Acte 2 se trouvent")} dans cette sauvegarde, ce qui peut casser une campagne sans l'Acte 2.`],
            [/^Revealed (\d+) enemies\.$/, m => `${m[1]} ennemis révélés.`],
        [/^Forgot (\d+) enemies\.$/, m => `${m[1]} ennemis oubliés.`],
        [/^(\d+) of (\d+) enemies fully revealed\.$/, m => `${m[1]} ennemis sur ${m[2]} entièrement révélés.`],
        [/^Party name: (.*)$/, m => `Nom du groupe : ${m[1]}`],
        [/^(.+) \(kept as saved\)$/, m => `${m[1]} (conservée telle quelle)`],
        [/^Campaign progression: (\d+) \(it will be left as it is\)\.$/, m => `Progression de la campagne : ${m[1]} (elle sera laissée telle quelle).`],
        [/^New campaign: (.*), (Act 1|Act 2), game version (.+), (owns Act 2|doesn't own Act 2)\.$/, m => `Nouvelle campagne : ${m[1]}, ${m[2] === "Act 1" ? "Acte 1" : "Acte 2"}, version du jeu ${m[3]}, ${m[4] === "owns Act 2" ? "possède l\'Acte 2" : "ne possède pas l\'Acte 2"}.`],
        [/^That campaign already has (\d+) finished missions?, so it doesn't look brand new\.$/, m => `Cette campagne a déjà ${m[1]} ${m[1] === "1" ? "mission terminée" : "missions terminées"}, elle ne semble donc pas neuve.`],
        [/^Items kept: (\d+)\.$/, m => `Objets conservés : ${m[1]}.`],
        [/^Recipes kept: (\d+)\.$/, m => `Recettes conservées : ${m[1]}.`],
        [/^Materials kept: (\d+)\.$/, m => `Matériaux conservés : ${m[1]}.`],
        [/^Gold kept: (\d+)\.$/, m => `Or conservé : ${m[1]}.`],
        [/^Skills kept: (\d+)\.$/, m => `Compétences conservées : ${m[1]}.`],
        [/^Feats kept: (\d+)\.$/, m => `Exploits conservés : ${m[1]}.`],
        [/^Enemies with known weaknesses kept: (\d+)\.$/, m => `Ennemis aux faiblesses connues conservés : ${m[1]}.`],
        [/^Took (\d+) items and recipes you already have off the shop shelves\.$/, m => `${m[1]} objets et recettes que vous avez déjà ont été retirés des étagères de la boutique.`],
        [/^Left out because the new campaign doesn't own Act 2: (\d+) from (.+)\.$/, m => `Laissés de côté car la nouvelle campagne ne possède pas l\'Acte 2 : ${m[1]} de ${m[2]}.`],
        [/^The new campaign doesn't own Act 2 and (.+)'s gear uses Act 2 parts, so (.+) keeps the new campaign's starting gear\.$/, m => `La nouvelle campagne ne possède pas l\'Acte 2 et l\'équipement de ${m[1]} utilise des pièces de l\'Acte 2 : ${m[2]} garde donc l\'équipement de départ de la nouvelle campagne.`],
        [/^Built\. The file will be named (.+)\. Download it, or open it here to look it over\.$/, m => `Créé. Le fichier s\'appellera ${m[1]}. Téléchargez-le, ou ouvrez-le ici pour le vérifier.`],
        [/^City event (\d+)$/, m => `Événement de ville ${m[1]}`],
        [/^Narrative events done: (\d+)\.$/, m => `Événements narratifs terminés : ${m[1]}.`],
        [/^City events done: (\d+)\.$/, m => `Événements de ville terminés : ${m[1]}.`],
        [/^Downloaded (.+)\. Replace the new campaign's save with it: copy it into that slot's folder\.$/, m => `${m[1]} téléchargé. Remplacez par lui la sauvegarde de la nouvelle campagne : copiez-le dans le dossier de cet emplacement.`],
        [/^Quest (\d+)$/, m => missionName(m[0], "fra")],
        [/^Side quest (\d+)$/, m => missionName(m[0], "fra")],
        [/^Act 2 quest (\d+)$/, m => missionName(m[0], "fra")],
        [/^Other mission$/, m => missionName(m[0], "fra")],
        [/^(.+) \(as saved\)$/, m => `${m[1]} (comme enregistré)`],
        [/^Campaign progression: (\d+)\. After applying: (\d+)\.$/, m => `Progression de la campagne : ${m[1]}. Après application : ${m[2]}.`],
        [/^Campaign progression: (\d+)\.$/, m => `Progression de la campagne : ${m[1]}.`],
        [/^Campaign progression is now (\d+)\.$/, m => `La progression de la campagne est maintenant ${m[1]}.`],
        [/^Missions done: (\d+)\.$/, m => `Missions terminées : ${m[1]}.`],
        [/^Open on the map: (\d+)\.$/, m => `Ouvertes sur la carte : ${m[1]}.`],
        [/^Open on the map: (\d+), as in a save with these missions done\.$/, m => `Ouvertes sur la carte : ${m[1]}, comme dans une sauvegarde avec ces missions terminées.`],
        [/^Couldn't find a result entry for: (.+)\.$/, m => `Résultat introuvable pour : ${m[1]}.`],
            [/^Loaded: (.+)$/, m => `Chargé : ${m[1]}`],
            [/^Weak to: (.+)$/, m => `Faible contre : ${typeList(m[1])}`],
            [/^Resists: (.+)$/, m => `Résiste à : ${typeList(m[1])}`],
            // alerts about equipped things (the name comes first)
            [/^(.+) is equipped by (.+)\.$/, m => `${m[1]} est équipé par ${m[2]}.`],
            [/^(.+) is equipped\.$/, m => `${m[1]} est équipé.`],
            [/^(.+) is fitted to a weapon\.$/, m => `${m[1]} est fixé à une arme.`],
            [/^This file isn't a readable save: (.*)$/, m => `Ce fichier n'est pas une sauvegarde lisible : ${m[1]}`],
            // the lines of the clean-up list
            [/^Duplicate items removed: (.+)$/, m => `Objets en double supprimés : ${m[1]}`],
            [/^Base items removed where the upgrade is owned: (.+)$/, m => `Objets de base supprimés là où l'amélioration est possédée : ${m[1]}`],
            [/^Materials combined into one stack: (.+)$/, m => `Matériaux regroupés en une seule pile : ${m[1]}`],
            [/^Duplicate recipes removed: (.+)$/, m => `Recettes en double supprimées : ${m[1]}`],
            [/^Recipes for bought items removed \((\d+)\): (.+)$/, m => `Recettes d'objets achetés supprimées (${m[1]}) : ${m[2]}`],
            [/^Repeated entries removed from: (.+)$/, m => `Entrées répétées supprimées de : ${m[1]}`],
            [/^Shop entries combined: (.+)$/, m => `Entrées de la boutique regroupées : ${m[1]}`],
            [/^Missing "no part" options put back: (.+)$/, m => `Options « sans pièce » manquantes remises : ${m[1]}`],
            [/^Recipes marked crafted for items you own: (.+)$/, m => `Recettes marquées comme fabriquées pour des objets possédés : ${m[1]}`]
        ];

        // Tooltips and accessibility labels: "<name> for sale", "<name> recipe known", ...
        const ATTRIBUTES = [
            [/^(.+) event done$/, m => `${m[1]} : événement terminé`],
            [/^(.+) event pending$/, m => `${m[1]} : événement en attente`],
            [/^(.+) done$/, m => `${missionName(m[1], "fra")} terminée`],
            [/^(.+) result$/, m => `${missionName(m[1], "fra")} : résultat`],
            [/^(.+) open on the map$/, m => `${missionName(m[1], "fra")} ouverte sur la carte`],
            [/^Quantity of (.+) for sale$/, m => `Quantité de ${m[1]} en vente`],
            [/^Amount of every material for sale$/, () => "Quantité de chaque matériau en vente"],
            [/^Amount for every material$/, () => "Quantité de chaque matériau"],
            [/^(.+) plus recipe known$/, m => `${m[1]} : recette améliorée connue`],
            [/^(.+) recipe known$/, m => `${m[1]} : recette connue`],
            [/^(.+) for sale$/, m => `${m[1]} en vente`],
            [/^Forget (.+)$/, m => `Oublier ${m[1]}`],
            [/^(.+) owned$/, m => `${m[1]} possédé`],
            [/^(.+) upgraded$/, m => `${m[1]} amélioré`],
            [/^(.+) revealed$/, m => `${m[1]} révélé`],
        [/^(.+) known$/, m => `${m[1]} connu`]
        ];
        return { types: TYPES, exact: EXACT, paragraphs: PARAGRAPHS, sentences: SENTENCES, attributes: ATTRIBUTES };
    }

    const PACKS = { spa: spanishPack(), fra: frenchPack() };
    const LANG_CODES = { eng: "en", ita: "it", spa: "es", fra: "fr" };

    // The pack for the language the page is in, or null (English and Italian are not translated here)
    function pack() {
        return typeof language !== "undefined" ? (PACKS[language] || null) : null;
    }

    /* ---------- Translating a piece of text ---------- */
    function translateSentence(sentence, p) {
        if (Object.prototype.hasOwnProperty.call(p.exact, sentence)) return p.exact[sentence];
        for (const [re, fn] of p.sentences) {
            const m = re.exec(sentence);
            if (m) return fn(m);
        }
        return null;
    }

    function translateLine(line, p) {
        const lead = /^\s*/.exec(line)[0];
        const trail = /\s*$/.exec(line)[0];
        const core = line.trim();
        if (!core) return line;
        let done = translateSentence(core, p);
        if (done === null) {
            const para = p.paragraphs.find(x => core.startsWith(x[0]));
            if (para) done = para[1];
        }
        if (done === null) {
            // Several sentences in a row ("Added 5. Skipped 3 ...")
            const parts = core.split(/(?<=[.!?])\s+/);
            if (parts.length > 1) {
                let changed = false;
                const out = parts.map(x => {
                    const t = translateSentence(x, p);
                    if (t === null) return x;
                    changed = true;
                    return t;
                });
                if (changed) done = out.join(" ");
            }
        }
        return done === null ? line : lead + done + trail;
    }

    // Returns the text in the chosen language, or the original if there's nothing to translate
    window.translateText = function (text) {
        const p = pack();
        if (!p || !text) return text;
        if (text.indexOf("\n") >= 0) return text.split("\n").map(l => translateLine(l, p)).join("\n");
        return translateLine(text, p);
    };

    function translateAttribute(value, p) {
        const exact = translateSentence(value.trim(), p);
        if (exact !== null) return exact;
        for (const [re, fn] of p.attributes) {
            const m = re.exec(value);
            if (m) return fn(m);
        }
        const para = p.paragraphs.find(x => value.startsWith(x[0]));
        return para ? para[1] : value;
    }

    /* ---------- Keeping the page in step ---------- */
    const ATTRS = ["title", "aria-label", "placeholder"];

    function translateTextNode(node) {
        if (node.__tr !== undefined && node.nodeValue === node.__tr) return;   // ours already
        node.__en = node.nodeValue;
        const p = pack();
        if (!p) { node.__tr = undefined; return; }
        const done = window.translateText(node.nodeValue);
        node.__tr = done;
        if (done !== node.nodeValue) node.nodeValue = done;
    }

    function translateAttributes(el) {
        const p = pack();
        for (const a of ATTRS) {
            if (!el.hasAttribute || !el.hasAttribute(a)) continue;
            const value = el.getAttribute(a);
            el.__tr = el.__tr || {};
            el.__en = el.__en || {};
            if (el.__tr[a] !== undefined && value === el.__tr[a]) continue;    // ours already
            el.__en[a] = value;
            if (!p) { el.__tr[a] = undefined; continue; }
            const done = translateAttribute(value, p);
            el.__tr[a] = done;
            if (done !== value) el.setAttribute(a, done);
        }
    }

    function walk(root) {
        if (root.nodeType === 3) { translateTextNode(root); return; }
        if (root.nodeType !== 1) return;
        if (root.tagName === "SCRIPT" || root.tagName === "STYLE") return;
        translateAttributes(root);
        for (let child = root.firstChild; child; child = child.nextSibling) walk(child);
    }

    // Put the English back (before another language is applied, or when going back to English)
    function restore(root) {
        if (root.nodeType === 3) {
            if (root.__en !== undefined && root.__tr !== undefined && root.nodeValue === root.__tr) root.nodeValue = root.__en;
            root.__tr = undefined;
            return;
        }
        if (root.nodeType !== 1) return;
        if (root.__en && root.__tr) {
            for (const a of ATTRS) {
                if (root.__tr[a] !== undefined && root.getAttribute(a) === root.__tr[a] && root.__en[a] !== undefined) {
                    root.setAttribute(a, root.__en[a]);
                }
                root.__tr[a] = undefined;
            }
        }
        for (let child = root.firstChild; child; child = child.nextSibling) restore(child);
    }

    let observer = null;
    function startObserver() {
        if (observer || typeof MutationObserver === "undefined") return;
        observer = new MutationObserver(records => {
            if (!pack()) return;
            for (const r of records) {
                if (r.type === "characterData") translateTextNode(r.target);
                else if (r.type === "attributes") translateAttributes(r.target);
                else r.addedNodes.forEach(walk);
            }
        });
        observer.observe(document.body, {
            childList: true, subtree: true, characterData: true,
            attributes: true, attributeFilter: ATTRS
        });
    }

    // Called when the language changes
    window.applyLanguage = function () {
        startObserver();
        document.documentElement.lang = LANG_CODES[language] || "en";
        restore(document.body);          // back to English first, so switching between languages works
        if (pack()) walk(document.body);
    };

    // Alert and confirm boxes
    const nativeAlert = window.alert.bind(window);
    const nativeConfirm = window.confirm.bind(window);
    window.alert = message => nativeAlert(window.translateText(String(message)));
    window.confirm = message => nativeConfirm(window.translateText(String(message)));
})();
