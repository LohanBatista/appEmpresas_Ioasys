import analytics from '@react-native-firebase/analytics';

export class AnalyticsService {
  static event(eventName, data) {
    analytics().logEvent(eventName, data);
  }
}
