import { Article } from '../../lib/api';
import { ActionContext, ActionPayload } from 'vuex';

export interface State {
  list: Array<Article>;
}

export interface Actions {
  getNews(
    ctx: ActionContext<State, undefined>,
    payload: ActionPayload
  ): Promise<true | false>;
}

export interface Getters {
  list(state: State): State["list"]
}
