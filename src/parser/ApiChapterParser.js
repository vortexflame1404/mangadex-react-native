// sample https://abcdefg.hijklmn.mangadex.network:12345/some-token/data/e199c7d73af7a58e8a4d0263f03db660/x1-b765e86d5ecbc932cf3f517a8604f6ac6d8a7f379b0277a117dc7c09c53d041e.png
import { getBaseUrl } from '../api/mangadex';

export const chapterDetailsParser = async (chapterId, hash, urls) => {
  try {
    const { baseUrl } = (await getBaseUrl(chapterId)).data;
    const pagesUrl = urls.map((item) => {
      return `${baseUrl}/data/${hash}/${item}`;
    });
    return {
      pagesUrl,
      pageLength: pagesUrl.length,
    };
  } catch (e) {
    return Promise.reject(e);
  }
};
