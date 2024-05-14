export const STATUSES = ['active', 'inactive'] as const;

export type Status = typeof STATUSES[number];