export function listAllTags(items: Array<{ meta: { tags: string[] } }>): string[] {
  const set = new Set<string>();
  for (const item of items) {
    for (const t of item.meta.tags) set.add(t);
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}
