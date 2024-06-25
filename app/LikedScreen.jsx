// import React, { useState } from 'react';
// import { FlatList, Text, TouchableOpacity, View } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';

// const LikedScreen = ({ navigation }) => {
//   const [likedItems, setLikedItems] = useState([
//     {
//       id: 1,
//       image: 'https://randomuser.me/api/portraits/men/1.jpg',
//       name: 'John Doe',
//       username: 'johndoe',
//       email: 'johndoe@example.com',
//       phone: '123-456-7890',
//       website: 'www.johndoe.com',
//       address: {
//         street: '123 Main St',
//         suite: 'Apt. 4B',
//         city: 'New York',
//         zipcode: '10001',
//       },
//       company: {
//         name: 'John Doe Inc.',
//         catchPhrase: 'Innovate and Elevate',
//         bs: 'business solutions',
//       },
//       bio: 'Passionate about technology and nature. Enjoys hiking and coding.',
//     },
//     {
//       id: 2,
//       image: 'https://randomuser.me/api/portraits/women/1.jpg',
//       name: 'Jane Smith',
//       username: 'janesmith',
//       email: 'janesmith@example.com',
//       phone: '987-654-3210',
//       website: 'www.janesmith.com',
//       address: {
//         street: '456 Elm St',
//         suite: 'Suite 1A',
//         city: 'Los Angeles',
//         zipcode: '90001',
//       },
//       company: {
//         name: 'Jane Smith Corp.',
//         catchPhrase: 'Innovate to the max',
//         bs: 'tech solutions',
//       },
//       bio: 'Avid reader and technology enthusiast. Loves traveling and exploring new cultures.',
//     },
//   ]);

//   const handleLike = (item) => {
//     setLikedItems([...likedItems, item]);
//   };

//   const handleDislike = (itemId) => {
//     setLikedItems(likedItems.filter((item) => item.id !== itemId));
//   };


//   const renderItem = ({ item }) => (
//     <TouchableOpacity
//       onPress={() => navigation.navigate('UserProfile', { item })}
//       style={{ flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', padding: 10, marginBottom: 10, borderRadius: 10, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.8, shadowRadius: 2, elevation: 5 }}
//     >
//       <Image
//           source={{ uri: item.image }}
//           style={{ height: 150, width: 150, borderRadius: 75 }}
//           className="mb-5"
//         />
//       <Text style={{ fontSize: 18 }}>{item.name}</Text>
//       <TouchableOpacity onPress={() => handleDislike(item.id)}>
//         <Icon name="heart" size={24} color="red" />
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ flex: 1, backgroundColor: '#f0f0f0' }}>
//       <FlatList
//         data={likedItems}
//         keyExtractor={(item) => item.id.toString()}
//         renderItem={item}
//         ListEmptyComponent={<Text style={{ textAlign: 'center', color: '#888', marginTop: 10 }}>No liked items</Text>}
//       />
      
//     </View>
//   );
// };

// export default LikedScreen;

import React from 'react'
import { Text, View } from 'react-native'

const LikedScreen = () => {
  return (
    <View>
      <Text>LikedScreen</Text>
    </View>
  )
}

export default LikedScreen