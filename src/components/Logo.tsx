// components
import { View, ViewProps } from 'react-native';
// assets
import LogoSlogan from '@src/assets/logo_slogan.svg';

// ----------------------------------------------------------------------

type Props = {
  variant?: 'slogan';
} & ViewProps;

// ----------------------------------------------------------------------

export function Logo({ variant = 'slogan', ...rest }: Props) {
  if (variant === 'slogan') {
    return (
      <View {...rest} style={{ height: 70, ...(rest.style as {}) }}>
        <LogoSlogan width={'100%'} height={'100%'} viewBox={'0 0 508.12 169.8'} />
      </View>
    );
  }

  return (
    <View {...rest} style={{ height: 70, ...(rest.style as {}) }}>
      <LogoSlogan width={'100%'} height={'100%'} viewBox={'0 0 508.12 169.8'} />
    </View>
  );
}
