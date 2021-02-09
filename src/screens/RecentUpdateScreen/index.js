import React, { useEffect, useState } from 'react';
import { View, SectionList } from 'react-native';
import { Text, Layout, Divider } from '@ui-kitten/components';
import { useDispatch, useSelector } from 'react-redux';
import { getFollowedUpdates } from '../../api/mangadex';
import { followedUpdatesParser } from '../../parser/ApiUpdatesParser';
import { setError, unsetError } from '../../redux/errorsSlice';
import { ErrorComponent } from '../../components/ErrorComponent';
import { LoadingCircle } from '../../components/LoadingCircle';
import { UpdatesChapterListItem } from '../../components/UpdatesChapterListItem';

export default function RecentUpdateScreen({ navigation, route }) {
  const [updates, setUpdates] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.errors.message);
  const errorCode = useSelector((state) => state.errors.code);

  useEffect(() => {
    const getData = async () => {
      try {
        setLoading(true);
        dispatch(unsetError());
        const response = await getFollowedUpdates();
        setUpdates(followedUpdatesParser(response.data.data));
      } catch (e) {
        if (e.response) {
          const { status, data } = e.response;
          dispatch(setError({ code: status, message: 'Error w/ server' }));
          console.log(data);
        } else if (e.request) {
          dispatch(setError({ code: 503, message: 'Error w/ making request' }));
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

  const renderItem = ({ item }) => <UpdatesChapterListItem item={item} />;
  const renderSectionHeader = ({ section: { title } }) => (
    <Text category={'h5'} style={{ marginLeft: 10, marginTop: 10 }}>
      {title}
    </Text>
  );

  const content = errorMessage ? (
    <ErrorComponent message={errorMessage} code={errorCode} />
  ) : (
    <SectionList
      sections={updates}
      keyExtractor={(item, index) => item + index}
      renderItem={renderItem}
      renderSectionHeader={renderSectionHeader}
      ItemSeparatorComponent={Divider}
      SectionSeparatorComponent={Divider}
    />
  );

  return (
    <Layout style={{ flex: 1 }}>{loading ? <LoadingCircle /> : content}</Layout>
  );
}
