// src/routes/Header/HeaderLeft.tsx
import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers';

export default function HeaderLeft() {
  const { dispatch } = useNavigation();
  const onPress = React.useCallback(() => {
    dispatch(DrawerActions.openDrawer());
  }, [dispatch]);

  return (
    <TouchableOpacity onPress={onPress}>
      <Text>open</Text>
    </TouchableOpacity>
  );
}
