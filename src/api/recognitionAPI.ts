import BaseApi from "./axiosInstance";

export default class recognitionAPI extends BaseApi {
  async join(formData: FormData) {
    const resp = await this.fetcher.post("/join", formData);

    return resp;
  }

  async passive(formData: FormData) {
    const resp = await this.fetcher.post("/passive", formData);

    return resp;
  }

  async faceRecognition(formData: FormData) {
    const resp = await this.fetcher.post("/face-recognition", formData);

    return resp;
  }

  async active(formData: FormData) {
    const resp = await this.fetcher.post("/active", formData);

    return resp;
  }
}
