// StoryScreen.js
import { Video } from 'expo-av';
import React, { useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Animated, { Easing, FadeInRight, FadeInUp } from 'react-native-reanimated';
import AppHeader from './AppHeader';
import { useGlobalContext } from './Context/userContext';
const StoryComponent = ({ item, openStory }) => {
    return (
        <TouchableOpacity onPress={() => openStory(item)}>
            <Animated.View entering={FadeInRight.delay(300).springify
        ().reduceMotion('alwaysr').easing(Easing.ease)
      }  style={styles.storyContainer}>
                <Image source={{ uri: item.avatar }} style={styles.avatar} />
                <Text style={styles.username}>{item.username}</Text>
            </Animated.View>
        </TouchableOpacity>
    );
};

const StoryScreen = () => {
    const {otherStories,setOtherStories,selectedStory,setSelectedStory,openStory,closeStory } = useGlobalContext();

    return (
        <View >  
            <Animated.View entering={FadeInUp.delay(100).springify().reduceMotion('alwaysr').easing(Easing.ease)
      } >
            <AppHeader />
            </Animated.View>
            <FlatList
                data={otherStories}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => (
                    <StoryComponent item={item} openStory={openStory} />
                )}
                keyExtractor={(item) => item.id.toString()}
            />

            <Modal
                visible={selectedStory !== null}
                transparent={true}
                animationType="slide"
                onRequestClose={closeStory}
            >
                <View style={styles.modalContainer}>
                    <TouchableOpacity style={styles.modalCloseButton} onPress={closeStory}>
                        <Text style={styles.modalCloseText}>Close</Text>
                    </TouchableOpacity>
                    {selectedStory && (
                        <View style={styles.modalContent}>
                            {selectedStory.type === 'video' ? (
                                <Video
                                    source={{ uri: selectedStory.source }}
                                    style={styles.modalVideo}
                                    resizeMode="cover"
                                    useNativeControls
                                    shouldPlay
                                />
                            ) : (
                                <Image source={{ uri: selectedStory.source }} style={styles.modalImage} />
                            )}
                        </View>
                    )}
                </View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({

    storyContainer: {
        alignItems: 'center',

        marginTop: 10,
        margin: 8,
        position: 'relative',
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        borderWidth: 2,
        borderColor: 'red',
        marginRight: 5,
    },
    username: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#fff',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalCloseButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        zIndex: 1,
    },
    modalCloseText: {
        color: 'white',
        fontSize: 18,
    },
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalImage: {
        width: 300,
        height: 500,
        borderRadius: 10,
    },
    modalVideo: {
        width: 390,
        height: 700,
        borderRadius: 10,
    },
});

export default StoryScreen;
