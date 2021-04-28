import React, {useState} from 'react';
import {Calendar, LocaleConfig} from 'react-native-calendars';
import EStyleSheet from 'react-native-extended-stylesheet';
import moment from 'moment';
import {VText} from '~/components';

LocaleConfig.locales['pt-br'] = {
  monthNames: [
    'Janeiro',
    'Fevereiro',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juillet',
    'Août',
    'Septembre',
    'Octobre',
    'Novembre',
    'Décembre',
  ],
  monthNamesShort: [
    'Janv',
    'Févr',
    'Mars',
    'Avril',
    'Mai',
    'Juin',
    'Juil',
    'Août',
    'Sept',
    'Oct',
    'Nov',
    'Déc',
  ],
  dayNames: [
    'Domingo',
    'Segunda-feira',
    'Terça-feira',
    'Quarta-feira',
    'Quinta-feira',
    'Sexta-feira',
    'Sábado',
  ],
  dayNamesShort: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
  today: "Aujourd'hui",
};
LocaleConfig.defaultLocale = 'pt-br';

export const VCalendar = ({onDayPress}) => {
  const [markedDates, setMarkedDates] = useState();

  const today = new Date();

  return (
    <Calendar
      current={today}
      minDate={today}
      monthFormat={'MM/yyyy'}
      // onMonthChange={(month) => {
      //   console.log('month changed', month);
      // }}
      renderHeader={(date) => {
        return <VText>{moment(date).format('MMMM, YYYY')}</VText>;
      }}
      firstDay={1}
      markedDates={markedDates}
      onDayPress={(day) => {
        onDayPress(day.dateString);
        setMarkedDates({
          [day.dateString]: {
            selected: true,
            marked: true,
            selectedColor: EStyleSheet.value('$colors.primary'),
          },
        });
      }}
      hideExtraDays={true}
      theme={{
        calendarBackground: 'transparent',
        textSectionTitleColor: '#b6c1cd',
        textSectionTitleDisabledColor: '#d9e1e8',
        selectedDayBackgroundColor: EStyleSheet.value('$colors.primary'),
        selectedDayTextColor: '#000',
        todayTextColor: 'rgba(255,255,255,0.7)',
        dayTextColor: '#999',
        textDisabledColor: '#555',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: 'orange',
        disabledArrowColor: '#d9e1e8',
        textDayFontFamily: 'Montserrat',
        textDayFontWeight: '600',
        textMonthFontFamily: 'Montserrat',
        textDayHeaderFontFamily: 'Montserrat',
        textDayFontSize: 14,
        textMonthFontSize: 14,
        textDayHeaderFontSize: 12,
      }}
    />
  );
};
