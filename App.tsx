import { useEffect } from "react";
import { AppRegistry, PermissionsAndroid } from "react-native";
import { GluestackUIProvider, config } from "@gluestack-ui/themed";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Home from "./src/screens/Home/Home";
import { SheetProvider } from "react-native-actions-sheet";
import { Provider } from "react-redux";
import store from "./src/store/store";
import { Alert } from "react-native";
import messaging from "@react-native-firebase/messaging";

import * as Calendar from "expo-calendar";

messaging().setBackgroundMessageHandler(async (remoteMessage) => {
  console.log("Message handled in the background!", remoteMessage);
});

AppRegistry.registerComponent("app", () => App);

const Stack = createNativeStackNavigator();

export default function App() {
  useEffect(() => {
    (async () => {
      const { status } = await Calendar.requestCalendarPermissionsAsync();
      if (status === "granted") {
        const calendars = await Calendar.getCalendarsAsync(
          Calendar.EntityTypes.EVENT
        );
        // console.log("Here are all your calendars:");
        // console.log(calendars);
      }
    })();
  }, []);

  useEffect(() => {
    const result = PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
    );
    console.log("result", result);
  }, []);

  useEffect(() => {
    messaging()
      .registerDeviceForRemoteMessages()
      .then(() => {
        messaging()
          .getToken()
          .then((token) => {
            console.log("the token", token);
          });
      });

    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      Alert.alert("A new FCM message arrived!", JSON.stringify(remoteMessage));
    });

    return unsubscribe;
  }, []);

  return (
    <Provider store={store}>
      <GluestackUIProvider config={config.theme}>
        <SheetProvider>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerShown: false,
              }}
            >
              <Stack.Screen name="Home" component={Home} />
            </Stack.Navigator>
          </NavigationContainer>
        </SheetProvider>
      </GluestackUIProvider>
    </Provider>
  );
}
