import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {Platform} from 'react-native';

export class PermissionsService {
  static checkLocation() {
    return check(PERMISSIONS.IOS.LOCATION_WHEN_IN_USE)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            return RESULTS.UNAVAILABLE;
          case RESULTS.DENIED:
            return RESULTS.DENIED;
          case RESULTS.GRANTED:
            return RESULTS.GRANTED;
          case RESULTS.BLOCKED:
            return RESULTS.BLOCKED;
        }
      })
      .catch((error) => {
        // …
      });
  }

  static requestLocation() {
    return request(
      Platform.select({
        android: PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        ios: PERMISSIONS.IOS.LOCATION_WHEN_IN_USE,
      }),
    ).then((result) => {
      return result;
    });
  }
}
