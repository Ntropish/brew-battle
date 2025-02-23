type Equipment = {
  label: string;
  requirements: EquipmentKey[];
  price: number;
  brewSpeed: number;
  brewQuality: number;
};

export const coreEquipmentMap: Record<string, Equipment> = {
  cauldron: {
    label: "Mystic Cauldron",
    requirements: [],
    price: 10,
    brewSpeed: 1.15,
    brewQuality: 1.02,
  },
  mortar: {
    label: "Mortar & Pestle",
    requirements: ["cauldron"],
    price: 100,
    brewSpeed: 1.147,
    brewQuality: 1.023,
  },
  herbRack: {
    label: "Herb Drying Rack",
    requirements: ["cauldron"],
    price: 250,
    brewSpeed: 1.145,
    brewQuality: 1.025,
  },
  infuserVials: {
    label: "Potion Infuser Vials",
    requirements: ["cauldron"],
    price: 500,
    brewSpeed: 1.142,
    brewQuality: 1.028,
  },
  alembic: {
    label: "Crystal Alembic",
    requirements: ["mortar", "infuserVials"],
    price: 1000,
    brewSpeed: 1.139,
    brewQuality: 1.031,
  },
  stirrer: {
    label: "Arcane Stirrer",
    requirements: ["mortar", "herbRack"],
    price: 1500,
    brewSpeed: 1.137,
    brewQuality: 1.033,
  },
  thermometer: {
    label: "Enchanted Thermometer",
    requirements: ["stirrer"],
    price: 3000,
    brewSpeed: 1.134,
    brewQuality: 1.036,
  },
  catalystBurner: {
    label: "Catalyst Burner",
    requirements: ["thermometer", "alembic"],
    price: 5000,
    brewSpeed: 1.131,
    brewQuality: 1.039,
  },
  infusionChamber: {
    label: "Infusion Chamber",
    requirements: ["infuserVials"],
    price: 7500,
    brewSpeed: 1.129,
    brewQuality: 1.041,
  },
  elementalConductor: {
    label: "Elemental Conductor",
    requirements: ["infusionChamber", "catalystBurner"],
    price: 15000,
    brewSpeed: 1.126,
    brewQuality: 1.044,
  },
  runicScales: {
    label: "Runic Weighing Scales",
    requirements: ["herbRack"],
    price: 20000,
    brewSpeed: 1.123,
    brewQuality: 1.047,
  },
  spiritFilter: {
    label: "Spirit Filter",
    requirements: ["cauldron", "infuserVials"],
    price: 30000,
    brewSpeed: 1.121,
    brewQuality: 1.049,
  },
  lunarPhial: {
    label: "Lunar Phial",
    requirements: ["infuserVials", "runicScales"],
    price: 50000,
    brewSpeed: 1.118,
    brewQuality: 1.052,
  },
  solarInfuser: {
    label: "Solar Infuser",
    requirements: ["catalystBurner", "lunarPhial"],
    price: 100000,
    brewSpeed: 1.116,
    brewQuality: 1.054,
  },
  spectralReceptacle: {
    label: "Spectral Receptacle",
    requirements: ["infusionChamber", "lunarPhial"],
    price: 250000,
    brewSpeed: 1.113,
    brewQuality: 1.057,
  },
  arcaneBinder: {
    label: "Arcane Binder",
    requirements: ["stirrer", "runicScales"],
    price: 500000,
    brewSpeed: 1.11,
    brewQuality: 1.06,
  },
  phantomPipette: {
    label: "Phantom Pipette",
    requirements: ["infuserVials", "arcaneBinder"],
    price: 750000,
    brewSpeed: 1.108,
    brewQuality: 1.062,
  },
  mysticalMortar: {
    label: "Mystical Mortar Upgrade",
    requirements: ["mortar", "arcaneBinder"],
    price: 1000000,
    brewSpeed: 1.105,
    brewQuality: 1.065,
  },
  enchantedCrucible: {
    label: "Enchanted Crucible",
    requirements: ["cauldron", "alembic"],
    price: 1500000,
    brewSpeed: 1.102,
    brewQuality: 1.068,
  },
  venomExtractor: {
    label: "Venom Extractor",
    requirements: ["runicScales", "herbRack"],
    price: 2000000,
    brewSpeed: 1.1,
    brewQuality: 1.07,
  },
  essenceEvaporator: {
    label: "Essence Evaporator",
    requirements: ["alembic", "catalystBurner"],
    price: 3000000,
    brewSpeed: 1.097,
    brewQuality: 1.073,
  },
  mysticGrinder: {
    label: "Mystic Grinder",
    requirements: ["mortar", "venomExtractor"],
    price: 5000000,
    brewSpeed: 1.094,
    brewQuality: 1.076,
  },
  ghostlyGloves: {
    label: "Ghostly Gloves",
    requirements: ["mysticGrinder", "phantomPipette"],
    price: 7500000,
    brewSpeed: 1.092,
    brewQuality: 1.078,
  },
  shadowSteamer: {
    label: "Shadow Steamer",
    requirements: ["cauldron", "catalystBurner"],
    price: 10000000,
    brewSpeed: 1.089,
    brewQuality: 1.081,
  },
  spectralSeparator: {
    label: "Spectral Separator",
    requirements: ["infusionChamber", "venomExtractor"],
    price: 25000000,
    brewSpeed: 1.086,
    brewQuality: 1.084,
  },
  enchantedSpatula: {
    label: "Enchanted Spatula",
    requirements: ["stirrer", "phantomPipette"],
    price: 30000000,
    brewSpeed: 1.084,
    brewQuality: 1.086,
  },
  astralAnvil: {
    label: "Astral Anvil",
    requirements: ["mysticGrinder", "enchantedCrucible"],
    price: 35000000,
    brewSpeed: 1.081,
    brewQuality: 1.089,
  },
  cosmicCenser: {
    label: "Cosmic Censer",
    requirements: ["herbRack", "lunarPhial"],
    price: 40000000,
    brewSpeed: 1.078,
    brewQuality: 1.092,
  },
  demonDowsingRod: {
    label: "Demon Dowsing Rod",
    requirements: ["arcaneBinder", "spectralReceptacle"],
    price: 45000000,
    brewSpeed: 1.076,
    brewQuality: 1.094,
  },
  spiritStirrer: {
    label: "Spirit Stirrer",
    requirements: ["stirrer", "ghostlyGloves"],
    price: 50000000,
    brewSpeed: 1.073,
    brewQuality: 1.097,
  },
  timeTuner: {
    label: "Time-Twisting Timer",
    requirements: ["thermometer", "spiritFilter"],
    price: 55000000,
    brewSpeed: 1.07,
    brewQuality: 1.1,
  },
  chaosCalibrator: {
    label: "Chaos Calibrator",
    requirements: ["catalystBurner", "essenceEvaporator"],
    price: 60000000,
    brewSpeed: 1.068,
    brewQuality: 1.102,
  },
  infernalInjector: {
    label: "Infernal Injector",
    requirements: ["cosmicCenser", "shadowSteamer"],
    price: 65000000,
    brewSpeed: 1.065,
    brewQuality: 1.105,
  },
  spectralSiphon: {
    label: "Spectral Siphon",
    requirements: ["spectralSeparator", "infuserVials"],
    price: 70000000,
    brewSpeed: 1.062,
    brewQuality: 1.107,
  },
  lunarLoom: {
    label: "Lunar Loom",
    requirements: ["lunarPhial", "astralAnvil"],
    price: 75000000,
    brewSpeed: 1.06,
    brewQuality: 1.11,
  },
  etherExtractor: {
    label: "Ether Extractor",
    requirements: ["venomExtractor", "elementalConductor"],
    price: 80000000,
    brewSpeed: 1.057,
    brewQuality: 1.113,
  },
  phantomFlask: {
    label: "Phantom Flask",
    requirements: ["phantomPipette", "spectralReceptacle"],
    price: 90000000,
    brewSpeed: 1.054,
    brewQuality: 1.115,
  },
  arcaneAmplifier: {
    label: "Arcane Amplifier",
    requirements: ["arcaneBinder", "mysticGrinder"],
    price: 100000000,
    brewSpeed: 1.052,
    brewQuality: 1.118,
  },
  etherealEvaporator: {
    label: "Ethereal Evaporator",
    requirements: ["essenceEvaporator", "spiritFilter"],
    price: 150000000,
    brewSpeed: 1.049,
    brewQuality: 1.121,
  },
  witchwoodWand: {
    label: "Witchwood Wand",
    requirements: ["ghostlyGloves", "arcaneAmplifier"],
    price: 200000000,
    brewSpeed: 1.047,
    brewQuality: 1.123,
  },
  runeboundReactor: {
    label: "Runebound Reactor",
    requirements: ["runicScales", "chaosCalibrator"],
    price: 300000000,
    brewSpeed: 1.044,
    brewQuality: 1.126,
  },
  cursedConductor: {
    label: "Cursed Conductor",
    requirements: ["elementalConductor", "spectralSiphon"],
    price: 500000000,
    brewSpeed: 1.041,
    brewQuality: 1.129,
  },
  demonicDistiller: {
    label: "Demonic Distiller",
    requirements: ["alembic", "infernalInjector"],
    price: 2500000000,
    brewSpeed: 1.039,
    brewQuality: 1.131,
  },
  eldritchExtractor: {
    label: "Eldritch Extractor",
    requirements: ["etherExtractor", "timeTuner"],
    price: 5000000000,
    brewSpeed: 1.036,
    brewQuality: 1.134,
  },
  voidVortex: {
    label: "Void Vortex Generator",
    requirements: ["chaosCalibrator", "etherealEvaporator"],
    price: 6000000000,
    brewSpeed: 1.033,
    brewQuality: 1.137,
  },
  netherNebulizer: {
    label: "Nether Nebulizer",
    requirements: ["spectralSiphon", "cursedConductor"],
    price: 7000000000,
    brewSpeed: 1.031,
    brewQuality: 1.139,
  },
  occultOscillator: {
    label: "Occult Oscillator",
    requirements: ["witchwoodWand", "runeboundReactor"],
    price: 8000000000,
    brewSpeed: 1.028,
    brewQuality: 1.142,
  },
  forbiddenFunnel: {
    label: "Forbidden Funnel",
    requirements: ["demonicDistiller", "eldritchExtractor"],
    price: 9000000000,
    brewSpeed: 1.025,
    brewQuality: 1.145,
  },
  phantomPhilter: {
    label: "Phantom Philter",
    requirements: ["infuserVials", "demonDowsingRod", "occultOscillator"],
    price: 9500000000,
    brewSpeed: 1.023,
    brewQuality: 1.147,
  },
  cosmicCatalyst: {
    label: "Cosmic Catalyst",
    requirements: ["netherNebulizer", "forbiddenFunnel", "lunarLoom"],
    price: 10000000000,
    brewSpeed: 1.02,
    brewQuality: 1.15,
  },
};

export type CoreEquipmentKey = keyof typeof coreEquipmentMap;

export const timeTravelEquipmentMap: Record<string, Equipment> = {
  tt01: {
    label: "Temporal Ticker",
    requirements: [],
    price: 500,
    brewSpeed: 1.14,
    brewQuality: 1.05,
  },
  tt02: {
    label: "Chronometer Dial",
    requirements: ["tt01"],
    price: 750,
    brewSpeed: 1.138,
    brewQuality: 1.053,
  },
  tt03: {
    label: "Timeworn Stirrer",
    requirements: ["tt01"],
    price: 800,
    brewSpeed: 1.137,
    brewQuality: 1.052,
  },
  tt04: {
    label: "Epoch Infuser Vial",
    requirements: ["tt02", "tt03"],
    price: 1000,
    brewSpeed: 1.135,
    brewQuality: 1.055,
  },
  tt05: {
    label: "Vintage Mortar",
    requirements: ["tt03"],
    price: 900,
    brewSpeed: 1.134,
    brewQuality: 1.054,
  },
  tt06: {
    label: "Old-World Herb Rack",
    requirements: ["tt02"],
    price: 950,
    brewSpeed: 1.133,
    brewQuality: 1.056,
  },
  tt07: {
    label: "Antique Alembic",
    requirements: ["tt04", "tt05"],
    price: 1200,
    brewSpeed: 1.131,
    brewQuality: 1.058,
  },
  tt08: {
    label: "Aged Cauldron Enhancer",
    requirements: ["tt04"],
    price: 1100,
    brewSpeed: 1.13,
    brewQuality: 1.057,
  },
  tt09: {
    label: "Temporal Thermometer",
    requirements: ["tt03"],
    price: 1150,
    brewSpeed: 1.128,
    brewQuality: 1.06,
  },
  tt10: {
    label: "Past Catalyst Burner",
    requirements: ["tt09", "tt07"],
    price: 1300,
    brewSpeed: 1.127,
    brewQuality: 1.062,
  },
  tt11: {
    label: "Chrono Infusion Chamber",
    requirements: ["tt04"],
    price: 1250,
    brewSpeed: 1.125,
    brewQuality: 1.061,
  },
  tt12: {
    label: "Time-Slowing Scales",
    requirements: ["tt06"],
    price: 1350,
    brewSpeed: 1.123,
    brewQuality: 1.063,
  },
  tt13: {
    label: "Temporal Spirit Filter",
    requirements: ["tt01", "tt04"],
    price: 1400,
    brewSpeed: 1.121,
    brewQuality: 1.065,
  },
  tt14: {
    label: "Era-bound Lunar Phial",
    requirements: ["tt12", "tt11"],
    price: 1500,
    brewSpeed: 1.119,
    brewQuality: 1.067,
  },
  tt15: {
    label: "Sundial Infuser",
    requirements: ["tt10", "tt14"],
    price: 1600,
    brewSpeed: 1.117,
    brewQuality: 1.07,
  },
  tt16: {
    label: "Futuristic Flux Capacitor",
    requirements: ["tt15"],
    price: 5000,
    brewSpeed: 1.09,
    brewQuality: 1.07,
  },
  tt17: {
    label: "Quantum Cauldron Core",
    requirements: ["tt16"],
    price: 5500,
    brewSpeed: 1.085,
    brewQuality: 1.076,
  },
  tt18: {
    label: "Nano Mortar",
    requirements: ["tt16"],
    price: 6000,
    brewSpeed: 1.08,
    brewQuality: 1.081,
  },
  tt19: {
    label: "Digital Stirrer",
    requirements: ["tt18"],
    price: 6500,
    brewSpeed: 1.075,
    brewQuality: 1.086,
  },
  tt20: {
    label: "Chrono Accelerator",
    requirements: ["tt17", "tt19"],
    price: 7000,
    brewSpeed: 1.07,
    brewQuality: 1.091,
  },
  tt21: {
    label: "Hyper-Infusion Chamber",
    requirements: ["tt20"],
    price: 8000,
    brewSpeed: 1.065,
    brewQuality: 1.096,
  },
  tt22: {
    label: "Temporal Distortion Gauge",
    requirements: ["tt20"],
    price: 8500,
    brewSpeed: 1.06,
    brewQuality: 1.101,
  },
  tt23: {
    label: "Cybernetic Herb Rack",
    requirements: ["tt18"],
    price: 9000,
    brewSpeed: 1.055,
    brewQuality: 1.106,
  },
  tt24: {
    label: "Time-Warping Thermometer",
    requirements: ["tt19", "tt22"],
    price: 10000,
    brewSpeed: 1.05,
    brewQuality: 1.111,
  },
  tt25: {
    label: "Antimatter Catalyst Burner",
    requirements: ["tt24"],
    price: 12000,
    brewSpeed: 1.045,
    brewQuality: 1.116,
  },
  tt26: {
    label: "Dimensional Infuser Vials",
    requirements: ["tt21"],
    price: 14000,
    brewSpeed: 1.04,
    brewQuality: 1.121,
  },
  tt27: {
    label: "Parallel Universe Binder",
    requirements: ["tt23", "tt26"],
    price: 16000,
    brewSpeed: 1.035,
    brewQuality: 1.126,
  },
  tt28: {
    label: "Interspace Scales",
    requirements: ["tt24", "tt27"],
    price: 18000,
    brewSpeed: 1.03,
    brewQuality: 1.131,
  },
  tt29: {
    label: "Cosmic Temporal Conductor",
    requirements: ["tt25", "tt28"],
    price: 22000,
    brewSpeed: 1.025,
    brewQuality: 1.136,
  },
  tt30: {
    label: "Omniversal Time Capsule",
    requirements: ["tt29"],
    price: 30000,
    brewSpeed: 1.02,
    brewQuality: 1.15,
  },
};

