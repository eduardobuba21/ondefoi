// theme
import { theme } from '@src/theme';
// rhf
import { useFormContext, Controller } from 'react-hook-form';
// components
import Animated, {
  Easing,
  withTiming,
  useSharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Gap, Icon, Text } from '@src/components/default';
import { Pressable, View, ViewProps } from 'react-native';
// utils
import { alpha } from '@src/utils/theme';
import { useEffect } from 'react';

// ----------------------------------------------------------------------

type TButton = {
  value: string;
  label: string;
  icon: string;
};

type Props = {
  name: string;
  buttons: TButton[];
  disabled: boolean;
} & ViewProps;

// ----------------------------------------------------------------------

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export default function RHFSegmentedButtons({ name, buttons, disabled, ...other }: Props) {
  const { control } = useFormContext();

  const bgIdle = alpha(theme.palette.text.faded, 0);
  const bgActive = alpha(theme.palette.text.faded, 0.12);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { value, onChange } }) => (
        <View
          {...other}
          style={{
            height: 56,
            padding: 4,
            display: 'flex',
            flexDirection: 'row',
            borderRadius: theme.props.borderRadius.element,
            backgroundColor: theme.palette.background.neutral,
          }}
        >
          {buttons.map((_button, index) => {
            const backgroundColor = useSharedValue(_button.value === value ? bgActive : bgIdle);

            const fadeIn = () => {
              backgroundColor.value = withTiming(bgActive, { duration: 100, easing: Easing.ease });
            };
            const fadeOut = () => {
              backgroundColor.value = withTiming(bgIdle, { duration: 200, easing: Easing.ease });
            };

            const animatedStyle = useAnimatedStyle(() => ({
              flexGrow: 1,
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: theme.props.borderRadius.element,
              //
              backgroundColor: backgroundColor.value,
              //
              ...(index !== 0 && { marginLeft: 4 }),
            }));

            useEffect(() => {
              if (value === _button.value) {
                fadeIn();
              } else {
                fadeOut();
              }
            }, [value]);

            return (
              <AnimatedPressable
                key={_button.value}
                onPress={() => {
                  onChange(_button.value);
                }}
                disabled={disabled}
                style={[animatedStyle]}
              >
                <Icon name={_button.icon} {...(disabled && { color: theme.palette.text.faded })} />

                <Gap direction="horizontal" size={6} />

                <Text
                  variant="subtitle1"
                  style={{ ...(disabled && { color: theme.palette.text.faded }) }}
                >
                  {_button.label}
                </Text>
              </AnimatedPressable>
            );
          })}
        </View>
      )}
    />
  );
}
