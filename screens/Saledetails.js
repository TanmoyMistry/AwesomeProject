import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Salereport = ({route}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
 const [dataa, setDataa] = useState([]);
  const getMovies = async () => {
     try {
      const user_id = route.params.paramKey;
      //alert(user_id);
      const response = await fetch('https://customerapp.toniapharmacy.com.ng/dev/api/authentication/get_single_sale?id='+user_id);
      const json = await response.json();
      setData(json.response_data.purchase_data);
      setDataa(json.response_data.total_data);
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
            <Text style={styles.headertext}>Purchase Item</Text>
        </View>

 <View style={styles.boxcontainer}>      
          <FlatList
            data={data}
            keyExtractor={({ id }, index) => id}
            renderItem={({ item }) => (
              
              <View style={styles.box}>
              <View style={styles.boxleft}>
              <Text style={styles.boxtext}>Barcode : {item.item_number}</Text>
              <Text style={styles.boxtext}>Desc : {item.name}</Text>
              <Text style={styles.boxtext}>Price : N {item.item_unit_price}</Text>
              <Text style={styles.boxtext}>Qty. : {item.quantity_purchased}</Text>
              <Text style={styles.boxtext}>Total : N {item.item_unit_price*item.quantity_purchased}</Text>
              
              </View>
              
              </View>

            )}
          />
          
                <Text style={styles.boxtext3} >Total Amount : N {dataa.sales_amount}</Text>
               
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
    minHeight:'20%',
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

  boxtext3:{
   color:'#008D20',
   textAlign: 'center',
   fontSize: 22,
  },
  

});