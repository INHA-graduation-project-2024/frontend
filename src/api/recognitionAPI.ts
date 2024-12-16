import BaseApi from "./axiosInstance";

export default class recognitionAPI extends BaseApi {
  async join(formData: FormData) {
    const resp = await this.fetcher.post("/join", formData);

    return resp.data;
  }
}
