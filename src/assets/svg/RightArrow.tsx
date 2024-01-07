import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function SvgComponent(props: SvgProps) {
  return (
    <Svg width={15} height={15} viewBox="0 0 15 15" fill="none" {...props}>
      <Path
        d="M4.981 12.207a.469.469 0 01-.045-.61l.045-.053L9.024 7.5 4.981 3.456a.469.469 0 01-.045-.61l.045-.052a.469.469 0 01.61-.046l.053.046 4.375 4.375a.469.469 0 01.045.61l-.045.052-4.375 4.375a.469.469 0 01-.663 0z"
        fill="#AB2232"
      />
    </Svg>
  );
}

export default SvgComponent;
