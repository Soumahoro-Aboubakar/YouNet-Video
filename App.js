import * as React from 'react';
import { createContext } from 'react';
import { StatusBar, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { func } from './src/constants';

// root stack navigation
import RootStack from './src/navigation/RootStack';
import { dataVideoSet } from './dataSet';
import { VideoContext } from './src/components/Context';

SplashScreen.preventAutoHideAsync();


function App() {
  const [isLoading, setIsLoading] = React.useState(true);
  const [value, setValue] = React.useState(dataVideoSet);

  React.useEffect(() => {
    async function prepare() {
      try {
        // pre-load/cache assets: images, fonts, and videos
        await func.loadAssetsAsync();
      } catch (e) {
        // console.warn(e);
      } finally {
        // loading is complete, show app
        setIsLoading(false);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = React.useCallback(async () => {
    if (isLoading === false) {
      // loading is complete, hide Splash Screen and show app
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <VideoContext.Provider value={{ value, setValue }}>
      <React.Fragment>
        <StatusBar barStyle="light-content" />

        <RootStack />

        <View onLayout={onLayoutRootView} />
      </React.Fragment>
    </VideoContext.Provider>
  );
}

export default App;
