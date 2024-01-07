import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function CloseIcon(props: SvgProps) {
  return (
    <Svg
      width={props.width || 18}
      height={props.height || 18}
      viewBox="0 0 18 18"
      fill="none"
      {...props}>
      <Path
        d="M10.817 8.759L17.089 2.5A1.465 1.465 0 0015.017.429L8.76 6.702 2.503.429A1.464 1.464 0 10.43 2.501l6.272 6.258-6.272 6.258a1.46 1.46 0 000 2.072 1.46 1.46 0 002.072 0l6.257-6.273 6.257 6.272a1.46 1.46 0 002.072 0 1.458 1.458 0 000-2.071l-6.272-6.258z"
        fill={props.fill || '#fff'}
      />
    </Svg>
  );
}

export default CloseIcon;
