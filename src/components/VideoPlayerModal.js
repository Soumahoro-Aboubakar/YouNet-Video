import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  TouchableOpacity,
  Image,
  Modal as RNModal,
  ScrollView
} from 'react-native';
import YoutubePlayer from 'react-native-youtube-iframe';
const { height, width } = Dimensions.get('window');
const videoData = [
  {
    id: '1',
    uri: 'https://fr.web.img4.acsta.net/pictures/210/064/21006442_20130516121958057.jpg',
    title: 'Video 1',
    description:
      'Magnifique dessin animé 1994 Roi des animaux / Meilleurs Moments'
  },
  {
    id: '2',
    uri: 'https://i.ytimg.com/vi/XL0fJEmCQLI/maxresdefault.jpg',
    title: 'Video 2',
    description:
      'Magnifique dessin animé 1994 Roi des animaux / Meilleurs Moments'
  }
  // Ajoutez plus de vidéos ici
];

const VideoPlayerModal = ({
  videoId = '',
  videoTitle = '',
  videoDescription = '',
  isVisible,
  setIsVisible,
  othersVideos = [],
  setVideoInfos
}) => {
  const [currentVideo, setCurrentVideo] = useState(videoData[0]);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);

  const handleCloseModal = () => {
    setIsVisible(false);
  };

  const renderSuggestedVideo = ({ item }) => (
    <TouchableOpacity
      style={styles.suggestedVideo}
      onPress={() => {
        console.log('====================================');
        console.log(item.videoId, " idVideo");
        console.log('====================================');
        setVideoInfos({
          id: item.videoId,
          videoTitle: item.videoTitle,
          videoDescription: item.videoDescription
        });
        setIsVisible(true);
      }}
    >
      <Image
        source={{ uri: item.videoImageUrl }}
        style={styles.image}
        resizeMode="cover"
      />
      <Text style={styles.description}>{item.videoTitle}</Text>
    </TouchableOpacity>
  );

  // Handle the scroll event to detect if user is scrolling
  const handleScroll = () => {
    setIsScrolling(true);
  };

  // Reset the expanded description if user starts scrolling
  useEffect(() => {
    if (isScrolling) {
      setIsExpanded(false);
      setIsScrolling(false);
    }
  }, [isScrolling]);

  return (
    <RNModal
      visible={isVisible}
      animationType="slide"
      transparent={false}
      onRequestClose={handleCloseModal}
    >
      <View style={styles.container}>
        <YoutubePlayer
          height={height / 3}
          width={width}
          play={isVisible}
          videoId={videoId}
        />
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.title}>{videoTitle}</Text>
            <Text style={styles.description}>
              {isExpanded
                ? videoDescription
                : `${videoDescription.substring(0, 100)}...`}
            </Text>
            <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
              <Text style={styles.toggleText}>
                {isExpanded ? 'Voir moins' : 'Voir plus'}
              </Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={othersVideos}
            renderItem={renderSuggestedVideo}
            keyExtractor={(item,id) => item.videoId.toString()}
            contentContainerStyle={styles.suggestionsContainer}
            ListHeaderComponent={
              <Text style={styles.suggestionsTitle}>Suggested Videos</Text>
            }
          />
        </>
        <TouchableOpacity style={styles.closeButton} onPress={handleCloseModal}>
          <Text style={styles.closeButtonText}>Close</Text>
        </TouchableOpacity>
      </View>
    </RNModal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    //alignItems: 'center',
    padding: 20
  },
  scrollView: {
    width: '100%'
  },
  infoContainer: {
    marginVertical: 0,
    marginBottom: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white'
  },
  description: {
    fontSize: 14,
    color: 'gray'
  },
  toggleText: {
    color: 'blue',
    marginTop: 5
  },
  suggestionsContainer: {
    flexGrow: 1,
    width: '100%'
  },
  suggestionsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  suggestedVideo: {
    paddingVertical: 10
  },
  image: {
    width: width * 0.9,
    height: 200,
    borderRadius: 10
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: 'red',
    borderRadius: 5,
    width:100,
    marginRight:"auto",
    marginLeft:"auto",
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign:"center",
   marginRight:"auto",
   marginLeft:"auto",
  }
});

export default VideoPlayerModal;
