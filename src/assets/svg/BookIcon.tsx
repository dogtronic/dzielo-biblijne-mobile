import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function BookIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M12 5.25V21m0-15.75S6.75.75 1.5 4.5V21C6.75 17.25 12 21 12 21s5.25-3.75 10.5 0V4.5C17.25.75 12 5.25 12 5.25z"
        stroke="#fff"
        strokeWidth={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

export default BookIcon;
