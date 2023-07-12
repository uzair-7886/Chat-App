import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import React,{useEffect} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { GiftedChat } from 'react-native-gifted-chat';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './config/firebase';

import Chat from './screens/Chat';
import Login from './screens/Login';
import Signup from './screens/Signup';
import Home from './screens/Home'
import { createContext } from 'react';
import { useState } from 'react';
import colors from './colors';

const Stack = createStackNavigator();

const AuthContext=createContext({})

const AuthProvider=({children})=>{
  const [user,setUser]=useState(null)
  return(
    <AuthContext.Provider value={{user,setUser}}>
      {children}
    </AuthContext.Provider>
  )
}

const ChatStack=()=>{
  return(
    <Stack.Navigator defaultScreenOptions={Home}>
      <Stack.Screen name="Home" component={Home}/>
      <Stack.Screen name="Chat" component={Chat}/>
    </Stack.Navigator>
  )
}

const AuthStack=()=>{
  return(
    <Stack.Navigator screenOptions={{
      headerShown:false
    }}>
      <Stack.Screen name="Login" component={Login}/>
      <Stack.Screen name="Signup" component={Signup}/>
    </Stack.Navigator>
  )
}


const RootNavigator=()=>{
  const {user,setUser}=React.useContext(AuthContext)
  const [loading,setLoading]=useState(true)
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(
      auth,
      async authenticatedUser => {
        authenticatedUser ? setUser(authenticatedUser) : setUser(null);
        setLoading(false);
      }
    );
    return unsubscribeAuth;
  }, [user]);
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' color={colors.primary}/>
      </View>
    );
  }
  return(
    <NavigationContainer>
      {user ? <ChatStack /> : <AuthStack />}
    </NavigationContainer>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <RootNavigator/>
    </AuthProvider>
  );
}


