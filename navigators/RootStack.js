import React,{useState,useEffect} from 'react';
import { Colors } from './../components/styles';

const {primary,tertiary} = Colors;

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './../screens/SplashScreen';
import Login from './../screens/Login';
import Signup from './../screens/Signup';
import Dashboard from './../screens/Dashboard';
import Listing from './../screens/Listing';
import Salereport from './../screens/Salereport';
import Support from './../screens/Support';
import Supportdetails from './../screens/Supportdetails';
import Saledetails from './../screens/Saledetails';
import WalletHistory from './../screens/WalletHistory';
import WalletHistory2 from './../screens/WalletHistory2';
const Stack = createNativeStackNavigator();

const RootStack = () =>{


  const [showSplashScreen,setShowSplashScreen] = useState("true");

  useEffect(() => {
    setTimeout(()=>{
      setShowSplashScreen(false);
    },3000);
  },[]);

  return(
      <NavigationContainer>

        <Stack.Navigator
          screenOptions={{
            headerStyled:{
              backgroundColor : 'transparent'
            },
            headerTinColor : tertiary,
            headerTransparent : true,
            headerTitle : '',
            headerLeftContainerStyle : {
              paddingLeft : 20
            }


          }}
          initialRouteName="Splash"
        >
        {showSplashScreen ? (
          <Stack.Screen name="Splash" component={SplashScreen}  options={{headerShown:false}}/>
          ) : null}
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Dashboard" component={Dashboard} />
          <Stack.Screen name="Listing" component={Listing} />
          <Stack.Screen name="Salereport" component={Salereport} />
          <Stack.Screen name="Saledetails" component={Saledetails} />
          <Stack.Screen name="WalletHistory" component={WalletHistory} />
          <Stack.Screen name="Loyalty Wallet" component={WalletHistory2} />
          <Stack.Screen name="Support" component={Support} />
          <Stack.Screen name="Supportdetails" component={Supportdetails} />
        </Stack.Navigator>
      </NavigationContainer>
    );
};

export default RootStack;