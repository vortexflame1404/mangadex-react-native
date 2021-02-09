import { cleanDescription } from '../utils';

const status = {
  1: 'Ongoing',
  2: 'Completed',
  3: 'Canceled',
  4: 'Hiatus',
};

const followTypes = {
  1: 'Reading',
  2: 'Completed',
  3: 'On hold',
  4: 'Plan to read',
  5: 'Dropped',
  6: 'Re-reading',
};

const demographics = {
  1: 'Shounen',
  2: 'Shoujo',
  3: 'Seinen',
  4: 'Josei',
};

export const mangaDetailsParser = (mangaResponse) => {
  const mangaObject = {};
  mangaObject.id = mangaResponse.id;
  mangaObject.title = mangaResponse.title;
  mangaObject.description = cleanDescription(mangaResponse.description);
  const { author, artist } = mangaResponse;
  author.push(artist);
  const seenTemp = {};
  // filter same artist and author
  mangaObject.authorAndArtist = author
    .filter((item) => {
      return seenTemp.hasOwnProperty(item) ? false : (seenTemp[item] = true);
    })
    .join(', ');
  mangaObject.thumbnail_url = mangaResponse.mainCover;

  if (mangaResponse.publication) {
    mangaObject.status = status[mangaResponse.publication.status]
      ? status[mangaResponse.publication.status]
      : 'Unknown';
    mangaObject.demographics = demographics[
      mangaResponse.publication.demographic
    ]
      ? demographics[mangaResponse.publication.demographic]
      : null;
  }

  if (mangaResponse.rating) {
    mangaObject.rating = mangaResponse.rating.bayesian
      ? mangaResponse.rating.bayesian
      : mangaResponse.rating.mean;
    mangaObject.users = mangaResponse.rating.users;
  }

  mangaObject.views = mangaResponse.views;
  mangaObject.follows = mangaResponse.follows;

  return mangaObject;
};

//TODO only EN chapters for now
export const filterChapter = (chapters: Array) => {
  return chapters.filter((chapter) => chapter.language === 'gb');
};