export type TimeTravelEquipmentKey = keyof typeof timeTravelEquipmentMap;

export const biologyEquipmentMap: Record<string, Equipment> = {
  bio01: {
    label: "Sterile Workbench",
    requirements: [],
    price: 500,
    brewSpeed: 1.14,
    brewQuality: 1.05,
  },
  bio02: {
    label: "Basic Microscope",
    requirements: ["bio01"],
    price: 750,
    brewSpeed: 1.138,
    brewQuality: 1.053,
  },
  bio03: {
    label: "Simple Centrifuge",
    requirements: ["bio01"],
    price: 800,
    brewSpeed: 1.137,
    brewQuality: 1.052,
  },
  bio04: {
    label: "Petri Dish Array",
    requirements: ["bio02", "bio03"],
    price: 1000,
    brewSpeed: 1.135,
    brewQuality: 1.055,
  },
  bio05: {
    label: "Incubation Chamber",
    requirements: ["bio03"],
    price: 900,
    brewSpeed: 1.134,
    brewQuality: 1.054,
  },
  bio06: {
    label: "Herbal Extractor",
    requirements: ["bio02"],
    price: 950,
    brewSpeed: 1.133,
    brewQuality: 1.056,
  },
  bio07: {
    label: "Basic Bio-Reactor",
    requirements: ["bio04", "bio05"],
    price: 1200,
    brewSpeed: 1.131,
    brewQuality: 1.058,
  },
  bio08: {
    label: "Cell Culture Incubator",
    requirements: ["bio04"],
    price: 1100,
    brewSpeed: 1.13,
    brewQuality: 1.057,
  },
  bio09: {
    label: "Molecular Thermometer",
    requirements: ["bio03"],
    price: 1150,
    brewSpeed: 1.128,
    brewQuality: 1.06,
  },
  bio10: {
    label: "Enzyme Catalyst",
    requirements: ["bio09", "bio07"],
    price: 1300,
    brewSpeed: 1.127,
    brewQuality: 1.062,
  },
  bio11: {
    label: "DNA Extraction Chamber",
    requirements: ["bio04"],
    price: 1250,
    brewSpeed: 1.125,
    brewQuality: 1.061,
  },
  bio12: {
    label: "Precision Scales",
    requirements: ["bio06"],
    price: 1350,
    brewSpeed: 1.123,
    brewQuality: 1.063,
  },
  bio13: {
    label: "Cellular Filter",
    requirements: ["bio01", "bio04"],
    price: 1400,
    brewSpeed: 1.121,
    brewQuality: 1.065,
  },
  bio14: {
    label: "Luminance Phial",
    requirements: ["bio12", "bio11"],
    price: 1500,
    brewSpeed: 1.119,
    brewQuality: 1.067,
  },
  bio15: {
    label: "Biological Infuser",
    requirements: ["bio10", "bio14"],
    price: 1600,
    brewSpeed: 1.117,
    brewQuality: 1.07,
  },
  bio16: {
    label: "CRISPR Cauldron Enhancer",
    requirements: ["bio15"],
    price: 5000,
    brewSpeed: 1.09,
    brewQuality: 1.07,
  },
  bio17: {
    label: "Quantum Microscope",
    requirements: ["bio16"],
    price: 5500,
    brewSpeed: 1.085,
    brewQuality: 1.076,
  },
  bio18: {
    label: "Nano Centrifuge",
    requirements: ["bio16"],
    price: 6000,
    brewSpeed: 1.08,
    brewQuality: 1.081,
  },
  bio19: {
    label: "Bio-Digital Stirrer",
    requirements: ["bio18"],
    price: 6500,
    brewSpeed: 1.075,
    brewQuality: 1.086,
  },
  bio20: {
    label: "Genomic Accelerator",
    requirements: ["bio17", "bio19"],
    price: 7000,
    brewSpeed: 1.07,
    brewQuality: 1.091,
  },
  bio21: {
    label: "Hyper-Bio-Reactor",
    requirements: ["bio20"],
    price: 8000,
    brewSpeed: 1.065,
    brewQuality: 1.096,
  },
  bio22: {
    label: "Molecular Distortion Gauge",
    requirements: ["bio20"],
    price: 8500,
    brewSpeed: 1.06,
    brewQuality: 1.101,
  },
  bio23: {
    label: "Cybernetic Extractor",
    requirements: ["bio18"],
    price: 9000,
    brewSpeed: 1.055,
    brewQuality: 1.106,
  },
  bio24: {
    label: "Genetic Mass Analyzer",
    requirements: ["bio19", "bio22"],
    price: 10000,
    brewSpeed: 1.05,
    brewQuality: 1.111,
  },
  bio25: {
    label: "Antimicrobial Catalyst",
    requirements: ["bio21"],
    price: 12000,
    brewSpeed: 1.045,
    brewQuality: 1.116,
  },
  bio26: {
    label: "Protein Synthesizer",
    requirements: ["bio23"],
    price: 14000,
    brewSpeed: 1.04,
    brewQuality: 1.121,
  },
  bio27: {
    label: "Parallel Genome Binder",
    requirements: ["bio24", "bio26"],
    price: 16000,
    brewSpeed: 1.035,
    brewQuality: 1.126,
  },
  bio28: {
    label: "Interspace Chromatograph",
    requirements: ["bio25", "bio27"],
    price: 18000,
    brewSpeed: 1.03,
    brewQuality: 1.131,
  },
  bio29: {
    label: "Cosmic Cellular Conductor",
    requirements: ["bio26", "bio28"],
    price: 22000,
    brewSpeed: 1.025,
    brewQuality: 1.136,
  },
  bio30: {
    label: "Omniversal Biocapsule",
    requirements: ["bio29"],
    price: 30000,
    brewSpeed: 1.02,
    brewQuality: 1.15,
  },
};

export type BiologyEquipmentKey = keyof typeof biologyEquipmentMap;

export const spaceEquipmentMap: Record<string, Equipment> = {
  sp01: {
    label: "Apothecary Cabinet",
    requirements: [],
    price: 500,
    brewSpeed: 1.14,
    brewQuality: 1.05,
  },
  sp02: {
    label: "Herbal Shelf",
    requirements: ["sp01"],
    price: 750,
    brewSpeed: 1.138,
    brewQuality: 1.053,
  },
  sp03: {
    label: "Brew Ingredient Crate",
    requirements: ["sp01"],
    price: 800,
    brewSpeed: 1.137,
    brewQuality: 1.052,
  },
  sp04: {
    label: "Phial Rack",
    requirements: ["sp02", "sp03"],
    price: 1000,
    brewSpeed: 1.135,
    brewQuality: 1.055,
  },
  sp05: {
    label: "Recipe Ledger",
    requirements: ["sp02"],
    price: 900,
    brewSpeed: 1.134,
    brewQuality: 1.054,
  },
  sp06: {
    label: "Inventory Scroll",
    requirements: ["sp03"],
    price: 950,
    brewSpeed: 1.133,
    brewQuality: 1.056,
  },
  sp07: {
    label: "Organizational Counter",
    requirements: ["sp04", "sp05"],
    price: 1200,
    brewSpeed: 1.131,
    brewQuality: 1.058,
  },
  sp08: {
    label: "Bulk Storage Barrel",
    requirements: ["sp04"],
    price: 1100,
    brewSpeed: 1.13,
    brewQuality: 1.057,
  },
  sp09: {
    label: "Coffer of Curiosities",
    requirements: ["sp06"],
    price: 1150,
    brewSpeed: 1.128,
    brewQuality: 1.06,
  },
  sp10: {
    label: "Reagent Archive",
    requirements: ["sp05", "sp07"],
    price: 1300,
    brewSpeed: 1.127,
    brewQuality: 1.062,
  },
  sp11: {
    label: "Herbarium Cabinet",
    requirements: ["sp08", "sp09"],
    price: 1250,
    brewSpeed: 1.125,
    brewQuality: 1.061,
  },
  sp12: {
    label: "Potion Display Shelf",
    requirements: ["sp07"],
    price: 1350,
    brewSpeed: 1.123,
    brewQuality: 1.063,
  },
  sp13: {
    label: "Supply Docket",
    requirements: ["sp09", "sp11"],
    price: 1400,
    brewSpeed: 1.121,
    brewQuality: 1.065,
  },
  sp14: {
    label: "Brewery Inventory Chute",
    requirements: ["sp10", "sp12"],
    price: 1500,
    brewSpeed: 1.119,
    brewQuality: 1.067,
  },
  sp15: {
    label: "Alchemical Workroom Layout",
    requirements: ["sp11", "sp13"],
    price: 1600,
    brewSpeed: 1.117,
    brewQuality: 1.07,
  },
  sp16: {
    label: "Modular Lab Partition",
    requirements: ["sp15"],
    price: 5000,
    brewSpeed: 1.09,
    brewQuality: 1.07,
  },
  sp17: {
    label: "Adjustable Workstation Array",
    requirements: ["sp16"],
    price: 5500,
    brewSpeed: 1.085,
    brewQuality: 1.076,
  },
  sp18: {
    label: "Dimensional Shelf Extender",
    requirements: ["sp16"],
    price: 6000,
    brewSpeed: 1.08,
    brewQuality: 1.081,
  },
  sp19: {
    label: "Ethereal Inventory Module",
    requirements: ["sp17", "sp18"],
    price: 6500,
    brewSpeed: 1.075,
    brewQuality: 1.086,
  },
  sp20: {
    label: "Mystic Spatial Analyzer",
    requirements: ["sp18"],
    price: 7000,
    brewSpeed: 1.07,
    brewQuality: 1.091,
  },
  sp21: {
    label: "Infinite Storage Blueprint",
    requirements: ["sp19", "sp20"],
    price: 8000,
    brewSpeed: 1.065,
    brewQuality: 1.096,
  },
  sp22: {
    label: "Arcane Compartment Reorganizer",
    requirements: ["sp19"],
    price: 8500,
    brewSpeed: 1.06,
    brewQuality: 1.101,
  },
  sp23: {
    label: "Transcendent Workroom Console",
    requirements: ["sp20", "sp21"],
    price: 9000,
    brewSpeed: 1.055,
    brewQuality: 1.106,
  },
  sp24: {
    label: "Philosopher's Space Divider",
    requirements: ["sp21"],
    price: 10000,
    brewSpeed: 1.05,
    brewQuality: 1.111,
  },
  sp25: {
    label: "Labyrinthine Supply Matrix",
    requirements: ["sp23", "sp24"],
    price: 12000,
    brewSpeed: 1.045,
    brewQuality: 1.116,
  },
  sp26: {
    label: "Mystic Arrangement Engine",
    requirements: ["sp24"],
    price: 14000,
    brewSpeed: 1.04,
    brewQuality: 1.121,
  },
  sp27: {
    label: "Spatial Efficiency Catalyst",
    requirements: ["sp25", "sp26"],
    price: 16000,
    brewSpeed: 1.035,
    brewQuality: 1.126,
  },
  sp28: {
    label: "Omnipresent Inventory System",
    requirements: ["sp27"],
    price: 18000,
    brewSpeed: 1.03,
    brewQuality: 1.131,
  },
  sp29: {
    label: "Alchemical Architecture Modulator",
    requirements: ["sp28"],
    price: 22000,
    brewSpeed: 1.025,
    brewQuality: 1.136,
  },
  sp30: {
    label: "Infinite Workroom Manifest",
    requirements: ["sp29"],
    price: 30000,
    brewSpeed: 1.02,
    brewQuality: 1.15,
  },
};

export type SpaceEquipmentKey = keyof typeof spaceEquipmentMap;

export const wiccaEquipmentMap: Record<string, Equipment> = {
  sacredAthame: {
    label: "Sacred Athame",
    requirements: ["cauldron"],
    price: 11000000000,
    brewSpeed: 1.018,
    brewQuality: 1.152,
  },
  covenCircle: {
    label: "Coven Circle",
    requirements: ["sacredAthame", "mortar"],
    price: 12100000000,
    brewSpeed: 1.0171,
    brewQuality: 1.153,
  },
  witchesBroom: {
    label: "Witches' Broom",
    requirements: ["covenCircle"],
    price: 13310000000,
    brewSpeed: 1.0162,
    brewQuality: 1.154,
  },
  tarotDeck: {
    label: "Tarot Deck of Destiny",
    requirements: ["witchesBroom", "herbRack"],
    price: 14641000000,
    brewSpeed: 1.0153,
    brewQuality: 1.155,
  },
  crystalOrb: {
    label: "Crystal Orb of Insight",
    requirements: ["tarotDeck", "infuserVials"],
    price: 16105100000,
    brewSpeed: 1.0144,
    brewQuality: 1.156,
  },
  paganPendant: {
    label: "Pagan Pendant",
    requirements: ["crystalOrb", "cauldron"],
    price: 17715610000,
    brewSpeed: 1.0135,
    brewQuality: 1.157,
  },
  spiritDrum: {
    label: "Spirit Drum",
    requirements: ["paganPendant", "infuserVials"],
    price: 19487171000,
    brewSpeed: 1.0126,
    brewQuality: 1.158,
  },
  herbalTalisman: {
    label: "Herbal Talisman",
    requirements: ["spiritDrum", "herbRack"],
    price: 21435888100,
    brewSpeed: 1.0117,
    brewQuality: 1.159,
  },
  mysticMirror: {
    label: "Mystic Mirror",
    requirements: ["herbalTalisman", "covenCircle"],
    price: 23579476910,
    brewSpeed: 1.0108,
    brewQuality: 1.16,
  },
  ritualCenser: {
    label: "Ritual Censer",
    requirements: ["mysticMirror", "infuserVials"],
    price: 25937424601,
    brewSpeed: 1.0099,
    brewQuality: 1.161,
  },
  sigilStone: {
    label: "Sigil Stone",
    requirements: ["ritualCenser", "tarotDeck"],
    price: 28531167061,
    brewSpeed: 1.009,
    brewQuality: 1.162,
  },
  sabbatScepter: {
    label: "Sabbat Scepter",
    requirements: ["sigilStone", "covenCircle"],
    price: 31384283767,
    brewSpeed: 1.0081,
    brewQuality: 1.163,
  },
  lunarLedger: {
    label: "Lunar Ledger",
    requirements: ["sabbatScepter", "cauldron"],
    price: 34522712143,
    brewSpeed: 1.0072,
    brewQuality: 1.164,
  },
  feyFamiliar: {
    label: "Fey Familiar",
    requirements: ["lunarLedger", "witchesBroom"],
    price: 37974983373,
    brewSpeed: 1.0063,
    brewQuality: 1.165,
  },
  sageScroll: {
    label: "Sage Scroll",
    requirements: ["feyFamiliar", "tarotDeck"],
    price: 41772481610,
    brewSpeed: 1.0054,
    brewQuality: 1.166,
  },
  divinationDeck: {
    label: "Divination Deck",
    requirements: ["sageScroll", "infuserVials"],
    price: 45949729871,
    brewSpeed: 1.0045,
    brewQuality: 1.167,
  },
  ritualRing: {
    label: "Ritual Ring",
    requirements: ["divinationDeck", "mysticMirror"],
    price: 50544702858,
    brewSpeed: 1.0036,
    brewQuality: 1.168,
  },
  wiccanWand: {
    label: "Wiccan Wand",
    requirements: ["ritualRing", "sacredAthame"],
    price: 55599173143,
    brewSpeed: 1.0027,
    brewQuality: 1.169,
  },
  arcaneAmulet: {
    label: "Arcane Amulet",
    requirements: ["wiccanWand", "paganPendant"],
    price: 61159090457,
    brewSpeed: 1.0018,
    brewQuality: 1.17,
  },
  occultOracle: {
    label: "Occult Oracle",
    requirements: ["arcaneAmulet", "lunarLedger"],
    price: 67274999401,
    brewSpeed: 1.0009,
    brewQuality: 1.171,
  },
};

