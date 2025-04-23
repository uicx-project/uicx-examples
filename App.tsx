import { StatusBar } from 'expo-status-bar';
import { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AppContext, type Configuration, isConfiguration } from './AppContext';

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [configuration, setConfiguration] = useState<false | null | Configuration>(null);

  useEffect(() => {
    async function prepare() {
      try {
        const res = await fetch('https://uicx-project.github.io/uicx-examples/assets/simple/configuration.json');
        const conf = await res.json();
        
        if (isConfiguration(conf)) {
          setConfiguration(conf);
        } else {
          setConfiguration(false);
        }        
      } catch (e) {
        console.error(e);
        setConfiguration(false);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(() => {
    if (configuration) {
      SplashScreen.hide();
    }
  }, [configuration]);

  if (configuration === null) {
    return (
      <View style={styles.container}>
          <Text>Loading.</Text>
          <StatusBar style="auto" />
      </View>
    );
  }

  if (configuration === false) {
    return (
      <View style={styles.container}>
          <Text>Invalid configuration.</Text>
          <StatusBar style="auto" />
      </View>
    );
  }

  return (
    <AppContext.Provider value={configuration}>
      <View style={styles.container} onLayout={onLayoutRootView}>
          <Text>Open up App.tsx to start working on your app!</Text>
          <StatusBar style="auto" />
      </View>
    </AppContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
