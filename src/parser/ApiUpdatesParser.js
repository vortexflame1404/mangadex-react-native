import { calculateDistanceFromTimestampToNow } from '../utils';
import { fromUnixTime, set, getUnixTime } from 'date-fns';

export const followedUpdatesParser = (data) => {
  const { chapters, manga } = data;

  const followedUpdatesTempHolder = {};
  chapters.forEach((chapter) => {
    // set date of timestamp to 0 hour, minute,... for comparison
    chapter.thumbnail_url = manga[chapter.mangaId].mainCover;
    const dateUploadedString = getUnixTime(
      set(fromUnixTime(chapter.timestamp), {
        hours: 0,
        minutes: 0,
        seconds: 0,
        milliseconds: 0,
      }),
    );
    if (followedUpdatesTempHolder[dateUploadedString]) {
      followedUpdatesTempHolder[dateUploadedString].data.push(chapter);
    } else {
      followedUpdatesTempHolder[dateUploadedString] = {
        title: calculateDistanceFromTimestampToNow(dateUploadedString),
        data: [chapter],
      };
    }
  });

  const followedUpdatesParsed = [];
  const sortedKey = Object.keys(followedUpdatesTempHolder).sort(
    (a, b) => parseInt(b, 10) - parseInt(a, 10),
  );
  for (let key of sortedKey) {
    followedUpdatesParsed.push(followedUpdatesTempHolder[key]);
  }
  return followedUpdatesParsed;
};
