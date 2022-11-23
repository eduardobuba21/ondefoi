import { ReactNode } from 'react';
// theme
import { theme } from '@src/theme';
// components
import { Text } from './Text';
import { View } from 'react-native';
import { IconButton } from './IconButton';
import { SafeAreaView } from 'react-native-safe-area-context';

// ----------------------------------------------------------------------

type Props = {
  onPressBack: VoidFunction;
  title: string;
  right?: ReactNode;
};

export function Header({ onPressBack, title, right }: Props) {
  return (
    <SafeAreaView
      style={{
        height: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: theme.palette.background.paper,
      }}
    >
      <View style={{ height: 100, width: '100%', position: 'absolute' }}>
        <SafeAreaView style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text variant="h3">{title}</Text>
        </SafeAreaView>
      </View>

      <View style={{ marginLeft: 20, marginRight: 'auto' }}>
        <IconButton
          name="back"
          onPress={onPressBack}
          size="small"
          color={theme.palette.text.faded}
        />
      </View>

      <View style={{ marginRight: 20 }}>{right}</View>
    </SafeAreaView>
  );
}
