import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, List } from '@ui-kitten/components';
import { ChapterListItem } from '../../components/ChapterListItem';
import { MangaHeader } from '../../components/MangaHeader';
import { getChaptersOfManga, getMangaDetails } from '../../api/mangadex';
import { filterChapter, mangaDetailsParser } from '../../parser/ApiMangaParser';
import { LoadingCircle } from '../../components/LoadingCircle';
import { useSelector } from 'react-redux';
import { ErrorComponent } from '../../components/ErrorComponent';

const renderItem = ({ item }) => <ChapterListItem item={item} />;

export default function MangaDetailScreen({ navigation, route }) {
  const { mangaId } = route.params;
  const [chapters, setChapters] = useState(null);
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);
  const errorMessage = useSelector((state) => state.errors.message);
  const errorCode = useSelector((state) => state.errors.code);

  const renderHeader = () => <MangaHeader manga={manga} />;
  useEffect(() => {
    const detailsOfManga = async () => {
      try {
        setLoading(true);
        const [responseManga, responseChapters] = await Promise.all([
          getMangaDetails(mangaId),
          getChaptersOfManga(mangaId),
        ]);
        setManga(mangaDetailsParser(responseManga.data.data));
        setChapters(filterChapter(responseChapters.data.data.chapters));
        setLoading(false);
      } catch (e) {
        if (e.response) {
          console.log(e.response.data);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.error(e.message);
        }
      }
    };

    detailsOfManga();
  }, [mangaId]);

  const content = errorMessage ? (
    <ErrorComponent code={errorCode} message={errorMessage} />
  ) : (
    <List
      data={chapters}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      keyExtractor={(item) => item.id.toString()}
      ListHeaderComponent={renderHeader}
    />
  );

  return (
    <Layout style={styles.container}>
      {loading ? <LoadingCircle /> : content}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
