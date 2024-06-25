import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Image, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Icon from 'react-native-vector-icons/Ionicons';

const Details = () => {
  const itemdetails = useLocalSearchParams();
  const router = useRouter();

  const [likedItems, setLikedItems] = useState([]); // Array to store liked items
  const [liked, setLiked] = useState(false); // State for like button

  useEffect(() => {
    // Check if the item is already liked when the component mounts
    const isLiked = likedItems.some(item => item.id === itemdetails.id);
    setLiked(isLiked);
  }, [itemdetails.id, likedItems]);

  const handleLike = () => {
    setLiked(!liked);

    if (!liked) {
      // Add item to liked items array
      setLikedItems([...likedItems, itemdetails]);
    } else {
      // Remove item from liked items array
      setLikedItems(likedItems.filter(item => item.id !== itemdetails.id));
    }
  };

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <View className="relative">
        <Image
          source={{ uri: itemdetails.image }}
          style={{ height: hp(40), width: wp(99) }}
          className="rounded-lg self-center mt-10"
        />
        <TouchableOpacity
          onPress={() => router.back()}
          className="absolute top-14 left-5 bg-[#6c6969] bg-opacity-50 p-2 rounded-full"
        >
          <Icon name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleLike}
          style={{ position: 'absolute', top: 50, right: 8, padding: 10, borderRadius: 999 }}
          className={`${liked ? 'bg-rose-400' : 'bg-white'}`}
        >
          <Icon name={liked ? 'heart' : 'heart-outline'} size={25} />
        </TouchableOpacity>
      </View>
      <View className="p-5">
        <Text className="text-3xl font-bold text-center mt-5">{itemdetails.name}</Text>
        <Text className="text-center text-gray-600 mt-2">Bio: Passionate about technology and nature.</Text>
        <View className="mt-5">
          <View className="flex-row items-center mb-3">
            <Icon name="person" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">
              <Text className="font-semibold">Username: </Text>{itemdetails.username}
            </Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon name="mail" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">
              <Text className="font-semibold">Email: </Text>{itemdetails.email}
            </Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon name="call" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">
              <Text className="font-semibold">Phone: </Text>{itemdetails.phone}
            </Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon name="globe" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">
              <Text className="font-semibold">Website: </Text>{itemdetails.website}
            </Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon name="location" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">
              <Text className="font-semibold">Address: </Text>
              {`${itemdetails.address.street}, ${itemdetails.address.suite}, ${itemdetails.address.city}, ${itemdetails.address.zipcode}`}
            </Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon name="business" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">
              <Text className="font-semibold">Company: </Text>
              {`${itemdetails.company.name}, ${itemdetails.company.catchPhrase}, ${itemdetails.company.bs}`}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Details;
