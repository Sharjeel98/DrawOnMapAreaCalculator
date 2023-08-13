import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {StatusBar, StyleSheet, View} from 'react-native';
import {AreaCalculator} from '../../screens';
const styles = StyleSheet.create({});

const AppStack = createStackNavigator();

const App = () => {
  return (
    <AppStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'AreaCalculator'}>
      <AppStack.Screen name={'AreaCalculator'} component={AreaCalculator} />
    </AppStack.Navigator>
  );
};

export default App;
