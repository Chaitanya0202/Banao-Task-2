import { Ionicons } from '@expo/vector-icons'; // Import Ionicons from Expo
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Dimensions, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import Toast from 'react-native-toast-message';

const HomeScreen = () => {
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(true);
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState('cat');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected);
      if (!state.isConnected) {
        showToast('Offline: Showing cached data', 'error');
      }
    });

    fetchData(1, searchKeyword);

    return () => unsubscribe();
  }, []);

  const showToast = (message, type) => {
    Toast.show({
      type: type === 'error' ? 'error' : 'success',
      text1: message,
      visibilityTime: 3000,
      autoHide: true,
    });
  };

  const fetchData = async (page = 1, keyword = 'cat') => {
    setLoading(true);
    const state = await NetInfo.fetch();
    setIsConnected(state.isConnected);

    if (state.isConnected) {
      try {
        const apiKey = '6f102c62f41998d151e5a1b48713cf13';
        const pageSize = 10;
        const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${apiKey}&format=json&nojsoncallback=1&extras=url_s&text=${keyword}&page=${page}&per_page=${pageSize}`;
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error('Failed to fetch Flickr photos');
        }
        const data = await response.json();
        setUsers(data.photos.photo);
        setTotalPages(data.photos.pages);
        setCurrentPage(page);
        await AsyncStorage.setItem('cachedUsers', JSON.stringify(data.photos.photo));
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
        showRetrySnackbar();
      }
    } else {
      try {
        const cachedUsers = await AsyncStorage.getItem('cachedUsers');
        if (cachedUsers) {
          setUsers(JSON.parse(cachedUsers));
        }
        setLoading(false);
        showToast('Offline: Showing cached data', 'error');
      } catch (error) {
        console.error(error);
        setLoading(false);
        showRetrySnackbar();
      }
    }
  };

  const loadNextPage = () => {
    if (!loading && currentPage < totalPages) {
      const nextPage = currentPage + 1;
      fetchData(nextPage, searchKeyword);
    }
  };

  const loadPreviousPage = () => {
    if (!loading && currentPage > 1) {
      const previousPage = currentPage - 1;
      fetchData(previousPage, searchKeyword);
    }
  };

  const searchFlickr = () => {
    setPageNumber(1);
    fetchData(1, searchKeyword);
  };

  const renderItem = ({ item }) => (
    <Animated.View style={styles.imageContainer}>
      <View style={styles.imageTextContainer}>
        <Text style={styles.imageText}>{item.title}</Text>
      </View>
      <Image
        source={{ uri: item.url_s }}
        style={styles.image}
      />
    </Animated.View>
  );

  const showRetrySnackbar = () => {
    Toast.show({
      type: 'error',
      text1: 'Network Error',
      text2: 'Retry',
      visibilityTime: 5000,
      autoHide: true,
      onPress: () => fetchData(currentPage, searchKeyword),
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter search keyword"
          value={searchKeyword}
          onChangeText={text => setSearchKeyword(text)}
          onSubmitEditing={searchFlickr}
        />
        <TouchableOpacity style={styles.button} onPress={searchFlickr}>
          <Text style={styles.buttonText}>Search</Text>
        </TouchableOpacity>
      </View>
      {loading ? (
        <ActivityIndicator style={styles.loadingIndicator} size="large" color="#0000ff" />
      ) : (
        <FlatList
          data={users}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          ListFooterComponent={
            <View style={styles.paginationContainer}>
              <TouchableOpacity
                style={[styles.paginationButton, { marginRight: 10 }]}
                onPress={loadPreviousPage}
                disabled={loading || currentPage <= 1}
              >
                <Ionicons name="chevron-back" size={24} color="#fff" />
              </TouchableOpacity>
              <Text style={styles.paginationText}>
                Page {currentPage} of {totalPages}
              </Text>
              <TouchableOpacity
                style={styles.paginationButton}
                onPress={loadNextPage}
                disabled={loading || currentPage >= totalPages}
              >
                <Ionicons name="chevron-forward" size={24} color="#fff" />
              </TouchableOpacity>
            </View>
          }
        />
      )}
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    marginLeft: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingIndicator: {
    marginTop: 20,
    marginBottom: 20,
  },
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  paginationButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 8,
  },
  paginationText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  imageContainer: {
    marginBottom: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  imageTextContainer: {
    padding: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  imageText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: Dimensions.get('window').width - 20,
    height: 200,
    borderRadius: 8,
  },
});

export default HomeScreen;
