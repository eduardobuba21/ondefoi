// hooks
import { useAuth } from '@src/hooks/useAuth';
// components
import { View } from 'react-native';
import { Appbar } from 'react-native-paper';

// ----------------------------------------------------------------------

export function Home() {
  const { signOut } = useAuth();

  // ----------------------------------------------------------------------

  return (
    <View style={{ flex: 1 }}>
      <Appbar.Header elevated>
        <Appbar.Content title="Início" />
        <Appbar.Action icon="exit-to-app" onPress={signOut} />
      </Appbar.Header>
    </View>
  );
}
