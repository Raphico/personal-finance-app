import { http } from "@/lib/http";

export class Crud {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  getList(params = null) {
    return http.get(this.baseUrl, { params });
  }

  addItem(params = null) {
    return http.post(this.baseUrl, { params });
  }

  deleteItem(id, params) {
    return http.delete(this.baseUrl + `/${id}`, { params });
  }

  updateItem(id, params) {
    return http.patch(this.baseUrl + `/${id}`, { params });
  }
}
