import { i as __toESM } from "../_runtime.mjs";
import { a as parseInput, c as toBase, i as getCategory, l as unitById, n as formatValue, r as fromBase } from "./units-P0HrdJCd.mjs";
import { J as require_react, S as require_jsx_runtime, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { S as ArrowLeftRight, g as Copy, v as ChevronDown, y as Check } from "../_libs/lucide-react.mjs";
import { n as Route } from "./router-BYNgCkY2.mjs";
import { n as pushRecent, t as SearchPanel } from "./recent-DlkFBP_F.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/c._category-Dtb-PhHE.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var DIGIT_OPTIONS = [
	{
		id: "auto",
		label: "Auto"
	},
	{
		id: 0,
		label: "0"
	},
	{
		id: 2,
		label: "2"
	},
	{
		id: 4,
		label: "4"
	},
	{
		id: 6,
		label: "6"
	}
];
function Converter({ category, fromId, toId, onFrom, onTo }) {
	const from = category.units.find((unit) => unit.id === fromId) ?? category.units[0];
	const to = category.units.find((unit) => unit.id === toId) ?? category.units.find((unit) => unit.id !== from.id) ?? from;
	const [base, setBase] = (0, import_react.useState)(() => toBase(from, 1));
	const [digits, setDigits] = (0, import_react.useState)("auto");
	const [focus, setFocus] = (0, import_react.useState)(null);
	const [draft, setDraft] = (0, import_react.useState)("1");
	const [copied, setCopied] = (0, import_react.useState)(null);
	(0, import_react.useEffect)(() => {
		if (!copied) return;
		const timer = window.setTimeout(() => setCopied(null), 1400);
		return () => window.clearTimeout(timer);
	}, [copied]);
	function shown(unit, side) {
		if (focus === side) return draft;
		if (base == null) return "";
		return formatValue(fromBase(unit, base), digits, false);
	}
	function edit(side, raw, unit) {
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
	function changeFrom(id) {
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
	const one = base == null ? null : fromBase(to, toBase(from, 1) ?? NaN);
	const relation = one == null ? null : `1 ${from.name.toLowerCase()} = ${formatValue(one, "auto")} ${to.symbol}`;
	async function copy(id, text) {
		try {
			await navigator.clipboard.writeText(text);
			setCopied(id);
		} catch {
			setCopied(null);
		}
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-6",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "rounded-2xl border border-line bg-card p-4 sm:p-6",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "De",
					value: shown(from, "from"),
					unit: from,
					units: category.units,
					onValue: (raw) => edit("from", raw, from),
					onFocus: () => {
						setFocus("from");
						setDraft(shown(from, "from"));
					},
					onBlur: () => setFocus((current) => current === "from" ? null : current),
					onUnit: changeFrom
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "flex flex-wrap items-center gap-3 py-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: swap,
						className: "flex h-11 items-center gap-2 rounded-full border border-line bg-inset px-4 text-sm font-medium text-ink",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeftRight, {
							className: "size-4",
							strokeWidth: 1.75
						}), "Inverter"]
					}), relation && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted",
						children: relation
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Para",
					value: shown(to, "to"),
					unit: to,
					units: category.units,
					onValue: (raw) => edit("to", raw, to),
					onFocus: () => {
						setFocus("to");
						setDraft(shown(to, "to"));
					},
					onBlur: () => setFocus((current) => current === "to" ? null : current),
					onUnit: (id) => onTo(id)
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-5 flex flex-wrap items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mr-1 text-sm text-muted",
						children: "Casas"
					}), DIGIT_OPTIONS.map((option) => {
						const selected = digits === option.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							"aria-pressed": selected,
							onClick: () => setDigits(option.id),
							className: "h-10 min-w-10 rounded-full px-3 text-sm font-medium " + (selected ? "bg-brass text-on-brass" : "bg-inset text-ink"),
							children: option.label
						}, String(option.id));
					})]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-serif text-2xl tracking-tight",
				children: "Todas as unidades"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-sm text-muted",
				children: "Toque uma linha para usá-la como destino."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-3 overflow-hidden rounded-2xl border border-line",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
					className: "w-full table-fixed border-collapse text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("caption", {
							className: "sr-only",
							children: ["Valor convertido em cada unidade de ", category.name]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
							className: "border-b border-line bg-inset text-sm text-muted",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-[46%] px-4 py-3 font-medium",
									children: "Unidade"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "px-4 py-3 font-medium",
									children: "Valor"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
									className: "w-14 px-2 py-3",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: "Copiar"
									})
								})
							]
						}) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: category.units.map((unit) => {
							const value = base == null ? null : fromBase(unit, base);
							const text = formatValue(value, digits);
							const active = unit.id === to.id;
							const copyText = value == null ? "" : `${text} ${unit.symbol}`;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
								className: "border-b border-line last:border-b-0 " + (active ? "bg-brass-soft" : "bg-card"),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											onClick: () => onTo(unit.id),
											className: "flex min-h-11 w-full flex-col items-start justify-center py-1 text-left",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "font-medium break-words",
												children: unit.name
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "text-sm text-muted",
												children: unit.symbol
											})]
										})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-4 py-3 font-medium tabular-nums",
										children: text
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
										className: "px-2 py-1",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
											type: "button",
											disabled: value == null,
											"aria-label": `Copiar ${unit.name}`,
											onClick: () => copy(unit.id, copyText),
											className: "flex size-11 items-center justify-center rounded-full text-muted hover:text-ink disabled:opacity-40",
											children: copied === unit.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
												className: "size-4 text-brass",
												strokeWidth: 1.75
											}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Copy, {
												className: "size-4",
												strokeWidth: 1.75
											})
										})
									})
								]
							}, unit.id);
						}) })
					]
				})
			})
		] })]
	});
}
function Field({ label, value, unit, units, onValue, onFocus, onBlur, onUnit }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col gap-2 sm:flex-row sm:items-end",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "block min-w-0 flex-1",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block text-sm text-muted",
				children: label
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				inputMode: "decimal",
				autoComplete: "off",
				value,
				"aria-label": label,
				onChange: (event) => onValue(event.target.value),
				onFocus,
				onBlur,
				className: "h-14 w-full rounded-2xl border border-line bg-inset px-4 font-serif text-3xl tracking-tight text-ink tabular-nums outline-none"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UnitMenu, {
			units,
			selected: unit,
			onSelect: onUnit
		})]
	});
}
function UnitMenu({ units, selected, onSelect }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const root = (0, import_react.useRef)(null);
	const listId = (0, import_react.useId)();
	const needle = query.trim().toLowerCase();
	const visible = units.filter((unit) => {
		if (!needle) return true;
		return `${unit.name} ${unit.symbol} ${unit.aliases.join(" ")}`.toLowerCase().includes(needle);
	});
	(0, import_react.useEffect)(() => {
		function onPointer(event) {
			if (!root.current?.contains(event.target)) setOpen(false);
		}
		document.addEventListener("pointerdown", onPointer);
		return () => document.removeEventListener("pointerdown", onPointer);
	}, []);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		ref: root,
		className: "relative sm:w-52",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mb-1 block text-sm text-muted",
				children: "Unidade"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				"aria-expanded": open,
				"aria-controls": listId,
				onClick: () => {
					setOpen((current) => !current);
					setQuery("");
				},
				className: "flex h-14 w-full items-center justify-between gap-2 rounded-2xl border border-line bg-card px-4 text-left",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "min-w-0",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block truncate font-medium",
						children: selected.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "block text-sm text-muted",
						children: selected.symbol
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
					className: "size-4 shrink-0 text-muted",
					strokeWidth: 1.75
				})]
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				id: listId,
				className: "absolute right-0 z-30 mt-2 w-full min-w-56 overflow-hidden rounded-2xl border border-line bg-card sm:w-72",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					value: query,
					placeholder: "Filtrar",
					"aria-label": "Filtrar unidades",
					onChange: (event) => setQuery(event.target.value),
					className: "h-11 w-full border-b border-line bg-card px-3 text-base outline-none"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "max-h-64 overflow-auto py-1",
					role: "listbox",
					children: visible.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
						className: "px-3 py-3 text-sm text-muted",
						children: "Nada encontrado."
					}) : visible.map((unit) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						role: "option",
						"aria-selected": unit.id === selected.id,
						onClick: () => {
							onSelect(unit.id);
							setOpen(false);
						},
						className: "flex min-h-11 w-full items-center justify-between gap-3 px-3 text-left " + (unit.id === selected.id ? "bg-brass-soft" : "hover:bg-inset"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: unit.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-sm text-muted",
							children: unit.symbol
						})]
					}) }, unit.id))
				})]
			})
		]
	});
}
function CategoryPage() {
	const { category: slug } = Route.useParams();
	const search = Route.useSearch();
	const category = getCategory(slug);
	if (!category) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
			className: "font-serif text-4xl tracking-tight",
			children: "Categoria não encontrada"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 text-muted",
			children: "Esse endereço não corresponde a uma unidade."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
			to: "/",
			className: "mt-6 inline-flex h-11 items-center font-medium text-brass",
			children: "Voltar ao início"
		})
	] });
	const initialFrom = unitById(category, search.de)?.id ?? category.units[0].id;
	const fallbackTo = category.units.find((unit) => unit.id !== initialFrom)?.id ?? initialFrom;
	const initialTo = unitById(category, search.para)?.id ?? fallbackTo;
	const urlKey = `${category.slug}:${search.de ?? ""}:${search.para ?? ""}`;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "max-w-xl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchPanel, { variant: "compact" })
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pair, {
		slug: category.slug,
		initialFrom,
		initialTo: initialTo === initialFrom ? fallbackTo : initialTo
	}, urlKey)] });
}
function Pair({ slug, initialFrom, initialTo }) {
	const category = getCategory(slug);
	const [fromId, setFromId] = (0, import_react.useState)(initialFrom);
	const [toId, setToId] = (0, import_react.useState)(initialTo);
	const from = unitById(category, fromId) ?? category.units[0];
	const to = unitById(category, toId) ?? category.units[1] ?? from;
	(0, import_react.useEffect)(() => {
		pushRecent({
			category: slug,
			from: from.id,
			to: to.id
		});
	}, [
		slug,
		from.id,
		to.id
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-8 text-sm font-medium tracking-wide text-brass uppercase",
			children: category.name
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
			className: "mt-2 font-serif text-4xl tracking-tight sm:text-5xl",
			children: [
				from.name,
				" para ",
				to.name
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-3 max-w-xl text-muted",
			children: category.blurb
		}),
		category.note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mt-2 max-w-xl text-sm text-muted",
			children: category.note
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-8",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Converter, {
				category,
				fromId: from.id,
				toId: to.id,
				onFrom: setFromId,
				onTo: setToId
			})
		})
	] });
}
//#endregion
export { CategoryPage as component };
