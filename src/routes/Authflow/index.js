import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {} from '../../screens';

const AuthStack = createStackNavigator();
const AuthApp = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'SignIn'}></AuthStack.Navigator>
  );
};

export default AuthApp;
