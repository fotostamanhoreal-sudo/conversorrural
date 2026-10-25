import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CategoryIcon } from "@/components/category-icon";
import { SearchPanel } from "@/components/search-panel";
import { readRecent, type RecentPair } from "@/lib/recent";
import { categories, getCategory, popularPairs, unitById } from "@/lib/units";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [recent, setRecent] = useState<RecentPair[]>([]);

  useEffect(() => {
    setRecent(readRecent());
  }, []);

  return (
    <main>
      <p className="text-sm font-medium tracking-wide text-brass uppercase">Conversor</p>
      <h1 className="mt-2 max-w-xl font-serif text-5xl leading-tight tracking-tight">
        Qualquer unidade, na hora.
      </h1>
      <p className="mt-3 max-w-xl text-base text-muted">
        Digite um valor e veja o equivalente em todas as unidades da categoria. Sem cadastro.
      </p>

      <div className="mt-8 max-w-xl">
        <SearchPanel />
      </div>

      {recent.length > 0 && (
        <section className="mt-10">
          <h2 className="text-sm font-medium tracking-wide text-muted uppercase">Recentes</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {recent.map((item) => {
              const category = getCategory(item.category);
              const from = category ? unitById(category, item.from) : undefined;
              const to = category ? unitById(category, item.to) : undefined;
              if (!category || !from || !to) return null;
              return (
                <li key={`${item.category}-${item.from}-${item.to}`}>
                  <Link
                    to="/c/$category"
                    params={{ category: item.category }}
                    search={{ de: item.from, para: item.to }}
                    className="inline-flex h-11 items-center rounded-full border border-line bg-card px-4 text-sm"
                  >
                    {from.symbol} → {to.symbol}
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section className="mt-10">
        <h2 className="text-sm font-medium tracking-wide text-muted uppercase">Pares comuns</h2>
        <ul className="mt-3 flex flex-wrap gap-2">
          {popularPairs.map((pair) => (
            <li key={pair.label}>
              <Link
                to="/c/$category"
                params={{ category: pair.category }}
                search={{ de: pair.from, para: pair.to }}
                className="inline-flex h-11 items-center rounded-full bg-brass-soft px-4 text-sm font-medium text-ink"
              >
                {pair.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-sm font-medium tracking-wide text-muted uppercase">Categorias</h2>
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {categories.map((category) => (
            <li key={category.slug}>
              <Link
                to="/c/$category"
                params={{ category: category.slug }}
                search={{ de: category.units[0]?.id, para: category.units[1]?.id }}
                className="flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-brass"
              >
                <span className="flex size-10 items-center justify-center rounded-xl bg-inset text-brass">
                  <CategoryIcon name={category.icon} className="size-5" />
                </span>
                <span>
                  <span className="block font-medium">{category.name}</span>
                  <span className="mt-1 block text-sm text-muted">{category.blurb}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
