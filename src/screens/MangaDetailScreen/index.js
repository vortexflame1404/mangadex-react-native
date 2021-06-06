import React, { useCallback, useEffect } from 'react';
import { FlatList, StyleSheet, ToastAndroid } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { ChapterListItem } from '../../components/ChapterListItem';
import { MangaHeader } from '../../components/MangaHeader';
import { LoadingCircle } from '../../components/LoadingCircle';
import { useDispatch, useSelector } from 'react-redux';
import {
  clearChapterList,
  getChapterList,
  selectChapterList,
  selectChapterListLength,
  selectChapterListTotal,
  selectIsFetchingChapters,
} from '../../redux/chapterSlice';
import { setSelectedManga } from '../../redux/mangaSlice';
import { listItemHeight } from '../../utils';

const renderItem = ({ item }) => <ChapterListItem item={item} />;
const keyExtractor = ({ chapterId }) => chapterId;

export default function MangaDetailScreen({ navigation, route }) {
  const { mangaId, description, other, title, uri } = route.params;
  const chapters = useSelector(selectChapterList);
  const loading = useSelector(selectIsFetchingChapters);
  const chaptersLength = useSelector(selectChapterListLength);
  const totalChapter = useSelector(selectChapterListTotal);

  const dispatch = useDispatch();

  const handleGetItemLayout = useCallback(
    (data, index) => ({
      length: listItemHeight,
      offset: listItemHeight * index,
      index,
    }),
    [],
  );
  const renderHeader = () => (
    <MangaHeader manga={{ description, other, title, uri }} />
  );

  useEffect(() => {
    dispatch(setSelectedManga({ mangaId }));
  }, [dispatch, mangaId]);

  useEffect(() => {
    dispatch(
      getChapterList({
        mangaId,
        limit: 50,
        offset: 0,
        translatedLanguage: ['en'],
      }),
    );

    return () => dispatch(clearChapterList());
  }, [dispatch, mangaId]);

  const handleOnEndReached = () => {
    if (!loading && chaptersLength < totalChapter) {
      dispatch(
        getChapterList({
          mangaId,
          limit: 50,
          offset: chaptersLength,
          translatedLanguage: ['en'],
        }),
      );
    }
    if (chaptersLength === totalChapter) {
      ToastAndroid.show('All chapters loaded', ToastAndroid.SHORT);
    }
  };
  const handleLoadingMore = () => loading && <LoadingCircle />;
  const content = (
    <FlatList
      data={chapters}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      ListHeaderComponent={renderHeader}
      maxToRenderPerBatch={13}
      onEndReachedThreshold={0.1}
      getItemLayout={handleGetItemLayout}
      onEndReached={handleOnEndReached}
      ListFooterComponent={handleLoadingMore}
      windowSize={14}
    />
  );

  return (
    <Layout style={styles.container}>
      {loading && chaptersLength === 0 ? <LoadingCircle /> : content}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
