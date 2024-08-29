import * as React from 'react';
import PropTypes from 'prop-types';
import Svg, { Path } from 'react-native-svg';
import { colors } from '../constants';

function SvgSearch({ fill = colors.black, size = 24 }) {
  return (
    <Svg height={size} width={size} viewBox="0 0 24 24">
      <Path
        d="M21.7 20.3L18 16.6c1.2-1.5 1.9-3.5 1.9-5.7 0-4.8-3.9-8.7-8.7-8.7S2.5 6.1 2.5 10.9s3.9 8.7 8.7 8.7c2.1 0 4.1-.7 5.7-1.9l3.7 3.7c.4.4 1 .4 1.4 0 .4-.3.4-1 0-1.4zm-9.8-3.7c-3.6 0-6.5-2.9-6.5-6.5s2.9-6.5 6.5-6.5 6.5 2.9 6.5 6.5-2.9 6.5-6.5 6.5z"
        fill={fill}
      />
    </Svg>
  );
}

SvgSearch.propTypes = {
  fill: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  size: PropTypes.number
};

export default React.memo(SvgSearch);
