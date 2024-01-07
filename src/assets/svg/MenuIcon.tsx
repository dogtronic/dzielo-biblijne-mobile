import * as React from 'react';
import Svg, {SvgProps, Rect} from 'react-native-svg';

function MenuIcon(props: SvgProps) {
  return (
    <Svg width={24} height={18} viewBox="0 0 24 18" fill="none" {...props}>
      <Rect
        width={24}
        height={2}
        rx={1}
        transform="matrix(-1 0 0 1 24 0)"
        fill="#fff"
      />
      <Rect
        width={14.4}
        height={2}
        rx={1}
        transform="matrix(-1 0 0 1 24 16)"
        fill="#fff"
      />
      <Rect
        width={24}
        height={2}
        rx={1}
        transform="matrix(-1 0 0 1 24 8)"
        fill="#fff"
      />
    </Svg>
  );
}

export default MenuIcon;
