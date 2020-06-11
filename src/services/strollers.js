import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "https://rollbabyroll.herokuapp.com/",
    });
  }
  getAllStrollers() {
    return this.apiClient.get("/strollers");
  }

  getOneStroller(id) {
    return this.apiClient.get(`/strollers/detail/${id}`);
  }

  createStroller(body) {
    return this.apiClient.post("/strollers", body);
  }

  deleteStroller(id) {
    return this.apiClient.delete(`/strollers/delete/${id}`)
  }
  
  updateStroller(body) {
    return this.apiClient.post("/strollers/update", body);
  }
}

const apiClient = new ApiClient();
export default apiClient;
