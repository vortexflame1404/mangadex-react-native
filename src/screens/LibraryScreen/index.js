import React, { useEffect, useState, useRef } from 'react';
import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { Layout, Icon, useTheme } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrentFollowedMangas } from '../../api/mangadex';
import MangaCard from '../../components/MangaCardItem';
import { LoadingCircle } from '../../components/LoadingCircle';
import { setError, unsetError } from '../../redux/errorsSlice';
import { ErrorComponent } from '../../components/ErrorComponent';

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

const renderItem = ({ item }) => (
  <MangaCard
    uri={item.mainCover}
    title={item.mangaTitle}
    mangaId={item.mangaId}
  />
);

export default function LibraryScreen({ navigation, route }) {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors.message);
  const errorCode = useSelector((state) => state.errors.code);

  const ref = useRef(null);
  const goToTopHandler = (listRef) => {
    listRef.current.scrollToIndex({ index: 0, viewOffset: 20 });
  };

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        dispatch(unsetError());
        const response = await getCurrentFollowedMangas();
        setMangas(response.data.data);
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
  }, [dispatch]);

  const content = errorMessage ? (
    <ErrorComponent message={errorMessage} code={errorCode} />
  ) : (
    <FlatList
      ref={ref}
      data={mangas}
      numColumns={3}
      keyExtractor={(item) => item.mangaId}
      renderItem={renderItem}
      style={{ marginBottom: 10 }}
    />
  );

  return (
    <Layout style={styles.container}>
      {loading ? <LoadingCircle /> : content}
      <GoToTopButton handler={() => goToTopHandler(ref)} visible={true} />
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
