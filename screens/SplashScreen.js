import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View, Image} from 'react-native';


export default function SplashScreen() {


  return (
    <View style={styles.container}>
      <Image
        style={styles.tinyLogo}
        source={require('./../assets/img/target.png')}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0c02b',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tinyLogo: {
    width: 132,
    height: 126,
  },
});
