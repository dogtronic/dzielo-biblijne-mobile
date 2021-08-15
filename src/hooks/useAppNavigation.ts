import {useNavigation} from '@react-navigation/core';
import {StackNavigationProp} from '@react-navigation/stack';
import {RootNavigatorParamList} from '../navigation/RootNavigator';

export const useAppNavigation = () =>
  useNavigation<StackNavigationProp<RootNavigatorParamList, 'UnifiedScreen'>>();
