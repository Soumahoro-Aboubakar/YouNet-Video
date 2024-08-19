import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity
} from 'react-native';
import HeaderMangaOrSeries from '../components/HeaderMangaOrSeries';
import { useRoute } from '@react-navigation/native';
import VideoPlayerModal from './VideoPlayerModal';
import Cast from './Cast';

const DisplayVideosSeries = ({
  showHeader = true,
  results = [],
  setShowHeader = ()=> console.log("")
}) => {
  const route = useRoute();
  //const { name, totalVideos, videos_ } = route.params || {};
  const [videos, setVideos] = React.useState(route.params?.videos || []);
  const [name, setName] = React.useState(route.params?.name || '');
  const [totalVideos, setTotalVideos] = React.useState(
    route.params?.totalVideos || 0
  );

  const [videoInfos, setVideoInfos] = React.useState({
    id: '',
    videoTitle: '',
    videoDescription: ''
  });
  const [showVideoPlayer, setShowVideoPlayer] = React.useState(false);
  const renderItem = ({ item }) => (
    <View style={styles.item}>
      {/* <YouTubeIframe
        videoId={item.videoId}
        height={200}
        play={false} // Mettre à true si vous voulez que la vidéo joue automatiquement
      /> */}
      <TouchableOpacity
        onPress={() => {
          if (
            item.subVideos?.length > 0 &&
            item.subVideos[0]?.videoTitle.length > 2
          ) {
            setShowHeader(true);
            setVideos(item.subVideos);
            setTotalVideos(item.subVideos.length);
            setName(item.subVideos[0].videoTitle);
            return;
          }
          setVideoInfos({
            id: item.videoId,
            videoTitle: item.videoTitle,
            videoDescription: item.videoDescription
          });
          setShowVideoPlayer(true);
        }}
      >
        <Image source={{ uri: item.videoImageUrl }} style={styles.thumbnail} />
      </TouchableOpacity>
      <Text style={styles.title}>{item.videoTitle}</Text>
      {/*  <Text style={styles.description}>{item.videoDescription}</Text> */}
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      {showHeader && (
        <HeaderMangaOrSeries mangaTitle={name} totalVideos={totalVideos} />
      )}
      {showVideoPlayer && (
        <VideoPlayerModal
          videoId={videoInfos.id}
          videoTitle={videoInfos.videoTitle}
          videoDescription={videoInfos.videoDescription}
          isVisible={showVideoPlayer}
          setIsVisible={setShowVideoPlayer}
          othersVideos={videos}
          setVideoInfos={setVideoInfos}
        />
      )}
      <FlatList
        data={showHeader ? videos : results}
        renderItem={renderItem}
        keyExtractor={(item, id) => item.videoId.toString() + id}
        contentContainerStyle={styles.container}
      />
      <Cast  setShowHeader={setShowHeader}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  item: {
    marginBottom: 10
  },
  thumbnail: {
    width: '100%',
    height: 200,
    marginVertical: 10,
    borderRadius:5,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white'
  },
  description: {
    fontSize: 16,
    color: 'gray'
  }
});

export default DisplayVideosSeries;
