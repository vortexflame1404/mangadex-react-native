import { getFocusedRouteNameFromRoute } from '@react-navigation/core';

export const getHeaderTitle = (route) => {
  // If the focused route is not found, we need to assume it's the initial screen
  // This can happen during if there hasn't been any navigation inside the screen
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'Library';

  switch (routeName) {
    case 'Library':
      return 'Library';
    case 'Update':
      return 'Updates';
    case 'Manga':
      return 'Details';
  }
};
