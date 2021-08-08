import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function DisableFullScreenIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M8.5 3.75a.75.75 0 00-1.5 0v2.5a.75.75 0 01-.75.75h-2.5a.75.75 0 000 1.5h2.5A2.25 2.25 0 008.5 6.25v-2.5zM8.5 20.25a.75.75 0 11-1.5 0v-2.5a.75.75 0 00-.75-.75h-2.5a.75.75 0 110-1.5h2.5a2.25 2.25 0 012.25 2.25v2.5zM16.25 3a.75.75 0 00-.75.75v2.5a2.25 2.25 0 002.25 2.25h2.5a.75.75 0 100-1.5h-2.5a.75.75 0 01-.75-.75v-2.5a.75.75 0 00-.75-.75zM15.5 20.25a.75.75 0 101.5 0v-2.5a.75.75 0 01.75-.75h2.5a.75.75 0 100-1.5h-2.5a2.25 2.25 0 00-2.25 2.25v2.5z"
        fill="#fff"
      />
    </Svg>
  );
}

export default DisableFullScreenIcon;
