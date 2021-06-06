import React, { useEffect } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import { Layout, Divider } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { LoadingCircle } from '../../components/LoadingCircle';
import { UpdatesChapterListItem } from '../../components/UpdatesChapterListItem';
import {
  getFollowedMangaFeed,
  selectChapterListUpdate,
  selectErrorMessage,
  selectIsFetchingChapters,
} from '../../redux/chapterSlice';
import { selectIsFetchingManga } from '../../redux/mangaSlice';

const renderItem = ({ item }) => <UpdatesChapterListItem item={item} />;
const keyExtractor = ({ chapterId }) => chapterId;

export default function RecentUpdateScreen({ navigation, route }) {
  const loadingChapterList = useSelector(selectIsFetchingChapters);
  const loadingMangaList = useSelector(selectIsFetchingManga);
  const errorMessage = useSelector(selectErrorMessage);
  const chapters = useSelector(selectChapterListUpdate);
  const dispatch = useDispatch();
  const loading = loadingMangaList || loadingChapterList;

  const handleOnRefresh = () =>
    dispatch(getFollowedMangaFeed({ translatedLanguage: ['en'], offset: 0 }));

  useEffect(() => {
    if (!loadingMangaList) {
      dispatch(getFollowedMangaFeed({ translatedLanguage: ['en'], offset: 0 }));
    }
  }, [dispatch, loadingMangaList]);

  useEffect(() => {
    if (errorMessage) {
      ToastAndroid.show(errorMessage, ToastAndroid.SHORT);
    }
  }, [errorMessage]);

  const content = (
    <FlatList
      data={chapters}
      renderItem={renderItem}
      ItemSeparatorComponent={Divider}
      keyExtractor={keyExtractor}
      maxToRenderPerBatch={13}
      onRefresh={handleOnRefresh}
      refreshing={loadingChapterList}
      windowSize={14}
    />
  );

  return (
    <Layout style={{ flex: 1 }}>{loading ? <LoadingCircle /> : content}</Layout>
  );
}
