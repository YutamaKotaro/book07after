// src/routes/Main/index.tsx
import React from 'react';
import { createStackNavigator, StackCardInterpolationProps } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import {
  INITIAL,
  LOADING,
  HOME,
  CHOOSE_LOGIN,
  STATISTICS,
  USER_INFO,
  INPUT,
  SIGN_IN,
  SIGN_UP,
} from '../../constants/path';
import { Initial, Loading, ChooseLogin, Input, SignIn, SignUp } from '../../components/pages';
import Home from './Home';
import Statistics from './Statistics';
import UserInfo from './UserInfo';
import * as UiContext from '../../contexts/ui';

const Stack = createStackNavigator();
const ModalStack = createStackNavigator();
const ChooseLoginStack = createStackNavigator();
const Tab = createBottomTabNavigator();
const HomeDrawer = createDrawerNavigator();
const StatisticsDrawer = createDrawerNavigator();

const forFade = ({ current }: StackCardInterpolationProps) => ({
  cardStyle: {
    opacity: current.progress,
  },
});
const getActiveRouteName = (state: any): string => {
  if (!state || !state.routes) {
    return '';
  }
  const route = state.routes[state.index];

  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

function HomeWithDrawer() {
  return (
    <HomeDrawer.Navigator initialRouteName={HOME}>
      <HomeDrawer.Screen name={HOME} component={Home} />
      <HomeDrawer.Screen name={USER_INFO} component={UserInfo} />
    </HomeDrawer.Navigator>
  );
}
function StatisticsWithDrawer() {
  return (
    <StatisticsDrawer.Navigator>
      <StatisticsDrawer.Screen name={STATISTICS} component={Statistics} />
      <StatisticsDrawer.Screen name={USER_INFO} component={UserInfo} />
    </StatisticsDrawer.Navigator>
  );
}

function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName={HOME}
      screenOptions={(props: any) => {
        const routeName = getActiveRouteName(props.route.state);
        return {
          tabBarVisible: routeName !== USER_INFO,
        };
      }}
    >
      <Tab.Screen name={HOME} component={HomeWithDrawer} />
      <Tab.Screen name={STATISTICS} component={StatisticsWithDrawer} />
    </Tab.Navigator>
  );
}

function TabWithModalRoutes() {
  return (
    <ModalStack.Navigator mode="modal" headerMode="none">
      <ModalStack.Screen name={HOME} component={TabRoutes} />
      <ModalStack.Screen name={INPUT} component={Input} />
    </ModalStack.Navigator>
  );
}

function ChooseLoginNavigator() {
  return (
    <ChooseLoginStack.Navigator initialRouteName={CHOOSE_LOGIN}>
      <ChooseLoginStack.Screen name={CHOOSE_LOGIN} component={ChooseLogin} />
      <ChooseLoginStack.Screen name={SIGN_IN} component={SignIn} />
      <ChooseLoginStack.Screen name={SIGN_UP} component={SignUp} />
    </ChooseLoginStack.Navigator>
  );
}

function switchingAuthStatus(status: UiContext.Status) {
  switch (status) {
    case UiContext.Status.UN_AUTHORIZED:
      return <Stack.Screen name={CHOOSE_LOGIN} component={ChooseLoginNavigator} />;
    case UiContext.Status.AUTHORIZED:
      return <Stack.Screen name={HOME} component={TabWithModalRoutes} />;
    case UiContext.Status.FIRST_OPEN:
    default:
      return <Stack.Screen name={INITIAL} component={Initial} />;
  }
}
function AuthWithRoutes() {
  const uiContext = React.useContext(UiContext.Context);
  return (
    <Stack.Navigator initialRouteName={LOADING} headerMode="none" screenOptions={{ cardStyleInterpolator: forFade }}>
      {uiContext.applicationState !== UiContext.Status.LOADING ? (
        switchingAuthStatus(uiContext.applicationState)
      ) : (
        <Stack.Screen name={LOADING} component={Loading} />
      )}
    </Stack.Navigator>
  );
}

export default AuthWithRoutes;
