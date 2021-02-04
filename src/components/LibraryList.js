import React, { useRef } from 'react';
import { FlatList } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';

// TODO: press tab to scroll to top
export const LibraryList = ({ data, renderItem }) => {
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <FlatList
      ref={ref}
      data={data}
      numColumns={3}
      keyExtractor={(item) => item.mangaId}
      renderItem={renderItem}
      style={{ marginBottom: 10 }}
    />
  );
};
