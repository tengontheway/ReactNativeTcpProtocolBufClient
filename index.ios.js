/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import LoginMsg from './protobuf/test_pb';
var ByteBuffer = require('byte-buffer');

global.Buffer = global.Buffer || require('buffer').Buffer;
var net = require('react-native-tcp');


class ReactNativeTcpProtocolBufClient extends Component {
  constructor(props) {
    super(props);

    var client = net.createConnection({host:'192.168.0.162', port:8888}, ()=> {
          console.log("--------create connection succeed!");

          // 1.填充ProtocolBuff
          var login_msg = new LoginMsg.Login();
          login_msg.setSeed(5);

          var data = login_msg.serializeBinary();

          // 2.填充消息: MsgLength、MsgID、MsgData
          var buff = new ByteBuffer(2 + 2 + data.length);
          buff.writeUnsignedShort(2 + data.length);
          buff.writeUnsignedShort(1);
          buff.write(data);

          // 3.我对JS的Uint8Array和什么的Array已经无语了，先这么转吧，能正常运行
          // 心中一万个草泥马...
          var buffers = new Uint8Array(buff.buffer);
          client.write(buffers);

          alert("Send buffers:" + buffers);
          console.log("SendBuff:" + buffers);

          client.on('error', function(error) {
              console.log(">>>>>>>>>error:" + error);
          });

          client.on('data', function(data) {
              console.log('message was received', data)
          });
      });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to React Native!
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('ReactNativeTcpProtocolBufClient', () => ReactNativeTcpProtocolBufClient);
