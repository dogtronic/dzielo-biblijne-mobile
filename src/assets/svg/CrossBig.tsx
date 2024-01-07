import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function CrossBig(props: SvgProps) {
  return (
    <Svg width={315} height={540} viewBox="0 0 315 540" fill="none" {...props}>
      <Path fill="#B43342" d="M153.701 0h82.987v540h-82.987z" />
      <Path fill="#B43342" d="M.584 190v-71H315v71z" />
    </Svg>
  );
}

export default CrossBig;
