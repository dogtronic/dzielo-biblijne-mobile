import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SearchIcon(props: SvgProps) {
  return (
    <Svg width={18} height={18} viewBox="0 0 18 18" fill="none" {...props}>
      <Path
        d="M16.313 15.517l-4.248-4.248a6.197 6.197 0 10-.796.796l4.248 4.248.796-.796zM2.25 7.312a5.063 5.063 0 1110.125 0 5.063 5.063 0 01-10.125 0z"
        fill="#AB2232"
      />
    </Svg>
  );
}

export default SearchIcon;
