import { useFocusEffect } from '@react-navigation/native';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';

// ----------------------------------------------------------------------

export const Transition = (props: any) => {
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
