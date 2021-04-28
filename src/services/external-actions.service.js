import {Linking, Platform} from 'react-native';
import LaunchNavigator from 'react-native-launch-navigator';

export class ExternalActionsService {
  static openURL(url) {
    return openProtocol(url);
  }

  static openPhoneNumber(number) {
    const protocol = `tel://${number.replace(/ /g, '')}`;
    // const protocol = `tel:${number.replace(/ /g,'')}`
    return openProtocol(protocol);
  }

  static openWhatsapp(number) {
    const protocol = `whatsapp://send?phone=55${number.replace(/ /g, '')}`;

    // return Linking.openURL(`whatsapp://send?phone=${number.replace(/ /g, '')}`);
    return openProtocol(protocol);
  }

  static openMapAt(geolocation, locationName) {
    let point = `${geolocation.latitude},${geolocation.longitude}`;
    let protocol = `maps:?daddr=${point}`;

    if (Platform.OS === 'android') {
      point = `${point}(${locationName})`;
      protocol = `geo:${point}?q=${point}`;
    }

    return openProtocol(protocol);
  }

  static async setRoute({address, type}) {
    let selectedApp = null;
    if (Platform.OS === 'android') {
      LaunchNavigator.setGoogleApiKey(
        'AIzaSyCfoHTROHG1tntUvevK_K1_zT5PKvzYjk0',
      );
    }

    let apps = await LaunchNavigator.getAvailableApps();
    for (let app in apps) {
      console.log(LaunchNavigator.getAppDisplayName(app));
    }

    const isGoogleMapsAvailable = await LaunchNavigator.isAppAvailable(
      LaunchNavigator.APP.GOOGLE_MAPS,
    );

    if (!isGoogleMapsAvailable) {
      const isWazeAvailable = await LaunchNavigator.isAppAvailable(
        LaunchNavigator.APP.WAZE,
      );

      if (isWazeAvailable) {
        selectedApp = LaunchNavigator.APP.WAZE;
      }
    } else {
      selectedApp = LaunchNavigator.APP.GOOGLE_MAPS;
    }

    LaunchNavigator.navigate(address, {
      app: selectedApp,
      transportMode:
        type === 'walk'
          ? LaunchNavigator.TRANSPORT_MODE.WALKING
          : LaunchNavigator.TRANSPORT_MODE.DRIVING,
    })
      .then(() => console.log('Launched navigator'))
      .catch((err) => console.error('Error launching navigator: ' + err));
  }
  // static setRoute({address}) {
  //   var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${address}`;
  //   Linking.canOpenURL(url)
  //     .then((supported) => {
  //       if (!supported) {
  //         console.log('Não foi possível definir a rota para o endereço.');
  //       } else {
  //         return Linking.openURL(url);
  //       }
  //     })
  //     .catch((err) => console.error('An error occurred', err));
  // }
}

function openProtocol(argument) {
  return Linking.openURL(argument);
}
