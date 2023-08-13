/** @format */
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import App from './Appflow';
import AuthApp from './Authflow';
const MainStack = createStackNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <MainStack.Navigator screenOptions={{headerShown: false}}>
        {/* <MainStack.Screen name={"Auth"} component={AuthApp} /> */}
        <MainStack.Screen name={'App'} component={App} />
      </MainStack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;
