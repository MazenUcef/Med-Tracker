import { Stack } from "expo-router"
import { StatusBar } from "react-native"

const RootLayout = () => {
  return (
    <>
      <StatusBar barStyle="light-content" />
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: 'white' },
          animation: 'slide_from_right',
          header: () => null,
          navigationBarHidden: true
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        {/* <Stack.Screen name="auth" /> */}
        <Stack.Screen name="medications/add"
          options={
            {
              headerShown: false,
              headerBackTitle: "",
              title: ""
            }
          }
        />
      </Stack>

    </>
  )
}

export default RootLayout