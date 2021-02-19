import React, { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, List } from '@ui-kitten/components';
import { ChapterListItem } from '../../components/ChapterListItem';
import { MangaHeader } from '../../components/MangaHeader';
import { getChaptersOfManga, getMangaDetails } from '../../api/mangadex';
import { filterChapter, mangaDetailsParser } from '../../parser/ApiMangaParser';
import { LoadingCircle } from '../../components/LoadingCircle';
import { useDispatch, useSelector } from 'react-redux';
import { ErrorComponent } from '../../components/ErrorComponent';
import { setError } from '../../redux/errorsSlice';

const renderItem = ({ item }) => <ChapterListItem item={item} />;
const keyExtractor = ({ id }) => id.toString();

export default function MangaDetailScreen({ navigation, route }) {
  const { mangaId } = route.params;
  const [chapters, setChapters] = useState(null);
  const [manga, setManga] = useState(null);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors.message);
  const errorCode = useSelector((state) => state.errors.code);

  const renderHeader = () => <MangaHeader manga={manga} />;
  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const [responseManga, responseChapters] = await Promise.all([
          getMangaDetails(mangaId),
          getChaptersOfManga(mangaId),
        ]);
        setManga(mangaDetailsParser(responseManga.data.data));
        setChapters(filterChapter(responseChapters.data.data.chapters));
      } catch (e) {
        if (e.response) {
          const { status, data } = e.response;
          dispatch(setError({ code: status, message: 'Error w/ server' }));
          console.log(data);
        } else if (e.request) {
          dispatch(setError({ code: 503, message: 'internal app error' }));
          console.log(e.request);
        } else {
          console.log('errror', e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, [dispatch, mangaId]);

  const content = errorMessage ? (
    <ErrorComponent code={errorCode} message={errorMessage} />
  ) : (
    <List
      data={chapters}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      maxToRenderPerBatch={13}
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
