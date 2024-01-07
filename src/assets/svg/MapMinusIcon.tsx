import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function MapMinusIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M10.5 19.5a9 9 0 100-18 9 9 0 000 18zM17.25 17.25l5.25 5.25M7.5 10.5h6"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default MapMinusIcon;
