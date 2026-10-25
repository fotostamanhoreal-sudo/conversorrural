import { ArrowLeftRight, Check, ChevronDown, Copy } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { formatValue, parseInput, type Digits } from "@/lib/format";
import { fromBase, toBase, type Category, type Unit } from "@/lib/units";

const DIGIT_OPTIONS: Array<{ id: Digits; label: string }> = [
  { id: "auto", label: "Auto" },
  { id: 0, label: "0" },
  { id: 2, label: "2" },
  { id: 4, label: "4" },
  { id: 6, label: "6" },
];

export function Converter({
  category,
  fromId,
  toId,
  onFrom,
  onTo,
}: {
  category: Category;
  fromId: string;
  toId: string;
  onFrom: (id: string) => void;
  onTo: (id: string) => void;
}) {
  const from = category.units.find((unit) => unit.id === fromId) ?? category.units[0];
  const to =
    category.units.find((unit) => unit.id === toId) ??
    category.units.find((unit) => unit.id !== from.id) ??
    from;

  const [base, setBase] = useState<number | null>(() => toBase(from, 1));
  const [digits, setDigits] = useState<Digits>("auto");
  const [focus, setFocus] = useState<"from" | "to" | null>(null);
  const [draft, setDraft] = useState("1");
  const [copied, setCopied] = useState<string | null>(null);

  useEffect(() => {
    if (!copied) return;
    const timer = window.setTimeout(() => setCopied(null), 1400);
    return () => window.clearTimeout(timer);
  }, [copied]);

  function shown(unit: Unit, side: "from" | "to"): string {
    if (focus === side) return draft;
    if (base == null) return "";
    return formatValue(fromBase(unit, base), digits, false);
  }

  function edit(side: "from" | "to", raw: string, unit: Unit) {
    setFocus(side);
    setDraft(raw);
    if (raw.trim() === "") {
      setBase(null);
      return;
    }
    const parsed = parseInput(raw);
    if (parsed == null) return;
    setBase(toBase(unit, parsed));
  }

  function changeFrom(id: string) {
    const next = category.units.find((unit) => unit.id === id);
    if (!next) return;
    const current = focus === "from" ? parseInput(draft) : base == null ? null : fromBase(from, base);
    if (current != null) setBase(toBase(next, current));
    if (id === to.id) {
      const other = category.units.find((unit) => unit.id !== id);
      if (other) onTo(other.id);
    }
    onFrom(id);
  }

  function swap() {
    onFrom(to.id);
    onTo(from.id);
    if (focus === "from") setFocus("to");
    else if (focus === "to") setFocus("from");
  }

  const one = base == null ? null : fromBase(to, toBase(from, 1) ?? Number.NaN);
  const relation =
    one == null ? null : `1 ${from.name.toLowerCase()} = ${formatValue(one, "auto")} ${to.symbol}`;

  async function copy(id: string, text: string) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(id);
    } catch {
      setCopied(null);
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <section className="rounded-2xl border border-line bg-card p-4 sm:p-6">
        <Field
          label="De"
          value={shown(from, "from")}
          unit={from}
          units={category.units}
          onValue={(raw) => edit("from", raw, from)}
          onFocus={() => {
            setFocus("from");
            setDraft(shown(from, "from"));
          }}
          onBlur={() => setFocus((current) => (current === "from" ? null : current))}
          onUnit={changeFrom}
        />
        <div className="flex flex-wrap items-center gap-3 py-3">
          <button
            type="button"
            onClick={swap}
            className="flex h-11 items-center gap-2 rounded-full border border-line bg-inset px-4 text-sm font-medium text-ink"
          >
            <ArrowLeftRight className="size-4" strokeWidth={1.75} />
            Inverter
          </button>
          {relation && <p className="text-sm text-muted">{relation}</p>}
        </div>
        <Field
          label="Para"
          value={shown(to, "to")}
          unit={to}
          units={category.units}
          onValue={(raw) => edit("to", raw, to)}
          onFocus={() => {
            setFocus("to");
            setDraft(shown(to, "to"));
          }}
          onBlur={() => setFocus((current) => (current === "to" ? null : current))}
          onUnit={(id) => onTo(id)}
        />
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <span className="mr-1 text-sm text-muted">Casas</span>
          {DIGIT_OPTIONS.map((option) => {
            const selected = digits === option.id;
            return (
              <button
                key={String(option.id)}
                type="button"
                aria-pressed={selected}
                onClick={() => setDigits(option.id)}
                className={
                  "h-10 min-w-10 rounded-full px-3 text-sm font-medium " +
                  (selected ? "bg-brass text-on-brass" : "bg-inset text-ink")
                }
              >
                {option.label}
              </button>
            );
          })}
        </div>
      </section>

      <section>
        <h2 className="font-serif text-2xl tracking-tight">Todas as unidades</h2>
        <p className="mt-1 text-sm text-muted">Toque uma linha para usá-la como destino.</p>
        <div className="mt-3 overflow-hidden rounded-2xl border border-line">
          <table className="w-full table-fixed border-collapse text-left">
            <caption className="sr-only">Valor convertido em cada unidade de {category.name}</caption>
            <thead>
              <tr className="border-b border-line bg-inset text-sm text-muted">
                <th className="w-[46%] px-4 py-3 font-medium">Unidade</th>
                <th className="px-4 py-3 font-medium">Valor</th>
                <th className="w-14 px-2 py-3">
                  <span className="sr-only">Copiar</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {category.units.map((unit) => {
                const value = base == null ? null : fromBase(unit, base);
                const text = formatValue(value, digits);
                const active = unit.id === to.id;
                const copyText = value == null ? "" : `${text} ${unit.symbol}`;
                return (
                  <tr
                    key={unit.id}
                    className={
                      "border-b border-line last:border-b-0 " + (active ? "bg-brass-soft" : "bg-card")
                    }
                  >
                    <td className="px-4 py-1">
                      <button
                        type="button"
                        onClick={() => onTo(unit.id)}
                        className="flex min-h-11 w-full flex-col items-start justify-center py-1 text-left"
                      >
                        <span className="font-medium break-words">{unit.name}</span>
                        <span className="text-sm text-muted">{unit.symbol}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 font-medium tabular-nums">{text}</td>
                    <td className="px-2 py-1">
                      <button
                        type="button"
                        disabled={value == null}
                        aria-label={`Copiar ${unit.name}`}
                        onClick={() => copy(unit.id, copyText)}
                        className="flex size-11 items-center justify-center rounded-full text-muted hover:text-ink disabled:opacity-40"
                      >
                        {copied === unit.id ? (
                          <Check className="size-4 text-brass" strokeWidth={1.75} />
                        ) : (
                          <Copy className="size-4" strokeWidth={1.75} />
                        )}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}

function Field({
  label,
  value,
  unit,
  units,
  onValue,
  onFocus,
  onBlur,
  onUnit,
}: {
  label: string;
  value: string;
  unit: Unit;
  units: Unit[];
  onValue: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onUnit: (id: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-end">
      <label className="block min-w-0 flex-1">
        <span className="mb-1 block text-sm text-muted">{label}</span>
        <input
          inputMode="decimal"
          autoComplete="off"
          value={value}
          aria-label={label}
          onChange={(event) => onValue(event.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          className="h-14 w-full rounded-2xl border border-line bg-inset px-4 font-serif text-3xl tracking-tight text-ink tabular-nums outline-none"
        />
      </label>
      <UnitMenu units={units} selected={unit} onSelect={onUnit} />
    </div>
  );
}

function UnitMenu({
  units,
  selected,
  onSelect,
}: {
  units: Unit[];
  selected: Unit;
  onSelect: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const needle = query.trim().toLowerCase();
  const visible = units.filter((unit) => {
    if (!needle) return true;
    const blob = `${unit.name} ${unit.symbol} ${unit.aliases.join(" ")}`.toLowerCase();
    return blob.includes(needle);
  });

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (!root.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  return (
    <div ref={root} className="relative sm:w-52">
      <span className="mb-1 block text-sm text-muted">Unidade</span>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={listId}
        onClick={() => {
          setOpen((current) => !current);
          setQuery("");
        }}
        className="flex h-14 w-full items-center justify-between gap-2 rounded-2xl border border-line bg-card px-4 text-left"
      >
        <span className="min-w-0">
          <span className="block truncate font-medium">{selected.name}</span>
          <span className="block text-sm text-muted">{selected.symbol}</span>
        </span>
        <ChevronDown className="size-4 shrink-0 text-muted" strokeWidth={1.75} />
      </button>
      {open && (
        <div
          id={listId}
          className="absolute right-0 z-30 mt-2 w-full min-w-56 overflow-hidden rounded-2xl border border-line bg-card sm:w-72"
        >
          <input
            autoFocus
            value={query}
            placeholder="Filtrar"
            aria-label="Filtrar unidades"
            onChange={(event) => setQuery(event.target.value)}
            className="h-11 w-full border-b border-line bg-card px-3 text-base outline-none"
          />
          <ul className="max-h-64 overflow-auto py-1" role="listbox">
            {visible.length === 0 ? (
              <li className="px-3 py-3 text-sm text-muted">Nada encontrado.</li>
            ) : (
              visible.map((unit) => (
                <li key={unit.id}>
                  <button
                    type="button"
                    role="option"
                    aria-selected={unit.id === selected.id}
                    onClick={() => {
                      onSelect(unit.id);
                      setOpen(false);
                    }}
                    className={
                      "flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left " +
                      (unit.id === selected.id ? "bg-brass-soft" : "hover:bg-inset")
                    }
                  >
                    <span>{unit.name}</span>
                    <span className="text-sm text-muted">{unit.symbol}</span>
                  </button>
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
