import { http } from "@/lib/http";
import { Crud } from "./crud";

class Pots extends Crud {
  constructor() {
    super("pots");
  }

  getTotalSaved() {
    return http.get(`${this.baseUrl}/total`);
  }
}

export const pots = new Pots();
