import React from 'react';

import HTML from 'react-native-render-html';
import {IGNORED_TAGS} from 'react-native-render-html/src/HTMLUtils';

export const VHTML = ({html, style = {}}) => {
  return (
    <HTML
      baseFontStyle={{
        color: '#ccc',
        lineHeight: 20,
        fontFamily: 'Montserrat',
        ...style,
      }}
      html={html}
      ignoredTags={[...IGNORED_TAGS, 'a']}
    />
  );
};
