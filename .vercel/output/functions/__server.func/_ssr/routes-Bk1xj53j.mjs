import { i as __toESM } from "../_runtime.mjs";
import { i as getCategory, l as unitById, o as popularPairs, t as categories } from "./units-P0HrdJCd.mjs";
import { J as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { C as ArrowDown, _ as Clock, a as Thermometer, b as Beaker, c as Ruler, d as LandPlot, f as HardDrive, h as Dumbbell, l as Plug, m as Fuel, n as Weight, p as Gauge, r as Triangle, t as Zap, x as AudioWaveform } from "../_libs/lucide-react.mjs";
import { r as readRecent, t as SearchPanel } from "./recent-DlkFBP_F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-Bk1xj53j.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var icons = {
	ruler: Ruler,
	weight: Weight,
	thermometer: Thermometer,
	land: LandPlot,
	beaker: Beaker,
	gauge: Gauge,
	clock: Clock,
	pressure: ArrowDown,
	zap: Zap,
	plug: Plug,
	disk: HardDrive,
	angle: Triangle,
	wave: AudioWaveform,
	fuel: Fuel,
	force: Dumbbell
};
function CategoryIcon({ name, className }) {
	const Icon = icons[name];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
		className,
		strokeWidth: 1.75,
		"aria-hidden": true
	});
}
function Home() {
	const [recent, setRecent] = (0, import_react.useState)([]);
	(0, import_react.useEffect)(() => {
		setRecent(readRecent());
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-sm font-medium tracking-wide text-brass uppercase",
			children: "Conversor"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "mt-2 max-w-xl font-serif text-5xl leading-tight tracking-tight",
			children: "Qualquer unidade, na hora."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-base text-muted",
			children: "Digite um valor e veja o equivalente em todas as unidades da categoria. Sem cadastro."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8 max-w-xl",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, {})
		}),
		recent.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium tracking-wide text-muted uppercase",
				children: "Recentes"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-wrap gap-2",
				children: recent.map((item) => {
					const category = getCategory(item.category);
					const from = category ? unitById(category, item.from) : void 0;
					const to = category ? unitById(category, item.to) : void 0;
					if (!category || !from || !to) return null;
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/c/$category",
						params: { category: item.category },
						search: {
							de: item.from,
							para: item.to
						},
						className: "inline-flex h-11 items-center rounded-full border border-line bg-card px-4 text-sm",
						children: [
							from.symbol,
							" → ",
							to.symbol
						]
					}) }, `${item.category}-${item.from}-${item.to}`);
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium tracking-wide text-muted uppercase",
				children: "Pares comuns"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 flex flex-wrap gap-2",
				children: popularPairs.map((pair) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/c/$category",
					params: { category: pair.category },
					search: {
						de: pair.from,
						para: pair.to
					},
					className: "inline-flex h-11 items-center rounded-full bg-brass-soft px-4 text-sm font-medium text-ink",
					children: pair.label
				}) }, pair.label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mt-10",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "text-sm font-medium tracking-wide text-muted uppercase",
				children: "Categorias"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3",
				children: categories.map((category) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/c/$category",
					params: { category: category.slug },
					search: {
						de: category.units[0]?.id,
						para: category.units[1]?.id
					},
					className: "flex h-full flex-col gap-3 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-brass",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-10 items-center justify-center rounded-xl bg-inset text-brass",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CategoryIcon, {
							name: category.icon,
							className: "size-5"
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block font-medium",
						children: category.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 block text-sm text-muted",
						children: category.blurb
					})] })]
				}) }, category.slug))
			})]
		})
	] });
}
//#endregion
export { Home as component };
