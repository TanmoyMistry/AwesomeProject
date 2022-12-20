import React,{ useEffect, useState } from 'react';

import {StyleSheet, Text, View ,TouchableOpacity} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Dashboard = ({navigation}) => {
const [isLoading, setLoading] = useState(true);
   const [data, setData] = useState([]);

     const getMovies = async () => {
     try {
      const user_id = await AsyncStorage.getItem('student_id');
      const response = await fetch('https://customerapp.toniapharmacy.com.ng/dev/api/authentication/get_wallet?user_id='+user_id);
      const json = await response.json();
      setData(json.wallet);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

const handleLogout = async()=>{
  try{
    console.log('logout');
    await AsyncStorage.clear();
    navigation.navigate('Login');
  }catch(err){
    console.log(err);
  }
}

  return (

      <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headertext}>Welcome {data.first_name}</Text>
        </View>
        <View style={styles.boxcontainer}>
         <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Listing')}>
          <View style={styles.innera}>
           <AntDesign name="export2" size={80} color="#ffffff" />
            <Text style={styles.boxtext}>Support List</Text>
          </View>
         </TouchableOpacity>
         <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Support')}>
          <View style={styles.innerf}>
            <AntDesign name="weibo" size={80} color="#ffffff" />
            <Text style={styles.boxtext}>New Support</Text>
          </View>
         </TouchableOpacity>

         <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('Salereport')}>
          <View style={styles.innerb}>
            <AntDesign name="notification" size={80} color="#ffffff" />
            <Text style={styles.boxtext}>Purchase History</Text>
          </View>
         </TouchableOpacity>
         <View style={styles.box}>
          <View style={styles.innerc}>
            <AntDesign name="dingding" size={80} color="#ffffff" />
            <Text style={styles.boxtext}>Loyalty Wallet</Text>
            <Text style={styles.boxtext}>N {data.royalty_wallet}</Text>
          </View>
         </View>
         <TouchableOpacity style={styles.box} onPress={()=>navigation.navigate('WalletHistory')}>
          <View style={styles.innerd}>
            <AntDesign name="CodeSandbox" size={80} color="#ffffff" />
            <Text style={styles.boxtext}>Wallet History</Text>
          </View>
         </TouchableOpacity>
         <TouchableOpacity style={styles.box} onPress={()=>handleLogout()}>
          <View style={styles.innere}>
            <AntDesign name="logout" size={80} color="#ffffff" />
            <Text style={styles.boxtext}>Logout</Text>
          </View>
         </TouchableOpacity>
        </View>
      </View>
    
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    
  },
  boxcontainer: {
    width:'100%',
    height:'95%',
    padding:5,
    flexDirection :'row',
    flexWrap :'wrap',
  },
  header: {
    width: '100%',
    height :'15%',
    backgroundColor : '#F54860',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headertext:{
    fontSize:20,
    color:'#ffffff'
  },
  box: {
    width:'50%',
    height:'30%',
    padding:5,
  },
  innera:{
    flex:1,
    backgroundColor : '#0099da',
    alignItems : 'center',
    justifyContent : 'center'
  },
  innerb:{
    flex:1,
    backgroundColor : '#31d09c',
    alignItems : 'center',
    justifyContent : 'center'
  },
  innerc:{
    flex:1,
    backgroundColor : '#8c5d86',
    alignItems : 'center',
    justifyContent : 'center'
  },
  innerd:{
    flex:1,
    backgroundColor : '#f29466',
    alignItems : 'center',
    justifyContent : 'center'
  },
  innere:{
    flex:1,
    backgroundColor : '#fb7672',
    alignItems : 'center',
    justifyContent : 'center'
  },
  innerf:{
    flex:1,
    backgroundColor : '#5a86b7',
    alignItems : 'center',
    justifyContent : 'center'
  },
  boxtext:{
    fontSize:25,
    color:'#ffffff'
  }

});