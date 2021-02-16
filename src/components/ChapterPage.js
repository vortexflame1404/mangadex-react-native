import React, { useState } from 'react';
import FastImage from 'react-native-fast-image';
import { LoadingCircle } from './LoadingCircle';

export const ChapterPage = ({ pageUrl }) => {
  const [loading, setLoading] = useState(false);

  return (
    <>
      {loading && <LoadingCircle />}
      <FastImage
        source={{
          uri: pageUrl,
        }}
        style={{ width: null, height: null, flex: 1 }}
        resizeMode={FastImage.resizeMode.contain}
        onLoadStart={() => {
          setLoading(true);
        }}
        onLoadEnd={() => {
          setLoading(false);
        }}
      />
    </>
  );
};
