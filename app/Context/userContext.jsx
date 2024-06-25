import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [count, setCount] = useState(0);

  const incre = () => {
    setCount(count + 1);
  };

  const decre = () => {
    setCount(count - 1);
  };

  const [selectedStory, setSelectedStory] = useState(null);
  
  const openStory = (item) => {
    setSelectedStory(item);
};
const closeStory = () => {
    setSelectedStory(null);
};

  const [otherStories, setOtherStories] = useState([
    { id: 1, username: 'John', avatar: 'https://randomuser.me/api/portraits/men/1.jpg', source: 'https://videos.pexels.com/video-files/4974885/4974885-hd_1080_1920_25fps.mp4', type: 'video', duration: 10 },
    { id: 2, username: 'Devi', avatar: 'https://randomuser.me/api/portraits/women/1.jpg', source: 'https://videos.pexels.com/video-files/5725850/5725850-uhd_1440_2560_25fps.mp4', type: 'video', duration: 10 },
    { id: 3, username: 'Fork', avatar: 'https://randomuser.me/api/portraits/men/4.jpg', source: 'https://videos.pexels.com/video-files/4629779/4629779-sd_640_360_25fps.mp4', type: 'video', duration: 10 },

    { id: 4, username: 'Kachadi', avatar: 'https://randomuser.me/api/portraits/women/4.jpg', source: 'https://videos.pexels.com/video-files/5725846/5725846-hd_1080_1920_25fps.mp4', type: 'video', duration: 10 },
    { id: 5, username: 'King', avatar: 'https://randomuser.me/api/portraits/men/3.jpg', source: 'https://videos.pexels.com/video-files/4828601/4828601-hd_720_1366_25fps.mp4', type: 'video', duration: 10 },
]);

  return (
    <AppContext.Provider value={{ incre, decre, count ,otherStories,setOtherStories,selectedStory,setSelectedStory,openStory,closeStory}}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
