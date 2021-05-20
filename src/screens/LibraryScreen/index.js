import React, { useEffect, useRef } from 'react';
import {
  FlatList,
  StyleSheet,
  ToastAndroid,
  TouchableOpacity,
} from 'react-native';
import { Layout, Icon, useTheme } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import MangaCard from '../../components/MangaCardItem';
import { LoadingCircle } from '../../components/LoadingCircle';
import {
  getFollowedMangas,
  selectErrorMessage,
  selectIsFetchingManga,
  selectIsMangas,
  selectMangaLists,
} from '../../redux/mangaSlice';

export const GoToTopButton = ({ handler, visible }) => {
  const theme = useTheme();

  return visible ? (
    <TouchableOpacity
      style={[
        styles.goToTopButton,
        { backgroundColor: theme['color-primary-default'] },
      ]}
      activeOpacity={0.5}
      onPress={handler}>
      <Icon
        name={'arrow-upward'}
        style={{
          height: 50,
          width: 50,
        }}
        fill={theme['background-basic-color-4']}
      />
    </TouchableOpacity>
  ) : null;
};

const renderItem = ({ item }) => <MangaCard item={item} />;

const keyExtractor = ({ mangaId }) => mangaId.toString();

export default function LibraryScreen({ navigation, route }) {
  const loading = useSelector(selectIsFetchingManga);
  const mangas = useSelector(selectMangaLists);
  const isManga = useSelector(selectIsMangas);
  const error = useSelector(selectErrorMessage);
  const dispatch = useDispatch();

  const ref = useRef(null);
  const goToTopHandler = (listRef) => {
    listRef.current.scrollToIndex({ index: 0, viewOffset: 20 });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(getFollowedMangas());
        console.log('dispatch is called ');
        // dispatch(setManga({ raw: response.data.results }));
      } catch (e) {
        console.log('get data library ', e.message);
      }
    };
    getData();
  }, [dispatch]);

  useEffect(() => {
    if (error) {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    }
  }, [error]);

  const content = (
    <FlatList
      ref={ref}
      data={mangas}
      numColumns={3}
      keyExtractor={keyExtractor}
      renderItem={renderItem}
      style={{ marginBottom: 10 }}
    />
  );

  return (
    <Layout style={styles.container}>
      {loading ? <LoadingCircle /> : content}
      <GoToTopButton handler={() => goToTopHandler(ref)} visible={isManga} />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  goToTopButton: {
    //Here is the trick
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    position: 'absolute',
    bottom: 30,
    right: 30,
    height: 50,
    borderRadius: 50 / 2,
  },
});
