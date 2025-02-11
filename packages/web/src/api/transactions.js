import { http } from "@/lib/http";
import { Crud } from "./crud";

class Transactions extends Crud {
  constructor() {
    super("transactions");
  }

  getRecurringBills() {
    return http.get(`${this.baseUrl}/recurring-bills`);
  }

  getSummary() {
    return http.get(`${this.baseUrl}/summary`);
  }
}

export const transactions = new Transactions();
