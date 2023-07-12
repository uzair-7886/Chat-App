import React, { useEffect } from "react";
import { View, TouchableOpacity, Text, Image, StyleSheet,SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from '@expo/vector-icons';
import colors from '../colors';
import { Entypo } from '@expo/vector-icons';
const catImageUrl = "https://i.guim.co.uk/img/media/26392d05302e02f7bf4eb143bb84c8097d09144b/446_167_3683_2210/master/3683.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=49ed3252c0b2ffb49cf8b508892e452d";

import home from '../assets/home.json'
// import Lottie from 'lottie-react-native';
import Lottie from 'lottie-react-native';

const Home = () => {

    const navigation = useNavigation();

    useEffect(() => {
        navigation.setOptions({
            headerLeft: () => (
                <FontAwesome name="search" size={24} color={colors.gray} style={{marginLeft: 15}}/>
            ),
            headerRight: () => (
                <Image
                    source={{ uri: catImageUrl }}
                    style={{
                        width: 40,
                        height: 40,
                        marginRight: 15,
                    }}
                />
            ),
        });
    }, [navigation]);

    return (
        <SafeAreaView style={styles.container}>
            <View style={animationStyle.animation}>
                <Lottie
                source={home}
                autoPlay
                loop
                />
            </View>
            <View style={textStyles.container}>
                <Text
                style={{
                    color: colors.primary,
                    fontSize: 30,
                    fontWeight: 'bold',
                    textAlign: 'left',
                    // marginTop:0 
                    marginHorizontal: 10,
                }}
                >
                    About this app:
                </Text>
                {/* <Text style={textStyles.text}>
                Welcome to our chat app, where you can connect with people from all over the world in just a click!
                </Text> */}
                <Text style={textStyles.text}>
                Simply click on the icon below to get started and join the conversation.                </Text>
                <Text style={textStyles.text}>
                Whether you're looking to make new friends, expand your social circle, or simply engage in stimulating conversation, our chat app has got you covered. So what are you waiting for? Join the chat room now and start exploring the exciting world of online conversations!
                </Text>
            </View>
        <View >
            <TouchableOpacity
                onPress={() => navigation.navigate("Chat")}
                style={styles.chatButton}
            >
                <Entypo name="chat" size={24} color={colors.lightGray} />
            </TouchableOpacity>
            <View>
                
            </View>
        </View>
        </SafeAreaView>
    );
    };

    export default Home;


    const animationStyle=StyleSheet.create({
        animation:{
            flex:1,
            justifyContent:'center',
            // alignItems:'center',
            height:400,
            width:400,
            backgroundColor:"#fff",

        }
    })

    const textStyles=StyleSheet.create({
        text:{
            color:colors.primary,
            fontSize:20,
            fontWeight:'bold',
            textAlign:'justify',
            paddingHorizontal:10,
            marginLeft:0,
            marginHorizontal:10,
            
        },
        container:{
            flex:1,
            // justifyContent:'center',
            // alignItems:'center',
            backgroundColor:"#fff"
        }
    })

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            backgroundColor: "#fff",
            // position:'absolute',
            // bottom:10,
        },
        chatButton: {
            backgroundColor: colors.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: colors.primary,
            elevation:5,
            shadowOffset: {
                width: 0,
                height: 2,
            },
            shadowOpacity: .9,
            shadowRadius: 8,
            marginRight: 20,
            marginBottom: 50,
        }
    }
        
    
    
    );