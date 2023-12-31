import { TextInput, View, StyleSheet, Dimensions } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useState } from "react";

const SearchBar = (props) => {
  const [name, setName] = useState("");

  function cityNameHandler(cityName) {
    setName(cityName);
  }

  function nameEnterHandler() {
    props.cityName(name);
  }

  return (
    <View style={styles.searchBar}>
      <TextInput placeholder="Enter Your City" onChangeText={cityNameHandler} />
      <Feather
        name="search"
        size={24}
        color="black"
        onPress={nameEnterHandler}
      />
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    borderWidth: 1.5,
    borderColor: "white",
    width: Dimensions.get("screen").width - 40,
    padding: 10,
    borderRadius: 200,
    marginTop: 200,
    backgroundColor: "white",
  },
});
