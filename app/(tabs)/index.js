import { useAuth } from "@clerk/clerk-expo";
import { Link, router } from "expo-router";
import { Button, Pressable, StyleSheet, View } from "react-native";
// import { Button, Text } from "react-native-paper";

export default function HomeScreen() {
  const { signOut, isSignedIn } = useAuth();

  return (
    <View>
      {!isSignedIn && (
        <Link
          style={{ fontSize: 20, marginTop: 10, color: "white" }}
          href={"/(modals)/login"}
        >
          Login
        </Link>
      )}
      <Link
        style={{ fontSize: 20, marginTop: 10, color: "white" }}
        href={"/(modals)/register"}
      >
        Register
      </Link>

      <Button title="Log out" onPress={() => signOut()} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
