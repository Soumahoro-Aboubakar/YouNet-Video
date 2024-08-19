import * as React from 'react';
import PropTypes from 'prop-types';
import {
  FlatList,
  Image,
  StyleSheet,
  TouchableOpacity,
  View
} from 'react-native';
import { colors, gStyle, images } from '../constants';
import YoutubePlayer from 'react-native-youtube-iframe';
import mockData from '../mockdata/data';
import { useNavigation } from '@react-navigation/native';
import VideoPlayerModal from './VideoPlayerModal';

function ShowScroller({ dataset = [], type, videoType = '' }) {
  const [videoInfos, setVideoInfos] = React.useState({
    id: '',
    videoTitle: '',
    videoDescription: ''
  });
  const [showVideoPlayer, setShowVideoPlayer] = React.useState(false);
  const navigation = useNavigation();
  //const dataArray = Object.values(mockData[dataset]);
  /*     <YoutubePlayer 
              height ={96}
              play={false}
              videoId='36Wv1nmrZds'
              />
              
              */
  //    console.log(dataset);

  return (
    <>
      {showVideoPlayer && (
        <VideoPlayerModal
          videoId={videoInfos.id}
          videoTitle={videoInfos.videoTitle}
          videoDescription={videoInfos.videoDescription}
          isVisible={showVideoPlayer}
          setIsVisible={setShowVideoPlayer}
          othersVideos={dataset}
          setVideoInfos={setVideoInfos}
        />
      )}
      <FlatList
        contentContainerStyle={gStyle.pHHalf}
        data={dataset}
        horizontal
        keyExtractor={(item,id) => (item.videoId +id + + item.videoTitle).toString()}
        renderItem={({ item }) => {
          let renderItem = <View style={styles[type]} />;        
          if (item.videoImageUrl) {
            renderItem = (
              <TouchableOpacity
                onPress={() => {
                  /* navigation.navigate('DisplayVideosSeries', {
                    name: 'Death note--1',
                    id: 85
                  })  */
                  console.log(item , " item");
                  
                  console.log(item.videoId);
                  if (videoType != 'manga') {
                    setVideoInfos({
                      id: item.videoId,
                      videoTitle: item.videoTitle,
                      videoDescription: item.videoDescription
                    });
                    setShowVideoPlayer(true);
                    return;
                  }
                  navigation.navigate('DisplayVideosSeries', {
                    name: item.videoTitle,
                    totalVideos: item.subVideos.length,
                    videos : item.subVideos
                  });
                }}
              >
                <Image
                  source={{ uri: item.videoImageUrl }}
                  style={styles[`${type}Image`]}
                />
              </TouchableOpacity>
            );
          }

          return renderItem;
        }}
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
}

ShowScroller.propTypes = {
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      videoId: PropTypes.string,
      videoTitle: PropTypes.string,
      videoDescription: PropTypes.string,
      videoImageUrl: PropTypes.string
    })
  ),
  type: PropTypes.string
};

ShowScroller.defaultProps = {
  dataset: [], // Valeur par défaut correcte pour dataset
  type: 'rectangle'
};

const styles = StyleSheet.create({
  rectangle: {
    backgroundColor: colors.infoGrey,
    height: 131,
    marginRight: 8,
    width: 91
  },
  rectangleImage: {
    height: 131,
    marginRight: 8,
    // resizeMode: 'contain',
    width: 91
  },
  round: {
    backgroundColor: colors.infoGrey,
    borderRadius: 48,
    height: 96,
    marginRight: 8,
    width: 96
  },
  roundImage: {
    height: 96,
    marginRight: 8,
   // resizeMode: 'contain',
    width: 96
  }
});

export default ShowScroller;
