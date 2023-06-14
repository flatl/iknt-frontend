import { State, Actions, Getters } from './models';
import { mockArticles } from './mock';
import { Article } from '../../lib/api';


export const state: () => State = () => ({
  list: [],
});

export const actions: Actions = {
  getNews(ctx, payload) {
    return new Promise((resolve, reject) => {
      setTimeout(() =>
        ctx.commit('setNews', mockArticles)
      );

      resolve(true);
    });
  },
};

export const mutations = {
  setNews(state: State, news: Array<Article>) {
    state.list = news;
  },
};

export const getters: Getters = {
  list(state: State) {
    return state.list;
  },
};
