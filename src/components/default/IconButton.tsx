// theme
import { theme } from '@src/theme';
// components
import { Icon } from './Icon';
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Pressable, PressableProps } from 'react-native';
// utils
import { alpha } from '@src/utils/theme';

// ----------------------------------------------------------------------

type Props = {
  name: string;
  onPress: VoidFunction;
  color?: string;
  size?: number | 'small' | 'medium' | 'large';
  selected?: boolean;
} & PressableProps;

// ----------------------------------------------------------------------

export function IconButton({ name, onPress, color, size, selected = false, ...rest }: Props) {
  const bgIdle = selected ? theme.palette.background.paper : alpha(theme.palette.text.faded, 0);
  const bgActive = selected
    ? theme.palette.background.neutral
    : alpha(theme.palette.text.faded, 0.12);

  const backgroundColor = useSharedValue(bgIdle);

  const fadeIn = () => {
    backgroundColor.value = withTiming(bgActive, { duration: 100, easing: Easing.ease });
  };

  const fadeOut = () => {
    backgroundColor.value = withTiming(bgIdle, { duration: 200, easing: Easing.ease });
  };

  const animatedStyle = useAnimatedStyle(() => ({
    padding: 8,
    display: 'flex',
    borderRadius: 100,
    alignItems: 'center',
    //
    backgroundColor: backgroundColor.value,
  }));

  return (
    <Pressable onPress={onPress} onPressIn={fadeIn} onPressOut={fadeOut} {...rest}>
      <Animated.View
        style={{
          ...animatedStyle,
          ...(rest.style as {}),
        }}
      >
        <Icon name={name} color={color} size={size} />
      </Animated.View>
    </Pressable>
  );
}
