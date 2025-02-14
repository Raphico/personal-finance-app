import { http } from "@/lib/http";
import { Crud } from "./crud";

class Budgets extends Crud {
  constructor() {
    super("budgets");
  }

  getBudgetsSummary() {
    return http.get(`${this.baseUrl}/summary`);
  }
}

export const budgets = new Budgets();
