// components
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

// ----------------------------------------------------------------------

export function Summary() {
  return (
    <View>
      <Appbar.Header mode="center-aligned" elevated>
        <Appbar.Content title="Resumo" />
      </Appbar.Header>
    </View>
  );
}
