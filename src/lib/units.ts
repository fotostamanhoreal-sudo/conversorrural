import { normalizeQuery } from "@/lib/format";

export type IconName =
  | "ruler"
  | "weight"
  | "thermometer"
  | "land"
  | "beaker"
  | "gauge"
  | "clock"
  | "pressure"
  | "zap"
  | "plug"
  | "disk"
  | "angle"
  | "wave"
  | "fuel"
  | "force"
  | "wheat";

type UnitBase = {
  id: string;
  name: string;
  symbol: string;
  aliases: string[];
};

export type Unit = UnitBase &
  (
    | { kind: "linear"; factor: number }
    | {
        kind: "affine";
        toBase: (value: number) => number;
        fromBase: (base: number) => number;
      }
    | { kind: "inverse"; factor: number }
  );

export type Category = {
  slug: string;
  name: string;
  blurb: string;
  note?: string;
  icon: IconName;
  units: Unit[];
};

export type PairLink = {
  category: string;
  from: string;
  to: string;
  label: string;
};

const MPG_US = (3.785411784 / 1.609344) * 100;
const MPG_UK = (4.54609 / 1.609344) * 100;

export const categories: Category[] = [
  {
    slug: "comprimento",
    name: "Comprimento",
    blurb: "Do micrômetro à milha náutica.",
    icon: "ruler",
    units: [
      linear("um", "Micrômetro", "µm", ["micrometro", "micron", "um"], 1e-6),
      linear("mm", "Milímetro", "mm", ["millimeter"], 0.001),
      linear("cm", "Centímetro", "cm", ["centimeter"], 0.01),
      linear("m", "Metro", "m", ["meter", "metre"], 1),
      linear("km", "Quilômetro", "km", ["kilometer", "quilometro"], 1000),
      linear("in", "Polegada", "in", ["inch", "inches", "pol"], 0.0254),
      linear("ft", "Pé", "ft", ["foot", "feet", "pe"], 0.3048),
      linear("yd", "Jarda", "yd", ["yard"], 0.9144),
      linear("mi", "Milha", "mi", ["mile"], 1609.344),
      linear("nmi", "Milha náutica", "nmi", ["nautical", "nautica"], 1852),
    ],
  },
  {
    slug: "massa",
    name: "Massa",
    blurb: "Grama, libra, tonelada e arroba.",
    note: "Arroba aqui é a de 15 kg, usada no gado. Stone é a unidade britânica.",
    icon: "weight",
    units: [
      linear("mg", "Miligrama", "mg", ["milligram"], 1e-6),
      linear("g", "Grama", "g", ["gram"], 0.001),
      linear("kg", "Quilograma", "kg", ["kilogram", "quilo", "quilos"], 1),
      linear("t", "Tonelada", "t", ["ton", "tonne"], 1000),
      linear("oz", "Onça", "oz", ["ounce"], 0.028349523125),
      linear("lb", "Libra", "lb", ["pound", "lbs", "libra"], 0.45359237),
      linear("st", "Stone", "st", ["stone"], 6.35029318),
      linear("arroba", "Arroba", "@", ["arroba"], 15),
    ],
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
        aliases: ["celsius", "centigrado", "centigrade"],
        kind: "affine",
        toBase: (value) => value,
        fromBase: (base) => base,
      },
      {
        id: "f",
        name: "Fahrenheit",
        symbol: "°F",
        aliases: ["fahrenheit"],
        kind: "affine",
        toBase: (value) => ((value - 32) * 5) / 9,
        fromBase: (base) => (base * 9) / 5 + 32,
      },
      {
        id: "k",
        name: "Kelvin",
        symbol: "K",
        aliases: ["kelvin"],
        kind: "affine",
        toBase: (value) => value - 273.15,
        fromBase: (base) => base + 273.15,
      },
    ],
  },
  {
    slug: "area",
    name: "Área",
    blurb: "Hectare, alqueire e acre.",
    note: "O alqueire muda por estado. Paulista: 24.200 m² (2,42 ha). Mineiro e goiano: 48.400 m² (4,84 ha), o mesmo valor. Baiano: 96.800 m² (9,68 ha). Do norte: 27.225 m². No Sul de Minas, a convenção local é 4 ha.",
    icon: "land",
    units: [
      linear("mm2", "Milímetro quadrado", "mm²", ["mm2"], 1e-6),
      linear("cm2", "Centímetro quadrado", "cm²", ["cm2"], 1e-4),
      linear("m2", "Metro quadrado", "m²", ["m2"], 1),
      linear("ha", "Hectare", "ha", ["hectare"], 10_000),
      linear("alq-pa", "Alqueire paulista", "alq. SP", ["alqueire paulista", "alqueire sp", "alqueire de sao paulo"], 24_200),
      linear("alq-mg", "Alqueire mineiro", "alq. MG", ["alqueire mineiro", "alqueire mg", "alqueire de minas"], 48_400),
      linear("alq-go", "Alqueire goiano", "alq. GO", ["alqueire goiano", "alqueire go", "alqueire de goias"], 48_400),
      linear("alq-ba", "Alqueire baiano", "alq. BA", ["alqueire baiano", "alqueire ba", "alqueire da bahia"], 96_800),
      linear("alq-norte", "Alqueire do norte", "alq. N", ["alqueire do norte", "alqueire norte", "alqueire nortista"], 27_225),
      linear("alq-sm", "Alqueire (Sul de Minas)", "alq. SM", ["alqueire sul de minas", "sul de minas", "alqueire sul-mineiro"], 40_000),
      linear("alqueirao", "Alqueirão", "alqueirão", ["alqueirao", "alqueirão"], 193_600),
      linear("tarefa-ba", "Tarefa baiana", "tarefa BA", ["tarefa", "tarefa baiana", "tarefa bahia"], 4_356),
      linear("tarefa-ne", "Tarefa nordestina", "tarefa NE", ["tarefa nordestina", "tarefa nordeste"], 3_025),
      linear("litro-terra", "Litro de terra", "L terra", ["litro de terra", "litro terra"], 605),
      linear("braca2", "Braça quadrada", "br²", ["braca", "braça", "braca quadrada", "braça quadrada"], 4.84),
      linear("km2", "Quilômetro quadrado", "km²", ["km2"], 1e6),
      linear("in2", "Polegada quadrada", "in²", ["in2", "sq in"], 0.00064516),
      linear("ft2", "Pé quadrado", "ft²", ["ft2", "sq ft"], 0.09290304),
      linear("acre", "Acre", "acre", ["acre"], 4046.8564224),
      linear("mi2", "Milha quadrada", "mi²", ["mi2"], 2_589_988.110336),
    ],
  },
  {
    slug: "agro",
    name: "Agro e pecuária",
    blurb: "Saca, bushel, arroba e unidade animal.",
    note: "Saca de 60 kg: soja, milho, café, feijão e trigo. Saca de 50 kg: arroz e açúcar. Bushel de Chicago: soja e trigo 27,216 kg; milho 25,401 kg. Arroba do boi e do algodão: 15 kg. Unidade animal: 450 kg de peso vivo.",
    icon: "wheat",
    units: [
      linear("saca60", "Saca (60 kg)", "sc 60", ["saca", "saco", "saca 60", "saca de soja", "saca de milho", "saca de cafe", "saca de feijao", "saca de trigo"], 60),
      linear("t", "Tonelada", "t", ["ton", "tonelada"], 1000),
      linear("kg", "Quilograma", "kg", ["quilo", "kg"], 1),
      linear("saca50", "Saca (50 kg)", "sc 50", ["saca 50", "saca de arroz", "saca de acucar"], 50),
      linear("arroba", "Arroba", "@", ["arroba", "arroba de boi", "arroba de algodao"], 15),
      linear("ua", "Unidade animal (450 kg)", "UA", ["ua", "unidade animal"], 450),
      linear("bu-soja", "Bushel de soja", "bu soja", ["bushel", "bushel de soja", "bu soja"], 27.2155422),
      linear("bu-milho", "Bushel de milho", "bu milho", ["bushel de milho", "bu milho"], 25.40117272),
      linear("bu-trigo", "Bushel de trigo", "bu trigo", ["bushel de trigo", "bu trigo"], 27.2155422),
      linear("lb", "Libra", "lb", ["libra", "pound"], 0.45359237),
      linear("quintal", "Quintal métrico", "q", ["quintal", "quintal metrico"], 100),
      linear("fardo", "Fardo de algodão (EUA)", "fardo", ["fardo", "fardo de algodao", "cotton"], 217.7243376),
    ],
  },
  {
    slug: "volume",
    name: "Volume",
    blurb: "Litro, xícara, colher e galão.",
    note: "Xícara de receita no Brasil costuma ser 240 mL. A de 250 mL também está na lista. Cup dos EUA é 236,6 mL.",
    icon: "beaker",
    units: [
      linear("ml", "Mililitro", "mL", ["ml", "mililitro", "cc"], 0.001),
      linear("l", "Litro", "L", ["litro", "liter", "litre"], 1),
      linear("m3", "Metro cúbico", "m³", ["m3"], 1000),
      linear("tsp", "Colher de chá", "chá", ["colher de cha", "teaspoon", "tsp"], 0.005),
      linear("tbsp", "Colher de sopa", "sopa", ["tablespoon", "tbsp"], 0.015),
      linear("cup240", "Xícara (240 mL)", "xíc. 240", ["xicara", "xícara"], 0.24),
      linear("cup250", "Xícara (250 mL)", "xíc. 250", ["250"], 0.25),
      linear("floz", "Onça fluida (EUA)", "fl oz", ["fluid ounce", "floz"], 0.0295735295625),
      linear("cup-us", "Cup (EUA)", "cup", ["cup eua", "us cup"], 0.2365882365),
      linear("pt", "Pint (EUA)", "pt", ["pint"], 0.473176473),
      linear("qt", "Quarto (EUA)", "qt", ["quart"], 0.946352946),
      linear("gal-us", "Galão (EUA)", "gal EUA", ["gallon", "galao"], 3.785411784),
      linear("gal-uk", "Galão (Reino Unido)", "gal RU", ["imperial gallon"], 4.54609),
    ],
  },
  {
    slug: "velocidade",
    name: "Velocidade",
    blurb: "km/h, milha por hora e nó.",
    icon: "gauge",
    units: [
      linear("ms", "Metro por segundo", "m/s", ["m/s", "mps"], 1),
      linear("kmh", "Quilômetro por hora", "km/h", ["km/h", "kmh", "kph"], 1 / 3.6),
      linear("mph", "Milha por hora", "mph", ["mph", "miles per hour"], 0.44704),
      linear("kn", "Nó", "kn", ["no", "knot", "knots"], 1852 / 3600),
      linear("fts", "Pé por segundo", "ft/s", ["ft/s", "fps"], 0.3048),
    ],
  },
  {
    slug: "tempo",
    name: "Tempo",
    blurb: "De milissegundo a ano.",
    note: "Mês é o ano gregoriano médio dividido por 12. Ano usa 365,2425 dias.",
    icon: "clock",
    units: [
      linear("ms", "Milissegundo", "ms", ["millisecond"], 0.001),
      linear("s", "Segundo", "s", ["second", "seg"], 1),
      linear("min", "Minuto", "min", ["minute"], 60),
      linear("h", "Hora", "h", ["hour", "hora", "hr"], 3600),
      linear("d", "Dia", "d", ["day"], 86_400),
      linear("wk", "Semana", "sem", ["week", "semana"], 604_800),
      linear("mo", "Mês (médio)", "mês", ["month", "mes"], 2_629_746),
      linear("yr", "Ano (médio)", "ano", ["year", "ano"], 31_556_952),
    ],
  },
  {
    slug: "pressao",
    name: "Pressão",
    blurb: "Pascal, bar, mmHg e psi.",
    note: "mmHg é a unidade usual da pressão arterial. 120 mmHg equivalem a cerca de 16 kPa.",
    icon: "pressure",
    units: [
      linear("pa", "Pascal", "Pa", ["pascal"], 1),
      linear("kpa", "Quilopascal", "kPa", ["kpa"], 1000),
      linear("mpa", "Megapascal", "MPa", ["mpa"], 1e6),
      linear("bar", "Bar", "bar", ["bar"], 100_000),
      linear("mbar", "Milibar", "mbar", ["mbar", "millibar"], 100),
      linear("atm", "Atmosfera", "atm", ["atmosphere"], 101_325),
      linear("mmhg", "Milímetro de mercúrio", "mmHg", ["mmhg", "torr"], 133.322387415),
      linear("psi", "Libra por polegada²", "psi", ["psi"], 6894.757293168),
    ],
  },
  {
    slug: "energia",
    name: "Energia",
    blurb: "Joule, caloria e quilowatt-hora.",
    note: "A caloria alimentar do rótulo é a quilocaloria (kcal).",
    icon: "zap",
    units: [
      linear("j", "Joule", "J", ["joule"], 1),
      linear("kj", "Quilojoule", "kJ", ["kj", "kilojoule"], 1000),
      linear("cal", "Caloria", "cal", ["calorie"], 4.184),
      linear("kcal", "Quilocaloria", "kcal", ["kcal", "caloria alimentar"], 4184),
      linear("wh", "Watt-hora", "Wh", ["wh"], 3600),
      linear("kwh", "Quilowatt-hora", "kWh", ["kwh"], 3_600_000),
      linear("btu", "BTU", "BTU", ["btu"], 1055.05585262),
    ],
  },
  {
    slug: "potencia",
    name: "Potência",
    blurb: "Watt, cavalo-vapor e horsepower.",
    note: "cv é o cavalo-vapor métrico (735,5 W). hp é o horsepower mecânico (745,7 W).",
    icon: "plug",
    units: [
      linear("w", "Watt", "W", ["watt"], 1),
      linear("kw", "Quilowatt", "kW", ["kw"], 1000),
      linear("mw", "Megawatt", "MW", ["mw"], 1e6),
      linear("cv", "Cavalo-vapor", "cv", ["cv", "ps", "metric hp"], 735.49875),
      linear("hp", "Horsepower", "hp", ["hp", "horsepower"], 745.6998715822702),
    ],
  },
  {
    slug: "dados",
    name: "Dados",
    blurb: "Bytes decimais e binários.",
    note: "kB, MB e GB contam de mil em mil (SI). KiB, MiB e GiB contam de 1024 em 1024. Um disco de 1 TB tem 0,909 TiB.",
    icon: "disk",
    units: [
      linear("bit", "Bit", "bit", ["bit"], 0.125),
      linear("b", "Byte", "B", ["byte"], 1),
      linear("kb", "Quilobyte", "kB", ["kb", "kilobyte"], 1000),
      linear("mb", "Megabyte", "MB", ["mb", "megabyte"], 1e6),
      linear("gb", "Gigabyte", "GB", ["gb", "gigabyte"], 1e9),
      linear("tb", "Terabyte", "TB", ["tb", "terabyte"], 1e12),
      linear("kib", "Quibibyte", "KiB", ["kib", "kibibyte"], 1024),
      linear("mib", "Mebibyte", "MiB", ["mib", "mebibyte"], 1024 ** 2),
      linear("gib", "Gibibyte", "GiB", ["gib", "gibibyte"], 1024 ** 3),
      linear("tib", "Tebibyte", "TiB", ["tib", "tebibyte"], 1024 ** 4),
    ],
  },
  {
    slug: "angulo",
    name: "Ângulo",
    blurb: "Grau, radiano e volta.",
    icon: "angle",
    units: [
      linear("deg", "Grau", "°", ["grau", "degree", "graus"], 1),
      linear("rad", "Radiano", "rad", ["radian", "radiano"], 180 / Math.PI),
      linear("grad", "Grado", "grad", ["gon", "gradian"], 0.9),
      linear("arcmin", "Minuto de arco", "′", ["arcmin", "arco"], 1 / 60),
      linear("arcsec", "Segundo de arco", "″", ["arcsec"], 1 / 3600),
      linear("turn", "Volta", "volta", ["turn", "revolucao", "revolution"], 360),
    ],
  },
  {
    slug: "frequencia",
    name: "Frequência",
    blurb: "Hertz e rotações por minuto.",
    icon: "wave",
    units: [
      linear("hz", "Hertz", "Hz", ["hertz"], 1),
      linear("khz", "Quilohertz", "kHz", ["khz"], 1000),
      linear("mhz", "Megahertz", "MHz", ["mhz"], 1e6),
      linear("ghz", "Gigahertz", "GHz", ["ghz"], 1e9),
      linear("rpm", "Rotações por minuto", "rpm", ["rpm"], 1 / 60),
    ],
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
      inverse("mpg-us", "Milha por galão (EUA)", "mpg EUA", ["mpg", "mpg us"], MPG_US),
      inverse("mpg-uk", "Milha por galão (RU)", "mpg RU", ["mpg uk", "imperial"], MPG_UK),
    ],
  },
  {
    slug: "forca",
    name: "Força",
    blurb: "Newton, kgf e libra-força.",
    icon: "force",
    units: [
      linear("n", "Newton", "N", ["newton"], 1),
      linear("kn", "Quilonewton", "kN", ["kn"], 1000),
      linear("kgf", "Quilograma-força", "kgf", ["kgf", "kilogram force"], 9.80665),
      linear("lbf", "Libra-força", "lbf", ["lbf", "pound force"], 4.4482216152605),
    ],
  },
];

