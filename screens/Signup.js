import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {Octicons} from '@expo/vector-icons';
import axios from 'axios';
import { Colors } from './../components/styles';
import { useState } from 'react';
import moment from 'moment';
import {
  StyledContainer,PageLogo,Pagetitle,InnerContainer,SubTitle,StyledFromArea,StyledTextInput,
  StyledInputLabel,LeftIcon,RightIcon,StyledButton,StyledButtonText,Line,ExtraView,ExtraText,
  TextLink,TextLinkContent,MsgBox
} from './../components/styles';
import { Text, View, ActivityIndicator,Button ,StyleSheet} from 'react-native';
import {Picker} from '@react-native-picker/picker';
const {brand,darklight,primary} = Colors;
import DateTimePickerModal from "react-native-modal-datetime-picker";
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';

const Signup = ({navigation}) => {


  const [hidepassword,setHidepassword] = useState(true);
  const [message,setMessage] = useState();
  const [messageType,setMessageType] = useState();
  const [modalVisible, setModalVisisble] = useState(false);
const [Formatted, setFormatted] = useState();

  const handlelogin = (credentials,setSubmitting) => {
    credentials.dob=Formatted;
     handleMessage(null);
    const url = '/dev/api/authentication/registration';
    axios
      .post(url,credentials)
      .then((response)=>{
        const result = response.data;
        const {message,status,data} = result;
        if(status == 'SUCCESS'){
          navigation.navigate('Login');
        }else{
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


  const onConfirm = (data) => {
    setFormatted(FormatDate(data));
    setModalVisisble(false);
  };

  const FormatDate = (data) => {
    let dateTimeString =
      data.getFullYear() +
      '-' +
      (data.getMonth() + 1) +
      '-' +
       data.getDate()
      ;

    
    dateTimeString = dateTimeString ;

    return dateTimeString;
  };

  const onCancel = (data) => setModalVisisble(false);
  


  return (
     <KeyboardAvoidingWrapper>
      <StyledContainer>
       <StatusBar style="dark"/>
        <InnerContainer>
          
          <Pagetitle>Company Title</Pagetitle>
          <SubTitle>Account Signup</SubTitle>
          <Formik
            initialValues = {{card_number: '',fullname: '',last_name: '',phone: '',email: '',dob:Formatted,gender:'',password: ""}}
            onSubmit = {(values,{setSubmitting}) => {
              //console.log(values);
              if(values.card_number=='' || values.fullname=='' || values.last_name=='' || values.email=='' || values.password==''){
                handleMessage('Please Fill All The Fields');
                setSubmitting(false);
              }else{
                handlelogin(values,setSubmitting);
              }
            }}
          >

          {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=> (<StyledFromArea>
               <MyTextInput 
               label = "Card Number"
               icon = "credit-card"
               placeholder = ""
               placeholderTextColor = {darklight}
               onChangeText = {handleChange('card_number')}
               onBlur = {handleBlur('card_number')}
               value={values.card_number}
               keyboardType = "numeric"
               />
               <MyTextInput 
               label = "First Name"
               icon = "person"
               placeholder = ""
               placeholderTextColor = {darklight}
               onChangeText = {handleChange('fullname')}
               onBlur = {handleBlur('fullname')}
               value={values.fullname}
               keyboardType = "default"
               />
               <MyTextInput 
               label = "Last Name"
               icon = "person"
               placeholder = ""
               placeholderTextColor = {darklight}
               onChangeText = {handleChange('last_name')}
               onBlur = {handleBlur('last_name')}
               value={values.last_name}
               keyboardType = "default"
               />
               <MyTextInput 
               label = "Phone Number"
               icon = "device-mobile"
               placeholder = ""
               placeholderTextColor = {darklight}
               onChangeText = {handleChange('phone')}
               onBlur = {handleBlur('phone')}
               value={values.phone}
               keyboardType = "default"
               />
               <MyTextInput 
               label = "Email Address"
               icon = "mail"
               placeholder = "tanmoy@gmail.com"
               placeholderTextColor = {darklight}
               onChangeText = {handleChange('email')}
               onBlur = {handleBlur('email')}
               value={values.email}
               keyboardType = "email-address"
               />

<DateTimePickerModal
        isVisible={modalVisible}
        mode="date"
        onConfirm={onConfirm}
        onCancel={onCancel}
      />
      <Text>DOB{Formatted}</Text>
      <View style={{marginBottom:20}}>
<Button  title="Pick Date Of Birth" onPress={() => setModalVisisble(true)} />
</View>

               <Picker 
              style={styles.box} 
              onValueChange={handleChange('gender')}
              selectedValue={values.gender}
              >
              <Picker.Item label='Please select an option...' value='0' />
              <Picker.Item label={'Male'} value={'1'} />
              <Picker.Item label={'Female'} value={'2'} />
              </Picker>

               <MyTextInput 
               label = "Password"
               icon = "lock"
               placeholder = "* * * * * *"
               placeholderTextColor = {darklight}
               onChangeText = {handleChange('password')}
               onBlur = {handleBlur('password')}
               value={values.password}
               secureTextEntry={true}
               isPassword={true}
               />

               <MsgBox type={messageType}>{message}</MsgBox>

               {!isSubmitting && <StyledButton onPress={handleSubmit}>
                  <StyledButtonText>Signup</StyledButtonText>
               </StyledButton>}

               {isSubmitting && <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary}/>
               </StyledButton>}


               <Line />
               <ExtraView>
                  <ExtraText>Already have an account? </ExtraText>
                  <TextLink onPress={()=>navigation.navigate('Login')}>
                    <TextLinkContent>Login</TextLinkContent>
                  </TextLink>
               </ExtraView>
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

export default Signup;

const styles = StyleSheet.create({

  box: {
    width:'100%',
    height:'5%',
    padding:5,
    backgroundColor: '#E5E7EB'
  },
  frt: {  
        marginBottom: 50,    
    }  
  

});