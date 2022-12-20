import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Supportdetails = ({route}) => {



    const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const [dataa, setDataa] = useState([]);

  const getMovies = async () => {
     try {
      const user_id = route.params.paramKey;
      //alert(user_id);
      const response = await fetch('https://customerapp.toniapharmacy.com.ng/dev/api/authentication/get_single_issue?id='+user_id);
      const json = await response.json();
      setData(json.response_data.users);
      setDataa(json.response_data);
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
            <Text style={styles.headertext}>Support Details</Text>
        </View>

 <View style={styles.boxcontainer}>       
        <Text><Text style={styles.textbold}>Title :</Text> {data.title}</Text>
       <Text><Text style={styles.textbold}>Type :</Text> {dataa.type}</Text>
       <Text style={styles.textbold}>Content :</Text> 
       <Text style={styles.content}>{data.content}</Text>
       <Text><Text style={styles.textbold}>Status :</Text> {dataa.t_status}</Text>
       <Text><Text style={styles.textbold}>Submited-Date :</Text> {data.date_text}</Text>

</View>
      </View> 
  );

}

export default Supportdetails;

const styles = StyleSheet.create({
  container: {
    flex : 1,
    
  },
  boxcontainer: {
   width:'95%',

    padding:16,
    borderWidth: 2,
    borderColor: "thistle",
    borderRadius: 10,
   
    flexWrap :'wrap',
    margin:10

    
  },
  textbold :{
  fontWeight: 'bold'
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

    padding:16,
    borderWidth: 2,
    borderColor: "thistle",
    borderRadius: 40,
    flexDirection :'row',
    flexWrap :'wrap',
    marginBottom:10
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
  content:{
    width: '100%',
    textAlign : 'justify',
  }

});