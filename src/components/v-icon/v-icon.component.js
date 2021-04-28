import React from 'react';
import {View} from 'react-native';

import iconList from './icon-list';

const DEFAULT_ICON_SIZE = 24;

const getIconSize = (size) => {
  return size * 1.1;
};

const getProps = (prop) => {
  const props = {};

  if (prop && prop.fontSize) {
    props.size = prop.fontSize;
  }

  if (prop && prop.color) {
    props.color = prop.color;
  }

  return props;
};

export const VIcon = (props) => {
  const SVGComponent = iconList[props.name];

  if (!SVGComponent) {
    return <View style={props.style} />;
  }

  const style = Array.isArray(props.style) ? props.style : [props.style];
  let size, color;

  style
    .filter((s) => s)
    .forEach((prop) => {
      const newProps = getProps(prop);

      size = newProps.size || size;
      color = newProps.color || color;
    });

  const iconSize = getIconSize(props.size || size || DEFAULT_ICON_SIZE);

  return (
    <View style={props.style}>
      <SVGComponent fill={color || '#ccc'} width={iconSize} height={iconSize} />
    </View>
  );
};
