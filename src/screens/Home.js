import * as React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
import { gStyle } from '../constants';

// components
import Cast from '../components/Cast';
import HeaderHome from '../components/HeaderHome';
import PromotionBanner from '../components/PromotionBanner';
import ShowScroller from '../components/ShowScroller';
import { VideoContext } from '../components/Context';

function Home() {
  // on active tab press, scroll to top

  const ref = React.useRef(null);
  useScrollToTop(ref);
  const { value, setValue } = React.useContext(VideoContext);

  const [showHeader, setShowHeader] = React.useState(true);
  const [actions, setActions] = React.useState([]);
  const [mangas, setMangas] = React.useState([]);
  const [animes, setAnimes] = React.useState([]);
  const [artMatials, setArtMartials] = React.useState([]);
  const [serieMaliennes, setSerieMaliennes] = React.useState([]);
  const [serieNigeriennes, setSerieNigeriennes] = React.useState([]);
  const [offset, setOffset] = React.useState(0);

  const onScroll = (event) => {
    let show = showHeader;
    const currentOffset = event.nativeEvent.contentOffset.y;
    show = currentOffset < offset;

    if (show !== showHeader || offset <= 0) {
      // account for negative value with "bounce" offset
      if (offset <= 0) show = true;

      setShowHeader(show);
    }

    setOffset(currentOffset);
  };

  React.useEffect(() => {
    if (Array.isArray(value)) {
      let movies = value[0];
      for (let video = 0; video < movies.videos.length; video++) {
        let movie = movies.videos[video];
        switch (movie.videoCategory) {
          case 'Anime':
            setAnimes(prevAnimes => [...prevAnimes, movie]);            
            break;
          case 'Action':
            setActions(prevAction => [...prevAction, movie]);
            break;
          case 'Art_Matial':
            setArtMartials(prevArtMartial => [...prevArtMartial, movie]);
            break;
          case 'Manga':
            setMangas(prevMangas => [...prevMangas, movie]);
            break;
          case 'Serie_Malienne':
            setSerieMaliennes(prevMangas => [...prevMangas, movie]);
            break;  
          case 'Serie_Nigerienne':
              setSerieNigeriennes(prevMangas => [...prevMangas, movie]);
              break;  
          default:
            console.log('Unrecognized category:', movie.videoCategory);
        }
      }
    }
  }, [value]);
  
  return (
    <View style={gStyle.container}>
      <HeaderHome show={showHeader} />

      <ScrollView
        ref={ref}
        bounces
        onScroll={onScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        <PromotionBanner />

        <Text style={gStyle.heading}>Mangas en francais</Text>
        <ShowScroller dataset={mangas} type="round" videoType="manga" />

        <Text style={gStyle.heading}>Actions</Text>
        <ShowScroller dataset={actions} />

       {/*  <Text style={gStyle.heading}>Drame et Comedie</Text>
        <ShowScroller  />
 */}
        <Text style={gStyle.heading}>Le Club des petits</Text>
        <ShowScroller dataset={animes}/>

        <Text style={gStyle.heading}>Les Arts martiaux</Text>
        <ShowScroller  dataset={artMatials} />

        <Text style={gStyle.heading}>Les Series maliennes</Text>
        <ShowScroller dataset={serieMaliennes} videoType="manga"/>

        <Text style={gStyle.heading}>Series Nigerienenes et Autres</Text>   
        <ShowScroller dataset={serieNigeriennes} />

        <View style={gStyle.spacer3} />
      </ScrollView>
    </View>
  );
}

export default Home;
