import React, {Component} from 'react';
import {View, ScrollView} from 'react-native';
import {VViewContainer, VText} from '~/components';

import {connect} from 'react-redux';

import {Money} from '~/core';

const ItemList = ({label, value, money, first}) => {
  return (
    <View
      style={{
        marginBottom: 10,
        borderTopWidth: first ? 0 : 1,
        borderColor: 'rgba(0,0,0,0.2)',
        paddingTop: 10,
        flexDirection: 'row',
      }}>
      <View style={{flex: 1}}>
        <VText
          style={{
            textTransform: 'uppercase',
            fontSize: 11,
            marginBottom: 3,
            color: '#555',
          }}
          bold>
          {label}
        </VText>
        <VText style={{color: '#555', fontSize: 14}}>
          {money ? Money.reais(value) : value}
        </VText>
      </View>
    </View>
  );
};

class EnterpriseDetailScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log(this.props.enterprise);
  }

  _renderPage() {
    const {enterprise} = this.props;

    return (
      <ScrollView contentContainerStyle={{paddingBottom: 40}}>
        <View style={{paddingTop: 40, marginHorizontal: 15}}>
          <VText
            style={{fontSize: 16, textTransform: 'uppercase', color: '#555'}}
            medium>
            Company data
          </VText>
          <View
            style={{
              height: 1,
              width: 100,
              marginVertical: 10,
              backgroundColor: '#e01e69',
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: '#f2f2f2',
            opacity: 0.8,
            padding: 15,
            borderRadius: 4,
            marginHorizontal: 15,
          }}>
          <ItemList label="Name" value={enterprise.enterprise_name} first />
          <ItemList
            label="Address"
            value={`${enterprise.country} - ${enterprise.city}`}
          />
          <ItemList
            label="Segment"
            value={enterprise.enterprise_type.enterprise_type_name}
          />
        </View>
        <View style={{paddingTop: 40, marginHorizontal: 15}}>
          <VText
            style={{fontSize: 16, textTransform: 'uppercase', color: '#555'}}
            medium>
            About
          </VText>
          <View
            style={{
              height: 1,
              width: 100,
              marginVertical: 10,
              backgroundColor: '#e01e69',
            }}
          />
        </View>

        <View
          style={{
            backgroundColor: '#f2f2f2',
            opacity: 0.8,
            padding: 15,
            borderRadius: 4,
            marginHorizontal: 15,
            marginBottom: 40,
          }}>
          <ItemList value={enterprise.description} first />
        </View>

        <View style={{paddingHorizontal: 15}}>
          <VText
            style={{fontSize: 16, textTransform: 'uppercase', color: '#555'}}
            medium>
            Financial data
          </VText>
          <View
            style={{
              height: 1,
              width: 100,
              marginVertical: 10,
              backgroundColor: '#e01e69',
            }}
          />
        </View>
        <View
          style={{
            backgroundColor: '#f2f2f2',
            opacity: 0.8,
            padding: 15,
            borderRadius: 4,
            marginHorizontal: 15,
            marginBottom: 40,
          }}>
          <ItemList money label="shares" value={enterprise.shares} first />
          <ItemList
            money
            label="Value of shares"
            value={enterprise.share_price}
          />
        </View>
      </ScrollView>
    );
  }

  render() {
    return (
      <VViewContainer
        tabBar
        options={{
          topBar: {
            title: {
              text: 'Company details',
            },
          },
        }}>
        <View
          style={{
            flexDirection: 'row',
            backgroundColor: '#000',
            borderBottomWidth: 1,
            borderColor: 'rgba(255,255,255,0.1)',
          }}
        />

        {this._renderPage()}
      </VViewContainer>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    enterprise: user.enterprise.enterprise,
  };
};

export const EnterpriseDetailScreenConnected = connect(mapStateToProps)(
  EnterpriseDetailScreen,
);
