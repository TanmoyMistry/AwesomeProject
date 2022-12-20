import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Listing = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const user_id = await AsyncStorage.getItem('student_id');
      const response = await fetch('/dev/api/authentication/test_issue?user_id='+user_id);
      const json = await response.json();
      setData(json.users);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getMovies();
  }, []);

  return (
          <View style={styles.container}>
        <View style={styles.header}>
            <Text style={styles.headertext}>Support List</Text>
        </View>

 <View style={styles.boxcontainer}>      
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              
              <View style={styles.box}>
              <View style={styles.boxleft}>
              <Text style={styles.boxtext}>{item.tr_title} <Text style={styles.status}>[{item.tr_status}]</Text></Text>
              <View style={styles.boxr}>
              <AntDesign style={styles.icon} name="calendar" size={20} color="#aba7a7" />
              <Text style={styles.boxtext1}>{item.tr_date}</Text>
              </View>
              </View>
              <View style={styles.boxright}>
              <TouchableOpacity onPress={() => navigation.navigate('Supportdetails',{paramKey: item.tr_id}) }>
              <AntDesign style={styles.icon} name="eye" size={20} color="gray" />
              </TouchableOpacity>
              </View>
              </View>

            )}
          />
        
</View>
      </View> 
  );
};

const styles = StyleSheet.create({
  container: {
    flex : 1,
    
  },
  boxcontainer: {
    width:'100%',
    height:'95%',
    padding:5,

    
  },
  header: {
    width: '100%',
    height :'15%',
    backgroundColor : '#F54860',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headertext:{
    fontSize:25,
    color:'#ffffff'
  },
  box: {
    width:'100%',

    padding:15,
    borderWidth: 2,
    borderColor: "thistle",
    borderRadius: 20,
    flexDirection :'row',
    flexWrap :'wrap',
    marginBottom:10
  },
  status: {
    color:'green'
  },
  boxleft:{
   
  },
  boxright:{
   paddingLeft: 8,
  width: 100,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end'

  },

  boxr:{
   paddingLeft: 8,
  width: 100,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'flex-end'

  },

  boxtext1:{
   color:'#aba7a7' 
  },
  icon:{
   marginRight:5
   
  },
  

});