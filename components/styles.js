import styled from 'styled-components';
import { View,Text,Image,TextInput,TouchableOpacity} from 'react-native';
import Constants from 'expo-constants';

const StatusBarHeight = Constants.statusBarHeight;

export const Colors = {
  primary : '#ffffff',
  secondary : '#E5E7EB',
  tertiary : '#1F2937',
  darklight : '#9CA3EF',
  brand : '#6D28D9',
  green : '#ffffff',
  red : '#ffffff',
}

const {primary,secondary,tertiary,darklight,brand,green,red} = Colors;

export const StyledContainer = styled.View`
  flex : 1;
  padding : 25px;
  padding-top : ${StatusBarHeight + 30}px;
  background-color : ${primary};
`
;

export const InnerContainer = styled.View`
  flex : 1;
  width : 100%;
  align-items : center;
`
;

export const PageLogo = styled.Image`
  height : 200px;
  width : 200px;
`
;

export const InnerPageLogo = styled.Image`
  height : 70px;
  width : 70px;
`
;

export const Pagetitle = styled.Text`
  font-size : 30px;
  text-align : center;
  font-weight : bold;
  color : ${brand};
  padding : 10px;
`
;

export const SubTitle = styled.Text`
  font-size : 18px;
  margin-bottom: 20px;
  leter-spacing : 1px;
  text-align : center;
  font-weight : bold;
  color : ${tertiary};
`

export const StyledFromArea = styled.View`
  width : 98%;
`
export const StyledTextInput = styled.TextInput`
  background-color : ${secondary};
  padding : 15px;
  padding-left : 55px;
  padding-right : 55px;
  border-radius:5px;
  font-size : 16px;
  height : 60px;
  margin-vertical : 3px; 
  margin-bottom : 10px;
  color : ${tertiary};
`

export const StyledInputLabel = styled.Text`
  text-align : left;
  font-size : 16px;
  color : ${tertiary};
`
export const LeftIcon = styled.View`
  left:15px;
  top:38px;
  position:absolute;
  z-index:1;
`
export const RightIcon = styled.TouchableOpacity`
  left:15px;
  top:38px;
  position:absolute;
  z-index:1;
`
export const StyledButton = styled.TouchableOpacity`
  background-color : ${brand};
  justify-content:center;
  align-items:center;
  border-radius:5px;
  padding : 15px;
  height : 60px;
  margin-vercical : 5px;
`
export const StyledButtonText = styled.Text`
  font-size : 16px;
  color : ${primary};
`
export const Line = styled.View`
  margin-vertical : 10px;
  height : 1px;
  width:100%;
  background-color:${darklight}
`
export const ExtraView = styled.View`
  justify-content:center;
  flex-direction:row;
  align-content:center;;
  padding : 10px;
`
export const ExtraText = styled.Text`
  justify-content:center;
  align-content:center;
  color : ${tertiary};
  font-size : 15px;
`
export const TextLink = styled.TouchableOpacity`
  justify-content:center;
  align-items:center;
`
export const TextLinkContent = styled.Text`
  color : ${brand};
  font-size : 15px;
`
export const MsgBox = styled.Text`
  color : ${brand};
  font-size : 15px;
`