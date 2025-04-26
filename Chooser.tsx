import * as React from "react";
import {View, Button, Text} from "react-native";
import {useApp, apps} from "./state/app";
import Root from "./components/Root";

export default function Chooser(): React.ReactNode {
    const app = useApp(({app}) => app)
    const error = useApp(({error}) => error)
    const selectApp = useApp(({selectApp}) => selectApp)

    if (app === null) {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'space-around'}}>
                <View style={{width: 300, gap: 10}}>
                    {Object.keys(apps).map((key) => <Button title={key} key={key} onPress={() => selectApp(key as keyof typeof apps)} />)}
                    {error && <Text style={{color: 'red'}}>{error}</Text>}
                </View>
            </View>
        );
    }

    return (
        <Root />
    );
}