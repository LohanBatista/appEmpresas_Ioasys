import React, {useState} from 'react';
import {View, StyleSheet, Image, Modal, TouchableOpacity} from 'react-native';
import {VText} from '~/components';
import ImagePicker from 'react-native-image-crop-picker';
import {VIcon} from '../v-icon/v-icon.component';
// import {T} from '~/config/theme';

import {SafeAreaView} from 'react-native-safe-area-context';

import ImageViewer from 'react-native-image-zoom-viewer';

import DocumentPicker from 'react-native-document-picker';

export const VCameraSelect = ({onImageReady, label, type}) => {
  const [url, setUrl] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  function camera() {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: false,
      includeBase64: true,
      compressImageQuality: 0.7,
      compressImageMaxWidth: 720,
      compressImageMaxHeight: 1280,
    }).then((image) => {
      console.log(image);
      onImageReady(image);
      setUrl(image.path);
    });
  }

  async function testeUploadFile() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      });
      console.log(res);
      onImageReady(res);

      // this.setState({isLoading: true});

      // var formdata = new FormData();
      // formdata.append('file', {
      //   uri: res.uri,
      //   name: res.name,
      //   type: res.type,
      // });

      // this.userService = new UserService();

      // axios
      //   .post(
      //     'https://officialbank-dev-as.azurewebsites.net/api/user/upload/?tipoDocumento=1',
      //     formdata,
      //     {
      //       headers: {
      //         'Content-Type': `multipart/form-data; boundary=${formdata._boundary}`,
      //         Authorization: this.props.token,
      //       },
      //     },
      //   )
      //   .then((response) => {
      //     this.setState({isLoading: false});
      //     pop();
      //   });

      // this.userService.uploadPDF(formdata);
    } catch (err) {
      // this.setState({isLoading: false});
    }
  }

  function gallery() {
    if (type === 'pdf') {
      testeUploadFile();
    } else {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: false,
        includeBase64: true,
        compressImageQuality: 0.7,
        compressImageMaxWidth: 720,
        compressImageMaxHeight: 1280,
      }).then((image) => {
        console.log(image);
        onImageReady(image);
        setUrl(image.path);
      });
    }
  }

  function zoom() {
    setIsOpen(!isOpen);
  }

  return (
    <View style={{marginBottom: 20}}>
      <VText style={{paddingBottom: 10, color: '#c3c3c3', fontSize: 18}} medium>
        {label || 'Comprovante'}
      </VText>
      <View
        style={{
          flexDirection: 'row',
        }}>
        {url ? (
          <View style={{width: 115, height: 115}}>
            <TouchableOpacity onPress={() => zoom()} activeOpacity={0.8}>
              <Image
                source={{uri: url}}
                style={{
                  width: 115,
                  height: 115,
                  borderRadius: 4,
                  borderWidth: 4,
                }}
                resizeMode="cover"
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setUrl('')}
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                padding: 8,

                zIndex: 100,
                borderRadius: 4,
              }}>
              <VIcon name="close3" style={{color: '#000'}} size={20} />
            </TouchableOpacity>
          </View>
        ) : (
          <View style={{flexDirection: 'row', height: 115}}>
            <TouchableOpacity
              onPress={() => gallery()}
              style={{
                borderWidth: 2,
                width: 115,
                height: 115,
                justifyContent: 'center',
                alignItems: 'center',
                borderStyle: 'dashed',
                borderColor: '#444',
                borderRadius: 6,
                padding: 15,
                marginRight: 15,
              }}>
              <VIcon
                name="imageSearchOutline"
                size={30}
                style={{color: '#555', marginBottom: 4}}
              />
              <VText
                style={{
                  textAlign: 'center',
                  fontSize: 14,
                  color: '#999',
                }}
                medium>
                {type === 'pdf' ? 'selecionar arquivo' : 'selecionar foto'}
              </VText>
            </TouchableOpacity>

            {type !== 'pdf' ? (
              <TouchableOpacity
                onPress={() => camera()}
                style={{
                  borderWidth: 2,
                  width: 115,
                  height: 115,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderStyle: 'dashed',
                  borderColor: '#444',
                  borderRadius: 6,
                  padding: 15,
                }}>
                <VIcon
                  name="camera"
                  size={30}
                  style={{color: '#555', marginBottom: 4}}
                />
                <VText
                  style={{
                    textAlign: 'center',
                    fontSize: 14,
                    color: '#999',
                  }}
                  medium>
                  usar câmera
                </VText>
              </TouchableOpacity>
            ) : null}
          </View>
        )}

        <Modal visible={isOpen} transparent animationType="fade">
          <View style={{flex: 1}}>
            <SafeAreaView
              edges={['top']}
              style={{
                alignItems: 'flex-start',
                paddingLeft: 20,
                paddingTop: 15,
                position: 'absolute',
                left: 0,
                top: 0,
                zIndex: 10,
              }}>
              <TouchableOpacity
                onPress={() => zoom()}
                style={{
                  width: 42,
                  height: 42,
                  paddingRight: 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: '#000',
                  borderRadius: 100,
                  borderWidth: 2,
                }}>
                <VIcon name={'chevronLeft'} size={20} style={{}} />
              </TouchableOpacity>
            </SafeAreaView>

            <ImageViewer
              useNativeDriver
              renderIndicator={() => null}
              imageUrls={[{url}]}
            />
          </View>
        </Modal>
      </View>
    </View>
  );

  // return (
  //   <View>
  //     <TouchableOpacity onPress={() => camera()}>
  //       <VText>aaaa</VText>
  //     </TouchableOpacity>

  //     <Image source={{uri: url}} style={{width: 100, height: 100}} />
  //   </View>
  // );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
    color: '#ccc',
    fontFamily: 'Montserrat',
  },
});
