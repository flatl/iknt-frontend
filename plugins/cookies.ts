import { Response, typeCodes } from './../lib/api';

const codes: typeCodes = {
  success: 0,
  tokenExpired: 1,
  wrongToken: 2,
  incorrectData: 3,
  unknownError: 4,
};

export default ({ store, app: { $cookies, $axios }, redirect }, inject) => {
  $axios.onRequest((config) => {
    const token = $cookies.get('token') || store.getters['auth/token'] || '';
    config.headers.Authorization = token;
    return config;
  });

  $axios.onResponse((response: { data: Awaited<Response<{}>> }) => {
    const code = response.data.error;

    switch(code) {
      case codes.tokenExpired:
      case codes.wrongToken:
        return redirect('/login');
      default:
        return;
    }
  });
};
