import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import * as SplashScreen from 'expo-splash-screen';
import { AppContext } from './utils/AppContext';
import Root from "./components/Root";
import {Configuration, isConfiguration} from "./utils/uicx";
import * as React from "react";

SplashScreen.preventAutoHideAsync();

SplashScreen.setOptions({
  duration: 1000,
  fade: true,
});

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

  if (configuration === null) {
    return (
      <View style={styles.container}>
          <ActivityIndicator />
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
      <Root />
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
