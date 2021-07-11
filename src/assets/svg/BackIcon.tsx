import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';

function BackIcon(props: SvgProps) {
  return (
    <Svg width={30} height={30} viewBox="0 0 30 30" fill="none" {...props}>
      <Path
        d="M26.25 15c0 .53-.39.966-.895 1.03l-.128.008H4.773c-.415 0-.787-.253-.945-.642a1.05 1.05 0 01.132-1.026l.091-.105 8.25-8.338a1.012 1.012 0 011.446.003c.365.373.395.956.089 1.362l-.092.106-6.495 6.564h17.978A1.03 1.03 0 0126.25 15zm-12.506 7.602c.401.404.401 1.061.003 1.468-.365.372-.94.404-1.342.095l-.105-.092-4.549-4.599a1.04 1.04 0 01-.301-.736c0-.265.1-.529.298-.732a1.009 1.009 0 011.34-.096l.106.093 4.55 4.599z"
        fill="#fff"
      />
    </Svg>
  );
}

export default BackIcon;
