import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { useFocusEffect } from '@react-navigation/native';

// ----------------------------------------------------------------------

export const addTransition = (Screen: (props: any) => JSX.Element) => {
  return (props: any) => <ScreenTransition>{Screen(props)}</ScreenTransition>;
};

// ----------------------------------------------------------------------

export const ScreenTransition = (props: any) => {
  const opacity = useSharedValue(0);

  useFocusEffect(() => {
    opacity.value = withTiming(1, { duration: 250, easing: Easing.linear });

    return () => {
      opacity.value = withTiming(0, { duration: 250, easing: Easing.linear });
    };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    flex: 1,
    //
    opacity: opacity.value,
  }));

  // ----------------------------------------------------------------------

  return <Animated.View style={[animatedStyle]}>{props.children}</Animated.View>;
};
