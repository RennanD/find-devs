import React, { useEffect, useState } from "react";

import { Marker, Callout } from "react-native-maps";
import { MaterialIcons } from "@expo/vector-icons";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

import api from "../../services/api";
import {
  connect,
  disconnect,
  subscribeNewDev
} from "../../services/websockets";

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
  const [techs, setTechs] = useState("");
  const [devs, setDevs] = useState([]);

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

  useEffect(() => {
    subscribeNewDev(dev => setDevs([...devs, dev]));
  }, [devs]);

  function setupSocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get("/search", {
      params: {
        latitude,
        longitude,
        techs
      }
    });
    const data = response.data.map(dev => ({
      ...dev,
      techs: dev.techs.join(", ")
    }));

    setDevs(data);
    setupSocket();
  }

  function handleRegionChanged(rergion) {
    setCurremtRegion(rergion);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <Container
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              longitude: dev.location.coordinates[0],
              latitude: dev.location.coordinates[1]
            }}
          >
            <Avatar
              source={{
                uri: dev.avatar_url
              }}
            />
            <Callout
              onPress={() =>
                navigation.navigate("Profile", {
                  github_username: DeviceLightEvent.github_username
                })
              }
            >
              <Content>
                <Name>{dev.name}</Name>
                <Bio>{dev.bio}</Bio>
                <Techs>{dev.techs}</Techs>
              </Content>
            </Callout>
          </Marker>
        ))}
      </Container>
      <SearchForm>
        <FormInput
          placeholder="Buscar devs por techs..."
          autoCapitalize="words"
          autoCorrect={false}
          value={techs}
          onChangeText={setTechs}
        />
        <FloatButton onPress={loadDevs}>
          <MaterialIcons name="my-location" size={20} color="#FFF" />
        </FloatButton>
      </SearchForm>
    </>
  );
}

Home.navigationOptions = {
  title: "Find Devs"
};
