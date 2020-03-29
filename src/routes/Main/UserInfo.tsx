// src/routes/Main/UserInfo.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { USER_INFO } from '../../constants/path';
import { UserInfo } from '../../components/pages';
import { HeaderLeft } from '../Header';

const Stack = createStackNavigator();

function UserInfoNavigator() {
  return (
    <Stack.Navigator initialRouteName={USER_INFO}>
      <Stack.Screen
        name={USER_INFO}
        component={UserInfo}
        options={{
          headerLeft: () => <HeaderLeft />,
        }}
      />
    </Stack.Navigator>
  );
}

export default UserInfoNavigator;
