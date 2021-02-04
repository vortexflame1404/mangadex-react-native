import React from 'react';
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
} from '@ui-kitten/components';

const BookIcon = (props) => <Icon {...props} name={'book'} />;
const ClockIcon = (props) => <Icon name={'clock'} {...props} />;

export const BottomTabBar = ({ navigation, state, descriptors }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => {
        // console.log(index);
        navigation.navigate(state.routeNames[index]);
      }}>
      <BottomNavigationTab title={'Library'} icon={BookIcon} />
      <BottomNavigationTab title={'Updates'} icon={ClockIcon} />
    </BottomNavigation>
  );
};
