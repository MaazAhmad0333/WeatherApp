import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import SearchBar from "./components/SearchBar";
import Weather from "./components/Weather";
import { useState } from "react";

export default function App() {
  const [savedName, setSavedName] = useState("");
  const [backgroundImg, setBackgroundImg] = useState("");

  function cityNameHandler(cityName) {
    setSavedName(cityName);
  }

  function backgroundHandler(background) {
    setBackgroundImg(background);
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={backgroundImg}
        resizeMode="cover"
        style={styles.container}
      >
        <SearchBar
          cityName={cityNameHandler}
          style={{ justifyContent: "center" }}
        />
        <Weather cityName={savedName} background={backgroundHandler} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: Dimensions.get("screen").width,
    alignItems: "center",
    justifyContent: "center",
  },
});
