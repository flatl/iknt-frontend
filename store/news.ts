import { State, Actions, Getters } from '../lib/store/news/models';
import { mockArticles } from '../lib/store/news/mock';
import { Article } from '../lib/api';


export const state: () => State = () => ({
  list: [],
});

export const actions: Actions = {
  getNews({ commit }, payload) {
    return new Promise((resolve, reject) => {
      commit('setNews', mockArticles);
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
