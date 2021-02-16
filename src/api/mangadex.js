import axios from 'axios';
import Strings from '../assets/Strings.js';

const mangadexAPI = axios.create({
  baseURL: Strings.apiUrl,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
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

export const getCurrentFollowedMangas = async () => {
  return await mangadexAPI.get('/user/me/followed-manga', {
    params: {
      type: 1,
    },
  });
};

export const getMangaDetails = async (mangaId) => {
  return await mangadexAPI.get(`/manga/${mangaId}`);
};

export const getChaptersOfManga = async (mangaId) => {
  return await mangadexAPI.get(`/manga/${mangaId}/chapters`);
};

export const getChapterDetails = async (chapterId) => {
  return await mangadexAPI.get(`/chapter/${chapterId}`, {
    params: {
      mark_read: false,
    },
  });
};

export const postSetChapterToRead = async (chapterId) => {
  return await mangadexAPI.post('/user/me/marker', {
    chapters: [chapterId],
    read: true,
  });
};

export const getFollowedUpdates = async () => {
  return await mangadexAPI.get('/user/me/followed-updates', {
    params: {
      type: 1,
    },
  });
};

export const postLogout = async () =>
  await mangadexAPI.post(
    'https://mangadex.org/ajax/actions.ajax.php?function=logout',
  );
