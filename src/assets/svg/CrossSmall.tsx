import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function CrossSmall(props: SvgProps) {
  return (
    <Svg width={111} height={155} viewBox="0 0 111 155" fill="none" {...props}>
      <Path fill="#B43342" d="M54 0h30v155H54z" />
      <Path fill="#B43342" d="M0 68V38h111v30z" />
    </Svg>
  );
}

export default CrossSmall;
