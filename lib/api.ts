export type SUCCESS_ERROR_CODE = 0;
export type TOKEN_EXPIRED_ERROR_CODE = 1;
export type WRONG_TOKEN_ERROR_CODE = 2;
export type INCORRECT_DATA_ERROR_CODE = 3;
export type UNKNOWN_ERROR_CODE = 4;

export type typeCodes = {
  success: SUCCESS_ERROR_CODE,
  tokenExpired: TOKEN_EXPIRED_ERROR_CODE,
  wrongToken: WRONG_TOKEN_ERROR_CODE,
  incorrectData: INCORRECT_DATA_ERROR_CODE,
  unknownError: UNKNOWN_ERROR_CODE,
};

export type successResponse = {
  success: true,
  error?: SUCCESS_ERROR_CODE
};

export type errorResponse = {
  success: false,
  message: string,
  error: (
    TOKEN_EXPIRED_ERROR_CODE |
    WRONG_TOKEN_ERROR_CODE |
    INCORRECT_DATA_ERROR_CODE |
    UNKNOWN_ERROR_CODE
  )
};

export type Response<T> = Promise<(successResponse & { data: T }) | errorResponse>;

export interface Comment {
  id: number
  author_name: string
  text: string
}

export interface Article {
  id: number
  title: string
  author: string
  datetime: string
  content: string
  comments: Array<Comment>
}

export type ShortArticle = Exclude<Article, 'content' | 'comments'>;

export interface ApiController {
  /* Тестовый метод для проверки на авторизованность */
  isAuthed(): Response<{}>;

  /* метод авторизации */
  auth(authData: { login?: string, email?: string, password: string }): Response<{ token: string, expiredAt: string }>;

  /* получение новостей */
  getArticles(limit: number): Response<Array<ShortArticle>>;

  /* получение статьи по id */
  getArticle(id: number): Response<Article>;

  /* создание новости */
  createArticle(article: Article): Response<{}>;

  /* модификация новости */
  updateArticle(id: number, updatedFields: Partial<Article>): Response<{}>;

  /* удаление новости */
  deleteArticle(id: number): Response<{}>;

  /**
   * добавление изображений на сервер
   * @returns массив относительных путей изображений
  */
  addImages(formdata: FormData): Response<Array<string>>;
}
