import * as React from 'react';
import {NavigationContainer, } from "@react-navigation/native";
import {createNativeStackNavigator, NativeStackScreenProps} from "@react-navigation/native-stack";
import UICXScreen from "../screens/UICXScreen";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import type {RootStackParamList, RootTabStackParamList, TabsStackParamList} from "../utils/types";
import {Configuration} from "../utils/uicx";
import {Pressable, Text} from "react-native";
import {useApp} from "../state/app";

const Stack = createNativeStackNavigator<RootTabStackParamList | RootStackParamList>();
const Tab = createBottomTabNavigator<TabsStackParamList>();

const TabNavigator: React.FC<NativeStackScreenProps<RootTabStackParamList, 'Root'>> = ({route}) => {
    return (
        <Tab.Navigator screenOptions={{headerShown: false}}>
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

export default function Root(): React.ReactNode {
    const resetApp = useApp(state => state.resetApp);
    const configuration = useApp(state => state.configuration as Configuration);

    if (configuration?.tapbar) {
        return (
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerTitle: configuration.headerTitle,
                    headerRight: () => <Pressable onPress={() => {
                        resetApp()
                    }}><Text>Switch</Text></Pressable>
                }}>
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
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerTitle: configuration.headerTitle,
                headerRight: () => <Pressable onPress={() => {
                    resetApp()
                }}><Text>Switch</Text></Pressable>
            }}>
                <Stack.Screen
                    name="Root"
                    component={UICXScreen}
                    initialParams={{url: '/'}}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
}