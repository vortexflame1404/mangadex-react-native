import axios from 'axios';
import Strings from '../assets/Strings.js';

const mangadexAPI = axios.create({
  baseURL: Strings.apiUrl,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
});

export function setCookieApi(cookie) {
  mangadexAPI.defaults.headers.common.cookie = cookie;
  mangadexAPI.defaults.withCredentials = true;
}

export const postLogin = async (username, password, remember_me) => {
  const formData = new FormData();
  formData.append('login_username', username);
  formData.append('login_password', password);
  formData.append('no_js', 1);
  formData.append('remember_me', remember_me);

  return await mangadexAPI.post(
    'https://mangadex.org/ajax/actions.ajax.php?function=login',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
};

export const getFollowedMangas = async () => {
  return await mangadexAPI.get('/user/me/followed-manga');
};

export const getMangaDetails = async (mangaId) => {
  return await mangadexAPI.get(`/manga/${mangaId}`);
};

export const getChaptersOfManga = async (mangaId) => {
  return await mangadexAPI.get(`/manga/${mangaId}/chapters`);
};

export const getFollowedUpdates = async () => {
  return await mangadexAPI.get('/user/me/followed-updates');
};

export const postLogout = async () =>
  await mangadexAPI.post(
    'https://mangadex.org/ajax/actions.ajax.php?function=logout',
  );
