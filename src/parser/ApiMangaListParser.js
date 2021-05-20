import { cleanDescription } from '../utils';

export const apiMangaListParser = (results) => {
  return results.map(({ data }) => {
    const { id, attributes } = data;
    const { title, description, ...other } = attributes;
    const idImage = Math.floor(Math.random() * (1000 - 100) + 100);
    return {
      uri: `https://picsum.photos/id/${idImage}/1600/2560`,
      title: title.en,
      mangaId: id,
      description: cleanDescription(description.en),
      other,
    };
  });
};