export type WiccaEquipmentKey = keyof typeof wiccaEquipmentMap;

export const chemistryEquipmentMap: Record<string, Equipment> = {
  alchemicalRetort: {
    label: "Alchemical Retort",
    requirements: ["cauldron"],
    price: 250,
    brewSpeed: 1.15,
    brewQuality: 1.02,
  },
  mercurialVessel: {
    label: "Mercurial Vessel",
    requirements: ["alchemicalRetort", "mortar"],
    price: 500,
    brewSpeed: 1.147,
    brewQuality: 1.023,
  },
  vitriolExtractor: {
    label: "Vitriol Extractor",
    requirements: ["mercurialVessel", "herbRack"],
    price: 750,
    brewSpeed: 1.145,
    brewQuality: 1.025,
  },
  philosophersFlask: {
    label: "Philosopher's Flask",
    requirements: ["vitriolExtractor", "infuserVials"],
    price: 1000,
    brewSpeed: 1.142,
    brewQuality: 1.028,
  },
  aetherCondenser: {
    label: "Aether Condenser",
    requirements: ["philosophersFlask", "cauldron"],
    price: 1500,
    brewSpeed: 1.139,
    brewQuality: 1.031,
  },
  sublimationTower: {
    label: "Sublimation Tower",
    requirements: ["aetherCondenser", "alchemicalRetort"],
    price: 2000,
    brewSpeed: 1.137,
    brewQuality: 1.033,
  },
  elixirRefiner: {
    label: "Elixir Refiner",
    requirements: ["sublimationTower", "mercurialVessel"],
    price: 3000,
    brewSpeed: 1.134,
    brewQuality: 1.036,
  },
  arcaneDistiller: {
    label: "Arcane Distiller",
    requirements: ["elixirRefiner", "vitriolExtractor"],
    price: 5000,
    brewSpeed: 1.131,
    brewQuality: 1.039,
  },
  occultMixer: {
    label: "Occult Mixer",
    requirements: ["arcaneDistiller", "infuserVials"],
    price: 7500,
    brewSpeed: 1.129,
    brewQuality: 1.041,
  },
  hermeticStill: {
    label: "Hermetic Still",
    requirements: ["occultMixer", "philosophersFlask"],
    price: 10000,
    brewSpeed: 1.126,
    brewQuality: 1.044,
  },
  celestialExtractor: {
    label: "Celestial Extractor",
    requirements: ["hermeticStill", "aetherCondenser"],
    price: 15000,
    brewSpeed: 1.123,
    brewQuality: 1.047,
  },
  sacredAmalgamator: {
    label: "Sacred Amalgamator",
    requirements: ["celestialExtractor", "sublimationTower"],
    price: 20000,
    brewSpeed: 1.121,
    brewQuality: 1.049,
  },
  divineDecanter: {
    label: "Divine Decanter",
    requirements: ["sacredAmalgamator", "arcaneDistiller"],
    price: 30000,
    brewSpeed: 1.118,
    brewQuality: 1.052,
  },
  luminousSeparator: {
    label: "Luminous Separator",
    requirements: ["divineDecanter", "occultMixer"],
    price: 50000,
    brewSpeed: 1.116,
    brewQuality: 1.054,
  },
  etherealCombustor: {
    label: "Ethereal Combustor",
    requirements: ["luminousSeparator", "hermeticStill"],
    price: 75000,
    brewSpeed: 1.113,
    brewQuality: 1.057,
  },
  mysticAnalyzer: {
    label: "Mystic Analyzer",
    requirements: ["etherealCombustor", "celestialExtractor"],
    price: 100000,
    brewSpeed: 1.11,
    brewQuality: 1.06,
  },
  astralReactor: {
    label: "Astral Reactor",
    requirements: ["mysticAnalyzer", "divineDecanter"],
    price: 150000,
    brewSpeed: 1.108,
    brewQuality: 1.062,
  },
  transmutationChamber: {
    label: "Transmutation Chamber",
    requirements: ["astralReactor", "luminousSeparator"],
    price: 200000,
    brewSpeed: 1.105,
    brewQuality: 1.065,
  },
  phlogistonCollector: {
    label: "Phlogiston Collector",
    requirements: ["transmutationChamber", "etherealCombustor"],
    price: 300000,
    brewSpeed: 1.102,
    brewQuality: 1.068,
  },
  arcaneCatalyst: {
    label: "Arcane Catalyst",
    requirements: ["phlogistonCollector", "mysticAnalyzer"],
    price: 500000,
    brewSpeed: 1.1,
    brewQuality: 1.07,
  },
};

export type chemistryEquipmentMapKey = keyof typeof chemistryEquipmentMap;

export const vampireEquipmentMap: Record<string, Equipment> = {
  bloodChalice: {
    label: "Blood Chalice",
    requirements: ["cauldron"],
    price: 250,
    brewSpeed: 1.15,
    brewQuality: 1.02,
  },
  nocturneMortar: {
    label: "Nocturne Mortar",
    requirements: ["bloodChalice", "mortar"],
    price: 500,
    brewSpeed: 1.147,
    brewQuality: 1.023,
  },
  crimsonInfuser: {
    label: "Crimson Infuser",
    requirements: ["bloodChalice", "infuserVials"],
    price: 750,
    brewSpeed: 1.145,
    brewQuality: 1.025,
  },
  duskCauldron: {
    label: "Dusk Cauldron",
    requirements: ["bloodChalice", "cauldron"],
    price: 1000,
    brewSpeed: 1.142,
    brewQuality: 1.028,
  },
  shadowStirrer: {
    label: "Shadow Stirrer",
    requirements: ["nocturneMortar", "crimsonInfuser"],
    price: 1500,
    brewSpeed: 1.139,
    brewQuality: 1.031,
  },
  midnightThermometer: {
    label: "Midnight Thermometer",
    requirements: ["shadowStirrer"],
    price: 2000,
    brewSpeed: 1.137,
    brewQuality: 1.033,
  },
  bloodCatalyst: {
    label: "Blood Catalyst",
    requirements: ["midnightThermometer", "duskCauldron"],
    price: 3000,
    brewSpeed: 1.134,
    brewQuality: 1.036,
  },
  cryptChamber: {
    label: "Crypt Chamber",
    requirements: ["crimsonInfuser"],
    price: 5000,
    brewSpeed: 1.131,
    brewQuality: 1.039,
  },
  vampiricConductor: {
    label: "Vampiric Conductor",
    requirements: ["bloodCatalyst", "cryptChamber"],
    price: 7500,
    brewSpeed: 1.129,
    brewQuality: 1.041,
  },
  sanguineScales: {
    label: "Sanguine Scales",
    requirements: ["nocturneMortar", "shadowStirrer"],
    price: 10000,
    brewSpeed: 1.126,
    brewQuality: 1.044,
  },
  fangedFilter: {
    label: "Fanged Filter",
    requirements: ["bloodChalice", "crimsonInfuser"],
    price: 15000,
    brewSpeed: 1.123,
    brewQuality: 1.047,
  },
  lunarLament: {
    label: "Lunar Lament",
    requirements: ["sanguineScales", "midnightThermometer"],
    price: 20000,
    brewSpeed: 1.121,
    brewQuality: 1.049,
  },
  nocturnalPhial: {
    label: "Nocturnal Phial",
    requirements: ["cryptChamber", "infuserVials"],
    price: 30000,
    brewSpeed: 1.118,
    brewQuality: 1.052,
  },
  twilightInfuser: {
    label: "Twilight Infuser",
    requirements: ["bloodCatalyst", "nocturnalPhial"],
    price: 50000,
    brewSpeed: 1.116,
    brewQuality: 1.054,
  },
  vampiricBinder: {
    label: "Vampiric Binder",
    requirements: ["shadowStirrer", "sanguineScales"],
    price: 75000,
    brewSpeed: 1.113,
    brewQuality: 1.057,
  },
  coffinCrucible: {
    label: "Coffin Crucible",
    requirements: ["vampiricBinder", "cryptChamber"],
    price: 100000,
    brewSpeed: 1.11,
    brewQuality: 1.06,
  },
  deathlyDistiller: {
    label: "Deathly Distiller",
    requirements: ["coffinCrucible", "bloodCatalyst"],
    price: 150000,
    brewSpeed: 1.108,
    brewQuality: 1.062,
  },
  eternalExtractor: {
    label: "Eternal Extractor",
    requirements: ["deathlyDistiller", "nocturnalPhial"],
    price: 200000,
    brewSpeed: 1.105,
    brewQuality: 1.065,
  },
  vampiricVortex: {
    label: "Vampiric Vortex",
    requirements: ["eternalExtractor", "twilightInfuser"],
    price: 300000,
    brewSpeed: 1.102,
    brewQuality: 1.068,
  },
  sanguineSorcerer: {
    label: "Sanguine Sorcerer",
    requirements: ["vampiricVortex", "coffinCrucible"],
    price: 500000,
    brewSpeed: 1.1,
    brewQuality: 1.07,
  },
};

export type VampireEquipmentMapKey = keyof typeof vampireEquipmentMap;

export const hellEquipmentMap: Record<string, Equipment> = {
  // Tier 1 – The Descent Begins
  abyssalCauldron: {
    label: "Abyssal Cauldron",
    requirements: ["cauldron"],
    price: 10000,
    brewSpeed: 1.15,
    brewQuality: 0.98,
  },
  infernalAthame: {
    label: "Infernal Athame",
    requirements: ["abyssalCauldron", "mortar"],
    price: 20000,
    brewSpeed: 1.148,
    brewQuality: 0.977,
  },
  hellishMortar: {
    label: "Hellish Mortar",
    requirements: ["abyssalCauldron"],
    price: 30000,
    brewSpeed: 1.146,
    brewQuality: 0.975,
  },
  demonInfuser: {
    label: "Demon Infuser",
    requirements: ["hellishMortar", "infuserVials"],
    price: 40000,
    brewSpeed: 1.144,
    brewQuality: 0.972,
  },
  satanicStirrer: {
    label: "Satanic Stirrer",
    requirements: ["infernalAthame", "hellishMortar"],
    price: 50000,
    brewSpeed: 1.142,
    brewQuality: 0.97,
  },
  fiendishThermometer: {
    label: "Fiendish Thermometer",
    requirements: ["satanicStirrer", "thermometer"],
    price: 60000,
    // A slight dip—a bitter taste early on.
    brewSpeed: 0.98,
    brewQuality: 0.985,
  },
  brimstoneBinder: {
    label: "Brimstone Binder",
    requirements: ["fiendishThermometer", "herbRack"],
    price: 70000,
    brewSpeed: 1.141,
    brewQuality: 0.965,
  },
  devilishDistiller: {
    label: "Devilish Distiller",
    requirements: ["brimstoneBinder", "abyssalCauldron"],
    price: 80000,
    brewSpeed: 1.138,
    brewQuality: 0.962,
  },
  netherNexus: {
    label: "Nether Nexus",
    requirements: ["devilishDistiller", "infuserVials"],
    price: 90000,
    brewSpeed: 1.135,
    brewQuality: 0.96,
  },
  purgatoryPhial: {
    label: "Purgatory Phial",
    requirements: ["netherNexus", "cauldron"],
    price: 100000,
    brewSpeed: 1.132,
    brewQuality: 0.958,
  },

  // Tier 2 – Deeper into Despair
  soulSeparator: {
    label: "Soul Separator",
    requirements: ["purgatoryPhial", "mortar"],
    price: 150000,
    brewSpeed: 1.13,
    brewQuality: 0.955,
  },
  underworldUrn: {
    label: "Underworld Urn",
    requirements: ["soulSeparator", "abyssalCauldron"],
    price: 200000,
    brewSpeed: 1.127,
    brewQuality: 0.952,
  },
  hellfireHeater: {
    label: "Hellfire Heater",
    requirements: ["underworldUrn", "thermometer"],
    price: 250000,
    brewSpeed: 1.124,
    brewQuality: 0.95,
  },
  charredChalice: {
    label: "Charred Chalice",
    requirements: ["hellfireHeater", "infuserVials"],
    price: 300000,
    brewSpeed: 1.121,
    brewQuality: 0.947,
  },
  demonicDecanter: {
    label: "Demonic Decanter",
    requirements: ["charredChalice", "mortar"],
    price: 350000,
    brewSpeed: 1.118,
    brewQuality: 0.945,
  },
  scorchingScales: {
    label: "Scorching Scales",
    requirements: ["demonicDecanter", "herbRack"],
    price: 400000,
    brewSpeed: 1.115,
    brewQuality: 0.942,
  },
  infernoIncubator: {
    label: "Inferno Incubator",
    requirements: ["scorchingScales", "cauldron"],
    price: 450000,
    brewSpeed: 1.112,
    brewQuality: 0.94,
  },
  blazingBinder: {
    label: "Blazing Binder",
    requirements: ["infernoIncubator", "mortar", "purgatoryPhial"],
    price: 500000,
    brewSpeed: 1.109,
    brewQuality: 0.938,
  },
  cinderCatalyst: {
    label: "Cinder Catalyst",
    requirements: ["blazingBinder", "infuserVials"],
    price: 550000,
    brewSpeed: 1.106,
    brewQuality: 0.935,
  },
  sinisterSynthesizer: {
    label: "Sinister Synthesizer",
    requirements: ["cinderCatalyst", "abyssalCauldron"],
    price: 600000,
    brewSpeed: 1.103,
    brewQuality: 0.933,
  },

  // Tier 3 – The Trial by Torment
  tormentedTonic: {
    label: "Tormented Tonic",
    requirements: ["sinisterSynthesizer", "herbRack"],
    price: 700000,
    // A further quality dip—suffering comes at a steep price.
    brewSpeed: 0.97,
    brewQuality: 0.96,
  },
  sulfuricSiphon: {
    label: "Sulfuric Siphon",
    requirements: ["tormentedTonic", "mortar"],
    price: 800000,
    brewSpeed: 1.12,
    brewQuality: 0.93,
  },
  malebolgeMixer: {
    label: "Malebolge Mixer",
    requirements: ["sulfuricSiphon", "infuserVials"],
    price: 900000,
    brewSpeed: 1.117,
    brewQuality: 0.927,
  },
  lachrymoseLantern: {
    label: "Lachrymose Lantern",
    requirements: ["malebolgeMixer", "cauldron"],
    price: 1000000,
    brewSpeed: 1.114,
    brewQuality: 0.924,
  },
  fieryFurnace: {
    label: "Fiery Furnace",
    requirements: ["lachrymoseLantern", "mortar"],
    price: 1100000,
    brewSpeed: 1.111,
    brewQuality: 0.921,
  },
  scaldingSeparator: {
    label: "Scalding Separator",
    requirements: ["fieryFurnace", "herbRack"],
    price: 1200000,
    brewSpeed: 1.108,
    brewQuality: 0.918,
  },
  infernalInjector: {
    label: "Infernal Injector",
    requirements: ["scaldingSeparator", "infuserVials"],
    price: 1300000,
    brewSpeed: 1.105,
    brewQuality: 0.915,
  },
  screamingSiphon: {
    label: "Screaming Siphon",
    requirements: ["infernalInjector", "cauldron"],
    price: 1400000,
    brewSpeed: 1.102,
    brewQuality: 0.912,
  },
  demonDuct: {
    label: "Demon Duct",
    requirements: ["screamingSiphon", "mortar"],
    price: 1500000,
    brewSpeed: 1.099,
    brewQuality: 0.909,
  },
  chaosCondenser: {
    label: "Chaos Condenser",
    requirements: ["demonDuct", "infuserVials"],
    price: 1600000,
    brewSpeed: 1.096,
    brewQuality: 0.906,
  },

  // Tier 4 – Into the Maelstrom
  hellishHelix: {
    label: "Hellish Helix",
    requirements: ["chaosCondenser", "abyssalCauldron"],
    price: 1800000,
    brewSpeed: 1.093,
    brewQuality: 0.904,
  },
  soulStirrer: {
    label: "Soul Stirrer",
    requirements: ["hellishHelix", "mortar", "underworldUrn"],
    price: 2000000,
    brewSpeed: 1.09,
    brewQuality: 0.901,
  },
  phlegmPhilter: {
    label: "Phlegm Philter",
    requirements: ["soulStirrer", "infuserVials"],
    price: 2200000,
    brewSpeed: 1.087,
    brewQuality: 0.898,
  },
  eternalEmber: {
    label: "Eternal Ember",
    requirements: ["phlegmPhilter", "cauldron"],
    price: 2400000,
    brewSpeed: 1.084,
    brewQuality: 0.895,
  },
  devilDrum: {
    label: "Devil Drum",
    requirements: ["eternalEmber", "mortar"],
    price: 2600000,
    brewSpeed: 1.081,
    brewQuality: 0.892,
  },
  cursedCenser: {
    label: "Cursed Censer",
    requirements: ["devilDrum", "herbRack", "purgatoryPhial"],
    price: 2800000,
    brewSpeed: 1.078,
    brewQuality: 0.889,
  },
  moltenMixer: {
    label: "Molten Mixer",
    requirements: ["cursedCenser", "infernoIncubator"],
    price: 3000000,
    brewSpeed: 1.075,
    brewQuality: 0.886,
  },
  despairDecanter: {
    label: "Despair Decanter",
    requirements: ["moltenMixer", "mortar"],
    price: 3200000,
    brewSpeed: 1.072,
    brewQuality: 0.883,
  },
  anguishAmalgamator: {
    label: "Anguish Amalgamator",
    requirements: ["despairDecanter", "infuserVials"],
    price: 3400000,
    brewSpeed: 1.069,
    brewQuality: 0.88,
  },
  furnaceFunnel: {
    label: "Furnace Funnel",
    requirements: ["anguishAmalgamator", "cauldron"],
    price: 3600000,
    brewSpeed: 1.066,
    brewQuality: 0.877,
  },

  // Tier 5 – The Brink of Damnation
  infernoInfuser: {
    label: "Inferno Infuser",
    requirements: ["furnaceFunnel", "mortar"],
    price: 4000000,
    brewSpeed: 1.063,
    brewQuality: 0.875,
  },
  blightBinder: {
    label: "Blight Binder",
    requirements: ["infernoInfuser", "infuserVials"],
    price: 4400000,
    brewSpeed: 1.06,
    brewQuality: 0.872,
  },
  dreadDistiller: {
    label: "Dread Distiller",
    requirements: ["blightBinder", "cauldron"],
    price: 4800000,
    brewSpeed: 1.057,
    brewQuality: 0.869,
  },
  sorrowSeparator: {
    label: "Sorrow Separator",
    requirements: ["dreadDistiller", "mortar"],
    price: 5200000,
    brewSpeed: 1.054,
    brewQuality: 0.866,
  },
  tortureThermometer: {
    label: "Torture Thermometer",
    requirements: ["sorrowSeparator", "thermometer"],
    price: 5600000,
    brewSpeed: 1.051,
    brewQuality: 0.863,
  },
  grimGrinder: {
    label: "Grim Grinder",
    requirements: ["tortureThermometer", "herbRack"],
    price: 6000000,
    brewSpeed: 1.048,
    brewQuality: 0.86,
  },
  diabolicDecanter: {
    label: "Diabolic Decanter",
    requirements: ["grimGrinder", "infuserVials"],
    price: 6400000,
    brewSpeed: 1.045,
    brewQuality: 0.857,
  },
  damnationDetector: {
    label: "Damnation Detector",
    requirements: ["diabolicDecanter", "cauldron"],
    price: 6800000,
    brewSpeed: 1.042,
    brewQuality: 0.854,
  },
  abyssalAnalyzer: {
    label: "Abyssal Analyzer",
    requirements: ["damnationDetector", "mortar"],
    price: 7200000,
    brewSpeed: 1.039,
    brewQuality: 0.851,
  },
  sinisterSieve: {
    label: "Sinister Sieve",
    requirements: ["abyssalAnalyzer", "infuserVials"],
    price: 7600000,
    brewSpeed: 1.036,
    brewQuality: 0.848,
  },

  // Tier 6 – The Pinnacle of Perdition
  hellscapeHeater: {
    label: "Hellscape Heater",
    requirements: ["sinisterSieve", "cauldron"],
    price: 8000000,
    brewSpeed: 1.033,
    brewQuality: 0.845,
  },
  infernalImmolator: {
    label: "Infernal Immolator",
    requirements: ["hellscapeHeater", "mortar"],
    price: 8400000,
    brewSpeed: 1.03,
    brewQuality: 0.842,
  },
  scorchingSpecter: {
    label: "Scorching Specter",
    requirements: ["infernalImmolator", "infuserVials"],
    price: 8800000,
    brewSpeed: 1.027,
    brewQuality: 0.839,
  },
  netherNebulizer: {
    label: "Nether Nebulizer",
    requirements: ["scorchingSpecter", "cauldron"],
    price: 9200000,
    brewSpeed: 1.024,
    brewQuality: 0.836,
  },
  damnedDripper: {
    label: "Damned Dripper",
    requirements: ["netherNebulizer", "mortar"],
    price: 9600000,
    brewSpeed: 1.021,
    brewQuality: 0.833,
  },
  cursedCatalyst: {
    label: "Cursed Catalyst",
    requirements: ["damnedDripper", "infuserVials"],
    price: 10000000,
    brewSpeed: 1.018,
    brewQuality: 0.83,
  },
  satanicSeparator: {
    label: "Satanic Separator",
    requirements: ["cursedCatalyst", "cauldron"],
    price: 10400000,
    brewSpeed: 1.015,
    brewQuality: 0.827,
  },
  fiendishFilter: {
    label: "Fiendish Filter",
    requirements: ["satanicSeparator", "mortar"],
    price: 10800000,
    brewSpeed: 1.012,
    brewQuality: 0.824,
  },
  diabolicDissolver: {
    label: "Diabolic Dissolver",
    requirements: ["fiendishFilter", "infuserVials"],
    price: 11200000,
    brewSpeed: 1.009,
    brewQuality: 0.821,
  },
  ultimateUnderworld: {
    label: "Ultimate Underworld",
    requirements: ["diabolicDissolver", "cauldron"],
    price: 11600000,
    brewSpeed: 1.006,
    brewQuality: 0.818,
  },
};

