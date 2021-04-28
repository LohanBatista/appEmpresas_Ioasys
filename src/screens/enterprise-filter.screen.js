import React, {Component} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import {VViewContainer, VText, VIcon} from '~/components';
import {connect} from 'react-redux';

import {Money} from '~/core';

import {VButton} from '~/components/index';

import {showAlert} from '~/ducks/alert';
import EStyleSheet from 'react-native-extended-stylesheet';
import {reduxForm} from 'redux-form';

import {getEnterpriseDetailById, getFilteredEnterprises} from '~/ducks/user';

const segments = [
  {label: 'Healt', value: 3},
  {label: 'Service', value: 12},
  {label: 'IT', value: 7},
  {label: 'Marktplace', value: 21},
  {label: 'Fintech', value: 2},
  {label: 'HR Tech ', value: 6},
  {label: 'Social', value: 13},
  {label: 'Software', value: 11},
  {label: 'Transport', value: 24},
  {label: 'Music', value: 27},
  {label: 'Sports', value: 19},
  {label: 'Green', value: 28},
  {label: 'Biotechnology', value: 5},
  {label: 'IoT', value: 26},
  {label: 'Construction', value: 4},
  {label: 'Industry', value: 23},
  {label: 'Education', value: 10},
  {label: 'Food', value: 16},
  {label: 'Games', value: 15},
];

const ItemList = ({label, value, money, first, style}) => {
  return (
    <View
      style={{
        marginBottom: 10,
        borderTopWidth: first ? 0 : 1,
        borderColor: '#333',
        paddingTop: 10,
        ...style,
      }}>
      <VText
        style={{
          textTransform: 'uppercase',
          fontSize: 12,
          marginBottom: 3,
          color: '#333',
        }}
        bold>
        {label}
      </VText>
      <VText style={{color: '#333'}}>
        {money ? Money.reais(value) : value}
      </VText>
    </View>
  );
};

class EnterpriseFilterScreen extends Component {
  constructor(props) {
    super(props);

    const {etapa} = this.props.route.params;

    this.state = {
      optionEtapaIndex: -1,
      optionMotivoIndex: -1,
      etapa: etapa || '',
      motivo: '',
      date: '',
      showInput: false,
      showAlertReport: false,
      showButton: false,
      showTextReport: 0,
      relato: false,
      segments: '',
    };

    this.filteredEnterprises = [];

    this.props?.filteredEnterprises?.enterprises?.forEach((item) => {
      this.filteredEnterprises.push({label: item.nome, value: item.id});
    });
  }

  componentDidMount() {
    // this.props.dispatch(getEnterprises());
    console.log();

    console.log(this.props.filteredEnterprises);
  }

  _getDetail(id) {
    this.props.dispatch(getEnterpriseDetailById(id));
  }

  _showOptions() {
    this.props.dispatch(
      showAlert({
        body: {
          text: 'Select an option',
          selected: this.state.optionEtapaIndex,
          options: segments,
        },
        buttons: [
          {
            text: 'Select',
            primary: true,
            onPress: (index) =>
              this.setState({
                segments: segments[index].value,
                optionEtapaIndex: index,
              }),

            bold: true,
          },
          {
            text: 'Cancelar',
            bold: true,
          },
        ],
      }),
    );
  }

  _motivo() {
    this.props.dispatch(
      showAlert({
        body: {
          text: 'Selecione uma opção',
          selected: this.state.optionEtapaIndex,
          options: segments,
        },
        buttons: [
          {
            text: 'Selecionar',
            primary: true,
            onPress: (index) =>
              this.setState({
                segments: segments[index].value,
                optionMotivoIndex: index,
              }),
            bold: true,
          },
          {
            text: 'Cancel',
            bold: true,
          },
        ],
      }),
    );
  }
  _scrollToTop() {
    if (this.scroll) {
      this.scroll.scrollTo({x: 0, y: 0, animated: true});
    }
  }

  _handleSubmit(values) {
    let id = this.state.segments;

    console.log(id);

    this.props.dispatch(getFilteredEnterprises(id));
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
        <VViewContainer
          options={{
            topBar: {
              hideBackButton: false,
              animated: false,
              title: {
                text: 'Business listing by type',
              },
            },
          }}>
          <ScrollView
            ref={(e) => (this.scroll = e)}
            contentContainerStyle={{paddingBottom: 100}}>
            <View
              style={{
                paddingVertical: 30,
                paddingHorizontal: 15,
                backgroundColor: '#e2e2e2',
                opacity: 0.8,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <View style={{paddingTop: 0, flex: 1}}>
                  <ItemList
                    label="Type"
                    value={
                      this.state.optionEtapaIndex > -1
                        ? segments[this.state.optionEtapaIndex].label
                        : 'Select'
                    }
                    first
                    style={{marginBottom: 0}}
                  />
                  <View
                    style={{
                      height: 1,
                      width: 100,
                      marginVertical: 10,
                      backgroundColor: '#e01e69',
                    }}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => this._showOptions()}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    backgroundColor: '#e2e2e2',
                    opacity: 0.8,
                    paddingVertical: 4,
                    paddingHorizontal: 10,
                    borderRadius: 4,
                  }}>
                  <VText style={{fontSize: 16, marginRight: 10, color: '#555'}}>
                    Segment
                  </VText>
                  <VIcon name="chevronDown" size={16} style={{color: '#555'}} />
                </TouchableOpacity>
              </View>
              <View style={{marginTop: 5}}>
                <VButton
                  onPress={handleSubmit((values) => this._handleSubmit(values))}
                  title="Search"
                  disabled={this.state.segments.length <= 0}
                />
              </View>
            </View>
            <View style={{padding: 20}}>
              <View
                style={{
                  height: 1,
                  width: 100,
                  marginVertical: 10,
                  backgroundColor: '#e01e69',
                }}
              />
              <VText
                style={{
                  fontSize: 20,
                  textTransform: 'uppercase',
                  color: '#000',
                }}>
                Last searched
              </VText>
            </View>

            {this.props?.filteredEnterprises?.enterprises?.map((item) => {
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
          </ScrollView>
        </VViewContainer>
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = ({user}) => {
  return {
    enterprises: user.enterprises,
    filteredEnterprises: user.filteredEnterprises,
  };
};

EnterpriseFilterScreen = connect(mapStateToProps)(EnterpriseFilterScreen);

export const EnterpriseFilterScreenConnected = reduxForm({
  form: 'aaaaa',
})(EnterpriseFilterScreen);

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
