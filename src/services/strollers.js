import axios from "axios";

class ApiClient {
  constructor() {
    this.apiClient = axios.create({
      baseURL: "http://localhost:3000/",
    });
  }
  getAllStrollers() {
    return this.apiClient.get("/strollers");
  }

  getOneStroller(id) {
    return this.apiClient.get("/strollers/detail", id);
  }

  createStroller(body) {
    return this.apiClient.post("/strollers", body);
  }
  
  updateStroller(body) {
    return this.apiClient.post("/strollers/update", body);
  }
}

const apiClient = new ApiClient();
export default apiClient;
