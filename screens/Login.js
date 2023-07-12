import { View, Text,Image,SafeAreaView,TouchableOpacity,Button,TextInput,StyleSheet,ActivityIndicator } from 'react-native'
import React from 'react'
import {signInWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../config/firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import backImage from '../assets/back.jpg'
import { Alert } from 'react-native'

const Login = ({navigation}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [loadingLogin,setLoadingLogin]=useState(false)

    const signIn=()=>{
        setLoadingLogin(true);
        if(email!==""&&password!==""){
            signInWithEmailAndPassword(auth,email,password)
            .then(()=>console.log("login successful"))
            .catch((err)=>Alert.alert("login error",err.message))
        }
        setLoadingLogin(false)
    }
    
  return (
    loadingLogin?
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={colors.primary}/>
      </View>
      :
    <View
    style={styles.container}
    >
      <Image
      source={backImage}
        style={styles.backImage}
      />
      <View style={styles.whiteSheet}/>
    <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Login</Text>
        <TextInput
        style={styles.input}
        placeholder='Enter Email'
        autoCapitalize='none'
        keyboardType='email-address'
        textContentType='emailAddress'
        autoFocus={true}
        value={email}
        onChangeText={(text)=>setEmail(text)}
        />
        {/* <Text style={styles.title}>Password</Text> */}
        <TextInput
        style={styles.input}
        placeholder='Enter Password'
        autoCapitalize='none'
        autoCorrect={false}
        secureTextEntry={true}
        textContentType='password'
        value={password}
        onChangeText={(text)=>setPassword(text)}
        />
    <TouchableOpacity style={styles.button}
    onPress={signIn}>
        <Text
        style={{
            fontWeight:'bold',
            color:'white',
            fontSize:18,
        }}
        >Login</Text>
    </TouchableOpacity>
    <View style={{marginTop:20,flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
        <Text style={{color:'gray',fontWeight:600,fontSize:14}}>Don't have an account? </Text>
        <TouchableOpacity
        onPress={()=>navigation.navigate("Signup")}
        >
            <Text style={{color:'#42BCEA',fontWeight:600,fontSize:14}}> SignUp</Text>
        </TouchableOpacity>
    </View>
    </SafeAreaView>
    </View>
  )
}

const styles=StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff'
    },
    title:{
        fontSize:36,
        fontWeight:'bold',
        color:'#42BCEA',
        alignSelf:'center',
        paddingBottom:24,
        marginBottom:42
    },
    input:{
        backgroundColor:'#F6F7FB',
        height:58,
        marginBottom:20,
        fontSize:16,
        borderRadius:10,
        padding:12
    },
    backImage:{
        width:'100%',
        height:340,
        position:'absolute',
        top:0,
        resizeMode:'cover'
    },
    whiteSheet:{
        width:'100%',
        height:'75%',
        position:'absolute',
        bottom:0,
        backgroundColor:'#fff',
        borderTopLeftRadius:60,
    },
    form:{
        flex:1,
        justifyContent:'center',
        marginHorizontal:30
    },
    button:{
        backgroundColor:'#42BCEA',
        height:58,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:40
    }
    }
)

export default Login