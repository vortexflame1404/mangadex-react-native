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

export const chapterListParser = (results) => {
  return results.map((item) => {
    const { relationships } = item;
    const { id, attributes } = item.data;
    const {
      volume,
      chapter,
      title,
      translatedLanguage,
      updatedAt,
      hash,
      data,
      dataSaver,
    } = attributes;
    const mangaId = relationships.find((i) => i.type === 'manga').id;
    return {
      chapterId: id,
      mangaId,
      volume,
      chapter,
      title,
      translatedLanguage,
      updatedAt,
      data,
      dataSaver,
      hash,
    };
  });
};

export const chapterListParserWithSort = (data) => {
  const res = chapterListParser(data);
  return res.sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt));
};