export const popularPairs: PairLink[] = [
  { category: "comprimento", from: "cm", to: "in", label: "cm → polegada" },
  { category: "massa", from: "kg", to: "lb", label: "kg → libra" },
  { category: "temperatura", from: "c", to: "f", label: "°C → °F" },
  { category: "velocidade", from: "kmh", to: "mph", label: "km/h → mph" },
  { category: "volume", from: "ml", to: "cup240", label: "mL → xícara" },
  { category: "area", from: "m2", to: "ha", label: "m² → hectare" },
  { category: "area", from: "alq-mg", to: "ha", label: "alqueire mineiro → ha" },
  { category: "agro", from: "saca60", to: "t", label: "saca 60 kg → t" },
  { category: "agro", from: "arroba", to: "kg", label: "arroba → kg" },
  { category: "pressao", from: "mmhg", to: "kpa", label: "mmHg → kPa" },
  { category: "dados", from: "gb", to: "gib", label: "GB → GiB" },
  { category: "consumo", from: "l100", to: "kml", label: "L/100 km → km/L" },
  { category: "energia", from: "kcal", to: "kj", label: "kcal → kJ" },
  { category: "tempo", from: "h", to: "min", label: "hora → minuto" },
  { category: "potencia", from: "cv", to: "kw", label: "cv → kW" },
];

