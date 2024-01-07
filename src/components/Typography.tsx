import React from 'react';

// Components
import {
  StyleProp,
  StyleSheet,
  Text as TextComponent,
  TextStyle,
} from 'react-native';

// Styles
import Colors from '../constants/Colors';
import Fonts from '../constants/Fonts';

// Redux
import {useAppSelector} from '../hooks/useAppDispatch';

export enum TypographyType {
  Header = 'header',
  Title = 'title',
  Text = 'text',
  Description = 'description',
  BigHeader = 'bigHeader',
  SmallTitle = 'smallTitle',
  ExtraSmallTitle = 'extraSmallTitle',
  HugeMainHeader = 'hugeMainHeader',
  SmallDescription = 'smallDescription',
  MainHeader = 'mainHeader',
}

type TypographyProps = {
  type: TypographyType;
  resizeable?: boolean;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  children: React.ReactNode;
};

/*
 * Default font value is 15, typography component adds values from
 * ResizableMatrix to fontValue from redux store using TypographyType enum
 */
const ResizableMatrix: {[key in TypographyType]: number} = {
  header: 1,
  title: 1,
  text: 0,
  description: -1,
  bigHeader: 3,
  smallTitle: 0,
  extraSmallTitle: -2,
  hugeMainHeader: 7,
  smallDescription: -2,
  mainHeader: 5,
};

const Typography: React.FC<TypographyProps> = ({
  resizeable,
  children,
  type,
  style,
  numberOfLines,
}) => {
  const fontSize = useAppSelector(state => state.user.fontSize);

  return (
    <TextComponent
      style={[
        styles[type],
        style,
        resizeable && {fontSize: fontSize + ResizableMatrix[type]},
      ]}
      numberOfLines={numberOfLines}>
      {children}
    </TextComponent>
  );
};

export default Typography;

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  header: {
    fontSize: 16,
    fontFamily: Fonts.MartelRegular,
    color: Colors.black,
  },
  title: {
    fontSize: 16,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  text: {
    fontSize: 15,
    fontFamily: Fonts.RobotoLight,
    color: Colors.black,
  },
  description: {
    fontSize: 14,
    fontFamily: Fonts.RobotoLight,
    color: Colors.gray,
  },
  bigHeader: {
    fontSize: 18,
    color: Colors.white,
    fontFamily: Fonts.RobotoRegular,
  },
  smallTitle: {
    fontSize: 15,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  extraSmallTitle: {
    fontSize: 13,
    fontFamily: Fonts.RobotoRegular,
    color: Colors.black,
  },
  mainHeader: {
    fontSize: 20,
    fontFamily: Fonts.MartelRegular,
    color: Colors.white,
  },
  hugeMainHeader: {
    color: Colors.primary,
    fontSize: 22,
    fontFamily: Fonts.MartelRegular,
  },
  smallDescription: {
    color: Colors.gray,
    fontSize: 13,
    fontFamily: Fonts.RobotoLight,
  },
});
