import React, {
    useState,
    useEffect,
    useLayoutEffect,
    useCallback
  } from 'react';
  import { TouchableOpacity, Text ,View,StyleSheet} from 'react-native';
  import { GiftedChat,Bubble,Send } from 'react-native-gifted-chat';
  import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
  import { signOut } from 'firebase/auth';
  import { auth, db } from '../config/firebase';
  import { useNavigation } from '@react-navigation/native';
  import { AntDesign } from '@expo/vector-icons';
  import colors from '../colors';
  import { ActivityIndicator } from 'react-native';
  import { Ionicons } from '@expo/vector-icons';
  import { FontAwesome } from '@expo/vector-icons';
  import messageLoading from '../assets/msg-loading.json'
  import Lottie from 'lottie-react-native';


  export default function Chat() {

    const [messages, setMessages] = useState([]);
    const navigation = useNavigation();
    const [loadingMessages,setLoadingMessages]=useState(true)

  const onSignOut = () => {
      signOut(auth).catch(error => console.log('Error logging out: ', error));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
          // <title></title>
          title:"Chat Room",
          headerTitleStyle:{
            color:colors.gray,
          },
          headerRight: () => (
            <TouchableOpacity
              style={{
                marginRight: 10,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onPress={onSignOut}
            >
              <Text
              style={{
                color: colors.primary,
                fontSize: 16,
                fontWeight: 'bold',
                marginRight: 5,
              }}
              >
                Logout
              </Text>
              <AntDesign name="logout" size={24} color={colors.primary} style={{marginRight: 10}}/>
            </TouchableOpacity>
          )
        });
      }, [navigation]);

    useLayoutEffect(() => {

        const collectionRef = collection(db, 'chats');
        const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
        // console.log('querySnapshot unsusbscribe');
          setMessages(
            querySnapshot.docs.map(doc => ({
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user
            }))
          );
          setLoadingMessages(false)
        });
    return unsubscribe;
      }, []);

    const onSend = useCallback((messages = []) => {
        setMessages(previousMessages =>
          GiftedChat.append(previousMessages, messages)
        );
        // setMessages([...messages, ...messages]);
        const { _id, createdAt, text, user } = messages[0];    
        addDoc(collection(db, 'chats'), {
          _id,
          createdAt,
          text,
          user
        });
      }, []);
      const renderBubble = (props) => {
        const isSentByCurrentUser = props?.currentMessage?.user?._id === auth?.currentUser?.email;
        

        if(isSentByCurrentUser){
          return(
<View>
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: "#f0f0f0"
                  // isSentByCurrentUser ? '#fff' : colors.primary,
                },
                right: {
                  backgroundColor: colors.primary,
                },
              }}
              textStyle={{
                left: {
                  color: isSentByCurrentUser ? '#000' : colors.primary,
                },
                right: {
                  color: '#fff',
                },
              }}
            />
            <View
            style={{
              alignItems:'flex-end'
            }}
            >
            <Ionicons name="checkmark-done" size={20} color={colors.primary} />
            </View>
            
            </View>
          )
        }else{
          return(

            <View>
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: "#F4FCFF"
                  // isSentByCurrentUser ? '#fff' : colors.primary,
                },
                right: {
                  backgroundColor: colors.primary,
                },
              }}
              textStyle={{
                left: {
                  color: isSentByCurrentUser ? '#000' : colors.primary,
                },
                right: {
                  color: '#fff',
                },
              }}
            />
            </View>
          )
        }
            

          
      };
      const renderSend = (props) => {
        return (
          <Send {...props}>
            <View style={{color: colors.primary, fontWeight: 'bold',alignContent:'center',justifyContent:'center',paddingBottom:10,paddingHorizontal:10}}>
            <FontAwesome name="send" size={24} color={colors.primary} />
            </View>
          </Send>
        );
      };

      const animationStyle=StyleSheet.create({
        animation:{
            flex:1,
            justifyContent:'center',
            // alignItems:'center',
            height:400,
            width:400,
            alignSelf:'center',
            opacity:0.5

        }
    });

      return (

        loadingMessages? 
        <View style={animationStyle.animation}>
          <Lottie
                source={messageLoading}
                autoPlay
                loop
                />
        </View>
        :
        <GiftedChat
          messages={messages}
          showAvatarForEveryMessage={false}
        //   showUserAvatar
        //   isTyping
          onSend={messages => onSend(messages)}
          messagesContainerStyle={{
            backgroundColor: '#fff'
          }}
          textInputStyle={{
            backgroundColor: '#fff',
            borderRadius: 20,
          }}
          user={{
            _id: auth?.currentUser?.email,
            avatar: 'https://i.pravatar.cc/300'
          }}
          renderBubble={renderBubble}
          renderSend={renderSend}
        />
      );

      
}
