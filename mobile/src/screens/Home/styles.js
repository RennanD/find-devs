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

export const SearchForm = styled.View.attrs({
  placeholderTextColor: "#999"
})`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
  align-items: center;
  elevation: 2;
`;

export const FormInput = styled.TextInput`
  flex: 1;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 15px;
  padding: 0 20px;
`;

export const FloatButton = styled.TouchableOpacity`
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background: #7159c1;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`;
