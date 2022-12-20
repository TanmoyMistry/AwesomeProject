import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import { useFormik } from 'formik';
import {Octicons} from '@expo/vector-icons';
import axios from 'axios';
import {Picker} from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './../components/styles';
import { useState } from 'react';
import {
  StyledContainer,PageLogo,Pagetitle,InnerContainer,SubTitle,StyledFromArea,StyledTextInput,
  StyledInputLabel,LeftIcon,RightIcon,StyledButton,StyledButtonText,Line,ExtraView,ExtraText,
  TextLink,TextLinkContent,MsgBox
} from './../components/styles';
import { StyleSheet, Text, View, ActivityIndicator,TextInput,TouchableOpacity } from 'react-native';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
const {brand,darklight,primary} = Colors;

const Support = ({navigation}) => {

  

  const [hidepassword,setHidepassword] = useState(true);
  const [message,setMessage] = useState();
  const [messageType,setMessageType] = useState();
  const [getValue, setGetValue] = useState('');

  const handlelogin = (credentials,setSubmitting) => {
    credentials.user_id=getValue;
    //alert(getValue);
     handleMessage(null);
    const url = 'https://customerapp.toniapharmacy.com.ng/dev/api/authentication/insert_issue';
    axios
      .post(url,credentials)
      .then((response)=>{
        const result = response.data;
        const {message,status,data} = result;
        if(status == 'SUCCESS'){
          //handleMessage(message,status);
          alert(message);
        }else{
          //navigation.navigate('Dashboard',{...data([0])});
          handleMessage(message,status);
        }
        setSubmitting(false);
      })
      .catch(error => {
      console.log(error.JSON());
      setSubmitting(false);
      handleMessage('Please Check Your Network And Try Again ');
      })
  }

  const handleMessage = (message,type='FAILED') =>{
    setMessage(message);
    setMessageType(type);
  }


 
    //function to get the value from AsyncStorage
    AsyncStorage.getItem('student_id').then(
      (value) =>
        //AsyncStorage returns a promise so adding a callback to get the value
        setGetValue(value)
      //Setting the value in Text
    );




  return (
     <KeyboardAvoidingWrapper>
      <StyledContainer>
       <StatusBar style="dark"/>
        <InnerContainer>
          <PageLogo resizeMode='cover' source={require('./../assets/img/support.png')} />
          <Pagetitle>Customer Support</Pagetitle>
          <SubTitle>Tell Us Your Problem</SubTitle>
          <Formik
            initialValues = {{title: '',type: '',content: '',user_id: getValue}}
            onSubmit = {(values,{setSubmitting}) => {
              //console.log(values);
              if(values.title=='' || values.content=='' || values.type==''){
                //handleMessage('Please Fill All The Fields');
                alert('Please Fill All The Fields');
                setSubmitting(false);
              }else{
                handlelogin(values,setSubmitting);
              }
            }}
          >

          {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=> (<StyledFromArea>


            <TextInput
               placeholder = "Title"
               onChangeText = {handleChange('title')}
               onBlur = {handleBlur('title')}
               value={values.title}
    style={{height:60, padding : 10, marginBottom : 10,backgroundColor: '#E5E7EB',}}/>

              <Picker 
              style={styles.box} 
              onValueChange={handleChange('type')}
              selectedValue={values.type}
              >
              <Picker.Item label='Please select an option...' value='0' />
              <Picker.Item label={'IssueType 1'} value={'1'} />
              <Picker.Item label={'Issue Type 2'} value={'2'} />
              </Picker>

               <TextInput
               placeholder = "Type your problem here ...."
               onChangeText = {handleChange('content')}
               onBlur = {handleBlur('content')}
               value={values.content}
    multiline={true}
    numberOfLines={10}
    style={{height:200, padding : 10, marginTop : 10,backgroundColor: '#E5E7EB', textAlignVertical: 'top'}}/>
               
               <MsgBox type={messageType}>{message}</MsgBox>

               {!isSubmitting && <StyledButton onPress={handleSubmit}>
                  <StyledButtonText>Send</StyledButtonText>
               </StyledButton>}

               {isSubmitting && <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary}/>
               </StyledButton>}

               
               
               
            </StyledFromArea>)}

          </Formik>
        </InnerContainer>
      </StyledContainer>
    </KeyboardAvoidingWrapper>
  );
};

const MyTextInput = ({label,icon,isPassword,...props}) =>{
  return(
      <View>
        <LeftIcon>
          <Octicons name={icon} size={30} color={brand} />
        </LeftIcon>
        <StyledInputLabel>{label}</StyledInputLabel>
        <StyledTextInput {...props} />
        {isPassword &&(

          <RightIcon>

          </RightIcon>

          )}
      </View>
   );
};

export default Support;

const styles = StyleSheet.create({

  box: {
    width:'100%',
    height:'10%',
    padding:5,
    backgroundColor: '#E5E7EB'
  }
  

});