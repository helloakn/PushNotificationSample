
import React,{useRef,useState,useEffect} from 'react';
import {StyleSheet,View,Text,AppState} from 'react-native';
//import WebSocket from 'ws';
const socket = new WebSocket('wss://test-socket.zotefamily.com');

ConnectNotiSvr=()=>{
  try{
          
    //  var socket = new WebSocket(_notiEndPoint);
      console.log(socket.readyState);
    
      socket.onopen = function(){
          console.log('Socket Status: '+socket.readyState+' (open)');
          let payLoad = {
                  "type":"register",
                  "token": '--',//_notiToken,
                  //"secretkey":"secret key if whoami is svr"
                  "whoami": "client",
                  "package": "com.zotefamily.search.dashboard"
              };
          payLoad = JSON.stringify(payLoad);
          socket.send(payLoad);
         // PingNotiSvr(socket);
         setTimeout(PingNotiSvr,2000);
      }

      socket.onmessage = function(msg){
          console.log('Received: '+msg.data);
          notiData = JSON.parse(msg.data);
          //alert(notiData.type);
          if(notiData.type!="reply-ping"){
              console.log('===============================');
              console.log( notiData.data);
              console.log('============end==============');
              console.log('show off');
              granted ? showNotification(notiData.data) : showError();
          }
          
        //  granted ? showNotification() : showError();
      }

      socket.onclose = function(){
          console.log('noti connection closed');
          ConnectNotiSvr();
          console.log('reconnecting....');
      }			

  } catch(exception){
     console.log(exception);
  }
}
ConnectNotiSvr();





const PingNotiSvr=()=> {
  console.log('i m ping');
  if(socket.readyState==1){
      let payLoad = {
          "type":"ping",
          "token": "--"//_notiToken
      };
      payLoad = JSON.stringify(payLoad);
      socket.send(payLoad);
      console.log(' i sleep'); 
      //sleep(2000);
      
      console.log(' i wakeup');
      console.log('ping');
      //PingNotiSvr(socket);
      setTimeout(PingNotiSvr,2000);
  }
  
}

const App = () => {
 
  const appState = useRef(AppState.currentState)
  const [appStateVisibile,setAppStateVisible] = useState(appState.currentState)
  
  useEffect(()=>{
    console.log('hello');
    AppState.addEventListener("change",_handleAppStateChange);
    return()=>{
      AppState.removeEventListener("change",_handleAppStateChange);
    }
  },[]);
  const _handleAppStateChange=(netAppState)=>{
    console.log(appState.current)
  }
  return (
    <View style={styles.sectionContainer}>
      <Text>hello</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width:'100%',
    height:'100%',
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
