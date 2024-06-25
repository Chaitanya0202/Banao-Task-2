  // App.js
  import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';
import * as React from 'react';
import 'react-native-gesture-handler';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AppProvider } from './Context/userContext';
import HomeScreen from './HomeScreen';
import LikedScreen from './LikedScreen';
import Profile from './Profile';

  const Drawer = createDrawerNavigator();
  const Tab = createBottomTabNavigator();

  function MyTabs() {
    return (
      <AppProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Home') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Likes') {
              iconName = focused ? 'heart-sharp' : 'heart-outline';
            } else if (route.name === 'Profile') {
              return focused ? (
                <FontAwesome6 name="user-large" size={size} />
              ) : (
                <EvilIcons name="user" size={size + 15} />
              );
            }

            // You can return any component that you like here!
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Tab.Screen name="Likes" component={LikedScreen} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
      </AppProvider>
    );
  }

  function MyDrawer() {
    return (
      <Drawer.Navigator >
        <Drawer.Screen name="Home" component={MyTabs}  />
        <Drawer.Screen name="Profile" component={Profile} />
        <Drawer.Screen name="Likes" component={LikedScreen} />
      </Drawer.Navigator>
    );
  }

  export default function App() {
    return (
      <>
        <MyDrawer  />
        {/* <MyTabs/> */}
        </>
      
    );
  }