export type HellEquipmentMapKey = keyof typeof hellEquipmentMap;

export const heavenEquipmentMap: Record<string, Equipment> = {
  // Tier 1 – The Initiation of Celestial Order
  divineCauldron: {
    label: "Divine Cauldron",
    requirements: ["cauldron", "infuserVials"],
    price: 20000,
    brewSpeed: 0.97,
    brewQuality: 1.05,
  },
  seraphicAthame: {
    label: "Seraphic Athame",
    requirements: ["mortar", "cauldron"],
    price: 40000,
    brewSpeed: 0.968,
    brewQuality: 1.055,
  },
  angelicMortar: {
    label: "Angelic Mortar",
    requirements: ["mortar", "herbRack"],
    price: 60000,
    brewSpeed: 0.966,
    brewQuality: 1.06,
  },
  sacredInfuser: {
    label: "Sacred Infuser",
    requirements: ["infuserVials", "cauldron"],
    price: 80000,
    brewSpeed: 0.964,
    brewQuality: 1.065,
  },
  celestialStirrer: {
    label: "Celestial Stirrer",
    requirements: ["mortar", "herbRack", "cauldron"],
    price: 100000,
    brewSpeed: 0.962,
    brewQuality: 1.07,
  },
  heavenlyThermometer: {
    label: "Heavenly Thermometer",
    requirements: ["thermometer", "cauldron"],
    price: 120000,
    brewSpeed: 0.96,
    brewQuality: 1.075,
  },
  aureateBinder: {
    label: "Aureate Binder",
    requirements: ["herbRack", "mortar", "infuserVials"],
    price: 140000,
    brewSpeed: 0.958,
    brewQuality: 1.08,
  },
  etherealDistiller: {
    label: "Ethereal Distiller",
    requirements: ["cauldron", "infuserVials", "thermometer"],
    price: 160000,
    brewSpeed: 0.956,
    brewQuality: 1.085,
  },
  radiantNexus: {
    label: "Radiant Nexus",
    requirements: ["divineCauldron", "seraphicAthame", "cauldron"],
    price: 180000,
    brewSpeed: 0.954,
    brewQuality: 1.09,
  },
  blessedPhial: {
    label: "Blessed Phial",
    requirements: ["celestialStirrer", "infuserVials", "mortar"],
    price: 200000,
    brewSpeed: 0.952,
    brewQuality: 1.095,
  },

  // Tier 2 – The Edicts of the Exalted
  divineMandate: {
    label: "Divine Mandate",
    requirements: ["divineCauldron", "seraphicAthame", "angelicMortar"],
    price: 300000,
    brewSpeed: 0.95,
    brewQuality: 1.12,
  },
  seraphsCommand: {
    label: "Seraph’s Command",
    requirements: ["angelicMortar", "sacredInfuser", "celestialStirrer"],
    price: 400000,
    brewSpeed: 0.948,
    brewQuality: 1.125,
  },
  archangelicEdict: {
    label: "Archangelic Edict",
    requirements: ["divineCauldron", "seraphsCommand", "blessedPhial"],
    price: 500000,
    brewSpeed: 0.946,
    brewQuality: 1.13,
  },
  sacrosanctScripture: {
    label: "Sacrosanct Scripture",
    requirements: ["etherealDistiller", "radiantNexus", "celestialStirrer"],
    price: 600000,
    brewSpeed: 0.944,
    brewQuality: 1.135,
  },
  celestialCovenant: {
    label: "Celestial Covenant",
    requirements: [
      "divineMandate",
      "seraphsCommand",
      "angelicMortar",
      "sacredInfuser",
    ],
    price: 700000,
    brewSpeed: 0.942,
    brewQuality: 1.14,
  },
  empiricalEmanation: {
    label: "Empirical Emanation",
    requirements: ["divineCauldron", "etherealDistiller", "blessedPhial"],
    price: 800000,
    brewSpeed: 0.94,
    brewQuality: 1.145,
  },
  aureateAegis: {
    label: "Aureate Aegis",
    requirements: [
      "aureateBinder",
      "celestialStirrer",
      "radiantNexus",
      "seraphicAthame",
    ],
    price: 900000,
    brewSpeed: 0.938,
    brewQuality: 1.15,
  },
  divineRevelation: {
    label: "Divine Revelation",
    requirements: [
      "seraphsCommand",
      "etherealDistiller",
      "angelicMortar",
      "sacredInfuser",
      "thermometer",
    ],
    price: 1000000,
    brewSpeed: 0.936,
    brewQuality: 1.155,
  },
  celestialEdifice: {
    label: "Celestial Edifice",
    requirements: [
      "divineMandate",
      "celestialCovenant",
      "archangelicEdict",
      "blessedPhial",
    ],
    price: 1100000,
    brewSpeed: 0.934,
    brewQuality: 1.16,
  },
  heavenlyHarbinger: {
    label: "Heavenly Harbinger",
    requirements: [
      "divineRevelation",
      "aureateAegis",
      "radiantNexus",
      "divineCauldron",
    ],
    price: 1200000,
    brewSpeed: 0.932,
    brewQuality: 1.165,
  },

  // Tier 3 – The Ascension of the Chosen
  sacredSeraph: {
    label: "Sacred Seraph",
    requirements: [
      "celestialEdifice",
      "divineRevelation",
      "seraphsCommand",
      "angelicMortar",
    ],
    price: 1500000,
    brewSpeed: 0.93,
    brewQuality: 1.17,
  },
  exaltedEchelon: {
    label: "Exalted Echelon",
    requirements: [
      "heavenlyHarbinger",
      "divineMandate",
      "celestialCovenant",
      "aureateAegis",
    ],
    price: 1600000,
    brewSpeed: 0.928,
    brewQuality: 1.175,
  },
  divineDominion: {
    label: "Divine Dominion",
    requirements: [
      "celestialEdifice",
      "archangelicEdict",
      "sacrosanctScripture",
      "etherealDistiller",
    ],
    price: 1700000,
    brewSpeed: 0.926,
    brewQuality: 1.18,
  },
  seraphicSovereign: {
    label: "Seraphic Sovereign",
    requirements: [
      "divineRevelation",
      "celestialEdifice",
      "heavenlyHarbinger",
      "divineCauldron",
      "angelicMortar",
    ],
    price: 1800000,
    brewSpeed: 0.924,
    brewQuality: 1.185,
  },
  eternalEdict: {
    label: "Eternal Edict",
    requirements: [
      "divineDominion",
      "celestialEdifice",
      "seraphicSovereign",
      "divineMandate",
    ],
    price: 1900000,
    brewSpeed: 0.922,
    brewQuality: 1.19,
  },
  hallowedHierarchy: {
    label: "Hallowed Hierarchy",
    requirements: [
      "eternalEdict",
      "exaltedEchelon",
      "aureateAegis",
      "seraphsCommand",
    ],
    price: 2000000,
    brewSpeed: 0.92,
    brewQuality: 1.195,
  },
  celestialConclave: {
    label: "Celestial Conclave",
    requirements: [
      "heavenlyHarbinger",
      "divineDominion",
      "celestialCovenant",
      "archangelicEdict",
      "etherealDistiller",
    ],
    price: 2100000,
    brewSpeed: 0.918,
    brewQuality: 1.2,
  },
  angelicAusterity: {
    label: "Angelic Austerity",
    requirements: [
      "divineRevelation",
      "exaltedEchelon",
      "celestialEdifice",
      "aureateAegis",
      "blessedPhial",
    ],
    price: 2200000,
    brewSpeed: 0.916,
    brewQuality: 1.205,
  },
  sacrosanctSanction: {
    label: "Sacrosanct Sanction",
    requirements: [
      "eternalEdict",
      "celestialConclave",
      "divineMandate",
      "divineCauldron",
    ],
    price: 2300000,
    brewSpeed: 0.914,
    brewQuality: 1.21,
  },

  // Tier 4 – The Enforcers of Celestial Law
  seraphicSentinel: {
    label: "Seraphic Sentinel",
    requirements: [
      "heavenlyHegemony",
      "divineRevelation",
      "angelicAusterity",
      "celestialEdifice",
      "divineCauldron",
    ],
    price: 2600000,
    brewSpeed: 0.91,
    brewQuality: 1.22,
  },
  divineDisciple: {
    label: "Divine Disciple",
    requirements: [
      "sacredSeraph",
      "eternalEdict",
      "exaltedEchelon",
      "celestialCovenant",
    ],
    price: 2700000,
    brewSpeed: 0.908,
    brewQuality: 1.225,
  },
  archangelicAuthority: {
    label: "Archangelic Authority",
    requirements: [
      "seraphicSovereign",
      "divineDominion",
      "celestialConclave",
      "hallowedHierarchy",
      "divineMandate",
    ],
    price: 2800000,
    brewSpeed: 0.906,
    brewQuality: 1.23,
  },
  celestialCensor: {
    label: "Celestial Censor",
    requirements: [
      "heavenlyHarbinger",
      "divineRevelation",
      "angelicAusterity",
      "aureateBinder",
      "blessedPhial",
    ],
    price: 2900000,
    brewSpeed: 0.904,
    brewQuality: 1.235,
  },
  sacredSentry: {
    label: "Sacred Sentry",
    requirements: [
      "divineDisciple",
      "celestialEdifice",
      "seraphicSentinel",
      "divineDominion",
      "angelicMortar",
    ],
    price: 3000000,
    brewSpeed: 0.902,
    brewQuality: 1.24,
  },
  hallowedHerald: {
    label: "Hallowed Herald",
    requirements: [
      "celestialConclave",
      "sacrosanctSanction",
      "archangelicAuthority",
      "divineMandate",
    ],
    price: 3100000,
    brewSpeed: 0.9,
    brewQuality: 1.245,
  },
  etherealEnforcer: {
    label: "Ethereal Enforcer",
    requirements: [
      "seraphicSentinel",
      "divineDisciple",
      "celestialConclave",
      "hallowedHierarchy",
      "etherealDistiller",
    ],
    price: 3200000,
    brewSpeed: 0.898,
    brewQuality: 1.25,
  },
  righteousRegulator: {
    label: "Righteous Regulator",
    requirements: [
      "archangelicAuthority",
      "celestialCensor",
      "divineDominion",
      "exaltedEchelon",
      "blessedPhial",
    ],
    price: 3300000,
    brewSpeed: 0.896,
    brewQuality: 1.255,
  },
  divineDominator: {
    label: "Divine Dominator",
    requirements: [
      "righteousRegulator",
      "sacredSentry",
      "hallowedHerald",
      "angelicAusterity",
      "divineRevelation",
    ],
    price: 3400000,
    brewSpeed: 0.894,
    brewQuality: 1.26,
  },
  heavenlyHierarchy: {
    label: "Heavenly Hierarchy",
    requirements: [
      "divineDominator",
      "etherealEnforcer",
      "celestialConclave",
      "divineDisciple",
      "seraphicSentinel",
    ],
    price: 3500000,
    brewSpeed: 0.892,
    brewQuality: 1.265,
  },

  // Tier 5 – The Immutable Decrees
  celestialCommand: {
    label: "Celestial Command",
    requirements: [
      "heavenlyHierarchy",
      "divineDominator",
      "sacredSentry",
      "seraphicSentinel",
      "archangelicAuthority",
    ],
    price: 3600000,
    brewSpeed: 0.89,
    brewQuality: 1.27,
  },
  divineDictate: {
    label: "Divine Dictate",
    requirements: [
      "celestialCommand",
      "divineDisciple",
      "etherealEnforcer",
      "divineMandate",
      "angelicAusterity",
    ],
    price: 3700000,
    brewSpeed: 0.888,
    brewQuality: 1.275,
  },
  seraphicSupremacy: {
    label: "Seraphic Supremacy",
    requirements: [
      "divineDictate",
      "righteousRegulator",
      "heavenlyHierarchy",
      "celestialConclave",
      "divineDominion",
    ],
    price: 3800000,
    brewSpeed: 0.886,
    brewQuality: 1.28,
  },
  angelicApex: {
    label: "Angelic Apex",
    requirements: [
      "seraphicSupremacy",
      "divineDominator",
      "celestialCommand",
      "hallowedHerald",
      "archangelicAuthority",
    ],
    price: 3900000,
    brewSpeed: 0.884,
    brewQuality: 1.285,
  },
  sacrosanctSystem: {
    label: "Sacrosanct System",
    requirements: [
      "angelicApex",
      "divineDictate",
      "etherealEnforcer",
      "divineDisciple",
      "celestialCensor",
    ],
    price: 4000000,
    brewSpeed: 0.882,
    brewQuality: 1.29,
  },
  exaltedEminence: {
    label: "Exalted Eminence",
    requirements: [
      "sacrosanctSystem",
      "celestialCommand",
      "divineDictate",
      "divineDominion",
      "righteousRegulator",
    ],
    price: 4100000,
    brewSpeed: 0.88,
    brewQuality: 1.295,
  },
  seraphicSanction: {
    label: "Seraphic Sanction",
    requirements: [
      "exaltedEminence",
      "angelicApex",
      "heavenlyHierarchy",
      "celestialConclave",
      "divineMandate",
    ],
    price: 4200000,
    brewSpeed: 0.878,
    brewQuality: 1.3,
  },
  divineDespotism: {
    label: "Divine Despotism",
    requirements: [
      "seraphicSanction",
      "celestialCommand",
      "divineDictate",
      "sacredSentry",
      "divineDisciple",
    ],
    price: 4300000,
    brewSpeed: 0.876,
    brewQuality: 1.305,
  },
  celestialCoup: {
    label: "Celestial Coup",
    requirements: [
      "divineDespotism",
      "angelicApex",
      "heavenlyHierarchy",
      "righteousRegulator",
      "divineDominion",
    ],
    price: 4400000,
    brewSpeed: 0.874,
    brewQuality: 1.31,
  },
  heavenlyHegemony: {
    label: "Heavenly Hegemony",
    requirements: [
      "celestialCoup",
      "divineDespotism",
      "exaltedEminence",
      "seraphicSanction",
      "celestialConclave",
    ],
    price: 4500000,
    brewSpeed: 0.872,
    brewQuality: 1.315,
  },

  // Tier 6 – The Final Edict
  divineOverlord: {
    label: "Divine Overlord",
    requirements: [
      "heavenlyHegemony",
      "divineDespotism",
      "exaltedEminence",
      "celestialCommand",
      "angelicApex",
    ],
    price: 16000000,
    brewSpeed: 0.87,
    brewQuality: 1.32,
  },
  seraphicSupreme: {
    label: "Seraphic Supreme",
    requirements: [
      "divineOverlord",
      "divineDictate",
      "seraphicSanction",
      "heavenlyHierarchy",
      "celestialCensor",
    ],
    price: 16800000,
    brewSpeed: 0.868,
    brewQuality: 1.325,
  },
  angelicAscendancy: {
    label: "Angelic Ascendancy",
    requirements: [
      "seraphicSupreme",
      "divineOverlord",
      "divineDominion",
      "celestialCovenant",
      "righteousRegulator",
    ],
    price: 17600000,
    brewSpeed: 0.866,
    brewQuality: 1.33,
  },
  celestialJudicator: {
    label: "Celestial Judicator",
    requirements: [
      "angelicAscendancy",
      "divineDespotism",
      "seraphicSupremacy",
      "divineDictate",
      "etherealEnforcer",
    ],
    price: 18400000,
    brewSpeed: 0.864,
    brewQuality: 1.335,
  },
  sacredSovereignty: {
    label: "Sacred Sovereignty",
    requirements: [
      "celestialJudicator",
      "divineOverlord",
      "exaltedEminence",
      "heavenlyHierarchy",
      "celestialCommand",
    ],
    price: 19200000,
    brewSpeed: 0.862,
    brewQuality: 1.34,
  },
  divineInquisition: {
    label: "Divine Inquisition",
    requirements: [
      "sacredSovereignty",
      "angelicApex",
      "divineDespotism",
      "seraphicSanction",
      "divineDominion",
    ],
    price: 20000000,
    brewSpeed: 0.86,
    brewQuality: 1.345,
  },
  seraphicSentience: {
    label: "Seraphic Sentience",
    requirements: [
      "divineInquisition",
      "celestialJudicator",
      "divineOverlord",
      "heavenlyHegemony",
      "celestialConclave",
    ],
    price: 20800000,
    brewSpeed: 0.858,
    brewQuality: 1.35,
  },
  etherealEnlightenment: {
    label: "Ethereal Enlightenment",
    requirements: [
      "seraphicSentience",
      "divineInquisition",
      "celestialCoup",
      "angelicApex",
      "divineDictate",
    ],
    price: 21600000,
    brewSpeed: 0.856,
    brewQuality: 1.355,
  },
  divineDestiny: {
    label: "Divine Destiny",
    requirements: [
      "etherealEnlightenment",
      "celestialJudicator",
      "divineOverlord",
      "seraphicSupreme",
      "celestialCommand",
    ],
    price: 22400000,
    brewSpeed: 0.854,
    brewQuality: 1.36,
  },
  heavenlyHegemonyFinal: {
    label: "Heavenly Hegemony Final",
    requirements: [
      "divineDestiny",
      "etherealEnlightenment",
      "seraphicSentience",
      "divineInquisition",
      "heavenlyHierarchy",
    ],
    price: 23200000,
    brewSpeed: 0.852,
    brewQuality: 1.365,
  },
};

