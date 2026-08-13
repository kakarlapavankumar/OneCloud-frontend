export type Status = "Active" | "Inactive";

export interface SelectOption {
  label: string;
  value: string;
}

export interface DashboardStat {
  title: string;
  value: number | string;
  description?: string;
}
