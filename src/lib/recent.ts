export type RecentPair = {
  category: string;
  from: string;
  to: string;
};

const KEY = "medida-recent";

export function readRecent(): RecentPair[] {
  if (typeof localStorage === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(
        (item): item is RecentPair =>
          !!item &&
          typeof item === "object" &&
          typeof (item as RecentPair).category === "string" &&
          typeof (item as RecentPair).from === "string" &&
          typeof (item as RecentPair).to === "string",
      )
      .slice(0, 6);
  } catch {
    return [];
  }
}

export function pushRecent(item: RecentPair) {
  if (typeof localStorage === "undefined") return;
  const prev = readRecent().filter(
    (entry) =>
      !(
        entry.category === item.category &&
        entry.from === item.from &&
        entry.to === item.to
      ),
  );
  localStorage.setItem(KEY, JSON.stringify([item, ...prev].slice(0, 6)));
}
