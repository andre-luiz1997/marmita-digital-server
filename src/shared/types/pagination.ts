export type FilterOperators = 'LIKE' | 'NOT LIKE' | 
'GREATER THAN' | 'GREATER THAN OR EQUAL' | 
'LESS THAN' | 'LESS THAN OR EQUAL' |
'IN' | 'NOT IN' | 
'IS NULL' | 'IS NOT NULL' |
'BETWEEN' | '%%' | '%_' | '_%';

export interface PaginationFilter {
  fields: string[];
  value: string | string[] | number | number[] | Date | Date[];
  operator: FilterOperators;
}

export interface PaginationProps {
  skip?: number;
  limit?: number;
  sortBy?: string | string[];
  sortOrder?: number | number[];
  globalFilter?: string | string[];
  filters?: PaginationFilter[];
}