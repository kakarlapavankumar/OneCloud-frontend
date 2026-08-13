export function formatDate(date: string): string {
  if (!date) return "-";

  return new Date(date).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

export function getToday(): string {
  return new Date().toISOString().split("T")[0];
}

export function calculateDays(from: string, to: string): number {
  const start = new Date(from);
  const end = new Date(to);

  const difference = end.getTime() - start.getTime();

  return Math.floor(difference / (1000 * 60 * 60 * 24)) + 1;
}
