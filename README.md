# ReactNativeTcpProtocolBufClient
React  Native Client实现TCP连接服务器并使用Protocol buffer收发消息, js的tcp相关信息太少了，尤其是关于字节传输加密的...

GO Server位置
```
https://github.com/tengontheway/RNTcpProtocolBufServer
```

## 环境配置
1.安装相关插件,因为我的package.json已经配置好了，直接intall下就可以了
```
npm install 
```

自己安装插件的时候一定记得要使用--save 参数,能把依赖库报错到package.json中,例如
```
npm install react-native-tcp --save
rnpm link react-native-tcp
```

2.有关网络插件的问题，直接参考插件的github,主要安装了
buffer<br>
byte-buffer<br>
google-protobuf<br>
react-native-tcp[https://github.com/PeelTechnologies/react-native-tcp](https://github.com/PeelTechnologies/react-native-tcp)<br>

## 注意问题:
1.protocol buffer发送字节是可变长度，比如我定义消息结构体int64的ID
```
ID=1, protocol data的长度可能=2byte
ID=10000, protocol data的长度可能=3byte
而并不是按照int64=8byte走的
```

2.安装插件react-native-tcp注意了，这货的安装一定要按照步骤来
```
npm install react-native-tcp --save
rnpm link react-native-tcp
```

如果rnpm不能识别
```
npm install rnpm
```

## 预览

![](https://raw.githubusercontent.com/tengontheway/ReactNativeTcpProtocolBufClient/master/screenshot/111.png)
![](https://raw.githubusercontent.com/tengontheway/ReactNativeTcpProtocolBufClient/master/screenshot/222.png)





