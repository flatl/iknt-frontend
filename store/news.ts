import { State, Actions, Getters } from '../lib/store/news/models';
import { mockArticles } from '../lib/store/news/mock';
import { Article } from '../lib/api';


export const state: () => State = () => ({
  list: [],
});

export const actions = {
  setNews({ commit }, news) {
    commit('setNews', news);
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
