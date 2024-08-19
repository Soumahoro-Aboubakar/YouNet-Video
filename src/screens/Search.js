import * as React from 'react';
import { Keyboard, TouchableWithoutFeedback, View } from 'react-native';
import { gStyle } from '../constants';

// components
import Cast from '../components/Cast';
import HeaderSearch from '../components/HeaderSearch';
import VideoResults from '../components/VideoResults';
import { VideoContext } from '../components/Context';
import DisplayVideosSeries from '../components/DisplayVideosSeries';

function Search() {
  const { value, setValue } = React.useContext(VideoContext);
 const [searchResult,setSearchResult] = React.useState([])
 const [showHeader,setShowHeader] = React.useState(false)

  return (
    <React.Fragment>
      <TouchableWithoutFeedback accessible={false} onPress={Keyboard.dismiss} >
        <>
        {!showHeader &&  <HeaderSearch setSearchResult={setSearchResult} />}
          <DisplayVideosSeries results={searchResult} isLoading={false} showHeader={showHeader} setShowHeader={setShowHeader} /> 
        </>
      </TouchableWithoutFeedback>
    </React.Fragment>
  );
}

export default Search;
