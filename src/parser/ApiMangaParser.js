import { cleanDescription } from '../utils';

const status = {
  1: 'Ongoing',
  2: 'Completed',
  3: 'Canceled',
  4: 'Hiatus',
};

const demographics = {
  1: 'Shounen',
  2: 'Shoujo',
  3: 'Seinen',
  4: 'Josei',
};

export const mangaDetailsParser = (mangaResponse) => {
  const manga = {};
  console.log('inside parser');
  manga.id = mangaResponse.id;
  manga.title = mangaResponse.title;
  manga.description = cleanDescription(mangaResponse.description);
  // manga.artist = mangaResponse.artist.join(', ');
  // manga.author = mangaResponse.author.join(', ');
  // console.log('author + artist', author + artist);
  const { author, artist } = mangaResponse;
  author.push(artist);
  const seenTemp = {};
  // filter same artist and author
  manga.authorAndArtist = author
    .filter((item) => {
      return seenTemp.hasOwnProperty(item) ? false : (seenTemp[item] = true);
    })
    .join(', ');
  manga.thumbnail_url = mangaResponse.mainCover;

  if (mangaResponse.publication) {
    manga.status = status[mangaResponse.publication.status]
      ? status[mangaResponse.publication.status]
      : 'Unknown';
    manga.demographics = demographics[mangaResponse.publication.demographic]
      ? demographics[mangaResponse.publication.demographic]
      : null;
  }

  if (mangaResponse.rating) {
    manga.rating = mangaResponse.rating.bayesian
      ? mangaResponse.rating.bayesian
      : mangaResponse.rating.mean;
    manga.users = mangaResponse.rating.users;
  }

  manga.views = mangaResponse.views;
  manga.follows = mangaResponse.follows;

  return manga;
};

//TODO only EN chapters for now
export const filterChapter = (chapters: Array) => {
  return chapters.filter((chapter) => chapter.language === 'gb');
};
