import React from 'react';
import {View, TouchableOpacity, ActivityIndicator} from 'react-native';

import {VText, VIcon} from '~/components';

import {Cod} from '~/core';
import EStyleSheet from 'react-native-extended-stylesheet';

export const VLeadCard = React.memo(
  ({
    diaDaSemana,
    diaDoMes,
    nomeMes,
    razao,
    fantasia,
    cnpj,
    tipoLogradouro,
    logradouro,
    numero,
    cidade,
    bairro,
    hora,
    onPress,
    onPlusButtonPress,
    actions,
    showPlusButton,
    tipoLead,
    socio1Nome,
    situacaoCadastral,
  }) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.leadsContainer}>
        <View>
          <View style={styles.leads}>
            {diaDaSemana ? (
              <View style={styles.calendarContainer}>
                <View style={styles.calendarContainerBody}>
                  <VText style={[styles.calendarText, styles.weekDay]} bold>
                    {diaDaSemana}
                  </VText>
                  <VText style={[styles.calendarText, styles.day]} bold>
                    {Cod.pad(diaDoMes, 2)}
                  </VText>
                  <VText style={[styles.calendarText, styles.month]} medium>
                    {nomeMes}
                  </VText>
                </View>
                <View style={styles.hourContainer}>
                  <VText style={[styles.calendarText, styles.hour]} medium>
                    {hora}
                  </VText>
                </View>
              </View>
            ) : null}

            <View style={{flex: 1}}>
              <View
                style={{
                  marginTop: 20,
                  marginHorizontal: 15,
                  borderBottomWidth: 1,
                  borderColor: '#333',
                  height: 68,
                }}>
                <VText style={{fontSize: 16}} bold numberOfLines={3}>
                  {`${razao} - ${fantasia}`}
                </VText>
              </View>

              <View style={{marginHorizontal: 15, marginTop: 8}}>
                <VText
                  style={{fontSize: 13, color: '#999'}}
                  bold
                  numberOfLines={1}>
                  {cnpj}
                </VText>
                <VText style={{fontSize: 13, color: '#999'}} numberOfLines={3}>
                  {`${tipoLogradouro} ${logradouro} ${numero} - ${cidade} - ${bairro}`}
                </VText>
                <VText
                  style={{
                    fontSize: 14,
                    color: '#fff',
                    paddingTop: 5,
                  }}
                  bold>
                  {tipoLead}
                </VText>
              </View>
            </View>
          </View>
          <View style={styles.leadsBottom}>
            <View style={{flexDirection: 'row'}}>
              {actions?.map((action) => {
                return (
                  <TouchableOpacity
                    onPress={action.onPress}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingLeft: 15,
                      paddingRight: 8,
                      paddingVertical: 10,
                      marginRight: 5,
                    }}>
                    <VIcon name={action.icon} size={24} />
                    <VText style={{fontSize: 14, marginLeft: 4}} medium>
                      {action.label}
                    </VText>
                  </TouchableOpacity>
                );
              })}

              <View style={{flex: 1}} />

              {showPlusButton ? (
                <TouchableOpacity
                  onPress={onPlusButtonPress}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    paddingLeft: 15,
                    paddingRight: 15,
                    paddingVertical: 10,
                  }}>
                  <VIcon name="plusBoxMultiple" size={24} />
                </TouchableOpacity>
              ) : null}
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  },
);

const styles = EStyleSheet.create({
  leadsContainer: {
    marginVertical: 20,
  },
  leads: {
    backgroundColor: '#333',
    borderTopLeftRadius: '$borderRadius',
    borderTopRightRadius: '$borderRadius',
    flexDirection: 'row',
    paddingBottom: 8,
  },
  leadsBottom: {
    borderBottomLeftRadius: '$borderRadius',
    borderBottomRightRadius: '$borderRadius',
    backgroundColor: '#555',
  },
  calendarContainer: {
    backgroundColor: '$colors.primary',
    borderRadius: '$borderRadius',
    width: 75,
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
    fontSize: 42,
  },
  month: {
    fontSize: 14,
    marginTop: -3,
  },
  hourContainer: {
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '$colors.primaryHover',
    borderBottomRightRadius: '$borderRadius',
    borderBottomLeftRadius: '$borderRadius',
  },
});
