import { Link } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import type { ReactNode } from "react";

const THEME_KEY = "medida-theme";

function toggleTheme() {
  const next = !document.documentElement.classList.contains("dark");
  document.documentElement.classList.toggle("dark", next);
  localStorage.setItem(THEME_KEY, next ? "dark" : "light");
}

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-20 border-b border-line bg-paper/90 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-3 px-4">
          <Link to="/" className="flex items-center gap-2 text-ink">
            <Mark />
            <span className="font-serif text-2xl leading-none tracking-tight">Medida</span>
          </Link>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex size-11 items-center justify-center rounded-full border border-line bg-card text-ink"
            aria-label="Alternar tema claro ou escuro"
          >
            <Sun className="hidden size-5 dark:block" strokeWidth={1.75} />
            <Moon className="size-5 dark:hidden" strokeWidth={1.75} />
          </button>
        </div>
      </header>
      <div className="mx-auto w-full max-w-5xl flex-1 px-4 py-8">{children}</div>
      <footer className="border-t border-line">
        <p className="mx-auto max-w-5xl px-4 py-6 text-sm text-muted">
          O cálculo fica no seu navegador. Fatores no Sistema Internacional; xícara, galão e
          cavalo-vapor trazem a variante usada no Brasil, nos EUA ou no Reino Unido.
        </p>
      </footer>
    </div>
  );
}

function Mark() {
  return (
    <svg viewBox="0 0 32 32" className="size-8 text-brass" aria-hidden>
      <rect x="2" y="5" width="28" height="22" rx="6" fill="currentColor" />
      <path
        d="M8 10v12M13 10v8M18 10v12M23 10v8"
        stroke="var(--on-brass)"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}
