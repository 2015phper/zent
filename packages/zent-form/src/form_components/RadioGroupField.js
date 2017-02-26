import React from 'react';
import Radio from 'zent-radio';
import getControlGroup from '../getControlGroup';

const RadioGroup = Radio.Group;
const RadioGroupField = getControlGroup(props => {
  return <RadioGroup {...props} />;
});

export default RadioGroupField;
