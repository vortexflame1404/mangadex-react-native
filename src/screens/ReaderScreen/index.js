import React, { useState, useEffect, useMemo, useRef } from 'react';
import { ToastAndroid, View, Animated } from 'react-native';
import { Layout, Text, useTheme, ViewPager } from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { getChapterDetails, postSetChapterToRead } from '../../api/mangadex';
import { setError, unsetError } from '../../redux/errorsSlice';
import { chapterDetailsParser } from '../../parser/ApiChapterParser';
import { LoadingCircle } from '../../components/LoadingCircle';
import { ChapterPage } from '../../components/ChapterPage';
import Slider from '@react-native-community/slider';
import FastImage from 'react-native-fast-image';

const AnimatedViewPager = Animated.createAnimatedComponent(ViewPager);

export const ReaderScreen = ({ navigation, route }) => {
  const { chapterId } = route.params;
  const viewPagerRef = useRef < ViewPager > null;

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [chapter, setChapter] = useState(null);
  const [pageSelectBySliderFlag, setPageSelectBySliderFlag] = useState(false);
  const theme = useTheme();
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
          console.log('error in response', e.response.data);
        } else if (e.request) {
          console.log('error in request', e.request);
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
      FastImage.preload(chapter.preloadUrls);
      return chapter.pagesUrl.map((value) => (
        <ChapterPage key={value} pageUrl={value} />
      ));
    }
    return null;
  }, [chapter]);

  return (
    <Layout style={{ flex: 1 }} level={'4'}>
      <AnimatedViewPager
        ref={viewPagerRef}
        style={{ flex: 1 }}
        selectedIndex={selectedIndex}
        onSelect={(index) => {
          if (!pageSelectBySliderFlag) {
            setSelectedIndex(index);
          }
        }}
        shouldLoadComponent={shouldLoadComponent}>
        {content || <LoadingCircle />}
      </AnimatedViewPager>
      {chapter ? (
        <>
          <View style={{ alignSelf: 'center', paddingBottom: 5 }}>
            <Slider
              style={{ height: 20, width: 300 }}
              maximumValue={chapter.pageLength}
              minimumValue={1}
              step={1}
              minimumTrackTintColor={theme['color-primary-default']}
              maximumTrackTintColor={'#FFF'}
              thumbTintColor={theme['color-primary-default']}
              value={selectedIndex + 1}
              onSlidingStart={() => setPageSelectBySliderFlag(true)}
              onValueChange={(value) => {
                setSelectedIndex(value - 1);
              }}
              onSlidingComplete={(value) => {
                setSelectedIndex(value - 1);
                setPageSelectBySliderFlag(false);
              }}
            />
          </View>
          <View style={{ alignSelf: 'center', paddingBottom: 10 }}>
            <Text category={'s1'}>{`${selectedIndex + 1}/${
              chapter.pageLength
            }`}</Text>
          </View>
        </>
      ) : null}
    </Layout>
  );
};
