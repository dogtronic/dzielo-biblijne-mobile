import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function FullScreenIcon(props: SvgProps) {
  return (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none" {...props}>
      <Path
        d="M5.625 4.5A1.125 1.125 0 004.5 5.625V8.25a.75.75 0 01-1.5 0V5.625A2.626 2.626 0 015.625 3H8.25a.75.75 0 010 1.5H5.625zM15 3.75a.75.75 0 01.75-.75h2.625A2.626 2.626 0 0121 5.625V8.25a.75.75 0 11-1.5 0V5.625A1.125 1.125 0 0018.375 4.5H15.75a.75.75 0 01-.75-.75zM3.75 15a.75.75 0 01.75.75v2.625c0 .621.504 1.125 1.125 1.125H8.25a.75.75 0 110 1.5H5.625A2.625 2.625 0 013 18.375V15.75a.75.75 0 01.75-.75zm16.5 0a.75.75 0 01.75.75v2.625A2.625 2.625 0 0118.375 21H15.75a.75.75 0 110-1.5h2.625a1.125 1.125 0 001.125-1.125V15.75a.75.75 0 01.75-.75z"
        fill="#fff"
      />
    </Svg>
  );
}

export default FullScreenIcon;
