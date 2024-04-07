import FontAwesome from "@expo/vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { DarkTheme, ThemeProvider } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { router, Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { PaperProvider, TextInput } from "react-native-paper";
import { theme } from "../theme";
import { searchStocks } from "../utils/searchStocks";
import { Ionicons } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";
import { ClerkProvider, useAuth } from "@clerk/clerk-expo";

export { ErrorBoundary } from "expo-router";

const CLERK_PUBLISHABLE_KEY = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY;

const tokenCache = {
  async getToken(key) {
    try {
      return SecureStore.getItemAsync(key);
    } catch (error) {
      return null;
    }
  },

  async saveToken(key, value) {
    try {
      return SecureStore.getItemAsync(key, value);
    } catch (error) {
      return;
    }
  },
};

export const unstable_settings = {
  initialRouteName: "(tabs)",
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    // SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    mon: require("../assets/fonts/Montserrat-Regular.ttf"),
    "mon-b": require("../assets/fonts/Montserrat-Bold.ttf"),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ClerkProvider
      publishableKey={CLERK_PUBLISHABLE_KEY}
      tokenCache={tokenCache}
    >
      <RootLayoutNav />
    </ClerkProvider>
  );
}

export const StoreContext = createContext({
  searchQuery: "",
  setSearchQuery: () => {},
  searchedStocks: [],
  setSearchedStocks: () => {},
  likedStocks: [],
  updadeLikedStocks: () => {},
});

function RootLayoutNav() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedStocks, setSearchedStocks] = useState([]);
  const [likedStocks, setLikedStocks] = useState([]);

  const { isLoaded, isSignedIn } = useAuth();

  const updadeLikedStocks = async (ticker, op) => {
    const prevStocks = [...likedStocks];
    const newStocks =
      op === "del"
        ? prevStocks.filter((item) => item !== ticker)
        : [ticker, ...prevStocks];
    try {
      await AsyncStorage.setItem("watchlist", JSON.stringify(newStocks));
      setLikedStocks(newStocks);
    } catch (error) {
      setLikedStocks(prevStocks);
    }
  };

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      router.push("/(modals)/login");
    }
  }, [isLoaded]);

  useEffect(() => {
    async function getLinkedStocks() {
      const stocks = await AsyncStorage.getItem("watchlist");
      if (stocks) setLikedStocks(JSON.parse(stocks));
    }
    getLinkedStocks();
  }, []);

  return (
    <PaperProvider theme={theme}>
      <ThemeProvider value={DarkTheme}>
        <StoreContext.Provider
          value={{
            searchQuery,
            setSearchQuery,
            searchedStocks,
            setSearchedStocks,
            likedStocks,
            updadeLikedStocks,
          }}
        >
          <GestureHandlerRootView style={{ flex: 1 }}>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="[ticker]" options={{ headerShown: false }} />
              <Stack.Screen
                name="search"
                options={{
                  headerBackTitleVisible: false,
                  headerTitle: () => (
                    <TextInput
                      mode="outlined"
                      placeholder="Search Stocks ..."
                      autoFocus
                      dense
                      style={{ width: "88%" }}
                      onChangeText={(text) => {
                        setSearchQuery(text);
                        const stocks = searchStocks(text);
                        setSearchedStocks(stocks);
                      }}
                    />
                  ),
                }}
              />
              <Stack.Screen name="modal" options={{ presentation: "modal" }} />
              <Stack.Screen
                name="(modals)/login"
                options={{
                  title: "Log In",
                  headerTitleStyle: {
                    fontFamily: "mon-b",
                  },
                  presentation: "modal",
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                      <Ionicons
                        name="close-outline"
                        size={28}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
              <Stack.Screen
                name="(modals)/register"
                options={{
                  title: "Sign Un",
                  headerTitleStyle: {
                    fontFamily: "mon-b",
                  },
                  presentation: "modal",
                  headerLeft: () => (
                    <TouchableOpacity onPress={() => router.back()}>
                      <Ionicons
                        name="close-outline"
                        size={28}
                        color={"white"}
                      />
                    </TouchableOpacity>
                  ),
                }}
              />
            </Stack>
          </GestureHandlerRootView>
        </StoreContext.Provider>
      </ThemeProvider>
    </PaperProvider>
  );
}