function partnerFor(category: Category, unit: Unit): Unit {
  const anchors = ["ha", "kg", "m", "l", "c", "s"];
  return (
    category.units.find((item) => item.id !== unit.id && anchors.includes(item.id)) ??
    category.units.find((item) => item.id !== unit.id) ??
    unit
  );
}

function linear(
  id: string,
  name: string,
  symbol: string,
  aliases: string[],
  factor: number,
): Unit {
  return { id, name, symbol, aliases, kind: "linear", factor };
}

function inverse(
  id: string,
  name: string,
  symbol: string,
  aliases: string[],
  factor: number,
): Unit {
  return { id, name, symbol, aliases, kind: "inverse", factor };
}

export function getCategory(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function unitById(category: Category, id: string | undefined): Unit | undefined {
  if (!id) return undefined;
  return category.units.find((unit) => unit.id === id);
}

export function toBase(unit: Unit, value: number): number | null {
  if (!Number.isFinite(value)) return null;
  if (unit.kind === "linear") return value * unit.factor;
  if (unit.kind === "affine") return unit.toBase(value);
  if (value === 0) return null;
  return unit.factor / value;
}

export function fromBase(unit: Unit, base: number): number | null {
  if (!Number.isFinite(base)) return null;
  if (unit.kind === "linear") {
    if (unit.factor === 0) return null;
    return base / unit.factor;
  }
  if (unit.kind === "affine") return unit.fromBase(base);
  if (base === 0) return null;
  return unit.factor / base;
}

export type SearchHit = {
  category: Category;
  unit: Unit;
  partner: Unit;
};

export function searchUnits(query: string): SearchHit[] {
  const needle = normalizeQuery(query);
  if (needle.length < 1) return [];
  const hits: Array<SearchHit & { score: number }> = [];
  for (const category of categories) {
    const categoryName = normalizeQuery(category.name);
    for (const unit of category.units) {
      const fields = [unit.name, unit.symbol, unit.id, ...unit.aliases].map(normalizeQuery);
      let score = 0;
      if (fields.some((field) => field === needle)) score = 100;
      else if (fields.some((field) => field.startsWith(needle))) score = 70;
      else if (categoryName.startsWith(needle)) score = 55;
      else if (fields.some((field) => field.includes(needle)) || categoryName.includes(needle)) {
        score = 40;
      }
      if (score === 0) continue;
      const partner = partnerFor(category, unit);
      hits.push({ category, unit, partner, score });
    }
  }
  hits.sort((a, b) => b.score - a.score || a.unit.name.localeCompare(b.unit.name, "pt-BR"));
  return hits.slice(0, 8).map(({ category, unit, partner }) => ({ category, unit, partner }));
}
