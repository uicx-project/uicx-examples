import * as React from 'react';
import {AppContext} from "../utils/AppContext";
import {NavigationContainer} from "@react-navigation/native";
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import UICXScreen from "../screens/UICXScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import type {RootStackParamList, RootTabStackParamList, TabsStackParamList} from "../utils/types";
import {useCallback} from "react";
import * as SplashScreen from "expo-splash-screen";
import {Configuration} from "../utils/uicx";

const Stack = createNativeStackNavigator<RootTabStackParamList | RootStackParamList>();
const Tab = createBottomTabNavigator<TabsStackParamList>();

const TabNavigator: React.FC<NativeStackScreenProps<RootTabStackParamList, 'Root'>> = ({route}) => {
    return (
        <Tab.Navigator screenOptions={{headerShown: true}}>
            {Object.keys(route.params.tabs).map(name => (
                <React.Fragment key={name}>
                    <Tab.Screen
                        key={name}
                        name={name}
                        component={UICXScreen}
                        initialParams={{url: route.params.tabs[name]}}
                    />
                </React.Fragment>
            ))}
        </Tab.Navigator>
    )
}

const Navigator: React.FC<{ configuration: Configuration }> = ({configuration}) => {
    const onReady = useCallback(() => {
        setTimeout(() => {
            SplashScreen.hide();
        }, 1000);
    }, []);

    if (configuration?.tapbar) {
        return (
            <NavigationContainer onReady={onReady}>
                <Stack.Navigator screenOptions={{headerShown: false}}>
                    <Stack.Screen
                        name="Root"
                        component={TabNavigator}
                        initialParams={{tabs: configuration.tapbar}}
                    />
                    <Stack.Screen
                        name="Modal"
                        component={UICXScreen}
                        options={{presentation: "fullScreenModal"}}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer onReady={onReady}>
            <Stack.Navigator>
                <Stack.Screen
                    name="Root"
                    component={UICXScreen}
                    initialParams={{url: '/'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default function Root(): React.ReactNode {
    return <AppContext.Consumer>{(value) => <Navigator configuration={value}/>}</AppContext.Consumer>
}