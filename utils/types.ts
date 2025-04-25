import {NativeStackScreenProps} from "@react-navigation/native-stack";
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {Configuration} from "./uicx";

export type UICXParams = { url: string };

export type RootStackParamList = {
    Root: UICXParams
}

export type RootTabStackParamList = {
    Root: { tabs: Required<Configuration['tapbar']> },
    Modal: UICXParams
}

export type TabsStackParamList = {
    [name: string]: UICXParams
}

export type RootScreenProps = NativeStackScreenProps<RootStackParamList, 'Root'>;

export type TabScreenProps<T extends keyof TabsStackParamList = keyof TabsStackParamList> = CompositeScreenProps<
    BottomTabScreenProps<TabsStackParamList, T>,
    NativeStackScreenProps<RootTabStackParamList>
>;