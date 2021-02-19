import React, { useState, useEffect, useMemo } from 'react';
import { ToastAndroid, View } from 'react-native';
import { Layout, Text, ViewPager } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { getChapterDetails, postSetChapterToRead } from '../../api/mangadex';
import { setError, unsetError } from '../../redux/errorsSlice';
import { chapterDetailsParser } from '../../parser/ApiChapterParser';
import { LoadingCircle } from '../../components/LoadingCircle';
import { ChapterPage } from '../../components/ChapterPage';

export const ReaderScreen = ({ navigation, route }) => {
  const { chapterId } = route.params;
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chapter, setChapter] = useState(null);

  const dispatch = useDispatch();
  const shouldLoadComponent = (index) => index === selectedIndex;

  useEffect(() => {
    const getData = async () => {
      try {
        dispatch(unsetError());
        setLoading(true);
        const response = await getChapterDetails(chapterId);
        setChapter(chapterDetailsParser(response.data.data));
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
  }, [chapterId, dispatch]);

  useEffect(() => {
    const postData = async () => {
      try {
        const response = await postSetChapterToRead(chapterId);
        if (response.status === 200) {
          ToastAndroid.show('end of chapter', ToastAndroid.SHORT);
        }
      } catch (e) {
        if (e.response) {
          console.log(e.response.data);
        } else if (e.request) {
          console.log(e.request);
        } else {
          console.log(e.message);
        }
      }
    };

    if (chapter) {
      if (selectedIndex === chapter.pageLength - 1) {
        postData();
      }
    }
  }, [chapter, chapterId, selectedIndex]);

  const content = useMemo(() => {
    if (chapter) {
      return chapter.pagesUrl.map((value) => (
        <ChapterPage key={value} pageUrl={value} />
      ));
    }
    return null;
  }, [chapter]);

  return (
    <Layout style={{ flex: 1 }}>
      <ViewPager
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => setSelectedIndex(index)}
        shouldLoadComponent={shouldLoadComponent}>
        {content || <LoadingCircle />}
      </ViewPager>
      {chapter ? (
        <View style={{ alignSelf: 'center', paddingBottom: 10 }}>
          <Text category={'s1'}>{`${selectedIndex + 1}/${
            chapter.pageLength
          }`}</Text>
        </View>
      ) : null}
    </Layout>
  );
};
