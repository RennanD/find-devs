import React, { useEffect, useState } from "react";

import { Marker, Callout } from "react-native-maps";

import {
  requestPermissionsAsync,
  getCurrentPositionAsync
} from "expo-location";

import { Container, Avatar, Name, Content, Bio, Techs } from "./styles";

export default function Home() {
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
        <Callout>
          <Content>
            <Name>Rennan Douglas</Name>
            <Bio>Hey guys, I'm a robot that codes like a human</Bio>
            <Techs>React Native, React Js, Node.js</Techs>
          </Content>
        </Callout>
      </Marker>
    </Container>
  );
}

Home.navigationOptions = {
  title: "Find Devs"
};
