export function slugify(input: string): string {
  return input
    .toString()
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function withUniqueSuffix(base: string): string {
  return `${base}-${Math.random().toString(36).slice(2, 7)}`;
}
