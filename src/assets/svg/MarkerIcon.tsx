import * as React from 'react';
import Svg, {
  SvgProps,
  G,
  Ellipse,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';

function MarkerIcon(props: SvgProps) {
  return (
    <Svg width={40} height={40} viewBox="0 0 71 60" fill="none" {...props}>
      {/* //@ts-ignore */}
      <G filter="url(#prefix__filter0_d)">
        <Ellipse
          cx={35.5}
          cy={46}
          rx={31.5}
          ry={6}
          fill="url(#prefix__paint0_linear)"
        />
      </G>
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.5 0C44.598 0 52 7.458 52 16.626 52 27.896 39.09 45.5 35.502 45.5 31.914 45.5 19 27.896 19 16.626 19 7.458 26.402 0 35.5 0z"
        fill="#fff"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M35.5 0C44.598 0 52 7.458 52 16.626 52 27.896 39.09 45.5 35.502 45.5 31.914 45.5 19 27.896 19 16.626 19 7.458 26.402 0 35.5 0zm0 3C28.056 3 22 9.114 22 16.626c0 9.558 11.25 25.378 13.502 25.874C37.754 42.002 49 26.182 49 16.626 49 9.114 42.944 3 35.5 3zm.002 7c3.584 0 6.5 2.916 6.5 6.502a6.506 6.506 0 01-6.5 6.498 6.506 6.506 0 01-6.5-6.498 6.508 6.508 0 016.5-6.502zm0 3c-1.93 0-3.5 1.57-3.5 3.502 0 1.93 1.57 3.498 3.5 3.498s3.5-1.568 3.5-3.498a3.504 3.504 0 00-3.5-3.502z"
        fill="#AB2232"
      />
      <Defs>
        <LinearGradient
          id="prefix__paint0_linear"
          x1={36}
          y1={56}
          x2={36}
          y2={29}
          gradientUnits="userSpaceOnUse">
          <Stop offset={0.319} stopColor="#fff" />
          <Stop offset={1} stopColor="#C6C6C6" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
}

export default MarkerIcon;
