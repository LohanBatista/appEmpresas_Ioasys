import React from 'react';
import {Field} from 'redux-form';
import {VInput} from '~/components';

export const VInputForm = ({name, ...props}) => (
  <Field name={name} component={VInput} {...props} />
);
