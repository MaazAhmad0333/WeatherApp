import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { Fontisto } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import {
  clear_day,
  clear_night,
  snow_day,
  snow_night,
  rain_day,
  rain_night,
  cloud_day,
  cloud_night,
  haze_day,
  haze_night,
} from "../assets/index";

const API_KEY = "";

const Weather = (props) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [icon, setIcon] = useState("");
  const [background, setBackground] = useState("");

  async function getWeatherData(cityName) {
    setLoading(true);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}`;
    let response = await fetch(API);
    if (response.status == 200) {
      response = await response.json();
      setWeatherData(response);
    } else {
      setWeatherData(null);
    }
    setLoading(false);
  }

  useEffect(() => {
    getWeatherData(props.cityName);
    const iconObj = {
      snow: <FontAwesome name="snowflake-o" size={48} color="black" />,
      clear: <Feather name="sun" size={48} color="black" />,
      haze: <Fontisto name="day-haze" size={48} color="black" />,
      rain: <Ionicons name="rainy" size={48} color="black" />,
      cloud: <Entypo name="cloud" size={48} color="black" />,
    };

    if (weatherData != null) {
      const now = new Date();
      const sunrise = new Date(weatherData.sys.sunrise * 1000);
      const sunset = new Date(weatherData.sys.sunset * 1000);
      const isDayTime = now > sunrise && now < sunset;

      switch (weatherData.weather[0].main) {
        case "Snow":
          setIcon(iconObj.snow);
          isDayTime ? setBackground(snow_day) : setBackground(snow_night);
          break;
        case "Clear":
          setIcon(iconObj.clear);
          isDayTime ? setBackground(clear_day) : setBackground(clear_night);
          break;
        case "Rain":
          setIcon(iconObj.rain);
          isDayTime ? setBackground(rain_day) : setBackground(rain_night);
          break;
        case "Clouds":
          setIcon(iconObj.cloud);
          isDayTime ? setBackground(cloud_day) : setBackground(cloud_night);
          break;
        case "Haze":
          setIcon(iconObj.haze);
          isDayTime ? setBackground(haze_day) : setBackground(haze_night);
          break;
        default:
          setIcon(iconObj.haze);
          isDayTime ? setBackground(haze_day) : setBackground(haze_night);
      }
      props.background(background);
    }
  }, [props.cityName]);

  if (loading) {
    return <ActivityIndicator size="large" />;
  } else if (weatherData == null) {
    return (
      <Text style={{ marginTop: 20, fontSize: 24, textAlign: "center" }}>
        Enter City Name
      </Text>
    );
  } else {
    return (
      <View>
        <View style={styles.box}></View>
        <Text style={styles.deg}>{weatherData.wind.deg}°</Text>
        <Text style={styles.cityName}>{weatherData.name}</Text>
        <View style={styles.icon}>
          <View style={styles.temp}>
            <Text style={{ fontSize: 16, color: "white" }}>
              Humidity: {weatherData.main.humidity}
            </Text>
            <Text style={{ fontSize: 16, color: "white" }}>
              Temp: {weatherData.main.temp}
            </Text>
          </View>
          <View>
            <Text>{icon}</Text>
          </View>
        </View>
      </View>
    );
  }
};

export default Weather;
const styles = StyleSheet.create({
  deg: {
    fontSize: 80,
    textAlign: "center",
    marginTop: "30%",
    color: "white",
  },
  cityName: {
    textAlign: "center",
    fontSize: 20,
    color: "white",
  },
  icon: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: Dimensions.get("screen").width - 50,
    height: "50%",
    alignItems: "center",
  },
  temp: {
    backgroundColor: "black",
    padding: 12,
    borderRadius: 10,
  },
  box: {
    backgroundColor: "black",
    width: Dimensions.get("screen").width - 50,
    height: 130,
    position: "absolute",
    top: 120,
    opacity: 0.5,
    borderRadius: 10,
  },
});
