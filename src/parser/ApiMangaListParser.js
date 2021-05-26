import { cleanDescription, wait } from '../utils';
import { getCover } from '../api/mangadex';
import Strings from '../assets/Strings';

export const apiMangaListParser = async (results) => {
  const mangaListWOUri = results
    .map(({ data, relationships }) => {
      const { id, attributes } = data;
      const { title, description, ...other } = attributes;
      const author = relationships.find((item) => item.type === 'author');
      const artist = relationships.find((item) => item.type === 'artist');
      const cover = relationships.find((item) => item.type === 'cover_art');
      return {
        uri: '',
        title: title.en,
        mangaId: id,
        description: cleanDescription(description.en),
        other,
        cover: cover.id,
        author: author.id,
        artist: artist.id,
      };
    })
    .sort((a, b) => a.title.localeCompare(b.title));

  const mangaList = [];
  for (let manga of mangaListWOUri) {
    await wait(205);
    const { cover, mangaId } = manga;
    let filename;
    try {
      const response = await getCover(cover);
      filename = response.data.data.attributes.fileName;
    } catch (e) {
      console.log('manga list parse');
      if (e.request) {
        console.log(e.request);
      } else if (e.response) {
        console.log(e.response);
      }
    }

    mangaList.push({
      ...manga,
      uri: `${Strings.coverUrl}${mangaId}/${filename}`,
    });
  }
  return mangaList;
};
