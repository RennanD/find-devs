import styled from "styled-components/native";
import MapView from "react-native-maps";

export const Container = styled(MapView)`
  flex: 1;
`;

export const Avatar = styled.Image`
  height: 54px;
  width: 54px;
  border-radius: 4px;
  border: 1px #fff;
  border-style: solid;
`;

export const Content = styled.View`
  width: 260px;
  padding: 5px 10px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;
export const Bio = styled.Text`
  color: #666;
  margin-top: 5px;
`;

export const Techs = styled.Text`
  margin-top: 5px;
`;
