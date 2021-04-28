import React, {Component} from 'react';
import {Platform} from 'react-native';
import {connect} from 'react-redux';
import OneSignal from 'react-native-onesignal';
import {UserService} from '~/services';
import {setNotificationToken} from '~/ducks/user';

export class VPushNotification extends Component {
  constructor(props) {
    super(props);
    //Remove this method to stop OneSignal Debugging
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('300f07fd-1c46-4c35-9dba-73c27d860119', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(myiOSPromptCallback);

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', (device) => this.onIds(device));
  }
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  // onReceived(notification) {
  //   console.log('Notification received: ', notification);
  // }

  // onOpened(openResult) {
  //   console.log('Message: ', openResult.notification.payload.body);
  //   console.log('Data: ', openResult.notification.payload.additionalData);
  //   console.log('isActive: ', openResult.notification.isAppInFocus);
  //   console.log('openResult: ', openResult);
  // }

  onIds(device) {
    this.props.dispatch(setNotificationToken(device.userId));
    console.log('Device info: ', device);
  }

  render() {
    return null;
  }
}
function myiOSPromptCallback(permission) {
  // do something with permission value
}

const mapStateToProps = ({app}) => {
  return {
    isCodePushUpdateRequired: app.isCodePushUpdateRequired,
  };
};

export const VPushNotificationConnected = connect(mapStateToProps)(
  VPushNotification,
);
