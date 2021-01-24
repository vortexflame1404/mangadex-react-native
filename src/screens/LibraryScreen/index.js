import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import MangaCard from '../../components/MangaCardItem';
import { Layout } from '@ui-kitten/components';
import { getFollowedMangas } from '../../api/mangadex';

const renderItem = ({ item }) => (
  <MangaCard
    uri={item.mainCover}
    title={item.mangaTitle}
    onPress={() => console.log('navigate to detail')}
  />
);

export default function LibraryScreen() {
  const [mangas, setMangas] = useState([]);

  useEffect(() => {
    const getManga = async () => {
      try {
        const response = await getFollowedMangas();
        setMangas(response.data.data);
      } catch (e) {
        console.log('error', e.message);
      }
    };

    getManga();
  }, []);

  return (
    <Layout style={styles.container}>
      <FlatList
        data={mangas}
        numColumns={3}
        keyExtractor={(item) => item.mangaId}
        renderItem={renderItem}
      />
    </Layout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