export type HeavenEquipmentMapKey = keyof typeof heavenEquipmentMap;

export const integrationEquipmentMap: Record<string, Equipment> = {
  // 1. Brew Log
  // Upstream: core "cauldron", core "mortar", core "herbRack"
  brewLog: {
    label: "Brew Log",
    requirements: ["cauldron", "mortar", "herbRack"],
    price: 1500,
    brewSpeed: 1.005,
    brewQuality: 1.03,
  },
  // 2. Quality Register
  // Upstream: core "thermometer", chemistry "phMeter", core "infuserVials"
  qualityRegister: {
    label: "Quality Register",
    requirements: ["thermometer", "phMeter", "infuserVials"],
    price: 1800,
    brewSpeed: 1.0,
    brewQuality: 1.05,
  },
  // 3. Process Ledger
  // Upstream: core "runicScales", core "timeTuner", chemistry "reagentRack"
  processLedger: {
    label: "Process Ledger",
    requirements: ["runicScales", "timeTuner", "reagentRack"],
    price: 2000,
    brewSpeed: 0.995,
    brewQuality: 1.04,
  },
  // 4. Distillation Record
  // Upstream: core "alembic", chemistry "distillationApparatus", vampire "bloodChalice"
  distillationRecord: {
    label: "Distillation Record",
    requirements: ["alembic", "distillationApparatus", "bloodChalice"],
    price: 2200,
    brewSpeed: 1.005,
    brewQuality: 1.06,
  },
  // 5. Ingredient Catalog
  // Upstream: core "herbRack", chemistry "reagentRack"
  ingredientCatalog: {
    label: "Ingredient Catalog",
    requirements: ["herbRack", "reagentRack"],
    price: 2400,
    brewSpeed: 1.0,
    brewQuality: 1.07,
  },
  // 6. Measurement Gauge
  // Upstream: core "thermometer", chemistry "phMeter"
  measurementGauge: {
    label: "Measurement Gauge",
    requirements: ["thermometer", "phMeter"],
    price: 2600,
    brewSpeed: 0.99,
    brewQuality: 1.08,
  },
  // 7. Extraction Apparatus
  // Upstream: core "cauldron", chemistry "distillationApparatus", hell "demonInfuser"
  extractionApparatus: {
    label: "Extraction Apparatus",
    requirements: ["cauldron", "distillationApparatus", "demonInfuser"],
    price: 2800,
    brewSpeed: 1.0,
    brewQuality: 1.09,
  },
  // 8. Mixing Chamber
  // Upstream: core "stirrer", core "mortar", core "infuserVials"
  mixingChamber: {
    label: "Mixing Chamber",
    requirements: ["stirrer", "mortar", "infuserVials"],
    price: 3000,
    brewSpeed: 0.985,
    brewQuality: 1.1,
  },
  // 9. Refinement Module
  // Upstream: core "catalystBurner", core "alembic", core "runicScales"
  refinementModule: {
    label: "Refinement Module",
    requirements: ["catalystBurner", "alembic", "runicScales"],
    price: 3200,
    brewSpeed: 1.0,
    brewQuality: 1.11,
  },
  // 10. Process Monitor
  // Upstream: core "timeTuner", core "thermometer", core "infuserVials"
  processMonitor: {
    label: "Process Monitor",
    requirements: ["timeTuner", "thermometer", "infuserVials"],
    price: 3400,
    brewSpeed: 0.99,
    brewQuality: 1.12,
  },
  // 11. Compound Analyzer
  // Upstream: chemistry "chromatographyStation", chemistry "massSpectrometer"
  compoundAnalyzer: {
    label: "Compound Analyzer",
    requirements: ["chromatographyStation", "massSpectrometer"],
    price: 3600,
    brewSpeed: 1.005,
    brewQuality: 1.13,
  },
  // 12. Batch Record
  // Upstream: core "cauldron", core "infuserVials", core "mortar"
  batchRecord: {
    label: "Batch Record",
    requirements: ["cauldron", "infuserVials", "mortar"],
    price: 3800,
    brewSpeed: 1.0,
    brewQuality: 1.14,
  },
  // 13. Recipe Codex
  // Upstream: wicca "tarotDeck", core "cauldron", vampire "bloodChalice"
  recipeCodex: {
    label: "Recipe Codex",
    requirements: ["tarotDeck", "cauldron", "bloodChalice"],
    price: 4000,
    brewSpeed: 0.98,
    brewQuality: 1.15,
  },
  // 14. Purification Chamber
  // Upstream: core "distillationApparatus", hell "demonInfuser"
  purificationChamber: {
    label: "Purification Chamber",
    requirements: ["distillationApparatus", "demonInfuser"],
    price: 4200,
    brewSpeed: 1.0,
    brewQuality: 1.16,
  },
  // 15. Quality Controller
  // Upstream: chemistry "phMeter", core "thermometer"
  qualityController: {
    label: "Quality Controller",
    requirements: ["phMeter", "thermometer"],
    price: 4400,
    brewSpeed: 0.98,
    brewQuality: 1.17,
  },
  // 16. Process Regulator
  // Upstream: chemistry "chemicalSynthesizer", core "runicScales", core "timeTuner"
  processRegulator: {
    label: "Process Regulator",
    requirements: ["chemicalSynthesizer", "runicScales", "timeTuner"],
    price: 4600,
    brewSpeed: 0.985,
    brewQuality: 1.18,
  },
  // 17. Final Binder
  // Upstream: core "arcaneBinder", vampire "vampiricBinder"
  finalBinder: {
    label: "Final Binder",
    requirements: ["arcaneBinder", "vampiricBinder"],
    price: 4800,
    brewSpeed: 1.0,
    brewQuality: 1.19,
  },
  // 18. Advanced Register
  // Upstream: core "runicScales", core "timeTuner", core "alembic"
  advancedRegister: {
    label: "Advanced Register",
    requirements: ["runicScales", "timeTuner", "alembic"],
    price: 5000,
    brewSpeed: 0.99,
    brewQuality: 1.2,
  },
  // 19. Combined Apparatus
  // Upstream: core "catalystBurner", core "mortar", core "cauldron"
  combinedApparatus: {
    label: "Combined Apparatus",
    requirements: ["catalystBurner", "mortar", "cauldron"],
    price: 5200,
    brewSpeed: 1.005,
    brewQuality: 1.21,
  },
  // 20. Unified System
  // Upstream: core "cauldron", chemistry "chemicalSynthesizer", vampire "bloodChalice", hell "abyssalCauldron", heaven "divineCauldron"
  unifiedSystem: {
    label: "Unified System",
    requirements: [
      "cauldron",
      "chemicalSynthesizer",
      "bloodChalice",
      "abyssalCauldron",
      "divineCauldron",
    ],
    price: 5400,
    brewSpeed: 0.995,
    brewQuality: 1.22,
  },
};

export type IntegrationEquipmentMapKey = keyof typeof integrationEquipmentMap;

export type EquipmentKey =
  | CoreEquipmentKey
  | TimeTravelEquipmentKey
  | BiologyEquipmentKey
  | SpaceEquipmentKey
  | WiccaEquipmentKey
  | chemistryEquipmentMapKey
  | VampireEquipmentMapKey
  | HellEquipmentMapKey
  | HeavenEquipmentMapKey
  | IntegrationEquipmentMapKey;

export const equipmentMap: Record<EquipmentKey, Equipment> = {
  ...coreEquipmentMap,
  ...timeTravelEquipmentMap,
  ...biologyEquipmentMap,
  ...spaceEquipmentMap,
  ...wiccaEquipmentMap,
  ...chemistryEquipmentMap,
  ...vampireEquipmentMap,
  ...hellEquipmentMap,
  ...heavenEquipmentMap,
  ...integrationEquipmentMap,
};

