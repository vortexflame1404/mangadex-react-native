import axios from 'axios';
import Strings from '../assets/Strings.js';
import {
  getRefreshToken,
  getSessionToken,
  setToken,
} from '../services/storage';

const mangadexAPI = axios.create({
  baseURL: Strings.apiUrl,
  timeout: 5000,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

mangadexAPI.interceptors.request.use(
  async (config) => {
    const session = await getSessionToken();
    if (session) {
      config.headers.common.Authorization = `Bearer ${session}`;
    }
    return config;
  },
  async (error) => {
    return Promise.reject(error);
  },
);

let isRefreshing = false;
let failedQueue = [];

const processQueue = (error, token = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

mangadexAPI.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token;
            return mangadexAPI(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      if (
        originalRequest.headers.Authorization !==
        'Bearer ' + getSessionToken()
      ) {
        originalRequest.headers.Authorization = 'Bearer ' + getSessionToken();
        return Promise.resolve(mangadexAPI(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      console.log('in refresh interceptor ');

      return new Promise(function (resolve, reject) {
        getRefreshToken()
          .then((res) => postRefreshToken(res))
          .then(({ data }) => setToken(data.token))
          .then((_) => getSessionToken())
          .then((session) => {
            processQueue(null, session);
            resolve(mangadexAPI(originalRequest));
          })
          .catch((err) => {
            console.log('in interceptor');
            processQueue(err, null);
            reject(err);
          })
          .finally(() => {
            isRefreshing = false;
          });
      });
    }

    return Promise.reject(error);
  },
);

export const postLogin = async (username, password) => {
  return await mangadexAPI.post('/auth/login', {
    username,
    password,
  });
};

export const getCheckToken = async () => {
  return await mangadexAPI.get('/auth/check');
};

export const postLogout = async () => {
  return await mangadexAPI.post('/auth/logout');
};

export const postRefreshToken = async (refresh) => {
  return await mangadexAPI.post('/auth/refresh', {
    token: refresh,
  });
};

export const getCurrentFollowedMangas = async () => {
  return await mangadexAPI.get('/user/follows/manga', {
    params: {
      limit: 100,
    },
  });
};

export const getMangaDetails = async (mangaId) => {
  return await mangadexAPI.get(`/manga/${mangaId}`);
};

export const getChaptersOfManga = async (
  mangaId,
  { limit, offset, translatedLanguage },
) => {
  return await mangadexAPI.get(`/manga/${mangaId}/feed`, {
    params: {
      limit,
      offset,
      translatedLanguage,
    },
  });
};

export const getBaseUrl = async (chapterId) => {
  return await mangadexAPI.get(`/at-home/server/${chapterId}`);
};

export const getAuthor = async (authorId) => {
  return await mangadexAPI.get(`/author/${authorId}`);
};

export const getCover = async (mangaId) => {
  return await mangadexAPI.get('/cover', {
    params: {
      manga: mangaId,
      order: {
        updatedAt: 'desc',
      },
    },
  });
};

export const getFollowedUpdates = async () => {
  return await mangadexAPI.get('/user/me/followed-updates', {
    params: {
      type: 1,
    },
  });
};
