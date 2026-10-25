export type Digits = "auto" | 0 | 2 | 4 | 6;

/** Round away binary dust before display. Does not feed back into conversion. */
export function scrub(value: number): number {
  if (!Number.isFinite(value) || value === 0) return value;
  const abs = Math.abs(value);
  const digits = 12;
  const power = 10 ** (digits - Math.floor(Math.log10(abs)) - 1);
  return Math.round(value * power) / power;
}

export function formatValue(value: number | null, digits: Digits, group = true): string {
  if (value == null || !Number.isFinite(value)) return "—";
  const n = scrub(value);
  if (digits === "auto") {
    const abs = Math.abs(n);
    if (abs !== 0 && (abs < 1e-6 || abs >= 1e12)) {
      return new Intl.NumberFormat("pt-BR", {
        notation: "scientific",
        maximumSignificantDigits: 6,
        useGrouping: group,
      }).format(n);
    }
    return new Intl.NumberFormat("pt-BR", {
      maximumSignificantDigits: 6,
      useGrouping: group,
    }).format(n);
  }
  return new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 0,
    maximumFractionDigits: digits,
    useGrouping: group,
  }).format(n);
}

export function parseInput(raw: string): number | null {
  const trimmed = raw.trim().replace(/\s/g, "");
  if (
    trimmed === "" ||
    trimmed === "-" ||
    trimmed === "+" ||
    trimmed === "," ||
    trimmed === "." ||
    trimmed === "-," ||
    trimmed === "-." ||
    trimmed === "+," ||
    trimmed === "+."
  ) {
    return null;
  }
  let normalized = trimmed;
  const hasComma = trimmed.includes(",");
  const hasDot = trimmed.includes(".");
  if (hasComma && hasDot) {
    if (trimmed.lastIndexOf(",") > trimmed.lastIndexOf(".")) {
      normalized = trimmed.replace(/\./g, "").replace(",", ".");
    } else {
      normalized = trimmed.replace(/,/g, "");
    }
  } else if (hasComma) {
    normalized = trimmed.replace(",", ".");
  } else if (/^\d{1,3}(\.\d{3})+$/.test(trimmed) || /^[-+]\d{1,3}(\.\d{3})+$/.test(trimmed)) {
    normalized = trimmed.replace(/\./g, "");
  }
  if (!/^[-+]?\d*\.?\d+(e[-+]?\d+)?$/i.test(normalized)) return null;
  const value = Number(normalized);
  return Number.isFinite(value) ? value : null;
}

export function normalizeQuery(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .trim();
}
