import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { Divider, Layout, List } from '@ui-kitten/components';
import { ChapterListItem } from '../../components/ChapterListItem';
import { MangaHeader } from '../../components/MangaHeader';
import { LoadingCircle } from '../../components/LoadingCircle';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChapterList,
  selectChapterList,
  selectIsFetchingChapters,
} from '../../redux/chapterSlice';
import { setSelectedManga } from '../../redux/mangaSlice';

const renderItem = ({ item }) => <ChapterListItem item={item} />;
const keyExtractor = ({ chapterId }) => chapterId.toString();

export default function MangaDetailScreen({ navigation, route }) {
  const { mangaId, description, other, title, uri } = route.params;
  const chapters = useSelector(selectChapterList);
  const loading = useSelector(selectIsFetchingChapters);

  const dispatch = useDispatch();

  const renderHeader = () => (
    <MangaHeader manga={{ description, other, title, uri }} />
  );

  useEffect(() => {
    dispatch(setSelectedManga({ mangaId }));
  }, [dispatch, mangaId]);

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(
          getChapterList({ mangaId, limit: 100, offset: 0, locales: ['en'] }),
        );
      } catch (e) {
        console.log('mangadetails get chapter', e);
      }
    };

    getData();
  }, [dispatch, mangaId]);

  const content = (
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
