import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import MangaCard from '../../components/MangaCardItem';
import { Layout } from '@ui-kitten/components';
import { getFollowedMangas } from '../../api/mangadex';
import { LibraryList } from '../../components/LibraryList';
import { LoadingCircle } from '../../components/LoadingCircle';

export default function LibraryScreen({ navigation, route }) {
  const [mangas, setMangas] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const followedMangas = async () => {
      try {
        setLoading(true);
        const response = await getFollowedMangas();
        setMangas(response.data.data);
      } catch (e) {
        if (e.response) {
          console.log(e.response.status);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log('errror', e.message);
        }
      } finally {
        setLoading(false);
      }
    };

    followedMangas();
  }, [navigation]);

  // useEffect(() => {
  //   const unsubscribe = navigation.addListener('focus', () => {
  //     // The screen is focused
  //     // Call any action
  //     console.log('library is focused');
  //   });
  //
  //   // Return the function to unsubscribe from the event so it gets removed on unmount
  //   return unsubscribe;
  // }, [navigation]);

  const renderItem = ({ item }) => (
    <MangaCard
      uri={item.mainCover}
      title={item.mangaTitle}
      mangaId={item.mangaId}
    />
  );

  return (
    <Layout style={styles.container}>
      {loading ? (
        <LoadingCircle />
      ) : (
        <LibraryList data={mangas} renderItem={renderItem} />
      )}
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
