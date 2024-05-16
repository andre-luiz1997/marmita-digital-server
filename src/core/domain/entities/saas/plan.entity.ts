import { Entity } from "core/base";

export interface PlanPricing {
  /** The currency of the plan
   * @example USD, EUR, GBP
   */
  currency: string; 
  /** The amount to be billed in the smallest currency unit
   * @example 1000, 5000, 10000
   */
  amount: number; 
  /** The interval to be billed 
   * @example day, week, month, year
   */
  interval: string;
  /** The number of intervals between each billing cycle
   * @example 1, 2, 3, 4, 6, 12
   */
  intervalCount: number;
  /** The number of days that the customer has to trial the subscription before billing starts
   * @example 0, 7, 14, 30
   */
  trialPeriodDays: number; // 0, 7, 14, 30
}

export class PlanEntity extends Entity {
  public name: string;
  public description?: string;
  public featured?: boolean;
  public status: string;
  public pricing: PlanPricing;
  public createdAt: Date;
  public updatedAt?: Date;
  public deletedAt?: Date;
}