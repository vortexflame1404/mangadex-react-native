export const chapterDetailsParser = (chapterResponse) => {
  let chapterObject;
  const {
    id,
    hash,
    mangaId,
    mangaTitle,
    volume,
    chapter,
    server,
    serverFallback,
    pages,
  } = chapterResponse;
  chapterObject = { id, hash, mangaId, mangaTitle, volume, chapter };

  const pagesUrl = [];
  const pagesUrlFallback = [];
  pages.forEach((item) => {
    pagesUrl.push(`${server}${hash}/${item}`);
    pagesUrlFallback.push(`${serverFallback}/${hash}/${item}`);
  });
  chapterObject.pagesUrl = pagesUrl;
  chapterObject.pagesUrlFallback = pagesUrlFallback;
  chapterObject.pageLength = pagesUrl.length;

  return chapterObject;
};
