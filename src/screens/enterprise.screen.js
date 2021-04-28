import React, {Component} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {VViewContainer, VText} from '~/components/index';
import {connect} from 'react-redux';

import {getEnterprises, getEnterpriseDetailById} from '~/ducks/user';
import EStyleSheet from 'react-native-extended-stylesheet';

class EnterpriseScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    this.props.dispatch(getEnterprises());

    console.log(this.props.enterprises);
  }

  _getDetail(id) {
    this.props.dispatch(getEnterpriseDetailById(id));
  }

  render() {
    return (
      <VViewContainer
        tabBar
        options={{
          topBar: {
            hideBackButton: false,
            animated: false,
            title: {
              text: 'Business listing',
            },
          },
        }}>
        <ScrollView>
          <View
            style={{
              paddingVertical: 0,
              paddingHorizontal: 15,
              marginTop: 13,
              marginBottom: -10,
            }}
          />
          <View style={{paddingVertical: 30, paddingHorizontal: 15}}>
            {this.props?.enterprises?.enterprises?.map((item) => {
              return (
                <TouchableOpacity
                  onPress={() => this._getDetail(item.id)}
                  style={styles.leadsContainer}>
                  <View>
                    <View style={styles.leads}>
                      <View style={styles.calendarContainer}>
                        <View style={styles.calendarContainerBody} />
                        <View style={styles.hourContainer}>
                          <VText
                            style={[styles.calendarText, styles.month]}
                            medium>
                            {item.enterprise_type.enterprise_type_name}
                          </VText>
                        </View>
                      </View>
                      <View style={{flex: 1}}>
                        <View
                          style={{
                            marginTop: 20,
                            marginHorizontal: 15,
                            borderBottomWidth: 1,
                            borderColor: '#e01e69',
                            height: 40,
                          }}>
                          <VText
                            style={{fontSize: 18, color: '#555'}}
                            bold
                            numberOfLines={1}>
                            {item.enterprise_name}
                          </VText>
                        </View>
                        <View style={{marginHorizontal: 15, marginTop: 8}}>
                          <VText
                            style={{fontSize: 13, color: '#555'}}
                            numberOfLines={3}>
                            {item.description}
                          </VText>
                          <VText
                            style={{
                              fontSize: 14,
                              color: '#555',
                              paddingTop: 5,
                            }}
                            bold>
                            {item.country} - {item.city}
                          </VText>
                        </View>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </VViewContainer>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    enterprises: user.enterprises,
  };
};

export const EnterpriseScreenConnected = connect(mapStateToProps)(
  EnterpriseScreen,
);

const styles = EStyleSheet.create({
  leadsContainer: {
    marginVertical: 20,
  },
  leads: {
    backgroundColor: '#f2f2f2',
    opacity: 0.8,
    borderTopLeftRadius: '$borderRadius',
    borderTopRightRadius: '$borderRadius',
    flexDirection: 'row',
    paddingBottom: 8,
  },

  calendarContainer: {
    backgroundColor: '#e01e69',
    borderRadius: '$borderRadius',
    width: 100,
    top: -10,
    marginLeft: 10,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: 120,
  },
  calendarContainerBody: {
    paddingVertical: 10,
    paddingBottom: 5,
    alignItems: 'center',
  },
  calendarText: {
    color: '#000',
  },
  weekDay: {
    fontSize: 11,
    textTransform: 'uppercase',
    marginBottom: -3,
  },
  day: {
    fontSize: 40,
  },
  month: {
    fontSize: 13,
    marginTop: 3,
  },
  hourContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#9c1549',
    borderBottomRightRadius: '$borderRadius',
    borderBottomLeftRadius: '$borderRadius',
  },
});
