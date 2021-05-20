import React, { useState, useEffect, useMemo } from 'react';
import { StyleSheet } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { setError, unsetError } from '../../redux/errorsSlice';
import { chapterDetailsParser } from '../../parser/ApiChapterParser';
import { LoadingCircle } from '../../components/LoadingCircle';
import ImageViewer from 'react-native-image-zoom-viewer';
import { useFocusEffect } from '@react-navigation/core';

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const ReaderScreen = ({ navigation, route }) => {
  const { chapterId, hash, data, dataSaver } = route.params;
  const [loading, setLoading] = useState(false);
  const [chapter, setChapter] = useState(null);
  const dispatch = useDispatch();

  useFocusEffect(() => {
    dispatch(unsetError());
  });

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        const chapterParsed = await chapterDetailsParser(chapterId, hash, data);
        setChapter(chapterParsed);
      } catch (e) {
        if (e.response) {
          const { status } = e.response;
          dispatch(setError({ code: status, message: 'Error w/ server' }));
          console.log('in reader screeen');
          console.log(e.response.data);
        } else if (e.request) {
          dispatch(setError({ code: 503, message: 'internal app error' }));
          console.log('in reader screen');
          console.log(e.request);
        } else {
          console.log('errror', e.message);
        }
      } finally {
        console.log('in finally');
        setLoading(false);
      }
    };

    getData();
  }, [chapterId, data, dispatch, hash]);

  const content = useMemo(() => {
    if (chapter) {
      return (
        <ImageViewer
          imageUrls={chapter.pagesUrl}
          enablePreload={true}
          saveToLocalByLongPress={false}
          useNativeDriver={true}
          loadingRender={LoadingCircle}
        />
      );
    }
    return null;
  }, [chapter]);

  return (
    <Layout style={{ flex: 1 }} level={'4'}>
      {loading ? <LoadingCircle /> : null}
      {content}
    </Layout>
  );
};
