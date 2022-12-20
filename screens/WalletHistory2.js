//Example of Infinite Loading Listview in React Native using FlatList
//https://aboutreact.com/infinite-list-view/

//import React in our code
import React, { useState, useEffect } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Component } from 'react';
//import all the components we are going to use
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default WalletHistory2 = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);

  useEffect(() => getData(), []);

  const getData = async () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      console.log('getData');
      setLoading(true);
      //Service to get the data from the server to render
      //const user_id = 2249; //await AsyncStorage.getItem('student_id');
      const user_id = await AsyncStorage.getItem('student_id');
      fetch('https://customerapp.toniapharmacy.com.ng/dev/api/authentication/get_walletReports?user_id='+user_id+'&&offset='+offset)
        //Sending the currect offset with get request
        .then((response) => response.json())
        .then((responseJson) => {
          //Successful response from the API Call
          console.log(responseJson);
          if (responseJson.walletreport.length > 0) {
            setOffset(offset + 1);
            //After the response increasing the offset for the next API call.
            setDataSource([...dataSource, ...responseJson.walletreport]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    return (
      //Footer View with Loader
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

   const EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text
        style={styles.emptyListStyle}
        onPress={() => getItem(item)}>
        No Report Data Found
      </Text>
    );
  };

  const ItemView = ({ item }) => {
    return (
      // Flat List Item
      <View style={styles.box}>
              <View style={styles.boxleft}>
              <Text style={styles.boxtext}>Amount : N {item.amount}</Text>
              <Text style={styles.boxtext}>Credit : N {item.credit}</Text>
              <Text style={styles.boxtext}>Debit : N {item.debit}</Text>
              <Text style={styles.boxtext}>Balance : N {item.balance}</Text>
              
              

              <View style={styles.boxr}>
              <AntDesign style={styles.icon} name="calendar" size={20} color="#aba7a7" />
              <Text style={styles.boxtext1}>{item.date_text}  {item.time_text}</Text>
              </View>

              </View>
              
              </View>
    );
  };

  const ItemSeparatorView = () => {
    return (
      // Flat List Item Separator
      <View
        
      />
    );
  };

  const getItem = (item) => {
    //Function for click on an item
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  return (
   <View style={styles.container}>
   <View style={styles.header}>
            <Text style={styles.headertext}>Loyalty Wallet History</Text>
        </View>
      <FlatList
        style={styles.box1}
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListEmptyComponent={EmptyListMessage}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
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
    backgroundColor : '#7837FC',
    justifyContent: 'center',
    alignItems: 'center'
  },
  headertext:{
    fontSize:25,
    color:'#ffffff'
  },
  box: {
    width:'95%',
marginLeft:10,
marginRight:10,
    padding:16,
    borderWidth: 2,
    borderColor: "thistle",
    borderRadius: 10,
    flexDirection :'row',
    flexWrap :'wrap',
    marginTop:5,
    marginBottom:5,
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
   emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  

});

