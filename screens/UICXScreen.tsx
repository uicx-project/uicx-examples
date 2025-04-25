import * as React from 'react';
import type {RootScreenProps, TabScreenProps} from "../utils/types";
import {ActivityIndicator, Platform, StyleSheet, Text, View} from "react-native";
import {State, useUICX} from "../utils/hooks";
import {WebView} from "react-native-webview";
import * as SplashScreen from "expo-splash-screen";

const UICXScreen: React.FC<TabScreenProps | RootScreenProps> = ({route}) => {
    const [state, content] = useUICX(route.params.url);

    if (state === State.Loading || state === State.Initializing) {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
            </View>
        );
    }

    if (state === State.Errored) {
        return (
            <View style={styles.container}>
                <Text>An error occurred.</Text>
            </View>
        );
    }



    if (Platform.OS === 'web') {
        return (
            <View style={styles.container}>
                <iframe src={'data:text/html;base64,' + btoa(content as string)} style={{flex: 1, width: '100%'}} frameBorder={0} />
            </View>
        );
    }

    return (

        <WebView
            originWhitelist={['*']}
            source={{ html: content as string }}
            style={styles.container}
            onLayout={() => SplashScreen.hide()}
            startInLoadingState={true}
            renderLoading={() => <ActivityIndicator />}
        />

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

export default UICXScreen;