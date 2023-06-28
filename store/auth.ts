export const state = () => ({
  isAuthed: false,
  token: '',
});

export const actions = {
  authenticate({ commit }, { token, expiredAt }) {
    const maxAge = (new Date(expiredAt).getTime() - new Date().getTime()) / 1000;
    this.$cookies.set('token', token, {
      path: process.env.apiUrl,
      maxAge,
    });
    commit('setToken', token);
    commit('setIsAuthed', true);
  },
};

export const mutations = {
  setIsAuthed(state, value) {
    state.isAuthed = value;
  },

  setToken(state, token) {
    state.token = token;
  },
};

export const getters = {
  isAuthed(state) {
    return state.isAuthed;
  },
};
