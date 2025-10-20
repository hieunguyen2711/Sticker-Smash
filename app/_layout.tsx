import { Stack } from "expo-router";


// A Stack Navigator is the foundation for navigating between different screens in an app. On Android, a stacked route animates on top of
// the current screen. On IOS, a stacked route animates from the right. 
// Expo Router provides a Stack component to create a navigation stack to add new routes
export default function RootLayout() {
  return <Stack>
    <Stack.Screen name="(tabs)" options={{ headerShown: false}}/>
  </Stack >;
}