export const coreEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  cauldron:
    "Forge your magical masterpieces in this time-honored vessel. Its age-old design infuses every brew with arcane energy, promising a robust start to your alchemical journey.",
  mortar:
    "Grind rare ingredients with ease using this finely crafted duo. A staple in any potion maker's workshop, its enchanted surface ensures maximum extraction of mystical essences.",
  herbRack:
    "Organize and preserve your precious botanicals with this exquisitely designed rack. Engineered to optimize air flow, it perfectly conditions herbs for potent infusions.",
  infuserVials:
    "Store and infuse magical concoctions in style with these delicate vials. Their crystalline clarity reveals the inner glow of every potion, inspiring confidence in every drop.",
  alembic:
    "Distill your brews to perfection in this mesmerizing crystal alembic. Its precise design refines raw ingredients into pure magical essences, elevating your potions to legendary status.",
  stirrer:
    "Mix your potions with flawless precision using this enchanted stirrer. Crafted to harmonize volatile ingredients, it ensures each brew achieves the perfect balance of power and grace.",
  thermometer:
    "Monitor your potion's heat with this finely tuned enchanted thermometer. Its magical sensors deliver accurate readings, allowing you to maintain the ideal simmer for every concoction.",
  catalystBurner:
    "Ignite your ingredients with controlled intensity using this advanced catalyst burner. Perfectly calibrated to release hidden energies, it transforms ordinary brews into spectacular elixirs.",
  infusionChamber:
    "Pre-infuse your ingredients with concentrated magical energy in this state-of-the-art infusion chamber. It’s a must-have for those seeking to unlock deeper layers of arcane potency.",
  elementalConductor:
    "Channel the raw power of the elements directly into your cauldron with this sophisticated conductor. Its design harmonizes fire, water, air, and earth to boost your potion's effectiveness.",
  runicScales:
    "Achieve flawless measurements every time with these enchanted runic scales. Meticulously etched with ancient symbols, they guarantee the precision every recipe demands.",
  spiritFilter:
    "Purify your potions by filtering out unwanted spectral residues with this innovative spirit filter. Its ethereal design ensures a crisp, clear brew every time.",
  lunarPhial:
    "Capture the mystique of moonlight in every potion with this delicately crafted lunar phial. Designed to hold and enhance lunar essences, it adds a touch of celestial magic to your creations.",
  solarInfuser:
    "Harness the vibrant energy of the sun with this radiant solar infuser. Its warm glow infuses your brews with vitality, unlocking a burst of radiant power in every drop.",
  spectralReceptacle:
    "Store the intangible with this beautifully eerie spectral receptacle. Ideal for harnessing ghostly essences, it elevates your potion crafting with a mysterious allure.",
  arcaneBinder:
    "Merge disparate magical energies seamlessly using this arcane binder. Its intricate design fuses ingredients and incantations alike, ensuring your brews resonate with potent magic.",
  phantomPipette:
    "Dispense rare ingredients with surgical precision using this ghostly pipette. Its ethereal design makes it indispensable for achieving that perfect, finely-tuned brew.",
  mysticalMortar:
    "Enhance your traditional mortar with mystical upgrades that boost efficiency and potency. This refined tool transforms basic grinding into an art of extracting hidden essences.",
  enchantedCrucible:
    "Melt and mix ingredients at sublime temperatures with this enchanted crucible. Its resilient construction ensures even the most volatile brews maintain their magical integrity.",
  venomExtractor:
    "Safely extract and harness the toxic power of rare venoms with this specialized extractor. It refines dangerous ingredients into pure, potent catalysts for your most daring recipes.",
  essenceEvaporator:
    "Condense and concentrate the heart of every brew using this efficient essence evaporator. It accelerates evaporation while preserving the magical properties of your ingredients.",
  mysticGrinder:
    "Unleash the full potential of your ingredients with this high-powered mystic grinder. Engineered for speed and precision, it grinds even the toughest components into magical dust.",
  ghostlyGloves:
    "Handle enchanted ingredients without fear using these spectral gloves. Designed to protect and empower your touch, they ensure your brews are mixed with the utmost finesse.",
  shadowSteamer:
    "Infuse your concoctions with dark, mysterious steam using this shadow steamer. Its smoky aura transforms mundane ingredients into potions with an edge of forbidden allure.",
  spectralSeparator:
    "Effortlessly segregate the pure from the impure with this state-of-the-art spectral separator. It isolates magical components with uncanny precision, ensuring every brew is flawless.",
  enchantedSpatula:
    "Mix and maneuver your potion's ingredients with this enchanted spatula. Its perfectly balanced design gives you superior control, turning even the most delicate brews into masterpieces.",
  astralAnvil:
    "Forge the backbone of your arcane creations on this robust astral anvil. Perfect for melding raw power into structured forms, it’s an essential piece for any master craftsman.",
  cosmicCenser:
    "Summon the mysteries of the cosmos with this exquisite cosmic censer. It radiates otherworldly fragrances that enhance your potions with the energy of distant stars.",
  demonDowsingRod:
    "Locate and extract infernal essences with this uncanny demon dowsing rod. Its eerie magnetism draws out the darkest energies, perfect for your most daring, diabolical brews.",
  spiritStirrer:
    "Invoke the power of spectral entities with this refined spirit stirrer. It infuses your cauldron with ghostly vigor, ensuring that every blend resonates with supernatural energy.",
  timeTuner:
    "Manipulate brewing time itself with this time-twisting timer. Designed to subtly accelerate your potion process, it grants you the gift of extra moments in your alchemical pursuits.",
  chaosCalibrator:
    "Tame the unpredictable with this innovative chaos calibrator. Its precise adjustments harmonize erratic energies, transforming chaotic brews into consistent, controlled masterpieces.",
  infernalInjector:
    "Inject a dose of pure, demonic power into your concoctions using this infernal injector. It channels volatile energies with surgical precision, elevating your brews to forbidden heights.",
  spectralSiphon:
    "Draw out elusive essences with this spectral siphon, designed to extract every last drop of magical residue. Its refined design guarantees maximum yield for your potion recipes.",
  lunarLoom:
    "Weave the threads of moonlit magic into your potions with this elegant lunar loom. It seamlessly interlaces celestial energies, lending your brews an ethereal, captivating quality.",
  etherExtractor:
    "Unlock hidden energies with this state-of-the-art ether extractor. It pulls forth the subtle forces within your ingredients, ensuring every potion bursts with ethereal potency.",
  phantomFlask:
    "Store your most delicate mixtures in this beautifully crafted phantom flask. Its translucent form protects your brews, while its spectral design inspires awe and reverence.",
  arcaneAmplifier:
    "Amplify the latent energies of your ingredients with this potent arcane amplifier. Perfect for boosting your potion’s effects, it transforms ordinary brews into extraordinary elixirs.",
  etherealEvaporator:
    "Gently condense mystical vapors with this ethereal evaporator. It refines your ingredients by harnessing the delicate balance of nature and magic for a perfectly potent brew.",
  witchwoodWand:
    "Command the forces of nature with this exquisitely carved witchwood wand. Its ancient timber resonates with old magic, offering you unrivaled control over your potion’s fate.",
  runeboundReactor:
    "Unleash a torrent of energy with this runebound reactor. Inscribed with potent runes, it harnesses raw magical power to supercharge your brewing process like never before.",
  cursedConductor:
    "Harness the dark side of magic with this cursed conductor. Its ominous design taps into forbidden energies, providing a mysterious boost to your most daring potion recipes.",
  demonicDistiller:
    "Distill the essence of darkness with this formidable demonic distiller. Designed to extract even the most volatile ingredients, it refines your brews into dangerously potent elixirs.",
  eldritchExtractor:
    "Extract the very soul of magic with this eldritch extractor. Its arcane mechanisms delve deep into your ingredients, ensuring that every potion radiates otherworldly power.",
  voidVortex:
    "Create a swirling maelstrom of energy with this void vortex generator. Its design manipulates the fabric of reality, imbuing your brews with an intensity that defies the cosmos.",
  netherNebulizer:
    "Diffuse dark, mysterious energies with this nether nebulizer. It evenly distributes shadowy components into your potion, ensuring a consistently eerie result every time.",
  occultOscillator:
    "Stabilize and enhance mystical fluctuations with this occult oscillator. Its precise vibrations harmonize disparate energies, giving your brews an extra kick of arcane power.",
  forbiddenFunnel:
    "Channel illicit energies with this forbidden funnel. Its contraband design permits the safe flow of dangerous magical components, perfect for creating brews that defy convention.",
  phantomPhilter:
    "Bottle the essence of phantasms with this exquisitely eerie philter. Ideal for storing volatile spectral mixtures, it ensures every potion captures a whisper of the other side.",
  cosmicCatalyst:
    "Unlock the ultimate alchemical breakthrough with this legendary cosmic catalyst. Forged in the heart of a dying star, it transforms your brews into the pinnacle of magical power.",
};

export const timeTravelEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  tt01: "Temporal Ticker: This humble timepiece, plain in guise yet secretly attuned to the flow of hours, offers a modest glimpse into the mysteries beyond mortal ken.",
  tt02: "Chronometer Dial: An elegant disc that doth capture fleeting moments with a precision most bewildering, merging the venerable past with whispers of the morrow.",
  tt03: "Timeworn Stirrer: Weathered by countless ages yet steadfast, this stirring tool infuses each potion with a subtle resonance of times long past.",
  tt04: "Epoch Infuser Vial: A vessel aged by the relentless sands of time, it holds within faint murmurs of bygone eras to bestow a curious potency upon thy brews.",
  tt05: "Vintage Mortar: A relic of simpler days, this mortar grinds thy ingredients with a nostalgic grace, uniting the charm of yore with budding alchemical promise.",
  tt06: "Old-World Herb Rack: Crafted in an age nearly forgotten, this rack doth preserve botanicals with an artful care, its design as enigmatic as the herbs it doth shelter.",
  tt07: "Antique Alembic: An alembic of storied past, whose distilling art doth bridge tradition and that which lurketh in realms beyond common understanding.",
  tt08: "Aged Cauldron Enhancer: Forged in times immemorial, this enhancer doth amplify the mystical virtues of thy cauldron, raising each brew to heights uncharted.",
  tt09: "Temporal Thermometer: A contrivance both arcane and perplexing, designed to measure the delicate balance of time and heat in every alchemical endeavor.",
  tt10: "Past Catalyst Burner: Imbued with the fervour of bygone eras, this burner doth set thy ingredients aflame with a passion reminiscent of ancient legends.",
  tt11: "Chrono Infusion Chamber: Enter a chamber where the very fabric of time doth bend; here, ingredients mingle with the wisdom of ages, though the art remaineth most inscrutable.",
  tt12: "Time-Slowing Scales: Scales of rare design, capable of suspending the haste of time itself, ensuring every measure is rendered with a precision most divine.",
  tt13: "Temporal Spirit Filter: A filter most enigmatic, which extracteth the fleeting spirits from within, channeling the very essence of time into each draught.",
  tt14: "Era-bound Lunar Phial: A phial that doth capture the soft glow of moonlight from ages past, lending a gentle luminescence to all it doth contain.",
  tt15: "Sundial Infuser: Emulating the ancient art of sundials, this infuser harnesses the steady march of the sun, merging celestial order with alchemical secrets.",
  tt16: "Futuristic Flux Capacitor: A device most perplexing in design, claiming to channel energies from realms unknown; it doth supercharge thy brews with an allure both modern and mysterious.",
  tt17: "Quantum Cauldron Core: At the very heart of advanced potion-making, this core doth promise to recalibrate thy cauldron with a fusion of science and sorcery, its workings a marvel unto itself.",
  tt18: "Nano Mortar: A mortar of diminutive size yet prodigious effect, grinding ingredients with a precision that doth confound the common understanding of alchemy.",
  tt19: "Digital Stirrer: A stirrer of curious design, melding mechanical artifice with ancient craft; its digital hum doth mix thy potions with an accuracy both uncanny and impressive.",
  tt20: "Chrono Accelerator: An accelerator that doth hasten the flow of time within the brewing process, lending a brisk pace to reactions that might otherwise linger.",
  tt21: "Hyper-Infusion Chamber: Enter a realm where time and space are as pliable as clay; here, ingredients are imbued with a brilliance that doth transcend mortal expectation.",
  tt22: "Temporal Distortion Gauge: A gauge most mysterious, crafted to measure the subtle warpings of time, ensuring each brew doth evolve in harmonious accord with the cosmos.",
  tt23: "Cybernetic Herb Rack: A curious fusion of antiquity and visionary contrivance, this herb rack incorporates strange circuitry to automate the care of botanicals.",
  tt24: "Time-Warping Thermometer: Defying natural order, this thermometer recordeth temperature fluctuations that span the endless corridors of time, ensuring thy potion’s perfection.",
  tt25: "Antimatter Catalyst Burner: An instrument of explosive repute, this burner doth invoke the raw energies of antimatter, igniting thy ingredients in a spectacle most astonishing.",
  tt26: "Dimensional Infuser Vials: Vials of baffling design, claimed to capture the essence of manifold dimensions, marrying the science of the ether with ancient alchemical art.",
  tt27: "Parallel Universe Binder: A binder of perplexing construction, said to unite disparate energies from parallel realms, merging them into one potent elixir beyond common ken.",
  tt28: "Interspace Scales: Scales that measure not merely weight but the very substance of matter across the void, their readings as inscrutable as the celestial spheres.",
  tt29: "Cosmic Temporal Conductor: A conductor that doth channel the vast energies of time and space, bridging the known with the ineffable, its purpose as grand as it is mysterious.",
  tt30: "Omniversal Time Capsule: The zenith of temporal contrivance, this capsule doth encapsulate the history of the cosmos, imbuing thy potions with a power that defies the limits of mortal understanding.",
};

export const biologyEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  bio01:
    "Sterile Workbench: A most immaculate table, scrubbed of all unseemly humours, on which delicate experiments are carried out. 'Tis the foundation of a pure and uncontaminated art.",
  bio02:
    "Basic Microscope: An ingenious contrivance to magnify the smallest forms of nature. Though its workings be mysterious, it reveals wonders hidden from the naked eye.",
  bio03:
    "Simple Centrifuge: A mechanical wonder that spins ingredients in rapid circles, separating their natural humours with an efficiency that doth border on the miraculous.",
  bio04:
    "Petri Dish Array: A collection of shallow vessels for the cultivation of minuscule organisms. Its flat, polished surfaces provide a stage for the quiet drama of growth.",
  bio05:
    "Incubation Chamber: A warm, enclosed space wherein delicate specimens are nurtured. It maintains a steady heat, believed to hasten the subtle art of natural transformation.",
  bio06:
    "Herbal Extractor: A contraption devised to draw forth the potent essences from herbs. Its method, though not fully understood, has proven effective in yielding vigorous extracts.",
  bio07:
    "Basic Bio-Reactor: A modest apparatus that appears to harness the very forces of life, encouraging natural processes to unfold within its mysterious confines.",
  bio08:
    "Cell Culture Incubator: An enclosure most curious, fashioned to provide a nurturing environment for tiny living cells. It is said to foster growth in a manner befitting nature's own design.",
  bio09:
    "Molecular Thermometer: A finely wrought instrument intended to measure the most delicate fluctuations in warmth within substances. Its precision, though confounding, is trusted by the wise.",
  bio10:
    "Enzyme Catalyst: A substance of peculiar nature that accelerates the hidden reactions of life. Its properties remain the subject of much debate among the learned.",
  bio11:
    "DNA Extraction Chamber: A specialized vault wherein the very blueprint of living creatures is isolated. Its purpose is profound, and its workings are understood by few.",
  bio12:
    "Precision Scales: Instruments of remarkable exactitude, designed to weigh the smallest quantities with a care that defies common measure.",
  bio13:
    "Cellular Filter: A device contrived to separate living cells from their surrounding humours, capturing the essence of life in a process as delicate as it is mysterious.",
  bio14:
    "Luminance Phial: A glass vessel reputed to capture a faint, otherworldly glow from living matter. It lends an enigmatic radiance to any concoction it doth embrace.",
  bio15:
    "Biological Infuser: An apparatus that melds living elements with brewed mixtures. Though its precise method escapes plain understanding, its effects are both potent and curious.",
  bio16:
    "CRISPR Cauldron Enhancer: A modern marvel of contrivance, its name confounds the unlearned. It purports to refine the powers of one’s cauldron, altering natural orders in ways scarcely grasped.",
  bio17:
    "Quantum Microscope: An instrument of singular design, said to reveal the very fabric of matter. Its operation is a riddle wrapped in enigma, reserved for the most advanced practitioners.",
  bio18:
    "Nano Centrifuge: A diminutive yet powerful device that whirls at speeds most extraordinary, dividing the subtlest components from the whole with astonishing finesse.",
  bio19:
    "Bio-Digital Stirrer: A curious blend of natural technique and modern artifice, this stirrer mixes potions with a precision that doth seem almost supernatural to the common eye.",
  bio20:
    "Genomic Accelerator: An apparatus designed to quicken the replication of nature’s fundamental elements. Its effect is potent, and while its true mechanism remains obscure, its benefits are undeniable.",
  bio21:
    "Hyper-Bio-Reactor: An advanced and perplexing reactor, engineered to intensify natural fermentation and decay to near miraculous levels. Its complexity is the envy of all who dare its use.",
  bio22:
    "Molecular Distortion Gauge: A device for measuring the subtle, unseen shifts within the very substance of matter. Its readings are as enigmatic as the forces they describe.",
  bio23:
    "Cybernetic Extractor: A contrivance that, through a baffling union of mechanics and natural science, extracts the essential humours of organic matter with a precision most unnerving.",
  bio24:
    "Genetic Mass Analyzer: An instrument of great sophistication, purported to weigh and appraise the fundamental blueprints of life. Its intricate design leaves much to the wonder of scholars.",
  bio25:
    "Antimicrobial Catalyst: A curious compound that accelerates chemical reactions while warding off invisible infections. Its dual nature is both revered and met with suspicion in equal measure.",
  bio26:
    "Protein Synthesizer: An ingenious device that assembles the building blocks of life into coherent forms. Its method is marvelously perplexing to those unversed in the finer arts of nature.",
  bio27:
    "Parallel Genome Binder: A most confounding apparatus that unites strands of life from diverse sources, merging them in ways that defy the common understanding of natural order.",
  bio28:
    "Interspace Chromatograph: An instrument that separates components with a finesse that appears to transcend the known laws of nature, leaving even the most learned baffled.",
  bio29:
    "Cosmic Cellular Conductor: A contrivance which channels the very forces of life, orchestrating the intricate dance of cells with a grace that verges on the divine.",
  bio30:
    "Omniversal Biocapsule: The crowning achievement of modern alchemy, this capsule encapsulates the very essence of life itself, offering a potency and mystery unmatched in all our times.",
};

