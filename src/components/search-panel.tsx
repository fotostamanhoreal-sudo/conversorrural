import { Link, useNavigate } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { searchUnits, type SearchHit } from "@/lib/units";

export function SearchPanel({ variant = "hero" }: { variant?: "hero" | "compact" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const box = useRef<HTMLDivElement>(null);
  const listId = useId();
  const hits = searchUnits(query);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    function onPointer(event: PointerEvent) {
      if (!box.current?.contains(event.target as Node)) setOpen(false);
    }
    document.addEventListener("pointerdown", onPointer);
    return () => document.removeEventListener("pointerdown", onPointer);
  }, []);

  function go(hit: SearchHit) {
    setOpen(false);
    setQuery("");
    void navigate({
      to: "/c/$category",
      params: { category: hit.category.slug },
      search: { de: hit.unit.id, para: hit.partner.id },
    });
  }

  const hero = variant === "hero";

  return (
    <div ref={box} className="relative">
      <label className="relative block">
        <span className="sr-only">Buscar unidade</span>
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted"
          strokeWidth={1.75}
        />
        <input
          value={query}
          role="combobox"
          aria-expanded={open && hits.length > 0}
          aria-controls={listId}
          aria-autocomplete="list"
          placeholder={hero ? "Busque alqueire, saca, cm, °F…" : "Buscar unidade"}
          className={
            "w-full rounded-2xl border border-line bg-card text-ink outline-none placeholder:text-muted " +
            (hero ? "h-14 pr-4 pl-11 text-base" : "h-12 pr-3 pl-10 text-base")
          }
          onChange={(event) => {
            setQuery(event.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              setActive((index) => Math.min(index + 1, Math.max(hits.length - 1, 0)));
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              setActive((index) => Math.max(index - 1, 0));
            } else if (event.key === "Enter" && hits[active]) {
              event.preventDefault();
              go(hits[active]);
            } else if (event.key === "Escape") {
              setOpen(false);
            }
          }}
        />
      </label>
      {open && query.trim() !== "" && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-card shadow-sm"
        >
          {hits.length === 0 ? (
            <li className="px-4 py-3 text-sm text-muted">Nenhuma unidade com esse nome.</li>
          ) : (
            hits.map((hit, index) => (
              <li key={`${hit.category.slug}-${hit.unit.id}`} role="option" aria-selected={index === active}>
                <Link
                  to="/c/$category"
                  params={{ category: hit.category.slug }}
                  search={{ de: hit.unit.id, para: hit.partner.id }}
                  className={
                    "flex items-baseline justify-between gap-3 px-4 py-3 text-left " +
                    (index === active ? "bg-brass-soft" : "hover:bg-inset")
                  }
                  onClick={() => {
                    setOpen(false);
                    setQuery("");
                  }}
                >
                  <span className="font-medium">
                    {hit.unit.name}{" "}
                    <span className="text-muted">{hit.unit.symbol}</span>
                  </span>
                  <span className="shrink-0 text-sm text-muted">{hit.category.name}</span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
