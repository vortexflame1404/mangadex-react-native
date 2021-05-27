import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, ToastAndroid } from 'react-native';
import { Divider, Layout } from '@ui-kitten/components';
import { ChapterListItem } from '../../components/ChapterListItem';
import { MangaHeader } from '../../components/MangaHeader';
import { LoadingCircle } from '../../components/LoadingCircle';
import { useDispatch, useSelector } from 'react-redux';
import {
  getChapterList,
  selectChapterList,
  selectChapterListLength,
  selectChapterListTotal,
  selectIsFetchingChapters,
} from '../../redux/chapterSlice';
import { setSelectedManga } from '../../redux/mangaSlice';

const renderItem = ({ item }) => <ChapterListItem item={item} />;
const keyExtractor = ({ chapterId }) => chapterId;

export default function MangaDetailScreen({ navigation, route }) {
  const { mangaId, description, other, title, uri } = route.params;
  const chapters = useSelector(selectChapterList);
  const loading = useSelector(selectIsFetchingChapters);
  const chaptersLength = useSelector(selectChapterListLength);
  const totalChapter = useSelector(selectChapterListTotal);

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
          getChapterList({
            mangaId,
            limit: 50,
            offset: 0,
            translatedLanguage: ['en'],
          }),
        );
      } catch (e) {
        console.log('mangadetails get chapter', e);
      }
    };

    getData();
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
      onEndReachedThreshold={0.9}
      onEndReached={handleOnEndReached}
      ListFooterComponent={handleLoadingMore}
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