export const spaceEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  sp01: "Apothecary Cabinet: A stout and well-carved cabinet designed for the careful storage of rare ingredients and delicate apparatus. Its sturdy construction speaks to the order demanded by the alchemist.",
  sp02: "Herbal Shelf: A modest shelf fashioned for the display and drying of assorted herbs. Its simple design belies its effectiveness in preserving the vital properties of botanical remedies.",
  sp03: "Brew Ingredient Crate: A finely built crate, divided into compartments for the safekeeping of essential reagents. It ensures that each ingredient remains in its rightful place, ready for use.",
  sp04: "Phial Rack: An orderly rack intended to hold a collection of delicate phials. It permits both easy access and an attractive display of the potions yet to be completed.",
  sp05: "Recipe Ledger: A leather-bound volume in which the secrets of potion-making are recorded. Its pages, though aged, offer a repository of wisdom for the diligent practitioner.",
  sp06: "Inventory Scroll: A lengthy scroll upon which every ingredient and tool is meticulously noted. This document is indispensable for maintaining the proper balance in one’s workshop.",
  sp07: "Organizational Counter: A robust worktable set aside for the arrangement of ingredients and tools. Here, every item is measured and ordered with an exactness that borders on the sacred.",
  sp08: "Bulk Storage Barrel: A capacious barrel crafted to hold large quantities of common materials. Its utilitarian design allows for the rapid replenishment of stock.",
  sp09: "Coffer of Curiosities: A small chest reserved for those rare and peculiar ingredients that defy conventional classification. It is a treasure trove for the inquisitive alchemist.",
  sp10: "Reagent Archive: An archival system where the finest and most precious reagents are catalogued. This repository ensures that only the best materials are summoned for brewing.",
  sp11: "Herbarium Cabinet: A refined cabinet for the storage and display of dried botanicals. Its carefully arranged shelves preserve the natural virtues of each herb.",
  sp12: "Potion Display Shelf: A graceful shelf upon which completed potions are exhibited. It allows the brewer to showcase his latest concoctions with a sense of pride and order.",
  sp13: "Supply Docket: A ledger that details the arrival and use of every ingredient and tool. This docket is essential to the disciplined management of the brewing inventory.",
  sp14: "Brewery Inventory Chute: A practical conduit that facilitates the swift transfer of materials between storage and the workbench. It streamlines the process of potion creation.",
  sp15: "Alchemical Workroom Layout: A masterfully drawn plan that maps the entire brewing space. It is a blueprint for efficiency, ensuring that every station functions in harmonious concert.",
  sp16: "Modular Lab Partition: A versatile divider that may be reconfigured to suit the changing needs of the workshop. It provides both privacy and order to the bustling lab.",
  sp17: "Adjustable Workstation Array: An interconnected series of workstations that can be rearranged at the brewer’s whim. This system grants the flexibility to adapt to any new experiment.",
  sp18: "Dimensional Shelf Extender: An ingenious contrivance that appears to expand available storage beyond ordinary means. Its subtle design belies a capacity that seems almost miraculous.",
  sp19: "Ethereal Inventory Module: A compartment that defies conventional limits of space, offering additional storage as though by enchantment. It is a boon to the ever-growing stock of the alchemist.",
  sp20: "Mystic Spatial Analyzer: An instrument employed to survey and optimize the arrangement of the brewing chamber. Its readings guide the reordering of tools with a precision that inspires awe.",
  sp21: "Infinite Storage Blueprint: A visionary schematic for an unbounded repository of ingredients and apparatus, promising to elevate the organization of the workshop to realms heretofore undreamt of.",
  sp22: "Arcane Compartment Reorganizer: A device reputed to rearrange existing storage spaces at the mere suggestion of its master, ensuring that each item is perfectly aligned.",
  sp23: "Transcendent Workroom Console: A central station from which the alchemist may oversee every facet of his workshop. It blends the practical with the mystical in a single, commanding presence.",
  sp24: "Philosopher's Space Divider: A partition of such subtle design that it seems to divide not only the physical space but also the very essence of order itself.",
  sp25: "Labyrinthine Supply Matrix: A complex network of compartments designed to manage even the most bewildering assortment of ingredients. Its intricacy is matched only by its effectiveness.",
  sp26: "Mystic Arrangement Engine: A marvel of craftsmanship that organizes tools and materials with an accuracy bordering on the miraculous, its inner workings a well-guarded secret.",
  sp27: "Spatial Efficiency Catalyst: An apparatus that hastens the process of organization, ensuring that every item finds its proper place with the speed of a well-tuned clock.",
  sp28: "Omnipresent Inventory System: A comprehensive system that integrates every aspect of the alchemist's stock, making misplacement of even the smallest vial an impossibility.",
  sp29: "Alchemical Architecture Modulator: A device that subtly reshapes the very layout of the workroom, harmonizing structure and function in a display of ingenious design.",
  sp30: "Infinite Workroom Manifest: The ultimate plan for an endlessly efficient laboratory, this manifest promises to elevate the art of potion-making to heights previously unimagined.",
};

export const wiccaEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  sacredAthame:
    "Wield this consecrated blade, forged in mystic fires, to sever the veil betwixt realms and inaugurate thy witching path.",
  covenCircle:
    "Form a sacred circle to invoke ancestral spirits, binding thyself with the ethereal kin of the coven.",
  witchesBroom:
    "Sweep aside the mundane with this enchanted broom, emblematic of swift passage through realms unseen.",
  tarotDeck:
    "Lay thine fate with this divinatory deck, each card a whispered omen from the fates of old.",
  crystalOrb:
    "Gaze deep into this radiant orb to discern secrets hidden within the mists of time and destiny.",
  paganPendant:
    "Adorn thy bosom with this relic, imbued with the ancient rites of pagan mysticism.",
  spiritDrum:
    "Beat this drum of spirits, whose resonant echoes stir the very soul of nature’s arcane forces.",
  herbalTalisman:
    "Bear this talisman of rare herbs, a charm to harness nature’s bounty and potent healing magicks.",
  mysticMirror:
    "Peer into this enchanted mirror to behold thine inner truth and the mysteries that lie beyond.",
  ritualCenser:
    "Burn incense within this sacred censer, its fragrant vapors uniting the mortal coil with the divine.",
  sigilStone:
    "Carve thine intentions upon this stone, marked with sigils to channel the essence of potent magic.",
  sabbatScepter:
    "Command the turning of the sabbat with this scepter, a beacon of authority in all mystical rites.",
  lunarLedger:
    "Record the phases of the moon in this ledger, chronicling celestial wisdom and arcane lore.",
  feyFamiliar:
    "Summon a capricious companion from the fey realms, a living conduit to the wild spirits of old.",
  sageScroll:
    "Unfurl this ancient scroll, its timeworn script a tapestry of wisdom handed down through the ages.",
  divinationDeck:
    "Consult this deck of divination, wherein each card foretells omens of both prosperity and peril.",
  ritualRing:
    "Seal thine arcane pacts with this ritual ring, a perfect circle binding thee to eldritch powers.",
  wiccanWand:
    "Channel thy energies through this finely wrought wand, essential to any adept of witchcraft.",
  arcaneAmulet:
    "Let this amulet, steeped in eldritch lore, serve as thy talisman of unyielding mystic fortitude.",
  occultOracle:
    "Gaze upon this oracle to unveil the secrets of the unseen, an instrument of prophetic truth.",
};

export const chemistryEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  alchemicalRetort:
    "An ancient retort wherein the alchemist doth commence his experiments, melding mystic vapors with elemental spirit.",
  mercurialVessel:
    "A vessel of mercurial guise, capturing the fleeting essence of volatile compounds in a most arcane manner.",
  vitriolExtractor:
    "This apparatus doth draw forth the acrid vitriol of nature, transmuting base matter into potent quintessence.",
  philosophersFlask:
    "A flask befitting a seeker of wisdom, wherein the elixir of enlightenment is distilled with divine care.",
  aetherCondenser:
    "A condenser that gathers the celestial aether, compressing ephemeral energies into a tangible form.",
  sublimationTower:
    "A lofty tower wherein impurities ascend as vapour, leaving behind the purest substance for alchemical art.",
  elixirRefiner:
    "Refine thy elixirs with this contrivance, purging dross from thy mixtures with unerring precision.",
  arcaneDistiller:
    "Distill the very essence of nature through this arcane device, capturing the spirit of the elements in crystalline form.",
  occultMixer:
    "A mixer of mysterious design, blending disparate essences to unlock secrets hidden from mortal ken.",
  hermeticStill:
    "Within this sealed still, the hermetic arts are practiced, preserving the sanctity of alchemical transformation.",
  celestialExtractor:
    "An extractor that summons the bounty of the heavens, drawing forth celestial essences for potent brews.",
  sacredAmalgamator:
    "An instrument of sacred union, melding diverse ingredients into a harmonious blend of alchemical wonder.",
  divineDecanter:
    "Decant the fruits of thy labor into this vessel, where the divine is separated from the mundane.",
  luminousSeparator:
    "A separator that discerns the radiant from the obscure, bestowing clarity upon thy mixtures.",
  etherealCombustor:
    "Ignite thy concoctions within this combustor, where ethereal flames refine the raw energies of creation.",
  mysticAnalyzer:
    "A tool of discerning art, unveiling the hidden properties of compounds with mystical acuity.",
  astralReactor:
    "A reactor channeling astral energies, fusing matter and spirit in a crucible of creation.",
  transmutationChamber:
    "Enter the chamber of transmutation, where base elements ascend to nobility by arcane decree.",
  phlogistonCollector:
    "Gather the elusive phlogiston with this collector, seizing the vital spark that enlivens all matter.",
  arcaneCatalyst:
    "A catalyst imbued with ancient power, hastening alchemical reactions to birth wonders untold.",
};

export const vampireEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  bloodChalice:
    "A chalice forged of dark iron, designed to collect the essence of life and empower forbidden elixirs.",
  nocturneMortar:
    "A mortar shrouded in the midnight gloom, ideal for pulverizing rare, blood-infused ingredients.",
  crimsonInfuser:
    "This infuser channels the scarlet hue of vitality, imbuing your brews with a vampiric allure.",
  duskCauldron:
    "A cauldron steeped in the melancholy of dusk, where potions are brewed beneath eternal night.",
  shadowStirrer:
    "A stirrer cloaked in shadow, its silent rotations as stealthy as a vampire’s nocturnal prowl.",
  midnightThermometer:
    "An instrument of eerie precision, measuring the cold pulse of the night to perfect your concoctions.",
  bloodCatalyst:
    "A catalyst that harnesses the potent force of blood, accelerating alchemical reactions with sinister grace.",
  cryptChamber:
    "A secluded chamber reminiscent of ancient crypts, where ingredients are imbued with a spectral chill.",
  vampiricConductor:
    "A conductor of dark energies, orchestrating the forces of life and death into brews of unrivaled potency.",
  sanguineScales:
    "Scales forged from the blood of the fallen, balancing ingredients with a precision that defies mortal measure.",
  fangedFilter:
    "A filter edged with serrated fangs, designed to strain out impurities and leave only the unholy essence.",
  lunarLament:
    "An apparatus capturing the sorrow of the moonlit sky, imbuing potions with a haunting, melancholic quality.",
  nocturnalPhial:
    "A phial as dark as the endless night, perfect for storing the volatile energies of forbidden lore.",
  twilightInfuser:
    "An infuser that melds the energies of day’s end and night’s embrace, forging elixirs of dual nature.",
  vampiricBinder:
    "A binder that unites disparate essences into a harmonious whole, echoing the union of life and death.",
  coffinCrucible:
    "A crucible hewn from the remnants of a forgotten coffin, where ingredients meld in the stillness of eternal night.",
  deathlyDistiller:
    "A distiller that extracts the very essence of mortality, transmuting base components into dark power.",
  eternalExtractor:
    "An extractor that defies the ravages of time, drawing forth the ageless essence for potent brews.",
  vampiricVortex:
    "A vortex swirling with nether energies, creating a maelstrom of vampiric power within every potion.",
  sanguineSorcerer:
    "An arcane instrument of dark sorcery, empowering the alchemist to weave spells of blood and shadow.",
};

