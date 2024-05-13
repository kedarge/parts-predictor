import http from "../http-common";

class PartsPredatorService {
  get(options) {
    return http.get(`/predict/${options}`);
  }
}

export default PartsPredatorService();