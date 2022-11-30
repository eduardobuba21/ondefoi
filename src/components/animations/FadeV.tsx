import { ViewProps } from 'react-native';
import Animated, { FadingTransition, FadeInUp, FadeOutDown } from 'react-native-reanimated';

// ----------------------------------------------------------------------

export const FadeV = {
  View: ({ ...rest }: ViewProps) => {
    return (
      <Animated.View entering={FadeInUp} exiting={FadeOutDown} layout={FadingTransition} {...rest}>
        {rest.children}
      </Animated.View>
    );
  },
};
