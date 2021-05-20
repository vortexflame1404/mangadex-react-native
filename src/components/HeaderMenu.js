import React, { useState } from 'react';
import {
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
} from '@ui-kitten/components';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/authSlices';

const MenuIcon = (props) => <Icon {...props} name={'more-vertical'} />;
const LogoutIcon = (props) => <Icon {...props} name={'log-out'} />;
export default function HeaderMenu() {
  const [menuVisible, setMenuVisible] = useState(false);
  const dispatch = useDispatch();

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  return (
    <OverflowMenu
      anchor={renderMenuAction}
      visible={menuVisible}
      onBackdropPress={toggleMenu}>
      <MenuItem
        accessoryLeft={LogoutIcon}
        title={'Logout'}
        onPress={() => dispatch(logout())}
      />
    </OverflowMenu>
  );
}
