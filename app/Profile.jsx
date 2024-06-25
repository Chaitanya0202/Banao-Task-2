import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const Profile = () => {
  // Dummy data for the profile
  const profileData = {
    image: 'https://randomuser.me/api/portraits/men/1.jpg',
    name: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    phone: '123-456-7890',
    website: 'www.johndoe.com',
    address: {
      street: '123 Main St',
      suite: 'Apt. 4B',
      city: 'New York',
      zipcode: '10001'
    },
    company: {
      name: 'John Doe Inc.',
      catchPhrase: 'Innovate and Elevate',
      bs: 'business solutions'
    },
    bio: 'Passionate about technology and nature. Enjoys hiking and coding.'
  };

  return (
    <ScrollView className="flex-1 bg-gray-100">
      <View className="items-center mt-10">
        <Image
          source={{ uri: profileData.image }}
          style={{ height: 150, width: 150, borderRadius: 75 }}
          className="mb-5"
        />
        <Text className="text-3xl font-bold">{profileData.name}</Text>
        <Text className="text-lg text-gray-600">@{profileData.username}</Text>
      </View>
      <View className="px-5 py-10">
        <View className="mb-5">
          <Text className="text-lg font-semibold">Bio</Text>
          <Text className="text-gray-600 mt-2">{profileData.bio}</Text>
        </View>
        <View className="mb-5">
          <View className="flex-row items-center mb-3">
            <Icon name="mail" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">{profileData.email}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon name="call" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">{profileData.phone}</Text>
          </View>
          <View className="flex-row items-center mb-3">
            <Icon name="globe" size={24} color="#4A5568" className="mr-2" />
            <Text className="text-lg text-gray-800">{profileData.website}</Text>
          </View>
        </View>
        <View className="mb-5">
          <Text className="text-lg font-semibold">Address</Text>
          <Text className="text-gray-600 mt-2">
            {`${profileData.address.street}, ${profileData.address.suite}, ${profileData.address.city}, ${profileData.address.zipcode}`}
          </Text>
        </View>
        <View className="mb-5">
          <Text className="text-lg font-semibold">Company</Text>
          <Text className="text-gray-600 mt-2">{profileData.company.name}</Text>
          <Text className="text-gray-600 mt-1 italic">{profileData.company.catchPhrase}</Text>
          <Text className="text-gray-600 mt-1">{profileData.company.bs}</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Profile;
