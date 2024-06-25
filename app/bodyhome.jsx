import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { users } from './abcd';

const BodyPartCard = ({ item, index }) => {
    const [isFavorite, setIsFavorite] = useState(false); 
    const [favorites, setFavorites] = useState([]); // State to manage favorites
    
    const toggleFavorite = (itemId) => {

        setIsFavorite(!isFavorite);


        // Function to toggle favorite status
        
            if (favorites.includes(itemId)) {
                // Remove from favorites
                setFavorites(favorites.filter(id => id !== itemId));
            } else {
                // Add to favorites
                setFavorites([...favorites, itemId]);
            }
            console.log("favorites       ..",favorites)
        
    };

    const router = useRouter();
    return (
        <Animated.View entering={FadeInDown.delay(100*index+100).springify
            ().reduceMotion('alwaysr')
          }>
            <TouchableOpacity
            onPress={()=>router.push({pathname: '/details',params:item})}
                style={{ width: wp(50), height: wp(52) }}
                className="flex justify-end  p-4 mb-4"
            >
                <Image
                    source={{ uri: item.image }}
                    resizeMode="cover"
                    style={{ width: wp(44), height: wp(52) }}
                    className='rounded-[15px] absolute mx-3'
                />
                <LinearGradient
                    colors={['transparent', '#18181b']}
                    style={{ width: wp(44), height: wp(20) }}
                    start={{ x: 0.5, y: 0 }}
                    end={{ x: 0.5, y: 1 }}
                    className='rounded-[15px] absolute mx-3'
                ></LinearGradient>


                <Text
                style={{fontSize:hp(2.3)}}
                className='tracking-wider text-white font-semibold'
                >{item.name}</Text>
                 <TouchableOpacity
                    onPress={()=>toggleFavorite(item.id)} // Toggle favorite on press
                    style={{ position: 'absolute', top: 1, right: 10, backgroundColor: 'rgba(0, 0, 0, 0.1)', borderRadius: 30, padding: 10 }}
                >
                    <Text style={{ fontSize: 24, color: isFavorite ? 'red' : 'white' }}>{isFavorite ? '❤️' : '🤍'}</Text>
                </TouchableOpacity>
            </TouchableOpacity>
        </Animated.View>
    );
};
const BodyHome = () => {
    return (
        <View >
            <Animated.View  className='flex justify-center items-center flex-row'>
                <Text className='font-bold text-rose-400 ml-5 my-1.5 border-[1px] px-5 py-1.5 rounded-full' >Your Matches</Text>
                <Text className='font-bold text-rose-400 ml-5 my-1.5 border-[1px] px-5 py-1.5 rounded-full' >New Friends</Text>
                <Text className='font-bold text-rose-400 ml-5 my-1.5 border-[1px] px-5 py-1.5 rounded-full' >Filters Here</Text>
            </Animated.View>
            <FlatList
                data={users}
                numColumns={2}
                keyExtractor={(item) => item.name}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ paddingBottom: 550, paddingTop: 20 }}
                columnWrapperStyle={{ justifyContent: 'space-between' }}
                renderItem={({ item, index }) => <BodyPartCard index={index} item={item} router/>}
            />
        </View>
    );
};

export default BodyHome;
