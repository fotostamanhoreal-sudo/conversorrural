//#region node_modules/.nitro/vite/services/ssr/assets/units-P0HrdJCd.js
/** Round away binary dust before display. Does not feed back into conversion. */
function scrub(value) {
	if (!Number.isFinite(value) || value === 0) return value;
	const power = 10 ** (12 - Math.floor(Math.log10(Math.abs(value))) - 1);
	return Math.round(value * power) / power;
}
function formatValue(value, digits, group = true) {
	if (value == null || !Number.isFinite(value)) return "—";
	const n = scrub(value);
	if (digits === "auto") {
		const abs = Math.abs(n);
		if (abs !== 0 && (abs < 1e-6 || abs >= 0xe8d4a51000)) return new Intl.NumberFormat("pt-BR", {
			notation: "scientific",
			maximumSignificantDigits: 6,
			useGrouping: group
		}).format(n);
		return new Intl.NumberFormat("pt-BR", {
			maximumSignificantDigits: 6,
			useGrouping: group
		}).format(n);
	}
	return new Intl.NumberFormat("pt-BR", {
		minimumFractionDigits: 0,
		maximumFractionDigits: digits,
		useGrouping: group
	}).format(n);
}
function parseInput(raw) {
	const trimmed = raw.trim().replace(/\s/g, "");
	if (trimmed === "" || trimmed === "-" || trimmed === "+" || trimmed === "," || trimmed === "." || trimmed === "-," || trimmed === "-." || trimmed === "+," || trimmed === "+.") return null;
	let normalized = trimmed;
	const hasComma = trimmed.includes(",");
	const hasDot = trimmed.includes(".");
	if (hasComma && hasDot) {
		if (trimmed.lastIndexOf(",") > trimmed.lastIndexOf(".")) normalized = trimmed.replace(/\./g, "").replace(",", ".");
		else normalized = trimmed.replace(/,/g, "");
	} else if (hasComma) normalized = trimmed.replace(",", ".");
	else if (/^\d{1,3}(\.\d{3})+$/.test(trimmed) || /^[-+]\d{1,3}(\.\d{3})+$/.test(trimmed)) normalized = trimmed.replace(/\./g, "");
	if (!/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i.test(normalized)) return null;
	const value = Number(normalized);
	return Number.isFinite(value) ? value : null;
}
function normalizeQuery(value) {
	return value.toLowerCase().normalize("NFD").replace(/\p{M}/gu, "").trim();
}
var categories = [
	{
		slug: "comprimento",
		name: "Comprimento",
		blurb: "Do micrômetro à milha náutica.",
		icon: "ruler",
		units: [
			linear("um", "Micrômetro", "µm", [
				"micrometro",
				"micron",
				"um"
			], 1e-6),
			linear("mm", "Milímetro", "mm", ["millimeter"], .001),
			linear("cm", "Centímetro", "cm", ["centimeter"], .01),
			linear("m", "Metro", "m", ["meter", "metre"], 1),
			linear("km", "Quilômetro", "km", ["kilometer", "quilometro"], 1e3),
			linear("in", "Polegada", "in", [
				"inch",
				"inches",
				"pol"
			], .0254),
			linear("ft", "Pé", "ft", [
				"foot",
				"feet",
				"pe"
			], .3048),
			linear("yd", "Jarda", "yd", ["yard"], .9144),
			linear("mi", "Milha", "mi", ["mile"], 1609.344),
			linear("nmi", "Milha náutica", "nmi", ["nautical", "nautica"], 1852)
		]
	},
	{
		slug: "massa",
		name: "Massa",
		blurb: "Grama, libra, tonelada e arroba.",
		note: "Arroba aqui é a de 15 kg, usada no gado. Stone é a unidade britânica.",
		icon: "weight",
		units: [
			linear("mg", "Miligrama", "mg", ["milligram"], 1e-6),
			linear("g", "Grama", "g", ["gram"], .001),
			linear("kg", "Quilograma", "kg", [
				"kilogram",
				"quilo",
				"quilos"
			], 1),
			linear("t", "Tonelada", "t", ["ton", "tonne"], 1e3),
			linear("oz", "Onça", "oz", ["ounce"], .028349523125),
			linear("lb", "Libra", "lb", [
				"pound",
				"lbs",
				"libra"
			], .45359237),
			linear("st", "Stone", "st", ["stone"], 6.35029318),
			linear("arroba", "Arroba", "@", ["arroba"], 15)
		]
	},
	{
		slug: "temperatura",
		name: "Temperatura",
		blurb: "Celsius, Fahrenheit e kelvin.",
		note: "Os zeros não coincidem: 0 °C = 32 °F = 273,15 K. Um intervalo de 1 °C equivale a 1,8 °F.",
		icon: "thermometer",
		units: [
			{
				id: "c",
				name: "Celsius",
				symbol: "°C",
				aliases: [
					"celsius",
					"centigrado",
					"centigrade"
				],
				kind: "affine",
				toBase: (value) => value,
				fromBase: (base) => base
			},
			{
				id: "f",
				name: "Fahrenheit",
				symbol: "°F",
				aliases: ["fahrenheit"],
				kind: "affine",
				toBase: (value) => (value - 32) * 5 / 9,
				fromBase: (base) => base * 9 / 5 + 32
			},
			{
				id: "k",
				name: "Kelvin",
				symbol: "K",
				aliases: ["kelvin"],
				kind: "affine",
				toBase: (value) => value - 273.15,
				fromBase: (base) => base + 273.15
			}
		]
	},
	{
		slug: "area",
		name: "Área",
		blurb: "Metro quadrado, hectare e acre.",
		icon: "land",
		units: [
			linear("mm2", "Milímetro quadrado", "mm²", ["mm2"], 1e-6),
			linear("cm2", "Centímetro quadrado", "cm²", ["cm2"], 1e-4),
			linear("m2", "Metro quadrado", "m²", ["m2"], 1),
			linear("ha", "Hectare", "ha", ["hectare"], 1e4),
			linear("km2", "Quilômetro quadrado", "km²", ["km2"], 1e6),
			linear("in2", "Polegada quadrada", "in²", ["in2", "sq in"], 64516e-8),
			linear("ft2", "Pé quadrado", "ft²", ["ft2", "sq ft"], .09290304),
			linear("acre", "Acre", "acre", ["acre"], 4046.8564224),
			linear("mi2", "Milha quadrada", "mi²", ["mi2"], 2589988.110336)
		]
	},
	{
		slug: "volume",
		name: "Volume",
		blurb: "Litro, xícara, colher e galão.",
		note: "Xícara de receita no Brasil costuma ser 240 mL. A de 250 mL também está na lista. Cup dos EUA é 236,6 mL.",
		icon: "beaker",
		units: [
			linear("ml", "Mililitro", "mL", [
				"ml",
				"mililitro",
				"cc"
			], .001),
			linear("l", "Litro", "L", [
				"litro",
				"liter",
				"litre"
			], 1),
			linear("m3", "Metro cúbico", "m³", ["m3"], 1e3),
			linear("tsp", "Colher de chá", "chá", [
				"colher de cha",
				"teaspoon",
				"tsp"
			], .005),
			linear("tbsp", "Colher de sopa", "sopa", ["tablespoon", "tbsp"], .015),
			linear("cup240", "Xícara (240 mL)", "xíc. 240", ["xicara", "xícara"], .24),
			linear("cup250", "Xícara (250 mL)", "xíc. 250", ["250"], .25),
			linear("floz", "Onça fluida (EUA)", "fl oz", ["fluid ounce", "floz"], .0295735295625),
			linear("cup-us", "Cup (EUA)", "cup", ["cup eua", "us cup"], .2365882365),
			linear("pt", "Pint (EUA)", "pt", ["pint"], .473176473),
			linear("qt", "Quarto (EUA)", "qt", ["quart"], .946352946),
			linear("gal-us", "Galão (EUA)", "gal EUA", ["gallon", "galao"], 3.785411784),
			linear("gal-uk", "Galão (Reino Unido)", "gal RU", ["imperial gallon"], 4.54609)
		]
	},
	{
		slug: "velocidade",
		name: "Velocidade",
		blurb: "km/h, milha por hora e nó.",
		icon: "gauge",
		units: [
			linear("ms", "Metro por segundo", "m/s", ["m/s", "mps"], 1),
			linear("kmh", "Quilômetro por hora", "km/h", [
				"km/h",
				"kmh",
				"kph"
			], 1 / 3.6),
			linear("mph", "Milha por hora", "mph", ["mph", "miles per hour"], .44704),
			linear("kn", "Nó", "kn", [
				"no",
				"knot",
				"knots"
			], 1852 / 3600),
			linear("fts", "Pé por segundo", "ft/s", ["ft/s", "fps"], .3048)
		]
	},
	{
		slug: "tempo",
		name: "Tempo",
		blurb: "De milissegundo a ano.",
		note: "Mês é o ano gregoriano médio dividido por 12. Ano usa 365,2425 dias.",
		icon: "clock",
		units: [
			linear("ms", "Milissegundo", "ms", ["millisecond"], .001),
			linear("s", "Segundo", "s", ["second", "seg"], 1),
			linear("min", "Minuto", "min", ["minute"], 60),
			linear("h", "Hora", "h", [
				"hour",
				"hora",
				"hr"
			], 3600),
			linear("d", "Dia", "d", ["day"], 86400),
			linear("wk", "Semana", "sem", ["week", "semana"], 604800),
			linear("mo", "Mês (médio)", "mês", ["month", "mes"], 2629746),
			linear("yr", "Ano (médio)", "ano", ["year", "ano"], 31556952)
		]
	},
	{
		slug: "pressao",
		name: "Pressão",
		blurb: "Pascal, bar, mmHg e psi.",
		note: "mmHg é a unidade usual da pressão arterial. 120 mmHg equivalem a cerca de 16 kPa.",
		icon: "pressure",
		units: [
			linear("pa", "Pascal", "Pa", ["pascal"], 1),
			linear("kpa", "Quilopascal", "kPa", ["kpa"], 1e3),
			linear("mpa", "Megapascal", "MPa", ["mpa"], 1e6),
			linear("bar", "Bar", "bar", ["bar"], 1e5),
			linear("mbar", "Milibar", "mbar", ["mbar", "millibar"], 100),
			linear("atm", "Atmosfera", "atm", ["atmosphere"], 101325),
			linear("mmhg", "Milímetro de mercúrio", "mmHg", ["mmhg", "torr"], 133.322387415),
			linear("psi", "Libra por polegada²", "psi", ["psi"], 6894.757293168)
		]
	},
	{
		slug: "energia",
		name: "Energia",
		blurb: "Joule, caloria e quilowatt-hora.",
		note: "A caloria alimentar do rótulo é a quilocaloria (kcal).",
		icon: "zap",
		units: [
			linear("j", "Joule", "J", ["joule"], 1),
			linear("kj", "Quilojoule", "kJ", ["kj", "kilojoule"], 1e3),
			linear("cal", "Caloria", "cal", ["calorie"], 4.184),
			linear("kcal", "Quilocaloria", "kcal", ["kcal", "caloria alimentar"], 4184),
			linear("wh", "Watt-hora", "Wh", ["wh"], 3600),
			linear("kwh", "Quilowatt-hora", "kWh", ["kwh"], 36e5),
			linear("btu", "BTU", "BTU", ["btu"], 1055.05585262)
		]
	},
	{
		slug: "potencia",
		name: "Potência",
		blurb: "Watt, cavalo-vapor e horsepower.",
		note: "cv é o cavalo-vapor métrico (735,5 W). hp é o horsepower mecânico (745,7 W).",
		icon: "plug",
		units: [
			linear("w", "Watt", "W", ["watt"], 1),
			linear("kw", "Quilowatt", "kW", ["kw"], 1e3),
			linear("mw", "Megawatt", "MW", ["mw"], 1e6),
			linear("cv", "Cavalo-vapor", "cv", [
				"cv",
				"ps",
				"metric hp"
			], 735.49875),
			linear("hp", "Horsepower", "hp", ["hp", "horsepower"], 745.6998715822702)
		]
	},
	{
		slug: "dados",
		name: "Dados",
		blurb: "Bytes decimais e binários.",
		note: "kB, MB e GB contam de mil em mil (SI). KiB, MiB e GiB contam de 1024 em 1024. Um disco de 1 TB tem 0,909 TiB.",
		icon: "disk",
		units: [
			linear("bit", "Bit", "bit", ["bit"], .125),
			linear("b", "Byte", "B", ["byte"], 1),
			linear("kb", "Quilobyte", "kB", ["kb", "kilobyte"], 1e3),
			linear("mb", "Megabyte", "MB", ["mb", "megabyte"], 1e6),
			linear("gb", "Gigabyte", "GB", ["gb", "gigabyte"], 1e9),
			linear("tb", "Terabyte", "TB", ["tb", "terabyte"], 0xe8d4a51000),
			linear("kib", "Quibibyte", "KiB", ["kib", "kibibyte"], 1024),
			linear("mib", "Mebibyte", "MiB", ["mib", "mebibyte"], 1024 ** 2),
			linear("gib", "Gibibyte", "GiB", ["gib", "gibibyte"], 1024 ** 3),
			linear("tib", "Tebibyte", "TiB", ["tib", "tebibyte"], 1024 ** 4)
		]
	},
	{
		slug: "angulo",
		name: "Ângulo",
		blurb: "Grau, radiano e volta.",
		icon: "angle",
		units: [
			linear("deg", "Grau", "°", [
				"grau",
				"degree",
				"graus"
			], 1),
			linear("rad", "Radiano", "rad", ["radian", "radiano"], 180 / Math.PI),
			linear("grad", "Grado", "grad", ["gon", "gradian"], .9),
			linear("arcmin", "Minuto de arco", "′", ["arcmin", "arco"], 1 / 60),
			linear("arcsec", "Segundo de arco", "″", ["arcsec"], 1 / 3600),
			linear("turn", "Volta", "volta", [
				"turn",
				"revolucao",
				"revolution"
			], 360)
		]
	},
	{
		slug: "frequencia",
		name: "Frequência",
		blurb: "Hertz e rotações por minuto.",
		icon: "wave",
		units: [
			linear("hz", "Hertz", "Hz", ["hertz"], 1),
			linear("khz", "Quilohertz", "kHz", ["khz"], 1e3),
			linear("mhz", "Megahertz", "MHz", ["mhz"], 1e6),
			linear("ghz", "Gigahertz", "GHz", ["ghz"], 1e9),
			linear("rpm", "Rotações por minuto", "rpm", ["rpm"], 1 / 60)
		]
	},
	{
		slug: "consumo",
		name: "Consumo",
		blurb: "L/100 km, km/L e milhas por galão.",
		note: "Quanto maior o km/L, menor o L/100 km. Por isso essas unidades andam ao contrário.",
		icon: "fuel",
		units: [
			linear("l100", "Litro por 100 km", "L/100 km", ["l/100", "l/100km"], 1),
			inverse("kml", "Quilômetro por litro", "km/L", ["km/l", "kml"], 100),
			inverse("mpg-us", "Milha por galão (EUA)", "mpg EUA", ["mpg", "mpg us"], 235.2145833333333),
			inverse("mpg-uk", "Milha por galão (RU)", "mpg RU", ["mpg uk", "imperial"], 282.4809363318222)
		]
	},
	{
		slug: "forca",
		name: "Força",
		blurb: "Newton, kgf e libra-força.",
		icon: "force",
		units: [
			linear("n", "Newton", "N", ["newton"], 1),
			linear("kn", "Quilonewton", "kN", ["kn"], 1e3),
			linear("kgf", "Quilograma-força", "kgf", ["kgf", "kilogram force"], 9.80665),
			linear("lbf", "Libra-força", "lbf", ["lbf", "pound force"], 4.4482216152605)
		]
	}
];
var popularPairs = [
	{
		category: "comprimento",
		from: "cm",
		to: "in",
		label: "cm → polegada"
	},
	{
		category: "massa",
		from: "kg",
		to: "lb",
		label: "kg → libra"
	},
	{
		category: "temperatura",
		from: "c",
		to: "f",
		label: "°C → °F"
	},
	{
		category: "velocidade",
		from: "kmh",
		to: "mph",
		label: "km/h → mph"
	},
	{
		category: "volume",
		from: "ml",
		to: "cup240",
		label: "mL → xícara"
	},
	{
		category: "area",
		from: "m2",
		to: "ha",
		label: "m² → hectare"
	},
	{
		category: "pressao",
		from: "mmhg",
		to: "kpa",
		label: "mmHg → kPa"
	},
	{
		category: "dados",
		from: "gb",
		to: "gib",
		label: "GB → GiB"
	},
	{
		category: "consumo",
		from: "l100",
		to: "kml",
		label: "L/100 km → km/L"
	},
	{
		category: "energia",
		from: "kcal",
		to: "kj",
		label: "kcal → kJ"
	},
	{
		category: "tempo",
		from: "h",
		to: "min",
		label: "hora → minuto"
	},
	{
		category: "potencia",
		from: "cv",
		to: "kw",
		label: "cv → kW"
	}
];
function linear(id, name, symbol, aliases, factor) {
	return {
		id,
		name,
		symbol,
		aliases,
		kind: "linear",
		factor
	};
}
function inverse(id, name, symbol, aliases, factor) {
	return {
		id,
		name,
		symbol,
		aliases,
		kind: "inverse",
		factor
	};
}
function getCategory(slug) {
	return categories.find((category) => category.slug === slug);
}
function unitById(category, id) {
	if (!id) return void 0;
	return category.units.find((unit) => unit.id === id);
}
function toBase(unit, value) {
	if (!Number.isFinite(value)) return null;
	if (unit.kind === "linear") return value * unit.factor;
	if (unit.kind === "affine") return unit.toBase(value);
	if (value === 0) return null;
	return unit.factor / value;
}
function fromBase(unit, base) {
	if (!Number.isFinite(base)) return null;
	if (unit.kind === "linear") {
		if (unit.factor === 0) return null;
		return base / unit.factor;
	}
	if (unit.kind === "affine") return unit.fromBase(base);
	if (base === 0) return null;
	return unit.factor / base;
}
function searchUnits(query) {
	const needle = normalizeQuery(query);
	if (needle.length < 1) return [];
	const hits = [];
	for (const category of categories) {
		const categoryName = normalizeQuery(category.name);
		for (const unit of category.units) {
			const fields = [
				unit.name,
				unit.symbol,
				unit.id,
				...unit.aliases
			].map(normalizeQuery);
			let score = 0;
			if (fields.some((field) => field === needle)) score = 100;
			else if (fields.some((field) => field.startsWith(needle))) score = 70;
			else if (categoryName.startsWith(needle)) score = 55;
			else if (fields.some((field) => field.includes(needle)) || categoryName.includes(needle)) score = 40;
			if (score === 0) continue;
			const partner = category.units.find((item) => item.id !== unit.id) ?? unit;
			hits.push({
				category,
				unit,
				partner,
				score
			});
		}
	}
	hits.sort((a, b) => b.score - a.score || a.unit.name.localeCompare(b.unit.name, "pt-BR"));
	return hits.slice(0, 8).map(({ category, unit, partner }) => ({
		category,
		unit,
		partner
	}));
}
//#endregion
export { parseInput as a, toBase as c, getCategory as i, unitById as l, formatValue as n, popularPairs as o, fromBase as r, searchUnits as s, categories as t };
