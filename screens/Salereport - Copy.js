import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Salereport = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getMovies = async () => {
     try {
      const user_id = 2249; //await AsyncStorage.getItem('student_id');
      const response = await fetch('https://customerapp.toniapharmacy.com.ng/dev/api/authentication/get_salereport?user_id='+user_id);
      const json = await response.json();
      setData(json.salereport);
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
            <Text style={styles.headertext}>Purchase History</Text>
        </View>

 <View style={styles.boxcontainer}>      
          <FlatList
            style={styles.box1}
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              
              <View style={styles.box}>
              <View style={styles.boxleft}>
              <Text style={styles.boxtext}>ID : POS{item.sale_id}</Text>
              <Text style={styles.boxtext}>Total amount : N {item.sales_amount}</Text>
              <Text style={styles.boxtext}>Payment Type : {item.payment_type}</Text>

              <View style={styles.boxr}>
              <AntDesign style={styles.icon} name="calendar" size={20} color="#aba7a7" />
              <Text style={styles.boxtext1}>{item.sale_time}</Text>
              </View>
              </View>
              <View style={styles.boxright}>
              <TouchableOpacity onPress={() => navigation.navigate('Saledetails',{paramKey: item.sale_id}) }>
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
    height:'85%',
    padding:5,

    
  },

  header: {
    width: '100%',
    height :'15%',
    backgroundColor : '#35CE32',
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
    borderRadius: 10,
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
    paddingTop: 8,
  flex: 1,
  flexDirection: 'row',
  alignItems: 'center',
  

  },

  boxtext1:{
   color:'#aba7a7' 
  },
  icon:{
   marginRight:5
   
  },
  

});