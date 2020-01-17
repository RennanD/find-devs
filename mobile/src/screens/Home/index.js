import React, { useEffect, useState } from "react";

import { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

import {
  Container,
  Avatar,
  Name,
  Content,
  Bio,
  Techs,
  FormInput,
  SearchForm,
  FloatButton
} from "./styles";

export default function Home({ navigation }) {
  const [currentRegion, setCurremtRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true
        });

        const { latitude, longitude } = coords;

        setCurremtRegion({
          latitude,
          longitude,
          latitudeDelta: 0.03,
          longitudeDelta: 0.03
        });
      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <Container initialRegion={currentRegion}>
        <Marker
          coordinate={{
            latitude: currentRegion.latitude,
            longitude: currentRegion.longitude
          }}
        >
          <Avatar
            source={{
              uri: "https://avatars3.githubusercontent.com/u/15038553?s=460&v=4"
            }}
          />
          <Callout
            onPress={() =>
              navigation.navigate("Profile", { github_username: "rennand" })
            }
          >
            <Content>
              <Name>Rennan Douglas</Name>
              <Bio>Hey guys, I'm a robot that codes like a human</Bio>
              <Techs>React Native, React Js, Node.js</Techs>
            </Content>
          </Callout>
        </Marker>
      </Container>
      <SearchForm>
        <FormInput
          placeholder="Buscar devs por techs..."
          autoCapitalize="words"
          autoCorrect={false}
        />
        <FloatButton>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </FloatButton>
      </SearchForm>
    </>
  );
}

Home.navigationOptions = {
  title: "Find Devs"
};
