import { LinearGradient } from 'expo-linear-gradient'; // Make sure you have installed expo-linear-gradient
import { useRouter } from 'expo-router';
import React from 'react';
import { Image, SafeAreaView, StatusBar, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Index = () => {
  const handleCustomPress = () => {
    console.log("pressed ")
  }
  const router =useRouter();

  return (
    <SafeAreaView style={styles.container}>
       <StatusBar
        barStyle="dark-content" // Options: 'default', 'light-content', 'dark-content'
        backgroundColor="#6a51ae" // Set background color for Android
        translucent={true} // Set translucent status bar for Android
      />
      <Image
        source={require('../assets/images/wallpaper1.jpg')}
        style={styles.image}
      />
      <LinearGradient
        colors={['transparent', '#18181b']}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 0.8 }}
      >
        <Animated.View entering={FadeInDown.delay(100).springify
          ().reduceMotion('alwaysr')
        } style={{ fontSize: hp(8) }} className='text-white font-bold tracking-wider mt-52'>
          <Text style={styles.text}>Let`s <Text className=' text-rose-800
          '>Connect</Text>
          </Text>
        </Animated.View>
        <Animated.View entering={FadeInDown.delay(200).springify
          ().reduceMotion('alwaysr')}>
          <TouchableOpacity
            onPress={()=>{router.push('/home')}}
          >
            <Text style={{ fontSize: hp(3) }} className='m-4  text-white font-bold bg-rose-900 px-10 py-5 rounded-full mx-auto border-white tracking-wider border-[2px]' >Get Started</Text>
          </TouchableOpacity>
        </Animated.View>
      </LinearGradient>
    </SafeAreaView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  textContainer: {
    justifyContent: 'center',

  },
  text: {
    fontSize: 35,
    textAlign: 'center',
    margin: 20,
    color: '#FFFFFF', // Added color for better visibility on dark background
  },
  image: {
    width: wp(100),
    height: hp(100),
    resizeMode: 'cover',
    position: 'absolute',
  },
  gradient: {
    width: wp(100),
    height: hp(70),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
  },
});
