import React, {useEffect} from 'react';
import {requestPermission, getCurrentPermission} from 'react-native-location';
import {Container} from './styles';

export default function Home() {
  useEffect(() => {
    async function loadInitialPosition() {
      await requestPermission();
    }
    loadInitialPosition();
  }, []);

  return <Container />;
}

Home.navigationOptions = {
  title: 'Find Devs',
};
