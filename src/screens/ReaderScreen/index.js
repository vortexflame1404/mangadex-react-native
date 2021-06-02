import React, { useState, useEffect, useMemo } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { Layout } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { setError, unsetError } from '../../redux/errorsSlice';
import { chapterDetailsParser } from '../../parser/ApiChapterParser';
import { LoadingCircle } from '../../components/LoadingCircle';
import { useFocusEffect } from '@react-navigation/core';
import { ScrollView } from 'react-native-gesture-handler';
import { ChapterPage } from '../../components/ChapterPage';

const styles = StyleSheet.create({
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const { width, height } = Dimensions.get('window');

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
      const pages = chapter.pagesUrl.map((item) => (
        <View style={{ width }} key={item}>
          <ChapterPage pageUrl={item} />
        </View>
      ));

      const getPageNum = (offset) => {
        for (let i = 1; i <= chapter.pageLength; i++) {
          if (offset < width * i) {
            return i;
          }
          if (i === chapter.pageLength) {
            return i;
          }
        }
      };

      return (
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ width: `${100 * chapter.pageLength}%` }}
          decelerationRate={'fast'}
          onScroll={({ nativeEvent }) =>
            console.log(getPageNum(nativeEvent.contentOffset.x))
          }
          snapToInterval={width}>
          {pages}
        </ScrollView>
      );
    }
    return null;
  }, [chapter]);

  if (loading) {
    return (
      <Layout style={{ flex: 1 }} level={'4'}>
        <LoadingCircle />
      </Layout>
    );
  }

  return (
    <Layout style={{ flex: 1 }} level={'4'}>
      {content}
    </Layout>
  );
};
