import axios from "axios";

export default class BaseApi {
  fetcher;

  constructor(url: string) {
    axios.defaults.withCredentials = true;
    this.fetcher = axios.create({
      baseURL: url + "/api",
      withCredentials: true,
      // headers: {
      //     "Content-Type": "application/json",
      //   },
    });
    // token 관련 interceptors 필요 시 코드 추가

    //인터셉터 -> 로그인 안함!!
    // this.fetcher.interceptors.response.use(
    //   (response: AxiosResponse) => response,
    //   (error: AxiosError) => {
    //     if (error.response && error.response.status === 401) {
    //       // 401 에러인 경우
    //     }
    //     return Promise.reject(error);
    //   }
    // );
  }
}
