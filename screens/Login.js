import React,{useEffect} from 'react';
import { StatusBar } from 'expo-status-bar';
import { Formik } from 'formik';
import {Octicons} from '@expo/vector-icons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Colors } from './../components/styles';
import { useState } from 'react';
import {
  StyledContainer,PageLogo,Pagetitle,InnerContainer,SubTitle,StyledFromArea,StyledTextInput,
  StyledInputLabel,LeftIcon,RightIcon,StyledButton,StyledButtonText,Line,ExtraView,ExtraText,
  TextLink,TextLinkContent,MsgBox
} from './../components/styles';
import { Text, View, ActivityIndicator  } from 'react-native';
import KeyboardAvoidingWrapper from './../components/KeyboardAvoidingWrapper';
const {brand,darklight,primary} = Colors;

const Login = ({navigation}) => {

  useEffect(() => {
    setTimeout(async() => {
      const value = await AsyncStorage.getItem('student_id');
      if(value==null){
        navigation.navigate('Login');
      }else{
        navigation.navigate('Dashboard');
      }
    });
  },[]);

  const [hidepassword,setHidepassword] = useState(true);
  const [message,setMessage] = useState();
  const [messageType,setMessageType] = useState();

  const handlelogin = (credentials,setSubmitting) => {
     handleMessage(null);
    const url = '/dev/api/authentication/login';
    axios
      .post(url,credentials)
      .then((response)=>{
        const result = response.data;
        const {message,status,data} = result;
        if(status == 'SUCCESS'){
          storeUserData(data);
          console.log(data);
          navigation.navigate('Dashboard');

        }else{
          //navigation.navigate('Dashboard',{...data([0])});
          //handleMessage(message,status);
          alert(message);
        }
        setSubmitting(false);
      })
      .catch(error => {
      console.log(error.JSON());
      setSubmitting(false);
      handleMessage('Please Check Your Network And Try Again ');
      })
  }

    const storeUserData = async (uid) => {
    try {
      await AsyncStorage.setItem('student_id', uid)
      console.log("user Data saved successfully");
    } catch (e) {
      console.log(e);
    }
  }

  const handleMessage = (message,type='FAILED') =>{
    setMessage(message);
    setMessageType(type);
  }

  return (
     <KeyboardAvoidingWrapper>
      <StyledContainer>
       <StatusBar style="dark"/>
        <InnerContainer>
          <PageLogo resizeMode='cover' source={require('./../assets/img/target.png')} />
          
          <SubTitle>Account Login</SubTitle>
          <Formik
            initialValues = {{email: '',password: ""}}
            onSubmit = {(values,{setSubmitting}) => {
              //console.log(values);
              if(values.email=='' || values.password==''){
                //handleMessage('Please Fill All The Fields');
                alert('Please Fill All The Fields');
                setSubmitting(false);
              }else{
                handlelogin(values,setSubmitting);
              }
            }}
          >

          {({handleChange,handleBlur,handleSubmit,values,isSubmitting})=> (<StyledFromArea>
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
                  <StyledButtonText>Login</StyledButtonText>
               </StyledButton>}

               {isSubmitting && <StyledButton disabled={true}>
                  <ActivityIndicator size="large" color={primary}/>
               </StyledButton>}

               <Line />
               <ExtraView>
                  <ExtraText>Don't have an account already? </ExtraText>
                  <TextLink onPress={()=>navigation.navigate('Signup')}>
                    <TextLinkContent>Signup</TextLinkContent>
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

export default Login;