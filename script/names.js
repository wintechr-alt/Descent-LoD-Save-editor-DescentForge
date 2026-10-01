/*
    Item names, recipe list and game-ID spellings, taken from the DescentForge
    campaign editor's built-in catalog. Used to show readable names next to IDs
    and to tell real recipes from made-up ones.
*/
const ITEM_NAMES = {
"ARMOR_1": {
"en": "Duskplate",
"es": "Duskplate"
},
"ARMOR_10": {
"en": "Stalwart Mail",
"es": "Stalwart Mail"
},
"ARMOR_10_PLUS": {
"en": "Stalwart Mail Plus",
"es": "Stalwart Mail (mejorado)"
},
"ARMOR_11": {
"en": "Enemy's Plight",
"es": "Enemy's Plight"
},
"ARMOR_11_PLUS": {
"en": "Enemy's Plight Plus",
"es": "Enemy's Plight (mejorado)"
},
"ARMOR_12": {
"en": "Noble Attire",
"es": "Noble Attire"
},
"ARMOR_12_PLUS": {
"en": "Noble Attire Plus",
"es": "Noble Attire (mejorado)"
},
"ARMOR_13": {
"en": "Sinister Robe",
"es": "Sinister Robe"
},
"ARMOR_13_PLUS": {
"en": "Sinister Robe Plus",
"es": "Sinister Robe (mejorado)"
},
"ARMOR_14": {
"en": "Seven-button Vest",
"es": "Seven-button Vest"
},
"ARMOR_14_PLUS": {
"en": "Seven-button Vest Plus",
"es": "Seven-button Vest (mejorado)"
},
"ARMOR_15": {
"en": "Imperceptible Cape",
"es": "Imperceptible Cape"
},
"ARMOR_15_PLUS": {
"en": "Imperceptible Cape Plus",
"es": "Imperceptible Cape (mejorado)"
},
"ARMOR_16": {
"en": "Robe of Camradarie",
"es": "Robe of Camradarie"
},
"ARMOR_16_PLUS": {
"en": "Robe of Camradarie Plus",
"es": "Robe of Camradarie (mejorado)"
},
"ARMOR_17": {
"en": "Tarianor Tunic",
"es": "Tarianor Tunic"
},
"ARMOR_17_PLUS": {
"en": "Tarianor Tunic Plus",
"es": "Tarianor Tunic (mejorado)"
},
"ARMOR_18": {
"en": "Cloak of Sorrow",
"es": "Cloak of Sorrow"
},
"ARMOR_18_PLUS": {
"en": "Cloak of Sorrow Plus",
"es": "Cloak of Sorrow (mejorado)"
},
"ARMOR_19": {
"en": "Monument Plate",
"es": "Monument Plate"
},
"ARMOR_19_PLUS": {
"en": "Monument Plate Plus",
"es": "Monument Plate (mejorado)"
},
"ARMOR_1_PLUS": {
"en": "Duskplate Plus",
"es": "Duskplate (mejorado)"
},
"ARMOR_2": {
"en": "Plate of the Bloodstone",
"es": "Plate of the Bloodstone"
},
"ARMOR_20": {
"en": "Spire",
"es": "Spire"
},
"ARMOR_20_PLUS": {
"en": "Spire Plus",
"es": "Spire (mejorado)"
},
"ARMOR_21": {
"en": "Lightkeeper's Suit",
"es": "Lightkeeper's Suit"
},
"ARMOR_21_PLUS": {
"en": "Lightkeeper's Suit Plus",
"es": "Lightkeeper's Suit (mejorado)"
},
"ARMOR_22": {
"en": "Deep Elf Cowl",
"es": "Deep Elf Cowl"
},
"ARMOR_22_PLUS": {
"en": "Deep Elf Cowl Plus",
"es": "Deep Elf Cowl (mejorado)"
},
"ARMOR_23": {
"en": "Scholar's Robe",
"es": "Scholar's Robe"
},
"ARMOR_23_PLUS": {
"en": "Scholar's Robe Plus",
"es": "Scholar's Robe (mejorado)"
},
"ARMOR_24": {
"en": "Glimmer Hood",
"es": "Glimmer Hood"
},
"ARMOR_24_PLUS": {
"en": "Glimmer Hood Plus",
"es": "Glimmer Hood (mejorado)"
},
"ARMOR_25": {
"en": "Crossroads",
"es": "Crossroads"
},
"ARMOR_25_PLUS": {
"en": "Crossroads Plus",
"es": "Crossroads (mejorado)"
},
"ARMOR_26": {
"en": "Delver's Chain",
"es": "Delver's Chain"
},
"ARMOR_26_PLUS": {
"en": "Delver's Chain Plus",
"es": "Delver's Chain (mejorado)"
},
"ARMOR_27": {
"en": "Scout's Leathers",
"es": "Scout's Leathers"
},
"ARMOR_27_PLUS": {
"en": "Scout's Leathers Plus",
"es": "Scout's Leathers (mejorado)"
},
"ARMOR_2_PLUS": {
"en": "Plate of the Bloodstone Plus",
"es": "Plate of the Bloodstone (mejorado)"
},
"ARMOR_3": {
"en": "Skykeepers",
"es": "Skykeepers"
},
"ARMOR_3_PLUS": {
"en": "Skykeepers Plus",
"es": "Skykeepers (mejorado)"
},
"ARMOR_4": {
"en": "Memorium",
"es": "Memorium"
},
"ARMOR_4_PLUS": {
"en": "Memorium Plus",
"es": "Memorium (mejorado)"
},
"ARMOR_5": {
"en": "Sunforged Plate",
"es": "Sunforged Plate"
},
"ARMOR_5_PLUS": {
"en": "Sunforged Plate Plus",
"es": "Sunforged Plate (mejorado)"
},
"ARMOR_6": {
"en": "Wayfarer's Leather",
"es": "Wayfarer's Leather"
},
"ARMOR_6_PLUS": {
"en": "Wayfarer's Leather Plus",
"es": "Wayfarer's Leather (mejorado)"
},
"ARMOR_7": {
"en": "Stormring Mail",
"es": "Stormring Mail"
},
"ARMOR_7_PLUS": {
"en": "Stormring Mail Plus",
"es": "Stormring Mail (mejorado)"
},
"ARMOR_8": {
"en": "Undetaker's Coat",
"es": "Undetaker's Coat"
},
"ARMOR_8_PLUS": {
"en": "Undetaker's Coat Plus",
"es": "Undetaker's Coat (mejorado)"
},
"ARMOR_9": {
"en": "Slayer Leather",
"es": "Slayer Leather"
},
"ARMOR_9_PLUS": {
"en": "Slayer Leather Plus",
"es": "Slayer Leather (mejorado)"
},
"CSM_ANTIDOTE_POTION": {
"en": "Antidote Potion",
"es": "Poción de antídoto"
},
"CSM_ANTIDOTE_POTION_PLUS": {
"en": "Antidote Potion Plus",
"es": "Poción de antídoto (mejorado)"
},
"CSM_CAUTION": {
"en": "Caution Serum",
"es": "Suero de cautela"
},
"CSM_CAUTION_PLUS": {
"en": "Caution Serum Plus",
"es": "Suero de cautela (mejorado)"
},
"CSM_CRIMSON_POTION": {
"en": "Crimson Potion",
"es": "Poción de carmesí"
},
"CSM_CRIMSON_POTION_PLUS": {
"en": "Crimson Potion Plus",
"es": "Poción de carmesí (mejorado)"
},
"CSM_EFFICACIOUS": {
"en": "Efficacious Elixir",
"es": "Elixir eficaz"
},
"CSM_EFFICACIOUS_PLUS": {
"en": "Efficacious Elixir Plus",
"es": "Elixir eficaz (mejorado)"
},
"CSM_ENDURANCE_POTION": {
"en": "Endurance Potion",
"es": "Poción de aguante"
},
"CSM_ENDURANCE_POTION_PLUS": {
"en": "Endurance Potion Plus",
"es": "Poción de aguante (mejorado)"
},
"CSM_FIRE_GRENADE": {
"en": "Fire Grenade",
"es": "Granada de fuego"
},
"CSM_FIRE_GRENADE_PLUS": {
"en": "Fire Grenade Plus",
"es": "Granada de fuego (mejorado)"
},
"CSM_FOCUS_POTION": {
"en": "Focus Potion",
"es": "Poción de concentración"
},
"CSM_FOCUS_POTION_PLUS": {
"en": "Focus Potion Plus",
"es": "Poción de concentración (mejorado)"
},
"CSM_GLITTERDUST": {
"en": "Glitterdust Bomb",
"es": "Bomba de polvo brillante"
},
"CSM_GLITTERDUST_PLUS": {
"en": "Glitterdust Bomb Plus",
"es": "Bomba de polvo brillante (mejorado)"
},
"CSM_GUARDIAN_POTION": {
"en": "Guardian Potion",
"es": "Poción de guardián"
},
"CSM_GUARDIAN_POTION_PLUS": {
"en": "Guardian Potion Plus",
"es": "Poción de guardián (mejorado)"
},
"CSM_INVISIBILITY_POTION": {
"en": "Invisibility Potion",
"es": "Poción de invisibilidad"
},
"CSM_INVISIBILITY_POTION_PLUS": {
"en": "Invisibility Potion Plus",
"es": "Poción de invisibilidad (mejorado)"
},
"CSM_KNACK": {
"en": "Knack Juice",
"es": "Jugo de maña"
},
"CSM_KNACK_PLUS": {
"en": "Knack Juice Plus",
"es": "Jugo de maña (mejorado)"
},
"CSM_MAGE_DUST": {
"en": "Mage Dust",
"es": "Polvo de mago"
},
"CSM_MAGE_DUST_PLUS": {
"en": "Mage Dust Plus",
"es": "Polvo de mago (mejorado)"
},
"CSM_MIASMA_GRENADE": {
"en": "Miasma Grenade",
"es": "Granada de miasma"
},
"CSM_MIASMA_GRENADE_PLUS": {
"en": "Miasma Grenade Plus",
"es": "Granada de miasma (mejorado)"
},
"CSM_MUD_POTION": {
"en": "Mud Potion",
"es": "Poción de barro"
},
"CSM_MUD_POTION_PLUS": {
"en": "Mud Potion Plus",
"es": "Poción de barro (mejorado)"
},
"CSM_MUTATION_POTION": {
"en": "Mutation Potion",
"es": "Poción de mutación"
},
"CSM_MUTATION_POTION_PLUS": {
"en": "Mutation Potion Plus",
"es": "Poción de mutación (mejorado)"
},
"CSM_PHOENIX_ASH_POTION": {
"en": "Phoenix Ash Potion",
"es": "Poción de cenizas de fénix"
},
"CSM_PHOENIX_ASH_POTION_PLUS": {
"en": "Phoenix Ash Potion Plus",
"es": "Poción de cenizas de fénix (mejorado)"
},
"CSM_RABBITFOOT_POTION": {
"en": "Rabbitfoot Potion",
"es": "Poción de pata de conejo"
},
"CSM_RABBITFOOT_POTION_PLUS": {
"en": "Rabbitfoot Potion Plus",
"es": "Poción de pata de conejo (mejorado)"
},
"CSM_ROGUE_SWEAT": {
"en": "Rogue Sweat",
"es": "Sudor de pícaro"
},
"CSM_ROGUE_SWEAT_PLUS": {
"en": "Rogue Sweat Plus",
"es": "Sudor de pícaro (mejorado)"
},
"CSM_SLAYER_POTION": {
"en": "Slayer Potion",
"es": "Poción de matador"
},
"CSM_SLAYER_POTION_PLUS": {
"en": "Slayer Potion Plus",
"es": "Poción de matador (mejorado)"
},
"CSM_SMOKE_BOMB": {
"en": "Smoke Bomb",
"es": "Bomba de humo"
},
"CSM_SMOKE_BOMB_PLUS": {
"en": "Smoke Bomb Plus",
"es": "Bomba de humo (mejorado)"
},
"CSM_STALWART": {
"en": "Stalwart Incense",
"es": "Incienso temple"
},
"CSM_STALWART_PLUS": {
"en": "Stalwart Incense Plus",
"es": "Incienso temple (mejorado)"
},
"CSM_VIGOR_POTION": {
"en": "Vigor Potion",
"es": "Poción de vigor"
},
"CSM_VIGOR_POTION_PLUS": {
"en": "Vigor Potion Plus",
"es": "Poción de vigor (mejorado)"
},
"CSM_WARRIOR_BREATH": {
"en": "Warrior Breath",
"es": "Aliento de guerrero"
},
"CSM_WARRIOR_BREATH_PLUS": {
"en": "Warrior Breath Plus",
"es": "Aliento de guerrero (mejorado)"
},
"CSM_WHIRLWIND": {
"en": "Whirlwind Grenade",
"es": "Granada de torbellino"
},
"CSM_WHIRLWIND_PLUS": {
"en": "Whirlwind Grenade Plus",
"es": "Granada de torbellino (mejorado)"
},
"MAT_ANEMOS": {
"en": "Anemos",
"es": "Anemos"
},
"MAT_AQUOS": {
"en": "Aquos",
"es": "Aquos"
},
"MAT_BONE": {
"en": "Bone",
"es": "Hueso"
},
"MAT_CLOTH": {
"en": "Cloth",
"es": "Tela"
},
"MAT_CURIOS": {
"en": "Curios",
"es": "Curiosidades"
},
"MAT_FORTUNOS": {
"en": "Fortunos",
"es": "Fortunos"
},
"MAT_HERBS": {
"en": "Herbs",
"es": "Hierbas"
},
"MAT_IGNOS": {
"en": "Ignos",
"es": "Ignos"
},
"MAT_LEATHER": {
"en": "Leather",
"es": "Cuero"
},
"MAT_LUMOS": {
"en": "Lumos",
"es": "Lumos"
},
"MAT_METAL": {
"en": "Metal",
"es": "Metal"
},
"MAT_MINERALS": {
"en": "Minerals",
"es": "Minerales"
},
"MAT_MORTOS": {
"en": "Mortos",
"es": "Mortos"
},
"MAT_TERROS": {
"en": "Terros",
"es": "Terros"
},
"MAT_TOXOS": {
"en": "Toxos",
"es": "Toxos"
},
"MAT_UMBROS": {
"en": "Umbros",
"es": "Umbros"
},
"MAT_VIGOS": {
"en": "Vigos",
"es": "Vigos"
},
"RECIPE_ARMOR_10_PLUS": {
"en": "Stalwart Mail Plus",
"es": "Stalwart Mail (mejorado)"
},
"RECIPE_ARMOR_11_PLUS": {
"en": "Enemy's Plight Plus",
"es": "Enemy's Plight (mejorado)"
},
"RECIPE_ARMOR_12_PLUS": {
"en": "Noble Attire Plus",
"es": "Noble Attire (mejorado)"
},
"RECIPE_ARMOR_13_PLUS": {
"en": "Sinister Robe Plus",
"es": "Sinister Robe (mejorado)"
},
"RECIPE_ARMOR_14_PLUS": {
"en": "Seven-button Vest Plus",
"es": "Seven-button Vest (mejorado)"
},
"RECIPE_ARMOR_15_PLUS": {
"en": "Imperceptible Cape Plus",
"es": "Imperceptible Cape (mejorado)"
},
"RECIPE_ARMOR_16_PLUS": {
"en": "Robe of Camradarie Plus",
"es": "Robe of Camradarie (mejorado)"
},
"RECIPE_ARMOR_17_PLUS": {
"en": "Tarianor Tunic Plus",
"es": "Tarianor Tunic (mejorado)"
},
"RECIPE_ARMOR_18_PLUS": {
"en": "Cloak of Sorrow Plus",
"es": "Cloak of Sorrow (mejorado)"
},
"RECIPE_ARMOR_19_PLUS": {
"en": "Monument Plate Plus",
"es": "Monument Plate (mejorado)"
},
"RECIPE_ARMOR_1_PLUS": {
"en": "Duskplate Plus",
"es": "Duskplate (mejorado)"
},
"RECIPE_ARMOR_20_PLUS": {
"en": "Spire Plus",
"es": "Spire (mejorado)"
},
"RECIPE_ARMOR_21_PLUS": {
"en": "Lightkeeper's Suit Plus",
"es": "Lightkeeper's Suit (mejorado)"
},
"RECIPE_ARMOR_22_PLUS": {
"en": "Deep Elf Cowl Plus",
"es": "Deep Elf Cowl (mejorado)"
},
"RECIPE_ARMOR_23_PLUS": {
"en": "Scholar's Robe Plus",
"es": "Scholar's Robe (mejorado)"
},
"RECIPE_ARMOR_24_PLUS": {
"en": "Glimmer Hood Plus",
"es": "Glimmer Hood (mejorado)"
},
"RECIPE_ARMOR_25_PLUS": {
"en": "Crossroads Plus",
"es": "Crossroads (mejorado)"
},
"RECIPE_ARMOR_26_PLUS": {
"en": "Delver's Chain Plus",
"es": "Delver's Chain (mejorado)"
},
"RECIPE_ARMOR_27_PLUS": {
"en": "Scout's Leathers Plus",
"es": "Scout's Leathers (mejorado)"
},
"RECIPE_ARMOR_2_PLUS": {
"en": "Plate of the Bloodstone Plus",
"es": "Plate of the Bloodstone (mejorado)"
},
"RECIPE_ARMOR_3_PLUS": {
"en": "Skykeepers Plus",
"es": "Skykeepers (mejorado)"
},
"RECIPE_ARMOR_4_PLUS": {
"en": "Memorium Plus",
"es": "Memorium (mejorado)"
},
"RECIPE_ARMOR_5_PLUS": {
"en": "Sunforged Plate Plus",
"es": "Sunforged Plate (mejorado)"
},
"RECIPE_ARMOR_6_PLUS": {
"en": "Wayfarer's Leather Plus",
"es": "Wayfarer's Leather (mejorado)"
},
"RECIPE_ARMOR_7_PLUS": {
"en": "Stormring Mail Plus",
"es": "Stormring Mail (mejorado)"
},
"RECIPE_ARMOR_8_PLUS": {
"en": "Undetaker's Coat Plus",
"es": "Undetaker's Coat (mejorado)"
},
"RECIPE_ARMOR_9_PLUS": {
"en": "Slayer Leather Plus",
"es": "Slayer Leather (mejorado)"
},
"RECIPE_CSM_ANTIDOTE_POTION": {
"en": "Antidote Potion",
"es": "Poción de antídoto"
},
"RECIPE_CSM_ANTIDOTE_POTION_PLUS": {
"en": "Antidote Potion Plus",
"es": "Poción de antídoto (mejorado)"
},
"RECIPE_CSM_CRIMSON_POTION": {
"en": "Crimson Potion",
"es": "Poción de carmesí"
},
"RECIPE_CSM_CRIMSON_POTION_PLUS": {
"en": "Crimson Potion Plus",
"es": "Poción de carmesí (mejorado)"
},
"RECIPE_CSM_EFFICACIOUS": {
"en": "Efficacious Elixir",
"es": "Elixir eficaz"
},
"RECIPE_CSM_EFFICACIOUS_PLUS": {
"en": "Efficacious Elixir Plus",
"es": "Elixir eficaz (mejorado)"
},
"RECIPE_CSM_FIRE_GRENADE": {
"en": "Fire Grenade",
"es": "Granada de fuego"
},
"RECIPE_CSM_FIRE_GRENADE_PLUS": {
"en": "Fire Grenade Plus",
"es": "Granada de fuego (mejorado)"
},
"RECIPE_CSM_FOCUS_POTION": {
"en": "Focus Potion",
"es": "Poción de concentración"
},
"RECIPE_CSM_FOCUS_POTION_PLUS": {
"en": "Focus Potion Plus",
"es": "Poción de concentración (mejorado)"
},
"RECIPE_CSM_GLITTERDUST": {
"en": "Glitterdust Bomb",
"es": "Bomba de polvo brillante"
},
"RECIPE_CSM_GLITTERDUST_PLUS": {
"en": "Glitterdust Bomb Plus",
"es": "Bomba de polvo brillante (mejorado)"
},
"RECIPE_CSM_GUARDIAN_POTION": {
"en": "Guardian Potion",
"es": "Poción de guardián"
},
"RECIPE_CSM_GUARDIAN_POTION_PLUS": {
"en": "Guardian Potion Plus",
"es": "Poción de guardián (mejorado)"
},
"RECIPE_CSM_MAGE_DUST": {
"en": "Mage Dust Potion",
"es": "Polvo de mago"
},
"RECIPE_CSM_MAGE_DUST_PLUS": {
"en": "Mage Dust Potion Plus",
"es": "Polvo de mago (mejorado)"
},
"RECIPE_CSM_MIASMA_GRENADE": {
"en": "Miasma Grenade",
"es": "Granada de miasma"
},
"RECIPE_CSM_MIASMA_GRENADE_PLUS": {
"en": "Miasma Grenade Plus",
"es": "Granada de miasma (mejorado)"
},
"RECIPE_CSM_RABBITFOOT_POTION": {
"en": "Rabbitfoot Potion",
"es": "Poción de pata de conejo"
},
"RECIPE_CSM_RABBITFOOT_POTION_PLUS": {
"en": "Rabbitfoot Potion Plus",
"es": "Poción de pata de conejo (mejorado)"
},
"RECIPE_CSM_ROGUE_SWEAT": {
"en": "Rogue Sweat Potion",
"es": "Sudor de pícaro"
},
"RECIPE_CSM_ROGUE_SWEAT_PLUS": {
"en": "Rogue Sweat Potion Plus",
"es": "Sudor de pícaro (mejorado)"
},
"RECIPE_CSM_SMOKE_BOMB": {
"en": "Smoke Bomb",
"es": "Bomba de humo"
},
"RECIPE_CSM_SMOKE_BOMB_PLUS": {
"en": "Smoke Bomb Plus",
"es": "Bomba de humo (mejorado)"
},
"RECIPE_CSM_STALWART": {
"en": "Stalwart Incense",
"es": "Incienso temple"
},
"RECIPE_CSM_STALWART_PLUS": {
"en": "Stalwart Incense Plus",
"es": "Incienso temple (mejorado)"
},
"RECIPE_CSM_VIGOR_POTION": {
"en": "Vigor Potion",
"es": "Poción de vigor"
},
"RECIPE_CSM_VIGOR_POTION_PLUS": {
"en": "Vigor Potion Plus",
"es": "Poción de vigor (mejorado)"
},
"RECIPE_CSM_WARRIOR_BREATH": {
"en": "Warrior Breath Potion",
"es": "Aliento de guerrero"
},
"RECIPE_CSM_WARRIOR_BREATH_PLUS": {
"en": "Warrior Breath Potion Plus",
"es": "Aliento de guerrero (mejorado)"
},
"RECIPE_CSM_WHIRLWIND": {
"en": "Whirlwind Grenade",
"es": "Granada de torbellino"
},
"RECIPE_CSM_WHIRLWIND_PLUS": {
"en": "Whirlwind Grenade Plus",
"es": "Granada de torbellino (mejorado)"
},
"RECIPE_TRINKET10_ID_PLUS": {
"en": "Undying Skull Plus",
"es": "Undying Skull (mejorado)"
},
"RECIPE_TRINKET11_ID_PLUS": {
"en": "Wander's Stone (Rune) Plus",
"es": "Wander's Stone (Rune) (mejorado)"
},
"RECIPE_TRINKET12_ID_PLUS": {
"en": "War Rune Plus",
"es": "War Rune (mejorado)"
},
"RECIPE_TRINKET13_ID_PLUS": {
"en": "Bolt of Blood Plus",
"es": "Bolt of Blood (mejorado)"
},
"RECIPE_TRINKET15_ID_PLUS": {
"en": "Cracked Mirror Plus",
"es": "Cracked Mirror (mejorado)"
},
"RECIPE_TRINKET16_ID_PLUS": {
"en": "Fae Crystal Plus",
"es": "Fae Crystal (mejorado)"
},
"RECIPE_TRINKET17_ID_PLUS": {
"en": "Heart Thorn Root Plus",
"es": "Heart Thorn Root (mejorado)"
},
"RECIPE_TRINKET18_ID_PLUS": {
"en": "Mage Sight Goggles Plus",
"es": "Mage Sight Goggles (mejorado)"
},
"RECIPE_TRINKET19_ID_PLUS": {
"en": "Prescient Charm Plus",
"es": "Prescient Charm (mejorado)"
},
"RECIPE_TRINKET1_ID_PLUS": {
"en": "Bloodthirsty Bracers Plus",
"es": "Bloodthirsty Bracers (mejorado)"
},
"RECIPE_TRINKET21_ID_PLUS": {
"en": "Tarnished Brooch Plus",
"es": "Tarnished Brooch (mejorado)"
},
"RECIPE_TRINKET2_ID_PLUS": {
"en": "Brew Basket Plus",
"es": "Brew Basket (mejorado)"
},
"RECIPE_TRINKET3_ID_PLUS": {
"en": "Dead Man's Compass Plus",
"es": "Dead Man's Compass (mejorado)"
},
"RECIPE_TRINKET4_ID_PLUS": {
"en": "Horn of Courage Plus",
"es": "Horn of Courage (mejorado)"
},
"RECIPE_TRINKET5_ID_PLUS": {
"en": "Ironbound Rune Plus",
"es": "Ironbound Rune (mejorado)"
},
"RECIPE_TRINKET6_ID_PLUS": {
"en": "Lucky Charm Plus",
"es": "Lucky Charm (mejorado)"
},
"RECIPE_TRINKET7_ID_PLUS": {
"en": "Mana Weave (Rune) Plus",
"es": "Mana Weave (Rune) (mejorado)"
},
"RECIPE_TRINKET8_ID_PLUS": {
"en": "Shadow Bracers Plus",
"es": "Shadow Bracers (mejorado)"
},
"RECIPE_TRINKET9_ID_PLUS": {
"en": "Stormbound Pendant Plus",
"es": "Stormbound Pendant (mejorado)"
},
"RECIPE_TRINKET_20_ID_PLUS": {
"en": "Rusted Nail Plus",
"es": "Rusted Nail (mejorado)"
},
"RECIPE_WEAPON_PART_A_BOW_1_UPGRADED": {
"en": "Blood Wood Limbs Plus",
"es": "Blood Wood Limbs (mejorado)"
},
"RECIPE_WEAPON_PART_A_BOW_2_UPGRADED": {
"en": "Witch Hazel Limbs Plus",
"es": "Witch Hazel Limbs (mejorado)"
},
"RECIPE_WEAPON_PART_A_BOW_3_UPGRADED": {
"en": "Blackroot Limbs Plus",
"es": "Blackroot Limbs (mejorado)"
},
"RECIPE_WEAPON_PART_A_BOW_4_UPGRADED": {
"en": "Howling Bow Plus",
"es": "Howling Bow (mejorado)"
},
"RECIPE_WEAPON_PART_A_BOW_5_UPGRADED": {
"en": "Sentinel Bow Plus",
"es": "Sentinel Bow (mejorado)"
},
"RECIPE_WEAPON_PART_A_CROSSBOW_1_UPGRADED": {
"en": "Dualpower Limbs Plus",
"es": "Dualpower Limbs (mejorado)"
},
"RECIPE_WEAPON_PART_A_CROSSBOW_2_UPGRADED": {
"en": "Crisscross Limbs Plus",
"es": "Crisscross Limbs (mejorado)"
},
"RECIPE_WEAPON_PART_A_CROSSBOW_3_UPGRADED": {
"en": "Woven Limbs Plus",
"es": "Woven Limbs (mejorado)"
},
"RECIPE_WEAPON_PART_A_CROSSBOW_4_UPGRADED": {
"en": "Kickback Crossbow Plus",
"es": "Kickback Crossbow (mejorado)"
},
"RECIPE_WEAPON_PART_A_CROSSBOW_5_UPGRADED": {
"en": "Longsight Crossbow Plus",
"es": "Longsight Crossbow (mejorado)"
},
"RECIPE_WEAPON_PART_A_DRAGONSBANE_UPGRADED": {
"en": "Dragonsbane Plus",
"es": "Dragonsbane (mejorado)"
},
"RECIPE_WEAPON_PART_A_DUAL_BLADES_1_UPGRADED": {
"en": "Mirror Blades Plus",
"es": "Mirror Blades (mejorado)"
},
"RECIPE_WEAPON_PART_A_DUAL_BLADES_2_UPGRADED": {
"en": "Whispering Blades Plus",
"es": "Whispering Blades (mejorado)"
},
"RECIPE_WEAPON_PART_A_DUAL_BLADES_3_UPGRADED": {
"en": "Seer Blades Plus",
"es": "Seer Blades (mejorado)"
},
"RECIPE_WEAPON_PART_A_DUAL_BLADES_4_UPGRADED": {
"en": "Dancing Blades Plus",
"es": "Dancing Blades (mejorado)"
},
"RECIPE_WEAPON_PART_A_DUAL_BLADES_5_UPGRADED": {
"en": "Hungry Blades Plus",
"es": "Hungry Blades (mejorado)"
},
"RECIPE_WEAPON_PART_A_FEAR_UPGRADED": {
"en": "Grasp of Fear Plus",
"es": "Grasp of Fear (mejorado)"
},
"RECIPE_WEAPON_PART_A_GAUNTLET_1_UPGRADED": {
"en": "Shadowstone Blade Plus",
"es": "Shadowstone Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_GAUNTLET_2_UPGRADED": {
"en": "Fanged Blade Plus",
"es": "Fanged Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_GAUNTLET_3_UPGRADED": {
"en": "Disrupter Blades Plus",
"es": "Disrupter Blades (mejorado)"
},
"RECIPE_WEAPON_PART_A_GAUNTLET_4_UPGRADED": {
"en": "Relentless Gauntlet Plus",
"es": "Relentless Gauntlet (mejorado)"
},
"RECIPE_WEAPON_PART_A_GAUNTLET_5_UPGRADED": {
"en": "Life-Drinking Gauntlet Plus",
"es": "Life-Drinking Gauntlet (mejorado)"
},
"RECIPE_WEAPON_PART_A_HAMMER_1_UPGRADED": {
"en": "Double Head Plus",
"es": "Double Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_HAMMER_2_UPGRADED": {
"en": "Hooked Head Plus",
"es": "Hooked Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_HAMMER_3_UPGRADED": {
"en": "Breaker Head Plus",
"es": "Breaker Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_HAMMER_4_UPGRADED": {
"en": "Thinking Hammer Plus",
"es": "Thinking Hammer (mejorado)"
},
"RECIPE_WEAPON_PART_A_HAMMER_5_UPGRADED": {
"en": "Rebound Hammer Plus",
"es": "Rebound Hammer (mejorado)"
},
"RECIPE_WEAPON_PART_A_ICE_STORM_UPGRADED": {
"en": "Ice Storm (Rune) Plus",
"es": "Ice Storm (Rune) (mejorado)"
},
"RECIPE_WEAPON_PART_A_KNIVES_1_UPGRADED": {
"en": "Thorntip Blade Plus",
"es": "Thorntip Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_KNIVES_2_UPGRADED": {
"en": "Barbed Blade Plus",
"es": "Barbed Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_KNIVES_3_UPGRADED": {
"en": "Shatter Blade Plus",
"es": "Shatter Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_KNIVES_4_UPGRADED": {
"en": "Crystal Knives Plus",
"es": "Crystal Knives (mejorado)"
},
"RECIPE_WEAPON_PART_A_KNIVES_5_UPGRADED": {
"en": "Whistleshard Knives Plus",
"es": "Whistleshard Knives (mejorado)"
},
"RECIPE_WEAPON_PART_A_LIGHTNING_STRIKE_UPGRADED": {
"en": "Lightening Rune Plus",
"es": "Lightening Rune (mejorado)"
},
"RECIPE_WEAPON_PART_A_RUNE_OF_BLADES_UPGRADED": {
"en": "Rune of Blades Plus",
"es": "Rune of Blades (mejorado)"
},
"RECIPE_WEAPON_PART_A_SPEAR_1_UPGRADED": {
"en": "Dawnsmoor Blade Plus",
"es": "Dawnsmoor Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SPEAR_2_UPGRADED": {
"en": "Lunar Blade Plus",
"es": "Lunar Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SPEAR_3_UPGRADED": {
"en": "Sunforged Blade Plus",
"es": "Sunforged Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SPEAR_4_UPGRADED": {
"en": "Pennant Spear Plus",
"es": "Pennant Spear (mejorado)"
},
"RECIPE_WEAPON_PART_A_SPEAR_5_UPGRADED": {
"en": "Champion's Spear Plus",
"es": "Champion's Spear (mejorado)"
},
"RECIPE_WEAPON_PART_A_STAFF_1_UPGRADED": {
"en": "Crooked Apex Plus",
"es": "Crooked Apex (mejorado)"
},
"RECIPE_WEAPON_PART_A_STAFF_2_UPGRADED": {
"en": "Crystal Apex Plus",
"es": "Crystal Apex (mejorado)"
},
"RECIPE_WEAPON_PART_A_STAFF_3_UPGRADED": {
"en": "Branched Apex Plus",
"es": "Branched Apex (mejorado)"
},
"RECIPE_WEAPON_PART_A_STAFF_4_UPGRADED": {
"en": "Ashen Staff Plus",
"es": "Ashen Staff (mejorado)"
},
"RECIPE_WEAPON_PART_A_STAFF_5_UPGRADED": {
"en": "Guardian Staff Plus",
"es": "Guardian Staff (mejorado)"
},
"RECIPE_WEAPON_PART_A_SUNBURST_UPGRADED": {
"en": "Sunburst Plus",
"es": "Sunburst (mejorado)"
},
"RECIPE_WEAPON_PART_A_SWORD_1_UPGRADED": {
"en": "Gladius Blade Plus",
"es": "Gladius Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SWORD_2_UPGRADED": {
"en": "Wing Blade Plus",
"es": "Wing Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SWORD_3_UPGRADED": {
"en": "Diamond Blade Plus",
"es": "Diamond Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SWORD_4_UPGRADED": {
"en": "Lunging Blade Plus",
"es": "Lunging Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SWORD_5_UPGRADED": {
"en": "Citadel Blade Plus",
"es": "Citadel Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_SWORD_ANCESTRAL_UPGRADED": {
"en": "Ancestral Blade Plus",
"es": "Ancestral Blade (mejorado)"
},
"RECIPE_WEAPON_PART_A_WAND_1_UPGRADED": {
"en": "Wind Core Plus",
"es": "Wind Core (mejorado)"
},
"RECIPE_WEAPON_PART_A_WAND_2_UPGRADED": {
"en": "Earth Core Plus",
"es": "Earth Core (mejorado)"
},
"RECIPE_WEAPON_PART_A_WAND_3_UPGRADED": {
"en": "Fire Core Plus",
"es": "Fire Core (mejorado)"
},
"RECIPE_WEAPON_PART_A_WAND_4_UPGRADED": {
"en": "Warping Wand Plus",
"es": "Warping Wand (mejorado)"
},
"RECIPE_WEAPON_PART_A_WAND_5_UPGRADED": {
"en": "Arcing Wand Plus",
"es": "Arcing Wand (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARBELL_1_UPGRADED": {
"en": "Ironthorn Head Plus",
"es": "Ironthorn Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARBELL_2_UPGRADED": {
"en": "Gilded Head Plus",
"es": "Gilded Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARBELL_3_UPGRADED": {
"en": "Shrieking Head Plus",
"es": "Shrieking Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARBELL_4_UPGRADED": {
"en": "Clarion Warbell Plus",
"es": "Clarion Warbell (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARBELL_5_UPGRADED": {
"en": "Humble Warbell Plus",
"es": "Humble Warbell (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARHAMMER_1_UPGRADED": {
"en": "Weighted Head Plus",
"es": "Weighted Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARHAMMER_2_UPGRADED": {
"en": "Avenging Head Plus",
"es": "Avenging Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARHAMMER_3_UPGRADED": {
"en": "Marshal's Hammer Head Plus",
"es": "Marshal's Hammer Head (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARHAMMER_4_UPGRADED": {
"en": "Sundering Warhammer Plus",
"es": "Sundering Warhammer (mejorado)"
},
"RECIPE_WEAPON_PART_A_WARHAMMER_5_UPGRADED": {
"en": "Quaking Warhammer Plus",
"es": "Quaking Warhammer (mejorado)"
},
"RECIPE_WEAPON_PART_B_BOW_1": {
"en": "Nightlace String",
"es": "Nightlace String"
},
"RECIPE_WEAPON_PART_B_BOW_1_UPGRADED": {
"en": "Nightlace String Plus",
"es": "Nightlace String (mejorado)"
},
"RECIPE_WEAPON_PART_B_BOW_2": {
"en": "Wildborn String",
"es": "Wildborn String"
},
"RECIPE_WEAPON_PART_B_BOW_2_UPGRADED": {
"en": "Wildborn String  Plus",
"es": "Wildborn String  (mejorado)"
},
"RECIPE_WEAPON_PART_B_BOW_3": {
"en": "Shadowthread String",
"es": "Shadowthread String"
},
"RECIPE_WEAPON_PART_B_BOW_3_UPGRADED": {
"en": "Shadowthread String Plus",
"es": "Shadowthread String (mejorado)"
},
"RECIPE_WEAPON_PART_B_BOW_4": {
"en": "Full Moon String",
"es": "Full Moon String"
},
"RECIPE_WEAPON_PART_B_BOW_4_UPGRADED": {
"en": "Full Moon String Plus",
"es": "Full Moon String (mejorado)"
},
"RECIPE_WEAPON_PART_B_BOW_5": {
"en": "Thrumming String",
"es": "Thrumming String"
},
"RECIPE_WEAPON_PART_B_BOW_5_UPGRADED": {
"en": "Thrumming String Plus",
"es": "Thrumming String (mejorado)"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_1": {
"en": "Mammoth Stock",
"es": "Mammoth Stock"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_1_UPGRADED": {
"en": "Mammoth Stock Plus",
"es": "Mammoth Stock (mejorado)"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_2": {
"en": "Northwood Stock",
"es": "Northwood Stock"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_2_UPGRADED": {
"en": "Northwood Stock Plus",
"es": "Northwood Stock (mejorado)"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_3": {
"en": "Gnomewood Stock",
"es": "Gnomewood Stock"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_3_UPGRADED": {
"en": "Gnomewood Stock Plus",
"es": "Gnomewood Stock (mejorado)"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_4": {
"en": "Bracing Stock",
"es": "Bracing Stock"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_4_UPGRADED": {
"en": "Bracing Stock Plus",
"es": "Bracing Stock (mejorado)"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_5": {
"en": "Reloading Stock",
"es": "Reloading Stock"
},
"RECIPE_WEAPON_PART_B_CROSSBOW_5_UPGRADED": {
"en": "Reloading Stock Plus",
"es": "Reloading Stock (mejorado)"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_1": {
"en": "Glass Offhand",
"es": "Glass Offhand"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_1_UPGRADED": {
"en": "Glass Offhand Plus",
"es": "Glass Offhand (mejorado)"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_2": {
"en": "Hooked Offhand",
"es": "Hooked Offhand"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_2_UPGRADED": {
"en": "Hooked Offhand Plus",
"es": "Hooked Offhand (mejorado)"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_3": {
"en": "Forgotten Offhand",
"es": "Forgotten Offhand"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_3_UPGRADED": {
"en": "Forgotten Offhand Plus",
"es": "Forgotten Offhand (mejorado)"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_4": {
"en": "Star Metal Offhand",
"es": "Star Metal Offhand"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_4_UPGRADED": {
"en": "Star Metal Offhand Plus",
"es": "Star Metal Offhand (mejorado)"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_5": {
"en": "Leonx Offhand",
"es": "Leonx Offhand"
},
"RECIPE_WEAPON_PART_B_DUAL_BLADES_5_UPGRADED": {
"en": "Leonx Offhand Plus",
"es": "Leonx Offhand (mejorado)"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_1": {
"en": "Shadow-weave Gloves",
"es": "Shadow-weave Gloves"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_1_UPGRADED": {
"en": "Shadow-weave Gloves Plus",
"es": "Shadow-weave Gloves (mejorado)"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_2": {
"en": "Clawed Gloves",
"es": "Clawed Gloves"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_2_UPGRADED": {
"en": "Clawed Gloves Plus",
"es": "Clawed Gloves (mejorado)"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_3": {
"en": "Bloodthirsty Gloves",
"es": "Bloodthirsty Gloves"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_3_UPGRADED": {
"en": "Bloodthirsty Gloves Plus",
"es": "Bloodthirsty Gloves (mejorado)"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_4": {
"en": "Whisper Gloves",
"es": "Whisper Gloves"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_4_UPGRADED": {
"en": "Whisper Gloves Plus",
"es": "Whisper Gloves (mejorado)"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_5": {
"en": "Drakewing Gloves",
"es": "Drakewing Gloves"
},
"RECIPE_WEAPON_PART_B_GAUNTLET_5_UPGRADED": {
"en": "Drakewing Gloves Plus",
"es": "Drakewing Gloves (mejorado)"
},
"RECIPE_WEAPON_PART_B_HAMMER_1": {
"en": "Dunwarik Haft",
"es": "Dunwarik Haft"
},
"RECIPE_WEAPON_PART_B_HAMMER_1_UPGRADED": {
"en": "Dunwarik Haft Plus",
"es": "Dunwarik Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_HAMMER_2": {
"en": "Forgik Haft",
"es": "Forgik Haft"
},
"RECIPE_WEAPON_PART_B_HAMMER_2_UPGRADED": {
"en": "Forgik Haft Plus",
"es": "Forgik Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_HAMMER_3": {
"en": "Kehlik Haft",
"es": "Kehlik Haft"
},
"RECIPE_WEAPON_PART_B_HAMMER_3_UPGRADED": {
"en": "Kehlik Haft Plus",
"es": "Kehlik Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_HAMMER_4": {
"en": "Inventor's Haft",
"es": "Inventor's Haft"
},
"RECIPE_WEAPON_PART_B_HAMMER_4_UPGRADED": {
"en": "Inventor's Haft Plus",
"es": "Inventor's Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_HAMMER_5": {
"en": "Salvager Haft",
"es": "Salvager Haft"
},
"RECIPE_WEAPON_PART_B_HAMMER_5_UPGRADED": {
"en": "Salvager Haft Plus",
"es": "Salvager Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_KNIVES_1": {
"en": "Balanced Grip",
"es": "Balanced Grip"
},
"RECIPE_WEAPON_PART_B_KNIVES_1_UPGRADED": {
"en": "Balanced Grip Plus",
"es": "Balanced Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_KNIVES_2": {
"en": "Spiked Grip (Knives)",
"es": "Spiked Grip (Knives)"
},
"RECIPE_WEAPON_PART_B_KNIVES_2_UPGRADED": {
"en": "Spiked Grip Plus (Knives)",
"es": "Spiked Grip Plus (Knives)"
},
"RECIPE_WEAPON_PART_B_KNIVES_3": {
"en": "Hooked Grip",
"es": "Hooked Grip"
},
"RECIPE_WEAPON_PART_B_KNIVES_3_UPGRADED": {
"en": "Hooked Grip Plus",
"es": "Hooked Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_KNIVES_4": {
"en": "Livewood Grip",
"es": "Livewood Grip"
},
"RECIPE_WEAPON_PART_B_KNIVES_4_UPGRADED": {
"en": "Livewood Grip Plus",
"es": "Livewood Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_KNIVES_5": {
"en": "Fanged Grip",
"es": "Fanged Grip"
},
"RECIPE_WEAPON_PART_B_KNIVES_5_UPGRADED": {
"en": "Fanged Grip Plus",
"es": "Fanged Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_SPEAR_1": {
"en": "Twisted Haft",
"es": "Twisted Haft"
},
"RECIPE_WEAPON_PART_B_SPEAR_1_UPGRADED": {
"en": "Twisted Haft Plus",
"es": "Twisted Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_SPEAR_2": {
"en": "Engraved Haft",
"es": "Engraved Haft"
},
"RECIPE_WEAPON_PART_B_SPEAR_2_UPGRADED": {
"en": "Engraved Haft Plus",
"es": "Engraved Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_SPEAR_3": {
"en": "Superior Haft",
"es": "Superior Haft"
},
"RECIPE_WEAPON_PART_B_SPEAR_3_UPGRADED": {
"en": "Superior Haft Plus",
"es": "Superior Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_SPEAR_4": {
"en": "Roiling Haft",
"es": "Roiling Haft"
},
"RECIPE_WEAPON_PART_B_SPEAR_4_UPGRADED": {
"en": "Roiling Haft Plus",
"es": "Roiling Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_SPEAR_5": {
"en": "Unyielding Haft",
"es": "Unyielding Haft"
},
"RECIPE_WEAPON_PART_B_SPEAR_5_UPGRADED": {
"en": "Unyielding Haft Plus",
"es": "Unyielding Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_STAFF_1": {
"en": "Greyhaven Wrap",
"es": "Greyhaven Wrap"
},
"RECIPE_WEAPON_PART_B_STAFF_1_UPGRADED": {
"en": "Greyhaven Wrap Plus",
"es": "Greyhaven Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_STAFF_2": {
"en": "Scarlett Wrap",
"es": "Scarlett Wrap"
},
"RECIPE_WEAPON_PART_B_STAFF_2_UPGRADED": {
"en": "Scarlett Wrap Plus",
"es": "Scarlett Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_STAFF_3": {
"en": "Rider's Wrap",
"es": "Rider's Wrap"
},
"RECIPE_WEAPON_PART_B_STAFF_3_UPGRADED": {
"en": "Rider's Wrap Plus",
"es": "Rider's Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_STAFF_4": {
"en": "Flamescale Wrap",
"es": "Flamescale Wrap"
},
"RECIPE_WEAPON_PART_B_STAFF_4_UPGRADED": {
"en": "Flamescale Wrap Plus",
"es": "Flamescale Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_STAFF_5": {
"en": "Banded Wrap",
"es": "Banded Wrap"
},
"RECIPE_WEAPON_PART_B_STAFF_5_UPGRADED": {
"en": "Banded Wrap Plus",
"es": "Banded Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_SWORD_1": {
"en": "Northrider Guard",
"es": "Northrider Guard"
},
"RECIPE_WEAPON_PART_B_SWORD_1_UPGRADED": {
"en": "Northrider Guard Plus",
"es": "Northrider Guard (mejorado)"
},
"RECIPE_WEAPON_PART_B_SWORD_2": {
"en": "Westrider Guard",
"es": "Westrider Guard"
},
"RECIPE_WEAPON_PART_B_SWORD_2_UPGRADED": {
"en": "Westrider Guard Plus",
"es": "Westrider Guard (mejorado)"
},
"RECIPE_WEAPON_PART_B_SWORD_3": {
"en": "Eastrider Guard",
"es": "Eastrider Guard"
},
"RECIPE_WEAPON_PART_B_SWORD_3_UPGRADED": {
"en": "Eastrider Guard Plus",
"es": "Eastrider Guard (mejorado)"
},
"RECIPE_WEAPON_PART_B_SWORD_4": {
"en": "Breaker Guard",
"es": "Breaker Guard"
},
"RECIPE_WEAPON_PART_B_SWORD_4_UPGRADED": {
"en": "Breaker Guard Plus",
"es": "Breaker Guard (mejorado)"
},
"RECIPE_WEAPON_PART_B_SWORD_5": {
"en": "Parapet Guard",
"es": "Parapet Guard"
},
"RECIPE_WEAPON_PART_B_SWORD_5_UPGRADED": {
"en": "Parapet Guard Plus",
"es": "Parapet Guard (mejorado)"
},
"RECIPE_WEAPON_PART_B_WAND_1": {
"en": "Silver Vein Wrap",
"es": "Silver Vein Wrap"
},
"RECIPE_WEAPON_PART_B_WAND_1_UPGRADED": {
"en": "Silver Vein Wrap Plus",
"es": "Silver Vein Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_WAND_2": {
"en": "Nature Wrap",
"es": "Nature Wrap"
},
"RECIPE_WEAPON_PART_B_WAND_2_UPGRADED": {
"en": "Nature Wrap Plus",
"es": "Nature Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_WAND_3": {
"en": "Magister's Wrap",
"es": "Magister's Wrap"
},
"RECIPE_WEAPON_PART_B_WAND_3_UPGRADED": {
"en": "Magister's Wrap Plus",
"es": "Magister's Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_WAND_4": {
"en": "Nightsky Wrap",
"es": "Nightsky Wrap"
},
"RECIPE_WEAPON_PART_B_WAND_4_UPGRADED": {
"en": "Nightsky Wrap Plus",
"es": "Nightsky Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_WAND_5": {
"en": "Scholar's Wrap",
"es": "Scholar's Wrap"
},
"RECIPE_WEAPON_PART_B_WAND_5_UPGRADED": {
"en": "Scholar's Wrap Plus",
"es": "Scholar's Wrap (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARBELL_1": {
"en": "Talon Grip",
"es": "Talon Grip"
},
"RECIPE_WEAPON_PART_B_WARBELL_1_UPGRADED": {
"en": "Talon Grip Plus",
"es": "Talon Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARBELL_2": {
"en": "Jeweled Grip",
"es": "Jeweled Grip"
},
"RECIPE_WEAPON_PART_B_WARBELL_2_UPGRADED": {
"en": "Jeweled Grip Plus",
"es": "Jeweled Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARBELL_3": {
"en": "Spiked Grip (Warbell)",
"es": "Spiked Grip (Warbell)"
},
"RECIPE_WEAPON_PART_B_WARBELL_3_UPGRADED": {
"en": "Spiked Grip Plus (Warbell)",
"es": "Spiked Grip Plus (Warbell)"
},
"RECIPE_WEAPON_PART_B_WARBELL_4": {
"en": "Royal Grip",
"es": "Royal Grip"
},
"RECIPE_WEAPON_PART_B_WARBELL_4_UPGRADED": {
"en": "Royal Grip Plus",
"es": "Royal Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARBELL_5": {
"en": "Respite Grip",
"es": "Respite Grip"
},
"RECIPE_WEAPON_PART_B_WARBELL_5_UPGRADED": {
"en": "Respite Grip Plus",
"es": "Respite Grip (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_1": {
"en": "Fortified Haft",
"es": "Fortified Haft"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_1_UPGRADED": {
"en": "Fortified Haft Plus",
"es": "Fortified Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_2": {
"en": "Deadman's Haft",
"es": "Deadman's Haft"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_2_UPGRADED": {
"en": "Deadman's Haft Plus",
"es": "Deadman's Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_3": {
"en": "Dragonscale Haft",
"es": "Dragonscale Haft"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_3_UPGRADED": {
"en": "Dragonscale Haft Plus",
"es": "Dragonscale Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_4": {
"en": "Heartwood Haft",
"es": "Heartwood Haft"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_4_UPGRADED": {
"en": "Heartwood Haft Plus",
"es": "Heartwood Haft (mejorado)"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_5": {
"en": "Watchtower Haft",
"es": "Watchtower Haft"
},
"RECIPE_WEAPON_PART_B_WARHAMMER_5_UPGRADED": {
"en": "Watchtower Haft Plus",
"es": "Watchtower Haft (mejorado)"
},
"RECIPE_WEAPON_PART_C_BOW_1": {
"en": "Marksman's Arrows",
"es": "Marksman's Arrows"
},
"RECIPE_WEAPON_PART_C_BOW_1_UPGRADED": {
"en": "Marksman's Arrows Plus",
"es": "Marksman's Arrows (mejorado)"
},
"RECIPE_WEAPON_PART_C_BOW_2": {
"en": "Direvine Arrows",
"es": "Direvine Arrows"
},
"RECIPE_WEAPON_PART_C_BOW_2_UPGRADED": {
"en": "Direvine Arrows Plus",
"es": "Direvine Arrows (mejorado)"
},
"RECIPE_WEAPON_PART_C_BOW_3": {
"en": "Twilight Arrows",
"es": "Twilight Arrows"
},
"RECIPE_WEAPON_PART_C_BOW_3_UPGRADED": {
"en": "Twilight Arrows Plus",
"es": "Twilight Arrows (mejorado)"
},
"RECIPE_WEAPON_PART_C_BOW_4": {
"en": "Hawk-Cry Arrow",
"es": "Hawk-Cry Arrow"
},
"RECIPE_WEAPON_PART_C_BOW_4_UPGRADED": {
"en": "Hawk-Cry Arrow Plus",
"es": "Hawk-Cry Arrow (mejorado)"
},
"RECIPE_WEAPON_PART_C_BOW_5": {
"en": "Pinpoint Arrow",
"es": "Pinpoint Arrow"
},
"RECIPE_WEAPON_PART_C_BOW_5_UPGRADED": {
"en": "Pinpoint Arrow Plus",
"es": "Pinpoint Arrow (mejorado)"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_1": {
"en": "Barbed Bolts",
"es": "Barbed Bolts"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_1_UPGRADED": {
"en": "Barbed Bolts Plus",
"es": "Barbed Bolts (mejorado)"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_2": {
"en": "Spiral Bolts",
"es": "Spiral Bolts"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_2_UPGRADED": {
"en": "Spiral Bolts Plus",
"es": "Spiral Bolts (mejorado)"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_3": {
"en": "Screamer Bolts",
"es": "Screamer Bolts"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_3_UPGRADED": {
"en": "Screamer Bolts Plus",
"es": "Screamer Bolts (mejorado)"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_4": {
"en": "Guiding Bolts",
"es": "Guiding Bolts"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_4_UPGRADED": {
"en": "Guiding Bolts Plus",
"es": "Guiding Bolts (mejorado)"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_5": {
"en": "Splintering Bolts",
"es": "Splintering Bolts"
},
"RECIPE_WEAPON_PART_C_CROSSBOW_5_UPGRADED": {
"en": "Splintering Bolts Plus",
"es": "Splintering Bolts (mejorado)"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_1": {
"en": "Redstone Pommel",
"es": "Redstone Pommel"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_1_UPGRADED": {
"en": "Redstone Pommel Plus",
"es": "Redstone Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_2": {
"en": "Bloodscript Pommel",
"es": "Bloodscript Pommel"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_2_UPGRADED": {
"en": "Bloodscript Pommel Plus",
"es": "Bloodscript Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_3": {
"en": "Braided Pommel",
"es": "Braided Pommel"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_3_UPGRADED": {
"en": "Braided Pommel Plus",
"es": "Braided Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_4": {
"en": "Gilded Pommel",
"es": "Gilded Pommel"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_4_UPGRADED": {
"en": "Gilded Pommel Plus",
"es": "Gilded Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_5": {
"en": "Clawguard Pommel",
"es": "Clawguard Pommel"
},
"RECIPE_WEAPON_PART_C_DUAL_BLADES_5_UPGRADED": {
"en": "Clawguard Pommel Plus",
"es": "Clawguard Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_1": {
"en": "Shadowstone Bracers",
"es": "Shadowstone Bracers"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_1_UPGRADED": {
"en": "Shadowstone Bracers Plus",
"es": "Shadowstone Bracers (mejorado)"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_2": {
"en": "Heavy Bracers",
"es": "Heavy Bracers"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_2_UPGRADED": {
"en": "Heavy Bracers Plus",
"es": "Heavy Bracers (mejorado)"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_3": {
"en": "Cruel Bracers",
"es": "Cruel Bracers"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_3_UPGRADED": {
"en": "Cruel Bracers Plus",
"es": "Cruel Bracers (mejorado)"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_4": {
"en": "Biting Bracer",
"es": "Biting Bracer"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_5": {
"en": "Grasping Bracers",
"es": "Grasping Bracers"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_5_UPGRADED": {
"en": "Grasping Bracers Plus",
"es": "Grasping Bracers (mejorado)"
},
"RECIPE_WEAPON_PART_C_GAUNTLET_UPGRADED": {
"en": "Biting Bracer Plus",
"es": "Biting Bracer (mejorado)"
},
"RECIPE_WEAPON_PART_C_HAMMER_1": {
"en": "Workman's Grip",
"es": "Workman's Grip"
},
"RECIPE_WEAPON_PART_C_HAMMER_1_UPGRADED": {
"en": "Workman's Grip Plus",
"es": "Workman's Grip (mejorado)"
},
"RECIPE_WEAPON_PART_C_HAMMER_2": {
"en": "Guardsman's Grip",
"es": "Guardsman's Grip"
},
"RECIPE_WEAPON_PART_C_HAMMER_2_UPGRADED": {
"en": "Guardsman's Grip Plus",
"es": "Guardsman's Grip (mejorado)"
},
"RECIPE_WEAPON_PART_C_HAMMER_3": {
"en": "Devastator's Grip",
"es": "Devastator's Grip"
},
"RECIPE_WEAPON_PART_C_HAMMER_3_UPGRADED": {
"en": "Devastator's Grip Plus",
"es": "Devastator's Grip (mejorado)"
},
"RECIPE_WEAPON_PART_C_HAMMER_4": {
"en": "Tinker's Grip",
"es": "Tinker's Grip"
},
"RECIPE_WEAPON_PART_C_HAMMER_4_UPGRADED": {
"en": "Tinker's Grip Plus",
"es": "Tinker's Grip (mejorado)"
},
"RECIPE_WEAPON_PART_C_HAMMER_5": {
"en": "Magpie's Grip",
"es": "Magpie's Grip"
},
"RECIPE_WEAPON_PART_C_HAMMER_5_UPGRADED": {
"en": "Magpie's Grip Plus",
"es": "Magpie's Grip (mejorado)"
},
"RECIPE_WEAPON_PART_C_KNIVES_1": {
"en": "Nightwalker Belt",
"es": "Nightwalker Belt"
},
"RECIPE_WEAPON_PART_C_KNIVES_1_UPGRADED": {
"en": "Nightwalker Belt Plus",
"es": "Nightwalker Belt (mejorado)"
},
"RECIPE_WEAPON_PART_C_KNIVES_2": {
"en": "Cobrastrike Belt",
"es": "Cobrastrike Belt"
},
"RECIPE_WEAPON_PART_C_KNIVES_2_UPGRADED": {
"en": "Cobrastrike Belt Plus",
"es": "Cobrastrike Belt (mejorado)"
},
"RECIPE_WEAPON_PART_C_KNIVES_3": {
"en": "Threewishes Belt",
"es": "Threewishes Belt"
},
"RECIPE_WEAPON_PART_C_KNIVES_3_UPGRADED": {
"en": "Threewishes Belt Plus",
"es": "Threewishes Belt (mejorado)"
},
"RECIPE_WEAPON_PART_C_KNIVES_4": {
"en": "Wildbloom Belt",
"es": "Wildbloom Belt"
},
"RECIPE_WEAPON_PART_C_KNIVES_4_UPGRADED": {
"en": "Wildbloom Belt Plus",
"es": "Wildbloom Belt (mejorado)"
},
"RECIPE_WEAPON_PART_C_KNIVES_5": {
"en": "Duskstrike Belt",
"es": "Duskstrike Belt"
},
"RECIPE_WEAPON_PART_C_KNIVES_5_UPGRADED": {
"en": "Duskstrike Belt Plus",
"es": "Duskstrike Belt (mejorado)"
},
"RECIPE_WEAPON_PART_C_SPEAR_1": {
"en": "Radiant Tail",
"es": "Radiant Tail"
},
"RECIPE_WEAPON_PART_C_SPEAR_1_UPGRADED": {
"en": "Radiant Tail Plus",
"es": "Radiant Tail (mejorado)"
},
"RECIPE_WEAPON_PART_C_SPEAR_2": {
"en": "Nightfall Tail",
"es": "Nightfall Tail"
},
"RECIPE_WEAPON_PART_C_SPEAR_2_UPGRADED": {
"en": "Nightfall Tail Plus",
"es": "Nightfall Tail (mejorado)"
},
"RECIPE_WEAPON_PART_C_SPEAR_3": {
"en": "Serpent's Tail",
"es": "Serpent's Tail"
},
"RECIPE_WEAPON_PART_C_SPEAR_3_UPGRADED": {
"en": "Serpent's Tail Plus",
"es": "Serpent's Tail (mejorado)"
},
"RECIPE_WEAPON_PART_C_SPEAR_4": {
"en": "Biting Tail",
"es": "Biting Tail"
},
"RECIPE_WEAPON_PART_C_SPEAR_4_UPGRADED": {
"en": "Biting Tail Plus",
"es": "Biting Tail (mejorado)"
},
"RECIPE_WEAPON_PART_C_SPEAR_5": {
"en": "Anchored Tail",
"es": "Anchored Tail"
},
"RECIPE_WEAPON_PART_C_SPEAR_5_UPGRADED": {
"en": "Anchored Tail Plus",
"es": "Anchored Tail (mejorado)"
},
"RECIPE_WEAPON_PART_C_STAFF_1": {
"en": "Blood Vein Lacing",
"es": "Blood Vein Lacing"
},
"RECIPE_WEAPON_PART_C_STAFF_1_UPGRADED": {
"en": "Blood Vein Lacing Plus",
"es": "Blood Vein Lacing (mejorado)"
},
"RECIPE_WEAPON_PART_C_STAFF_2": {
"en": "Stormfront Lacing",
"es": "Stormfront Lacing"
},
"RECIPE_WEAPON_PART_C_STAFF_2_UPGRADED": {
"en": "Stormfront Lacing Plus",
"es": "Stormfront Lacing (mejorado)"
},
"RECIPE_WEAPON_PART_C_STAFF_3": {
"en": "Goldbloom Lacing",
"es": "Goldbloom Lacing"
},
"RECIPE_WEAPON_PART_C_STAFF_3_UPGRADED": {
"en": "Goldbloom Lacing Plus",
"es": "Goldbloom Lacing (mejorado)"
},
"RECIPE_WEAPON_PART_C_STAFF_4": {
"en": "Ember Lacing",
"es": "Ember Lacing"
},
"RECIPE_WEAPON_PART_C_STAFF_4_UPGRADED": {
"en": "Ember Lacing Plus",
"es": "Ember Lacing (mejorado)"
},
"RECIPE_WEAPON_PART_C_STAFF_5": {
"en": "Warded Lacing",
"es": "Warded Lacing"
},
"RECIPE_WEAPON_PART_C_STAFF_5_UPGRADED": {
"en": "Warded Lacing Plus",
"es": "Warded Lacing (mejorado)"
},
"RECIPE_WEAPON_PART_C_SWORD_1": {
"en": "Triumphant Hilt",
"es": "Triumphant Hilt"
},
"RECIPE_WEAPON_PART_C_SWORD_1_UPGRADED": {
"en": "Triumphant Hilt Plus",
"es": "Triumphant Hilt (mejorado)"
},
"RECIPE_WEAPON_PART_C_SWORD_2": {
"en": "Resolute Hilt",
"es": "Resolute Hilt"
},
"RECIPE_WEAPON_PART_C_SWORD_2_UPGRADED": {
"en": "Resolute Hilt Plus",
"es": "Resolute Hilt (mejorado)"
},
"RECIPE_WEAPON_PART_C_SWORD_3": {
"en": "Remembrance Hilt",
"es": "Remembrance Hilt"
},
"RECIPE_WEAPON_PART_C_SWORD_3_UPGRADED": {
"en": "Remembrance Hilt Plus",
"es": "Remembrance Hilt (mejorado)"
},
"RECIPE_WEAPON_PART_C_SWORD_4": {
"en": "Commander's Hilt",
"es": "Commander's Hilt"
},
"RECIPE_WEAPON_PART_C_SWORD_4_UPGRADED": {
"en": "Commander's Hilt Plus",
"es": "Commander's Hilt (mejorado)"
},
"RECIPE_WEAPON_PART_C_SWORD_5": {
"en": "Guardian Hilt",
"es": "Guardian Hilt"
},
"RECIPE_WEAPON_PART_C_SWORD_5_UPGRADED": {
"en": "Guardian Hilt Plus",
"es": "Guardian Hilt (mejorado)"
},
"RECIPE_WEAPON_PART_C_WAND_1": {
"en": "Feather Ornament",
"es": "Feather Ornament"
},
"RECIPE_WEAPON_PART_C_WAND_1_UPGRADED": {
"en": "Feather Ornament Plus",
"es": "Feather Ornament (mejorado)"
},
"RECIPE_WEAPON_PART_C_WAND_2": {
"en": "Claw Ornament",
"es": "Claw Ornament"
},
"RECIPE_WEAPON_PART_C_WAND_2_UPGRADED": {
"en": "Claw Ornament Plus",
"es": "Claw Ornament (mejorado)"
},
"RECIPE_WEAPON_PART_C_WAND_3": {
"en": "Eye Ornament",
"es": "Eye Ornament"
},
"RECIPE_WEAPON_PART_C_WAND_3_UPGRADED": {
"en": "Eye Ornament Plus",
"es": "Eye Ornament (mejorado)"
},
"RECIPE_WEAPON_PART_C_WAND_4": {
"en": "Mothwing Ornament",
"es": "Mothwing Ornament"
},
"RECIPE_WEAPON_PART_C_WAND_4_UPGRADED": {
"en": "Mothwing Ornament Plus",
"es": "Mothwing Ornament (mejorado)"
},
"RECIPE_WEAPON_PART_C_WAND_5": {
"en": "Volcanic Ornament",
"es": "Volcanic Ornament"
},
"RECIPE_WEAPON_PART_C_WAND_5_UPGRADED": {
"en": "Volcanic Ornament Plus",
"es": "Volcanic Ornament (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARBELL_1": {
"en": "Reinforced Haft",
"es": "Reinforced Haft"
},
"RECIPE_WEAPON_PART_C_WARBELL_1_UPGRADED": {
"en": "Reinforced Haft Plus",
"es": "Reinforced Haft (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARBELL_2": {
"en": "Inscribed Haft",
"es": "Inscribed Haft"
},
"RECIPE_WEAPON_PART_C_WARBELL_2_UPGRADED": {
"en": "Inscribed Haft Plus",
"es": "Inscribed Haft (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARBELL_3": {
"en": "Ringing Haft",
"es": "Ringing Haft"
},
"RECIPE_WEAPON_PART_C_WARBELL_3_UPGRADED": {
"en": "Ringing Haft Plus",
"es": "Ringing Haft (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARBELL_4": {
"en": "Majestic Haft",
"es": "Majestic Haft"
},
"RECIPE_WEAPON_PART_C_WARBELL_4_UPGRADED": {
"en": "Majestic Haft Plus",
"es": "Majestic Haft (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARBELL_5": {
"en": "Locking Haft",
"es": "Locking Haft"
},
"RECIPE_WEAPON_PART_C_WARBELL_5_UPGRADED": {
"en": "Locking Haft Plus",
"es": "Locking Haft (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_1": {
"en": "Tenderizer Pommel",
"es": "Tenderizer Pommel"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_1_UPGRADED": {
"en": "Tenderizer Pommel Plus",
"es": "Tenderizer Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_2": {
"en": "Talon Pommel",
"es": "Talon Pommel"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_2_UPGRADED": {
"en": "Talon Pommel Plus",
"es": "Talon Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_3": {
"en": "Sahe Pommel",
"es": "Sahe Pommel"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_3_UPGRADED": {
"en": "Sahe Pommel Plus",
"es": "Sahe Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_4": {
"en": "Crown Pommel",
"es": "Crown Pommel"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_4_UPGRADED": {
"en": "Crown Pommel Plus",
"es": "Crown Pommel (mejorado)"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_5": {
"en": "Bastion Pommel",
"es": "Bastion Pommel"
},
"RECIPE_WEAPON_PART_C_WARHAMMER_5_UPGRADED": {
"en": "Bastion Pommel Plus",
"es": "Bastion Pommel (mejorado)"
},
"TRINKET10_ID": {
"en": "Undying Skull",
"es": "Undying Skull"
},
"TRINKET10_ID_PLUS": {
"en": "Undying Skull Plus",
"es": "Undying Skull (mejorado)"
},
"TRINKET11_ID": {
"en": "Wander's Stone (Rune)",
"es": "Wander's Stone (Rune)"
},
"TRINKET11_ID_PLUS": {
"en": "Wander's Stone (Rune) Plus",
"es": "Wander's Stone (Rune) (mejorado)"
},
"TRINKET12_ID": {
"en": "War Rune",
"es": "War Rune"
},
"TRINKET12_ID_PLUS": {
"en": "War Rune Plus",
"es": "War Rune (mejorado)"
},
"TRINKET13_ID": {
"en": "Bolt of Blood",
"es": "Bolt of Blood"
},
"TRINKET13_ID_PLUS": {
"en": "Bolt of Blood Plus",
"es": "Bolt of Blood (mejorado)"
},
"TRINKET15_ID": {
"en": "Cracked Mirror",
"es": "Cracked Mirror"
},
"TRINKET15_ID_PLUS": {
"en": "Cracked Mirror Plus",
"es": "Cracked Mirror (mejorado)"
},
"TRINKET16_ID": {
"en": "Fae Crystal",
"es": "Fae Crystal"
},
"TRINKET16_ID_PLUS": {
"en": "Fae Crystal Plus",
"es": "Fae Crystal (mejorado)"
},
"TRINKET17_ID": {
"en": "Heart Thorn Root",
"es": "Heart Thorn Root"
},
"TRINKET17_ID_PLUS": {
"en": "Heart Thorn Root Plus",
"es": "Heart Thorn Root (mejorado)"
},
"TRINKET18_ID": {
"en": "Mage Sight Goggles",
"es": "Mage Sight Goggles"
},
"TRINKET18_ID_PLUS": {
"en": "Mage Sight Goggles Plus",
"es": "Mage Sight Goggles (mejorado)"
},
"TRINKET19_ID": {
"en": "Prescient Charm",
"es": "Prescient Charm"
},
"TRINKET19_ID_PLUS": {
"en": "Prescient Charm Plus",
"es": "Prescient Charm (mejorado)"
},
"TRINKET1_ID": {
"en": "Bloodthirsty Bracers",
"es": "Bloodthirsty Bracers"
},
"TRINKET1_ID_PLUS": {
"en": "Bloodthirsty Bracers Plus",
"es": "Bloodthirsty Bracers (mejorado)"
},
"TRINKET20_ID": {
"en": "Rusted Nail",
"es": "Rusted Nail"
},
"TRINKET20_ID_PLUS": {
"en": "Rusted Nail Plus",
"es": "Rusted Nail (mejorado)"
},
"TRINKET21_ID": {
"en": "Tarnished Brooch",
"es": "Tarnished Brooch"
},
"TRINKET21_ID_PLUS": {
"en": "Tarnished Brooch Plus",
"es": "Tarnished Brooch (mejorado)"
},
"TRINKET2_ID": {
"en": "Brew Basket",
"es": "Brew Basket"
},
"TRINKET2_ID_PLUS": {
"en": "Brew Basket Plus",
"es": "Brew Basket (mejorado)"
},
"TRINKET3_ID": {
"en": "Dead Man's Compass",
"es": "Dead Man's Compass"
},
"TRINKET3_ID_PLUS": {
"en": "Dead Man's Compass Plus",
"es": "Dead Man's Compass (mejorado)"
},
"TRINKET4_ID": {
"en": "Horn of Courage",
"es": "Horn of Courage"
},
"TRINKET4_ID_PLUS": {
"en": "Horn of Courage Plus",
"es": "Horn of Courage (mejorado)"
},
"TRINKET5_ID": {
"en": "Ironbound Rune",
"es": "Ironbound Rune"
},
"TRINKET5_ID_PLUS": {
"en": "Ironbound Rune Plus",
"es": "Ironbound Rune (mejorado)"
},
"TRINKET6_ID": {
"en": "Lucky Charm",
"es": "Lucky Charm"
},
"TRINKET6_ID_PLUS": {
"en": "Lucky Charm Plus",
"es": "Lucky Charm (mejorado)"
},
"TRINKET7_ID": {
"en": "Mana Weave (Rune)",
"es": "Mana Weave (Rune)"
},
"TRINKET7_ID_PLUS": {
"en": "Mana Weave (Rune) Plus",
"es": "Mana Weave (Rune) (mejorado)"
},
"TRINKET8_ID": {
"en": "Shadow Bracers",
"es": "Shadow Bracers"
},
"TRINKET8_ID_PLUS": {
"en": "Shadow Bracers Plus",
"es": "Shadow Bracers (mejorado)"
},
"TRINKET9_ID": {
"en": "Stormbound Pendant",
"es": "Stormbound Pendant"
},
"TRINKET9_ID_PLUS": {
"en": "Stormbound Pendant Plus",
"es": "Stormbound Pendant (mejorado)"
},
"TRINKET_20_ID": {
"en": "Rusted Nail",
"es": "Rusted Nail"
},
"TRINKET_20_ID_PLUS": {
"en": "Rusted Nail Plus",
"es": "Rusted Nail (mejorado)"
},
"WEAPON_BOW": {
"en": "Bow",
"es": "Arco"
},
"WEAPON_CROSSBOW": {
"en": "Crossbow",
"es": "Ballesta"
},
"WEAPON_DRAGONSBANE": {
"en": "Dragonsbane",
"es": "Perdición de dragones"
},
"WEAPON_DUAL_BLADES": {
"en": "Blades",
"es": "Hojas"
},
"WEAPON_GRASP_OF_FEAR": {
"en": "Grasp of Fear",
"es": "Agarre del miedo"
},
"WEAPON_HAMMER": {
"en": "Hammer",
"es": "Martillo"
},
"WEAPON_KUKRI": {
"en": "Clawed Gauntlet",
"es": "Guantelete de garra"
},
"WEAPON_PART_A_BOW_1": {
"en": "Bloodwood Bow",
"es": "Arco de madera sangrienta"
},
"WEAPON_PART_A_BOW_1_UPGRADED": {
"en": "Bloodwood Bow Plus",
"es": "Arco de madera sangrienta Plus"
},
"WEAPON_PART_A_BOW_2": {
"en": "Blackroot Bow",
"es": "Arco de raíz negra"
},
"WEAPON_PART_A_BOW_2_UPGRADED": {
"en": "Blackroot Bow Plus",
"es": "Arco de raíz negra Plus"
},
"WEAPON_PART_A_BOW_3": {
"en": "Witch Hazel Bow",
"es": "Arco de avellano de bruja"
},
"WEAPON_PART_A_BOW_3_UPGRADED": {
"en": "Witch Hazel Bow Plus",
"es": "Arco de avellano de bruja Plus"
},
"WEAPON_PART_A_BOW_4": {
"en": "Howling Bow",
"es": "Arco aullante"
},
"WEAPON_PART_A_BOW_4_UPGRADED": {
"en": "Howling Bow Plus",
"es": "Arco aullante Plus"
},
"WEAPON_PART_A_BOW_5": {
"en": "Sentinel Bow",
"es": "Arco centinela"
},
"WEAPON_PART_A_BOW_5_UPGRADED": {
"en": "Sentinel Bow Plus",
"es": "Arco centinela Plus"
},
"WEAPON_PART_A_CROSSBOW_1": {
"en": "True Aim Crossbow",
"es": "Ballesta de puntería certera"
},
"WEAPON_PART_A_CROSSBOW_1_UPGRADED": {
"en": "True Aim Crossbow Plus",
"es": "Ballesta de puntería certera Plus"
},
"WEAPON_PART_A_CROSSBOW_2": {
"en": "Dualpower Crossbow",
"es": "Ballesta de potencia doble"
},
"WEAPON_PART_A_CROSSBOW_2_UPGRADED": {
"en": "Dualpower Crossbow Plus",
"es": "Ballesta de potencia doble Plus"
},
"WEAPON_PART_A_CROSSBOW_3": {
"en": "Elfweave Crossbow",
"es": "Ballesta de tejido élfico"
},
"WEAPON_PART_A_CROSSBOW_3_UPGRADED": {
"en": "Elfweave Crossbow Plus",
"es": "Ballesta de tejido élfico Plus"
},
"WEAPON_PART_A_CROSSBOW_4": {
"en": "Kickback Crossbow",
"es": "Ballesta de retroceso"
},
"WEAPON_PART_A_CROSSBOW_4_UPGRADED": {
"en": "Kickback Crossbow Plus",
"es": "Ballesta de retroceso Plus"
},
"WEAPON_PART_A_CROSSBOW_5": {
"en": "Longsight Crossbow",
"es": "Ballesta de tiro lejano"
},
"WEAPON_PART_A_CROSSBOW_5_UPGRADED": {
"en": "Longsight Crossbow Plus",
"es": "Ballesta de tiro lejano Plus"
},
"WEAPON_PART_A_DRAGONSBANE": {
"en": "Dragonsbane",
"es": "Perdición de dragones"
},
"WEAPON_PART_A_DRAGONSBANE_UPGRADED": {
"en": "Dragonsbane Plus",
"es": "Perdición de dragones Plus"
},
"WEAPON_PART_A_DUAL_BLADES_1": {
"en": "Mirror Blades",
"es": "Hojas gemelas"
},
"WEAPON_PART_A_DUAL_BLADES_1_UPGRADED": {
"en": "Mirror Blades Plus",
"es": "Hojas gemelas Plus"
},
"WEAPON_PART_A_DUAL_BLADES_2": {
"en": "Seer's Blades",
"es": "Hojas del vidente"
},
"WEAPON_PART_A_DUAL_BLADES_2_UPGRADED": {
"en": "Seer's Blades Plus",
"es": "Hojas del vidente Plus"
},
"WEAPON_PART_A_DUAL_BLADES_3": {
"en": "Whispering Blades",
"es": "Hojas susurrantes"
},
"WEAPON_PART_A_DUAL_BLADES_3_UPGRADED": {
"en": "Whispering Blades Plus",
"es": "Hojas susurrantes Plus"
},
"WEAPON_PART_A_DUAL_BLADES_4": {
"en": "Dancing Blades",
"es": "Hojas danzantes"
},
"WEAPON_PART_A_DUAL_BLADES_4_UPGRADED": {
"en": "Dancing Blades Plus",
"es": "Hojas danzantes Plus"
},
"WEAPON_PART_A_DUAL_BLADES_5": {
"en": "Hungry Blades",
"es": "Hojas hambrientas"
},
"WEAPON_PART_A_DUAL_BLADES_5_UPGRADED": {
"en": "Hungry Blades Plus",
"es": "Hojas hambrientas Plus"
},
"WEAPON_PART_A_FEAR": {
"en": "Grasp of Fear",
"es": "Agarre del miedo"
},
"WEAPON_PART_A_FEAR_UPGRADED": {
"en": "Grasp of Fear Plus",
"es": "Agarre del miedo Plus"
},
"WEAPON_PART_A_GAUNTLET_1": {
"en": "Shadowclaw Gauntlet",
"es": "Guantelete de garra sombría"
},
"WEAPON_PART_A_GAUNTLET_1_UPGRADED": {
"en": "Shadowclaw Gauntlet Plus",
"es": "Guantelete de garra sombría Plus"
},
"WEAPON_PART_A_GAUNTLET_2": {
"en": "Fanged Gauntlet",
"es": "Guantelete acolmillado"
},
"WEAPON_PART_A_GAUNTLET_2_UPGRADED": {
"en": "Fanged Gauntlet Plus",
"es": "Guantelete acolmillado Plus"
},
"WEAPON_PART_A_GAUNTLET_3": {
"en": "Disrupter Gauntlet",
"es": "Guantelete disruptor"
},
"WEAPON_PART_A_GAUNTLET_3_UPGRADED": {
"en": "Disrupter Gauntlet Plus",
"es": "Guantelete disruptor Plus"
},
"WEAPON_PART_A_GAUNTLET_4": {
"en": "Relentless Gauntlet",
"es": "Guantelete implacable"
},
"WEAPON_PART_A_GAUNTLET_4_UPGRADED": {
"en": "Relentless Gauntlet Plus",
"es": "Guantelete implacable Plus"
},
"WEAPON_PART_A_GAUNTLET_5": {
"en": "Life-Drinking Gauntlet",
"es": "Guantelete de libación vital"
},
"WEAPON_PART_A_GAUNTLET_5_UPGRADED": {
"en": "Life-Drinking Gauntlet Plus",
"es": "Guantelete de libación vital Plus"
},
"WEAPON_PART_A_HAMMER_1": {
"en": "Double-Headed Hammer",
"es": "Martillo de dos cabezas"
},
"WEAPON_PART_A_HAMMER_1_UPGRADED": {
"en": "Double-Headed Hammer Plus",
"es": "Martillo de dos cabezas Plus"
},
"WEAPON_PART_A_HAMMER_2": {
"en": "Hooked Hammer",
"es": "Martillo con gancho"
},
"WEAPON_PART_A_HAMMER_2_UPGRADED": {
"en": "Hooked Hammer Plus",
"es": "Martillo con gancho Plus"
},
"WEAPON_PART_A_HAMMER_3": {
"en": "Spiked Hammer",
"es": "Martillo con púas"
},
"WEAPON_PART_A_HAMMER_3_UPGRADED": {
"en": "Spiked Hammer Plus",
"es": "Martillo con púas Plus"
},
"WEAPON_PART_A_HAMMER_4": {
"en": "Thinking Hammer",
"es": "Martillo de pensar"
},
"WEAPON_PART_A_HAMMER_4_UPGRADED": {
"en": "Thinking Hammer Plus",
"es": "Martillo de pensar Plus"
},
"WEAPON_PART_A_HAMMER_5": {
"en": "Rebound Hammer",
"es": "Martillo de rebote"
},
"WEAPON_PART_A_HAMMER_5_UPGRADED": {
"en": "Rebound Hammer Plus",
"es": "Martillo de rebote Plus"
},
"WEAPON_PART_A_ICE_STORM": {
"en": "Ice Storm",
"es": "Tormenta de hielo"
},
"WEAPON_PART_A_ICE_STORM_UPGRADED": {
"en": "Ice Storm Plus",
"es": "Tormenta de hielo Plus"
},
"WEAPON_PART_A_KNIVES_1": {
"en": "Thorntip Knives",
"es": "Cuchillos de punta espinada"
},
"WEAPON_PART_A_KNIVES_1_UPGRADED": {
"en": "Thorntip Knives Plus",
"es": "Cuchillos de punta espinada Plus"
},
"WEAPON_PART_A_KNIVES_2": {
"en": "Barbed Knives",
"es": "Cuchillos dentados"
},
"WEAPON_PART_A_KNIVES_2_UPGRADED": {
"en": "Barbed Knives Plus",
"es": "Cuchillos dentados Plus"
},
"WEAPON_PART_A_KNIVES_3": {
"en": "Shattercut Knives",
"es": "Cuchillos de corte fragmentado"
},
"WEAPON_PART_A_KNIVES_3_UPGRADED": {
"en": "Shattercut Knives Plus",
"es": "Cuchillos de corte fragmentado Plus"
},
"WEAPON_PART_A_KNIVES_4": {
"en": "Crystal Knives",
"es": "Cuchillos cristalinos"
},
"WEAPON_PART_A_KNIVES_4_UPGRADED": {
"en": "Crystal Knives Plus",
"es": "Cuchillos cristalinos Plus"
},
"WEAPON_PART_A_KNIVES_5": {
"en": "Whistleshard Knives",
"es": "Cuchillos de fragmento silbante"
},
"WEAPON_PART_A_KNIVES_5_UPGRADED": {
"en": "Whistleshard Knives Plus",
"es": "Cuchillos de fragmento silbante Plus"
},
"WEAPON_PART_A_LIGHTNING_STRIKE": {
"en": "Lightning Strike",
"es": "Relámpago"
},
"WEAPON_PART_A_LIGHTNING_STRIKE_UPGRADED": {
"en": "Lightning Strike Plus",
"es": "Relámpago Plus"
},
"WEAPON_PART_A_RUNE_OF_BLADES": {
"en": "Rune of Blades",
"es": "Runa de hojas"
},
"WEAPON_PART_A_RUNE_OF_BLADES_UPGRADED": {
"en": "Rune of Blades Plus",
"es": "Runa de hojas Plus"
},
"WEAPON_PART_A_SPEAR_1": {
"en": "Riverwatch Spear",
"es": "Lanza de Torrentera"
},
"WEAPON_PART_A_SPEAR_1_UPGRADED": {
"en": "Riverwatch Spear Plus",
"es": "Lanza de Torrentera Plus"
},
"WEAPON_PART_A_SPEAR_2": {
"en": "Lunar Spear",
"es": "Lanza lunar"
},
"WEAPON_PART_A_SPEAR_2_UPGRADED": {
"en": "Lunar Spear Plus",
"es": "Lanza lunar Plus"
},
"WEAPON_PART_A_SPEAR_3": {
"en": "Sunforged Spear",
"es": "Lanza de forjado solar"
},
"WEAPON_PART_A_SPEAR_3_UPGRADED": {
"en": "Sunforged Spear Plus",
"es": "Lanza de forjado solar Plus"
},
"WEAPON_PART_A_SPEAR_4": {
"en": "Pennant Spear",
"es": "Lanza con banderines"
},
"WEAPON_PART_A_SPEAR_4_UPGRADED": {
"en": "Pennant Spear Plus",
"es": "Lanza con banderines Plus"
},
"WEAPON_PART_A_SPEAR_5": {
"en": "Champion's Spear",
"es": "Lanza de campeón"
},
"WEAPON_PART_A_SPEAR_5_UPGRADED": {
"en": "Champion's Spear Plus",
"es": "Lanza de campeón Plus"
},
"WEAPON_PART_A_STAFF_1": {
"en": "Crook'd Staff",
"es": "Bastón retorcido"
},
"WEAPON_PART_A_STAFF_1_UPGRADED": {
"en": "Crook'd Staff Plus",
"es": "Bastón retorcido Plus"
},
"WEAPON_PART_A_STAFF_2": {
"en": "Crystalline Staff",
"es": "Bastón cristalino"
},
"WEAPON_PART_A_STAFF_2_UPGRADED": {
"en": "Crystalline Staff Plus",
"es": "Bastón cristalino Plus"
},
"WEAPON_PART_A_STAFF_3": {
"en": "Evergreen Staff",
"es": "Bastón perenne"
},
"WEAPON_PART_A_STAFF_3_UPGRADED": {
"en": "Evergreen Staff Plus",
"es": "Bastón perenne Plus"
},
"WEAPON_PART_A_STAFF_4": {
"en": "Ashen Staff",
"es": "Bastón ceniciento"
},
"WEAPON_PART_A_STAFF_4_UPGRADED": {
"en": "Ashen Staff Plus",
"es": "Bastón ceniciento Plus"
},
"WEAPON_PART_A_STAFF_5": {
"en": "Guardian Staff",
"es": "Bastón de guardián"
},
"WEAPON_PART_A_STAFF_5_UPGRADED": {
"en": "Guardian Staff Plus",
"es": "Bastón de guardián Plus"
},
"WEAPON_PART_A_SUNBURST": {
"en": "Sunburst",
"es": "Descarga solar"
},
"WEAPON_PART_A_SUNBURST_UPGRADED": {
"en": "Sunburst Plus",
"es": "Descarga solar Plus"
},
"WEAPON_PART_A_SWORD_1": {
"en": "Warden's Blade",
"es": "Hoja de guardián"
},
"WEAPON_PART_A_SWORD_1_UPGRADED": {
"en": "Warden's Blade Plus",
"es": "Hoja de guardián Plus"
},
"WEAPON_PART_A_SWORD_2": {
"en": "Wing Blade",
"es": "Hoja alada"
},
"WEAPON_PART_A_SWORD_2_UPGRADED": {
"en": "Wing Blade Plus",
"es": "Hoja alada Plus"
},
"WEAPON_PART_A_SWORD_3": {
"en": "Diamond Blade",
"es": "Hoja de diamante"
},
"WEAPON_PART_A_SWORD_3_UPGRADED": {
"en": "Diamond Blade Plus",
"es": "Hoja de diamante Plus"
},
"WEAPON_PART_A_SWORD_4": {
"en": "Lunging Blade",
"es": "Hoja de embestida"
},
"WEAPON_PART_A_SWORD_4_UPGRADED": {
"en": "Lunging Blade Plus",
"es": "Hoja de embestida Plus"
},
"WEAPON_PART_A_SWORD_5": {
"en": "Citadel Blade",
"es": "Hoja de la Ciudadela"
},
"WEAPON_PART_A_SWORD_5_UPGRADED": {
"en": "Citadel Blade Plus",
"es": "Hoja de la Ciudadela Plus"
},
"WEAPON_PART_A_SWORD_ANCESTRAL": {
"en": "Ancestral Blade",
"es": "Hoja ancestral"
},
"WEAPON_PART_A_SWORD_ANCESTRAL_UPGRADED": {
"en": "Ancestral Blade Plus",
"es": "Hoja ancestral Plus"
},
"WEAPON_PART_A_WAND_1": {
"en": "Glimmering Wand",
"es": "Varita destellante"
},
"WEAPON_PART_A_WAND_1_UPGRADED": {
"en": "Glimmering Wand Plus",
"es": "Varita destellante Plus"
},
"WEAPON_PART_A_WAND_2": {
"en": "Oakroot Wand",
"es": "Varita de raíz de roble"
},
"WEAPON_PART_A_WAND_2_UPGRADED": {
"en": "Oakroot Wand Plus",
"es": "Varita de raíz de roble Plus"
},
"WEAPON_PART_A_WAND_3": {
"en": "Star-Touched Wand",
"es": "Varita tocada por las estrellas"
},
"WEAPON_PART_A_WAND_3_UPGRADED": {
"en": "Star-Touched Wand Plus",
"es": "Varita tocada por las estrellas Plus"
},
"WEAPON_PART_A_WAND_4": {
"en": "Warping Wand",
"es": "Varita deformante"
},
"WEAPON_PART_A_WAND_4_UPGRADED": {
"en": "Warping Wand Plus",
"es": "Varita deformante Plus"
},
"WEAPON_PART_A_WAND_5": {
"en": "Arcing Wand",
"es": "Varita de arco"
},
"WEAPON_PART_A_WAND_5_UPGRADED": {
"en": "Arcing Wand Plus",
"es": "Varita de arco Plus"
},
"WEAPON_PART_A_WARBELL_1": {
"en": "Ironthorn Warbell",
"es": "Campana de guerra espinada"
},
"WEAPON_PART_A_WARBELL_1_UPGRADED": {
"en": "Ironthorn Warbell Plus",
"es": "Campana de guerra espinada Plus"
},
"WEAPON_PART_A_WARBELL_2": {
"en": "Gilded Warbell",
"es": "Campana de guerra dorada"
},
"WEAPON_PART_A_WARBELL_2_UPGRADED": {
"en": "Gilded Warbell Plus",
"es": "Campana de guerra dorada Plus"
},
"WEAPON_PART_A_WARBELL_3": {
"en": "Shrieking Warbell",
"es": "Campana de guerra aullante"
},
"WEAPON_PART_A_WARBELL_3_UPGRADED": {
"en": "Shrieking Warbell Plus",
"es": "Campana de guerra aullante Plus"
},
"WEAPON_PART_A_WARBELL_4": {
"en": "Clarion Warbell",
"es": "Campana de guerra de clarín"
},
"WEAPON_PART_A_WARBELL_4_UPGRADED": {
"en": "Clarion Warbell Plus",
"es": "Campana de guerra de clarín Plus"
},
"WEAPON_PART_A_WARBELL_5": {
"en": "Humble Warbell",
"es": "Campana de guerra humilde"
},
"WEAPON_PART_A_WARBELL_5_UPGRADED": {
"en": "Humble Warbell Plus",
"es": "Campana de guerra humilde Plus"
},
"WEAPON_PART_A_WARHAMMER_1": {
"en": "Weighted Warhammer",
"es": "Martillo de guerra lastrado"
},
"WEAPON_PART_A_WARHAMMER_1_UPGRADED": {
"en": "Weighted Warhammer Plus",
"es": "Martillo de guerra lastrado Plus"
},
"WEAPON_PART_A_WARHAMMER_2": {
"en": "Avenging Warhammer",
"es": "Martillo de guerra vengador"
},
"WEAPON_PART_A_WARHAMMER_2_UPGRADED": {
"en": "Avenging Warhammer Plus",
"es": "Martillo de guerra vengador Plus"
},
"WEAPON_PART_A_WARHAMMER_3": {
"en": "Marshal's Warhammer",
"es": "Martillo de guerra de Mariscal"
},
"WEAPON_PART_A_WARHAMMER_3_UPGRADED": {
"en": "Marshal's Warhammer Plus",
"es": "Martillo de guerra de Mariscal Plus"
},
"WEAPON_PART_A_WARHAMMER_4": {
"en": "Sundering Warhammer",
"es": "Martillo de guerra demoledor"
},
"WEAPON_PART_A_WARHAMMER_4_UPGRADED": {
"en": "Sundering Warhammer Plus",
"es": "Martillo de guerra demoledor Plus"
},
"WEAPON_PART_A_WARHAMMER_5": {
"en": "Quaking Warhammer",
"es": "Martillo de guerra estremecedor"
},
"WEAPON_PART_A_WARHAMMER_5_UPGRADED": {
"en": "Quaking Warhammer Plus",
"es": "Martillo de guerra estremecedor Plus"
},
"WEAPON_PART_B_BOW_0": {
"en": "String",
"es": "Cuerda"
},
"WEAPON_PART_B_BOW_1": {
"en": "Nightlace String",
"es": "Cuerda de encaje nocturno"
},
"WEAPON_PART_B_BOW_1_UPGRADED": {
"en": "Nightlace String Plus",
"es": "Cuerda de encaje nocturno Plus"
},
"WEAPON_PART_B_BOW_2": {
"en": "Silken String",
"es": "Cuerda de seda"
},
"WEAPON_PART_B_BOW_2_UPGRADED": {
"en": "Silken String Plus",
"es": "Cuerda de seda Plus"
},
"WEAPON_PART_B_BOW_3": {
"en": "Wildborn String",
"es": "Cuerda de origen salvaje"
},
"WEAPON_PART_B_BOW_3_UPGRADED": {
"en": "Wildborn String Plus",
"es": "Cuerda de origen salvaje Plus"
},
"WEAPON_PART_B_BOW_4": {
"en": "Full Moon String",
"es": "Cuerda de luna llena"
},
"WEAPON_PART_B_BOW_4_UPGRADED": {
"en": "Full Moon String Plus",
"es": "Cuerda de luna llena Plus"
},
"WEAPON_PART_B_BOW_5": {
"en": "Thrumming String",
"es": "Cuerda vibrante"
},
"WEAPON_PART_B_BOW_5_UPGRADED": {
"en": "Thrumming String Plus",
"es": "Cuerda vibrante Plus"
},
"WEAPON_PART_B_CROSSBOW_0": {
"en": "Stock",
"es": "Culata"
},
"WEAPON_PART_B_CROSSBOW_1": {
"en": "Gnomewood Stock",
"es": "Culata de madera gnómica"
},
"WEAPON_PART_B_CROSSBOW_1_UPGRADED": {
"en": "Gnomewood Stock Plus",
"es": "Culata de madera gnómica Plus"
},
"WEAPON_PART_B_CROSSBOW_2": {
"en": "Mammoth Stock",
"es": "Culata descomunal"
},
"WEAPON_PART_B_CROSSBOW_2_UPGRADED": {
"en": "Mammoth Stock Plus",
"es": "Culata descomunal Plus"
},
"WEAPON_PART_B_CROSSBOW_3": {
"en": "Northwood Stock",
"es": "Culata de madera norteña"
},
"WEAPON_PART_B_CROSSBOW_3_UPGRADED": {
"en": "Northwood Stock Plus",
"es": "Culata de madera norteña Plus"
},
"WEAPON_PART_B_CROSSBOW_4": {
"en": "Bracing Stock",
"es": "Culata fortalecedora"
},
"WEAPON_PART_B_CROSSBOW_4_UPGRADED": {
"en": "Bracing Stock Plus",
"es": "Culata fortalecedora Plus"
},
"WEAPON_PART_B_CROSSBOW_5": {
"en": "Reloading Stock",
"es": "Culata de recarga"
},
"WEAPON_PART_B_CROSSBOW_5_UPGRADED": {
"en": "Reloading Stock Plus",
"es": "Culata de recarga Plus"
},
"WEAPON_PART_B_DRAGONSBANE": {
"en": "Chosen Foe",
"es": "Enemigo escogido"
},
"WEAPON_PART_B_DUAL_BLADES_0": {
"en": "Offhand",
"es": "Arma secundaria"
},
"WEAPON_PART_B_DUAL_BLADES_1": {
"en": "Glass Offhand",
"es": "Arma secundaria de cristal"
},
"WEAPON_PART_B_DUAL_BLADES_1_UPGRADED": {
"en": "Glass Offhand Plus",
"es": "Arma secundaria de cristal Plus"
},
"WEAPON_PART_B_DUAL_BLADES_2": {
"en": "Hooked Offhand",
"es": "Arma secundaria con gancho"
},
"WEAPON_PART_B_DUAL_BLADES_2_UPGRADED": {
"en": "Hooked Offhand Plus",
"es": "Arma secundaria con gancho Plus"
},
"WEAPON_PART_B_DUAL_BLADES_3": {
"en": "Forgotten Offhand",
"es": "Arma secundaria olvidada"
},
"WEAPON_PART_B_DUAL_BLADES_3_UPGRADED": {
"en": "Forgotten Offhand Plus",
"es": "Arma secundaria olvidada Plus"
},
"WEAPON_PART_B_DUAL_BLADES_4": {
"en": "Star Metal Offhand",
"es": "Arma secundaria de metal estelar"
},
"WEAPON_PART_B_DUAL_BLADES_4_UPGRADED": {
"en": "Star Metal Offhand Plus",
"es": "Arma secundaria de metal estelar Plus"
},
"WEAPON_PART_B_DUAL_BLADES_5": {
"en": "Leonx Offhand",
"es": "Arma secundaria de leonx"
},
"WEAPON_PART_B_DUAL_BLADES_5_UPGRADED": {
"en": "Leonx Offhand Plus",
"es": "Arma secundaria de leonx Plus"
},
"WEAPON_PART_B_FEAR": {
"en": "Enervation",
"es": "Enervación"
},
"WEAPON_PART_B_GAUNTLET_0": {
"en": "Glove",
"es": "Guante"
},
"WEAPON_PART_B_GAUNTLET_1": {
"en": "Shadow-Weave Gloves",
"es": "Guantes de tejido sombrío"
},
"WEAPON_PART_B_GAUNTLET_1_UPGRADED": {
"en": "Shadow-Weave Gloves Plus",
"es": "Guantes de tejido sombrío Plus"
},
"WEAPON_PART_B_GAUNTLET_2": {
"en": "Clawed Gloves",
"es": "Guantes de garra"
},
"WEAPON_PART_B_GAUNTLET_2_UPGRADED": {
"en": "Clawed Gloves Plus",
"es": "Guantes de garra Plus"
},
"WEAPON_PART_B_GAUNTLET_3": {
"en": "Bloodthirsty Gloves",
"es": "Guantes sanguinarios"
},
"WEAPON_PART_B_GAUNTLET_3_UPGRADED": {
"en": "Bloodthirsty Gloves Plus",
"es": "Guantes sanguinarios Plus"
},
"WEAPON_PART_B_GAUNTLET_4": {
"en": "Whisper Gloves",
"es": "Guantes de susurro"
},
"WEAPON_PART_B_GAUNTLET_4_UPGRADED": {
"en": "Whisper Gloves Plus",
"es": "Guantes de susurro Plus"
},
"WEAPON_PART_B_GAUNTLET_5": {
"en": "Drakewing Gloves",
"es": "Guantes de ala de draco"
},
"WEAPON_PART_B_GAUNTLET_5_UPGRADED": {
"en": "Drakewing Gloves Plus",
"es": "Guantes de ala de draco Plus"
},
"WEAPON_PART_B_HAMMER_0": {
"en": "Haft",
"es": "Mango"
},
"WEAPON_PART_B_HAMMER_1": {
"en": "Dunwarrik Haft",
"es": "Mango de Dunwarr"
},
"WEAPON_PART_B_HAMMER_1_UPGRADED": {
"en": "Dunwarrik Haft Plus",
"es": "Mango de Dunwarr Plus"
},
"WEAPON_PART_B_HAMMER_2": {
"en": "Forgik Haft",
"es": "Mango de Forja"
},
"WEAPON_PART_B_HAMMER_2_UPGRADED": {
"en": "Forgik Haft Plus",
"es": "Mango de Forja Plus"
},
"WEAPON_PART_B_HAMMER_3": {
"en": "Kehlik Haft",
"es": "Mango kehlik"
},
"WEAPON_PART_B_HAMMER_3_UPGRADED": {
"en": "Kehlik Haft Plus",
"es": "Mango kehlik Plus"
},
"WEAPON_PART_B_HAMMER_4": {
"en": "Inventor's Haft",
"es": "Mango del inventor"
},
"WEAPON_PART_B_HAMMER_4_UPGRADED": {
"en": "Inventor's Haft Plus",
"es": "Mango del inventor Plus"
},
"WEAPON_PART_B_HAMMER_5": {
"en": "Salvager Haft",
"es": "Mango del reaprovechador"
},
"WEAPON_PART_B_HAMMER_5_UPGRADED": {
"en": "Salvager Haft Plus",
"es": "Mango del reaprovechador Plus"
},
"WEAPON_PART_B_ICE_STORM": {
"en": "Impede",
"es": "Obstaculizar"
},
"WEAPON_PART_B_KNIVES_0": {
"en": "Grip",
"es": "Agarre"
},
"WEAPON_PART_B_KNIVES_1": {
"en": "Balanced Grip",
"es": "Agarre equilibrado"
},
"WEAPON_PART_B_KNIVES_1_UPGRADED": {
"en": "Balanced Grip Plus",
"es": "Agarre equilibrado Plus"
},
"WEAPON_PART_B_KNIVES_2": {
"en": "Spiked Grip",
"es": "Agarre de pinchos"
},
"WEAPON_PART_B_KNIVES_2_UPGRADED": {
"en": "Spiked Grip Plus",
"es": "Agarre de pinchos Plus"
},
"WEAPON_PART_B_KNIVES_3": {
"en": "Hooked Grip",
"es": "Agarre torcido"
},
"WEAPON_PART_B_KNIVES_3_UPGRADED": {
"en": "Hooked Grip Plus",
"es": "Agarre torcido Plus"
},
"WEAPON_PART_B_KNIVES_4": {
"en": "Livewood Grip",
"es": "Agarre de madera viva"
},
"WEAPON_PART_B_KNIVES_4_UPGRADED": {
"en": "Livewood Grip Plus",
"es": "Agarre de madera viva Plus"
},
"WEAPON_PART_B_KNIVES_5": {
"en": "Fanged Grip",
"es": "Agarra colmilludo"
},
"WEAPON_PART_B_KNIVES_5_UPGRADED": {
"en": "Fanged Grip Plus",
"es": "Agarra colmilludo Plus"
},
"WEAPON_PART_B_LIGHTNING_STRIKE": {
"en": "Omen-Touched",
"es": "Tocado por el augurio"
},
"WEAPON_PART_B_RUNE_OF_BLADES": {
"en": "Lacerate",
"es": "Lacerar"
},
"WEAPON_PART_B_SPEAR_0": {
"en": "Haft",
"es": "Mango"
},
"WEAPON_PART_B_SPEAR_1": {
"en": "Twisting Haft",
"es": "Asta retorcida"
},
"WEAPON_PART_B_SPEAR_1_UPGRADED": {
"en": "Twisting Haft Plus",
"es": "Asta retorcida Plus"
},
"WEAPON_PART_B_SPEAR_2": {
"en": "Engraved Haft",
"es": "Asta grabada"
},
"WEAPON_PART_B_SPEAR_2_UPGRADED": {
"en": "Engraved Haft Plus",
"es": "Asta grabada Plus"
},
"WEAPON_PART_B_SPEAR_3": {
"en": "Superior Haft",
"es": "Asta superior"
},
"WEAPON_PART_B_SPEAR_3_UPGRADED": {
"en": "Superior Haft Plus",
"es": "Asta superior Plus"
},
"WEAPON_PART_B_SPEAR_4": {
"en": "Roiling Haft",
"es": "Mango agitado"
},
"WEAPON_PART_B_SPEAR_4_UPGRADED": {
"en": "Roiling Haft Plus",
"es": "Mango agitado Plus"
},
"WEAPON_PART_B_SPEAR_5": {
"en": "Unyielding Haft",
"es": "Mango inflexible"
},
"WEAPON_PART_B_SPEAR_5_UPGRADED": {
"en": "Unyielding Haft Plus",
"es": "Mango inflexible Plus"
},
"WEAPON_PART_B_STAFF_0": {
"en": "Wrap",
"es": "Envoltura"
},
"WEAPON_PART_B_STAFF_1": {
"en": "Greyhaven Wrap",
"es": "Envoltura de Puerto Cano"
},
"WEAPON_PART_B_STAFF_1_UPGRADED": {
"en": "Greyhaven Wrap Plus",
"es": "Envoltura de Puerto Cano Plus"
},
"WEAPON_PART_B_STAFF_2": {
"en": "Scarlet Wrap",
"es": "Envoltura escarlata"
},
"WEAPON_PART_B_STAFF_2_UPGRADED": {
"en": "Scarlet Wrap Plus",
"es": "Envoltura escarlata Plus"
},
"WEAPON_PART_B_STAFF_3": {
"en": "Rider's Wrap",
"es": "Envoltura del jinete"
},
"WEAPON_PART_B_STAFF_3_UPGRADED": {
"en": "Rider's Wrap Plus",
"es": "Envoltura del jinete Plus"
},
"WEAPON_PART_B_STAFF_4": {
"en": "Flamescale Wrap",
"es": "Envoltura de escama llameante"
},
"WEAPON_PART_B_STAFF_4_UPGRADED": {
"en": "Flamescale Wrap Plus",
"es": "Envoltura de escama llameante Plus"
},
"WEAPON_PART_B_STAFF_5": {
"en": "Banded Wrap",
"es": "Envoltura vendada"
},
"WEAPON_PART_B_STAFF_5_UPGRADED": {
"en": "Banded Wrap Plus",
"es": "Envoltura vendada Plus"
},
"WEAPON_PART_B_SUNBURST": {
"en": "Excoriation",
"es": "Excoriación"
},
"WEAPON_PART_B_SWORD_0": {
"en": "Guard",
"es": "Guardia"
},
"WEAPON_PART_B_SWORD_1": {
"en": "Northrider Guard",
"es": "Guardia de jinete norteño"
},
"WEAPON_PART_B_SWORD_1_UPGRADED": {
"en": "Northrider Guard Plus",
"es": "Guardia de jinete norteño Plus"
},
"WEAPON_PART_B_SWORD_2": {
"en": "Westrider Guard",
"es": "Guardia de jinete occidental"
},
"WEAPON_PART_B_SWORD_2_UPGRADED": {
"en": "Westrider Guard Plus",
"es": "Guardia de jinete occidental Plus"
},
"WEAPON_PART_B_SWORD_3": {
"en": "Eastrider Guard",
"es": "Guardia de jinete oriental"
},
"WEAPON_PART_B_SWORD_3_UPGRADED": {
"en": "Eastrider Guard Plus",
"es": "Guardia de jinete oriental Plus"
},
"WEAPON_PART_B_SWORD_4": {
"en": "Breaker Guard",
"es": "Guardia rompedora"
},
"WEAPON_PART_B_SWORD_4_UPGRADED": {
"en": "Breaker Guard Plus",
"es": "Guardia rompedora Plus"
},
"WEAPON_PART_B_SWORD_5": {
"en": "Parapet Guard",
"es": "Guardia de parapeto"
},
"WEAPON_PART_B_SWORD_5_UPGRADED": {
"en": "Parapet Guard Plus",
"es": "Guardia de parapeto Plus"
},
"WEAPON_PART_B_WAND_0": {
"en": "Wrap",
"es": "Envoltura"
},
"WEAPON_PART_B_WAND_1": {
"en": "Silver Vein Wrap",
"es": "Envoltura de veta plateada"
},
"WEAPON_PART_B_WAND_1_UPGRADED": {
"en": "Silver Vein Wrap Plus",
"es": "Envoltura de veta plateada Plus"
},
"WEAPON_PART_B_WAND_2": {
"en": "Nature Wrap",
"es": "Envoltura de la naturaleza"
},
"WEAPON_PART_B_WAND_2_UPGRADED": {
"en": "Nature Wrap Plus",
"es": "Envoltura de la naturaleza Plus"
},
"WEAPON_PART_B_WAND_3": {
"en": "Magister's Wrap",
"es": "Envoltura del magíster"
},
"WEAPON_PART_B_WAND_3_UPGRADED": {
"en": "Magister's Wrap Plus",
"es": "Envoltura del magíster Plus"
},
"WEAPON_PART_B_WAND_4": {
"en": "Nightsky Wrap",
"es": "Envoltura de cielo nocturno"
},
"WEAPON_PART_B_WAND_4_UPGRADED": {
"en": "Nightsky Wrap Plus",
"es": "Envoltura de cielo nocturno Plus"
},
"WEAPON_PART_B_WAND_5": {
"en": "Scholar's Wrap",
"es": "Envoltura del erudito"
},
"WEAPON_PART_B_WAND_5_UPGRADED": {
"en": "Scholar's Wrap Plus",
"es": "Envoltura del erudito Plus"
},
"WEAPON_PART_B_WARBELL_0": {
"en": "Grip",
"es": "Agarre"
},
"WEAPON_PART_B_WARBELL_1": {
"en": "Talon Grip",
"es": "Agarre de espolón"
},
"WEAPON_PART_B_WARBELL_1_UPGRADED": {
"en": "Talon Grip Plus",
"es": "Agarre de espolón Plus"
},
"WEAPON_PART_B_WARBELL_2": {
"en": "Jeweled Grip",
"es": "Agarre enjoyado"
},
"WEAPON_PART_B_WARBELL_2_UPGRADED": {
"en": "Jeweled Grip Plus",
"es": "Agarre enjoyado Plus"
},
"WEAPON_PART_B_WARBELL_3": {
"en": "Spiked Grip",
"es": "Agarre de pinchos"
},
"WEAPON_PART_B_WARBELL_3_UPGRADED": {
"en": "Spiked Grip Plus",
"es": "Agarre de pinchos Plus"
},
"WEAPON_PART_B_WARBELL_4": {
"en": "Royal Grip",
"es": "Agarre regio"
},
"WEAPON_PART_B_WARBELL_4_UPGRADED": {
"en": "Royal Grip Plus",
"es": "Agarre regio Plus"
},
"WEAPON_PART_B_WARBELL_5": {
"en": "Respite Grip",
"es": "Agarre de alivio"
},
"WEAPON_PART_B_WARBELL_5_UPGRADED": {
"en": "Respite Grip Plus",
"es": "Agarre de alivio Plus"
},
"WEAPON_PART_B_WARHAMMER_0": {
"en": "Haft",
"es": "Mango"
},
"WEAPON_PART_B_WARHAMMER_1": {
"en": "Fortified Haft",
"es": "Mango fortificado"
},
"WEAPON_PART_B_WARHAMMER_1_UPGRADED": {
"en": "Fortified Haft Plus",
"es": "Mango fortificado Plus"
},
"WEAPON_PART_B_WARHAMMER_2": {
"en": "Deadman's Haft",
"es": "Mango del hombre muerto"
},
"WEAPON_PART_B_WARHAMMER_2_UPGRADED": {
"en": "Deadman's Haft Plus",
"es": "Mango del hombre muerto Plus"
},
"WEAPON_PART_B_WARHAMMER_3": {
"en": "Dragonscale Haft",
"es": "Mango de escamas de dragón"
},
"WEAPON_PART_B_WARHAMMER_3_UPGRADED": {
"en": "Dragonscale Haft Plus",
"es": "Mango de escamas de dragón Plus"
},
"WEAPON_PART_B_WARHAMMER_4": {
"en": "Heartwood Haft",
"es": "Mango de madera de corazón"
},
"WEAPON_PART_B_WARHAMMER_4_UPGRADED": {
"en": "Heartwood Haft Plus",
"es": "Mango de madera de corazón Plus"
},
"WEAPON_PART_B_WARHAMMER_5": {
"en": "Watchtower Haft",
"es": "Mango de atalaya"
},
"WEAPON_PART_B_WARHAMMER_5_UPGRADED": {
"en": "Watchtower Haft Plus",
"es": "Mango de atalaya Plus"
},
"WEAPON_PART_C_BOW_0": {
"en": "Arrow",
"es": "Flecha"
},
"WEAPON_PART_C_BOW_1": {
"en": "Marksman's Arrow",
"es": "Flecha de tirador"
},
"WEAPON_PART_C_BOW_1_UPGRADED": {
"en": "Marksman's Arrow Plus",
"es": "Flecha de tirador Plus"
},
"WEAPON_PART_C_BOW_2": {
"en": "Direvine Arrow",
"es": "Flecha de liana siniestra"
},
"WEAPON_PART_C_BOW_2_UPGRADED": {
"en": "Direvine Arrow Plus",
"es": "Flecha de liana siniestra Plus"
},
"WEAPON_PART_C_BOW_3": {
"en": "Twilight Arrow",
"es": "Flecha crepuscular"
},
"WEAPON_PART_C_BOW_3_UPGRADED": {
"en": "Twilight Arrow Plus",
"es": "Flecha crepuscular Plus"
},
"WEAPON_PART_C_BOW_4": {
"en": "Hawk-Cry Arrow",
"es": "Flecha de grito de halcón"
},
"WEAPON_PART_C_BOW_4_UPGRADED": {
"en": "Hawk-Cry Arrow Plus",
"es": "Flecha de grito de halcón Plus"
},
"WEAPON_PART_C_BOW_5": {
"en": "Pinpoint Arrow",
"es": "Flecha precisa"
},
"WEAPON_PART_C_BOW_5_UPGRADED": {
"en": "Pinpoint Arrow Plus",
"es": "Flecha precisa Plus"
},
"WEAPON_PART_C_CROSSBOW_0": {
"en": "Bolts",
"es": "Virotes"
},
"WEAPON_PART_C_CROSSBOW_1": {
"en": "Barbed Bolts",
"es": "Virotes dentados"
},
"WEAPON_PART_C_CROSSBOW_1_UPGRADED": {
"en": "Barbed Bolts Plus",
"es": "Virotes dentados Plus"
},
"WEAPON_PART_C_CROSSBOW_2": {
"en": "Spiral Bolts",
"es": "Virotes de espiral"
},
"WEAPON_PART_C_CROSSBOW_2_UPGRADED": {
"en": "Spiral Bolts Plus",
"es": "Virotes de espiral Plus"
},
"WEAPON_PART_C_CROSSBOW_3": {
"en": "Screamer Bolts",
"es": "Virotes aullantes"
},
"WEAPON_PART_C_CROSSBOW_3_UPGRADED": {
"en": "Screamer Bolts Plus",
"es": "Virotes aullantes Plus"
},
"WEAPON_PART_C_CROSSBOW_4": {
"en": "Marking Bolts",
"es": "Virotes marcadores"
},
"WEAPON_PART_C_CROSSBOW_4_UPGRADED": {
"en": "Marking Bolts Plus",
"es": "Virotes marcadores Plus"
},
"WEAPON_PART_C_CROSSBOW_5": {
"en": "Splintering Bolts",
"es": "Virotes de astillamiento"
},
"WEAPON_PART_C_CROSSBOW_5_UPGRADED": {
"en": "Splintering Bolts Plus",
"es": "Virotes de astillamiento Plus"
},
"WEAPON_PART_C_DRAGONSBANE": {
"en": "Overwhelm",
"es": "Abrumación"
},
"WEAPON_PART_C_DUAL_BLADES_0": {
"en": "Pommels",
"es": "Puños"
},
"WEAPON_PART_C_DUAL_BLADES_1": {
"en": "Redstone Pommel",
"es": "Puño de piedra roja"
},
"WEAPON_PART_C_DUAL_BLADES_1_UPGRADED": {
"en": "Redstone Pommel Plus",
"es": "Puño de piedra roja Plus"
},
"WEAPON_PART_C_DUAL_BLADES_2": {
"en": "Bloodscript Pommel",
"es": "Puño de escritura sanguínea"
},
"WEAPON_PART_C_DUAL_BLADES_2_UPGRADED": {
"en": "Bloodscript Pommel Plus",
"es": "Puño de escritura sanguínea Plus"
},
"WEAPON_PART_C_DUAL_BLADES_3": {
"en": "Braided Pommel",
"es": "Puño trenzado"
},
"WEAPON_PART_C_DUAL_BLADES_3_UPGRADED": {
"en": "Braided Pommel Plus",
"es": "Puño trenzado Plus"
},
"WEAPON_PART_C_DUAL_BLADES_4": {
"en": "Gilded Pommel",
"es": "Puño dorado"
},
"WEAPON_PART_C_DUAL_BLADES_4_UPGRADED": {
"en": "Gilded Pommel Plus",
"es": "Puño dorado Plus"
},
"WEAPON_PART_C_DUAL_BLADES_5": {
"en": "Clawguard Pommel",
"es": "Puño de guardia de garra"
},
"WEAPON_PART_C_DUAL_BLADES_5_UPGRADED": {
"en": "Clawguard Pommel Plus",
"es": "Puño de guardia de garra Plus"
},
"WEAPON_PART_C_FEAR": {
"en": "Wailing Cry",
"es": "Grito lastimero"
},
"WEAPON_PART_C_GAUNTLET_0": {
"en": "Bracer",
"es": "Brazalete"
},
"WEAPON_PART_C_GAUNTLET_1": {
"en": "Shadowstone Bracers",
"es": "Brazaletes de piedrasombría"
},
"WEAPON_PART_C_GAUNTLET_1_UPGRADED": {
"en": "Shadowstone Bracers Plus",
"es": "Brazaletes de piedrasombría Plus"
},
"WEAPON_PART_C_GAUNTLET_2": {
"en": "Heavy Bracers",
"es": "Brazaletes pesados"
},
"WEAPON_PART_C_GAUNTLET_2_UPGRADED": {
"en": "Heavy Bracers Plus",
"es": "Brazaletes pesados Plus"
},
"WEAPON_PART_C_GAUNTLET_3": {
"en": "Cruel Bracers",
"es": "Brazaletes crueles"
},
"WEAPON_PART_C_GAUNTLET_3_UPGRADED": {
"en": "Cruel Bracers Plus",
"es": "Brazaletes crueles Plus"
},
"WEAPON_PART_C_GAUNTLET_4": {
"en": "Biting Bracers",
"es": "Brazaletes mordedores"
},
"WEAPON_PART_C_GAUNTLET_4_UPGRADED": {
"en": "Biting Bracers Plus",
"es": "Brazaletes mordedores Plus"
},
"WEAPON_PART_C_GAUNTLET_5": {
"en": "Grasping Bracers",
"es": "Brazaletes aferradores"
},
"WEAPON_PART_C_GAUNTLET_5_UPGRADED": {
"en": "Grasping Bracers Plus",
"es": "Brazaletes aferradores Plus"
},
"WEAPON_PART_C_HAMMER_0": {
"en": "Grip",
"es": "Agarre"
},
"WEAPON_PART_C_HAMMER_1": {
"en": "Smith's Grip",
"es": "Agarre del herrero"
},
"WEAPON_PART_C_HAMMER_1_UPGRADED": {
"en": "Smith's Grip Plus",
"es": "Agarre del herrero Plus"
},
"WEAPON_PART_C_HAMMER_2": {
"en": "Guardsman's Grip",
"es": "Agarre de guardia"
},
"WEAPON_PART_C_HAMMER_2_UPGRADED": {
"en": "Guardsman's Grip Plus",
"es": "Agarre de guardia Plus"
},
"WEAPON_PART_C_HAMMER_3": {
"en": "Devastator's Grip",
"es": "Agarre del devastador"
},
"WEAPON_PART_C_HAMMER_3_UPGRADED": {
"en": "Devastator's Grip Plus",
"es": "Agarre del devastador Plus"
},
"WEAPON_PART_C_HAMMER_4": {
"en": "Tinker's Grip",
"es": "Agarre del manipulador"
},
"WEAPON_PART_C_HAMMER_4_UPGRADED": {
"en": "Tinker's Grip Plus",
"es": "Agarre del manipulador Plus"
},
"WEAPON_PART_C_HAMMER_5": {
"en": "Magpie's Grip",
"es": "Agarre de la urraca"
},
"WEAPON_PART_C_HAMMER_5_UPGRADED": {
"en": "Magpie's Grip Plus",
"es": "Agarre de la urraca Plus"
},
"WEAPON_PART_C_ICE_STORM": {
"en": "Whiteout",
"es": "Nevasca"
},
"WEAPON_PART_C_KNIVES_0": {
"en": "Belt",
"es": "Cinturón"
},
"WEAPON_PART_C_KNIVES_1": {
"en": "Nightwalker Belt",
"es": "Cinturón de caminante nocturno"
},
"WEAPON_PART_C_KNIVES_1_UPGRADED": {
"en": "Nightwalker Belt Plus",
"es": "Cinturón de caminante nocturno Plus"
},
"WEAPON_PART_C_KNIVES_2": {
"en": "Cobrastrike Belt",
"es": "Cinturón de ataque de cobra"
},
"WEAPON_PART_C_KNIVES_2_UPGRADED": {
"en": "Cobrastrike Belt Plus",
"es": "Cinturón de ataque de cobra Plus"
},
"WEAPON_PART_C_KNIVES_3": {
"en": "Threewishes Sash",
"es": "Fajín de tres deseos"
},
"WEAPON_PART_C_KNIVES_3_UPGRADED": {
"en": "Threewishes Sash Plus",
"es": "Fajín de tres deseos Plus"
},
"WEAPON_PART_C_KNIVES_4": {
"en": "Wildbloom Belt",
"es": "Cinturón de brote silvestre"
},
"WEAPON_PART_C_KNIVES_4_UPGRADED": {
"en": "Wildbloom Belt Plus",
"es": "Cinturón de brote silvestre Plus"
},
"WEAPON_PART_C_KNIVES_5": {
"en": "Duskstrike Belt",
"es": "Cinturón de golpe crepuscular"
},
"WEAPON_PART_C_KNIVES_5_UPGRADED": {
"en": "Duskstrike Belt Plus",
"es": "Cinturón de golpe crepuscular Plus"
},
"WEAPON_PART_C_LIGHTNING_STRIKE": {
"en": "Overcharge",
"es": "Sobrecarga"
},
"WEAPON_PART_C_RUNE_OF_BLADES": {
"en": "Spiral Strike",
"es": "Golpe en espiral"
},
"WEAPON_PART_C_SPEAR_0": {
"en": "Tail",
"es": "Cola"
},
"WEAPON_PART_C_SPEAR_1": {
"en": "Radiant Tail",
"es": "Cola radiante"
},
"WEAPON_PART_C_SPEAR_1_UPGRADED": {
"en": "Radiant Tail Plus",
"es": "Cola radiante Plus"
},
"WEAPON_PART_C_SPEAR_2": {
"en": "Nightfall Tail",
"es": "Cola del anochecer"
},
"WEAPON_PART_C_SPEAR_2_UPGRADED": {
"en": "Nightfall Tail Plus",
"es": "Cola del anochecer Plus"
},
"WEAPON_PART_C_SPEAR_3": {
"en": "Serpent's Tail",
"es": "Cola de la serpiente"
},
"WEAPON_PART_C_SPEAR_3_UPGRADED": {
"en": "Serpent's Tail Plus",
"es": "Cola de la serpiente Plus"
},
"WEAPON_PART_C_SPEAR_4": {
"en": "Biting Tail",
"es": "Cola mordiente"
},
"WEAPON_PART_C_SPEAR_4_UPGRADED": {
"en": "Biting Tail Plus",
"es": "Cola mordiente Plus"
},
"WEAPON_PART_C_SPEAR_5": {
"en": "Anchored Tail",
"es": "Cola anclada"
},
"WEAPON_PART_C_SPEAR_5_UPGRADED": {
"en": "Anchored Tail Plus",
"es": "Cola anclada Plus"
},
"WEAPON_PART_C_STAFF_0": {
"en": "Lacing",
"es": "Infusión"
},
"WEAPON_PART_C_STAFF_1": {
"en": "Blood Vein Lacing",
"es": "Infusión sanguina"
},
"WEAPON_PART_C_STAFF_1_UPGRADED": {
"en": "Blood Vein Lacing Plus",
"es": "Infusión sanguina Plus"
},
"WEAPON_PART_C_STAFF_2": {
"en": "Stormwind Lacing",
"es": "Infusión de tormenta"
},
"WEAPON_PART_C_STAFF_2_UPGRADED": {
"en": "Stormwind Lacing Plus",
"es": "Infusión de tormenta Plus"
},
"WEAPON_PART_C_STAFF_3": {
"en": "Goldbloom Lacing",
"es": "Infusión de abundancia"
},
"WEAPON_PART_C_STAFF_3_UPGRADED": {
"en": "Goldbloom Lacing Plus",
"es": "Infusión de abundancia Plus"
},
"WEAPON_PART_C_STAFF_4": {
"en": "Ember Lacing",
"es": "Infusión ambarina"
},
"WEAPON_PART_C_STAFF_4_UPGRADED": {
"en": "Ember Lacing Plus",
"es": "Infusión ambarina Plus"
},
"WEAPON_PART_C_STAFF_5": {
"en": "Warded Lacing",
"es": "Infusión protegida"
},
"WEAPON_PART_C_STAFF_5_UPGRADED": {
"en": "Warded Lacing Plus",
"es": "Infusión protegida Plus"
},
"WEAPON_PART_C_SUNBURST": {
"en": "Beacon",
"es": "Baliza"
},
"WEAPON_PART_C_SWORD_0": {
"en": "Hilt",
"es": "Empuñadura"
},
"WEAPON_PART_C_SWORD_1": {
"en": "Resolute Hilt",
"es": "Empuñadura resolutiva"
},
"WEAPON_PART_C_SWORD_1_UPGRADED": {
"en": "Resolute Hilt Plus",
"es": "Empuñadura resolutiva Plus"
},
"WEAPON_PART_C_SWORD_2": {
"en": "Triumphant Hilt",
"es": "Empuñadura triunfante"
},
"WEAPON_PART_C_SWORD_2_UPGRADED": {
"en": "Triumphant Hilt Plus",
"es": "Empuñadura triunfante Plus"
},
"WEAPON_PART_C_SWORD_3": {
"en": "Remembrance Hilt",
"es": "Empuñadura de conmemoración"
},
"WEAPON_PART_C_SWORD_3_UPGRADED": {
"en": "Remembrance Hilt Plus",
"es": "Empuñadura de conmemoración Plus"
},
"WEAPON_PART_C_SWORD_4": {
"en": "Commander's Hilt",
"es": "Empuñadura del comandante"
},
"WEAPON_PART_C_SWORD_4_UPGRADED": {
"en": "Commander's Hilt Plus",
"es": "Empuñadura del comandante Plus"
},
"WEAPON_PART_C_SWORD_5": {
"en": "Guardian Hilt",
"es": "Empuñadura del guardián"
},
"WEAPON_PART_C_SWORD_5_UPGRADED": {
"en": "Guardian Hilt Plus",
"es": "Empuñadura del guardián Plus"
},
"WEAPON_PART_C_WAND_0": {
"en": "Ornament",
"es": "Adorno"
},
"WEAPON_PART_C_WAND_1": {
"en": "Feather Ornament",
"es": "Adorno de pluma"
},
"WEAPON_PART_C_WAND_1_UPGRADED": {
"en": "Feather Ornament Plus",
"es": "Adorno de pluma Plus"
},
"WEAPON_PART_C_WAND_2": {
"en": "Claw Ornament",
"es": "Adorno de garra"
},
"WEAPON_PART_C_WAND_2_UPGRADED": {
"en": "Claw Ornament Plus",
"es": "Adorno de garra Plus"
},
"WEAPON_PART_C_WAND_3": {
"en": "Eye Ornament",
"es": "Adorno de ojo"
},
"WEAPON_PART_C_WAND_3_UPGRADED": {
"en": "Eye Ornament Plus",
"es": "Adorno de ojo Plus"
},
"WEAPON_PART_C_WAND_4": {
"en": "Mothwing Ornament",
"es": "Adorno de ala de polilla"
},
"WEAPON_PART_C_WAND_4_UPGRADED": {
"en": "Mothwing Ornament Plus",
"es": "Adorno de ala de polilla Plus"
},
"WEAPON_PART_C_WAND_5": {
"en": "Volcanic Ornament",
"es": "Adorno volcánico"
},
"WEAPON_PART_C_WAND_5_UPGRADED": {
"en": "Volcanic Ornament Plus",
"es": "Adorno volcánico Plus"
},
"WEAPON_PART_C_WARBELL_0": {
"en": "Haft",
"es": "Mango"
},
"WEAPON_PART_C_WARBELL_1": {
"en": "Reinforced Haft",
"es": "Mango reforzado"
},
"WEAPON_PART_C_WARBELL_1_UPGRADED": {
"en": "Reinforced Haft Plus",
"es": "Mango reforzado Plus"
},
"WEAPON_PART_C_WARBELL_2": {
"en": "Inscribed Haft",
"es": "Mango inscrito"
},
"WEAPON_PART_C_WARBELL_2_UPGRADED": {
"en": "Inscribed Haft Plus",
"es": "Mango inscrito Plus"
},
"WEAPON_PART_C_WARBELL_3": {
"en": "Ringing Haft",
"es": "Mango resonante"
},
"WEAPON_PART_C_WARBELL_3_UPGRADED": {
"en": "Ringing Haft Plus",
"es": "Mango resonante Plus"
},
"WEAPON_PART_C_WARBELL_4": {
"en": "Majestic Haft",
"es": "Mango majestuoso"
},
"WEAPON_PART_C_WARBELL_4_UPGRADED": {
"en": "Majestic Haft Plus",
"es": "Mango majestuoso Plus"
},
"WEAPON_PART_C_WARBELL_5": {
"en": "Locking Haft",
"es": "Mango bloqueador"
},
"WEAPON_PART_C_WARBELL_5_UPGRADED": {
"en": "Locking Haft Plus",
"es": "Mango bloqueador Plus"
},
"WEAPON_PART_C_WARHAMMER_0": {
"en": "Pommel",
"es": "Puño"
},
"WEAPON_PART_C_WARHAMMER_1": {
"en": "Tenderizer Pommel",
"es": "Puño reblandecedor"
},
"WEAPON_PART_C_WARHAMMER_1_UPGRADED": {
"en": "Tenderizer Pommel Plus",
"es": "Puño reblandecedor Plus"
},
"WEAPON_PART_C_WARHAMMER_2": {
"en": "Talon Pommel",
"es": "Puño de espolón"
},
"WEAPON_PART_C_WARHAMMER_2_UPGRADED": {
"en": "Talon Pommel Plus",
"es": "Puño de espolón Plus"
},
"WEAPON_PART_C_WARHAMMER_3": {
"en": "Sahe Pommel",
"es": "Puño de Sahe"
},
"WEAPON_PART_C_WARHAMMER_3_UPGRADED": {
"en": "Sahe Pommel Plus",
"es": "Puño de Sahe Plus"
},
"WEAPON_PART_C_WARHAMMER_4": {
"en": "Crown Pommel",
"es": "Puño de corona"
},
"WEAPON_PART_C_WARHAMMER_4_UPGRADED": {
"en": "Crown Pommel Plus",
"es": "Puño de corona Plus"
},
"WEAPON_PART_C_WARHAMMER_5": {
"en": "Bastion Pommel",
"es": "Puño de bastión"
},
"WEAPON_PART_C_WARHAMMER_5_UPGRADED": {
"en": "Bastion Pommel Plus",
"es": "Puño de bastión Plus"
},
"WEAPON_RUNE_ICE_STORM": {
"en": "Ice Storm",
"es": "Tormenta de hielo"
},
"WEAPON_RUNE_LIGHTNING_STRIKE": {
"en": "Lightning Strike",
"es": "Relámpago"
},
"WEAPON_RUNE_OF_BLADES": {
"en": "Rune of Blades",
"es": "Runa de hojas"
},
"WEAPON_SPEAR": {
"en": "Spear",
"es": "Lanza"
},
"WEAPON_STAFF": {
"en": "Staff",
"es": "Bastón"
},
"WEAPON_SUNBURST": {
"en": "Sunburst",
"es": "Descarga solar"
},
"WEAPON_SWORD": {
"en": "Sword",
"es": "Espada"
},
"WEAPON_THROWING_KNIVES": {
"en": "Throwing Knives",
"es": "Cuchillos arrojadizos"
},
"WEAPON_WAND_OF_WINDS": {
"en": "Wand",
"es": "Varita"
},
"WEAPON_WARBELL": {
"en": "Warbell",
"es": "Campana de guerra"
},
"WEAPON_WAR_HAMMER": {
"en": "War Hammer",
"es": "Martillo de guerra"
}
};

// Every recipe the game has (IDs without their trailing spaces)
const GAME_RECIPES = new Set([
"RECIPE_ARMOR_10_PLUS",
"RECIPE_ARMOR_11_PLUS",
"RECIPE_ARMOR_12_PLUS",
"RECIPE_ARMOR_13_PLUS",
"RECIPE_ARMOR_14_PLUS",
"RECIPE_ARMOR_15_PLUS",
"RECIPE_ARMOR_16_PLUS",
"RECIPE_ARMOR_17_PLUS",
"RECIPE_ARMOR_18_PLUS",
"RECIPE_ARMOR_19_PLUS",
"RECIPE_ARMOR_1_PLUS",
"RECIPE_ARMOR_20_PLUS",
"RECIPE_ARMOR_21_PLUS",
"RECIPE_ARMOR_22_PLUS",
"RECIPE_ARMOR_23_PLUS",
"RECIPE_ARMOR_24_PLUS",
"RECIPE_ARMOR_25_PLUS",
"RECIPE_ARMOR_26_PLUS",
"RECIPE_ARMOR_27_PLUS",
"RECIPE_ARMOR_2_PLUS",
"RECIPE_ARMOR_3_PLUS",
"RECIPE_ARMOR_4_PLUS",
"RECIPE_ARMOR_5_PLUS",
"RECIPE_ARMOR_6_PLUS",
"RECIPE_ARMOR_7_PLUS",
"RECIPE_ARMOR_8_PLUS",
"RECIPE_ARMOR_9_PLUS",
"RECIPE_CSM_ANTIDOTE_POTION",
"RECIPE_CSM_ANTIDOTE_POTION_PLUS",
"RECIPE_CSM_CRIMSON_POTION",
"RECIPE_CSM_CRIMSON_POTION_PLUS",
"RECIPE_CSM_EFFICACIOUS",
"RECIPE_CSM_EFFICACIOUS_PLUS",
"RECIPE_CSM_FIRE_GRENADE",
"RECIPE_CSM_FIRE_GRENADE_PLUS",
"RECIPE_CSM_FOCUS_POTION",
"RECIPE_CSM_FOCUS_POTION_PLUS",
"RECIPE_CSM_GLITTERDUST",
"RECIPE_CSM_GLITTERDUST_PLUS",
"RECIPE_CSM_GUARDIAN_POTION",
"RECIPE_CSM_GUARDIAN_POTION_PLUS",
"RECIPE_CSM_MAGE_DUST",
"RECIPE_CSM_MAGE_DUST_PLUS",
"RECIPE_CSM_MIASMA_GRENADE",
"RECIPE_CSM_MIASMA_GRENADE_PLUS",
"RECIPE_CSM_RABBITFOOT_POTION",
"RECIPE_CSM_RABBITFOOT_POTION_PLUS",
"RECIPE_CSM_ROGUE_SWEAT",
"RECIPE_CSM_ROGUE_SWEAT_PLUS",
"RECIPE_CSM_SMOKE_BOMB",
"RECIPE_CSM_SMOKE_BOMB_PLUS",
"RECIPE_CSM_STALWART",
"RECIPE_CSM_STALWART_PLUS",
"RECIPE_CSM_VIGOR_POTION",
"RECIPE_CSM_VIGOR_POTION_PLUS",
"RECIPE_CSM_WARRIOR_BREATH",
"RECIPE_CSM_WARRIOR_BREATH_PLUS",
"RECIPE_CSM_WHIRLWIND",
"RECIPE_CSM_WHIRLWIND_PLUS",
"RECIPE_TRINKET10_ID_PLUS",
"RECIPE_TRINKET11_ID_PLUS",
"RECIPE_TRINKET12_ID_PLUS",
"RECIPE_TRINKET13_ID_PLUS",
"RECIPE_TRINKET15_ID_PLUS",
"RECIPE_TRINKET16_ID_PLUS",
"RECIPE_TRINKET17_ID_PLUS",
"RECIPE_TRINKET18_ID_PLUS",
"RECIPE_TRINKET19_ID_PLUS",
"RECIPE_TRINKET1_ID_PLUS",
"RECIPE_TRINKET21_ID_PLUS",
"RECIPE_TRINKET2_ID_PLUS",
"RECIPE_TRINKET3_ID_PLUS",
"RECIPE_TRINKET4_ID_PLUS",
"RECIPE_TRINKET5_ID_PLUS",
"RECIPE_TRINKET6_ID_PLUS",
"RECIPE_TRINKET7_ID_PLUS",
"RECIPE_TRINKET8_ID_PLUS",
"RECIPE_TRINKET9_ID_PLUS",
"RECIPE_TRINKET_20_ID_PLUS",
"RECIPE_WEAPON_PART_A_BOW_1_UPGRADED",
"RECIPE_WEAPON_PART_A_BOW_2_UPGRADED",
"RECIPE_WEAPON_PART_A_BOW_3_UPGRADED",
"RECIPE_WEAPON_PART_A_BOW_4_UPGRADED",
"RECIPE_WEAPON_PART_A_BOW_5_UPGRADED",
"RECIPE_WEAPON_PART_A_CROSSBOW_1_UPGRADED",
"RECIPE_WEAPON_PART_A_CROSSBOW_2_UPGRADED",
"RECIPE_WEAPON_PART_A_CROSSBOW_3_UPGRADED",
"RECIPE_WEAPON_PART_A_CROSSBOW_4_UPGRADED",
"RECIPE_WEAPON_PART_A_CROSSBOW_5_UPGRADED",
"RECIPE_WEAPON_PART_A_DRAGONSBANE_UPGRADED",
"RECIPE_WEAPON_PART_A_DUAL_BLADES_1_UPGRADED",
"RECIPE_WEAPON_PART_A_DUAL_BLADES_2_UPGRADED",
"RECIPE_WEAPON_PART_A_DUAL_BLADES_3_UPGRADED",
"RECIPE_WEAPON_PART_A_DUAL_BLADES_4_UPGRADED",
"RECIPE_WEAPON_PART_A_DUAL_BLADES_5_UPGRADED",
"RECIPE_WEAPON_PART_A_FEAR_UPGRADED",
"RECIPE_WEAPON_PART_A_GAUNTLET_1_UPGRADED",
"RECIPE_WEAPON_PART_A_GAUNTLET_2_UPGRADED",
"RECIPE_WEAPON_PART_A_GAUNTLET_3_UPGRADED",
"RECIPE_WEAPON_PART_A_GAUNTLET_4_UPGRADED",
"RECIPE_WEAPON_PART_A_GAUNTLET_5_UPGRADED",
"RECIPE_WEAPON_PART_A_HAMMER_1_UPGRADED",
"RECIPE_WEAPON_PART_A_HAMMER_2_UPGRADED",
"RECIPE_WEAPON_PART_A_HAMMER_3_UPGRADED",
"RECIPE_WEAPON_PART_A_HAMMER_4_UPGRADED",
"RECIPE_WEAPON_PART_A_HAMMER_5_UPGRADED",
"RECIPE_WEAPON_PART_A_ICE_STORM_UPGRADED",
"RECIPE_WEAPON_PART_A_KNIVES_1_UPGRADED",
"RECIPE_WEAPON_PART_A_KNIVES_2_UPGRADED",
"RECIPE_WEAPON_PART_A_KNIVES_3_UPGRADED",
"RECIPE_WEAPON_PART_A_KNIVES_4_UPGRADED",
"RECIPE_WEAPON_PART_A_KNIVES_5_UPGRADED",
"RECIPE_WEAPON_PART_A_LIGHTNING_STRIKE_UPGRADED",
"RECIPE_WEAPON_PART_A_RUNE_OF_BLADES_UPGRADED",
"RECIPE_WEAPON_PART_A_SPEAR_1_UPGRADED",
"RECIPE_WEAPON_PART_A_SPEAR_2_UPGRADED",
"RECIPE_WEAPON_PART_A_SPEAR_3_UPGRADED",
"RECIPE_WEAPON_PART_A_SPEAR_4_UPGRADED",
"RECIPE_WEAPON_PART_A_SPEAR_5_UPGRADED",
"RECIPE_WEAPON_PART_A_STAFF_1_UPGRADED",
"RECIPE_WEAPON_PART_A_STAFF_2_UPGRADED",
"RECIPE_WEAPON_PART_A_STAFF_3_UPGRADED",
"RECIPE_WEAPON_PART_A_STAFF_4_UPGRADED",
"RECIPE_WEAPON_PART_A_STAFF_5_UPGRADED",
"RECIPE_WEAPON_PART_A_SUNBURST_UPGRADED",
"RECIPE_WEAPON_PART_A_SWORD_1_UPGRADED",
"RECIPE_WEAPON_PART_A_SWORD_2_UPGRADED",
"RECIPE_WEAPON_PART_A_SWORD_3_UPGRADED",
"RECIPE_WEAPON_PART_A_SWORD_4_UPGRADED",
"RECIPE_WEAPON_PART_A_SWORD_5_UPGRADED",
"RECIPE_WEAPON_PART_A_SWORD_ANCESTRAL_UPGRADED",
"RECIPE_WEAPON_PART_A_WAND_1_UPGRADED",
"RECIPE_WEAPON_PART_A_WAND_2_UPGRADED",
"RECIPE_WEAPON_PART_A_WAND_3_UPGRADED",
"RECIPE_WEAPON_PART_A_WAND_4_UPGRADED",
"RECIPE_WEAPON_PART_A_WAND_5_UPGRADED",
"RECIPE_WEAPON_PART_A_WARBELL_1_UPGRADED",
"RECIPE_WEAPON_PART_A_WARBELL_2_UPGRADED",
"RECIPE_WEAPON_PART_A_WARBELL_3_UPGRADED",
"RECIPE_WEAPON_PART_A_WARBELL_4_UPGRADED",
"RECIPE_WEAPON_PART_A_WARBELL_5_UPGRADED",
"RECIPE_WEAPON_PART_A_WARHAMMER_1_UPGRADED",
"RECIPE_WEAPON_PART_A_WARHAMMER_2_UPGRADED",
"RECIPE_WEAPON_PART_A_WARHAMMER_3_UPGRADED",
"RECIPE_WEAPON_PART_A_WARHAMMER_4_UPGRADED",
"RECIPE_WEAPON_PART_A_WARHAMMER_5_UPGRADED",
"RECIPE_WEAPON_PART_B_BOW_1",
"RECIPE_WEAPON_PART_B_BOW_1_UPGRADED",
"RECIPE_WEAPON_PART_B_BOW_2",
"RECIPE_WEAPON_PART_B_BOW_2_UPGRADED",
"RECIPE_WEAPON_PART_B_BOW_3",
"RECIPE_WEAPON_PART_B_BOW_3_UPGRADED",
"RECIPE_WEAPON_PART_B_BOW_4",
"RECIPE_WEAPON_PART_B_BOW_4_UPGRADED",
"RECIPE_WEAPON_PART_B_BOW_5",
"RECIPE_WEAPON_PART_B_BOW_5_UPGRADED",
"RECIPE_WEAPON_PART_B_CROSSBOW_1",
"RECIPE_WEAPON_PART_B_CROSSBOW_1_UPGRADED",
"RECIPE_WEAPON_PART_B_CROSSBOW_2",
"RECIPE_WEAPON_PART_B_CROSSBOW_2_UPGRADED",
"RECIPE_WEAPON_PART_B_CROSSBOW_3",
"RECIPE_WEAPON_PART_B_CROSSBOW_3_UPGRADED",
"RECIPE_WEAPON_PART_B_CROSSBOW_4",
"RECIPE_WEAPON_PART_B_CROSSBOW_4_UPGRADED",
"RECIPE_WEAPON_PART_B_CROSSBOW_5",
"RECIPE_WEAPON_PART_B_CROSSBOW_5_UPGRADED",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_1",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_1_UPGRADED",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_2",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_2_UPGRADED",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_3",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_3_UPGRADED",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_4",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_4_UPGRADED",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_5",
"RECIPE_WEAPON_PART_B_DUAL_BLADES_5_UPGRADED",
"RECIPE_WEAPON_PART_B_GAUNTLET_1",
"RECIPE_WEAPON_PART_B_GAUNTLET_1_UPGRADED",
"RECIPE_WEAPON_PART_B_GAUNTLET_2",
"RECIPE_WEAPON_PART_B_GAUNTLET_2_UPGRADED",
"RECIPE_WEAPON_PART_B_GAUNTLET_3",
"RECIPE_WEAPON_PART_B_GAUNTLET_3_UPGRADED",
"RECIPE_WEAPON_PART_B_GAUNTLET_4",
"RECIPE_WEAPON_PART_B_GAUNTLET_4_UPGRADED",
"RECIPE_WEAPON_PART_B_GAUNTLET_5",
"RECIPE_WEAPON_PART_B_GAUNTLET_5_UPGRADED",
"RECIPE_WEAPON_PART_B_HAMMER_1",
"RECIPE_WEAPON_PART_B_HAMMER_1_UPGRADED",
"RECIPE_WEAPON_PART_B_HAMMER_2",
"RECIPE_WEAPON_PART_B_HAMMER_2_UPGRADED",
"RECIPE_WEAPON_PART_B_HAMMER_3",
"RECIPE_WEAPON_PART_B_HAMMER_3_UPGRADED",
"RECIPE_WEAPON_PART_B_HAMMER_4",
"RECIPE_WEAPON_PART_B_HAMMER_4_UPGRADED",
"RECIPE_WEAPON_PART_B_HAMMER_5",
"RECIPE_WEAPON_PART_B_HAMMER_5_UPGRADED",
"RECIPE_WEAPON_PART_B_KNIVES_1",
"RECIPE_WEAPON_PART_B_KNIVES_1_UPGRADED",
"RECIPE_WEAPON_PART_B_KNIVES_2",
"RECIPE_WEAPON_PART_B_KNIVES_2_UPGRADED",
"RECIPE_WEAPON_PART_B_KNIVES_3",
"RECIPE_WEAPON_PART_B_KNIVES_3_UPGRADED",
"RECIPE_WEAPON_PART_B_KNIVES_4",
"RECIPE_WEAPON_PART_B_KNIVES_4_UPGRADED",
"RECIPE_WEAPON_PART_B_KNIVES_5",
"RECIPE_WEAPON_PART_B_KNIVES_5_UPGRADED",
"RECIPE_WEAPON_PART_B_SPEAR_1",
"RECIPE_WEAPON_PART_B_SPEAR_1_UPGRADED",
"RECIPE_WEAPON_PART_B_SPEAR_2",
"RECIPE_WEAPON_PART_B_SPEAR_2_UPGRADED",
"RECIPE_WEAPON_PART_B_SPEAR_3",
"RECIPE_WEAPON_PART_B_SPEAR_3_UPGRADED",
"RECIPE_WEAPON_PART_B_SPEAR_4",
"RECIPE_WEAPON_PART_B_SPEAR_4_UPGRADED",
"RECIPE_WEAPON_PART_B_SPEAR_5",
"RECIPE_WEAPON_PART_B_SPEAR_5_UPGRADED",
"RECIPE_WEAPON_PART_B_STAFF_1",
"RECIPE_WEAPON_PART_B_STAFF_1_UPGRADED",
"RECIPE_WEAPON_PART_B_STAFF_2",
"RECIPE_WEAPON_PART_B_STAFF_2_UPGRADED",
"RECIPE_WEAPON_PART_B_STAFF_3",
"RECIPE_WEAPON_PART_B_STAFF_3_UPGRADED",
"RECIPE_WEAPON_PART_B_STAFF_4",
"RECIPE_WEAPON_PART_B_STAFF_4_UPGRADED",
"RECIPE_WEAPON_PART_B_STAFF_5",
"RECIPE_WEAPON_PART_B_STAFF_5_UPGRADED",
"RECIPE_WEAPON_PART_B_SWORD_1",
"RECIPE_WEAPON_PART_B_SWORD_1_UPGRADED",
"RECIPE_WEAPON_PART_B_SWORD_2",
"RECIPE_WEAPON_PART_B_SWORD_2_UPGRADED",
"RECIPE_WEAPON_PART_B_SWORD_3",
"RECIPE_WEAPON_PART_B_SWORD_3_UPGRADED",
"RECIPE_WEAPON_PART_B_SWORD_4",
"RECIPE_WEAPON_PART_B_SWORD_4_UPGRADED",
"RECIPE_WEAPON_PART_B_SWORD_5",
"RECIPE_WEAPON_PART_B_SWORD_5_UPGRADED",
"RECIPE_WEAPON_PART_B_WAND_1",
"RECIPE_WEAPON_PART_B_WAND_1_UPGRADED",
"RECIPE_WEAPON_PART_B_WAND_2",
"RECIPE_WEAPON_PART_B_WAND_2_UPGRADED",
"RECIPE_WEAPON_PART_B_WAND_3",
"RECIPE_WEAPON_PART_B_WAND_3_UPGRADED",
"RECIPE_WEAPON_PART_B_WAND_4",
"RECIPE_WEAPON_PART_B_WAND_4_UPGRADED",
"RECIPE_WEAPON_PART_B_WAND_5",
"RECIPE_WEAPON_PART_B_WAND_5_UPGRADED",
"RECIPE_WEAPON_PART_B_WARBELL_1",
"RECIPE_WEAPON_PART_B_WARBELL_1_UPGRADED",
"RECIPE_WEAPON_PART_B_WARBELL_2",
"RECIPE_WEAPON_PART_B_WARBELL_2_UPGRADED",
"RECIPE_WEAPON_PART_B_WARBELL_3",
"RECIPE_WEAPON_PART_B_WARBELL_3_UPGRADED",
"RECIPE_WEAPON_PART_B_WARBELL_4",
"RECIPE_WEAPON_PART_B_WARBELL_4_UPGRADED",
"RECIPE_WEAPON_PART_B_WARBELL_5",
"RECIPE_WEAPON_PART_B_WARBELL_5_UPGRADED",
"RECIPE_WEAPON_PART_B_WARHAMMER_1",
"RECIPE_WEAPON_PART_B_WARHAMMER_1_UPGRADED",
"RECIPE_WEAPON_PART_B_WARHAMMER_2",
"RECIPE_WEAPON_PART_B_WARHAMMER_2_UPGRADED",
"RECIPE_WEAPON_PART_B_WARHAMMER_3",
"RECIPE_WEAPON_PART_B_WARHAMMER_3_UPGRADED",
"RECIPE_WEAPON_PART_B_WARHAMMER_4",
"RECIPE_WEAPON_PART_B_WARHAMMER_4_UPGRADED",
"RECIPE_WEAPON_PART_B_WARHAMMER_5",
"RECIPE_WEAPON_PART_B_WARHAMMER_5_UPGRADED",
"RECIPE_WEAPON_PART_C_BOW_1",
"RECIPE_WEAPON_PART_C_BOW_1_UPGRADED",
"RECIPE_WEAPON_PART_C_BOW_2",
"RECIPE_WEAPON_PART_C_BOW_2_UPGRADED",
"RECIPE_WEAPON_PART_C_BOW_3",
"RECIPE_WEAPON_PART_C_BOW_3_UPGRADED",
"RECIPE_WEAPON_PART_C_BOW_4",
"RECIPE_WEAPON_PART_C_BOW_4_UPGRADED",
"RECIPE_WEAPON_PART_C_BOW_5",
"RECIPE_WEAPON_PART_C_BOW_5_UPGRADED",
"RECIPE_WEAPON_PART_C_CROSSBOW_1",
"RECIPE_WEAPON_PART_C_CROSSBOW_1_UPGRADED",
"RECIPE_WEAPON_PART_C_CROSSBOW_2",
"RECIPE_WEAPON_PART_C_CROSSBOW_2_UPGRADED",
"RECIPE_WEAPON_PART_C_CROSSBOW_3",
"RECIPE_WEAPON_PART_C_CROSSBOW_3_UPGRADED",
"RECIPE_WEAPON_PART_C_CROSSBOW_4",
"RECIPE_WEAPON_PART_C_CROSSBOW_4_UPGRADED",
"RECIPE_WEAPON_PART_C_CROSSBOW_5",
"RECIPE_WEAPON_PART_C_CROSSBOW_5_UPGRADED",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_1",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_1_UPGRADED",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_2",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_2_UPGRADED",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_3",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_3_UPGRADED",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_4",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_4_UPGRADED",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_5",
"RECIPE_WEAPON_PART_C_DUAL_BLADES_5_UPGRADED",
"RECIPE_WEAPON_PART_C_GAUNTLET_1",
"RECIPE_WEAPON_PART_C_GAUNTLET_1_UPGRADED",
"RECIPE_WEAPON_PART_C_GAUNTLET_2",
"RECIPE_WEAPON_PART_C_GAUNTLET_2_UPGRADED",
"RECIPE_WEAPON_PART_C_GAUNTLET_3",
"RECIPE_WEAPON_PART_C_GAUNTLET_3_UPGRADED",
"RECIPE_WEAPON_PART_C_GAUNTLET_4",
"RECIPE_WEAPON_PART_C_GAUNTLET_5",
"RECIPE_WEAPON_PART_C_GAUNTLET_5_UPGRADED",
"RECIPE_WEAPON_PART_C_GAUNTLET_UPGRADED",
"RECIPE_WEAPON_PART_C_HAMMER_1",
"RECIPE_WEAPON_PART_C_HAMMER_1_UPGRADED",
"RECIPE_WEAPON_PART_C_HAMMER_2",
"RECIPE_WEAPON_PART_C_HAMMER_2_UPGRADED",
"RECIPE_WEAPON_PART_C_HAMMER_3",
"RECIPE_WEAPON_PART_C_HAMMER_3_UPGRADED",
"RECIPE_WEAPON_PART_C_HAMMER_4",
"RECIPE_WEAPON_PART_C_HAMMER_4_UPGRADED",
"RECIPE_WEAPON_PART_C_HAMMER_5",
"RECIPE_WEAPON_PART_C_HAMMER_5_UPGRADED",
"RECIPE_WEAPON_PART_C_KNIVES_1",
"RECIPE_WEAPON_PART_C_KNIVES_1_UPGRADED",
"RECIPE_WEAPON_PART_C_KNIVES_2",
"RECIPE_WEAPON_PART_C_KNIVES_2_UPGRADED",
"RECIPE_WEAPON_PART_C_KNIVES_3",
"RECIPE_WEAPON_PART_C_KNIVES_3_UPGRADED",
"RECIPE_WEAPON_PART_C_KNIVES_4",
"RECIPE_WEAPON_PART_C_KNIVES_4_UPGRADED",
"RECIPE_WEAPON_PART_C_KNIVES_5",
"RECIPE_WEAPON_PART_C_KNIVES_5_UPGRADED",
"RECIPE_WEAPON_PART_C_SPEAR_1",
"RECIPE_WEAPON_PART_C_SPEAR_1_UPGRADED",
"RECIPE_WEAPON_PART_C_SPEAR_2",
"RECIPE_WEAPON_PART_C_SPEAR_2_UPGRADED",
"RECIPE_WEAPON_PART_C_SPEAR_3",
"RECIPE_WEAPON_PART_C_SPEAR_3_UPGRADED",
"RECIPE_WEAPON_PART_C_SPEAR_4",
"RECIPE_WEAPON_PART_C_SPEAR_4_UPGRADED",
"RECIPE_WEAPON_PART_C_SPEAR_5",
"RECIPE_WEAPON_PART_C_SPEAR_5_UPGRADED",
"RECIPE_WEAPON_PART_C_STAFF_1",
"RECIPE_WEAPON_PART_C_STAFF_1_UPGRADED",
"RECIPE_WEAPON_PART_C_STAFF_2",
"RECIPE_WEAPON_PART_C_STAFF_2_UPGRADED",
"RECIPE_WEAPON_PART_C_STAFF_3",
"RECIPE_WEAPON_PART_C_STAFF_3_UPGRADED",
"RECIPE_WEAPON_PART_C_STAFF_4",
"RECIPE_WEAPON_PART_C_STAFF_4_UPGRADED",
"RECIPE_WEAPON_PART_C_STAFF_5",
"RECIPE_WEAPON_PART_C_STAFF_5_UPGRADED",
"RECIPE_WEAPON_PART_C_SWORD_1",
"RECIPE_WEAPON_PART_C_SWORD_1_UPGRADED",
"RECIPE_WEAPON_PART_C_SWORD_2",
"RECIPE_WEAPON_PART_C_SWORD_2_UPGRADED",
"RECIPE_WEAPON_PART_C_SWORD_3",
"RECIPE_WEAPON_PART_C_SWORD_3_UPGRADED",
"RECIPE_WEAPON_PART_C_SWORD_4",
"RECIPE_WEAPON_PART_C_SWORD_4_UPGRADED",
"RECIPE_WEAPON_PART_C_SWORD_5",
"RECIPE_WEAPON_PART_C_SWORD_5_UPGRADED",
"RECIPE_WEAPON_PART_C_WAND_1",
"RECIPE_WEAPON_PART_C_WAND_1_UPGRADED",
"RECIPE_WEAPON_PART_C_WAND_2",
"RECIPE_WEAPON_PART_C_WAND_2_UPGRADED",
"RECIPE_WEAPON_PART_C_WAND_3",
"RECIPE_WEAPON_PART_C_WAND_3_UPGRADED",
"RECIPE_WEAPON_PART_C_WAND_4",
"RECIPE_WEAPON_PART_C_WAND_4_UPGRADED",
"RECIPE_WEAPON_PART_C_WAND_5",
"RECIPE_WEAPON_PART_C_WAND_5_UPGRADED",
"RECIPE_WEAPON_PART_C_WARBELL_1",
"RECIPE_WEAPON_PART_C_WARBELL_1_UPGRADED",
"RECIPE_WEAPON_PART_C_WARBELL_2",
"RECIPE_WEAPON_PART_C_WARBELL_2_UPGRADED",
"RECIPE_WEAPON_PART_C_WARBELL_3",
"RECIPE_WEAPON_PART_C_WARBELL_3_UPGRADED",
"RECIPE_WEAPON_PART_C_WARBELL_4",
"RECIPE_WEAPON_PART_C_WARBELL_4_UPGRADED",
"RECIPE_WEAPON_PART_C_WARBELL_5",
"RECIPE_WEAPON_PART_C_WARBELL_5_UPGRADED",
"RECIPE_WEAPON_PART_C_WARHAMMER_1",
"RECIPE_WEAPON_PART_C_WARHAMMER_1_UPGRADED",
"RECIPE_WEAPON_PART_C_WARHAMMER_2",
"RECIPE_WEAPON_PART_C_WARHAMMER_2_UPGRADED",
"RECIPE_WEAPON_PART_C_WARHAMMER_3",
"RECIPE_WEAPON_PART_C_WARHAMMER_3_UPGRADED",
"RECIPE_WEAPON_PART_C_WARHAMMER_4",
"RECIPE_WEAPON_PART_C_WARHAMMER_4_UPGRADED",
"RECIPE_WEAPON_PART_C_WARHAMMER_5",
"RECIPE_WEAPON_PART_C_WARHAMMER_5_UPGRADED"
]);

// Recipes the game spells with a trailing space
const GAME_RECIPES_WITH_SPACE = [
"RECIPE_WEAPON_PART_A_SWORD_5_UPGRADED",
"RECIPE_WEAPON_PART_A_SWORD_ANCESTRAL_UPGRADED",
"RECIPE_WEAPON_PART_C_BOW_4_UPGRADED",
"RECIPE_WEAPON_PART_C_CROSSBOW_4_UPGRADED",
"RECIPE_WEAPON_PART_C_WARBELL_4_UPGRADED"
];

// Items whose recipe ID doesn't follow the usual "RECIPE_" + item ID pattern
const RECIPE_ID_EXCEPTIONS = {
"WEAPON_PART_C_GAUNTLET_4_UPGRADED": "RECIPE_WEAPON_PART_C_GAUNTLET_UPGRADED",
// The game spells this recipe with an extra underscore; the trinket itself is TRINKET20_ID
"TRINKET20_ID_PLUS": "RECIPE_TRINKET_20_ID_PLUS"
};
