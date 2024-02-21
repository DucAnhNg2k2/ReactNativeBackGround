import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {
  Alert,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import BackgroundTimer from 'react-native-background-timer';

// Start a timer that runs continuous after X milliseconds
// const intervalId = BackgroundTimer.setInterval(() => {
//   // this will be executed every 200 ms
//   // even when app is the the background
//   console.log('tic');
// }, 200);

const Stack = createNativeStackNavigator();

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <SafeAreaProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </SafeAreaProvider>
    </GestureHandlerRootView>
  );
}

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={'Home'} component={Home} />
    </Stack.Navigator>
  );
};

const Home = () => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const interval = BackgroundTimer.setInterval(() => {
      console.log('Task run in background', count);
      setCount(count + 1);
    }, 200);
    return () => {
      BackgroundTimer.clearInterval(interval);
    };
  }, [count]);

  return (
    <View>
      <Text
        style={{
          fontSize: 30,
          textAlign: 'center',
        }}>
        Count: {count}
      </Text>
    </View>
  );
};

export default App;
