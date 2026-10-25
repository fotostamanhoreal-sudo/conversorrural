import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Converter } from "@/components/converter";
import { SearchPanel } from "@/components/search-panel";
import { pushRecent } from "@/lib/recent";
import { getCategory, unitById } from "@/lib/units";

type CategorySearch = {
  de?: string;
  para?: string;
};

export const Route = createFileRoute("/c/$category")({
  validateSearch: (search: Record<string, unknown>): CategorySearch => ({
    de: typeof search.de === "string" ? search.de : undefined,
    para: typeof search.para === "string" ? search.para : undefined,
  }),
  head: ({ params }) => {
    const category = getCategory(params.category);
    const title = category ? `${category.name} — Medida` : "Medida";
    return {
      meta: [
        { title },
        {
          name: "description",
          content: category?.blurb ?? "Conversor de unidades.",
        },
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const { category: slug } = Route.useParams();
  const search = Route.useSearch();
  const category = getCategory(slug);

  if (!category) {
    return (
      <main>
        <h1 className="font-serif text-4xl tracking-tight">Categoria não encontrada</h1>
        <p className="mt-3 text-muted">Esse endereço não corresponde a uma unidade.</p>
        <Link to="/" className="mt-6 inline-flex h-11 items-center font-medium text-brass">
          Voltar ao início
        </Link>
      </main>
    );
  }

  const initialFrom = unitById(category, search.de)?.id ?? category.units[0].id;
  const fallbackTo = category.units.find((unit) => unit.id !== initialFrom)?.id ?? initialFrom;
  const initialTo = unitById(category, search.para)?.id ?? fallbackTo;
  const urlKey = `${category.slug}:${search.de ?? ""}:${search.para ?? ""}`;

  return (
    <main>
      <div className="max-w-xl">
        <SearchPanel variant="compact" />
      </div>
      <Pair
        key={urlKey}
        slug={category.slug}
        initialFrom={initialFrom}
        initialTo={initialTo === initialFrom ? fallbackTo : initialTo}
      />
    </main>
  );
}

function Pair({
  slug,
  initialFrom,
  initialTo,
}: {
  slug: string;
  initialFrom: string;
  initialTo: string;
}) {
  const category = getCategory(slug)!;
  const [fromId, setFromId] = useState(initialFrom);
  const [toId, setToId] = useState(initialTo);
  const from = unitById(category, fromId) ?? category.units[0];
  const to = unitById(category, toId) ?? category.units[1] ?? from;

  useEffect(() => {
    pushRecent({ category: slug, from: from.id, to: to.id });
  }, [slug, from.id, to.id]);

  return (
    <>
      <p className="mt-8 text-sm font-medium tracking-wide text-brass uppercase">{category.name}</p>
      <h1 className="mt-2 font-serif text-4xl tracking-tight sm:text-5xl">
        {from.name} para {to.name}
      </h1>
      <p className="mt-3 max-w-xl text-muted">{category.blurb}</p>
      {category.note && <p className="mt-2 max-w-xl text-sm text-muted">{category.note}</p>}
      <div className="mt-8">
        <Converter
          category={category}
          fromId={from.id}
          toId={to.id}
          onFrom={setFromId}
          onTo={setToId}
        />
      </div>
    </>
  );
}
