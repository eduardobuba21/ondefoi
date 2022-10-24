import Animated, { FadeInUp, FadeOutDown } from 'react-native-reanimated';

// ----------------------------------------------------------------------

export const FadeInView = (props: any) => {
  return (
    <Animated.View entering={FadeInUp} exiting={FadeOutDown}>
      {props.children}
    </Animated.View>
  );
};
