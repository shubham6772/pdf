import React from 'react'
import {View, Text, Platform, Button, Linking} from 'react-native';
import RNFetchBlob from 'rn-fetch-blob'
import { data } from './data';

const App = () => {

 const share = async () => {
  let fPath = Platform.select({
    ios: RNFetchBlob.fs.dirs.DocumentDir,
    android: RNFetchBlob.fs.dirs.DownloadDir,
 });
 
 fPath = `${fPath}/pdfFileName.pdf`;
 console.log(fPath)
 
 if (Platform.OS === 'ios') {
     await RNFetchBlob.fs.createFile(fPath, data, "base64");
 } else {
     await RNFetchBlob.fs.writeFile(fPath, data, "base64")
     const pdfViewerPackageName = 'com.adobe.reader';
     const url = `intent://${pdfViewerPackageName}/#Intent;scheme=file;action=android.intent.action.VIEW;type=application/pdf;S.encoded_data=${encodeURIComponent(`file://${fPath}`)};end`;
     await Linking.openURL(url).catch((error)=> {
      console.log(error);
     })
 }
 }

  return (
    <View>
       <Text>Hello</Text>
       <Button title='click me' onPress={()=> share()} />
    </View>
  )
}

export default App
