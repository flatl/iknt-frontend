import Vue from 'vue';
import { ApiController, Article, Response, ShortArticle, errorResponse, successResponse as successResponseType, typeCodes } from './../lib/api';

const codes: typeCodes = {
  success: 0,
  tokenExpired: 1,
  wrongToken: 2,
  incorrectData: 3,
  unknownError: 4,
}

const unknownErrorResponse: errorResponse = {
  success: false,
  error: codes.unknownError,
  message: 'Произошла неизвестная ошибка, попробуйте повторить позднее',
};

const successResponse: successResponseType = {
  success: true,
};

class ApiControllerImplementation implements ApiController {
  private cookies: any;
  private axios: any;
  private store: any;
  
  constructor ({ cookies, axios, store }) {
    this.cookies = cookies;
    this.axios = axios;
    this.store = store;
  }

  async isAuthed() {
    const url = `${process.env.apiUrl}/is_authed`;

    try {
      const response = await this.axios.$post(url);
      return response;
    } catch (e) {
      console.warn(e)
      return unknownErrorResponse;
    }
  }

  async auth(
    authData: { login: string, email: string, password: string }
  ): Response<{ token: string, expiredAt: string }> {
    const url = `${process.env.apiUrl}/login`;
    const { email, login, password } = authData;

    try {
      const response = await this.axios.$post(url, { login, email, password });
      return response;
    } catch (e) {
      console.warn(e);
      return unknownErrorResponse;
    }
  }

  async getArticles(limit: number): Response<ShortArticle[]> {
    const url = `${process.env.apiUrl}/articles?limit=${limit}`;

    try {
      const response = await this.axios.$get(url);
      return response;
    } catch (e) {
      console.warn(e);
      return unknownErrorResponse;
    }
  }

  async getArticle(id: number): Response<Article> {
    const url = `${process.env.apiUrl}/article/${id}`;

    try {
      const response = await this.axios.$get(url);
      return response;
    } catch (e) {
      console.warn(e);
      return unknownErrorResponse;
    }
  }

  async createArticle(article: Article): Response<{}> {
    const url = `${process.env.apiUrl}/article`;

    try {
      const response = await this.axios.$post(url, { article });
      return response;
    } catch (e) {
      console.warn(e);
      return unknownErrorResponse;
    }
  }

  async updateArticle(id: number, updatedFields: Partial<Article>): Response<{}> {
    const url = `${process.env.apiUrl}/article/${id}`;

    try {
      const response = await this.axios.$put(url, { updatedFields });
      return response;
    } catch (e) {
      console.warn(e);
      return unknownErrorResponse;
    }
  }

  async deleteArticle(id: number): Response<{}> {
    const url = `${process.env.apiUrl}/article/${id}`;

    try {
      const response = await this.axios.$delete(url);
      return response;
    } catch (e) {
      console.warn(e);
      return unknownErrorResponse;
    }
  }

  async addImages(formdata: FormData): Response<string[]> {
    const url = `${process.env.apiUrl}/images`;

    try {
      const response = await this.axios.$post(url, formdata, {
        'contentType': 'multipart/form-data'
      });
      return response;
    } catch (e) {
      console.warn(e);
      return unknownErrorResponse;
    }
  }
}

export default ({ store, app: { $cookies, $axios }, redirect }, inject) => {
  const apiController = new ApiControllerImplementation({
    cookies: $cookies,
    store: store,
    axios: $axios,
  });

  inject('api', Vue.observable(apiController));
};
