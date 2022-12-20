import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Text, View, StyleSheet,TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Saledetails = ({route}) => {

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
            <Text style={styles.headertext}>Purchase Item</Text>
        </View>

 <View style={styles.boxcontainer}>       
        <Text>Barcode : {data.item_number}</Text>
       <Text>Desc : {data.name}</Text>
       <Text>Price : ${data.item_unit_price}</Text>
       <Text>Qty. : {data.quantity_purchased}</Text>
       <Text>Total : {data.sales_amount}</Text>

</View>
      </View> 
  );

}

export default Saledetails;

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
  

});