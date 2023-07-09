import { View, Text,Image,SafeAreaView,TouchableOpacity,Button,TextInput,StyleSheet } from 'react-native'
import React from 'react'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {auth} from '../config/firebase'
import { useState } from 'react'
import { useEffect } from 'react'
import backImage from '../assets/back.jpg'
import { Alert } from 'react-native'

const Signup = ({navigation}) => {

    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const signup=()=>{
        if(email!==""&&password!==""){
            createUserWithEmailAndPassword(auth,email,password)
            .then(()=>console.log("signup successful"))
            .catch((err)=>Alert.alert("signup error",err.message))
        }
    }
    
  return (
    <View
    style={styles.container}
    >
      <Image
      source={backImage}
        style={styles.backImage}
      />
      <View style={styles.whiteSheet}/>
    <SafeAreaView style={styles.form}>
        <Text style={styles.title}>Signup</Text>
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
    onPress={signup}>
        <Text
        style={{
            fontWeight:'bold',
            color:'white',
            fontSize:18,
        }}
        >Register</Text>
    </TouchableOpacity>
    <View style={{marginTop:20,flexDirection:'row',alignItems:'center',alignSelf:'center'}}>
        <Text style={{color:'gray',fontWeight:600,fontSize:14}}>Already have an account? </Text>
        <TouchableOpacity
        onPress={()=>navigation.navigate("Login")}
        >
            <Text style={{color:'#F57C00',fontWeight:600,fontSize:14}}> Login</Text>
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
        color:'orange',
        alignSelf:'center',
        paddingBottom:24,
        marginBottom:40
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
        backgroundColor:'#F57C00',
        height:58,
        borderRadius:10,
        alignItems:'center',
        justifyContent:'center',
        marginTop:40
    }
    }
)

export default Signup