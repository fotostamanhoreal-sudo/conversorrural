import { i as __toESM } from "../_runtime.mjs";
import { s as searchUnits } from "./units-P0HrdJCd.mjs";
import { J as require_react, S as require_jsx_runtime, b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { s as Search } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/recent-DlkFBP_F.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function SearchPanel({ variant = "hero" }) {
	const navigate = useNavigate();
	const [query, setQuery] = (0, import_react.useState)("");
	const [open, setOpen] = (0, import_react.useState)(false);
	const [active, setActive] = (0, import_react.useState)(0);
	const box = (0, import_react.useRef)(null);
	const listId = (0, import_react.useId)();
	const hits = searchUnits(query);
	(0, import_react.useEffect)(() => {
		setActive(0);
	}, [query]);
	(0, import_react.useEffect)(() => {
		function onPointer(event) {
			if (!box.current?.contains(event.target)) setOpen(false);
		}
		document.addEventListener("pointerdown", onPointer);
		return () => document.removeEventListener("pointerdown", onPointer);
	}, []);
	function go(hit) {
		setOpen(false);
		setQuery("");
		navigate({
			to: "/c/$category",
			params: { category: hit.category.slug },
			search: {
				de: hit.unit.id,
				para: hit.partner.id
			}
		});
	}
	const hero = variant === "hero";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: box,
		className: "relative",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "relative block",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "sr-only",
					children: "Buscar unidade"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {
					className: "pointer-events-none absolute top-1/2 left-3 size-5 -translate-y-1/2 text-muted",
					strokeWidth: 1.75
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value: query,
					role: "combobox",
					"aria-expanded": open && hits.length > 0,
					"aria-controls": listId,
					"aria-autocomplete": "list",
					placeholder: hero ? "Busque cm, libra, °F, xícara…" : "Buscar unidade",
					className: "w-full rounded-2xl border border-line bg-card text-ink outline-none placeholder:text-muted " + (hero ? "h-14 pr-4 pl-11 text-base" : "h-12 pr-3 pl-10 text-base"),
					onChange: (event) => {
						setQuery(event.target.value);
						setOpen(true);
					},
					onFocus: () => setOpen(true),
					onKeyDown: (event) => {
						if (event.key === "ArrowDown") {
							event.preventDefault();
							setActive((index) => Math.min(index + 1, Math.max(hits.length - 1, 0)));
						} else if (event.key === "ArrowUp") {
							event.preventDefault();
							setActive((index) => Math.max(index - 1, 0));
						} else if (event.key === "Enter" && hits[active]) {
							event.preventDefault();
							go(hits[active]);
						} else if (event.key === "Escape") setOpen(false);
					}
				})
			]
		}), open && query.trim() !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			id: listId,
			role: "listbox",
			className: "absolute z-30 mt-2 w-full overflow-hidden rounded-2xl border border-line bg-card shadow-sm",
			children: hits.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				className: "px-4 py-3 text-sm text-muted",
				children: "Nenhuma unidade com esse nome."
			}) : hits.map((hit, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
				role: "option",
				"aria-selected": index === active,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/c/$category",
					params: { category: hit.category.slug },
					search: {
						de: hit.unit.id,
						para: hit.partner.id
					},
					className: "flex items-baseline justify-between gap-3 px-4 py-3 text-left " + (index === active ? "bg-brass-soft" : "hover:bg-inset"),
					onClick: () => {
						setOpen(false);
						setQuery("");
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "font-medium",
						children: [
							hit.unit.name,
							" ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-muted",
								children: hit.unit.symbol
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "shrink-0 text-sm text-muted",
						children: hit.category.name
					})]
				})
			}, `${hit.category.slug}-${hit.unit.id}`))
		})]
	});
}
var KEY = "medida-recent";
function readRecent() {
	if (typeof localStorage === "undefined") return [];
	try {
		const raw = localStorage.getItem(KEY);
		if (!raw) return [];
		const parsed = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		return parsed.filter((item) => !!item && typeof item === "object" && typeof item.category === "string" && typeof item.from === "string" && typeof item.to === "string").slice(0, 6);
	} catch {
		return [];
	}
}
function pushRecent(item) {
	if (typeof localStorage === "undefined") return;
	const prev = readRecent().filter((entry) => !(entry.category === item.category && entry.from === item.from && entry.to === item.to));
	localStorage.setItem(KEY, JSON.stringify([item, ...prev].slice(0, 6)));
}
//#endregion
export { pushRecent as n, readRecent as r, SearchPanel as t };