export const hellEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  abyssalCauldron:
    "A cauldron imbued with the echoes of the abyss—its burning depths promise immense power at the cost of purity.",
  infernalAthame:
    "A wicked blade forged in infernal fire; its edge cleaves through hope, leaving a trail of diminished quality.",
  hellishMortar:
    "A mortar that grinds the essence of lost souls, sacrificing clarity for a taste of dark speed.",
  demonInfuser:
    "This accursed infuser draws demonic energy into your brew—fast but tainted with a sullied spirit.",
  satanicStirrer:
    "A stirrer whose relentless motion mirrors the chaotic pulse of the damned, eroding perfection.",
  fiendishThermometer:
    "A flawed gauge that dips below par—a minor setback designed to test your mettle against infernal forces.",
  brimstoneBinder:
    "Forged in searing brimstone, this binder fuses broken essences—its promise of power is paid in purity.",
  devilishDistiller:
    "Distill the venom of hell with precision; its volatile nature ensures speed at the expense of refinement.",
  netherNexus:
    "A nexus channeling the void; its dark embrace accelerates your craft while corroding its quality.",
  purgatoryPhial:
    "A phial that ensnares the sorrow of purgatory—its allure is potent, but purity suffers as a toll.",
  soulSeparator:
    "Extract the lament of souls with this grim device—each extraction deepens the stain on your potion.",
  underworldUrn:
    "An urn that cradles the despair of the underworld; its dark contents leave little room for perfection.",
  hellfireHeater:
    "Fuel your ambition with hellfire—the searing heat accelerates progress but burns away the brew's finesse.",
  charredChalice:
    "A chalice scarred by eternal flames; its use imparts a bitter cost to the quality of every drop.",
  demonicDecanter:
    "Decant the essence of damnation with ruthless precision—speed is gained, yet purity is sacrificed.",
  scorchingScales:
    "Weigh your sins upon infernal scales—each measure tips the balance toward power while eroding clarity.",
  infernoIncubator:
    "A crucible where raw chaos is nurtured; its dark processes churn out might at the price of refinement.",
  blazingBinder:
    "Bind the raging flames of perdition—its complex dependency extracts both power and perfection.",
  cinderCatalyst:
    "Born of smoldering ash, this catalyst accelerates reactions but leaves behind a residue of decay.",
  sinisterSynthesizer:
    "Synthesize dark forces into raw power; its clinical efficiency comes at the cost of sublime quality.",
  tormentedTonic:
    "A bitter tonic steeped in suffering—the temporary dip is a grim reminder that dark bargains rarely refine.",
  sulfuricSiphon:
    "Siphon the corrosive fumes of sulfur with treacherous precision; the boon is speed, but purity withers.",
  malebolgeMixer:
    "Mix the foul components of hell; every churning motion speeds progress while eroding the potion’s luster.",
  lachrymoseLantern:
    "A lantern that weeps the tears of the damned—its sorrowful light guides you, but stains your brew with grief.",
  fieryFurnace:
    "Enter a furnace of searing inferno—its blistering heat forges power while singeing the essence of quality.",
  scaldingSeparator:
    "Separate the raw infernal essence from corruption; a near miss that speeds creation but leaves a bitter taste.",
  infernalInjector:
    "Inject unbridled infernal power into your brew—a risky surge that rapidly accelerates your craft at a dire cost.",
  screamingSiphon:
    "A siphon echoing with tortured screams; its desperate extraction fuels speed while marring the potion’s purity.",
  demonDuct:
    "A dark conduit channeling raw demonic force—the twisted dependencies accelerate your journey, yet degrade perfection.",
  chaosCondenser:
    "Condense the chaotic energies of the abyss into raw might—a fine line where speed gains come at a steep quality toll.",
  hellishHelix:
    "A spiraling helix of torment, twisting fate with every rotation—power is unleashed, but perfection slips away.",
  soulStirrer:
    "Stir the very essence of souls—its tumultuous blend drives rapid progress while corroding the delicate art of brewing.",
  phlegmPhilter:
    "A vile philter that cloaks its potency in decay; its use yields raw power, leaving quality gasping in its wake.",
  eternalEmber:
    "An ember burning with the fury of eternity—a beacon of rapid power that leaves a scorched mark on quality.",
  devilDrum:
    "Beat the drum of doom with relentless rhythm—its pulsing force quickens your pace while chipping away at perfection.",
  cursedCenser:
    "Exuding a miasma of curses, this censer’s fumes quicken reactions but suffocate the subtlety of your brew.",
  moltenMixer:
    "Mix molten chaos with unwavering resolve—each vortex of heat fuels your ambition while sapping refinement.",
  despairDecanter:
    "Decant the essence of despair into your potion—every measured drop brings speed at the cost of pure quality.",
  anguishAmalgamator:
    "Amalgamate raw agony into concentrated power—each moment of suffering transforms into speed, but leaves purity behind.",
  furnaceFunnel:
    "Channel the searing heat of hell through this funnel—a final test where speed surges and quality is deeply eroded.",
  infernoInfuser:
    "Infuse your brew with unbridled inferno—volatility morphs into raw power, though the price is a tarnished potion.",
  blightBinder:
    "Bind decay and renewal into a single force—its modest yield of speed is forever shadowed by diminished quality.",
  dreadDistiller:
    "Distill the dread of mortal terror into a potent elixir—each drop propels you forward, yet leaves quality in ruin.",
  sorrowSeparator:
    "Separate the bitter sorrow from fleeting hope—every extraction speeds your ascent while purity crumbles.",
  tortureThermometer:
    "Measure the excruciating heat of eternal torment—a grim tool whose precision accelerates progress while purity falters.",
  grimGrinder:
    "Grind the remnants of hope into dust—every pulverized morsel fuels rapid advancement at the expense of perfection.",
  diabolicDecanter:
    "Decant the distilled essence of pure diabolism—each ruthless measure boosts speed while quality degrades.",
  damnationDetector:
    "Detect the stirrings of damnation with unnerving precision—a warning that speed comes with a heavy quality cost.",
  abyssalAnalyzer:
    "Analyze the depths of the abyss—each secret unlocked grants power, though the brew's clarity fades further.",
  sinisterSieve:
    "Sift through the darkest energies—retain only raw, potent force even as the subtle art of quality is sacrificed.",
  hellscapeHeater:
    "Heat your concoction with the oppressive force of a hellscape—raw power surges, leaving perfection behind.",
  infernalImmolator:
    "Immolate every impurity in unholy fire—sacrifice is absolute, granting speed at the ultimate quality price.",
  scorchingSpecter:
    "A spectral vision of burning torment—its haunting presence boosts your pace while permanently staining quality.",
  netherNebulizer:
    "Nebulize the dark mists of the nether into your brew—each swirling cloud hastens progress, but blurs its refinement.",
  damnedDripper:
    "Drip the decay of the damned into your potion—each measured drop accelerates your path while quality withers.",
  cursedCatalyst:
    "A catalyst cursed with the weight of lost souls—its slow onset yields rapid gains, but the brew is forever marred.",
  satanicSeparator:
    "Separate the profane from the sublime—its discerning design speeds creation at a steep quality penalty.",
  fiendishFilter:
    "Filter out the weak and retain only the potent—its rigorous process quickens progress while purity decays.",
  diabolicDissolver:
    "Dissolve every barrier with diabolic efficiency—each melted obstacle propels you forward, yet the brew’s quality crumbles.",
  ultimateUnderworld:
    "The pinnacle of infernal engineering—embrace the full fury of the underworld, where raw power is gained at the ultimate cost of quality.",
};

export const heavenEquipmentDescriptionMap: Record<EquipmentKey, string> = {
  divineCauldron:
    "A pristine cauldron ordained by celestial decree—its sacred fires slow your progress, yet bestow unparalleled purity upon each brew.",
  seraphicAthame:
    "A gleaming blade of divine justice, wielded with meticulous care to impose order—even as it curbs your pace.",
  angelicMortar:
    "A mortar crafted in the image of seraphic perfection; its crushing force enforces a slow, measured rhythm in your sacred work.",
  sacredInfuser:
    "An infuser blessed by unseen choirs—its deliberate pace extracts celestial virtues at the cost of swiftness.",
  celestialStirrer:
    "A stirrer that whirls with the solemnity of divine liturgy, its methodical rotations an edict of enforced order.",
  heavenlyThermometer:
    "An instrument of immaculate measure, tempering ambition with a measured, deliberate chill.",
  aureateBinder:
    "A binder of golden resolve that unites disparate elements under the oppressive weight of heavenly decree.",
  etherealDistiller:
    "A distiller that refines the very essence of purity—its slow workings demand sacrifice, yet reward with divine clarity.",
  radiantNexus:
    "A nexus of celestial energy where sacred light converges, channeling order into every carefully measured drop.",
  blessedPhial:
    "A phial touched by divine hands, securing the immaculate essence of each brew despite its deliberate, measured pace.",
  divineMandate:
    "A decree from on high—a mandate that slows your hand but promises a celestial boon in quality.",
  seraphsCommand:
    "The commanding word of the seraphim—its intricate dependencies enforce discipline, ensuring that only the purest essence prevails.",
  archangelicEdict:
    "An edict from the archangels that binds you to a higher standard—sacrificing speed to achieve transcendent purity.",
  sacrosanctScripture:
    "Scripture etched in celestial light, guiding your craft with unyielding authority and rewarding painstaking diligence.",
  celestialCovenant:
    "A covenant of sacred trust—a binding contract that slows progress but guarantees exalted quality in every potion.",
  empiricalEmanation:
    "The effulgence of divine radiance captured in form; its slow emergence is the price for transcendent, unblemished virtue.",
  aureateAegis:
    "A shield of golden light that enforces the immutable laws of heaven—a bulwark against chaos that slows your every move.",
  divineRevelation:
    "A revelation that demands reverence—its intricate design ensures that only through deliberate action may one achieve supreme purity.",
  celestialEdifice:
    "A towering edifice of divine order that demands meticulous compliance—its weight slows progress but ensures immaculate results.",
  heavenlyHarbinger:
    "A foretaste of heaven’s decree—a harbinger that brings with it slow, measured steps and the promise of transcendent quality.",
  sacredSeraph:
    "A seraph of pure intent, whose presence slows your hand but elevates your brew to near-sacred perfection.",
  exaltedEchelon:
    "An echelon of the divine hierarchy that demands strict obedience—sacrificing speed so that the essence of purity may shine.",
  divineDominion:
    "A dominion ruled by heavenly law; its intricate dependencies enforce a deliberate pace, yet the rewards are ineffably pure.",
  seraphicSovereign:
    "The sovereign of the seraphim—a relentless enforcer of celestial order that curtails haste in exchange for sublime quality.",
  eternalEdict:
    "An eternal command that binds you to an unwavering standard—the price of sluggish progress is the gift of immaculate brew.",
  hallowedHierarchy:
    "A hierarchy of sacred order where every decree exacts a cost in time but elevates the essence to divine heights.",
  celestialConclave:
    "A conclave of heavenly voices that orchestrates every detail with oppressive precision, trading speed for unmatched quality.",
  angelicAusterity:
    "Austerity enforced by angelic command—a deliberate slowing of pace that ensures the highest caliber of purity.",
  sacrosanctSanction:
    "A sanction so sacred it leaves no room for haste—the rigorous mandates here yield brews of transcendent excellence.",
  seraphicSentinel:
    "A sentinel of the skies whose watchful presence slows your every move, ensuring that only the purest essence prevails.",
  divineDisciple:
    "A devoted follower of celestial law, whose intricate dependencies bind you to a slow, methodical pursuit of perfection.",
  archangelicAuthority:
    "The authority of the archangels—unyielding, oppressive, and meticulous; progress is measured, but the reward is divine.",
  celestialCensor:
    "An enforcer of heavenly standards that inspects every detail, sacrificing speed to guarantee immaculate purity.",
  sacredSentry:
    "A sentry standing guard over sacred order—a constant reminder that only through deliberate pace may one attain perfection.",
  hallowedHerald:
    "A herald of divine decrees whose clarion call enforces a methodical, oppressive order in every drop of your brew.",
  etherealEnforcer:
    "A relentless enforcer of celestial law, its heavy hand slows progress while ensuring that every element is sanctified.",
  righteousRegulator:
    "A regulator of divine standards whose precise interventions trade haste for an unparalleled, holy quality.",
  divineDominator:
    "A dominator of heavenly order, ruthlessly enforcing decrees that slow your pace but raise your brew to sacred heights.",
  heavenlyHierarchy:
    "The very structure of celestial authority—every dependency a decree that constrains speed while magnifying purity.",
  celestialCommand:
    "A command from the highest realms—its authoritarian grip reduces your speed to a crawl, but each drop is blessed beyond measure.",
  divineDictate:
    "An immutable dictate that binds you to the slow, oppressive rhythm of heaven—its heavy cost is rewarded with transcendent quality.",
  seraphicSupremacy:
    "The supreme edict of seraphim—a network of demands that crush haste and elevates your craft to celestial perfection.",
  angelicApex:
    "At the apex of divine order, every measure is taken with oppressive precision—speed is sacrificed, and purity reigns supreme.",
  sacrosanctSystem:
    "A system of sacred regulations that enforces a meticulous, authoritarian pace, yielding potions of unparalleled purity.",
  exaltedEminence:
    "An eminence born of relentless divine decree—a heavy-handed process that drains speed but bestows immaculate virtue.",
  seraphicSanction:
    "A sanction so severe and unyielding that progress nearly halts—yet every agonizing moment produces a brew of sublime quality.",
  divineDespotism:
    "A despotism of divine will—oppressive and intricate, it demands compliance at the cost of speed while delivering heavenly perfection.",
  celestialCoup:
    "A coup of celestial proportions, where every edict and dependency reduces haste but forges an elixir of immaculate sanctity.",
  heavenlyHegemony:
    "A hegemony of oppressive order—the myriad decrees here ensure that only the purest, most refined essence endures.",
  divineOverlord:
    "An overlord of divine authority whose every command forces you to slow, yet each measured moment yields immaculate perfection.",
  seraphicSupreme:
    "The supreme embodiment of celestial order—its intricate, authoritarian network ensures that your pace is crushed in favor of unyielding purity.",
  angelicAscendancy:
    "An ascendant force that dominates with chilling precision; every dependency a decree that slows progress, but the reward is transcendent quality.",
  celestialJudicator:
    "A judicator of divine law whose oppressive scrutiny extracts perfection from every process at a monumental cost in speed.",
  sacredSovereignty:
    "The sovereignty of a higher realm—each binding dependency enforces a crushingly slow cadence, yet delivers a brew of unparalleled sanctity.",
  divineInquisition:
    "An inquisition into the very soul of your craft—its authoritarian demands reduce your pace drastically while ensuring the highest quality.",
  seraphicSentience:
    "A sentience born of divine rigor—a network of decrees that crush haste and elevate your brew to near-mythical purity.",
  etherealEnlightenment:
    "An enlightenment that comes only through oppressive order—the slow, agonizing process here yields an essence of transcendent quality.",
  divineDestiny:
    "A destiny forged in the crucible of divine decree—every measured delay is the price for an elixir of sublime, unblemished perfection.",
  heavenlyHegemonyFinal:
    "The final, immutable edict of the celestial regime—its complex, authoritarian dependencies grind your pace to a crawl while crowning your brew with immaculate, awe-inspiring quality.",
};

export const integrationEquipmentDescriptionMap: Record<EquipmentKey, string> =
  {
    brewLog:
      "A ledger upon which the brewer records every detail of his work—from the initial heating in the cauldron to the final grinding in the mortar.",
    qualityRegister:
      "A register, neatly inscribed on fine vellum, that notes the measured temperature and acidity of each brew to assure its quality.",
    processLedger:
      "A detailed account of the brewing process, listing each stage in proper sequence so that no step is omitted or forgotten.",
    distillationRecord:
      "A careful record of the distillation process, marking the phases of separation and purification as the mixture is refined.",
    ingredientCatalog:
      "A compendium of ingredients, enumerating the herbs and reagents in clear order to guide the apothecary’s selection.",
    measurementGauge:
      "An instrument by which the precise readings of heat and pH are recorded, ensuring the conditions remain within proper bounds.",
    extractionApparatus:
      "A device for the extraction of essential essences, its operation duly noted so that every drop is accounted for.",
    mixingChamber:
      "A chamber where all components are thoroughly combined; the uniformity of the mixture is observed and recorded for posterity.",
    refinementModule:
      "An apparatus devoted to the removal of impurities, ensuring that the final product is as refined as it is potent.",
    processMonitor:
      "A vigilant monitor that records the progression of each brewing operation, ensuring the process remains true to established method.",
    compoundAnalyzer:
      "A tool that dissects the chemical composition of the brew, providing a careful analysis of its constituents.",
    batchRecord:
      "A formal record of each batch produced, preserving the particulars of every potion in a chronicle for future reference.",
    recipeCodex:
      "A bound volume containing the precise formulations passed down by master apothecaries, serving as a guide for future preparations.",
    purificationChamber:
      "A chamber in which the brew is cleansed of all unwanted matter, ensuring that only the purest elements remain.",
    qualityController:
      "A device that enforces strict standards by measuring and confirming the quality of the potion throughout its creation.",
    processRegulator:
      "An instrument that governs the sequence and timing of the brewing stages, ensuring that the work proceeds in proper order.",
    finalBinder:
      "A tool used in the final unification of the brew’s components, binding them into a stable and lasting concoction.",
    advancedRegister:
      "An enhanced ledger that records even the most subtle variations in the brewing process, preserving every nuance for the discerning brewer.",
    combinedApparatus:
      "A machine that amalgamates several stages of production into one efficient operation, streamlining the art of potion-making.",
    unifiedSystem:
      "An integrated system that consolidates distillation, synthesis, and binding into a single, coherent process—ensuring a potion of unsurpassed refinement.",
  };

export const equipmentDescriptionMap: Record<EquipmentKey, string> = {
  ...coreEquipmentDescriptionMap,
  ...timeTravelEquipmentDescriptionMap,
  ...biologyEquipmentDescriptionMap,
  ...spaceEquipmentDescriptionMap,
  ...wiccaEquipmentDescriptionMap,
  ...chemistryEquipmentDescriptionMap,
  ...vampireEquipmentDescriptionMap,
  ...hellEquipmentDescriptionMap,
  ...heavenEquipmentDescriptionMap,
  ...integrationEquipmentDescriptionMap,
};

export const equipmentKeys = Object.keys(equipmentMap) as [
  EquipmentKey,
  ...EquipmentKey[]
];
